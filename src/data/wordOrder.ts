import type { CEFRLevel, OrderRole } from '@/types'

/**
 * Sentences for the word-order drill, written out part by part with the role of each part named, so the
 * drill can show the structure once the learner has built the sentence.
 *
 * Content only. Three rules keep the exercises fair:
 * - The first part is written with a capital letter and no other part is, unless it is a noun or "Sie": that
 *   is how a learner knows where the sentence starts, so "Heute lerne ich Deutsch" cannot be answered
 *   "Ich lerne heute Deutsch".
 * - Where German really allows another order (a time before or after a place), the sentence lists it in
 *   `alternatives`, and the drill counts it right. Nothing is marked wrong that a German speaker would say.
 * - The final full stop or question mark is not a part: the sentence ends however the learner ends it.
 */
export type OrderPatternId =
  | 'v2'
  | 'inversion'
  | 'ja-nein'
  | 'w-frage'
  | 'modal'
  | 'trennbar'
  | 'perfekt'
  | 'nebensatz'
  | 'zeit-ort'

export interface OrderPattern {
  id: OrderPatternId
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  titleAr: string
  ruleAr: string
}

export interface OrderChunk {
  text: string
  role: OrderRole
}

export interface WordOrderSentence {
  id: string
  pattern: OrderPatternId
  /** The parts in the order of the sentence. */
  chunks: readonly OrderChunk[]
  ar: string
  /** Other right orders, each listing which part stands in each place, as indices into `chunks`. */
  alternatives?: readonly (readonly number[])[]
}

export const ORDER_PATTERNS: readonly OrderPattern[] = [
  {
    id: 'v2',
    level: 'A1',
    titleAr: 'الجملة الخبرية: الفعل في المرتبة الثانية',
    ruleAr: 'في الجملة الخبرية يقف الفعل المصرّف دائماً في المرتبة الثانية. المرتبة الأولى لعنصر واحد، وقد يكون كلمة أو أكثر.',
  },
  {
    id: 'inversion',
    level: 'A1',
    titleAr: 'تقديم عنصر آخر: الفعل يبقى ثانياً والفاعل يلحقه',
    ruleAr: 'إذا بدأت الجملة بالزمان أو المكان بدل الفاعل، يبقى الفعل في المرتبة الثانية ويأتي الفاعل بعده: Heute lerne ich … وليس Heute ich lerne.',
  },
  {
    id: 'ja-nein',
    level: 'A1',
    titleAr: 'سؤال نعم / لا: الفعل في المرتبة الأولى',
    ruleAr: 'في السؤال الذي جوابه نعم أو لا يبدأ الفعل الجملة، ثم الفاعل.',
  },
  {
    id: 'w-frage',
    level: 'A1',
    titleAr: 'سؤال بأداة استفهام: الفعل في المرتبة الثانية',
    ruleAr: 'تأتي أداة الاستفهام (Wo, Was, Wann …) في المرتبة الأولى، ثم الفعل، ثم الفاعل.',
  },
  {
    id: 'modal',
    level: 'A1',
    titleAr: 'الفعل المساعد: المصدر في نهاية الجملة',
    ruleAr: 'يقف الفعل المساعد (möchten, müssen, können …) في المرتبة الثانية، ويذهب الفعل الأساسي بصيغة المصدر إلى نهاية الجملة، فيُحيط الفعلان ببقية الكلمات كالإطار.',
  },
  {
    id: 'trennbar',
    level: 'A1',
    titleAr: 'الفعل المنفصل: البادئة في النهاية',
    ruleAr: 'يقف الجزء المصرّف في المرتبة الثانية، وتذهب البادئة (auf, an, ein …) إلى نهاية الجملة.',
  },
  {
    id: 'perfekt',
    level: 'A2',
    titleAr: 'الماضي التام: اسم المفعول في النهاية',
    ruleAr: 'يقف haben أو sein في المرتبة الثانية، ويذهب اسم المفعول (Partizip II) إلى نهاية الجملة.',
  },
  {
    id: 'nebensatz',
    level: 'A2',
    titleAr: 'الجملة الثانوية: الفعل المصرّف في النهاية',
    ruleAr: 'بعد weil وdass وwenn ينتقل الفعل المصرّف إلى نهاية الجملة الثانوية، وتُفصل عن الرئيسية بفاصلة. وإذا بدأت الجملة بالثانوية جاء فعل الجملة الرئيسية مباشرة بعد الفاصلة.',
  },
  {
    id: 'zeit-ort',
    level: 'A2',
    titleAr: 'الترتيب المعتاد: الزمان، ثم الطريقة، ثم المكان',
    ruleAr: 'الترتيب المحايد بعد الفعل: الزمان (morgen)، ثم الطريقة (mit dem Bus)، ثم المكان (nach Berlin). يمكن تغييره للتأكيد، لكن هذا هو الأشيع.',
  },
]

const c = (text: string, role: OrderRole): OrderChunk => ({ text, role })

export const WORD_ORDER_SENTENCES: readonly WordOrderSentence[] = [
  // Verb in second place
  { id: 'v2-lernen', pattern: 'v2', chunks: [c('Ich', 'subject'), c('lerne', 'verb'), c('Deutsch', 'object')], ar: 'أتعلّم الألمانية.' },
  { id: 'v2-wohnen', pattern: 'v2', chunks: [c('Wir', 'subject'), c('wohnen', 'verb'), c('in Berlin', 'place')], ar: 'نسكن في برلين.' },
  { id: 'v2-bruder', pattern: 'v2', chunks: [c('Mein Bruder', 'subject'), c('arbeitet', 'verb'), c('in Köln', 'place')], ar: 'أخي يعمل في كولن.' },
  { id: 'v2-lehrer', pattern: 'v2', chunks: [c('Der Lehrer', 'subject'), c('spricht', 'verb'), c('langsam', 'manner')], ar: 'المعلّم يتكلّم ببطء.' },

  // Another part first: verb stays second, subject follows
  { id: 'inv-heute', pattern: 'inversion', chunks: [c('Heute', 'time'), c('lerne', 'verb'), c('ich', 'subject'), c('Deutsch', 'object')], ar: 'اليوم أتعلّم الألمانية.' },
  { id: 'inv-montag', pattern: 'inversion', chunks: [c('Am Montag', 'time'), c('arbeite', 'verb'), c('ich', 'subject'), c('im Büro', 'place')], ar: 'يوم الاثنين أعمل في المكتب.' },
  { id: 'inv-sommer', pattern: 'inversion', chunks: [c('Im Sommer', 'time'), c('fahren', 'verb'), c('wir', 'subject'), c('nach Spanien', 'place')], ar: 'في الصيف نسافر إلى إسبانيا.' },
  { id: 'inv-jetzt', pattern: 'inversion', chunks: [c('Jetzt', 'time'), c('essen', 'verb'), c('wir', 'subject'), c('Pizza', 'object')], ar: 'الآن نأكل البيتزا.' },

  // Yes/no question: verb first
  { id: 'jn-lernst', pattern: 'ja-nein', chunks: [c('Lernst', 'verb'), c('du', 'subject'), c('Deutsch', 'object')], ar: 'هل تتعلّم الألمانية؟' },
  { id: 'jn-hunger', pattern: 'ja-nein', chunks: [c('Hast', 'verb'), c('du', 'subject'), c('Hunger', 'object')], ar: 'هل أنت جائع؟' },
  { id: 'jn-anna', pattern: 'ja-nein', chunks: [c('Wohnt', 'verb'), c('Anna', 'subject'), c('in Hamburg', 'place')], ar: 'هل تسكن آنا في هامبورغ؟' },

  // Question word first, verb second
  { id: 'wf-wo', pattern: 'w-frage', chunks: [c('Wo', 'question-word'), c('wohnst', 'verb'), c('du', 'subject')], ar: 'أين تسكن؟' },
  { id: 'wf-trinken', pattern: 'w-frage', chunks: [c('Was', 'question-word'), c('trinkst', 'verb'), c('du', 'subject'), c('gern', 'manner')], ar: 'ماذا تحبّ أن تشرب؟' },
  { id: 'wf-kurs', pattern: 'w-frage', chunks: [c('Wann', 'question-word'), c('beginnt', 'verb'), c('der Kurs', 'subject')], ar: 'متى تبدأ الدورة؟' },
  { id: 'wf-woher', pattern: 'w-frage', chunks: [c('Woher', 'question-word'), c('kommt', 'verb'), c('Maria', 'subject')], ar: 'من أين تأتي ماريا؟' },

  // Modal verb and infinitive at the end
  { id: 'mod-kaffee', pattern: 'modal', chunks: [c('Ich', 'subject'), c('möchte', 'verb'), c('einen Kaffee', 'object'), c('trinken', 'verb-end')], ar: 'أودّ أن أشرب قهوة.' },
  { id: 'mod-arbeiten', pattern: 'modal', chunks: [c('Ich', 'subject'), c('muss', 'verb'), c('morgen', 'time'), c('arbeiten', 'verb-end')], ar: 'عليّ أن أعمل غداً.' },
  { id: 'mod-parken', pattern: 'modal', chunks: [c('Du', 'subject'), c('darfst', 'verb'), c('hier', 'place'), c('parken', 'verb-end')], ar: 'يُسمح لك بالركن هنا.' },
  { id: 'mod-helfen', pattern: 'modal', chunks: [c('Kannst', 'verb'), c('du', 'subject'), c('mir', 'object'), c('helfen', 'verb-end')], ar: 'هل تستطيع أن تساعدني؟' },

  // Separable verb: the prefix at the end
  { id: 'tr-aufstehen', pattern: 'trennbar', chunks: [c('Ich', 'subject'), c('stehe', 'verb'), c('um sieben Uhr', 'time'), c('auf', 'verb-end')], ar: 'أستيقظ في الساعة السابعة.' },
  { id: 'tr-ankommen', pattern: 'trennbar', chunks: [c('Der Zug', 'subject'), c('kommt', 'verb'), c('um acht Uhr', 'time'), c('an', 'verb-end')], ar: 'يصل القطار في الساعة الثامنة.' },
  { id: 'tr-einkaufen', pattern: 'trennbar', chunks: [c('Wir', 'subject'), c('kaufen', 'verb'), c('im Supermarkt', 'place'), c('ein', 'verb-end')], ar: 'نتسوّق في السوبرماركت.' },
  { id: 'tr-wann', pattern: 'trennbar', chunks: [c('Wann', 'question-word'), c('stehst', 'verb'), c('du', 'subject'), c('auf', 'verb-end')], ar: 'متى تستيقظ؟' },

  // Perfect: participle at the end
  {
    id: 'pf-fussball',
    pattern: 'perfekt',
    chunks: [c('Ich', 'subject'), c('habe', 'verb'), c('gestern', 'time'), c('Fußball', 'object'), c('gespielt', 'verb-end')],
    ar: 'لعبتُ كرة القدم أمس.',
    alternatives: [[0, 1, 3, 2, 4]],
  },
  { id: 'pf-berlin', pattern: 'perfekt', chunks: [c('Wir', 'subject'), c('sind', 'verb'), c('nach Berlin', 'place'), c('gefahren', 'verb-end')], ar: 'سافرنا إلى برلين.' },
  { id: 'pf-brief', pattern: 'perfekt', chunks: [c('Sie', 'subject'), c('hat', 'verb'), c('einen Brief', 'object'), c('geschrieben', 'verb-end')], ar: 'كتبت رسالة.' },
  { id: 'pf-pizza', pattern: 'perfekt', chunks: [c('Gestern', 'time'), c('habe', 'verb'), c('ich', 'subject'), c('Pizza', 'object'), c('gegessen', 'verb-end')], ar: 'أمس أكلتُ بيتزا.' },

  // Subordinate clause: finite verb last
  {
    id: 'ns-krank',
    pattern: 'nebensatz',
    chunks: [c('Ich', 'subject'), c('bleibe', 'verb'), c('zu Hause,', 'place'), c('weil', 'conjunction'), c('ich', 'subject'), c('krank', 'other'), c('bin', 'verb')],
    ar: 'أبقى في البيت لأنني مريض.',
  },
  {
    id: 'ns-dass',
    pattern: 'nebensatz',
    chunks: [c('Ich', 'subject'), c('glaube,', 'verb'), c('dass', 'conjunction'), c('er', 'subject'), c('morgen', 'time'), c('kommt', 'verb')],
    ar: 'أظنّ أنه سيأتي غداً.',
  },
  {
    id: 'ns-wohne',
    pattern: 'nebensatz',
    chunks: [c('Ich', 'subject'), c('lerne', 'verb'), c('Deutsch,', 'object'), c('weil', 'conjunction'), c('ich', 'subject'), c('in Berlin', 'place'), c('wohne', 'verb')],
    ar: 'أتعلّم الألمانية لأنني أسكن في برلين.',
  },
  {
    id: 'ns-wetter',
    pattern: 'nebensatz',
    chunks: [c('Er', 'subject'), c('sagt,', 'verb'), c('dass', 'conjunction'), c('das Wetter', 'subject'), c('schön', 'other'), c('ist', 'verb')],
    ar: 'يقول إن الطقس جميل.',
  },
  {
    id: 'ns-wenn',
    pattern: 'nebensatz',
    chunks: [c('Wenn', 'conjunction'), c('es', 'subject'), c('regnet,', 'verb'), c('bleibe', 'verb'), c('ich', 'subject'), c('zu Hause', 'place')],
    ar: 'إذا هطل المطر بقيتُ في البيت.',
  },

  // Time, manner, place
  {
    id: 'zo-bus',
    pattern: 'zeit-ort',
    chunks: [c('Ich', 'subject'), c('fahre', 'verb'), c('morgen', 'time'), c('mit dem Bus', 'manner'), c('nach Berlin', 'place')],
    ar: 'أسافر غداً بالحافلة إلى برلين.',
    alternatives: [
      [0, 1, 3, 2, 4],
      [0, 1, 2, 4, 3],
    ],
  },
  {
    id: 'zo-spanien',
    pattern: 'zeit-ort',
    chunks: [c('Wir', 'subject'), c('fliegen', 'verb'), c('im Sommer', 'time'), c('nach Spanien', 'place')],
    ar: 'نسافر بالطائرة في الصيف إلى إسبانيا.',
    alternatives: [[0, 1, 3, 2]],
  },
  {
    id: 'zo-schule',
    pattern: 'zeit-ort',
    chunks: [c('Sie', 'subject'), c('geht', 'verb'), c('heute', 'time'), c('zu Fuß', 'manner'), c('zur Schule', 'place')],
    ar: 'تذهب اليوم إلى المدرسة سيراً على الأقدام.',
    alternatives: [
      [0, 1, 3, 2, 4],
      [0, 1, 2, 4, 3],
    ],
  },
]
