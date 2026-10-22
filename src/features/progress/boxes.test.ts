import { describe, expect, it } from 'vitest'

import type { VocabularyProgress } from '@/types'

import { getBoxDistribution } from './boxes'

const entry = (id: string, extra: Partial<VocabularyProgress> = {}): VocabularyProgress => ({
  vocabularyId: id,
  timesReviewed: 1,
  timesCorrect: 1,
  lastReviewedAt: 0,
  ...extra,
})

describe('getBoxDistribution', () => {
  const NOW = 1_000_000

  it('counts words per box and the ones due right now', () => {
    const result = getBoxDistribution(
      {
        a: entry('a', { boxLevel: 0, nextReviewAt: NOW - 1 }),
        b: entry('b', { boxLevel: 2, nextReviewAt: NOW + 1000 }),
        c: entry('c', { boxLevel: 2, nextReviewAt: NOW - 5 }),
      },
      NOW,
    )

    expect(result.boxes.map((slot) => slot.count)).toEqual([1, 0, 2, 0, 0])
    expect(result.total).toBe(3)
    expect(result.due).toBe(2)
  })

  it('treats data from before spaced repetition (no box) as box 0 and due', () => {
    const result = getBoxDistribution({ a: entry('a') }, NOW)
    expect(result.boxes[0].count).toBe(1)
    expect(result.due).toBe(1)
  })

  it('exposes the interval of each box', () => {
    expect(getBoxDistribution({}, NOW).boxes.map((slot) => slot.intervalDays)).toEqual([1, 3, 7, 16, 35])
  })

  it('is empty for no reviewed words', () => {
    expect(getBoxDistribution({}, NOW)).toMatchObject({ total: 0, due: 0 })
  })
})
