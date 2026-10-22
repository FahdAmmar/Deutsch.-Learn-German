import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import VocabularyPage from '@/pages/VocabularyPage'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'

function renderPage() {
  return render(
    <MemoryRouter>
      <VocabularyPage />
    </MemoryRouter>,
  )
}

describe('VocabularyPage', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useSettingsStore.getState().resetToDefaults()
  })

  it('adds a word to spaced review from its card, and lists it under the saved filter', async () => {
    const user = userEvent.setup()
    renderPage()

    const [firstAddButton] = screen.getAllByRole('button', { name: /^أضف إلى المراجعة/ })
    await user.click(firstAddButton)

    expect(useProgressStore.getState().savedVocabularyIds).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: /محفوظة للمراجعة \(1\)/ }))
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent(/^1 من/)
    expect(screen.getByRole('link', { name: /راجع الكلمات المحفوظة/ })).toBeInTheDocument()
    // The page lists every word with its example, and jsdom resolves each role query by walking all of it: allow for that.
  }, 20_000)

  it('narrows the list to one article', async () => {
    const user = userEvent.setup()
    renderPage()
    const before = Number(screen.getByRole('status').textContent?.match(/^(\d+)/)?.[1])

    const articles = screen.getByRole('group', { name: 'تصفية حسب أداة التعريف' })
    await user.click(within(articles).getByRole('button', { name: 'die' }))

    const after = Number(screen.getByRole('status').textContent?.match(/^(\d+)/)?.[1])
    expect(after).toBeGreaterThan(0)
    expect(after).toBeLessThan(before)
  })

  it('hides the pronunciation hint when the setting is off', async () => {
    useSettingsStore.getState().setShowPronunciationHints(false)
    renderPage()
    expect(document.querySelector('p.font-mono')).toBeNull()
  })
})
