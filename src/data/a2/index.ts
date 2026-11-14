import type { Module } from '@/types'

import { moduleWithPractice } from '../lessonPractice'

import { module01Vergleiche } from './module-01-vergleiche'
import { module02Praeteritum } from './module-02-praeteritum'
import { module03Nebensaetze } from './module-03-nebensaetze'
import { module04ReflexiveVerben } from './module-04-reflexive-verben'
import { module05Adjektivdeklination } from './module-05-adjektivdeklination'
import { module06Genitiv } from './module-06-genitiv'
import { module07Futur } from './module-07-futur'
import { module08Relativsaetze } from './module-08-relativsaetze'
import { module09IndirekteFragen } from './module-09-indirekte-fragen'
import { module10UmZu } from './module-10-um-zu'
import { module11Reisen } from './module-11-reisen-und-verkehrsmittel'
import { module12BeimArzt } from './module-12-beim-arzt'
import { module13Wohnungssuche } from './module-13-wohnungssuche'
import { module14FesteUndFeiern } from './module-14-feste-und-feiern'
import { module15Wortschatz } from './module-15-wortschatz'
import { module16HoeflicheBitten } from './module-16-hoefliche-bitten'
import { module17Zeitangaben } from './module-17-zeitangaben'
import { module18VerbenMitPraepositionen } from './module-18-verben-mit-praepositionen'
import { module19BesondereVerben } from './module-19-besondere-verben'
import { module20MeinungRatBegruendung } from './module-20-meinung-rat-begruendung'
import { module21NomenUndAdjektive } from './module-21-nomen-und-adjektive'
import { module22LesenUndLeben } from './module-22-lesen-und-leben'

const authoredA2Modules: Module[] = [
  module01Vergleiche,
  module02Praeteritum,
  module03Nebensaetze,
  module04ReflexiveVerben,
  module05Adjektivdeklination,
  module06Genitiv,
  module07Futur,
  module08Relativsaetze,
  module09IndirekteFragen,
  module10UmZu,
  module11Reisen,
  module12BeimArzt,
  module13Wohnungssuche,
  module14FesteUndFeiern,
  module15Wortschatz,
  module16HoeflicheBitten,
  module17Zeitangaben,
  module18VerbenMitPraepositionen,
  module19BesondereVerben,
  module20MeinungRatBegruendung,
  module21NomenUndAdjektive,
  module22LesenUndLeben,
]

/**
 * The level's modules as authored, plus the practice derived from each lesson's own vocabulary and
 * examples (listening, recall, translation — see `../lessonPractice.ts`). Everything else reads this list.
 */
export const a2Modules: Module[] = authoredA2Modules.map(moduleWithPractice)

export { a2Conversations } from './conversations'
export { a2ReadingTexts } from './reading'
