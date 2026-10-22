import { cn } from '@/lib/cn'
import { STAGE_DESCRIPTION_AR, STAGE_TITLE_AR } from '@/lib/dictation/stages'
import { PRACTICE_STAGES, type PracticeStage } from '@/types'

interface StagePickerProps {
  /** The stage being practised now. */
  value: PracticeStage
  /** The stage the text has reached: the one a pass moves up from. */
  reached: PracticeStage
  onChange: (stage: PracticeStage) => void
}

/**
 * The four stages as one choice. Native radio buttons, so the arrow keys and the group label work without any
 * ARIA of our own; the cards are only their look.
 */
export function StagePicker({ value, reached, onChange }: StagePickerProps) {
  return (
    <fieldset className="space-y-3">
      <legend dir="rtl" className="text-sm font-semibold text-ink-muted">
        مرحلة التدريب
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PRACTICE_STAGES.map((stage, index) => (
          <label key={stage} className="relative block cursor-pointer">
            <input
              type="radio"
              name="practice-stage"
              value={stage}
              checked={value === stage}
              onChange={() => onChange(stage)}
              className="peer sr-only"
            />
            <span
              dir="rtl"
              className={cn(
                'flex h-full min-h-16 flex-col gap-0.5 rounded-lg border border-border bg-surface px-3 py-2.5 transition-colors',
                'hover:bg-surface-sunken active:scale-[0.98] motion-reduce:active:scale-100',
                'peer-checked:border-accent peer-checked:bg-accent-muted peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface',
              )}
            >
              <span className="tnum text-xs text-ink-faint">المرحلة {index + 1}</span>
              <span className="font-semibold text-ink">{STAGE_TITLE_AR[stage]}</span>
              {stage === reached ? <span className="text-xs font-medium text-accent">مرحلتك الآن</span> : null}
            </span>
          </label>
        ))}
      </div>
      <p dir="rtl" className="text-sm leading-7 text-ink-muted">
        {STAGE_DESCRIPTION_AR[value]}
        {value !== reached
          ? ' (لا تُحسب نتيجتها في الانتقال إلى المرحلة التالية، لأنها ليست مرحلتك الآن.)'
          : ' أكمل المقاطع بدقة 90٪ فأكثر لتنتقل إلى المرحلة التالية.'}
      </p>
    </fieldset>
  )
}
