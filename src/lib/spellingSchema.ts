import { z } from 'zod'

const SPELLING_KIND_VALUES = ['umlaut', 'eszett', 'ie-ei', 'double-consonant', 'capital', 'other'] as const

const weakWordSchema = z.object({
  count: z.number().int().positive(),
  lastAt: z.number(),
  kind: z.enum(SPELLING_KIND_VALUES),
})

/** What is kept of a learner's spelling mistakes: how often each kind, and the words they stumble on. */
export const spellingProgressSchema = z.object({
  kinds: z.partialRecord(z.enum(SPELLING_KIND_VALUES), z.number().int().nonnegative()),
  words: z.record(z.string().min(1).max(60), weakWordSchema),
})

export type SpellingProgress = z.infer<typeof spellingProgressSchema>
export type WeakWord = z.infer<typeof weakWordSchema>
