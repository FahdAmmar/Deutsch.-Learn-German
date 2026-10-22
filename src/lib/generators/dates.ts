import { numberToGerman } from './numbers'

/** Ordinal numbers and dates. Pure — no React. */

export const MONTH_NAMES = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
] as const

const IRREGULAR: Record<number, string> = {
  1: 'erste',
  3: 'dritte',
  7: 'siebte',
  8: 'achte',
}

/** The ordinal stem of 1–31 in the nominative: "erste", "dritte", "zwölfte", "zwanzigste", "einunddreißigste". */
export function ordinalToGerman(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 31) throw new RangeError(`ordinal 1–31, got ${n}`)
  const irregular = IRREGULAR[n]
  if (irregular) return irregular
  // 1–19 take -te, 20 and above take -ste.
  return n < 20 ? `${numberToGerman(n)}te` : `${numberToGerman(n)}ste`
}

export type DateStyle = 'nominative' | 'dative'

/**
 * A date as spoken: "der dritte Oktober" (nominative: "Heute ist …") or "am dritten Oktober" (dative: "Ich komme …").
 * The dative adds -n to the ordinal, which is the point most learners miss.
 */
export function dateToGerman(day: number, month: number, style: DateStyle): string {
  if (!Number.isInteger(month) || month < 1 || month > 12) throw new RangeError(`month 1–12, got ${month}`)
  const name = MONTH_NAMES[month - 1]
  const ordinal = ordinalToGerman(day)
  return style === 'nominative' ? `der ${ordinal} ${name}` : `am ${ordinal}n ${name}`
}

/** "03.10." as dates are written in German. */
export function formatDate(day: number, month: number): string {
  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.`
}
