import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import SpeakingPage from './SpeakingPage'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/practice/speaking" element={<SpeakingPage />} />
        <Route path="/practice/speaking/:taskId" element={<SpeakingPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SpeakingPage', () => {
  it('lists the tasks of the level in three groups', () => {
    renderAt('/practice/speaking')
    expect(screen.getByRole('heading', { name: 'أتحدث' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'أسأل' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'أطلب' })).toBeInTheDocument()
  })

  it('opens a task and checks what the learner typed against it', async () => {
    const user = userEvent.setup()
    renderAt('/practice/speaking/a1-sprechen-karte-geschaeft')

    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('المحل')
    const box = screen.getByLabelText(/ما قلته/)
    await user.type(box, 'Wann öffnet das Geschäft?')
    await user.click(screen.getByRole('button', { name: 'تحقّق' }))
    expect(screen.getByRole('status')).toHaveTextContent('وجدنا كل ما طُلب')
  })

  it('shows what was not found when the answer misses a point', async () => {
    const user = userEvent.setup()
    renderAt('/practice/speaking/a1-sprechen-karte-geschaeft')

    await user.type(screen.getByLabelText(/ما قلته/), 'Das Geschäft öffnet wann?')
    await user.click(screen.getByRole('button', { name: 'تحقّق' }))
    expect(screen.getByRole('status')).toHaveTextContent('وجدنا 1 من 2')
  })

  it('keeps the check button off until something is written, and reveals the model on request', async () => {
    const user = userEvent.setup()
    renderAt('/practice/speaking/a1-sprechen-bitte-rechnung')

    expect(screen.getByRole('button', { name: 'تحقّق' })).toBeDisabled()
    expect(screen.queryByText('Die Rechnung, bitte.')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'اعرض النموذج' }))
    expect(screen.getByText('Die Rechnung, bitte.')).toBeInTheDocument()
  })

  it('says so for a task that does not exist', () => {
    renderAt('/practice/speaking/nope')
    expect(screen.getByText('لم نجد هذه المهمة')).toBeInTheDocument()
  })
})
