/** The part of the screen a popup is attached to. A plain data shape, so positioning can be tested without a DOM. */
export interface AnchorRect {
  top: number
  bottom: number
  left: number
  width: number
}

export interface Position {
  top: number
  left: number
}

const MARGIN = 8

/**
 * Centres the popup under the anchor, keeps it inside the viewport, and puts
 * it above the anchor instead when there is no room below.
 */
export function placePopup(anchor: AnchorRect, popup: { width: number; height: number }, viewport: { width: number; height: number }): Position {
  const centred = anchor.left + anchor.width / 2 - popup.width / 2
  const left = Math.min(Math.max(centred, MARGIN), Math.max(MARGIN, viewport.width - popup.width - MARGIN))

  const below = anchor.bottom + MARGIN
  const fitsBelow = below + popup.height + MARGIN <= viewport.height
  const above = anchor.top - popup.height - MARGIN
  const top = fitsBelow || above < MARGIN ? Math.max(MARGIN, Math.min(below, viewport.height - popup.height - MARGIN)) : above
  return { top, left }
}
