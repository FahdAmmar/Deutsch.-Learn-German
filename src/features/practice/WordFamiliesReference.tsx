import { WORD_FAMILIES } from '@/data/wordFamilies'
import { GermanWord } from '@/features/pronunciation/GermanWord'

import { ReferenceDetails } from './ReferenceDetails'
import { displayWord } from './wordFamilyDrill'

/** Each family: the root, and the words that grow from it with their meanings. */
export function WordFamiliesReference() {
  return (
    <ReferenceDetails
      title="عائلات الكلمات: كلمة واحدة وجذر واحد"
      description={`fahren ← die Fahrt، der Fahrer، abfahren. ${WORD_FAMILIES.length} عائلة، تتعلّم منها كلمات كثيرة دفعة واحدة.`}
    >
      <p dir="rtl" className="text-sm leading-7 text-ink-muted">
        الألمانية تبني كلمات جديدة من جذر واحد بإضافة بادئة أو كلمة أخرى. إذا عرفت الجذر، فهمتَ معنى أخواته، وحفظتَها أسرع.
      </p>
      <ul className="grid gap-3 md:grid-cols-2">
        {WORD_FAMILIES.map((family) => (
          <li key={family.id} className="space-y-2 rounded-md border border-border p-3">
            <h3 lang="de" dir="ltr" className="display-de text-lg font-semibold text-ink">
              {family.root}
            </h3>
            <ul className="space-y-1">
              {family.members.map((member) => (
                <li key={member.word} className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <GermanWord word={displayWord(member)} />
                  <span dir="rtl" className="text-sm text-ink-muted">
                    {member.meaningAr}
                  </span>
                </li>
              ))}
            </ul>
            <p dir="rtl" className="border-t border-border pt-2 text-xs leading-6 text-ink-faint">
              {family.noteAr}
            </p>
          </li>
        ))}
      </ul>
    </ReferenceDetails>
  )
}
