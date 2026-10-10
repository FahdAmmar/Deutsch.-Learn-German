import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'

import { LevelTabs, PageHeader, ProgressBar } from '@/components/ui'
import { GrammarTopicCard } from '@/features/grammar/GrammarTopicCard'
import { RoadmapRow } from '@/features/grammar/roadmap/RoadmapRow'
import { getPublishedCount, getRoadmapEntries, isRulePublished } from '@/lib/grammarRoadmap'
import { getGrammarTopicsForLevel } from '@/lib/curriculum'
import { useGrammarProgressStore } from '@/store/grammarProgressStore'
import { useProgressStore } from '@/store/progressStore'
import type { CEFRLevel } from '@/types'

export default function GrammarPage() {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const [level, setLevel] = useState<CEFRLevel>(currentLevel)
  const rules = useGrammarProgressStore((state) => state.rules)

  const entries = useMemo(() => getRoadmapEntries(level), [level])
  const lessonTopics = useMemo(() => getGrammarTopicsForLevel(level), [level])

  const publishedInLevel = getPublishedCount(level)
  const completedInLevel = entries.filter((entry) => rules[entry.number]?.completed).length

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="القواعد"
        description={`خارطة طريق متسلسلة من A1 إلى B2 — ${getRoadmapEntries().length} قاعدة، مرتّبة بالترتيب الذي يُنصح بدراستها به.`}
      />

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <LevelTabs value={level} onChange={setLevel} />

        <section dir="rtl" aria-label={`تقدّم قواعد ${level}`} className="w-full max-w-sm space-y-2 sm:w-72">
          <ProgressBar
            value={entries.length === 0 ? 0 : completedInLevel / entries.length}
            tone="success"
            label={`القواعد المنجزة في ${level}`}
          />
          <p className="tnum text-sm text-ink-muted">
            {publishedInLevel} من {entries.length} قاعدة متاحة الآن في {level} · أنجزت {completedInLevel}
          </p>
        </section>
      </div>

      <ol dir="rtl" className="grid gap-2.5 lg:grid-cols-2">
        {entries.map((entry) => (
          <RoadmapRow
            key={entry.number}
            entry={entry}
            published={isRulePublished(entry.number)}
            completed={Boolean(rules[entry.number]?.completed)}
          />
        ))}
      </ol>

      {lessonTopics.length > 0 ? (
        <details dir="rtl" className="group rounded-lg border border-border bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3.5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <span>
              ملخصات قصيرة من دروس {level} ({lessonTopics.length})
            </span>
            <ChevronDown size={20} aria-hidden="true" className="text-ink-faint transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="space-y-4 border-t border-border p-4">
            {lessonTopics.map((topic) => (
              <GrammarTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  )
}
