import { SpeakableGerman } from './SpeakableGerman'
import { RichText } from './RichText'
import type { CheatSheetItem } from '@/types'

export function CheatSheet({ items }: { items: CheatSheetItem[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <dt>
            <SpeakableGerman text={item.de} className="font-semibold text-primary" />
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-ink-muted">
            <RichText text={item.ar} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
