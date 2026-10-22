import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import type { VocabularyItem } from '@/types'

import { VerbForms } from './VerbForms'

const fahren: VocabularyItem = {
  id: 'v-fahren',
  word: 'fahren',
  partOfSpeech: 'verb',
  meaningAr: 'يقود',
  level: 'A1',
  category: 'test',
  verb: {
    present: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'],
    praeteritum: 'fuhr',
    partizip: 'gefahren',
    auxiliary: 'sein',
  },
  example: { de: 'Er fährt nach Berlin.', ar: 'هو يسافر إلى برلين.' },
}

async function openForms() {
  await userEvent.click(screen.getByText('تصريف الفعل'))
}

describe('VerbForms', () => {
  it('builds nothing but its summary until it is opened', async () => {
    render(<VerbForms item={fahren} />)
    expect(screen.queryByRole('table')).not.toBeInTheDocument()

    await openForms()
    expect(screen.getByRole('table')).toBeInTheDocument()

    await openForms()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('shows the six present forms and the Perfekt with its auxiliary', async () => {
    render(<VerbForms item={fahren} />)
    await openForms()

    expect(screen.getByRole('row', { name: /du fährst/ })).toBeInTheDocument()
    expect(screen.getByText('er/sie/es ist gefahren')).toBeInTheDocument()
  })

  it('keeps the Präteritum back on an A1 word, because it is A2 grammar', async () => {
    render(<VerbForms item={fahren} />)
    await openForms()
    expect(screen.queryByText(/Präteritum/)).not.toBeInTheDocument()
  })

  it('shows the Präteritum from A2 on, with the separable prefix at the end', async () => {
    const einladen: VocabularyItem = {
      ...fahren,
      id: 'v-einladen',
      word: 'einladen',
      level: 'A2',
      verb: {
        present: ['lade', 'lädst', 'lädt', 'laden', 'ladet', 'laden'],
        praeteritum: 'lud',
        partizip: 'eingeladen',
        auxiliary: 'haben',
        separablePrefix: 'ein',
      },
    }
    render(<VerbForms item={einladen} />)
    await openForms()

    expect(screen.getByText('er/sie/es lud ein')).toBeInTheDocument()
    expect(screen.getByRole('row', { name: /du lädst ein/ })).toBeInTheDocument()
  })

  it('explains the coloured forms only for a verb with a stem change', async () => {
    const { rerender } = render(<VerbForms item={fahren} />)
    await openForms()
    expect(screen.getByText(/تخرج عن النمط المنتظم/)).toBeInTheDocument()

    rerender(
      <VerbForms
        item={{
          ...fahren,
          verb: {
            praeteritum: 'lernte',
            partizip: 'gelernt',
            auxiliary: 'haben',
          },
          word: 'lernen',
        }}
      />,
    )
    expect(screen.queryByText(/تخرج عن النمط المنتظم/)).not.toBeInTheDocument()
  })
})
