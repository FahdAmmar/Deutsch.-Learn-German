import type { CEFRLevel } from './cefr'

/** A line of the model answer: German with its Arabic meaning. */
export interface SpeakingModelLine {
  de: string
  ar: string
}

interface SpeakingTaskBase {
  id: string
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  titleAr: string
  titleDe: string
  /** What the learner is asked to do, in Arabic. */
  promptAr: string
  /** A model answer to listen to and compare with, after the learner has tried. */
  model: SpeakingModelLine[]
}

/** One thing the learner should say in a talk: a cue, and how it is recognised in what they said. */
export interface SpeakingCue {
  labelAr: string
  /** A hint in German (a keyword, as on an exam card), shown while the learner prepares. */
  cueDe: string
  /** Regular expressions (source strings) matched after `normalizeForMatch`, so written without umlauts or ß. */
  patterns: string[]
}

/** Talking about yourself, a holiday, a plan: several cues, each to be touched on. */
export interface SpeakingTalkTask extends SpeakingTaskBase {
  kind: 'talk'
  cues: SpeakingCue[]
}

/** A card with a topic and a question word: the learner asks a question about the topic. */
export interface SpeakingQuestionTask extends SpeakingTaskBase {
  kind: 'question'
  topicDe: string
  topicAr: string
  /** The question word the question must begin with, as it is written (`Wann`, `Wie viele`). */
  questionWord: string
  /** Stems (written without umlauts or ß) of which at least one must appear in the question. */
  topicStems: string[]
}

/** A situation and a word: the learner makes a polite request. */
export interface SpeakingRequestTask extends SpeakingTaskBase {
  kind: 'request'
  situationAr: string
  cueDe: string
  /** Stems (written without umlauts or ß) of which at least one must appear in the request. */
  objectStems: string[]
}

export type SpeakingTask = SpeakingTalkTask | SpeakingQuestionTask | SpeakingRequestTask
export type SpeakingKind = SpeakingTask['kind']
