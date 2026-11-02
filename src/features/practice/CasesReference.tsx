import { ArticleText } from '@/components/ui'
import {
  adjectiveEnding,
  CASE_QUESTION,
  determiner,
  GERMAN_CASES,
  type Column,
  type DeterminerKind,
} from '@/lib/generators/cases'

import { ReferenceDetails } from './ReferenceDetails'

const COLUMNS: readonly { column: Column; labelAr: string; example: string }[] = [
  { column: 'm', labelAr: 'مذكّر', example: 'der' },
  { column: 'f', labelAr: 'مؤنّث', example: 'die' },
  { column: 'n', labelAr: 'محايد', example: 'das' },
  { column: 'pl', labelAr: 'جمع', example: 'die' },
]

const CASE_LABEL: Record<(typeof GERMAN_CASES)[number], string> = {
  nominativ: 'Nominativ',
  akkusativ: 'Akkusativ',
  dativ: 'Dativ',
  genitiv: 'Genitiv',
}

interface ParadigmTableProps {
  caption: string
  cell: (caseName: (typeof GERMAN_CASES)[number], column: Column) => string
  /** Cells that carry the case in this table, set in bold: the ones that are not simply -en. */
  emphasise?: (value: string) => boolean
}

/** One table of the paradigm: the four cases down the side, the three genders and the plural across. */
function ParadigmTable({ caption, cell, emphasise }: ParadigmTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table dir="ltr" className="w-full min-w-[28rem] border-collapse text-center text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface-sunken text-ink-muted">
          <tr>
            <th scope="col" className="px-3 py-2 text-start font-semibold">
              <span dir="rtl">الحالة</span>
            </th>
            {COLUMNS.map(({ column, labelAr }) => (
              <th key={column} scope="col" className="px-3 py-2 font-semibold">
                <span dir="rtl">{labelAr}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {GERMAN_CASES.map((caseName) => (
            <tr key={caseName} className="border-t border-border">
              <th scope="row" className="px-3 py-2 text-start font-medium text-ink">
                <span lang="de" className="display-de block">
                  {CASE_LABEL[caseName]}
                </span>
                <span lang="de" className="block text-xs font-normal text-ink-faint">
                  {CASE_QUESTION[caseName]}
                </span>
              </th>
              {COLUMNS.map(({ column }) => {
                const value = cell(caseName, column)
                return (
                  <td key={column} lang="de" className={`display-de px-3 py-2 ${emphasise?.(value) ? 'font-bold text-ink' : 'text-ink-muted'}`}>
                    <ArticleText text={value} />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const articleCell = (kind: DeterminerKind) => (caseName: (typeof GERMAN_CASES)[number], column: Column) => determiner(kind, caseName, column) ?? '—'
const endingCell = (kind: DeterminerKind) => (caseName: (typeof GERMAN_CASES)[number], column: Column) => `-${adjectiveEnding(kind, caseName, column)}`

/**
 * The tables behind the case drills: which article follows each case, and which ending an adjective takes
 * after it. They are drawn from the same lists the drills use, so the page and the questions cannot disagree.
 */
export function CasesReference() {
  return (
    <ReferenceDetails
      title="جداول الحالات: الأدوات ونهايات الصفات"
      description="كيف تتغيّر der وdie وdas وein في كل حالة، وأي نهاية تأخذها الصفة بعدها."
    >
      <div className="space-y-2">
        <h3 dir="rtl" className="font-sans text-base font-bold text-ink">
          أداة التعريف
        </h3>
        <ParadigmTable caption="أداة التعريف في الحالات الأربع" cell={articleCell('definite')} />
        <p dir="rtl" className="text-sm leading-7 text-ink-muted">
          المؤنّث والجمع يتغيّران قليلاً: die تبقى die في Akkusativ. أما المذكّر فهو الذي يتغيّر أكثر: der ← den ← dem ← des. وفي جمع Dativ
          يأخذ الاسم ‎-n‎ (den Kindern) إلا إذا كان جمعه ينتهي بـ n أو s.
        </p>
      </div>

      <div className="space-y-2">
        <h3 dir="rtl" className="font-sans text-base font-bold text-ink">
          أداة التنكير ein وkein
        </h3>
        <ParadigmTable caption="أداة التنكير ein في الحالات الأربع، وليس لها جمع" cell={articleCell('indefinite')} />
        <p dir="rtl" className="text-sm leading-7 text-ink-muted">
          ein ليس لها جمع. وتأخذ kein وmein وdein (الضمائر الملكية) النهايات نفسها، ولها جمع: keine Kinder.
        </p>
      </div>

      <div className="space-y-2">
        <h3 dir="rtl" className="font-sans text-base font-bold text-ink">
          نهاية الصفة بعد der / die / das
        </h3>
        <ParadigmTable caption="نهايات الصفة بعد أداة التعريف" cell={endingCell('definite')} emphasise={(value) => value !== '-en'} />
        <p dir="rtl" className="text-sm leading-7 text-ink-muted">
          النهاية ‎-e‎ في خمس خانات فقط (الخانات الغامقة)، وفي كل ما عداها ‎-en‎: der große Tisch، den großen Tisch، mit dem großen Tisch.
        </p>
      </div>

      <div className="space-y-2">
        <h3 dir="rtl" className="font-sans text-base font-bold text-ink">
          نهاية الصفة بعد ein / kein
        </h3>
        <ParadigmTable caption="نهايات الصفة بعد ein وkein" cell={endingCell('indefinite')} emphasise={(value) => value !== '-en'} />
        <p dir="rtl" className="text-sm leading-7 text-ink-muted">
          القاعدة نفسها، إلا حيث تأتي الأداة بلا نهاية: ein في Nominativ للمذكّر والمحايد وفي Akkusativ للمحايد. هناك تظهر النهاية على الصفة:
          ein großer Tisch، ein großes Haus.
        </p>
      </div>
    </ReferenceDetails>
  )
}
