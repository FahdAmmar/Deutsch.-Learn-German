import type {
  Exercise,
  FillBlankExercise,
  GermanArticle,
  Lesson,
  ListeningExercise,
  MatchingExercise,
  Module,
  MultipleChoiceExercise,
  OrderingExercise,
  TranslationExercise,
  VocabRecallExercise,
  VocabularyItem,
} from '@/types'

import { TRANSLATION_TASKS, type TranslationTask } from './translationTasks'

/**
 * Practice exercises that are *derived* from what a lesson already teaches.
 *
 * A lesson's authored vocabulary and example sentences are the single source of
 * truth; the exercises built here only re-ask them in other forms (hear it,
 * recall it, write it). Everything is deterministic — no randomness — so the
 * same lesson always yields the same exercises, ids included, and the content
 * integrity suite can check them like hand-written ones.
 *
 * Derived exercises have ids of the form `<lessonId>-gen-<kind>-<n>` so they can
 * be told apart from authored ones.
 */

interface Sentence {
  de: string
  ar: string
  /** The vocabulary item the sentence was written for, when it came from one. */
  anchor?: VocabularyItem
}

const ARTICLES: readonly GermanArticle[] = ['der', 'die', 'das']

const RECALL_PER_LESSON = 2

/** `der Tisch`, or `gehen` for a word without an article. */
export function vocabularyLabel(item: Pick<VocabularyItem, 'word' | 'article'>): string {
  return item.article ? `${item.article} ${item.word}` : item.word
}

/** `count` items spread evenly over the list, in order (never the first `count` only). */
function spread<T>(items: readonly T[], count: number): T[] {
  if (items.length <= count) return [...items]
  return Array.from({ length: count }, (_, index) => items[Math.floor((index * items.length) / count)])
}

function wordCount(sentence: string): number {
  return sentence.trim().split(/\s+/).length
}

/** A stable small number from a string, used only to vary where the right option sits. */
function hash(value: string): number {
  let result = 0
  for (const char of value) result = (result * 31 + char.charCodeAt(0)) % 9973
  return result
}

function sentencesOf(lesson: Pick<Lesson, 'examples' | 'vocabulary'>): Sentence[] {
  const seen = new Set<string>()
  const result: Sentence[] = []
  const push = (sentence: Sentence) => {
    const key = sentence.de.trim()
    if (!key || seen.has(key) || !/[.!?]$/.test(key)) return
    seen.add(key)
    result.push(sentence)
  }
  for (const item of lesson.vocabulary) {
    if (item.example) push({ de: item.example.de, ar: item.example.ar, anchor: item })
  }
  for (const example of lesson.examples) push({ de: example.de, ar: example.ar })
  return result
}

/** The answers to a question from a pool: unique meanings, same part of speech first, in a fixed rotation after the item. */
function pickDistractors(item: VocabularyItem, pool: readonly VocabularyItem[], count: number): string[] {
  const start = pool.findIndex((candidate) => candidate.id === item.id)
  const rotated = [...pool.slice(start + 1), ...pool.slice(0, Math.max(start, 0))]
  const eligible = rotated.filter((candidate) => candidate.id !== item.id && candidate.meaningAr !== item.meaningAr)
  const samePart = eligible.filter((candidate) => candidate.partOfSpeech === item.partOfSpeech)
  const others = eligible.filter((candidate) => candidate.partOfSpeech !== item.partOfSpeech)
  const meanings: string[] = []
  for (const candidate of [...samePart, ...others]) {
    if (meanings.length === count) break
    if (!meanings.includes(candidate.meaningAr)) meanings.push(candidate.meaningAr)
  }
  return meanings
}

function recallExercises(lesson: Lesson, count: number): VocabRecallExercise[] {
  const pool = lesson.vocabulary
  const exercises: VocabRecallExercise[] = []
  for (const item of spread(pool, count)) {
    const distractorsAr = pickDistractors(item, pool, 3)
    if (distractorsAr.length < 3) continue
    exercises.push({
      id: `${lesson.id}-gen-recall-${exercises.length + 1}`,
      type: 'vocab-recall',
      level: lesson.level,
      promptAr: 'ما معنى هذه الكلمة؟',
      vocabularyId: item.id,
      questionDe: vocabularyLabel(item),
      correctAnswerAr: item.meaningAr,
      distractorsAr,
      explanationAr: `«${vocabularyLabel(item)}» تعني «${item.meaningAr}».`,
    })
  }
  return exercises
}

function listeningExercise(lesson: Lesson): ListeningExercise | undefined {
  const sentences = sentencesOf(lesson).filter((sentence) => wordCount(sentence.de) <= 9)
  if (sentences.length < 4) return undefined
  const target = sentences[Math.floor(sentences.length / 2)]
  const others = sentences.filter((sentence) => sentence !== target)
  // Distractors come from across the lesson, not just the sentences next to the target.
  const distractors = spread(others, 3)
  const correctIndex = hash(lesson.id) % 4
  const options = [...distractors.map((sentence) => sentence.de)]
  options.splice(correctIndex, 0, target.de)
  return {
    id: `${lesson.id}-gen-listening-1`,
    type: 'listening',
    level: lesson.level,
    promptAr: 'استمع واختر ما سمعت',
    audioText: target.de,
    options,
    correctIndex,
    explanationAr: `الجملة المسموعة: «${target.de}» — ${target.ar}`,
  }
}

/** ä → ae, ö → oe, ü → ue, ß → ss: how German is written where those keys are missing. A learner who types it that way is not wrong. */
export function transliterate(text: string): string {
  return text
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss')
}

/** A translation exercise from an authored task: every listed answer is accepted, plus its ae/oe/ue/ss spelling. */
export function translationFromTask(lessonId: string, level: Lesson['level'], task: TranslationTask): TranslationExercise {
  const accepted = [...task.de, ...task.de.map(transliterate)]
  const note = task.noteAr ? ` ${task.noteAr}` : ''
  return {
    id: `${lessonId}-gen-translation-1`,
    type: 'translation',
    level,
    direction: 'ar-to-de',
    promptAr: task.hintAr ? `ترجم الجملة التالية إلى الألمانية — ${task.hintAr}` : 'ترجم الجملة التالية إلى الألمانية',
    sourceText: task.ar,
    acceptedAnswers: Array.from(new Set(accepted)),
    explanationAr: `الإجابة النموذجية: «${task.de[0]}».${note}`,
  }
}

/**
 * Adds, to a lesson that lacks them, the exercise kinds that train hearing, recalling
 * and writing: vocabulary recall (up to two), one listening question and, where the lesson has an authored
 * task in `translationTasks.ts`, one translation.
 * A kind the lesson already has is left alone. Authored exercises keep their order; derived ones follow.
 */
export function withPractice(lesson: Lesson): Lesson {
  const has = (type: Exercise['type']) => lesson.exercises.filter((exercise) => exercise.type === type).length
  const extra: Exercise[] = []

  const missingRecall = RECALL_PER_LESSON - has('vocab-recall')
  if (missingRecall > 0 && lesson.vocabulary.length >= 4) extra.push(...recallExercises(lesson, missingRecall))

  if (has('listening') === 0) {
    const listening = listeningExercise(lesson)
    if (listening) extra.push(listening)
  }
  const task = TRANSLATION_TASKS[lesson.id]
  if (has('translation') === 0 && task) extra.push(translationFromTask(lesson.id, lesson.level, task))
  return extra.length === 0 ? lesson : { ...lesson, exercises: [...lesson.exercises, ...extra] }
}

/** Applies `withPractice` to every lesson of a module. */
export function moduleWithPractice(module: Module): Module {
  return { ...module, lessons: module.lessons.map(withPractice) }
}

// ── Exercises for a vocabulary-themed lesson ──────────────────────────────────

function matchingExercise(lesson: Lesson): MatchingExercise | undefined {
  const nouns = lesson.vocabulary.filter((item) => item.article)
  const verbs = lesson.vocabulary.filter((item) => item.partOfSpeech === 'verb')
  const picked = [...spread(nouns, 4), ...spread(verbs, 2)]
  const seenAr = new Set<string>()
  const pairs = picked
    .filter((item) => {
      if (seenAr.has(item.meaningAr)) return false
      seenAr.add(item.meaningAr)
      return true
    })
    .map((item) => ({ de: vocabularyLabel(item), ar: item.meaningAr }))
  if (pairs.length < 4) return undefined
  return {
    id: `${lesson.id}-gen-matching-1`,
    type: 'matching',
    level: lesson.level,
    promptAr: 'طابق الكلمة الألمانية مع معناها',
    pairs,
    explanationAr: 'احفظ الاسم مع أداته دائماً: der / die / das جزء من الكلمة.',
  }
}

function articleExercises(lesson: Lesson, count: number): MultipleChoiceExercise[] {
  // Only singular nouns that carry an ordinary article: a name used without one has nothing to ask.
  const nouns = lesson.vocabulary.filter((item) => item.article && item.numberUse !== 'only')
  return spread(nouns, count).map((item, index) => ({
    id: `${lesson.id}-gen-article-${index + 1}`,
    type: 'multiple-choice',
    level: lesson.level,
    promptAr: `ما أداة التعريف الصحيحة للكلمة «${item.word}» (${item.meaningAr})؟`,
    questionDe: `___ ${item.word}`,
    options: [...ARTICLES],
    correctIndex: ARTICLES.indexOf(item.article as GermanArticle),
    explanationAr: `الصحيح: ${item.article} ${item.word} (الجمع: ${item.plural ?? 'لا جمع معتاد له'}). تعلّم الاسم دائماً مع أداته.`,
  }))
}

function fillBlankExercises(lesson: Lesson, count: number): FillBlankExercise[] {
  const usable = lesson.vocabulary.filter((item) => {
    const sentence = item.example?.de
    if (!item.article || !sentence) return false
    // The noun must appear exactly once in the sentence, so the blank is unambiguous.
    return sentence.split(item.word).length === 2 && !sentence.startsWith(item.word)
  })
  return spread(usable, count).map((item, index) => ({
    id: `${lesson.id}-gen-fill-${index + 1}`,
    type: 'fill-blank',
    level: lesson.level,
    promptAr: `أكمل الجملة بالكلمة الناقصة (${item.meaningAr})`,
    sentenceDe: (item.example?.de ?? '').replace(item.word, '___'),
    acceptedAnswers: [item.word],
    hint: `${item.article} ${item.word}`,
    explanationAr: `الكلمة الناقصة هي «${item.word}» — ${item.example?.ar ?? ''}`,
  }))
}

/** A short sentence in scrambled order. Skipped when two words are identical, since the order could then be given two ways. */
function orderingExercise(lesson: Lesson): OrderingExercise | undefined {
  const sentence = sentencesOf(lesson).find((candidate) => {
    const words = candidate.de.split(/\s+/)
    return words.length >= 4 && words.length <= 7 && !candidate.de.includes(',') && new Set(words).size === words.length
  })
  if (!sentence) return undefined
  const correct = sentence.de.split(/\s+/)
  // Reversed, then the first two swapped: never equal to the original for four or more distinct words.
  const scrambled = [...correct].reverse()
  ;[scrambled[0], scrambled[1]] = [scrambled[1], scrambled[0]]
  return {
    id: `${lesson.id}-gen-ordering-1`,
    type: 'ordering',
    level: lesson.level,
    promptAr: 'رتّب الكلمات لتكوّن جملة صحيحة',
    words: scrambled,
    correctOrder: correct.map((word) => scrambled.indexOf(word)),
    explanationAr: `الترتيب الصحيح: «${sentence.de}» — ${sentence.ar}`,
  }
}

/**
 * The authored exercises of a vocabulary-themed lesson: matching, the article of three nouns,
 * two fill-in-the-blank sentences and one word-ordering task, all built from its own word list.
 * `withPractice` then adds recall, listening and translation.
 */
export function vocabularyThemeExercises(lesson: Lesson): Exercise[] {
  const exercises: Exercise[] = []
  const matching = matchingExercise(lesson)
  if (matching) exercises.push(matching)
  exercises.push(...articleExercises(lesson, 3))
  exercises.push(...fillBlankExercises(lesson, 2))
  const ordering = orderingExercise(lesson)
  if (ordering) exercises.push(ordering)
  return exercises
}
