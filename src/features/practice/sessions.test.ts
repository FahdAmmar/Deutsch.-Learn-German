import { describe, expect, it } from 'vitest'

import { getAllVocabulary, getModulesForLevel } from '@/lib/curriculum'
import type { VocabularyItem } from '@/types'

import { buildArticleDrill, buildArticleExercise, buildWeakSpotSession, findWeakModules, MIN_ATTEMPTS } from './sessions'

const noun = (article: 'der' | 'die' | 'das'): VocabularyItem => ({
  id: `v-${article}`,
  word: 'Tisch',
  article,
  partOfSpeech: 'noun',
  meaningAr: 'الطاولة',
  level: 'A1',
  category: 'بيت',
})

describe('buildArticleExercise', () => {
  it.each(['der', 'die', 'das'] as const)('marks the article "%s" as the correct option', (article) => {
    const exercise = buildArticleExercise(noun(article))!
    expect(exercise.options).toEqual(['der', 'die', 'das'])
    expect(exercise.options[exercise.correctIndex]).toBe(article)
  })

  it('makes no question for a word without an article', () => {
    expect(buildArticleExercise({ ...noun('der'), article: undefined, partOfSpeech: 'verb' })).toBeUndefined()
  })
})

describe('buildArticleDrill', () => {
  it('uses only real nouns from the curriculum, never more than the session size', () => {
    const drill = buildArticleDrill(getAllVocabulary(), 10)
    expect(drill).toHaveLength(10)
    expect(new Set(drill.map((exercise) => exercise.id)).size).toBe(10)
  })
})

describe('findWeakModules', () => {
  it('lists topics below the accuracy bar, worst first', () => {
    const weak = findWeakModules({ a: { attempts: 10, correct: 5 }, b: { attempts: 10, correct: 2 }, c: { attempts: 10, correct: 10 } })
    expect(weak.map((entry) => entry.moduleId)).toEqual(['b', 'a'])
  })

  it('ignores topics with too few answers to say anything', () => {
    expect(findWeakModules({ a: { attempts: MIN_ATTEMPTS - 1, correct: 0 } })).toEqual([])
  })
})

describe('buildWeakSpotSession', () => {
  it('draws exercises only from the weak topics', () => {
    const [first, second] = getModulesForLevel('A1')
    const session = buildWeakSpotSession({ [first.id]: { attempts: 10, correct: 2 }, [second.id]: { attempts: 10, correct: 4 } })

    const allowed = new Set([first, second].flatMap((module) => module.lessons.flatMap((lesson) => lesson.exercises.map((exercise) => exercise.id))))
    expect(session.exercises.length).toBeGreaterThan(0)
    expect(session.exercises.every((exercise) => allowed.has(exercise.id))).toBe(true)
    expect(session.modules.map((module) => module.id)).toEqual([first.id, second.id])
  })

  it('is empty when nothing is weak', () => {
    expect(buildWeakSpotSession({ x: { attempts: 10, correct: 10 } }).exercises).toEqual([])
  })

  it('does not repeat an exercise within a session', () => {
    const [first] = getModulesForLevel('A1')
    const { exercises } = buildWeakSpotSession({ [first.id]: { attempts: 10, correct: 1 } }, 50)
    expect(new Set(exercises.map((exercise) => exercise.id)).size).toBe(exercises.length)
  })
})
