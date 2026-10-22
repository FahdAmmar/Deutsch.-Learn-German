import { cn } from '@/lib/cn'

interface ChunkRailProps {
  total: number
  /** Index of the part being typed. */
  current: number
  /** The current part is finished (it counts as done while the next one has not appeared yet). */
  currentDone: boolean
}

/** Past this many parts the capsules would be slivers — the caller falls back to a plain progress bar. */
export const MAX_RAIL_PARTS = 40

/**
 * The text as a row of capsules, one per part: finished ones filled, the
 * current one lit, the rest empty. It shows where you are in the whole text at
 * a glance, which a single bar cannot. Decorative: the part count is also
 * written out next to it.
 */
export function ChunkRail({ total, current, currentDone }: ChunkRailProps) {
  return (
    <div dir="ltr" aria-hidden="true" className="flex h-2 items-stretch gap-1">
      {Array.from({ length: total }, (_, index) => {
        const done = index < current || (index === current && currentDone)
        return (
          <span
            key={index}
            className={cn(
              'flex-1 rounded-full transition-colors duration-300',
              done ? 'bg-success' : index === current ? 'bg-accent' : 'bg-border',
            )}
          />
        )
      })}
    </div>
  )
}
