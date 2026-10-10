import { z } from 'zod'

import { CEFR_LEVELS } from '@/types'

const lessonProgressSchema = z.object({
  lessonId: z.string(),
  completed: z.boolean(),
  accuracy: z.number(),
  completedAt: z.number().optional(),
  lastVisitedAt: z.number(),
})

const vocabularyProgressSchema = z.object({
  vocabularyId: z.string(),
  timesReviewed: z.number(),
  timesCorrect: z.number(),
  lastReviewedAt: z.number(),
  // Optional so files exported before spaced repetition was added can still be imported.
  boxLevel: z.number().optional(),
  nextReviewAt: z.number().optional(),
})

const activityEntrySchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  type: z.enum(['lesson-completed', 'lesson-started', 'exercise-completed']),
  timestamp: z.number(),
})

const progressStateSchema = z.object({
  currentLevel: z.enum(CEFR_LEVELS),
  currentModuleId: z.string().nullable(),
  currentLessonId: z.string().nullable(),
  lessons: z.record(z.string(), lessonProgressSchema),
  vocabulary: z.record(z.string(), vocabularyProgressSchema),
  activity: z.array(activityEntrySchema),
  streakDays: z.number(),
  lastActivityDate: z.string().nullable(),
})

/**
 * The on-disk shape of an exported progress file. Versioned so a future
 * breaking change to `ProgressState` can be migrated or rejected
 * gracefully instead of silently corrupting the store.
 */
export const progressExportSchema = z.object({
  version: z.literal(1),
  exportedAt: z.number(),
  progress: progressStateSchema,
})

export type ProgressExport = z.infer<typeof progressExportSchema>
