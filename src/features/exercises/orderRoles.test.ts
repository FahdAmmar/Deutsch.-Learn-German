import { describe, expect, it } from 'vitest'

import { contrastRatio, parseColour, readTokenBlock } from '@/test/tokenColours'
import { ORDER_ROLES } from '@/types'

import { ROLE_STYLE } from './orderRoles'

describe('sentence role styles', () => {
  it('has a style and an Arabic name for every role', () => {
    for (const role of ORDER_ROLES) {
      expect(ROLE_STYLE[role], role).toBeDefined()
      expect(ROLE_STYLE[role].labelAr, role).toBeTruthy()
    }
    expect(new Set(ORDER_ROLES.map((role) => ROLE_STYLE[role].labelAr)).size).toBe(ORDER_ROLES.length)
  })

  describe.each([
    ['light', ':root'],
    ['dark', '.dark'],
  ])('%s theme', (_theme, selector) => {
    const tokens = readTokenBlock(selector)
    const surface = parseColour(tokens.get('--surface') ?? '', [255, 255, 255])

    it.each(ORDER_ROLES)('shows %s as text a learner can read on its own background (4.5:1)', (role) => {
      const { className } = ROLE_STYLE[role]
      const text = /(?:^|\s)text-([\w-]+)/.exec(className)?.[1]
      const background = /(?:^|\s)bg-([\w-]+)/.exec(className)?.[1]
      expect(text, `${role}: text colour`).toBeDefined()
      expect(background, `${role}: background`).toBeDefined()
      const ratio = contrastRatio(parseColour(tokens.get(`--${text}`) ?? '', surface), parseColour(tokens.get(`--${background}`) ?? '', surface))
      expect(ratio, `${role}: text-${text} on bg-${background}`).toBeGreaterThanOrEqual(4.5)
    })
  })
})
