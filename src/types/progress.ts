import type { CEFRLevel } from './cefr'

export interface LessonProgress {
  lessonId: string
  completed: boolean
  /** 0–1, based on exercises answered correctly on the most recent attempt. */
  accuracy: number
  completedAt?: number
  lastVisitedAt: number
}

export interface VocabularyProgress {
  vocabularyId: string
  /** Number of times reviewed. */
  timesReviewed: number
  /** Number of times answered correctly in a vocab-recall exercise. */
  timesCorrect: number
  lastReviewedAt: number
  /**
   * Leitner box level (0–4): higher means better-retained, reviewed less
   * often. Absent on progress data persisted before spaced repetition was
   * added, or on imported files from before that point — always read with
   * a `?? 0` fallback rather than assuming it exists.
   */
  boxLevel?: number
  /** Timestamp this item next becomes due for review. Absent for the same reason as `boxLevel`. */
  nextReviewAt?: number
}

export interface ActivityEntry {
  id: string
  lessonId: string
  type: 'lesson-completed' | 'lesson-started' | 'exercise-completed'
  timestamp: number
}

export interface ProgressState {
  currentLevel: CEFRLevel
  currentModuleId: string | null
  currentLessonId: string | null
  lessons: Record<string, LessonProgress>
  vocabulary: Record<string, VocabularyProgress>
  activity: ActivityEntry[]
  /**
   * Words the learner added to spaced review by hand, from the vocabulary page,
   * besides the ones that arrive by completing lessons. Absent on data saved
   * before this existed — always read with a `?? []` fallback.
   */
  savedVocabularyIds?: string[]
  /** Consecutive days with at least one completed lesson or exercise. */
  streakDays: number
  lastActivityDate: string | null
}
