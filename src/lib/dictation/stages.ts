import type { PracticeStage } from '@/types'

import type { GivenWords } from './engine'

/**
 * The stages of learning a text by dictation. Pure — no React.
 *
 * Copying is where it starts, and each stage takes away a help: first some of the words are given and the
 * learner types the rest (cloze), then only the first letters stay on screen, then nothing does. A learner
 * moves up by passing a stage; passing the last one from memory schedules the text for review.
 */

export const STAGE_TITLE_AR: Record<PracticeStage, string> = {
  copy: 'نسخ',
  cloze: 'إكمال الفراغات',
  initials: 'الحروف الأولى',
  memory: 'من الذاكرة',
}

export const STAGE_DESCRIPTION_AR: Record<PracticeStage, string> = {
  copy: 'ترى النص وتسمعه، وتكتبه حرفاً حرفاً.',
  cloze: 'تُعطى نصف الكلمات، وتكتب الباقي بعد أن تسمعه.',
  initials: 'لا يظهر من كل كلمة إلا حرفها الأول.',
  memory: 'لا يظهر شيء ولا يُقرأ النص تلقائياً. اكتبه من ذاكرتك، واطلب السماع عند الحاجة.',
}

/** A run at or above this passes the stage. */
export const PASS_ACCURACY = 0.9

/** Days until a text is due again, by review box. */
export const REVIEW_DAYS: readonly number[] = [1, 3, 7, 14, 30]
export const MAX_BOX = REVIEW_DAYS.length - 1

const DAY_MS = 24 * 60 * 60 * 1000

const ORDER: readonly PracticeStage[] = ['copy', 'cloze', 'initials', 'memory']

export function nextStage(stage: PracticeStage): PracticeStage {
  return ORDER[Math.min(ORDER.indexOf(stage) + 1, ORDER.length - 1)]
}

export function isLastStage(stage: PracticeStage): boolean {
  return stage === ORDER[ORDER.length - 1]
}

const WORD = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu

/**
 * The words shown in the cloze stage: every other one, starting with the first. A one-word part has none given,
 * because a part with nothing left to type would be passed for free.
 */
export const clozeGiven: GivenWords = (text) => {
  const words = text.match(WORD)?.length ?? 0
  if (words < 2) return new Set()
  return new Set(Array.from({ length: words }, (_, index) => index).filter((index) => index % 2 === 0))
}

export interface StagePlan {
  given?: GivenWords
  autoSpeak: boolean
  /** What the line shows of the letters still ahead. */
  reveal: 'text' | 'initials' | 'none'
}

export function planFor(stage: PracticeStage): StagePlan {
  switch (stage) {
    case 'copy':
      return { autoSpeak: true, reveal: 'text' }
    case 'cloze':
      return { given: clozeGiven, autoSpeak: true, reveal: 'text' }
    case 'initials':
      return { autoSpeak: true, reveal: 'initials' }
    case 'memory':
      return { autoSpeak: false, reveal: 'none' }
  }
}

export interface StageProgress {
  stage: PracticeStage
  box: number
  dueAt: number | null
}

/**
 * What a finished run does to a text's progress. Only a run at the text's own stage counts: practising an
 * easier stage again is free, and a harder one is not a pass of the stage the learner has reached.
 */
export function progressAfterRun(
  progress: StageProgress,
  ranStage: PracticeStage,
  accuracy: number,
  now: number,
): StageProgress {
  // Always a fresh object of exactly these three fields, so a caller can spread it over a larger record safely.
  const unchanged: StageProgress = { stage: progress.stage, box: progress.box, dueAt: progress.dueAt }
  if (ranStage !== progress.stage) return unchanged
  const passed = accuracy >= PASS_ACCURACY

  if (!isLastStage(progress.stage)) {
    return passed ? { ...unchanged, stage: nextStage(progress.stage) } : unchanged
  }
  // From memory: a pass moves the review further away, a miss brings it back to tomorrow.
  if (passed) {
    const box = Math.min(progress.box + 1, MAX_BOX)
    return { stage: progress.stage, box, dueAt: now + REVIEW_DAYS[box] * DAY_MS }
  }
  return { stage: progress.stage, box: Math.max(progress.box - 1, 0), dueAt: now + REVIEW_DAYS[0] * DAY_MS }
}

/** Whole days until a due date, counted up: a text due in 3 hours is due "in 1 day". Zero or less once it is due. */
export function daysUntil(dueAt: number, now: number): number {
  return Math.ceil((dueAt - now) / DAY_MS)
}

export function isDue(dueAt: number | null, now: number): boolean {
  return dueAt !== null && dueAt <= now
}
