import type { Lesson } from '@/types'

/** key, word, Arabic meaning, example (German), example (Arabic). The months have no plural in use. */
const MONTHS: ReadonlyArray<readonly [string, string, string, string, string]> = [
  ['januar', 'Januar', 'يناير (كانون الثاني)', 'Der Januar hat 31 Tage.', 'شهر يناير فيه 31 يومًا.'],
  ['februar', 'Februar', 'فبراير (شباط)', 'Der Februar hat 28 oder 29 Tage.', 'شهر فبراير فيه 28 أو 29 يومًا.'],
  ['maerz', 'März', 'مارس (آذار)', 'Mein Geburtstag ist im März.', 'عيد ميلادي في مارس.'],
  ['april', 'April', 'أبريل (نيسان)', 'Im April habe ich Geburtstag.', 'عيد ميلادي في أبريل.'],
  ['mai', 'Mai', 'مايو (أيار)', 'Im Mai ist mein Geburtstag.', 'عيد ميلادي في مايو.'],
  ['juni', 'Juni', 'يونيو (حزيران)', 'Der Juni hat 30 Tage.', 'شهر يونيو فيه 30 يومًا.'],
  ['juli', 'Juli', 'يوليو (تموز)', 'Im Juli ist es warm.', 'في يوليو يكون الجو دافئًا.'],
  ['august', 'August', 'أغسطس (آب)', 'Der August hat 31 Tage.', 'شهر أغسطس فيه 31 يومًا.'],
  ['september', 'September', 'سبتمبر (أيلول)', 'Der September hat 30 Tage.', 'شهر سبتمبر فيه 30 يومًا.'],
  ['oktober', 'Oktober', 'أكتوبر (تشرين الأول)', 'Im Oktober habe ich Geburtstag.', 'عيد ميلادي في أكتوبر.'],
  ['november', 'November', 'نوفمبر (تشرين الثاني)', 'Im November ist es kalt.', 'في نوفمبر يكون الجو باردًا.'],
  ['dezember', 'Dezember', 'ديسمبر (كانون الأول)', 'Im Dezember ist Weihnachten.', 'عيد الميلاد المجيد في ديسمبر.'],
]

/** key, word, Arabic meaning, plural, example (German), example (Arabic). */
const DAYS: ReadonlyArray<readonly [string, string, string, string, string, string]> = [
  ['montag', 'Montag', 'الاثنين', 'Montage', 'Am Montag habe ich Deutschkurs.', 'يوم الاثنين عندي دورة الألمانية.'],
  ['dienstag', 'Dienstag', 'الثلاثاء', 'Dienstage', 'Am Dienstag arbeite ich.', 'يوم الثلاثاء أعمل.'],
  ['mittwoch', 'Mittwoch', 'الأربعاء', 'Mittwoche', 'Am Mittwoch lerne ich Deutsch.', 'يوم الأربعاء أتعلّم الألمانية.'],
  ['donnerstag', 'Donnerstag', 'الخميس', 'Donnerstage', 'Am Donnerstag arbeite ich zu Hause.', 'يوم الخميس أعمل من البيت.'],
  ['freitag', 'Freitag', 'الجمعة', 'Freitage', 'Am Freitag habe ich Geburtstag.', 'يوم الجمعة عيد ميلادي.'],
  ['samstag', 'Samstag', 'السبت', 'Samstage', 'Am Samstag habe ich frei.', 'يوم السبت أكون في إجازة.'],
  ['sonntag', 'Sonntag', 'الأحد', 'Sonntage', 'Am Sonntag habe ich Zeit.', 'يوم الأحد عندي وقت.'],
]

export const lessonWochentage: Lesson = {
  id: 'a1-m02-l05',
  slug: 'wochentage-monate',
  level: 'A1',
  moduleId: 'a1-m02',
  title: 'Wochentage und Monate',
  titleAr: 'أيام الأسبوع والشهور',
  estimatedMinutes: 15,
  objectivesAr: [
    'تسمية أيام الأسبوع السبعة والشهور الاثني عشر بالألمانية',
    'السؤال عن اليوم والإجابة: Welcher Tag ist heute? — Heute ist …',
    'استخدام am مع الأيام وأجزاء اليوم، واستخدام im مع الشهور',
    'كتابة أسماء الأيام والشهور بحرف كبير',
  ],
  explanation: [
    {
      titleAr: 'أيام الأسبوع (die Wochentage)',
      bodyAr:
        'الأيام السبعة: Montag، Dienstag، Mittwoch، Donnerstag، Freitag، Samstag، Sonntag. جميعها مذكّرة، فتقول: der Montag. تبدأ التقاويم الألمانية عادةً بيوم الاثنين، فالأسبوع يبدأ بـ Montag وينتهي بـ Sonntag. يُسمّى السبت أيضاً Sonnabend في شمال ألمانيا وشرقها، لكن Samstag هو الأكثر استخداماً عموماً. أما Samstag وSonntag معاً فهما das Wochenende (عطلة نهاية الأسبوع).',
    },
    {
      titleAr: 'السؤال عن اليوم وموعد الشيء',
      bodyAr:
        'نسأل عن اليوم بـ "Welcher Tag ist heute?" ونجيب "Heute ist Mittwoch.". ونسأل عن موعد حدث بـ "Wann ist …?" ونجيب بـ am ثم اليوم: "Der Kurs ist am Montag." لاحظ أننا لا نضيف كلمة "يوم" بالألمانية: نقول am Montag مباشرة.',
    },
    {
      titleAr: 'am للأيام وأجزاء اليوم، وim للشهور',
      bodyAr:
        'am هي اختصار an dem، وim هي اختصار in dem. مع الأيام وأجزاء اليوم نستخدم am: am Montag، am Wochenende، am Mittag، am Nachmittag، am Abend. ومع الشهور نستخدم im: im Mai، im Dezember. استثناء مهم: نقول in der Nacht وليس am Nacht.',
    },
    {
      titleAr: 'الشهور الاثنا عشر (die Monate)',
      bodyAr:
        'Januar، Februar، März، April، Mai، Juni، Juli، August، September، Oktober، November، Dezember. كلها مذكّرة: der Januar. تُنطق أسماء كثير منها قريبة من العربية أو الإنجليزية، لكن انتبه للكتابة: März فيها حرف ä. وفي النمسا يُقال غالباً Jänner بدل Januar.',
    },
    {
      titleAr: 'الحرف الكبير في أسماء الأيام والشهور',
      bodyAr:
        'في الألمانية تُكتب كل الأسماء بحرف كبير في أولها، وأسماء الأيام والشهور أسماء. فنكتب Montag وMai، وليس montag أو mai. العربية لا تعرف الحروف الكبيرة، فيحتاج هذا الأمر إلى انتباه خاص.',
    },
  ],
  examples: [
    { de: 'Welcher Tag ist heute?', ar: 'أي يوم اليوم؟' },
    { de: 'Heute ist Mittwoch.', ar: 'اليوم هو الأربعاء.' },
    { de: 'Der Deutschkurs ist am Montag.', ar: 'دورة الألمانية يوم الاثنين.' },
    { de: 'Samstag und Sonntag sind das Wochenende.', ar: 'السبت والأحد هما عطلة نهاية الأسبوع.' },
    { de: 'Mein Geburtstag ist im Mai.', ar: 'عيد ميلادي في مايو.' },
    { de: 'Wann ist dein Geburtstag? — Im März.', ar: 'متى عيد ميلادك؟ — في مارس.' },
  ],
  vocabulary: [
    ...DAYS.map(([key, word, meaningAr, plural, de, ar]) => ({
      id: `voc-wochentage-${key}`,
      word,
      article: 'der' as const,
      plural,
      partOfSpeech: 'noun' as const,
      meaningAr,
      level: 'A1' as const,
      category: 'Wochentage',
      example: { de, ar },
    })),
    ...MONTHS.map(([key, word, meaningAr, de, ar]) => ({
      id: `voc-monate-${key}`,
      word,
      article: 'der' as const,
      numberUse: 'none' as const,
      partOfSpeech: 'noun' as const,
      meaningAr,
      level: 'A1' as const,
      category: 'Monate',
      example: { de, ar },
    })),
    { id: 'voc-wochentage-tag', word: 'Tag', article: 'der', plural: 'Tage', partOfSpeech: 'noun', meaningAr: 'اليوم', level: 'A1', category: 'Wochentage', example: { de: 'Welcher Tag ist heute?', ar: 'أي يوم اليوم؟' } },
    { id: 'voc-wochentage-woche', word: 'Woche', article: 'die', plural: 'Wochen', partOfSpeech: 'noun', meaningAr: 'الأسبوع', level: 'A1', category: 'Wochentage', example: { de: 'Eine Woche hat sieben Tage.', ar: 'الأسبوع فيه سبعة أيام.' } },
    { id: 'voc-wochentage-wochenende', word: 'Wochenende', article: 'das', plural: 'Wochenenden', partOfSpeech: 'noun', meaningAr: 'عطلة نهاية الأسبوع', level: 'A1', category: 'Wochentage', example: { de: 'Samstag und Sonntag sind das Wochenende.', ar: 'السبت والأحد هما عطلة نهاية الأسبوع.' } },
    { id: 'voc-monate-monat', word: 'Monat', article: 'der', plural: 'Monate', partOfSpeech: 'noun', meaningAr: 'الشهر', level: 'A1', category: 'Monate', example: { de: 'Welcher Monat ist das?', ar: 'أي شهر هذا؟' } },
    { id: 'voc-wochentage-heute', word: 'heute', partOfSpeech: 'adverb', meaningAr: 'اليوم', level: 'A1', category: 'Wochentage', example: { de: 'Heute ist Freitag.', ar: 'اليوم هو الجمعة.' } },
    { id: 'voc-wochentage-geburtstag', word: 'Geburtstag', article: 'der', plural: 'Geburtstage', partOfSpeech: 'noun', meaningAr: 'عيد الميلاد', level: 'A1', category: 'Monate', example: { de: 'Mein Geburtstag ist im Mai.', ar: 'عيد ميلادي في مايو.' } },
  ],
  pronunciationTips: [
    {
      titleAr: 'نهاية Mittwoch',
      bodyAr: 'حرف ch في آخر Mittwoch يُنطق صوتاً خشناً يشبه "خ" العربية، لأنه يأتي بعد حرف o (يُسمّى ach-Laut).',
      example: 'Mittwoch',
    },
    {
      titleAr: 'المقطع -tag في أسماء الأيام',
      bodyAr: 'في آخر Montag وFreitag وغيرهما يُنطق حرف g في نهاية المقطع مثل k، فيُسمع "تاك" وليس "تاغ".',
      example: 'Freitag',
    },
  ],
  exercises: [
    {
      id: 'ex-wochentage-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر اليوم الصحيح',
      questionDe: 'Welcher Tag kommt nach Mittwoch?',
      options: ['Dienstag', 'Donnerstag', 'Freitag', 'Montag'],
      correctIndex: 1,
      explanationAr: 'الترتيب: Montag، Dienstag، Mittwoch، Donnerstag. فبعد Mittwoch (الأربعاء) يأتي Donnerstag (الخميس).',
    },
    {
      id: 'ex-wochentage-2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الجملة',
      sentenceDe: 'Der Deutschkurs ist ___ Montag.',
      acceptedAnswers: ['am'],
      explanationAr: 'مع أيام الأسبوع نستخدم am (اختصار an dem): am Montag.',
    },
    {
      id: 'ex-wochentage-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الجملة',
      sentenceDe: 'Mein Geburtstag ist ___ Mai.',
      acceptedAnswers: ['im'],
      explanationAr: 'مع الشهور نستخدم im (اختصار in dem): im Mai.',
    },
    {
      id: 'ex-wochentage-4',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Der Kurs ist in Montag.',
      isTrue: false,
      explanationAr: 'الجملة خاطئة. مع اليوم نقول am Montag، ونستخدم in/im مع الشهور فقط.',
    },
    {
      id: 'ex-wochentage-5',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق اليوم الألماني مع معناه',
      pairs: [
        { de: 'Montag', ar: 'الاثنين' },
        { de: 'Mittwoch', ar: 'الأربعاء' },
        { de: 'Donnerstag', ar: 'الخميس' },
        { de: 'Freitag', ar: 'الجمعة' },
        { de: 'Sonntag', ar: 'الأحد' },
      ],
      explanationAr: 'تذكّر أن الأسبوع الألماني يبدأ بـ Montag وينتهي بـ Sonntag.',
    },
    {
      id: 'ex-wochentage-6',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات لتكوين جملة',
      words: ['Montag', 'Der', 'am', 'Kurs', 'ist'],
      correctOrder: [1, 3, 4, 2, 0],
      explanationAr: 'الجملة الصحيحة: Der Kurs ist am Montag. الفعل ist في المرتبة الثالثة، ثم am واليوم.',
    },
    {
      id: 'ex-wochentage-7',
      type: 'vocab-recall',
      level: 'A1',
      promptAr: 'ما معنى هذه الكلمة؟',
      vocabularyId: 'voc-wochentage-wochenende',
      questionDe: 'das Wochenende',
      correctAnswerAr: 'عطلة نهاية الأسبوع',
      distractorsAr: ['يوم الاثنين', 'الشهر', 'الأسبوع'],
      explanationAr: 'Wochenende هو السبت والأحد معاً، وكلمة Woche وحدها تعني "الأسبوع".',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Der Kurs ist in Montag. / Der Kurs ist im Montag.',
      correct: 'Der Kurs ist am Montag.',
      explanationAr: 'مع أيام الأسبوع وأجزاء اليوم نستخدم am، ولا نستخدم in أو im معها.',
    },
    {
      wrong: 'Mein Geburtstag ist am Mai.',
      correct: 'Mein Geburtstag ist im Mai.',
      explanationAr: 'مع الشهور نستخدم im، وليس am.',
    },
    {
      wrong: 'montag، mai (بحرف صغير)',
      correct: 'Montag، Mai',
      explanationAr: 'أسماء الأيام والشهور أسماء، فتبدأ دائماً بحرف كبير في الألمانية.',
    },
  ],
}
