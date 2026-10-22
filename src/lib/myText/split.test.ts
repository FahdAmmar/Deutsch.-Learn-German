import { describe, expect, it } from 'vitest'

import { countWords, splitText } from './split'

const LINA =
  'Guten Morgen! Ich heiße Lina und ich wohne in Berlin. Jeden Tag stehe ich um sieben Uhr auf, dann frühstücke ich mit meiner Familie. Danach fahre ich mit dem Bus zur Arbeit, weil ich keinen Führerschein habe.'

const WOCHENENDE =
  'Am Wochenende besuche ich meine Großeltern auf dem Land und wir kochen zusammen das Abendessen. Ich möchte gern ein Zimmer in der Stadt mieten, aber die Wohnungen sind sehr teuer.'

/** Words that cannot end a phrase without the word after them. */
const NEEDS_FOLLOWER = new Set(['der', 'die', 'das', 'dem', 'den', 'ein', 'eine', 'mit', 'in', 'auf', 'an', 'zu', 'zur', 'und', 'oder', 'aber', 'nicht', 'sehr', 'meine', 'keinen'])

describe('splitText — sentences', () => {
  it('cuts after . ! and ?', () => {
    expect(splitText(LINA, 'sentences')).toEqual([
      'Guten Morgen!',
      'Ich heiße Lina und ich wohne in Berlin.',
      'Jeden Tag stehe ich um sieben Uhr auf, dann frühstücke ich mit meiner Familie.',
      'Danach fahre ich mit dem Bus zur Arbeit, weil ich keinen Führerschein habe.',
    ])
  })

  it('does not cut after abbreviations, initials, ordinals or inside numbers', () => {
    const text =
      'Ich mag Obst, z. B. Äpfel und Birnen. Das kostet ca. 5 Euro. Dr. Müller wohnt hier. Wir treffen uns am 3. Oktober um 10.30 Uhr.'
    expect(splitText(text, 'sentences')).toEqual([
      'Ich mag Obst, z. B. Äpfel und Birnen.',
      'Das kostet ca. 5 Euro.',
      'Dr. Müller wohnt hier.',
      'Wir treffen uns am 3. Oktober um 10.30 Uhr.',
    ])
  })

  it('cuts after a name that merely looks like an abbreviation', () => {
    expect(splitText('Ist das Max? Ja, das ist Max. Er ist nett.', 'sentences')).toEqual(['Ist das Max?', 'Ja, das ist Max.', 'Er ist nett.'])
  })

  it('keeps direct speech together and the closing quote with its sentence', () => {
    expect(splitText('Er sagte: „Hallo, wie geht es dir?“ Mir geht es gut.', 'sentences')).toEqual([
      'Er sagte: „Hallo, wie geht es dir?“',
      'Mir geht es gut.',
    ])
  })

  it('treats a single line break as a wrapped line, not the end of a sentence', () => {
    expect(splitText('Ich gehe heute\nin die Schule. Danach\nspiele ich Fußball.', 'sentences')).toEqual([
      'Ich gehe heute in die Schule.',
      'Danach spiele ich Fußball.',
    ])
  })

  it('treats a blank line as the end of a paragraph, even without punctuation', () => {
    expect(splitText('Titel ohne Punkt\n\nDas ist ein Satz.', 'sentences')).toEqual(['Titel ohne Punkt', 'Das ist ein Satz.'])
  })

  it('returns one part for a text without sentence marks, and none for an empty text', () => {
    expect(splitText('guten tag zusammen', 'sentences')).toEqual(['guten tag zusammen'])
    expect(splitText('  \n\n ', 'sentences')).toEqual([])
  })
})

describe('splitText — lines', () => {
  it('uses the learner\'s own line breaks, tidying spaces and dropping blank lines', () => {
    expect(splitText('Zeile eins.\n\n  Zeile   zwei\r\nZeile drei', 'lines')).toEqual(['Zeile eins.', 'Zeile zwei', 'Zeile drei'])
  })
})

describe('splitText — phrases', () => {
  it('breaks at commas and before conjunctions and prepositions rather than mid-phrase', () => {
    const parts = splitText(LINA, 'phrases', 6)
    expect(parts).toEqual([
      'Guten Morgen!',
      'Ich heiße Lina',
      'und ich wohne in Berlin.',
      'Jeden Tag stehe ich',
      'um sieben Uhr auf,',
      'dann frühstücke ich mit meiner Familie.',
      'Danach fahre ich',
      'mit dem Bus zur Arbeit,',
      'weil ich keinen Führerschein habe.',
    ])
  })

  it('leaves a sentence that already fits as one part', () => {
    expect(splitText('Ich lerne Deutsch.', 'phrases', 6)).toEqual(['Ich lerne Deutsch.'])
  })

  it('makes shorter parts when asked for shorter phrases', () => {
    const long = splitText(WOCHENENDE, 'phrases', 8).length
    const short = splitText(WOCHENENDE, 'phrases', 4).length
    expect(short).toBeGreaterThan(long)
  })

  it.each([3, 4, 5, 6, 7, 8, 9, 10])('with at most %i words per phrase: nothing lost, nothing too long, no phrase ending on an article or preposition', (max) => {
    for (const text of [LINA, WOCHENENDE]) {
      const parts = splitText(text, 'phrases', max)
      const sentences = splitText(text, 'sentences')

      // Every word is kept, in order.
      expect(parts.join(' ')).toBe(sentences.join(' '))

      parts.forEach((part, index) => {
        expect(part).not.toBe('')
        expect(countWords(part)).toBeLessThanOrEqual(max)
        const last = part.split(' ').pop() ?? ''
        const endsWithMark = /[.!?,;:]$/u.test(last)
        if (!endsWithMark && index < parts.length - 1) expect(NEEDS_FOLLOWER.has(last.toLowerCase())).toBe(false)
      })
    }
  })

  it('keeps the length limit inside what the editor offers, whatever is asked for', () => {
    const text = 'eins zwei drei vier fünf sechs sieben acht neun zehn elf zwölf'
    expect(splitText(text, 'phrases', 1).every((part) => countWords(part) <= 3)).toBe(true)
    expect(splitText(text, 'phrases', 99).every((part) => countWords(part) <= 10)).toBe(true)
  })
})

describe('countWords', () => {
  it('counts words separated by any whitespace', () => {
    expect(countWords('  Ich  lerne\nDeutsch ')).toBe(3)
    expect(countWords('')).toBe(0)
  })
})
