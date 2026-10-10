import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { EmptyState, LevelTabs, PageHeader } from '@/components/ui'
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
    <div className="space-y-8 pb-6">
      <PageHeader title="المفردات" description="تصفّح مفردات كل مستوى، مصنّفة حسب الموضوع. تُعرض الأسماء مع أداة التعريف لأنها تُحفظ معاً." />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <LevelTabs value={level} onChange={setLevel} availableLevels={getLevelsWithContent()} />

        <div dir="rtl" className="relative w-full sm:max-w-xs">
          <Search size={18} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث بالألمانية أو العربية"
            aria-label="ابحث عن كلمة"
            className="h-12 w-full rounded-md border-2 border-border bg-surface ps-11 pe-3 text-base outline-none transition-colors placeholder:text-ink-faint focus-visible:border-accent"
          />
        </div>
      </div>

      {categories.length > 1 ? (
        <div dir="rtl" role="group" aria-label="تصفية حسب الموضوع" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <CategoryChip label="الكل" active={category === 'all'} onClick={() => setCategory('all')} />
          {categories.map((cat) => (
            <CategoryChip key={cat} label={cat} active={category === cat} onClick={() => setCategory(cat)} />
          ))}
        </div>
      ) : null}

      {filteredItems.length === 0 ? (
        <EmptyState title={allItems.length === 0 ? 'لا توجد مفردات لهذا المستوى بعد' : 'لم نجد كلمات مطابقة'}>
          {allItems.length === 0 ? 'اختر مستوى آخر لتصفّح مفرداته.' : 'جرّب كلمة أخرى أو اختر "الكل" من المواضيع.'}
        </EmptyState>
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
      aria-pressed={active}
      onClick={onClick}
      className={
        active
          ? 'shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-semibold whitespace-nowrap text-bg'
          : 'shrink-0 rounded-full bg-surface-sunken px-4 py-2 text-sm font-medium whitespace-nowrap text-ink-muted transition-colors hover:text-ink'
      }
    >
      {label}
    </button>
  )
}
