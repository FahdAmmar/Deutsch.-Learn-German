import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

import { PRINT_EXPAND_EVENT } from '@/lib/printPrep'

interface ReferenceDetailsProps {
  title: string
  description: string
  children: ReactNode
}

/**
 * The closed-until-wanted panel the references on the practice page share: a native `<details>`, so it works
 * from the keyboard and without script. Its content is rendered only once it has been opened — these panels
 * hold a hundred words and sentences between them, and nobody has asked to see them yet — and stays rendered
 * after it is closed. When the page is printed the panel is opened for the print and rendered at once.
 */
export function ReferenceDetails({ title, description, children }: ReferenceDetailsProps) {
  const ref = useRef<HTMLDetailsElement>(null)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const render = () => flushSync(() => setOpened(true))
    element.addEventListener(PRINT_EXPAND_EVENT, render)
    return () => element.removeEventListener(PRINT_EXPAND_EVENT, render)
  }, [])

  return (
    <details ref={ref} onToggle={(event) => event.currentTarget.open && setOpened(true)} className="group rounded-lg border border-border bg-surface">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 hover:bg-surface-sunken [&::-webkit-details-marker]:hidden">
        <span dir="rtl" className="space-y-0.5">
          <span className="block font-sans text-base font-bold text-ink">{title}</span>
          <span className="block text-sm text-ink-muted">{description}</span>
        </span>
        <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-ink-faint motion-safe:transition-transform group-open:rotate-180" />
      </summary>
      {opened ? <div className="space-y-4 border-t border-border p-4">{children}</div> : null}
    </details>
  )
}
