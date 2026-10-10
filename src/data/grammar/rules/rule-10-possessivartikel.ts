import type { GrammarRule } from '@/types'

/**
 * Rule 10 — Possessivartikel (Nominativ + Akkusativ, both already
 * taught). These decline exactly like `ein`/`kein` ("ein-Wörter") — the
 * lesson leans on that pattern rather than re-deriving it.
 */
const rule: GrammarRule = {
  id: 'gr-10',
  number: 10,
  slug: '10-possessivartikel',
  level: 'A1',
  termDe: 'Possessivartikel',
  titleAr: 'الملكية',
  eyebrowAr: 'الدرس العاشر في خارطة القواعد',
  taglineAr:
    'أدوات الملكية ([[mein]]، [[dein]]، [[sein]]…) تخبرنا لمن يعود الشيء. الخبر الجيّد: هي تتصرّف **تماماً** مثل [[ein]] و[[kein]] اللتين أتقنتهما بالفعل — نفس الأشكال، نفس التغييرات.',
  stats: [
    { value: '8', labelAr: 'أدوات ملكية (واحدة لكل ضمير)' },
    { value: '0', labelAr: 'قواعد تصريف جديدة — إنها ein-Wörter' },
    { value: '30+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Das ist mein Bruder. Ich sehe seinen Hund.',
    ar: 'هذا أخي. أرى كلبه.',
  },
  objectivesAr: [
    'تحفظ أداة الملكية المناسبة لكل ضمير.',
    'تصرّف أدوات الملكية في Nominativ وAkkusativ بنفس طريقة [[ein]].',
    'تستخدم أدوات الملكية بثقة مع أفراد العائلة والممتلكات.',
  ],

  sections: [
    {
      id: 'overview',
      navLabelAr: 'نظرة عامة',
      kickerDe: 'Überblick',
      titleAr: 'أداة ملكية لكل ضمير',
      titleDe: 'Possessivartikel',
      tone: 'accent',
      introAr: 'كل ضمير من ضمائر الدرس الأول له أداة ملكية خاصة به — تحلّ محلّ [[der]]/[[ein]] لتخبرنا لمن يعود الاسم.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أدوات الملكية (الشكل الأساسي، كما مع المذكّر/المحايد)',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'أداة الملكية', lang: 'de', tone: 'accent' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['ich', 'mein', 'ـي (لي)'],
            ['du', 'dein', 'ـك (لك)'],
            ['er / es', 'sein', 'ـه (له)'],
            ['sie', 'ihr', 'ـها (لها)'],
            ['wir', 'unser', 'ـنا (لنا)'],
            ['ihr', 'euer', 'ـكم (لكم)'],
            ['sie (هم)', 'ihr', 'ـهم (لهم)'],
            ['Sie', 'Ihr', 'ـكم (رسمي)'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'sein وihr: تذكّر الفرق',
          bodyAr: '[[sein]] لملكية شخص مذكّر أو شيء محايد ([[er]]/[[es]])، و[[ihr]] لملكية أنثى ([[sie]]) — لاحظ أن [[ihr]] هنا (ملكية) مختلفة عن [[ihr]] (ضمير أنتم) رغم تطابق الكتابة؛ السياق يحسم المعنى.',
        },
      ],
    },

    {
      id: 'declension',
      navLabelAr: 'التصريف',
      kickerDe: 'ein-Wörter',
      titleAr: 'التصريف: تماماً مثل ein',
      titleDe: 'mein wie ein',
      tone: 'plum',
      introAr: 'أدوات الملكية تُسمّى **ein-Wörter** لأنها تتصرّف حرفياً كما [[ein]]: نفس النهايات في Nominativ، ونفس تغيّر المذكّر فقط في Akkusativ.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'mein عبر الأجناس (Nominativ)',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'Nominativ', lang: 'de', tone: 'accent' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['مذكّر', 'mein', 'mein Bruder'],
            ['مؤنّث', 'meine', 'meine Schwester'],
            ['محايد', 'mein', 'mein Kind'],
            ['جمع', 'meine', 'meine Eltern'],
          ],
        },
        {
          kind: 'table',
          captionAr: 'mein في Akkusativ — المذكّر فقط يتغيّر',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'Akkusativ', lang: 'de', tone: 'plum' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['مذكّر', 'meinen', 'Ich sehe meinen Bruder.'],
            ['مؤنّث', 'meine', 'Ich sehe meine Schwester.'],
            ['محايد', 'mein', 'Ich sehe mein Kind.'],
          ],
          emphasisRows: [0],
        },
        {
          kind: 'examples',
          titleAr: 'أدوات ملكية مختلفة في جمل',
          tone: 'plum',
          items: [
            { badge: 'mein', de: 'Das ist **mein** Vater.', ar: 'هذا أبي.' },
            { badge: 'dein', de: 'Wo ist **dein** Buch?', ar: 'أين كتابك؟' },
            { badge: 'sein', de: 'Er liebt **seine** Familie.', ar: 'هو يحبّ عائلته.' },
            { badge: 'ihr', de: 'Sie besucht **ihre** Mutter.', ar: 'هي تزور أمّها.' },
            { badge: 'unser', de: '**Unsere** Wohnung ist klein.', ar: 'شقّتنا صغيرة.' },
            { badge: 'euer', de: 'Ist das **euer** Auto?', ar: 'هل هذه سيارتكم؟' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'euer يفقد حرفاً عند إضافة نهاية',
          bodyAr: 'حين تضيف نهاية إلى [[euer]] (مؤنّث أو جمع)، يُحذف الحرف الثاني لسهولة النطق: [[euer]] → [[eure]] (وليس [[euere]]). هذا الشكل الوحيد الشاذّ قليلاً بين أدوات الملكية.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بأداة الملكية الصحيحة',
          exercises: [
            {
              id: 'gr10-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'أكمل (أخوها — sie)',
              sentenceDe: 'Das ist ___ Bruder.',
              acceptedAnswers: ['ihr'],
              hint: 'sie (هي) → ihr',
              explanationAr: 'ملكية «هي» = [[ihr]].',
            },
            {
              id: 'gr10-p1-fill2',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'أكمل (سيّارتنا — wir، das Auto محايد)',
              sentenceDe: 'Das ist ___ Auto.',
              acceptedAnswers: ['unser'],
              hint: 'wir → unser',
              explanationAr: 'ملكية «نحن» مع اسم محايد = [[unser]] (بلا نهاية).',
            },
            {
              id: 'gr10-p1-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'اختر الشكل الصحيح (Akkusativ، meine Schwester مؤنّث)',
              questionDe: 'Ich besuche ___ Schwester.',
              options: ['mein', 'meinen', 'meine', 'meiner'],
              correctIndex: 2,
              explanationAr: 'المؤنّث لا يتغيّر في Akkusativ: [[meine Schwester]].',
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
      introAr: 'أشهر خطأين: الخلط بين sein وihr، ونسيان تصريف أداة الملكية حسب جنس الاسم.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Sie liebt sein Mutter.',
              correct: 'Sie liebt ihre Mutter.',
              explanationAr: 'المالكة هنا أنثى ([[sie]])، فالأداة الصحيحة [[ihre]] وليس [[sein]].',
            },
            {
              wrong: 'Das ist meine Vater.',
              correct: 'Das ist mein Vater.',
              explanationAr: '[[der Vater]] مذكّر، فالأداة [[mein]] بلا نهاية.',
            },
            {
              wrong: 'Ich sehe mein Bruder.',
              correct: 'Ich sehe meinen Bruder.',
              explanationAr: 'مفعول به مباشر مذكّر في Akkusativ يحتاج [[-en]]: [[meinen Bruder]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'ich → mein', hintAr: 'ماذا تعني؟', backAr: '...ي / لي.', exampleDe: 'Das ist **mein** Buch.' },
    { frontDe: 'er/es → sein', hintAr: 'ماذا تعني؟', backAr: '...ه / له.', exampleDe: 'Das ist **sein** Auto.' },
    { frontDe: 'sie → ihr', hintAr: 'ماذا تعني؟', backAr: '...ها / لها.', exampleDe: 'Das ist **ihre** Tasche.' },
    { frontDe: 'mein-Wörter = ein-Wörter', hintAr: 'كيف تتصرّف؟', backAr: 'بنفس طريقة ein تماماً: نفس النهايات، ونفس تغيّر المذكّر في Akkusativ.' },
    { frontDe: 'euer → eure', hintAr: 'ماذا يحدث عند إضافة نهاية؟', backAr: 'يُحذف الحرف الثاني: euer → eure، وليس euere.' },
  ],

  quiz: [
    {
      id: 'gr10-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الأداة الصحيحة (ملكية: er)',
      questionDe: 'Das ist ___ Hund.',
      options: ['mein', 'dein', 'sein', 'ihr'],
      correctIndex: 2,
      explanationAr: 'ملكية «هو» = [[sein]].',
    },
    {
      id: 'gr10-q2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (ملكية: du، مؤنّث)',
      sentenceDe: 'Wie heißt ___ Schwester?',
      acceptedAnswers: ['deine'],
      explanationAr: 'ملكية «أنتَ» مع اسم مؤنّث = [[deine]].',
    },
    {
      id: 'gr10-q3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Possessivartikel" verhalten sich wie „ein".',
      isTrue: true,
      explanationAr: 'صحيح: أدوات الملكية تُصرَّف تماماً كما [[ein]].',
    },
    {
      id: 'gr10-q4',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الضمير بأداة الملكية',
      pairs: [
        { de: 'ich', ar: 'mein' },
        { de: 'wir', ar: 'unser' },
        { de: 'sie (هي)', ar: 'ihr' },
        { de: 'ihr', ar: 'euer' },
      ],
      explanationAr: 'راجع الجدول الأول أعلاه إن أخطأت.',
    },
    {
      id: 'gr10-q5',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['ist', 'Bruder.', 'mein', 'Das'],
      correctOrder: [3, 0, 2, 1],
      explanationAr: '[[Das ist mein Bruder.]]',
    },
  ],

  cheatSheet: [
    { de: 'mein · dein · sein · ihr', ar: 'ملكية: أنا، أنتَ، هو، هي.' },
    { de: 'unser · euer · ihr · Ihr', ar: 'ملكية: نحن، أنتم، هم، رسمي.' },
    { de: 'mein-Wörter = ein-Wörter', ar: 'نفس تصريف ein تماماً.' },
    { de: 'meinen Bruder (Akkusativ)', ar: 'المذكّر فقط يأخذ -en في Akkusativ.' },
  ],
}

export default rule
