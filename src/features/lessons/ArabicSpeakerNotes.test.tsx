import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { getContrastiveNotes } from '@/data/contrastive'

import { ArabicSpeakerNotes } from './ArabicSpeakerNotes'

describe('ArabicSpeakerNotes', () => {
  it('shows a slip as the lesson’s wrong/right pair, with the explanation', () => {
    render(<ArabicSpeakerNotes notes={getContrastiveNotes('a1-m03-l01')} />)

    expect(screen.getByRole('heading', { name: /لا جملة بلا فعل/ })).toBeInTheDocument()
    expect(screen.getByText('Ich Student.')).toBeInTheDocument()
    expect(screen.getByText('Ich bin Student.')).toBeInTheDocument()
    expect(screen.getByText(/لا تقبل جملة خبرية بلا فعل/)).toBeInTheDocument()
  })

  it('lets the learner hear each word of a note about a sound', () => {
    render(<ArabicSpeakerNotes notes={getContrastiveNotes('a1-m01-l03').filter((note) => note.id === 'sound-p-b')} />)

    expect(screen.getByRole('heading', { name: /P وB/ })).toBeInTheDocument()
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(6)
    expect(screen.getByText('Pass')).toBeInTheDocument()
    expect(screen.getByText('Bass')).toBeInTheDocument()
  })
})
