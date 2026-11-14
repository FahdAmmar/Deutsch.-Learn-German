import { ListTree } from 'lucide-react'

interface PlanButtonProps {
  onClick: () => void
}

/** Opens the study plan: the one list of everything to study from A1 to A2. Icon-only (44px) on phones. */
export function PlanButton({ onClick }: PlanButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className="flex size-11 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-surface text-sm text-ink-muted transition-colors hover:border-border-strong hover:text-ink active:bg-surface-sunken sm:w-auto sm:px-4"
    >
      <ListTree size={19} aria-hidden="true" />
      <span className="hidden sm:inline">خطة الدراسة</span>
      <span className="sr-only sm:hidden">خطة الدراسة</span>
    </button>
  )
}
