import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { FillBlankExercise } from '@/types'

import { FillBlankQuestion } from './FillBlankQuestion'

const EXERCISE: FillBlankExercise = {
  id: 'fb-1',
  type: 'fill-blank',
  level: 'A1',
  promptAr: 'أكمل الجملة',
  sentenceDe: 'Das ist das ___ von Anna.',
  acceptedAnswers: ['Mädchen'],
  explanationAr: 'Mädchen: محايد.',
}

describe('FillBlankQuestion', () => {
  it('lets the learner type ä with the character bar and have the answer accepted', async () => {
    const user = userEvent.setup()
    const onAnswer = vi.fn()
    render(<FillBlankQuestion exercise={EXERCISE} onAnswer={onAnswer} />)

    const input = screen.getByLabelText('أدخل إجابتك')
    await user.type(input, 'M')
    await user.click(screen.getByRole('button', { name: 'ä' }))
    await user.keyboard('dchen')

    expect(input).toHaveValue('Mädchen')

    await user.click(screen.getByRole('button', { name: 'تحقق' }))
    expect(onAnswer).toHaveBeenCalledWith(true)
  })

  it('takes the bar away once the answer is checked', async () => {
    const user = userEvent.setup()
    render(<FillBlankQuestion exercise={EXERCISE} onAnswer={() => {}} />)

    expect(screen.getByRole('group', { name: 'أحرف ألمانية خاصة' })).toBeInTheDocument()
    await user.type(screen.getByLabelText('أدخل إجابتك'), 'Mann')
    await user.click(screen.getByRole('button', { name: 'تحقق' }))

    expect(screen.queryByRole('group', { name: 'أحرف ألمانية خاصة' })).not.toBeInTheDocument()
  })

  it('colours the articles of the sentence around the blank ("Das" and "das")', () => {
    const { container } = render(<FillBlankQuestion exercise={EXERCISE} onAnswer={() => {}} />)

    expect(Array.from(container.querySelectorAll<HTMLElement>('[data-article]')).map((element) => element.dataset.article)).toEqual(['das', 'das'])
  })
})
