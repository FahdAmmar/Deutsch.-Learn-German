/**
 * Sent to a `<details>` that was just opened for printing. A panel that renders its content only once it is
 * opened (to keep the page light) listens for it and renders at once: the browser's own `toggle` event comes
 * too late, after the page has been laid out for the print.
 */
export const PRINT_EXPAND_EVENT = 'print-expand'

/**
 * Makes the page fit for paper, and returns a function that puts it back.
 *
 * Two things differ on paper. The dark theme's light text would print on white, so the page is switched
 * to the light theme for the print; and a closed `<details>` prints as its title only, so every one
 * inside the main content is opened and then closed again — only the ones that were closed.
 */
export function preparePrint(doc: Document = document): () => void {
  const root = doc.documentElement
  const wasDark = root.classList.contains('dark')
  const closed = Array.from(doc.querySelectorAll<HTMLDetailsElement>('main details:not([open])'))

  if (wasDark) root.classList.remove('dark')
  for (const details of closed) {
    details.open = true
    details.dispatchEvent(new CustomEvent(PRINT_EXPAND_EVENT))
  }

  return () => {
    if (wasDark) root.classList.add('dark')
    for (const details of closed) details.open = false
  }
}
