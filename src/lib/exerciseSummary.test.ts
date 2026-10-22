import { describe, expect, it } from 'vitest'

import type { Exercise } from '@/types'

import { digestExercise } from './exerciseSummary'

const base = { level: 'A1' as const, promptAr: 'سؤال', explanationAr: 'شرح' }

describe('digestExercise', () => {
  it('uses the German question and the right option for multiple choice', () => {
    const exercise: Exercise = { ...base, id: 'a', type: 'multiple-choice', questionDe: 'Hallo', options: ['مرحباً', 'وداعاً'], correctIndex: 0, optionLanguage: 'ar' }
    expect(digestExercise(exercise)).toEqual({ prompt: 'Hallo', promptLanguage: 'de', answer: 'مرحباً', answerLanguage: 'ar' })
  })

  it('falls back to the Arabic prompt when a multiple-choice question carries no German', () => {
    const exercise: Exercise = { ...base, id: 'a', type: 'multiple-choice', questionDe: '', options: ['der', 'die'], correctIndex: 1 }
    expect(digestExercise(exercise)).toMatchObject({ prompt: 'سؤال', promptLanguage: 'ar', answer: 'die' })
  })

  it('rebuilds the correct sentence for ordering exercises', () => {
    const exercise: Exercise = { ...base, id: 'o', type: 'ordering', words: ['lerne', 'Ich', 'Deutsch'], correctOrder: [1, 0, 2] }
    expect(digestExercise(exercise).answer).toBe('Ich lerne Deutsch')
  })

  it('reports the language each side of a translation is in', () => {
    const exercise: Exercise = { ...base, id: 't', type: 'translation', direction: 'ar-to-de', sourceText: 'أنا أتعلم', acceptedAnswers: ['Ich lerne'] }
    expect(digestExercise(exercise)).toEqual({ prompt: 'أنا أتعلم', promptLanguage: 'ar', answer: 'Ich lerne', answerLanguage: 'de' })
  })

  it('answers true-false in Arabic', () => {
    const exercise: Exercise = { ...base, id: 'tf', type: 'true-false', statementDe: 'Berlin ist eine Stadt.', isTrue: true }
    expect(digestExercise(exercise)).toMatchObject({ answer: 'صحيح', answerLanguage: 'ar' })
  })
})
