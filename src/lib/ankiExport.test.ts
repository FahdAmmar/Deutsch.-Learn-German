import { describe, expect, it } from 'vitest'

import { getVocabularyForLevel } from '@/lib/curriculum'
import type { VocabularyItem } from '@/types'

import { ankiBack, ankiDeckText, ankiFileName, ankiFront, ankiTags } from './ankiExport'

const tisch: VocabularyItem = {
  id: 'a1-tisch',
  word: 'Tisch',
  article: 'der',
  plural: 'Tische',
  partOfSpeech: 'noun',
  meaningAr: 'الطاولة',
  level: 'A1',
  category: 'في البيت',
  example: { de: 'Der Tisch ist groß.', ar: 'الطاولة كبيرة.' },
}

const lernen: VocabularyItem = {
  id: 'a1-lernen',
  word: 'lernen',
  partOfSpeech: 'verb',
  meaningAr: 'يتعلّم',
  level: 'A1',
  category: 'أفعال',
  verb: { auxiliary: 'haben', partizip: 'gelernt', praeteritum: 'lernte' },
}

describe('anki export', () => {
  it('puts the article with the noun on the front, and nothing before a verb', () => {
    expect(ankiFront(tisch)).toBe('der Tisch')
    expect(ankiFront(lernen)).toBe('lernen')
  })

  it('writes the meaning, the plural and the example on the back, the Arabic marked right to left', () => {
    const back = ankiBack(tisch)
    expect(back).toContain('<div dir="rtl">الطاولة</div>')
    expect(back).toContain('Plural: die Tische')
    expect(back).toContain('<i>Der Tisch ist groß.</i>')
    expect(back).toContain('<div dir="rtl">الطاولة كبيرة.</div>')
  })

  it('writes the forms of a verb on the back', () => {
    const back = ankiBack(lernen)
    expect(back).toContain('Perfekt: hat gelernt')
    expect(back).toContain('Präteritum: lernte')
    expect(back).not.toContain('Plural')
  })

  it('escapes characters that mean something in HTML', () => {
    expect(ankiBack({ ...tisch, meaningAr: 'a < b & c', example: undefined })).toContain('a &lt; b &amp; c')
  })

  it('makes tags of the level, kind and topic, with no space inside a tag', () => {
    expect(ankiTags(tisch)).toBe('LEARN_GERMAN A1 noun في_البيت')
  })

  it('starts with the import directives, then has one row of three fields per word', () => {
    const lines = ankiDeckText([tisch, lernen]).trimEnd().split('\n')
    expect(lines.slice(0, 3)).toEqual(['#separator:tab', '#html:true', '#tags column:3'])
    expect(lines).toHaveLength(5)
    for (const row of lines.slice(3)) expect(row.split('\t')).toHaveLength(3)
    expect(lines[3].split('\t')[0]).toBe('"der Tisch"')
  })

  it('keeps a quote, a tab or a line break inside a word from breaking the row', () => {
    const awkward = { ...tisch, word: 'Ti"sch', meaningAr: 'سطر\nثاني\tوتبويب' }
    const row = ankiDeckText([awkward]).trimEnd().split('\n')[3]
    expect(row.split('\t')).toHaveLength(3)
    expect(row.split('\t')[0]).toBe('"der Ti""sch"')
    expect(row).not.toMatch(/\n/)
  })

  it('exports a whole level without breaking a row', () => {
    const items = getVocabularyForLevel('A1')
    expect(items.length).toBeGreaterThan(100)
    const rows = ankiDeckText(items).trimEnd().split('\n').slice(3)
    expect(rows).toHaveLength(items.length)
    for (const row of rows) expect(row.split('\t'), row).toHaveLength(3)
  })

  it('names the file by level and day', () => {
    expect(ankiFileName('A2', '2026-11-01')).toBe('learn-german-A2-anki-2026-11-01.txt')
  })
})
