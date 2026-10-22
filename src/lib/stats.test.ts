import { describe, expect, it } from 'vitest'

import { accuracyOf, answersOn, buildHeatmap, EMPTY_STATS, MAX_DAYS_KEPT, withAnswer } from './stats'

describe('withAnswer', () => {
  it('counts the answer per day, per type and per module without mutating the input', () => {
    const next = withAnswer(EMPTY_STATS, { type: 'multiple-choice', correct: true, moduleId: 'm1', day: '2026-10-01' })
    expect(next.days['2026-10-01']).toEqual({ attempts: 1, correct: 1 })
    expect(next.byType['multiple-choice']).toEqual({ attempts: 1, correct: 1 })
    expect(next.byModule.m1).toEqual({ attempts: 1, correct: 1 })
    expect(EMPTY_STATS.days).toEqual({})
  })

  it('counts a wrong answer as an attempt but not as correct', () => {
    const once = withAnswer(EMPTY_STATS, { type: 'fill-blank', correct: true, day: '2026-10-01' })
    const twice = withAnswer(once, { type: 'fill-blank', correct: false, day: '2026-10-01' })
    expect(twice.byType['fill-blank']).toEqual({ attempts: 2, correct: 1 })
    expect(accuracyOf(twice.byType['fill-blank'])).toBe(0.5)
  })

  it('skips the module breakdown when the exercise belongs to no lesson', () => {
    const next = withAnswer(EMPTY_STATS, { type: 'listening', correct: true, day: '2026-10-01' })
    expect(next.byModule).toEqual({})
  })

  it('keeps only the most recent days', () => {
    let stats = EMPTY_STATS
    for (let index = 0; index < MAX_DAYS_KEPT + 5; index += 1) {
      const day = new Date(2025, 0, 1 + index)
      const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
      stats = withAnswer(stats, { type: 'matching', correct: true, day: key })
    }
    expect(Object.keys(stats.days)).toHaveLength(MAX_DAYS_KEPT)
    expect(stats.days['2025-01-01']).toBeUndefined()
  })
})

describe('accuracyOf', () => {
  it('is null — not zero — when nothing was answered', () => {
    expect(accuracyOf(undefined)).toBeNull()
    expect(accuracyOf({ attempts: 0, correct: 0 })).toBeNull()
  })
})

describe('answersOn', () => {
  it('reads one day, defaulting to zero', () => {
    const stats = withAnswer(EMPTY_STATS, { type: 'matching', correct: true, day: '2026-10-02' })
    expect(answersOn(stats, '2026-10-02')).toBe(1)
    expect(answersOn(stats, '2026-10-03')).toBe(0)
  })
})

describe('buildHeatmap', () => {
  // 2026-10-16 is a Friday.
  const today = '2026-10-16'

  it('returns whole weeks ending at today, oldest first, starting on the chosen weekday', () => {
    const columns = buildHeatmap(EMPTY_STATS, { weeks: 3, today, weekStartsOn: 6 })
    expect(columns).toHaveLength(3)
    // Saturday-start weeks: the last column runs Sat 10-10 … Fri 10-16 (7 days, today last).
    expect(columns[2].map((day) => day.day)[0]).toBe('2026-10-10')
    expect(columns[2].at(-1)?.day).toBe(today)
    expect(columns[0]).toHaveLength(7)
  })

  it('omits days after today from the final column', () => {
    const columns = buildHeatmap(EMPTY_STATS, { weeks: 2, today, weekStartsOn: 0 })
    // Sunday-start: the current week is Sun 10-11 … Fri 10-16, six days so far.
    expect(columns[1]).toHaveLength(6)
  })

  it('scales intensity to the busiest day and leaves empty days at level 0', () => {
    let stats = EMPTY_STATS
    for (let count = 0; count < 8; count += 1) stats = withAnswer(stats, { type: 'matching', correct: true, day: today })
    stats = withAnswer(stats, { type: 'matching', correct: true, day: '2026-10-15' })
    const days = buildHeatmap(stats, { weeks: 1, today, weekStartsOn: 6 })[0]
    expect(days.find((day) => day.day === today)?.level).toBe(4)
    expect(days.find((day) => day.day === '2026-10-15')?.level).toBe(1)
    expect(days.find((day) => day.day === '2026-10-14')?.level).toBe(0)
  })
})
