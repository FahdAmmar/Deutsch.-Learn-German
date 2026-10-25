interface SpecialCharsBarProps {
  onInsert: (char: string) => void
}

const CHARS = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'] as const

/**
 * One-tap umlauts for keyboards that lack them. The buttons keep the typing
 * field focused (pointer-down is cancelled) so the phone keyboard stays open.
 */
export function SpecialCharsBar({ onInsert }: SpecialCharsBarProps) {
  return (
    <div role="group" aria-label="أحرف ألمانية خاصة" dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
      {CHARS.map((char) => (
        <button
          key={char}
          type="button"
          lang="de"
          onPointerDown={(event) => event.preventDefault()}
          onClick={() => onInsert(char)}
          className="display-de grid size-11 place-items-center rounded-md border border-border bg-surface text-xl font-semibold text-ink transition-colors hover:border-border-strong hover:bg-surface-sunken"
        >
          {char}
        </button>
      ))}
    </div>
  )
}
