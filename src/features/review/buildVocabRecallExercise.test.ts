import { describe, expect, it } from 'vitest'

import { getVocabularyForLevel } from '@/lib/curriculum'

import { buildVocabRecallExercise } from './buildVocabRecallExercise'

describe('buildVocabRecallExercise', () => {
  const sampleItem = getVocabularyForLevel('A1')[0]

  it('builds a vocab-recall exercise with the correct answer set from the item', () => {
    const exercise = buildVocabRecallExercise(sampleItem)

    expect(exercise.type).toBe('vocab-recall')
    expect(exercise.vocabularyId).toBe(sampleItem.id)
    expect(exercise.correctAnswerAr).toBe(sampleItem.meaningAr)
  })

  it('includes the article in the German prompt when the item has one', () => {
    const nounWithArticle = getVocabularyForLevel('A1').find((item) => item.article)
    expect(nounWithArticle).toBeDefined()

    const exercise = buildVocabRecallExercise(nounWithArticle!)
    expect(exercise.questionDe).toBe(`${nounWithArticle!.article} ${nounWithArticle!.word}`)
  })

  it('provides exactly three distractors, none matching the correct meaning', () => {
    const exercise = buildVocabRecallExercise(sampleItem)

    expect(exercise.distractorsAr).toHaveLength(3)
    expect(exercise.distractorsAr.every((meaning) => meaning !== sampleItem.meaningAr)).toBe(true)
  })

  it('generates a unique id for every call, so repeated reviews of the same word do not collide', () => {
    const first = buildVocabRecallExercise(sampleItem)
    const second = buildVocabRecallExercise(sampleItem)
    expect(first.id).not.toBe(second.id)
  })
})
