import { Brand } from './Brand'
import { LevelChip } from './LevelChip'
import { PlanButton } from './PlanButton'
import { SearchButton } from './SearchButton'
import { StreakChip } from './StreakChip'
import { ThemeToggle } from './ThemeToggle'

/**
 * Top bar. On phones it carries the brand tile, the learner's level and streak, and two 44px icon buttons (study
 * plan, search); the theme switch lives in the "More" sheet there. From `md` up the sidebar carries the brand and
 * this bar holds the level and streak, with the theme switch at the far end.
 *
 * Safe-area insets are physical (a notch is on the left or right whatever the text direction), so they use `pl`/`pr`.
 *
 * Every item is `shrink-0` and the row is sized so the sum of its parts stays inside 320px: a bar wider than the
 * screen makes mobile browsers zoom the whole page out and pushes the bottom navigation off the edge.
 */
interface HeaderProps {
  onOpenSearch?: () => void
  onOpenPlan?: () => void
}

export function Header({ onOpenSearch, onOpenPlan }: HeaderProps) {
  return (
    <header className="print:hidden sticky top-0 z-20 border-b border-border bg-surface-glass pt-(--safe-t) backdrop-blur">
      <div className="flex h-14 items-center gap-2 pl-[max(1rem,var(--safe-l))] pr-[max(1rem,var(--safe-r))] md:h-16 md:gap-3 md:px-10">
        <Brand variant="header" className="me-1 gap-2.5 md:hidden" />
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-2.5">
          <LevelChip />
          <StreakChip />
        </div>
        {onOpenPlan ? <PlanButton onClick={onOpenPlan} /> : null}
        {onOpenSearch ? <SearchButton onClick={onOpenSearch} /> : null}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
