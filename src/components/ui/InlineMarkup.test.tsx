import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InlineMarkup } from './InlineMarkup'

describe('InlineMarkup', () => {
  it('wraps quoted German in an LTR isolate so its punctuation stays attached', () => {
    const { container } = render(<InlineMarkup text={'السؤال هو "Woher kommst du?". انتهى'} />)

    const isolate = container.querySelector('bdi')
    expect(isolate).not.toBeNull()
    expect(isolate).toHaveAttribute('dir', 'ltr')
    expect(isolate).toHaveAttribute('lang', 'de')
    expect(isolate).toHaveTextContent('"Woher kommst du?"')
  })

  it('keeps the full text intact, so nothing is lost or reordered in the DOM', () => {
    const text = 'الجملة: "Ich stehe um sieben Uhr auf." — مثال'
    const { container } = render(<InlineMarkup text={text} />)
    expect(container).toHaveTextContent(text)
  })

  it('renders plain Arabic without any isolate', () => {
    const { container } = render(<InlineMarkup text="نص عربي فقط" />)
    expect(container.querySelector('bdi')).toBeNull()
  })

  it('still renders **bold** and [[German]] markup', () => {
    const { container } = render(<InlineMarkup text="قبل **مهم** و[[Wort]]" />)
    expect(container.querySelector('strong')).toHaveTextContent('مهم')
    expect(container.querySelector('span[lang="de"]')).toHaveTextContent('Wort')
  })
})
