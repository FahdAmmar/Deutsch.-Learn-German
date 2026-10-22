import { useEffect, type RefObject } from 'react'

interface ExerciseShortcutsOptions {
  /** The exercise card; options and the audio button are looked up inside it. */
  rootRef: RefObject<HTMLElement | null>
  /** Whether the question has been answered (Enter then moves on). */
  answered: boolean
  onNext: () => void
}

/** Digit keys (top row or numpad) → option index, read from `event.code` so it works on any keyboard layout, Arabic included. */
const DIGIT_CODE = /^(?:Digit|Numpad)([1-9])$/

/** True when the key press is meant for something else: a text field, a button the learner is operating, a link. */
function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  return ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName)
}

/**
 * Keyboard shortcuts for answering without the mouse:
 *  - 1–9 chooses that option (multiple choice, true/false, listening, recall)
 *  - Space replays the audio in a listening exercise
 *  - Enter continues once the question is answered
 *
 * Shortcuts stay out of the way of typing and of focused buttons, so they never
 * fight the browser's own keyboard behaviour or a screen reader.
 */
export function useExerciseShortcuts({ rootRef, answered, onNext }: ExerciseShortcutsOptions): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return
      const root = rootRef.current
      if (!root) return

      if (event.key === 'Enter') {
        // A focused button handles Enter itself (it is a click); only act when focus is elsewhere.
        if (answered && !isInteractiveTarget(event.target)) {
          event.preventDefault()
          onNext()
        }
        return
      }

      if (isInteractiveTarget(event.target) && event.target instanceof HTMLElement && event.target.tagName !== 'BUTTON') return

      const digit = DIGIT_CODE.exec(event.code)
      if (digit) {
        const options = root.querySelectorAll<HTMLButtonElement>('[data-exercise-option]:not(:disabled)')
        const option = options[Number(digit[1]) - 1]
        if (option) {
          event.preventDefault()
          option.click()
        }
        return
      }

      if (event.code === 'Space' && !isInteractiveTarget(event.target)) {
        const audio = root.querySelector<HTMLButtonElement>('[data-exercise-audio]:not(:disabled)')
        if (audio) {
          event.preventDefault()
          audio.click()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [rootRef, answered, onNext])
}
