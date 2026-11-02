import { describe, expect, it } from 'vitest'

import { contrastRatio as contrast, parseColour, readTokenBlock as readBlock } from '@/test/tokenColours'

/** Everything der / die / das text can sit on in the app: plain surfaces, tinted badges and feedback states. */
const BACKGROUNDS = ['--bg', '--surface', '--surface-sunken', '--der-muted', '--die-muted', '--das-muted', '--accent-muted', '--primary-muted', '--success-muted', '--error-muted']

describe.each([
  ['light', ':root'],
  ['dark', '.dark'],
])('der / die / das colours — %s theme', (_theme, selector) => {
  const tokens = readBlock(selector)
  const surface = parseColour(tokens.get('--surface') ?? '', [255, 255, 255])

  it.each(['--der', '--die', '--das'])('%s is readable as text on every background it sits on', (name) => {
    const text = parseColour(tokens.get(name) ?? '', surface)

    for (const background of BACKGROUNDS) {
      const ratio = contrast(text, parseColour(tokens.get(background) ?? '', surface))
      expect(ratio, `${name} on ${background}`).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('is blue for der, pink for die and orange for das', () => {
    const hue = (name: string) => {
      const [r, g, b] = parseColour(tokens.get(name) ?? '', surface).map((channel) => channel / 255)
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const delta = max - min
      const raw = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4
      return (raw * 60 + 360) % 360
    }

    expect(hue('--der')).toBeGreaterThan(200)
    expect(hue('--der')).toBeLessThan(250)
    expect(hue('--die')).toBeGreaterThan(300)
    expect(hue('--die')).toBeLessThan(345)
    expect(hue('--das')).toBeGreaterThan(10)
    expect(hue('--das')).toBeLessThan(35)
  })
})
