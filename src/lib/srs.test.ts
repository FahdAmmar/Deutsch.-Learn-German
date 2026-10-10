import { describe, expect, it } from 'vitest'

import { computeNextReview, isDue, MAX_BOX_LEVEL } from './srs'

const DAY_MS = 24 * 60 * 60 * 1000

describe('computeNextReview', () => {
  it('advances one box level on a correct answer', () => {
    const result = computeNextReview(0, true, 0)
    expect(result.boxLevel).toBe(1)
  })

  it('resets to box 0 on an incorrect answer, regardless of previous level', () => {
    const result = computeNextReview(3, false, 0)
    expect(result.boxLevel).toBe(0)
  })

  it('never advances past the maximum box level', () => {
    const result = computeNextReview(MAX_BOX_LEVEL, true, 0)
    expect(result.boxLevel).toBe(MAX_BOX_LEVEL)
  })

  it('schedules a longer interval for higher box levels', () => {
    const low = computeNextReview(0, true, 0)
    const high = computeNextReview(3, true, 0)
    expect(high.nextReviewAt).toBeGreaterThan(low.nextReviewAt)
  })

  it('schedules the next review strictly in the future relative to now', () => {
    const now = 1_000_000
    const result = computeNextReview(0, true, now)
    expect(result.nextReviewAt).toBeGreaterThan(now)
  })

  it('schedules box 0 for a short (1 day) interval', () => {
    const result = computeNextReview(0, false, 0)
    expect(result.nextReviewAt).toBe(1 * DAY_MS)
  })
})

describe('isDue', () => {
  it('treats a word with no review history as due', () => {
    expect(isDue(undefined)).toBe(true)
  })

  it('treats a past due date as due', () => {
    expect(isDue(1000, 2000)).toBe(true)
  })

  it('treats the exact due moment as due', () => {
    expect(isDue(2000, 2000)).toBe(true)
  })

  it('treats a future due date as not due', () => {
    expect(isDue(5000, 2000)).toBe(false)
  })
})
