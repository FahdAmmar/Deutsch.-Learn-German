import { Brand } from './Brand'
import { LevelChip } from './LevelChip'
import { PlanButton } from './PlanButton'
import { SearchButton } from './SearchButton'
import { StreakChip } from './StreakChip'
import { ThemeToggle } from './ThemeToggle'

/**
 * Top bar. On phones it carries the wordmark; from `md` up the sidebar carries the brand and this
 * bar holds the learner's level and streak, with the theme switch at the far end.
 */
interface HeaderProps {
  onOpenSearch?: () => void
  onOpenPlan?: () => void
}

export function Header({ onOpenSearch, onOpenPlan }: HeaderProps) {
  return (
    <header className="print:hidden sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-surface-glass px-4 backdrop-blur md:px-10">
      <Brand className="md:hidden [&>div>span:last-child]:hidden" />
      <div className="flex flex-1 items-center gap-2.5">
        <LevelChip />
        <StreakChip />
      </div>
      {onOpenPlan ? <PlanButton onClick={onOpenPlan} /> : null}
      {onOpenSearch ? <SearchButton onClick={onOpenSearch} /> : null}
      <ThemeToggle />
    </header>
  )
}
