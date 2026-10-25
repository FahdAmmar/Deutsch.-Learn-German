import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState, type ButtonHTMLAttributes, type FocusEvent, type PointerEvent } from 'react'

import { ArticleText } from '@/components/ui/ArticleText'
import { describeHints, splitByHints } from '@/lib/grammarHints'
import type { GrammarHint } from '@/types'

import { GrammarHintCard } from './GrammarHintCard'
import { HintPopup } from './HintPopup'
import type { AnchorRect } from './placePopup'
import { useGrammarHints } from './useGrammarHints'

/** How long the popup lingers after the pointer leaves, so the pointer can travel into it (WCAG 1.4.13: hoverable). */
const CLOSE_DELAY_MS = 150

type Active = { kind: 'hint'; index: number; anchor: AnchorRect } | { kind: 'all'; anchor: AnchorRect }

function toAnchor(element: Element): AnchorRect {
  const { top, bottom, left, width } = element.getBoundingClientRect()
  return { top, bottom, left, width }
}

function isFocusVisible(element: Element): boolean {
  try {
    return element.matches(':focus-visible')
  } catch {
    // An engine that does not know the selector: stay quiet rather than pop up on every focus.
    return false
  }
}

export interface HintedSentenceButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  /** The German sentence (or line). Its text is what the button shows and what a screen reader reads as its name. */
  text: string
  /** Colour every der / die / das in the sentence (der blue, die pink, das orange). Off unless asked for. */
  colorArticles?: boolean
}

/** The sentence text, with its articles coloured when asked. The words themselves never change. */
function renderText(text: string, colorArticles: boolean | undefined) {
  return colorArticles ? <ArticleText text={text} /> : text
}

/**
 * A sentence (or conversation line) as a button, with a three-dot marker under
 * each phrase that has a grammar hint ("zur Arbeit", "dem Frühstück").
 *
 * - Mouse: hovering a marked phrase shows why; clicking still reads the sentence.
 * - Touch: tapping a marked phrase shows or hides the hint (it does not start the audio).
 * - Keyboard: focusing the sentence lists all of its hints; Escape closes them.
 * - Screen reader: the hints are the button's description, so nothing depends on hovering.
 *
 * The markers are plain spans inside the one button — never nested controls — so
 * the sentence is still a single, correctly named button. A sentence without
 * hints renders exactly as a plain button.
 */
export function HintedSentenceButton({ text, colorArticles, ...buttonProps }: HintedSentenceButtonProps) {
  const hints = useGrammarHints(text)
  if (hints.length === 0) {
    return (
      <button type="button" {...buttonProps}>
        {renderText(text, colorArticles)}
      </button>
    )
  }
  return <HintedButton text={text} colorArticles={colorArticles} hints={hints} {...buttonProps} />
}

function HintedButton({ text, colorArticles, hints, onFocus, onBlur, ...buttonProps }: HintedSentenceButtonProps & { hints: readonly GrammarHint[] }) {
  const owner = useId()
  const [active, setActive] = useState<Active | null>(null)
  const pointerType = useRef('mouse')
  const closeTimer = useRef<number | undefined>(undefined)
  const parts = useMemo(() => splitByHints(text, hints), [text, hints])

  const cancelClose = useCallback(() => window.clearTimeout(closeTimer.current), [])
  const close = useCallback(() => {
    cancelClose()
    setActive(null)
  }, [cancelClose])
  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setActive(null), CLOSE_DELAY_MS)
  }, [cancelClose])

  useEffect(() => cancelClose, [cancelClose])

  // While a popup is open it closes on Escape, on a press elsewhere, and when the page moves under it.
  useEffect(() => {
    if (!active) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    const onPointerDown = (event: globalThis.PointerEvent) => {
      const inside = event.target instanceof Element ? event.target.closest('[data-hint-owner],[data-hint-popup]') : null
      if (inside?.getAttribute('data-hint-owner') === owner || inside?.getAttribute('data-hint-popup') === owner) return
      close()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [active, close, owner])

  const openHint = (index: number, element: Element) => {
    cancelClose()
    setActive({ kind: 'hint', index, anchor: toAnchor(element) })
  }

  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    onFocus?.(event)
    if (isFocusVisible(event.currentTarget)) {
      cancelClose()
      setActive({ kind: 'all', anchor: toAnchor(event.currentTarget) })
    }
  }

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    onBlur?.(event)
    close()
  }

  const descriptionId = `${owner}-hints`

  return (
    <>
      <span id={descriptionId} className="sr-only">
        ملاحظات نحوية: {describeHints(hints)}
      </span>

      <button type="button" {...buttonProps} aria-describedby={descriptionId} onFocus={handleFocus} onBlur={handleBlur}>
        {parts.map((part, position) => {
          if (part.type === 'text') return <Fragment key={position}>{renderText(part.text, colorArticles)}</Fragment>

          const index = hints.indexOf(part.hint)
          return (
            <span
              key={position}
              data-hint-owner={owner}
              className="hint-dots"
              onPointerDown={(event: PointerEvent<HTMLSpanElement>) => {
                pointerType.current = event.pointerType || 'mouse'
              }}
              onPointerEnter={(event: PointerEvent<HTMLSpanElement>) => {
                pointerType.current = event.pointerType || 'mouse'
                if (pointerType.current !== 'touch') openHint(index, event.currentTarget)
              }}
              onPointerLeave={() => {
                if (pointerType.current !== 'touch') scheduleClose()
              }}
              onClick={(event) => {
                // A tap has no hover, so it toggles the hint instead of starting the audio.
                if (pointerType.current !== 'touch') return
                event.stopPropagation()
                if (active?.kind === 'hint' && active.index === index) close()
                else openHint(index, event.currentTarget)
              }}
            >
              {renderText(part.text, colorArticles)}
            </span>
          )
        })}
      </button>

      {active ? (
        <HintPopup anchor={active.anchor} owner={owner} onPointerEnter={cancelClose} onPointerLeave={scheduleClose}>
          {active.kind === 'hint' ? (
            hints[active.index] ? <GrammarHintCard hint={hints[active.index]} /> : null
          ) : (
            <div className="space-y-3 divide-y divide-border">
              {hints.map((hint) => (
                <div key={hint.start} className="pt-3 first:pt-0">
                  <GrammarHintCard hint={hint} showPhrase />
                </div>
              ))}
            </div>
          )}
        </HintPopup>
      ) : null}
    </>
  )
}
