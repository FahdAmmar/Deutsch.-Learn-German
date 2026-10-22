import { z } from 'zod'

import { CEFR_LEVELS, EXERCISE_TYPES } from '@/types'

import { sanitizeStoredTexts } from './myText/validate'
import { spellingProgressSchema } from './spellingSchema'

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

const answerCounterSchema = z.object({ attempts: z.number(), correct: z.number() })

const learningStatsSchema = z.object({
  days: z.record(z.string(), answerCounterSchema),
  byType: z.partialRecord(z.enum(EXERCISE_TYPES), answerCounterSchema),
  byModule: z.record(z.string(), answerCounterSchema),
})

const progressStateSchema = z.object({
  currentLevel: z.enum(CEFR_LEVELS),
  currentModuleId: z.string().nullable(),
  currentLessonId: z.string().nullable(),
  lessons: z.record(z.string(), lessonProgressSchema),
  vocabulary: z.record(z.string(), vocabularyProgressSchema),
  activity: z.array(activityEntrySchema),
  // Optional so files exported before hand-saved words existed can still be imported.
  savedVocabularyIds: z.array(z.string()).optional(),
  streakDays: z.number(),
  lastActivityDate: z.string().nullable(),
})

const dictationProgressSchema = z.object({
  storyId: z.string(),
  level: z.enum(CEFR_LEVELS),
  completed: z.boolean(),
  bestAccuracy: z.number(),
  bestWpm: z.number(),
  attempts: z.number(),
  lastPlayedAt: z.number(),
})

const grammarRuleProgressSchema = z.object({
  number: z.number(),
  completed: z.boolean(),
  bestAccuracy: z.number(),
  attempts: z.number(),
  lastVisitedAt: z.number(),
})

const storyQuizProgressSchema = z.object({
  storyId: z.string(),
  level: z.enum(CEFR_LEVELS),
  bestAccuracy: z.number(),
  attempts: z.number(),
  lastPlayedAt: z.number(),
})

/**
 * Everything the learner owns besides lesson progress. Every key is optional:
 * a file only replaces the parts it carries, so an older file (or one made
 * before a part existed) never wipes what this device holds for that part.
 */
export const backupExtrasSchema = z.object({
  // One damaged text loses only itself: the entries go through the same validator as storage.
  myTexts: z
    .array(z.unknown())
    .transform((entries) => sanitizeStoredTexts(entries))
    .optional(),
  dictation: z.record(z.string(), dictationProgressSchema).optional(),
  grammar: z.record(z.string(), grammarRuleProgressSchema).optional(),
  storyQuiz: z.record(z.string(), storyQuizProgressSchema).optional(),
  spelling: spellingProgressSchema.optional(),
})

export type BackupExtras = z.infer<typeof backupExtrasSchema>

/**
 * The on-disk shape of an exported progress file. Versioned so a future
 * breaking change to `ProgressState` can be migrated or rejected
 * gracefully instead of silently corrupting the store. New optional parts
 * (`stats`, `extras`) are additive, so they do not need a version bump.
 */
export const progressExportSchema = z.object({
  version: z.literal(1),
  exportedAt: z.number(),
  progress: progressStateSchema,
  // Optional: files exported before learning statistics existed carry none.
  stats: learningStatsSchema.optional(),
  // Optional: files exported before the learner's own texts and the other progress stores were included carry none.
  extras: backupExtrasSchema.optional(),
})

export type ProgressExport = z.infer<typeof progressExportSchema>
