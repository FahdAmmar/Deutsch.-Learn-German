import type { Dialogue } from '@/types'

import { conversationAmTelefon } from './conversation-01-am-telefon'
import { conversationInDerApotheke } from './conversation-02-in-der-apotheke'
import { conversationImHotel } from './conversation-03-im-hotel'
import { conversationNeueNachbarn } from './conversation-04-neue-nachbarn'
import { conversationZahlenBitte } from './conversation-05-zahlen-bitte'
import { conversationAnmeldungDeutschkurs } from './conversation-06-anmeldung-deutschkurs'

/** Standalone A1 conversations: situations from daily life that belong to no single lesson. */
export const a1Conversations: Dialogue[] = [
  conversationAmTelefon,
  conversationInDerApotheke,
  conversationImHotel,
  conversationNeueNachbarn,
  conversationZahlenBitte,
  conversationAnmeldungDeutschkurs,
]
