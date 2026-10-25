import { useEffect, useRef } from 'react'

import { mediaSessionService } from '@/services/mediaSession'
import { useSettingsStore } from '@/store/settingsStore'
import type { Story } from '@/types'

import type { StoryPlayer } from './useStoryPlayer'

const APP_NAME = 'LEARN GERMAN'

/**
 * Hands a story's title and transport buttons to the system (lock screen, headset, media keys).
 * Previous / next move one sentence, since a sentence is the player's unit.
 * Does nothing when the learner switched it off or the browser has no Media Session.
 */
export function useStoryMediaSession(story: Pick<Story, 'titleDe' | 'level'>, player: StoryPlayer): void {
  const enabled = useSettingsStore((state) => state.settings.lockScreenControls ?? true)

  // The system calls these long after this render, so they read the player through a ref.
  const playerRef = useRef(player)
  useEffect(() => {
    playerRef.current = player
  })

  const { titleDe, level } = story
  useEffect(() => {
    if (!enabled || !mediaSessionService.isSupported()) return

    mediaSessionService.start(
      { title: titleDe, artist: APP_NAME, album: level },
      {
        play: () => playerRef.current.play(),
        pause: () => playerRef.current.pause(),
        previous: () => playerRef.current.seek(playerRef.current.index - 1),
        next: () => playerRef.current.seek(playerRef.current.index + 1),
      },
    )
    return () => mediaSessionService.stop()
  }, [enabled, titleDe, level])

  const playing = player.status === 'playing'
  useEffect(() => {
    if (!enabled) return
    mediaSessionService.setPlaying(playing)
  }, [enabled, playing, titleDe])
}
