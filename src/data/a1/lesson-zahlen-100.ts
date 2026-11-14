import type { Lesson } from '@/types'

/**
 * Numbers above 100, prices and phone numbers. "Zahlen" teaches 0–99; a learner who shops, fills in a form or
 * gives a phone number needs hundreds, thousands, euros and cents, and the way digits are read aloud.
 */
export const lessonZahlen100: Lesson = {
  id: 'a1-m01-l09',
  slug: 'zahlen-ab-100-und-preise',
  level: 'A1',
  moduleId: 'a1-m01',
  title: 'Zahlen ab 100, Preise und Telefonnummern',
  titleAr: 'الأرقام بعد المئة والأسعار وأرقام الهاتف',
  estimatedMinutes: 22,
  objectivesAr: [
    'قراءة الأرقام من 100 إلى 999 ثم الآلاف: hundert، zweihundert، tausend',
    'قول السعر بالأورو والسنت: zwei Euro fünfzig',
    'قراءة رقم الهاتف والرمز البريدي ورقم البيت رقماً رقماً',
    'قول سنة الميلاد: neunzehnhundertfünfundneunzig',
  ],
  explanation: [
    {
      titleAr: 'المئات: hundert + الرقم',
      bodyAr:
        'المئة **(ein)hundert**، ومئتان **zweihundert**، وثلاثمئة **dreihundert** … إلى **neunhundert**. نكتب الرقم كله كلمة واحدة، ونضيف ما بعد المئة مباشرة بلا "und": 101 = **hunderteins**، 120 = **hundertzwanzig**، 250 = **zweihundertfünfzig**. وما دون المئة يبقى كما تعلّمت: الآحاد قبل العشرات، فـ 125 = **hundertfünfundzwanzig** (مئة + خمسة + و + عشرين).',
    },
    {
      titleAr: 'الآلاف: tausend',
      bodyAr:
        'الألف **(ein)tausend**، وألفان **zweitausend**، و10 000 = **zehntausend**. نقرأ 1500 هكذا: **eintausendfünfhundert** أو **tausendfünfhundert**. وللمليون: **eine Million**. والترتيب دائماً من الكبير إلى الصغير: 2350 = **zweitausenddreihundertfünfzig**.',
    },
    {
      titleAr: 'الأسعار: Euro وCent',
      bodyAr:
        'نقول السعر بذكر الأورو ثم السنت، ولا ننطق الفاصلة: 2,50 € = **zwei Euro fünfzig**، و12,99 € = **zwölf Euro neunundneunzig**، و0,80 € = **achtzig Cent**. وكلمة **Euro** وكلمة **Cent** لا تأخذان "s" بعد الرقم: zwei Euro، وليس zwei Euros. والسؤال: **Wie viel kostet das؟** والجواب: **Das kostet fünf Euro.**',
    },
    {
      titleAr: 'أرقام الهاتف وأرقام البيوت',
      bodyAr:
        'نقرأ رقم الهاتف **رقماً رقماً** أو بمجموعات من رقمين: 0171 234 56 78 = null eins sieben eins، zwei drei vier، fünf sechs، sieben acht. والصفر **null**. وفي المكالمات يقول كثيرون **zwo** بدل zwei حتى لا يُخلط بين zwei وdrei. أما رقم البيت فنقرأه رقماً عادياً: Goethestraße 12 = zwölf. والرمز البريدي (die Postleitzahl) نقرأه غالباً رقماً رقماً.',
    },
    {
      titleAr: 'السنوات: neunzehnhundert …',
      bodyAr:
        'السنوات بين 1100 و1999 تُقرأ بالمئات: 1995 = **neunzehnhundertfünfundneunzig** (تسعة عشر مئة وخمسة وتسعون). وبعد سنة 2000 نقرأ بالآلاف: 2026 = **zweitausendsechsundzwanzig**. لا نقول eintausendneunhundert لسنة الميلاد.',
    },
  ],
  examples: [
    { de: 'Das kostet zwei Euro fünfzig.', ar: 'هذا يكلّف يورَوين وخمسين سنتاً.' },
    { de: 'Wie viel kostet das?', ar: 'كم يكلّف هذا؟' },
    { de: 'Das Brot kostet neunzig Cent.', ar: 'الخبز يكلّف تسعين سنتاً.' },
    { de: 'Die Wohnung kostet vierhundertfünfzig Euro.', ar: 'الشقة تكلّف أربعمئة وخمسين يورو.' },
    { de: 'Meine Handynummer ist null eins sieben eins, zwei drei vier fünf sechs sieben acht.', ar: 'رقم هاتفي المحمول هو 0171 2345678.' },
    { de: 'Ich wohne in der Goethestraße zwölf.', ar: 'أسكن في شارع غوته رقم 12.' },
    { de: 'Mein Geburtsjahr ist neunzehnhundertfünfundneunzig.', ar: 'سنة ميلادي هي 1995.' },
    { de: 'Das Auto ist teuer: zwölftausend Euro.', ar: 'السيارة غالية: اثنا عشر ألف يورو.' },
  ],
  vocabulary: [
    { id: 'voc-zahlen100-hundert', word: 'hundert', partOfSpeech: 'number', meaningAr: 'مئة', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Das Buch kostet hundert Euro.', ar: 'الكتاب يكلّف مئة يورو.' } },
    { id: 'voc-zahlen100-tausend', word: 'tausend', partOfSpeech: 'number', meaningAr: 'ألف', level: 'A1', category: 'Zahlen und Preise', example: { de: 'In der Stadt wohnen tausend Menschen.', ar: 'يسكن في المدينة ألف شخص.' } },
    { id: 'voc-zahlen100-null', word: 'null', partOfSpeech: 'number', meaningAr: 'صفر', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Die Nummer beginnt mit null.', ar: 'يبدأ الرقم بصفر.' } },
    { id: 'voc-zahlen100-euro', word: 'Euro', article: 'der', plural: 'Euro', partOfSpeech: 'noun', meaningAr: 'اليورو', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Das Ticket kostet fünf Euro.', ar: 'التذكرة تكلّف خمسة يورو.' } },
    { id: 'voc-zahlen100-cent', word: 'Cent', article: 'der', plural: 'Cent', partOfSpeech: 'noun', meaningAr: 'السنت', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Der Apfel kostet fünfzig Cent.', ar: 'التفاحة تكلّف خمسين سنتاً.' } },
    { id: 'voc-zahlen100-preis', word: 'Preis', article: 'der', plural: 'Preise', partOfSpeech: 'noun', meaningAr: 'السعر', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Der Preis ist niedrig.', ar: 'السعر منخفض.' } },
    { id: 'voc-zahlen100-telefonnummer', word: 'Telefonnummer', article: 'die', plural: 'Telefonnummern', partOfSpeech: 'noun', meaningAr: 'رقم الهاتف', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Wie ist Ihre Telefonnummer?', ar: 'ما رقم هاتفكم؟' } },
    { id: 'voc-zahlen100-handynummer', word: 'Handynummer', article: 'die', plural: 'Handynummern', partOfSpeech: 'noun', meaningAr: 'رقم الهاتف المحمول', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Meine Handynummer ist neu.', ar: 'رقم هاتفي المحمول جديد.' } },
    { id: 'voc-zahlen100-hausnummer', word: 'Hausnummer', article: 'die', plural: 'Hausnummern', partOfSpeech: 'noun', meaningAr: 'رقم البيت', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Meine Hausnummer ist zwölf.', ar: 'رقم بيتي اثنا عشر.' } },
    { id: 'voc-zahlen100-postleitzahl', word: 'Postleitzahl', article: 'die', plural: 'Postleitzahlen', partOfSpeech: 'noun', meaningAr: 'الرمز البريدي', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Die Postleitzahl hat fünf Ziffern.', ar: 'الرمز البريدي من خمسة أرقام.' } },
    { id: 'voc-zahlen100-ziffer', word: 'Ziffer', article: 'die', plural: 'Ziffern', partOfSpeech: 'noun', meaningAr: 'الرقم (الخانة)', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Die Nummer hat zehn Ziffern.', ar: 'الرقم من عشر خانات.' } },
    { id: 'voc-zahlen100-kosten', word: 'kosten', partOfSpeech: 'verb', meaningAr: 'يكلّف', level: 'A1', category: 'Zahlen und Preise', verb: { praeteritum: 'kostete', partizip: 'gekostet', auxiliary: 'haben' }, example: { de: 'Wie viel kostet die Jacke?', ar: 'كم تكلّف الجاكيت؟' } },
    { id: 'voc-zahlen100-teuer', word: 'teuer', partOfSpeech: 'adjective', meaningAr: 'غالٍ', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Das Hotel ist sehr teuer.', ar: 'الفندق غالٍ جداً.' } },
    { id: 'voc-zahlen100-guenstig', word: 'günstig', partOfSpeech: 'adjective', meaningAr: 'رخيص / بسعر مناسب', level: 'A1', category: 'Zahlen und Preise', example: { de: 'Die Wohnung ist günstig.', ar: 'الشقة بسعر مناسب.' } },
  ],
  pronunciationTips: [
    {
      titleAr: 'tausend وhundert',
      bodyAr: 'في tausend تُنطق au "آو" وحرف s بعدها مجهور كالزاي: "تآوزِنت". وفي hundert تُنطق h بهمسة خفيفة: "هُنْدِرت".',
      example: 'tausend',
    },
    {
      titleAr: 'zwo على الهاتف',
      bodyAr: 'في المكالمات تُسمع zwo بمعنى zwei حتى لا تُخلط مع drei. الكلمتان صحيحتان في الكلام، لكن في الكتابة نكتب zwei.',
      example: 'zwei',
    },
  ],
  exercises: [
    {
      id: 'ex-zahlen100-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'كيف نقرأ 350؟',
      questionDe: '',
      options: ['dreihundertfünfzig', 'dreißighundertfünf', 'dreihundertundfünf', 'fünfhundertdreißig'],
      correctIndex: 0,
      explanationAr: '350 = ثلاثمئة وخمسون = dreihundertfünfzig. بلا und بعد hundert.',
    },
    {
      id: 'ex-zahlen100-2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل: 2000',
      sentenceDe: 'zwei___',
      acceptedAnswers: ['tausend'],
      hint: 'ألف',
      explanationAr: '2000 = zweitausend.',
    },
    {
      id: 'ex-zahlen100-3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'كيف نقول السعر 2,50 €؟',
      questionDe: '',
      options: ['zwei Euro fünfzig', 'zwei Komma fünfzig', 'zwei Euros fünfzig', 'zweihundertfünfzig Euro'],
      correctIndex: 0,
      explanationAr: 'نقول الأورو ثم السنت ولا ننطق الفاصلة: zwei Euro fünfzig.',
    },
    {
      id: 'ex-zahlen100-4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بالعملة',
      sentenceDe: 'Der Kaffee kostet drei ___ fünfzig.',
      acceptedAnswers: ['Euro'],
      hint: 'العملة الأوروبية',
      explanationAr: 'Euro لا تأخذ s بعد الرقم: drei Euro fünfzig.',
    },
    {
      id: 'ex-zahlen100-5',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Man sagt: Das kostet zwei Euros.',
      isTrue: false,
      explanationAr: 'خطأ. بعد الرقم نقول zwei Euro بلا s.',
    },
    {
      id: 'ex-zahlen100-6',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الرقم بالأرقام',
      pairs: [
        { de: 'zweihundert', ar: '200' },
        { de: 'fünfhundert', ar: '500' },
        { de: 'neunhundert', ar: '900' },
        { de: 'eintausend', ar: '1000' },
      ],
      explanationAr: 'hundert = 100، tausend = 1000.',
    },
    {
      id: 'ex-zahlen100-7',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'كيف نقرأ سنة 1995؟',
      questionDe: '',
      options: ['neunzehnhundertfünfundneunzig', 'neunzehnhundertneunundfünfzig', 'zweitausendfünfundneunzig', 'neunhundertfünfundneunzig'],
      correctIndex: 0,
      explanationAr: '1995 = neunzehnhundert + fünfundneunzig. السنوات قبل 2000 تُقرأ بالمئات.',
    },
    {
      id: 'ex-zahlen100-8',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['Euro', 'Das', 'fünf', 'kostet', 'zwanzig'],
      correctOrder: [1, 3, 2, 0, 4],
      explanationAr: 'Das kostet fünf Euro zwanzig. الفعل في المرتبة الثانية، ثم الأورو، ثم السنت.',
    },
    {
      id: 'ex-zahlen100-9',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'هذا يكلّف خمسة يورو.',
      acceptedAnswers: ['Das kostet fünf Euro.', 'Das kostet fünf Euro'],
      explanationAr: 'Das kostet fünf Euro.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'zwei Euros',
      correct: 'zwei Euro',
      explanationAr: 'بعد الرقم تبقى كلمة Euro كما هي بلا s، وكذلك Cent.',
    },
    {
      wrong: 'zweihundertundfünfzig',
      correct: 'zweihundertfünfzig',
      explanationAr: 'لا نضيف und بعد hundert (إلا في الكلام العفوي النادر). الصيغة المعتمدة بلا und.',
    },
    {
      wrong: 'Das kostet zwei Komma fünfzig.',
      correct: 'Das kostet zwei Euro fünfzig.',
      explanationAr: 'نقرأ السعر بالأورو والسنت ولا ننطق الفاصلة.',
    },
  ],
}
