import { Mic } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { EmptyState, LevelTabs, PageHeader } from '@/components/ui'
import { getSpeakingTask, getSpeakingTasksForLevel } from '@/data/speaking'
import { SpeakingTaskList } from '@/features/speaking/SpeakingTaskList'
import { SpeakingWorkbench } from '@/features/speaking/SpeakingWorkbench'
import { getLevelsWithContent } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import type { CEFRLevel } from '@/types'

/**
 * Routes: /practice/speaking and /practice/speaking/:taskId. Speaking practice in the forms such tasks usually
 * take: talk from cues, ask from a card, make a request. The learner speaks or types, the page checks that the
 * points were covered, and a model answer can be heard and compared.
 */
export default function SpeakingPage() {
  const { taskId } = useParams()
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const [level, setLevel] = useState<CEFRLevel>(currentLevel)
  const back = (
    <Link to="/practice/speaking" className="text-sm font-semibold text-primary underline underline-offset-4">
      كل مهام المحادثة
    </Link>
  )

  if (taskId) {
    const task = getSpeakingTask(taskId)
    if (!task) {
      return (
        <EmptyState icon={Mic} title="لم نجد هذه المهمة" action={back}>
          ربما تغيّر الرابط. اختر مهمة من القائمة.
        </EmptyState>
      )
    }
    return (
      <div className="space-y-8 pb-6">
        <PageHeader title={task.titleAr} titleDe={task.titleDe} actions={back} />
        <SpeakingWorkbench key={task.id} task={task} />
      </div>
    )
  }

  const tasks = getSpeakingTasksForLevel(level)
  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="تدريب المحادثة"
        titleDe="Sprechen"
        description="تحدّث بصوتك أو اكتب ما كنت ستقوله، ثم تحقّق من أنك غطّيت النقاط المطلوبة وقارن بنموذج تسمعه. المهام من تأليفنا وليست منقولة من امتحان حقيقي."
        actions={
          <Link to="/practice" className="text-sm font-semibold text-primary underline underline-offset-4">
            العودة إلى التمارين
          </Link>
        }
      />
      <LevelTabs value={level} onChange={setLevel} availableLevels={getLevelsWithContent()} />
      {tasks.length === 0 ? (
        <EmptyState icon={Mic} title="لا توجد مهام لهذا المستوى بعد">
          اختر مستوى آخر لتبدأ.
        </EmptyState>
      ) : (
        <SpeakingTaskList tasks={tasks} />
      )}
    </div>
  )
}
