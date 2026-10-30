import { Brain, Flame, PartyPopper } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Card, EmptyState, PageHeader } from '@/components/ui'
import { buildVocabRecallExercise } from '@/features/review/buildVocabRecallExercise'
import { selectHardWords } from '@/features/review/hardWords'
import { getDueVocabulary } from '@/features/review/selectors'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { getAllVocabulary } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useSpellingStore } from '@/store/spellingStore'
import type { Exercise } from '@/types'

const SESSION_SIZE = 20

export default function ReviewPage() {
  const progress = useProgressStore()
  const [session, setSession] = useState<Exercise[] | null>(null)

  const dueItems = useMemo(() => getDueVocabulary(progress, SESSION_SIZE), [progress])
  const spellingWords = useSpellingStore((state) => state.words)
  const hardCount = useMemo(
    () => selectHardWords({ vocabularyProgress: progress.vocabulary, spellingWords, vocabulary: getAllVocabulary() }).length,
    [progress.vocabulary, spellingWords],
  )

  function startSession() {
    setSession(dueItems.map((item) => buildVocabRecallExercise(item)))
  }

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="المراجعة المتباعدة"
        description="كلمات من الدروس التي أكملتها، تُعاد لك في التوقيت الأنسب لترسيخها في الذاكرة طويلة الأمد."
      />

      {!session && hardCount > 0 ? (
        <Link
          to="/review/hard-words"
          className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-5 py-4 transition-colors hover:bg-surface-sunken"
        >
          <span dir="rtl" className="flex items-center gap-3">
            <Flame size={22} className="text-accent" aria-hidden="true" />
            <span className="font-semibold text-ink">
              كلماتي الصعبة <span className="tnum text-ink-muted">({hardCount})</span>
            </span>
          </span>
          <span dir="rtl" className="text-sm text-ink-muted">
            الكلمات التي تخطئ فيها مراراً
          </span>
        </Link>
      ) : null}

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
