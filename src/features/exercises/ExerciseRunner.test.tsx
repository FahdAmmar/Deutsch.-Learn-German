import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { useProgressStore } from '@/store/progressStore'
import type { Exercise, MultipleChoiceExercise, VocabRecallExercise } from '@/types'

import { ExerciseRunner } from './ExerciseRunner'

const QUESTION_1: MultipleChoiceExercise = {
  id: 'q1',
  type: 'multiple-choice',
  level: 'A1',
  promptAr: 'اختر الترجمة الصحيحة',
  questionDe: 'Hallo',
  options: ['مرحباً', 'وداعاً', 'شكراً'],
  correctIndex: 0,
  explanationAr: '"Hallo" تعني "مرحباً".',
}

const QUESTION_2: VocabRecallExercise = {
  id: 'q2',
  type: 'vocab-recall',
  level: 'A1',
  promptAr: 'ما معنى هذه الكلمة؟',
  vocabularyId: 'voc-test-1',
  questionDe: 'der Tisch',
  correctAnswerAr: 'الطاولة',
  distractorsAr: ['الكرسي', 'الباب'],
  explanationAr: '"der Tisch" تعني "الطاولة".',
}

describe('ExerciseRunner', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('shows a message when there are no exercises', () => {
    render(<ExerciseRunner exercises={[]} />)
    expect(screen.getByText(/لا توجد تمارين متاحة/)).toBeInTheDocument()
  })

  it('reveals feedback after answering and advances to the next question', async () => {
    const user = userEvent.setup()
    render(<ExerciseRunner exercises={[QUESTION_1, QUESTION_2]} />)

    // First question: pick the correct option.
    await user.click(screen.getByText('مرحباً'))
    expect(screen.getByText(QUESTION_1.explanationAr)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'التالي' }))

    // Second question should now be showing.
    expect(screen.getByText('der Tisch')).toBeInTheDocument()
  })

  it('records a vocabulary review when a vocab-recall question is answered and advanced', async () => {
    const user = userEvent.setup()
    render(<ExerciseRunner exercises={[QUESTION_2]} />)

    await user.click(screen.getByText('الطاولة'))
    await user.click(screen.getByRole('button', { name: 'إنهاء' }))

    const entry = useProgressStore.getState().vocabulary['voc-test-1']
    expect(entry).toBeDefined()
    expect(entry.timesReviewed).toBe(1)
    expect(entry.timesCorrect).toBe(1)
  })

  it('shows a completion summary with accuracy after the last question', async () => {
    const user = userEvent.setup()
    const exercises: Exercise[] = [QUESTION_1]
    render(<ExerciseRunner exercises={exercises} />)

    await user.click(screen.getByText('مرحباً'))
    await user.click(screen.getByRole('button', { name: 'إنهاء' }))

    expect(screen.getByText('أكملت التمارين!')).toBeInTheDocument()
    expect(screen.getByText(/1 من 1/)).toBeInTheDocument()
  })

  it('counts an incorrect answer against accuracy in the completion summary', async () => {
    const user = userEvent.setup()
    render(<ExerciseRunner exercises={[QUESTION_1]} />)

    await user.click(screen.getByText('وداعاً'))
    await user.click(screen.getByRole('button', { name: 'إنهاء' }))

    expect(screen.getByText(/0 من 1/)).toBeInTheDocument()
  })
})
