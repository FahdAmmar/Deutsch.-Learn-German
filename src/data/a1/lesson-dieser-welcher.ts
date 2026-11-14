import type { Lesson } from '@/types'

/**
 * dieser / welcher in Nominativ and Akkusativ. The Goethe A1 word list already has dies- ("Ich nehme lieber diesen
 * Kuchen") and welch- ("Welches Buch möchtest du?"), so they belong at A1. They are placed right after the clothes
 * lesson, where "Welchen Pullover nimmst du? Diesen." is the natural conversation. The one idea: dies- and welch-
 * take the endings of the definite article, so only the masculine Akkusativ changes (dieser → diesen). The
 * Dativ forms (diesem, welchem) wait for the A2 lesson on all der-words.
 */
export const lessonDieserWelcher: Lesson = {
  id: 'a1-m18-l02',
  slug: 'dieser-welcher',
  level: 'A1',
  moduleId: 'a1-m18',
  title: 'dieser, welcher',
  titleAr: 'dieser وwelcher: هذا وأيّ',
  estimatedMinutes: 20,
  objectivesAr: [
    'استعمال dieser / diese / dieses للإشارة إلى شيء أمامك',
    'السؤال بـ welcher / welche / welches عن شيء من عدة أشياء',
    'تمييز الفرق بين Nominativ وAkkusativ عند المذكر: dieser ← diesen',
  ],
  explanation: [
    {
      titleAr: 'dieser = هذا',
      bodyAr:
        '**dieser** تُشير إلى شيء محدّد أمامك: **Dieser Pullover ist billig.** (هذا البلوفر رخيص). وتتغيّر حسب جنس الاسم: **dieser** للمذكر (der)، **diese** للمؤنث (die) وللجمع، **dieses** للمحايد (das). **Diese Hose ist teuer. Dieses Hemd ist schön. Diese Schuhe sind neu.**',
    },
    {
      titleAr: 'نهاياتها هي نهايات أداة التعريف',
      bodyAr:
        'إن عرفتَ **der / die / das / den** فقد عرفتَ **dieser**: النهاية هي نفسها. في الفاعل (Nominativ): der ← **dieser**، die ← **diese**، das ← **dieses**. وفي المفعول به (Akkusativ) يتغيّر **المذكر فقط** كما تغيّر der إلى den: **Ich kaufe diesen Pullover.** أمّا المؤنث والمحايد والجمع فتبقى كما هي: **Ich kaufe diese Hose. Ich kaufe dieses Hemd.**',
    },
    {
      titleAr: 'welcher = أيّ؟',
      bodyAr:
        'نسأل بـ **welcher** عندما نختار من بين عدة أشياء، ونصرّفها بالطريقة نفسها: **Welcher Pullover?** **Welche Hose?** **Welches Hemd?** **Welche Schuhe?** وفي المفعول به المذكر: **Welchen Pullover nimmst du?** ونجيب عادةً بـ dieser: **Diesen.** (هذا). **Welche Hose kaufst du? Diese.**',
    },
    {
      titleAr: 'كيف أعرف أنّه مفعول به؟',
      bodyAr:
        'اسأل: من يفعل؟ ← **الفاعل** (Nominativ): **Dieser Mantel ist neu.** ماذا أشتري / آخذ؟ ← **المفعول به** (Akkusativ): **Ich nehme diesen Mantel.** والنهايات **diesem / welchem** (Dativ) سنتعلّمها في مستوى A2.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-dieser-welcher',
      slug: 'dieser-welcher',
      level: 'A1',
      titleDe: 'dieser und welcher',
      titleAr: 'dieser وwelcher في Nominativ وAkkusativ',
      conceptAr: 'dieser وwelcher تُصرَّفان بنهايات أداة التعريف نفسها، فلا نحفظ جدولاً جديداً.',
      ruleAr:
        'مذكر: dieser (فاعل) ← diesen (مفعول به). مؤنث: diese. محايد: dieses. جمع: diese. وكذلك welcher / welchen / welche / welches.',
      tables: [
        {
          caption: 'dieser وwelcher',
          headers: ['الجنس', 'Nominativ', 'Akkusativ', 'مثال'],
          rows: [
            { label: 'مذكر (der)', values: ['dieser / welcher', 'diesen / welchen', 'Ich nehme diesen Pullover.'] },
            { label: 'مؤنث (die)', values: ['diese / welche', 'diese / welche', 'Ich kaufe diese Hose.'] },
            { label: 'محايد (das)', values: ['dieses / welches', 'dieses / welches', 'Ich kaufe dieses Hemd.'] },
            { label: 'جمع (die)', values: ['diese / welche', 'diese / welche', 'Ich kaufe diese Schuhe.'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich nehme diesen Pullover.',
          ar: 'آخذ هذا البلوفر.',
          tokens: [
            { text: 'Ich', role: 'فاعل' },
            { text: 'nehme', role: 'فعل (ثانياً)' },
            { text: 'diesen', role: 'مذكر ← Akkusativ (مثل den)' },
            { text: 'Pullover.', role: 'المفعول به' },
          ],
        },
        {
          de: 'Welche Hose kaufst du?',
          ar: 'أيّ بنطلون تشتري؟',
          tokens: [
            { text: 'Welche', role: 'أداة سؤال (مؤنث)' },
            { text: 'Hose', role: 'المفعول به' },
            { text: 'kaufst', role: 'فعل (ثانياً)' },
            { text: 'du?', role: 'فاعل' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Dieser Pullover ist billig.', ar: 'هذا البلوفر رخيص.' },
    { de: 'Diese Hose ist teuer.', ar: 'هذا البنطلون غالٍ.' },
    { de: 'Dieses Hemd ist schön.', ar: 'هذا القميص جميل.' },
    { de: 'Diese Schuhe sind neu.', ar: 'هذه الأحذية جديدة.' },
    { de: 'Welchen Pullover nimmst du? Diesen.', ar: 'أيّ بلوفر تأخذ؟ هذا.' },
    { de: 'Ich nehme diesen Pullover.', ar: 'آخذ هذا البلوفر.' },
    { de: 'Welche Hose kaufst du?', ar: 'أيّ بنطلون تشتري؟' },
    { de: 'Welcher Mantel ist neu?', ar: 'أيّ معطف جديد؟' },
  ],
  vocabulary: [
    { id: 'voc-dw1-dieser', word: 'dieser', partOfSpeech: 'pronoun', meaningAr: 'هذا / هذه (للإشارة)', level: 'A1', category: 'Begleiter', example: { de: 'Dieser Pullover ist billig.', ar: 'هذا البلوفر رخيص.' } },
    { id: 'voc-dw1-welcher', word: 'welcher', partOfSpeech: 'pronoun', meaningAr: 'أيّ؟ (للسؤال عن اختيار)', level: 'A1', category: 'Begleiter', example: { de: 'Welcher Mantel ist neu?', ar: 'أيّ معطف جديد؟' } },
    { id: 'voc-dw1-mantel', word: 'Mantel', article: 'der', plural: 'Mäntel', partOfSpeech: 'noun', meaningAr: 'معطف', level: 'A1', category: 'Kleidung', example: { de: 'Dieser Mantel ist sehr warm.', ar: 'هذا المعطف دافئ جداً.' } },
    { id: 'voc-dw1-preis', word: 'Preis', article: 'der', plural: 'Preise', partOfSpeech: 'noun', meaningAr: 'السعر', level: 'A1', category: 'Einkaufen', example: { de: 'Der Preis ist gut.', ar: 'السعر جيد.' } },
    { id: 'voc-dw1-teuer', word: 'teuer', partOfSpeech: 'adjective', meaningAr: 'غالٍ', level: 'A1', category: 'Einkaufen', example: { de: 'Diese Jacke ist teuer.', ar: 'هذه السترة غالية.' } },
    { id: 'voc-dw1-billig', word: 'billig', partOfSpeech: 'adjective', meaningAr: 'رخيص', level: 'A1', category: 'Einkaufen', example: { de: 'Dieses Hemd ist billig.', ar: 'هذا القميص رخيص.' } },
  ],
  exercises: [
    {
      id: 'ex-dw1-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر النهاية الصحيحة',
      questionDe: '___ Hose ist teuer.',
      options: ['Dieser', 'Diese', 'Dieses', 'Diesen'],
      correctIndex: 1,
      explanationAr: 'die Hose ← مؤنث ← Diese.',
    },
    {
      id: 'ex-dw1-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر النهاية الصحيحة',
      questionDe: '___ Hemd ist schön.',
      options: ['Dieser', 'Diese', 'Dieses', 'Diesen'],
      correctIndex: 2,
      explanationAr: 'das Hemd ← محايد ← Dieses.',
    },
    {
      id: 'ex-dw1-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (مفعول به مذكر)',
      sentenceDe: 'Ich kaufe ___ Pullover.',
      acceptedAnswers: ['diesen'],
      hint: 'der Pullover ← Akkusativ',
      explanationAr: 'المذكر في المفعول به يأخذ -en مثل den: diesen Pullover.',
    },
    {
      id: 'ex-dw1-4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (فاعل مذكر)',
      sentenceDe: '___ Mantel ist sehr warm.',
      acceptedAnswers: ['Dieser'],
      hint: 'der Mantel ← فاعل',
      explanationAr: 'الفاعل المذكر ← Dieser Mantel.',
    },
    {
      id: 'ex-dw1-5',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر السؤال الصحيح',
      questionDe: '___ Pullover nimmst du?',
      options: ['Welcher', 'Welche', 'Welches', 'Welchen'],
      correctIndex: 3,
      explanationAr: 'Pullover مذكر وهو مفعول به (ماذا تأخذ؟) ← Welchen.',
    },
    {
      id: 'ex-dw1-6',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الجواب المناسب',
      questionDe: 'Welche Hose kaufst du?',
      options: ['Diesen.', 'Diese.', 'Dieses.', 'Dieser.'],
      correctIndex: 1,
      explanationAr: 'die Hose مؤنث، فالجواب Diese.',
      optionLanguage: 'de',
    },
    {
      id: 'ex-dw1-7',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['nimmst', 'Welchen', 'du?', 'Mantel'],
      correctOrder: [1, 3, 0, 2],
      explanationAr: 'Welchen Mantel nimmst du? الفعل nimmst في الموضع الثاني بعد Welchen Mantel.',
    },
    {
      id: 'ex-dw1-8',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق كل شكل بوظيفته',
      pairs: [
        { de: 'dieser', ar: 'مذكر، فاعل' },
        { de: 'diesen', ar: 'مذكر، مفعول به' },
        { de: 'diese', ar: 'مؤنث أو جمع' },
        { de: 'dieses', ar: 'محايد' },
      ],
      explanationAr: 'المذكر وحده يتغيّر بين الفاعل والمفعول به: dieser ← diesen.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich kaufe dieser Pullover.',
      correct: 'Ich kaufe diesen Pullover.',
      explanationAr: 'Pullover مفعول به مذكر، فيأخذ نهاية Akkusativ: diesen (مثل den).',
    },
    {
      wrong: 'Welche Pullover nimmst du?',
      correct: 'Welchen Pullover nimmst du?',
      explanationAr: 'der Pullover مذكر ومفعول به ← Welchen. أمّا Welche فللمؤنث والجمع.',
    },
    {
      wrong: 'Dieser Hose ist teuer.',
      correct: 'Diese Hose ist teuer.',
      explanationAr: 'die Hose مؤنث ← Diese. النهاية تتبع جنس الاسم لا الاسم الذي قبله.',
    },
  ],
}
