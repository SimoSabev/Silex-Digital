import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const USER_PROFILE = process.env.USERPROFILE ?? 'C:/Users/User';

export const AGENT_OS_ROOT = path.resolve(USER_PROFILE, 'Desktop', 'AgentOS');
export const MONITORED_OUTPUTS_ROOT = path.join(AGENT_OS_ROOT, 'monitored-outputs');
export const INTEGRATIONS_ROOT = path.join(AGENT_OS_ROOT, 'integrations');
export const STATE_ROOT = path.join(AGENT_OS_ROOT, 'state');
export const DATABASE_PATH = path.join(STATE_ROOT, 'agentos.db');
export const STATE_JSON_PATH = path.join(STATE_ROOT, 'state.json');
export const RESUME_JSON_PATH = path.join(STATE_ROOT, 'resume.json');
export const WRITE_AUDIT_LOG_PATH = path.join(STATE_ROOT, 'write-audit.log');

export const ARTIFACT_CATEGORIES = ['html', 'markdown', 'images', 'snippets', 'briefs'] as const;
export type ArtifactCategory = (typeof ARTIFACT_CATEGORIES)[number];

export const CATEGORY_ROOTS: Record<ArtifactCategory, string> = {
  html: path.join(MONITORED_OUTPUTS_ROOT, 'html'),
  markdown: path.join(MONITORED_OUTPUTS_ROOT, 'markdown'),
  images: path.join(MONITORED_OUTPUTS_ROOT, 'images'),
  snippets: path.join(MONITORED_OUTPUTS_ROOT, 'snippets'),
  briefs: path.join(MONITORED_OUTPUTS_ROOT, 'briefs')
};

export async function ensureAgentOsDirectories(): Promise<void> {
  await fs.mkdir(MONITORED_OUTPUTS_ROOT, { recursive: true });
  await fs.mkdir(INTEGRATIONS_ROOT, { recursive: true });
  await fs.mkdir(STATE_ROOT, { recursive: true });

  for (const root of Object.values(CATEGORY_ROOTS)) {
    await fs.mkdir(root, { recursive: true });
  }

  await fs.mkdir(path.join(INTEGRATIONS_ROOT, 'obsidian-vault'), { recursive: true });
  await fs.mkdir(path.join(INTEGRATIONS_ROOT, 'repos'), { recursive: true });
}