import { Brain, PartyPopper } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button, Card, EmptyState, PageHeader } from '@/components/ui'
import { buildVocabRecallExercise } from '@/features/review/buildVocabRecallExercise'
import { getDueVocabulary } from '@/features/review/selectors'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { useProgressStore } from '@/store/progressStore'
import type { Exercise } from '@/types'

const SESSION_SIZE = 20

export default function ReviewPage() {
  const progress = useProgressStore()
  const [session, setSession] = useState<Exercise[] | null>(null)

  const dueItems = useMemo(() => getDueVocabulary(progress, SESSION_SIZE), [progress])

  function startSession() {
    setSession(dueItems.map((item) => buildVocabRecallExercise(item)))
  }

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="المراجعة المتباعدة"
        description="كلمات من الدروس التي أكملتها، تُعاد لك في التوقيت الأنسب لترسيخها في الذاكرة طويلة الأمد."
      />

      {session ? (
        <ExerciseRunner exercises={session} />
      ) : dueItems.length === 0 ? (
        <EmptyState icon={PartyPopper} title="لا توجد كلمات للمراجعة الآن">
          أكملتَ مراجعتك اليومية — عد لاحقاً أو أكمل درساً جديداً!
        </EmptyState>
      ) : (
        <Card tone="brand">
          <div dir="rtl" className="flex flex-col items-start gap-5 p-6 sm:p-8">
            <Brain size={30} className="text-accent" aria-hidden="true" />
            <p className="font-sans text-2xl font-bold text-ink">لديك {dueItems.length} كلمة جاهزة للمراجعة الآن.</p>
            <Button size="lg" onClick={startSession}>
              ابدأ المراجعة
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
