import { ArrowLeft, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button, Card, CardBody } from '@/components/ui'
import { getModuleById } from '@/lib/curriculum'
import type { Lesson } from '@/types'

interface ContinueLearningCardProps {
  lesson: Lesson | undefined
}

export function ContinueLearningCard({ lesson }: ContinueLearningCardProps) {
  if (!lesson) {
    return (
      <Card>
        <CardBody dir="rtl" className="text-center text-sm text-ink-muted">
          لا توجد دروس متاحة بعد في هذا المستوى.
        </CardBody>
      </Card>
    )
  }

  const module = getModuleById(lesson.moduleId)

  return (
    <Card className="overflow-hidden border-primary/30 bg-primary-muted">
      <CardBody className="flex flex-wrap items-center justify-between gap-4">
        <div dir="rtl" className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <PlayCircle size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-primary">{module ? module.titleAr : lesson.level}</p>
            <p className="font-semibold text-ink">{lesson.titleAr}</p>
            <p dir="ltr" lang="de" className="text-sm text-ink-muted">
              {lesson.title}
            </p>
          </div>
        </div>
        <Link to={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}>
          <Button icon={<ArrowLeft size={16} aria-hidden="true" />} iconPosition="end">
            متابعة التعلّم
          </Button>
        </Link>
      </CardBody>
    </Card>
  )
}
