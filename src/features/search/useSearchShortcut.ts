import { useEffect } from 'react'

/** Whether the key press is meant for something the learner is typing into. */
function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

/** Calls `onOpen` for Ctrl/⌘+K anywhere, and for "/" when the learner is not typing in a field. */
export function useSearchShortcut(onOpen: () => void): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCombo = (event.ctrlKey || event.metaKey) && event.code === 'KeyK'
      const isSlash = event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !isTyping(event.target)
      if (isCombo || isSlash) {
        event.preventDefault()
        onOpen()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onOpen])
}
