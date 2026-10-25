import { describe, expect, it } from 'vitest'

import { splitArticleWords } from './articleWords'

const articles = (text: string) =>
  splitArticleWords(text).flatMap((part) => (part.type === 'article' ? [`${part.article}:${part.text}`] : []))

describe('splitArticleWords', () => {
  it('finds der, die and das, each with its own article', () => {
    expect(articles('Der Mann liest das Buch und die Zeitung.')).toEqual(['der:Der', 'das:das', 'die:die'])
  })

  it('matches a capitalised article at the start of a sentence and keeps its spelling', () => {
    expect(splitArticleWords('Das Haus ist groß.')[0]).toEqual({ type: 'article', text: 'Das', article: 'das' })
  })

  it('does not cut words that merely contain an article', () => {
    expect(articles('Ich glaube, dass dieser Derselbe die Medien mag, aber Dasein ist anders.')).toEqual(['die:die'])
  })

  it('leaves the other articles alone — den, dem, des, ein', () => {
    expect(articles('Ich gebe dem Kind den Ball des Mannes, ein Ball.')).toEqual([])
  })

  it('finds an article next to punctuation and inside a quote', () => {
    expect(articles('„Die“ Frau, (das) Kind; der.')).toEqual(['die:Die', 'das:das', 'der:der'])
  })

  it('always joins back into the original text', () => {
    const text = 'Wo ist der Bahnhof? Der liegt neben dem Kino, und die Straße ist das Ziel.'
    expect(splitArticleWords(text).map((part) => part.text).join('')).toBe(text)
  })

  it('returns one text part for a sentence without an article and nothing for an empty text', () => {
    expect(splitArticleWords('Ich lerne Deutsch.')).toEqual([{ type: 'text', text: 'Ich lerne Deutsch.' }])
    expect(splitArticleWords('')).toEqual([])
  })
})
