// Lists the German texts the app speaks, each with the file name its recording should have, so recordings can be made
// with any tool that writes one audio file per text. See docs/recorded-audio.md.
//   node scripts/list-speech-texts.mjs [output.json]      (default: audio-work/speech-texts.json)
//
// It loads the app's own content through Vite, and builds each text the way the screens do, so a text listed here is
// the text the app asks to speak. Only the places named in `collect` are covered.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { createServer } from 'vite'

import { audioId } from './audio-shared.mjs'

const output = process.argv[2] ?? 'audio-work/speech-texts.json'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' })
try {
  const { normalizeSpokenText } = await server.ssrLoadModule('/src/services/speech/recordedAudio.ts')
  const { loadAllLevels, LEVELS_WITH_CONTENT } = await server.ssrLoadModule('/src/data/curriculum.ts')
  const curriculum = await server.ssrLoadModule('/src/lib/curriculum.ts')
  const { EXAM_SETS } = await server.ssrLoadModule('/src/data/exam/index.ts')
  const { WRITING_TASKS } = await server.ssrLoadModule('/src/data/writing/index.ts')
  const { MINIMAL_PAIRS } = await server.ssrLoadModule('/src/data/minimalPairs.ts')
  const { COMPOUNDS } = await server.ssrLoadModule('/src/data/compounds.ts')
  await loadAllLevels()

  const found = new Map() // key → { key, id, sources: Set }
  const add = (text, source) => {
    const key = normalizeSpokenText(text ?? '')
    if (!key) return
    const entry = found.get(key) ?? { key, id: audioId(key), sources: new Set() }
    entry.sources.add(source)
    found.set(key, entry)
  }

  for (const level of LEVELS_WITH_CONTENT) {
    // Reading texts: each paragraph, and the whole text read in one go (the two buttons of the text card).
    for (const text of curriculum.getReadingTextsForLevel(level)) {
      for (const paragraph of text.paragraphs) add(paragraph.de, `reading ${text.id}`)
      add(text.paragraphs.map((paragraph) => paragraph.de).join(' '), `reading ${text.id} (whole)`)
    }
    // Conversations: each line.
    for (const dialogue of curriculum.getDialoguesForLevel(level)) {
      for (const line of dialogue.lines) add(line.de, `dialogue ${dialogue.id}`)
    }
    // Vocabulary: the word card speaks the word without its article.
    for (const item of curriculum.getVocabularyForLevel(level)) add(item.word, `vocabulary ${item.id}`)
  }
  for (const set of EXAM_SETS) for (const task of set.tasks) if (task.audioDe) add(task.audioDe, `exam ${task.id}`)
  for (const task of WRITING_TASKS) {
    add(task.modelAnswer, `writing ${task.id} (model)`)
    for (const phrase of task.usefulPhrases) add(phrase.de, `writing ${task.id} (phrase)`)
  }
  for (const pair of MINIMAL_PAIRS) {
    add(pair.a.word, `minimal pair ${pair.id}`)
    add(pair.b.word, `minimal pair ${pair.id}`)
  }
  for (const compound of COMPOUNDS) add(`${compound.article} ${compound.word}`, `compound ${compound.id}`)

  const texts = [...found.values()].map(({ key, id, sources }) => ({ id, text: key, sources: [...sources].slice(0, 3) }))
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${JSON.stringify({ version: 1, texts }, null, 2)}\n`)
  const characters = texts.reduce((sum, entry) => sum + entry.text.length, 0)
  console.log(`${texts.length} texts (${characters} characters) written to ${output}`)
} finally {
  await server.close()
}
