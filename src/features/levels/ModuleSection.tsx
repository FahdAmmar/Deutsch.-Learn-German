import { ChevronDown } from 'lucide-react'

import { Card, ProgressBar } from '@/components/ui'
import type { ModuleStepState } from '@/features/dashboard/selectors'
import { LessonListItem } from '@/features/levels/LessonListItem'
import { cn } from '@/lib/cn'
import type { Module } from '@/types'

interface ModuleSectionProps {
  module: Module
  completedLessonIds: Set<string>
  state: ModuleStepState
  /** The lesson to resume with, highlighted inside its module. */
  nextLessonId?: string
}

/**
 * One module as a disclosure: collapsed shows title, German name and progress; open shows its
 * lessons. The learner's current module starts open so they land where they left off.
 */
export function ModuleSection({ module, completedLessonIds, state, nextLessonId }: ModuleSectionProps) {
  const completedCount = module.lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length
  const ratio = module.lessons.length === 0 ? 0 : completedCount / module.lessons.length

  return (
    <Card tone={state === 'current' ? 'brand' : 'surface'} className="overflow-hidden">
      <details open={state === 'current'} className="group">
        <summary
          dir="rtl"
          className={cn(
            'flex cursor-pointer list-none items-center gap-4 p-4 sm:px-5 [&::-webkit-details-marker]:hidden',
            'transition-colors hover:bg-surface-sunken/40',
          )}
        >
          <div className="min-w-0 flex-1 space-y-2">
            <div>
              <h2 className="font-sans text-[1.05rem] font-bold text-ink">{module.titleAr}</h2>
              <p dir="ltr" lang="de" className="display-de text-end text-sm font-normal text-ink-muted">
                {module.title}
              </p>
            </div>
            <ProgressBar value={ratio} size="sm" tone={state === 'done' ? 'success' : 'accent'} label={`تقدّم الوحدة: ${module.titleAr}`} />
          </div>
          <span className="tnum shrink-0 text-sm font-medium text-ink-muted">
            {completedCount}/{module.lessons.length}
          </span>
          <ChevronDown
            size={20}
            aria-hidden="true"
            className="shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-180"
          />
        </summary>

        <div className="divide-y divide-border border-t border-border bg-surface">
          {module.lessons.map((lesson) => (
            <LessonListItem
              key={lesson.id}
              lesson={lesson}
              completed={completedLessonIds.has(lesson.id)}
              isNext={lesson.id === nextLessonId}
            />
          ))}
        </div>
      </details>
    </Card>
  )
}
