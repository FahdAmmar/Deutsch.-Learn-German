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
import { conversationImHotel } from './conversation-15-im-hotel'
import { conversationAufDerBank } from './conversation-16-auf-der-bank'
import { conversationHilfeVomNachbarn } from './conversation-17-hilfe-vom-nachbarn'
import { conversationImFitnessstudio } from './conversation-18-im-fitnessstudio'
import { conversationPruefungsstress } from './conversation-19-pruefungsstress'
import { conversationNeueWohnung } from './conversation-20-neue-wohnung'
import { conversationWochenendePlanen } from './conversation-21-wochenende-planen'
import { conversationNeueKollegen } from './conversation-22-neue-kollegen'
import { conversationImTreppenhaus } from './conversation-23-im-treppenhaus'

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
  conversationImHotel, // m15 Themenwortschatz: Urlaub und Hotel
  conversationAufDerBank, // m15 Themenwortschatz: Geld und Bank
  conversationHilfeVomNachbarn, // m16 Höfliche Bitten
  conversationImFitnessstudio, // m17 Zeitangaben
  conversationPruefungsstress, // m18 Verben mit Präpositionen
  conversationNeueWohnung, // m19 Besondere Verben
  conversationWochenendePlanen, // m20 Meinung, Rat und Begründung
  conversationNeueKollegen, // m21 Nomen und Adjektive
  conversationImTreppenhaus, // m22 Lesen und Leben in D-A-CH
]
