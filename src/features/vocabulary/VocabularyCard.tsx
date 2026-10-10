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

/** A word with its article (colour-coded), Arabic meaning and one example — the article is learned together with the noun. */
export function VocabularyCard({ item }: VocabularyCardProps) {
  return (
    <div className="flex h-full flex-col gap-2.5 rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <div dir="ltr" className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {item.article ? <Badge tone={articleToTone(item.article)}>{item.article}</Badge> : null}
          <GermanWord word={item.word} size="lg" />
        </div>
        <Badge tone="neutral">{PART_OF_SPEECH_LABEL_AR[item.partOfSpeech]}</Badge>
      </div>

      {item.plural ? (
        <p dir="ltr" className="text-sm text-ink-faint">
          Plural: <span lang="de" className="font-medium text-ink-muted">{item.plural}</span>
        </p>
      ) : null}

      <p dir="rtl" className="text-[1.05rem] font-semibold text-ink">
        {item.meaningAr}
      </p>

      {item.example ? (
        <div className="mt-auto space-y-1 border-t border-border pt-3">
          <p dir="ltr" lang="de" className="text-start text-[0.95rem] text-ink">
            {item.example.de}
          </p>
          <p dir="rtl" className="text-sm leading-7 text-ink-muted">
            {item.example.ar}
          </p>
        </div>
      ) : null}
    </div>
  )
}
