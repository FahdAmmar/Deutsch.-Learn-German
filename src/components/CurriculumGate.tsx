import { WifiOff } from 'lucide-react'
import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageLoader } from '@/components/ui/PageLoader'
import { LEVELS_WITH_CONTENT } from '@/data/curriculum'
import { useCurriculumLevels } from '@/hooks/useCurriculumLevels'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

interface CurriculumGateProps {
  /** Levels the screen needs. Defaults to every level with content. */
  levels?: readonly CEFRLevel[]
  /** Name of a route param holding the level (e.g. `level`); only that level is loaded. An invalid value loads nothing so the page can show its own not-found. */
  levelParam?: string
  /** With `levelParam`: also load every level below it, for a screen that looks words up across levels (A2 builds on A1). */
  includeLowerLevels?: boolean
  children: ReactNode
}

function parseLevel(value: string | undefined): CEFRLevel | undefined {
  const upper = value?.toUpperCase()
  return CEFR_LEVELS.find((level) => level === upper)
}

function requiredForParam(level: CEFRLevel | undefined, includeLowerLevels: boolean | undefined): CEFRLevel[] {
  if (!level) return []
  if (!includeLowerLevels) return [level]
  return LEVELS_WITH_CONTENT.filter((each) => CEFR_LEVELS.indexOf(each) <= CEFR_LEVELS.indexOf(level))
}

/** Holds a screen back until the curriculum it reads synchronously has been fetched. */
export function CurriculumGate({ levels, levelParam, includeLowerLevels, children }: CurriculumGateProps) {
  const params = useParams()
  const fromParam = levelParam ? parseLevel(params[levelParam]) : undefined
  const required = levelParam ? requiredForParam(fromParam, includeLowerLevels) : (levels ?? LEVELS_WITH_CONTENT)
  const { status, retry } = useCurriculumLevels(required)

  if (status === 'ready') return <>{children}</>
  if (status === 'loading') return <PageLoader />

  return (
    <EmptyState
      icon={WifiOff}
      title="تعذّر تحميل محتوى الدروس"
      action={<Button onClick={retry}>إعادة المحاولة</Button>}
    >
      تحقّق من اتصالك بالإنترنت ثم حاول مرة أخرى.
    </EmptyState>
  )
}
