import { describe, expect, it } from 'vitest'

import { EXAM_SETS, getExamSet, getExamSetsForLevel } from '@/data/exam'

import { sanitizeExamResults } from './resultSchema'
import { allItems, correctIndexOf, formatClock, itemOptions, scoreExam, taskScore } from './score'

describe('exam content', () => {
  it('has unique ids for sets, tasks and items', () => {
    const tasks = EXAM_SETS.flatMap((set) => set.tasks)
    const items = EXAM_SETS.flatMap((set) => allItems(set))
    expect(new Set(EXAM_SETS.map((set) => set.id)).size).toBe(EXAM_SETS.length)
    expect(new Set(tasks.map((task) => task.id)).size).toBe(tasks.length)
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length)
  })

  it('gives every task a text to read (Lesen) or a recording (Hören), never both or neither', () => {
    for (const set of EXAM_SETS) {
      for (const task of set.tasks) {
        if (set.part === 'lesen') {
          expect(task.textDe, task.id).toBeTruthy()
          expect(task.audioDe, task.id).toBeUndefined()
        } else {
          expect(task.audioDe, task.id).toBeTruthy()
          expect(task.textDe, task.id).toBeUndefined()
        }
        expect(task.items.length, task.id).toBeGreaterThan(0)
      }
    }
  })

  it('has choices with distinct options and a correct index that exists', () => {
    for (const item of EXAM_SETS.flatMap((set) => allItems(set))) {
      const options = itemOptions(item)
      expect(new Set(options).size, item.id).toBe(options.length)
      expect(correctIndexOf(item), item.id).toBeGreaterThanOrEqual(0)
      expect(correctIndexOf(item), item.id).toBeLessThan(options.length)
      expect(item.explanationAr.length, item.id).toBeGreaterThan(10)
    }
  })

  it('does not always put the right answer first, nor always call a statement true', () => {
    for (const set of EXAM_SETS) {
      const items = allItems(set)
      const indexes = items.filter((item) => item.kind === 'choice').map(correctIndexOf)
      expect(new Set(indexes).size, set.id).toBeGreaterThan(1)
      const truths = items.filter((item) => item.kind === 'true-false').map(correctIndexOf)
      expect(new Set(truths).size, set.id).toBe(2)
    }
  })

  it('offers both parts for A1 and for A2', () => {
    for (const level of ['A1', 'A2'] as const) {
      expect(getExamSetsForLevel(level, 'lesen').length).toBeGreaterThan(0)
      expect(getExamSetsForLevel(level, 'hoeren').length).toBeGreaterThan(0)
    }
  })
})

describe('scoreExam', () => {
  const set = getExamSet('a1-lesen-1')!
  const items = allItems(set)

  it('counts right answers, wrong answers and empty ones separately', () => {
    const answers = { [items[0].id]: correctIndexOf(items[0]), [items[1].id]: (correctIndexOf(items[1]) + 1) % itemOptions(items[1]).length }
    const score = scoreExam(set, answers)
    expect(score.total).toBe(items.length)
    expect(score.correct).toBe(1)
    expect(score.unanswered).toBe(items.length - 2)
    expect(score.byItem[items[0].id].correct).toBe(true)
    expect(score.byItem[items[1].id]).toMatchObject({ answered: true, correct: false })
    expect(score.byItem[items[2].id]).toMatchObject({ answered: false, correct: false, chosen: undefined })
  })

  it('gives full marks for all correct answers, and an index of 0 is an answer, not an empty field', () => {
    const answers = Object.fromEntries(items.map((item) => [item.id, correctIndexOf(item)]))
    const score = scoreExam(set, answers)
    expect(score.ratio).toBe(1)
    expect(score.unanswered).toBe(0)
    expect(taskScore(set.tasks[0], score)).toEqual({ correct: 2, total: 2 })
  })

  it('scores nothing for no answers', () => {
    expect(scoreExam(set, {})).toMatchObject({ correct: 0, ratio: 0, unanswered: items.length })
  })
})

describe('helpers', () => {
  it('formats the clock', () => {
    expect(formatClock(425)).toBe('7:05')
    expect(formatClock(59.9)).toBe('0:59')
    expect(formatClock(-3)).toBe('0:00')
  })

  it('sanitises stored results', () => {
    const result = sanitizeExamResults({
      'a1-lesen-1': { attempts: 2, best: 0.9, last: 0.5, lastAt: 10 },
      'a1-hoeren-1': { attempts: 1, best: 3, last: 0.5, lastAt: 10 },
      'Bad Id': { attempts: 1, best: 1, last: 1, lastAt: 1 },
    })
    expect(Object.keys(result)).toEqual(['a1-lesen-1'])
    expect(sanitizeExamResults('x')).toEqual({})
  })
})
