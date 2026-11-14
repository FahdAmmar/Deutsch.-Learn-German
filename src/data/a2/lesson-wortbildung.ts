import type { Lesson } from '@/types'

/**
 * Word formation: how a learner can understand a new word from its parts. The official Goethe A2 word list leaves
 * out many nouns that can be worked out from a verb or an adjective (der Drucker from drucken, die Zahlung) and
 * separable-verb compounds that are transparent (mitmachen, wegbringen), because an A2 learner is expected to infer them.
 * The lesson teaches the few patterns that do most of that work: -er / -in for people, -ung and the bare stem for
 * nouns from verbs, -keit / -heit and un- for adjectives, verb prefixes, and the article of a compound.
 * Only patterns that are regular and frequent are included; irregular formations are left to vocabulary study.
 */
export const lessonWortbildung: Lesson = {
  id: 'a2-m21-l04',
  slug: 'wortbildung',
  level: 'A2',
  moduleId: 'a2-m21',
  title: 'Wortbildung: Wörter verstehen',
  titleAr: 'تكوين الكلمات: افهم الكلمة الجديدة من أجزائها',
  estimatedMinutes: 30,
  objectivesAr: [
    'تكوين اسم الشخص من الفعل بـ -er ومؤنثه بـ -in: Fahrer وFahrerin',
    'تحويل الفعل إلى اسم: -ung (die Wohnung) والجذر (die Fahrt) والمصدر (das Essen)',
    'تحويل الصفة إلى اسم بـ -keit أو -heit وعكسها بـ un-',
    'فهم بادئات الأفعال: المنفصلة (mit- وweg-) وغير المنفصلة (be- وver- وer-) وأداة الكلمة المركّبة',
  ],
  explanation: [
    {
      titleAr: 'لماذا هذا الدرس؟',
      bodyAr:
        'كثير من الكلمات الألمانية تُبنى من أجزاء، فإذا عرفت الجزء عرفت الكلمة. مثلاً **Fahrer** من **fahren**، و**Wohnung** من **wohnen**. وقوائم Goethe الرسمية لمستوى A2 لا تدرج كثيراً من هذه الكلمات لأن المتعلم مطالب بأن يستنتجها. فإذا أتقنت الأنماط القليلة في هذا الدرس صارت كلمات كثيرة جديدة مفهومة من أول نظرة.',
    },
    {
      titleAr: 'الأشخاص: -er و-in',
      bodyAr:
        'نضيف **-er** إلى جذر الفعل فنحصل على من يفعل الفعل: **fahren → der Fahrer**، **arbeiten → der Arbeiter**، **verkaufen → der Verkäufer**. وللمرأة نضيف **-in**: **die Fahrerin، die Arbeiterin، die Verkäuferin**. وبعض الأسماء يتغيّر حرفها العلة مع -in: **der Arzt → die Ärztin**، **der Koch → die Köchin**. وجمع المؤنث **-innen**: die Fahrerinnen. وفي الإعلانات تقرأ **Verkäufer/in** أي Verkäufer oder Verkäuferin.',
    },
    {
      titleAr: 'من الفعل إلى الاسم',
      bodyAr:
        'ثلاث طرق شائعة: **(1) -ung** مع الأفعال، والاسم **دائماً مؤنث**: **wohnen → die Wohnung**، **einladen → die Einladung**، **anmelden → die Anmeldung**. **(2) الجذر نفسه**: **fahren → die Fahrt**، **anfangen → der Anfang**، وهنا لا قاعدة ثابتة للأداة فتتعلمها مع الكلمة. **(3) المصدر اسماً**: **essen → das Essen**، **lesen → das Lesen** ويكون محايداً ويُكتب بحرف كبير.',
    },
    {
      titleAr: 'من الصفة إلى الاسم وعكس المعنى',
      bodyAr:
        'نضيف **-keit** غالباً بعد صفة تنتهي بـ -lich أو -ig، و**-heit** بعد صفة قصيرة، والاسم الناتج **دائماً مؤنث**: **freundlich → die Freundlichkeit**، **möglich → die Möglichkeit**، **pünktlich → die Pünktlichkeit**، **gesund → die Gesundheit**. ولعكس المعنى نضيف **un-** أمام الصفة: **freundlich → unfreundlich**، **möglich → unmöglich**، **gesund → ungesund**. انتبه: ليس لكل صفة ضدّ بـ un- (ضد groß هو klein)، فتحقق من القاموس.',
    },
    {
      titleAr: 'بادئات الأفعال والكلمات المركّبة',
      bodyAr:
        'بادئات **منفصلة** تعطي الفعل اتجاهاً: **mit-** (مع)، **weg-** (بعيداً)، **zurück-** (عودة)، **an-**، **aus-**، **ein-**: **bringen → mitbringen** (Bring bitte ein Buch mit.)، **gehen → weggehen** (Er geht um acht Uhr weg.). وبادئات **غير منفصلة** هي **be-، ver-، er-، ent-، zer-، ge-**: **besuchen، verstehen، erklären** ولا تأخذ **ge-** في Partizip II: **Ich habe ihn besucht.** وفي الأسماء **المركّبة** تأتي الأداة من **الكلمة الأخيرة**: **die Hand + die Tasche = die Handtasche**، **das Haus + die Tür = die Haustür**، **der Tee + der Löffel = der Teelöffel**.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-wortbildung',
      slug: 'wortbildung',
      level: 'A2',
      titleDe: 'Wortbildung',
      titleAr: 'تكوين الكلمات',
      conceptAr: 'الكلمة الجديدة تُبنى غالباً من جذر ولاحقة أو بادئة، وتحدد اللاحقة نوع الكلمة وأداتها.',
      ruleAr:
        'من الفعل: -er للشخص (der Fahrer) و-in للمؤنث (die Fahrerin)، و-ung للاسم المؤنث (die Wohnung). من الصفة: -keit أو -heit للاسم المؤنث (die Freundlichkeit، die Gesundheit) وun- للعكس (unfreundlich). وفي الكلمة المركّبة تأتي الأداة من الكلمة الأخيرة.',
      tables: [
        {
          caption: 'الأشخاص: -er و-in',
          headers: ['الفعل أو الاسم', 'المذكّر', 'المؤنّث'],
          rows: [
            { label: 'fahren', values: ['der Fahrer', 'die Fahrerin'] },
            { label: 'arbeiten', values: ['der Arbeiter', 'die Arbeiterin'] },
            { label: 'verkaufen', values: ['der Verkäufer', 'die Verkäuferin'] },
            { label: 'der Arzt', values: ['der Arzt', 'die Ärztin'] },
            { label: 'der Koch', values: ['der Koch', 'die Köchin'] },
          ],
        },
        {
          caption: 'من الفعل إلى الاسم',
          headers: ['الفعل', 'الاسم', 'الطريقة'],
          rows: [
            { label: 'wohnen', values: ['die Wohnung', '-ung (مؤنث دائماً)'] },
            { label: 'einladen', values: ['die Einladung', '-ung (مؤنث دائماً)'] },
            { label: 'fahren', values: ['die Fahrt', 'الجذر'] },
            { label: 'anfangen', values: ['der Anfang', 'الجذر'] },
            { label: 'essen', values: ['das Essen', 'المصدر اسماً (محايد)'] },
          ],
        },
        {
          caption: 'من الصفة إلى الاسم والعكس',
          headers: ['الصفة', 'الاسم (مؤنث)', 'العكس'],
          rows: [
            { label: 'freundlich', values: ['die Freundlichkeit', 'unfreundlich'] },
            { label: 'möglich', values: ['die Möglichkeit', 'unmöglich'] },
            { label: 'pünktlich', values: ['die Pünktlichkeit', 'unpünktlich'] },
            { label: 'gesund', values: ['die Gesundheit', 'ungesund'] },
          ],
        },
      ],
      examples: [
        { de: 'Der Fahrer wartet, die Fahrerin kommt gleich.', ar: 'السائق ينتظر والسائقة ستأتي حالاً.' },
        { de: 'Ich wohne in einer kleinen Wohnung.', ar: 'أسكن في شقة صغيرة.' },
      ],
      exceptionsAr: [
        'لا قاعدة ثابتة لأداة الاسم المأخوذ من جذر الفعل (die Fahrt، der Anfang)، فتحفظها مع الكلمة.',
        'ليس لكل صفة ضدّ بـ un-: ضد groß هو klein وليس ungroß.',
      ],
    },
  ],
  examples: [
    { de: 'Der Fahrer wartet vor dem Bahnhof.', ar: 'السائق ينتظر أمام المحطة.' },
    { de: 'Die Ärztin arbeitet in einer Praxis.', ar: 'الطبيبة تعمل في عيادة.' },
    { de: 'Ich wohne in einer kleinen Wohnung.', ar: 'أسكن في شقة صغيرة.' },
    { de: 'Die Fahrt nach Köln dauert zwei Stunden.', ar: 'تستغرق الرحلة إلى كولن ساعتين.' },
    { de: 'Am Anfang war alles neu für mich.', ar: 'في البداية كان كل شيء جديداً عليّ.' },
    { de: 'Essen ist wichtig für die Gesundheit.', ar: 'الأكل مهم للصحة.' },
    { de: 'Sein Chef ist unfreundlich, aber seine Kollegin ist sehr freundlich.', ar: 'رئيسه غير ودود، لكن زميلته ودودة جداً.' },
    { de: 'Rauchen ist ungesund.', ar: 'التدخين غير صحي.' },
    { de: 'Bring bitte ein Buch mit.', ar: 'أحضر معك كتاباً من فضلك.' },
    { de: 'Mein Freund geht um acht Uhr weg.', ar: 'صديقي يغادر في الثامنة.' },
    { de: 'Meine Handtasche ist neu.', ar: 'حقيبة يدي جديدة.' },
  ],
  vocabulary: [
    { id: 'voc-wortbildung-fahrer', word: 'Fahrer', article: 'der', plural: 'Fahrer', partOfSpeech: 'noun', meaningAr: 'السائق', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Der Fahrer wartet vor dem Haus.', ar: 'السائق ينتظر أمام البيت.' } },
    { id: 'voc-wortbildung-fahrerin', word: 'Fahrerin', article: 'die', plural: 'Fahrerinnen', partOfSpeech: 'noun', meaningAr: 'السائقة', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Die Fahrerin fährt langsam.', ar: 'السائقة تقود ببطء.' } },
    { id: 'voc-wortbildung-aerztin', word: 'Ärztin', article: 'die', plural: 'Ärztinnen', partOfSpeech: 'noun', meaningAr: 'الطبيبة', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Meine Ärztin ist sehr nett.', ar: 'طبيبتي لطيفة جداً.' } },
    { id: 'voc-wortbildung-koechin', word: 'Köchin', article: 'die', plural: 'Köchinnen', partOfSpeech: 'noun', meaningAr: 'الطباخة', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Die Köchin macht eine Suppe.', ar: 'الطباخة تعدّ شوربة.' } },
    { id: 'voc-wortbildung-fahrt', word: 'Fahrt', article: 'die', plural: 'Fahrten', partOfSpeech: 'noun', meaningAr: 'الرحلة (بوسيلة نقل)', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Die Fahrt dauert eine Stunde.', ar: 'تستغرق الرحلة ساعة.' } },
    { id: 'voc-wortbildung-freundlichkeit', word: 'Freundlichkeit', article: 'die', numberUse: 'none', partOfSpeech: 'noun', meaningAr: 'اللطف / الودّ', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Ich mag seine Freundlichkeit.', ar: 'يعجبني لطفه.' } },
    { id: 'voc-wortbildung-gesundheit', word: 'Gesundheit', article: 'die', numberUse: 'none', partOfSpeech: 'noun', meaningAr: 'الصحة', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Gesundheit ist sehr wichtig.', ar: 'الصحة مهمة جداً.' } },
    { id: 'voc-wortbildung-moeglichkeit', word: 'Möglichkeit', article: 'die', plural: 'Möglichkeiten', partOfSpeech: 'noun', meaningAr: 'إمكانية / احتمال', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Wir haben zwei Möglichkeiten.', ar: 'لدينا احتمالان.' } },
    { id: 'voc-wortbildung-handtasche', word: 'Handtasche', article: 'die', plural: 'Handtaschen', partOfSpeech: 'noun', meaningAr: 'حقيبة اليد', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Die Handtasche liegt auf dem Stuhl.', ar: 'حقيبة اليد على الكرسي.' } },
    { id: 'voc-wortbildung-haustuer', word: 'Haustür', article: 'die', plural: 'Haustüren', partOfSpeech: 'noun', meaningAr: 'باب البيت (الخارجي)', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Die Haustür ist noch offen.', ar: 'باب البيت ما زال مفتوحاً.' } },
    { id: 'voc-wortbildung-teeloeffel', word: 'Teelöffel', article: 'der', plural: 'Teelöffel', partOfSpeech: 'noun', meaningAr: 'ملعقة الشاي الصغيرة', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Ich brauche einen Teelöffel.', ar: 'أحتاج إلى ملعقة شاي صغيرة.' } },
    { id: 'voc-wortbildung-unfreundlich', word: 'unfreundlich', partOfSpeech: 'adjective', meaningAr: 'غير ودود', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Der Verkäufer ist heute unfreundlich.', ar: 'البائع غير ودود اليوم.' } },
    { id: 'voc-wortbildung-unmoeglich', word: 'unmöglich', partOfSpeech: 'adjective', meaningAr: 'مستحيل', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Das ist leider unmöglich.', ar: 'هذا للأسف مستحيل.' } },
    { id: 'voc-wortbildung-ungesund', word: 'ungesund', partOfSpeech: 'adjective', meaningAr: 'غير صحي', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Zu viel Zucker ist ungesund.', ar: 'الكثير من السكر غير صحي.' } },
    { id: 'voc-wortbildung-unpuenktlich', word: 'unpünktlich', partOfSpeech: 'adjective', meaningAr: 'غير دقيق في المواعيد', level: 'A2', category: 'تكوين الكلمات', example: { de: 'Mein Bus ist oft unpünktlich.', ar: 'حافلتي كثيراً ما تتأخر عن موعدها.' } },
    {
      id: 'voc-wortbildung-mitbringen',
      word: 'mitbringen',
      partOfSpeech: 'verb',
      meaningAr: 'يُحضر معه',
      level: 'A2',
      category: 'تكوين الكلمات',
      verb: { praeteritum: 'brachte', partizip: 'mitgebracht', auxiliary: 'haben', separablePrefix: 'mit' },
      example: { de: 'Ich bringe Kuchen zur Party mit.', ar: 'أحضر كعكة معي إلى الحفل.' },
    },
    {
      id: 'voc-wortbildung-weggehen',
      word: 'weggehen',
      partOfSpeech: 'verb',
      meaningAr: 'يذهب بعيداً / يغادر',
      level: 'A2',
      category: 'تكوين الكلمات',
      verb: { praeteritum: 'ging', partizip: 'weggegangen', auxiliary: 'sein', separablePrefix: 'weg' },
      example: { de: 'Wann gehst du heute weg?', ar: 'متى ستغادر اليوم؟' },
    },
  ],
  exercises: [
    {
      id: 'ex-wortbildung-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الكلمة الصحيحة',
      questionDe: 'Die Frau, die ein Auto fährt, ist die ___.',
      options: ['Fahrerin', 'Fahrer', 'Fahrt', 'Fahren'],
      correctIndex: 0,
      explanationAr: 'للمرأة نضيف -in إلى Fahrer فتصبح Fahrerin.',
    },
    {
      id: 'ex-wortbildung-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'ما أداة هذا الاسم؟',
      questionDe: '___ Freundlichkeit',
      options: ['der', 'die', 'das'],
      correctIndex: 1,
      explanationAr: 'كل اسم ينتهي بـ -keit أو -heit أو -ung مؤنث، فنقول die Freundlichkeit.',
    },
    {
      id: 'ex-wortbildung-3',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بالاسم المشتق من fahren',
      sentenceDe: 'Die ___ nach Köln dauert zwei Stunden.',
      acceptedAnswers: ['Fahrt'],
      hint: 'fahren',
      explanationAr: 'الاسم المشتق من جذر fahren هو die Fahrt.',
    },
    {
      id: 'ex-wortbildung-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بضدّ الصفة',
      sentenceDe: 'Das Gegenteil von „freundlich“ ist „___“.',
      acceptedAnswers: ['unfreundlich'],
      hint: 'un-',
      explanationAr: 'نضع un- أمام الصفة لنحصل على ضدّها: freundlich ← unfreundlich.',
    },
    {
      id: 'ex-wortbildung-5',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'من أي فعل يأتي الاسم؟',
      questionDe: 'die Einladung',
      options: ['einladen', 'laden', 'einkaufen', 'einsteigen'],
      correctIndex: 0,
      explanationAr: 'einladen + -ung = die Einladung.',
    },
    {
      id: 'ex-wortbildung-6',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Die Haustür heißt „die“, weil „Haus“ neutral ist.',
      isTrue: false,
      explanationAr: 'خطأ. في الكلمة المركّبة تأتي الأداة من الكلمة الأخيرة: die Tür ← die Haustür.',
    },
    {
      id: 'ex-wortbildung-7',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الجملة الصحيحة (Perfekt)',
      questionDe: '',
      options: [
        'Ich habe die Lehrerin gut verstanden.',
        'Ich habe die Lehrerin gut geverstanden.',
        'Ich habe die Lehrerin gut verstehen.',
        'Ich habe die Lehrerin gut gestanden.',
      ],
      correctIndex: 0,
      explanationAr: 'ver- بادئة غير منفصلة، فلا نضيف ge- في Partizip II: verstanden.',
    },
    {
      id: 'ex-wortbildung-8',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'ماذا تعني الكلمة؟',
      questionDe: 'unpünktlich',
      options: ['غير دقيق في المواعيد', 'دقيق جداً', 'سعيد', 'مريض'],
      optionLanguage: 'ar',
      correctIndex: 0,
      explanationAr: 'un- تعكس المعنى: pünktlich = دقيق في المواعيد، وunpünktlich عكسها.',
    },
    {
      id: 'ex-wortbildung-9',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (فعل منفصل)',
      sentenceDe: 'Bring bitte ein Buch ___.',
      acceptedAnswers: ['mit'],
      hint: 'mitbringen',
      explanationAr: 'mitbringen فعل منفصل، وفي الأمر تبقى mit في آخر الجملة.',
    },
    {
      id: 'ex-wortbildung-10',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق الكلمة الألمانية مع معناها',
      pairs: [
        { de: 'der Fahrer', ar: 'السائق' },
        { de: 'die Fahrerin', ar: 'السائقة' },
        { de: 'die Ärztin', ar: 'الطبيبة' },
        { de: 'die Köchin', ar: 'الطباخة' },
        { de: 'die Fahrt', ar: 'الرحلة' },
      ],
      explanationAr: 'لاحظ أن المؤنث يأخذ -in وقد يغيّر حرف العلة (Arzt ← Ärztin).',
    },
  ],
  commonMistakes: [
    {
      wrong: 'der Wohnung',
      correct: 'die Wohnung',
      explanationAr: 'كل اسم ينتهي بـ -ung مؤنث، فنقول die Wohnung في حالة الرفع.',
    },
    {
      wrong: 'das Haustür',
      correct: 'die Haustür',
      explanationAr: 'في الكلمة المركّبة تحدد الكلمة الأخيرة (die Tür) الأداة.',
    },
    {
      wrong: 'Ich habe ihn gebesucht.',
      correct: 'Ich habe ihn besucht.',
      explanationAr: 'البادئة be- غير منفصلة فلا تأخذ ge- في Partizip II.',
    },
  ],
}
