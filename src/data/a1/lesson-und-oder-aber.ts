import type { Lesson } from '@/types'

/**
 * und, oder, aber (plus dann / danach): the first connectors an A1 learner needs to say more than one short
 * sentence. They are placed here because the Goethe A1 word list already carries oder and aber with example
 * sentences, and the CEFR descriptor for A1 cohesion is linking with very basic connectors like "and" and "then".
 * The one rule that matters: und / oder / aber do not change the word order of the sentence after them, while
 * dann / danach take the first place, so the verb follows them directly.
 */
export const lessonUndOderAber: Lesson = {
  id: 'a1-m03-l06',
  slug: 'und-oder-aber',
  level: 'A1',
  moduleId: 'a1-m03',
  title: 'und, oder, aber',
  titleAr: 'أدوات الربط الأولى: und وoder وaber',
  estimatedMinutes: 15,
  objectivesAr: [
    'ربط كلمتين أو جملتين بـ und (و) وoder (أو) وaber (لكن)',
    'معرفة أنّ الفعل يبقى في الموضع الثاني بعد und وoder وaber',
    'ترتيب الأحداث بـ zuerst وdann وdanach مع وضع الفعل بعدها مباشرة',
  ],
  explanation: [
    {
      titleAr: 'und = و، oder = أو',
      bodyAr:
        '**und** تجمع شيئين: **Ich lerne Deutsch und Englisch.** (أتعلّم الألمانية والإنجليزية). و**oder** تعطي اختياراً: **Trinkst du Tee oder Kaffee?** (أتشرب الشاي أم القهوة؟). إن كان الفاعل واحداً في الجملتين فلا نكرّره بعد und: **Ich komme aus Syrien und wohne in Berlin.**',
    },
    {
      titleAr: 'aber = لكن',
      bodyAr:
        '**aber** تقابل فكرتين مختلفتين، وقبلها فاصلة: **Der Film ist lang, aber schön.** (الفيلم طويل لكنه جميل). **Ich habe Hunger, aber ich habe kein Geld.** (أنا جائع لكن ليس عندي مال).',
    },
    {
      titleAr: 'ترتيب الجملة بعدها لا يتغيّر',
      bodyAr:
        'بعد **und** و**oder** و**aber** تبقى الجملة كما هي: الفاعل ثم الفعل في الموضع الثاني. **Ich habe Hunger, aber ich habe kein Geld.** وليس: ~~aber habe ich~~. هذه الكلمات تقف «خارج» الجملة، فلا تأخذ مكاناً فيها.',
    },
    {
      titleAr: 'zuerst وdann وdanach: ماذا بعد ذلك؟',
      bodyAr:
        'لنرتّب الأحداث نقول **zuerst** (أولاً) ثم **dann** أو **danach** (بعد ذلك). هذه الكلمات تحتلّ **المكان الأول** في الجملة، ولهذا يأتي **الفعل بعدها مباشرة** ثم الفاعل: **Ich frühstücke. Dann gehe ich zur Arbeit.** (وليس: Dann ich gehe). **Zuerst esse ich, danach lerne ich Deutsch.**',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-und-oder-aber',
      slug: 'und-oder-aber-dann',
      level: 'A1',
      titleDe: 'und, oder, aber, dann',
      titleAr: 'أدوات الربط الأولى وترتيب الجملة',
      conceptAr: 'نربط الجمل الصغيرة بـ und وoder وaber، ونرتّب الأحداث بـ dann وdanach.',
      ruleAr:
        'بعد und / oder / aber لا يتغيّر ترتيب الجملة: الفاعل ثم الفعل. أمّا بعد dann / danach / zuerst فالكلمة نفسها هي المكان الأول، ولذلك يأتي الفعل مباشرة بعدها.',
      tables: [
        {
          caption: 'أين يقف الفعل؟',
          headers: ['الكلمة', 'المعنى', 'مثال'],
          rows: [
            { label: 'und', values: ['و', 'Ich lerne Deutsch und Englisch.'] },
            { label: 'oder', values: ['أو', 'Trinkst du Tee oder Kaffee?'] },
            { label: 'aber', values: ['لكن', 'Ich habe Hunger, aber ich habe kein Geld.'] },
            { label: 'dann / danach', values: ['بعد ذلك (الفعل بعدها)', 'Dann gehe ich zur Arbeit.'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich habe Hunger, aber ich habe kein Geld.',
          ar: 'أنا جائع لكن ليس عندي مال.',
          tokens: [
            { text: 'Ich habe Hunger,', role: 'الجملة الأولى' },
            { text: 'aber', role: 'أداة ربط (خارج الجملة)' },
            { text: 'ich', role: 'فاعل' },
            { text: 'habe', role: 'فعل (ثانياً)' },
            { text: 'kein Geld.', role: 'مفعول به' },
          ],
        },
        {
          de: 'Dann gehe ich zur Arbeit.',
          ar: 'بعد ذلك أذهب إلى العمل.',
          tokens: [
            { text: 'Dann', role: 'المكان الأول' },
            { text: 'gehe', role: 'فعل (ثانياً)' },
            { text: 'ich', role: 'فاعل' },
            { text: 'zur Arbeit.', role: 'المكان' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Ich lerne Deutsch und Englisch.', ar: 'أتعلّم الألمانية والإنجليزية.' },
    { de: 'Ich komme aus Syrien und wohne in Berlin.', ar: 'أنا من سوريا وأسكن في برلين.' },
    { de: 'Trinkst du Tee oder Kaffee?', ar: 'أتشرب الشاي أم القهوة؟' },
    { de: 'Wir gehen ins Kino oder ins Café.', ar: 'نذهب إلى السينما أو إلى المقهى.' },
    { de: 'Der Film ist lang, aber schön.', ar: 'الفيلم طويل لكنه جميل.' },
    { de: 'Ich habe Hunger, aber ich habe kein Geld.', ar: 'أنا جائع لكن ليس عندي مال.' },
    { de: 'Ich frühstücke. Dann gehe ich zur Arbeit.', ar: 'أتناول الفطور. بعد ذلك أذهب إلى العمل.' },
    { de: 'Zuerst esse ich, danach lerne ich Deutsch.', ar: 'أولاً آكل، وبعد ذلك أتعلّم الألمانية.' },
  ],
  vocabulary: [
    { id: 'voc-uoa-und', word: 'und', partOfSpeech: 'conjunction', meaningAr: 'و', level: 'A1', category: 'Konnektoren', example: { de: 'Ich lerne Deutsch und Englisch.', ar: 'أتعلّم الألمانية والإنجليزية.' } },
    { id: 'voc-uoa-oder', word: 'oder', partOfSpeech: 'conjunction', meaningAr: 'أو', level: 'A1', category: 'Konnektoren', example: { de: 'Trinkst du Tee oder Kaffee?', ar: 'أتشرب الشاي أم القهوة؟' } },
    { id: 'voc-uoa-aber', word: 'aber', partOfSpeech: 'conjunction', meaningAr: 'لكن', level: 'A1', category: 'Konnektoren', example: { de: 'Der Film ist lang, aber schön.', ar: 'الفيلم طويل لكنه جميل.' } },
    { id: 'voc-uoa-zuerst', word: 'zuerst', partOfSpeech: 'adverb', meaningAr: 'أولاً', level: 'A1', category: 'Konnektoren', example: { de: 'Zuerst mache ich Kaffee.', ar: 'أولاً أحضّر القهوة.' } },
    { id: 'voc-uoa-dann', word: 'dann', partOfSpeech: 'adverb', meaningAr: 'ثم / بعد ذلك', level: 'A1', category: 'Konnektoren', example: { de: 'Ich frühstücke. Dann gehe ich zur Arbeit.', ar: 'أتناول الفطور. بعد ذلك أذهب إلى العمل.' } },
    { id: 'voc-uoa-danach', word: 'danach', partOfSpeech: 'adverb', meaningAr: 'بعد ذلك', level: 'A1', category: 'Konnektoren', example: { de: 'Ich esse und danach lerne ich Deutsch.', ar: 'آكل وبعد ذلك أتعلّم الألمانية.' } },
  ],
  pronunciationTips: [
    {
      titleAr: 'النهاية -er في oder',
      bodyAr: 'النهاية -er في آخر الكلمة تُنطق صوتاً قصيراً قريباً من «ا»: oder ≈ «أودا». لا تنطق الراء كاملة.',
      example: 'oder',
    },
  ],
  exercises: [
    {
      id: 'ex-uoa-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر أداة الربط',
      questionDe: 'Trinkst du Tee ___ Kaffee?',
      options: ['und', 'oder', 'aber', 'dann'],
      correctIndex: 1,
      explanationAr: 'اختيار بين شيئين ← oder (أو).',
    },
    {
      id: 'ex-uoa-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر أداة الربط',
      questionDe: 'Ich möchte ins Kino gehen, ___ ich habe kein Geld.',
      options: ['und', 'oder', 'aber', 'dann'],
      correctIndex: 2,
      explanationAr: 'فكرتان متعارضتان: أريد، لكن ليس عندي مال ← aber.',
    },
    {
      id: 'ex-uoa-3',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['aber', 'lernt', 'Ich', 'Deutsch.', 'bin', 'Peter', 'müde,'],
      correctOrder: [2, 4, 6, 0, 5, 1, 3],
      explanationAr: 'Ich bin müde, aber Peter lernt Deutsch. بعد aber تبقى الجملة عادية: الفاعل Peter ثم الفعل lernt.',
    },
    {
      id: 'ex-uoa-4',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['gehe', 'Arbeit.', 'Dann', 'zur', 'ich'],
      correctOrder: [2, 0, 4, 3, 1],
      explanationAr: 'Dann gehe ich zur Arbeit. بعد Dann يأتي الفعل gehe مباشرة.',
    },
    {
      id: 'ex-uoa-5',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (بعد ذلك)',
      sentenceDe: 'Ich frühstücke. ___ gehe ich zur Arbeit.',
      acceptedAnswers: ['Dann', 'Danach'],
      hint: 'ثم / بعد ذلك',
      explanationAr: 'Dann أو Danach في المكان الأول، ثم الفعل gehe.',
    },
    {
      id: 'ex-uoa-6',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Ich habe Hunger, aber habe ich kein Geld.“ ist richtig.',
      isTrue: false,
      explanationAr: 'خطأ. بعد aber يبقى ترتيب الجملة عادياً: Ich habe Hunger, aber ich habe kein Geld.',
    },
    {
      id: 'ex-uoa-7',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق كل كلمة بمعناها',
      pairs: [
        { de: 'und', ar: 'و' },
        { de: 'oder', ar: 'أو' },
        { de: 'aber', ar: 'لكن' },
        { de: 'dann', ar: 'ثم / بعد ذلك' },
      ],
      explanationAr: 'und تجمع، oder تختار، aber تقابل، dann ترتّب الأحداث.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich habe Hunger, aber habe ich kein Geld.',
      correct: 'Ich habe Hunger, aber ich habe kein Geld.',
      explanationAr: 'aber لا تغيّر الترتيب: بعدها الفاعل ثم الفعل كما في أي جملة عادية.',
    },
    {
      wrong: 'Ich frühstücke. Dann ich gehe zur Arbeit.',
      correct: 'Ich frühstücke. Dann gehe ich zur Arbeit.',
      explanationAr: 'dann تحتلّ المكان الأول، فيأتي الفعل gehe بعدها مباشرة.',
    },
  ],
}
