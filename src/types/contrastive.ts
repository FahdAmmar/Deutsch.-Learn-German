/**
 * A point where Arabic and German differ in a way that trips up an Arabic-speaking learner: a sentence
 * pattern that has no counterpart, or a sound Arabic does not have. Content, not UI.
 */
export interface ContrastiveNote {
  id: string
  /** The lessons where the note belongs; it appears in each of them. */
  lessonIds: readonly string[]
  titleAr: string
  /** What differs and what to do about it, in Arabic. */
  bodyAr: string
  /** The slip an Arabic speaker makes, and the German that is right. Shown as a wrong/right pair. */
  wrong?: string
  correct?: string
  /** German words that show the point, each one pronounceable; contrasting words are listed next to each other. */
  examples?: readonly string[]
}
