import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { Button, Card, PageHeader } from '@/components/ui'
import { RolePlayStage } from '@/features/roleplay/RolePlayStage'
import { useSpeakLine } from '@/features/roleplay/useSpeakLine'
import { getDialogueLines, getRoles, type Speaker } from '@/lib/rolePlay'
import { getStory } from '@/lib/stories'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

/**
 * Play one side of a conversation. Route: /levels/:level/texts/:itemId/rollenspiel. The learner picks a
 * part first; the other speaker's lines are read aloud, and the learner answers their own in German.
 */
export default function RolePlayPage() {
  const { level, itemId } = useParams<{ level: string; itemId: string }>()
  const [role, setRole] = useState<Speaker | null>(null)
  const speak = useSpeakLine()
  const normalizedLevel = level?.toUpperCase() as CEFRLevel | undefined

  if (!normalizedLevel || !CEFR_LEVELS.includes(normalizedLevel)) return <Navigate to="/levels" replace />

  const story = itemId ? getStory(normalizedLevel, itemId) : undefined
  if (!story) return <Navigate to={`/levels/${normalizedLevel.toLowerCase()}?tab=stories`} replace />

  const backTo = `/levels/${normalizedLevel.toLowerCase()}/texts/${story.id}`
  const lines = getDialogueLines(story)
  const roles = getRoles(lines)
  // A reading text has no speakers: send the learner back to it rather than show an empty stage.
  if (roles.length !== 2) return <Navigate to={backTo} replace />

  // The click that picks a part is what lets the browser play sound: if the other speaker opens, they are heard at once.
  function choose(speaker: Speaker) {
    setRole(speaker)
    const first = lines[0]
    if (first && first.speaker !== speaker) speak(first)
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader title="تمثيل الأدوار" description={`${story.titleDe} — اختر دوراً، وسيقرأ لك البرنامج كلام الطرف الآخر.`} />

      {role === null ? (
        <Card tone="brand">
          <div dir="rtl" className="space-y-4 p-5 sm:p-6">
            <h2 className="font-sans text-xl font-bold text-ink">من تريد أن تكون؟</h2>
            <p className="text-ink-muted">
              ستجيب عن جمل دورك بالألمانية: كتابةً أو بصوتك. وتُقارن إجابتك بالجملة الصحيحة كلمةً كلمة.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {roles.map((candidate) => (
                <Button key={candidate.speaker} size="lg" onClick={() => choose(candidate.speaker)}>
                  أريد دور {candidate.name}
                </Button>
              ))}
              <Link to={backTo} className="inline-flex h-11 items-center rounded-md px-3 font-semibold text-accent underline-offset-4 hover:underline">
                العودة إلى المحادثة
              </Link>
            </div>
          </div>
        </Card>
      ) : (
        // Keyed by role, so changing parts starts a fresh conversation rather than carrying over the old answers.
        <RolePlayStage key={role} lines={lines} roles={roles} role={role} backTo={backTo} onChangeRole={setRole} />
      )}
    </div>
  )
}
