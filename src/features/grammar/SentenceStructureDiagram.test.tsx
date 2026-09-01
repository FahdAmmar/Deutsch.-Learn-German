import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { speechService } from '@/services/speech'

import { SentenceStructureDiagram } from './SentenceStructureDiagram'

describe('SentenceStructureDiagram', () => {
  const tokens = [
    { text: 'Ich', role: 'الفاعل' },
    { text: 'lerne', role: 'الفعل' },
    { text: 'Deutsch.', role: 'المفعول به' },
  ]

  it('renders every token with its grammatical role label', () => {
    render(<SentenceStructureDiagram tokens={tokens} ar="أنا أتعلّم الألمانية." />)

    expect(screen.getByText('Ich')).toBeInTheDocument()
    expect(screen.getByText('lerne')).toBeInTheDocument()
    expect(screen.getByText('Deutsch.')).toBeInTheDocument()
    expect(screen.getByText('الفاعل')).toBeInTheDocument()
    expect(screen.getByText('الفعل')).toBeInTheDocument()
    expect(screen.getByText('المفعول به')).toBeInTheDocument()
    expect(screen.getByText('أنا أتعلّم الألمانية.')).toBeInTheDocument()
  })

  it('speaks the full sentence, joined from tokens, when the audio button is clicked', async () => {
    const speakSpy = vi.spyOn(speechService, 'speak').mockImplementation(() => {})
    const user = userEvent.setup()

    render(<SentenceStructureDiagram tokens={tokens} ar="أنا أتعلّم الألمانية." />)
    await user.click(screen.getByRole('button', { name: /الاستماع إلى نطق/ }))

    expect(speakSpy).toHaveBeenCalledWith('Ich lerne Deutsch.', expect.objectContaining({ language: 'de-DE' }))
    speakSpy.mockRestore()
  })

  it('assigns a consistent color per role even when roles repeat across tokens', () => {
    const repeatedRoleTokens = [
      { text: 'Der Hund', role: 'الفاعل' },
      { text: 'sieht', role: 'الفعل' },
      { text: 'die Katze', role: 'المفعول به' },
      { text: 'und', role: 'رابط' },
      { text: 'die Katze', role: 'الفاعل' },
    ]
    render(<SentenceStructureDiagram tokens={repeatedRoleTokens} ar="مثال" />)

    const subjectLabels = screen.getAllByText('الفاعل')
    expect(subjectLabels).toHaveLength(2)
  })
})
