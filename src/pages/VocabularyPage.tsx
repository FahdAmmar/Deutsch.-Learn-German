import { Brain, ChevronDown, Download, Search, SlidersHorizontal } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { Button, EmptyState, LevelTabs, PageHeader, PrintButton } from '@/components/ui'
import {
  DEFAULT_FILTERS,
  filterVocabulary,
  type ArticleFilter,
  type StatusFilter,
  type VocabularyFilters,
} from '@/features/vocabulary/filters'
import { VocabularyCard } from '@/features/vocabulary/VocabularyCard'
import { ankiDeckText, ankiFileName } from '@/lib/ankiExport'
import { cn } from '@/lib/cn'
import { getLessonById, getLevelsWithContent, getVocabularyForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { downloadTextFile } from '@/utils/download'
import { todayKey } from '@/utils/date'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, VocabularyItem } from '@/types'

const ARTICLE_OPTIONS: { value: ArticleFilter; label: string }[] = [
  { value: 'all', label: 'كل الأدوات' },
  { value: 'der', label: 'der' },
  { value: 'die', label: 'die' },
  { value: 'das', label: 'das' },
  { value: 'none', label: 'بدون أداة' },
]

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'كل الكلمات' },
  { value: 'new', label: 'لم أتعلّمها بعد' },
  { value: 'saved', label: 'محفوظة للمراجعة' },
]

export default function VocabularyPage() {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const lessons = useProgressStore((state) => state.lessons)
  const savedVocabularyIds = useProgressStore((state) => state.savedVocabularyIds)
  const toggleSavedVocabulary = useProgressStore((state) => state.toggleSavedVocabulary)

  // A link from search arrives as /vocabulary?level=a1&q=Tisch: open on that level with the word searched.
  const [searchParams] = useSearchParams()
  const levelFromLink = CEFR_LEVELS.find((candidate) => candidate === searchParams.get('level')?.toUpperCase())
  const [level, setLevel] = useState<CEFRLevel>(levelFromLink ?? currentLevel)
  const [filters, setFilters] = useState<VocabularyFilters>({ ...DEFAULT_FILTERS, query: searchParams.get('q') ?? '' })
  // On a phone the secondary tools (sort, export, print) sit behind one "options" button; from `md` up they are always shown.
  const [toolsOpen, setToolsOpen] = useState(false)

  const allItems = useMemo(() => getVocabularyForLevel(level), [level])
  const categories = useMemo(() => Array.from(new Set(allItems.map((item) => item.category))), [allItems])
  const savedIds = useMemo(() => new Set(savedVocabularyIds ?? []), [savedVocabularyIds])

  // Words from lessons the learner has completed — what "already learned" means for the "new words" filter.
  const learnedIds = useMemo(() => {
    const ids = new Set<string>()
    for (const entry of Object.values(lessons)) {
      if (!entry.completed) continue
      for (const item of getLessonById(entry.lessonId)?.vocabulary ?? []) ids.add(item.id)
    }
    return ids
  }, [lessons])

  const visibleItems = useMemo(() => filterVocabulary(allItems, filters, { learnedIds, savedIds }), [allItems, filters, learnedIds, savedIds])

  const savedCount = savedIds.size

  function update(patch: Partial<VocabularyFilters>) {
    setFilters((previous) => ({ ...previous, ...patch }))
  }

  /** Exactly the words on screen: the level, the topic and the other filters the learner has set. */
  function exportToAnki() {
    downloadTextFile(ankiFileName(level, todayKey()), ankiDeckText(visibleItems), 'text/plain;charset=utf-8')
  }

  // Stable identity, so the memoised cards that did not change are not re-rendered when one word is saved.
  const handleToggleSaved = useCallback((item: VocabularyItem) => toggleSavedVocabulary(item.id), [toggleSavedVocabulary])

  return (
    <div className="space-y-8 pb-6">
      <PageHeader title="المفردات" description="تصفّح مفردات كل مستوى، مصنّفة حسب الموضوع. تُعرض الأسماء مع أداة التعريف لأنها تُحفظ معاً." />

      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <LevelTabs
          value={level}
          onChange={(next) => {
            setLevel(next)
            update({ category: 'all' })
          }}
          availableLevels={getLevelsWithContent()}
        />

        <div dir="rtl" className="relative w-full sm:max-w-xs">
          <Search size={18} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => update({ query: event.target.value })}
            placeholder="ابحث بالألمانية أو العربية"
            aria-label="ابحث عن كلمة"
            className="h-12 w-full rounded-md border-2 border-border bg-surface ps-11 pe-3 text-base outline-none transition-colors placeholder:text-ink-faint focus-visible:border-accent"
          />
        </div>
      </div>

      <div className="space-y-3 print:hidden">
        {categories.length > 1 ? (
          <ChipRow label="تصفية حسب الموضوع">
            <Chip label="كل المواضيع" active={filters.category === 'all'} onClick={() => update({ category: 'all' })} />
            {categories.map((category) => (
              <Chip key={category} label={category} active={filters.category === category} onClick={() => update({ category })} />
            ))}
          </ChipRow>
        ) : null}

        <ChipRow label="تصفية حسب أداة التعريف">
          {ARTICLE_OPTIONS.map((option) => (
            <Chip key={option.value} label={option.label} latin={/^(der|die|das)$/.test(option.label)} active={filters.article === option.value} onClick={() => update({ article: option.value })} />
          ))}
        </ChipRow>

        <ChipRow label="تصفية حسب الحالة">
          {STATUS_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              label={option.value === 'saved' ? `${option.label} (${savedCount})` : option.label}
              active={filters.status === option.value}
              onClick={() => update({ status: option.value })}
            />
          ))}
        </ChipRow>
      </div>

      <div dir="rtl" className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p role="status" className="tnum text-sm text-ink-muted">
            {visibleItems.length} من {allItems.length} كلمة
          </p>
          <Button
            size="sm"
            variant="outline"
            aria-expanded={toolsOpen}
            aria-controls="vocabulary-tools"
            onClick={() => setToolsOpen((open) => !open)}
            icon={<SlidersHorizontal size={16} aria-hidden="true" />}
            className="md:hidden print:hidden"
          >
            خيارات
            <ChevronDown size={16} aria-hidden="true" className={cn('transition-transform duration-200', toolsOpen && 'rotate-180')} />
          </Button>
        </div>

        <div id="vocabulary-tools" className={cn('grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center print:hidden', toolsOpen ? 'grid' : 'hidden md:flex')}>
          <label className="col-span-2 flex items-center justify-between gap-3 text-sm text-ink-muted md:col-span-1 md:justify-start">
            الترتيب
            <select
              value={filters.sort}
              onChange={(event) => update({ sort: event.target.value === 'alphabetical' ? 'alphabetical' : 'lesson' })}
              className="h-11 min-w-0 flex-1 rounded-md border-2 border-border bg-surface px-2 text-sm text-ink outline-none focus-visible:border-accent md:h-10 md:flex-none"
            >
              <option value="lesson">حسب ترتيب الدروس</option>
              <option value="alphabetical">أبجدياً (A → Z)</option>
            </select>
          </label>

          <Button size="sm" variant="outline" onClick={exportToAnki} disabled={visibleItems.length === 0} icon={<Download size={16} aria-hidden="true" />}>
            تصدير إلى Anki
          </Button>
          <PrintButton label="طباعة القائمة" />

          {savedCount > 0 ? (
            <Link to="/review" className="col-span-2 md:col-span-1">
              <Button size="sm" variant="outline" icon={<Brain size={16} aria-hidden="true" />} className="w-full md:w-auto">
                راجع الكلمات المحفوظة
              </Button>
            </Link>
          ) : null}
        </div>
      </div>

      {visibleItems.length === 0 ? (
        <EmptyState title={allItems.length === 0 ? 'لا توجد مفردات لهذا المستوى بعد' : 'لم نجد كلمات مطابقة'}>
          {allItems.length === 0 ? 'اختر مستوى آخر لتصفّح مفرداته.' : 'جرّب كلمة أخرى أو خفّف التصفية.'}
        </EmptyState>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-2">
          {visibleItems.map((item) => (
            <VocabularyCard key={item.id} item={item} saved={savedIds.has(item.id)} onToggleSaved={handleToggleSaved} />
          ))}
        </div>
      )}
    </div>
  )
}

function ChipRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      role="group"
      aria-label={label}
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  )
}

function Chip({ label, active, onClick, latin = false }: { label: string; active: boolean; onClick: () => void; latin?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors pointer-coarse:py-3',
        active ? 'bg-ink font-semibold text-bg' : 'bg-surface-sunken font-medium text-ink-muted hover:text-ink',
      )}
    >
      {latin ? <span lang="de">{label}</span> : label}
    </button>
  )
}
