import type { PracticeStage } from './dictation'

/** How the learner's text is cut into parts. */
export type SplitMode = 'sentences' | 'phrases' | 'lines'

export const SPLIT_MODES: readonly SplitMode[] = ['sentences', 'phrases', 'lines']

/** A German text the learner entered to memorise and practise as a dictation. */
export interface MyText {
  id: string
  title: string
  text: string
  mode: SplitMode
  /** Longest part, in words, when `mode` is `phrases`. */
  maxWords: number
  createdAt: number
  updatedAt: number
  /** Finished dictation runs. */
  attempts: number
  /** 0–1. Only ever goes up; 0 until the text has been finished once. */
  bestAccuracy: number
  bestWpm: number
  lastPlayedAt: number | null
  /** The stage the learner has reached; a pass at it moves them to the next. */
  stage: PracticeStage
  /** Review box 0–4: how many times in a row the text was recalled from memory. Sets the next due date. */
  box: number
  /** When the text is due for review from memory; null until it has been passed from memory once. */
  dueAt: number | null
}
