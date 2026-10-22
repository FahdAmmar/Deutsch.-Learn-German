import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { useMyTextStore } from '@/store/myTextStore'

import { SavedTexts } from './SavedTexts'

const DAY = 24 * 60 * 60 * 1000

function seed(title: string, extra: Partial<ReturnType<typeof useMyTextStore.getState>['texts'][number]> = {}) {
  const text = useMyTextStore
    .getState()
    .addText({ title, text: 'Ich lerne Deutsch. Das macht Spaß.', mode: 'sentences', maxWords: 6 })!
  useMyTextStore.setState({
    texts: useMyTextStore.getState().texts.map((entry) => (entry.id === text.id ? { ...entry, ...extra } : entry)),
  })
}

const renderList = () =>
  render(
    <MemoryRouter>
      <SavedTexts onEdit={() => undefined} />
    </MemoryRouter>,
  )

describe('SavedTexts — stage and review', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useMyTextStore.setState({ texts: [] })
  })

  it('names the stage each text has reached', () => {
    seed('Neu')
    seed('Weiter', { stage: 'initials' })
    renderList()

    expect(screen.getByText('المرحلة: نسخ')).toBeInTheDocument()
    expect(screen.getByText('المرحلة: الحروف الأولى')).toBeInTheDocument()
  })

  it('says when a text is due for review from memory, and puts it first', () => {
    seed('Später', { stage: 'memory', box: 1, dueAt: Date.now() + 3 * DAY })
    seed('Fällig', { stage: 'memory', box: 1, dueAt: Date.now() - DAY })
    renderList()

    const rows = screen.getAllByRole('listitem')
    expect(within(rows[0]).getByText('Fällig')).toBeInTheDocument()
    expect(within(rows[0]).getByText('حان وقت مراجعته من الذاكرة')).toBeInTheDocument()
    expect(within(rows[1]).getByText('Später')).toBeInTheDocument()
    expect(within(rows[1]).getByText(/المراجعة بعد 3 يوم/)).toBeInTheDocument()
  })

  it('says nothing about a review before a text has been passed from memory', () => {
    seed('Neu')
    renderList()
    expect(screen.queryByText(/المراجعة بعد/)).not.toBeInTheDocument()
    expect(screen.queryByText('حان وقت مراجعته من الذاكرة')).not.toBeInTheDocument()
  })
})
