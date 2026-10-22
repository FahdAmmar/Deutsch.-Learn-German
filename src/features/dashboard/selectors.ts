import { getLessonById, getLessonsForLevel, getModuleById, getVocabularyForLevel } from '@/lib/curriculum'
import { getPathLessons } from '@/lib/learningPath'
import type { ActivityEntry, ProgressState } from '@/types'

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

/** The lesson to resume: the current lesson if unfinished, otherwise the first incomplete lesson on the level's learning path. */
export function getContinueLearningLesson(progress: Pick<ProgressState, 'currentLevel' | 'currentLessonId' | 'lessons'>) {
  if (progress.currentLessonId) {
    const current = getLessonById(progress.currentLessonId)
    if (current && !progress.lessons[current.id]?.completed) {
      return current
    }
  }

  const lessons = getPathLessons(progress.currentLevel)
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

export interface DayActivity {
  /** Local calendar day, `YYYY-MM-DD`. */
  key: string
  /** `Date.getDay()` of that day: 0 = Sunday. */
  weekday: number
  /** Lessons started or completed and exercise sets finished on that day. */
  count: number
  isToday: boolean
}

function dayKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** Activity per local day for the last `days` days, oldest first, ending today. */
export function getWeeklyActivity(activity: readonly ActivityEntry[], now: Date = new Date(), days = 7): DayActivity[] {
  const counts = new Map<string, number>()
  for (const entry of activity) {
    const key = dayKey(new Date(entry.timestamp))
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1 - index))
    const key = dayKey(date)
    return { key, weekday: date.getDay(), count: counts.get(key) ?? 0, isToday: index === days - 1 }
  })
}
