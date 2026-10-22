import type { PresentForms, VerbAuxiliary, VocabularyItem } from '@/types'

/**
 * Verb forms for the verb cards and the conjugation drill. Pure — no React.
 *
 * Only what the regular pattern produces is derived here. Everything irregular
 * (stem changes, sein, haben, the modals, strong Partizip II …) is stored on the
 * vocabulary item and used as it is: guessing an irregular form from a rule would
 * teach a wrong one with confidence.
 */

export const PRONOUNS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'] as const

const REFLEXIVE_PRONOUNS = ['mich', 'dich', 'sich', 'uns', 'euch', 'sich'] as const

/** Stems that need an extra "e" before -st and -t so the ending can be heard: arbeit-e-st, öffn-e-st, atm-e-t. */
const NEEDS_E = /(?:[dt]|chn|ffn|gn|dn|tn|tm|dm|kn|bn)$/u
/** Stems ending in an s-sound take only -t after "du": heißt, tanzt, reist. */
const S_SOUND = /[sßxz]$/u

export interface ParsedInfinitive {
  reflexive: boolean
  /** The verb itself: "interessieren" for "sich interessieren für", "stehen" for "aufstehen". */
  verb: string
  /** What follows the verb in the table: the preposition of "sich interessieren für". */
  tail: string
  /** The prefix of a separable verb, which goes to the end of the clause. */
  prefix: string
}

/** Splits a vocabulary word into the pieces the conjugation works on. */
export function parseInfinitive(item: Pick<VocabularyItem, 'word' | 'verb'>): ParsedInfinitive {
  const words = item.word.trim().split(/\s+/)
  const reflexive = words[0] === 'sich'
  const rest = reflexive ? words.slice(1) : words
  const [infinitive = '', ...tailWords] = rest
  const prefix = item.verb?.separablePrefix ?? ''
  const verb = prefix && infinitive.startsWith(prefix) ? infinitive.slice(prefix.length) : infinitive
  return { reflexive, verb, tail: tailWords.join(' '), prefix }
}

/** The regular present tense of an infinitive ("arbeiten" → arbeite, arbeitest, arbeitet …). */
export function regularPresent(infinitive: string): PresentForms {
  const stem = infinitive.endsWith('en')
    ? infinitive.slice(0, -2)
    : infinitive.endsWith('n')
      ? infinitive.slice(0, -1)
      : infinitive
  const needsE = NEEDS_E.test(stem)
  const third = needsE ? `${stem}et` : `${stem}t`
  const du = S_SOUND.test(stem) ? `${stem}t` : needsE ? `${stem}est` : `${stem}st`
  // -eln drops the stem's "e" in the first person (ich sammle); -ern keeps it (ich wandere).
  const ich = infinitive.endsWith('eln') ? `${stem.slice(0, -2)}le` : `${stem}e`
  return [ich, du, third, infinitive, third, infinitive]
}

/** The six present forms of the verb itself, without reflexive pronoun, prefix or tail. */
export function presentForms(item: Pick<VocabularyItem, 'word' | 'verb'>): PresentForms {
  return item.verb?.present ?? regularPresent(parseInfinitive(item).verb)
}

export interface ConjugationRow {
  pronoun: (typeof PRONOUNS)[number]
  /** What follows the pronoun in a main clause: "stehe auf", "freue mich", "interessiere mich für". */
  form: string
}

function join(...parts: string[]): string {
  return parts.filter(Boolean).join(' ')
}

/** The present tense as a table of pronoun + form, with reflexive pronoun, separable prefix and preposition in place. */
export function conjugationTable(item: Pick<VocabularyItem, 'word' | 'verb'>): ConjugationRow[] {
  const { reflexive, tail, prefix } = parseInfinitive(item)
  const forms = presentForms(item)
  return PRONOUNS.map((pronoun, index) => ({
    pronoun,
    form: join(forms[index], reflexive ? REFLEXIVE_PRONOUNS[index] : '', prefix, tail),
  }))
}

const AUXILIARY_ER: Record<VerbAuxiliary, string> = {
  haben: 'hat',
  sein: 'ist',
}

/** Third person singular Perfekt: "hat gelernt", "ist gekommen", "hat sich gefreut". Absent where the verb has none. */
export function perfektForm(item: Pick<VocabularyItem, 'word' | 'verb'>): string | undefined {
  const { auxiliary, partizip } = item.verb ?? {}
  if (!auxiliary || !partizip) return undefined
  const { reflexive } = parseInfinitive(item)
  return join(AUXILIARY_ER[auxiliary], reflexive ? 'sich' : '', partizip)
}

/** Third person singular Präteritum: "fuhr", "stand auf", "freute sich". Absent where the verb has none. */
export function praeteritumForm(item: Pick<VocabularyItem, 'word' | 'verb'>): string | undefined {
  const form = item.verb?.praeteritum
  if (!form) return undefined
  const { reflexive, tail, prefix } = parseInfinitive(item)
  return join(form, reflexive ? 'sich' : '', prefix, tail)
}

/** The positions (0–5, as in `PRONOUNS`) whose present form differs from the regular pattern — the stem changes a card should point out. */
export function irregularPresentIndexes(item: Pick<VocabularyItem, 'word' | 'verb'>): number[] {
  const stored = item.verb?.present
  if (!stored) return []
  const regular = regularPresent(parseInfinitive(item).verb)
  return stored.flatMap((form, index) => (form !== regular[index] ? [index] : []))
}

/** True for the verbs whose present tense is not the regular pattern, i.e. where the card should flag the stem change. */
export function hasIrregularPresent(item: Pick<VocabularyItem, 'word' | 'verb'>): boolean {
  return irregularPresentIndexes(item).length > 0
}
