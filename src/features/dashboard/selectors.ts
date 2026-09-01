import { getLessonById, getLessonsForLevel, getModuleById, getVocabularyForLevel } from '@/lib/curriculum'
import type { ProgressState } from '@/types'

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
