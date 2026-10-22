import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/cn'
import { conjugationTable, irregularPresentIndexes, perfektForm, praeteritumForm } from '@/lib/verbs'
import type { VocabularyItem } from '@/types'

interface VerbFormsProps {
  item: VocabularyItem
  className?: string
}

/**
 * The conjugation of a verb: present tense (stem changes marked), Perfekt and — from A2 on —
 * Präteritum. A native `<details>`, so it opens by keyboard and is announced correctly without ARIA.
 * The table is built only while it is open: the vocabulary list holds hundreds of cards, and a closed
 * one should cost no more than its summary.
 */
export function VerbForms({ item, className }: VerbFormsProps) {
  const [open, setOpen] = useState(false)
  return (
    <details open={open} className={cn('group rounded-md border border-border', className)}>
      <summary
        onClick={(event) => {
          // The element's own toggle is replaced by state, so the body can be left out while closed.
          event.preventDefault()
          setOpen((current) => !current)
        }}
        className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-md px-3 text-sm font-semibold text-ink hover:bg-surface-sunken [&::-webkit-details-marker]:hidden"
      >
        <span dir="rtl">تصريف الفعل</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="text-ink-faint motion-safe:transition-transform group-open:rotate-180"
        />
      </summary>
      {open ? <VerbFormsBody item={item} /> : null}
    </details>
  )
}

function VerbFormsBody({ item }: { item: VocabularyItem }) {
  const rows = conjugationTable(item)
  const irregular = new Set(irregularPresentIndexes(item))
  const perfekt = perfektForm(item)
  // Präteritum is A2 grammar; showing it on an A1 word would run ahead of the curriculum.
  const praeteritum = item.level === 'A1' ? undefined : praeteritumForm(item)

  return (
    <div dir="ltr" lang="de" className="space-y-3 border-t border-border p-3">
      <table className="w-full text-start text-sm">
        <caption className="sr-only">Präsens: {item.word}</caption>
        <tbody className="divide-y divide-border">
          {rows.map((row, index) => (
            <tr key={row.pronoun}>
              <th scope="row" className="w-24 py-1.5 pe-2 text-start font-normal text-ink-muted">
                {row.pronoun}
              </th>
              <td className={cn('py-1.5 font-medium', irregular.has(index) ? 'text-accent' : 'text-ink')}>
                {row.form}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {perfekt || praeteritum ? (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-border pt-3 text-sm">
          {perfekt ? (
            <>
              <dt className="text-ink-muted">Perfekt</dt>
              <dd className="font-medium text-ink">er/sie/es {perfekt}</dd>
            </>
          ) : null}
          {praeteritum ? (
            <>
              <dt className="text-ink-muted">Präteritum</dt>
              <dd className="font-medium text-ink">er/sie/es {praeteritum}</dd>
            </>
          ) : null}
        </dl>
      ) : null}

      {irregular.size > 0 ? (
        <p dir="rtl" lang="ar" className="text-sm leading-7 text-ink-muted">
          الصيغ الملوّنة تخرج عن النمط المنتظم: يتغيّر جذع الفعل أو شكله.
        </p>
      ) : null}
    </div>
  )
}
