import { Brand } from './Brand'
import { LevelFooter } from './LevelFooter'
import { NavList } from './NavList'

export function Sidebar() {
  return (
    <aside className="print:hidden fixed inset-y-0 start-0 hidden w-72 flex-col border-e border-border bg-surface shadow-sm md:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Brand />
      </div>
      <NavList />
      <LevelFooter />
    </aside>
  )
}
