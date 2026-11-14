import type { Lesson } from '@/types'

/**
 * wann, wenn, als: three words for one Arabic «متى / عندما / إذا», plus seit and bis used as conjunctions.
 * Menschen A2 teaches the pair "wenn … (dann)" and temporal "als" and, late in the book, the conjunctions bis and
 * seit(dem); the Goethe A2 word list has the sentence "Wenn es nicht regnet, dann kommen wir". The lesson sits
 * after the weil / dass / wenn lesson, builds on the Perfekt and Präteritum of sein / haben that the learner has
 * already met, and stops short of bevor / nachdem / während, which the Goethe lists place at B1.
 */
export const lessonWennAlsWann: Lesson = {
  id: 'a2-m03-l02',
  slug: 'wenn-als-wann',
  level: 'A2',
  moduleId: 'a2-m03',
  title: 'wenn, als, wann',
  titleAr: 'wann وwenn وals: متى وإذا وعندما',
  estimatedMinutes: 30,
  objectivesAr: [
    'السؤال بـ wann وعدم الخلط بينها وبين wenn',
    'استعمال wenn للشرط وللتكرار وللمستقبل، مع wenn … dann',
    'استعمال als لحدث وقع مرة واحدة في الماضي',
    'استعمال seit وbis كأداتي ربط مع الفعل في الآخر',
  ],
  explanation: [
    {
      titleAr: 'ثلاث كلمات لـ «متى / عندما / إذا»',
      bodyAr:
        '**wann** للسؤال: **Wann kommst du nach Hause?** و**wenn** للشرط وللتكرار وللمستقبل. و**als** لحدث وقع **مرة واحدة في الماضي**. والجملة التي تبدأ بـ wenn أو als جملة فرعية، فالفعل المصرَّف في **آخرها**.',
    },
    {
      titleAr: 'wenn: شرط، تكرار، مستقبل',
      bodyAr:
        '**Wenn es regnet, bleibe ich zu Hause.** (إذا أمطرت). **Wenn ich Zeit habe, rufe ich dich an.** (مستقبل). ونستعملها للتكرار، حتى في الماضي، مع **immer**: **Immer wenn ich müde bin, trinke ich Kaffee.** (كلما كنتُ متعباً) و**Immer wenn ich müde war, habe ich Kaffee getrunken.** لأنّ الأمر تكرّر.',
    },
    {
      titleAr: 'als: مرة واحدة في الماضي',
      bodyAr:
        '**als** لحدث انتهى أو لفترة معيّنة في الماضي: **Als ich Kind war, hatte ich einen Hund.** (عندما كنتُ طفلاً). **Als ich in Berlin angekommen bin, habe ich meine Freundin angerufen.** للحاضر والمستقبل **لا نستعمل als** أبداً، وللتكرار في الماضي نستعمل wenn.',
    },
    {
      titleAr: 'wenn … dann وترتيب الجملة',
      bodyAr:
        'تبدأ الجملة الرئيسية بعد الجملة الفرعية بـ **الفعل** مباشرة: **Wenn es regnet, bleibe ich zu Hause.** ويمكن أن نضيف **dann** (عندئذٍ): **Wenn es regnet, dann bleibe ich zu Hause.** وبعد dann أيضاً يأتي الفعل مباشرة. أمّا ~~Wenn es regnet, ich bleibe~~ فخطأ، لأنّ الجملة الفرعية تحتلّ المكان الأول كله.',
    },
    {
      titleAr: 'wenn أم ob؟',
      bodyAr:
        '**ob** تعني «هل» في السؤال غير المباشر: **Ich weiß nicht, ob er kommt.** (لا أعرف هل سيأتي). و**wenn** تعني «إذا»: **Wenn er kommt, freue ich mich.** (إذا جاء أفرح). الأولى سؤال، والثانية شرط.',
    },
    {
      titleAr: 'seit وbis: أدوات ربط أيضاً',
      bodyAr:
        '**seit** تعني «منذ أن»: **Seit ich in Deutschland wohne, lerne ich Deutsch.** و**bis** تعني «إلى أن»: **Ich warte hier, bis der Bus kommt.** في الحالتين الفعل في **آخر** الجملة الفرعية. (تعرفهما أيضاً حرفَي جر: seit drei Monaten، bis Freitag.)',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-wenn-als-wann',
      slug: 'wenn-als-wann',
      level: 'A2',
      titleDe: 'wann, wenn, als',
      titleAr: 'wann وwenn وals وseit وbis',
      conceptAr: 'نختار الكلمة بحسب الزمن والتكرار، ثم نضع الفعل في آخر الجملة الفرعية.',
      ruleAr:
        'wann ← سؤال. wenn ← شرط أو تكرار أو مستقبل. als ← مرة واحدة في الماضي. بعد wenn / als / seit / bis يذهب الفعل المصرَّف إلى آخر الجملة، وإذا بدأت بها الجملة يأتي فعل الجملة الرئيسية مباشرة بعد الفاصلة.',
      tables: [
        {
          caption: 'wann أم wenn أم als؟',
          headers: ['الكلمة', 'متى؟', 'مثال'],
          rows: [
            { label: 'wann', values: ['سؤال عن الوقت', 'Wann kommst du nach Hause?'] },
            { label: 'wenn', values: ['شرط / تكرار / مستقبل', 'Wenn es regnet, bleibe ich zu Hause.'] },
            { label: 'als', values: ['مرة واحدة في الماضي', 'Als ich Kind war, hatte ich einen Hund.'] },
            { label: 'seit', values: ['منذ أن (بدأ ولا يزال)', 'Seit ich in Deutschland wohne, lerne ich Deutsch.'] },
            { label: 'bis', values: ['إلى أن', 'Ich warte hier, bis der Bus kommt.'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Wenn es regnet, dann bleibe ich zu Hause.',
          ar: 'إذا أمطرت، فإنني أبقى في البيت.',
          tokens: [
            { text: 'Wenn es regnet,', role: 'الجملة الفرعية (المكان الأول كله)' },
            { text: 'dann', role: 'اختيارية (المكان الأول)' },
            { text: 'bleibe', role: 'فعل (ثانياً)' },
            { text: 'ich', role: 'فاعل' },
            { text: 'zu Hause.', role: 'المكان' },
          ],
        },
        {
          de: 'Als ich Kind war, hatte ich einen Hund.',
          ar: 'عندما كنتُ طفلاً، كان عندي كلب.',
          tokens: [
            { text: 'Als ich Kind war,', role: 'الجملة الفرعية: مرة واحدة في الماضي' },
            { text: 'hatte', role: 'فعل (ثانياً)' },
            { text: 'ich', role: 'فاعل' },
            { text: 'einen Hund.', role: 'المفعول به' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Wann kommst du nach Hause?', ar: 'متى تعود إلى البيت؟' },
    { de: 'Wenn es regnet, bleibe ich zu Hause.', ar: 'إذا أمطرت أبقى في البيت.' },
    { de: 'Wenn es regnet, dann bleibe ich zu Hause.', ar: 'إذا أمطرت، فإنني أبقى في البيت.' },
    { de: 'Als ich Kind war, hatte ich einen Hund.', ar: 'عندما كنتُ طفلاً كان عندي كلب.' },
    { de: 'Immer wenn ich müde bin, trinke ich Kaffee.', ar: 'كلما كنتُ متعباً أشرب القهوة.' },
    { de: 'Als ich in Berlin angekommen bin, habe ich meine Freundin angerufen.', ar: 'عندما وصلتُ إلى برلين اتصلتُ بصديقتي.' },
    { de: 'Seit ich in Deutschland wohne, lerne ich Deutsch.', ar: 'منذ أن أسكن في ألمانيا وأنا أتعلّم الألمانية.' },
    { de: 'Ich warte hier, bis der Bus kommt.', ar: 'أنتظر هنا إلى أن تأتي الحافلة.' },
  ],
  vocabulary: [
    { id: 'voc-wew-wann', word: 'wann', partOfSpeech: 'adverb', meaningAr: 'متى؟', level: 'A2', category: 'Konnektoren', example: { de: 'Wann kommst du nach Hause?', ar: 'متى تعود إلى البيت؟' } },
    { id: 'voc-wew-wenn', word: 'wenn', partOfSpeech: 'conjunction', meaningAr: 'إذا / كلما', level: 'A2', category: 'Konnektoren', example: { de: 'Wenn es regnet, bleibe ich zu Hause.', ar: 'إذا أمطرت أبقى في البيت.' } },
    { id: 'voc-wew-als', word: 'als', partOfSpeech: 'conjunction', meaningAr: 'عندما (مرة في الماضي)', level: 'A2', category: 'Konnektoren', example: { de: 'Als ich Kind war, hatte ich einen Hund.', ar: 'عندما كنتُ طفلاً كان عندي كلب.' } },
    { id: 'voc-wew-seit', word: 'seit', partOfSpeech: 'conjunction', meaningAr: 'منذ أن', level: 'A2', category: 'Konnektoren', example: { de: 'Seit ich in Deutschland wohne, lerne ich Deutsch.', ar: 'منذ أن أسكن في ألمانيا وأنا أتعلّم الألمانية.' } },
    { id: 'voc-wew-bis', word: 'bis', partOfSpeech: 'conjunction', meaningAr: 'إلى أن', level: 'A2', category: 'Konnektoren', example: { de: 'Ich warte hier, bis der Bus kommt.', ar: 'أنتظر هنا إلى أن تأتي الحافلة.' } },
    { id: 'voc-wew-immer', word: 'immer', partOfSpeech: 'adverb', meaningAr: 'دائماً', level: 'A2', category: 'Konnektoren', example: { de: 'Immer wenn ich müde bin, trinke ich Kaffee.', ar: 'كلما كنتُ متعباً أشرب القهوة.' } },
  ],
  exercises: [
    {
      id: 'ex-wew-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الكلمة',
      questionDe: '___ kommst du nach Hause?',
      options: ['Wann', 'Wenn', 'Als', 'Ob'],
      correctIndex: 0,
      explanationAr: 'سؤال عن الوقت ← Wann.',
    },
    {
      id: 'ex-wew-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الكلمة',
      questionDe: '___ es regnet, bleibe ich zu Hause.',
      options: ['Als', 'Wenn', 'Wann', 'Ob'],
      correctIndex: 1,
      explanationAr: 'شرط في الحاضر ← Wenn.',
    },
    {
      id: 'ex-wew-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الكلمة',
      questionDe: '___ ich Kind war, hatte ich einen Hund.',
      options: ['Wenn', 'Wann', 'Als', 'Ob'],
      correctIndex: 2,
      explanationAr: 'فترة محدّدة في الماضي ← Als.',
    },
    {
      id: 'ex-wew-4',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الكلمة',
      questionDe: 'Immer ___ ich müde war, habe ich Kaffee getrunken.',
      options: ['als', 'wenn', 'wann', 'ob'],
      correctIndex: 1,
      explanationAr: 'تكرّر الأمر في الماضي (immer) ← wenn، وليس als.',
    },
    {
      id: 'ex-wew-5',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الكلمة',
      questionDe: '___ ich gestern nach Hause gekommen bin, war mein Bruder schon da.',
      options: ['Als', 'Wenn', 'Wann', 'Wie'],
      correctIndex: 0,
      explanationAr: 'حدث وقع مرة واحدة أمس ← Als.',
    },
    {
      id: 'ex-wew-6',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (إلى أن)',
      sentenceDe: 'Ich warte hier, ___ der Bus kommt.',
      acceptedAnswers: ['bis'],
      hint: 'إلى أن',
      explanationAr: 'bis تعني «إلى أن»، والفعل kommt في الآخر.',
    },
    {
      id: 'ex-wew-7',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بالفعل (الجملة الرئيسية)',
      sentenceDe: 'Seit ich in Deutschland wohne, ___ ich Deutsch.',
      acceptedAnswers: ['lerne'],
      hint: 'lernen ← ich',
      explanationAr: 'بعد الجملة الفرعية يأتي الفعل مباشرة: …, lerne ich Deutsch.',
    },
    {
      id: 'ex-wew-8',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['bleibe', 'Wenn', 'zu', 'es', 'Hause.', 'regnet,', 'ich'],
      correctOrder: [1, 3, 5, 0, 6, 2, 4],
      explanationAr: 'Wenn es regnet, bleibe ich zu Hause. الفعل bleibe بعد الفاصلة مباشرة.',
    },
    {
      id: 'ex-wew-9',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Wenn es regnet, ich bleibe zu Hause.“ ist richtig.',
      isTrue: false,
      explanationAr: 'خطأ. بعد الجملة الفرعية يأتي الفعل مباشرة: Wenn es regnet, bleibe ich zu Hause.',
    },
    {
      id: 'ex-wew-10',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الكلمة',
      questionDe: 'Ich weiß nicht, ___ er kommt.',
      options: ['ob', 'wenn', 'als', 'dann'],
      correctIndex: 0,
      explanationAr: 'سؤال غير مباشر (هل سيأتي؟) ← ob.',
    },
    {
      id: 'ex-wew-11',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق كل كلمة بمعناها',
      pairs: [
        { de: 'wann', ar: 'متى؟ (سؤال)' },
        { de: 'wenn', ar: 'إذا / كلما' },
        { de: 'als', ar: 'عندما (مرة واحدة في الماضي)' },
        { de: 'seit', ar: 'منذ أن' },
        { de: 'bis', ar: 'إلى أن' },
      ],
      explanationAr: 'wann سؤال، wenn شرط أو تكرار، als ماضٍ مرة واحدة، seit منذ، bis إلى أن.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Wenn es regnet, ich bleibe zu Hause.',
      correct: 'Wenn es regnet, bleibe ich zu Hause.',
      explanationAr: 'الجملة الفرعية تحتلّ المكان الأول، فيأتي فعل الجملة الرئيسية بعدها مباشرة.',
    },
    {
      wrong: 'Wenn ich Kind war, hatte ich einen Hund.',
      correct: 'Als ich Kind war, hatte ich einen Hund.',
      explanationAr: 'فترة واحدة في الماضي ← als. (wenn للتكرار: Immer wenn …).',
    },
    {
      wrong: 'Wann ich Zeit habe, rufe ich dich an.',
      correct: 'Wenn ich Zeit habe, rufe ich dich an.',
      explanationAr: 'wann للسؤال فقط. للشرط نستعمل wenn.',
    },
  ],
}
