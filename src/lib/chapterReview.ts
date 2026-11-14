import type { CEFRLevel, Exercise, Lesson } from '@/types'

import { getLevelChapters } from './learningPath'

/** Questions in a chapter review: about two from each lesson of a typical chapter. */
export const CHAPTER_REVIEW_SIZE = 12
/** Questions in the final test of a level: one from as many different lessons as fit. */
export const LEVEL_TEST_SIZE = 30

/** Source of randomness; injected so a test can fix the draw. */
export type Rng = () => number

export interface ReviewSet {
  exercises: Exercise[]
  /** The lessons the questions come from, in the order they appear on the plan. */
  lessons: Lesson[]
}

function shuffled<T>(items: readonly T[], rng: Rng): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Draws `size` of the lessons' own exercises, round-robin: one question from every lesson (in a fresh random
 * order each round), then a second from each, and so on. No lesson crowds the others out, and with more lessons
 * than questions every lesson has the same chance. Nothing is invented: a review only repeats exercises that
 * were authored for the lessons, so each one has its explanation and its answer check.
 */
export function drawReview(lessons: readonly Lesson[], size: number, rng: Rng = Math.random): ReviewSet {
  const queues = new Map(lessons.map((lesson) => [lesson.id, shuffled(lesson.exercises, rng)]))
  const exercises: Exercise[] = []
  const used = new Set<string>()

  for (let round = 0; exercises.length < size; round += 1) {
    let added = false
    for (const lesson of shuffled(lessons, rng)) {
      const queue = queues.get(lesson.id) ?? []
      const exercise = queue[round]
      if (exercise && !used.has(exercise.id) && exercises.length < size) {
        exercises.push(exercise)
        used.add(exercise.id)
        added = true
      }
    }
    if (!added) break
  }

  const drawn = new Set(exercises.map((exercise) => exercise.id))
  return { exercises, lessons: lessons.filter((lesson) => lesson.exercises.some((exercise) => drawn.has(exercise.id))) }
}

/** The review of one chapter of the plan, or undefined for an unknown chapter or one without lessons. */
export function buildChapterReview(level: CEFRLevel, chapterId: string, size: number = CHAPTER_REVIEW_SIZE, rng: Rng = Math.random) {
  const entry = getLevelChapters(level).find((candidate) => candidate.chapter.id === chapterId)
  if (!entry || entry.lessons.length === 0) return undefined
  return { chapter: entry.chapter, ...drawReview(entry.lessons, size, rng) }
}

/** The final test of a level: questions from across all of its lessons, or undefined for a level without any. */
export function buildLevelTest(level: CEFRLevel, size: number = LEVEL_TEST_SIZE, rng: Rng = Math.random): ReviewSet | undefined {
  const lessons = getLevelChapters(level).flatMap((entry) => entry.lessons)
  if (lessons.length === 0) return undefined
  return drawReview(lessons, size, rng)
}
