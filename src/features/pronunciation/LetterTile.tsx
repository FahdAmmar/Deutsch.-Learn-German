import type { AlphabetLetter } from '@/data/alphabet'
import { cn } from '@/lib/cn'

interface LetterTileProps {
  letter: AlphabetLetter
  active: boolean
  disabled: boolean
  onPress: (letter: AlphabetLetter) => void
}

/** One letter of the German alphabet: tap to hear its name. Umlauts and ß are tinted amber, since they are the ones Arabic readers meet first as new. */
export function LetterTile({ letter, active, disabled, onPress }: LetterTileProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onPress(letter)}
      aria-label={`الاستماع إلى اسم الحرف ${letter.glyph}`}
      className={cn(
        'flex min-h-14 w-full flex-col items-center justify-center rounded-md border py-1.5 transition-colors active:scale-[0.98]',
        letter.kind === 'letter'
          ? 'border-border-strong bg-surface text-ink hover:bg-accent-muted'
          : 'border-transparent bg-marker text-marker-foreground hover:brightness-95',
        active && 'ring-2 ring-accent ring-offset-1 ring-offset-surface',
        'disabled:cursor-not-allowed disabled:opacity-60',
      )}
    >
      <span lang="de" className="display-de text-xl leading-none">
        {letter.glyph}
      </span>
      <span lang="de" className={cn('mt-1 text-[0.72rem] leading-none', letter.kind === 'letter' ? 'text-ink-muted' : 'text-marker-foreground')}>
        {letter.name}
      </span>
    </button>
  )
}
