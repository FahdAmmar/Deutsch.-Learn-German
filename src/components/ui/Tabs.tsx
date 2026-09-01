import { cn } from '@/lib/cn'

interface TabOption<T extends string> {
  value: T
  label: string
  icon?: React.ReactNode
}

interface TabsProps<T extends string> {
  tabs: TabOption<T>[]
  value: T
  onChange: (value: T) => void
  label: string
}

export function Tabs<T extends string>({ tabs, value, onChange, label }: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-md border border-border bg-surface-muted p-1">
      {tabs.map((tab) => {
        const isActive = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              'flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-sm font-semibold transition-colors',
              isActive ? 'bg-surface text-primary shadow-sm' : 'text-ink-muted hover:text-ink',
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
