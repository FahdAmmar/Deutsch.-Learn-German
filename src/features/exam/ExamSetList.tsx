import { BookOpenText, Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Card } from '@/components/ui'
import { useExamStore } from '@/store/examStore'
import type { ExamSet } from '@/types'

const PART = {
  lesen: { label: 'قراءة', labelDe: 'Lesen', icon: BookOpenText },
  hoeren: { label: 'استماع', labelDe: 'Hören', icon: Headphones },
} as const

function SetCard({ examSet }: { examSet: ExamSet }) {
  const result = useExamStore((state) => state.results[examSet.id])
  const { label, labelDe, icon: Icon } = PART[examSet.part]
  const questions = examSet.tasks.reduce((sum, task) => sum + task.items.length, 0)

  return (
    <li>
      <Card interactive className="h-full">
        <Link to={`/practice/exam/${examSet.id}`} className="flex h-full flex-col gap-3 rounded-lg p-5">
          <div dir="rtl" className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">
              <Icon size={14} aria-hidden="true" className="me-1 inline" />
              {label}
              <span lang="de" dir="ltr" className="ms-1">
                {labelDe}
              </span>
            </Badge>
            {result ? <Badge tone="success">أفضل نتيجة {Math.round(result.best * 100)}%</Badge> : <Badge tone="neutral">لم تُجرَّب</Badge>}
          </div>
          <h3 dir="rtl" className="font-sans text-lg font-bold text-ink">
            {examSet.titleAr}
          </h3>
          <p dir="rtl" className="mt-auto text-sm text-ink-muted">
            {questions} سؤالاً، والوقت المقترح {examSet.suggestedMinutes} دقيقة
            {result ? `، وحاولتَ ${result.attempts} ${result.attempts === 1 ? 'مرة' : 'مرات'}` : ''}
          </p>
        </Link>
      </Card>
    </li>
  )
}

export function ExamSetList({ sets }: { sets: readonly ExamSet[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {sets.map((examSet) => (
        <SetCard key={examSet.id} examSet={examSet} />
      ))}
    </ul>
  )
}
