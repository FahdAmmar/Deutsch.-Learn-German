import { perfektForm, praeteritumForm } from '@/lib/verbs'
import type { CEFRLevel, VocabularyItem } from '@/types'

/**
 * Vocabulary as a text file Anki can import: one note per word, with the word and its article in front,
 * and on the back the meaning, the plural or the verb forms, and an example. Pure — it only builds the
 * text; the page offers it as a download.
 *
 * The file starts with the import directives Anki reads from 2.1.54 on (tab-separated, HTML allowed,
 * tags in the third column), so it imports without choosing options by hand. Older versions are not
 * supported: they would take the directive lines for words.
 */

const HEADER = ['#separator:tab', '#html:true', '#tags column:3']

const escapeHtml = (text: string): string => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** A field inside quotes, so that a quote mark or a tab in the text cannot split or break the row. */
function field(text: string): string {
  return `"${text.replace(/[\t\r\n]+/g, ' ').replace(/"/g, '""')}"`
}

/** Anki separates tags by spaces, so a tag with a space in it would be two. */
const tagOf = (text: string): string => text.trim().replace(/\s+/g, '_')

export function ankiFront(item: VocabularyItem): string {
  return item.article ? `${item.article} ${item.word}` : item.word
}

/** The back of a card, as HTML: the Arabic meaning (right to left), the forms, and an example sentence with its translation. */
export function ankiBack(item: VocabularyItem): string {
  const lines = [`<div dir="rtl">${escapeHtml(item.meaningAr)}</div>`]
  if (item.plural) lines.push(`<div lang="de">Plural: die ${escapeHtml(item.plural)}</div>`)
  const perfekt = perfektForm(item)
  const praeteritum = praeteritumForm(item)
  if (perfekt) lines.push(`<div lang="de">Perfekt: ${escapeHtml(perfekt)}</div>`)
  if (praeteritum) lines.push(`<div lang="de">Präteritum: ${escapeHtml(praeteritum)}</div>`)
  if (item.example) {
    lines.push(`<div lang="de"><i>${escapeHtml(item.example.de)}</i></div>`)
    lines.push(`<div dir="rtl">${escapeHtml(item.example.ar)}</div>`)
  }
  return lines.join('')
}

export function ankiTags(item: VocabularyItem): string {
  return ['LEARN_GERMAN', item.level, item.partOfSpeech, item.category].map(tagOf).join(' ')
}

/** The whole file: the directives, then a row per word. */
export function ankiDeckText(items: readonly VocabularyItem[]): string {
  const rows = items.map((item) => [field(ankiFront(item)), field(ankiBack(item)), field(ankiTags(item))].join('\t'))
  return [...HEADER, ...rows].join('\n') + '\n'
}

export function ankiFileName(level: CEFRLevel, date: string): string {
  return `learn-german-${level}-anki-${date}.txt`
}
