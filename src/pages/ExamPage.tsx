import { PenLine } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Card, EmptyState, LevelTabs, PageHeader } from '@/components/ui'
import { getExamSet, getExamSetsForLevel } from '@/data/exam'
import { ExamSession } from '@/features/exam/ExamSession'
import { ExamSetList } from '@/features/exam/ExamSetList'
import { getLevelsWithContent } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import type { CEFRLevel } from '@/types'

/**
 * Routes: /practice/exam and /practice/exam/:setId. Exam-style practice for reading and listening: texts written for
 * this app in the style of such tasks, marked automatically, with an explanation for every question.
 */
export default function ExamPage() {
  const { setId } = useParams()
  const navigate = useNavigate()
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const [level, setLevel] = useState<CEFRLevel>(currentLevel)

  if (setId) {
    const examSet = getExamSet(setId)
    if (!examSet) {
      return (
        <EmptyState
          title="لم نجد هذه المجموعة"
          action={
            <Link to="/practice/exam" className="font-semibold text-primary underline underline-offset-4">
              كل مجموعات الامتحان
            </Link>
          }
        >
          ربما تغيّر الرابط. اختر مجموعة من القائمة.
        </EmptyState>
      )
    }
    return (
      <div className="space-y-8 pb-6">
        <PageHeader title={examSet.titleAr} />
        <ExamSession key={examSet.id} examSet={examSet} onExit={() => navigate('/practice/exam')} />
      </div>
    )
  }

  const sets = getExamSetsForLevel(level)
  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="تدريب بنمط الامتحان"
        titleDe="Prüfungstraining"
        description="نصوص وتسجيلات في أسلوب مهام الامتحانات، كتبناها لهذا الموقع وليست منقولة من امتحان حقيقي. تُصحَّح تلقائياً ويُشرح كل سؤال."
        actions={
          <Link to="/practice" className="text-sm font-semibold text-primary underline underline-offset-4">
            العودة إلى التمارين
          </Link>
        }
      />

      <LevelTabs value={level} onChange={setLevel} availableLevels={getLevelsWithContent()} />

      {sets.length === 0 ? (
        <EmptyState title="لا توجد مجموعات لهذا المستوى بعد">اختر مستوى آخر لتبدأ.</EmptyState>
      ) : (
        <ExamSetList sets={sets} />
      )}

      <Card tone="tint">
        <Link to="/practice/writing" className="flex items-start gap-3 rounded-lg p-5">
          <PenLine size={22} className="mt-1 shrink-0 text-ink-faint" aria-hidden="true" />
          <span dir="rtl" className="space-y-1">
            <span className="block font-sans text-lg font-bold text-ink">الكتابة (Schreiben)</span>
            <span className="block text-ink-muted">
              لا يمكن تصحيح الكتابة تلقائياً بدقة، فلها قسمها: مهام بنقاط محدّدة وفحص للتحية والخاتمة وقائمة النقاط، ثم نموذج جواب تقارن
              به.
            </span>
          </span>
        </Link>
      </Card>
    </div>
  )
}
