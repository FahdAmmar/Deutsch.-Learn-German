import { getAllVocabulary } from '@/lib/curriculum'
import { generateId } from '@/utils/id'
import { shuffle } from '@/utils/shuffle'
import type { VocabRecallExercise, VocabularyItem } from '@/types'

const DISTRACTOR_COUNT = 3

/**
 * Turns a vocabulary item into a standalone multiple-choice recall
 * exercise, picking distractors from the same category/level when
 * possible (more plausible/confusable) and falling back to the wider
 * vocabulary pool otherwise.
 */
export function buildVocabRecallExercise(item: VocabularyItem): VocabRecallExercise {
  const candidatePool = getAllVocabulary().filter(
    (candidate) => candidate.id !== item.id && candidate.meaningAr !== item.meaningAr,
  )
  const sameCategory = candidatePool.filter(
    (candidate) => candidate.category === item.category && candidate.level === item.level,
  )
  const distractorSource = sameCategory.length >= DISTRACTOR_COUNT ? sameCategory : candidatePool

  const distractorsAr = shuffle(distractorSource)
    .slice(0, DISTRACTOR_COUNT)
    .map((candidate) => candidate.meaningAr)

  return {
    id: generateId('review'),
    type: 'vocab-recall',
    level: item.level,
    promptAr: 'ما معنى هذه الكلمة؟',
    vocabularyId: item.id,
    questionDe: item.article ? `${item.article} ${item.word}` : item.word,
    correctAnswerAr: item.meaningAr,
    distractorsAr,
    explanationAr: `"${item.word}" تعني "${item.meaningAr}".`,
  }
}
