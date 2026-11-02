import { ORDER_PATTERNS, WORD_ORDER_SENTENCES } from '@/data/wordOrder'
import { SentenceStructure } from '@/features/exercises/SentenceStructure'
import { GermanWord } from '@/features/pronunciation/GermanWord'

import { ReferenceDetails } from './ReferenceDetails'
import { sentenceText } from './wordOrderDrill'

/** One example of each pattern, drawn as blocks with the role of each part named, so the place of the verb is seen. */
export function WordOrderReference() {
  return (
    <ReferenceDetails
      title="ترتيب الجملة: أين يقف الفعل؟"
      description="الجملة الخبرية والسؤال والفعل المساعد والجملة الثانوية، كل نمط بمثال ملوّن."
    >
      <ul className="space-y-4">
        {ORDER_PATTERNS.map((pattern) => {
          const example = WORD_ORDER_SENTENCES.find((sentence) => sentence.pattern === pattern.id)
          if (!example) return null
          return (
            <li key={pattern.id} className="space-y-3 rounded-md border border-border p-3">
              <div dir="rtl" className="space-y-1">
                <h3 className="font-sans text-base font-bold text-ink">{pattern.titleAr}</h3>
                <p className="text-sm leading-7 text-ink-muted">{pattern.ruleAr}</p>
              </div>
              <SentenceStructure chunks={example.chunks} />
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 border-t border-border pt-2">
                <GermanWord word={sentenceText(example)} />
                <span dir="rtl" className="text-sm text-ink-muted">
                  {example.ar}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </ReferenceDetails>
  )
}
