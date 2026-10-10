/**
 * Splits German prose into sentences, so audio can play — and the learner can
 * jump — sentence by sentence.
 *
 * A sentence ends at `. ! ? …` (optionally followed by a closing quote) and
 * the next one starts with a capital, a digit or an opening quote. Common
 * abbreviations and ordinal dates ("am 3. Mai") are protected so they don't
 * end a sentence. This is deliberately conservative: when unsure, it keeps
 * text together, which only means a slightly longer audio segment.
 */

const ABBREVIATIONS = ['z. B.', 'z.B.', 'd. h.', 'd.h.', 'u. a.', 'u.a.', 'usw.', 'bzw.', 'etc.', 'ca.', 'Dr.', 'Nr.', 'Hr.', 'Fr.', 'Str.', 'Tel.']
const MONTHS = 'Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember'
// U+2024 ONE DOT LEADER: looks like a full stop but is not sentence punctuation.
const PROTECTED_DOT = '\u2024'
const ORDINAL_DATE = new RegExp(`\\b(\\d{1,2})\\.(?= (?:${MONTHS})\\b)`, 'g')
const SENTENCE_BOUNDARY = /(?<=[.!?…]["'“”«»]?)\s+(?=[A-ZÄÖÜ„"'“«0-9])/

export function splitSentences(text: string): string[] {
  let working = text.trim().replace(/\s+/g, ' ')
  for (const abbreviation of ABBREVIATIONS) {
    working = working.split(abbreviation).join(abbreviation.replaceAll('.', PROTECTED_DOT))
  }
  working = working.replace(ORDINAL_DATE, `$1${PROTECTED_DOT}`)

  return working
    .split(SENTENCE_BOUNDARY)
    .map((sentence) => sentence.replaceAll(PROTECTED_DOT, '.').trim())
    .filter((sentence) => sentence.length > 0)
}
