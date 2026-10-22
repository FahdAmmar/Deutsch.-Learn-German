import { ArrowLeft, Check, Lock, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button, ProgressBar } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { ChapterProgress, ResolvedChapter } from '@/lib/learningPath'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel } from '@/types'
import { CHAPTER_FORMS, formatCountAr, LESSON_FORMS } from '@/utils/arabicCount'

import { LevelMark } from './LevelMark'
import { LEVEL_STYLE } from './levelTone'

interface LevelPanelProps {
  level: CEFRLevel
  totalLessons: number
  completedLessons: number
  isCurrent: boolean
  /** Chapters are listed inside the current level only, so the learner sees where in it they are. */
  chapters: readonly ResolvedChapter[]
  chapterProgress: readonly ChapterProgress[]
}

function ChapterTile({ level, entry, progress, index }: { level: CEFRLevel; entry: ResolvedChapter; progress: ChapterProgress; index: number }) {
  const isCurrent = progress.state === 'current'
  return (
    <li>
      <Link
        to={`/levels/${level.toLowerCase()}#chapter-${entry.chapter.id}`}
        className={cn(
          'flex h-full items-center gap-3 rounded-md border p-3.5 transition-colors',
          isCurrent
            ? 'border-primary-container bg-primary-container text-on-primary-container'
            : 'border-border bg-bg hover:border-border-strong hover:bg-surface-sunken',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'font-heading flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold',
            progress.state === 'done' ? 'bg-success text-success-foreground' : isCurrent ? 'bg-on-primary-container text-primary-container' : 'bg-surface-sunken text-ink-muted',
          )}
        >
          {progress.state === 'done' ? <Check size={16} strokeWidth={3} /> : isCurrent ? <Play size={14} className="fill-current" /> : index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{entry.chapter.titleAr}</span>
          <span dir="ltr" lang="de" className={cn('block text-start text-xs', isCurrent ? 'text-on-primary-container' : 'text-ink-muted')}>
            {entry.chapter.titleDe}
          </span>
        </span>
        <span className={cn('tnum text-xs font-semibold', isCurrent ? 'text-on-primary-container' : 'text-ink-muted')}>
          {progress.completed}/{progress.total}
        </span>
      </Link>
    </li>
  )
}

/** One CEFR level as a card. The current level opens up to show its chapters; the others stay compact. */
export function LevelPanel({ level, totalLessons, completedLessons, isCurrent, chapters, chapterProgress }: LevelPanelProps) {
  const info = CEFR_LEVEL_INFO[level]
  const hasContent = totalLessons > 0
  const ratio = hasContent ? completedLessons / totalLessons : 0
  const finished = hasContent && completedLessons === totalLessons
  const actionLabel = finished ? 'مراجعة المستوى' : completedLessons > 0 ? 'متابعة المستوى' : 'ابدأ المستوى'

  return (
    <article
      dir="rtl"
      aria-labelledby={`level-${level}-title`}
      className={cn(
        'space-y-5 rounded-lg border bg-surface p-5 shadow-sm sm:p-6',
        isCurrent ? 'border-t-4 border-border border-t-primary-container' : 'border-border',
        !hasContent && 'bg-bg-alt shadow-none',
      )}
    >
      <header className="flex items-start gap-4">
        <LevelMark level={level} size="lg" muted={!hasContent} />
        <div className="min-w-0 flex-1 space-y-1.5">
          <h2 id={`level-${level}-title`} dir="ltr" lang="de" className="display-de text-start text-xl text-ink sm:text-2xl">
            {info.titleDe}
          </h2>
          <p className="font-semibold text-ink-muted">{info.titleAr}</p>
          <div className="flex flex-wrap items-center gap-2">
            {isCurrent ? <Badge tone="accent">قيد التعلّم حالياً</Badge> : null}
            {finished ? <Badge tone="success">مكتمل</Badge> : null}
            {!hasContent ? <Badge>قريباً</Badge> : null}
          </div>
        </div>
      </header>

      <p className="max-w-[62ch] text-ink-muted">{info.descriptionAr}</p>

      {hasContent ? (
        <>
          <div className="space-y-2">
            <ProgressBar value={ratio} tone={finished ? 'success' : LEVEL_STYLE[level].tone} label={`التقدّم في المستوى ${level}`} />
            <p className="tnum flex items-center justify-between text-sm text-ink-muted">
              <span>
                {formatCountAr(totalLessons, LESSON_FORMS)} في {formatCountAr(chapters.length, CHAPTER_FORMS)}
              </span>
              <span className="font-semibold text-ink">{Math.round(ratio * 100)}%</span>
            </p>
          </div>

          {isCurrent && chapters.length > 0 ? (
            <div className="space-y-3 border-t border-border pt-5">
              <h3 className="text-base font-bold text-ink">فصول المستوى</h3>
              <ol className="grid gap-3 sm:grid-cols-2">
                {chapters.map((entry, index) => (
                  <ChapterTile key={entry.chapter.id} level={level} entry={entry} progress={chapterProgress[index]} index={index} />
                ))}
              </ol>
            </div>
          ) : null}

          <Link to={`/levels/${level.toLowerCase()}`} className="block sm:inline-block">
            <Button variant={isCurrent ? 'primary' : 'outline'} className="w-full sm:w-auto" icon={<ArrowLeft size={17} aria-hidden="true" />} iconPosition="end">
              {actionLabel}
            </Button>
          </Link>
        </>
      ) : (
        <p className="flex items-center gap-2 text-sm text-ink-muted">
          <Lock size={15} aria-hidden="true" />
          المحتوى قيد الإعداد
        </p>
      )}
    </article>
  )
}
