import { ArrowLeft, ArrowRight, ClipboardCheck, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui'
import type { RunStats } from '@/lib/dictation/session'
import type { SpellingKindCount } from '@/lib/dictation/spelling'
import { selectDictationProgress, useDictationStore } from '@/store/dictationStore'
import type { Story } from '@/types'

import { outlineLinkClass, primaryLinkClass, quietLinkClass } from './actionClasses'
import { DictationSummary } from './DictationSummary'

interface DictationResultsProps {
  story: Story
  stats: RunStats
  mistakes: { char: string; count: number }[]
  spelling: SpellingKindCount[]
  nextStory?: Story
  onRestart: () => void
}

/** The end of a story's dictation: the shared summary, with the links that belong to a story. */
export function DictationResults({ story, stats, mistakes, spelling, nextStory, onRestart }: DictationResultsProps) {
  const best = useDictationStore(selectDictationProgress(story.id))
  const storyPath = `/levels/${story.level.toLowerCase()}/texts/${story.id}`

  return (
    <DictationSummary
      stats={stats}
      mistakes={mistakes}
      spelling={spelling}
      best={best}
      actions={
        <>
          <Button variant="secondary" icon={<RotateCcw size={18} aria-hidden="true" />} onClick={onRestart}>
            أعد المحاولة
          </Button>
          <Link to={`${storyPath}/quiz`} className={primaryLinkClass}>
            <ClipboardCheck size={18} aria-hidden="true" />
            اختبر نفسك
          </Link>
          {nextStory ? (
            <Link to={`/levels/${nextStory.level.toLowerCase()}/texts/${nextStory.id}/diktat`} className={outlineLinkClass}>
              النص التالي
              <ArrowLeft size={18} aria-hidden="true" />
            </Link>
          ) : null}
          <Link to={storyPath} className={quietLinkClass}>
            <ArrowRight size={18} aria-hidden="true" />
            العودة إلى النص
          </Link>
        </>
      }
    />
  )
}
