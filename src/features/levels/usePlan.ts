import { LEVEL_PATHS } from '@/data/paths'
import { countSteps, getChapterNumberOffset, getChapterProgress, getLevelChapters, getResumeStep } from '@/lib/learningPath'
import type { ChapterProgress, ResolvedChapter, ResolvedStep, StepCounts } from '@/lib/learningPath'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

import { usePlanCompletion } from './usePlanCompletion'

export interface PlanLevelView {
  level: CEFRLevel
  chapters: readonly ResolvedChapter[]
  chapterProgress: readonly ChapterProgress[]
  counts: StepCounts
  totalSteps: number
  completedSteps: number
  /** Number of the level's first chapter on the plan: A2 carries on from the last chapter of A1. */
  startNumber: number
}

export interface PlanView {
  levels: readonly PlanLevelView[]
  completedKeys: ReadonlySet<string>
  totalSteps: number
  completedSteps: number
  /** The level the learner is on: the one they chose while it has steps left, else the first level that does. */
  activeLevel?: CEFRLevel
  /** The step to offer as "continue". */
  resumeStep?: ResolvedStep
}

/**
 * The whole A1 → A2 plan with the learner's place in it. Only levels that have a hand-made plan and content
 * are part of it. Exactly one chapter of the plan is "current": the one in the active level.
 */
export function usePlan(): PlanView {
  const completedKeys = usePlanCompletion()
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const currentLessonId = useProgressStore((state) => state.currentLessonId) ?? undefined

  const measured = CEFR_LEVELS.filter((level) => LEVEL_PATHS[level])
    .map((level) => ({ level, chapters: getLevelChapters(level) }))
    .filter((entry) => entry.chapters.length > 0)
    .map((entry) => {
      const steps = entry.chapters.flatMap((chapter) => chapter.steps)
      return { ...entry, steps, completedSteps: steps.filter((step) => completedKeys.has(step.key)).length }
    })

  const isUnfinished = (entry: (typeof measured)[number]) => entry.completedSteps < entry.steps.length
  const active = measured.find((entry) => entry.level === currentLevel && isUnfinished(entry)) ?? measured.find(isUnfinished)

  const levels = measured.map((entry): PlanLevelView => {
    const progress = getChapterProgress(entry.chapters, completedKeys, entry.level === active?.level ? currentLessonId : undefined)
    return {
      level: entry.level,
      chapters: entry.chapters,
      // A single "you are here" on the whole plan, not one per level.
      chapterProgress: progress.map((chapter) => (chapter.state === 'current' && entry.level !== active?.level ? { ...chapter, state: 'upcoming' as const } : chapter)),
      counts: countSteps(entry.steps),
      totalSteps: entry.steps.length,
      completedSteps: entry.completedSteps,
      startNumber: getChapterNumberOffset(entry.level) + 1,
    }
  })

  return {
    levels,
    completedKeys,
    totalSteps: levels.reduce((sum, entry) => sum + entry.totalSteps, 0),
    completedSteps: levels.reduce((sum, entry) => sum + entry.completedSteps, 0),
    activeLevel: active?.level,
    resumeStep: active ? getResumeStep(active.chapters, completedKeys, currentLessonId) : undefined,
  }
}
