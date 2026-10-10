import { cn } from '@/lib/cn'
import type { RuleSection } from '@/types'

import { RichText } from './RichText'
import { RuleBlockRenderer } from './RuleBlockRenderer'
import { TONE_CLASSES } from './ruleTone'

export function RuleSectionView({ section, index }: { section: RuleSection; index: number }) {
  const tone = TONE_CLASSES[section.tone]
  const headingId = `${section.id}-title`

  return (
    <section id={section.id} aria-labelledby={headingId} className="scroll-mt-40 space-y-5">
      <header className="max-w-3xl space-y-2">
        <p dir="ltr" className={cn('font-mono text-xs font-bold tracking-wider uppercase', tone.text)}>
          {String(index + 1).padStart(2, '0')} / {section.kickerDe}
        </p>
        <h2 id={headingId} className="text-2xl font-bold text-ink sm:text-3xl">
          {section.titleAr}
          {section.titleDe ? (
            <>
              {' '}
              <span lang="de" dir="ltr" className={cn('font-de font-semibold italic', tone.text)}>
                {section.titleDe}
              </span>
            </>
          ) : null}
        </h2>
        <p className="leading-loose text-ink-muted">
          <RichText text={section.introAr} />
        </p>
      </header>

      <div className="space-y-5">
        {section.blocks.map((block, blockIndex) => (
          <RuleBlockRenderer key={blockIndex} block={block} />
        ))}
      </div>
    </section>
  )
}
