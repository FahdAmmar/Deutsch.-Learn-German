import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { soundService } from '@/services/sound'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatsStore } from '@/store/statsStore'
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

/** The German question is one paragraph with its articles in coloured spans, so match the paragraph's whole text. */
const questionText = (text: string) => screen.getByText((_, element) => element?.tagName === 'P' && element.textContent === text)

describe('ExerciseRunner', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useStatsStore.getState().resetStats()
    useSettingsStore.getState().resetToDefaults()
    vi.restoreAllMocks()
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
    // The feedback quotes German inside Arabic prose, which is rendered as an LTR
    // isolate (so the text is split across nodes) — assert on the whole region.
    const feedback = screen.getByRole('status')
    expect(feedback).toHaveTextContent(QUESTION_1.explanationAr)
    expect(feedback.querySelector('bdi[lang="de"]')).toHaveTextContent('"Hallo"')

    await user.click(screen.getByRole('button', { name: 'التالي' }))

    // Second question should now be showing.
    expect(questionText('der Tisch')).toBeInTheDocument()
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

  describe('mistakes', () => {
    it('lists what was got wrong, with the right answer', async () => {
      const user = userEvent.setup()
      render(<ExerciseRunner exercises={[QUESTION_1]} />)

      await user.click(screen.getByText('وداعاً'))
      await user.click(screen.getByRole('button', { name: 'إنهاء' }))

      const summary = screen.getByRole('region', { name: 'أخطاء هذه الجلسة' })
      expect(summary).toHaveTextContent('Hallo')
      expect(summary).toHaveTextContent('مرحباً')
    })

    it('replays only the mistakes, and the replay changes neither the reported result nor the statistics', async () => {
      const user = userEvent.setup()
      const onComplete = vi.fn()
      render(<ExerciseRunner exercises={[QUESTION_1, QUESTION_2]} onComplete={onComplete} />)

      await user.click(screen.getByText('وداعاً')) // wrong
      await user.click(screen.getByRole('button', { name: 'التالي' }))
      await user.click(screen.getByText('الطاولة')) // right
      await user.click(screen.getByRole('button', { name: 'إنهاء' }))

      expect(onComplete).toHaveBeenCalledTimes(1)
      expect(onComplete).toHaveBeenCalledWith(0.5)
      expect(useStatsStore.getState().byType['multiple-choice']).toEqual({ attempts: 1, correct: 0 })

      await user.click(screen.getByRole('button', { name: 'راجع أخطاءك (1)' }))
      expect(screen.getByText(/مراجعة الأخطاء/)).toBeInTheDocument()
      expect(screen.getByText(/1 من 1/)).toBeInTheDocument() // one question only: the one that was missed

      await user.click(screen.getByText('مرحباً'))
      await user.click(screen.getByRole('button', { name: 'إنهاء' }))

      expect(screen.getByText('صحّحت كل أخطائك!')).toBeInTheDocument()
      expect(onComplete).toHaveBeenCalledTimes(1)
      expect(useStatsStore.getState().byType['multiple-choice']).toEqual({ attempts: 1, correct: 0 })
    })

    it('offers no review button when everything was right', async () => {
      const user = userEvent.setup()
      render(<ExerciseRunner exercises={[QUESTION_1]} />)

      await user.click(screen.getByText('مرحباً'))
      await user.click(screen.getByRole('button', { name: 'إنهاء' }))

      expect(screen.queryByRole('button', { name: /راجع أخطاءك/ })).not.toBeInTheDocument()
    })
  })

  describe('statistics', () => {
    it('counts each first-pass answer by exercise type and by day', async () => {
      const user = userEvent.setup()
      render(<ExerciseRunner exercises={[QUESTION_1, QUESTION_2]} />)

      await user.click(screen.getByText('مرحباً'))
      await user.click(screen.getByRole('button', { name: 'التالي' }))
      await user.click(screen.getByText('الطاولة'))
      await user.click(screen.getByRole('button', { name: 'إنهاء' }))

      const stats = useStatsStore.getState()
      expect(stats.byType['multiple-choice']).toEqual({ attempts: 1, correct: 1 })
      expect(stats.byType['vocab-recall']).toEqual({ attempts: 1, correct: 1 })
      expect(Object.values(stats.days).reduce((total, day) => total + day.attempts, 0)).toBe(2)
    })
  })

  describe('keyboard shortcuts', () => {
    it('chooses an option with its number and continues with Enter', async () => {
      const user = userEvent.setup()
      render(<ExerciseRunner exercises={[QUESTION_1, QUESTION_2]} />)

      await user.keyboard('1') // "مرحباً", the correct option
      expect(screen.getByRole('status')).toHaveTextContent('إجابة صحيحة')

      await user.keyboard('{Enter}')
      expect(questionText('der Tisch')).toBeInTheDocument()
    })

    it('ignores number keys while the learner is typing in a field', async () => {
      const user = userEvent.setup()
      const fill: Exercise = {
        id: 'fill-1',
        type: 'fill-blank',
        level: 'A1',
        promptAr: 'أكمل الجملة',
        sentenceDe: 'Ich ___ Deutsch.',
        acceptedAnswers: ['lerne'],
        explanationAr: 'شرح',
      }
      render(<ExerciseRunner exercises={[fill]} />)

      const field = screen.getByRole('textbox')
      await user.type(field, '1')
      expect(field).toHaveValue('1')
    })
  })

  describe('sound', () => {
    it('plays the correct and wrong cues when sound effects are on', async () => {
      const user = userEvent.setup()
      const play = vi.spyOn(soundService, 'play').mockImplementation(() => undefined)
      render(<ExerciseRunner exercises={[QUESTION_1, QUESTION_1]} />)

      await user.click(screen.getByText('مرحباً'))
      expect(play).toHaveBeenLastCalledWith('correct')
      await user.click(screen.getByRole('button', { name: 'التالي' }))
      await user.click(screen.getByText('وداعاً'))
      expect(play).toHaveBeenLastCalledWith('wrong')
    })

    it('stays silent when sound effects are off', async () => {
      const user = userEvent.setup()
      useSettingsStore.getState().setSoundEffects(false)
      const play = vi.spyOn(soundService, 'play').mockImplementation(() => undefined)
      render(<ExerciseRunner exercises={[QUESTION_1]} />)

      await user.click(screen.getByText('مرحباً'))
      expect(play).not.toHaveBeenCalled()
    })
  })
})
