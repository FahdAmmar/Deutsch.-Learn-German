import { describe, expect, it } from 'vitest'

import { getLessonsForLevel } from '@/lib/curriculum'

import { CAN_DO, getCanDoStatements } from './canDo'

const lessons = (['A1', 'A2'] as const).flatMap((level) => getLessonsForLevel(level))

describe('can-do statements', () => {
  it('give every lesson one to three statements', () => {
    for (const lesson of lessons) {
      const statements = getCanDoStatements(lesson.id)
      expect(statements.length, lesson.id).toBeGreaterThanOrEqual(1)
      expect(statements.length, lesson.id).toBeLessThanOrEqual(3)
    }
  })

  it('belong to lessons that exist', () => {
    const ids = new Set(lessons.map((lesson) => lesson.id))
    for (const id of Object.keys(CAN_DO)) expect(ids.has(id), `${id} is not a lesson`).toBe(true)
  })

  it('are written as "I can …" and stay short enough to read at a glance', () => {
    for (const [id, statements] of Object.entries(CAN_DO)) {
      for (const statement of statements) {
        expect(statement.startsWith('أستطيع أن'), `${id}: ${statement}`).toBe(true)
        expect(statement.length, `${id}: ${statement}`).toBeLessThanOrEqual(140)
      }
    }
  })

  it('do not repeat a statement inside a lesson or across the course', () => {
    const all = Object.values(CAN_DO).flat()
    expect(new Set(all).size).toBe(all.length)
  })

  it('return an empty list for an unknown lesson', () => {
    expect(getCanDoStatements('a1-none-l99')).toEqual([])
  })
})
