import { ArrowLeft, Keyboard, RotateCcw, SearchCheck } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Badge, Button, EmptyState } from '@/components/ui'
import { outlineLinkClass, primaryLinkClass } from '@/features/dictation/actionClasses'
import { DictationStage } from '@/features/dictation/DictationStage'
import { DictationSummary } from '@/features/dictation/DictationSummary'
import { selectWeakWords, useSpellingStore } from '@/store/spellingStore'
import type { DictationSource, FinishedDictationRun } from '@/types'

/** How many of the hard words one session asks for: enough to be worth it, few enough to finish. */
const SESSION_WORDS = 10

/** Dictation of the words the learner stumbles on, one word per part. Route: /my-text/weak-words */
export default function WeakWordsPage() {
  const recordPractice = useSpellingStore((state) => state.recordPractice)
  // The list is read once, when the page opens: finishing the run changes the record, and a source that
  // changed under the typing card would replace the end screen with a new session.
  const [words] = useState(() => selectWeakWords(useSpellingStore.getState(), SESSION_WORDS).map((entry) => entry.word))
  const source = useMemo<DictationSource>(
    () => ({ id: 'weak-words', titleDe: 'Meine schwierigen Wörter', segments: words.map((word) => ({ text: word })) }),
    [words],
  )

  const handleFinished = useCallback(
    (run: FinishedDictationRun) =>
      recordPractice(
        words,
        (run.slips ?? []).map((slip) => slip.word),
      ),
    [recordPractice, words],
  )

  if (words.length === 0) {
    return (
      <EmptyState
        icon={SearchCheck}
        title="لا توجد كلمات صعبة الآن"
        action={
          <Link to="/my-text" className={primaryLinkClass}>
            اكتب نصاً وتدرّب عليه
          </Link>
        }
      >
        نسجّل الكلمات التي تخطئ في كتابتها أثناء الإملاء، ونجمعها هنا لتراجعها. أكمل إملاءً وسنبدأ بها.
      </EmptyState>
    )
  }

  return (
    <DictationStage
      source={source}
      unit="part"
      onFinished={handleFinished}
      header={
        <header className="space-y-3">
          <Link
            to="/my-text"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span dir="rtl">نصوصي</span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 dir="auto" className="text-start text-2xl font-bold text-ink sm:text-3xl">
              كلماتي الصعبة
            </h1>
            <Badge tone="accent">
              <Keyboard size={12} aria-hidden="true" />
              <span dir="rtl">إملاء · Diktat</span>
            </Badge>
            <Badge tone="neutral">
              <span dir="rtl">{words.length} كلمة</span>
            </Badge>
          </div>
          <p dir="rtl" className="text-ink-muted">
            الكلمة التي تكتبها صحيحة تنقص من سجل أخطائك، وتخرج من القائمة حين تصل إلى الصفر.
          </p>
        </header>
      }
      renderEnd={({ stats, mistakes, spelling, restart }) => (
        <DictationSummary
          stats={stats}
          mistakes={mistakes}
          spelling={spelling}
          actions={
            <>
              <Button variant="secondary" icon={<RotateCcw size={18} aria-hidden="true" />} onClick={restart}>
                أعد المحاولة
              </Button>
              <Link to="/my-text" className={outlineLinkClass}>
                نصوصي
              </Link>
            </>
          }
        />
      )}
    />
  )
}
