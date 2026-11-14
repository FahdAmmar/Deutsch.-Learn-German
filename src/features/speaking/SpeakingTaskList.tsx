import { Link } from 'react-router-dom'

import { Card } from '@/components/ui'
import type { SpeakingKind, SpeakingTask } from '@/types'

const KIND_INFO: Record<SpeakingKind, { titleAr: string; hintAr: string }> = {
  talk: { titleAr: 'أتحدث', hintAr: 'عدة نقاط تتحدث عنها بجمل كاملة: نفسك أو عائلتك أو عطلتك أو خطة مشتركة.' },
  question: { titleAr: 'أسأل', hintAr: 'بطاقة فيها موضوع وكلمة سؤال: كوّن سؤالاً كاملاً.' },
  request: { titleAr: 'أطلب', hintAr: 'موقف حقيقي تطلب فيه شيئاً بأدب.' },
}

const KIND_ORDER: readonly SpeakingKind[] = ['talk', 'question', 'request']

interface SpeakingTaskListProps {
  tasks: readonly SpeakingTask[]
}

/** The tasks of a level, grouped by what the learner does in them: talk, ask, request. */
export function SpeakingTaskList({ tasks }: SpeakingTaskListProps) {
  return (
    <div className="space-y-8">
      {KIND_ORDER.map((kind) => {
        const ofKind = tasks.filter((task) => task.kind === kind)
        if (ofKind.length === 0) return null
        const info = KIND_INFO[kind]
        return (
          <section key={kind} aria-labelledby={`speaking-${kind}`} className="space-y-3">
            <div dir="rtl" className="space-y-1">
              <h2 id={`speaking-${kind}`} className="font-sans text-xl font-bold text-ink">
                {info.titleAr}
              </h2>
              <p className="text-ink-muted">{info.hintAr}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {ofKind.map((task) => (
                <li key={task.id}>
                  <Card interactive className="h-full">
                    <Link to={`/practice/speaking/${task.id}`} className="block h-full space-y-1 rounded-lg p-4">
                      <span dir="rtl" className="block font-sans text-lg font-bold text-ink">
                        {task.titleAr}
                      </span>
                      <span dir="ltr" lang="de" className="display-de block text-start text-ink-muted">
                        {task.titleDe}
                      </span>
                    </Link>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
