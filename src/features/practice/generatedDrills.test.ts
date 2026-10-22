import { describe, expect, it } from 'vitest'

import { ordinalToGerman } from '@/lib/generators/dates'
import { numberToGerman } from '@/lib/generators/numbers'
import { priceToGerman } from '@/lib/generators/prices'
import type { Exercise, FillBlankExercise, ListeningExercise, MultipleChoiceExercise } from '@/types'
import { isAnswerAccepted } from '@/utils/text'

import { buildGeneratedDrill, isGeneratedKindAvailable, type GeneratedKind } from './generatedDrills'

const KINDS: GeneratedKind[] = ['numbers', 'time', 'dates', 'prices']

function rounds<T>(count: number, run: () => T): T[] {
  return Array.from({ length: count }, run)
}

describe('every generated question is well formed', () => {
  for (const kind of KINDS) {
    for (const level of ['A1', 'A2'] as const) {
      if (!isGeneratedKindAvailable(kind, level)) continue
      it(`${kind} (${level})`, () => {
        for (const session of rounds(40, () => buildGeneratedDrill(kind, level, 12))) {
          expect(session).toHaveLength(12)
          for (const exercise of session) {
            expect(exercise.explanationAr.length).toBeGreaterThan(10)
            if (exercise.type === 'listening' || exercise.type === 'multiple-choice') {
              expect(exercise.options.length).toBeGreaterThanOrEqual(3)
              expect(new Set(exercise.options).size).toBe(exercise.options.length)
              expect(exercise.correctIndex).toBeGreaterThanOrEqual(0)
              expect(exercise.correctIndex).toBeLessThan(exercise.options.length)
            } else if (exercise.type === 'fill-blank') {
              expect(exercise.acceptedAnswers.length).toBeGreaterThan(0)
              expect(exercise.sentenceDe).toContain('___')
            } else {
              throw new Error(`unexpected type ${exercise.type}`)
            }
          }
          const ids = session.map((exercise) => exercise.id)
          expect(new Set(ids).size).toBe(ids.length)
        }
      })
    }
  }

  it('never asks the same thing twice in one session', () => {
    const key = (exercise: Exercise) =>
      exercise.type === 'listening'
        ? `${exercise.audioText}|l`
        : exercise.type === 'multiple-choice'
          ? `${exercise.questionDe}|r`
          : exercise.type === 'fill-blank'
            ? `${exercise.sentenceDe}|w`
            : exercise.id
    for (const session of rounds(40, () => buildGeneratedDrill('numbers', 'A1', 15))) {
      const keys = session.map(key)
      expect(new Set(keys).size).toBe(keys.length)
    }
  })
})

describe('numbers', () => {
  it('has the heard word as the audio and its digits among the options', () => {
    for (const session of rounds(30, () => buildGeneratedDrill('numbers', 'A1', 9))) {
      for (const exercise of session.filter((each): each is ListeningExercise => each.type === 'listening')) {
        const digits = exercise.options[exercise.correctIndex]
        expect(numberToGerman(Number(digits))).toBe(exercise.audioText)
      }
    }
  })

  it('accepts the number typed in letters, and no other', () => {
    for (const session of rounds(30, () => buildGeneratedDrill('numbers', 'A2', 9))) {
      for (const exercise of session.filter((each): each is FillBlankExercise => each.type === 'fill-blank')) {
        const n = Number(exercise.sentenceDe.split(' ')[0])
        expect(isAnswerAccepted(numberToGerman(n), exercise.acceptedAnswers)).toBe(true)
        expect(isAnswerAccepted(numberToGerman(n + 1), exercise.acceptedAnswers)).toBe(false)
      }
    }
  })

  it('stays within 100 at A1', () => {
    for (const session of rounds(30, () => buildGeneratedDrill('numbers', 'A1', 9))) {
      for (const exercise of session) {
        if (exercise.type === 'listening')
          for (const option of exercise.options) expect(Number(option)).toBeLessThanOrEqual(100)
      }
    }
  })
})

describe('time', () => {
  it('puts the right phrase among the options of a reading question', () => {
    for (const session of rounds(40, () => buildGeneratedDrill('time', 'A2', 10))) {
      for (const exercise of session.filter(
        (each): each is MultipleChoiceExercise => each.type === 'multiple-choice',
      )) {
        expect(exercise.options[exercise.correctIndex]).toBeTruthy()
        expect(exercise.explanationAr).toContain(exercise.options[exercise.correctIndex])
      }
    }
  })

  it('names only the quarter hours at A1', () => {
    for (const session of rounds(40, () => buildGeneratedDrill('time', 'A1', 10))) {
      for (const exercise of session.filter((each): each is ListeningExercise => each.type === 'listening')) {
        expect(exercise.audioText).toMatch(/Uhr|Viertel|halb/)
        expect(exercise.audioText).not.toMatch(/^(fünf|zehn|zwanzig) (nach|vor)/)
      }
    }
  })
})

describe('dates', () => {
  it('is not offered at A1', () => {
    expect(isGeneratedKindAvailable('dates', 'A1')).toBe(false)
    expect(isGeneratedKindAvailable('dates', 'A2')).toBe(true)
  })

  it('asks for the ordinal with its dative -n', () => {
    for (const session of rounds(40, () => buildGeneratedDrill('dates', 'A2', 9))) {
      for (const exercise of session.filter((each): each is FillBlankExercise => each.type === 'fill-blank')) {
        const day = Number(/\((\d+)\.\)/.exec(exercise.sentenceDe)![1])
        expect(exercise.acceptedAnswers).toEqual([`${ordinalToGerman(day)}n`])
      }
    }
  })

  it('always offers the slip of the forgotten -n as a wrong answer to the reading question', () => {
    for (const session of rounds(60, () => buildGeneratedDrill('dates', 'A2', 9))) {
      for (const exercise of session.filter(
        (each): each is MultipleChoiceExercise => each.type === 'multiple-choice',
      )) {
        const right = exercise.options[exercise.correctIndex]
        expect(right.startsWith('am ')).toBe(true)
        // "am dritten Oktober" → "am dritte Oktober"
        expect(exercise.options).toContain(right.replace(/n (\S+)$/, ' $1'))
      }
    }
  })
})

describe('prices', () => {
  it('reads the price the way it is said at a till', () => {
    for (const session of rounds(40, () => buildGeneratedDrill('prices', 'A2', 9))) {
      for (const exercise of session.filter((each): each is FillBlankExercise => each.type === 'fill-blank')) {
        const shown = exercise.sentenceDe.split(' = ')[0]
        const [euros, cents] = shown.replace(' €', '').split(',').map(Number)
        expect(exercise.acceptedAnswers).toEqual([priceToGerman(euros * 100 + cents)])
      }
    }
  })
})
