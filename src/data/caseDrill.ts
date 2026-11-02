import type { GermanCase } from '@/lib/generators/cases'
import type { CEFRLevel, GermanArticle } from '@/types'

/**
 * Content for the case drills (articles after a verb or preposition, adjective endings).
 *
 * The sentences are never assembled from a noun and a verb picked at random: that gives "Ich fahre mit
 * dem Schrank". A frame names the groups of nouns it makes sense with, and a noun belongs to one group.
 * Everything here is A1–A2; a test checks the articles and plurals against the curriculum's own
 * vocabulary wherever a word appears in both.
 */

export type NounGroup = 'person' | 'vehicle' | 'furniture' | 'place' | 'object'

export interface CaseNoun {
  id: string
  word: string
  article: GermanArticle
  plural: string
  /** Genitive singular, for masculine and neuter nouns of the `person` group (the only ones a genitive frame uses). */
  genitive?: string
  meaningAr: string
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  group: NounGroup
}

export const CASE_NOUNS: readonly CaseNoun[] = [
  // persons
  { id: 'mann', word: 'Mann', article: 'der', plural: 'Männer', genitive: 'Mannes', meaningAr: 'رجل', level: 'A1', group: 'person' },
  { id: 'lehrer', word: 'Lehrer', article: 'der', plural: 'Lehrer', genitive: 'Lehrers', meaningAr: 'معلّم', level: 'A1', group: 'person' },
  { id: 'bruder', word: 'Bruder', article: 'der', plural: 'Brüder', genitive: 'Bruders', meaningAr: 'أخ', level: 'A1', group: 'person' },
  { id: 'freund', word: 'Freund', article: 'der', plural: 'Freunde', genitive: 'Freundes', meaningAr: 'صديق', level: 'A1', group: 'person' },
  { id: 'vater', word: 'Vater', article: 'der', plural: 'Väter', genitive: 'Vaters', meaningAr: 'أب', level: 'A1', group: 'person' },
  { id: 'arzt', word: 'Arzt', article: 'der', plural: 'Ärzte', genitive: 'Arztes', meaningAr: 'طبيب', level: 'A1', group: 'person' },
  { id: 'frau', word: 'Frau', article: 'die', plural: 'Frauen', meaningAr: 'امرأة', level: 'A1', group: 'person' },
  { id: 'lehrerin', word: 'Lehrerin', article: 'die', plural: 'Lehrerinnen', meaningAr: 'معلّمة', level: 'A1', group: 'person' },
  { id: 'schwester', word: 'Schwester', article: 'die', plural: 'Schwestern', meaningAr: 'أخت', level: 'A1', group: 'person' },
  { id: 'freundin', word: 'Freundin', article: 'die', plural: 'Freundinnen', meaningAr: 'صديقة', level: 'A1', group: 'person' },
  { id: 'mutter', word: 'Mutter', article: 'die', plural: 'Mütter', meaningAr: 'أم', level: 'A1', group: 'person' },
  { id: 'aerztin', word: 'Ärztin', article: 'die', plural: 'Ärztinnen', meaningAr: 'طبيبة', level: 'A1', group: 'person' },
  { id: 'kind', word: 'Kind', article: 'das', plural: 'Kinder', genitive: 'Kindes', meaningAr: 'طفل', level: 'A1', group: 'person' },
  { id: 'maedchen', word: 'Mädchen', article: 'das', plural: 'Mädchen', genitive: 'Mädchens', meaningAr: 'فتاة', level: 'A1', group: 'person' },
  // vehicles
  { id: 'bus', word: 'Bus', article: 'der', plural: 'Busse', meaningAr: 'حافلة', level: 'A1', group: 'vehicle' },
  { id: 'zug', word: 'Zug', article: 'der', plural: 'Züge', meaningAr: 'قطار', level: 'A1', group: 'vehicle' },
  { id: 'auto', word: 'Auto', article: 'das', plural: 'Autos', meaningAr: 'سيارة', level: 'A1', group: 'vehicle' },
  { id: 'fahrrad', word: 'Fahrrad', article: 'das', plural: 'Fahrräder', meaningAr: 'دراجة', level: 'A1', group: 'vehicle' },
  { id: 'taxi', word: 'Taxi', article: 'das', plural: 'Taxis', meaningAr: 'سيارة أجرة', level: 'A1', group: 'vehicle' },
  { id: 'ubahn', word: 'U-Bahn', article: 'die', plural: 'U-Bahnen', meaningAr: 'مترو الأنفاق', level: 'A1', group: 'vehicle' },
  { id: 'strassenbahn', word: 'Straßenbahn', article: 'die', plural: 'Straßenbahnen', meaningAr: 'ترام', level: 'A1', group: 'vehicle' },
  // furniture
  { id: 'tisch', word: 'Tisch', article: 'der', plural: 'Tische', meaningAr: 'طاولة', level: 'A1', group: 'furniture' },
  { id: 'stuhl', word: 'Stuhl', article: 'der', plural: 'Stühle', meaningAr: 'كرسي', level: 'A1', group: 'furniture' },
  { id: 'schrank', word: 'Schrank', article: 'der', plural: 'Schränke', meaningAr: 'خزانة', level: 'A1', group: 'furniture' },
  { id: 'sofa', word: 'Sofa', article: 'das', plural: 'Sofas', meaningAr: 'أريكة', level: 'A1', group: 'furniture' },
  { id: 'bett', word: 'Bett', article: 'das', plural: 'Betten', meaningAr: 'سرير', level: 'A1', group: 'furniture' },
  { id: 'regal', word: 'Regal', article: 'das', plural: 'Regale', meaningAr: 'رفّ', level: 'A1', group: 'furniture' },
    // places
  { id: 'park', word: 'Park', article: 'der', plural: 'Parks', meaningAr: 'حديقة عامة', level: 'A1', group: 'place' },
  { id: 'garten', word: 'Garten', article: 'der', plural: 'Gärten', meaningAr: 'حديقة المنزل', level: 'A1', group: 'place' },
  { id: 'bahnhof', word: 'Bahnhof', article: 'der', plural: 'Bahnhöfe', meaningAr: 'محطة القطار', level: 'A1', group: 'place' },
  { id: 'haus', word: 'Haus', article: 'das', plural: 'Häuser', meaningAr: 'بيت', level: 'A1', group: 'place' },
  { id: 'zimmer', word: 'Zimmer', article: 'das', plural: 'Zimmer', meaningAr: 'غرفة', level: 'A1', group: 'place' },
  { id: 'kueche', word: 'Küche', article: 'die', plural: 'Küchen', meaningAr: 'مطبخ', level: 'A1', group: 'place' },
  { id: 'stadt', word: 'Stadt', article: 'die', plural: 'Städte', meaningAr: 'مدينة', level: 'A1', group: 'place' },
  { id: 'schule', word: 'Schule', article: 'die', plural: 'Schulen', meaningAr: 'مدرسة', level: 'A1', group: 'place' },
  // things
  { id: 'buch', word: 'Buch', article: 'das', plural: 'Bücher', meaningAr: 'كتاب', level: 'A1', group: 'object' },
  { id: 'handy', word: 'Handy', article: 'das', plural: 'Handys', meaningAr: 'هاتف محمول', level: 'A1', group: 'object' },
  { id: 'hemd', word: 'Hemd', article: 'das', plural: 'Hemden', meaningAr: 'قميص', level: 'A1', group: 'object' },
  { id: 'geschenk', word: 'Geschenk', article: 'das', plural: 'Geschenke', meaningAr: 'هدية', level: 'A1', group: 'object' },
  { id: 'mantel', word: 'Mantel', article: 'der', plural: 'Mäntel', meaningAr: 'معطف', level: 'A1', group: 'object' },
  { id: 'computer', word: 'Computer', article: 'der', plural: 'Computer', meaningAr: 'حاسوب', level: 'A1', group: 'object' },
  { id: 'schluessel', word: 'Schlüssel', article: 'der', plural: 'Schlüssel', meaningAr: 'مفتاح', level: 'A1', group: 'object' },
  { id: 'tasche', word: 'Tasche', article: 'die', plural: 'Taschen', meaningAr: 'حقيبة', level: 'A1', group: 'object' },
  { id: 'jacke', word: 'Jacke', article: 'die', plural: 'Jacken', meaningAr: 'سترة', level: 'A1', group: 'object' },
  { id: 'uhr', word: 'Uhr', article: 'die', plural: 'Uhren', meaningAr: 'ساعة', level: 'A1', group: 'object' },
  { id: 'zeitung', word: 'Zeitung', article: 'die', plural: 'Zeitungen', meaningAr: 'جريدة', level: 'A1', group: 'object' },
  { id: 'brille', word: 'Brille', article: 'die', plural: 'Brillen', meaningAr: 'نظّارة', level: 'A1', group: 'object' },
  { id: 'lampe', word: 'Lampe', article: 'die', plural: 'Lampen', meaningAr: 'مصباح', level: 'A1', group: 'object' },
]

/**
 * Adjectives that decline by simply adding the ending, and that can stand in front of any of the nouns the
 * adjective drill uses (a vehicle, a piece of furniture, a thing): so not "warm", "kalt" or "bequem", which
 * would make "ein kaltes Buch". Left out on purpose too: those that lose an -e- when declined
 * (teuer → teure, dunkel → dunkle) and hoch → hohe, which are a lesson of their own.
 */
export const REGULAR_ADJECTIVES: readonly string[] = [
  'groß',
  'klein',
  'neu',
  'alt',
  'gut',
  'schön',
  'billig',
  'schwer',
  'praktisch',
  'modern',
  'hübsch',
]

export type FrameKind = 'nominativ' | 'verb' | 'preposition' | 'wechsel-wo' | 'wechsel-wohin' | 'genitiv'

/** A sentence with a place for one noun phrase. `before` and `after` are what stands around it. */
export interface CaseFrame {
  id: string
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  kind: FrameKind
  /** The case the noun phrase stands in — the answer to the drill. */
  caseName: GermanCase
  before: string
  /** Replaces `before` when the noun phrase is plural (Hier ist → Hier sind). */
  beforePlural?: string
  after: string
  /** The verb or preposition that decides the case, as the learner should memorise it: "helfen", "mit". */
  trigger: string
  /** One line in Arabic about why this word takes this case. */
  noteAr: string
  /** The noun groups the sentence makes sense with. */
  groups: readonly NounGroup[]
  /** Narrows `groups` further to these nouns, where only some of a group fit ("durch den Park", not "durch die Küche"). */
  nounIds?: readonly string[]
}

const ALL_GROUPS: readonly NounGroup[] = ['person', 'vehicle', 'furniture', 'place', 'object']

export const CASE_FRAMES: readonly CaseFrame[] = [
  // Nominativ — the subject
  { id: 'hier-ist', level: 'A1', kind: 'nominativ', caseName: 'nominativ', before: 'Hier ist', beforePlural: 'Hier sind', after: '.', trigger: 'ist / sind', noteAr: 'بعد sein يبقى الاسم في Nominativ: لا يتغيّر شكل الأداة.', groups: ALL_GROUPS },
  { id: 'wo-ist', level: 'A1', kind: 'nominativ', caseName: 'nominativ', before: 'Wo ist', beforePlural: 'Wo sind', after: '?', trigger: 'ist / sind', noteAr: 'الاسم الذي نسأل عنه بعد sein هو في Nominativ.', groups: ALL_GROUPS },

  // Akkusativ — verbs
  { id: 'sehen', level: 'A1', kind: 'verb', caseName: 'akkusativ', before: 'Ich sehe', after: '.', trigger: 'sehen', noteAr: 'الفعل sehen يأخذ مفعولاً مباشراً: Wen / Was sehe ich؟', groups: ALL_GROUPS },
  { id: 'kaufen', level: 'A1', kind: 'verb', caseName: 'akkusativ', before: 'Ich kaufe', after: '.', trigger: 'kaufen', noteAr: 'الفعل kaufen يأخذ مفعولاً مباشراً: Was kaufe ich؟', groups: ['furniture', 'object'] },
  { id: 'brauchen', level: 'A1', kind: 'verb', caseName: 'akkusativ', before: 'Ich brauche', after: '.', trigger: 'brauchen', noteAr: 'الفعل brauchen يأخذ مفعولاً مباشراً: Was brauche ich؟', groups: ['furniture', 'object'] },
  { id: 'suchen', level: 'A1', kind: 'verb', caseName: 'akkusativ', before: 'Ich suche', after: '.', trigger: 'suchen', noteAr: 'الفعل suchen يأخذ مفعولاً مباشراً: Wen / Was suche ich؟', groups: ['person', 'furniture', 'object'] },
  { id: 'kennen', level: 'A1', kind: 'verb', caseName: 'akkusativ', before: 'Ich kenne', after: '.', trigger: 'kennen', noteAr: 'الفعل kennen يأخذ مفعولاً مباشراً: Wen kenne ich؟', groups: ['person'] },
  { id: 'besuchen', level: 'A1', kind: 'verb', caseName: 'akkusativ', before: 'Ich besuche', after: ' morgen.', trigger: 'besuchen', noteAr: 'الفعل besuchen يأخذ مفعولاً مباشراً: Wen besuche ich؟', groups: ['person'] },

  // Akkusativ — prepositions
  { id: 'fuer', level: 'A1', kind: 'preposition', caseName: 'akkusativ', before: 'Das Geschenk ist für', after: '.', trigger: 'für', noteAr: 'حرف الجر für يأتي دائماً مع Akkusativ.', groups: ['person'] },
  { id: 'ohne', level: 'A1', kind: 'preposition', caseName: 'akkusativ', before: 'Ich gehe ohne', after: ' ins Kino.', trigger: 'ohne', noteAr: 'حرف الجر ohne يأتي دائماً مع Akkusativ.', groups: ['person'] },
  { id: 'durch', level: 'A1', kind: 'preposition', caseName: 'akkusativ', before: 'Wir fahren durch', after: '.', trigger: 'durch', noteAr: 'حرف الجر durch يأتي دائماً مع Akkusativ.', groups: ['place'], nounIds: ['park', 'garten', 'stadt'] },
  { id: 'um', level: 'A1', kind: 'preposition', caseName: 'akkusativ', before: 'Der Hund läuft um', after: '.', trigger: 'um', noteAr: 'حرف الجر um يأتي دائماً مع Akkusativ.', groups: ['furniture', 'place'], nounIds: ['tisch', 'stuhl', 'sofa', 'bett', 'haus', 'park', 'schule', 'stadt'] },

  // Dativ — verbs
  { id: 'helfen', level: 'A1', kind: 'verb', caseName: 'dativ', before: 'Ich helfe', after: '.', trigger: 'helfen', noteAr: 'الفعل helfen يأتي مع Dativ: Wem helfe ich؟ (فعل يأخذ Dativ فقط).', groups: ['person'] },
  { id: 'danken', level: 'A1', kind: 'verb', caseName: 'dativ', before: 'Ich danke', after: '.', trigger: 'danken', noteAr: 'الفعل danken يأتي مع Dativ: Wem danke ich؟', groups: ['person'] },
  { id: 'antworten', level: 'A1', kind: 'verb', caseName: 'dativ', before: 'Ich antworte', after: '.', trigger: 'antworten', noteAr: 'الفعل antworten يأتي مع Dativ: Wem antworte ich؟', groups: ['person'] },
  { id: 'gehoeren', level: 'A1', kind: 'verb', caseName: 'dativ', before: 'Das Handy gehört', after: '.', trigger: 'gehören', noteAr: 'الفعل gehören يأتي مع Dativ: Wem gehört das Handy؟', groups: ['person'] },
  { id: 'gefallen', level: 'A1', kind: 'verb', caseName: 'dativ', before: 'Der Mantel gefällt', after: '.', trigger: 'gefallen', noteAr: 'الفعل gefallen يأتي مع Dativ: الشخص الذي يُعجبه الشيء في Dativ.', groups: ['person'] },

  // Dativ — prepositions
  { id: 'mit-person', level: 'A1', kind: 'preposition', caseName: 'dativ', before: 'Ich spreche mit', after: '.', trigger: 'mit', noteAr: 'حرف الجر mit يأتي دائماً مع Dativ.', groups: ['person'] },
  { id: 'mit-fahren', level: 'A1', kind: 'preposition', caseName: 'dativ', before: 'Ich fahre mit', after: '.', trigger: 'mit', noteAr: 'حرف الجر mit يأتي دائماً مع Dativ: mit dem Bus، mit der U-Bahn.', groups: ['vehicle'] },
  { id: 'aus', level: 'A1', kind: 'preposition', caseName: 'dativ', before: 'Ich komme aus', after: '.', trigger: 'aus', noteAr: 'حرف الجر aus يأتي دائماً مع Dativ.', groups: ['place'] },
  { id: 'von', level: 'A1', kind: 'preposition', caseName: 'dativ', before: 'Wir sprechen von', after: '.', trigger: 'von', noteAr: 'حرف الجر von يأتي دائماً مع Dativ.', groups: ALL_GROUPS },

  // Wechselpräpositionen — A2: the case depends on Wo? (place, Dativ) or Wohin? (direction, Akkusativ)
  { id: 'auf-wo', level: 'A2', kind: 'wechsel-wo', caseName: 'dativ', before: 'Das Buch liegt auf', after: '.', trigger: 'auf', noteAr: 'السؤال Wo؟ (مكان ثابت) ← Dativ.', groups: ['furniture'] },
  { id: 'auf-wohin', level: 'A2', kind: 'wechsel-wohin', caseName: 'akkusativ', before: 'Ich lege das Buch auf', after: '.', trigger: 'auf', noteAr: 'السؤال Wohin؟ (اتجاه وحركة) ← Akkusativ.', groups: ['furniture'] },
  { id: 'neben-wo', level: 'A2', kind: 'wechsel-wo', caseName: 'dativ', before: 'Die Tasche steht neben', after: '.', trigger: 'neben', noteAr: 'السؤال Wo؟ (مكان ثابت) ← Dativ.', groups: ['furniture'] },
  { id: 'neben-wohin', level: 'A2', kind: 'wechsel-wohin', caseName: 'akkusativ', before: 'Ich stelle die Tasche neben', after: '.', trigger: 'neben', noteAr: 'السؤال Wohin؟ (اتجاه وحركة) ← Akkusativ.', groups: ['furniture'] },
  { id: 'unter-wo', level: 'A2', kind: 'wechsel-wo', caseName: 'dativ', before: 'Die Katze schläft unter', after: '.', trigger: 'unter', noteAr: 'السؤال Wo؟ (مكان ثابت) ← Dativ.', groups: ['furniture'] },
  { id: 'unter-wohin', level: 'A2', kind: 'wechsel-wohin', caseName: 'akkusativ', before: 'Die Katze läuft unter', after: '.', trigger: 'unter', noteAr: 'السؤال Wohin؟ (اتجاه وحركة) ← Akkusativ.', groups: ['furniture'] },
  { id: 'in-wo', level: 'A2', kind: 'wechsel-wo', caseName: 'dativ', before: 'Wir sind in', after: '.', trigger: 'in', noteAr: 'السؤال Wo؟ (مكان ثابت) ← Dativ. (في الكلام: in dem ← im.)', groups: ['place'] },
  { id: 'in-wohin', level: 'A2', kind: 'wechsel-wohin', caseName: 'akkusativ', before: 'Wir gehen in', after: '.', trigger: 'in', noteAr: 'السؤال Wohin؟ (اتجاه وحركة) ← Akkusativ. (في الكلام: in das ← ins.)', groups: ['place'] },

  // Genitiv — A2: the owner, after the thing owned
  { id: 'gen-auto', level: 'A2', kind: 'genitiv', caseName: 'genitiv', before: 'Das ist das Auto', after: '.', trigger: 'Wessen?', noteAr: 'صاحب الشيء في Genitiv: Wessen Auto؟ — das Auto des Mannes.', groups: ['person'] },
  { id: 'gen-hund', level: 'A2', kind: 'genitiv', caseName: 'genitiv', before: 'Das ist der Hund', after: '.', trigger: 'Wessen?', noteAr: 'صاحب الشيء في Genitiv: Wessen Hund؟ — der Hund der Frau.', groups: ['person'] },
  { id: 'gen-tasche', level: 'A2', kind: 'genitiv', caseName: 'genitiv', before: 'Ich finde die Tasche', after: '.', trigger: 'Wessen?', noteAr: 'صاحب الشيء في Genitiv: die Tasche der Lehrerin.', groups: ['person'] },
]

/** The things an adjective drill puts an adjective in front of: no persons, so "ein neuer Mann" never arises. */
export const ADJECTIVE_NOUN_GROUPS: readonly NounGroup[] = ['vehicle', 'furniture', 'object']

export interface AdjectiveFrame {
  caseName: Extract<GermanCase, 'nominativ' | 'akkusativ' | 'dativ'>
  before: string
  beforePlural?: string
  after: string
}

export const ADJECTIVE_FRAMES: readonly AdjectiveFrame[] = [
  { caseName: 'nominativ', before: 'Hier ist', beforePlural: 'Hier sind', after: '.' },
  { caseName: 'akkusativ', before: 'Ich kaufe', after: '.' },
  { caseName: 'dativ', before: 'Wir sprechen von', after: '.' },
]
