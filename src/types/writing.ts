import type { CEFRLevel } from './cefr'

/** Who the learner writes to: it decides the greeting and the closing the checker looks for. */
export type WritingRegister = 'informal' | 'formal'

export interface WritingPoint {
  id: string
  /** What the text must say, in Arabic. */
  textAr: string
  /** The same point as the German exam-style prompt (a keyword with a question), shown to get the learner thinking in German. */
  promptDe: string
  /**
   * Regular expressions (as source strings) that mean the learner touched this point. They are matched
   * against the learner's text after `normalizeForMatch` (lower case, ä→ae, ö→oe, ü→ue, ß→ss), so they
   * are written without umlauts. They only help: a miss is shown as "not found", never as an error.
   */
  patterns: string[]
}

export interface WritingPhrase {
  de: string
  ar: string
}

export interface WritingTask {
  id: string
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  register: WritingRegister
  titleAr: string
  titleDe: string
  /** The situation, in German as an exam would give it. */
  situationDe: string
  /** The same situation explained in Arabic. */
  situationAr: string
  /** Suggested minimum length. A target for the learner, not an official requirement. */
  minWords: number
  points: WritingPoint[]
  usefulPhrases: WritingPhrase[]
  /** One good answer. Not the only one: the learner compares, they do not copy. */
  modelAnswer: string
  modelAnswerAr: string
}

/** What the learner has written for one task, kept on this device. */
export interface WritingDraft {
  text: string
  updatedAt: number
  /** The learner marked the task as done. */
  completed: boolean
  /** Points the learner confirmed by hand because the checker did not find them. */
  confirmedPointIds: string[]
}
