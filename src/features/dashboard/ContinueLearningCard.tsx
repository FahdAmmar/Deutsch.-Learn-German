import { ArrowLeft, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button, Card, ProgressBar } from '@/components/ui'
import { LevelMark } from '@/features/levels/LevelMark'
import { getModuleById } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import type { Lesson } from '@/types'

interface ContinueLearningCardProps {
  lesson: Lesson | undefined
}

/** The one emphasised block on the dashboard: the next lesson, large, with a single action. */
export function ContinueLearningCard({ lesson }: ContinueLearningCardProps) {
  const lessons = useProgressStore((state) => state.lessons)

  if (!lesson) {
    return (
      <Card tone="tint">
        <p dir="rtl" className="p-6 text-center text-ink-muted">
          لا توجد دروس متاحة بعد في هذا المستوى.
        </p>
      </Card>
    )
  }

  const module = getModuleById(lesson.moduleId)
  const moduleLessons = module?.lessons ?? []
  const positionInModule = moduleLessons.findIndex((entry) => entry.id === lesson.id) + 1
  const completedInModule = moduleLessons.filter((entry) => lessons[entry.id]?.completed).length
  const started = Boolean(lessons[lesson.id]) && !lessons[lesson.id]?.completed

  return (
    <Card className="overflow-hidden shadow-sm">
      <div dir="rtl" className="space-y-5 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <LevelMark level={lesson.level} size="sm" />
          <span className="font-semibold text-ink">{module?.titleAr}</span>
          {positionInModule > 0 ? (
            <span className="tnum text-ink-muted">
              الدرس {positionInModule} من {moduleLessons.length}
            </span>
          ) : null}
        </div>

        <div className="space-y-2">
          <h2
            lang="de"
            dir="ltr"
            className="display-de text-end text-4xl font-semibold text-ink [overflow-wrap:anywhere] sm:text-5xl"
          >
            {lesson.title}
          </h2>
          <p className="text-xl font-medium text-ink-muted">{lesson.titleAr}</p>
        </div>

        {lesson.vocabulary.length > 0 ? (
          <ul aria-label="كلمات من هذا الدرس" className="flex flex-wrap gap-2">
            {lesson.vocabulary.slice(0, 4).map((item) => (
              <li key={item.id} dir="ltr" lang="de" className="flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-1.5">
                {item.article ? <Badge tone={item.article}>{item.article}</Badge> : null}
                <span className="font-medium text-ink">{item.word}</span>
                <span dir="rtl" lang="ar" className="text-sm text-ink-muted">
                  ({item.meaningAr})
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link to={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}>
            <Button size="lg" icon={<ArrowLeft size={18} aria-hidden="true" />} iconPosition="end">
              {started ? 'متابعة الدرس' : 'ابدأ الدرس'}
            </Button>
          </Link>
          <span className="flex items-center gap-1.5 text-sm text-ink-muted">
            <Clock size={15} aria-hidden="true" />
            <span className="tnum">{lesson.estimatedMinutes}</span> دقيقة تقريباً
          </span>
        </div>
      </div>

      {moduleLessons.length > 1 ? (
        <div dir="rtl" className="flex items-center gap-4 border-t border-border bg-bg px-5 py-3 sm:px-8">
          <ProgressBar
            value={completedInModule / moduleLessons.length}
            size="sm"
            tone="accent"
            label="التقدّم في الوحدة الحالية"
          />
          <span className="tnum shrink-0 text-xs font-medium text-ink-muted">
            {completedInModule}/{moduleLessons.length}
          </span>
        </div>
      ) : null}
    </Card>
  )
}
