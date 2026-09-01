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

describe('LessonPage smoke test — every authored A1 lesson renders without crashing', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  const a1Lessons = getLessonsForLevel('A1')

  it('has at least 13 authored A1 lessons to smoke-test', () => {
    expect(a1Lessons.length).toBeGreaterThanOrEqual(13)
  })

  for (const lesson of a1Lessons) {
    it(`renders "${lesson.title}" (${lesson.slug}) and shows its title`, () => {
      renderLesson('a1', lesson.slug)
      expect(screen.getAllByText(lesson.title).length).toBeGreaterThan(0)
    })
  }
})
