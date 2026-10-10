/**
 * Inline markup used inside grammar-rule string fields. It is parsed into
 * plain segments and rendered as React nodes — never injected as HTML —
 * so authored content can't introduce markup or script.
 *
 *   **word**   emphasised / highlighted text
 *   [[Wort]]   a German fragment inside Arabic prose
 *
 * The two forms are flat (no nesting). An unmatched marker is left as
 * literal text rather than swallowing the rest of the string.
 */
export type RichSegment =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'de'; text: string }

const MARKUP_PATTERN = /\*\*(.+?)\*\*|\[\[(.+?)\]\]/g

export function parseRichText(input: string): RichSegment[] {
  const segments: RichSegment[] = []
  let cursor = 0

  for (const match of input.matchAll(MARKUP_PATTERN)) {
    const start = match.index ?? 0
    if (start > cursor) segments.push({ type: 'text', text: input.slice(cursor, start) })

    if (match[1] !== undefined) segments.push({ type: 'bold', text: match[1] })
    else segments.push({ type: 'de', text: match[2] })

    cursor = start + match[0].length
  }

  if (cursor < input.length) segments.push({ type: 'text', text: input.slice(cursor) })
  return segments
}

/** The text with all markup removed — what should be spoken or used as an accessible name. */
export function stripMarkup(input: string): string {
  return parseRichText(input)
    .map((segment) => segment.text)
    .join('')
}

/**
 * Bidirectional-text helper.
 *
 * Inside an Arabic (RTL) paragraph, a quoted German sentence such as
 * `"Ich stehe um sieben Uhr auf."` is laid out by the Unicode bidi algorithm
 * with its closing quote and full stop treated as *neutral* characters, so
 * they jump to the wrong side of the sentence (`.Ich stehe … auf"`). Wrapping
 * the whole quoted span — quotes and punctuation included — in an LTR isolate
 * fixes it without touching the authored content.
 *
 * Only quotes that contain Latin-script text and *no* Arabic are isolated, so
 * Arabic quotations such as «هل» are left alone.
 */
export type QuoteSplitSegment = { type: 'text' | 'quote'; text: string }

/** Opening quote → the closing characters that can end it. */
const QUOTE_CLOSERS: Readonly<Record<string, readonly string[]>> = {
  '"': ['"'],
  '„': ['“', '"'],
  '“': ['”'],
  '«': ['»'],
}

const HAS_LATIN = /\p{Script=Latin}/u
const HAS_ARABIC = /\p{Script=Arabic}/u

function isLatinQuoteContent(inner: string): boolean {
  return inner.length > 0 && inner === inner.trim() && !inner.includes('\n') && HAS_LATIN.test(inner) && !HAS_ARABIC.test(inner)
}

export function splitQuotedLatin(input: string): QuoteSplitSegment[] {
  // A straight `"` is both opener and closer, so pairing is only reliable when
  // the quotes are balanced; with an odd count we leave them as plain text.
  const straightQuotesBalanced = (input.match(/"/g)?.length ?? 0) % 2 === 0

  const segments: QuoteSplitSegment[] = []
  let plainStart = 0
  let index = 0

  while (index < input.length) {
    const opener = input[index]
    const closers = QUOTE_CLOSERS[opener]
    if (!closers || (opener === '"' && !straightQuotesBalanced)) {
      index += 1
      continue
    }

    let end = -1
    for (let probe = index + 1; probe < input.length; probe += 1) {
      if (closers.includes(input[probe])) {
        end = probe
        break
      }
    }
    if (end === -1) {
      index += 1
      continue
    }

    // The pair is consumed as a unit whether or not it is isolated, so an
    // Arabic quotation never lets its closing quote pair with the next opener.
    if (isLatinQuoteContent(input.slice(index + 1, end))) {
      if (index > plainStart) segments.push({ type: 'text', text: input.slice(plainStart, index) })
      segments.push({ type: 'quote', text: input.slice(index, end + 1) })
      plainStart = end + 1
    }
    index = end + 1
  }

  if (plainStart < input.length) segments.push({ type: 'text', text: input.slice(plainStart) })
  return segments
}
