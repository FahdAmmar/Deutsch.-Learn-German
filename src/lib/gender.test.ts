import { describe, expect, it } from 'vitest'

import { GENDER_RULES } from '@/data/genderRules'
import { getAllVocabulary } from '@/lib/curriculum'
import type { VocabularyItem } from '@/types'

import { buildGenderDrill, buildGenderExercise, findGenderRule } from './gender'

const noun = (word: string, article: 'der' | 'die' | 'das'): VocabularyItem => ({
  id: `v-${word}`,
  word,
  article,
  partOfSpeech: 'noun',
  meaningAr: 'x',
  level: 'A1',
  category: 'test',
})

describe('findGenderRule', () => {
  it('explains the article of a noun that follows an ending rule', () => {
    expect(findGenderRule(noun('Wohnung', 'die'))?.id).toBe('ung')
    expect(findGenderRule(noun('Brötchen', 'das'))?.id).toBe('chen-lein')
    expect(findGenderRule(noun('Frühling', 'der'))?.id).toBe('time')
  })

  it('takes the most specific ending: -ie before -e', () => {
    expect(findGenderRule(noun('Familie', 'die'))?.id).toBe('ie')
    expect(findGenderRule(noun('Lampe', 'die'))?.id).toBe('e')
  })

  it('does not explain an exception with the rule it breaks', () => {
    expect(findGenderRule(noun('Name', 'der'))).toBeUndefined()
    expect(findGenderRule(noun('Zimmer', 'das'))).toBeUndefined()
    expect(findGenderRule(noun('Ei', 'das'))).toBeUndefined()
    expect(findGenderRule(noun('Mutter', 'die'))).toBeUndefined()
  })

  it('does not apply the -in rule by looking at the ending, because it needs the meaning', () => {
    expect(findGenderRule(noun('Termin', 'der'))).toBeUndefined()
    expect(findGenderRule(noun('Freundin', 'die'))).toBeUndefined()
  })

  it('ignores the feminine form that some entries add', () => {
    expect(findGenderRule(noun('Student / Studentin', 'der'))).toBeUndefined()
  })
})

describe('buildGenderExercise', () => {
  it('names the rule and the article, and the exceptions of a "mostly" rule', () => {
    const exercise = buildGenderExercise(noun('Lampe', 'die'))!
    expect(exercise.options[exercise.correctIndex]).toBe('die')
    expect(exercise.explanationAr).toContain('-e')
    expect(exercise.explanationAr).toContain('الغالب')
    expect(exercise.explanationAr).toContain('der Name')
  })

  it('says "always" for a rule with no exception', () => {
    expect(buildGenderExercise(noun('Zeitung', 'die'))!.explanationAr).toContain('دائماً')
  })

  it('makes no question for a noun no rule explains', () => {
    expect(buildGenderExercise(noun('Tisch', 'der'))).toBeUndefined()
  })
})

describe('the rules against the curriculum', () => {
  const nouns = getAllVocabulary().filter((item) => item.partOfSpeech === 'noun')

  it('every noun a rule picks has the article the rule teaches', () => {
    for (const item of nouns) {
      const rule = findGenderRule(item)
      if (rule) expect(item.article, `${item.id} (${rule.id})`).toBe(rule.article)
    }
  })

  it('is big enough to be a real drill', () => {
    const drill = buildGenderDrill(nouns, 1000)
    expect(drill.length).toBeGreaterThanOrEqual(30)
  })

  it('lists no example that contradicts its own rule', () => {
    for (const rule of GENDER_RULES) {
      for (const exception of rule.exceptions)
        expect(exception.article, `${rule.id}: ${exception.word}`).not.toBe(rule.article)
    }
  })
})
