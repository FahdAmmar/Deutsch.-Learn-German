import { ListTree } from 'lucide-react'

interface PlanButtonProps {
  onClick: () => void
}

/** Opens the study plan: the one list of everything to study from A1 to A2. */
export function PlanButton({ onClick }: PlanButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className="flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm text-ink-muted transition-colors hover:border-border-strong hover:text-ink sm:px-4"
    >
      <ListTree size={17} aria-hidden="true" />
      <span className="hidden sm:inline">خطة الدراسة</span>
      <span className="sr-only sm:hidden">خطة الدراسة</span>
    </button>
  )
}
