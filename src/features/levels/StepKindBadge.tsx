import { BookMarked, BookOpen, BookOpenText, MessagesSquare } from 'lucide-react'

import { Badge } from '@/components/ui'
import type { PathStepKind } from '@/types'

import { STEP_KIND_LABEL } from './stepInfo'

const ICON_PROPS = { size: 13, 'aria-hidden': true } as const

const TONE: Record<PathStepKind, 'primary' | 'plum' | 'highlight' | 'accent'> = {
  lesson: 'primary',
  rule: 'plum',
  reading: 'highlight',
  conversation: 'accent',
}

function KindIcon({ kind }: { kind: PathStepKind }) {
  switch (kind) {
    case 'lesson':
      return <BookMarked {...ICON_PROPS} />
    case 'rule':
      return <BookOpen {...ICON_PROPS} />
    case 'reading':
      return <BookOpenText {...ICON_PROPS} />
    case 'conversation':
      return <MessagesSquare {...ICON_PROPS} />
  }
}

/** The kind of a plan step, named in words (an icon alone would not say whether a row is a rule or a text). */
export function StepKindBadge({ kind }: { kind: PathStepKind }) {
  return (
    <Badge tone={TONE[kind]} className="shrink-0 gap-1">
      <KindIcon kind={kind} />
      {STEP_KIND_LABEL[kind]}
    </Badge>
  )
}
