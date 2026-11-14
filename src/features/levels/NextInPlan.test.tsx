import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { getPathSteps } from '@/lib/learningPath'

import { NextInPlan } from './NextInPlan'

function renderNext(stepKey: string) {
  return render(
    <MemoryRouter>
      <NextInPlan stepKey={stepKey} />
    </MemoryRouter>,
  )
}

describe('NextInPlan', () => {
  it('points from a lesson to the next step of the plan, whatever its kind', () => {
    renderNext('lesson:a1-m01-l01')
    // The next step after Begrüßungen is the lesson on introducing yourself.
    const link = screen.getByRole('link', { name: /Sich vorstellen/ })
    expect(link).toHaveAttribute('href', expect.stringContaining('/lessons/a1/'))
    expect(screen.getByRole('navigation', { name: 'الخطوة التالية في الخطة' })).toBeInTheDocument()
  })

  it('points from a grammar lesson to the grammar rule that follows it', () => {
    renderNext('lesson:a1-m03-l03')
    expect(screen.getByRole('link')).toHaveAttribute('href', expect.stringMatching(/^\/grammar\/a1\//))
    expect(screen.getByText('قاعدة')).toBeInTheDocument()
  })

  it('points from a rule to the text that uses it', () => {
    renderNext('rule:12')
    expect(screen.getByRole('link', { name: /Mein Vater ist Busfahrer/ })).toHaveAttribute('href', '/levels/a1/texts/a1-read-16')
  })

  it('says when the next step opens a new chapter', () => {
    renderNext('story:dialogue-a1-im-deutschkurs')
    expect(screen.getByText(/فصل جديد: الحروف والأرقام/)).toBeInTheDocument()
  })

  it('leads on from the last step of A1 into the first chapter of A2 when both levels are loaded', () => {
    const last = getPathSteps('A1').at(-1)!
    renderNext(last.key)
    expect(screen.getByText(/فصل جديد: المقارنة والحكي/)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', expect.stringMatching(/^\/lessons\/a2\//))
  })

  it('leads back to the plan from its very last step', () => {
    const last = getPathSteps('A2').at(-1)!
    renderNext(last.key)
    expect(screen.getByRole('link', { name: 'العودة إلى الخطة' })).toHaveAttribute('href', '/levels')
  })

  it('shows nothing for a step that is not on the plan', () => {
    const { container } = renderNext('story:dialogue-wohnung-informell')
    expect(container).toBeEmptyDOMElement()
    const rule = renderNext('rule:35')
    expect(rule.container).toBeEmptyDOMElement()
  })
})
