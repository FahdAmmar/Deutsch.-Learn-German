import { BookMarked, Library, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { Tabs } from '@/components/ui'
import { DialogueDisplay } from '@/features/lessons/DialogueDisplay'
import { GrammarTopicCard } from '@/features/grammar/GrammarTopicCard'
import { ModuleSection } from '@/features/levels/ModuleSection'
import { getDialoguesForLevel, getGrammarTopicsForLevel, getModulesForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVEL_INFO, CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

type LevelTab = 'lessons' | 'grammar' | 'conversation'

export default function LevelDetailPage() {
  const { level } = useParams<{ level: string }>()
  const normalizedLevel = level?.toUpperCase() as CEFRLevel | undefined
  const lessons = useProgressStore((state) => state.lessons)
  const [activeTab, setActiveTab] = useState<LevelTab>('lessons')

  const completedLessonIds = useMemo(
    () => new Set(Object.values(lessons).filter((entry) => entry.completed).map((entry) => entry.lessonId)),
    [lessons],
  )

  if (!normalizedLevel || !CEFR_LEVELS.includes(normalizedLevel)) {
    return <Navigate to="/levels" replace />
  }

  const modules = getModulesForLevel(normalizedLevel)
  const grammarTopics = getGrammarTopicsForLevel(normalizedLevel)
  const dialogues = getDialoguesForLevel(normalizedLevel)
  const info = CEFR_LEVEL_INFO[normalizedLevel]

  return (
    <div className="space-y-6 pb-10">
      <header dir="rtl">
        <p className="text-sm font-semibold text-primary">{normalizedLevel}</p>
        <h1 className="text-2xl font-bold text-ink">{info.titleAr}</h1>
        <p dir="ltr" lang="de" className="text-ink-muted">
          {info.titleDe}
        </p>
      </header>

      {modules.length === 0 ? (
        <p dir="rtl" className="rounded-lg border border-dashed border-border p-6 text-center text-ink-muted">
          محتوى هذا المستوى قيد الإعداد حالياً. تابعنا قريباً!
        </p>
      ) : (
        <>
          <Tabs<LevelTab>
            label="أقسام المستوى"
            value={activeTab}
            onChange={setActiveTab}
            tabs={[
              { value: 'lessons', label: 'الدروس', icon: <BookMarked size={15} aria-hidden="true" /> },
              { value: 'grammar', label: 'القواعد', icon: <Library size={15} aria-hidden="true" /> },
              { value: 'conversation', label: 'محادثة', icon: <MessageCircle size={15} aria-hidden="true" /> },
            ]}
          />

          {activeTab === 'lessons' ? (
            <div className="space-y-8">
              {modules.map((module) => (
                <ModuleSection key={module.id} module={module} completedLessonIds={completedLessonIds} />
              ))}
            </div>
          ) : null}

          {activeTab === 'grammar' ? (
            grammarTopics.length === 0 ? (
              <EmptyTabMessage text="لا توجد مواضيع نحوية منشورة لهذا المستوى بعد." />
            ) : (
              <div className="space-y-4">
                {grammarTopics.map((topic) => (
                  <GrammarTopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            )
          ) : null}

          {activeTab === 'conversation' ? (
            dialogues.length === 0 ? (
              <EmptyTabMessage text="لا توجد محادثات منشورة لهذا المستوى بعد." />
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {dialogues.map((dialogue) => (
                  <DialogueDisplay key={dialogue.id} dialogue={dialogue} />
                ))}
              </div>
            )
          ) : null}
        </>
      )}
    </div>
  )
}

function EmptyTabMessage({ text }: { text: string }) {
  return (
    <p dir="rtl" className="rounded-lg border border-dashed border-border p-8 text-center text-ink-muted">
      {text}
    </p>
  )
}
