import { Brand } from './Brand'
import { StreakChip } from './StreakChip'
import { ThemeToggle } from './ThemeToggle'

/** Phone-only top bar. On larger screens the sidebar carries the brand, streak and theme. */
export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur md:hidden">
      <Brand className="[&>span:first-child]:text-xl [&>span:last-child]:hidden" />
      <div className="flex items-center gap-1">
        <StreakChip />
        <ThemeToggle />
      </div>
    </header>
  )
}
