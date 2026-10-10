import { Check, Lock } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * The route: a line with stops, used wherever content is a genuine sequence — levels,
 * modules, the sections of a lesson. Done stops are filled, the current stop is ringed in
 * copper, the rest are hollow. It is deliberately not used for unordered content.
 */
export type RouteState = 'done' | 'current' | 'upcoming' | 'locked'

const NODE_SIZE = 'h-7 w-7'

export function RouteList({ className, children, ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className={cn('relative', className)} {...props}>
      {children}
    </ol>
  )
}

interface RouteItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
  state: RouteState
  /** Replaces the default node glyph (e.g. a module number). Ignored for `done` and `locked`. */
  marker?: ReactNode
  /** Last stop: no line continues below it. */
  last?: boolean
  children: ReactNode
}

export function RouteItem({ state, marker, last, className, children, ...props }: RouteItemProps) {
  return (
    <li className={cn('relative ps-11', !last && 'pb-6', className)} {...props}>
      {!last ? (
        <span
          aria-hidden="true"
          className={cn(
            'absolute start-[13px] top-8 -bottom-1 w-0.5 rounded-full',
            state === 'done' ? 'bg-success/50' : 'bg-rail',
          )}
        />
      ) : null}
      <RouteNode state={state} marker={marker} />
      {children}
    </li>
  )
}

function RouteNode({ state, marker }: { state: RouteState; marker?: ReactNode }) {
  const base = cn('absolute start-0 top-0 flex items-center justify-center rounded-full text-xs font-bold', NODE_SIZE)

  if (state === 'done') {
    return (
      <span aria-hidden="true" className={cn(base, 'bg-success text-success-foreground')}>
        <Check size={15} strokeWidth={3} />
      </span>
    )
  }
  if (state === 'current') {
    return (
      <span aria-hidden="true" className={cn(base, 'tnum border-2 border-accent bg-surface text-accent')}>
        {marker ?? <span className="h-2.5 w-2.5 rounded-full bg-accent-vivid" />}
      </span>
    )
  }
  if (state === 'locked') {
    return (
      <span aria-hidden="true" className={cn(base, 'border-2 border-dashed border-rail bg-surface text-ink-faint')}>
        <Lock size={12} />
      </span>
    )
  }
  return (
    <span aria-hidden="true" className={cn(base, 'tnum border-2 border-rail bg-surface text-ink-faint')}>
      {marker}
    </span>
  )
}
