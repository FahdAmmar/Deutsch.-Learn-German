import type { HintCase } from '@/types'

/**
 * Content behind the grammar hints (the dotted markers under phrases such as
 * "dem Frühstück" or "zur Arbeit"). `lib/grammarHints.ts` holds the matching
 * logic; everything a learner reads lives here.
 *
 * Only forms that are unambiguous are listed. When a form can be explained in
 * more than one way (e.g. "den" after a two-way preposition without a verb of
 * movement), it is left out on purpose: no hint is better than a wrong one.
 */

/** Prepositions that always take the Dativ. */
export const DATIVE_PREPOSITIONS: readonly string[] = ['aus', 'außer', 'bei', 'mit', 'nach', 'seit', 'von', 'zu']

/** Prepositions that always take the Akkusativ. */
export const ACCUSATIVE_PREPOSITIONS: readonly string[] = ['durch', 'für', 'gegen', 'ohne', 'um']

/** Two-way prepositions: Dativ for a fixed place or a time, Akkusativ for movement towards. */
export const TWO_WAY_PREPOSITIONS: readonly string[] = ['an', 'auf', 'hinter', 'in', 'neben', 'über', 'unter', 'vor', 'zwischen']

/** Prepositions that take the Genitiv. */
export const GENITIVE_PREPOSITIONS: readonly string[] = ['während', 'wegen', 'trotz', 'statt', 'außerhalb', 'innerhalb']

// ---- determiner forms (form → the form it comes from) ------------------------

/** Dativ, masculine and neuter singular. */
export const DATIVE_MASC_NEUT: Readonly<Record<string, string>> = {
  dem: 'der / das',
  einem: 'ein',
  keinem: 'kein',
  meinem: 'mein',
  deinem: 'dein',
  seinem: 'sein',
  ihrem: 'ihr',
  unserem: 'unser',
  eurem: 'euer',
  diesem: 'dieser / dieses',
  jedem: 'jeder / jedes',
}

/** Dativ, feminine singular. */
export const DATIVE_FEMININE: Readonly<Record<string, string>> = {
  der: 'die',
  einer: 'eine',
  keiner: 'keine',
  meiner: 'meine',
  deiner: 'deine',
  seiner: 'seine',
  ihrer: 'ihre',
  unserer: 'unsere',
  eurer: 'eure',
  dieser: 'diese',
  jeder: 'jede',
}

/** Dativ, plural. */
export const DATIVE_PLURAL: Readonly<Record<string, string>> = {
  den: 'die',
  meinen: 'meine',
  deinen: 'deine',
  seinen: 'seine',
  ihren: 'ihre',
  unseren: 'unsere',
  euren: 'eure',
  keinen: 'keine',
  diesen: 'diese',
}

/** Akkusativ, masculine singular — the only gender whose article changes in the Akkusativ. */
export const ACCUSATIVE_MASCULINE: Readonly<Record<string, string>> = {
  den: 'der',
  einen: 'ein',
  keinen: 'kein',
  meinen: 'mein',
  deinen: 'dein',
  seinen: 'sein',
  ihren: 'ihr',
  unseren: 'unser',
  euren: 'euer',
  diesen: 'dieser',
  jeden: 'jeder',
}

/** Genitiv, masculine and neuter singular. */
export const GENITIVE_MASC_NEUT: Readonly<Record<string, string>> = {
  des: 'der / das',
  eines: 'ein',
}

/** Numerals that can precede a plural noun in the Dativ ("seit zwei Monaten"). */
export const PLURAL_NUMERALS: readonly string[] = [
  'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'zwanzig', 'dreißig', 'hundert',
]

// ---- sentence-level evidence -------------------------------------------------

/**
 * Verbs of movement or placing. A two-way preposition before "die"/"das" is
 * explained as "Wohin? → Akkusativ" only when one of these is in the sentence.
 * Exact forms, so "gehören" can never be mistaken for "gehen".
 */
export const MOTION_VERB_FORMS: readonly string[] = [
  'gehe', 'gehst', 'geht', 'gehen', 'ging', 'gingen', 'gegangen',
  'fahre', 'fährst', 'fährt', 'fahren', 'fuhr', 'fuhren', 'gefahren',
  'komme', 'kommst', 'kommt', 'kommen', 'kam', 'kamen', 'gekommen',
  'laufe', 'läufst', 'läuft', 'laufen', 'lief', 'liefen', 'gelaufen',
  'fliege', 'fliegst', 'fliegt', 'fliegen', 'flog', 'flogen', 'geflogen',
  'reise', 'reist', 'reisen', 'reiste', 'reisten', 'gereist',
  'stelle', 'stellst', 'stellt', 'stellen', 'stellte', 'gestellt',
  'lege', 'legst', 'legt', 'legen', 'legte', 'gelegt',
  'setze', 'setzt', 'setzen', 'setzte', 'gesetzt',
  'bringe', 'bringst', 'bringt', 'bringen', 'brachte', 'gebracht',
  'steige', 'steigst', 'steigt', 'steigen', 'stieg', 'gestiegen',
]

/**
 * Stems of verbs that take a fixed preposition ("denken an", "warten auf").
 * A sentence containing one is never given a "Wohin?" hint — the preposition
 * is bound to the verb there, not to a movement. Prefix match: a false
 * positive only means a hint is skipped.
 */
export const PREPOSITIONAL_VERB_STEMS: readonly string[] = ['denk', 'dachte', 'gedacht', 'wart', 'träum', 'freu', 'erinner', 'glaub', 'hoff', 'acht']

// ---- Arabic notes ------------------------------------------------------------

export interface ContractionRule {
  /** The preposition and article it is made of. */
  preposition: string
  article: 'dem' | 'der' | 'das'
  grammarCase: HintCase
  noteAr: string
}

export const CONTRACTIONS: Readonly<Record<string, ContractionRule>> = {
  zum: {
    preposition: 'zu',
    article: 'dem',
    grammarCase: 'Dativ',
    noteAr: '[[zu]] تأخذ دائمًا Dativ، والاسم هنا مذكر أو محايد ([[dem]])، فتندمج الكلمتان: [[zu + dem = zum]].',
  },
  zur: {
    preposition: 'zu',
    article: 'der',
    grammarCase: 'Dativ',
    noteAr: '[[zu]] تأخذ دائمًا Dativ، والاسم هنا مؤنث ([[die]] ← [[der]] في Dativ)، فتندمج الكلمتان: [[zu + der = zur]].',
  },
  im: {
    preposition: 'in',
    article: 'dem',
    grammarCase: 'Dativ',
    noteAr: '[[in]] حرف جر متغيّر، وهنا يأخذ Dativ (مكان ثابت Wo؟ أو وقت مثل [[im Mai]])، فتندمج [[in + dem]] في [[im]].',
  },
  am: {
    preposition: 'an',
    article: 'dem',
    grammarCase: 'Dativ',
    noteAr: '[[an]] حرف جر متغيّر، وهنا يأخذ Dativ (مكان ثابت Wo؟ أو يوم/وقت مثل [[am Montag]])، فتندمج [[an + dem]] في [[am]].',
  },
  beim: {
    preposition: 'bei',
    article: 'dem',
    grammarCase: 'Dativ',
    noteAr: '[[bei]] تأخذ دائمًا Dativ (عند / أثناء)، فتندمج [[bei + dem]] في [[beim]].',
  },
  vom: {
    preposition: 'von',
    article: 'dem',
    grammarCase: 'Dativ',
    noteAr: '[[von]] تأخذ دائمًا Dativ (من / عن)، فتندمج [[von + dem]] في [[vom]].',
  },
  ins: {
    preposition: 'in',
    article: 'das',
    grammarCase: 'Akkusativ',
    noteAr: '[[in]] حرف جر متغيّر؛ عادةً مع الحركة نحو مكان (Wohin؟) يأخذ Akkusativ، فتندمج [[in + das]] في [[ins]].',
  },
  ans: {
    preposition: 'an',
    article: 'das',
    grammarCase: 'Akkusativ',
    noteAr: '[[an]] حرف جر متغيّر؛ عادةً مع الحركة نحو مكان (Wohin؟) يأخذ Akkusativ، فتندمج [[an + das]] في [[ans]].',
  },
  aufs: {
    preposition: 'auf',
    article: 'das',
    grammarCase: 'Akkusativ',
    noteAr: '[[auf]] حرف جر متغيّر؛ عادةً مع الحركة نحو مكان (Wohin؟) يأخذ Akkusativ، فتندمج [[auf + das]] في [[aufs]].',
  },
  übers: {
    preposition: 'über',
    article: 'das',
    grammarCase: 'Akkusativ',
    noteAr: '[[über]] حرف جر متغيّر، وهنا يأخذ Akkusativ ([[das]])، فتندمج [[über + das]] في [[übers]].',
  },
  fürs: {
    preposition: 'für',
    article: 'das',
    grammarCase: 'Akkusativ',
    noteAr: '[[für]] تأخذ دائمًا Akkusativ، فتندمج [[für + das]] في [[fürs]].',
  },
  ums: {
    preposition: 'um',
    article: 'das',
    grammarCase: 'Akkusativ',
    noteAr: '[[um]] تأخذ دائمًا Akkusativ، فتندمج [[um + das]] في [[ums]].',
  },
  durchs: {
    preposition: 'durch',
    article: 'das',
    grammarCase: 'Akkusativ',
    noteAr: '[[durch]] تأخذ دائمًا Akkusativ، فتندمج [[durch + das]] في [[durchs]].',
  },
}

export interface FixedPhraseRule {
  id: string
  /** The words, written as they appear in a sentence. The first word may be capitalised at a sentence start. */
  words: readonly string[]
  formula: string
  grammarCase?: HintCase
  noteAr: string
}

const GREETING_NOUNS = ['Morgen', 'Tag', 'Abend', 'Appetit'] as const

export const FIXED_PHRASES: readonly FixedPhraseRule[] = [
  {
    id: 'nach-hause',
    words: ['nach', 'Hause'],
    formula: 'nach Hause = إلى البيت',
    noteAr: 'إلى البيت (اتجاه). عبارة ثابتة بلا أداة تعريف، و[[Hause]] بقايا Dativ قديم. وللمكان نقول [[zu Hause]] (في البيت).',
  },
  {
    id: 'zu-hause',
    words: ['zu', 'Hause'],
    formula: 'zu Hause = في البيت',
    noteAr: 'في البيت (مكان: Wo؟). عبارة ثابتة بلا أداة تعريف. وللاتجاه نقول [[nach Hause]] (إلى البيت).',
  },
  {
    id: 'zu-fuss',
    words: ['zu', 'Fuß'],
    formula: 'zu Fuß = مشيًا',
    noteAr: 'مشيًا على الأقدام. عبارة ثابتة بلا أداة تعريف، تُحفظ كما هي: [[zu Fuß gehen]].',
  },
  {
    id: 'zu-mittag',
    words: ['zu', 'Mittag'],
    formula: 'zu Mittag essen',
    noteAr: 'عبارة ثابتة بلا أداة تعريف: [[zu Mittag essen]] = تناول الغداء.',
  },
  {
    id: 'zu-abend',
    words: ['zu', 'Abend'],
    formula: 'zu Abend essen',
    noteAr: 'عبارة ثابتة بلا أداة تعريف: [[zu Abend essen]] = تناول العشاء.',
  },
  ...GREETING_NOUNS.map(
    (noun): FixedPhraseRule => ({
      id: `guten-${noun.toLowerCase()}`,
      words: ['Guten', noun],
      formula: `Guten ${noun} ← einen guten ${noun}`,
      grammarCase: 'Akkusativ',
      noteAr: `تحية مختصرة من [[Ich wünsche dir einen guten ${noun}]]: الاسم مذكر ومفعول به، لذلك ينتهي [[gut]] بـ -en (Akkusativ).`,
    }),
  ),
]

// ---- note templates ----------------------------------------------------------

export const NOTE = {
  dativeAfterDativePrep: (preposition: string, form: string, source: string): string =>
    `[[${preposition}]] تأخذ دائمًا Dativ. وبما أن الاسم مذكر أو محايد، يتحوّل [[${source}]] إلى [[${form}]].`,
  dativeAfterTwoWay: (preposition: string, form: string, source: string): string =>
    `[[${preposition}]] حرف جر متغيّر، وهنا يأخذ Dativ (مكان ثابت Wo؟ أو وقت). والاسم مذكر أو محايد، فيتحوّل [[${source}]] إلى [[${form}]].`,
  dativeMasculineNeutral: (form: string): string =>
    `[[${form}]] = Dativ للمذكر والمحايد (Wem؟): يدل على من يتلقّى الفعل أو يستفيد منه، ويأتي أيضًا بعد أفعال مثل [[helfen]] و[[gehören]].`,
  dativeFeminineAfterDativePrep: (preposition: string, form: string, source: string): string =>
    `[[${preposition}]] تأخذ دائمًا Dativ. والاسم مؤنث، لذلك يتحوّل [[${source}]] إلى [[${form}]] في Dativ.`,
  dativeFeminineAfterTwoWay: (preposition: string, form: string, source: string): string =>
    `[[${preposition}]] حرف جر متغيّر، وهنا يأخذ Dativ (مكان ثابت Wo؟ أو وقت). والاسم مؤنث، فيتحوّل [[${source}]] إلى [[${form}]].`,
  dativePlural: (preposition: string, form: string): string =>
    `[[${preposition}]] تأخذ دائمًا Dativ. في الجمع تصبح الأداة [[${form}]]، وغالبًا يُضاف -n إلى آخر الاسم.`,
  dativePluralNumber: (preposition: string, noun: string): string =>
    `[[${preposition}]] يأخذ Dativ، ولذلك ينتهي الاسم الجمع بـ -n في Dativ (هنا [[${noun}]]).`,
  accusativeAfterAccusativePrep: (preposition: string, form: string, source: string): string =>
    `[[${preposition}]] تأخذ دائمًا Akkusativ. والاسم مذكر، لذلك يتحوّل [[${source}]] إلى [[${form}]].`,
  accusativeMasculine: (form: string, source: string): string =>
    `[[${form}]] = Akkusativ للمذكر (غالبًا مفعول به: Wen/Was؟). في Akkusativ يتحوّل [[${source}]] إلى [[${form}]] — والمذكر وحده هو الذي يتغيّر.`,
  accusativeAfterEsGibt: (form: string, source: string): string =>
    `بعد [[es gibt]] يأتي دائمًا Akkusativ. والاسم مذكر، لذلك يتحوّل [[${source}]] إلى [[${form}]].`,
  accusativeDirection: (preposition: string, form: string): string =>
    `[[${preposition}]] حرف جر متغيّر؛ مع الحركة أو الاتجاه (Wohin؟) يأخذ Akkusativ. لذلك نقول [[${form}]].`,
  accusativeDirectionMasculine: (preposition: string, form: string, source: string): string =>
    `[[${preposition}]] حرف جر متغيّر؛ مع الحركة أو الاتجاه (Wohin؟) يأخذ Akkusativ. والاسم مذكر، فيتحوّل [[${source}]] إلى [[${form}]].`,
  genitive: (form: string, source: string): string =>
    `[[${form}]] = Genitiv للمذكر والمحايد: يدل على الانتماء ([[der Park → des Parks]])، ويأخذ الاسم عادةً -s أو -es. يتحوّل [[${source}]] إلى [[${form}]].`,
  genitiveAfterPreposition: (preposition: string, form: string, source: string): string =>
    `[[${preposition}]] تأخذ Genitiv، والاسم مذكر أو محايد، فيتحوّل [[${source}]] إلى [[${form}]] ويأخذ الاسم -s أو -es.`,
} as const
