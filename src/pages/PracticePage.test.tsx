import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import PracticePage from '@/pages/PracticePage'
import { getModulesForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useStatsStore } from '@/store/statsStore'

function renderPage() {
  return render(
    <MemoryRouter>
      <PracticePage />
    </MemoryRouter>,
  )
}

describe('PracticePage', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useStatsStore.getState().resetStats()
  })

  it('offers the general, word and number practice modes', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'جلسة مختلطة' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'أدوات التعريف' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'نقاط ضعفي' })).toBeInTheDocument()
    for (const name of ['الجمع', 'تصريف الأفعال', 'تخمين الأداة من الشكل', 'الأرقام', 'الساعة', 'الأسعار']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
  })

  it('starts a generated number session whose questions are about numbers', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: الأرقام' }))

    expect(screen.getByRole('heading', { name: 'تدريب الأرقام' })).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'تقدّم التمارين' })).toBeInTheDocument()
    // The first question of a number session is heard, read or written: it always asks about a number.
    expect(screen.getAllByText(/الرقم/).length).toBeGreaterThan(0)
  })

  it('keeps the dates drill for A2, and says why it cannot start at A1', async () => {
    useProgressStore.setState({ currentLevel: 'A1' })
    const user = userEvent.setup()
    renderPage()

    expect(screen.getByRole('button', { name: 'ابدأ التدريب: التواريخ' })).toBeDisabled()
    expect(screen.getByText(/التواريخ بالأرقام الترتيبية من مستوى A2/)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /A2/ }))
    expect(screen.getByRole('button', { name: 'ابدأ التدريب: التواريخ' })).toBeEnabled()
  })

  it('explains why weak-spot practice is not available before any answers exist', () => {
    renderPage()
    expect(screen.getByRole('button', { name: 'ركّز على نقاط ضعفي: نقاط ضعفي' })).toBeDisabled()
    expect(screen.getByText(/أجب عن بعض التمارين أولاً/)).toBeInTheDocument()
  })

  it('starts an article drill whose options are der, die and das', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: أدوات التعريف' }))

    expect(screen.getByRole('heading', { name: 'تدريب أدوات التعريف' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /der/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /die/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /das/ })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'العودة لأنماط التدريب' }))
    expect(screen.getByRole('heading', { name: 'جلسة مختلطة' })).toBeInTheDocument()
  })

  it('enables weak-spot practice once a topic has enough wrong answers', async () => {
    const [module] = getModulesForLevel('A1')
    useStatsStore.getState().replaceStats({ days: {}, byType: {}, byModule: { [module.id]: { attempts: 10, correct: 3 } } })
    const user = userEvent.setup()
    renderPage()

    const start = screen.getByRole('button', { name: 'ركّز على نقاط ضعفي: نقاط ضعفي' })
    expect(start).toBeEnabled()
    await user.click(start)
    expect(screen.getByRole('heading', { name: 'نقاط ضعفي', level: 2 })).toBeInTheDocument()
  })
})
