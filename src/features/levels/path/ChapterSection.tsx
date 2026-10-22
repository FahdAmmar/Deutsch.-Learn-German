import { ProgressBar } from '@/components/ui'
import type { ChapterProgress, ResolvedChapter } from '@/lib/learningPath'

import { ChapterVisual } from './ChapterVisual'
import { PathLessonRow } from './PathLessonRow'

interface ChapterSectionProps {
  number: number
  entry: ResolvedChapter
  progress: ChapterProgress
  completedLessonIds: ReadonlySet<string>
  resumeLessonId?: string
}

export function ChapterSection({ number, entry, progress, completedLessonIds, resumeLessonId }: ChapterSectionProps) {
  const { chapter, lessons } = entry
  const headingId = `chapter-${chapter.id}-title`

  return (
    <section id={`chapter-${chapter.id}`} aria-labelledby={headingId} className="space-y-4">
      <header className="flex items-start gap-4">
        <span aria-hidden="true" className="tnum font-heading text-5xl leading-none font-bold text-primary">
          {number}
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <h2 id={headingId} className="text-2xl leading-tight font-bold text-ink">
            {chapter.titleAr}
          </h2>
          <p dir="ltr" lang="de" className="display-de text-end text-base font-normal text-ink-muted">
            {chapter.titleDe}
          </p>
          {chapter.goalAr ? <p className="text-ink-muted">{chapter.goalAr}</p> : null}
        </div>
      </header>

      <ChapterVisual chapter={chapter} />

      <div className="space-y-2">
        <ProgressBar
          value={progress.ratio}
          size="sm"
          tone={progress.state === 'done' ? 'success' : 'primary'}
          label={`تقدّم الفصل: ${chapter.titleAr}`}
        />
        <ol className="relative ms-3 space-y-0.5 border-s-2 border-rail">
          {lessons.map((lesson) => (
            <PathLessonRow
              key={lesson.id}
              lesson={lesson}
              completed={completedLessonIds.has(lesson.id)}
              isNext={lesson.id === resumeLessonId}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
