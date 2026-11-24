import { BookOpen, CalendarDays, Clock3, Compass, Globe, Hash, MessageCircle, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { InlineMarkup } from '@/components/ui'
import { RuleBlockRenderer } from '@/features/grammar/rule/RuleBlockRenderer'
import { TONE_CLASSES } from '@/features/grammar/rule/ruleTone'
import { cn } from '@/lib/cn'
import type { LessonSection, LessonSectionIcon } from '@/types'

const SECTION_ICONS: Record<LessonSectionIcon, LucideIcon> = {
  hash: Hash,
  clock: Clock3,
  calendar: CalendarDays,
  sparkles: Sparkles,
  book: BookOpen,
  message: MessageCircle,
  globe: Globe,
  compass: Compass,
}

interface LessonExplanationProps {
  sections: LessonSection[]
}

/**
 * The "explanation" part of a lesson. Every section is a short idea in Arabic plus, when the lesson has
 * been given them, visual blocks (formula, table, cards, compare …) — the same typed blocks the grammar
 * rules use. A section with no blocks still renders as heading + prose, so lessons can be upgraded one
 * at a time without the page looking inconsistent.
 */
export function LessonExplanation({ sections }: LessonExplanationProps) {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => {
        const tone = TONE_CLASSES[section.tone ?? 'accent']
        const Icon = section.icon ? SECTION_ICONS[section.icon] : undefined
        return (
          <article key={index} className="space-y-4" data-testid="lesson-section">
            <header dir="rtl" className="flex max-w-3xl items-start gap-4">
              {Icon ? (
                <span
                  aria-hidden="true"
                  className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-lg', tone.soft)}
                >
                  <Icon size={24} />
                </span>
              ) : null}
              <div className="min-w-0 space-y-1.5">
                <p dir="ltr" lang="de" className={cn('text-end font-mono text-xs font-bold tracking-wider', tone.text)}>
                  {String(index + 1).padStart(2, '0')}
                  {section.kickerDe ? ` / ${section.kickerDe}` : ''}
                </p>
                <h3 className="text-xl font-bold text-ink sm:text-2xl">
                  <InlineMarkup text={section.titleAr} />
                </h3>
                <p className="prose-ar text-ink">
                  <InlineMarkup text={section.bodyAr} />
                </p>
              </div>
            </header>

            {section.blocks && section.blocks.length > 0 ? (
              <div className="space-y-5">
                {section.blocks.map((block, blockIndex) => (
                  <RuleBlockRenderer key={blockIndex} block={block} />
                ))}
              </div>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
