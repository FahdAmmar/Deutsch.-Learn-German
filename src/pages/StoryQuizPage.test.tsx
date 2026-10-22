import { act, render, screen } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getAllVocabulary } from '@/lib/curriculum'
import { getStoriesForLevel, getStory } from '@/lib/stories'
import { buildStoryQuiz } from '@/lib/storyQuiz'
import StoryQuizPage from '@/pages/StoryQuizPage'
import { useProgressStore } from '@/store/progressStore'
import { useStoryQuizStore } from '@/store/storyQuizStore'
import type { Exercise } from '@/types'

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: {
    isSupported: () => true,
    speak: vi.fn(),
    stop: vi.fn(),
    getStatus: () => 'idle',
  },
}))

const READING_ID = 'a1-read-01'
const DIALOGUE_ID = 'dialogue-unregelmaessig-informell'

function renderQuiz(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/levels/a1/texts/${id}/quiz`]}>
      <Routes>
        <Route path="/levels/:level/texts/:itemId/quiz" element={<StoryQuizPage />} />
        <Route path="/levels/:level/texts/:itemId/diktat" element={<p>dictation page</p>} />
        <Route path="/levels/:level/texts/:itemId" element={<p>story page</p>} />
        <Route path="/levels/:level" element={<p>level page</p>} />
        <Route path="/levels" element={<p>levels overview</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

const quizFor = (id: string) => {
  const story = getStory('A1', id)!
  return buildStoryQuiz(story, { pool: getStoriesForLevel('A1'), vocabulary: getAllVocabulary() })
}

/** Answers one question through the real question components — right or deliberately wrong. */
async function answer(user: UserEvent, exercise: Exercise, correct: boolean) {
  const button = (name: string) => screen.getByRole('button', { name })

  switch (exercise.type) {
    case 'listening':
    case 'multiple-choice': {
      const index = correct ? exercise.correctIndex : (exercise.correctIndex + 1) % exercise.options.length
      await user.click(button(exercise.options[index]))
      break
    }
    case 'true-false':
      await user.click(button(correct === exercise.isTrue ? 'صحيح' : 'خطأ'))
      break
    case 'fill-blank':
      await user.type(screen.getByRole('textbox', { name: 'أدخل إجابتك' }), correct ? exercise.acceptedAnswers[0] : 'zzz')
      await user.click(button('تحقق'))
      break
    case 'ordering': {
      // Right: place the sentence's words in order. Wrong: place them as scrambled (never the right order by construction).
      const sequence = correct ? exercise.correctOrder : exercise.words.map((_, i) => i)
      for (const wordIndex of sequence) await user.click(button(exercise.words[wordIndex]))
      await user.click(button('تحقق'))
      break
    }
    case 'matching': {
      if (!correct) {
        // One deliberate mismatch (first German word with the second pair's meaning); the flash clears itself.
        await user.click(button(exercise.pairs[0].de))
        await user.click(button(exercise.pairs[1].ar))
        act(() => vi.advanceTimersByTime(600))
      }
      // Then finish every pair properly so the question can end.
      for (const pair of exercise.pairs) {
        await user.click(button(pair.de))
        await user.click(button(pair.ar))
      }
      break
    }
    default:
      throw new Error(`unhandled exercise type ${exercise.type}`)
  }
}

async function solve(user: UserEvent, exercises: Exercise[], correct: boolean) {
  for (const [position, exercise] of exercises.entries()) {
    await answer(user, exercise, correct)
    await user.click(screen.getByRole('button', { name: position === exercises.length - 1 ? 'إنهاء' : 'التالي' }))
  }
}

describe('StoryQuizPage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    useStoryQuizStore.getState().resetStoryQuizProgress()
    useProgressStore.getState().resetProgress?.()
  })
  afterEach(() => vi.useRealTimers())

  const setup = () => userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

  it('shows how many questions the text yields and starts on the first', () => {
    renderQuiz(READING_ID)
    const total = quizFor(READING_ID).length
    expect(screen.getByText(`1 من ${total}`)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(getStory('A1', READING_ID)!.titleDe)
  })

  it.each([
    ['a reading text', READING_ID],
    ['a conversation', DIALOGUE_ID],
  ])('can be answered all the way through for %s, and full marks are saved', async (_label, id) => {
    const user = setup()
    renderQuiz(id)
    const exercises = quizFor(id)

    await solve(user, exercises, true)

    expect(screen.getByText('أكملت التمارين!')).toBeInTheDocument()
    expect(useStoryQuizStore.getState().quizzes[id]).toMatchObject({ bestAccuracy: 1, attempts: 1 })
  })

  it('lays out the Arabic answer options of a meaning question as Arabic', async () => {
    const user = setup()
    renderQuiz(DIALOGUE_ID)
    const exercises = quizFor(DIALOGUE_ID)
    await answer(user, exercises[0], true)
    await user.click(screen.getByRole('button', { name: 'التالي' }))

    const meaning = exercises[1]
    expect(meaning.type).toBe('multiple-choice')
    if (meaning.type !== 'multiple-choice') return
    for (const option of meaning.options) expect(screen.getByText(option)).toHaveAttribute('lang', 'ar')
  })

  it('saves a low score when the answers are wrong', async () => {
    const user = setup()
    renderQuiz(READING_ID)
    await solve(user, quizFor(READING_ID), false)

    expect(useStoryQuizStore.getState().quizzes[READING_ID].bestAccuracy).toBeLessThan(0.5)
  })

  it('exercises every question type the generator can produce in a text', () => {
    const types = new Set(quizFor(READING_ID).map((exercise) => exercise.type))
    expect([...types].sort()).toEqual(['fill-blank', 'listening', 'matching', 'multiple-choice', 'ordering', 'true-false'])
  })

  it('links onward to the dictation of the same text', async () => {
    const user = setup()
    renderQuiz(READING_ID)
    await user.click(screen.getByRole('link', { name: 'جرّب الإملاء' }))
    expect(screen.getByText('dictation page')).toBeInTheDocument()
  })

  it('redirects an unknown text and an unknown level', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/levels/a1/texts/nope/quiz']}>
        <Routes>
          <Route path="/levels/:level/texts/:itemId/quiz" element={<StoryQuizPage />} />
          <Route path="/levels/:level" element={<p>level page</p>} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('level page')).toBeInTheDocument()
    unmount()
    renderQuiz('x')
  })
})
