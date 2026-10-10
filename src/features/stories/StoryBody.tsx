import { cn } from '@/lib/cn'
import type { Story, StoryBlock } from '@/types'

interface StoryBodyProps {
  story: Story
  /** Index of the segment being read, or null when nothing is playing. */
  currentIndex: number | null
  showTranslations: boolean
  /** Start reading from a segment (a sentence or a conversation line). */
  onPlayFrom: (index: number) => void
}

/**
 * The text of a story. Reading texts flow as German paragraphs; conversations
 * are chat bubbles. Either way every sentence/line is a button that starts the
 * audio from there, and the one being read is highlighted.
 */
export function StoryBody({ story, currentIndex, showTranslations, onPlayFrom }: StoryBodyProps) {
  if (story.kind === 'dialogue') {
    return (
      <ol className="space-y-4">
        {story.blocks.map((block, position) => (
          <DialogueLine key={position} block={block} currentIndex={currentIndex} showTranslations={showTranslations} onPlayFrom={onPlayFrom} />
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
                  <button
                    type="button"
                    onClick={() => onPlayFrom(segment.index)}
                    aria-current={currentIndex === segment.index ? 'true' : undefined}
                    className={cn(
                      'rounded-sm px-1 py-0.5 text-start transition-colors [box-decoration-break:clone]',
                      // The sentence being read keeps its highlight under the pointer too (the learner just clicked it).
                      currentIndex === segment.index ? 'bg-accent-muted hover:bg-accent-muted' : 'hover:bg-surface-sunken',
                    )}
                  >
                    {segment.text}
                  </button>{' '}
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
  onPlayFrom: (index: number) => void
}

function DialogueLine({ block, currentIndex, showTranslations, onPlayFrom }: DialogueLineProps) {
  if (block.type !== 'line') return null
  const isFirstSpeaker = block.speaker === 'a'
  const isCurrent = currentIndex === block.segment.index

  return (
    // The two speakers sit on opposite sides, like a chat.
    <li className={cn('flex', isFirstSpeaker ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'max-w-[92%] space-y-2 rounded-lg border border-border p-3 sm:max-w-[82%] sm:p-4',
          isFirstSpeaker ? 'rounded-es-sm bg-surface-sunken' : 'rounded-ee-sm bg-accent-muted',
          isCurrent && 'ring-2 ring-accent',
        )}
      >
        <p className="text-sm font-semibold text-ink-muted">{block.name}</p>
        <button
          type="button"
          dir="ltr"
          lang="de"
          onClick={() => onPlayFrom(block.segment.index)}
          aria-current={isCurrent ? 'true' : undefined}
          className="display-de block text-start text-[1.15rem] leading-9 font-medium text-ink hover:text-accent sm:text-[1.25rem]"
        >
          {block.segment.text}
        </button>
        {showTranslations ? (
          <p dir="rtl" className="text-[0.95rem] leading-7 text-ink-muted">
            {block.ar}
          </p>
        ) : null}
      </div>
    </li>
  )
}
