import { describe, expect, it } from 'vitest'

import { MAX_SAVED_TEXTS, MAX_TEXT_CHARS, MAX_TITLE_CHARS } from './limits'
import { cleanText, deriveTitle, sanitizeStoredTexts, validateMyTextInput } from './validate'

const stored = (overrides: Record<string, unknown> = {}) => ({
  id: 'a',
  title: 'Mein Tag',
  text: 'Ich lerne Deutsch.',
  mode: 'phrases',
  maxWords: 6,
  createdAt: 1,
  updatedAt: 2,
  attempts: 0,
  bestAccuracy: 0,
  bestWpm: 0,
  lastPlayedAt: null,
  ...overrides,
})

describe('validateMyTextInput', () => {
  it('accepts a German text and returns it cleaned', () => {
    const result = validateMyTextInput({ title: '  Mein   Tag ', text: '  Ich lerne Deutsch.  ' })
    expect(result).toEqual({ ok: true, value: { title: 'Mein Tag', text: 'Ich lerne Deutsch.' } })
  })

  it('takes a title from the first words when none is given', () => {
    const result = validateMyTextInput({ title: '', text: 'Ich heiße Lina und ich wohne in Berlin. Ich lerne Deutsch.' })
    expect(result).toEqual({
      ok: true,
      value: { title: 'Ich heiße Lina und ich wohne…', text: 'Ich heiße Lina und ich wohne in Berlin. Ich lerne Deutsch.' },
    })
  })

  it('asks for text when it is empty or only spaces', () => {
    expect(validateMyTextInput({ title: '', text: '   \n ' })).toEqual({ ok: false, errors: { text: 'اكتب النص أو الصقه أولًا.' } })
  })

  it('rejects text with no letters', () => {
    const result = validateMyTextInput({ title: '', text: '123 456 !!!' })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.text).toContain('حروف')
  })

  it('rejects text that is not in Latin script, such as Arabic', () => {
    const result = validateMyTextInput({ title: '', text: 'مرحبا بكم في درس اللغة الألمانية' })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.text).toContain('ألمانيًا')
  })

  it('accepts German with a few foreign words mixed in', () => {
    expect(validateMyTextInput({ title: '', text: 'Das Wort „كتاب“ bedeutet Buch.' }).ok).toBe(true)
  })

  it('rejects a text over the limit and a title over the limit', () => {
    const tooLong = validateMyTextInput({ title: 'x'.repeat(MAX_TITLE_CHARS + 1), text: 'a'.repeat(MAX_TEXT_CHARS + 1) })
    expect(tooLong.ok).toBe(false)
    if (!tooLong.ok) {
      expect(tooLong.errors.text).toContain(String(MAX_TEXT_CHARS))
      expect(tooLong.errors.title).toContain(String(MAX_TITLE_CHARS))
    }
  })
})

describe('cleanText', () => {
  it('composes umlauts written as a letter plus a combining mark', () => {
    const decomposed = 'Scho\u0308n u\u0308ber'
    expect(decomposed).not.toBe('Schön über')
    expect(cleanText(decomposed)).toBe('Schön über')
  })

  it('unifies line endings and strips control characters but keeps line breaks', () => {
    expect(cleanText('a\r\nb\u0000c\u0007d\ne')).toBe('a\nbcd\ne')
  })
})

describe('deriveTitle', () => {
  it('shortens long titles and drops trailing punctuation', () => {
    expect(deriveTitle('Hallo Welt!')).toBe('Hallo Welt')
    expect(deriveTitle('eins zwei drei vier fünf sechs sieben')).toBe('eins zwei drei vier fünf sechs…')
    expect(deriveTitle('x'.repeat(200)).length).toBeLessThanOrEqual(MAX_TITLE_CHARS)
  })
})

describe('sanitizeStoredTexts', () => {
  it('keeps valid entries and drops damaged ones without losing the rest', () => {
    const result = sanitizeStoredTexts([
      stored({ id: 'good' }),
      stored({ id: 'bad-mode', mode: 'paragraphs' }),
      stored({ id: 'bad-accuracy', bestAccuracy: 3 }),
      { nonsense: true },
      null,
      stored({ id: 'good-2' }),
    ])
    expect(result.map((entry) => entry.id)).toEqual(['good', 'good-2'])
  })

  it('drops repeated ids and anything that is not a list', () => {
    expect(sanitizeStoredTexts([stored({ id: 'same' }), stored({ id: 'same' })])).toHaveLength(1)
    expect(sanitizeStoredTexts('x')).toEqual([])
    expect(sanitizeStoredTexts(undefined)).toEqual([])
  })

  it('never returns more than the library can hold', () => {
    const many = Array.from({ length: MAX_SAVED_TEXTS + 5 }, (_, index) => stored({ id: `t${index}` }))
    expect(sanitizeStoredTexts(many)).toHaveLength(MAX_SAVED_TEXTS)
  })
})
