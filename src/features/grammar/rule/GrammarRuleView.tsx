import { useEffect, useMemo } from 'react'

import { PrintButton, RailRule } from '@/components/ui'
import { useGrammarProgressStore } from '@/store/grammarProgressStore'
import type { GrammarRule } from '@/types'

import { CheatSheet } from './CheatSheet'
import { FlashcardGrid } from './FlashcardGrid'
import { RuleHero } from './RuleHero'
import { LessonsForRule } from '../links/LessonsForRule'
import { getLessonsForGrammarRule } from '@/lib/grammarLinks'
import { RuleIndex } from './RuleIndex'
import { RuleNeighborNav } from './RuleNeighborNav'
import { RuleQuiz } from './RuleQuiz'
import { RuleSectionNav } from './RuleSectionNav'
import { RuleSectionView } from './RuleSectionView'

interface GrammarRuleViewProps {
  rule: GrammarRule
}

function FixedSection({ id, kicker, title, children, interactive = false }: { id: string; kicker: string; title: string; children: React.ReactNode; interactive?: boolean }) {
  return (
    // An interactive section (flip cards, a quiz) has nothing to print, so it stays off the paper.
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-40 space-y-5 ${interactive ? 'print:hidden' : ''}`}>
      <header className="space-y-2">
        <p dir="ltr" className="font-mono text-xs font-bold tracking-wider text-ink-faint">
          {kicker}
        </p>
        <h2 id={`${id}-title`} className="text-2xl font-bold text-ink sm:text-3xl">
          {title}
        </h2>
      </header>
      {children}
    </section>
  )
}

/** The full roadmap lesson: hero → sections → review → quiz → cheat sheet → neighbours. */
export function GrammarRuleView({ rule }: GrammarRuleViewProps) {
  const visitRule = useGrammarProgressStore((state) => state.visitRule)

  useEffect(() => {
    visitRule(rule.number)
  }, [rule.number, visitRule])

  const navItems = useMemo(
    () => [
      ...rule.sections.map((section) => ({ id: section.id, labelAr: section.navLabelAr })),
      { id: 'review', labelAr: 'المراجعة' },
      { id: 'quiz', labelAr: 'الاختبار' },
      { id: 'cheat-sheet', labelAr: 'البطاقة المرجعية' },
    ],
    [rule.sections],
  )

  function startLesson() {
    document.getElementById(rule.sections[0]?.id ?? 'review')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
      <article dir="rtl" lang="ar" className="min-w-0 space-y-10 pb-12">
        <RuleHero rule={rule} onStart={startLesson} />
        <RuleSectionNav items={navItems} />
        <div className="flex justify-start print:hidden">
          <PrintButton label="طباعة القاعدة" />
        </div>

        {rule.sections.map((section, index) => (
          <div key={section.id} className="space-y-10">
            <RuleSectionView section={section} index={index} />
            <RailRule />
          </div>
        ))}

        <FixedSection interactive id="review" kicker="Wiederholung / مراجعة سريعة" title="مراجعة سريعة — اضغط لقلب كل بطاقة">
          <FlashcardGrid cards={rule.flashcards} />
        </FixedSection>
        <RailRule />

        <FixedSection interactive id="quiz" kicker="Abschlusstest / الاختبار الختامي" title={`الاختبار الختامي — ${rule.termDe}`}>
          <RuleQuiz rule={rule} />
        </FixedSection>
        <RailRule />

        <FixedSection id="cheat-sheet" kicker="Merkzettel / بطاقة مرجعية" title="البطاقة المرجعية السريعة">
          <CheatSheet items={rule.cheatSheet} />
        </FixedSection>

        <LessonsForRule lessons={getLessonsForGrammarRule(rule.number)} />

        <div className="print:hidden">
          <RuleNeighborNav number={rule.number} />
        </div>
      </article>

      <aside className="hidden lg:block print:hidden">
        <RuleIndex level={rule.level} currentNumber={rule.number} />
      </aside>
    </div>
  )
}
