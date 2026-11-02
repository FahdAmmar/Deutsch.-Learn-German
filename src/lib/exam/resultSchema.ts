import { z } from 'zod'

import type { ExamResult } from '@/types'

const MAX_RESULTS = 100
const SET_ID = /^[a-z0-9-]{1,60}$/

export const examResultSchema = z.object({
  attempts: z.number().int().nonnegative(),
  best: z.number().min(0).max(1),
  last: z.number().min(0).max(1),
  lastAt: z.number(),
})

/** Keeps the valid results of whatever was read from storage or a backup file; a damaged entry loses only itself. */
export function sanitizeExamResults(value: unknown): Record<string, ExamResult> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return {}
  const kept: Record<string, ExamResult> = {}
  for (const [setId, entry] of Object.entries(value).slice(0, MAX_RESULTS)) {
    if (!SET_ID.test(setId)) continue
    const parsed = examResultSchema.safeParse(entry)
    if (parsed.success) kept[setId] = parsed.data
  }
  return kept
}
