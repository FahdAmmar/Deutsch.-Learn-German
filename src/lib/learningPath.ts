import { getCurriculum } from '@/data/curriculum'
import { LEVEL_PATHS } from '@/data/paths'
import type { CEFRLevel, Lesson, PathChapter } from '@/types'

export interface ResolvedChapter {
  chapter: PathChapter
  lessons: Lesson[]
}

function getLessonsInModuleOrder(level: CEFRLevel): Lesson[] {
  return getCurriculum().find((entry) => entry.level === level)?.modules.flatMap((module) => module.lessons) ?? []
}

/** A level without a hand-made path is shown as one chapter per module, in module order. */
function chaptersFromModules(level: CEFRLevel): ResolvedChapter[] {
  const modules = getCurriculum().find((entry) => entry.level === level)?.modules ?? []
  return modules
    .filter((module) => module.lessons.length > 0)
    .map((module) => ({
      chapter: {
        id: module.id,
        titleAr: module.titleAr,
        titleDe: module.title,
        goalAr: '',
        visual: 'none' as const,
        lessonIds: module.lessons.map((lesson) => lesson.id),
      },
      lessons: module.lessons,
    }))
}

/**
 * The chapters of a level, each with its lessons resolved, in learning order.
 * A lesson the path forgot is appended in a final chapter rather than hidden,
 * so authoring a lesson can never make it unreachable.
 */
export function getLevelChapters(level: CEFRLevel): ResolvedChapter[] {
  const path = LEVEL_PATHS[level]
  if (!path) return chaptersFromModules(level)

  const all = getLessonsInModuleOrder(level)
  const byId = new Map(all.map((lesson) => [lesson.id, lesson]))
  const placed = new Set<string>()

  const chapters = path.chapters
    .map((chapter) => ({
      chapter,
      lessons: chapter.lessonIds.flatMap((id) => {
        const lesson = byId.get(id)
        if (!lesson || placed.has(id)) return []
        placed.add(id)
        return [lesson]
      }),
    }))
    .filter((entry) => entry.lessons.length > 0)

  const unplaced = all.filter((lesson) => !placed.has(lesson.id))
  if (unplaced.length > 0) {
    chapters.push({
      chapter: {
        id: 'weitere-lektionen',
        titleAr: 'دروس إضافية',
        titleDe: 'Weitere Lektionen',
        goalAr: '',
        visual: 'none',
        lessonIds: unplaced.map((lesson) => lesson.id),
      },
      lessons: unplaced,
    })
  }
  return chapters
}

/** Every lesson of a level, flattened in learning-path order. */
export function getPathLessons(level: CEFRLevel): Lesson[] {
  return getLevelChapters(level).flatMap((entry) => entry.lessons)
}

/** The lesson that follows `lesson` on its level's learning path. */
export function getNextLessonInPath(lesson: Pick<Lesson, 'id' | 'level'>): Lesson | undefined {
  const ordered = getPathLessons(lesson.level)
  const index = ordered.findIndex((entry) => entry.id === lesson.id)
  return index === -1 ? undefined : ordered[index + 1]
}

export type ChapterState = 'done' | 'current' | 'upcoming'

export interface ChapterProgress {
  completed: number
  total: number
  ratio: number
  state: ChapterState
}

/**
 * Per-chapter progress. Exactly one chapter is `current`: the one holding the
 * lesson the learner is on, or else the first unfinished chapter.
 */
export function getChapterProgress(
  chapters: readonly ResolvedChapter[],
  completedLessonIds: ReadonlySet<string>,
  currentLessonId?: string,
): ChapterProgress[] {
  const counts = chapters.map(({ lessons }) => ({
    completed: lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length,
    total: lessons.length,
  }))
  const byCurrentLesson = currentLessonId
    ? chapters.findIndex(({ lessons }) => lessons.some((lesson) => lesson.id === currentLessonId && !completedLessonIds.has(lesson.id)))
    : -1
  const firstUnfinished = counts.findIndex((count) => count.completed < count.total)
  const currentIndex = byCurrentLesson >= 0 ? byCurrentLesson : firstUnfinished

  return counts.map((count, index) => ({
    ...count,
    ratio: count.total === 0 ? 0 : count.completed / count.total,
    state: count.total > 0 && count.completed === count.total ? 'done' : index === currentIndex ? 'current' : 'upcoming',
  }))
}
