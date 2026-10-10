import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { handleTabKeyDown } from './tabsHelpers'

interface TabOption<T extends string> {
  value: T
  label: string
  icon?: ReactNode
}

interface TabsProps<T extends string> {
  tabs: TabOption<T>[]
  value: T
  onChange: (value: T) => void
  label: string
  /** When set, tabs get ids and `aria-controls` so panels can point back at them via `tabPanelProps`. */
  idPrefix?: string
}

/** Section tabs: underline style, scrolls sideways on narrow screens instead of wrapping. */
export function Tabs<T extends string>({ tabs, value, onChange, label, idPrefix }: TabsProps<T>) {
  const values = tabs.map((tab) => tab.value)

  return (
    <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div role="tablist" aria-label={label} className="flex min-w-max gap-1 border-b border-border">
        {tabs.map((tab) => {
          const isActive = tab.value === value
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              id={idPrefix ? `${idPrefix}-tab-${tab.value}` : undefined}
              aria-controls={idPrefix ? `${idPrefix}-panel-${tab.value}` : undefined}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.value)}
              onKeyDown={(event) => handleTabKeyDown(event, values, value, onChange)}
              className={cn(
                '-mb-px flex items-center gap-2 border-b-2 px-3.5 py-3 text-[0.95rem] font-semibold whitespace-nowrap transition-colors sm:px-4',
                isActive
                  ? 'border-accent text-ink'
                  : 'border-transparent text-ink-muted hover:border-border-strong hover:text-ink',
              )}
            >
              {tab.icon ? <span className="hidden sm:inline-flex">{tab.icon}</span> : null}
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
