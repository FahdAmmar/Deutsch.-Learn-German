import { SentenceStructureDiagram } from '@/features/grammar/SentenceStructureDiagram'
import { CommonMistakesList } from '@/features/lessons/CommonMistakesList'
import type { DetailsBlock, MistakesBlock, SentenceBlock, TextBlock } from '@/types'

import { RichText } from '../RichText'

export function TextBlockView({ block }: { block: TextBlock }) {
  return (
    <div className="space-y-3">
      {block.paragraphsAr.map((paragraph, index) => (
        <p key={index} className="leading-loose text-ink-muted">
          <RichText text={paragraph} />
        </p>
      ))}
    </div>
  )
}

export function DetailsBlockView({ block }: { block: DetailsBlock }) {
  return (
    <details className="group rounded-lg border border-border bg-surface shadow-sm open:bg-surface-muted/40">
      <summary className="cursor-pointer select-none rounded-lg px-4 py-3 font-semibold text-ink marker:text-accent">
        {block.summaryAr}
      </summary>
      <div className="space-y-3 border-t border-border px-4 py-3">
        {block.paragraphsAr.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-ink-muted">
            <RichText text={paragraph} />
          </p>
        ))}
      </div>
    </details>
  )
}

export function MistakesBlockView({ block }: { block: MistakesBlock }) {
  return (
    <section aria-label={block.titleAr ?? 'أخطاء شائعة'} className="space-y-3 rounded-lg border border-error/30 bg-error-muted/30 p-4 sm:p-5">
      <h3 className="text-base font-bold text-ink">{block.titleAr ?? 'أخطاء شائعة'}</h3>
      <CommonMistakesList mistakes={block.items} />
    </section>
  )
}

export function SentenceBlockView({ block }: { block: SentenceBlock }) {
  return <SentenceStructureDiagram tokens={block.tokens} ar={block.ar} />
}
