import { stripMarkup } from '@/lib/richText'
import type {
  Exercise,
  FillBlankExercise,
  ListeningExercise,
  MatchingExercise,
  MultipleChoiceExercise,
  OrderingExercise,
  Story,
  StorySegment,
  TrueFalseExercise,
  VocabularyItem,
} from '@/types'

/**
 * Builds a comprehension test from a reading text or conversation, out of the
 * sentences the learner has just read and typed. Nothing is authored twice:
 * the questions come from the story's own German sentences and Arabic
 * translations, in the exercise shapes the existing `ExerciseRunner` already
 * renders and grades.
 *
 * Deterministic: the same story always yields the same quiz (the random
 * choices are seeded from the story id), which keeps it testable and stable
 * across re-renders.
 *
 * Only questions that cannot be unfair are generated. In particular there are
 * no "false statements" invented from German words — a made-up sentence like
 * "Ich heiße Berlin." would be un-German. A false true/false item instead pairs
 * a real sentence with the *translation of a different one*.
 */

const MAX_QUESTIONS = 10
const MIN_QUESTIONS = 5
const OPTION_COUNT = 4

type QuestionKind = 'listening' | 'meaning' | 'fill-blank' | 'ordering' | 'speaker' | 'translation-check' | 'reverse-meaning' | 'matching'

/** The order questions are attempted in; kinds that do not fit the story are skipped. */
const PLAN: readonly QuestionKind[] = [
  'listening',
  'meaning',
  'fill-blank',
  'ordering',
  'translation-check',
  'speaker',
  'listening',
  'reverse-meaning',
  'fill-blank',
  'matching',
  'ordering',
]

export interface StoryQuizOptions {
  /** Other stories (normally the same level) that supply extra wrong answers when a story is short. */
  pool?: readonly Story[]
  /** Vocabulary for the "match the words from the text" question. */
  vocabulary?: readonly VocabularyItem[]
}

// ---- seeded randomness ------------------------------------------------------

function hash(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

type Random = () => number

function mulberry32(seed: number): Random {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffled<T>(items: readonly T[], random: Random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// ---- text helpers -----------------------------------------------------------

const key = (text: string) => text.trim().toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ')
const tokens = (text: string) => text.trim().split(/\s+/).filter(Boolean)
const core = (token: string) => token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')

const TRANSLITERATION: Readonly<Record<string, string>> = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss', Ä: 'Ae', Ö: 'Oe', Ü: 'Ue' }
/** "Ägypten" → "Aegypten": for learners on a keyboard without umlauts. */
export function transliterate(word: string): string {
  return Array.from(word)
    .map((char) => TRANSLITERATION[char] ?? char)
    .join('')
}

/** German words wrapped so they stay left-to-right inside Arabic prose (see `richText`). */
const de = (text: string) => `[[${stripMarkup(text)}]]`

// ---- the builder ------------------------------------------------------------

interface Context {
  story: Story
  random: Random
  /** Segments with both a German sentence and an Arabic translation, duplicates removed. */
  segments: StorySegment[]
  germanPool: string[]
  arabicPool: string[]
  usage: Map<number, number>
  vocabulary: readonly VocabularyItem[]
}

const wordCount = (text: string) => tokens(text).length

/**
 * Wrong answers. They should be plausible, so they are the lines closest in length to the right one
 * (a one-word "Hallo!" among long sentences would give itself away), with the story's own lines
 * preferred over lines borrowed from other stories.
 */
function distractors(correct: string, own: string[], extra: string[], count: number, random: Random): string[] | null {
  const target = wordCount(correct)
  const scored = [
    ...own.map((text) => ({ text, penalty: 0 })),
    ...extra.map((text) => ({ text, penalty: 1 })),
  ].map(({ text, penalty }) => ({ text, score: Math.abs(wordCount(text) - target) + penalty + random() * 0.5 }))
  scored.sort((a, b) => a.score - b.score)

  const seen = new Set([key(correct)])
  const picked: string[] = []
  for (const { text } of scored) {
    const normalised = key(text)
    if (!normalised || seen.has(normalised)) continue
    seen.add(normalised)
    picked.push(text)
    if (picked.length === count) return picked
  }
  return null
}

function withCorrect(correct: string, wrong: string[], random: Random): { options: string[]; correctIndex: number } {
  const options = shuffled([correct, ...wrong], random)
  return { options, correctIndex: options.indexOf(correct) }
}

function pickSegment(context: Context, eligible: (segment: StorySegment) => boolean): StorySegment | undefined {
  // The least-used eligible segment, so questions spread over the whole text instead of repeating one line.
  let best: StorySegment | undefined
  for (const segment of context.segments) {
    if (!eligible(segment)) continue
    if (!best || (context.usage.get(segment.index) ?? 0) < (context.usage.get(best.index) ?? 0)) best = segment
  }
  if (best) context.usage.set(best.index, (context.usage.get(best.index) ?? 0) + 1)
  return best
}

const common = (context: Context, n: number) => ({ id: `${context.story.id}-q${n}`, level: context.story.level })

function listening(context: Context, n: number): ListeningExercise | null {
  const segment = pickSegment(context, () => true)
  if (!segment) return null
  const wrong = distractors(segment.text, context.segments.map((s) => s.text), context.germanPool, OPTION_COUNT - 1, context.random)
  if (!wrong) return null
  const { options, correctIndex } = withCorrect(segment.text, wrong, context.random)
  return {
    ...common(context, n),
    type: 'listening',
    promptAr: 'استمع إلى الجملة، ثم اختر ما سمعته.',
    explanationAr: `${de(segment.text)} — ${segment.ar}`,
    audioText: segment.text,
    options,
    correctIndex,
  }
}

function meaning(context: Context, n: number): MultipleChoiceExercise | null {
  const segment = pickSegment(context, () => true)
  if (!segment?.ar) return null
  const wrong = distractors(segment.ar, context.segments.map((s) => s.ar ?? ''), context.arabicPool, OPTION_COUNT - 1, context.random)
  if (!wrong) return null
  const { options, correctIndex } = withCorrect(segment.ar, wrong, context.random)
  return {
    ...common(context, n),
    type: 'multiple-choice',
    promptAr: 'ما معنى هذه الجملة؟',
    explanationAr: `${de(segment.text)} تعني: ${segment.ar}`,
    questionDe: segment.text,
    options,
    correctIndex,
    optionLanguage: 'ar',
  }
}

function reverseMeaning(context: Context, n: number): MultipleChoiceExercise | null {
  const segment = pickSegment(context, () => true)
  if (!segment?.ar) return null
  const wrong = distractors(segment.text, context.segments.map((s) => s.text), context.germanPool, OPTION_COUNT - 1, context.random)
  if (!wrong) return null
  const { options, correctIndex } = withCorrect(segment.text, wrong, context.random)
  return {
    ...common(context, n),
    type: 'multiple-choice',
    promptAr: `اختر الجملة الألمانية التي تعني: «${segment.ar}»`,
    explanationAr: `${segment.ar} = ${de(segment.text)}`,
    questionDe: '',
    options,
    correctIndex,
  }
}

/** The one word to blank out: the longest plain word of at least three letters. */
function blankCandidate(text: string): { position: number; word: string } | null {
  const words = tokens(text)
  if (words.length < 3) return null
  let best: { position: number; word: string } | null = null
  words.forEach((token, position) => {
    const word = core(token)
    if (word.length < 3 || /[^\p{L}]/u.test(word)) return
    if (!best || word.length >= best.word.length) best = { position, word }
  })
  return best
}

function fillBlank(context: Context, n: number): FillBlankExercise | null {
  const segment = pickSegment(context, (s) => blankCandidate(s.text) !== null)
  if (!segment?.ar) return null
  const candidate = blankCandidate(segment.text)
  if (!candidate) return null

  const words = tokens(segment.text)
  words[candidate.position] = words[candidate.position].replace(candidate.word, '___')
  const accepted = Array.from(new Set([candidate.word, transliterate(candidate.word)]))
  return {
    ...common(context, n),
    type: 'fill-blank',
    promptAr: 'اكتب الكلمة الناقصة كما وردت في النص.',
    explanationAr: `الكلمة الناقصة: ${de(candidate.word)}. الجملة كاملة: ${de(segment.text)}`,
    sentenceDe: words.join(' '),
    acceptedAnswers: accepted,
    hint: `معنى الجملة: ${segment.ar}`,
  }
}

function canOrder(text: string): boolean {
  const words = tokens(text)
  if (words.length < 3 || words.length > 9) return false
  // Repeated words could be swapped without being wrong, which the checker would mark wrong.
  return new Set(words.map((word) => key(word))).size === words.length
}

function ordering(context: Context, n: number): OrderingExercise | null {
  const segment = pickSegment(context, (s) => canOrder(s.text))
  if (!segment?.ar) return null
  const original = tokens(segment.text)

  let order = shuffled(original.map((_, i) => i), context.random)
  if (order.every((value, i) => value === i)) order = [...order.slice(1), order[0]]

  // `words` is the scrambled row; `correctOrder[p]` is where the p-th word of the sentence sits in it.
  const words = order.map((i) => original[i])
  const correctOrder = original.map((_, p) => order.indexOf(p))
  return {
    ...common(context, n),
    type: 'ordering',
    promptAr: `رتّب كلمات الجملة كما وردت في النص: «${segment.ar}»`,
    explanationAr: `الترتيب الصحيح: ${de(segment.text)}`,
    words,
    correctOrder,
  }
}

function speaker(context: Context, n: number): MultipleChoiceExercise | null {
  const lineBySegment = new Map<number, { name: string }>()
  for (const block of context.story.blocks) if (block.type === 'line') lineBySegment.set(block.segment.index, { name: block.name })
  const names = Array.from(new Set([...lineBySegment.values()].map((line) => line.name)))
  if (context.story.kind !== 'dialogue' || names.length !== 2) return null

  const segment = pickSegment(context, (s) => lineBySegment.has(s.index))
  const line = segment && lineBySegment.get(segment.index)
  if (!segment || !line) return null
  const options = shuffled(names, context.random)
  return {
    ...common(context, n),
    type: 'multiple-choice',
    promptAr: 'من قال هذه الجملة في المحادثة؟',
    explanationAr: `قال ${de(line.name)}: ${de(segment.text)}`,
    questionDe: segment.text,
    options,
    correctIndex: options.indexOf(line.name),
  }
}

function translationCheck(context: Context, n: number): TrueFalseExercise | null {
  const segment = pickSegment(context, () => true)
  if (!segment?.ar) return null
  const other = distractors(segment.ar, context.segments.map((s) => s.ar ?? ''), context.arabicPool, 1, context.random)?.[0]
  const isTrue = context.random() < 0.5 || !other
  const shown = isTrue ? segment.ar : (other as string)
  return {
    ...common(context, n),
    type: 'true-false',
    promptAr: `هل هذه الترجمة صحيحة لهذه الجملة؟ «${shown}»`,
    explanationAr: isTrue ? `نعم. ${de(segment.text)} تعني: ${segment.ar}` : `لا. ${de(segment.text)} تعني: ${segment.ar}`,
    statementDe: segment.text,
    isTrue,
  }
}

function matching(context: Context, n: number): MatchingExercise | null {
  const storyWords = new Set(context.story.segments.flatMap((segment) => tokens(segment.text).map((token) => core(token).toLowerCase())))
  const pairs: { de: string; ar: string }[] = []
  const seenDe = new Set<string>()
  const seenAr = new Set<string>()
  for (const item of context.vocabulary) {
    if (item.partOfSpeech === 'phrase' || !storyWords.has(item.word.toLowerCase())) continue
    const german = item.article ? `${item.article} ${item.word}` : item.word
    const arabic = item.meaningAr.trim()
    if (!arabic || seenDe.has(key(german)) || seenAr.has(key(arabic))) continue
    seenDe.add(key(german))
    seenAr.add(key(arabic))
    pairs.push({ de: german, ar: arabic })
  }
  if (pairs.length < 3) return null
  return {
    ...common(context, n),
    type: 'matching',
    promptAr: 'طابق كل كلمة وردت في النص مع معناها.',
    explanationAr: 'هذه الكلمات وردت في النص. راجعها مع أمثلتها في صفحة المفردات.',
    pairs: shuffled(pairs, context.random).slice(0, 4),
  }
}

const BUILDERS: Record<QuestionKind, (context: Context, n: number) => Exercise | null> = {
  listening,
  meaning,
  'fill-blank': fillBlank,
  ordering,
  speaker,
  'reverse-meaning': reverseMeaning,
  'translation-check': translationCheck,
  matching,
}

export function buildStoryQuiz(story: Story, options: StoryQuizOptions = {}): Exercise[] {
  const seen = new Set<string>()
  const segments = story.segments.filter((segment) => {
    const normalised = key(segment.text)
    if (!segment.ar?.trim() || !normalised || seen.has(normalised)) return false
    seen.add(normalised)
    return true
  })

  const pool = (options.pool ?? []).filter((other) => other.id !== story.id).flatMap((other) => other.segments)
  const context: Context = {
    story,
    random: mulberry32(hash(story.id)),
    segments,
    germanPool: pool.map((segment) => segment.text),
    arabicPool: pool.flatMap((segment) => (segment.ar ? [segment.ar] : [])),
    usage: new Map(),
    vocabulary: options.vocabulary ?? [],
  }

  // Short stories get a shorter quiz so the same sentence is not asked about again and again.
  const target = Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, segments.length + 2))
  const exercises: Exercise[] = []
  for (const kind of PLAN) {
    if (exercises.length === target) break
    const exercise = BUILDERS[kind](context, exercises.length + 1)
    if (exercise) exercises.push(exercise)
  }
  return exercises
}
