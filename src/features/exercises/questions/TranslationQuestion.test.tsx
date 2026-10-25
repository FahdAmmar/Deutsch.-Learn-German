import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import type { TranslationExercise } from '@/types'

import { TranslationQuestion } from './TranslationQuestion'

const base = { id: 'tr-1', type: 'translation', level: 'A1', promptAr: 'ترجم', explanationAr: '' } as const

describe('TranslationQuestion', () => {
  it('offers the character bar when the learner writes German', async () => {
    const user = userEvent.setup()
    const exercise: TranslationExercise = { ...base, direction: 'ar-to-de', sourceText: 'أنا سعيد', acceptedAnswers: ['Ich bin glücklich'] }
    render(<TranslationQuestion exercise={exercise} onAnswer={() => {}} />)

    await user.type(screen.getByLabelText('أدخل ترجمتك'), 'Ich bin gl')
    await user.click(screen.getByRole('button', { name: 'ü' }))

    expect(screen.getByLabelText('أدخل ترجمتك')).toHaveValue('Ich bin glü')
  })

  it('does not offer it when the learner writes Arabic', () => {
    const exercise: TranslationExercise = { ...base, direction: 'de-to-ar', sourceText: 'Ich bin glücklich', acceptedAnswers: ['أنا سعيد'] }
    render(<TranslationQuestion exercise={exercise} onAnswer={() => {}} />)

    expect(screen.queryByRole('group', { name: 'أحرف ألمانية خاصة' })).not.toBeInTheDocument()
  })
})
