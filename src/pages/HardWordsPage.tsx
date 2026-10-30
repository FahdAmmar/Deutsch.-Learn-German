import { ArrowRight, Flame, PartyPopper } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { ArticleText, Badge, Button, Card, EmptyState, PageHeader } from '@/components/ui'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { buildVocabRecallExercise } from '@/features/review/buildVocabRecallExercise'
import { selectHardWords } from '@/features/review/hardWords'
import { getAllVocabulary } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useSpellingStore } from '@/store/spellingStore'
import type { Exercise } from '@/types'

/** More than this in one sitting stops being practice on the hard words and becomes a slog. */
const SESSION_SIZE = 15

/** Route: /review/hard-words — the words the learner keeps getting wrong, and a session on exactly those. */
export default function HardWordsPage() {
  const vocabularyProgress = useProgressStore((state) => state.vocabulary)
  const spellingWords = useSpellingStore((state) => state.words)
  const [session, setSession] = useState<Exercise[] | null>(null)

  const hardWords = useMemo(
    () => selectHardWords({ vocabularyProgress, spellingWords, vocabulary: getAllVocabulary() }),
    [vocabularyProgress, spellingWords],
  )

  function startSession() {
    setSession(hardWords.slice(0, SESSION_SIZE).map((word) => buildVocabRecallExercise(word.item)))
  }

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="كلماتي الصعبة"
        description="الكلمات التي تخطئ فيها مراراً في المراجعة والتمارين والإملاء. تخرج الكلمة من القائمة وحدها حين تُجيب عنها صحيحاً."
      />

      <Link to="/review" className="inline-flex items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline">
        <ArrowRight size={16} aria-hidden="true" />
        <span dir="rtl">العودة إلى المراجعة المتباعدة</span>
      </Link>

      {session ? (
        <ExerciseRunner exercises={session} />
      ) : hardWords.length === 0 ? (
        <EmptyState icon={PartyPopper} title="لا توجد كلمات صعبة الآن">
          لا كلمة أخطأت فيها أكثر من مرة. تظهر هنا الكلمات التي تتكرر أخطاؤك فيها، فتعود إليها وتثبّتها.
        </EmptyState>
      ) : (
        <>
          <Card tone="brand">
            <div dir="rtl" className="flex flex-col items-start gap-5 p-6 sm:p-8">
              <Flame size={30} className="text-accent" aria-hidden="true" />
              <p className="font-sans text-2xl font-bold text-ink">
                لديك <span className="tnum">{hardWords.length}</span> كلمة تحتاج إلى تثبيت.
              </p>
              <Button size="lg" onClick={startSession}>
                تدرّب على {Math.min(SESSION_SIZE, hardWords.length)} كلمة
              </Button>
            </div>
          </Card>

          <ul dir="rtl" className="grid gap-3 sm:grid-cols-2">
            {hardWords.map((word) => (
              <li key={word.item.id} className="space-y-2 rounded-lg border border-border bg-surface p-4">
                <p lang="de" dir="ltr" className="text-start text-lg font-semibold text-ink [overflow-wrap:anywhere]">
                  <ArticleText text={word.item.article ? `${word.item.article} ${word.item.word}` : word.item.word} />
                </p>
                <p className="text-ink-muted">{word.item.meaningAr}</p>
                <div className="flex flex-wrap gap-2">
                  {word.misses > 0 ? (
                    <Badge tone="error">
                      أخطأت <span className="tnum">{word.misses}</span> من <span className="tnum">{word.reviews}</span>
                    </Badge>
                  ) : null}
                  {word.spellingSlips > 0 ? (
                    <Badge tone="neutral">
                      خطأ في الكتابة <span className="tnum">{word.spellingSlips}</span> مرات
                    </Badge>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
