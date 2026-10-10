import type { GrammarRule } from '@/types'

/**
 * Rule 24 — Adjektive: predicate/adverbial position (invariant, no
 * ending) + a preview of attributive position (before a noun — needs an
 * ending). The full declension tables are rule 25, directly next; this
 * rule deliberately shows attributive examples WITHOUT explaining the
 * ending pattern yet, just flagging that one exists.
 */
const rule: GrammarRule = {
  id: 'gr-24',
  number: 24,
  slug: '24-adjektive',
  level: 'A2',
  termDe: 'Adjektive',
  titleAr: 'الصفات',
  eyebrowAr: 'الدرس الثامن في مستوى A2',
  taglineAr:
    'الصفة الألمانية لها **موضعان مختلفان تماماً في السلوك**: بعد [[sein]] تبقى ثابتة الشكل دائماً، أمّا قبل الاسم مباشرة فتأخذ **نهاية** تتغيّر حسب الجنس والحالة والأداة — وهذا موضوع الدرس القادم بالكامل.',
  stats: [
    { value: '2', labelAr: 'موضعان للصفة' },
    { value: '0', labelAr: 'نهايات بعد sein (ثابتة الشكل)' },
    { value: '40+', labelAr: 'صفة ومثال' },
  ],
  heroExample: {
    de: 'Das Auto ist schnell. Ich kaufe ein schnelles Auto.',
    ar: 'السيارة سريعة. أشتري سيارة سريعة.',
  },
  objectivesAr: [
    'تستخدم الصفة بعد [[sein]] بلا أيّ نهاية، أياً كان جنس الاسم.',
    'تستخدم الصفة نفسها كظرف لوصف الفعل، بالشكل الثابت نفسه.',
    'تتعرّف على أن الصفة قبل الاسم مباشرة تأخذ نهاية (التفاصيل الكاملة في الدرس القادم).',
    'تحفظ مجموعة واسعة من الصفات الشائعة ومتضادّاتها.',
  ],

  sections: [
    {
      id: 'predicative',
      navLabelAr: 'بعد sein',
      kickerDe: 'prädikativ',
      titleAr: 'الصفة بعد sein: بلا نهاية أبداً',
      titleDe: 'Das Auto ist schnell.',
      tone: 'accent',
      introAr: 'حين تأتي الصفة بعد [[sein]] (أو [[werden]])، **تبقى في شكلها الأساسي دائماً** — بلا أيّ نهاية، أياً كان جنس الفاعل أو عدده.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'نفس الصفة، كل الأجناس، بلا تغيير',
          columns: [
            { header: 'الفاعل', lang: 'de' },
            { header: 'الصفة (ثابتة)', lang: 'de', tone: 'accent' },
          ],
          rows: [
            ['Der Tisch ist', 'groß.'],
            ['Die Lampe ist', 'groß.'],
            ['Das Haus ist', 'groß.'],
            ['Die Häuser sind', 'groß.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'هذه هي الصفة الوحيدة السهلة',
          bodyAr: 'استمتع بهذه البساطة — إنها الاستخدام الوحيد الذي **لا** يحتاج أيّ قواعد تصريف. كل حالات التعقيد في الدرس القادم تخصّ الصفة **قبل** الاسم فقط.',
        },
        {
          kind: 'examples',
          titleAr: 'صفات شائعة بعد sein',
          tone: 'accent',
          items: [
            { badge: 'sein', de: 'Der Kaffee ist **heiß**.', ar: 'القهوة ساخنة.' },
            { badge: 'sein', de: 'Die Übung ist **einfach**.', ar: 'التمرين سهل.' },
            { badge: 'sein', de: 'Das Wetter ist **schlecht**.', ar: 'الطقس سيّئ.' },
            { badge: 'werden', de: 'Es wird **dunkel**.', ar: 'الجوّ يصبح مظلماً.' },
          ],
        },
      ],
    },

    {
      id: 'adverbial',
      navLabelAr: 'كظرف',
      kickerDe: 'adverbial',
      titleAr: 'نفس الصفة كظرف',
      titleDe: 'Er fährt schnell.',
      tone: 'plum',
      introAr: 'الألمانية لا تحتاج لاحقة خاصة (مثل [[-ly]] الإنجليزية) لتحويل الصفة إلى ظرف يصف فعلاً — **نفس الكلمة بالضبط** تُستخدم في الموضعين.',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'صفة أم ظرف؟ نفس الكلمة',
          modes: [
            {
              labelAr: 'صفة (تصف اسماً عبر sein)',
              captionAr: 'schnell تصف السيارة.',
              parts: [{ text: 'Das Auto ist' }, { text: 'schnell.', tone: 'plum' }],
            },
            {
              labelAr: 'ظرف (يصف فعلاً)',
              captionAr: 'schnell تصف طريقة القيادة — بلا أيّ تغيير في الشكل.',
              parts: [{ text: 'Er fährt' }, { text: 'schnell.', tone: 'plum' }],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'صفات تعمل كظروف',
          tone: 'plum',
          items: [
            { badge: 'gut', de: 'Sie spricht **gut** Deutsch.', ar: 'هي تتحدّث الألمانية جيّداً.' },
            { badge: 'laut', de: 'Das Kind weint **laut**.', ar: 'يبكي الطفل بصوت عالٍ.' },
            { badge: 'langsam', de: 'Bitte sprich **langsam**!', ar: 'من فضلك تحدّث ببطء!' },
          ],
        },
      ],
    },

    {
      id: 'attributive-preview',
      navLabelAr: 'قبل الاسم',
      kickerDe: 'attributiv',
      titleAr: 'معاينة: الصفة قبل الاسم',
      titleDe: 'ein schnelles Auto',
      tone: 'highlight',
      introAr: 'حين تأتي الصفة **قبل الاسم مباشرة**، تأخذ نهاية. لاحظ الفرق في الأمثلة التالية — لا تقلق بشأن حفظ القاعدة الآن؛ الدرس القادم مخصَّص بالكامل لهذا الموضوع.',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'بعد sein مقابل قبل الاسم',
          modes: [
            {
              labelAr: 'بعد sein — بلا نهاية',
              captionAr: 'الشكل الأساسي الثابت.',
              parts: [{ text: 'Das Auto ist' }, { text: 'schnell.', tone: 'accent' }],
            },
            {
              labelAr: 'قبل الاسم — بنهاية',
              captionAr: 'الصفة أخذت -es لأنها قبل اسم محايد بعد ein.',
              parts: [{ text: 'Ich kaufe ein' }, { text: 'schnelles', tone: 'highlight' }, { text: 'Auto.' }],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'compass',
          titleAr: 'لماذا تحتاج الصفة نهاية هنا ولا تحتاجها بعد sein؟',
          bodyAr: 'حين تكون الصفة ملاصقة للاسم مباشرة، فهي جزء من **عبارة اسمية واحدة** تحتاج أن تُظهر جنس الاسم وحالته — تماماً كما تفعل الأداة. الدرس القادم [[Adjektivdeklination]] يشرح الأنماط الثلاثة لهذه النهايات بالتفصيل الكامل.',
        },
      ],
    },

    {
      id: 'vocabulary',
      navLabelAr: 'مفردات',
      kickerDe: 'Wortschatz',
      titleAr: 'صفات شائعة ومتضادّاتها',
      titleDe: 'Gegensatzpaare',
      tone: 'plum',
      introAr: 'تعلّم الصفات في أزواج متضادّة يسهّل الحفظ ويوسّع قدرتك على الوصف فوراً.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أزواج صفات شائعة',
          columns: [
            { header: 'الصفة', lang: 'de', tone: 'plum' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'الضدّ', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['groß', 'كبير', 'klein', 'صغير'],
            ['alt', 'قديم/كبير السنّ', 'neu / jung', 'جديد/صغير السنّ'],
            ['schön', 'جميل', 'hässlich', 'قبيح'],
            ['schnell', 'سريع', 'langsam', 'بطيء'],
            ['teuer', 'غالٍ', 'billig', 'رخيص'],
            ['laut', 'صاخب', 'leise', 'هادئ'],
            ['einfach', 'سهل', 'schwer / schwierig', 'صعب'],
            ['warm', 'دافئ', 'kalt', 'بارد'],
            ['hell', 'مضيء', 'dunkel', 'مظلم'],
            ['stark', 'قوي', 'schwach', 'ضعيف'],
            ['sauber', 'نظيف', 'schmutzig', 'متّسخ'],
            ['voll', 'ممتلئ', 'leer', 'فارغ'],
          ],
        },
        {
          kind: 'examples',
          titleAr: 'صفات جديدة في جمل',
          tone: 'plum',
          items: [
            { badge: 'teuer', de: 'Dieses Hotel ist sehr **teuer**.', ar: 'هذا الفندق غالٍ جداً.' },
            { badge: 'leise', de: 'Bitte sei **leise**, das Baby schläft.', ar: 'كن هادئاً من فضلك، الطفل نائم.' },
            { badge: 'schwierig', de: 'Die Prüfung war **schwierig**.', ar: 'كان الامتحان صعباً.' },
            { badge: 'sauber', de: 'Die Küche ist jetzt **sauber**.', ar: 'المطبخ نظيف الآن.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: طابق الصفة بضدّها',
          exercises: [
            {
              id: 'gr24-p1-match1',
              type: 'matching',
              level: 'A2',
              promptAr: 'طابق كل صفة بضدّها',
              pairs: [
                { de: 'groß', ar: 'klein' },
                { de: 'schnell', ar: 'langsam' },
                { de: 'teuer', ar: 'billig' },
                { de: 'warm', ar: 'kalt' },
              ],
              explanationAr: 'راجع جدول المتضادّات أعلاه إن أخطأت.',
            },
          ],
        },
      ],
    },

    {
      id: 'mistakes',
      navLabelAr: 'أخطاء شائعة',
      kickerDe: 'Typische Fehler',
      titleAr: 'أخطاء شائعة',
      titleDe: 'Fehler',
      tone: 'error',
      introAr: 'أشهر خطأ هو إضافة نهاية للصفة بعد sein ظنّاً منهم أنها تتبع جنس الاسم.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Die Lampe ist schöne.',
              correct: 'Die Lampe ist schön.',
              explanationAr: 'بعد [[sein]] لا تُضاف أيّ نهاية للصفة، أياً كان جنس الاسم.',
            },
            {
              wrong: 'Das Auto ist schnelles.',
              correct: 'Das Auto ist schnell.',
              explanationAr: 'نفس القاعدة: الصفة بعد [[sein]] تبقى في شكلها الأساسي دائماً.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'Das Auto ist schnell.', hintAr: 'هل تتغيّر الصفة؟', backAr: 'لا — بعد sein تبقى الصفة ثابتة الشكل دائماً.' },
    { frontDe: 'Er fährt schnell.', hintAr: 'صفة أم ظرف؟', backAr: 'نفس الكلمة تعمل ظرفاً بلا أيّ تغيير.' },
    { frontDe: 'ein schnelles Auto', hintAr: 'لماذا أخذت نهاية؟', backAr: 'لأنها قبل الاسم مباشرة — التفاصيل في الدرس القادم.' },
    { frontDe: 'groß / klein, teuer / billig', hintAr: 'ماذا تحفظ؟', backAr: 'أزواج الصفات المتضادّة الشائعة.' },
  ],

  quiz: [
    {
      id: 'gr24-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الجملة الصحيحة',
      questionDe: '',
      options: ['Die Suppe ist heiße.', 'Die Suppe ist heiß.', 'Die Suppe ist heißes.', 'Die Suppe ist heißen.'],
      correctIndex: 1,
      explanationAr: 'بعد [[sein]] الصفة بلا نهاية: [[heiß]].',
    },
    {
      id: 'gr24-q2',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بضدّ „groß"',
      sentenceDe: 'Das Haus ist nicht groß, es ist ___.',
      acceptedAnswers: ['klein'],
      explanationAr: 'ضدّ [[groß]] هو [[klein]].',
    },
    {
      id: 'gr24-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Adjektive vor einem Nomen bekommen immer eine Endung.',
      isTrue: true,
      explanationAr: 'صحيح: الصفة قبل الاسم مباشرة تأخذ نهاية دائماً (تفاصيلها في الدرس القادم).',
    },
    {
      id: 'gr24-q4',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق كل صفة بضدّها',
      pairs: [
        { de: 'laut', ar: 'leise' },
        { de: 'einfach', ar: 'schwierig' },
        { de: 'hell', ar: 'dunkel' },
      ],
      explanationAr: 'راجع جدول المتضادّات أعلاه إن أخطأت.',
    },
  ],

  cheatSheet: [
    { de: 'Das Auto ist schnell. (بلا نهاية)', ar: 'الصفة بعد sein ثابتة الشكل دائماً.' },
    { de: 'Er fährt schnell. (ظرف)', ar: 'نفس الكلمة، بلا تغيير.' },
    { de: 'ein schnelles Auto (بنهاية)', ar: 'قبل الاسم مباشرة — التفاصيل في الدرس القادم.' },
    { de: 'groß/klein, teuer/billig, warm/kalt', ar: 'أزواج صفات أساسية للحفظ.' },
  ],
}

export default rule
