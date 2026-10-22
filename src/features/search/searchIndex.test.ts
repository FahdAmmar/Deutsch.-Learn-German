import { describe, expect, it } from 'vitest'

import { buildSearchIndex, normalizeForSearch, searchEntries } from './searchIndex'

describe('normalizeForSearch', () => {
  it('ignores case, umlauts and ß', () => {
    expect(normalizeForSearch('Mädchen')).toBe('madchen')
    expect(normalizeForSearch('STRASSE')).toBe(normalizeForSearch('Straße'))
  })

  it('ignores Arabic vowel marks and alef / ya / ta-marbuta variants', () => {
    expect(normalizeForSearch('الأَسْمَاءُ')).toBe(normalizeForSearch('الاسماء'))
    expect(normalizeForSearch('مدرسة')).toBe(normalizeForSearch('مدرسه'))
  })
})

describe('searchEntries', () => {
  const index = buildSearchIndex()

  it('indexes lessons, grammar rules, words and stories', () => {
    const kinds = new Set(index.map((item) => item.kind))
    expect(kinds).toEqual(new Set(['lesson', 'rule', 'word', 'story']))
  })

  it('finds a word by its German spelling, article included in the title', () => {
    const results = searchEntries(index, 'tisch')
    const word = results.find((item) => item.kind === 'word' && /Tisch$/.test(item.title))
    expect(word).toBeDefined()
    expect(word!.to).toMatch(/^\/vocabulary\?level=a1&q=Tisch/)
  })

  it('finds a grammar rule by its German term and links to its page', () => {
    const results = searchEntries(index, 'Perfekt')
    const rule = results.find((item) => item.kind === 'rule')
    expect(rule).toBeDefined()
    expect(rule!.to).toMatch(/^\/grammar\/a\d\//)
  })

  it('finds a lesson by an Arabic title', () => {
    const lesson = index.find((item) => item.kind === 'lesson')!
    const results = searchEntries(index, lesson.title)
    expect(results.some((item) => item.id === lesson.id)).toBe(true)
  })

  it('requires every word of the query to match', () => {
    expect(searchEntries(index, 'tisch qqqqzzzz')).toEqual([])
  })

  it('returns nothing for an empty query', () => {
    expect(searchEntries(index, '   ')).toEqual([])
  })

  it('does not let one kind fill the list', () => {
    const results = searchEntries(index, 'a', 50)
    const counts = new Map<string, number>()
    for (const item of results) counts.set(item.kind, (counts.get(item.kind) ?? 0) + 1)
    expect(Math.max(...counts.values())).toBeLessThanOrEqual(6)
  })

  it('finds a noun typed together with its article, and ranks the exact title first', () => {
    const [first] = searchEntries(index, 'der tisch')
    expect(first.title).toBe('der Tisch')
  })
})
