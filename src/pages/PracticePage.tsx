import { Dumbbell } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button, Card, EmptyState, LevelTabs, PageHeader } from '@/components/ui'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { getLessonsForLevel, getLevelsWithContent } from '@/lib/curriculum'
import type { CEFRLevel, Exercise } from '@/types'
import { useProgressStore } from '@/store/progressStore'
import { shuffle } from '@/utils/shuffle'

const SESSION_SIZE = 10

export default function PracticePage() {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const [level, setLevel] = useState<CEFRLevel>(currentLevel)
  const [session, setSession] = useState<Exercise[] | null>(null)

  const availableExercises = useMemo(
    () => getLessonsForLevel(level).flatMap((lesson) => lesson.exercises),
    [level],
  )

  function startSession() {
    setSession(shuffle(availableExercises).slice(0, SESSION_SIZE))
  }

  return (
    <div className="space-y-8 pb-6">
      <PageHeader title="التمارين" description="تدرّب على أسئلة مختارة عشوائياً من كل دروس المستوى." />

      <LevelTabs
        value={level}
        onChange={(next) => {
          setLevel(next)
          setSession(null)
        }}
        availableLevels={getLevelsWithContent()}
      />

      {session ? (
        <ExerciseRunner exercises={session} />
      ) : availableExercises.length === 0 ? (
        <EmptyState icon={Dumbbell} title="لا توجد تمارين لهذا المستوى بعد">
          اختر مستوى آخر لتبدأ التدرّب.
        </EmptyState>
      ) : (
        <Card tone="brand">
          <div dir="rtl" className="flex flex-col items-start gap-5 p-6 sm:p-8">
            <div className="space-y-2">
              <p className="font-sans text-2xl font-bold text-ink">جلسة تدريب سريعة</p>
              <p className="max-w-[48ch] text-ink-muted">
                {Math.min(SESSION_SIZE, availableExercises.length)} سؤالاً عشوائياً من أصل {availableExercises.length} في مستوى {level}. بعد كل سؤال ترى الإجابة وشرحها.
              </p>
            </div>
            <Button size="lg" onClick={startSession}>
              ابدأ جلسة تمارين
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
