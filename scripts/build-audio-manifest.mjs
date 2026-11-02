// Builds public/audio/manifest.json from the recordings that exist. For each text in the list made by
// list-speech-texts.mjs it looks for public/audio/de/<id>.<mp3|ogg|wav|m4a> and records the ones it finds.
//   node scripts/build-audio-manifest.mjs [speech-texts.json]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { AUDIO_EXTENSIONS } from './audio-shared.mjs'

const listFile = process.argv[2] ?? 'audio-work/speech-texts.json'
const audioDirectory = 'public/audio'
const voiceDirectory = 'de'

if (!existsSync(listFile)) {
  console.error(`${listFile} not found. Run "node scripts/list-speech-texts.mjs" first.`)
  process.exit(2)
}

const { texts } = JSON.parse(readFileSync(listFile, 'utf8'))
const files = {}
let missing = 0
for (const { id, text } of texts) {
  const extension = AUDIO_EXTENSIONS.find((candidate) => existsSync(join(audioDirectory, voiceDirectory, `${id}.${candidate}`)))
  if (extension) files[text] = `${voiceDirectory}/${id}.${extension}`
  else missing += 1
}

mkdirSync(audioDirectory, { recursive: true })
writeFileSync(join(audioDirectory, 'manifest.json'), `${JSON.stringify({ version: 1, files }, null, 2)}\n`)
console.log(`${Object.keys(files).length} recordings found, ${missing} texts without one (they keep the browser voice).`)
