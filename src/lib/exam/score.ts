import type { ExamItem, ExamSet, ExamTask } from '@/types'

/** The two answers to a true/false statement, in the order they are shown and stored (index 0 is "richtig"). */
export const TRUE_FALSE_OPTIONS = ['richtig', 'falsch'] as const

export function itemOptions(item: ExamItem): readonly string[] {
  return item.kind === 'true-false' ? TRUE_FALSE_OPTIONS : item.options
}

export function correctIndexOf(item: ExamItem): number {
  return item.kind === 'true-false' ? (item.isTrue ? 0 : 1) : item.correctIndex
}

export function itemPrompt(item: ExamItem): string {
  return item.kind === 'true-false' ? item.statementDe : item.questionDe
}

/** What the learner chose, by item id: the index of the option. A missing id is an unanswered question. */
export type ExamAnswers = Readonly<Record<string, number>>

export interface ExamItemResult {
  answered: boolean
  correct: boolean
  chosen: number | undefined
  correctIndex: number
}

export interface ExamScore {
  correct: number
  total: number
  /** 0–1. */
  ratio: number
  unanswered: number
  byItem: Readonly<Record<string, ExamItemResult>>
}

export function allItems(examSet: ExamSet): ExamItem[] {
  return examSet.tasks.flatMap((task) => task.items)
}

export function taskScore(task: ExamTask, score: ExamScore): { correct: number; total: number } {
  return {
    correct: task.items.filter((item) => score.byItem[item.id]?.correct).length,
    total: task.items.length,
  }
}

/** Marks a set. A question left empty counts as wrong, and is counted separately so the learner can see it. */
export function scoreExam(examSet: ExamSet, answers: ExamAnswers): ExamScore {
  const byItem: Record<string, ExamItemResult> = {}
  let correct = 0
  let unanswered = 0
  const items = allItems(examSet)

  for (const item of items) {
    const chosen = answers[item.id]
    const answered = chosen !== undefined
    const right = answered && chosen === correctIndexOf(item)
    if (right) correct += 1
    if (!answered) unanswered += 1
    byItem[item.id] = { answered, correct: right, chosen, correctIndex: correctIndexOf(item) }
  }

  return { correct, total: items.length, ratio: items.length === 0 ? 0 : correct / items.length, unanswered, byItem }
}

/** "7:05" for 425 seconds; never negative. */
export function formatClock(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds))
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}
