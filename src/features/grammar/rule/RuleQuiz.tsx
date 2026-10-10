import { useState } from 'react'
import { Trophy } from 'lucide-react'

import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { GRAMMAR_PASS_ACCURACY, selectRuleProgress, useGrammarProgressStore } from '@/store/grammarProgressStore'
import type { GrammarRule } from '@/types'

/** The rule's final quiz. Runs on the shared exercise engine and records the result as grammar progress. */
export function RuleQuiz({ rule }: { rule: GrammarRule }) {
  const recordQuizResult = useGrammarProgressStore((state) => state.recordQuizResult)
  const progress = useGrammarProgressStore(selectRuleProgress(rule.number))
  const [lastAccuracy, setLastAccuracy] = useState<number | null>(null)

  function handleComplete(accuracy: number) {
    setLastAccuracy(accuracy)
    recordQuizResult(rule.number, accuracy)
  }

  const passed = lastAccuracy !== null && lastAccuracy >= GRAMMAR_PASS_ACCURACY

  return (
    <div className="space-y-4">
      {progress && progress.attempts > 0 ? (
        <p className="flex items-center gap-2 text-sm text-ink-muted">
          <Trophy size={16} className={progress.completed ? 'text-success' : 'text-ink-faint'} aria-hidden="true" />
          أفضل نتيجة لك: {Math.round(progress.bestAccuracy * 100)}٪
          {progress.completed ? ' — أنجزت هذه القاعدة' : ` — تحتاج ${Math.round(GRAMMAR_PASS_ACCURACY * 100)}٪ لإنجازها`}
        </p>
      ) : null}

      <ExerciseRunner exercises={rule.quiz} onComplete={handleComplete} />

      {lastAccuracy !== null ? (
        <p
          role="status"
          className={
            passed
              ? 'rounded-md border border-success/30 bg-success-muted p-3 text-sm font-semibold text-success'
              : 'rounded-md border border-accent/30 bg-accent-muted p-3 text-sm font-semibold text-accent'
          }
        >
          {passed
            ? 'أحسنت! اجتزت اختبار هذه القاعدة وتم تسجيل التقدّم.'
            : 'لم تصل إلى الحد المطلوب بعد — راجع بطاقات المراجعة وأعد المحاولة.'}
        </p>
      ) : null}
    </div>
  )
}
