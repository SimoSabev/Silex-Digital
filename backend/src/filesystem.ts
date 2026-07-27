import * as crypto from 'node:crypto';
import * as fs from 'node:fs/promises';
import { realpathSync } from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import { ArtifactCategorySchema } from './schemas.js';
import { ARTIFACT_CATEGORIES, CATEGORY_ROOTS, type ArtifactCategory } from './paths.js';
import { MONITORED_OUTPUTS_ROOT } from './paths.js';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif', '.bmp', '.ico']);
const TEXT_EXTENSIONS = new Set(['.md', '.markdown', '.html', '.htm', '.txt', '.json', '.ts', '.tsx', '.js', '.jsx', '.py', '.css', '.scss', '.sh', '.yml', '.yaml', '.toml', '.xml', '.csv']);
const WINDOWS_RESERVED_NAMES = new Set([
  'con',
  'prn',
  'aux',
  'nul',
  'com1',
  'com2',
  'com3',
  'com4',
  'com5',
  'com6',
  'com7',
  'com8',
  'com9',
  'lpt1',
  'lpt2',
  'lpt3',
  'lpt4',
  'lpt5',
  'lpt6',
  'lpt7',
  'lpt8',
  'lpt9'
]);

export const ArtifactMetadataSchema = z.record(z.unknown());

export function classifyArtifact(filePath: string): ArtifactCategory {
  const ext = path.extname(filePath).toLowerCase();
  if (['.md', '.markdown'].includes(ext)) {
    return 'markdown';
  }
  if (['.html', '.htm'].includes(ext)) {
    return 'html';
  }
  if (IMAGE_EXTENSIONS.has(ext)) {
    return 'images';
  }
  if (TEXT_EXTENSIONS.has(ext)) {
    return 'snippets';
  }
  return 'briefs';
}

export function sanitizeFilename(input: string): string {
  const base = path.basename(input).normalize('NFKC');
  const parsed = path.parse(base);
  const safeStem = parsed.name
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/[. ]+$/g, '')
    .trim();
  const safeExtension = parsed.ext.replace(/[<>:"/\\|?*\x00-\x1F]/g, '-');
  const candidate = `${safeStem || 'artifact'}${safeExtension}`.slice(0, 180);
  const lowerStem = (safeStem || 'artifact').toLowerCase();
  return WINDOWS_RESERVED_NAMES.has(lowerStem) ? `_${candidate}` : candidate;
}

export function normalizeCategory(input: string): ArtifactCategory {
  return ArtifactCategorySchema.parse(input);
}

export function resolveArtifactPath(category: ArtifactCategory, filename: string): string {
  return path.join(CATEGORY_ROOTS[category], sanitizeFilename(filename));
}

export function computeArtifactId(absolutePath: string): string {
  // Use MD5 to produce a 32-hex string to match art_[a-f0-9]{32}
  return crypto.createHash('md5').update(path.normalize(absolutePath).toLowerCase()).digest('hex');
}

export function validateSecureSandboxPath(userSuppliedPath: string, workspaceRoot = MONITORED_OUTPUTS_ROOT): string {
  const expanded = path.resolve(userSuppliedPath.replace(/^~(?=$|[\\/])/, process.env.HOME ?? process.env.USERPROFILE ?? ''));
  const realWorkspaceRoot = (() => {
    try {
      return realpathSync(workspaceRoot);
    } catch {
      return workspaceRoot;
    }
  })();

  let realTargetPath: string;
  try {
    realTargetPath = realpathSync(expanded);
  } catch {
    realTargetPath = path.resolve(expanded);
  }

  const normalizedRoot = path.normalize(realWorkspaceRoot + path.sep);
  const normalizedTarget = path.normalize(realTargetPath + path.sep);
  if (!(normalizedTarget.startsWith(normalizedRoot) || normalizedTarget === normalizedRoot)) {
    throw new Error(`Security Violation: path '${realTargetPath}' is outside workspace root '${realWorkspaceRoot}'`);
  }

  return realTargetPath;
}

export function makeRelativeArtifactPath(absolutePath: string): string {
  return path.relative(path.resolve(process.env.USERPROFILE ?? 'C:/Users/User', 'Desktop', 'AgentOS', 'monitored-outputs'), absolutePath).replace(/\\/g, '/');
}

export function summarizeText(content: string, maxWords = 14): string {
  const normalized = content.replace(/\s+/g, ' ').trim();
  if (normalized.length === 0) {
    return 'Empty artifact';
  }

  const words = normalized.split(' ').filter(Boolean);
  const summary = words.slice(0, maxWords).join(' ');
  return words.length > maxWords ? `${summary}…` : summary;
}

export function createArtifactSummary(category: ArtifactCategory, content: Buffer, filePath: string): string {
  if (IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()) || category === 'images') {
    return `Image asset ${content.byteLength.toLocaleString('en-US')} bytes`;
  }

  return summarizeText(content.toString('utf8'));
}

export async function readFileWithRetry(filePath: string, attempts = 5): Promise<Buffer> {
  let lastError: unknown;

  for (let index = 0; index < attempts; index += 1) {
    try {
      return await fs.readFile(filePath);
    } catch (error) {
      lastError = error;
      const code = error instanceof NodeJS.ErrnoException ? error.code : undefined;
      const retryable = code === 'EBUSY' || code === 'EPERM' || code === 'EMFILE' || code === 'ENFILE';

      if (!retryable || index === attempts - 1) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 75 * (index + 1)));
    }
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Unable to read ${filePath}: ${message}`);
}

export function isValidArtifactCategory(value: string): value is ArtifactCategory {
  return ARTIFACT_CATEGORIES.includes(value as ArtifactCategory);
}

export async function writeArtifactFile(targetPath: string, content: string | Buffer): Promise<void> {
  const dir = path.dirname(targetPath);
  await fs.mkdir(dir, { recursive: true });

  const tempName = `.tmp_${crypto.randomBytes(8).toString('hex')}`;
  const tempPath = path.join(dir, tempName);

  try {
    // Write to temp file
    await fs.writeFile(tempPath, content, { encoding: typeof content === 'string' ? 'utf8' : undefined });

    // Open and fsync to flush to disk
    const handle = await fs.open(tempPath, 'r');
    try {
      await handle.sync();
    } finally {
      await handle.close();
    }

    // Atomic rename
    await fs.rename(tempPath, targetPath);
  } catch (err) {
    // Cleanup
    try {
      await fs.unlink(tempPath).catch(() => undefined);
    } catch {}
    throw err;
  }
}