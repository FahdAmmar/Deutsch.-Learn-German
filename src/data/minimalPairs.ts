import type { CEFRLevel } from '@/types'

/**
 * Minimal pairs: two real German words that differ in one sound. They train the ear on the
 * contrasts Arabic speakers most often blur — the rounded vowels ö/ü, long versus short vowels,
 * p versus b, German w (/v/) versus f, and z (/ts/) versus s.
 *
 * Content only: the drill and the reference screen read this table, nothing here is JSX.
 * Every word is an ordinary German word the learner will meet; the Arabic gloss is the meaning,
 * not a transliteration.
 */
export type ContrastId = 'rounded-vowels' | 'vowel-length' | 'p-b' | 'w-f' | 'z-s' | 'sch-s' | 'ei-ie'

export interface MinimalPairWord {
  /** The word as written, with its capital letter if it is a noun. */
  word: string
  /** Article of a noun, shown with the meaning so the word is learnt with it. */
  article?: 'der' | 'die' | 'das'
  meaningAr: string
}

export interface MinimalPair {
  id: string
  contrast: ContrastId
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  a: MinimalPairWord
  b: MinimalPairWord
  /** What exactly differs between the two words, in one line. */
  differenceAr: string
}

export interface ContrastGroup {
  id: ContrastId
  titleAr: string
  /** How to produce the contrast; written for an Arabic speaker. */
  explanationAr: string
}

export const CONTRAST_GROUPS: readonly ContrastGroup[] = [
  {
    id: 'rounded-vowels',
    titleAr: 'ö وü مقابل ما يشبههما',
    explanationAr:
      'ليس في العربية حرفا ö وü. لنطق ü: قل «ي» (i) ثم دوّر شفتيك كأنك ستقول «و» دون أن تغيّر مكان اللسان. ولنطق ö: قل «e» ثم دوّر الشفتين بالطريقة نفسها.',
  },
  {
    id: 'vowel-length',
    titleAr: 'حركة طويلة أم قصيرة؟',
    explanationAr:
      'في الألمانية الحركة الطويلة تُمدّ بوضوح، والقصيرة تُقطع بسرعة، وقد يتغيّر المعنى كله. والحرف المضاعف بعد الحركة (tt، ff) يدلّ في الغالب على أنها قصيرة.',
  },
  {
    id: 'p-b',
    titleAr: 'p مقابل b',
    explanationAr:
      'لا يوجد حرف p في العربية الفصحى، فيميل الناطق إلى قول b. في أول الكلمة تُنطق p بنفَس خفيف يخرج مع الحرف (كأن بعده h)، أما b فتُنطق بلا نفَس وبصوت واضح.',
  },
  {
    id: 'w-f',
    titleAr: 'w مقابل f',
    explanationAr:
      'حرف w في الألمانية يُنطق /v/: تلمس أسنانك العليا شفتك السفلى ويهتزّ الصوت في الحلق. أما f فهي الحرف نفسه دون اهتزاز، مثل «ف» العربية.',
  },
  {
    id: 'z-s',
    titleAr: 'z مقابل s',
    explanationAr:
      'حرف z يُنطق «تس» (ts) دائماً. وحرف s في أول الكلمة قبل حركة يُنطق كالزاي /z/ مع اهتزاز في الحلق.',
  },
  {
    id: 'sch-s',
    titleAr: 'sch مقابل s',
    explanationAr: 'حرف sch يُنطق مثل «ش» العربية، أما ss فتُنطق مثل «س». الخطأ بينهما يغيّر الكلمة تماماً.',
  },
  {
    id: 'ei-ie',
    titleAr: 'ei مقابل ie',
    explanationAr:
      'الحرفان ei يُنطقان «آي» (مثل ai)، والحرفان ie يُنطقان «ي» طويلة (i:). الحرف الثاني من الاثنين هو الذي يحدّد النطق، لا الأول.',
  },
] as const

export const MINIMAL_PAIRS: readonly MinimalPair[] = [
  {
    id: 'schon-schoen',
    contrast: 'rounded-vowels',
    level: 'A1',
    a: { word: 'schon', meaningAr: 'بالفعل، من قبل' },
    b: { word: 'schön', meaningAr: 'جميل' },
    differenceAr: 'o مقابل ö (حركتان طويلتان)',
  },
  {
    id: 'tuer-tier',
    contrast: 'rounded-vowels',
    level: 'A1',
    a: { word: 'Tür', article: 'die', meaningAr: 'باب' },
    b: { word: 'Tier', article: 'das', meaningAr: 'حيوان' },
    differenceAr: 'ü مقابل ie (حركتان طويلتان)',
  },
  {
    id: 'koennen-kennen',
    contrast: 'rounded-vowels',
    level: 'A1',
    a: { word: 'können', meaningAr: 'يستطيع' },
    b: { word: 'kennen', meaningAr: 'يعرف (شخصاً أو مكاناً)' },
    differenceAr: 'ö مقابل e (حركتان قصيرتان)',
  },
  {
    id: 'bruder-brueder',
    contrast: 'rounded-vowels',
    level: 'A1',
    a: { word: 'Bruder', article: 'der', meaningAr: 'أخ' },
    b: { word: 'Brüder', article: 'die', meaningAr: 'إخوة (جمع)' },
    differenceAr: 'u مقابل ü (الجمع يغيّر الحركة)',
  },
  {
    id: 'kueste-kiste',
    contrast: 'rounded-vowels',
    level: 'A2',
    a: { word: 'Küste', article: 'die', meaningAr: 'ساحل' },
    b: { word: 'Kiste', article: 'die', meaningAr: 'صندوق' },
    differenceAr: 'ü مقابل i (حركتان قصيرتان)',
  },
  {
    id: 'miete-mitte',
    contrast: 'vowel-length',
    level: 'A1',
    a: { word: 'Miete', article: 'die', meaningAr: 'الإيجار' },
    b: { word: 'Mitte', article: 'die', meaningAr: 'الوسط' },
    differenceAr: 'i طويلة مقابل i قصيرة',
  },
  {
    id: 'staat-stadt',
    contrast: 'vowel-length',
    level: 'A1',
    a: { word: 'Staat', article: 'der', meaningAr: 'دولة' },
    b: { word: 'Stadt', article: 'die', meaningAr: 'مدينة' },
    differenceAr: 'a طويلة مقابل a قصيرة',
  },
  {
    id: 'beet-bett',
    contrast: 'vowel-length',
    level: 'A1',
    a: { word: 'Beet', article: 'das', meaningAr: 'حوض زراعة' },
    b: { word: 'Bett', article: 'das', meaningAr: 'سرير' },
    differenceAr: 'e طويلة مقابل e قصيرة',
  },
  {
    id: 'huete-huette',
    contrast: 'vowel-length',
    level: 'A2',
    a: { word: 'Hüte', article: 'die', meaningAr: 'قبعات (جمع Hut)' },
    b: { word: 'Hütte', article: 'die', meaningAr: 'كوخ' },
    differenceAr: 'ü طويلة مقابل ü قصيرة',
  },
  {
    id: 'ofen-offen',
    contrast: 'vowel-length',
    level: 'A2',
    a: { word: 'Ofen', article: 'der', meaningAr: 'فرن، موقد' },
    b: { word: 'offen', meaningAr: 'مفتوح' },
    differenceAr: 'o طويلة مقابل o قصيرة',
  },
  {
    id: 'paar-bar',
    contrast: 'p-b',
    level: 'A1',
    a: { word: 'Paar', article: 'das', meaningAr: 'زوج، اثنان' },
    b: { word: 'Bar', article: 'die', meaningAr: 'بار، حانة' },
    differenceAr: 'p مقابل b في أول الكلمة',
  },
  {
    id: 'packen-backen',
    contrast: 'p-b',
    level: 'A1',
    a: { word: 'packen', meaningAr: 'يحزم، يعبّئ' },
    b: { word: 'backen', meaningAr: 'يخبز' },
    differenceAr: 'p مقابل b في أول الكلمة',
  },
  {
    id: 'pass-bass',
    contrast: 'p-b',
    level: 'A2',
    a: { word: 'Pass', article: 'der', meaningAr: 'جواز السفر' },
    b: { word: 'Bass', article: 'der', meaningAr: 'الصوت الجهير، آلة الباص' },
    differenceAr: 'p مقابل b في أول الكلمة',
  },
  {
    id: 'wein-fein',
    contrast: 'w-f',
    level: 'A1',
    a: { word: 'Wein', article: 'der', meaningAr: 'نبيذ' },
    b: { word: 'fein', meaningAr: 'دقيق، ناعم' },
    differenceAr: 'w (/v/) مقابل f',
  },
  {
    id: 'wand-fand',
    contrast: 'w-f',
    level: 'A2',
    a: { word: 'Wand', article: 'die', meaningAr: 'جدار' },
    b: { word: 'fand', meaningAr: 'وجد (ماضي finden)' },
    differenceAr: 'w (/v/) مقابل f',
  },
  {
    id: 'zeit-seit',
    contrast: 'z-s',
    level: 'A1',
    a: { word: 'Zeit', article: 'die', meaningAr: 'وقت' },
    b: { word: 'seit', meaningAr: 'منذ' },
    differenceAr: 'z (ts) مقابل s (z)',
  },
  {
    id: 'zahl-saal',
    contrast: 'z-s',
    level: 'A2',
    a: { word: 'Zahl', article: 'die', meaningAr: 'عدد، رقم' },
    b: { word: 'Saal', article: 'der', meaningAr: 'قاعة' },
    differenceAr: 'z (ts) مقابل s (z)',
  },
  {
    id: 'tasche-tasse',
    contrast: 'sch-s',
    level: 'A1',
    a: { word: 'Tasche', article: 'die', meaningAr: 'حقيبة' },
    b: { word: 'Tasse', article: 'die', meaningAr: 'فنجان' },
    differenceAr: 'sch (ش) مقابل ss (س)',
  },
  {
    id: 'wissen-wischen',
    contrast: 'sch-s',
    level: 'A2',
    a: { word: 'wissen', meaningAr: 'يعرف (معلومة)' },
    b: { word: 'wischen', meaningAr: 'يمسح' },
    differenceAr: 'ss (س) مقابل sch (ش)',
  },
  {
    id: 'wein-wien',
    contrast: 'ei-ie',
    level: 'A1',
    a: { word: 'Wein', article: 'der', meaningAr: 'نبيذ' },
    b: { word: 'Wien', meaningAr: 'فيينا (عاصمة النمسا)' },
    differenceAr: 'ei («آي») مقابل ie («ي» طويلة)',
  },
  {
    id: 'reise-riese',
    contrast: 'ei-ie',
    level: 'A2',
    a: { word: 'Reise', article: 'die', meaningAr: 'سفر، رحلة' },
    b: { word: 'Riese', article: 'der', meaningAr: 'عملاق' },
    differenceAr: 'ei («آي») مقابل ie («ي» طويلة)',
  },
] as const
