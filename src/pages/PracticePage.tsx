import { Dumbbell } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button, Card, CardBody, LevelTabs } from '@/components/ui'
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
    <div className="space-y-6 pb-10">
      <header dir="rtl">
        <h1 className="text-2xl font-bold text-ink">التمارين</h1>
        <p className="mt-1 text-ink-muted">تدرّب على أسئلة مختارة عشوائياً من كل دروس المستوى.</p>
      </header>

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
      ) : (
        <Card>
          <CardBody dir="rtl" className="flex flex-col items-center gap-4 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-muted text-primary">
              <Dumbbell size={22} aria-hidden="true" />
            </span>
            {availableExercises.length === 0 ? (
              <p className="text-ink-muted">لا توجد تمارين متاحة لهذا المستوى بعد.</p>
            ) : (
              <>
                <p className="text-ink-muted">
                  {Math.min(SESSION_SIZE, availableExercises.length)} سؤالاً عشوائياً من أصل {availableExercises.length} في مستوى {level}
                </p>
                <Button onClick={startSession}>ابدأ جلسة تمارين</Button>
              </>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  )
}
