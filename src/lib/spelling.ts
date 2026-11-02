/**
 * How German is written where the umlaut and ß keys are missing: ä → ae, ö → oe, ü → ue, ß → ss. A learner
 * who types a word that way is not wrong, so a typed answer lists both spellings.
 */
export function withoutSpecialLetters(text: string): string {
  return text
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss')
}

/** The answer as written, then — when it differs — the same answer typed without the special letters. */
export function acceptedSpellings(answer: string): string[] {
  return [...new Set([answer, withoutSpecialLetters(answer)])]
}
