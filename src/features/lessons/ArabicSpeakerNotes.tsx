import { Card, InlineMarkup } from '@/components/ui'
import { GermanWord } from '@/features/pronunciation/GermanWord'
import type { ContrastiveNote } from '@/types'

import { CommonMistakesList } from './CommonMistakesList'

interface ArabicSpeakerNotesProps {
  notes: readonly ContrastiveNote[]
}

/**
 * Where Arabic and German differ in a way that matters for this lesson. A note with a slip shows it as the
 * same wrong/right pair as the lesson's common mistakes; a note about a sound lets the learner hear each word.
 */
export function ArabicSpeakerNotes({ notes }: ArabicSpeakerNotesProps) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <Card key={note.id}>
          <div dir="rtl" className="space-y-1 px-4 pt-4 sm:px-5 sm:pt-5">
            <h3 className="font-sans text-lg font-bold text-ink">{note.titleAr}</h3>
          </div>
          {note.wrong && note.correct ? (
            <CommonMistakesList mistakes={[{ wrong: note.wrong, correct: note.correct, explanationAr: note.bodyAr }]} />
          ) : (
            <div className="space-y-4 p-4 sm:p-5">
              <p dir="rtl" className="text-[0.95rem] leading-7 text-ink-muted">
                <InlineMarkup text={note.bodyAr} />
              </p>
              {note.examples ? (
                <ul dir="ltr" className="flex flex-wrap gap-x-5 gap-y-2">
                  {note.examples.map((word) => (
                    <li key={word}>
                      <GermanWord word={word} size="lg" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
