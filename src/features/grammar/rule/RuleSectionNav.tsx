import { cn } from '@/lib/cn'

import { useReadProgress } from './useReadProgress'
import { useScrollSpy } from './useScrollSpy'

export interface RuleNavItem {
  id: string
  labelAr: string
}

interface RuleSectionNavProps {
  items: RuleNavItem[]
}

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (!element) return
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}

/** Sticky in-page navigation with scroll-spy and a thin reading-progress bar. */
export function RuleSectionNav({ items }: RuleSectionNavProps) {
  const activeId = useScrollSpy(items.map((item) => item.id))
  const progress = useReadProgress()
  const percent = Math.round(progress * 100)

  return (
    <nav
      aria-label="أقسام الدرس"
      className="sticky top-16 z-10 overflow-hidden rounded-lg border border-border bg-surface/90 shadow-sm backdrop-blur"
    >
      <ul className="flex gap-1 overflow-x-auto p-1.5 [scrollbar-width:none]">
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors',
                  isActive ? 'bg-primary text-primary-foreground' : 'text-ink-muted hover:bg-surface-muted hover:text-ink',
                )}
              >
                {item.labelAr}
              </button>
            </li>
          )
        })}
      </ul>
      <div
        role="progressbar"
        aria-label="نسبة التقدّم في قراءة الدرس"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-0.5 w-full bg-surface-muted"
      >
        <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${percent}%` }} />
      </div>
    </nav>
  )
}
