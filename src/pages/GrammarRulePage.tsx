import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui'
import { GrammarRuleView } from '@/features/grammar/rule/GrammarRuleView'
import { RuleNeighborNav } from '@/features/grammar/rule/RuleNeighborNav'
import { useGrammarRule } from '@/features/grammar/rule/useGrammarRule'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'
import { getRoadmapEntry } from '@/lib/grammarRoadmap'

import NotFoundPage from './NotFoundPage'
import { PageLoader } from '@/components/ui/PageLoader'

function isCefrLevel(value: string): value is CEFRLevel {
  return (CEFR_LEVELS as readonly string[]).includes(value)
}

export default function GrammarRulePage() {
  const { level, slug } = useParams<{ level: string; slug: string }>()
  const normalizedLevel = level?.toUpperCase() ?? ''
  const entry = slug && isCefrLevel(normalizedLevel) ? getRoadmapEntry(normalizedLevel, slug) : undefined

  const state = useGrammarRule(entry?.number)

  if (!entry) return <NotFoundPage />
  if (state.status === 'loading') return <PageLoader />

  if (state.status === 'unavailable') {
    return (
      <div dir="rtl" className="space-y-6 pb-10">
        <div className="space-y-3 rounded-lg border border-dashed border-border-strong p-8 text-center">
          <p dir="ltr" lang="de" className="font-mono text-sm text-ink-faint">
            #{String(entry.number).padStart(2, '0')} · {entry.termDe}
          </p>
          <h1 className="text-2xl font-bold text-ink">{entry.titleAr}</h1>
          <p className="text-ink-muted">هذا الدرس قيد الإعداد وسيُنشر قريباً بنفس ترتيب الخارطة.</p>
          <Link to="/grammar">
            <Button variant="outline">العودة إلى خارطة القواعد</Button>
          </Link>
        </div>
        <RuleNeighborNav number={entry.number} />
      </div>
    )
  }

  return <GrammarRuleView rule={state.rule} />
}
