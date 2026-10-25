import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { SpecialCharsBar } from '@/components/ui/SpecialCharsBar'

import { useInsertAtCaret } from './useInsertAtCaret'

function Field({ multiline = false }: { multiline?: boolean }) {
  const [value, setValue] = useState('')
  const { ref, insert } = useInsertAtCaret<HTMLInputElement & HTMLTextAreaElement>(value, setValue)

  return (
    <div>
      {multiline ? (
        <textarea ref={ref} aria-label="Antwort" value={value} onChange={(event) => setValue(event.target.value)} />
      ) : (
        <input ref={ref} aria-label="Antwort" value={value} onChange={(event) => setValue(event.target.value)} />
      )}
      <SpecialCharsBar onInsert={insert} />
    </div>
  )
}

describe('useInsertAtCaret with the special-characters bar', () => {
  it('types the character at the caret, keeps focus and puts the caret after it', async () => {
    const user = userEvent.setup()
    render(<Field />)
    const input = screen.getByLabelText('Antwort') as HTMLInputElement

    await user.type(input, 'Mchen')
    input.setSelectionRange(1, 1)
    await user.click(screen.getByRole('button', { name: 'ä' }))

    expect(input).toHaveValue('Mächen')
    expect(input).toHaveFocus()
    expect(input.selectionStart).toBe(2)
    expect(input.selectionEnd).toBe(2)
  })

  it('replaces selected text and lets the learner keep typing after the character', async () => {
    const user = userEvent.setup()
    render(<Field />)
    const input = screen.getByLabelText('Antwort') as HTMLInputElement

    await user.type(input, 'Strasse')
    input.setSelectionRange(4, 6)
    await user.click(screen.getByRole('button', { name: 'ß' }))
    await user.keyboard('!')

    expect(input).toHaveValue('Straß!e')
  })

  it('also works in a textarea', async () => {
    const user = userEvent.setup()
    render(<Field multiline />)

    await user.click(screen.getByRole('button', { name: 'Ü' }))
    await user.click(screen.getByRole('button', { name: 'ö' }))

    expect(screen.getByLabelText('Antwort')).toHaveValue('Üö')
  })
})
