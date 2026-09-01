import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { LevelTabs } from '@/components/ui'
import { VocabularyCard } from '@/features/vocabulary/VocabularyCard'
import { getLevelsWithContent, getVocabularyForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import type { CEFRLevel } from '@/types'

export default function VocabularyPage() {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const [level, setLevel] = useState<CEFRLevel>(currentLevel)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')

  const allItems = useMemo(() => getVocabularyForLevel(level), [level])

  const categories = useMemo(() => Array.from(new Set(allItems.map((item) => item.category))), [allItems])

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return allItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category
      const matchesQuery =
        !normalizedQuery ||
        item.word.toLowerCase().includes(normalizedQuery) ||
        item.meaningAr.includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [allItems, category, query])

  return (
    <div className="space-y-6 pb-10">
      <header dir="rtl">
        <h1 className="text-2xl font-bold text-ink">المفردات</h1>
        <p className="mt-1 text-ink-muted">تصفّح مفردات كل مستوى، مصنّفة حسب الموضوع.</p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <LevelTabs value={level} onChange={setLevel} availableLevels={getLevelsWithContent()} />

        <div dir="rtl" className="relative w-full max-w-xs">
          <Search size={16} className="absolute end-3 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث عن كلمة..."
            aria-label="ابحث عن كلمة"
            className="w-full rounded-md border border-border-strong bg-surface py-2 pe-9 ps-3 text-sm outline-none focus-visible:border-primary"
          />
        </div>
      </div>

      {categories.length > 1 ? (
        <div dir="rtl" className="flex flex-wrap gap-2">
          <CategoryChip label="الكل" active={category === 'all'} onClick={() => setCategory('all')} />
          {categories.map((cat) => (
            <CategoryChip key={cat} label={cat} active={category === cat} onClick={() => setCategory(cat)} />
          ))}
        </div>
      ) : null}

      {filteredItems.length === 0 ? (
        <p dir="rtl" className="rounded-lg border border-dashed border-border p-8 text-center text-ink-muted">
          {allItems.length === 0 ? 'لا توجد مفردات لهذا المستوى بعد.' : 'لم يتم العثور على نتائج مطابقة.'}
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <VocabularyCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground'
          : 'rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-ink-muted hover:text-ink'
      }
    >
      {label}
    </button>
  )
}
