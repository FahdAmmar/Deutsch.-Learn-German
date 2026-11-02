import { describe, expect, it } from 'vitest'

import { CASE_FRAMES, CASE_NOUNS, REGULAR_ADJECTIVES } from '@/data/caseDrill'
import { getAllVocabulary } from '@/lib/curriculum'
import { GENDER_OF_ARTICLE, nounPhrase } from '@/lib/generators/cases'

import { buildAdjectiveDrill, buildAdjectiveQuestion, getAdjectiveNouns, isValidAdjectiveScenario, type AdjectiveScenario } from './adjectiveDrill'
import { buildCaseDrill, buildCaseQuestion, countCaseScenarios, getCaseFrames, getCompatibleNouns, type CaseScenario } from './caseDrill'

const tisch = CASE_NOUNS.find((noun) => noun.id === 'tisch')!
const frau = CASE_NOUNS.find((noun) => noun.id === 'frau')!
const kind = CASE_NOUNS.find((noun) => noun.id === 'kind')!
const helfen = CASE_FRAMES.find((frame) => frame.id === 'helfen')!
const sehen = CASE_FRAMES.find((frame) => frame.id === 'sehen')!
const aufWo = CASE_FRAMES.find((frame) => frame.id === 'auf-wo')!
const aufWohin = CASE_FRAMES.find((frame) => frame.id === 'auf-wohin')!

describe('case drill data', () => {
  it('has unique noun and frame ids', () => {
    expect(new Set(CASE_NOUNS.map((noun) => noun.id)).size).toBe(CASE_NOUNS.length)
    expect(new Set(CASE_FRAMES.map((frame) => frame.id)).size).toBe(CASE_FRAMES.length)
  })

  it('has a genitive for every masculine and neuter person a genitive frame can use', () => {
    for (const noun of CASE_NOUNS) {
      if (noun.group === 'person' && GENDER_OF_ARTICLE[noun.article] !== 'f') {
        expect(noun.genitive, noun.word).toMatch(/s$/)
        expect(noun.genitive!.startsWith(noun.word), noun.word).toBe(true)
      }
    }
  })

  it('names the same article and plural as the curriculum vocabulary wherever a word appears in both', () => {
    const vocabulary = getAllVocabulary().filter((item) => item.partOfSpeech === 'noun' && item.article)
    let compared = 0
    for (const noun of CASE_NOUNS) {
      const match = vocabulary.find((item) => item.word === noun.word)
      if (!match) continue
      compared += 1
      expect(match.article, noun.word).toBe(noun.article)
      if (match.plural && !/[/,(]/.test(match.plural)) expect(match.plural, noun.word).toBe(noun.plural)
    }
    // The check is only worth something if the two lists overlap.
    expect(compared).toBeGreaterThan(10)
  })

  it('gives every frame at least three nouns to choose from', () => {
    for (const frame of CASE_FRAMES) expect(getCompatibleNouns(frame, 'A2').length, frame.id).toBeGreaterThanOrEqual(3)
  })

  it('keeps A1 to the A1 frames, and A2 gets all of them', () => {
    expect(getCaseFrames('A1').every((frame) => frame.level === 'A1')).toBe(true)
    expect(getCaseFrames('A2')).toHaveLength(CASE_FRAMES.length)
    expect(countCaseScenarios('A2')).toBeGreaterThan(countCaseScenarios('A1'))
  })

  it('has regular adjectives only: none that drop an -e- when declined', () => {
    for (const adjective of REGULAR_ADJECTIVES) expect(adjective, adjective).not.toMatch(/el$|(eu|au)er$|^hoch$/)
  })

  it('offers no people to an adjective, and nothing absurd with one', () => {
    expect(getAdjectiveNouns().every((noun) => noun.group !== 'person')).toBe(true)
  })
})

describe('case questions', () => {
  const scenario = (overrides: Partial<CaseScenario>): CaseScenario => ({ frame: sehen, noun: tisch, kind: 'definite', number: 'singular', ...overrides })

  it('asks for the accusative article of a masculine noun', () => {
    const question = buildCaseQuestion(scenario({}), 'choose')
    if (question.type !== 'multiple-choice') throw new Error('expected multiple choice')
    expect(question.questionDe).toBe('Ich sehe ___ Tisch.')
    expect(question.options[question.correctIndex]).toBe('den')
    expect(new Set(question.options).size).toBe(question.options.length)
    expect(question.explanationAr).toContain('der ← den')
  })

  it('takes the dative article for a verb that governs the dative', () => {
    const question = buildCaseQuestion(scenario({ frame: helfen, noun: frau }), 'type')
    if (question.type !== 'fill-blank') throw new Error('expected fill-blank')
    expect(question.sentenceDe).toBe('Ich helfe ___ Frau.')
    expect(question.acceptedAnswers).toEqual(['der'])
  })

  it('adds -n to the noun in the dative plural and says so', () => {
    const question = buildCaseQuestion(scenario({ frame: helfen, noun: kind, number: 'plural' }), 'type')
    if (question.type !== 'fill-blank') throw new Error('expected fill-blank')
    expect(question.sentenceDe).toBe('Ich helfe ___ Kindern.')
    expect(question.acceptedAnswers).toEqual(['den'])
    expect(question.explanationAr).toContain('Kinder ← Kindern')
  })

  it('uses the indefinite article when asked to', () => {
    const question = buildCaseQuestion(scenario({ kind: 'indefinite' }), 'type')
    if (question.type !== 'fill-blank') throw new Error('expected fill-blank')
    expect(question.acceptedAnswers).toEqual(['einen'])
  })

  it('tells Wo? (dative) from Wohin? (accusative) with the same preposition', () => {
    const wo = buildCaseQuestion(scenario({ frame: aufWo }), 'type')
    const wohin = buildCaseQuestion(scenario({ frame: aufWohin }), 'type')
    if (wo.type !== 'fill-blank' || wohin.type !== 'fill-blank') throw new Error('expected fill-blank')
    expect(wo.acceptedAnswers).toEqual(['dem'])
    expect(wohin.acceptedAnswers).toEqual(['den'])
  })

  it('names the case, and offers Genitiv only from A2', () => {
    const a1 = buildCaseQuestion(scenario({}), 'name', 'A1')
    const a2 = buildCaseQuestion(scenario({}), 'name', 'A2')
    if (a1.type !== 'multiple-choice' || a2.type !== 'multiple-choice') throw new Error('expected multiple choice')
    expect(a1.options).toEqual(['Nominativ', 'Akkusativ', 'Dativ'])
    expect(a2.options).toEqual(['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'])
    expect(a1.options[a1.correctIndex]).toBe('Akkusativ')
    expect(a1.promptAr).toContain('den Tisch')
  })
})

describe('case drill sessions', () => {
  it('builds a session without repeating a sentence, and every answer is among the options', () => {
    for (let round = 0; round < 40; round += 1) {
      const session = buildCaseDrill('A2', 12)
      expect(session).toHaveLength(12)
      for (const exercise of session) {
        if (exercise.type === 'multiple-choice') {
          expect(exercise.options[exercise.correctIndex]).toBeTruthy()
          expect(new Set(exercise.options).size).toBe(exercise.options.length)
        }
        if (exercise.type === 'fill-blank') {
          expect(exercise.sentenceDe.split('___')).toHaveLength(2)
          expect(exercise.acceptedAnswers[0]).toBeTruthy()
        }
      }
      expect(new Set(session.map((exercise) => exercise.id)).size).toBe(session.length)
    }
  })

  it('keeps A1 sessions to A1 frames: no Wechselpräpositionen, no genitive', () => {
    for (let round = 0; round < 30; round += 1) {
      for (const exercise of buildCaseDrill('A1', 10)) {
        const text = exercise.type === 'multiple-choice' ? exercise.questionDe : exercise.type === 'fill-blank' ? exercise.sentenceDe : ''
        expect(text).not.toMatch(/liegt auf|stelle|schläft unter|Wir gehen in|Wir sind in|Das ist das Auto/)
        if (exercise.type === 'multiple-choice' && exercise.options.includes('Nominativ')) expect(exercise.options).not.toContain('Genitiv')
      }
    }
  })

  it('writes a whole sentence for every frame, noun, kind and number that can occur', () => {
    for (const frame of CASE_FRAMES) {
      for (const noun of getCompatibleNouns(frame, 'A2')) {
        for (const number of ['singular', 'plural'] as const) {
          expect(nounPhrase(noun, { kind: 'definite', caseName: frame.caseName, number }), `${frame.id} ${noun.id}`).toBeTruthy()
        }
        expect(nounPhrase(noun, { kind: 'indefinite', caseName: frame.caseName, number: 'singular' }), `${frame.id} ${noun.id}`).toBeTruthy()
      }
    }
  })
})

describe('adjective endings drill', () => {
  const adjScenario = (overrides: Partial<AdjectiveScenario>): AdjectiveScenario => ({
    frame: { caseName: 'akkusativ', before: 'Ich kaufe', after: '.' },
    noun: tisch,
    adjective: 'neu',
    kind: 'indefinite',
    number: 'singular',
    ...overrides,
  })

  it('asks for -en after einen (masculine accusative)', () => {
    const question = buildAdjectiveQuestion(adjScenario({}), 'choose')
    if (question.type !== 'multiple-choice') throw new Error('expected multiple choice')
    expect(question.questionDe).toBe('Ich kaufe einen ___ Tisch.')
    expect(question.options).toHaveLength(4)
    expect(question.options[question.correctIndex]).toBe('neuen')
  })

  it('asks for -er after ein in the nominative masculine', () => {
    const question = buildAdjectiveQuestion(adjScenario({ frame: { caseName: 'nominativ', before: 'Hier ist', after: '.' } }), 'type')
    if (question.type !== 'fill-blank') throw new Error('expected fill-blank')
    expect(question.sentenceDe).toBe('Hier ist ein ___ Tisch.')
    expect(question.acceptedAnswers).toEqual(['neuer'])
  })

  it('accepts ss for ß in a typed answer', () => {
    const question = buildAdjectiveQuestion(adjScenario({ adjective: 'groß', kind: 'definite' }), 'type')
    if (question.type !== 'fill-blank') throw new Error('expected fill-blank')
    expect(question.acceptedAnswers).toEqual(['großen', 'grossen'])
  })

  it('uses -en in the plural and after any dative article', () => {
    const plural = buildAdjectiveQuestion(
      adjScenario({ frame: { caseName: 'nominativ', before: 'Hier ist', beforePlural: 'Hier sind', after: '.' }, kind: 'definite', number: 'plural' }),
      'type',
    )
    if (plural.type !== 'fill-blank') throw new Error('expected fill-blank')
    expect(plural.sentenceDe).toBe('Hier sind die ___ Tische.')
    expect(plural.acceptedAnswers).toEqual(['neuen'])
  })

  it('rules out combinations that do not exist', () => {
    expect(isValidAdjectiveScenario(adjScenario({ number: 'plural' }))).toBe(false)
    expect(isValidAdjectiveScenario(adjScenario({ kind: 'negative', frame: { caseName: 'dativ', before: 'Wir sprechen von', after: '.' } }))).toBe(false)
    expect(isValidAdjectiveScenario(adjScenario({}))).toBe(true)
  })

  it('builds sessions in which every answer is one of the four options', () => {
    for (let round = 0; round < 40; round += 1) {
      const session = buildAdjectiveDrill(10)
      expect(session).toHaveLength(10)
      for (const exercise of session) {
        if (exercise.type === 'multiple-choice') {
          expect(new Set(exercise.options).size).toBe(4)
          expect(exercise.options[exercise.correctIndex]).toBeTruthy()
        }
        if (exercise.type === 'fill-blank') expect(exercise.sentenceDe.split('___')).toHaveLength(2)
      }
    }
  })
})
