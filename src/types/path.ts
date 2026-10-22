import type { CEFRLevel } from './cefr'

/**
 * Which illustration opens a chapter. Each one is a small interactive piece
 * that previews what the chapter teaches (tappable letters, a week strip and
 * clock, a colour-coded sentence). `phrase` shows one model sentence and
 * `none` shows nothing (used for levels whose path is derived from modules).
 */
export type ChapterVisualKind = 'letters' | 'time' | 'sentence' | 'phrase' | 'none'

export interface PathChapter {
  id: string
  titleAr: string
  titleDe: string
  /** One line, in Arabic: what the learner can do once the chapter is finished. */
  goalAr: string
  visual: ChapterVisualKind
  /** Model sentence for the `phrase` visual. */
  sample?: { de: string; ar: string }
  /** Lessons in learning order. Lessons themselves stay in their modules; this only sequences them. */
  lessonIds: string[]
}

export interface LevelPath {
  level: CEFRLevel
  chapters: PathChapter[]
}
