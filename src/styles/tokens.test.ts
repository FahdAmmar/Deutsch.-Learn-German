import { describe, expect, it } from 'vitest'

import tokensCss from './tokens.css?raw'

type Rgb = [number, number, number]

/** The declarations of one top-level block, e.g. `:root` or `.dark`, as name → value. */
function readBlock(selector: string): Map<string, string> {
  const start = tokensCss.indexOf(`\n${selector} {`)
  if (start === -1) throw new Error(`No ${selector} block in tokens.css`)
  const end = tokensCss.indexOf('\n}', start)
  const declarations = new Map<string, string>()
  for (const match of tokensCss.slice(start, end).matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)) {
    declarations.set(match[1], match[2].trim())
  }
  return declarations
}

function parseColour(value: string, behind: Rgb): Rgb {
  const hex = /^#([0-9a-f]{6})$/i.exec(value)
  if (hex) return [0, 2, 4].map((offset) => parseInt(hex[1].slice(offset, offset + 2), 16)) as Rgb

  const rgba = /^rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\)$/.exec(value)
  if (rgba) {
    const alpha = Number(rgba[4])
    return [1, 2, 3].map((group, channel) => Math.round(Number(rgba[group]) * alpha + behind[channel] * (1 - alpha))) as Rgb
  }
  throw new Error(`Unsupported colour: ${value}`)
}

function luminance([r, g, b]: Rgb): number {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const unit = channel / 255
    return unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb
}

function contrast(a: Rgb, b: Rgb): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

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
