import type { LucideIcon } from 'lucide-react'
import { BookCheck, Flame, Languages } from 'lucide-react'

import { LevelMark } from '@/features/levels/LevelMark'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel } from '@/types'

interface StatTilesProps {
  level: CEFRLevel
  levelRatio: number
  completedLessons: number
  totalLessons: number
  reviewedWords: number
  totalWords: number
  streakDays: number
}

function Tile({ icon: Icon, label, children, caption }: { icon: LucideIcon; label: string; children: React.ReactNode; caption: string }) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-muted text-accent">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-ink-muted">{label}</span>
      </div>
      <p className="font-heading tnum text-3xl leading-none font-extrabold text-ink">{children}</p>
      <p className="text-sm text-ink-muted">{caption}</p>
    </div>
  )
}

/** Four numbers that say where the learner is: level, lessons, vocabulary and streak — all from their own progress. */
export function StatTiles({ level, levelRatio, completedLessons, totalLessons, reviewedWords, totalWords, streakDays }: StatTilesProps) {
  const unit = streakDays === 1 ? 'يوم' : 'أيام'

  return (
    <section aria-label="ملخّص تقدّمك" dir="rtl" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="space-y-3 rounded-lg border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <LevelMark level={level} size="md" />
          <span className="text-sm font-medium text-ink-muted">المستوى الحالي</span>
        </div>
        <p className="font-heading tnum text-3xl leading-none font-extrabold text-ink">{Math.round(levelRatio * 100)}%</p>
        <p dir="ltr" lang="de" className="text-start text-sm text-ink-muted">
          {CEFR_LEVEL_INFO[level].titleDe}
        </p>
      </div>

      <Tile icon={BookCheck} label="الدروس المنجزة" caption="في هذا المستوى">
        {completedLessons}
        <span className="text-lg font-semibold text-ink-muted"> / {totalLessons}</span>
      </Tile>

      <Tile icon={Languages} label="المفردات المراجَعة" caption="من مفردات المستوى">
        {reviewedWords}
        <span className="text-lg font-semibold text-ink-muted"> / {totalWords}</span>
      </Tile>

      <Tile icon={Flame} label="سلسلة التعلّم" caption={streakDays > 0 ? 'أيام متتالية من التعلّم' : 'أكمل درساً اليوم لتبدأ سلسلتك'}>
        {streakDays}
        <span className="text-lg font-semibold text-ink-muted"> {unit}</span>
      </Tile>
    </section>
  )
}
