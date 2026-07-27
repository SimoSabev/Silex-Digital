import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { EventEmitter } from 'node:events';
import { z } from 'zod';
import { initializeDatabase, listArtifactRows, getArtifactRow, readArtifactCount, upsertArtifactRow, type AgentOsDatabase } from './db.js';
import { ArtifactCreateSchema, ArtifactListQuerySchema, HealthSchema } from './schemas.js';
import { AGENT_OS_ROOT, DATABASE_PATH, MONITORED_OUTPUTS_ROOT, STATE_JSON_PATH, WRITE_AUDIT_LOG_PATH, ensureAgentOsDirectories, type ArtifactCategory } from './paths.js';
import { RealtimeHub } from './events.js';
import { normalizeCategory, validateSecureSandboxPath, writeArtifactFile, computeArtifactId, classifyArtifact } from './filesystem.js';
import * as crypto from 'node:crypto';
import * as fsmod from 'node:fs/promises';
import { startWatcher, writeManagedArtifact, type WatcherContext } from './watcher.js';

const app = Fastify({ logger: true });
const sysEvents = new EventEmitter();
sysEvents.setMaxListeners(100);
const hub = new RealtimeHub(sysEvents);

let database: AgentOsDatabase | null = null;
let watcherHandle: Awaited<ReturnType<typeof startWatcher>> | null = null;

async function ensureStateFiles(): Promise<void> {
  const defaults = {
    firstRun: true,
    agentKey: 'agent-os-local-key',
    jwtSecret: 'change-me-in-production-to-a-random-64-char-string',
    dailyBudgetUsd: 5,
    embeddingModel: 'all-MiniLM-L6-v2',
    pythonBridge: 'python',
    retentionDays: 90
  };

  try {
    await fs.access(STATE_JSON_PATH);
  } catch {
    await fs.writeFile(STATE_JSON_PATH, `${JSON.stringify(defaults, null, 2)}\n`, 'utf8');
  }
}

async function auditWrite(message: string): Promise<void> {
  await fs.mkdir(path.dirname(WRITE_AUDIT_LOG_PATH), { recursive: true });
  await fs.appendFile(WRITE_AUDIT_LOG_PATH, message, 'utf8');
}

function getAgentKey(): string {
  return process.env.AGENTOS_AGENT_KEY ?? 'agent-os-local-key';
}

async function requireAgentAuth(request: { headers: { authorization?: string }; jwtVerify?: () => Promise<void> }, reply: { status: (code: number) => { send: (payload: unknown) => unknown }; send: (payload: unknown) => unknown }) {
  const authorization = request.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'missing_bearer' });
  }

  const token = authorization.slice(7).trim();
  if (token === getAgentKey()) {
    return;
  }

  try {
    await request.jwtVerify?.();
    if (request.jwtVerify) {
      return;
    }
  } catch {
    return reply.status(401).send({ error: 'invalid_token' });
  }

  return reply.status(401).send({ error: 'invalid_token' });
}

async function bootstrap(): Promise<void> {
  await ensureAgentOsDirectories();
  await ensureStateFiles();

  try {
    database = await initializeDatabase(DATABASE_PATH);
  } catch (error) {
    app.log.error({ error }, 'Failed to initialize SQLite database');
    throw error;
  }

  const context: WatcherContext = {
    database,
    hub,
    auditWrite
  };

  watcherHandle = startWatcher(context);

  app.register(cors, {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
  });

  await app.register(websocket);

  await app.register(jwt, {
    secret: process.env.AGENTOS_JWT_SECRET ?? 'change-me-in-production-to-a-random-64-char-string'
  });

  app.get('/api/health', async () => {
    const artifacts = database ? await readArtifactCount(database) : 0;
    const health = {
      status: database ? 'ok' : 'degraded',
      uptime: process.uptime(),
      artifacts,
      database: database ? 'ready' : 'degraded',
      watchRoot: MONITORED_OUTPUTS_ROOT
    } as const;

    return HealthSchema.parse(health);
  });

  app.get('/api/schema', async () => ({
    root: AGENT_OS_ROOT,
    database: DATABASE_PATH,
    monitoredOutputs: MONITORED_OUTPUTS_ROOT
  }));

  app.get('/api/artifacts', async (request) => {
    if (!database) {
      return { items: [] };
    }

    const query = ArtifactListQuerySchema.parse(request.query);
    return {
      items: listArtifactRows(database, query)
    };
  });

  app.get('/api/artifacts/:id', async (request, reply) => {
    if (!database) {
      return reply.status(503).send({ error: 'database_unavailable' });
    }

    const idSchema = z.object({ id: z.string().min(1) });
    const { id } = idSchema.parse(request.params);
    const item = getArtifactRow(database, id);
    if (!item) {
      return reply.status(404).send({ error: 'not_found' });
    }

    return { item };
  });

  app.post('/api/artifacts', { preHandler: requireAgentAuth }, async (request, reply) => {
    if (!database) {
      return reply.status(503).send({ error: 'database_unavailable' });
    }

    const payload = ArtifactCreateSchema.parse(request.body);
    const result = await writeManagedArtifact(context, payload);
    return reply.send({ path: result.path, category: payload.category });
  });

  app.get('/api/events', async (request, reply) => {
    reply.hijack();
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    reply.raw.write(': connected\n\n');

    const heartbeat = setInterval(() => {
      reply.raw.write(': ping\n\n');
    }, 15000);

    hub.subscribeSse({
      write(data: string) {
        reply.raw.write(data);
      },
      end() {
        clearInterval(heartbeat);
        reply.raw.end();
      },
      on(event: 'close', listener: () => void) {
        if (event === 'close') {
          request.raw.on('close', listener);
        }
      }
    });

    request.raw.on('close', () => {
      clearInterval(heartbeat);
      try {
        reply.raw.end();
      } catch {
        // ignore connection teardown failures
      }
    });
  });

  app.get('/ws', { websocket: true }, (connection) => {
    hub.subscribeSocket({
      send(data: string) {
        if (connection.socket.readyState === 1) {
          connection.socket.send(data);
        }
      },
      on(event: 'close', listener: () => void) {
        if (event === 'close') {
          connection.socket.on('close', listener);
        }
      }
    });
  });

  app.addHook('onClose', async () => {
    hub.close();
    if (watcherHandle) {
      await watcherHandle.close();
      watcherHandle = null;
    }
    if (database) {
      database.close();
      database = null;
    }
  });
}

bootstrap()
  .then(async () => {
    const port = Number(process.env.AGENTOS_PORT ?? 3755);
    await app.listen({ host: '127.0.0.1', port });
    app.log.info(`AgentOS backend listening on http://127.0.0.1:${port}`);
    app.log.info(`Watching ${MONITORED_OUTPUTS_ROOT}`);
  })
  .catch((error) => {
    app.log.error(error);
    process.exitCode = 1;
  });

  // V1 atomic artifact writer: accepts absolute filepath restricted to monitored root
  app.post('/api/v1/artifacts', { preHandler: requireAgentAuth }, async (request, reply) => {
    if (!database) return reply.status(503).send({ error: 'database_unavailable' });

    const bodySchema = z.object({ filepath: z.string().min(1), content: z.string().min(1).max(10485760), metadata: z.record(z.unknown()).optional() });
    let body: z.infer<typeof bodySchema>;
    try {
      body = bodySchema.parse(request.body);
    } catch (err) {
      return reply.status(422).send({ type: 'https://example.com/validation', title: 'Validation error', status: 422, detail: 'Invalid request body', validation_errors: (err as any).issues ?? null });
    }

    // validate path containment
    let realPath: string;
    try {
      realPath = validateSecureSandboxPath(body.filepath);
    } catch (err: any) {
      return reply.status(403).send({ type: 'https://example.com/forbidden', title: 'Path outside monitored root', status: 403, detail: err.message });
    }

    // ensure file is under monitored outputs
    if (!realPath.startsWith(MONITORED_OUTPUTS_ROOT)) {
      return reply.status(403).send({ type: 'https://example.com/forbidden', title: 'Path outside monitored root', status: 403, detail: 'Target must be inside monitored-outputs root' });
    }

    // atomic write
    try {
      await writeArtifactFile(realPath, body.content);
    } catch (err: any) {
      app.log.error({ err }, 'atomic write failed');
      return reply.status(500).send({ type: 'https://example.com/error', title: 'Write failed', status: 500, detail: String(err?.message ?? err) });
    }

    // compute metadata and upsert DB
    try {
      const stat = await fsmod.stat(realPath);
      const artifactId = computeArtifactId(realPath);
      const relativePath = realPath.replace(MONITORED_OUTPUTS_ROOT, '').replace(/^\\+|^\//, '');

      const category = classifyArtifact(realPath);
      await upsertArtifactRow(database, {
        id: artifactId,
        path: relativePath,
        category,
        size: stat.size,
        summary: body.content.slice(0, 200),
        createdAt: stat.birthtime.toISOString(),
        updatedAt: stat.mtime.toISOString(),
        metadataJson: JSON.stringify(body.metadata ?? null)
      });

      // publish event
      hub.publish('artifact:created', { id: artifactId, path: relativePath, category: 'snippets', size: stat.size, summary: body.content.slice(0, 200), createdAt: stat.birthtime.toISOString() });

      const checksum = crypto.createHash('md5').update(body.content).digest('hex');
      return reply.status(201).send({ success: true, artifact_id: `art_${artifactId}`, filepath: realPath, size_bytes: stat.size, checksum, created_at: stat.birthtime.toISOString() });
    } catch (err: any) {
      app.log.error({ err }, 'post-write DB upsert failed');
      return reply.status(500).send({ type: 'https://example.com/error', title: 'DB error', status: 500, detail: String(err?.message ?? err) });
    }
  });