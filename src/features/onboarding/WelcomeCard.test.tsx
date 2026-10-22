import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'

import { WelcomeCard } from './WelcomeCard'

function renderCard() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/dashboard" element={<WelcomeCard />} />
        <Route path="/levels/a1" element={<p>صفحة A1</p>} />
        <Route path="/placement-test" element={<p>اختبار المستوى</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('WelcomeCard', () => {
  beforeEach(() => {
    useSettingsStore.getState().resetToDefaults()
    useSettingsStore.setState((state) => ({ settings: { ...state.settings, onboardingDone: false } }))
    useProgressStore.getState().resetProgress()
  })

  it('saves the chosen goal, finishes onboarding and opens A1', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.click(screen.getByRole('radio', { name: /20/ }))
    await user.click(screen.getByRole('button', { name: 'ابدأ من الصفر (A1)' }))

    expect(useSettingsStore.getState().settings.dailyGoal).toBe(20)
    expect(useSettingsStore.getState().settings.onboardingDone).toBe(true)
    expect(useProgressStore.getState().currentLevel).toBe('A1')
    expect(screen.getByText('صفحة A1')).toBeInTheDocument()
  })

  it('offers the placement test as the other way in', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.click(screen.getByRole('button', { name: 'حدّد مستواي باختبار قصير' }))

    expect(useSettingsStore.getState().settings.onboardingDone).toBe(true)
    expect(screen.getByText('اختبار المستوى')).toBeInTheDocument()
  })

  it('can be skipped without changing the level', async () => {
    const user = userEvent.setup()
    useProgressStore.getState().setCurrentLevel('A2')
    renderCard()

    await user.click(screen.getByRole('button', { name: 'تخطّي' }))

    expect(useSettingsStore.getState().settings.onboardingDone).toBe(true)
    expect(useProgressStore.getState().currentLevel).toBe('A2')
  })
})
