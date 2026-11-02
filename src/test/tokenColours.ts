import tokensCss from '@/styles/tokens.css?raw'

export type Rgb = [number, number, number]

/** The declarations of one top-level block of tokens.css, e.g. `:root` or `.dark`, as name → value. */
export function readTokenBlock(selector: string): Map<string, string> {
  const start = tokensCss.indexOf(`\n${selector} {`)
  if (start === -1) throw new Error(`No ${selector} block in tokens.css`)
  const end = tokensCss.indexOf('\n}', start)
  const declarations = new Map<string, string>()
  for (const match of tokensCss.slice(start, end).matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)) {
    declarations.set(match[1], match[2].trim())
  }
  return declarations
}

/** A colour as it is seen: a translucent one is laid over `behind`. */
export function parseColour(value: string, behind: Rgb): Rgb {
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

/** The WCAG contrast ratio of two colours, 1 to 21. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}
