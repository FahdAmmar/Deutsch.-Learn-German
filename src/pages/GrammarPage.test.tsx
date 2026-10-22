import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import GrammarPage from '@/pages/GrammarPage'

describe('GrammarPage', () => {
  it('lists the roadmap rules without the old "short summaries from the lessons" block', () => {
    const { container } = render(
      <MemoryRouter>
        <GrammarPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'القواعد' })).toBeInTheDocument()
    expect(screen.queryByText(/ملخصات قصيرة/)).not.toBeInTheDocument()
    expect(container.querySelector('details')).toBeNull()
  })
})
