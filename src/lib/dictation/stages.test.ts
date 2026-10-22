import { describe, expect, it } from 'vitest'

import { buildCells } from './engine'
import { clozeGiven, isDue, nextStage, PASS_ACCURACY, planFor, progressAfterRun, REVIEW_DAYS, type StageProgress } from './stages'

const DAY = 24 * 60 * 60 * 1000
const NOW = 1_000_000

describe('clozeGiven', () => {
  it('gives every other word, starting with the first', () => {
    expect([...clozeGiven('Ich lerne heute Deutsch und Arabisch')]).toEqual([0, 2, 4])
    expect([...clozeGiven('Guten Morgen')]).toEqual([0])
  })

  it('gives nothing in a one-word part, which would otherwise be passed for free', () => {
    expect(clozeGiven('Hallo').size).toBe(0)
    expect(clozeGiven('Hallo!').size).toBe(0)
  })

  it('counts words, not punctuation', () => {
    // geht’s is one word: an apostrophe between letters does not cut it in two.
    expect([...clozeGiven('Wie geht’s dir, Anna?')]).toEqual([0, 2])
  })

  it('leaves at least one word to type in any part of two or more words', () => {
    for (const text of ['a b', 'a b c', 'Das ist gut.', 'Eins, zwei, drei, vier.']) {
      const typed = buildCells(text, clozeGiven(text)).filter((cell) => cell.typeable && cell.char !== ' ')
      expect(typed.length, text).toBeGreaterThan(0)
    }
  })
})

describe('planFor', () => {
  it('takes away one help at a time', () => {
    expect(planFor('copy')).toEqual({ autoSpeak: true, reveal: 'text' })
    expect(planFor('cloze')).toMatchObject({ autoSpeak: true, reveal: 'text' })
    expect(planFor('cloze').given).toBeDefined()
    expect(planFor('initials')).toEqual({ autoSpeak: true, reveal: 'initials' })
    expect(planFor('memory')).toEqual({ autoSpeak: false, reveal: 'none' })
  })
})

describe('progressAfterRun', () => {
  const start: StageProgress = { stage: 'copy', box: 0, dueAt: null }

  it('moves up a stage after a pass, and stays after a miss', () => {
    expect(progressAfterRun(start, 'copy', PASS_ACCURACY, NOW).stage).toBe('cloze')
    expect(progressAfterRun(start, 'copy', PASS_ACCURACY - 0.01, NOW)).toEqual(start)
  })

  it('walks all the way to memory without scheduling anything on the way', () => {
    let progress: StageProgress = start
    for (const expected of ['cloze', 'initials', 'memory']) {
      progress = progressAfterRun(progress, progress.stage, 1, NOW)
      expect(progress.stage).toBe(expected)
      expect(progress.dueAt).toBeNull()
    }
  })

  it('does not count a run at another stage than the one reached', () => {
    const atInitials: StageProgress = { stage: 'initials', box: 0, dueAt: null }
    expect(progressAfterRun(atInitials, 'copy', 1, NOW)).toEqual(atInitials)
    expect(progressAfterRun(atInitials, 'memory', 1, NOW)).toEqual(atInitials)
  })

  it('schedules the first review for tomorrow after the first pass from memory', () => {
    const result = progressAfterRun({ stage: 'memory', box: 0, dueAt: null }, 'memory', 0.95, NOW)
    expect(result).toEqual({ stage: 'memory', box: 1, dueAt: NOW + REVIEW_DAYS[1] * DAY })
  })

  it('moves the review further out with each pass, and stops at the last box', () => {
    let progress: StageProgress = { stage: 'memory', box: 0, dueAt: null }
    const gaps: number[] = []
    for (let pass = 0; pass < 6; pass += 1) {
      progress = progressAfterRun(progress, 'memory', 1, NOW)
      gaps.push((progress.dueAt! - NOW) / DAY)
    }
    expect(gaps).toEqual([3, 7, 14, 30, 30, 30])
  })

  it('brings the review back to tomorrow and down a box after a miss from memory', () => {
    const result = progressAfterRun({ stage: 'memory', box: 3, dueAt: NOW }, 'memory', 0.5, NOW)
    expect(result).toEqual({ stage: 'memory', box: 2, dueAt: NOW + DAY })
    expect(progressAfterRun({ stage: 'memory', box: 0, dueAt: NOW }, 'memory', 0, NOW).box).toBe(0)
  })
})

describe('nextStage and isDue', () => {
  it('stops at the last stage', () => {
    expect(nextStage('copy')).toBe('cloze')
    expect(nextStage('memory')).toBe('memory')
  })

  it('is due only once the date has come, and never before a first pass from memory', () => {
    expect(isDue(null, NOW)).toBe(false)
    expect(isDue(NOW + 1, NOW)).toBe(false)
    expect(isDue(NOW, NOW)).toBe(true)
  })
})

describe('progressAfterRun returns only the progress fields', () => {
  it('so spreading it over a larger record cannot overwrite the rest of it', () => {
    const record = { stage: 'copy' as const, box: 0, dueAt: null, attempts: 3, title: 'x' }
    expect(Object.keys(progressAfterRun(record, 'memory', 1, NOW)).sort()).toEqual(['box', 'dueAt', 'stage'])
    expect(Object.keys(progressAfterRun(record, 'copy', 0, NOW)).sort()).toEqual(['box', 'dueAt', 'stage'])
  })
})

describe('progressAfterRun returns only the progress fields', () => {
  it('so spreading it over a larger record cannot overwrite the rest of it', () => {
    const record = { stage: 'copy' as const, box: 0, dueAt: null, attempts: 3, title: 'x' }
    expect(Object.keys(progressAfterRun(record, 'memory', 1, NOW)).sort()).toEqual(['box', 'dueAt', 'stage'])
    expect(Object.keys(progressAfterRun(record, 'copy', 0, NOW)).sort()).toEqual(['box', 'dueAt', 'stage'])
  })
})
