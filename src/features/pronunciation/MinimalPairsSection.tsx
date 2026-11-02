import { Link } from 'react-router-dom'

import { Card } from '@/components/ui'
import { CONTRAST_GROUPS, MINIMAL_PAIRS, type MinimalPair, type MinimalPairWord } from '@/data/minimalPairs'

import { GermanWord } from './GermanWord'

function PairWord({ entry }: { entry: MinimalPairWord }) {
  return (
    <div className="min-w-0 space-y-1">
      <GermanWord word={entry.word} size="lg" />
      <p dir="rtl" className="text-sm text-ink-muted">
        {entry.article ? (
          <span lang="de" dir="ltr" className="display-de me-1 font-medium text-ink">
            {entry.article}
          </span>
        ) : null}
        {entry.meaningAr}
      </p>
    </div>
  )
}

function PairCard({ pair }: { pair: MinimalPair }) {
  return (
    <li>
      <Card className="h-full">
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
            <PairWord entry={pair.a} />
            <span dir="rtl" className="pt-1 text-xs font-semibold text-ink-faint">
              مقابل
            </span>
            <PairWord entry={pair.b} />
          </div>
          <p dir="rtl" className="mt-auto border-t border-border pt-3 text-sm text-ink-muted">
            {pair.differenceAr}
          </p>
        </div>
      </Card>
    </li>
  )
}

/**
 * Pairs of words that differ in one sound, grouped by the contrast they train. The learner plays each
 * word and listens for the difference; the "which word did you hear?" drill lives with the other practice modes.
 */
export function MinimalPairsSection() {
  return (
    <section aria-labelledby="pron-minimal-pairs" className="space-y-6">
      <div dir="rtl" className="space-y-1">
        <h2 id="pron-minimal-pairs" className="font-sans text-xl font-bold text-ink">
          أزواج صوتية: اسمع الفرق
        </h2>
        <p className="text-ink-muted">
          كلمتان ألمانيتان تختلفان في صوت واحد فقط، وهذا الصوت يغيّر المعنى. اضغط على كل كلمة واستمع، ثم كرّر الفرق بصوتك.
          جودة النطق تعتمد على صوت جهازك؛ إن لم تسمع الفرق بوضوح فجرّب صوتاً آخر من الإعدادات.
        </p>
        <p className="text-ink-muted">
          وللتدرّب على التمييز بالأذن، افتح{' '}
          <Link to="/practice" className="font-semibold text-primary underline underline-offset-4">
            صفحة التمارين
          </Link>{' '}
          واختر «أزواج صوتية».
        </p>
      </div>

      {CONTRAST_GROUPS.map((group) => {
        const pairs = MINIMAL_PAIRS.filter((pair) => pair.contrast === group.id)
        return (
          <div key={group.id} className="space-y-3">
            <div dir="rtl" className="space-y-1">
              <h3 className="font-sans text-lg font-bold text-ink">{group.titleAr}</h3>
              <p className="text-sm leading-7 text-ink-muted">{group.explanationAr}</p>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {pairs.map((pair) => (
                <PairCard key={pair.id} pair={pair} />
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}
