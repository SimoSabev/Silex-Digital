import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import chokidar from 'chokidar';
import type Database from 'better-sqlite3';
import { deleteArtifactRow, upsertArtifactRow } from './db.js';
import { computeArtifactId, createArtifactSummary, makeRelativeArtifactPath, normalizeCategory, readFileWithRetry, resolveArtifactPath, sanitizeFilename, writeArtifactFile } from './filesystem.js';
import { ArtifactCategorySchema } from './schemas.js';
import { CATEGORY_ROOTS, MONITORED_OUTPUTS_ROOT, type ArtifactCategory } from './paths.js';
import type { RealtimeHub } from './events.js';

export type WatcherContext = {
  database: Database.Database;
  hub: RealtimeHub;
  auditWrite(message: string): Promise<void>;
};

const IGNORED_PATTERN = /(^|[\\/])\.(?!well-known)|(^|[\\/])(node_modules|\.git|\.next)([\\/]|$)|(^|[\\/])\.tmp_[0-9a-f]+/i;

function isAllowedWatchTarget(absolutePath: string): boolean {
  const normalized = path.normalize(absolutePath);
  return normalized.startsWith(path.normalize(MONITORED_OUTPUTS_ROOT));
}

async function ingestFile(database: Database.Database, hub: RealtimeHub, filePath: string, category: ArtifactCategory): Promise<void> {
  const buffer = await readFileWithRetry(filePath);
  const stat = await fs.stat(filePath);
  const relativePath = makeRelativeArtifactPath(filePath).replace(/^\/+/, '');
  const artifactId = computeArtifactId(filePath);
  const summary = createArtifactSummary(category, buffer, filePath);

  await upsertArtifactRow(database, {
    id: artifactId,
    path: relativePath,
    category,
    size: stat.size,
    summary,
    createdAt: stat.birthtime.toISOString(),
    updatedAt: stat.mtime.toISOString(),
    metadataJson: null
  });

  hub.publish('artifact:created', {
    id: artifactId,
    path: relativePath,
    category,
    size: stat.size,
    summary,
    createdAt: stat.birthtime.toISOString()
  });
}

async function updateFile(database: Database.Database, hub: RealtimeHub, filePath: string, category: ArtifactCategory): Promise<void> {
  const buffer = await readFileWithRetry(filePath);
  const stat = await fs.stat(filePath);
  const relativePath = makeRelativeArtifactPath(filePath).replace(/^\/+/, '');
  const artifactId = computeArtifactId(filePath);
  const summary = createArtifactSummary(category, buffer, filePath);

  await upsertArtifactRow(database, {
    id: artifactId,
    path: relativePath,
    category,
    size: stat.size,
    summary,
    createdAt: stat.birthtime.toISOString(),
    updatedAt: stat.mtime.toISOString(),
    metadataJson: null
  });

  hub.publish('artifact:updated', {
    id: artifactId,
    path: relativePath,
    category,
    size: stat.size,
    summary,
    updatedAt: stat.mtime.toISOString()
  });
}

async function removeFile(database: Database.Database, hub: RealtimeHub, filePath: string): Promise<void> {
  const relativePath = makeRelativeArtifactPath(filePath).replace(/^\/+/, '');
  deleteArtifactRow(database, relativePath);
  hub.publish('artifact:deleted', {
    id: computeArtifactId(filePath),
    path: relativePath
  });
}

export async function writeManagedArtifact(
  context: WatcherContext,
  input: {
    category: string;
    filename: string;
    content: string | Buffer;
    metadata?: Record<string, unknown>;
  }
): Promise<{ path: string }> {
  const category = normalizeCategory(input.category);
  const safeFilename = sanitizeFilename(input.filename);
  const targetPath = resolveArtifactPath(category, safeFilename);

  await writeArtifactFile(targetPath, input.content);
  await context.auditWrite(
    `${JSON.stringify({
      ts: new Date().toISOString(),
      action: 'write',
      category,
      filename: safeFilename,
      path: targetPath,
      metadata: input.metadata ?? null
    })}\n`
  );

  return { path: targetPath };
}

export function startWatcher(context: WatcherContext): chokidar.FSWatcher {
  const watcher = chokidar.watch(Object.values(CATEGORY_ROOTS), {
    ignored: IGNORED_PATTERN,
    ignoreInitial: false,
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100
    },
    depth: 4,
    followSymlinks: false,
    disableGlobbing: false
  });

  watcher.on('add', async (absolutePath) => {
    if (!isAllowedWatchTarget(absolutePath)) {
      return;
    }

    const category = path.basename(path.dirname(absolutePath));
    if (!ArtifactCategorySchema.safeParse(category).success) {
      return;
    }

    try {
      await ingestFile(context.database, context.hub, absolutePath, category as ArtifactCategory);
    } catch (error) {
      context.hub.publish('artifact:error', {
        action: 'add',
        path: absolutePath,
        message: error instanceof Error ? error.message : String(error)
      });
    }
  });

  watcher.on('change', async (absolutePath) => {
    if (!isAllowedWatchTarget(absolutePath)) {
      return;
    }

    const category = path.basename(path.dirname(absolutePath));
    if (!ArtifactCategorySchema.safeParse(category).success) {
      return;
    }

    try {
      await updateFile(context.database, context.hub, absolutePath, category as ArtifactCategory);
    } catch (error) {
      context.hub.publish('artifact:error', {
        action: 'change',
        path: absolutePath,
        message: error instanceof Error ? error.message : String(error)
      });
    }
  });

  watcher.on('unlink', async (absolutePath) => {
    if (!isAllowedWatchTarget(absolutePath)) {
      return;
    }

    try {
      await removeFile(context.database, context.hub, absolutePath);
    } catch (error) {
      context.hub.publish('artifact:error', {
        action: 'unlink',
        path: absolutePath,
        message: error instanceof Error ? error.message : String(error)
      });
    }
  });

  return watcher;
}