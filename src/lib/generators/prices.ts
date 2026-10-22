import { numberToGerman } from './numbers'

/** Prices in euros and cents, the way they are said at a till. Pure — no React. */

/** "3,50 €" — the comma is the German decimal sign, and the euro sign follows the number. */
export function formatPrice(cents: number): string {
  const euros = Math.floor(cents / 100)
  const rest = cents % 100
  return `${euros},${String(rest).padStart(2, '0')} €`
}

/**
 * 350 → "drei Euro fünfzig", 99 → "neunundneunzig Cent", 100 → "ein Euro".
 * The cents are said as a plain number, so 1 cent after euros is "eins"; on its own it is "ein Cent".
 */
export function priceToGerman(cents: number): string {
  if (!Number.isInteger(cents) || cents <= 0 || cents > 999_999)
    throw new RangeError(`price 1–999999 cents, got ${cents}`)
  const euros = Math.floor(cents / 100)
  const rest = cents % 100
  if (euros === 0) return rest === 1 ? 'ein Cent' : `${numberToGerman(rest)} Cent`
  const euroWord = euros === 1 ? 'ein' : numberToGerman(euros)
  return rest === 0 ? `${euroWord} Euro` : `${euroWord} Euro ${numberToGerman(rest)}`
}
