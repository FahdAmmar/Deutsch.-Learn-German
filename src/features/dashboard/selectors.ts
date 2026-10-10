import { getLessonById, getLessonsForLevel, getModuleById, getModulesForLevel, getVocabularyForLevel } from '@/lib/curriculum'
import type { Module, ProgressState } from '@/types'

export interface LevelProgressSummary {
  totalLessons: number
  completedLessons: number
  ratio: number
}

export function getLevelProgressSummary(
  progress: Pick<ProgressState, 'lessons'>,
  level: Parameters<typeof getLessonsForLevel>[0],
): LevelProgressSummary {
  const lessons = getLessonsForLevel(level)
  const completedLessons = lessons.filter((lesson) => progress.lessons[lesson.id]?.completed).length
  return {
    totalLessons: lessons.length,
    completedLessons,
    ratio: lessons.length === 0 ? 0 : completedLessons / lessons.length,
  }
}

/** The lesson to resume: the current lesson if unfinished, otherwise the first incomplete lesson in the level. */
export function getContinueLearningLesson(progress: Pick<ProgressState, 'currentLevel' | 'currentLessonId' | 'lessons'>) {
  if (progress.currentLessonId) {
    const current = getLessonById(progress.currentLessonId)
    if (current && !progress.lessons[current.id]?.completed) {
      return current
    }
  }

  const lessons = getLessonsForLevel(progress.currentLevel)
  return lessons.find((lesson) => !progress.lessons[lesson.id]?.completed) ?? lessons[0]
}

export function getModuleTitleForLesson(lessonId: string): string | undefined {
  const lesson = getLessonById(lessonId)
  if (!lesson) return undefined
  return getModuleById(lesson.moduleId)?.titleAr
}

export interface VocabularyReviewSummary {
  total: number
  reviewed: number
}

export function getVocabularyReviewSummary(
  progress: Pick<ProgressState, 'vocabulary'>,
  level: Parameters<typeof getVocabularyForLevel>[0],
): VocabularyReviewSummary {
  const items = getVocabularyForLevel(level)
  const reviewed = items.filter((item) => progress.vocabulary[item.id]).length
  return { total: items.length, reviewed }
}

export type ModuleStepState = 'done' | 'current' | 'upcoming'

export interface ModuleStep {
  module: Module
  completedLessons: number
  totalLessons: number
  state: ModuleStepState
}

/**
 * Every module of a level, in order, with its own completion count. The first module that is
 * not fully completed (or the one containing `currentLessonId`) is the "current" stop.
 */
export function getModulePath(
  progress: Pick<ProgressState, 'lessons'>,
  level: Parameters<typeof getModulesForLevel>[0],
  currentLessonId?: string,
): ModuleStep[] {
  const modules = getModulesForLevel(level)
  const steps = modules.map((module) => {
    const completedLessons = module.lessons.filter((lesson) => progress.lessons[lesson.id]?.completed).length
    return { module, completedLessons, totalLessons: module.lessons.length }
  })

  const byCurrentLesson = currentLessonId
    ? steps.findIndex((step) => step.module.lessons.some((lesson) => lesson.id === currentLessonId))
    : -1
  const firstUnfinished = steps.findIndex((step) => step.completedLessons < step.totalLessons)
  const currentIndex = byCurrentLesson >= 0 ? byCurrentLesson : firstUnfinished

  return steps.map((step, index) => ({
    ...step,
    state:
      step.totalLessons > 0 && step.completedLessons === step.totalLessons
        ? 'done'
        : index === currentIndex
          ? 'current'
          : 'upcoming',
  }))
}
