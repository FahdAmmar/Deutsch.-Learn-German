import { describe, expect, it } from 'vitest'

import { ORDER_PATTERNS, WORD_ORDER_SENTENCES, type WordOrderSentence } from '@/data/wordOrder'
import { isOrderCorrect } from '@/lib/orderingCheck'

import { buildWordOrderDrill, buildWordOrderQuestion, getOrderPattern, getWordOrderSentences, sentenceText } from './wordOrderDrill'

/** Every order a sentence may be written in: its own and its alternatives, as lists of chunk indices. */
const rightOrders = (sentence: WordOrderSentence): number[][] => [sentence.chunks.map((_, index) => index), ...(sentence.alternatives ?? []).map((order) => [...order])]

describe('word order data', () => {
  it('has unique sentence ids, and a known pattern for every sentence', () => {
    expect(new Set(WORD_ORDER_SENTENCES.map((sentence) => sentence.id)).size).toBe(WORD_ORDER_SENTENCES.length)
    for (const sentence of WORD_ORDER_SENTENCES) expect(() => getOrderPattern(sentence), sentence.id).not.toThrow()
  })

  it('has every pattern taught by at least three sentences', () => {
    for (const pattern of ORDER_PATTERNS) {
      expect(WORD_ORDER_SENTENCES.filter((sentence) => sentence.pattern === pattern.id).length, pattern.id).toBeGreaterThanOrEqual(3)
    }
  })

  it('starts every sentence with a capital letter and no other part with one, except nouns, Sie and the like', () => {
    for (const sentence of WORD_ORDER_SENTENCES) {
      expect(sentence.chunks[0].text, sentence.id).toMatch(/^\p{Lu}/u)
      // "ich" must be lower case in the middle of a sentence: that is what tells the learner where it starts.
      for (const chunk of sentence.chunks.slice(1)) expect(chunk.text, `${sentence.id}/${chunk.text}`).not.toMatch(/^(Ich|Er|Wir|Du|Es)$/)
    }
  })

  it('keeps final punctuation out of the parts, apart from the commas that separate clauses', () => {
    for (const sentence of WORD_ORDER_SENTENCES) {
      for (const chunk of sentence.chunks) expect(chunk.text, `${sentence.id}/${chunk.text}`).not.toMatch(/[.?!]$/)
      expect(sentence.chunks.at(-1)?.text, sentence.id).not.toMatch(/,$/)
    }
  })

  it('puts the finite verb where its pattern says, in every right order', () => {
    for (const sentence of WORD_ORDER_SENTENCES) {
      const { chunks } = sentence
      for (const order of rightOrders(sentence)) {
        const placed = order.map((index) => chunks[index])
        if (sentence.pattern === 'nebensatz') {
          // After the conjunction, the first finite verb ends its clause: it is last, or the main clause's verb follows at once.
          const conjunction = placed.findIndex((chunk) => chunk.role === 'conjunction')
          expect(conjunction, sentence.id).toBeGreaterThanOrEqual(0)
          const verb = placed.findIndex((chunk, position) => position > conjunction && chunk.role === 'verb')
          expect(verb, sentence.id).toBeGreaterThan(conjunction)
          expect(verb === placed.length - 1 || placed[verb + 1].role === 'verb', sentence.id).toBe(true)
        } else {
          // Second place in a statement or a question word's question; first place in a yes/no question.
          const verb = placed.findIndex((chunk) => chunk.role === 'verb')
          expect(verb, sentence.id).toBe(placed[0].role === 'verb' ? 0 : 1)
        }
        // The second part of the verb closes the sentence in a frame pattern.
        if (['modal', 'trennbar', 'perfekt'].includes(sentence.pattern)) expect(placed.at(-1)?.role, sentence.id).toBe('verb-end')
        if (sentence.pattern === 'ja-nein') expect(placed.some((chunk) => chunk.role === 'question-word'), sentence.id).toBe(false)
        if (sentence.pattern === 'w-frage') expect(placed[0].role, sentence.id).toBe('question-word')
      }
    }
  })

  it('lists alternatives that are real, different re-orderings of the same parts', () => {
    for (const sentence of WORD_ORDER_SENTENCES) {
      const identity = sentence.chunks.map((_, index) => index).join(',')
      const seen = new Set([identity])
      for (const alternative of sentence.alternatives ?? []) {
        expect([...alternative].sort((a, b) => a - b).join(','), sentence.id).toBe(identity)
        expect(seen.has(alternative.join(',')), sentence.id).toBe(false)
        seen.add(alternative.join(','))
      }
    }
  })

  it('has the first part of a statement in the first place of every alternative (a capital letter is the only clue to it)', () => {
    for (const sentence of WORD_ORDER_SENTENCES) {
      for (const alternative of sentence.alternatives ?? []) expect(alternative[0], sentence.id).toBe(0)
    }
  })

  it('keeps A1 to A1 patterns', () => {
    const a1 = getWordOrderSentences('A1')
    expect(a1.length).toBeGreaterThan(10)
    expect(a1.every((sentence) => getOrderPattern(sentence).level === 'A1')).toBe(true)
    expect(getWordOrderSentences('A2')).toHaveLength(WORD_ORDER_SENTENCES.length)
  })
})

describe('word order questions', () => {
  it('accepts the sentence in its right order whatever the shuffle was', () => {
    for (const sentence of WORD_ORDER_SENTENCES) {
      for (let round = 0; round < 5; round += 1) {
        const exercise = buildWordOrderQuestion(sentence)
        expect(exercise.words.slice().sort(), sentence.id).toEqual(sentence.chunks.map((chunk) => chunk.text).sort())
        expect(exercise.correctOrder.map((index) => exercise.words[index]).join(' '), sentence.id).toBe(sentenceText(sentence))
        expect(isOrderCorrect(exercise, exercise.correctOrder), sentence.id).toBe(true)
      }
    }
  })

  it('accepts each listed alternative, as the sentence it spells', () => {
    const sentence = WORD_ORDER_SENTENCES.find((candidate) => candidate.id === 'zo-bus')!
    const exercise = buildWordOrderQuestion(sentence)
    const spelled = (exercise.acceptedOrders ?? []).map((order) => order.map((index) => exercise.words[index]).join(' '))
    expect(spelled.sort()).toEqual(['Ich fahre mit dem Bus morgen nach Berlin', 'Ich fahre morgen nach Berlin mit dem Bus'])
    for (const order of exercise.acceptedOrders ?? []) expect(isOrderCorrect(exercise, order)).toBe(true)
  })

  it('refuses an order with the verb in the wrong place', () => {
    const sentence = WORD_ORDER_SENTENCES.find((candidate) => candidate.id === 'inv-heute')!
    const exercise = buildWordOrderQuestion(sentence)
    const wrong = ['Heute', 'ich', 'lerne', 'Deutsch'].map((word) => exercise.words.indexOf(word))
    expect(isOrderCorrect(exercise, wrong)).toBe(false)
  })

  it('gives each part its role, in the order of the shuffled words', () => {
    const sentence = WORD_ORDER_SENTENCES.find((candidate) => candidate.id === 'mod-kaffee')!
    const exercise = buildWordOrderQuestion(sentence)
    const roleOf = (word: string) => exercise.roles?.[exercise.words.indexOf(word)]
    expect(roleOf('Ich')).toBe('subject')
    expect(roleOf('möchte')).toBe('verb')
    expect(roleOf('trinken')).toBe('verb-end')
    expect(exercise.roles).toHaveLength(exercise.words.length)
  })

  it('never hands the learner the sentence already in order', () => {
    for (let round = 0; round < 30; round += 1) {
      for (const sentence of WORD_ORDER_SENTENCES) {
        const exercise = buildWordOrderQuestion(sentence)
        expect(exercise.words.join(' '), sentence.id).not.toBe(sentenceText(sentence))
      }
    }
  })
})

describe('word order sessions', () => {
  it('builds a session that covers several patterns, without repeating a sentence', () => {
    for (let round = 0; round < 20; round += 1) {
      const session = buildWordOrderDrill('A2', 10)
      expect(session).toHaveLength(10)
      const texts = session.map((exercise) => (exercise.type === 'ordering' ? exercise.correctOrder.map((index) => exercise.words[index]).join(' ') : ''))
      expect(new Set(texts).size).toBe(texts.length)
      expect(new Set(session.map((exercise) => exercise.explanationAr)).size).toBeGreaterThanOrEqual(5)
    }
  })
})
