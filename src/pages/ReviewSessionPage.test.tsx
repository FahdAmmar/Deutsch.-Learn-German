import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { getLevelChapters } from '@/lib/learningPath'

import ReviewSessionPage from './ReviewSessionPage'

function renderAt(path: string, kind: 'chapter' | 'level') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/levels/:level/review/:chapterId" element={<ReviewSessionPage kind="chapter" />} />
        <Route path="/levels/:level/abschlusstest" element={<ReviewSessionPage kind={kind} />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ReviewSessionPage', () => {
  it('shows a chapter review with a title and the questions', () => {
    const chapter = getLevelChapters('A1')[0].chapter
    renderAt(`/levels/a1/review/${chapter.id}`, 'chapter')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(chapter.titleAr)
    expect(screen.getByText(/سؤالاً من/)).toBeInTheDocument()
  })

  it('shows the final test of a level', () => {
    renderAt('/levels/a2/abschlusstest', 'level')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('الاختبار الختامي')
  })

  it('says so for a chapter that does not exist', () => {
    renderAt('/levels/a1/review/no-such-chapter', 'chapter')
    expect(screen.getByText('لا توجد أسئلة لهذه المراجعة')).toBeInTheDocument()
  })
})
