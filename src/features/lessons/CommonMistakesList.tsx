import { ArrowLeft, X, Check } from 'lucide-react'

interface CommonMistake {
  wrong: string
  correct: string
  explanationAr: string
}

interface CommonMistakesListProps {
  mistakes: CommonMistake[]
}

export function CommonMistakesList({ mistakes }: CommonMistakesListProps) {
  return (
    <ul className="space-y-3">
      {mistakes.map((mistake, index) => (
        <li key={index} className="rounded-md border border-border bg-surface p-3">
          <div dir="ltr" className="flex flex-wrap items-center gap-2 text-sm">
            <span className="flex items-center gap-1 text-error line-through decoration-error/70">
              <X size={14} aria-hidden="true" />
              {mistake.wrong}
            </span>
            <ArrowLeft size={14} className="text-ink-faint rtl:rotate-180" aria-hidden="true" />
            <span className="flex items-center gap-1 font-medium text-success">
              <Check size={14} aria-hidden="true" />
              {mistake.correct}
            </span>
          </div>
          <p dir="rtl" className="mt-1.5 text-sm text-ink-muted">
            {mistake.explanationAr}
          </p>
        </li>
      ))}
    </ul>
  )
}
