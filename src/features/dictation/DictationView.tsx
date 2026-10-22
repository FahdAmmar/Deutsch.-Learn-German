import { ArrowLeft, Keyboard } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui'
import { LevelMark } from '@/features/levels/LevelMark'
import { useDictationStore } from '@/store/dictationStore'
import type { DictationSource, FinishedDictationRun, Story } from '@/types'

import { DictationResults } from './DictationResults'
import { DictationStage } from './DictationStage'

interface DictationViewProps {
  story: Story
  nextStory?: Story
}

/**
 * Letter-by-letter dictation of a reading text or conversation. The typing
 * itself lives in `DictationStage`; this adds what belongs to a lesson story:
 * its title and level, the speaker of each line, the link back to the text,
 * and saving the result against the story.
 */
export function DictationView({ story, nextStory }: DictationViewProps) {
  const recordRun = useDictationStore((store) => store.recordRun)

  const source = useMemo<DictationSource>(() => ({ id: story.id, titleDe: story.titleDe, segments: story.segments }), [story])

  const handleFinished = useCallback(
    ({ accuracy, wpm }: FinishedDictationRun) => recordRun({ storyId: story.id, level: story.level, accuracy, wpm }),
    [recordRun, story.id, story.level],
  )

  // A conversation line shows who is speaking (blocks and segments line up one-to-one for conversations).
  const speakerAt = useCallback(
    (index: number) => {
      const block = story.kind === 'dialogue' ? story.blocks[index] : undefined
      return block?.type === 'line' ? block.name : undefined
    },
    [story],
  )

  const storyPath = `/levels/${story.level.toLowerCase()}/texts/${story.id}`

  return (
    <DictationStage
      source={source}
      onFinished={handleFinished}
      speakerAt={speakerAt}
      header={
        <header className="space-y-3">
          <Link to={storyPath} className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink">
            <ArrowLeft size={16} aria-hidden="true" />
            <span dir="rtl">العودة إلى النص</span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 lang="de" className="display-de text-start text-2xl font-semibold text-ink [overflow-wrap:anywhere] sm:text-3xl">
              {story.titleDe}
            </h1>
            <LevelMark level={story.level} size="sm" />
            <Badge tone="accent">
              <Keyboard size={12} aria-hidden="true" />
              <span dir="rtl">إملاء · Diktat</span>
            </Badge>
          </div>
        </header>
      }
      renderEnd={({ stats, mistakes, spelling, restart }) => (
        <DictationResults story={story} stats={stats} mistakes={mistakes} spelling={spelling} nextStory={nextStory} onRestart={restart} />
      )}
    />
  )
}
