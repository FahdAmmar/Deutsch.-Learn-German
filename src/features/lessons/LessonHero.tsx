import { CheckCircle2, Clock, Volume2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button, InlineMarkup } from '@/components/ui'
import { LevelMark } from '@/features/levels/LevelMark'
import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import type { Lesson } from '@/types'

interface LessonHeroProps {
  lesson: Lesson
  moduleTitleAr?: string
  completed: boolean
}

interface HeroStat {
  value: number
  labelAr: string
}

/** The numbers the learner can check the lesson against: what it holds, not how long to stare at it. */
function heroStats(lesson: Lesson): HeroStat[] {
  const stats: HeroStat[] = [
    { value: lesson.vocabulary.length, labelAr: 'كلمة وعبارة' },
    { value: lesson.examples.length, labelAr: 'مثال مسموع' },
    { value: lesson.exercises.length, labelAr: 'تمرين' },
  ]
  return stats.filter((stat) => stat.value > 0)
}

export function LessonHero({ lesson, moduleTitleAr, completed }: LessonHeroProps) {
  const { speak, isSpeaking, isSupported } = useSpeech()
  const stats = heroStats(lesson)
  const hero = lesson.heroExample

  return (
    <header dir="rtl" className="space-y-6 pb-6">
      <nav aria-label="مسار الصفحة" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
        <Link to="/levels" className="inline-flex items-center gap-2 hover:text-ink">
          <LevelMark level={lesson.level} size="sm" />
          <span className="font-semibold">الخطة الشاملة</span>
        </Link>
        {moduleTitleAr ? (
          <>
            <span aria-hidden="true">/</span>
            <span>{moduleTitleAr}</span>
          </>
        ) : null}
      </nav>

      <div className={cn('grid gap-6', hero && 'lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end')}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h1 dir="ltr" lang="de" className="display-de text-end text-4xl text-ink [overflow-wrap:anywhere] sm:text-5xl">
              {lesson.title}
            </h1>
            <p className="text-xl font-semibold text-ink-muted sm:text-2xl">{lesson.titleAr}</p>
          </div>

          {lesson.taglineAr ? (
            <p className="max-w-[60ch] text-lg leading-loose text-ink-muted">
              <InlineMarkup text={lesson.taglineAr} />
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
            <span className="flex items-center gap-1.5">
              <Clock size={15} aria-hidden="true" />
              <span className="tnum">{lesson.estimatedMinutes}</span> دقيقة تقريباً
            </span>
            {completed ? (
              <Badge tone="success">
                <CheckCircle2 size={13} aria-hidden="true" />
                مكتمل
              </Badge>
            ) : null}
          </div>

          {stats.length > 0 ? (
            <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
              {stats.map((stat) => (
                <div key={stat.labelAr}>
                  <dt className="sr-only">{stat.labelAr}</dt>
                  <dd>
                    <span dir="ltr" className="display-de tnum block text-3xl text-ink">
                      {stat.value}
                    </span>
                    <span className="text-sm text-ink-faint">{stat.labelAr}</span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {hero ? (
          <aside
            aria-label="الدرس في جملة واحدة"
            className="space-y-3 rounded-lg border border-border bg-surface p-5 shadow-sm"
          >
            <p dir="ltr" lang="de" className="font-de text-xl font-semibold leading-snug text-ink">
              {hero.de}
            </p>
            <p className="text-sm leading-relaxed text-ink-muted">{hero.ar}</p>
            <Button
              variant="outline"
              size="sm"
              disabled={!isSupported}
              onClick={() => speak(hero.de, GERMAN_LOCALE)}
              icon={<Volume2 size={16} aria-hidden="true" className={cn(isSpeaking && 'animate-pulse')} />}
              aria-label={`استمع لمثال: ${hero.de}`}
            >
              استمع
            </Button>
          </aside>
        ) : null}
      </div>
    </header>
  )
}
