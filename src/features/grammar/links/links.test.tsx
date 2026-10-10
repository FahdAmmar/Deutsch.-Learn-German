import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { getGrammarRulesForLesson, getLessonsForGrammarRule } from '@/lib/grammarLinks'

import { LessonsForRule } from './LessonsForRule'
import { RelatedGrammarRules } from './RelatedGrammarRules'

describe('grammar link components', () => {
  it('RelatedGrammarRules links to the full rule pages', () => {
    render(
      <MemoryRouter>
        <RelatedGrammarRules rules={getGrammarRulesForLesson('a2-m05-l01')} />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /تصريف الصفات/ })
    expect(link.getAttribute('href')).toBe('/grammar/a2/25-adjektivdeklination')
  })

  it('RelatedGrammarRules renders nothing without rules', () => {
    const { container } = render(
      <MemoryRouter>
        <RelatedGrammarRules rules={[]} />
      </MemoryRouter>,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('LessonsForRule links back to the lesson pages', () => {
    render(
      <MemoryRouter>
        <LessonsForRule lessons={getLessonsForGrammarRule(33)} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /Genitiv/ }).getAttribute('href')).toBe('/lessons/a2/genitiv')
  })
})
