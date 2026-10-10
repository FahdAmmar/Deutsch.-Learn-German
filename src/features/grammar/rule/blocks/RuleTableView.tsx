import { cn } from '@/lib/cn'
import type { RuleTableBlock } from '@/types'

import { RichText } from '../RichText'
import { SpeakableGerman } from '../SpeakableGerman'
import { TONE_CLASSES } from '../ruleTone'

export function RuleTableView({ block }: { block: RuleTableBlock }) {
  const emphasised = new Set(block.emphasisRows ?? [])

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      {block.captionAr ? (
        <figcaption className="border-b border-border bg-surface-muted px-4 py-2 text-sm font-semibold text-ink-muted">
          {block.captionAr}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted">
              {block.columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  dir={column.lang === 'de' ? 'ltr' : 'rtl'}
                  className={cn(
                    'px-4 py-2.5 text-start font-bold',
                    column.lang === 'de' && 'font-mono text-xs uppercase tracking-wide',
                    column.tone ? TONE_CLASSES[column.tone].text : 'text-ink',
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'border-b border-border last:border-0 hover:bg-surface-muted/60',
                  emphasised.has(rowIndex) && 'bg-accent-muted/40',
                )}
              >
                {row.map((cell, cellIndex) => {
                  const column = block.columns[cellIndex]
                  return column.lang === 'de' ? (
                    <td key={cellIndex} dir="ltr" className="px-4 py-2.5">
                      <SpeakableGerman
                        text={cell}
                        tone={column.tone}
                        showIcon={false}
                        className={cn('font-semibold', column.tone ? TONE_CLASSES[column.tone].text : 'text-ink')}
                      />
                    </td>
                  ) : (
                    <td key={cellIndex} dir="rtl" className="px-4 py-2.5 text-ink-muted">
                      <RichText text={cell} />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
