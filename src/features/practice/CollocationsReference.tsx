import { COLLOCATIONS } from '@/data/collocations'
import { GermanWord } from '@/features/pronunciation/GermanWord'

import { ReferenceDetails } from './ReferenceDetails'

/** The verb-and-noun combinations, with the verb a learner would wrongly choose and a sentence for each. */
export function CollocationsReference() {
  return (
    <ReferenceDetails
      title="التلازمات اللفظية: أي فعل مع أي اسم؟"
      description={`ein Foto machen لا nehmen. شاهد ${COLLOCATIONS.length} تعبيراً مع الفعل الذي يُستعمل خطأً بدلاً منه.`}
    >
      <p dir="rtl" className="text-sm leading-7 text-ink-muted">
        الفعل الألماني لا يُختار بالترجمة الحرفية. تُحفظ العبارة كلها: الاسم مع فعله.
      </p>
      <ul className="grid gap-3 md:grid-cols-2">
        {COLLOCATIONS.map((entry) => (
          <li key={entry.id} className="space-y-2 rounded-md border border-border p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <GermanWord word={entry.phrase} size="lg" />
              <span dir="rtl" className="text-sm text-ink-muted">
                {entry.meaningAr}
              </span>
            </div>
            <p dir="rtl" className="text-xs leading-6 text-ink-faint">
              ليس: <span lang="de" dir="ltr" className="font-semibold line-through">{`${entry.object} ${entry.wrongVerb}`}</span>
            </p>
            {entry.noteAr ? (
              <p dir="rtl" className="text-sm leading-6 text-ink-muted">
                {entry.noteAr}
              </p>
            ) : null}
            <div className="space-y-0.5 border-t border-border pt-2">
              <GermanWord word={entry.example.de} size="sm" />
              <p dir="rtl" className="text-xs text-ink-faint">
                {entry.example.ar}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </ReferenceDetails>
  )
}
