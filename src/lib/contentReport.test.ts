import { describe, expect, it } from 'vitest'

import { getLevelsWithContent } from '@/lib/curriculum'

import { buildLevelReport, formatReport } from './contentReport'

describe('buildLevelReport', () => {
  it('counts what a level holds, and the counts agree with each other', () => {
    for (const level of getLevelsWithContent()) {
      const report = buildLevelReport(level)
      expect(report.modules, level).toBeGreaterThan(0)
      expect(report.lessons, level).toBeGreaterThanOrEqual(report.modules)
      expect(report.nouns, level).toBeLessThanOrEqual(report.vocabulary)
      const byType = Object.values(report.exercisesByType).reduce((sum, count) => sum + (count ?? 0), 0)
      expect(byType, level).toBe(report.exercises)
      expect(report.grammar.written, level).toBeLessThanOrEqual(report.grammar.planned)
    }
  })

  it('counts the drills of a level: A2 has all of A1, and more', () => {
    const a1 = buildLevelReport('A1').practice
    const a2 = buildLevelReport('A2').practice
    expect(a1.collocations).toBeGreaterThan(0)
    expect(a2.collocations).toBeGreaterThan(a1.collocations)
    expect(a2.wordOrderSentences).toBeGreaterThan(a1.wordOrderSentences)
    expect(a2.wordFamilyWords).toBeGreaterThan(a1.wordFamilyWords)
    expect(a2.caseFrames).toBeGreaterThan(a1.caseFrames)
  })

  it('finds no lesson without exercises or vocabulary in the shipped content', () => {
    for (const level of getLevelsWithContent()) {
      const { gaps } = buildLevelReport(level)
      expect(gaps.lessonsWithoutExercises, level).toEqual([])
      expect(gaps.dialoguesWithoutGermanTitle, level).toEqual([])
    }
  })
})

describe('formatReport', () => {
  it('names each level and says how many grammar rules are written', () => {
    const text = formatReport(getLevelsWithContent().map(buildLevelReport))
    expect(text).toContain('── A1 ──')
    expect(text).toContain('── A2 ──')
    expect(text).toMatch(/القواعد: \d+ من \d+ مكتوبة/)
  })

  it('lists a gap with its ids, and cuts the list at the sample size', () => {
    const report = buildLevelReport('A1')
    const fake = { ...report, gaps: { ...report.gaps, wordsWithoutExample: ['a', 'b', 'c', 'd'] } }
    const text = formatReport([fake], 2)
    expect(text).toContain('كلمات بلا جملة مثال: 4 — a, b, …')
  })
})
