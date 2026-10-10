import type { GrammarRule } from '@/types'

/**
 * Rule 05 — question word order: Ja-/Nein-Fragen (verb-first) and
 * W-Fragen (question word first, verb second). Builds directly on rule 04
 * (Satzbau). Scope stays narrow on purpose:
 *  - `wer` is presented as a subject (Nominativ) only — its Akkusativ/
 *    Dativ forms (wen/wem) belong to rules 09 and 15.
 *  - `Doch` (contradicting a negative question) is mentioned only as an
 *    aside; it depends on Negation (rule 08), not yet taught.
 */
const rule: GrammarRule = {
  id: 'gr-05',
  number: 5,
  slug: '05-w-fragen-ja-nein-fragen',
  level: 'A1',
  termDe: 'W-Fragen / Ja-Nein-Fragen',
  titleAr: 'أسئلة W وأسئلة نعم/لا',
  eyebrowAr: 'الدرس الخامس في خارطة القواعد',
  taglineAr:
    'في الألمانية نوعان من الأسئلة، ولكلّ منهما موضع ثابت للفعل: في **سؤال نعم/لا** ينتقل الفعل إلى **الموضع الأول**، وفي **سؤال بأداة استفهام** (W-Frage) تشغل الأداة الموضع الأول ويبقى الفعل في **الموضع الثاني** — نفس القاعدة التي تعلّمتها في [[Satzbau]].',
  stats: [
    { value: '2', labelAr: 'نوعا سؤال' },
    { value: '9', labelAr: 'أدوات استفهام أساسية' },
    { value: '40+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Woher kommst du? — Ich komme aus Ägypten.',
    ar: 'من أين أنتَ؟ — أنا من مصر.',
  },
  objectivesAr: [
    'تكوّن سؤال نعم/لا بوضع الفعل في الموضع الأول.',
    'تحفظ أدوات الاستفهام التسع الأساسية ([[wer]]، [[was]]، [[wo]]، [[wohin]]، [[woher]]، [[wann]]، [[warum]]، [[wie]]، [[welche]]) ومعناها.',
    'تكوّن سؤال W بترتيب صحيح: الأداة، ثم الفعل، ثم الفاعل.',
    'تفرّق بين [[wo]] و[[wohin]] و[[woher]] ولا تخلط بينها.',
    'تجيب عن كلا نوعَي السؤال بجملة كاملة أو قصيرة.',
  ],

  sections: [
    {
      id: 'overview',
      navLabelAr: 'نظرة عامة',
      kickerDe: 'Überblick',
      titleAr: 'نوعا السؤال',
      titleDe: 'Fragetypen',
      tone: 'accent',
      introAr:
        'أيّ سؤال ألماني يبدأ إمّا **بالفعل مباشرة** (سؤال نعم/لا) أو **بأداة استفهام** (سؤال W). لا يوجد شكل ثالث، ولا حاجة لكلمة مساعدة مثل «هل» العربية — يكفي أن يتحرّك الفعل إلى مكانه الصحيح.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Verb', tone: 'accent', noteAr: 'سؤال نعم/لا' },
            { text: 'Subjekt', tone: 'primary' },
            { text: '…?' },
          ],
        },
        {
          kind: 'formula',
          tags: [
            { text: 'W-Wort', tone: 'plum', noteAr: 'سؤال W' },
            { text: 'Verb', tone: 'primary' },
            { text: 'Subjekt', tone: 'accent' },
            { text: '…?' },
          ],
        },
        {
          kind: 'compare',
          titleAr: 'جرّب بنفسك: نفس الفعل، نوعان من الأسئلة',
          modes: [
            {
              labelAr: 'سؤال نعم/لا',
              captionAr: 'الفعل [[kommst]] ينتقل إلى الموضع الأول، والفاعل [[du]] بعده مباشرة.',
              parts: [
                { text: 'Kommst', tone: 'accent' },
                { text: 'du', tone: 'plum' },
                { text: 'aus Syrien?' },
              ],
            },
            {
              labelAr: 'سؤال W',
              captionAr: 'أداة الاستفهام [[Woher]] تشغل الموضع الأول، والفعل [[kommst]] يبقى ثانياً.',
              parts: [
                { text: 'Woher', tone: 'highlight' },
                { text: 'kommst', tone: 'accent' },
                { text: 'du', tone: 'plum' },
                { text: '?' },
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'ja-nein',
      navLabelAr: 'أسئلة نعم/لا',
      kickerDe: 'Ja-/Nein-Fragen',
      titleAr: 'أسئلة نعم/لا: الفعل أولاً',
      titleDe: 'Verb-Erst-Stellung',
      tone: 'accent',
      introAr:
        'لتحويل جملة خبرية إلى سؤال نعم/لا، انقل الفعل المصرَّف إلى **بداية الجملة**، ثم ضع الفاعل بعده مباشرة. لا حاجة لأداة مثل «هل» — موضع الفعل وحده يكفي لصنع السؤال.',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'من جملة خبرية إلى سؤال',
          modes: [
            {
              labelAr: 'جملة خبرية',
              captionAr: 'الفعل [[bist]] في الموضع الثاني كالمعتاد.',
              parts: [{ text: 'Du' }, { text: 'bist', tone: 'accent' }, { text: 'müde.' }],
            },
            {
              labelAr: 'سؤال نعم/لا',
              captionAr: 'الفعل [[Bist]] ينتقل إلى الموضع الأول؛ الفاعل [[du]] بعده.',
              parts: [{ text: 'Bist', tone: 'accent' }, { text: 'du', tone: 'plum' }, { text: 'müde?' }],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'أسئلة نعم/لا في الحياة اليومية',
          tone: 'accent',
          items: [
            { badge: 'sein', de: '**Bist** du Student?', ar: 'هل أنتَ طالب؟' },
            { badge: 'haben', de: '**Hast** du Zeit?', ar: 'هل لديك وقت؟' },
            { badge: 'فعل منتظم', de: '**Wohnst** du in Berlin?', ar: 'هل تسكن في برلين؟' },
            { badge: 'فعل e→i', de: '**Sprichst** du Deutsch?', ar: 'هل تتحدّث الألمانية؟' },
            { badge: 'رسمي', de: '**Kommen** Sie aus Ägypten?', ar: 'هل حضرتك من مصر؟' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'الإجابة: Ja أم Nein',
          bodyAr:
            'الإجابة المختصرة تكون بـ [[Ja]] (نعم) أو [[Nein]] (لا)، تليها الجملة كاملةً إن أردت التفصيل: [[Bist du müde? — Ja, ich bin müde.]] أو [[Nein, ich bin nicht müde.]] (تفاصيل النفي في الدرس القادم [[Negation]]).',
        },
        {
          kind: 'details',
          summaryAr: 'ماذا لو كان السؤال منفياً؟ (Doch)',
          paragraphsAr: [
            'حين يكون السؤال نفسه منفياً، مثل [[Bist du nicht müde?]] (أما أنتَ متعب؟)، تستخدم الألمانية كلمة خاصة [[Doch]] بدل [[Ja]] لتناقض النفي: [[Doch, ich bin müde.]] (بلى، أنا متعب). هذا التفصيل يحتاج فهم النفي أولاً — سنعود إليه بعد درس [[Negation]] (الدرس ٠٨).',
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: حوّل إلى سؤال',
          exercises: [
            {
              id: 'gr05-p1-order1',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب لتكوّن سؤال نعم/لا',
              words: ['aus', 'du', 'Kommst', 'Syrien?'],
              correctOrder: [2, 1, 0, 3],
              explanationAr: 'الفعل [[Kommst]] أولاً، ثم الفاعل [[du]]: [[Kommst du aus Syrien?]]',
            },
            {
              id: 'gr05-p1-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أيّ سؤال صحيح؟',
              questionDe: '',
              options: ['Du bist müde?', 'Bist du müde?', 'Du müde bist?', 'Müde du bist?'],
              correctIndex: 1,
              explanationAr: 'سؤال نعم/لا: الفعل [[Bist]] في الموضع الأول.',
            },
          ],
        },
      ],
    },

    {
      id: 'w-woerter',
      navLabelAr: 'أدوات الاستفهام',
      kickerDe: 'W-Wörter',
      titleAr: 'أدوات الاستفهام التسع',
      titleDe: 'W-Fragen',
      tone: 'plum',
      introAr:
        'كل أدوات الاستفهام في الألمانية تقريباً تبدأ بحرف **W** — ولهذا تسمّى الأسئلة بهذا الاسم. الأداة تشغل الموضع الأول، والفعل يبقى في الموضع الثاني كما في أيّ جملة أخرى.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أدوات الاستفهام الأساسية',
          columns: [
            { header: 'الأداة', lang: 'de', tone: 'plum' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['wer', 'من (فاعل)', 'Wer ist das?', 'من هذا؟'],
            ['was', 'ماذا', 'Was machst du?', 'ماذا تفعل؟'],
            ['wo', 'أين (مكان ثابت)', 'Wo wohnst du?', 'أين تسكن؟'],
            ['wohin', 'إلى أين', 'Wohin gehst du?', 'إلى أين تذهب؟'],
            ['woher', 'من أين', 'Woher kommst du?', 'من أين أنتَ؟'],
            ['wann', 'متى', 'Wann kommst du?', 'متى ستأتي؟'],
            ['warum', 'لماذا', 'Warum lernst du Deutsch?', 'لماذا تتعلّم الألمانية؟'],
            ['wie', 'كيف', 'Wie geht es dir?', 'كيف حالك؟'],
            ['wie viel(e)', 'كم', 'Wie viele Kinder hast du?', 'كم طفلاً لديك؟'],
            ['welche/r/s', 'أيّ', 'Welche Farbe magst du?', 'أيّ لون تحبّ؟'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'star',
          titleAr: 'الترتيب لا يتغيّر أبداً',
          bodyAr:
            'أياً كانت الأداة، الترتيب ثابت: **أداة الاستفهام ← الفعل ← الفاعل ← الباقي**. هذا هو نفس مبدأ «الفعل في الموضع الثاني» الذي تعلّمته في [[Satzbau]] — الأداة تحتلّ فقط الموضع الأول بدل الفاعل أو الظرف.',
        },
        {
          kind: 'examples',
          titleAr: 'كل أداة في جملة كاملة',
          tone: 'plum',
          columns: 2,
          items: [
            { badge: 'wer', de: '**Wer** spricht Deutsch?', ar: 'من يتحدّث الألمانية؟' },
            { badge: 'was', de: '**Was** ist das?', ar: 'ما هذا؟' },
            { badge: 'wo', de: '**Wo** ist der Bahnhof?', ar: 'أين المحطة؟' },
            { badge: 'wohin', de: '**Wohin** fährt der Bus?', ar: 'إلى أين تذهب الحافلة؟' },
            { badge: 'woher', de: '**Woher** kommt ihr?', ar: 'من أين أنتم؟' },
            { badge: 'wann', de: '**Wann** beginnt der Kurs?', ar: 'متى تبدأ الدورة؟' },
            { badge: 'warum', de: '**Warum** bist du müde?', ar: 'لماذا أنتَ متعب؟' },
            { badge: 'wie', de: '**Wie** heißt du?', ar: 'ما اسمك؟' },
            { badge: 'wie viel', de: '**Wie viel** kostet das?', ar: 'كم ثمن هذا؟' },
            { badge: 'welche', de: '**Welches** Buch liest du?', ar: 'أيّ كتاب تقرأ؟' },
          ],
        },
      ],
    },

    {
      id: 'wo-wohin-woher',
      navLabelAr: 'wo · wohin · woher',
      kickerDe: 'Ort oder Richtung?',
      titleAr: 'wo أم wohin أم woher؟',
      titleDe: 'Ortsfragen',
      tone: 'highlight',
      introAr:
        'ثلاث أدوات عن المكان تلتبس كثيراً على متحدّثي العربية لأن العربية تستخدم «أين» للثلاثة. الألمانية تفرّق بدقّة حسب **اتجاه الحركة**.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الفرق بين الأدوات الثلاث',
          columns: [
            { header: 'الأداة', lang: 'de', tone: 'highlight' },
            { header: 'تسأل عن', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['wo', 'مكان ثابت — أين هو؟', 'Wo bist du?', 'أين أنتَ (الآن)؟'],
            ['wohin', 'اتجاه — إلى أين؟', 'Wohin gehst du?', 'إلى أين تذهب؟'],
            ['woher', 'مصدر — من أين؟', 'Woher kommst du?', 'من أين أنتَ (أصلاً)؟'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'compass',
          titleAr: 'حيلة للتذكّر',
          bodyAr:
            '[[wo]] وحدها = سكون (أين تقف). [[wohin]] = [[wo]] + [[hin]] (إلى هناك) = حركة نحو مكان. [[woher]] = [[wo]] + [[her]] (من هناك) = حركة من مكان. الاتجاه العام لـ [[hin]] بعيداً و[[her]] قريباً يظهر أيضاً في أفعال أخرى لاحقاً في الخارطة.',
        },
        {
          kind: 'examples',
          titleAr: 'الثلاثة في سياق واحد',
          tone: 'highlight',
          items: [
            { badge: 'wo', de: '**Wo** arbeitest du?', ar: 'أين تعمل؟' },
            { badge: 'wohin', de: '**Wohin** fahrt ihr im Urlaub?', ar: 'إلى أين تسافرون في العطلة؟' },
            { badge: 'woher', de: '**Woher** hast du das Buch?', ar: 'من أين حصلت على هذا الكتاب؟' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: wo أم wohin أم woher؟',
          exercises: [
            {
              id: 'gr05-p2-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أكمل السؤال المناسب لهذه الإجابة: „Ich komme aus dem Iran."',
              questionDe: '',
              options: ['Wo kommst du?', 'Wohin kommst du?', 'Woher kommst du?', 'Wer kommst du?'],
              correctIndex: 2,
              explanationAr: 'الإجابة تحدّد مصدراً (Iran)، فالسؤال المناسب [[Woher]].',
            },
            {
              id: 'gr05-p2-mc2',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أكمل السؤال المناسب لهذه الإجابة: „Ich bin zu Hause."',
              questionDe: '',
              options: ['Wo bist du?', 'Wohin bist du?', 'Woher bist du?', 'Was bist du?'],
              correctIndex: 0,
              explanationAr: 'الإجابة تصف مكاناً ثابتاً، فالسؤال المناسب [[Wo]].',
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
      introAr: 'أغلب أخطاء الأسئلة سببها نسيان قاعدة موضع الفعل، أو الترجمة الحرفية من لغة أخرى.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Du kommst aus Syrien?',
              correct: 'Kommst du aus Syrien?',
              explanationAr: 'سؤال نعم/لا يحتاج نقل الفعل إلى الموضع الأول، وليس الاكتفاء بعلامة استفهام في الكلام المكتوب.',
            },
            {
              wrong: 'Woher du kommst?',
              correct: 'Woher kommst du?',
              explanationAr: 'الترتيب الصحيح: أداة الاستفهام ← الفعل ← الفاعل، وليس أداة الاستفهام ← الفاعل ← الفعل (كما في الإنجليزية أحياناً).',
            },
            {
              wrong: 'Wo gehst du?',
              correct: 'Wohin gehst du?',
              explanationAr: '[[gehen]] فعل حركة نحو وجهة، فيحتاج [[wohin]] لا [[wo]].',
            },
            {
              wrong: 'Wohin bist du geboren?',
              correct: 'Wo bist du geboren?',
              explanationAr: 'مكان الولادة موقعٌ ثابت لا اتجاه، فيُسأل عنه بـ [[wo]] وليس [[wohin]] (الوجهة). أمّا السؤال عن البلد الأصلي فيكون بـ [[woher]]: [[Woher kommst du?]]',
            },
            {
              wrong: 'Wie du heißt?',
              correct: 'Wie heißt du?',
              explanationAr: 'نفس قاعدة الترتيب: الأداة، ثم الفعل، ثم الفاعل.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'Verb + Subjekt + …?', hintAr: 'أيّ نوع سؤال؟', backAr: 'سؤال نعم/لا — الفعل ينتقل إلى الموضع الأول.', exampleDe: '**Bist** du müde?' },
    { frontDe: 'W-Wort + Verb + Subjekt?', hintAr: 'أيّ نوع سؤال؟', backAr: 'سؤال W — الأداة أولاً، والفعل يبقى ثانياً.', exampleDe: '**Woher** kommst du?' },
    { frontDe: 'wer', hintAr: 'ماذا تعني؟', backAr: 'من (كفاعل).', exampleDe: '**Wer** ist das?' },
    { frontDe: 'wo', hintAr: 'ماذا تعني؟', backAr: 'أين — مكان ثابت، بلا حركة.', exampleDe: '**Wo** wohnst du?' },
    { frontDe: 'wohin', hintAr: 'ماذا تعني؟', backAr: 'إلى أين — اتجاه الحركة.', exampleDe: '**Wohin** gehst du?' },
    { frontDe: 'woher', hintAr: 'ماذا تعني؟', backAr: 'من أين — مصدر الحركة أو الأصل.', exampleDe: '**Woher** kommst du?' },
    { frontDe: 'warum', hintAr: 'ماذا تعني؟', backAr: 'لماذا.', exampleDe: '**Warum** lernst du Deutsch?' },
    { frontDe: 'wie viel(e)', hintAr: 'ماذا تعني؟', backAr: 'كم (viel لما لا يُعدّ، viele لما يُعدّ).', exampleDe: '**Wie viele** Geschwister hast du?' },
  ],

  quiz: [
    {
      id: 'gr05-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ سؤال نعم/لا صحيح؟',
      questionDe: '',
      options: ['Du hast Zeit?', 'Hast du Zeit?', 'Hast Zeit du?', 'Du Zeit hast?'],
      correctIndex: 1,
      explanationAr: 'الفعل [[Hast]] ينتقل إلى الموضع الأول.',
    },
    {
      id: 'gr05-q2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ أداة تناسب: „___ ist das?" (تسأل عن شخص)',
      questionDe: '',
      options: ['Was', 'Wer', 'Wo', 'Wann'],
      correctIndex: 1,
      explanationAr: '[[Wer]] تُستخدم للسؤال عن شخص.',
    },
    {
      id: 'gr05-q3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ أداة تناسب هذه الإجابة: „Um acht Uhr."',
      questionDe: '',
      options: ['Wo', 'Wann', 'Warum', 'Wie'],
      correctIndex: 1,
      explanationAr: 'الإجابة تحدّد وقتاً، فالسؤال بـ [[Wann]] (متى).',
    },
    {
      id: 'gr05-q4',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Wo fährst du im Sommer? (تسأل عن وجهة السفر)',
      isTrue: false,
      explanationAr: 'خطأ: السفر إلى وجهة يحتاج [[Wohin]]، وليس [[Wo]].',
    },
    {
      id: 'gr05-q5',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب لتكوّن سؤالاً',
      words: ['heißt', 'Wie', 'du?'],
      correctOrder: [1, 0, 2],
      explanationAr: '[[Wie heißt du?]] — أداة، فعل، فاعل.',
    },
    {
      id: 'gr05-q6',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل السؤال المناسب: „Ich komme aus Marokko."',
      sentenceDe: '___ kommst du?',
      acceptedAnswers: ['Woher', 'woher'],
      explanationAr: 'الإجابة تحدّد مصدراً، فالسؤال بـ [[Woher]].',
    },
    {
      id: 'gr05-q7',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق أداة الاستفهام بمعناها',
      pairs: [
        { de: 'wer', ar: 'من' },
        { de: 'wann', ar: 'متى' },
        { de: 'warum', ar: 'لماذا' },
        { de: 'wie viele', ar: 'كم (للمعدود)' },
      ],
      explanationAr: 'راجع جدول أدوات الاستفهام أعلاه إن أخطأت.',
    },
    {
      id: 'gr05-q8',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'من أين أنتَ؟',
      acceptedAnswers: ['Woher kommst du?', 'Woher bist du?'],
      explanationAr: 'السؤال عن الأصل يستخدم [[Woher]].',
    },
  ],

  cheatSheet: [
    { de: 'Verb + Subjekt + …?', ar: 'سؤال نعم/لا: الفعل أولاً.' },
    { de: 'W-Wort + Verb + Subjekt + …?', ar: 'سؤال W: الأداة أولاً، والفعل ثانياً.' },
    { de: 'wer · was · wo · wohin · woher', ar: 'من · ماذا · أين (ثابت) · إلى أين · من أين.' },
    { de: 'wann · warum · wie · wie viel(e) · welche', ar: 'متى · لماذا · كيف · كم · أيّ.' },
    { de: 'Wo bist du? / Wohin gehst du? / Woher kommst du?', ar: 'ثلاثتها تُترجم بـ «أين» بالعربية، لكنها مختلفة تماماً في الألمانية.' },
    { de: 'Ja / Nein / (Doch)', ar: 'إجابات نعم/لا؛ Doch تناقض سؤالاً منفياً (تُشرح لاحقاً).' },
  ],
}

export default rule
