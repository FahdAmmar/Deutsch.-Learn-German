import { useState } from 'react'

import { GERMAN_ALPHABET } from '@/data/alphabet'
import { LetterTile } from '@/features/pronunciation/LetterTile'
import { useSpeech } from '@/hooks/useSpeech'

const SPECIAL = GERMAN_ALPHABET.filter((letter) => letter.kind !== 'letter')

/** The four characters Arabic readers have no equivalent for, one tap from their sound. */
export function SpecialLetters() {
  const { speak, isSpeaking, isSupported } = useSpeech()
  const [activeGlyph, setActiveGlyph] = useState<string | null>(null)

  return (
    <section dir="rtl" aria-labelledby="special-letters-title" className="grid gap-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6">
      <div className="space-y-1">
        <h2 id="special-letters-title" className="text-xl font-bold text-ink">
          الحروف الألمانية الخاصة
        </h2>
        <p className="text-sm text-ink-muted">
          {isSupported ? 'ä وö وü وß: اضغط على أي حرف لتسمع اسمه.' : 'ä وö وü وß: النطق الصوتي غير مدعوم في هذا المتصفح.'}
        </p>
      </div>
      <ul dir="ltr" className="grid grid-cols-4 gap-2">
        {SPECIAL.map((letter) => (
          <li key={letter.glyph} className="w-20">
            <LetterTile
              letter={letter}
              active={isSpeaking && activeGlyph === letter.glyph}
              disabled={!isSupported}
              onPress={(pressed) => {
                setActiveGlyph(pressed.glyph)
                speak(pressed.spoken)
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
