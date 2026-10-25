import { useLayoutEffect, useRef, useState, type ReactNode, type PointerEventHandler } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/cn'

import { placePopup, type AnchorRect, type Position } from './placePopup'

interface HintPopupProps {
  anchor: AnchorRect
  /** Ties the popup to the sentence that opened it (see `HintedSentenceButton`). */
  owner: string
  children: ReactNode
  onPointerEnter: PointerEventHandler<HTMLDivElement>
  onPointerLeave: PointerEventHandler<HTMLDivElement>
}

/**
 * A floating card next to a phrase. It lives in a portal with fixed
 * positioning, so a card or a scroll container around the text can never clip
 * it. Its content is a visual duplicate of what a screen reader already gets as
 * the sentence's description, hence `aria-hidden`.
 */
export function HintPopup({ anchor, owner, children, onPointerEnter, onPointerLeave }: HintPopupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const { width, height } = element.getBoundingClientRect()
    setPosition(placePopup(anchor, { width, height }, { width: window.innerWidth, height: window.innerHeight }))
  }, [anchor])

  return createPortal(
    <div
      ref={ref}
      dir="rtl"
      aria-hidden="true"
      data-hint-popup={owner}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={position ? { top: position.top, left: position.left } : { top: 0, left: 0 }}
      className={cn(
        'fixed z-50 w-max max-w-[min(22rem,calc(100vw-1rem))] space-y-3 rounded-lg border border-border-strong bg-surface p-3 text-start shadow-lg',
        // Measured once, then shown: no flash at the wrong place.
        !position && 'invisible',
      )}
    >
      {children}
    </div>,
    document.body,
  )
}
