import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useSettingsStore } from '@/store/settingsStore'

import { HintedSentenceButton } from './HintedSentenceButton'

const SENTENCE = 'Nach dem Frühstück gehe ich zur Arbeit.'

const marks = (container: HTMLElement) => Array.from(container.querySelectorAll<HTMLElement>('[data-hint-owner]'))
const popup = () => document.querySelector<HTMLElement>('[data-hint-popup]')

beforeEach(() => {
  useSettingsStore.getState().resetToDefaults()
})

describe('HintedSentenceButton', () => {
  it('stays one button named by the whole sentence, with a three-dot marker under each hinted phrase', () => {
    const { container } = render(<HintedSentenceButton text={SENTENCE} />)

    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByRole('button', { name: SENTENCE })).toBeInTheDocument()
    expect(marks(container).map((mark) => mark.textContent)).toEqual(['dem Frühstück', 'zur Arbeit'])
    expect(marks(container).every((mark) => mark.classList.contains('hint-dots'))).toBe(true)
  })

  it('describes the hints to a screen reader, so nothing depends on hovering', () => {
    render(<HintedSentenceButton text={SENTENCE} />)

    const description = screen.getByRole('button', { name: SENTENCE })
    expect(description).toHaveAccessibleDescription(/ملاحظات نحوية/)
    expect(description).toHaveAccessibleDescription(/zur Arbeit/)
    expect(description).toHaveAccessibleDescription(/dem Frühstück/)
  })

  it('renders a plain button, with no description, when the sentence has nothing to explain', () => {
    const { container } = render(<HintedSentenceButton text="Ich lerne Deutsch." />)

    expect(screen.getByRole('button', { name: 'Ich lerne Deutsch.' })).not.toHaveAttribute('aria-describedby')
    expect(marks(container)).toHaveLength(0)
  })

  it('shows why on hover — the formula, the case and the reason — and hides it when the pointer leaves', async () => {
    const user = userEvent.setup()
    const { container } = render(<HintedSentenceButton text={SENTENCE} />)

    await user.hover(marks(container)[1])
    expect(popup()).toHaveTextContent('zu + der → zur')
    expect(popup()).toHaveTextContent('Dativ')
    expect(popup()).toHaveTextContent('zu + der = zur')

    await user.unhover(marks(container)[1])
    await waitFor(() => expect(popup()).toBeNull())
  })

  it('shows the hint of the phrase that is hovered, not the other one', async () => {
    const user = userEvent.setup()
    const { container } = render(<HintedSentenceButton text={SENTENCE} />)

    await user.hover(marks(container)[0])
    expect(popup()).toHaveTextContent('nach + Dativ → dem')
    expect(popup()).not.toHaveTextContent('zu + der → zur')
  })

  it('keeps the popup open while the pointer is on it, so it can be read', async () => {
    const user = userEvent.setup()
    const { container } = render(<HintedSentenceButton text={SENTENCE} />)

    await user.hover(marks(container)[1])
    await user.unhover(marks(container)[1])
    await user.hover(popup()!)
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(popup()).not.toBeNull()
  })

  it('closes with Escape', async () => {
    const user = userEvent.setup()
    const { container } = render(<HintedSentenceButton text={SENTENCE} />)

    await user.hover(marks(container)[0])
    expect(popup()).not.toBeNull()
    await user.keyboard('{Escape}')
    expect(popup()).toBeNull()
  })

  it('still reads the sentence when a hinted phrase is clicked with a mouse', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(<HintedSentenceButton text={SENTENCE} onClick={onClick} />)

    await user.click(marks(container)[0])
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('on touch, a tap on a hinted phrase toggles the hint and does not start the audio', () => {
    const onClick = vi.fn()
    const { container } = render(<HintedSentenceButton text={SENTENCE} onClick={onClick} />)
    const mark = marks(container)[1]

    fireEvent.pointerDown(mark, { pointerType: 'touch' })
    fireEvent.click(mark)
    expect(popup()).toHaveTextContent('zu + der → zur')
    expect(onClick).not.toHaveBeenCalled()

    fireEvent.pointerDown(mark, { pointerType: 'touch' })
    fireEvent.click(mark)
    expect(popup()).toBeNull()
  })

  it('on touch, a press outside closes the hint', () => {
    const { container } = render(
      <div>
        <HintedSentenceButton text={SENTENCE} />
        <p>elsewhere</p>
      </div>,
    )
    const mark = marks(container)[0]

    fireEvent.pointerDown(mark, { pointerType: 'touch' })
    fireEvent.click(mark)
    expect(popup()).not.toBeNull()

    act(() => {
      fireEvent.pointerDown(screen.getByText('elsewhere'), { pointerType: 'touch' })
    })
    expect(popup()).toBeNull()
  })

  it('shows no markers when the learner has switched the hints off', () => {
    useSettingsStore.getState().setShowGrammarHints(false)
    const { container } = render(<HintedSentenceButton text={SENTENCE} />)

    expect(marks(container)).toHaveLength(0)
    expect(screen.getByRole('button', { name: SENTENCE })).not.toHaveAttribute('aria-describedby')
  })

  it('passes the button props through (aria-current, className)', () => {
    render(<HintedSentenceButton text={SENTENCE} aria-current="true" className="sentence" />)
    const button = screen.getByRole('button', { name: SENTENCE })

    expect(button).toHaveAttribute('aria-current', 'true')
    expect(button).toHaveClass('sentence')
    expect(button).toHaveAttribute('type', 'button')
  })
})

describe('HintedSentenceButton — coloured articles', () => {
  const WITH_ARTICLES = 'Nach dem Frühstück lese ich die Zeitung und das Buch zur Arbeit.'
  const colouredArticles = (container: HTMLElement) =>
    Array.from(container.querySelectorAll<HTMLElement>('[data-article]')).map((element) => [element.textContent, element.dataset.article])

  it('colours der / die / das only when asked to', () => {
    const plain = render(<HintedSentenceButton text={WITH_ARTICLES} />)
    expect(colouredArticles(plain.container)).toEqual([])
    plain.unmount()

    const coloured = render(<HintedSentenceButton text={WITH_ARTICLES} colorArticles />)
    expect(colouredArticles(coloured.container)).toEqual([
      ['die', 'die'],
      ['das', 'das'],
    ])
  })

  it('colours the articles of a sentence that has no grammar hint', () => {
    const { container } = render(<HintedSentenceButton text="Das ist der Tisch." colorArticles />)

    expect(colouredArticles(container)).toEqual([
      ['Das', 'das'],
      ['der', 'der'],
    ])
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'Das ist der Tisch.' })).toBeInTheDocument()
  })

  it('keeps the button named by the whole sentence and the hint markers in place', () => {
    const { container } = render(<HintedSentenceButton text={WITH_ARTICLES} colorArticles />)

    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByRole('button', { name: WITH_ARTICLES })).toBeInTheDocument()
    expect(marks(container).map((mark) => mark.textContent)).toEqual(['dem Frühstück', 'zur Arbeit'])
  })

  it('does not pass colorArticles on to the DOM button', () => {
    render(<HintedSentenceButton text="Das ist gut." colorArticles />)
    expect(screen.getByRole('button')).not.toHaveAttribute('colorarticles')
  })
})
