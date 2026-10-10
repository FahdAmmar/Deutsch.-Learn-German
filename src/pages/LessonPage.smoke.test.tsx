import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { getLessonsForLevel } from '@/lib/curriculum'
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
})
