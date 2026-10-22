export type AlphabetKind = 'letter' | 'umlaut' | 'eszett'

export interface AlphabetLetter {
  /** What is printed on the tile, e.g. "Aa". `ß` has no everyday capital, so it is shown alone. */
  glyph: string
  /** The letter's German name as written in a dictionary. */
  name: string
  /** Respelling the speech engine reads reliably as the letter name. */
  spoken: string
  kind: AlphabetKind
}

/** The 26 letters of the Latin alphabet in German, followed by the three umlauts and ß. */
export const GERMAN_ALPHABET: readonly AlphabetLetter[] = [
  { glyph: 'Aa', name: 'a', spoken: 'a', kind: 'letter' },
  { glyph: 'Bb', name: 'be', spoken: 'be', kind: 'letter' },
  { glyph: 'Cc', name: 'ce', spoken: 'tse', kind: 'letter' },
  { glyph: 'Dd', name: 'de', spoken: 'de', kind: 'letter' },
  { glyph: 'Ee', name: 'e', spoken: 'e', kind: 'letter' },
  { glyph: 'Ff', name: 'ef', spoken: 'ef', kind: 'letter' },
  { glyph: 'Gg', name: 'ge', spoken: 'ge', kind: 'letter' },
  { glyph: 'Hh', name: 'ha', spoken: 'ha', kind: 'letter' },
  { glyph: 'Ii', name: 'i', spoken: 'i', kind: 'letter' },
  { glyph: 'Jj', name: 'jot', spoken: 'jot', kind: 'letter' },
  { glyph: 'Kk', name: 'ka', spoken: 'ka', kind: 'letter' },
  { glyph: 'Ll', name: 'el', spoken: 'el', kind: 'letter' },
  { glyph: 'Mm', name: 'em', spoken: 'em', kind: 'letter' },
  { glyph: 'Nn', name: 'en', spoken: 'en', kind: 'letter' },
  { glyph: 'Oo', name: 'o', spoken: 'o', kind: 'letter' },
  { glyph: 'Pp', name: 'pe', spoken: 'pe', kind: 'letter' },
  { glyph: 'Qq', name: 'ku', spoken: 'ku', kind: 'letter' },
  { glyph: 'Rr', name: 'er', spoken: 'er', kind: 'letter' },
  { glyph: 'Ss', name: 'es', spoken: 'es', kind: 'letter' },
  { glyph: 'Tt', name: 'te', spoken: 'te', kind: 'letter' },
  { glyph: 'Uu', name: 'u', spoken: 'u', kind: 'letter' },
  { glyph: 'Vv', name: 'vau', spoken: 'fau', kind: 'letter' },
  { glyph: 'Ww', name: 'we', spoken: 'we', kind: 'letter' },
  { glyph: 'Xx', name: 'ix', spoken: 'iks', kind: 'letter' },
  { glyph: 'Yy', name: 'ypsilon', spoken: 'Ypsilon', kind: 'letter' },
  { glyph: 'Zz', name: 'zett', spoken: 'tset', kind: 'letter' },
  { glyph: 'Ää', name: 'ä', spoken: 'ä', kind: 'umlaut' },
  { glyph: 'Öö', name: 'ö', spoken: 'ö', kind: 'umlaut' },
  { glyph: 'Üü', name: 'ü', spoken: 'ü', kind: 'umlaut' },
  { glyph: 'ß', name: 'Eszett', spoken: 'Eszett', kind: 'eszett' },
]
