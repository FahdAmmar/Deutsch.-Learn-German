import { GermanWord } from '@/features/pronunciation/GermanWord'

interface ExampleSentenceProps {
  de: string
  ar: string
}

export function ExampleSentence({ de, ar }: ExampleSentenceProps) {
  return (
    <div className="flex flex-col gap-1 rounded-md border border-border bg-surface-muted p-3">
      <GermanWord word={de} size="md" />
      <p dir="rtl" className="text-sm text-ink-muted">
        {ar}
      </p>
    </div>
  )
}
