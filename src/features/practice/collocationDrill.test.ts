import { describe, expect, it } from 'vitest'

import { COLLOCATIONS } from '@/data/collocations'

import { buildCollocationDrill, buildCollocationMatching, buildCollocationQuestion, getCollocationsForLevel } from './collocationDrill'

describe('collocation data', () => {
  it('has unique ids, phrases and meanings (a matching exercise needs distinct sides)', () => {
    for (const key of ['id', 'phrase', 'meaningAr'] as const) {
      expect(new Set(COLLOCATIONS.map((entry) => entry[key])).size, key).toBe(COLLOCATIONS.length)
    }
  })

  it('writes the phrase as the object followed by the verb', () => {
    for (const entry of COLLOCATIONS) expect(entry.phrase, entry.id).toBe(`${entry.object} ${entry.verb}`)
  })

  it('never offers the right verb as a wrong one, and offers four different verbs', () => {
    for (const entry of COLLOCATIONS) {
      const verbs = [entry.verb, entry.wrongVerb, ...entry.distractors]
      expect(new Set(verbs).size, entry.id).toBe(4)
    }
  })

  it('has an example that uses the noun of the phrase', () => {
    for (const entry of COLLOCATIONS) {
      const noun = entry.object.split(' ').at(-1) ?? ''
      expect(entry.example.de.toLowerCase(), entry.id).toContain(noun.toLowerCase())
      expect(entry.example.ar, entry.id).toBeTruthy()
    }
  })

  it('has something for every level, and A1 sees no A2 phrase', () => {
    expect(getCollocationsForLevel('A1').length).toBeGreaterThanOrEqual(5)
    expect(getCollocationsForLevel('A1').every((entry) => entry.level === 'A1')).toBe(true)
    expect(getCollocationsForLevel('A2')).toHaveLength(COLLOCATIONS.length)
  })
})

describe('collocation drill', () => {
  it('asks for the verb with the noun, and the wrong verb a learner would pick is among the options', () => {
    const entry = COLLOCATIONS.find((candidate) => candidate.id === 'foto-machen')!
    const question = buildCollocationQuestion(entry)
    expect(question.questionDe).toBe('ein Foto ___')
    expect(question.options[question.correctIndex]).toBe('machen')
    expect(question.options).toContain('nehmen')
    expect(question.explanationAr).toContain('ein Foto machen')
  })

  it('builds a matching exercise with distinct pairs', () => {
    const matching = buildCollocationMatching(COLLOCATIONS)
    expect(matching.pairs).toHaveLength(5)
    expect(new Set(matching.pairs.map((pair) => pair.de)).size).toBe(5)
    expect(new Set(matching.pairs.map((pair) => pair.ar)).size).toBe(5)
  })

  it('builds a session of questions that ends with a matching exercise, without repeating a phrase', () => {
    for (let round = 0; round < 20; round += 1) {
      const session = buildCollocationDrill('A2', 10)
      expect(session).toHaveLength(10)
      expect(session.at(-1)?.type).toBe('matching')
      const questions = session.slice(0, -1)
      expect(new Set(questions.map((exercise) => (exercise.type === 'multiple-choice' ? exercise.explanationAr : ''))).size).toBe(questions.length)
      for (const exercise of questions) {
        if (exercise.type !== 'multiple-choice') throw new Error('expected multiple choice')
        expect(new Set(exercise.options).size).toBe(4)
      }
    }
  })

  it('shortens the session to the phrases a level has', () => {
    const session = buildCollocationDrill('A1', 10)
    expect(session).toHaveLength(getCollocationsForLevel('A1').length + 1)
  })
})
