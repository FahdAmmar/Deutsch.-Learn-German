import { getCurriculum } from '@/data/curriculum'
import { LEVEL_PATHS } from '@/data/paths'
import { getRoadmapEntries } from '@/lib/grammarRoadmap'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Dialogue, GrammarRoadmapEntry, Lesson, LevelCurriculum, PathChapter, PathStep, PathStepKind, ReadingText } from '@/types'

/** A reading text or a standalone conversation as the plan needs to show it — never the whole text. */
export interface PathStory {
  id: string
  level: CEFRLevel
  kind: 'reading' | 'conversation'
  titleDe: string
  titleAr: string
}

interface StepBase {
  /** Stable identity of the step across the three progress stores; see `stepKey`. */
  key: string
}

export type ResolvedStep =
  | (StepBase & { kind: 'lesson'; lesson: Lesson })
  | (StepBase & { kind: 'rule'; rule: GrammarRoadmapEntry })
  | (StepBase & { kind: 'reading' | 'conversation'; story: PathStory })

export interface ResolvedChapter {
  chapter: PathChapter
  level: CEFRLevel
  /** Everything in the chapter, in learning order. */
  steps: ResolvedStep[]
  /** Just the lessons of `steps`, in the same order. */
  lessons: Lesson[]
}

/** The identity of a step in progress records: lessons, rules and stories live in three different stores. */
export function stepKey(step: PathStep): string {
  switch (step.kind) {
    case 'lesson':
      return `lesson:${step.id}`
    case 'rule':
      return `rule:${step.number}`
    case 'reading':
    case 'conversation':
      return `story:${step.id}`
  }
}

function toReadingStory(text: ReadingText): PathStory {
  return { id: text.id, level: text.level, kind: 'reading', titleDe: text.titleDe, titleAr: text.titleAr }
}

function toConversationStory(dialogue: Dialogue): PathStory {
  return {
    id: dialogue.id,
    level: dialogue.level,
    kind: 'conversation',
    // A conversation without a German title still shows up (the integrity test requires one for shipped content).
    titleDe: dialogue.titleDe ?? dialogue.titleAr,
    titleAr: dialogue.titleAr,
  }
}

const storyIndexCache = new WeakMap<LevelCurriculum, Map<string, PathStory>>()

/** Reading texts and standalone conversations of a level, by id. Lesson dialogues are not here: they live inside their lesson. */
function getStoryIndex(entry: LevelCurriculum | undefined): Map<string, PathStory> {
  if (!entry) return new Map()
  const cached = storyIndexCache.get(entry)
  if (cached) return cached
  const index = new Map<string, PathStory>()
  for (const text of entry.readingTexts) index.set(text.id, toReadingStory(text))
  for (const dialogue of entry.conversations) index.set(dialogue.id, toConversationStory(dialogue))
  storyIndexCache.set(entry, index)
  return index
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
        steps: module.lessons.map((lesson): PathStep => ({ kind: 'lesson', id: lesson.id })),
      },
      level,
      steps: module.lessons.map((lesson) => ({ kind: 'lesson' as const, key: `lesson:${lesson.id}`, lesson })),
      lessons: module.lessons,
    }))
}

/**
 * The chapters of a level, each with its steps resolved, in learning order.
 * A lesson the path forgot is appended in a final chapter rather than hidden,
 * so authoring a lesson can never make it unreachable. (A rule or a story the
 * path forgot stays reachable on its own page; a test fails instead.)
 */
export function getLevelChapters(level: CEFRLevel): ResolvedChapter[] {
  const path = LEVEL_PATHS[level]
  if (!path) return chaptersFromModules(level)

  const all = getLessonsInModuleOrder(level)
  const lessonsById = new Map(all.map((lesson) => [lesson.id, lesson]))
  const rulesByNumber = new Map(getRoadmapEntries().map((entry) => [entry.number, entry]))
  const stories = getStoryIndex(getCurriculum().find((entry) => entry.level === level))
  const placedLessons = new Set<string>()

  const resolveStep = (step: PathStep): ResolvedStep | undefined => {
    switch (step.kind) {
      case 'lesson': {
        const lesson = lessonsById.get(step.id)
        if (!lesson || placedLessons.has(step.id)) return undefined
        placedLessons.add(step.id)
        return { kind: 'lesson', key: stepKey(step), lesson }
      }
      case 'rule': {
        const rule = rulesByNumber.get(step.number)
        return rule ? { kind: 'rule', key: stepKey(step), rule } : undefined
      }
      case 'reading':
      case 'conversation': {
        const story = stories.get(step.id)
        return story ? { kind: step.kind, key: stepKey(step), story } : undefined
      }
    }
  }

  const chapters: ResolvedChapter[] = path.chapters
    .map((chapter) => {
      const steps = chapter.steps.flatMap((step) => resolveStep(step) ?? [])
      return { chapter, level, steps, lessons: steps.flatMap((step) => (step.kind === 'lesson' ? [step.lesson] : [])) }
    })
    .filter((entry) => entry.steps.length > 0)

  const unplaced = all.filter((lesson) => !placedLessons.has(lesson.id))
  if (unplaced.length > 0) {
    chapters.push({
      chapter: {
        id: 'weitere-lektionen',
        titleAr: 'دروس إضافية',
        titleDe: 'Weitere Lektionen',
        goalAr: '',
        steps: unplaced.map((lesson): PathStep => ({ kind: 'lesson', id: lesson.id })),
      },
      level,
      steps: unplaced.map((lesson) => ({ kind: 'lesson' as const, key: `lesson:${lesson.id}`, lesson })),
      lessons: unplaced,
    })
  }
  return chapters
}

/** Every lesson of a level, flattened in learning-path order. */
export function getPathLessons(level: CEFRLevel): Lesson[] {
  return getLevelChapters(level).flatMap((entry) => entry.lessons)
}

/** Every step of a level, flattened in learning-path order. */
export function getPathSteps(level: CEFRLevel): ResolvedStep[] {
  return getLevelChapters(level).flatMap((entry) => entry.steps)
}

/** The lesson that follows `lesson` on its level's learning path. */
export function getNextLessonInPath(lesson: Pick<Lesson, 'id' | 'level'>): Lesson | undefined {
  const ordered = getPathLessons(lesson.level)
  const index = ordered.findIndex((entry) => entry.id === lesson.id)
  return index === -1 ? undefined : ordered[index + 1]
}

/**
 * Chapters are numbered through the whole plan: A1 has 1…n, A2 carries on at n+1. Computed from the
 * path data, so it does not depend on which level happens to be loaded.
 */
export function getChapterNumberOffset(level: CEFRLevel): number {
  let offset = 0
  for (const each of CEFR_LEVELS) {
    if (each === level) break
    offset += LEVEL_PATHS[each]?.chapters.length ?? 0
  }
  return offset
}

/** The level after `level` that has a hand-made plan (A1 → A2), if any. */
export function getNextPathLevel(level: CEFRLevel): CEFRLevel | undefined {
  return CEFR_LEVELS.slice(CEFR_LEVELS.indexOf(level) + 1).find((each) => LEVEL_PATHS[each])
}

/** The level whose plan holds this step, read from the path data (so it needs no level to be loaded). */
export function getPlanStepLevel(key: string): CEFRLevel | undefined {
  return CEFR_LEVELS.find((level) => LEVEL_PATHS[level]?.chapters.some((chapter) => chapter.steps.some((step) => stepKey(step) === key)))
}

export interface PlanPosition {
  step: ResolvedStep
  chapter: ResolvedChapter
  /** True when `step` is the first of its chapter, so the learner is moving on to a new chapter. */
  startsChapter: boolean
}

/**
 * The step after `key` in the plan, looking across every level that is loaded (A1 flows into A2).
 * Undefined at the end of the plan, and also where the next level has not been fetched yet — the
 * caller then falls back to the level page.
 */
export function getNextPlanStep(key: string): PlanPosition | undefined {
  const flat = CEFR_LEVELS.flatMap((level) => (LEVEL_PATHS[level] ? getLevelChapters(level) : [])).flatMap((chapter) =>
    chapter.steps.map((step, index) => ({ step, chapter, startsChapter: index === 0 })),
  )
  const index = flat.findIndex((entry) => entry.step.key === key)
  return index === -1 ? undefined : flat[index + 1]
}

/** How many steps of each kind a chapter (or a whole level) holds. */
export type StepCounts = Record<PathStepKind, number>

export function countSteps(steps: readonly { kind: PathStepKind }[]): StepCounts {
  const counts: StepCounts = { lesson: 0, rule: 0, reading: 0, conversation: 0 }
  for (const step of steps) counts[step.kind] += 1
  return counts
}

export type ChapterState = 'done' | 'current' | 'upcoming'

export interface ChapterProgress {
  completed: number
  total: number
  ratio: number
  state: ChapterState
}

/**
 * Per-chapter progress over every step. Exactly one chapter is `current`: the one holding the
 * lesson the learner is on, or else the first unfinished chapter.
 */
export function getChapterProgress(
  chapters: readonly ResolvedChapter[],
  completedKeys: ReadonlySet<string>,
  currentLessonId?: string,
): ChapterProgress[] {
  const counts = chapters.map(({ steps }) => ({
    completed: steps.filter((step) => completedKeys.has(step.key)).length,
    total: steps.length,
  }))
  const currentKey = currentLessonId ? `lesson:${currentLessonId}` : undefined
  const byCurrentLesson = currentKey
    ? chapters.findIndex(({ steps }) => steps.some((step) => step.key === currentKey && !completedKeys.has(step.key)))
    : -1
  const firstUnfinished = counts.findIndex((count) => count.completed < count.total)
  const currentIndex = byCurrentLesson >= 0 ? byCurrentLesson : firstUnfinished

  return counts.map((count, index) => ({
    ...count,
    ratio: count.total === 0 ? 0 : count.completed / count.total,
    state: count.total > 0 && count.completed === count.total ? 'done' : index === currentIndex ? 'current' : 'upcoming',
  }))
}

/**
 * The step to offer as "continue": the lesson the learner is on when it is on this path and still
 * open, otherwise the first step not yet done.
 */
export function getResumeStep(
  chapters: readonly ResolvedChapter[],
  completedKeys: ReadonlySet<string>,
  currentLessonId?: string,
): ResolvedStep | undefined {
  const steps = chapters.flatMap((entry) => entry.steps)
  const current = currentLessonId ? steps.find((step) => step.key === `lesson:${currentLessonId}` && !completedKeys.has(step.key)) : undefined
  return current ?? steps.find((step) => !completedKeys.has(step.key))
}
