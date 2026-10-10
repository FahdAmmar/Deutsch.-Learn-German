import type { KeyboardEvent } from 'react'

/** Props for the panel that belongs to a tab rendered by `<Tabs idPrefix=… />`. */
export function tabPanelProps(idPrefix: string, value: string) {
  return {
    role: 'tabpanel' as const,
    id: `${idPrefix}-panel-${value}`,
    'aria-labelledby': `${idPrefix}-tab-${value}`,
  }
}

/**
 * Moves selection with the arrow keys the way the ARIA tabs pattern expects. "Next" follows
 * the reading direction, so in RTL the left arrow advances.
 */
export function handleTabKeyDown<T extends string>(
  event: KeyboardEvent<HTMLElement>,
  values: T[],
  current: T,
  onChange: (value: T) => void,
) {
  const isRtl = getComputedStyle(event.currentTarget).direction === 'rtl'
  const forwardKey = isRtl ? 'ArrowLeft' : 'ArrowRight'
  const backwardKey = isRtl ? 'ArrowRight' : 'ArrowLeft'
  const index = values.indexOf(current)

  let nextIndex: number | null = null
  if (event.key === forwardKey) nextIndex = (index + 1) % values.length
  else if (event.key === backwardKey) nextIndex = (index - 1 + values.length) % values.length
  else if (event.key === 'Home') nextIndex = 0
  else if (event.key === 'End') nextIndex = values.length - 1
  if (nextIndex === null) return

  event.preventDefault()
  onChange(values[nextIndex])
  const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
  buttons?.[nextIndex]?.focus()
}

/** Section tabs: underline style, scrolls sideways on narrow screens instead of wrapping. */
