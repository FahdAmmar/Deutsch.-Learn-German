import { PenLine } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { EmptyState, LevelTabs, PageHeader } from '@/components/ui'
import { getWritingTasksForLevel } from '@/data/writing'
import { WritingTaskList } from '@/features/writing/WritingTaskList'
import { getLevelsWithContent } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import type { CEFRLevel } from '@/types'

/** Route: /practice/writing. Guided writing tasks per level: read the situation, write, check, compare with a model. */
export default function WritingPage() {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const [level, setLevel] = useState<CEFRLevel>(currentLevel)
  const tasks = getWritingTasksForLevel(level)

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="الكتابة الموجّهة"
        titleDe="Schreiben"
        description="موقف حقيقي ونقاط محدّدة تكتب عنها، ثم فحص يتأكد من التحية والخاتمة والنقاط والطول، ثم نموذج جواب تقارن به."
        actions={
          <Link to="/practice" className="text-sm font-semibold text-primary underline underline-offset-4">
            العودة إلى التمارين
          </Link>
        }
      />

      <LevelTabs value={level} onChange={setLevel} availableLevels={getLevelsWithContent()} />

      {tasks.length === 0 ? (
        <EmptyState icon={PenLine} title="لا توجد مهام كتابة لهذا المستوى بعد">
          اختر مستوى آخر لتبدأ.
        </EmptyState>
      ) : (
        <WritingTaskList tasks={tasks} />
      )}
    </div>
  )
}
