import { ChevronDown } from 'lucide-react'

import { REGISTER_FORMS } from '@/data/registers'

/** du and Sie side by side. A native `<details>`, closed until the learner wants the table. */
export function RegisterReference() {
  return (
    <details className="group rounded-lg border border-border bg-surface">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 hover:bg-surface-sunken [&::-webkit-details-marker]:hidden">
        <span dir="rtl" className="space-y-0.5">
          <span className="block font-sans text-base font-bold text-ink">du وSie جنباً إلى جنب</span>
          <span className="block text-sm text-ink-muted">
            كل صيغ المخاطَب في الصيغتين: الضمير والملكية والفعل والأمر.
          </span>
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="shrink-0 text-ink-faint motion-safe:transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="overflow-x-auto border-t border-border p-4">
        <table className="w-full min-w-[22rem] text-start">
          <caption className="sr-only">الصيغة الودّية والصيغة الرسمية</caption>
          <thead>
            <tr className="text-sm text-ink-muted">
              <th scope="col" dir="rtl" className="py-2 pe-4 text-start font-semibold">
                الاستعمال
              </th>
              <th scope="col" className="py-2 pe-4 text-start font-semibold">
                du
              </th>
              <th scope="col" className="py-2 text-start font-semibold">
                Sie
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {REGISTER_FORMS.map((row) => (
              <tr key={row.labelAr}>
                <th scope="row" dir="rtl" className="py-2.5 pe-4 text-start font-normal text-ink-muted">
                  {row.labelAr}
                </th>
                <td lang="de" className="display-de py-2.5 pe-4 font-medium text-ink">
                  {row.informal}
                </td>
                <td lang="de" className="display-de py-2.5 font-medium text-ink">
                  {row.formal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}
