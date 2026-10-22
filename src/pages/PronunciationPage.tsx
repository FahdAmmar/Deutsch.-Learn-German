import { Headphones, ShieldAlert } from 'lucide-react'
import { useState } from 'react'

import { PageHeader } from '@/components/ui'
import { PRONUNCIATION_GROUPS } from '@/data/pronunciation'
import { PronunciationDrillCard, type DrillOutcome } from '@/features/pronunciation/PronunciationDrillCard'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { bestComparison } from '@/lib/pronunciation/compare'

/** Route: /pronunciation. Listen, say it, and see which words were understood. Results live only on this page. */
export default function PronunciationPage() {
  const recognition = useSpeechRecognition()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [outcomes, setOutcomes] = useState<Record<string, DrillOutcome>>({})

  async function listenFor(id: string, text: string) {
    setActiveId(id)
    const result = await recognition.start()
    if (!result) return
    // The recogniser's first guess is only a guess; judge the reading closest to what was asked.
    const { comparison, heard } = bestComparison(text, [result.transcript, ...result.alternatives])
    setOutcomes((current) => ({ ...current, [id]: { comparison, heard } }))
  }

  function stop() {
    recognition.cancel()
    setActiveId(null)
  }

  const listening = recognition.phase === 'listening'

  return (
    <div className="space-y-10">
      <PageHeader
        title="تدريب النطق"
        titleDe="Aussprache"
        description="استمع إلى النص، ثم انطقه أنت، وسنخبرك أي كلماته فُهمت وأيها تحتاج إلى مراجعة."
      />

      <div dir="rtl" className="space-y-3">
        {recognition.isSupported ? (
          <p
            role="note"
            className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-7 text-ink-muted"
          >
            <ShieldAlert size={20} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
            <span>
              التعرّف على الكلام تؤديه خدمة المتصفح، وقد يُرسل المتصفح تسجيل صوتك إلى خادم تابع لشركته ليحوّله إلى نص،
              لذلك يحتاج إلى اتصال بالإنترنت. هذا الموقع لا يحفظ أي تسجيل، ونتائج هذه الصفحة تبقى في الذاكرة فقط حتى
              تغادرها.
            </span>
          </p>
        ) : (
          <p
            role="note"
            className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-7 text-ink-muted"
          >
            <Headphones size={20} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
            <span>
              متصفحك لا يدعم التعرّف على الكلام (هذا حال Firefox مثلاً). يمكنك مع ذلك التدرّب بطريقة الظلّ (shadowing):
              استمع إلى النص ثم كرّره بصوت مرتفع فوراً، وقارن نطقك بما سمعت. وللتسجيل والتقييم جرّب Chrome أو Edge أو
              Safari.
            </span>
          </p>
        )}
      </div>

      {PRONUNCIATION_GROUPS.map((group) => (
        <section key={group.id} aria-labelledby={`pron-${group.id}`} className="space-y-4">
          <div dir="rtl" className="space-y-1">
            <h2 id={`pron-${group.id}`} className="font-sans text-xl font-bold text-ink">
              {group.titleAr}
            </h2>
            <p className="text-ink-muted">{group.descriptionAr}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {group.items.map((item) => (
              <PronunciationDrillCard
                key={item.id}
                item={item}
                outcome={outcomes[item.id]}
                listening={listening && activeId === item.id}
                busy={listening && activeId !== item.id}
                canRecord={recognition.isSupported}
                error={
                  activeId === item.id && recognition.phase === 'error' ? (recognition.error ?? undefined) : undefined
                }
                onStart={() => void listenFor(item.id, item.text)}
                onStop={stop}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
