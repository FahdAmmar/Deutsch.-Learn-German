import { cn } from '@/lib/cn'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  id?: string
}

/**
 * Bidi-safe toggle: the thumb is positioned with logical `start-*`/`end-*`
 * utilities rather than a `translateX` transform, so it lands on the
 * correct physical side automatically in both LTR and RTL without any
 * direction-specific overrides.
 */
export function Switch({ checked, onChange, label, id }: SwitchProps) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
        checked ? 'bg-primary' : 'border border-border-strong bg-surface-muted',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow-sm transition-all',
          checked ? 'end-0.5' : 'start-0.5',
        )}
      />
    </button>
  )
}
