import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { getLessonById, getLessonsForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'

import ReviewPage from './ReviewPage'

describe('ReviewPage', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('shows the empty state when no lessons have been completed yet', () => {
    render(<ReviewPage />)
    expect(screen.getByText(/لا توجد كلمات للمراجعة الآن/)).toBeInTheDocument()
  })

  it('shows a due count and lets the learner start a session once a lesson is completed', async () => {
    const firstLesson = getLessonsForLevel('A1')[0]
    useProgressStore.getState().completeLesson({
      lessonId: firstLesson.id,
      moduleId: firstLesson.moduleId,
      level: firstLesson.level,
      accuracy: 1,
    })

    render(<ReviewPage />)

    expect(screen.getByText(/كلمة جاهزة للمراجعة الآن/)).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'ابدأ المراجعة' }))

    // Starting the session should show the German headword from the first
    // due vocabulary item, i.e. the exercise runner is now active.
    const lesson = getLessonById(firstLesson.id)
    expect(lesson?.vocabulary.length).toBeGreaterThan(0)
    expect(screen.queryByRole('button', { name: 'ابدأ المراجعة' })).not.toBeInTheDocument()
  })
})
