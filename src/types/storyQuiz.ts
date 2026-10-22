import type { CEFRLevel } from './cefr'

/** Best result so far of the comprehension quiz built from one story or conversation. */
export interface StoryQuizProgress {
  storyId: string
  level: CEFRLevel
  /** 0–1. Only ever goes up. */
  bestAccuracy: number
  /** Finished runs. */
  attempts: number
  lastPlayedAt: number
}
