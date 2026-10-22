import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { StagePicker } from './StagePicker'

describe('StagePicker', () => {
  it('offers the four stages as one choice and marks the stage the text has reached', () => {
    render(<StagePicker value="cloze" reached="cloze" onChange={() => undefined} />)

    expect(screen.getByRole('group', { name: 'مرحلة التدريب' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(4)
    expect(screen.getByRole('radio', { name: /إكمال الفراغات/ })).toBeChecked()
    expect(screen.getByText('مرحلتك الآن')).toBeInTheDocument()
  })

  it('says how a pass counts, and that practising another stage does not', () => {
    const { rerender } = render(<StagePicker value="cloze" reached="cloze" onChange={() => undefined} />)
    expect(screen.getByText(/دقة 90٪ فأكثر/)).toBeInTheDocument()

    rerender(<StagePicker value="copy" reached="cloze" onChange={() => undefined} />)
    expect(screen.getByText(/لا تُحسب نتيجتها/)).toBeInTheDocument()
  })

  it('reports the stage the learner picks, by mouse and by keyboard', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<StagePicker value="copy" reached="copy" onChange={onChange} />)

    await user.click(screen.getByRole('radio', { name: /من الذاكرة/ }))
    expect(onChange).toHaveBeenLastCalledWith('memory')

    screen.getByRole('radio', { name: /نسخ/ }).focus()
    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenCalledTimes(2)
  })
})
