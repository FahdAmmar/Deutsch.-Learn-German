import { getModuleById } from '@/lib/curriculum'
import { shuffle } from '@/utils/shuffle'
import type { AnswerCounter, Exercise, GermanArticle, Module, MultipleChoiceExercise, VocabularyItem } from '@/types'

export type PracticeMode = 'mixed' | 'articles' | 'weak'

export const SESSION_SIZE = 10

const ARTICLES: readonly GermanArticle[] = ['der', 'die', 'das']

/**
 * A "which article?" question for one noun. The data already carries the
 * article and the Arabic meaning, so nothing here is invented: the exercise
 * only asks what the vocabulary entry already states.
 */
export function buildArticleExercise(item: VocabularyItem): MultipleChoiceExercise | undefined {
  if (!item.article) return undefined
  // An entry such as "Lehrer / Lehrerin" carries both forms, but the article it states is the first one's:
  // asking about the whole text would make "die" look right for "Lehrer".
  const [word, feminine] = item.word.split('/').map((part) => part.trim())
  return {
    id: `article-${item.id}`,
    type: 'multiple-choice',
    level: item.level,
    promptAr: 'ما أداة التعريف الصحيحة لهذه الكلمة؟',
    questionDe: word,
    options: [...ARTICLES],
    correctIndex: ARTICLES.indexOf(item.article),
    explanationAr: `الأداة الصحيحة هي «${item.article}»: «${item.article} ${word}» (${item.meaningAr}).${feminine ? ` والمؤنّث: «die ${feminine}».` : ''} احفظ الاسم دائماً مع أداته.`,
  }
}

export function buildArticleDrill(vocabulary: readonly VocabularyItem[], size: number = SESSION_SIZE): Exercise[] {
  const questions = vocabulary.flatMap((item) => {
    const exercise = buildArticleExercise(item)
    return exercise ? [exercise] : []
  })
  return shuffle(questions).slice(0, size)
}

/** Below this accuracy a topic counts as weak. */
export const WEAK_ACCURACY = 0.8

/** A topic needs at least this many answers before it can be called weak — three answers is a pattern, one is noise. */
export const MIN_ATTEMPTS = 3

export interface WeakModule {
  moduleId: string
  accuracy: number
  attempts: number
}

/** The topics the learner is weakest in, worst first. Topics with too little data are left out. */
export function findWeakModules(byModule: Readonly<Record<string, AnswerCounter>>): WeakModule[] {
  return Object.entries(byModule)
    .filter(([, counter]) => counter.attempts >= MIN_ATTEMPTS)
    .map(([moduleId, counter]) => ({ moduleId, accuracy: counter.correct / counter.attempts, attempts: counter.attempts }))
    .filter((entry) => entry.accuracy < WEAK_ACCURACY)
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)
}

export interface WeakSpotSession {
  exercises: Exercise[]
  /** The topics the session draws from, worst first, for showing the learner what it targets. */
  modules: Module[]
}

/**
 * A session built from the exercises of the weakest topics: the worst topic
 * contributes first, and the session is filled round-robin across topics so
 * one topic cannot crowd the others out.
 */
export function buildWeakSpotSession(byModule: Readonly<Record<string, AnswerCounter>>, size: number = SESSION_SIZE): WeakSpotSession {
  const modules = findWeakModules(byModule)
    .map((entry) => getModuleById(entry.moduleId))
    .filter((module): module is Module => module !== undefined)

  const queues = modules.map((module) => shuffle(module.lessons.flatMap((lesson) => lesson.exercises)))
  const exercises: Exercise[] = []
  for (let round = 0; exercises.length < size; round += 1) {
    let added = false
    for (const queue of queues) {
      if (round < queue.length && exercises.length < size) {
        exercises.push(queue[round])
        added = true
      }
    }
    if (!added) break
  }

  return { exercises, modules }
}
