import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { SentenceStructure } from '@/features/exercises/SentenceStructure'
import { CasesReference } from '@/features/practice/CasesReference'
import { CollocationsReference } from '@/features/practice/CollocationsReference'
import { WordFamiliesReference } from '@/features/practice/WordFamiliesReference'
import { WordOrderReference } from '@/features/practice/WordOrderReference'
import { ShadowingPanel } from '@/features/stories/ShadowingPanel'
import { getDialogueLines, getRoles } from '@/lib/rolePlay'
import { getStoriesForLevel } from '@/lib/stories'
import PracticePage from '@/pages/PracticePage'
import RolePlayPage from '@/pages/RolePlayPage'
import VocabularyPage from '@/pages/VocabularyPage'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatsStore } from '@/store/statsStore'

import { structuralViolations } from './axe'

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: { isSupported: () => true, speak: vi.fn(), stop: vi.fn(), getStatus: () => 'idle' },
}))

vi.mock('@/services/recognition', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/services/recognition')>()
  return { ...original, speechRecognizer: { isSupported: () => true, listen: vi.fn() } }
})

const dialogue = getStoriesForLevel('A1').find((story) => story.kind === 'dialogue')!
const reading = getStoriesForLevel('A1').find((story) => story.kind === 'reading' && story.segments.length > 2)!

beforeEach(() => {
  useProgressStore.getState().resetProgress()
  useStatsStore.getState().resetStats()
  useSettingsStore.getState().resetToDefaults()
})

describe('structural accessibility of the new features', () => {
  it('the reference panels, opened, have no violations', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <>
        <CasesReference />
        <WordOrderReference />
        <CollocationsReference />
        <WordFamiliesReference />
      </>,
    )
    // Their content is rendered only when they are opened.
    for (const summary of Array.from(container.querySelectorAll('summary'))) await user.click(summary)
    expect(container.querySelectorAll('details[open]')).toHaveLength(4)
    expect(await screen.findByText('أداة التعريف')).toBeInTheDocument()
    expect(await screen.findByText('ein Foto machen')).toBeInTheDocument()
    expect(await structuralViolations(container)).toEqual([])
  })

  it('the sentence structure blocks have no violations', async () => {
    const { container } = render(
      <SentenceStructure
        chunks={[
          { text: 'Ich', role: 'subject' },
          { text: 'möchte', role: 'verb' },
          { text: 'trinken', role: 'verb-end' },
        ]}
      />,
    )
    expect(await structuralViolations(container)).toEqual([])
  })

  it('the practice page, with its new cards, has no violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <PracticePage />
      </MemoryRouter>,
    )
    expect(await structuralViolations(container)).toEqual([])
  })

  it('a started case session has no violations', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <MemoryRouter>
        <PracticePage />
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: الحالات: أي أداة؟' }))
    expect(await structuralViolations(container)).toEqual([])
  })

  it('a started word-order session has no violations', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <MemoryRouter>
        <PracticePage />
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: ترتيب الجملة' }))
    expect(await structuralViolations(container)).toEqual([])
  })

  it('the vocabulary page, with its export and print buttons, has no violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <VocabularyPage />
      </MemoryRouter>,
    )
    expect(await structuralViolations(container)).toEqual([])
    // A level of vocabulary is a few hundred cards, and axe checks every one: it needs more than the default time
    // (about 30 s on a busy machine, and over a minute on a very busy one).
  }, 180_000)

  it('the shadowing panel has no violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <ShadowingPanel story={reading} onBeforeListen={() => undefined} />
      </MemoryRouter>,
    )
    expect(await structuralViolations(container)).toEqual([])
  })

  it('the role-play page has no violations at its three stages: choosing, answering and the checked answer', async () => {
    const user = userEvent.setup()
    const roles = getRoles(getDialogueLines(dialogue))
    const { container } = render(
      <MemoryRouter initialEntries={[`/levels/a1/texts/${dialogue.id}/rollenspiel`]}>
        <Routes>
          <Route path="/levels/:level/texts/:itemId/rollenspiel" element={<RolePlayPage />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(await structuralViolations(container)).toEqual([])

    await user.click(screen.getByRole('button', { name: `أريد دور ${roles[0].name}` }))
    expect(await structuralViolations(container)).toEqual([])

    await user.type(screen.getByLabelText('اكتب الجملة بالألمانية'), 'Guten')
    await user.click(screen.getByRole('button', { name: 'تحقّق' }))
    expect(await structuralViolations(container)).toEqual([])
  })
})
