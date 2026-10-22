import { z } from 'zod'

import { PRACTICE_STAGES, type MyText } from '@/types'

import { MAX_PHRASE_WORDS, MAX_SAVED_TEXTS, MAX_TEXT_CHARS, MAX_TITLE_CHARS, MIN_PHRASE_WORDS } from './limits'

/** Below this share of Latin letters the text is not something to type on a German dictation. */
const MIN_LATIN_SHARE = 0.6

const MESSAGES = {
  empty: 'اكتب النص أو الصقه أولًا.',
  tooLong: `النص أطول من الحد المسموح (${MAX_TEXT_CHARS} حرف). قسّمه إلى نصّين.`,
  noLetters: 'النص لا يحتوي على حروف. اكتب نصًا ألمانيًا.',
  notGerman: 'يبدو أن النص ليس ألمانيًا. الإملاء يحتاج نصًا بحروف لاتينية.',
  titleTooLong: `العنوان أطول من ${MAX_TITLE_CHARS} حرفًا.`,
} as const

// Keeps tab, line feed and carriage return; strips the other control characters a paste can drag in.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

/**
 * Normalises pasted text. Composing umlauts (NFC) matters: text copied from
 * some systems stores "ü" as "u" plus a combining mark, which the typing
 * engine would then ask for as two separate characters.
 */
export function cleanText(raw: string): string {
  return raw.normalize('NFC').replace(/\r\n?/g, '\n').replace(CONTROL_CHARACTERS, '').trim()
}

function latinShare(text: string): number {
  const letters = text.match(/\p{L}/gu)?.length ?? 0
  if (letters === 0) return 0
  return (text.match(/\p{Script=Latin}/gu)?.length ?? 0) / letters
}

const textField = z
  .string()
  .transform(cleanText)
  .pipe(
    z
      .string()
      .min(1, MESSAGES.empty)
      .max(MAX_TEXT_CHARS, MESSAGES.tooLong)
      .refine((value) => value === '' || /\p{L}/u.test(value), MESSAGES.noLetters)
      .refine((value) => !/\p{L}/u.test(value) || latinShare(value) >= MIN_LATIN_SHARE, MESSAGES.notGerman),
  )

const titleField = z
  .string()
  .transform((value) => value.replace(/\s+/g, ' ').trim())
  .pipe(z.string().max(MAX_TITLE_CHARS, MESSAGES.titleTooLong))

const inputSchema = z.object({ title: titleField, text: textField })

export interface MyTextInput {
  title: string
  text: string
}

export type MyTextValidation =
  | { ok: true; value: MyTextInput }
  | { ok: false; errors: { title?: string; text?: string } }

/** A title from the first words of the text, for when the learner left it blank. */
export function deriveTitle(text: string): string {
  const words = text.split(/\s+/).filter(Boolean)
  const head = words.slice(0, 6).join(' ').replace(/[.,;:!?„“"”]+$/u, '')
  const title = words.length > 6 ? `${head}…` : head
  return title.length > MAX_TITLE_CHARS ? `${title.slice(0, MAX_TITLE_CHARS - 1)}…` : title
}

/** Checks what the learner entered and returns it cleaned, or one message per field to show under it. */
export function validateMyTextInput(input: MyTextInput): MyTextValidation {
  const parsed = inputSchema.safeParse(input)
  if (!parsed.success) {
    const errors: { title?: string; text?: string } = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]
      if ((field === 'title' || field === 'text') && errors[field] === undefined) errors[field] = issue.message
    }
    return { ok: false, errors }
  }
  const { title, text } = parsed.data
  return { ok: true, value: { title: title || deriveTitle(text), text } }
}

export const storedTextSchema = z.object({
  id: z.string().min(1).max(64),
  title: z.string().max(MAX_TITLE_CHARS),
  text: z.string().min(1).max(MAX_TEXT_CHARS),
  mode: z.enum(['sentences', 'phrases', 'lines']),
  maxWords: z.number().int().min(MIN_PHRASE_WORDS).max(MAX_PHRASE_WORDS),
  createdAt: z.number(),
  updatedAt: z.number(),
  attempts: z.number().int().min(0),
  bestAccuracy: z.number().min(0).max(1),
  bestWpm: z.number().min(0),
  lastPlayedAt: z.number().nullable(),
  // Texts saved before the stages existed have none: they start at the first stage, not yet due.
  stage: z.enum(PRACTICE_STAGES).default('copy'),
  box: z.number().int().min(0).max(4).default(0),
  dueAt: z.number().nullable().default(null),
})

/**
 * Whatever came back from storage, reduced to the entries that are valid. One
 * damaged entry (or someone editing storage by hand) loses only itself, never
 * the rest of the learner's texts.
 */
export function sanitizeStoredTexts(value: unknown): MyText[] {
  if (!Array.isArray(value)) return []
  const seen = new Set<string>()
  const texts: MyText[] = []
  for (const entry of value) {
    const parsed = storedTextSchema.safeParse(entry)
    if (!parsed.success || seen.has(parsed.data.id)) continue
    seen.add(parsed.data.id)
    texts.push(parsed.data)
    if (texts.length >= MAX_SAVED_TEXTS) break
  }
  return texts
}
