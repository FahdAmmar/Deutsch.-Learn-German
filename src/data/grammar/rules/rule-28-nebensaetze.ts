import type { GrammarRule } from '@/types'

/**
 * Rule 28 — Nebensätze: the concept and the verb-final rule itself,
 * taught mainly through `dass` and `weil`. Rule 29 (Subjunktionen) covers
 * the full meaning list (weil/dass/wenn/obwohl); rule 30 (Satzstellung)
 * covers the harder mechanics (Nebensatz-first, two-verb endings,
 * separable verbs staying joined). Kept deliberately separate so this
 * file can focus purely on establishing the one big new rule clearly.
 */
const rule: GrammarRule = {
  id: 'gr-28',
  number: 28,
  slug: '28-nebensaetze',
  level: 'A2',
  termDe: 'Nebensätze',
  titleAr: 'الجمل الثانوية',
  eyebrowAr: 'الدرس الثاني عشر في مستوى A2 — قاعدة جديدة كبيرة',
  taglineAr:
    'حتى الآن، كل قاعدة تعلّمتها عن ترتيب الجملة افترضت أن الفعل في **الموضع الثاني**. الجملة الثانوية (Nebensatz) تكسر هذه القاعدة تماماً: الفعل المصرَّف فيها ينتقل إلى **آخر الجملة تماماً**. هذا تغيير جوهري يستحقّ درساً خاصاً به قبل أن تتعمّق في تفاصيله.',
  stats: [
    { value: '1', labelAr: 'قاعدة جديدة كبرى: الفعل في النهاية' },
    { value: '2', labelAr: 'جملتان: رئيسية وثانوية' },
    { value: '40+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich weiß, dass du Deutsch lernst.',
    ar: 'أعلم أنّك تتعلّم الألمانية.',
  },
  objectivesAr: [
    'تفهم الفرق بين الجملة الرئيسية (Hauptsatz) والجملة الثانوية (Nebensatz).',
    'تطبّق القاعدة الجديدة: الفعل المصرَّف ينتقل إلى آخر الجملة الثانوية.',
    'تستخدم [[dass]] و[[weil]] لبناء جمل ثانوية صحيحة.',
    'تضع الفاصلة في المكان الصحيح بين الجملتين دائماً.',
  ],

  sections: [
    {
      id: 'concept',
      navLabelAr: 'المفهوم',
      kickerDe: 'Hauptsatz + Nebensatz',
      titleAr: 'جملتان بوظيفتين مختلفتين',
      titleDe: 'Hauptsatz vs. Nebensatz',
      tone: 'accent',
      introAr:
        'الجملة الثانوية **لا يمكن أن تقف وحدها** — إنها تابعة لجملة رئيسية وتكمل معناها. في العربية نقول «أعلم **أنّك** تتعلّم الألمانية» بلا أيّ تغيير في ترتيب الجملة الثانية. الألمانية مختلفة: دخول أداة مثل [[dass]] يغيّر ترتيب الفعل في الجملة التي تليها تماماً.',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'قارن: جملة رئيسية مقابل جملة ثانوية',
          modes: [
            {
              labelAr: 'جملة رئيسية (كما تعرفها)',
              captionAr: 'الفعل [[lernst]] في الموضع الثاني، كالمعتاد.',
              parts: [{ text: 'Du' }, { text: 'lernst', tone: 'accent' }, { text: 'Deutsch.' }],
            },
            {
              labelAr: 'نفس الجملة، كجملة ثانوية',
              captionAr: 'بعد [[dass]]، الفعل [[lernst]] يقفز إلى آخر الجملة تماماً.',
              parts: [{ text: 'dass du' }, { text: 'Deutsch' }, { text: 'lernst', tone: 'plum' }, { text: '.' }],
            },
          ],
        },
        {
          kind: 'formula',
          tags: [
            { text: 'Hauptsatz,', noteAr: 'جملة رئيسية تامّة' },
            { text: 'dass/weil …', tone: 'accent', noteAr: 'أداة الربط تبدأ الجملة الثانوية' },
            { text: '… Verb.', tone: 'plum', noteAr: 'الفعل المصرَّف في آخر الجملة' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich weiß,', role: 'الجملة الرئيسية (تامّة بذاتها)' },
            { text: 'dass', role: 'أداة الربط' },
            { text: 'du Deutsch', role: 'الفاعل والمفعول' },
            { text: 'lernst.', role: 'الفعل — آخر الجملة!' },
          ],
          ar: 'أعلم أنّك تتعلّم الألمانية.',
        },
      ],
    },

    {
      id: 'dass',
      navLabelAr: 'dass',
      kickerDe: 'dass-Sätze',
      titleAr: 'dass: أوضح مثال على القاعدة',
      titleDe: 'dass',
      tone: 'plum',
      introAr: '[[dass]] (أنّ) تُدخل معلومة أو رأياً بعد أفعال مثل [[wissen]] (يعلم)، [[glauben]] (يعتقد)، [[denken]] (يفكّر)، [[hoffen]] (يأمل) — وهي أفضل أداة لممارسة القاعدة الجديدة لأن معناها مباشر وواضح.',
      blocks: [
        {
          kind: 'examples',
          titleAr: 'أفعال شائعة + dass',
          tone: 'plum',
          items: [
            { badge: 'wissen', de: 'Ich weiß, dass er in Berlin **wohnt**.', ar: 'أعلم أنه يسكن في برلين.' },
            { badge: 'glauben', de: 'Ich glaube, dass das Wetter morgen schön **wird**.', ar: 'أعتقد أن الطقس سيكون جميلاً غداً.' },
            { badge: 'denken', de: 'Ich denke, dass sie recht **hat**.', ar: 'أظنّ أنها محقّة.' },
            { badge: 'hoffen', de: 'Ich hoffe, dass du bald **kommst**.', ar: 'آمل أن تأتي قريباً.' },
            { badge: 'sagen', de: 'Er sagt, dass er keine Zeit **hat**.', ar: 'يقول إنه لا يملك وقتاً.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'star',
          titleAr: 'لاحظ الفاصلة — إلزامية دائماً',
          bodyAr: 'الفاصلة قبل [[dass]] (وقبل أيّ أداة ربط ثانوية) **إلزامية في الألمانية**، خلافاً للعربية والإنجليزية حيث قد تُحذف. لا تنسَها أبداً.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أعد بناء الجملة بـ dass',
          exercises: [
            {
              id: 'gr28-p1-order1',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات لتكوّن جملة بـ dass',
              words: ['Deutsch', 'weiß,', 'dass', 'lernst.', 'du', 'Ich'],
              correctOrder: [5, 1, 2, 4, 0, 3],
              explanationAr: '[[Ich weiß, dass du Deutsch lernst.]] — الفعل [[lernst]] في آخر الجملة الثانوية.',
            },
            {
              id: 'gr28-p1-order2',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات',
              words: ['müde', 'glaube,', 'bin.', 'dass', 'ich', 'Ich'],
              correctOrder: [5, 1, 3, 4, 0, 2],
              explanationAr: '[[Ich glaube, dass ich müde bin.]]',
            },
          ],
        },
      ],
    },

    {
      id: 'weil',
      navLabelAr: 'weil',
      kickerDe: 'weil-Sätze',
      titleAr: 'weil: نفس القاعدة، معنى السبب',
      titleDe: 'weil',
      tone: 'highlight',
      introAr: '[[weil]] (لأنّ) تتبع القاعدة نفسها تماماً — الفعل إلى آخر الجملة — لكنها تجيب عن سؤال [[Warum?]] (لماذا؟) الذي تعلّمته في الدرس الخامس.',
      blocks: [
        {
          kind: 'examples',
          titleAr: 'weil في جمل',
          tone: 'highlight',
          items: [
            { badge: 'weil', de: 'Ich bleibe zu Hause, weil ich krank **bin**.', ar: 'أبقى في البيت لأنني مريض.' },
            { badge: 'weil', de: 'Er lernt Deutsch, weil er in Deutschland **arbeiten möchte**.', ar: 'يتعلّم الألمانية لأنه يريد العمل في ألمانيا.' },
            { badge: 'weil', de: 'Wir kommen später, weil der Bus Verspätung **hat**.', ar: 'سنأتي متأخرين لأن الحافلة متأخرة.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'lightbulb',
          titleAr: 'weil تجيب عن Warum؟',
          bodyAr: 'يمكنك اختبار فهمك: اسأل [[Warum bleibst du zu Hause?]]، والإجابة الطبيعية تبدأ بـ [[Weil …]] وتنتهي بالفعل: [[Weil ich krank bin.]]',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أجب بجملة weil',
          exercises: [
            {
              id: 'gr28-p2-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل: Warum lernst du Deutsch? — Weil ich in Berlin ___ möchte. (arbeiten)',
              sentenceDe: 'Weil ich in Berlin ___ möchte.',
              acceptedAnswers: ['arbeiten'],
              hint: 'الفعل الناقص في آخر الجملة، والمصدر قبله',
              explanationAr: 'في جملة weil بفعلين، يأتي المصدر [[arbeiten]] قبل الفعل الناقص [[möchte]] مباشرة.',
            },
            {
              id: 'gr28-p2-order1',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات',
              words: ['bin.', 'zu Hause,', 'ich', 'weil', 'bleibe', 'krank', 'Ich'],
              correctOrder: [6, 4, 1, 3, 2, 5, 0],
              explanationAr: '[[Ich bleibe zu Hause, weil ich krank bin.]]',
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
      introAr: 'أشهر خطأ بلا منازع: نسيان نقل الفعل إلى آخر الجملة الثانوية — عادة الجمل الرئيسية صعبة الكسر.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich weiß, dass du lernst Deutsch.',
              correct: 'Ich weiß, dass du Deutsch lernst.',
              explanationAr: 'الفعل [[lernst]] يجب أن يكون آخر كلمة في الجملة الثانوية.',
            },
            {
              wrong: 'Ich bleibe zu Hause, weil ich bin krank.',
              correct: 'Ich bleibe zu Hause, weil ich krank bin.',
              explanationAr: '[[bin]] ينتقل إلى آخر الجملة بعد [[weil]]، وليس بعد الفاعل مباشرة.',
            },
            {
              wrong: 'Ich weiß dass du Deutsch lernst.',
              correct: 'Ich weiß, dass du Deutsch lernst.',
              explanationAr: 'الفاصلة قبل [[dass]] إلزامية دائماً في الألمانية.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'Hauptsatz, dass/weil … Verb.', hintAr: 'ما القاعدة الجديدة الكبرى؟', backAr: 'الفعل المصرَّف ينتقل إلى آخر الجملة الثانوية تماماً.' },
    { frontDe: 'Ich weiß, dass du lernst.', hintAr: 'أين الفعل؟', backAr: 'في آخر الجملة — بعد الفاعل والمفعول به.' },
    { frontDe: 'weil', hintAr: 'عن أيّ سؤال تجيب؟', backAr: 'Warum؟ (لماذا) — تفسّر السبب.' },
    { frontDe: '،', hintAr: 'متى تكون إلزامية؟', backAr: 'دائماً قبل dass وweil وكل أدوات الجملة الثانوية.' },
  ],

  quiz: [
    {
      id: 'gr28-q1',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['er', 'Ich', 'glaube,', 'kommt.', 'dass'],
      correctOrder: [1, 2, 4, 0, 3],
      explanationAr: '[[Ich glaube, dass er kommt.]]',
    },
    {
      id: 'gr28-q2',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im Nebensatz steht das konjugierte Verb am Ende.',
      isTrue: true,
      explanationAr: 'صحيح: هذه هي القاعدة الجديدة الكبرى في هذا الدرس.',
    },
    {
      id: 'gr28-q3',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بالفعل في موضعه الصحيح (sein)',
      sentenceDe: 'Er bleibt zu Hause, weil er krank ___.',
      acceptedAnswers: ['ist'],
      explanationAr: 'الفعل [[ist]] في آخر الجملة الثانوية.',
    },
    {
      id: 'gr28-q4',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'أيّ جملة صحيحة؟',
      questionDe: '',
      options: [
        'Ich weiß, dass sie Lehrerin ist.',
        'Ich weiß, dass sie ist Lehrerin.',
        'Ich weiß dass sie Lehrerin ist.',
        'Ich weiß, dass ist sie Lehrerin.',
      ],
      correctIndex: 0,
      explanationAr: 'الفاصلة إلزامية، والفعل [[ist]] في آخر الجملة.',
    },
    {
      id: 'gr28-q5',
      type: 'translation',
      level: 'A2',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'أعتقد أنه يسكن في ميونخ.',
      acceptedAnswers: ['Ich glaube, dass er in München wohnt.'],
      explanationAr: '[[wohnt]] في آخر الجملة الثانوية.',
    },
  ],

  cheatSheet: [
    { de: 'Hauptsatz, dass/weil … Verb.', ar: 'الفعل في آخر الجملة الثانوية.' },
    { de: 'dass', ar: 'لإدخال معلومة أو رأي (بعد wissen، glauben، sagen…).' },
    { de: 'weil', ar: 'للسبب — تجيب عن Warum؟' },
    { de: '، قبل dass/weil', ar: 'إلزامية دائماً.' },
  ],
}

export default rule
