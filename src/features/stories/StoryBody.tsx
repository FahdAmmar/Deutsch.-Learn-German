import { HintedSentenceButton } from '@/features/grammarHints/HintedSentenceButton'
import { cn } from '@/lib/cn'
import type { SegmentRange } from '@/hooks/useStoryPlayer'
import type { Story, StoryBlock } from '@/types'

interface StoryBodyProps {
  story: Story
  /** Index of the segment being read, or null when nothing is playing. */
  currentIndex: number | null
  showTranslations: boolean
  /** The passage being repeated, if one is chosen; its sentences are tinted. */
  range?: SegmentRange | null
  /** What tapping a segment (a sentence or a conversation line) does: start reading there, or choose the passage. */
  onPlayFrom: (index: number) => void
}

const inRange = (range: SegmentRange | null | undefined, index: number) => range != null && index >= range.start && index <= range.end

/**
 * The text of a story. Reading texts flow as German paragraphs; conversations
 * are chat bubbles. Either way every sentence/line is a button that starts the
 * audio from there, and the one being read is highlighted.
 */
export function StoryBody({ story, currentIndex, showTranslations, range = null, onPlayFrom }: StoryBodyProps) {
  if (story.kind === 'dialogue') {
    return (
      <ol className="space-y-4">
        {story.blocks.map((block, position) => (
          <DialogueLine key={position} block={block} currentIndex={currentIndex} showTranslations={showTranslations} range={range} onPlayFrom={onPlayFrom} />
        ))}
      </ol>
    )
  }

  return (
    <div className="space-y-9">
      {story.blocks.map((block, position) =>
        block.type === 'paragraph' ? (
          <section key={position} className="space-y-3">
            <p dir="ltr" lang="de" className="display-de text-start text-[1.2rem] leading-[2.1] font-normal text-ink sm:text-[1.3rem]">
              {block.segments.map((segment) => (
                <span key={segment.index}>
                  <HintedSentenceButton
                    text={segment.text}
                    colorArticles
                    onClick={() => onPlayFrom(segment.index)}
                    aria-current={currentIndex === segment.index ? 'true' : undefined}
                    data-in-range={inRange(range, segment.index) ? '' : undefined}
                    className={cn(
                      'rounded-sm px-1 py-0.5 text-start transition-colors [box-decoration-break:clone]',
                      // The sentence being read keeps its highlight under the pointer too (the learner just clicked it).
                      currentIndex === segment.index
                        ? 'bg-accent-muted hover:bg-accent-muted'
                        : inRange(range, segment.index)
                          ? 'bg-plum-muted hover:bg-plum-muted'
                          : 'hover:bg-surface-sunken',
                    )}
                  />{' '}
                </span>
              ))}
            </p>
            {showTranslations ? <Translation text={block.ar} /> : null}
          </section>
        ) : null,
      )}
    </div>
  )
}

function Translation({ text }: { text: string }) {
  return (
    <p dir="rtl" className="border-s-2 border-border-strong ps-3 text-[0.97rem] leading-8 text-ink-muted">
      {text}
    </p>
  )
}

interface DialogueLineProps {
  block: StoryBlock
  currentIndex: number | null
  showTranslations: boolean
  range: SegmentRange | null
  onPlayFrom: (index: number) => void
}

function DialogueLine({ block, currentIndex, showTranslations, range, onPlayFrom }: DialogueLineProps) {
  if (block.type !== 'line') return null
  const isFirstSpeaker = block.speaker === 'a'
  const isCurrent = currentIndex === block.segment.index
  const isInRange = inRange(range, block.segment.index)

  return (
    // The two speakers sit on opposite sides, like a chat.
    <li className={cn('flex', isFirstSpeaker ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'max-w-[92%] space-y-2 rounded-lg border p-3 sm:max-w-[82%] sm:p-4',
          isFirstSpeaker ? 'rounded-es-sm' : 'rounded-ee-sm',
          // One background and border per state — `cn` does not resolve clashing utilities for us.
          isInRange ? 'border-plum bg-plum-muted' : isFirstSpeaker ? 'border-border bg-surface-sunken' : 'border-border bg-accent-muted',
          isCurrent && 'ring-2 ring-accent',
        )}
        data-in-range={isInRange ? '' : undefined}
      >
        <p className="text-sm font-semibold text-ink-muted">{block.name}</p>
        <HintedSentenceButton
          text={block.segment.text}
          colorArticles
          dir="ltr"
          lang="de"
          onClick={() => onPlayFrom(block.segment.index)}
          aria-current={isCurrent ? 'true' : undefined}
          className="display-de block text-start text-[1.15rem] leading-9 font-medium text-ink hover:text-accent sm:text-[1.25rem]"
        />
        {showTranslations ? (
          <p dir="rtl" className="text-[0.95rem] leading-7 text-ink-muted">
            {block.ar}
          </p>
        ) : null}
      </div>
    </li>
  )
}
