import { describe, expect, it } from 'vitest'

import { getLevelChapters } from '@/lib/learningPath'

import { describeStepCounts, getStepHref, getStepTitles } from './stepInfo'

describe('describeStepCounts', () => {
  it('names each kind with the right Arabic number form and skips what is absent', () => {
    expect(describeStepCounts({ lesson: 6, rule: 3, reading: 2, conversation: 1 })).toBe('6 دروس · 3 قواعد · نصان · محادثة واحدة')
    expect(describeStepCounts({ lesson: 11, rule: 0, reading: 0, conversation: 0 })).toBe('11 درساً')
    expect(describeStepCounts({ lesson: 1, rule: 0, reading: 1, conversation: 0 })).toBe('درس واحد · نص واحد')
  })
})

describe('step links and titles', () => {
  const steps = getLevelChapters('A1').flatMap((entry) => entry.steps)
  const find = (key: string) => steps.find((step) => step.key === key)!

  it('opens a lesson, a rule and a text on their own pages', () => {
    expect(getStepHref(find('lesson:a1-m01-l01'))).toBe('/lessons/a1/begruessungen')
    expect(getStepHref(find('rule:3'))).toMatch(/^\/grammar\/a1\//)
    expect(getStepHref(find('story:a1-read-02'))).toBe('/levels/a1/texts/a1-read-02')
    expect(getStepHref(find('story:dialogue-a1-am-telefon'))).toBe('/levels/a1/texts/dialogue-a1-am-telefon')
  })

  it('titles each kind in Arabic and German', () => {
    expect(getStepTitles(find('story:a1-read-02')).de).toBe('Mein Tag')
    expect(getStepTitles(find('rule:3')).ar.length).toBeGreaterThan(0)
    expect(getStepTitles(find('lesson:a1-m01-l06')).de).toBe('Fragewörter')
  })
})
