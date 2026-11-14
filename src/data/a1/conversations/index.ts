import type { Dialogue } from '@/types'

import { conversationAmTelefon } from './conversation-01-am-telefon'
import { conversationInDerApotheke } from './conversation-02-in-der-apotheke'
import { conversationImHotel } from './conversation-03-im-hotel'
import { conversationNeueNachbarn } from './conversation-04-neue-nachbarn'
import { conversationZahlenBitte } from './conversation-05-zahlen-bitte'
import { conversationAnmeldungDeutschkurs } from './conversation-06-anmeldung-deutschkurs'
import { conversationImDeutschkurs } from './conversation-07-im-deutschkurs'
import { conversationTelefonnummer } from './conversation-08-telefonnummer'
import { conversationImSupermarkt } from './conversation-09-im-supermarkt'
import { conversationVerabredung } from './conversation-10-verabredung'
import { conversationAmFahrkartenschalter } from './conversation-11-am-fahrkartenschalter'
import { conversationAufDerPost } from './conversation-12-auf-der-post'

/** Standalone A1 conversations: situations from daily life that belong to no single lesson. */
export const a1Conversations: Dialogue[] = [
  conversationAmTelefon,
  conversationInDerApotheke,
  conversationImHotel,
  conversationNeueNachbarn,
  conversationZahlenBitte,
  conversationAnmeldungDeutschkurs,
  conversationImDeutschkurs,
  conversationTelefonnummer,
  conversationImSupermarkt,
  conversationVerabredung,
  conversationAmFahrkartenschalter,
  conversationAufDerPost,
]
