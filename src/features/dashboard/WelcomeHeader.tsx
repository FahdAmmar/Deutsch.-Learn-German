import { PageHeader } from '@/components/ui'
import { LevelMark } from '@/features/levels/LevelMark'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel } from '@/types'

interface WelcomeHeaderProps {
  currentLevel: CEFRLevel
}

export function WelcomeHeader({ currentLevel }: WelcomeHeaderProps) {
  const info = CEFR_LEVEL_INFO[currentLevel]

  return (
    <PageHeader
      title="مرحباً بعودتك"
      description={
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>مستواك الحالي</span>
          <LevelMark level={currentLevel} size="sm" />
          <span dir="ltr" lang="de" className="display-de text-start text-base font-medium text-ink-faint">
            {info.titleDe}
          </span>
        </span>
      }
    />
  )
}
