import type { Dialogue } from '@/types'

import { conversationBeimFriseur } from './conversation-01-beim-friseur'
import { conversationBeschwerdeImRestaurant } from './conversation-02-beschwerde-im-restaurant'
import { conversationVorstellungsgespraech } from './conversation-03-vorstellungsgespraech'
import { conversationImHandyshop } from './conversation-04-im-handyshop'
import { conversationTreffenAbsagen } from './conversation-05-treffen-absagen'
import { conversationBeimBuergeramt } from './conversation-06-beim-buergeramt'
import { conversationEinGeschenk } from './conversation-07-ein-geschenk'
import { conversationImFundbuero } from './conversation-08-im-fundbuero'
import { conversationUrlaubsplaene } from './conversation-09-urlaubsplaene'
import { conversationAmInformationsschalter } from './conversation-10-am-informationsschalter'
import { conversationAmFlughafen } from './conversation-11-am-flughafen'
import { conversationArzttermin } from './conversation-12-arzttermin'
import { conversationZuckerfest } from './conversation-13-zuckerfest'
import { conversationGesternImBuero } from './conversation-14-gestern-im-buero'

/**
 * Standalone A2 conversations: situations from daily life that belong to no
 * single lesson. Ordered by the module whose grammar or topic each one
 * practises (its `moduleId`), so they follow the learning path.
 */
export const a2Conversations: Dialogue[] = [
  conversationBeimFriseur, // m01 Vergleiche
  conversationGesternImBuero, // m02 Präteritum
  conversationBeschwerdeImRestaurant, // m03 Nebensätze
  conversationTreffenAbsagen, // m04 Reflexive Verben
  conversationEinGeschenk, // m05 Adjektivdeklination
  conversationImFundbuero, // m06 Genitiv
  conversationUrlaubsplaene, // m07 Futur
  conversationImHandyshop, // m08 Relativsätze
  conversationAmInformationsschalter, // m09 Indirekte Fragen
  conversationVorstellungsgespraech, // m10 um … zu
  conversationAmFlughafen, // m11 Reisen und Verkehrsmittel
  conversationArzttermin, // m12 Beim Arzt
  conversationBeimBuergeramt, // m13 Wohnungssuche
  conversationZuckerfest, // m14 Feste und Feiern
]
