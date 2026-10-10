import { EmptyState } from '@/components/ui'
import type { Story } from '@/types'

import { StoryCard } from './StoryCard'

interface StoryListProps {
  stories: Story[]
}

/** The "texts & conversations" tab: reading texts first, then conversations. */
export function StoryList({ stories }: StoryListProps) {
  if (stories.length === 0) {
    return <EmptyState title="لا توجد نصوص ولا محادثات بعد">ستظهر نصوص هذا المستوى ومحادثاته هنا.</EmptyState>
  }

  const readings = stories.filter((story) => story.kind === 'reading')
  const dialogues = stories.filter((story) => story.kind === 'dialogue')

  return (
    <div className="space-y-10">
      <StoryGroup id="stories-readings" title="نصوص للقراءة" stories={readings} />
      <StoryGroup id="stories-dialogues" title="محادثات" stories={dialogues} />
    </div>
  )
}

function StoryGroup({ id, title, stories }: { id: string; title: string; stories: Story[] }) {
  if (stories.length === 0) return null

  return (
    <section aria-labelledby={id} className="space-y-4">
      <h2 id={id} className="flex items-center gap-2 font-sans text-lg font-bold text-ink">
        {title}
        <span className="tnum rounded-md bg-surface-sunken px-2 py-0.5 text-sm font-semibold text-ink-muted">{stories.length}</span>
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {stories.map((story) => (
          <li key={story.id}>
            <StoryCard story={story} />
          </li>
        ))}
      </ul>
    </section>
  )
}
