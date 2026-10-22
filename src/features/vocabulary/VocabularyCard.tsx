import { BookmarkCheck, BookmarkPlus } from 'lucide-react'

import { Badge, articleToTone } from '@/components/ui'
import { GermanWord } from '@/features/pronunciation/GermanWord'
import { cn } from '@/lib/cn'
import { useSettingsStore } from '@/store/settingsStore'
import type { NumberUse, VocabularyItem } from '@/types'

import { VerbForms } from './VerbForms'

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

const NUMBER_USE_NOTE_AR: Record<NumberUse, string> = {
  none: 'لا جمع له في الاستعمال العادي',
  only: 'يُستعمل بصيغة الجمع فقط',
  name: 'اسم مناسبة: يُستعمل بدون أداة وبدون جمع',
}

interface VocabularyCardProps {
  item: VocabularyItem
  /** Whether the word was added to spaced review by hand. */
  saved?: boolean
  /** Adds or removes the word from spaced review. Omit to hide the button. */
  onToggleSaved?: (item: VocabularyItem) => void
}

/** A word with its article (colour-coded), Arabic meaning and one example — the article is learned together with the noun. */
export function VocabularyCard({ item, saved = false, onToggleSaved }: VocabularyCardProps) {
  const showHint = useSettingsStore((state) => state.settings.showPronunciationHints)

  return (
    <div className="flex h-full flex-col gap-2.5 rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <div dir="ltr" className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {item.article ? <Badge tone={articleToTone(item.article)}>{item.article}</Badge> : null}
          <GermanWord word={item.word} size="lg" />
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Badge tone="neutral">{PART_OF_SPEECH_LABEL_AR[item.partOfSpeech]}</Badge>
          {onToggleSaved ? (
            <button
              type="button"
              aria-pressed={saved}
              aria-label={`${saved ? 'إزالة من المراجعة' : 'أضف إلى المراجعة'}: ${item.article ? `${item.article} ` : ''}${item.word}`}
              onClick={() => onToggleSaved(item)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-surface-sunken',
                saved ? 'text-accent' : 'text-ink-faint',
              )}
            >
              {saved ? <BookmarkCheck size={19} aria-hidden="true" /> : <BookmarkPlus size={19} aria-hidden="true" />}
            </button>
          ) : null}
        </div>
      </div>

      {showHint && item.pronunciationHint ? (
        <p dir="ltr" className="font-mono text-sm text-ink-faint">
          {item.pronunciationHint}
        </p>
      ) : null}

      {item.plural ? (
        <p dir="ltr" className="text-sm text-ink-faint">
          Plural: <span lang="de" className="font-medium text-ink-muted">die {item.plural}</span>
        </p>
      ) : item.numberUse ? (
        <p dir="rtl" className="text-sm text-ink-faint">
          {NUMBER_USE_NOTE_AR[item.numberUse]}
        </p>
      ) : null}

      <p dir="rtl" className="text-[1.05rem] font-semibold text-ink">
        {item.meaningAr}
      </p>

      {item.partOfSpeech === 'verb' && item.verb ? <VerbForms item={item} /> : null}

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
