import { describe, expect, it } from 'vitest'

import { getSpeakingTask } from '@/data/speaking'
import type { SpeakingQuestionTask, SpeakingRequestTask, SpeakingTalkTask } from '@/types'

import { checkSpeaking, normalizeSpoken } from './speakingCheck'

const talk = getSpeakingTask('a1-sprechen-vorstellung') as SpeakingTalkTask
const question = getSpeakingTask('a1-sprechen-karte-geschaeft') as SpeakingQuestionTask
const request = getSpeakingTask('a1-sprechen-bitte-rechnung') as SpeakingRequestTask

describe('normalizeSpoken', () => {
  it('lowers the case, writes out umlauts and turns punctuation into spaces', () => {
    expect(normalizeSpoken('Wann öffnet das Geschäft?')).toBe('wann oeffnet das geschaeft')
    expect(normalizeSpoken('  Ich  heiße „Omar“. ')).toBe('ich heisse omar')
  })
})

describe('checkSpeaking – a talk', () => {
  it('reports which cues were touched on', () => {
    const check = checkSpeaking(talk, 'Ich heiße Omar. Ich komme aus Syrien und ich wohne in Berlin.')
    const found = check.items.filter((item) => item.ok).map((item) => item.labelAr)
    expect(found).toEqual(['الاسم', 'البلد', 'السكن'])
    expect(check.ok).toBe(false)
    expect(check.passed).toBe(3)
  })

  it('is ok when every cue is found, however the umlauts were written', () => {
    const check = checkSpeaking(
      talk,
      'Ich heisse Omar und ich bin 30 Jahre alt. Ich komme aus Syrien. Ich wohne in Berlin. Ich spreche Arabisch. Ich arbeite als Fahrer. Mein Hobby ist Fussball.',
    )
    expect(check.ok).toBe(true)
  })

  it('finds nothing in an empty answer', () => {
    const check = checkSpeaking(talk, '   ')
    expect(check.passed).toBe(0)
    expect(check.ok).toBe(false)
  })
})

describe('checkSpeaking – a question card', () => {
  it('needs the question word at the start and the topic', () => {
    expect(checkSpeaking(question, 'Wann öffnet das Geschäft?').ok).toBe(true)
    expect(checkSpeaking(question, 'Wann öffnet es?').items.map((item) => item.ok)).toEqual([true, false])
    expect(checkSpeaking(question, 'Das Geschäft öffnet wann?').items.map((item) => item.ok)).toEqual([false, true])
  })

  it('takes a question word of two words', () => {
    const task = getSpeakingTask('a1-sprechen-karte-wohnung') as SpeakingQuestionTask
    expect(checkSpeaking(task, 'Wie viel kostet die Wohnung?').ok).toBe(true)
    expect(checkSpeaking(task, 'Wie kostet die Wohnung?').items[0].ok).toBe(false)
  })
})

describe('checkSpeaking – a request', () => {
  it('needs a polite word and the object', () => {
    expect(checkSpeaking(request, 'Die Rechnung, bitte.').ok).toBe(true)
    expect(checkSpeaking(request, 'Die Rechnung.').items.map((item) => item.ok)).toEqual([false, true])
    expect(checkSpeaking(request, 'Bitte.').items.map((item) => item.ok)).toEqual([true, false])
  })

  it('counts "Könnten Sie …" as polite without a separate "bitte"', () => {
    const task = getSpeakingTask('a2-sprechen-bitte-hilfe') as SpeakingRequestTask
    expect(checkSpeaking(task, 'Könnten Sie mir helfen?').ok).toBe(true)
  })
})
