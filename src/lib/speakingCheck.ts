import type { SpeakingTask } from '@/types'

import { normalizeForMatch } from './writing/check'

export interface SpeakingCheckItem {
  labelAr: string
  ok: boolean
}

export interface SpeakingCheck {
  /** Every item found. A miss is a prompt to look again, not a grade: speech and typing both slip. */
  ok: boolean
  items: SpeakingCheckItem[]
  passed: number
}

/** What was said, as the patterns see it: lower case, umlauts and ß written out, punctuation turned into spaces. */
export function normalizeSpoken(text: string): string {
  return normalizeForMatch(text)
    .replace(/[.,!?;:„“"'()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function matchesAny(text: string, patterns: readonly string[]): boolean {
  return patterns.some((pattern) => new RegExp(pattern).test(text))
}

function result(items: SpeakingCheckItem[]): SpeakingCheck {
  const passed = items.filter((item) => item.ok).length
  return { ok: items.length > 0 && passed === items.length, items, passed }
}

/**
 * Checks what the learner said (as recognised from the microphone, or typed) against a task. It looks for the
 * things the task asks for — each cue of a talk, the question word and the topic of a question, the "bitte" and
 * the object of a request — and reports each as found or not. It never says a sentence is wrong: it can only
 * say what it did not find.
 */
export function checkSpeaking(task: SpeakingTask, said: string): SpeakingCheck {
  const text = normalizeSpoken(said)

  switch (task.kind) {
    case 'talk':
      return result(task.cues.map((cue) => ({ labelAr: cue.labelAr, ok: text !== '' && matchesAny(text, cue.patterns) })))
    case 'question': {
      const word = normalizeSpoken(task.questionWord)
      return result([
        { labelAr: `بدأ السؤال بـ ${task.questionWord}`, ok: text === word || text.startsWith(`${word} `) },
        { labelAr: `السؤال عن «${task.topicAr}»`, ok: text !== '' && task.topicStems.some((stem) => text.includes(stem)) },
      ])
    }
    case 'request':
      return result([
        { labelAr: 'كلمة «bitte» (من فضلك)', ok: /\bbitte\b/.test(text) || /\bkoennten? sie\b|\bkoennte ich\b|\bhaette (ich )?gern\b/.test(text) },
        { labelAr: `الطلب نفسه («${task.cueDe}»)`, ok: text !== '' && task.objectStems.some((stem) => text.includes(stem)) },
      ])
  }
}
