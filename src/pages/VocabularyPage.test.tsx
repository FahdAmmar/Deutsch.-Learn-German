import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getVocabularyForLevel } from '@/lib/curriculum'
import VocabularyPage from '@/pages/VocabularyPage'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'

function renderPage(entry = '/vocabulary') {
  return render(
    <MemoryRouter initialEntries={[entry]}>
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
    // Open on one word, as a link from search does: what is under test is the save button and the saved filter, not how
    // fast jsdom can answer a role query over a whole level of cards (the other tests here still render all of them).
    const [word] = getVocabularyForLevel('A1')
    renderPage(`/vocabulary?level=a1&q=${encodeURIComponent(word.word)}`)

    const [firstAddButton] = screen.getAllByRole('button', { name: /^أضف إلى المراجعة/ })
    await user.click(firstAddButton)

    expect(useProgressStore.getState().savedVocabularyIds).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: /محفوظة للمراجعة \(1\)/ }))
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent(/^1 من/)
    expect(screen.getByRole('link', { name: /راجع الكلمات المحفوظة/ })).toBeInTheDocument()
  })

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

describe('VocabularyPage — export and print', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useSettingsStore.getState().resetToDefaults()
  })

  /** Runs `act` with downloads captured: the file name and the text of what would be saved. */
  async function captureDownload(act: () => Promise<void>): Promise<{ name: string; text: string }> {
    let blob: Blob | undefined
    let name = ''
    vi.stubGlobal('URL', { ...URL, createObjectURL: (value: Blob) => ((blob = value), 'blob:vocabulary'), revokeObjectURL: vi.fn() })
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      name = this.download
    })
    try {
      await act()
    } finally {
      click.mockRestore()
      vi.unstubAllGlobals()
    }
    return { name, text: (await blob?.text()) ?? '' }
  }

  it('exports the words on screen as an Anki file', async () => {
    const user = userEvent.setup()
    renderPage()
    const shown = Number(screen.getByRole('status').textContent?.match(/^(\d+) من/)?.[1])

    const file = await captureDownload(() => user.click(screen.getByRole('button', { name: 'تصدير إلى Anki' })))

    expect(file.name).toMatch(/^learn-german-A1-anki-\d{4}-\d{2}-\d{2}\.txt$/)
    const lines = file.text.trimEnd().split('\n')
    expect(lines.slice(0, 3)).toEqual(['#separator:tab', '#html:true', '#tags column:3'])
    expect(lines.length - 3).toBe(shown)
  })

  it('exports only what the filters leave', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'das' }))

    const file = await captureDownload(() => user.click(screen.getByRole('button', { name: 'تصدير إلى Anki' })))

    const fronts = file.text
      .trimEnd()
      .split('\n')
      .slice(3)
      .map((row) => row.split('\t')[0])
    expect(fronts.length).toBeGreaterThan(0)
    expect(fronts.every((front) => front.startsWith('"das '))).toBe(true)
  })

  it('offers to print the list', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'طباعة القائمة' }))
    expect(print).toHaveBeenCalledOnce()
    print.mockRestore()
  })
})
