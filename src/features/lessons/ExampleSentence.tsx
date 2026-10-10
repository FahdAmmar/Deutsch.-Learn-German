import { GermanWord } from '@/features/pronunciation/GermanWord'

interface ExampleSentenceProps {
  de: string
  ar: string
}

/** One example: the German sentence large and tappable to hear, its Arabic explanation beneath. */
export function ExampleSentence({ de, ar }: ExampleSentenceProps) {
  return (
    <div className="space-y-1 px-4 py-3.5 sm:px-5">
      <GermanWord word={de} size="lg" />
      <p dir="rtl" className="text-[0.95rem] leading-7 text-ink-muted">
        {ar}
      </p>
    </div>
  )
}
