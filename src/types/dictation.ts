import type { CEFRLevel } from './cefr'

/** Best result so far of the letter-by-letter dictation of one story or conversation. */
export interface DictationProgress {
  storyId: string
  level: CEFRLevel
  /** Sticky: once a story has been typed through to the end it stays completed. */
  completed: boolean
  /** 0–1. Only ever goes up. */
  bestAccuracy: number
  /** Words per minute of the fastest finished run. */
  bestWpm: number
  /** Finished runs. */
  attempts: number
  lastPlayedAt: number
}

/** One part of a text to be typed. `ar` and `pitch` are optional: a learner's own text has no translation. */
export interface DictationSegmentSource {
  text: string
  ar?: string
  pitch?: number
}

/**
 * What the dictation screen needs from a text, wherever it comes from — a
 * lesson story or a text the learner wrote — so the screen depends on this
 * and not on the story model.
 */
export interface DictationSource {
  id: string
  titleDe: string
  segments: readonly DictationSegmentSource[]
}

/**
 * How much help a dictation gives, from copying a text letter by letter to typing it from memory.
 * A learner moves up as they pass each one.
 */
export type PracticeStage = 'copy' | 'cloze' | 'initials' | 'memory'

export const PRACTICE_STAGES: readonly PracticeStage[] = ['copy', 'cloze', 'initials', 'memory']

export type SpellingKind = 'umlaut' | 'eszett' | 'ie-ei' | 'double-consonant' | 'capital' | 'other'

/** One mistyped letter, read as the spelling pattern it belongs to. */
export interface SpellingSlip {
  kind: SpellingKind
  /** The whole word the mistake was in, as it should be written. */
  word: string
  expected: string
  typed: string
}

/** How a finished run went; the owner of the text decides where to save it. */
export interface FinishedDictationRun {
  /** 0–1. */
  accuracy: number
  wpm: number
  /** The mistyped letters of the whole run, classified; absent when the run does not carry them. */
  slips?: readonly SpellingSlip[]
}
