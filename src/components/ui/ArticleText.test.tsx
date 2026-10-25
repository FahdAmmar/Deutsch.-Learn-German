import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ArticleText } from './ArticleText'

describe('ArticleText', () => {
  it('colours der blue, die pink and das orange, and leaves every other word plain', () => {
    const { container } = render(<p>{<ArticleText text="Der Mann sieht die Frau und das Kind." />}</p>)

    const coloured = Array.from(container.querySelectorAll<HTMLElement>('[data-article]'))
    expect(coloured.map((element) => [element.textContent, element.dataset.article, element.className])).toEqual([
      ['Der', 'der', expect.stringContaining('text-der')],
      ['die', 'die', expect.stringContaining('text-die')],
      ['das', 'das', expect.stringContaining('text-das')],
    ])
  })

  it('keeps the sentence word for word, so a screen reader reads it unchanged', () => {
    render(<p>{<ArticleText text="Das ist die Tür." />}</p>)
    expect(screen.getByText((_, element) => element?.tagName === 'P' && element.textContent === 'Das ist die Tür.')).toBeInTheDocument()
  })
})
