import { Check, CircleHelp, X } from 'lucide-react'

import { Badge } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { WritingCheck } from '@/lib/writing/check'
import type { WritingTask } from '@/types'

interface WritingCheckPanelProps {
  task: WritingTask
  check: WritingCheck
  /** Confirm (or take back) by hand a point the checker did not find. */
  onTogglePoint: (pointId: string) => void
}

/** One line of the report: a state in words and an icon, never colour alone. */
function Row({ ok, label, children }: { ok: boolean; label: string; children?: React.ReactNode }) {
  const Icon = ok ? Check : X
  return (
    <li className="flex items-start gap-3">
      <span
        className={cn('mt-0.5 grid size-6 shrink-0 place-items-center rounded-full', ok ? 'bg-success-muted text-success' : 'bg-error-muted text-error')}
      >
        <Icon size={14} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 space-y-1">
        <span className="block text-ink">{label}</span>
        {children}
      </span>
    </li>
  )
}

/**
 * What the check found in the learner's text. It looks for a greeting, a closing, the points and the length;
 * it does not judge grammar or spelling, and the panel says so. A point it misses can be confirmed by hand.
 */
export function WritingCheckPanel({ task, check, onTogglePoint }: WritingCheckPanelProps) {
  const formal = task.register === 'formal'

  return (
    <section aria-labelledby="writing-check-title" aria-live="polite" className="space-y-4 rounded-lg border border-border bg-surface p-4 sm:p-5">
      <h2 id="writing-check-title" className="font-sans text-lg font-bold text-ink">
        نتيجة الفحص
      </h2>

      <ul dir="rtl" className="space-y-3">
        <Row ok={check.enoughWords} label={`الطول: ${check.words} كلمة من ${task.minWords} مقترحة`} />
        <Row ok={check.greeting} label={formal ? 'تحية رسمية في البداية (Sehr geehrte… / Guten Tag)' : 'تحية في البداية (Hallo… / Liebe…)'} />
        <Row ok={check.closing} label={formal ? 'خاتمة رسمية (Mit freundlichen Grüßen)' : 'خاتمة ودّية (Liebe Grüße / Bis bald)'} />
        {task.points.map((point) => {
          const result = check.points.find((entry) => entry.id === point.id)
          const covered = Boolean(result?.found || result?.confirmed)
          return (
            <Row key={point.id} ok={covered} label={point.textAr}>
              {result?.found ? (
                <Badge tone="success">وجدتُ ما يدلّ عليها</Badge>
              ) : (
                <span className="flex flex-wrap items-center gap-2">
                  <Badge tone="neutral">لم أجدها في نصك</Badge>
                  <button
                    type="button"
                    aria-pressed={Boolean(result?.confirmed)}
                    onClick={() => onTogglePoint(point.id)}
                    className={cn(
                      'min-h-9 rounded-md border px-3 text-sm font-semibold transition-colors',
                      result?.confirmed
                        ? 'border-success bg-success-muted text-success'
                        : 'border-border-strong text-ink hover:bg-surface-sunken',
                    )}
                  >
                    {result?.confirmed ? 'أكّدتَ أنها موجودة' : 'عبّرتُ عنها بكلمات أخرى'}
                  </button>
                </span>
              )}
            </Row>
          )
        })}
      </ul>

      <p dir="rtl" className="flex items-start gap-2 rounded-md bg-surface-sunken p-3 text-sm leading-7 text-ink-muted">
        <CircleHelp size={18} className="mt-1 shrink-0 text-ink-faint" aria-hidden="true" />
        <span>
          هذا الفحص يبحث عن كلمات مفتاحية وعن التحية والخاتمة والطول فقط، ولا يصحّح النحو ولا الإملاء. وإن لم يجد نقطة عبّرتَ عنها
          بكلمات أخرى فأكّدها بنفسك. ثم قارن نصّك بالنموذج: هل ترتيب الفعل في الجمل صحيح؟ وهل كتبتَ الأسماء بحرف كبير؟
        </span>
      </p>
    </section>
  )
}
