import { ORDER_PATTERNS, WORD_ORDER_SENTENCES, type OrderPattern, type WordOrderSentence } from '@/data/wordOrder'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Exercise, OrderingExercise } from '@/types'
import { generateId } from '@/utils/id'
import { shuffle } from '@/utils/shuffle'

import { SESSION_SIZE } from './sessions'

const reaches = (itemLevel: CEFRLevel, level: CEFRLevel): boolean => CEFR_LEVELS.indexOf(itemLevel) <= CEFR_LEVELS.indexOf(level)

export function getOrderPattern(sentence: WordOrderSentence): OrderPattern {
  const pattern = ORDER_PATTERNS.find((candidate) => candidate.id === sentence.pattern)
  if (!pattern) throw new Error(`Unknown word-order pattern: ${sentence.pattern}`)
  return pattern
}

export function getWordOrderSentences(level: CEFRLevel): WordOrderSentence[] {
  return WORD_ORDER_SENTENCES.filter((sentence) => reaches(getOrderPattern(sentence).level, level))
}

/** The sentence as plain German, with the written parts joined by spaces. */
export const sentenceText = (sentence: WordOrderSentence): string => sentence.chunks.map((chunk) => chunk.text).join(' ')

/** A shuffle of 0..n-1 that is not the order of the sentence itself, nor one of its alternatives. */
function scramble(sentence: WordOrderSentence): number[] {
  const identity = sentence.chunks.map((_, index) => index)
  const right = [identity, ...(sentence.alternatives ?? [])].map((order) => order.join(','))
  let order = shuffle(identity)
  for (let attempt = 0; attempt < 10 && right.includes(order.join(',')); attempt += 1) order = shuffle(identity)
  return order
}

/**
 * An ordering exercise from a sentence. The parts are shuffled; `correctOrder` and each accepted
 * alternative are rewritten as positions in the shuffled list; each part's role goes with it.
 */
export function buildWordOrderQuestion(sentence: WordOrderSentence): OrderingExercise {
  const pattern = getOrderPattern(sentence)
  const order = scramble(sentence)
  const positionOf = (chunkIndex: number): number => order.indexOf(chunkIndex)
  const note = sentence.alternatives?.length ? ' وهناك ترتيب آخر صحيح أيضاً، لكن هذا هو الترتيب المعتاد.' : ''
  return {
    id: generateId(`order-${sentence.id}`),
    type: 'ordering',
    level: pattern.level,
    promptAr: `رتّب الأجزاء لتكوين جملة صحيحة: «${sentence.ar}» — ابدأ بالكلمة المكتوبة بحرف كبير.`,
    words: order.map((chunkIndex) => sentence.chunks[chunkIndex].text),
    correctOrder: sentence.chunks.map((_, chunkIndex) => positionOf(chunkIndex)),
    acceptedOrders: sentence.alternatives?.map((alternative) => alternative.map(positionOf)),
    roles: order.map((chunkIndex) => sentence.chunks[chunkIndex].role),
    explanationAr: `${pattern.titleAr}. ${pattern.ruleAr}${note}`,
  }
}

/** A session on word order: one sentence at a time from each pattern in turn, so no pattern crowds out the others. */
export function buildWordOrderDrill(level: CEFRLevel, size: number = SESSION_SIZE): Exercise[] {
  const queues = ORDER_PATTERNS.filter((pattern) => reaches(pattern.level, level)).map((pattern) =>
    shuffle(WORD_ORDER_SENTENCES.filter((sentence) => sentence.pattern === pattern.id)),
  )
  const sentences: WordOrderSentence[] = []
  for (let round = 0; sentences.length < size; round += 1) {
    let added = false
    for (const queue of shuffle(queues)) {
      if (round < queue.length && sentences.length < size) {
        sentences.push(queue[round])
        added = true
      }
    }
    if (!added) break
  }
  return sentences.map(buildWordOrderQuestion)
}
