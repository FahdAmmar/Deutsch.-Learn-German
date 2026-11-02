import { z } from 'zod'

/** Where the recordings and their manifest live, under the app's base path. */
export const AUDIO_DIRECTORY = 'audio/'
export const MANIFEST_FILE = `${AUDIO_DIRECTORY}manifest.json`

/**
 * The key a spoken text is looked up by: whitespace collapsed and trimmed. The app and the scripts that prepare
 * the recordings both use this one function, so a text is found exactly when it was prepared.
 */
export function normalizeSpokenText(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/** A file inside the audio folder: letters, digits, dash, underscore and slashes, one audio extension, no `..`, no scheme. */
const SAFE_AUDIO_PATH = /^(?!.*\.\.)[a-z0-9_-]+(\/[a-z0-9_-]+)*\.(mp3|ogg|wav|m4a)$/i

export const audioManifestSchema = z.object({
  version: z.literal(1),
  files: z.record(z.string().min(1).max(1000), z.string().regex(SAFE_AUDIO_PATH)),
})

export type AudioManifest = z.infer<typeof audioManifestSchema>

/**
 * Reads a manifest and keeps only what is safe to play. A damaged manifest, or one with a path that points outside
 * the audio folder or to another site, gives an empty lookup, so the app falls back to the browser's own voice.
 */
export function parseAudioManifest(value: unknown): Map<string, string> {
  const parsed = audioManifestSchema.safeParse(value)
  return parsed.success ? new Map(Object.entries(parsed.data.files)) : new Map()
}
