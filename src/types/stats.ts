import type { ExerciseType } from './exercise'

/** How many questions were answered, and how many of those correctly. */
export interface AnswerCounter {
  attempts: number
  correct: number
}

/**
 * Long-lived learning statistics, kept apart from `ProgressState` (which is
 * about *what is done*) because these describe *how it went*: they feed the
 * activity heatmap, the daily goal, and the accuracy breakdowns.
 */
export interface LearningStats {
  /** Answers per local calendar day, keyed `YYYY-MM-DD`. Trimmed to the most recent days. */
  days: Record<string, AnswerCounter>
  /** Lifetime accuracy per exercise type. */
  byType: Partial<Record<ExerciseType, AnswerCounter>>
  /** Lifetime accuracy per module (the topic a lesson belongs to). */
  byModule: Record<string, AnswerCounter>
}
