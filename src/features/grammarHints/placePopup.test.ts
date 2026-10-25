import { describe, expect, it } from 'vitest'

import { placePopup } from './placePopup'

const viewport = { width: 400, height: 700 }
const popup = { width: 200, height: 100 }

describe('placePopup', () => {
  it('centres the popup under the anchor', () => {
    expect(placePopup({ top: 100, bottom: 130, left: 150, width: 100 }, popup, viewport)).toEqual({ top: 138, left: 100 })
  })

  it('keeps the popup inside the viewport on the left and the right', () => {
    expect(placePopup({ top: 100, bottom: 130, left: 0, width: 40 }, popup, viewport).left).toBe(8)
    expect(placePopup({ top: 100, bottom: 130, left: 380, width: 20 }, popup, viewport).left).toBe(192)
  })

  it('goes above the anchor when there is no room below', () => {
    const { top } = placePopup({ top: 600, bottom: 630, left: 150, width: 100 }, popup, viewport)
    expect(top).toBe(600 - 100 - 8)
  })

  it('stays below when there is no room above either', () => {
    const { top } = placePopup({ top: 20, bottom: 650, left: 150, width: 100 }, popup, viewport)
    expect(top).toBeGreaterThanOrEqual(8)
    expect(top + popup.height).toBeLessThanOrEqual(viewport.height)
  })

  it('never leaves the margin even when the popup is wider than the screen', () => {
    expect(placePopup({ top: 100, bottom: 130, left: 100, width: 50 }, { width: 500, height: 80 }, viewport).left).toBe(8)
  })
})
