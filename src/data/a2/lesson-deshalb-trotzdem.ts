import type { Lesson } from '@/types'

/**
 * deshalb, deswegen, darum, trotzdem, außerdem: connecting adverbs that open a main clause, so the verb stays
 * in second place right after them. They are contrasted with weil (verb at the end), which the learner has just
 * met, because that contrast is what an Arabic speaker gets wrong.
 */
export const lessonDeshalbTrotzdem: Lesson = {
  id: 'a2-m20-l01',
  slug: 'deshalb-trotzdem',
  level: 'A2',
  moduleId: 'a2-m20',
  title: 'deshalb, darum, trotzdem',
  titleAr: 'أدوات الربط deshalb وtrotzdem: الفعل بعدها مباشرة',
  estimatedMinutes: 25,
  objectivesAr: [
    'التعبير عن النتيجة بـ deshalb وdeswegen وdarum',
    'التعبير عن التناقض بـ trotzdem وعن الإضافة بـ außerdem',
    'وضع الفعل مباشرة بعد أداة الربط: Deshalb gehe ich … وليس Deshalb ich gehe',
    'التفريق بين weil (السبب، الفعل في الآخر) وdeshalb (النتيجة، الفعل بعدها)',
  ],
  explanation: [
    {
      titleAr: 'النتيجة: deshalb وdeswegen وdarum',
      bodyAr:
        'نقول السبب في جملة ثم النتيجة في جملة تبدأ بـ **deshalb** (أو **deswegen** أو **darum**، ومعناها واحد: لهذا السبب). **Es regnet. Deshalb bleibe ich zu Hause.** (تمطر. لذلك أبقى في البيت). قاعدة الترتيب: بعد deshalb يأتي **الفعل مباشرة** ثم الفاعل: **Deshalb bleibe ich …** لأن deshalb تحتل المرتبة الأولى في الجملة، والفعل يجب أن يبقى في المرتبة الثانية.',
    },
    {
      titleAr: 'weil أم deshalb؟',
      bodyAr:
        'المعنى واحد لكن البناء يختلف: **weil** تقدّم **السبب** والفعل في **آخر** جملتها الفرعية: **Ich bleibe zu Hause, weil es regnet.** أما **deshalb** فتقدّم **النتيجة** والفعل **بعدها مباشرة**: **Es regnet, deshalb bleibe ich zu Hause.** تذكّر: weil ← السبب ← الفعل في الآخر. deshalb ← النتيجة ← الفعل ثانياً.',
    },
    {
      titleAr: 'التناقض: trotzdem',
      bodyAr:
        '**trotzdem** (مع ذلك، رغم ذلك) تعمل مثل deshalb: الفعل بعدها مباشرة. **Ich habe keine Zeit. Trotzdem helfe ich dir.** (ليس عندي وقت. ومع ذلك أساعدك). **Er ist krank. Trotzdem geht er zur Arbeit.**',
    },
    {
      titleAr: 'الإضافة: außerdem',
      bodyAr:
        '**außerdem** (علاوة على ذلك) تضيف سبباً أو فكرة أخرى، وتعمل بالقاعدة نفسها: **Die Wohnung ist günstig. Außerdem liegt sie im Zentrum.** ويمكن أن نكتب جملتين تفصل بينهما نقطة، أو نفصلهما بفاصلة: Es regnet, deshalb bleibe ich zu Hause.',
    },
  ],
  examples: [
    { de: 'Ich bin müde. Deshalb gehe ich früh schlafen.', ar: 'أنا متعب. لذلك أنام مبكراً.' },
    { de: 'Es regnet. Deswegen nehme ich einen Regenschirm mit.', ar: 'تمطر. لهذا آخذ مظلة معي.' },
    { de: 'Der Zug hat Verspätung. Darum komme ich zu spät.', ar: 'القطار متأخر. لذلك أصل متأخراً.' },
    { de: 'Ich habe keine Zeit. Trotzdem helfe ich dir.', ar: 'ليس عندي وقت. ومع ذلك أساعدك.' },
    { de: 'Er ist krank. Trotzdem geht er zur Arbeit.', ar: 'هو مريض. ومع ذلك يذهب إلى العمل.' },
    { de: 'Die Wohnung ist günstig. Außerdem liegt sie im Zentrum.', ar: 'الشقة بسعر مناسب. وعلاوة على ذلك تقع في وسط المدينة.' },
    { de: 'Ich bleibe zu Hause, weil es regnet.', ar: 'أبقى في البيت لأنها تمطر.' },
    { de: 'Es regnet, deshalb bleibe ich zu Hause.', ar: 'تمطر، لذلك أبقى في البيت.' },
  ],
  vocabulary: [
    { id: 'voc-deshalb-deshalb', word: 'deshalb', partOfSpeech: 'adverb', meaningAr: 'لهذا السبب', level: 'A2', category: 'Konnektoren', example: { de: 'Ich bin müde, deshalb gehe ich früh schlafen.', ar: 'أنا متعب، لذلك أنام مبكراً.' } },
    { id: 'voc-deshalb-deswegen', word: 'deswegen', partOfSpeech: 'adverb', meaningAr: 'لأجل ذلك', level: 'A2', category: 'Konnektoren', example: { de: 'Es regnet. Deswegen bleibe ich zu Hause.', ar: 'تمطر. لذلك أبقى في البيت.' } },
    { id: 'voc-deshalb-darum', word: 'darum', partOfSpeech: 'adverb', meaningAr: 'لذلك (محكية)', level: 'A2', category: 'Konnektoren', example: { de: 'Der Bus kommt nicht. Darum gehe ich zu Fuß.', ar: 'الحافلة لا تأتي. لذلك أمشي.' } },
    { id: 'voc-deshalb-trotzdem', word: 'trotzdem', partOfSpeech: 'adverb', meaningAr: 'مع ذلك / رغم ذلك', level: 'A2', category: 'Konnektoren', example: { de: 'Es regnet. Trotzdem gehen wir spazieren.', ar: 'تمطر. ومع ذلك نخرج للتمشّي.' } },
    { id: 'voc-deshalb-ausserdem', word: 'außerdem', partOfSpeech: 'adverb', meaningAr: 'علاوة على ذلك', level: 'A2', category: 'Konnektoren', example: { de: 'Ich habe keine Lust. Außerdem bin ich müde.', ar: 'ليست لي رغبة. وعلاوة على ذلك أنا متعب.' } },
    { id: 'voc-deshalb-grund', word: 'Grund', article: 'der', plural: 'Gründe', partOfSpeech: 'noun', meaningAr: 'السبب', level: 'A2', category: 'Konnektoren', example: { de: 'Was ist der Grund?', ar: 'ما السبب؟' } },
    { id: 'voc-deshalb-leider', word: 'leider', partOfSpeech: 'adverb', meaningAr: 'للأسف', level: 'A2', category: 'Konnektoren', example: { de: 'Leider habe ich heute keine Zeit.', ar: 'للأسف ليس عندي وقت اليوم.' } },
  ],
  exercises: [
    {
      id: 'ex-deshalb-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر أداة الربط',
      questionDe: 'Es regnet. ___ bleibe ich zu Hause.',
      options: ['Deshalb', 'Weil', 'Dass', 'Wenn'],
      correctIndex: 0,
      explanationAr: 'النتيجة في جملة جديدة ← Deshalb، والفعل بعدها مباشرة.',
    },
    {
      id: 'ex-deshalb-2',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['gehe', 'Deshalb', 'schlafen', 'ich', 'früh'],
      correctOrder: [1, 0, 3, 4, 2],
      explanationAr: 'Deshalb gehe ich früh schlafen. الفعل gehe بعد Deshalb مباشرة.',
    },
    {
      id: 'ex-deshalb-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'أيّ جملة صحيحة؟',
      questionDe: '',
      options: ['Deshalb ich bleibe zu Hause.', 'Deshalb bleibe ich zu Hause.', 'Deshalb ich zu Hause bleibe.', 'Ich deshalb bleibe zu Hause.'],
      correctIndex: 1,
      explanationAr: 'بعد deshalb يأتي الفعل: Deshalb bleibe ich zu Hause.',
    },
    {
      id: 'ex-deshalb-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (مع ذلك)',
      sentenceDe: 'Ich habe keine Zeit. ___ helfe ich dir.',
      acceptedAnswers: ['Trotzdem'],
      hint: 'مع ذلك',
      explanationAr: 'التناقض ← Trotzdem: ليس عندي وقت، ومع ذلك أساعدك.',
    },
    {
      id: 'ex-deshalb-5',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Ich bleibe zu Hause, weil es regnet“ bedeutet dasselbe wie „Es regnet. Deshalb bleibe ich zu Hause.“',
      isTrue: true,
      explanationAr: 'صحيح. المعنى واحد لكن البناء يختلف: weil ← الفعل في الآخر، deshalb ← الفعل بعدها.',
    },
    {
      id: 'ex-deshalb-6',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر أداة الربط المناسبة للمعنى',
      questionDe: 'Er ist krank. ___ geht er zur Arbeit.',
      options: ['Deshalb', 'Trotzdem', 'Weil', 'Denn'],
      correctIndex: 1,
      explanationAr: 'هو مريض لكنه يذهب إلى العمل: تناقض ← Trotzdem.',
    },
    {
      id: 'ex-deshalb-7',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق كل أداة بمعناها',
      pairs: [
        { de: 'deshalb', ar: 'لهذا السبب (نتيجة)' },
        { de: 'trotzdem', ar: 'مع ذلك (تناقض)' },
        { de: 'außerdem', ar: 'علاوة على ذلك (إضافة)' },
        { de: 'weil', ar: 'لأنّ (سبب، الفعل في الآخر)' },
      ],
      explanationAr: 'deshalb وtrotzdem وaußerdem: الفعل بعدها مباشرة. weil: الفعل في آخر الجملة.',
    },
    {
      id: 'ex-deshalb-8',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بأداة السبب',
      sentenceDe: 'Ich bleibe zu Hause, ___ es regnet.',
      acceptedAnswers: ['weil'],
      hint: 'لأنّ',
      explanationAr: 'السبب مع الفعل في الآخر ← weil es regnet.',
    },
    {
      id: 'ex-deshalb-9',
      type: 'translation',
      level: 'A2',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'أنا متعب، لذلك أنام مبكراً.',
      acceptedAnswers: [
        'Ich bin müde. Deshalb gehe ich früh schlafen.',
        'Ich bin müde, deshalb gehe ich früh schlafen.',
        'Ich bin müde. Deswegen gehe ich früh schlafen.',
        'Ich bin müde, deswegen gehe ich früh schlafen.',
        'Ich bin müde. Darum gehe ich früh schlafen.',
        'Ich bin müde, darum gehe ich früh schlafen.',
        'Ich bin müde. Deshalb schlafe ich früh.',
        'Ich bin müde, deshalb schlafe ich früh.',
      ],
      explanationAr: 'Ich bin müde. Deshalb gehe ich früh schlafen.',
    },
    {
      id: 'ex-deshalb-10',
      type: 'translation',
      level: 'A2',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'ليس عندي وقت، ومع ذلك أساعدك.',
      acceptedAnswers: ['Ich habe keine Zeit. Trotzdem helfe ich dir.', 'Ich habe keine Zeit, trotzdem helfe ich dir.', 'Ich habe keine Zeit. Trotzdem helfe ich Ihnen.'],
      explanationAr: 'Trotzdem helfe ich dir: الفعل بعد trotzdem مباشرة.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Deshalb ich bleibe zu Hause.',
      correct: 'Deshalb bleibe ich zu Hause.',
      explanationAr: 'بعد deshalb يجب أن يأتي الفعل مباشرة، فالفعل دائماً في المرتبة الثانية.',
    },
    {
      wrong: 'Trotzdem ich bin krank, gehe ich zur Arbeit.',
      correct: 'Ich bin krank. Trotzdem gehe ich zur Arbeit.',
      explanationAr: 'trotzdem تبدأ جملة جديدة وبعدها الفعل مباشرة. (للمعنى نفسه بجملة فرعية نستعمل obwohl في المستوى التالي).',
    },
    {
      wrong: 'Ich habe Hunger. Weil esse ich etwas.',
      correct: 'Ich habe Hunger. Deshalb esse ich etwas.',
      explanationAr: 'weil تقدّم السبب ولا تبدأ جملة النتيجة. للنتيجة نستعمل deshalb.',
    },
  ],
}
