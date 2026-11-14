import type { Lesson } from '@/types'

/**
 * Quantities and units: ein Kilo Äpfel, eine Flasche Wasser, viel / viele, ein bisschen / ein paar. It follows
 * the shopping lesson, which teaches Kilo and Euro and the plural, and gives the learner the words to ask for an
 * amount at a market, a bakery or a supermarket counter.
 */
export const lessonMengen: Lesson = {
  id: 'a1-m14-l02',
  slug: 'mengen-und-masseinheiten',
  level: 'A1',
  moduleId: 'a1-m14',
  title: 'Mengen und Maßeinheiten',
  titleAr: 'الكميات ووحدات القياس',
  estimatedMinutes: 22,
  objectivesAr: [
    'طلب كمية محددة: ein Kilo Äpfel، eine Flasche Wasser، zweihundert Gramm Käse',
    'معرفة أنه لا حرف جر بين الكمية والمادة: ein Kilo Äpfel (وليس ein Kilo von Äpfeln)',
    'التمييز بين viel وviele، وwie viel وwie viele',
    'استعمال ein bisschen وein paar وetwas وgenug وzu viel',
  ],
  explanation: [
    {
      titleAr: 'الكمية ثم المادة بلا حرف جر',
      bodyAr:
        'في العربية نقول "كيلو **من** التفاح"، أما في الألمانية فنضع المادة بعد الكمية مباشرة: **ein Kilo Äpfel**، **ein Liter Milch**، **zweihundert Gramm Käse**. لا نستعمل von ولا أي حرف جر. وهذا يسري على كل الكميات: eine Flasche Wasser، eine Packung Nudeln، ein Stück Kuchen.',
    },
    {
      titleAr: 'الوحدات: متى نضيف الجمع؟',
      bodyAr:
        'بعد الرقم تبقى هذه الكلمات على حالها: **Kilo، Gramm، Liter، Stück** (zwei Kilo Äpfel، drei Liter Milch، zwei Stück Kuchen). أما العبوات المؤنثة فتأخذ الجمع: **eine Flasche → zwei Flaschen، eine Packung → zwei Packungen، eine Dose → zwei Dosen، eine Tüte → zwei Tüten، eine Scheibe → zwei Scheiben**، وكذلك **ein Glas → zwei Gläser**.',
    },
    {
      titleAr: 'viel أم viele؟',
      bodyAr:
        'نستعمل **viel** مع ما لا يُعدّ (مفرد): viel Milch، viel Zeit، viel Geld. ونستعمل **viele** مع ما يُعدّ (جمع): viele Äpfel، viele Freunde. وكذلك السؤال: **Wie viel Milch؟** لكن **Wie viele Äpfel؟**. ومثلهما **wenig** و**wenige** للقليل: wenig Zeit، wenige Äpfel.',
    },
    {
      titleAr: 'ein bisschen وein paar وetwas وgenug',
      bodyAr:
        '**ein bisschen** = قليلاً (لما لا يُعدّ): ein bisschen Zucker. **ein paar** = بضعة (لما يُعدّ، جمع): ein paar Äpfel. **etwas** = شيئاً من: etwas Salz. **genug** = كفاية: genug Brot. **zu viel** = أكثر من اللازم: zu viel Salz.',
    },
    {
      titleAr: 'في الدكان',
      bodyAr:
        'البائع يسألك: **Was darf es sein؟** (ماذا تريد؟) أو **Sonst noch etwas؟** (شيء آخر؟). وأنت تجيب: **Ich möchte ein Kilo Äpfel, bitte.** أو **Ich nehme zweihundert Gramm Käse.** وعند الانتهاء: **Das ist alles, danke.**',
    },
  ],
  examples: [
    { de: 'Ich möchte ein Kilo Äpfel, bitte.', ar: 'أريد كيلو من التفاح من فضلك.' },
    { de: 'Ich nehme zweihundert Gramm Käse.', ar: 'سآخذ مئتي غرام من الجبن.' },
    { de: 'Wir brauchen zwei Liter Milch.', ar: 'نحتاج لترين من الحليب.' },
    { de: 'Eine Flasche Wasser, bitte.', ar: 'زجاجة ماء من فضلك.' },
    { de: 'Ich kaufe zwei Packungen Nudeln.', ar: 'أشتري عبوتين من المعكرونة.' },
    { de: 'Wie viel Milch brauchst du?', ar: 'كم من الحليب تحتاج؟' },
    { de: 'Wie viele Äpfel brauchst du?', ar: 'كم تفاحة تحتاج؟' },
    { de: 'Ich habe nur ein bisschen Zeit.', ar: 'ليس لدي إلا القليل من الوقت.' },
    { de: 'Ich esse ein paar Kekse.', ar: 'آكل بضعة بسكويتات.' },
    { de: 'Sonst noch etwas? — Nein, das ist alles, danke.', ar: 'شيء آخر؟ — لا، هذا كل شيء، شكراً.' },
  ],
  vocabulary: [
    { id: 'voc-mengen-gramm', word: 'Gramm', article: 'das', plural: 'Gramm', partOfSpeech: 'noun', meaningAr: 'الغرام', level: 'A1', category: 'Mengen', example: { de: 'Ich nehme zweihundert Gramm Käse.', ar: 'سآخذ مئتي غرام من الجبن.' } },
    { id: 'voc-mengen-liter', word: 'Liter', article: 'der', plural: 'Liter', partOfSpeech: 'noun', meaningAr: 'اللتر', level: 'A1', category: 'Mengen', example: { de: 'Wir brauchen zwei Liter Milch.', ar: 'نحتاج لترين من الحليب.' } },
    { id: 'voc-mengen-stueck', word: 'Stück', article: 'das', plural: 'Stücke', partOfSpeech: 'noun', meaningAr: 'قطعة', level: 'A1', category: 'Mengen', example: { de: 'Ich möchte ein Stück Kuchen.', ar: 'أريد قطعة كعك.' } },
    { id: 'voc-mengen-packung', word: 'Packung', article: 'die', plural: 'Packungen', partOfSpeech: 'noun', meaningAr: 'العبوة (علبة كرتون)', level: 'A1', category: 'Mengen', example: { de: 'Ich kaufe zwei Packungen Nudeln.', ar: 'أشتري عبوتين من المعكرونة.' } },
    { id: 'voc-mengen-flasche', word: 'Flasche', article: 'die', plural: 'Flaschen', partOfSpeech: 'noun', meaningAr: 'الزجاجة', level: 'A1', category: 'Mengen', example: { de: 'Eine Flasche Wasser, bitte.', ar: 'زجاجة ماء من فضلك.' } },
    { id: 'voc-mengen-dose', word: 'Dose', article: 'die', plural: 'Dosen', partOfSpeech: 'noun', meaningAr: 'العلبة المعدنية', level: 'A1', category: 'Mengen', example: { de: 'Ich nehme eine Dose Tomaten.', ar: 'آخذ علبة طماطم.' } },
    { id: 'voc-mengen-tuete', word: 'Tüte', article: 'die', plural: 'Tüten', partOfSpeech: 'noun', meaningAr: 'الكيس', level: 'A1', category: 'Mengen', example: { de: 'Haben Sie eine Tüte für mich?', ar: 'هل لديكم كيس لي؟' } },
    { id: 'voc-mengen-glas', word: 'Glas', article: 'das', plural: 'Gläser', partOfSpeech: 'noun', meaningAr: 'الكأس / البرطمان', level: 'A1', category: 'Mengen', example: { de: 'Ich trinke ein Glas Wasser.', ar: 'أشرب كأس ماء.' } },
    { id: 'voc-mengen-scheibe', word: 'Scheibe', article: 'die', plural: 'Scheiben', partOfSpeech: 'noun', meaningAr: 'الشريحة', level: 'A1', category: 'Mengen', example: { de: 'Ich esse eine Scheibe Brot.', ar: 'آكل شريحة خبز.' } },
    { id: 'voc-mengen-viel', word: 'viel', partOfSpeech: 'adjective', meaningAr: 'كثير (لما لا يُعدّ)', level: 'A1', category: 'Mengen', example: { de: 'Ich trinke viel Wasser.', ar: 'أشرب ماءً كثيراً.' } },
    { id: 'voc-mengen-viele', word: 'viele', partOfSpeech: 'adjective', meaningAr: 'كثيرون / كثيرة (لما يُعدّ)', level: 'A1', category: 'Mengen', example: { de: 'Ich habe viele Freunde.', ar: 'لدي أصدقاء كثيرون.' } },
    { id: 'voc-mengen-wenig', word: 'wenig', partOfSpeech: 'adjective', meaningAr: 'قليل (لما لا يُعدّ)', level: 'A1', category: 'Mengen', example: { de: 'Ich habe wenig Zeit.', ar: 'لدي وقت قليل.' } },
    { id: 'voc-mengen-bisschen', word: 'ein bisschen', partOfSpeech: 'phrase', meaningAr: 'قليلاً', level: 'A1', category: 'Mengen', example: { de: 'Ich möchte ein bisschen Zucker.', ar: 'أريد قليلاً من السكر.' } },
    { id: 'voc-mengen-paar', word: 'ein paar', partOfSpeech: 'phrase', meaningAr: 'بضعة', level: 'A1', category: 'Mengen', example: { de: 'Ich kaufe ein paar Brötchen.', ar: 'أشتري بضعة أرغفة صغيرة.' } },
    { id: 'voc-mengen-genug', word: 'genug', partOfSpeech: 'adverb', meaningAr: 'كفاية / يكفي', level: 'A1', category: 'Mengen', example: { de: 'Danke, das ist genug.', ar: 'شكراً، هذا يكفي.' } },
    { id: 'voc-mengen-sonst-noch-etwas', word: 'Sonst noch etwas?', partOfSpeech: 'phrase', meaningAr: 'شيء آخر؟', level: 'A1', category: 'Mengen', example: { de: 'Sonst noch etwas? Nein, danke.', ar: 'شيء آخر؟ لا، شكراً.' } },
  ],
  exercises: [
    {
      id: 'ex-mengen-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'كيف تقول "كيلو من التفاح"؟',
      questionDe: '',
      options: ['ein Kilo Äpfel', 'ein Kilo von Äpfeln', 'ein Kilo der Äpfel', 'ein Kilo für Äpfel'],
      correctIndex: 0,
      explanationAr: 'لا حرف جر بين الكمية والمادة: ein Kilo Äpfel.',
    },
    {
      id: 'ex-mengen-2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (شيء يُعدّ)',
      sentenceDe: 'Wie ___ Äpfel brauchst du?',
      acceptedAnswers: ['viele'],
      hint: 'Äpfel جمع',
      explanationAr: 'Äpfel تُعدّ، فنقول Wie viele.',
    },
    {
      id: 'ex-mengen-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (شيء لا يُعدّ)',
      sentenceDe: 'Wie ___ Milch brauchst du?',
      acceptedAnswers: ['viel'],
      hint: 'Milch لا تُعدّ',
      explanationAr: 'Milch لا تُعدّ، فنقول Wie viel.',
    },
    {
      id: 'ex-mengen-4',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الصحيح',
      questionDe: 'Wir brauchen drei ___ Milch.',
      options: ['Liter', 'Liters', 'Literen', 'Literne'],
      correctIndex: 0,
      explanationAr: 'بعد الرقم تبقى Liter بلا تغيير: drei Liter Milch.',
    },
    {
      id: 'ex-mengen-5',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الصحيح',
      questionDe: 'Ich kaufe zwei ___ Wasser.',
      options: ['Flaschen', 'Flasche', 'Flasches', 'Flaschens'],
      correctIndex: 0,
      explanationAr: 'Flasche مؤنثة وتأخذ جمع -n بعد الرقم: zwei Flaschen Wasser.',
    },
    {
      id: 'ex-mengen-6',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Man sagt: zwei Stück Kuchen.',
      isTrue: true,
      explanationAr: 'صحيح. Stück تبقى بلا تغيير بعد الرقم.',
    },
    {
      id: 'ex-mengen-7',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق كل عبوة بمعناها',
      pairs: [
        { de: 'die Packung', ar: 'العبوة (الكرتون)' },
        { de: 'die Flasche', ar: 'الزجاجة' },
        { de: 'die Dose', ar: 'العلبة المعدنية' },
        { de: 'die Tüte', ar: 'الكيس' },
      ],
      explanationAr: 'كلها مؤنثة وتأخذ الجمع -n أو -en: Packungen، Flaschen، Dosen، Tüten.',
    },
    {
      id: 'ex-mengen-8',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['Äpfel', 'ein', 'Ich', 'Kilo', 'möchte'],
      correctOrder: [2, 4, 1, 3, 0],
      explanationAr: 'Ich möchte ein Kilo Äpfel. الفعل في المرتبة الثانية، ثم الكمية ثم المادة.',
    },
    {
      id: 'ex-mengen-9',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الصحيح',
      questionDe: 'Ich brauche ___ Zucker.',
      options: ['ein bisschen', 'ein paar', 'viele', 'wie viele'],
      correctIndex: 0,
      explanationAr: 'Zucker لا يُعدّ، فنقول ein bisschen. أما ein paar فللجمع المعدود.',
    },
    {
      id: 'ex-mengen-10',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'أريد خمسمئة غرام من الجبن من فضلك.',
      acceptedAnswers: ['Ich möchte fünfhundert Gramm Käse, bitte.', 'Ich möchte 500 Gramm Käse, bitte.', 'Ich möchte fünfhundert Gramm Käse.', 'Ich möchte 500 Gramm Käse.'],
      explanationAr: 'Ich möchte fünfhundert Gramm Käse, bitte. بلا حرف جر بين Gramm وKäse.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'ein Kilo von Äpfeln',
      correct: 'ein Kilo Äpfel',
      explanationAr: 'العربية تقول "كيلو من التفاح"، والألمانية تحذف حرف الجر وتضع المادة مباشرة بعد الكمية.',
    },
    {
      wrong: 'viele Milch',
      correct: 'viel Milch',
      explanationAr: 'Milch لا تُعدّ، فنستعمل viel وليس viele.',
    },
    {
      wrong: 'zwei Flasche Wasser',
      correct: 'zwei Flaschen Wasser',
      explanationAr: 'العبوات المؤنثة تأخذ الجمع بعد الرقم، بخلاف Kilo وLiter وStück.',
    },
  ],
}
