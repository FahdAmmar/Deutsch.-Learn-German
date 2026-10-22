import { cn } from '@/lib/cn'

interface ChoiceGroupProps<T extends string | number> {
  label: string
  value: T
  options: readonly { value: T; label: string; hint?: string }[]
  onChange: (value: T) => void
  className?: string
}

/** A single-choice segmented control (radio semantics) for a small fixed set of values. */
export function ChoiceGroup<T extends string | number>({ label, value, options, onChange, className }: ChoiceGroupProps<T>) {
  return (
    <div
      dir="rtl"
      role="radiogroup"
      aria-label={label}
      className={cn('grid max-w-lg gap-2', className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-md border-2 px-2 py-2 text-sm font-semibold transition-colors',
            value === option.value
              ? 'border-accent bg-accent-muted text-ink'
              : 'border-border text-ink-muted hover:border-border-strong hover:text-ink',
          )}
        >
          <span className="tnum">{option.label}</span>
          {option.hint ? <span className="text-xs font-normal text-ink-faint">{option.hint}</span> : null}
        </button>
      ))}
    </div>
  )
}
