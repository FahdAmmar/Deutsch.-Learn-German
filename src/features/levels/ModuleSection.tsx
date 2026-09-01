import { ProgressBar } from '@/components/ui'
import { LessonListItem } from '@/features/levels/LessonListItem'
import type { Module } from '@/types'

interface ModuleSectionProps {
  module: Module
  completedLessonIds: Set<string>
}

export function ModuleSection({ module, completedLessonIds }: ModuleSectionProps) {
  const completedCount = module.lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length
  const ratio = module.lessons.length === 0 ? 0 : completedCount / module.lessons.length

  return (
    <section className="space-y-2">
      <div dir="rtl" className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-ink">
            {module.order.toString().padStart(2, '0')} — {module.titleAr}
          </h2>
          <p dir="ltr" lang="de" className="text-sm text-ink-muted">
            {module.title}
          </p>
        </div>
        <span className="text-sm text-ink-faint">
          {completedCount}/{module.lessons.length}
        </span>
      </div>
      <ProgressBar value={ratio} />
      <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
        {module.lessons.map((lesson) => (
          <LessonListItem key={lesson.id} lesson={lesson} completed={completedLessonIds.has(lesson.id)} />
        ))}
      </div>
    </section>
  )
}
