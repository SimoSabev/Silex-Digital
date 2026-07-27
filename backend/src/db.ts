import Database from 'better-sqlite3';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { DATABASE_PATH } from './paths.js';

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS artifacts (
    id TEXT PRIMARY KEY,
    path TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    size INTEGER NOT NULL DEFAULT 0,
    summary TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    metadata_json TEXT
  );

  CREATE TABLE IF NOT EXISTS cost_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ts TEXT NOT NULL,
    provider TEXT NOT NULL,
    model TEXT NOT NULL,
    promptTokens INTEGER NOT NULL DEFAULT 0,
    completionTokens INTEGER NOT NULL DEFAULT 0,
    cacheReadTokens INTEGER,
    usd REAL NOT NULL DEFAULT 0,
    trajectoryId TEXT
  );

  CREATE TABLE IF NOT EXISTS trajectories (
    id TEXT PRIMARY KEY,
    session_id TEXT,
    started_at TEXT,
    ended_at TEXT,
    turns INTEGER NOT NULL DEFAULT 0,
    final_cost_usd REAL NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'in_progress'
  );

  CREATE TABLE IF NOT EXISTS graph_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo TEXT NOT NULL,
    path TEXT NOT NULL,
    language TEXT,
    mtime TEXT
  );

  CREATE TABLE IF NOT EXISTS graph_symbols (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fileId INTEGER NOT NULL REFERENCES graph_files(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    kind TEXT,
    startLine INTEGER,
    endLine INTEGER
  );

  CREATE TABLE IF NOT EXISTS graph_refs (
    fromId INTEGER NOT NULL REFERENCES graph_symbols(id) ON DELETE CASCADE,
    toId INTEGER NOT NULL REFERENCES graph_symbols(id) ON DELETE CASCADE,
    PRIMARY KEY (fromId, toId)
  );

  CREATE VIRTUAL TABLE IF NOT EXISTS artifacts_fts USING fts5(artifact_id, path, summary);
`;

export type AgentOsDatabase = Awaited<ReturnType<typeof initializeDatabase>>;

async function openDatabaseWithRetry(databasePath: string): Promise<Database.Database> {
  await fs.mkdir(path.dirname(databasePath), { recursive: true });

  const attempts = [0, 150, 350];
  let lastError: unknown;

  for (const delay of attempts) {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    try {
      return new Database(databasePath);
    } catch (error) {
      lastError = error;
    }
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Failed to open SQLite database at ${databasePath}: ${message}`);
}

export async function initializeDatabase(databasePath = DATABASE_PATH): Promise<Database.Database> {
  const database = await openDatabaseWithRetry(databasePath);

  try {
    database.pragma('journal_mode = WAL');
    database.pragma('foreign_keys = ON');
    database.pragma('synchronous = NORMAL');
    database.pragma('busy_timeout = 5000');
    database.exec(SCHEMA_SQL);
  } catch (error) {
    try {
      database.close();
    } catch {
      // Ignore close failures during bootstrap teardown.
    }

    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`SQLite bootstrap failed for ${databasePath}: ${message}`);
  }

  return database;
}

export async function readArtifactCount(database: Database.Database): Promise<number> {
  const row = database.prepare('SELECT COUNT(*) as count FROM artifacts').get() as { count?: number } | undefined;
  return row?.count ?? 0;
}

export async function upsertArtifactRow(
  database: Database.Database,
  artifact: {
    id: string;
    path: string;
    category: string;
    size: number;
    summary: string;
    createdAt: string;
    updatedAt: string;
    metadataJson?: string | null;
  }
): Promise<void> {
  const statement = database.prepare(
    `
      INSERT INTO artifacts (id, path, category, size, summary, created_at, updated_at, metadata_json)
      VALUES (@id, @path, @category, @size, @summary, @createdAt, @updatedAt, @metadataJson)
      ON CONFLICT(path) DO UPDATE SET
        category = excluded.category,
        size = excluded.size,
        summary = excluded.summary,
        updated_at = excluded.updated_at,
        metadata_json = excluded.metadata_json
    `
  );

  statement.run(artifact);
  database
    .prepare(
      `
        INSERT OR REPLACE INTO artifacts_fts (artifact_id, path, summary)
        VALUES (?, ?, ?)
      `
    )
    .run(artifact.id, artifact.path, artifact.summary);
}

export function deleteArtifactRow(database: Database.Database, artifactPath: string): void {
  const row = database.prepare('SELECT id FROM artifacts WHERE path = ? LIMIT 1').get(artifactPath) as { id?: string } | undefined;
  if (row?.id) {
    database.prepare('DELETE FROM artifacts_fts WHERE artifact_id = ?').run(row.id);
  }

  database.prepare('DELETE FROM artifacts WHERE path = ?').run(artifactPath);
}

export function listArtifactRows(
  database: Database.Database,
  options: { limit: number; category?: string; q?: string }
): Array<Record<string, unknown>> {
  const clauses: string[] = [];
  const values: Array<string | number> = [];

  if (options.category) {
    clauses.push('category = ?');
    values.push(options.category);
  }

  if (options.q) {
    clauses.push('(path LIKE ? OR summary LIKE ?)');
    values.push(`%${options.q}%`, `%${options.q}%`);
  }

  const where = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
  return database
    .prepare(
      `
        SELECT id, path, category, size, summary, created_at as createdAt, updated_at as updatedAt, metadata_json as metadataJson
        FROM artifacts
        ${where}
        ORDER BY updated_at DESC
        LIMIT ?
      `
    )
    .all(...values, options.limit) as Array<Record<string, unknown>>;
}

export function getArtifactRow(database: Database.Database, id: string): Record<string, unknown> | undefined {
  return database
    .prepare(
      `
        SELECT id, path, category, size, summary, created_at as createdAt, updated_at as updatedAt, metadata_json as metadataJson
        FROM artifacts
        WHERE id = ?
        LIMIT 1
      `
    )
    .get(id) as Record<string, unknown> | undefined;
}