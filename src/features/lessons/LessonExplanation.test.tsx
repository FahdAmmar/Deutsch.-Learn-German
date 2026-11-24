import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { LessonSection } from '@/types'

import { LessonExplanation } from './LessonExplanation'

const plain: LessonSection = { titleAr: 'عنوان بسيط', bodyAr: 'شرح قصير بلا رسوم.' }

const visual: LessonSection = {
  titleAr: 'تحية بحسب الوقت',
  bodyAr: 'تتغيّر التحية مع ساعات اليوم.',
  kickerDe: 'Tageszeit',
  tone: 'highlight',
  blocks: [
    {
      kind: 'formula',
      tags: [
        { text: 'Guten', tone: 'primary' },
        { text: 'Morgen', tone: 'accent', noteAr: 'صباحاً' },
      ],
    },
  ],
}

describe('LessonExplanation', () => {
  it('renders a section without blocks as heading and prose', () => {
    render(<LessonExplanation sections={[plain]} />)
    expect(screen.getByRole('heading', { level: 3, name: 'عنوان بسيط' })).toBeInTheDocument()
    expect(screen.getByText('شرح قصير بلا رسوم.')).toBeInTheDocument()
  })

  it('numbers the sections and shows the German kicker', () => {
    render(<LessonExplanation sections={[plain, visual]} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02 / Tageszeit')).toBeInTheDocument()
  })

  it('draws the visual blocks of a section', () => {
    render(<LessonExplanation sections={[visual]} />)
    expect(screen.getByText('Guten')).toBeInTheDocument()
    expect(screen.getByText('صباحاً')).toBeInTheDocument()
  })
})
