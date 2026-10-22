import { shuffle } from '@/utils/shuffle'

/**
 * German plural patterns, read off a singular/plural pair. Pure — no React.
 * `¨` marks an Umlaut change of the stem vowel ("Hand → Hände" is `¨e`).
 */
export type PluralPattern = '-' | '¨' | '-e' | '¨e' | '-er' | '¨er' | '-(e)n' | '-nen' | '-s'

export const PLURAL_PATTERN_NOTE_AR: Record<PluralPattern, string> = {
  '-': 'الجمع مثل المفرد بلا تغيير (der Lehrer → die Lehrer)',
  '¨': 'تغيير حرف العلّة إلى Umlaut بلا إضافة (der Bruder → die Brüder)',
  '-e': 'إضافة ‎-e‎ (der Tisch → die Tische)',
  '¨e': 'إضافة ‎-e‎ مع Umlaut (die Hand → die Hände)',
  '-er': 'إضافة ‎-er‎ (das Kind → die Kinder)',
  '¨er': 'إضافة ‎-er‎ مع Umlaut (das Land → die Länder)',
  '-(e)n': 'إضافة ‎-n‎ أو ‎-en‎ (die Lampe → die Lampen)',
  '-nen': 'إضافة ‎-nen‎ لمؤنّث ‎-in‎ (die Freundin → die Freundinnen)',
  '-s': 'إضافة ‎-s‎، وهو الغالب في الكلمات الأجنبية (das Sofa → die Sofas)',
}

const UMLAUT: Record<string, string> = { a: 'ä', o: 'ö', u: 'ü' }

/** Puts an Umlaut on the last stem vowel: Hand → Hände, Haus → Häus(er), Bruder → Brüder. Unchanged when there is none. */
export function umlautize(word: string): string {
  const au = word.lastIndexOf('au')
  const lone = Math.max(word.lastIndexOf('a'), word.lastIndexOf('o'), word.lastIndexOf('u'))
  if (au !== -1 && au + 1 >= lone) return `${word.slice(0, au)}äu${word.slice(au + 2)}`
  if (lone === -1) return word
  return `${word.slice(0, lone)}${UMLAUT[word[lone]]}${word.slice(lone + 1)}`
}

/** Which pattern turns `singular` into `plural`, or `undefined` for a pair the patterns do not describe. */
export function classifyPlural(singular: string, plural: string): PluralPattern | undefined {
  const umlauted = umlautize(singular)
  if (plural === singular) return '-'
  if (plural === umlauted) return '¨'
  if (plural === `${singular}e`) return '-e'
  if (plural === `${umlauted}e`) return '¨e'
  if (plural === `${singular}er`) return '-er'
  if (plural === `${umlauted}er`) return '¨er'
  if (plural === `${singular}n` || plural === `${singular}en`) return '-(e)n'
  if (plural === `${singular}nen`) return '-nen'
  if (plural === `${singular}s`) return '-s'
  return undefined
}

/** Another form that is also a correct plural of the same noun, so it must never be offered as a wrong answer. */
const VALID_ALTERNATIVES: Readonly<Record<string, readonly string[]>> = {
  Balkon: ['Balkons'],
  Schal: ['Schale'],
  Onkel: ['Onkels'],
  Mund: ['Munde'],
  Sofa: ['Sofas'],
}

function candidates(singular: string): string[] {
  const umlauted = umlautize(singular)
  const changed = umlauted !== singular
  // A word ending in -e takes -n; the other patterns would double the "e" (Lampee), so only plausible slips remain.
  if (singular.endsWith('e')) return [singular, changed ? `${umlauted}n` : '', `${singular}s`].filter(Boolean)
  const endsWithUnstressed = singular.endsWith('en') || singular.endsWith('el') || singular.endsWith('er')
  return [
    `${singular}e`,
    endsWithUnstressed ? '' : `${singular}en`,
    singular.endsWith('er') ? '' : `${singular}er`,
    `${singular}s`,
    changed ? `${umlauted}e` : '',
    changed && !singular.endsWith('er') ? `${umlauted}er` : '',
    changed ? umlauted : '',
    singular,
  ].filter(Boolean)
}

const normalize = (form: string) => form.toLowerCase()

/**
 * Wrong plurals for a multiple-choice question: forms the other patterns would give,
 * minus any that is a real word in the vocabulary or another valid plural of this noun.
 */
export function pluralDistractors(
  singular: string,
  plural: string,
  knownForms: ReadonlySet<string>,
  count = 3,
): string[] {
  const blocked = new Set([plural, ...(VALID_ALTERNATIVES[singular] ?? [])].map(normalize))
  const seen = new Set<string>()
  const usable = candidates(singular).filter((form) => {
    const key = normalize(form)
    if (blocked.has(key) || knownForms.has(key) || seen.has(key)) return false
    seen.add(key)
    return true
  })
  return shuffle(usable).slice(0, count)
}
