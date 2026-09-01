import type { Lesson, Module } from '@/types'

export const lessonWegbeschreibung: Lesson = {
  id: 'a1-m17-l01',
  slug: 'wegbeschreibung',
  level: 'A1',
  moduleId: 'a1-m17',
  title: 'Wegbeschreibung',
  titleAr: 'وصف الطريق والاتجاهات',
  estimatedMinutes: 30,
  objectivesAr: [
    'السؤال عن الاتجاهات باستخدام "Wie komme ich zu/nach...؟"',
    'فهم واستخدام كلمات الاتجاه الأساسية (rechts، links، geradeaus)',
    'إعطاء اتجاهات باستخدام صيغة الأمر مع الفعل المنفصل abbiegen',
    'استخدام حروف الجر المكانية التي تعلّمتها سابقاً في سياق وصف الطريق',
  ],
  explanation: [
    {
      titleAr: 'درس تطبيقي يجمع ما سبق',
      bodyAr:
        'وصف الطريق مهارة تطبيقية تجمع ثلاثة أشياء تعلّمتها سابقاً في مكان واحد: صيغة الأمر (Biegen Sie ab!) للتوجيه، الفعل المنفصل abbiegen الذي تنتقل بادئته إلى نهاية الجملة تماماً كما تعلّمت، وحروف الجر الثابتة والمتنقلة (zu، bis zu، an... vorbei) لتحديد نقاط المرور.',
    },
    {
      titleAr: 'كلمات الاتجاه لا تتصرّف',
      bodyAr:
        'كلمات مثل rechts وlinks وgeradeaus هي ظروف مكان ثابتة الشكل دائماً، لا تتغيّر حسب الجنس أو الحالة النحوية — وهذا يجعلها من أسهل عناصر هذا الدرس.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-wegbeschreibung',
      slug: 'wegbeschreibung-imperativ-praepositionen',
      level: 'A1',
      titleDe: 'Wegbeschreibung: Imperativ + Richtungswörter',
      titleAr: 'وصف الطريق: الأمر مع كلمات الاتجاه',
      conceptAr: 'دمج صيغة الأمر مع كلمات الاتجاه الثابتة وحروف الجر لتوجيه شخص إلى مكان.',
      ruleAr:
        'ابدأ بصيغة الأمر المناسبة (Gehen Sie / Geh)، ثم أضف كلمة الاتجاه (geradeaus/rechts/links) أو حرف الجر المناسب (bis zur Kreuzung، an der Ampel vorbei). إن كان الفعل منفصلاً مثل abbiegen، ضع البادئة ab في نهاية الجملة كما تعلّمت.',
      tables: [
        {
          caption: 'كلمات الاتجاه الأساسية',
          headers: ['الكلمة', 'المعنى'],
          rows: [
            { label: 'rechts', values: ['يميناً'] },
            { label: 'links', values: ['يساراً'] },
            { label: 'geradeaus', values: ['مباشرةً / على طول'] },
            { label: 'gegenüber (von)', values: ['مقابل'] },
            { label: 'an ... vorbei', values: ['بمحاذاة / بجانب مروراً'] },
            { label: 'bis zu', values: ['حتى / إلى غاية'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Gehen Sie geradeaus bis zur Ampel.',
          ar: 'اذهبوا مباشرة حتى إشارة المرور.',
          tokens: [
            { text: 'Gehen', role: 'فعل الأمر' },
            { text: 'Sie', role: 'المخاطَب الرسمي' },
            { text: 'geradeaus', role: 'اتجاه' },
            { text: 'bis zur Ampel.', role: 'شبه جملة الغاية' },
          ],
        },
        {
          de: 'Biegen Sie an der Kreuzung links ab.',
          ar: 'انعطفوا يساراً عند التقاطع.',
          tokens: [
            { text: 'Biegen', role: 'فعل الأمر' },
            { text: 'Sie', role: 'المخاطَب الرسمي' },
            { text: 'an der Kreuzung', role: 'شبه الجملة' },
            { text: 'links', role: 'اتجاه' },
            { text: 'ab.', role: 'البادئة المنفصلة' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Wie komme ich zum Bahnhof?', ar: 'كيف أصل إلى محطة القطار؟' },
    { de: 'Das Museum ist gegenüber von der Bank.', ar: 'المتحف مقابل البنك.' },
    { de: 'Gehen Sie an der Kirche vorbei.', ar: 'مرّوا بجانب الكنيسة.' },
    { de: 'Es ist nicht weit von hier.', ar: 'ليس بعيداً من هنا.' },
  ],
  vocabulary: [
    { id: 'voc-weg-rechts', word: 'rechts', partOfSpeech: 'adverb', meaningAr: 'يميناً', level: 'A1', category: 'الاتجاهات' },
    { id: 'voc-weg-links', word: 'links', partOfSpeech: 'adverb', meaningAr: 'يساراً', level: 'A1', category: 'الاتجاهات' },
    { id: 'voc-weg-geradeaus', word: 'geradeaus', partOfSpeech: 'adverb', meaningAr: 'مباشرةً', level: 'A1', category: 'الاتجاهات' },
    { id: 'voc-weg-kreuzung', word: 'Kreuzung', article: 'die', plural: 'Kreuzungen', partOfSpeech: 'noun', meaningAr: 'التقاطع', level: 'A1', category: 'الاتجاهات' },
    { id: 'voc-weg-ampel', word: 'Ampel', article: 'die', plural: 'Ampeln', partOfSpeech: 'noun', meaningAr: 'إشارة المرور', level: 'A1', category: 'الاتجاهات' },
    { id: 'voc-weg-abbiegen', word: 'abbiegen', partOfSpeech: 'verb', meaningAr: 'ينعطف', level: 'A1', category: 'الاتجاهات' },
    { id: 'voc-weg-ecke', word: 'Ecke', article: 'die', plural: 'Ecken', partOfSpeech: 'noun', meaningAr: 'الزاوية', level: 'A1', category: 'الاتجاهات' },
    { id: 'voc-weg-strasse', word: 'Straße', article: 'die', plural: 'Straßen', partOfSpeech: 'noun', meaningAr: 'الشارع', level: 'A1', category: 'الاتجاهات' },
    { id: 'voc-weg-weg', word: 'Weg', article: 'der', plural: 'Wege', partOfSpeech: 'noun', meaningAr: 'الطريق', level: 'A1', category: 'الاتجاهات' },
  ],
  dialogues: [
    {
      id: 'dialogue-weg-informell',
      level: 'A1',
      moduleId: 'a1-m17',
      lessonId: 'a1-m17-l01',
      titleAr: 'سؤال في الشارع',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Tourist', de: 'Entschuldige, wie komme ich zum Museum?', ar: 'عفواً، كيف أصل إلى المتحف؟' },
        { speaker: 'b', name: 'Anwohnerin', de: 'Geh geradeaus und dann an der Ampel links.', ar: 'اذهب مباشرة، ثم يساراً عند إشارة المرور.' },
        { speaker: 'a', name: 'Tourist', de: 'Ist es weit von hier?', ar: 'هل هو بعيد من هنا؟' },
        { speaker: 'b', name: 'Anwohnerin', de: 'Nein, nur fünf Minuten zu Fuß.', ar: 'لا، فقط خمس دقائق سيراً على الأقدام.' },
      ],
    },
    {
      id: 'dialogue-weg-formell',
      level: 'A1',
      moduleId: 'a1-m17',
      lessonId: 'a1-m17-l01',
      titleAr: 'في مكتب استقبال الفندق',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Gast', de: 'Entschuldigung, wie komme ich zum Bahnhof?', ar: 'عفواً، كيف أصل إلى محطة القطار؟' },
        { speaker: 'b', name: 'Rezeptionist', de: 'Gehen Sie hier raus und biegen Sie rechts ab.', ar: 'اخرجوا من هنا وانعطفوا يميناً.' },
        { speaker: 'a', name: 'Gast', de: 'Und dann?', ar: 'ثم ماذا؟' },
        { speaker: 'b', name: 'Rezeptionist', de: 'Dann gehen Sie geradeaus bis zur Kreuzung. Der Bahnhof ist gegenüber.', ar: 'ثم اذهبوا مباشرة حتى التقاطع. المحطة تكون مقابلكم.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'كلمات مركّبة طويلة تُقسَّم مقطعياً', bodyAr: 'كلمات مثل geradeaus تُقسَّم بسهولة إلى مقاطع: ge-ra-de-aus، مع نبرة على المقطع الثالث.', example: 'geradeaus' },
    { titleAr: 'ie في Kreuzung لا توجد', bodyAr: 'انتبه: Kreuzung تحتوي eu وليس ie، وتُنطق eu دائماً [ɔʏ].', example: 'Kreuzung' },
  ],
  exercises: [
    {
      id: 'ex-weg-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر السؤال الصحيح للاستفسار عن الاتجاه',
      questionDe: '___',
      options: ['Wie komme ich zum Bahnhof?', 'Wie ist der Bahnhof?', 'Wo kommt der Bahnhof?', 'Was ist der Bahnhof?'],
      correctIndex: 0,
      explanationAr: '"Wie komme ich zu...؟" هي الصيغة القياسية للسؤال عن كيفية الوصول لمكان.',
    },
    {
      id: 'ex-weg-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الترتيب الصحيح لجملة الأمر مع الفعل المنفصل abbiegen',
      questionDe: '___',
      options: ['Biegen Sie links ab.', 'Biegen ab Sie links.', 'Abbiegen Sie links.', 'Sie biegen ab links.'],
      correctIndex: 0,
      explanationAr: 'الفعل المصرَّف Biegen في البداية (أمر رسمي)، والبادئة ab في النهاية.',
    },
    {
      id: 'ex-weg-3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الكلمة المناسبة: Das Museum ist ___ der Bank.',
      questionDe: 'Das Museum ist ___ der Bank.',
      options: ['gegenüber von', 'rechts', 'links', 'geradeaus'],
      correctIndex: 0,
      explanationAr: '"gegenüber von" تعني "مقابل"، وتُستخدم لوصف موقع نسبي بين مكانين.',
    },
    {
      id: 'ex-weg-4',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '"rechts" und "links" ändern ihre Form je nach Genus.',
      isTrue: false,
      explanationAr: 'خطأ — هذه الكلمات ظروف ثابتة الشكل ولا تتغيّر أبداً حسب الجنس أو الحالة.',
    },
    {
      id: 'ex-weg-5',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل: Gehen Sie geradeaus ____ zur Ampel. (حتى)',
      sentenceDe: 'Gehen Sie geradeaus ____ zur Ampel.',
      acceptedAnswers: ['bis'],
      hint: 'bis + zu',
      explanationAr: '"bis zu" تعني "حتى/إلى غاية"، وتُستخدم كثيراً في وصف الطريق.',
    },
    {
      id: 'ex-weg-6',
      type: 'matching',
      level: 'A1',
      promptAr: 'صل كل كلمة اتجاه بمعناها',
      pairs: [
        { de: 'rechts', ar: 'يميناً' },
        { de: 'links', ar: 'يساراً' },
        { de: 'geradeaus', ar: 'مباشرةً' },
        { de: 'die Kreuzung', ar: 'التقاطع' },
      ],
      explanationAr: 'كل كلمة من هذه المجموعة لها معنى واحد ثابت متعلّق بالاتجاهات.',
    },
    {
      id: 'ex-weg-7',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتب الكلمات لتكوين جملة أمر صحيحة',
      words: ['Gehen', 'Sie', 'geradeaus', 'bis', 'zur', 'Ampel.'],
      correctOrder: [0, 1, 2, 3, 4, 5],
      explanationAr: 'الترتيب الصحيح: "Gehen Sie geradeaus bis zur Ampel."',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Biegen ab Sie links.',
      correct: 'Biegen Sie links ab.',
      explanationAr: 'يجب أن تنتقل البادئة المنفصلة ab إلى نهاية جملة الأمر تماماً.',
    },
    {
      wrong: 'Gehen Sie rechts die Straße.',
      correct: 'Gehen Sie rechts in die Straße.',
      explanationAr: 'يجب استخدام حرف جر مناسب (in) قبل اسم الشارع، ولا يمكن ربط الفعل بالاسم مباشرة بلا حرف جر.',
    },
    {
      wrong: 'Das Museum ist gegenüber der Bank ist.',
      correct: 'Das Museum ist gegenüber der Bank.',
      explanationAr: 'لا يجوز تكرار الفعل ist مرتين في نفس الجملة البسيطة.',
    },
    {
      wrong: 'Wie ich komme zum Bahnhof?',
      correct: 'Wie komme ich zum Bahnhof?',
      explanationAr: 'في سؤال بأداة استفهام، يأتي الفعل المصرَّف مباشرة بعدها، ثم الفاعل.',
    },
  ],
}

export const module17Wegbeschreibung: Module = {
  id: 'a1-m17',
  slug: 'wegbeschreibung',
  level: 'A1',
  title: 'Wegbeschreibung',
  titleAr: 'وصف الطريق',
  order: 17,
  lessons: [lessonWegbeschreibung],
}
