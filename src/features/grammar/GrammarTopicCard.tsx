import { AlertTriangle } from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui'
import { CommonMistakesList } from '@/features/lessons/CommonMistakesList'
import { ExampleSentence } from '@/features/lessons/ExampleSentence'
import { SentenceStructureDiagram } from '@/features/grammar/SentenceStructureDiagram'
import type { GrammarTopic } from '@/types'

interface GrammarTopicCardProps {
  topic: GrammarTopic
}

export function GrammarTopicCard({ topic }: GrammarTopicCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <div dir="ltr" className="text-sm font-mono text-ink-faint">
          {topic.titleDe}
        </div>
        <h3 dir="rtl" className="text-lg font-semibold text-ink">
          {topic.titleAr}
        </h3>
        <p dir="rtl" className="text-sm text-ink-muted">
          {topic.conceptAr}
        </p>
      </CardHeader>

      <CardBody className="space-y-5">
        <p dir="rtl" className="text-sm leading-relaxed text-ink">
          {topic.ruleAr}
        </p>

        {topic.tables?.map((table, tableIndex) => (
          <div key={tableIndex} className="overflow-x-auto rounded-md border border-border">
            {table.caption ? (
              <p dir="rtl" className="border-b border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-ink-muted">
                {table.caption}
              </p>
            ) : null}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  {table.headers.map((header, i) => (
                    <th key={i} dir="rtl" className="px-3 py-2 text-start font-semibold text-ink">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-border last:border-0">
                    <td dir="ltr" lang="de" className="px-3 py-2 font-medium text-primary">
                      {row.label}
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td key={valueIndex} dir="rtl" className="px-3 py-2 text-ink">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {topic.examples.length > 0 ? (
          <div className="space-y-3">
            {topic.examples
              .filter((example) => example.tokens && example.tokens.length > 0)
              .map((example, index) => (
                <SentenceStructureDiagram key={`diagram-${index}`} tokens={example.tokens!} ar={example.ar} />
              ))}
            {topic.examples.filter((example) => !example.tokens || example.tokens.length === 0).length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {topic.examples
                  .filter((example) => !example.tokens || example.tokens.length === 0)
                  .map((example, index) => (
                    <ExampleSentence key={`plain-${index}`} de={example.de} ar={example.ar} />
                  ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {topic.exceptionsAr && topic.exceptionsAr.length > 0 ? (
          <div dir="rtl" className="flex gap-2 rounded-md border border-accent/40 bg-accent-muted p-3 text-sm text-accent">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <ul className="list-inside list-disc space-y-1">
              {topic.exceptionsAr.map((exception, index) => (
                <li key={index}>{exception}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {topic.commonMistakes && topic.commonMistakes.length > 0 ? (
          <div>
            <p dir="rtl" className="mb-2 text-sm font-semibold text-ink">
              أخطاء شائعة
            </p>
            <CommonMistakesList mistakes={topic.commonMistakes} />
          </div>
        ) : null}
      </CardBody>
    </Card>
  )
}
