import type { Lesson } from '@/types'

/**
 * weil or denn: two words for "because" that Arabic renders with one, and that put the verb in different places.
 * Menschen A2 teaches weil (Nebensatz) and the Goethe A2 word list has denn, so both belong at A2; this lesson
 * puts them side by side and ends with the three families of connectors by word order, which is the map the
 * learner needs for everything in this chapter (und / aber / denn · deshalb / trotzdem · weil / dass / wenn).
 * nämlich is deliberately not taught: the Goethe lists place it at B1.
 */
export const lessonWeilDenn: Lesson = {
  id: 'a2-m20-l03',
  slug: 'weil-denn',
  level: 'A2',
  moduleId: 'a2-m20',
  title: 'weil oder denn?',
  titleAr: 'weil أم denn؟ أين يقف الفعل',
  estimatedMinutes: 25,
  objectivesAr: [
    'إعطاء سبب بـ weil مع الفعل في آخر الجملة',
    'إعطاء السبب نفسه بـ denn مع الفعل في الموضع الثاني',
    'معرفة أنّ denn لا تبدأ الجملة ولا تُستعمل جواباً وحدها عن Warum؟',
    'تصنيف أدوات الربط حسب موضع الفعل: خارج الجملة، أول الجملة، أو الجملة الفرعية',
  ],
  explanation: [
    {
      titleAr: 'weil وdenn: المعنى واحد',
      bodyAr:
        'الكلمتان تعنيان «لأنّ». لكنّ **ترتيب الجملة** بعدهما مختلف: **Ich bleibe zu Hause, weil ich krank bin.** و**Ich bleibe zu Hause, denn ich bin krank.** في الجملتين السبب نفسه (أنا مريض).',
    },
    {
      titleAr: 'weil: الفعل في الآخر',
      bodyAr:
        '**weil** تبدأ جملة فرعية، فينتقل الفعل المصرَّف إلى **آخر** الجملة: **…, weil ich krank bin.** ويمكن أن تبدأ بها الجملة كلها، وحينئذٍ يأتي فعل الجملة الرئيسية مباشرة بعد الفاصلة: **Weil ich krank bin, bleibe ich zu Hause.** وهي الجواب المعتاد عن **Warum؟**: **Warum kommst du nicht? – Weil ich arbeiten muss.**',
    },
    {
      titleAr: 'denn: الفعل ثانياً كالمعتاد',
      bodyAr:
        '**denn** تقف «خارج» الجملة مثل und وaber، فتبقى الجملة بعدها عادية: الفاعل ثم الفعل. **…, denn ich bin krank.** لكنّها **لا تبدأ الجملة** ولا تُستعمل جواباً وحدها: لا نقول ~~Denn ich bin krank, bleibe ich zu Hause~~، ولا ~~Warum kommst du nicht? – Denn ich muss arbeiten~~.',
    },
    {
      titleAr: 'من جملة إلى أخرى',
      bodyAr:
        'للتحويل بين الصيغتين غيّر موضع الفعل فقط: **Ich bin müde, weil ich wenig geschlafen habe.** ← **Ich bin müde, denn ich habe wenig geschlafen.** في الصيغة الأولى الفعل المساعد habe في الآخر، وفي الثانية habe في الموضع الثاني.',
    },
    {
      titleAr: 'denn ليست dann',
      bodyAr:
        'انتبه: **denn** (لأنّ) غير **dann** (ثم / حينئذٍ). **Ich gehe, denn ich bin müde.** أمّا **Ich esse, dann gehe ich.** وبعد dann يأتي الفعل مباشرة.',
    },
    {
      titleAr: 'في الكلام اليومي',
      bodyAr:
        'قد تسمع في الحديث العاميّ **weil** متبوعة بفعل في الموضع الثاني (Ich komme nicht, weil ich habe keine Zeit). هذا شائع في الكلام لكنه لا يُكتب ولا يُقبل في الامتحان؛ استعمل الفعل في الآخر.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-weil-denn',
      slug: 'weil-denn',
      level: 'A2',
      titleDe: 'weil oder denn?',
      titleAr: 'ثلاث عائلات من أدوات الربط',
      conceptAr: 'نصنّف أدوات الربط بموضع الفعل بعدها، فلا نحتاج إلى حفظ كل كلمة على حدة.',
      ruleAr:
        'خارج الجملة (und, oder, aber, denn, sondern): الجملة بعدها عادية. في المكان الأول (deshalb, trotzdem, dann, außerdem): الفعل بعدها مباشرة. أدوات الجملة الفرعية (weil, dass, wenn, ob): الفعل في الآخر.',
      tables: [
        {
          caption: 'weil مقابل denn',
          headers: ['الكلمة', 'مكان الفعل', 'مثال'],
          rows: [
            { label: 'weil', values: ['في الآخر', 'Ich bleibe zu Hause, weil ich krank bin.'] },
            { label: 'denn', values: ['ثانياً', 'Ich bleibe zu Hause, denn ich bin krank.'] },
          ],
        },
        {
          caption: 'ثلاث عائلات حسب موضع الفعل',
          headers: ['العائلة', 'الكلمات', 'الفعل'],
          rows: [
            { label: 'خارج الجملة', values: ['und, oder, aber, denn, sondern', 'ثانياً كالمعتاد'] },
            { label: 'المكان الأول', values: ['deshalb, trotzdem, dann, außerdem', 'مباشرة بعد الكلمة'] },
            { label: 'جملة فرعية', values: ['weil, dass, wenn, ob', 'في آخر الجملة'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich bleibe zu Hause, weil ich krank bin.',
          ar: 'أبقى في البيت لأنني مريض.',
          tokens: [
            { text: 'Ich bleibe zu Hause,', role: 'الجملة الرئيسية' },
            { text: 'weil', role: 'أداة ربط فرعية' },
            { text: 'ich', role: 'فاعل' },
            { text: 'krank', role: 'الخبر' },
            { text: 'bin.', role: 'فعل (في الآخر)' },
          ],
        },
        {
          de: 'Ich bleibe zu Hause, denn ich bin krank.',
          ar: 'أبقى في البيت لأنني مريض.',
          tokens: [
            { text: 'Ich bleibe zu Hause,', role: 'الجملة الرئيسية' },
            { text: 'denn', role: 'أداة ربط (خارج الجملة)' },
            { text: 'ich', role: 'فاعل' },
            { text: 'bin', role: 'فعل (ثانياً)' },
            { text: 'krank.', role: 'الخبر' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Warum lernst du Deutsch? Weil ich in Deutschland arbeiten möchte.', ar: 'لماذا تتعلّم الألمانية؟ لأنني أريد العمل في ألمانيا.' },
    { de: 'Ich bleibe zu Hause, weil ich krank bin.', ar: 'أبقى في البيت لأنني مريض.' },
    { de: 'Ich bleibe zu Hause, denn ich bin krank.', ar: 'أبقى في البيت لأنني مريض.' },
    { de: 'Weil ich müde bin, gehe ich früh schlafen.', ar: 'لأنني متعب، أنام مبكراً.' },
    { de: 'Ich gehe früh schlafen, denn ich bin müde.', ar: 'أنام مبكراً لأنني متعب.' },
    { de: 'Ich bin müde, weil ich wenig geschlafen habe.', ar: 'أنا متعب لأنني نمت قليلاً.' },
    { de: 'Ich bin müde, denn ich habe wenig geschlafen.', ar: 'أنا متعب لأنني نمت قليلاً.' },
    { de: 'Er kommt nicht, weil er arbeiten muss.', ar: 'لا يأتي لأنه مضطر إلى العمل.' },
  ],
  vocabulary: [
    { id: 'voc-wd-weil', word: 'weil', partOfSpeech: 'conjunction', meaningAr: 'لأنّ (الفعل في الآخر)', level: 'A2', category: 'Konnektoren', example: { de: 'Er kommt nicht, weil er arbeiten muss.', ar: 'لا يأتي لأنه مضطر إلى العمل.' } },
    { id: 'voc-wd-denn', word: 'denn', partOfSpeech: 'conjunction', meaningAr: 'لأنّ (الفعل ثانياً)', level: 'A2', category: 'Konnektoren', example: { de: 'Ich gehe früh schlafen, denn ich bin müde.', ar: 'أنام مبكراً لأنني متعب.' } },
    { id: 'voc-wd-warum', word: 'warum', partOfSpeech: 'adverb', meaningAr: 'لماذا؟', level: 'A2', category: 'Konnektoren', example: { de: 'Warum kommst du nicht?', ar: 'لماذا لا تأتي؟' } },
    { id: 'voc-wd-krank', word: 'krank', partOfSpeech: 'adjective', meaningAr: 'مريض', level: 'A2', category: 'Gesundheit', example: { de: 'Ich bleibe zu Hause, denn ich bin krank.', ar: 'أبقى في البيت لأنني مريض.' } },
    { id: 'voc-wd-muede', word: 'müde', partOfSpeech: 'adjective', meaningAr: 'متعب', level: 'A2', category: 'Gesundheit', example: { de: 'Weil ich müde bin, gehe ich früh schlafen.', ar: 'لأنني متعب، أنام مبكراً.' } },
  ],
  exercises: [
    {
      id: 'ex-wd-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر أداة الربط',
      questionDe: 'Ich bleibe zu Hause, ___ ich bin krank.',
      options: ['weil', 'denn', 'dass', 'wenn'],
      correctIndex: 1,
      explanationAr: 'الفعل bin في الموضع الثاني بعد الفاعل ← denn.',
    },
    {
      id: 'ex-wd-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر أداة الربط',
      questionDe: 'Ich bleibe zu Hause, ___ ich krank bin.',
      options: ['weil', 'denn', 'aber', 'oder'],
      correctIndex: 0,
      explanationAr: 'الفعل bin في الآخر ← weil.',
    },
    {
      id: 'ex-wd-3',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بالفعل',
      sentenceDe: 'Ich bleibe zu Hause, weil ich krank ___.',
      acceptedAnswers: ['bin'],
      hint: 'sein ← ich',
      explanationAr: 'بعد weil يذهب الفعل إلى الآخر: weil ich krank bin.',
    },
    {
      id: 'ex-wd-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بالفعل',
      sentenceDe: 'Ich bleibe zu Hause, denn ich ___ krank.',
      acceptedAnswers: ['bin'],
      hint: 'sein ← ich',
      explanationAr: 'بعد denn يبقى الفعل ثانياً: denn ich bin krank.',
    },
    {
      id: 'ex-wd-5',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['muss', 'Peter', 'weil', 'kommt', 'arbeiten', 'nicht,', 'er'],
      correctOrder: [1, 3, 5, 2, 6, 4, 0],
      explanationAr: 'Peter kommt nicht, weil er arbeiten muss. الفعل muss في الآخر بعد weil.',
    },
    {
      id: 'ex-wd-6',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['sie', 'Anna', 'denn', 'früh', 'ist', 'geht', 'schlafen,', 'müde.'],
      correctOrder: [1, 5, 3, 6, 2, 0, 4, 7],
      explanationAr: 'Anna geht früh schlafen, denn sie ist müde. بعد denn: الفاعل sie ثم الفعل ist.',
    },
    {
      id: 'ex-wd-7',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Denn ich bin müde, gehe ich schlafen.“ ist richtig.',
      isTrue: false,
      explanationAr: 'خطأ. denn لا تبدأ الجملة. نقول: Weil ich müde bin, gehe ich schlafen.',
    },
    {
      id: 'ex-wd-8',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الجواب الصحيح عن Warum؟',
      questionDe: 'Warum kommst du nicht?',
      options: ['Weil ich arbeiten muss.', 'Denn ich muss arbeiten.', 'Weil muss ich arbeiten.', 'Denn muss ich arbeiten.'],
      correctIndex: 0,
      explanationAr: 'الجواب القصير عن Warum؟ يبدأ بـ Weil والفعل في الآخر. denn لا تُستعمل جواباً وحدها.',
      optionLanguage: 'de',
    },
    {
      id: 'ex-wd-9',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'حوّل الجملة إلى weil: Ich bin müde, denn ich habe wenig geschlafen.',
      questionDe: '',
      options: [
        'Ich bin müde, weil ich wenig geschlafen habe.',
        'Ich bin müde, weil ich habe wenig geschlafen.',
        'Ich bin müde, weil habe ich wenig geschlafen.',
        'Ich bin müde, denn ich wenig geschlafen habe.',
      ],
      correctIndex: 0,
      explanationAr: 'بعد weil يذهب الفعل المصرَّف habe إلى آخر الجملة: …, weil ich wenig geschlafen habe.',
      optionLanguage: 'de',
    },
    {
      id: 'ex-wd-10',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق كل كلمة بموضع الفعل',
      pairs: [
        { de: 'weil', ar: 'الفعل في آخر الجملة' },
        { de: 'denn', ar: 'الفعل ثانياً، ولا تبدأ الجملة' },
        { de: 'deshalb', ar: 'النتيجة، والفعل بعدها مباشرة' },
        { de: 'dann', ar: 'ثم، والفعل بعدها مباشرة' },
      ],
      explanationAr: 'ثلاث عائلات: خارج الجملة (denn)، المكان الأول (deshalb وdann)، جملة فرعية (weil).',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich bleibe zu Hause, weil ich bin krank.',
      correct: 'Ich bleibe zu Hause, weil ich krank bin.',
      explanationAr: 'weil تبدأ جملة فرعية: الفعل bin يذهب إلى الآخر. (مع denn يبقى ثانياً: denn ich bin krank).',
    },
    {
      wrong: 'Denn ich bin krank, bleibe ich zu Hause.',
      correct: 'Weil ich krank bin, bleibe ich zu Hause.',
      explanationAr: 'denn لا تبدأ الجملة أبداً. للبدء بالسبب استعمل weil.',
    },
    {
      wrong: 'Warum kommst du nicht? – Denn ich muss arbeiten.',
      correct: 'Warum kommst du nicht? – Weil ich arbeiten muss.',
      explanationAr: 'الجواب عن Warum؟ يكون بـ Weil، وليس بـ denn.',
    },
  ],
}
