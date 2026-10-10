import { Brand } from './Brand'
import { NavList } from './NavList'
import { StreakChip } from './StreakChip'
import { ThemeToggle } from './ThemeToggle'

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 start-0 hidden w-64 flex-col border-e border-border bg-surface md:flex">
      <div className="flex h-20 items-center border-b border-border px-6">
        <Brand />
      </div>

      <NavList />

      <div className="flex items-center justify-between gap-2 border-t border-border p-4">
        <StreakChip />
        <ThemeToggle />
      </div>
    </aside>
  )
}
