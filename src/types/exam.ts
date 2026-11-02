import type { CEFRLevel } from './cefr'

/** The two receptive parts that can be marked automatically. Writing has its own section (guided writing). */
export type ExamPart = 'lesen' | 'hoeren'

interface ExamItemBase {
  id: string
  /** Why the answer is what it is, with the German phrase that decides it. Shown after submitting. */
  explanationAr: string
}

/** "richtig" or "falsch": the statement is true or false according to the text or recording. */
export interface ExamTrueFalseItem extends ExamItemBase {
  kind: 'true-false'
  statementDe: string
  isTrue: boolean
}

export interface ExamChoiceItem extends ExamItemBase {
  kind: 'choice'
  questionDe: string
  options: string[]
  correctIndex: number
}

export type ExamItem = ExamTrueFalseItem | ExamChoiceItem

/** One text or one recording with its questions. */
export interface ExamTask {
  id: string
  titleAr: string
  /** What kind of text it is, in German (Schild, E-Mail, Anzeige, Durchsage …). */
  kindDe: string
  /** The text to read (Lesen). */
  textDe?: string
  /** The text the speech service reads aloud (Hören). It is also shown after submitting, so the learner can check what was said. */
  audioDe?: string
  items: ExamItem[]
}

export interface ExamSet {
  id: string
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  part: ExamPart
  titleAr: string
  descriptionAr: string
  /** A suggested time for the set. A target for practice, not an official limit. */
  suggestedMinutes: number
  tasks: ExamTask[]
}

/** What the learner got on a set, kept on this device. */
export interface ExamResult {
  attempts: number
  /** 0–1. */
  best: number
  /** 0–1. */
  last: number
  lastAt: number
}
