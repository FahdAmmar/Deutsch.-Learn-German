import { Dumbbell } from 'lucide-react'

import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import type { PracticeBlock } from '@/types'

export function PracticeView({ block }: { block: PracticeBlock }) {
  return (
    <section
      aria-label={block.titleAr}
      className="space-y-4 rounded-lg border border-accent/30 bg-accent-muted/30 p-4 sm:p-5"
    >
      <header className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-muted text-accent">
          <Dumbbell size={20} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-base font-bold text-ink">{block.titleAr}</h3>
          {block.descriptionAr ? <p className="text-sm text-ink-muted">{block.descriptionAr}</p> : null}
        </div>
      </header>
      <ExerciseRunner exercises={block.exercises} />
    </section>
  )
}
