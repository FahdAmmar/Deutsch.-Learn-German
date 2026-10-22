import { Play, Star } from 'lucide-react'
import { useMemo } from 'react'

import { useVoices } from '@/hooks/useVoices'
import { cn } from '@/lib/cn'
import { GERMAN_LOCALE, speechService, voicesForLanguage, type VoiceInfo } from '@/services/speech'
import { useSettingsStore } from '@/store/settingsStore'

const SAMPLE_SENTENCE = 'Guten Tag! Ich lerne Deutsch.'

/** The voice list, learner's favourites first, then best quality first (the order `voicesForLanguage` already gives). */
function orderVoices(voices: VoiceInfo[], favorites: readonly string[]): VoiceInfo[] {
  const starred = voices.filter((voice) => favorites.includes(voice.voiceURI))
  const rest = voices.filter((voice) => !favorites.includes(voice.voiceURI))
  return [...starred, ...rest]
}

/**
 * Choose the German voice lessons are read with. Lists only German voices (the
 * lessons are spoken in German, and any other voice would mispronounce them),
 * with an "automatic" entry that picks the best available, a star to pin
 * favourites, and a button to hear each one before choosing it.
 */
export function VoicePicker() {
  const voices = useVoices()
  const preferredVoiceURI = useSettingsStore((state) => state.settings.preferredVoiceURI)
  const favorites = useSettingsStore((state) => state.settings.favoriteVoiceURIs)
  const speechRate = useSettingsStore((state) => state.settings.speechRate)
  const setPreferredVoiceURI = useSettingsStore((state) => state.setPreferredVoiceURI)
  const toggleFavoriteVoice = useSettingsStore((state) => state.toggleFavoriteVoice)

  const germanVoices = useMemo(() => orderVoices(voicesForLanguage(voices, GERMAN_LOCALE), favorites), [voices, favorites])

  function preview(voiceURI?: string) {
    speechService.speak(SAMPLE_SENTENCE, { language: GERMAN_LOCALE, rate: speechRate, voiceURI })
  }

  if (!speechService.isSupported()) {
    return <p className="text-sm text-ink-muted">متصفحك لا يدعم النطق الصوتي، لذلك لا توجد أصوات للاختيار.</p>
  }

  if (germanVoices.length === 0) {
    return (
      <p className="max-w-[60ch] text-sm text-ink-muted">
        لم يجد المتصفح أي صوت ألماني. جرّب متصفح Edge أو Chrome الحديث، أو ثبّت حزمة الصوت الألماني من إعدادات نظام التشغيل، ثم أعد فتح
        هذه الصفحة.
      </p>
    )
  }

  const automaticSelected = preferredVoiceURI === null || !germanVoices.some((voice) => voice.voiceURI === preferredVoiceURI)

  return (
    <div className="space-y-2">
      <ul aria-label="صوت النطق" className="space-y-2">
        <VoiceRow
          name="تلقائي (الأفضل المتاح)"
          detail="يختار التطبيق أوضح صوت ألماني على جهازك."
          selected={automaticSelected}
          onSelect={() => setPreferredVoiceURI(null)}
          onPreview={() => preview()}
          previewLabel="استمع إلى الصوت التلقائي"
        />
        {germanVoices.map((voice) => {
          const starred = favorites.includes(voice.voiceURI)
          return (
            <VoiceRow
              key={voice.voiceURI}
              name={voice.name}
              latinName
              detail={`${voice.lang} · ${voice.localService ? 'على الجهاز' : 'عبر الإنترنت'}`}
              selected={!automaticSelected && preferredVoiceURI === voice.voiceURI}
              onSelect={() => setPreferredVoiceURI(voice.voiceURI)}
              onPreview={() => preview(voice.voiceURI)}
              previewLabel={`استمع إلى الصوت ${voice.name}`}
              star={{ active: starred, onToggle: () => toggleFavoriteVoice(voice.voiceURI) }}
            />
          )
        })}
      </ul>
    </div>
  )
}

interface VoiceRowProps {
  name: string
  /** The name is Latin text from the engine (e.g. "Microsoft Conrad Online (Natural)"), so it is isolated as LTR. */
  latinName?: boolean
  detail: string
  selected: boolean
  onSelect: () => void
  onPreview: () => void
  previewLabel: string
  star?: { active: boolean; onToggle: () => void }
}

function VoiceRow({ name, latinName, detail, selected, onSelect, onPreview, previewLabel, star }: VoiceRowProps) {
  return (
    <li
      className={cn(
        'flex items-center gap-2 rounded-md border-2 px-3 py-2 transition-colors',
        selected ? 'border-accent bg-accent-muted' : 'border-border',
      )}
    >
      <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 py-1">
        <input type="radio" name="speech-voice" checked={selected} onChange={onSelect} className="h-4 w-4 shrink-0 accent-accent" />
        <span className="min-w-0">
          {latinName ? (
            <bdi dir="ltr" className="block truncate font-semibold text-ink">
              {name}
            </bdi>
          ) : (
            <span className="block font-semibold text-ink">{name}</span>
          )}
          <span className="block text-xs text-ink-muted">{detail}</span>
        </span>
      </label>
      {star ? (
        <button
          type="button"
          onClick={star.onToggle}
          aria-pressed={star.active}
          aria-label={`${star.active ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}: ${name}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken"
        >
          <Star size={18} aria-hidden="true" className={star.active ? 'fill-plum-vivid text-plum-vivid' : undefined} />
        </button>
      ) : null}
      <button
        type="button"
        onClick={onPreview}
        aria-label={previewLabel}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken"
      >
        <Play size={18} aria-hidden="true" />
      </button>
    </li>
  )
}
