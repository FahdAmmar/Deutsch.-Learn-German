import { Badge, articleToTone } from '@/components/ui'
import { GermanWord } from '@/features/pronunciation/GermanWord'
import type { VocabularyItem } from '@/types'

const PART_OF_SPEECH_LABEL_AR: Record<VocabularyItem['partOfSpeech'], string> = {
  noun: 'اسم',
  verb: 'فعل',
  adjective: 'صفة',
  adverb: 'ظرف',
  pronoun: 'ضمير',
  preposition: 'حرف جر',
  conjunction: 'أداة ربط',
  number: 'عدد',
  interjection: 'تعجب',
  phrase: 'عبارة',
}

interface VocabularyCardProps {
  item: VocabularyItem
}

export function VocabularyCard({ item }: VocabularyCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-border bg-surface p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div dir="ltr" className="flex items-baseline gap-1.5">
          {item.article ? <Badge tone={articleToTone(item.article)}>{item.article}</Badge> : null}
          <GermanWord word={item.word} size="md" />
        </div>
        <Badge tone="neutral">{PART_OF_SPEECH_LABEL_AR[item.partOfSpeech]}</Badge>
      </div>

      {item.plural ? (
        <p dir="ltr" className="text-xs text-ink-faint">
          Plural: <span lang="de">{item.plural}</span>
        </p>
      ) : null}

      <p dir="rtl" className="text-sm font-medium text-ink">
        {item.meaningAr}
      </p>

      {item.example ? (
        <div className="mt-1 space-y-0.5 border-t border-border pt-2">
          <p dir="ltr" lang="de" className="text-sm text-ink-muted">
            {item.example.de}
          </p>
          <p dir="rtl" className="text-xs text-ink-faint">
            {item.example.ar}
          </p>
        </div>
      ) : null}
    </div>
  )
}
