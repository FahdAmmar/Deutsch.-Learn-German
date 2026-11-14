import { describe, expect, it } from 'vitest'

import { getLevelChapters } from './learningPath'
import { buildChapterReview, buildLevelTest, drawReview, CHAPTER_REVIEW_SIZE, LEVEL_TEST_SIZE } from './chapterReview'

/** A small deterministic generator, so every draw in a test is reproducible. */
function seeded(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

describe('chapter review', () => {
  const chapters = getLevelChapters('A1')

  it('draws the requested number of distinct questions from the lessons of the chapter', () => {
    const entry = chapters[0]
    const review = buildChapterReview('A1', entry.chapter.id, CHAPTER_REVIEW_SIZE, seeded(1))
    expect(review).toBeDefined()
    expect(review!.exercises).toHaveLength(CHAPTER_REVIEW_SIZE)
    expect(new Set(review!.exercises.map((exercise) => exercise.id)).size).toBe(CHAPTER_REVIEW_SIZE)
    const own = new Set(entry.lessons.flatMap((lesson) => lesson.exercises.map((exercise) => exercise.id)))
    for (const exercise of review!.exercises) expect(own.has(exercise.id), exercise.id).toBe(true)
  })

  it('draws from several lessons rather than letting one lesson fill the set', () => {
    const entry = chapters.find((candidate) => candidate.lessons.length >= 4)!
    const review = buildChapterReview('A1', entry.chapter.id, CHAPTER_REVIEW_SIZE, seeded(2))!
    expect(review.lessons.length).toBeGreaterThanOrEqual(4)
  })

  it('gives different questions for a different draw', () => {
    const entry = chapters[0]
    const first = buildChapterReview('A1', entry.chapter.id, CHAPTER_REVIEW_SIZE, seeded(3))!.exercises.map((exercise) => exercise.id)
    const second = buildChapterReview('A1', entry.chapter.id, CHAPTER_REVIEW_SIZE, seeded(4))!.exercises.map((exercise) => exercise.id)
    expect(first).not.toEqual(second)
  })

  it('is undefined for an unknown chapter', () => {
    expect(buildChapterReview('A1', 'no-such-chapter')).toBeUndefined()
  })

  it('returns every question when the lessons hold fewer than asked for', () => {
    const entry = chapters[0]
    const all = entry.lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0)
    expect(drawReview(entry.lessons, all + 50, seeded(5)).exercises).toHaveLength(all)
  })
})

describe('level test', () => {
  it.each(['A1', 'A2'] as const)('draws questions from many different lessons of %s', (level) => {
    const test = buildLevelTest(level, LEVEL_TEST_SIZE, seeded(6))
    expect(test).toBeDefined()
    expect(test!.exercises).toHaveLength(LEVEL_TEST_SIZE)
    expect(test!.lessons.length).toBeGreaterThanOrEqual(LEVEL_TEST_SIZE - 2)
  })

  it('is undefined for a level without content', () => {
    expect(buildLevelTest('B2')).toBeUndefined()
  })
})
