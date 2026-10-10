import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { useProgressStore } from '@/store/progressStore'

import PlacementTestPage from './PlacementTestPage'

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/placement-test']}>
      <Routes>
        <Route path="/placement-test" element={<PlacementTestPage />} />
        <Route path="/levels" element={<div>صفحة المستويات</div>} />
        <Route path="/levels/:level" element={<div>تفاصيل المستوى</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('PlacementTestPage', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('shows an intro screen with a skip option before starting', () => {
    renderPage()
    expect(screen.getByRole('button', { name: 'ابدأ الاختبار' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'تخطّي، سأختار بنفسي' })).toBeInTheDocument()
  })

  it('walks through the whole test and reaches a level recommendation', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'ابدأ الاختبار' }))

    // Answer every question with whatever the first option is, then advance,
    // until the results screen appears. The test is intentionally agnostic
    // about correctness here — it's checking the flow completes, not scoring.
    for (let guard = 0; guard < 30; guard++) {
      const resultsHeading = screen.queryByText('نتيجة اختبار تحديد المستوى')
      if (resultsHeading) break

      const options = screen.getAllByRole('button').filter((button) => !button.textContent?.includes('التالي'))
      await user.click(options[0])

      const nextOrFinish = screen.queryByRole('button', { name: 'التالي' }) ?? screen.queryByRole('button', { name: 'إنهاء' })
      if (nextOrFinish) await user.click(nextOrFinish)
    }

    expect(screen.getByText('نتيجة اختبار تحديد المستوى')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ابدأ من هذا المستوى' })).toBeInTheDocument()
  })

  it('setting the recommended level updates the progress store', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'ابدأ الاختبار' }))

    for (let guard = 0; guard < 30; guard++) {
      if (screen.queryByText('نتيجة اختبار تحديد المستوى')) break
      const options = screen.getAllByRole('button').filter((button) => !button.textContent?.includes('التالي'))
      await user.click(options[0])
      const nextOrFinish = screen.queryByRole('button', { name: 'التالي' }) ?? screen.queryByRole('button', { name: 'إنهاء' })
      if (nextOrFinish) await user.click(nextOrFinish)
    }

    await user.click(screen.getByRole('button', { name: 'ابدأ من هذا المستوى' }))
    expect(['A1', 'A2']).toContain(useProgressStore.getState().currentLevel)
  })
})
