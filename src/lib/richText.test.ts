import { describe, expect, it } from 'vitest'

import { parseRichText, splitQuotedLatin, stripMarkup } from './richText'

describe('parseRichText', () => {
  it('returns a single text segment when there is no markup', () => {
    expect(parseRichText('مرحباً')).toEqual([{ type: 'text', text: 'مرحباً' }])
  })

  it('parses bold and German fragments in order, keeping surrounding text', () => {
    expect(parseRichText('قبل **مهم** وسط [[Wort]] بعد')).toEqual([
      { type: 'text', text: 'قبل ' },
      { type: 'bold', text: 'مهم' },
      { type: 'text', text: ' وسط ' },
      { type: 'de', text: 'Wort' },
      { type: 'text', text: ' بعد' },
    ])
  })

  it('leaves an unmatched marker as literal text instead of swallowing the string', () => {
    expect(stripMarkup('نص **غير مغلق و [[Wort')).toBe('نص **غير مغلق و [[Wort')
  })

  it('never produces HTML — angle brackets stay plain text', () => {
    const segments = parseRichText('<img src=x onerror=alert(1)> **b**')
    expect(segments[0]).toEqual({ type: 'text', text: '<img src=x onerror=alert(1)> ' })
  })
})

describe('stripMarkup', () => {
  it('removes markers so text can be spoken or used as an accessible name', () => {
    expect(stripMarkup('Er **kommt** aus [[Berlin]].')).toBe('Er kommt aus Berlin.')
  })
})

describe('splitQuotedLatin', () => {
  it('isolates a quoted German sentence including its closing punctuation', () => {
    expect(splitQuotedLatin('مثال: "Ich stehe um sieben Uhr auf."، حيث')).toEqual([
      { type: 'text', text: 'مثال: ' },
      { type: 'quote', text: '"Ich stehe um sieben Uhr auf."' },
      { type: 'text', text: '، حيث' },
    ])
  })

  it('handles a quote glued to an Arabic conjunction and several quotes in a row', () => {
    const parts = splitQuotedLatin('في صيغتَي "du" و"er/sie/es" فقط')
    expect(parts.filter((part) => part.type === 'quote').map((part) => part.text)).toEqual(['"du"', '"er/sie/es"'])
  })

  it('supports German low-9 and guillemet quote styles', () => {
    expect(splitQuotedLatin('كلمة „schön“ و «Straße» معاً').filter((part) => part.type === 'quote').map((part) => part.text)).toEqual([
      '„schön“',
      '«Straße»',
    ])
  })

  it('leaves Arabic quotations alone and does not let them pair with the next quote', () => {
    const parts = splitQuotedLatin('لا حاجة لكلمة «هل» أو "مرحبا" ثم "Hallo"')
    expect(parts.filter((part) => part.type === 'quote').map((part) => part.text)).toEqual(['"Hallo"'])
  })

  it('does not guess when straight quotes are unbalanced', () => {
    expect(splitQuotedLatin('شاشة 5" و "Hallo')).toEqual([{ type: 'text', text: 'شاشة 5" و "Hallo' }])
  })

  it('returns plain text unchanged and never alters the characters', () => {
    expect(splitQuotedLatin('نص عربي بسيط')).toEqual([{ type: 'text', text: 'نص عربي بسيط' }])
    const input = 'أ "Guten Tag, wie geht es Ihnen?". ب „Tschüss“ ج'
    expect(splitQuotedLatin(input).map((part) => part.text).join('')).toBe(input)
  })
})
