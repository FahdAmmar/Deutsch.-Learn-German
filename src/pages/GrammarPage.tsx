import { useMemo, useState } from 'react'

import { LevelTabs } from '@/components/ui'
import { GrammarTopicCard } from '@/features/grammar/GrammarTopicCard'
import { getGrammarTopicsForLevel, getLevelsWithContent } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import type { CEFRLevel } from '@/types'

export default function GrammarPage() {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const [level, setLevel] = useState<CEFRLevel>(currentLevel)

  const topics = useMemo(() => getGrammarTopicsForLevel(level), [level])

  return (
    <div className="space-y-6 pb-10">
      <header dir="rtl">
        <h1 className="text-2xl font-bold text-ink">القواعد</h1>
        <p className="mt-1 text-ink-muted">شرح مرئي لقواعد اللغة الألمانية، درساً بعد درس.</p>
      </header>

      <LevelTabs value={level} onChange={setLevel} availableLevels={getLevelsWithContent()} />

      {topics.length === 0 ? (
        <p dir="rtl" className="rounded-lg border border-dashed border-border p-8 text-center text-ink-muted">
          لا توجد مواضيع نحوية منشورة لهذا المستوى بعد.
        </p>
      ) : (
        <div className="space-y-4">
          {topics.map((topic) => (
            <GrammarTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  )
}
