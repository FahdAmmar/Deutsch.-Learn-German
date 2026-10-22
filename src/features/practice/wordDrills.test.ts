import { describe, expect, it } from 'vitest'

import { getAllVocabulary } from '@/lib/curriculum'
import type { FillBlankExercise, MultipleChoiceExercise, VocabularyItem } from '@/types'
import { isAnswerAccepted } from '@/utils/text'

import { buildPluralDrill, buildPluralExercise, buildVerbDrill, buildVerbQuestions, countVerbs } from './wordDrills'
import { buildArticleExercise } from './sessions'

const vocabulary = getAllVocabulary()
const find = (word: string, level?: string) =>
  vocabulary.find((item) => item.word === word && (!level || item.level === level))!

describe('plural drill', () => {
  it('asks the plural with the right answer among the options and a rule in the explanation', () => {
    const tisch = find('Tisch')
    const exercise = buildPluralExercise(tisch, new Set()) as MultipleChoiceExercise
    expect(exercise.options[exercise.correctIndex]).toBe('Tische')
    expect(new Set(exercise.options).size).toBe(exercise.options.length)
    expect(exercise.explanationAr).toContain('Tische')
  })

  it('asks nothing for a noun without an ordinary plural or with two plurals in one entry', () => {
    expect(buildPluralExercise(find('Eltern'), new Set())).toBeUndefined()
    expect(buildPluralExercise(find('Hunger'), new Set())).toBeUndefined()
    expect(buildPluralExercise(find('Lehrer / Lehrerin'), new Set())).toBeUndefined()
  })

  it('has enough nouns to fill a session and never repeats a question', () => {
    const drill = buildPluralDrill(vocabulary, 1000)
    expect(drill.length).toBeGreaterThanOrEqual(100)
    expect(new Set(drill.map((exercise) => exercise.id)).size).toBe(drill.length)
  })

  it('never offers a wrong plural that is the right one', () => {
    for (const exercise of buildPluralDrill(vocabulary, 1000) as MultipleChoiceExercise[]) {
      expect(exercise.options.filter((option) => option === exercise.options[exercise.correctIndex])).toHaveLength(1)
    }
  })
})

describe('article drill with a feminine form', () => {
  it('asks about the masculine word alone and names the feminine in the explanation', () => {
    const exercise = buildArticleExercise(find('Lehrer / Lehrerin'))!
    expect(exercise.questionDe).toBe('Lehrer')
    expect(exercise.explanationAr).toContain('die Lehrerin')
  })
})

describe('verb drill', () => {
  const options = { includePraeteritum: false }

  it('asks the stem-changing forms of an irregular verb, and accepts exactly the right one', () => {
    const fahren = find('fahren')
    for (let round = 0; round < 30; round += 1) {
      const present = buildVerbQuestions(fahren, options).find((question) =>
        question.id.startsWith('verb-present'),
      ) as FillBlankExercise
      expect(['du', 'er']).toContain(present.sentenceDe.split(' ')[0])
      expect(isAnswerAccepted(present.sentenceDe.startsWith('du') ? 'fährst' : 'fährt', present.acceptedAnswers)).toBe(
        true,
      )
    }
  })

  it('knows the auxiliary and the participle', () => {
    const questions = buildVerbQuestions(find('kommen'), options)
    const aux = questions.find((question) => question.id.startsWith('verb-aux')) as MultipleChoiceExercise
    const participle = questions.find((question) => question.id.startsWith('verb-participle')) as FillBlankExercise
    expect(aux.options[aux.correctIndex]).toBe('sein')
    expect(participle.sentenceDe).toBe('Er ist ___ . (kommen)')
    expect(participle.acceptedAnswers).toEqual(['gekommen'])
  })

  it('puts the reflexive pronoun and the separable prefix where German puts them', () => {
    const freuen = buildVerbQuestions(find('sich freuen'), options).find((question) =>
      question.id.startsWith('verb-participle'),
    ) as FillBlankExercise
    expect(freuen.sentenceDe).toBe('Er hat sich ___ . (sich freuen)')
    const aufstehen = buildVerbQuestions(find('aufstehen', 'A1'), options).find((question) =>
      question.id.startsWith('verb-present'),
    )!
    expect((aufstehen as FillBlankExercise).acceptedAnswers[0].endsWith(' auf')).toBe(true)
  })

  it('leaves out the Präteritum in an A1 session and the modals from the Perfekt questions', () => {
    expect(
      buildVerbQuestions(find('fahren'), options).some((question) => question.id.startsWith('verb-praeteritum')),
    ).toBe(false)
    expect(
      buildVerbQuestions(find('fahren'), { includePraeteritum: true }).some((question) =>
        question.id.startsWith('verb-praeteritum'),
      ),
    ).toBe(true)
    const modal = buildVerbQuestions(find('können'), {
      includePraeteritum: true,
    })
    expect(
      modal.some((question) => question.id.startsWith('verb-aux') || question.id.startsWith('verb-participle')),
    ).toBe(false)
  })

  it('asks every verb at most once per session, even when it appears in several modules', () => {
    const drill = buildVerbDrill(vocabulary, options, 1000)
    expect(drill.length).toBeGreaterThanOrEqual(60)
    expect(drill.length).toBeLessThanOrEqual(countVerbs(vocabulary))
    expect(new Set(drill.map((exercise) => exercise.id)).size).toBe(drill.length)
  })

  it('makes questions only for verbs', () => {
    const noun: VocabularyItem = {
      id: 'n',
      word: 'Tisch',
      article: 'der',
      partOfSpeech: 'noun',
      meaningAr: 'x',
      level: 'A1',
      category: 't',
    }
    expect(buildVerbQuestions(noun, options)).toEqual([])
  })
})
