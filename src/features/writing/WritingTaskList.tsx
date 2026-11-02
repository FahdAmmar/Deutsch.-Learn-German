import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Card, type BadgeTone } from '@/components/ui'
import { selectWritingStatus, useWritingStore, type WritingStatus } from '@/store/writingStore'
import type { WritingTask } from '@/types'

const STATUS: Record<WritingStatus, { label: string; tone: BadgeTone }> = {
  new: { label: 'لم تبدأ', tone: 'neutral' },
  draft: { label: 'مسوّدة', tone: 'accent' },
  done: { label: 'منجَزة', tone: 'success' },
}

function TaskCard({ task }: { task: WritingTask }) {
  const status = useWritingStore(selectWritingStatus(task.id))
  const { label, tone } = STATUS[status]

  return (
    <li>
      <Card interactive className="h-full">
        <Link
          to={`/practice/writing/${task.id}`}
          className="flex h-full flex-col gap-3 rounded-lg p-5 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <div dir="rtl" className="flex flex-wrap items-center gap-2">
            <Badge tone={status === 'done' ? 'success' : tone}>{label}</Badge>
            <Badge tone={task.register === 'formal' ? 'plum' : 'accent'}>{task.register === 'formal' ? 'رسمي' : 'ودّي'}</Badge>
          </div>
          <div className="space-y-1">
            <h3 dir="rtl" className="font-sans text-lg font-bold text-ink">
              {task.titleAr}
            </h3>
            <p lang="de" dir="ltr" className="display-de text-start text-ink-faint">
              {task.titleDe}
            </p>
          </div>
          <p dir="rtl" className="mt-auto flex items-center justify-between gap-2 text-sm text-ink-muted">
            <span>{task.points.length} نقاط، و{task.minWords} كلمة على الأقل</span>
            <ArrowLeft size={16} aria-hidden="true" />
          </p>
        </Link>
      </Card>
    </li>
  )
}

/** The writing tasks of one level, each with where the learner stands on it. */
export function WritingTaskList({ tasks }: { tasks: readonly WritingTask[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ul>
  )
}
