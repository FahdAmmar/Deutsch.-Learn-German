import type { SpellingKind, SpellingSlip } from '@/types'

import type { DictationCell, DictationSlip } from './engine'

export type { SpellingKind, SpellingSlip }

/**
 * What kind of spelling mistake a wrong key was. Pure — no React.
 *
 * A wrong letter says little by itself; the pattern it belongs to (an Umlaut left out, "ie" for "ei", a doubled
 * consonant forgotten) is what a learner can act on. The classification looks at the expected and typed letters
 * and at their neighbours, and says "other" rather than guess.
 */
export const SPELLING_KINDS: readonly SpellingKind[] = ['umlaut', 'eszett', 'ie-ei', 'double-consonant', 'capital', 'other']

export const SPELLING_LABEL_AR: Record<SpellingKind, string> = {
  umlaut: 'النقاط فوق الحروف (ä ö ü)',
  eszett: 'ß أو ss',
  'ie-ei': 'الخلط بين ie وei',
  'double-consonant': 'مضاعفة الحروف الساكنة',
  capital: 'الأحرف الكبيرة',
  other: 'أخطاء أخرى',
}

export const SPELLING_TIP_AR: Record<SpellingKind, string> = {
  umlaut: 'ä وö وü حروف مستقلة تغيّر المعنى: schon ≠ schön. اضغط الحرف نفسه، أو اكتب ae وoe وue إن لم يكن على لوحتك.',
  eszett: 'تُكتب ß بعد حرف علّة طويل أو ثنائي (Straße، heiß)، وss بعد حرف علّة قصير (Fluss، muss). ويمكنك كتابة ss بدل ß عند الحاجة.',
  'ie-ei': 'ie تُنطق «يي» طويلة (Liebe، Bier)، وei تُنطق «آي» (Wein، Eis). اعتمد على الصوت لا على الشكل.',
  'double-consonant': 'بعد حرف علّة قصير يُضاعَف الحرف الساكن غالباً: kommen، Mutter، Wasser. وبعد الحرف الطويل لا: Name، Hut.',
  capital: 'كل الأسماء في الألمانية تُكتب بحرف كبير (der Tisch، die Freude)، وكذلك أول الجملة.',
  other: 'راجع الكلمة، وانطقها بتمهّل قبل كتابتها.',
}

const UMLAUTS = new Set(['ä', 'ö', 'ü', 'Ä', 'Ö', 'Ü'])
const PLAIN_VOWELS = new Set(['a', 'o', 'u', 'A', 'O', 'U'])
const LETTER = /\p{L}/u
const CONSONANT = /^[b-df-hj-np-tv-zß]$/iu

/** The letters around `position` as one word: "Mädchen" for the ä in "Das Mädchen". Empty when no letter is near. */
export function wordAt(cells: readonly DictationCell[], position: number): string {
  let start = position
  // A mistake on a space belongs to the word that ended there.
  if (!LETTER.test(cells[start]?.char ?? '')) start -= 1
  if (start < 0 || !LETTER.test(cells[start]?.char ?? '')) return ''
  let from = start
  let to = start
  while (from > 0 && LETTER.test(cells[from - 1].char)) from -= 1
  while (to + 1 < cells.length && LETTER.test(cells[to + 1].char)) to += 1
  return cells
    .slice(from, to + 1)
    .map((cell) => cell.char)
    .join('')
}

function kindOf(expected: string, typed: string, previous: string, next: string): SpellingKind {
  if (expected !== typed && expected.toLowerCase() === typed.toLowerCase() && LETTER.test(expected)) return 'capital'
  if (UMLAUTS.has(expected) || (PLAIN_VOWELS.has(expected) && UMLAUTS.has(typed))) return 'umlaut'
  if (expected === 'ß' || typed === 'ß') return 'eszett'

  const pair = (left: string, right: string) => `${left}${right}`.toLowerCase()
  const swapped = (expected === 'i' && typed === 'e') || (expected === 'e' && typed === 'i')
  if (swapped && ['ie', 'ei'].some((digraph) => pair(previous, expected) === digraph || pair(expected, next) === digraph)) return 'ie-ei'

  // A double consonant forgotten ("komen" for "kommen") or added where there is one ("Tafell").
  const forgotten = CONSONANT.test(expected) && previous.toLowerCase() === expected.toLowerCase()
  const added = CONSONANT.test(typed) && previous.toLowerCase() === typed.toLowerCase() && expected.toLowerCase() !== typed.toLowerCase()
  if (forgotten || added) return 'double-consonant'

  return 'other'
}

export function classifySlip(cells: readonly DictationCell[], slip: DictationSlip): SpellingSlip {
  const expected = cells[slip.position]?.char ?? ''
  return {
    kind: kindOf(expected, slip.typed, cells[slip.position - 1]?.char ?? '', cells[slip.position + 1]?.char ?? ''),
    word: wordAt(cells, slip.position),
    expected,
    typed: slip.typed,
  }
}

export interface SpellingKindCount {
  kind: SpellingKind
  count: number
}

/** How many slips of each kind, most frequent first; kinds with none are left out. */
export function countByKind(slips: readonly Pick<SpellingSlip, 'kind'>[]): SpellingKindCount[] {
  const counts = new Map<SpellingKind, number>()
  for (const { kind } of slips) counts.set(kind, (counts.get(kind) ?? 0) + 1)
  return SPELLING_KINDS.flatMap((kind) => (counts.has(kind) ? [{ kind, count: counts.get(kind) ?? 0 }] : [])).sort((a, b) => b.count - a.count)
}
