import { BookOpen, GraduationCap, Languages, Newspaper, Search, X, type LucideIcon } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCurriculumLevels } from '@/hooks/useCurriculumLevels'
import { LEVELS_WITH_CONTENT } from '@/data/curriculum'
import { cn } from '@/lib/cn'

import { buildSearchIndex, searchEntries, type SearchKind } from './searchIndex'

const KIND_META: Record<SearchKind, { label: string; icon: LucideIcon }> = {
  lesson: { label: 'درس', icon: GraduationCap },
  rule: { label: 'قاعدة', icon: BookOpen },
  word: { label: 'كلمة', icon: Languages },
  story: { label: 'نص', icon: Newspaper },
}

const FOCUSABLE = 'a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])'

interface SearchDialogProps {
  onClose: () => void
}

/**
 * Search across lessons, grammar rules, vocabulary and texts (opened with
 * Ctrl/⌘+K or "/"). A combobox: type, move with ↑ ↓, open with Enter. It is
 * rendered only while open and loaded on first use, so it adds nothing to the
 * initial bundle.
 */
export default function SearchDialog({ onClose }: SearchDialogProps) {
  const navigate = useNavigate()
  const { status } = useCurriculumLevels(LEVELS_WITH_CONTENT)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  const index = useMemo(() => (status === 'ready' ? buildSearchIndex() : []), [status])
  const results = useMemo(() => searchEntries(index, query), [index, query])
  const activeId = results[activeIndex] ? `${listId}-${activeIndex}` : undefined

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      opener?.focus?.()
    }
  }, [])

  function open(target: string) {
    onClose()
    navigate(target)
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (results.length === 0 ? 0 : (current + 1) % results.length))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (results.length === 0 ? 0 : (current - 1 + results.length) % results.length))
    } else if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault()
      open(results[activeIndex].to)
    } else if (event.key === 'Tab' && panelRef.current) {
      // Keep keyboard focus inside the dialog while it is open.
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  const hasQuery = query.trim().length > 0

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="بحث">
      <button type="button" aria-label="إغلاق البحث" tabIndex={-1} onClick={onClose} className="absolute inset-0 animate-[pop-in_150ms_ease-out_both] bg-ink/45" />

      <div
        ref={panelRef}
        dir="rtl"
        onKeyDown={handleKeyDown}
        className="relative flex max-h-[75vh] w-full max-w-xl animate-[pop-in_180ms_ease-out_both] flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-lg"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={18} className="shrink-0 text-ink-faint" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label="ابحث في الدروس والقواعد والكلمات والنصوص"
            placeholder="ابحث بالألمانية أو العربية…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
          />
          <button type="button" onClick={onClose} aria-label="إغلاق" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto p-2">
          {status === 'loading' ? (
            <p role="status" className="p-4 text-center text-ink-muted">
              جارٍ تحميل المحتوى…
            </p>
          ) : status === 'error' ? (
            <p role="alert" className="p-4 text-center text-error">
              تعذّر تحميل المحتوى. تحقّق من اتصالك ثم أعد فتح البحث.
            </p>
          ) : !hasQuery ? (
            <p className="p-4 text-center text-sm text-ink-muted">اكتب كلمة للبحث. يمكنك الكتابة بالألمانية أو العربية، مع أداة التعريف أو بدونها.</p>
          ) : results.length === 0 ? (
            <p role="status" className="p-4 text-center text-ink-muted">
              لا نتائج لـ «{query.trim()}».
            </p>
          ) : (
            <ul id={listId} role="listbox" aria-label="نتائج البحث" className="space-y-0.5">
              {results.map((result, position) => {
                const { label, icon: Icon } = KIND_META[result.kind]
                const active = position === activeIndex
                return (
                  <li
                    key={result.id}
                    id={`${listId}-${position}`}
                    role="option"
                    aria-selected={active}
                    onMouseMove={() => setActiveIndex(position)}
                    onClick={() => open(result.to)}
                    className={cn('flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5', active ? 'bg-accent-muted' : 'hover:bg-surface-sunken')}
                  >
                    <Icon size={18} className="shrink-0 text-accent" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span
                        lang={result.titleLanguage}
                        dir={result.titleLanguage === 'de' ? 'ltr' : 'rtl'}
                        className={cn('block truncate font-semibold text-ink', result.titleLanguage === 'de' && 'text-start')}
                      >
                        {result.title}
                      </span>
                      {result.subtitle ? <span className="block truncate text-sm text-ink-muted">{result.subtitle}</span> : null}
                    </span>
                    <span className="shrink-0 rounded-full bg-surface-sunken px-2.5 py-0.5 text-xs font-semibold text-ink-muted">{label}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
