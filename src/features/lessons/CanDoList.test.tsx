import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CAN_DO } from '@/data/canDo'

import { CanDoList } from './CanDoList'

describe('CanDoList', () => {
  it('lists every can-do statement of the lesson under a heading', () => {
    const id = 'a1-m01-l07'
    render(<CanDoList lessonId={id} />)
    expect(screen.getByRole('heading', { name: 'بعد هذا الدرس' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(CAN_DO[id].length)
  })

  it('renders nothing for a lesson without statements', () => {
    const { container } = render(<CanDoList lessonId="a1-none-l99" />)
    expect(container).toBeEmptyDOMElement()
  })
})
