import { useMemo } from 'react'

import { cn } from '@/lib/cn'
import type { DictationCell, DictationState } from '@/lib/dictation/engine'

interface TypingLineProps {
  engine: DictationState
  /** True dictation: letters still ahead are shown as blanks instead of the German text. */
  hideText: boolean
  /** With the text hidden, still show the first letter of every word (the "first letters" stage). */
  initialsOnly?: boolean
  /** Reveal the expected letter (after repeated mistakes), even in hidden mode. */
  showHint: boolean
  /** The sentence is complete — every letter is shown in its finished colour. */
  done: boolean
}

interface Word {
  start: number
  cells: readonly DictationCell[]
}

/** Splits cells into words at spaces so a line wraps between words, never inside one. */
function toWords(cells: readonly DictationCell[]): Word[] {
  const words: Word[] = []
  let current: DictationCell[] = []
  let start = 0
  cells.forEach((cell, index) => {
    if (cell.char === ' ') {
      if (current.length) words.push({ start, cells: current })
      current = []
      start = index + 1
      return
    }
    if (current.length === 0) start = index
    current.push(cell)
  })
  if (current.length) words.push({ start, cells: current })
  return words
}

/**
 * The sentence being typed, one slot per character: finished letters in the
 * success colour, the cursor on the next one, and the rest as muted text (or
 * blanks in hidden mode). Finished letters show the *correct* spelling even
 * when the learner typed "ae" for "ä", so the umlaut is seen as well as typed.
 */
export function TypingLine({ engine, hideText, initialsOnly = false, showHint, done }: TypingLineProps) {
  const words = useMemo(() => toWords(engine.cells), [engine.cells])
  const hasError = engine.lastError !== null && engine.lastError.position === engine.position

  return (
    <p dir="ltr" lang="de" className="display-de flex flex-wrap items-baseline gap-x-[0.9ch] gap-y-2 text-start text-[1.65rem] leading-[1.5] sm:text-[2.1rem]">
      {words.map((word) => (
        <span key={word.start} className="inline-flex whitespace-nowrap">
          {word.cells.map((cell, offset) => {
            const index = word.start + offset
            // The first letter of the word, not a quotation mark that may come before it.
            const showInitial = initialsOnly && offset === word.cells.findIndex((each) => each.typeable)
            return (
              <Slot
                key={index}
                cell={cell}
                state={done || index < engine.position ? 'done' : index === engine.position ? 'current' : 'todo'}
                hideText={hideText}
                showInitial={showInitial}
                showHint={showHint}
                hasError={hasError}
                errors={engine.errors}
                pending={index === engine.position ? engine.pending : ''}
              />
            )
          })}
        </span>
      ))}
    </p>
  )
}

interface SlotProps {
  cell: DictationCell
  state: 'done' | 'current' | 'todo'
  hideText: boolean
  /** This letter stays visible although the text is hidden. */
  showInitial: boolean
  showHint: boolean
  hasError: boolean
  /** Wrong presses so far in this part; a new one restarts the shake. */
  errors: number
  pending: string
}

function Slot({ cell, state, hideText, showInitial, showHint, hasError, errors, pending }: SlotProps) {
  // Punctuation is filled in automatically: show it once reached, and as plain text ahead of the cursor.
  if (!cell.typeable) {
    return <span className={state === 'done' ? 'text-success' : 'text-ink-muted'}>{cell.char}</span>
  }

  // The letter that was just typed right lands with a short drop; earlier ones are already at rest.
  if (state === 'done') return <span className="text-success motion-safe:animate-[key-land_140ms_ease-out]">{cell.char}</span>

  if (state === 'current') {
    const reveal = !hideText || showHint || showInitial
    return (
      <span
        // A new key per mistake remounts the slot, so every wrong press shakes it again.
        key={hasError ? errors : 'ready'}
        className={cn(
          'rounded-sm border-b-[3px] px-px',
          hasError ? 'border-error bg-error-muted text-error motion-safe:animate-[key-shake_260ms_ease-in-out]' : 'border-accent bg-accent-muted text-ink',
          // A steady caret; the pulse is switched off for people who asked for less motion.
          !hasError && 'motion-safe:animate-pulse',
        )}
      >
        {pending ? <span className="text-accent">{pending}</span> : reveal ? cell.char : '\u2007'}
      </span>
    )
  }

  return <span className="text-ink-muted">{hideText && !showInitial ? '_' : cell.char}</span>
}
