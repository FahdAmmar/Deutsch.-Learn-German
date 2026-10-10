import { describe, expect, it } from 'vitest'

import { splitSentences } from './sentences'

describe('splitSentences', () => {
  it('splits on full stops, question marks and exclamation marks', () => {
    expect(splitSentences('Ich heiße Sara. Wie heißt du? Das ist toll!')).toEqual(['Ich heiße Sara.', 'Wie heißt du?', 'Das ist toll!'])
  })

  it('returns one sentence when there is no boundary, and nothing for blank input', () => {
    expect(splitSentences('Guten Morgen')).toEqual(['Guten Morgen'])
    expect(splitSentences('   ')).toEqual([])
  })

  it('does not split after common abbreviations', () => {
    expect(splitSentences('Ich mag Obst, z. B. Äpfel. Dr. Meier kommt um 8 Uhr.')).toEqual([
      'Ich mag Obst, z. B. Äpfel.',
      'Dr. Meier kommt um 8 Uhr.',
    ])
  })

  it('does not split after the day number of a written date', () => {
    expect(splitSentences('Die Party ist am 3. Mai. Kommst du auch?')).toEqual(['Die Party ist am 3. Mai.', 'Kommst du auch?'])
  })

  it('keeps a closing quote with its sentence and a lowercase continuation together', () => {
    expect(splitSentences('Er sagt: „Komm bitte!“ Dann geht er.')).toEqual(['Er sagt: „Komm bitte!“', 'Dann geht er.'])
    expect(splitSentences('„Komm!“ sagte er laut. Alle kamen.')).toEqual(['„Komm!“ sagte er laut.', 'Alle kamen.'])
  })

  it('collapses runs of whitespace and never changes the words', () => {
    const input = 'Am Morgen   stehe ich auf.\nDann frühstücke ich.'
    const sentences = splitSentences(input)
    expect(sentences.join(' ')).toBe('Am Morgen stehe ich auf. Dann frühstücke ich.')
  })
})
