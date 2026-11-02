import { ChevronDown } from 'lucide-react'

import { ArticleText } from '@/components/ui'
import { COMPOUNDS } from '@/data/compounds'
import { GermanWord } from '@/features/pronunciation/GermanWord'

/**
 * Compound nouns taken apart: each row shows the two parts with their articles and the compound they
 * make, so the rule "the last part gives the article" is seen, not only read. A native `<details>`,
 * closed until the learner wants it, like the other references on this page.
 */
export function CompoundsReference() {
  return (
    <details className="group rounded-lg border border-border bg-surface">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 hover:bg-surface-sunken [&::-webkit-details-marker]:hidden">
        <span dir="rtl" className="space-y-0.5">
          <span className="block font-sans text-base font-bold text-ink">الكلمات المركّبة: الأداة للجزء الأخير</span>
          <span className="block text-sm text-ink-muted">
            die Hand + der Schuh = der Handschuh. شاهد {COMPOUNDS.length} كلمة مركّبة مفكّكة إلى أجزائها.
          </span>
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="shrink-0 text-ink-faint motion-safe:transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="space-y-4 border-t border-border p-4">
        <p dir="rtl" className="text-sm leading-7 text-ink-muted">
          في الكلمة المركّبة العادية تتبع الأداة الجزء الأخير منها، مهما كان الجزء الأول. وفي بعض الكلمات يتغيّر الجزء
          الأول عند التركيب: تسقط نهاية (Schule ← Schul-)، أو يُضاف حرف رابط (Arbeit ← Arbeits-)، أو يأتي بالجمع (Kind ←
          Kinder-). لا توجد قاعدة تحدّد الحرف الرابط، فتُحفظ الكلمة كما هي.
        </p>

        <ul className="grid gap-3 md:grid-cols-2">
          {COMPOUNDS.map((entry) => (
            <li key={entry.id} className="rounded-md border border-border p-3">
              <p lang="de" dir="ltr" className="display-de flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
                <ArticleText text={`${entry.first.article} ${entry.first.word}`} />
                <span aria-hidden="true">+</span>
                <ArticleText text={`${entry.second.article} ${entry.second.word}`} />
                <span aria-hidden="true">=</span>
              </p>
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-3">
                <GermanWord word={`${entry.article} ${entry.word}`} size="lg" />
                <span dir="rtl" className="text-sm text-ink-muted">
                  {entry.meaningAr}
                </span>
              </div>
              {entry.joinNoteAr ? (
                <p dir="rtl" className="mt-2 text-xs leading-6 text-ink-faint">
                  {entry.joinNoteAr}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}
