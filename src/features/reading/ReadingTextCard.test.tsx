import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { ReadingText } from '@/types'

import { ReadingTextCard } from './ReadingTextCard'

const sampleText: ReadingText = {
  id: 'test-read-01',
  slug: 'test-topic',
  level: 'A1',
  titleDe: 'Ein Testtext',
  titleAr: 'نص تجريبي',
  category: 'Test',
  estimatedMinutes: 2,
  paragraphs: [
    { de: 'Das ist der erste Satz.', ar: 'هذه هي الجملة الأولى.' },
    { de: 'Das ist der zweite Satz.', ar: 'هذه هي الجملة الثانية.' },
  ],
}

describe('ReadingTextCard', () => {
  it('renders the German title, Arabic title, category, and every paragraph pair', () => {
    render(<ReadingTextCard text={sampleText} />)

    expect(screen.getByText('Ein Testtext')).toBeInTheDocument()
    expect(screen.getByText('نص تجريبي')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Das ist der erste Satz.')).toBeInTheDocument()
    expect(screen.getByText('هذه هي الجملة الأولى.')).toBeInTheDocument()
    expect(screen.getByText('Das ist der zweite Satz.')).toBeInTheDocument()
    expect(screen.getByText('هذه هي الجملة الثانية.')).toBeInTheDocument()
  })

  it('never throws when rendered without SpeechSynthesis support (jsdom has none) and disables audio controls', () => {
    expect(() => render(<ReadingTextCard text={sampleText} />)).not.toThrow()

    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeDisabled()
    }
  })
})
