import type { CEFRLevel, GermanArticle } from '@/types'

/**
 * Compound nouns. The article of a compound is the article of its LAST part, whatever the first part is:
 * die Hand + der Schuh = der Handschuh. Learning the compound's parts therefore teaches its article.
 *
 * Content only. `firstForm` is how the first part appears inside the compound (Schule → Schul-,
 * Arbeit → Arbeits-, Kind → Kinder-); a test checks that `word` really is `firstForm` + the second part,
 * and that `article` really is the second part's article, so a typo cannot ship.
 */
export interface CompoundPart {
  /** Dictionary form, with a capital letter. */
  word: string
  article: GermanArticle
  meaningAr: string
}

export interface Compound {
  id: string
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  first: CompoundPart
  second: CompoundPart
  /** The first part as it stands inside the compound. Equal to `first.word` when nothing changes. */
  firstForm: string
  /** The compound itself, capitalised. */
  word: string
  /** Always the article of `second`. */
  article: GermanArticle
  meaningAr: string
  /** What happens at the join, when something does (a linking letter added or an ending dropped). */
  joinNoteAr?: string
}

export const COMPOUNDS: readonly Compound[] = [
  {
    id: 'haustuer',
    level: 'A1',
    first: { word: 'Haus', article: 'das', meaningAr: 'بيت' },
    second: { word: 'Tür', article: 'die', meaningAr: 'باب' },
    firstForm: 'Haus',
    word: 'Haustür',
    article: 'die',
    meaningAr: 'باب البيت الخارجي',
  },
  {
    id: 'handschuh',
    level: 'A1',
    first: { word: 'Hand', article: 'die', meaningAr: 'يد' },
    second: { word: 'Schuh', article: 'der', meaningAr: 'حذاء' },
    firstForm: 'Hand',
    word: 'Handschuh',
    article: 'der',
    meaningAr: 'قفّاز',
  },
  {
    id: 'kaffeetasse',
    level: 'A1',
    first: { word: 'Kaffee', article: 'der', meaningAr: 'قهوة' },
    second: { word: 'Tasse', article: 'die', meaningAr: 'فنجان' },
    firstForm: 'Kaffee',
    word: 'Kaffeetasse',
    article: 'die',
    meaningAr: 'فنجان القهوة',
  },
  {
    id: 'schultasche',
    level: 'A1',
    first: { word: 'Schule', article: 'die', meaningAr: 'مدرسة' },
    second: { word: 'Tasche', article: 'die', meaningAr: 'حقيبة' },
    firstForm: 'Schul',
    word: 'Schultasche',
    article: 'die',
    meaningAr: 'حقيبة المدرسة',
    joinNoteAr: 'تسقط النهاية ‎-e‎ من Schule عند التركيب.',
  },
  {
    id: 'wasserflasche',
    level: 'A1',
    first: { word: 'Wasser', article: 'das', meaningAr: 'ماء' },
    second: { word: 'Flasche', article: 'die', meaningAr: 'زجاجة' },
    firstForm: 'Wasser',
    word: 'Wasserflasche',
    article: 'die',
    meaningAr: 'زجاجة الماء',
  },
  {
    id: 'apfelsaft',
    level: 'A1',
    first: { word: 'Apfel', article: 'der', meaningAr: 'تفاحة' },
    second: { word: 'Saft', article: 'der', meaningAr: 'عصير' },
    firstForm: 'Apfel',
    word: 'Apfelsaft',
    article: 'der',
    meaningAr: 'عصير التفاح',
  },
  {
    id: 'zahnbuerste',
    level: 'A1',
    first: { word: 'Zahn', article: 'der', meaningAr: 'سنّ' },
    second: { word: 'Bürste', article: 'die', meaningAr: 'فرشاة' },
    firstForm: 'Zahn',
    word: 'Zahnbürste',
    article: 'die',
    meaningAr: 'فرشاة الأسنان',
  },
  {
    id: 'bahnhof',
    level: 'A1',
    first: { word: 'Bahn', article: 'die', meaningAr: 'قطار، سكة حديد' },
    second: { word: 'Hof', article: 'der', meaningAr: 'ساحة' },
    firstForm: 'Bahn',
    word: 'Bahnhof',
    article: 'der',
    meaningAr: 'محطة القطار',
  },
  {
    id: 'buchladen',
    level: 'A1',
    first: { word: 'Buch', article: 'das', meaningAr: 'كتاب' },
    second: { word: 'Laden', article: 'der', meaningAr: 'متجر' },
    firstForm: 'Buch',
    word: 'Buchladen',
    article: 'der',
    meaningAr: 'مكتبة (لبيع الكتب)',
  },
  {
    id: 'fussball',
    level: 'A1',
    first: { word: 'Fuß', article: 'der', meaningAr: 'قدم' },
    second: { word: 'Ball', article: 'der', meaningAr: 'كرة' },
    firstForm: 'Fuß',
    word: 'Fußball',
    article: 'der',
    meaningAr: 'كرة القدم',
  },
  {
    id: 'kaesebrot',
    level: 'A1',
    first: { word: 'Käse', article: 'der', meaningAr: 'جبن' },
    second: { word: 'Brot', article: 'das', meaningAr: 'خبز' },
    firstForm: 'Käse',
    word: 'Käsebrot',
    article: 'das',
    meaningAr: 'شطيرة خبز بالجبن',
  },
  {
    id: 'telefonnummer',
    level: 'A1',
    first: { word: 'Telefon', article: 'das', meaningAr: 'هاتف' },
    second: { word: 'Nummer', article: 'die', meaningAr: 'رقم' },
    firstForm: 'Telefon',
    word: 'Telefonnummer',
    article: 'die',
    meaningAr: 'رقم الهاتف',
  },
  {
    id: 'postkarte',
    level: 'A1',
    first: { word: 'Post', article: 'die', meaningAr: 'بريد' },
    second: { word: 'Karte', article: 'die', meaningAr: 'بطاقة' },
    firstForm: 'Post',
    word: 'Postkarte',
    article: 'die',
    meaningAr: 'بطاقة بريدية',
  },
  {
    id: 'stadtplan',
    level: 'A1',
    first: { word: 'Stadt', article: 'die', meaningAr: 'مدينة' },
    second: { word: 'Plan', article: 'der', meaningAr: 'خريطة، خطة' },
    firstForm: 'Stadt',
    word: 'Stadtplan',
    article: 'der',
    meaningAr: 'خريطة المدينة',
  },
  {
    id: 'mittagessen',
    level: 'A1',
    first: { word: 'Mittag', article: 'der', meaningAr: 'ظهر' },
    second: { word: 'Essen', article: 'das', meaningAr: 'طعام، وجبة' },
    firstForm: 'Mittag',
    word: 'Mittagessen',
    article: 'das',
    meaningAr: 'غداء',
  },
  {
    id: 'kinderzimmer',
    level: 'A1',
    first: { word: 'Kind', article: 'das', meaningAr: 'طفل' },
    second: { word: 'Zimmer', article: 'das', meaningAr: 'غرفة' },
    firstForm: 'Kinder',
    word: 'Kinderzimmer',
    article: 'das',
    meaningAr: 'غرفة الأطفال',
    joinNoteAr: 'الجزء الأول يأتي هنا بصيغة الجمع: Kinder.',
  },
  {
    id: 'sonnenbrille',
    level: 'A2',
    first: { word: 'Sonne', article: 'die', meaningAr: 'شمس' },
    second: { word: 'Brille', article: 'die', meaningAr: 'نظّارة' },
    firstForm: 'Sonnen',
    word: 'Sonnenbrille',
    article: 'die',
    meaningAr: 'نظّارة شمسية',
    joinNoteAr: 'تُضاف ‎-n‎ بين الجزأين: Sonne + n + Brille.',
  },
  {
    id: 'arbeitszimmer',
    level: 'A2',
    first: { word: 'Arbeit', article: 'die', meaningAr: 'عمل' },
    second: { word: 'Zimmer', article: 'das', meaningAr: 'غرفة' },
    firstForm: 'Arbeits',
    word: 'Arbeitszimmer',
    article: 'das',
    meaningAr: 'غرفة المكتب (للعمل في البيت)',
    joinNoteAr: 'تُضاف ‎-s‎ بين الجزأين: Arbeit + s + Zimmer. لا توجد قاعدة تحدّد متى تُضاف، فاحفظها مع الكلمة.',
  },
  {
    id: 'geburtstagsgeschenk',
    level: 'A2',
    first: { word: 'Geburtstag', article: 'der', meaningAr: 'عيد الميلاد' },
    second: { word: 'Geschenk', article: 'das', meaningAr: 'هدية' },
    firstForm: 'Geburtstags',
    word: 'Geburtstagsgeschenk',
    article: 'das',
    meaningAr: 'هدية عيد الميلاد',
    joinNoteAr: 'تُضاف ‎-s‎ بين الجزأين: Geburtstag + s + Geschenk.',
  },
  {
    id: 'wohnungsschluessel',
    level: 'A2',
    first: { word: 'Wohnung', article: 'die', meaningAr: 'شقة' },
    second: { word: 'Schlüssel', article: 'der', meaningAr: 'مفتاح' },
    firstForm: 'Wohnungs',
    word: 'Wohnungsschlüssel',
    article: 'der',
    meaningAr: 'مفتاح الشقة',
    joinNoteAr: 'تُضاف ‎-s‎ بعد النهاية ‎-ung‎ في الغالب: Wohnung + s + Schlüssel.',
  },
  {
    id: 'reisebuero',
    level: 'A2',
    first: { word: 'Reise', article: 'die', meaningAr: 'سفر' },
    second: { word: 'Büro', article: 'das', meaningAr: 'مكتب' },
    firstForm: 'Reise',
    word: 'Reisebüro',
    article: 'das',
    meaningAr: 'وكالة سفر',
  },
  {
    id: 'wetterbericht',
    level: 'A2',
    first: { word: 'Wetter', article: 'das', meaningAr: 'طقس' },
    second: { word: 'Bericht', article: 'der', meaningAr: 'تقرير' },
    firstForm: 'Wetter',
    word: 'Wetterbericht',
    article: 'der',
    meaningAr: 'النشرة الجوية',
  },
] as const
