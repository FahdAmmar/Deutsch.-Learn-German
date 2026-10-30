import { Check } from 'lucide-react'

import { cn } from '@/lib/cn'
import type { ChapterProgress, ResolvedChapter } from '@/lib/learningPath'

interface ChapterIndexProps {
  chapters: readonly ResolvedChapter[]
  progress: readonly ChapterProgress[]
}

/**
 * Table of contents for the level: a sticky column on wide screens, a scrolling strip on narrow ones.
 * The strip is `relative` on purpose: the `sr-only` text inside each chip is absolutely positioned, and without a
 * positioned scroll container it escapes the strip and widens the whole page (a sideways-scrolling level page).
 */
export function ChapterIndex({ chapters, progress }: ChapterIndexProps) {
  return (
    <nav aria-label="فصول المستوى" className="lg:sticky lg:top-24 lg:self-start">
      <ol className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {chapters.map(({ chapter }, index) => {
          const state = progress[index]
          const isCurrent = state.state === 'current'
          return (
            <li key={chapter.id} className="shrink-0 lg:shrink">
              <a
                href={`#chapter-${chapter.id}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-2.5 rounded-md border px-3 py-2 transition-colors lg:border-transparent',
                  isCurrent ? 'border-primary bg-primary-muted text-ink' : 'border-border bg-surface text-ink-muted hover:text-ink lg:bg-transparent lg:hover:bg-surface-sunken',
                )}
              >
                <span aria-hidden="true" className="tnum font-heading w-5 text-center text-lg leading-none font-bold">
                  {state.state === 'done' ? <Check size={16} strokeWidth={3} className="mx-auto text-success" /> : index + 1}
                </span>
                <span className={cn('whitespace-nowrap lg:whitespace-normal', isCurrent && 'font-semibold')}>{chapter.titleAr}</span>
                <span className="tnum ms-auto text-xs">
                  <span className="sr-only">أُنجز </span>
                  {state.completed}/{state.total}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
