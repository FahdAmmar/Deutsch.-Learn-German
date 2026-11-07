import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { structuralViolations } from '@/test/axe'

import { ProgressStrip } from './ProgressStrip'

const base = { level: 'A1', levelRatio: 0.16, completedLessons: 5, totalLessons: 31, reviewedWords: 3, totalWords: 272, streakDays: 5 } as const

describe('ProgressStrip', () => {
  it('states the four figures from the learner\'s own progress', () => {
    render(<ProgressStrip {...base} />)

    const figures = screen.getByRole('region', { name: 'ملخّص تقدّمك' })
    expect(within(figures).getByText('16%')).toBeInTheDocument()
    expect(figures).toHaveTextContent('الدروس المنجزة')
    expect(figures).toHaveTextContent('5 / 31')
    expect(figures).toHaveTextContent('3 / 272')
    expect(figures).toHaveTextContent('5 أيام')
  })

  it('marks the German level title as German, so it is read and aligned as German', () => {
    render(<ProgressStrip {...base} />)
    const title = screen.getByText(/Anfänger/)
    expect(title).toHaveAttribute('lang', 'de')
    expect(title).toHaveAttribute('dir', 'ltr')
  })

  it('uses the singular for one day and invites a start when there is no streak', () => {
    const { rerender } = render(<ProgressStrip {...base} streakDays={1} />)
    expect(screen.getByText('يوم')).toBeInTheDocument()

    rerender(<ProgressStrip {...base} streakDays={0} />)
    expect(screen.getByText('أكمل درساً اليوم لتبدأ سلسلتك')).toBeInTheDocument()
  })

  it('has no structural accessibility violations', async () => {
    const { container } = render(<ProgressStrip {...base} />)
    expect(await structuralViolations(container)).toEqual([])
  })
})
