import type { GermanArticle } from '@/types'

/** A stretch of a German sentence: plain text, or one of the words der / die / das. */
export type ArticlePart = { type: 'text'; text: string } | { type: 'article'; text: string; article: GermanArticle }

/**
 * The words der, die and das as whole words, in any capitalisation ("Das" opens a sentence).
 * A letter on either side means it is part of a longer word (dass, dieser, derselbe, Medien).
 */
const ARTICLE_WORD = /(?<![\p{L}\p{M}])(der|die|das)(?![\p{L}\p{M}])/giu

/**
 * Cuts a German text at every der / die / das, so each can be coloured by its word form.
 * It colours the word, not its role: "der" in "der Frau" (dative feminine) is still "der".
 * The parts always join back into the original text.
 */
export function splitArticleWords(text: string): ArticlePart[] {
  const parts: ArticlePart[] = []
  let cursor = 0

  for (const match of text.matchAll(ARTICLE_WORD)) {
    const start = match.index ?? 0
    if (start > cursor) parts.push({ type: 'text', text: text.slice(cursor, start) })
    parts.push({ type: 'article', text: match[0], article: match[1].toLowerCase() as GermanArticle })
    cursor = start + match[0].length
  }

  if (cursor < text.length) parts.push({ type: 'text', text: text.slice(cursor) })
  return parts
}
