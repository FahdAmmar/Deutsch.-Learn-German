import type { CEFRLevel } from './cefr'
import type { StoryImage } from './media'

export interface ReadingParagraph {
  de: string
  /** Arabic explanation of the whole paragraph. */
  ar: string
  /**
   * Arabic for each sentence, in the order `splitSentences(de)` yields them.
   * Lets dictation show a translation under every sentence; the
   * content-integrity suite checks the counts match.
   */
  sentencesAr?: string[]
}

/**
 * A short, standalone bilingual reading passage: German prose paragraphs,
 * each paired with an Arabic explanation of the same paragraph. Distinct
 * from `Lesson` — a reading text isn't tied to a specific grammar point or
 * exercise set, it's level-wide extra-reading content (listed with the
 * conversations in the level page's "texts & conversations" tab).
 */
export interface ReadingText {
  id: string
  slug: string
  level: CEFRLevel
  titleDe: string
  titleAr: string
  /** Short topic label in German, matching the vocabulary `category` convention (e.g. "Vorstellung"). */
  category: string
  estimatedMinutes: number
  paragraphs: ReadingParagraph[]
  image?: StoryImage
}
