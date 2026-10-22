import { describe, expect, it } from 'vitest'

import type { ActivityEntry } from '@/types'

import { getWeeklyActivity } from './selectors'

function entry(id: string, date: Date): ActivityEntry {
  return { id, lessonId: 'a1-m01-l01', type: 'lesson-completed', timestamp: date.getTime() }
}

describe('getWeeklyActivity', () => {
  const now = new Date(2026, 9, 12, 15, 30) // Monday 12 October 2026, local time

  it('returns seven days, oldest first, ending today', () => {
    const days = getWeeklyActivity([], now)
    expect(days).toHaveLength(7)
    expect(days.map((day) => day.key)).toEqual([
      '2026-10-06',
      '2026-10-07',
      '2026-10-08',
      '2026-10-09',
      '2026-10-10',
      '2026-10-11',
      '2026-10-12',
    ])
    expect(days.at(-1)?.isToday).toBe(true)
    expect(days.slice(0, -1).some((day) => day.isToday)).toBe(false)
    expect(days.at(-1)?.weekday).toBe(1)
  })

  it('counts entries per local day, including late-evening ones', () => {
    const days = getWeeklyActivity(
      [entry('a', new Date(2026, 9, 12, 8, 0)), entry('b', new Date(2026, 9, 12, 23, 59)), entry('c', new Date(2026, 9, 10, 12, 0))],
      now,
    )
    expect(days.find((day) => day.key === '2026-10-12')?.count).toBe(2)
    expect(days.find((day) => day.key === '2026-10-10')?.count).toBe(1)
    expect(days.find((day) => day.key === '2026-10-11')?.count).toBe(0)
  })

  it('ignores activity older than the window', () => {
    const days = getWeeklyActivity([entry('old', new Date(2026, 9, 1, 12, 0))], now)
    expect(days.every((day) => day.count === 0)).toBe(true)
  })

  it('crosses a month boundary correctly', () => {
    const days = getWeeklyActivity([], new Date(2026, 10, 2, 9, 0))
    expect(days[0].key).toBe('2026-10-27')
    expect(days.at(-1)?.key).toBe('2026-11-02')
  })
})
