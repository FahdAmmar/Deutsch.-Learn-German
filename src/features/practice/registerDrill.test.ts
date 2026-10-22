import { describe, expect, it } from 'vitest'

import { REGISTER_PAIRS, REGISTER_SITUATIONS } from '@/data/registers'
import type { FillBlankExercise, MultipleChoiceExercise } from '@/types'
import { isAnswerAccepted } from '@/utils/text'

import { buildRegisterDrill } from './registerDrill'

describe('register data', () => {
  it('keeps each pair different, and each form in its own register', () => {
    for (const pair of REGISTER_PAIRS) {
      expect(pair.informal, pair.id).not.toBe(pair.formal)
      expect(pair.formal, pair.id).toMatch(/\b(Sie|Ihr|Ihre|Ihnen)\b/)
      expect(pair.informal, pair.id).toMatch(/\b(du|dich|dir|dein|deine)\b|^(Komm|Setz)\b/)
      expect(pair.informal, pair.id).not.toMatch(/\b(Sie|Ihr|Ihre|Ihnen)\b/)
    }
  })

  it('has unique ids, and situations for both registers', () => {
    expect(new Set(REGISTER_PAIRS.map((pair) => pair.id)).size).toBe(REGISTER_PAIRS.length)
    expect(new Set(REGISTER_SITUATIONS.map((situation) => situation.id)).size).toBe(REGISTER_SITUATIONS.length)
    expect(REGISTER_SITUATIONS.some((situation) => situation.register === 'formal')).toBe(true)
    expect(REGISTER_SITUATIONS.some((situation) => situation.register === 'informal')).toBe(true)
  })
})

describe('buildRegisterDrill', () => {
  it('asks each pair once, mixing situations and conversions', () => {
    for (let round = 0; round < 30; round += 1) {
      const session = buildRegisterDrill(10)
      expect(session).toHaveLength(10)
      expect(session.some((exercise) => exercise.type === 'multiple-choice')).toBe(true)
      expect(session.some((exercise) => exercise.type === 'fill-blank')).toBe(true)
      const pairs = session.map((exercise) => exercise.id.split('-')[2])
      expect(new Set(pairs).size).toBe(session.length)
    }
  })

  it('has the right sentence for the situation among two options, with the rule in the explanation', () => {
    for (let round = 0; round < 40; round += 1) {
      for (const exercise of buildRegisterDrill(10).filter(
        (each): each is MultipleChoiceExercise => each.type === 'multiple-choice',
      )) {
        expect(exercise.options).toHaveLength(2)
        const right = exercise.options[exercise.correctIndex]
        const formalSituation =
          REGISTER_SITUATIONS.find((situation) => exercise.promptAr.startsWith(situation.situationAr))!.register ===
          'formal'
        expect(/\b(Sie|Ihr|Ihre|Ihnen)\b/.test(right)).toBe(formalSituation)
        expect(exercise.explanationAr).toContain('Sie')
      }
    }
  })

  it('accepts the converted sentence, ignoring case and punctuation', () => {
    for (let round = 0; round < 40; round += 1) {
      for (const exercise of buildRegisterDrill(10).filter(
        (each): each is FillBlankExercise => each.type === 'fill-blank',
      )) {
        const answer = exercise.acceptedAnswers[0]
        expect(isAnswerAccepted(answer.toLowerCase().replace(/[!?.]/g, ''), exercise.acceptedAnswers)).toBe(true)
        expect(exercise.sentenceDe).toContain('→ ___')
      }
    }
  })
})
