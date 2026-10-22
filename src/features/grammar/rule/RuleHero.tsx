import { ArrowDown, ArrowRight, CheckCircle2, Volume2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button } from '@/components/ui'
import { LEVEL_TONE } from '@/features/levels/levelTone'
import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import type { GrammarRule } from '@/types'

import { RichText } from './RichText'

interface RuleHeroProps {
  rule: GrammarRule
  onStart: () => void
}

export function RuleHero({ rule, onStart }: RuleHeroProps) {
  const { speak, isSpeaking, isSupported } = useSpeech()

  return (
    <header className="space-y-6">
      <Link
        to="/grammar"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowRight size={16} aria-hidden="true" />
        خارطة القواعد
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={LEVEL_TONE[rule.level]}>{rule.level}</Badge>
            <span dir="ltr" className="font-mono text-xs font-bold text-ink-faint">
              #{String(rule.number).padStart(2, '0')} / 70
            </span>
            <span className="text-sm font-semibold text-ink-muted">{rule.eyebrowAr}</span>
          </div>

          <h1 className="text-3xl leading-tight font-bold text-ink sm:text-5xl">
            {rule.titleAr}{' '}
            <span lang="de" dir="ltr" className="display-de text-accent">
              {rule.termDe}
            </span>
          </h1>

          <p className="max-w-[60ch] text-lg leading-loose text-ink-muted">
            <RichText text={rule.taglineAr} />
          </p>

          <div className="flex flex-wrap gap-3">
            <Button onClick={onStart} icon={<ArrowDown size={16} aria-hidden="true" />} iconPosition="end">
              ابدأ الدرس
            </Button>
            <Button
              variant="outline"
              disabled={!isSupported}
              onClick={() => speak(rule.heroExample.de, GERMAN_LOCALE)}
              icon={<Volume2 size={16} aria-hidden="true" className={cn(isSpeaking && 'animate-pulse')} />}
              aria-label={`استمع لمثال: ${rule.heroExample.de}`}
            >
              استمع لمثال
            </Button>
          </div>

          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            {rule.stats.map((stat) => (
              <div key={stat.labelAr}>
                <dt className="sr-only">{stat.labelAr}</dt>
                <dd>
                  <span dir="ltr" className="display-de block text-3xl text-ink">
                    {stat.value}
                  </span>
                  <span className="text-sm text-ink-faint">{stat.labelAr}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <aside aria-labelledby="objectives-title" className="space-y-4 rounded-lg border border-border bg-surface p-5 shadow-sm">
          <h2 id="objectives-title" className="text-base font-bold text-ink">
            ماذا ستتعلّم في هذا الدرس؟
          </h2>
          <ul className="space-y-2.5">
            {rule.objectivesAr.map((objective, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                <span>
                  <RichText text={objective} />
                </span>
              </li>
            ))}
          </ul>
          <p dir="ltr" lang="de" className="rounded-md bg-surface-muted p-3 font-de text-base font-semibold text-ink">
            {rule.heroExample.de}
            <span dir="rtl" lang="ar" className="mt-1 block font-sans text-sm font-normal text-ink-muted">
              {rule.heroExample.ar}
            </span>
          </p>
        </aside>
      </div>
    </header>
  )
}
