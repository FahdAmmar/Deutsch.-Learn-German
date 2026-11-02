import type { CEFRLevel, ExamPart, ExamSet } from '@/types'

import { a1ExamSets } from './a1'
import { a2ExamSets } from './a2'

export const EXAM_SETS: readonly ExamSet[] = [...a1ExamSets, ...a2ExamSets]

export function getExamSet(id: string | undefined): ExamSet | undefined {
  return EXAM_SETS.find((set) => set.id === id)
}

export function getExamSetsForLevel(level: CEFRLevel, part?: ExamPart): ExamSet[] {
  return EXAM_SETS.filter((set) => set.level === level && (part === undefined || set.part === part))
}
