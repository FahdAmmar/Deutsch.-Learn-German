import { cn } from '@/lib/cn'
import type { OrderRole } from '@/types'

import { ROLE_STYLE } from './orderRoles'

export interface StructureChunk {
  text: string
  role: OrderRole
}

interface SentenceStructureProps {
  chunks: readonly StructureChunk[]
  className?: string
}

/**
 * A sentence as blocks, one per part, with the role named under each. Laid out left to right like the
 * German text; the names are Arabic, so each carries its own direction.
 */
export function SentenceStructure({ chunks, className }: SentenceStructureProps) {
  return (
    <ol dir="ltr" className={cn('flex flex-wrap items-start gap-2', className)}>
      {chunks.map((chunk, position) => {
        const style = ROLE_STYLE[chunk.role]
        return (
          <li key={`${chunk.text}-${position}`} className="space-y-1.5 text-center">
            <span lang="de" className={cn('display-de block rounded-sm border-b-4 px-3 py-1.5 text-lg', style.className)}>
              {chunk.text}
            </span>
            <span dir="rtl" className="block text-xs text-ink-muted">
              {style.labelAr}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
