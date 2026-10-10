import type { GrammarRule } from '@/types'

/**
 * Rule 15 — Dativ. Completes the declension preview from rule 14
 * (Dativ prepositions) and adds Dativ verbs + the two-object sentence
 * pattern (Dativ person + Akkusativ thing). Dativ personal pronouns
 * (mir/dir/ihm…) are rule 16, immediately next — not used here.
 */
const rule: GrammarRule = {
  id: 'gr-15',
  number: 15,
  slug: '15-dativ',
  level: 'A1',
  termDe: 'Dativ',
  titleAr: 'المفعول غير المباشر',
  eyebrowAr: 'الدرس الخامس عشر في خارطة القواعد',
  taglineAr:
    'الحالة الثالثة: [[Dativ]]، أو المفعول به **غير المباشر** — الشخص الذي يستفيد من الفعل أو يُوجَّه إليه، لا الشيء الذي يقع عليه الفعل مباشرة. تذكر عبارات [[mit dem Bus]] و[[aus Ägypten]] من الدرس السابق؟ الآن ستفهم *لماذا* شكلها هكذا.',
  stats: [
    { value: '3', labelAr: 'أشكال أداة تتغيّر (كلها!)' },
    { value: '1', labelAr: 'نهاية إضافية على الاسم الجمع (-n)' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich gebe dem Kind das Buch.',
    ar: 'أعطي الطفل الكتاب.',
  },
  objectivesAr: [
    'تحدّد المفعول به غير المباشر بسؤال [[Wem?]].',
    'تحفظ أدوات Dativ الأربعة: [[dem]]، [[der]]، [[dem]]، [[den]] (+n).',
    'تستخدم أفعالاً شائعة تحتاج Dativ ([[helfen]]، [[danken]]، [[gefallen]]).',
    'تبني جملة بمفعولين: شخص في Dativ وشيء في Akkusativ.',
    'تستخدم حروف الجرّ السبعة من الدرس السابق بتصريفها الكامل الآن.',
  ],

  sections: [
    {
      id: 'forms',
      navLabelAr: 'الأشكال',
      kickerDe: 'Die Formen',
      titleAr: 'أدوات Dativ: الكل يتغيّر',
      titleDe: 'dem · der · dem · den',
      tone: 'accent',
      introAr: 'خلافاً لـ [[Akkusativ]] (حيث المذكّر فقط تغيّر)، في [[Dativ]] **كل الأجناس تتغيّر** — وحتى الاسم الجمع يأخذ نهاية إضافية [[-n]].',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الأداة المعرّفة عبر الحالات الثلاث',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'Nominativ', lang: 'de' },
            { header: 'Akkusativ', lang: 'de' },
            { header: 'Dativ', lang: 'de', tone: 'accent' },
          ],
          rows: [
            ['مذكّر', 'der Mann', 'den Mann', 'dem Mann'],
            ['مؤنّث', 'die Frau', 'die Frau', 'der Frau'],
            ['محايد', 'das Kind', 'das Kind', 'dem Kind'],
            ['جمع', 'die Kinder', 'die Kinder', 'den Kindern'],
          ],
          emphasisRows: [0, 1, 2, 3],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'alert',
          titleAr: 'لا تنسَ: -n على الاسم الجمع',
          bodyAr: 'في [[Dativ]] فقط، الاسم الجمع نفسه يأخذ [[-n]] إضافية إن لم يكن ينتهي بها أصلاً: [[die Kinder]] → [[den Kindern]]. هذا تغيير على **الاسم نفسه**، وليس فقط على أداته.',
        },
        {
          kind: 'table',
          captionAr: 'الأداة المنكّرة في Dativ',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'Nominativ', lang: 'de' },
            { header: 'Dativ', lang: 'de', tone: 'accent' },
          ],
          rows: [
            ['مذكّر', 'ein Mann', 'einem Mann'],
            ['مؤنّث', 'eine Frau', 'einer Frau'],
            ['محايد', 'ein Kind', 'einem Kind'],
          ],
        },
      ],
    },

    {
      id: 'wem',
      navLabelAr: 'Wem؟',
      kickerDe: 'Wem?',
      titleAr: 'Wem؟ — تحديد المفعول غير المباشر',
      titleDe: 'Dativ-Objekt',
      tone: 'plum',
      introAr: 'اطرح [[Wem?]] (لمن؟) لتحديد المفعول به غير المباشر — الشخص الذي يستفيد من الفعل أو يتلقّاه.',
      blocks: [
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'Nominativ — الفاعل' },
            { text: 'gebe', role: 'الفعل' },
            { text: 'dem Kind', role: 'Dativ — Wem? (لمن)' },
            { text: 'das Buch.', role: 'Akkusativ — Was? (ماذا)' },
          ],
          ar: 'أعطي الطفل الكتاب.',
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'star',
          titleAr: 'ترتيب المفعولين: Dativ قبل Akkusativ',
          bodyAr: 'حين يكون كلا المفعولين اسماً (لا ضميراً)، يأتي **Dativ (الشخص) قبل Akkusativ (الشيء)**: [[Ich gebe dem Kind das Buch.]] — وليس العكس.',
        },
        {
          kind: 'examples',
          titleAr: 'أفعال بمفعولين',
          tone: 'plum',
          items: [
            { badge: 'geben', de: 'Ich gebe **der Frau** die Blumen.', ar: 'أعطي المرأة الزهور.' },
            { badge: 'zeigen', de: 'Er zeigt **dem Kind** ein Foto.', ar: 'هو يُري الطفل صورة.' },
            { badge: 'schenken', de: 'Wir schenken **den Eltern** ein Buch.', ar: 'نهدي الوالدين كتاباً.' },
          ],
        },
      ],
    },

    {
      id: 'dativ-verbs',
      navLabelAr: 'أفعال Dativ',
      kickerDe: 'Dativ-Verben',
      titleAr: 'أفعال تحتاج Dativ وحده',
      titleDe: 'helfen · danken · gefallen',
      tone: 'highlight',
      introAr: 'مجموعة من الأفعال الشائعة تأخذ مفعولاً واحداً فقط، وهذا المفعول في [[Dativ]] — ليس Akkusativ كما قد نتوقّع.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أفعال Dativ شائعة',
          columns: [
            { header: 'الفعل', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['helfen', 'يساعد', 'Ich helfe dem Mann.'],
            ['danken', 'يشكر', 'Ich danke der Lehrerin.'],
            ['gefallen', 'يُعجِب', 'Das Buch gefällt mir.'],
            ['gehören', 'يعود ملكاً لـ', 'Das Auto gehört meinem Vater.'],
            ['antworten', 'يجيب', 'Ich antworte dem Lehrer.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'lightbulb',
          titleAr: 'gefallen: انتبه لترتيب الفاعل والمفعول',
          bodyAr: 'في [[Das Buch gefällt mir.]] (يعجبني الكتاب)، **الكتاب هو الفاعل** (Nominativ) و**أنا** المفعول به في Dativ — عكس الترتيب المنطقي بالعربية «أنا أُعجَب بالكتاب». هذا النمط شائع في أفعال أخرى ستقابلها لاحقاً.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بأداة Dativ الصحيحة',
          exercises: [
            {
              id: 'gr15-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'أكمل (helfen + der Mann)',
              sentenceDe: 'Ich helfe ___ Mann.',
              acceptedAnswers: ['dem'],
              hint: 'der Mann → في Dativ؟',
              explanationAr: '[[der Mann]] مذكّر، وفي Dativ يصبح [[dem Mann]].',
            },
            {
              id: 'gr15-p1-fill2',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'أكمل (danken + die Lehrerin)',
              sentenceDe: 'Wir danken ___ Lehrerin.',
              acceptedAnswers: ['der'],
              hint: 'die Lehrerin → في Dativ؟',
              explanationAr: '[[die Lehrerin]] مؤنّث، وفي Dativ تصبح [[der Lehrerin]].',
            },
          ],
        },
      ],
    },

    {
      id: 'preps-recap',
      navLabelAr: 'حروف الجرّ مجدّداً',
      kickerDe: 'Dativ-Präpositionen',
      titleAr: 'حروف الجرّ السبعة، الآن بالتفصيل',
      titleDe: 'aus · bei · mit · nach · seit · von · zu',
      tone: 'accent',
      introAr: 'الآن يمكنك أن تفهم تماماً لماذا كانت العبارات الجاهزة في الدرس السابق تبدو هكذا.',
      blocks: [
        {
          kind: 'examples',
          titleAr: 'نفس الحروف، مفهومة الآن بالكامل',
          tone: 'accent',
          items: [
            { badge: 'mit + Dativ', de: 'Ich fahre mit **dem** Bus.', ar: '[[der Bus]] مذكّر → [[dem Bus]] في Dativ.' },
            { badge: 'von + Dativ', de: 'Das Geschenk ist von **meiner** Mutter.', ar: '[[meine Mutter]] مؤنّث → [[meiner Mutter]] في Dativ.' },
            { badge: 'bei + Dativ', de: 'Ich bin bei **meinem** Freund.', ar: '[[mein Freund]] مذكّر → [[meinem Freund]] في Dativ.' },
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
      introAr: 'أشهر خطأين: استخدام Akkusativ بعد فعل يحتاج Dativ، ونسيان -n على الجمع.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich helfe den Mann.',
              correct: 'Ich helfe dem Mann.',
              explanationAr: '[[helfen]] يحتاج Dativ دائماً، وليس Akkusativ.',
            },
            {
              wrong: 'Ich gebe die Kinder die Bücher.',
              correct: 'Ich gebe den Kindern die Bücher.',
              explanationAr: 'الجمع في Dativ يحتاج [[den]] + نهاية [[-n]] على الاسم: [[den Kindern]].',
            },
            {
              wrong: 'Das Auto gehört mein Vater.',
              correct: 'Das Auto gehört meinem Vater.',
              explanationAr: '[[gehören]] يحتاج Dativ: [[meinem Vater]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'Wem?', hintAr: 'ما وظيفته؟', backAr: 'يحدّد المفعول به غير المباشر — Dativ.' },
    { frontDe: 'dem · der · dem · den(+n)', hintAr: 'ما هذه الأشكال؟', backAr: 'أدوات Dativ: مذكّر، مؤنّث، محايد، جمع (مع -n على الاسم).' },
    { frontDe: 'helfen · danken · gefallen', hintAr: 'أيّ حالة تحتاج؟', backAr: 'Dativ دائماً، رغم أن لها مفعولاً واحداً فقط.' },
    { frontDe: 'Dativ-Person + Akkusativ-Sache', hintAr: 'ما الترتيب؟', backAr: 'الشخص (Dativ) قبل الشيء (Akkusativ): Ich gebe dem Kind das Buch.' },
  ],

  quiz: [
    {
      id: 'gr15-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الأداة الصحيحة',
      questionDe: 'Ich helfe ___ Frau.',
      options: ['die', 'der', 'dem', 'den'],
      correctIndex: 1,
      explanationAr: '[[helfen]] + Dativ، و[[die Frau]] مؤنّث → [[der Frau]].',
    },
    {
      id: 'gr15-q2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (das Kind في Dativ)',
      sentenceDe: 'Ich gebe ___ Kind einen Apfel.',
      acceptedAnswers: ['dem'],
      explanationAr: '[[das Kind]] محايد، وفي Dativ يصبح [[dem Kind]].',
    },
    {
      id: 'gr15-q3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im Dativ bekommt der Plural ein zusätzliches „-n": den Kindern.',
      isTrue: true,
      explanationAr: 'صحيح: الجمع في Dativ يأخذ -n إضافية.',
    },
    {
      id: 'gr15-q4',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['das Buch.', 'Ich', 'dem Kind', 'gebe'],
      correctOrder: [1, 3, 2, 0],
      explanationAr: '[[Ich gebe dem Kind das Buch.]] — Dativ قبل Akkusativ.',
    },
    {
      id: 'gr15-q5',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الاسم في Nominativ بشكله في Dativ',
      pairs: [
        { de: 'der Mann', ar: 'dem Mann' },
        { de: 'die Frau', ar: 'der Frau' },
        { de: 'das Kind', ar: 'dem Kind' },
        { de: 'die Kinder', ar: 'den Kindern' },
      ],
      explanationAr: 'راجع جدول الأداة المعرّفة أعلاه إن أخطأت.',
    },
  ],

  cheatSheet: [
    { de: 'Wem?', ar: 'سؤال تحديد المفعول به غير المباشر.' },
    { de: 'dem · der · dem · den(+n)', ar: 'أدوات Dativ — كل الأجناس تتغيّر.' },
    { de: 'die Kinder → den Kindern', ar: 'الجمع يأخذ -n إضافية في Dativ.' },
    { de: 'helfen, danken, gefallen, gehören, antworten', ar: 'أفعال تحتاج Dativ وحده.' },
    { de: 'Dativ (شخص) قبل Akkusativ (شيء)', ar: 'ترتيب المفعولين مع اسمين.' },
  ],
}

export default rule
