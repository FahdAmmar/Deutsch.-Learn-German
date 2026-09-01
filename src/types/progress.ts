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
  /** Consecutive days with at least one completed lesson or exercise. */
  streakDays: number
  lastActivityDate: string | null
}
