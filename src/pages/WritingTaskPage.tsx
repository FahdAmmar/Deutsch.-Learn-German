import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { EmptyState, PageHeader } from '@/components/ui'
import { getWritingTask } from '@/data/writing'
import { WritingWorkbench } from '@/features/writing/WritingWorkbench'

/** Route: /practice/writing/:taskId. One writing task; an unknown id shows a way back instead of a blank page. */
export default function WritingTaskPage() {
  const { taskId } = useParams()
  const task = getWritingTask(taskId)

  if (!task) {
    return (
      <EmptyState
        title="لم نجد هذه المهمة"
        action={
          <Link to="/practice/writing" className="font-semibold text-primary underline underline-offset-4">
            كل مهام الكتابة
          </Link>
        }
      >
        ربما تغيّر الرابط. اختر مهمة من القائمة.
      </EmptyState>
    )
  }

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title={task.titleAr}
        titleDe={task.titleDe}
        actions={
          <Link to="/practice/writing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-4">
            <ArrowRight size={16} aria-hidden="true" />
            كل مهام الكتابة
          </Link>
        }
      />
      <WritingWorkbench key={task.id} task={task} />
    </div>
  )
}
