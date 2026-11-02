import { describe, expect, it } from 'vitest'

import { COMPOUNDS } from '@/data/compounds'

import { buildCompoundArticleQuestion, buildCompoundBuildQuestion, buildCompoundDrill, getCompoundsForLevel } from './compoundDrill'

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1)

describe('compound data', () => {
  it('has unique ids and unique compounds', () => {
    expect(new Set(COMPOUNDS.map((entry) => entry.id)).size).toBe(COMPOUNDS.length)
    expect(new Set(COMPOUNDS.map((entry) => entry.word)).size).toBe(COMPOUNDS.length)
  })

  it('takes the article of the last part — the rule the feature teaches', () => {
    for (const entry of COMPOUNDS) expect(entry.article, entry.word).toBe(entry.second.article)
  })

  it('spells the compound as the first part as it stands plus the second part in lower case', () => {
    for (const entry of COMPOUNDS) expect(entry.word, entry.id).toBe(entry.firstForm + lowerFirst(entry.second.word))
  })

  it('derives the first form from the first part: unchanged, shortened, or with something added', () => {
    for (const entry of COMPOUNDS) {
      const { word } = entry.first
      const related = entry.firstForm.startsWith(word) || word.startsWith(entry.firstForm)
      expect(related, entry.id).toBe(true)
      // Whenever the form differs from the dictionary form, the learner is told why.
      if (entry.firstForm !== word) expect(entry.joinNoteAr, entry.id).toBeTruthy()
    }
  })
})

describe('compound drill', () => {
  it('offers A1 learners only the A1 compounds', () => {
    expect(getCompoundsForLevel('A1').every((entry) => entry.level === 'A1')).toBe(true)
    expect(getCompoundsForLevel('A2')).toHaveLength(COMPOUNDS.length)
  })

  it('asks for the article with the three articles as options', () => {
    const compound = COMPOUNDS.find((entry) => entry.id === 'haustuer')!
    const question = buildCompoundArticleQuestion(compound)
    expect(question.options).toEqual(['der', 'die', 'das'])
    expect(question.options[question.correctIndex]).toBe('die')
    expect(question.explanationAr).toContain('das Haus + die Tür = die Haustür')
  })

  it('offers the right spelling among distinct wrong ones, for every compound', () => {
    for (const compound of COMPOUNDS) {
      const question = buildCompoundBuildQuestion(compound)
      expect(question.options[question.correctIndex], compound.id).toBe(compound.word)
      expect(new Set(question.options).size, compound.id).toBe(question.options.length)
      expect(question.options.length, compound.id).toBeGreaterThanOrEqual(2)
    }
  })

  it('builds a session without repeating a compound', () => {
    const session = buildCompoundDrill('A2', 100)
    expect(session).toHaveLength(COMPOUNDS.length)
    expect(new Set(session.map((exercise) => exercise.id)).size).toBe(session.length)
  })
})
