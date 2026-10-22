import { FileText, Pencil, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Badge, Button, EmptyState } from '@/components/ui'
import { outlineLinkClass } from '@/features/dictation/actionClasses'
import { formatPercent } from '@/features/dictation/format'
import { daysUntil, isDue, STAGE_TITLE_AR } from '@/lib/dictation/stages'
import { countWords, splitText } from '@/lib/myText/split'
import { MAX_SAVED_TEXTS } from '@/lib/myText/limits'
import { useMyTextStore } from '@/store/myTextStore'
import type { MyText } from '@/types'

interface SavedTextsProps {
  onEdit: (text: MyText) => void
}

/** The learner's saved texts, each one a tap away from its dictation. */
export function SavedTexts({ onEdit }: SavedTextsProps) {
  const stored = useMyTextStore((store) => store.texts)
  // The moment the page opened: "due" is judged against one fixed time, not a clock that changes under the list.
  const [now] = useState(() => Date.now())
  // The texts waiting for their review come first; within each group the order the learner saved them in stays.
  const texts = useMemo(
    () => [...stored].sort((a, b) => Number(isDue(b.dueAt, now)) - Number(isDue(a.dueAt, now))),
    [stored, now],
  )
  const removeText = useMyTextStore((store) => store.removeText)
  const [confirming, setConfirming] = useState<string | null>(null)

  return (
    <section dir="rtl" aria-labelledby="saved-texts-title" className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="saved-texts-title" className="text-2xl font-bold text-ink">
          نصوصي
        </h2>
        <p className="tnum text-sm text-ink-muted">
          {texts.length} من {MAX_SAVED_TEXTS}
        </p>
      </div>

      {texts.length === 0 ? (
        <EmptyState icon={FileText} title="لم تحفظ أي نص بعد">
          أضف أول نص من النموذج بالأعلى، وسيظهر هنا لتعود إليه وتتدرّب عليه متى شئت.
        </EmptyState>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {texts.map((entry) => (
            <SavedTextRow
              key={entry.id}
              entry={entry}
              confirming={confirming === entry.id}
              now={now}
              onEdit={() => onEdit(entry)}
              onAskDelete={() => setConfirming(entry.id)}
              onCancelDelete={() => setConfirming(null)}
              onConfirmDelete={() => {
                removeText(entry.id)
                setConfirming(null)
              }}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

interface SavedTextRowProps {
  entry: MyText
  confirming: boolean
  /** The time "due" is judged against. */
  now: number
  onEdit: () => void
  onAskDelete: () => void
  onCancelDelete: () => void
  onConfirmDelete: () => void
}

function SavedTextRow({
  entry,
  confirming,
  now,
  onEdit,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
}: SavedTextRowProps) {
  const parts = useMemo(
    () => splitText(entry.text, entry.mode, entry.maxWords).length,
    [entry.text, entry.mode, entry.maxWords],
  )
  const words = useMemo(() => countWords(entry.text), [entry.text])

  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4">
      <div className="min-w-0 flex-1 space-y-1">
        <p dir="auto" className="truncate font-semibold text-ink">
          {entry.title}
        </p>
        <p className="tnum text-sm text-ink-muted">
          {parts} مقطع · {words} كلمة ·{' '}
          {entry.attempts > 0 ? `أفضل دقة ${formatPercent(entry.bestAccuracy)}` : 'لم تُكمل إملاءه بعد'}
        </p>
        <p dir="rtl" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
          <span>المرحلة: {STAGE_TITLE_AR[entry.stage]}</span>
          {isDue(entry.dueAt, now) ? (
            <Badge tone="highlight">حان وقت مراجعته من الذاكرة</Badge>
          ) : entry.dueAt !== null ? (
            <span>· المراجعة بعد {daysUntil(entry.dueAt, now)} يوم</span>
          ) : null}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {confirming ? (
          <>
            <span className="text-sm text-ink-muted">حذف «{entry.title}»؟</span>
            <Button variant="danger" size="sm" onClick={onConfirmDelete}>
              تأكيد الحذف
            </Button>
            <Button variant="ghost" size="sm" onClick={onCancelDelete}>
              إلغاء
            </Button>
          </>
        ) : (
          <>
            <Link to={`/my-text/${entry.id}`} className={outlineLinkClass}>
              تدرّب
            </Link>
            <Button variant="ghost" size="sm" icon={<Pencil size={16} aria-hidden="true" />} onClick={onEdit}>
              تعديل
            </Button>
            <Button variant="ghost" size="sm" icon={<Trash2 size={16} aria-hidden="true" />} onClick={onAskDelete}>
              حذف
            </Button>
          </>
        )}
      </div>
    </li>
  )
}
