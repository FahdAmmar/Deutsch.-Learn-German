import { describe, expect, it } from 'vitest'

import { classifyPlural, pluralDistractors, umlautize } from './plurals'

describe('umlautize', () => {
  it.each([
    ['Hand', 'Händ'],
    ['Haus', 'Häus'],
    ['Bruder', 'Brüder'],
    ['Garten', 'Gärten'],
    ['Flughafen', 'Flughäfen'],
    ['Bahnhof', 'Bahnhöf'],
    ['Rucksack', 'Rucksäck'],
    ['Tisch', 'Tisch'],
  ])('%s → %s', (word, expected) => {
    expect(umlautize(word)).toBe(expected)
  })
})

describe('classifyPlural', () => {
  it.each([
    ['Lehrer', 'Lehrer', '-'],
    ['Bruder', 'Brüder', '¨'],
    ['Tisch', 'Tische', '-e'],
    ['Hand', 'Hände', '¨e'],
    ['Fuß', 'Füße', '¨e'],
    ['Bahnhof', 'Bahnhöfe', '¨e'],
    ['Kind', 'Kinder', '-er'],
    ['Land', 'Länder', '¨er'],
    ['Haus', 'Häuser', '¨er'],
    ['Lampe', 'Lampen', '-(e)n'],
    ['Bett', 'Betten', '-(e)n'],
    ['Freundin', 'Freundinnen', '-nen'],
    ['Sofa', 'Sofas', '-s'],
  ])('%s → %s is %s', (singular, plural, pattern) => {
    expect(classifyPlural(singular, plural)).toBe(pattern)
  })

  it('does not guess for a pair no pattern describes', () => {
    expect(classifyPlural('Museum', 'Museen')).toBeUndefined()
  })
})

describe('pluralDistractors', () => {
  it('never includes the right plural or another valid one, and gives distinct forms', () => {
    for (let round = 0; round < 25; round += 1) {
      const wrong = pluralDistractors('Balkon', 'Balkone', new Set())
      expect(wrong).toHaveLength(3)
      expect(new Set(wrong).size).toBe(3)
      expect(wrong).not.toContain('Balkone')
      expect(wrong).not.toContain('Balkons')
    }
  })

  it('leaves out a form that is a real word', () => {
    for (let round = 0; round < 25; round += 1) {
      expect(pluralDistractors('Cousin', 'Cousins', new Set(['cousine', 'cousinen']))).not.toContain('Cousine')
    }
  })

  it('does not offer a form with a doubled ending', () => {
    for (let round = 0; round < 25; round += 1) {
      const wrong = pluralDistractors('Lampe', 'Lampen', new Set())
      expect(wrong).not.toContain('Lampee')
      expect(wrong).not.toContain('Lampeer')
      expect(wrong.length).toBeGreaterThanOrEqual(2)
    }
  })
})
