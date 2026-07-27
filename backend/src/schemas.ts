import { z } from 'zod';
import { ARTIFACT_CATEGORIES } from './paths.js';

export const ArtifactCategorySchema = z.enum(ARTIFACT_CATEGORIES);

export const ArtifactEventSchema = z.object({
  id: z.string().min(1),
  path: z.string().min(1),
  category: ArtifactCategorySchema,
  size: z.number().int().nonnegative(),
  summary: z.string().min(1),
  createdAt: z.string().datetime()
});

export const ArtifactCreateSchema = z.object({
  category: ArtifactCategorySchema,
  filename: z.string().min(1),
  content: z.string().min(1).max(10485760), // 10 MB cap
  summary: z.string().min(1).optional(),
  metadata: z.record(z.unknown()).optional()
});

export const ArtifactListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(250).default(50),
  category: ArtifactCategorySchema.optional(),
  q: z.string().trim().min(1).optional()
});

export const HealthSchema = z.object({
  status: z.enum(['ok', 'degraded']),
  uptime: z.number().nonnegative(),
  artifacts: z.number().int().nonnegative(),
  database: z.enum(['ready', 'degraded']),
  watchRoot: z.string()
});

export type ArtifactEvent = z.infer<typeof ArtifactEventSchema>;
export type ArtifactCreateInput = z.infer<typeof ArtifactCreateSchema>;
export type ArtifactListQuery = z.infer<typeof ArtifactListQuerySchema>;