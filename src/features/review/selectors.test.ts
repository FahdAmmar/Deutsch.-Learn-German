import { describe, expect, it } from 'vitest'

import { getLesson } from '@/lib/curriculum'
import type { ProgressState } from '@/types'

import { getDueVocabulary, getReviewableVocabulary } from './selectors'

function emptyProgress(): Pick<ProgressState, 'lessons' | 'vocabulary'> {
  return { lessons: {}, vocabulary: {} }
}

describe('getReviewableVocabulary', () => {
  it('returns no vocabulary when no lessons are completed', () => {
    expect(getReviewableVocabulary(emptyProgress())).toEqual([])
  })

  it('returns the vocabulary of a completed lesson', () => {
    const lesson = getLesson('A1', 'begruessungen')
    expect(lesson).toBeDefined()

    const progress = emptyProgress()
    progress.lessons[lesson!.id] = {
      lessonId: lesson!.id,
      completed: true,
      accuracy: 1,
      lastVisitedAt: Date.now(),
    }

    const reviewable = getReviewableVocabulary(progress)
    expect(reviewable.length).toBe(lesson!.vocabulary.length)
    expect(reviewable.map((item) => item.id).sort()).toEqual(lesson!.vocabulary.map((item) => item.id).sort())
  })

  it('does not include vocabulary from a lesson that was started but not completed', () => {
    const lesson = getLesson('A1', 'begruessungen')
    const progress = emptyProgress()
    progress.lessons[lesson!.id] = {
      lessonId: lesson!.id,
      completed: false,
      accuracy: 0,
      lastVisitedAt: Date.now(),
    }

    expect(getReviewableVocabulary(progress)).toEqual([])
  })
})

describe('getDueVocabulary', () => {
  it('treats never-reviewed vocabulary from a completed lesson as due', () => {
    const lesson = getLesson('A1', 'begruessungen')
    const progress = emptyProgress()
    progress.lessons[lesson!.id] = {
      lessonId: lesson!.id,
      completed: true,
      accuracy: 1,
      lastVisitedAt: Date.now(),
    }

    const due = getDueVocabulary(progress)
    expect(due.length).toBe(lesson!.vocabulary.length)
  })

  it('excludes vocabulary scheduled for a future review date', () => {
    const lesson = getLesson('A1', 'begruessungen')
    const progress = emptyProgress()
    progress.lessons[lesson!.id] = {
      lessonId: lesson!.id,
      completed: true,
      accuracy: 1,
      lastVisitedAt: Date.now(),
    }

    const firstWord = lesson!.vocabulary[0]
    progress.vocabulary[firstWord.id] = {
      vocabularyId: firstWord.id,
      timesReviewed: 1,
      timesCorrect: 1,
      lastReviewedAt: Date.now(),
      boxLevel: 2,
      nextReviewAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // due in a week
    }

    const due = getDueVocabulary(progress)
    expect(due.some((item) => item.id === firstWord.id)).toBe(false)
    expect(due.length).toBe(lesson!.vocabulary.length - 1)
  })

  it('respects the limit parameter', () => {
    const lesson = getLesson('A1', 'die-wohnung')
    expect(lesson!.vocabulary.length).toBeGreaterThan(2)

    const progress = emptyProgress()
    progress.lessons[lesson!.id] = {
      lessonId: lesson!.id,
      completed: true,
      accuracy: 1,
      lastVisitedAt: Date.now(),
    }

    expect(getDueVocabulary(progress, 2)).toHaveLength(2)
  })
})
