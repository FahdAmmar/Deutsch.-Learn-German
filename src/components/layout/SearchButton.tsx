import { Search } from 'lucide-react'

interface SearchButtonProps {
  onClick: () => void
}

/** Opens the search dialog. Icon-only on phones; on wider screens it shows the shortcut too. */
export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="بحث"
      aria-keyshortcuts="Control+K Meta+K /"
      className="flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm text-ink-muted transition-colors hover:border-border-strong hover:text-ink sm:px-4"
    >
      <Search size={17} aria-hidden="true" />
      <span className="hidden sm:inline">بحث</span>
      <kbd dir="ltr" className="hidden rounded-sm border border-border-strong px-1.5 font-sans text-xs pointer-fine:inline">
        Ctrl K
      </kbd>
    </button>
  )
}
