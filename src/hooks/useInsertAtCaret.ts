import { useCallback, useLayoutEffect, useRef } from 'react'

import { insertAtSelection } from '@/lib/textInsert'

/**
 * Lets buttons type into a controlled text field: `insert('ä')` puts the character at the caret
 * (replacing a selection), keeps focus in the field and leaves the caret right after it.
 * Attach `ref` to the input or textarea, and keep its value and setter in the owner as usual.
 */
export function useInsertAtCaret<T extends HTMLInputElement | HTMLTextAreaElement>(value: string, setValue: (next: string) => void) {
  const ref = useRef<T>(null)
  const pendingCaret = useRef<number | null>(null)

  const insert = useCallback(
    (text: string) => {
      const field = ref.current
      const result = insertAtSelection(value, field?.selectionStart ?? value.length, field?.selectionEnd ?? value.length, text)
      pendingCaret.current = result.caret
      setValue(result.value)
      field?.focus()
    },
    [value, setValue],
  )

  // React writes the new value first; only then can the caret be placed after the inserted character.
  useLayoutEffect(() => {
    const caret = pendingCaret.current
    const field = ref.current
    if (caret === null || !field) return
    pendingCaret.current = null
    field.setSelectionRange(caret, caret)
  }, [value])

  return { ref, insert }
}
