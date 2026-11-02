import type { ReactNode } from 'react'

interface PracticeGroupProps {
  title: string
  description: string
  children: ReactNode
}

/** A titled grid of practice cards. */
export function PracticeGroup({ title, description, children }: PracticeGroupProps) {
  return (
    <section className="space-y-4">
      <div dir="rtl" className="space-y-1">
        <h2 className="font-sans text-xl font-bold text-ink">{title}</h2>
        <p className="text-ink-muted">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    </section>
  )
}
