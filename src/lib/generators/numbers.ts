/**
 * German number words, 0–9999. Pure — no React.
 *
 * Conventions: "eins" stands alone and in the last place of a compound ("hunderteins"), but is "ein" before
 * another word ("einundzwanzig", "eintausend"). A whole 100 is "hundert"; inside a longer number it is
 * "einhundert". Thousands are written in one word, as the Duden does.
 */

const UNITS = [
  'null',
  'eins',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sechs',
  'sieben',
  'acht',
  'neun',
  'zehn',
  'elf',
  'zwölf',
] as const
const TEENS: Record<number, string> = {
  13: 'dreizehn',
  14: 'vierzehn',
  15: 'fünfzehn',
  16: 'sechzehn',
  17: 'siebzehn',
  18: 'achtzehn',
  19: 'neunzehn',
}
const TENS: Record<number, string> = {
  2: 'zwanzig',
  3: 'dreißig',
  4: 'vierzig',
  5: 'fünfzig',
  6: 'sechzig',
  7: 'siebzig',
  8: 'achtzig',
  9: 'neunzig',
}

export const MAX_NUMBER = 9999

/** The number as a prefix of a longer word: "ein", not "eins". */
function prefix(n: number): string {
  return n === 1 ? 'ein' : below100(n)
}

function below100(n: number): string {
  if (n <= 12) return UNITS[n]
  if (n <= 19) return TEENS[n]
  const tens = Math.floor(n / 10)
  const units = n % 10
  if (units === 0) return TENS[tens]
  return `${prefix(units)}und${TENS[tens]}`
}

function below1000(n: number, hundredWithOne: 'hundert' | 'einhundert'): string {
  const hundreds = Math.floor(n / 100)
  const rest = n % 100
  if (hundreds === 0) return below100(n)
  const head = hundreds === 1 ? hundredWithOne : `${UNITS[hundreds]}hundert`
  return rest === 0 ? head : `${head}${below100(rest)}`
}

/** The usual spelling of `n` in letters: 24 → "vierundzwanzig", 1100 → "eintausendeinhundert". */
export function numberToGerman(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > MAX_NUMBER)
    throw new RangeError(`numberToGerman handles 0–${MAX_NUMBER}, got ${n}`)
  if (n < 1000) return below1000(n, 'hundert')
  const thousands = Math.floor(n / 1000)
  const rest = n % 1000
  const head = `${prefix(thousands)}tausend`
  return rest === 0 ? head : `${head}${below1000(rest, 'einhundert')}`
}

/** Spellings that are also correct, so a typed answer is not marked wrong for choosing one of them. */
export function numberSpellings(n: number): string[] {
  const main = numberToGerman(n)
  const spellings = new Set([main])
  if (n === 100) spellings.add('einhundert')
  if (n > 100 && n < 200) spellings.add(main.replace(/^hundert/, 'einhundert'))
  if (n >= 1000 && n < 2000) {
    spellings.add(main.replace(/^eintausend/, 'tausend'))
  }
  return [...spellings]
}

/**
 * Numbers a learner mixes up with `n` when listening: the teen/ten pairs (13 and 30, 16 and 60 …),
 * the two digits swapped (24 and 42), and the neighbours.
 */
export function confusableNumbers(n: number, max: number): number[] {
  const candidates: number[] = []
  if (n >= 13 && n <= 19) candidates.push((n - 10) * 10)
  if (n >= 30 && n % 10 === 0 && n <= 90) candidates.push(n / 10 + 10)
  if (n >= 10 && n < 100 && n % 11 !== 0) candidates.push(Number(`${n % 10}${Math.floor(n / 10)}`))
  candidates.push(n + 1, n - 1, n + 10, n - 10)
  const seen = new Set<number>()
  return candidates.filter((candidate) => {
    const valid = candidate >= 0 && candidate <= max && candidate !== n && !seen.has(candidate)
    if (valid) seen.add(candidate)
    return valid
  })
}
