import { describe, expect, it } from 'vitest'

import { getWritingTask, WRITING_TASKS } from '@/data/writing'

import { checkWriting, countWords, normalizeForMatch } from './check'
import { sanitizeWritingDrafts } from './draftSchema'

describe('normalizeForMatch', () => {
  it('writes umlauts and ß out so both spellings match', () => {
    expect(normalizeForMatch('Liebe Grüße, schön, groß')).toBe('liebe gruesse, schoen, gross')
  })
})

describe('countWords', () => {
  it('counts words and ignores stray punctuation and blank lines', () => {
    expect(countWords('Hallo Anna,\n\nich bin hier – und du ?')).toBe(7)
    expect(countWords('   ')).toBe(0)
  })
})

describe('writing task content', () => {
  it('has unique ids, at least three points each, and a model answer in German and Arabic', () => {
    expect(new Set(WRITING_TASKS.map((task) => task.id)).size).toBe(WRITING_TASKS.length)
    for (const task of WRITING_TASKS) {
      expect(task.points.length, task.id).toBeGreaterThanOrEqual(3)
      expect(new Set(task.points.map((point) => point.id)).size, task.id).toBe(task.points.length)
      expect(task.modelAnswer.length, task.id).toBeGreaterThan(0)
      expect(task.modelAnswerAr.length, task.id).toBeGreaterThan(0)
      expect(task.usefulPhrases.length, task.id).toBeGreaterThan(0)
    }
  })

  it('writes every pattern without umlauts and as a valid expression', () => {
    for (const task of WRITING_TASKS) {
      for (const point of task.points) {
        for (const pattern of point.patterns) {
          expect(() => new RegExp(pattern), `${task.id}/${point.id}`).not.toThrow()
          expect(/[äöüß]/.test(pattern), `${task.id}/${point.id}: ${pattern}`).toBe(false)
        }
      }
    }
  })

  it('has a model answer that passes its own check: greeting, closing, every point, enough words', () => {
    for (const task of WRITING_TASKS) {
      const check = checkWriting(task, task.modelAnswer)
      expect(check.greeting, `${task.id} greeting`).toBe(true)
      expect(check.closing, `${task.id} closing`).toBe(true)
      expect(check.enoughWords, `${task.id} words (${check.words})`).toBe(true)
      for (const point of check.points) expect(point.found, `${task.id}/${point.id}`).toBe(true)
    }
  })

  it('does not pass an empty text', () => {
    for (const task of WRITING_TASKS) {
      const check = checkWriting(task, '')
      expect(check.words).toBe(0)
      expect(check.greeting).toBe(false)
      expect(check.allPointsCovered).toBe(false)
    }
  })
})

describe('checkWriting', () => {
  const task = getWritingTask('a1-write-02-krank')!

  it('asks a formal text for a formal closing, not "Liebe Grüße"', () => {
    const casual = 'Sehr geehrte Frau Weber,\nich bin krank.\nLiebe Grüße\nTarek'
    expect(checkWriting(task, casual).closing).toBe(false)
    expect(checkWriting(task, `${casual}\nMit freundlichen Grüßen`).closing).toBe(true)
  })

  it('accepts a point the learner confirmed by hand', () => {
    const text = 'Sehr geehrte Frau Weber,\nich komme nicht.'
    const missing = checkWriting(task, text).points.filter((point) => !point.found)
    expect(missing.length).toBeGreaterThan(0)
    const confirmed = checkWriting(task, text, missing.map((point) => point.id))
    expect(confirmed.allPointsCovered).toBe(true)
  })

  it('finds points however the umlauts are typed', () => {
    const dateTask = getWritingTask('a2-write-02-reklamation')!
    expect(checkWriting(dateTask, 'Es ist zu klein. Ich möchte die Größe tauschen.').points.map((p) => p.found)).toEqual([false, true, true])
    expect(checkWriting(dateTask, 'Es ist zu klein. Ich moechte die Groesse tauschen.').points.map((p) => p.found)).toEqual([false, true, true])
  })
})

describe('sanitizeWritingDrafts', () => {
  it('keeps valid drafts, trims over-long text, and drops damaged or oddly named entries', () => {
    const result = sanitizeWritingDrafts({
      'a1-write-01-einladung': { text: 'x'.repeat(5000), updatedAt: 1, completed: false, confirmedPointIds: [] },
      'a1-write-02-krank': { text: 5, updatedAt: 1, completed: false, confirmedPointIds: [] },
      'Bad Id!': { text: 'ok', updatedAt: 1, completed: false, confirmedPointIds: [] },
    })
    expect(Object.keys(result)).toEqual(['a1-write-01-einladung'])
    expect(result['a1-write-01-einladung'].text).toHaveLength(3000)
  })

  it('gives an empty record for anything that is not an object', () => {
    expect(sanitizeWritingDrafts(null)).toEqual({})
    expect(sanitizeWritingDrafts([1, 2])).toEqual({})
    expect(sanitizeWritingDrafts('text')).toEqual({})
  })
})
