import { ArrowLeft, Keyboard, RotateCcw } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { Badge, Button } from '@/components/ui'
import { outlineLinkClass } from '@/features/dictation/actionClasses'
import { DictationStage } from '@/features/dictation/DictationStage'
import { DictationSummary } from '@/features/dictation/DictationSummary'
import { StagePicker } from '@/features/mytext/StagePicker'
import { splitText } from '@/lib/myText/split'
import { useMyTextStore } from '@/store/myTextStore'
import type { DictationSource, FinishedDictationRun, MyText, PracticeStage } from '@/types'

interface MyTextDictationProps {
  text: MyText
}

/** Dictation of one of the learner's own texts, part by part, saved against that text. */
export function MyTextDictation({ text }: MyTextDictationProps) {
  const recordRun = useMyTextStore((store) => store.recordRun)
  // Opens at the stage the text has reached; the learner may practise an easier one again.
  const [stage, setStage] = useState<PracticeStage>(text.stage)

  const segments = useMemo(
    () => splitText(text.text, text.mode, text.maxWords).map((part) => ({ text: part })),
    [text.text, text.mode, text.maxWords],
  )
  const source = useMemo<DictationSource>(() => ({ id: text.id, titleDe: text.title, segments }), [text.id, text.title, segments])

  const handleFinished = useCallback((run: FinishedDictationRun) => recordRun(text.id, run, stage), [recordRun, text.id, stage])

  if (segments.length === 0) return <Navigate to="/my-text" replace />

  return (
    <DictationStage
      // A different stage is a different dictation, so it starts over.
      key={stage}
      source={source}
      stage={stage}
      unit="part"
      onFinished={handleFinished}
      header={
        <header className="space-y-3">
          <Link to="/my-text" className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink">
            <ArrowLeft size={16} aria-hidden="true" />
            <span dir="rtl">نصوصي</span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 dir="auto" className="text-start text-2xl font-bold text-ink [overflow-wrap:anywhere] sm:text-3xl">
              {text.title}
            </h1>
            <Badge tone="accent">
              <Keyboard size={12} aria-hidden="true" />
              <span dir="rtl">إملاء · Diktat</span>
            </Badge>
            <Badge tone="neutral">
              <span dir="rtl">{segments.length} مقطع</span>
            </Badge>
          </div>
          <StagePicker value={stage} reached={text.stage} onChange={setStage} />
        </header>
      }
      renderEnd={({ stats, mistakes, spelling, restart }) => (
        <DictationSummary
          stats={stats}
          mistakes={mistakes}
          spelling={spelling}
          best={text.attempts > 0 ? { bestAccuracy: text.bestAccuracy, bestWpm: text.bestWpm, attempts: text.attempts } : undefined}
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
