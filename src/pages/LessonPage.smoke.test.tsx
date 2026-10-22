import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { getLessonById, getLessonsForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'

import LessonPage from './LessonPage'

function renderLesson(level: string, slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/lessons/${level}/${slug}`]}>
      <Routes>
        <Route path="/lessons/:level/:lessonId" element={<LessonPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('LessonPage smoke test — every authored lesson renders without crashing', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  const a1Lessons = getLessonsForLevel('A1')
  const a2Lessons = getLessonsForLevel('A2')

  it('has at least 13 authored A1 lessons to smoke-test', () => {
    expect(a1Lessons.length).toBeGreaterThanOrEqual(13)
  })

  it('has at least 14 authored A2 lessons to smoke-test', () => {
    expect(a2Lessons.length).toBeGreaterThanOrEqual(14)
  })

  for (const lesson of a1Lessons) {
    it(`renders A1 "${lesson.title}" (${lesson.slug}) and shows its title`, () => {
      renderLesson('a1', lesson.slug)
      expect(screen.getAllByText(lesson.title).length).toBeGreaterThan(0)
    })
  }

  for (const lesson of a2Lessons) {
    it(`renders A2 "${lesson.title}" (${lesson.slug}) and shows its title`, () => {
      renderLesson('a2', lesson.slug)
      expect(screen.getAllByText(lesson.title).length).toBeGreaterThan(0)
    })
  }

  describe('notes for Arabic speakers', () => {
    it('shows them in the lesson they belong to, and lists the section in the rail', () => {
      const lesson = getLessonById('a1-m03-l01')!
      renderLesson('a1', lesson.slug)

      // The lesson itself also teaches "Ich bin Student.", so look inside the section.
      const section = screen.getByRole('region', { name: 'للناطقين بالعربية' })
      expect(within(section).getByText('Ich bin Student.')).toBeInTheDocument()
      expect(within(section).getByText('Ich Student.')).toBeInTheDocument()
      expect(screen.getAllByRole('link', { name: 'للناطقين بالعربية' }).length).toBeGreaterThan(0)
    })

    it('leaves the section out of a lesson that has no note', () => {
      const lesson = getLessonById('a1-m04-l01')!
      renderLesson('a1', lesson.slug)
      expect(screen.queryByRole('heading', { name: 'للناطقين بالعربية' })).not.toBeInTheDocument()
    })
  })
})
