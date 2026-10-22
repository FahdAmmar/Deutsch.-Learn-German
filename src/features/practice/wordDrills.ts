import { classifyPlural, PLURAL_PATTERN_NOTE_AR, pluralDistractors } from '@/lib/plurals'
import {
  conjugationTable,
  irregularPresentIndexes,
  parseInfinitive,
  perfektForm,
  praeteritumForm,
  PRONOUNS,
} from '@/lib/verbs'
import { shuffle } from '@/utils/shuffle'
import type { Exercise, FillBlankExercise, MultipleChoiceExercise, VocabularyItem } from '@/types'

import { SESSION_SIZE } from './sessions'

/** Every spelling the vocabulary knows, so a made-up wrong plural never turns out to be a real word. */
function knownForms(vocabulary: readonly VocabularyItem[]): Set<string> {
  const forms = new Set<string>()
  for (const item of vocabulary) {
    for (const part of [item.word, item.plural ?? ''].flatMap((text) => text.split('/'))) {
      const form = part.trim().toLowerCase()
      if (form) forms.add(form)
    }
  }
  return forms
}

const baseWord = (word: string) => word.split('/')[0].trim()

/** A "what is the plural?" question, or `undefined` when the noun has no ordinary plural to ask for. */
export function buildPluralExercise(
  item: VocabularyItem,
  known: ReadonlySet<string>,
): MultipleChoiceExercise | undefined {
  if (item.partOfSpeech !== 'noun' || !item.article || !item.plural || item.numberUse) return undefined
  // "Lehrer / Lehrerin" has two plurals; the drill asks about neither rather than one.
  if (item.word.includes('/')) return undefined
  const wrong = pluralDistractors(item.word, item.plural, known)
  if (wrong.length < 2) return undefined

  const options = shuffle([item.plural, ...wrong])
  const pattern = classifyPlural(item.word, item.plural)
  return {
    id: `plural-${item.id}`,
    type: 'multiple-choice',
    level: item.level,
    promptAr: 'ما جمع هذه الكلمة؟',
    questionDe: `${item.article} ${item.word}`,
    options,
    correctIndex: options.indexOf(item.plural),
    explanationAr: `الجمع: «die ${item.plural}» (${item.meaningAr}).${pattern ? ` النمط: ${PLURAL_PATTERN_NOTE_AR[pattern]}.` : ''} الجمع في الألمانية يُحفظ مع الاسم، ولا توجد قاعدة تغني عن ذلك.`,
  }
}

export function buildPluralDrill(vocabulary: readonly VocabularyItem[], size: number = SESSION_SIZE): Exercise[] {
  const known = knownForms(vocabulary)
  const questions = vocabulary.flatMap((item) => {
    const exercise = buildPluralExercise(item, known)
    return exercise ? [exercise] : []
  })
  return shuffle(questions).slice(0, size)
}

export function countPluralQuestions(vocabulary: readonly VocabularyItem[]): number {
  const known = knownForms(vocabulary)
  return vocabulary.filter((item) => buildPluralExercise(item, known) !== undefined).length
}

// ---- verbs ----

/** The modals form their Perfekt differently (Ersatzinfinitiv), which is not the point of the Perfekt drill. */
const MODALS = new Set(['können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen', 'möchten'])

/** Subject shown in the sentence; "er" stands for er/sie/es and "sie" for the plural sie. */
const SUBJECTS = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'] as const

const INSEPARABLE_PREFIXES = ['be', 'ver', 'ent', 'er', 'zer', 'ge', 'miss'] as const

function pick<T>(values: readonly T[]): T {
  return values[Math.floor(Math.random() * values.length)]
}

/** The conjugated present form of one pronoun, e.g. "fährst" or "stehe auf". */
function presentQuestion(item: VocabularyItem): FillBlankExercise | undefined {
  const table = conjugationTable(item)
  const irregular = irregularPresentIndexes(item)
  // Where the verb changes its stem, those are the forms worth asking.
  const index = irregular.length > 0 ? pick(irregular) : Math.floor(Math.random() * PRONOUNS.length)
  const form = table[index]?.form
  if (!form) return undefined

  const forms = table.map((row, position) => `${SUBJECTS[position]} ${row.form}`).join(' · ')
  const note = irregular.length > 0 ? ' لاحظ تغيّر الشكل في الصيغ التي تخرج عن النمط المنتظم.' : ''
  return {
    id: `verb-present-${item.id}-${index}`,
    type: 'fill-blank',
    level: item.level,
    promptAr: 'اكتب الفعل بالصيغة الصحيحة في المضارع (Präsens).',
    sentenceDe: `${SUBJECTS[index]} ___ (${item.word})`,
    acceptedAnswers: [form],
    hint: item.meaningAr,
    explanationAr: `${forms}.${note}`,
  }
}

function auxiliaryQuestion(item: VocabularyItem): MultipleChoiceExercise | undefined {
  const { auxiliary, partizip } = item.verb ?? {}
  const perfekt = perfektForm(item)
  if (!auxiliary || !partizip || !perfekt || MODALS.has(item.word)) return undefined
  const reason =
    auxiliary === 'sein'
      ? 'هذا الفعل يدل على حركة أو انتقال أو تغيّر حالة، وهذه الأفعال تأخذ sein (وكذلك sein وbleiben نفساهما).'
      : 'معظم الأفعال تأخذ haben في الـ Perfekt، ومنها الأفعال المتعدّية وكل الأفعال الانعكاسية.'
  return {
    id: `verb-aux-${item.id}`,
    type: 'multiple-choice',
    level: item.level,
    promptAr: 'ما الفعل المساعد في الـ Perfekt لهذا الفعل: haben أم sein؟',
    questionDe: item.word,
    options: ['haben', 'sein'],
    correctIndex: auxiliary === 'haben' ? 0 : 1,
    explanationAr: `er/sie/es ${perfekt}. ${reason}`,
  }
}

function participleNote(item: VocabularyItem): string {
  const partizip = item.verb?.partizip ?? ''
  const { verb, prefix } = parseInfinitive(item)
  if (prefix) return `فعل منفصل: تأتي البادئة ‎${prefix}‎ أولاً ثم ‎ge‎ في الوسط (${partizip}).`
  if (verb.endsWith('ieren')) return 'الأفعال المنتهية بـ ‎-ieren‎ لا تأخذ ‎ge-‎ في Partizip II.'
  if (INSEPARABLE_PREFIXES.some((start) => verb.startsWith(start) && verb !== start && partizip.startsWith(start))) {
    return 'البادئات غير المنفصلة (be-, ver-, ent-, er- …) تمنع ‎ge-‎ في Partizip II.'
  }
  return partizip.endsWith('t')
    ? 'فعل منتظم: ‎ge‎ + الجذع + ‎t‎.'
    : 'فعل قوي: ‎ge‎ + جذع قد يتغيّر + ‎en‎، ويُحفظ مع الفعل.'
}

function participleQuestion(item: VocabularyItem): FillBlankExercise | undefined {
  const { auxiliary, partizip } = item.verb ?? {}
  if (!auxiliary || !partizip || MODALS.has(item.word)) return undefined
  const { reflexive, tail } = parseInfinitive(item)
  const aux = auxiliary === 'haben' ? 'hat' : 'ist'
  return {
    id: `verb-participle-${item.id}`,
    type: 'fill-blank',
    level: item.level,
    promptAr: 'اكتب Partizip II لهذا الفعل.',
    sentenceDe: `Er ${aux}${reflexive ? ' sich' : ''} ___ . (${item.word})`,
    acceptedAnswers: [partizip],
    hint: item.meaningAr,
    explanationAr: `Er ${aux}${reflexive ? ' sich' : ''} ${partizip}${tail ? ` ${tail}` : ''}. ${participleNote(item)}`,
  }
}

function praeteritumQuestion(item: VocabularyItem): FillBlankExercise | undefined {
  const form = praeteritumForm(item)
  if (!form) return undefined
  return {
    id: `verb-praeteritum-${item.id}`,
    type: 'fill-blank',
    level: item.level,
    promptAr: 'اكتب الفعل في الماضي البسيط (Präteritum) مع er/sie/es.',
    sentenceDe: `Er ___ (${item.word})`,
    acceptedAnswers: [form],
    hint: item.meaningAr,
    explanationAr: `Präteritum: er/sie/es ${form}. الماضي البسيط يُحفظ مع الفعل، ويُستعمل في الكتابة والسرد وفي sein وhaben والأفعال الناقصة.`,
  }
}

export interface VerbDrillOptions {
  /** Include Präteritum questions — A2 grammar, so off for an A1 session. */
  includePraeteritum: boolean
}

/** The questions one verb can give: its present, its Perfekt auxiliary and participle, and (A2) its Präteritum. */
export function buildVerbQuestions(item: VocabularyItem, { includePraeteritum }: VerbDrillOptions): Exercise[] {
  if (item.partOfSpeech !== 'verb' || !item.verb) return []
  const questions: Array<Exercise | undefined> = [
    presentQuestion(item),
    auxiliaryQuestion(item),
    participleQuestion(item),
    includePraeteritum ? praeteritumQuestion(item) : undefined,
  ]
  return questions.filter((question): question is Exercise => question !== undefined)
}

/** One random question per verb, so a session covers many verbs instead of repeating a few. */
export function buildVerbDrill(
  vocabulary: readonly VocabularyItem[],
  options: VerbDrillOptions,
  size: number = SESSION_SIZE,
): Exercise[] {
  const verbs = shuffle(vocabulary.filter((item) => item.partOfSpeech === 'verb' && item.verb))
  const seen = new Set<string>()
  const questions: Exercise[] = []
  for (const verb of verbs) {
    // The same verb appears in several modules; ask each only once per session.
    const key = verb.word
    if (seen.has(key)) continue
    seen.add(key)
    const own = buildVerbQuestions(verb, options)
    if (own.length > 0) questions.push(pick(own))
    if (questions.length >= size) break
  }
  return questions
}

export function countVerbs(vocabulary: readonly VocabularyItem[]): number {
  return new Set(
    vocabulary.filter((item) => item.partOfSpeech === 'verb' && item.verb).map((item) => baseWord(item.word)),
  ).size
}
