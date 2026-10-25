export interface InsertResult {
  value: string
  /** Where the caret belongs afterwards: right after the inserted text. */
  caret: number
}

/**
 * Puts `insert` into `value` where the caret or selection is, replacing any selected text.
 * Positions outside the text are pulled back inside it, and a reversed selection is read the right way round.
 */
export function insertAtSelection(value: string, selectionStart: number, selectionEnd: number, insert: string): InsertResult {
  const clamp = (position: number) => Math.min(Math.max(position, 0), value.length)
  const start = clamp(Math.min(selectionStart, selectionEnd))
  const end = clamp(Math.max(selectionStart, selectionEnd))

  return { value: value.slice(0, start) + insert + value.slice(end), caret: start + insert.length }
}
