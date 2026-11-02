import { z } from 'zod'

import type { WritingDraft } from '@/types'

/** Longest text kept per task. Far beyond any exam-style answer, small enough that storage never fills. */
export const MAX_WRITING_CHARS = 3000
/** Most tasks kept at once, so a damaged or hand-edited file cannot grow storage without bound. */
const MAX_DRAFTS = 200

const TASK_ID = /^[a-z0-9-]{1,60}$/

export const writingDraftSchema = z.object({
  text: z.string().transform((text) => text.slice(0, MAX_WRITING_CHARS)),
  updatedAt: z.number(),
  completed: z.boolean(),
  confirmedPointIds: z.array(z.string().max(40)).max(20),
})

/**
 * Keeps the valid drafts of whatever was read from storage or a backup file and drops the rest, so one damaged
 * entry loses only itself. Anything that is not an object gives an empty record.
 */
export function sanitizeWritingDrafts(value: unknown): Record<string, WritingDraft> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return {}
  const kept: Record<string, WritingDraft> = {}
  for (const [taskId, entry] of Object.entries(value).slice(0, MAX_DRAFTS)) {
    if (!TASK_ID.test(taskId)) continue
    const parsed = writingDraftSchema.safeParse(entry)
    if (parsed.success) kept[taskId] = parsed.data
  }
  return kept
}
