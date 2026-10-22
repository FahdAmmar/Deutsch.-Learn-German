import type { Lesson, Module } from '@/types'

export const lessonIndirekteFragen: Lesson = {
  id: 'a2-m09-l01',
  slug: 'indirekte-fragen',
  level: 'A2',
  moduleId: 'a2-m09',
  title: 'Indirekte Fragen',
  titleAr: 'الأسئلة غير المباشرة',
  estimatedMinutes: 28,
  objectivesAr: [
    'تحويل السؤال المباشر إلى سؤال غير مباشر مضمَّن داخل جملة أخرى',
    'استخدام ob لتضمين أسئلة نعم/لا',
    'استخدام أدوات الاستفهام (was، wo، wann، warum...) مباشرة كأداة ربط في السؤال المضمَّن',
    'استخدام الأسئلة غير المباشرة لزيادة التهذيب عند مخاطبة الغرباء',
  ],
  explanation: [
    {
      titleAr: 'من سؤال مستقل إلى جملة ثانوية',
      bodyAr:
        'السؤال غير المباشر هو سؤال أصلي يُضمَّن داخل جملة أخرى مثل "Ich weiß nicht..." أو "Können Sie mir sagen...؟". بما أنه يصبح جملة ثانوية، تنطبق عليه نفس قاعدة الفعل في النهاية التي رأيتها مع weil وdass والجمل الموصولة: "Wo wohnst du؟" (سؤال مباشر، الفعل ثانٍ) يصبح "Ich weiß nicht, wo du wohnst" (سؤال غير مباشر، الفعل في النهاية).',
    },
    {
      titleAr: 'ob لأسئلة نعم/لا، وأداة الاستفهام نفسها للأسئلة الأخرى',
      bodyAr:
        'إن كان السؤال المباشر الأصلي بلا أداة استفهام (يُجاب بنعم أو لا)، استخدم ob لتضمينه: "Hast du Zeit؟" → "Ich weiß nicht, ob du Zeit hast". أما إن كان السؤال يحتوي أداة استفهام أصلاً (was، wo، wann، warum، wie...)، فتُستخدَم الأداة نفسها كأداة ربط مباشرة بلا حاجة لـ ob: "Wann kommst du؟" → "Ich weiß nicht, wann du kommst".',
    },
    {
      titleAr: 'أداة تهذيب مع الغرباء',
      bodyAr:
        'الأسئلة غير المباشرة أكثر تهذيباً من السؤال المباشر، وتُستخدَم كثيراً عند مخاطبة الغرباء أو في المواقف الرسمية: "Können Sie mir sagen, wo der Bahnhof ist؟" (هل يمكنكم إخباري أين المحطة؟) أكثر تهذيباً من السؤال المباشر الفجّ "Wo ist der Bahnhof؟".',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-indirekte-fragen',
      slug: 'indirekte-fragen-bildung',
      level: 'A2',
      titleDe: 'Indirekte Fragen: ob und W-Wörter',
      titleAr: 'الأسئلة غير المباشرة: ob وأدوات الاستفهام',
      conceptAr: 'سؤال مباشر يتحوّل إلى جملة ثانوية بالفعل في النهاية، باستخدام ob أو أداة الاستفهام الأصلية كأداة ربط.',
      ruleAr:
        'لأسئلة نعم/لا استخدم ob. لأسئلة الاستفهام (W-Fragen) استخدم أداة الاستفهام نفسها بلا تغيير. في الحالتين، انقل الفعل المصرَّف إلى نهاية الجملة الثانوية تماماً، وافصلها بفاصلة عن الجملة الرئيسية.',
      tables: [
        {
          caption: 'من سؤال مباشر إلى سؤال غير مباشر',
          headers: ['السؤال المباشر', 'السؤال غير المباشر'],
          rows: [
            { label: 'Hast du Zeit؟', values: ['..., ob du Zeit hast.'] },
            { label: 'Wo wohnst du؟', values: ['..., wo du wohnst.'] },
            { label: 'Wann kommt der Bus؟', values: ['..., wann der Bus kommt.'] },
            { label: 'Warum lachst du؟', values: ['..., warum du lachst.'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich weiß nicht, ob du Zeit hast.',
          ar: 'لا أعرف هل لديك وقت. (ob لسؤال نعم/لا)',
          tokens: [
            { text: 'Ich weiß nicht,', role: 'الجملة الرئيسية' },
            { text: 'ob', role: 'أداة ربط (نعم/لا)' },
            { text: 'du Zeit', role: 'فاعل + مفعول به' },
            { text: 'hast.', role: 'الفعل في النهاية' },
          ],
        },
        {
          de: 'Können Sie mir sagen, wo der Bahnhof ist?',
          ar: 'هل يمكنكم إخباري أين المحطة؟ (أداة استفهام مباشرة، أكثر تهذيباً)',
          tokens: [
            { text: 'Können Sie mir sagen,', role: 'الجملة الرئيسية (سؤال مهذّب)' },
            { text: 'wo', role: 'أداة الاستفهام كأداة ربط' },
            { text: 'der Bahnhof', role: 'الفاعل' },
            { text: 'ist?', role: 'الفعل في النهاية' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Ich frage mich, warum er nicht geantwortet hat.', ar: 'أتساءل لماذا لم يجب.' },
    { de: 'Wissen Sie, wie viel das kostet?', ar: 'هل تعرفون كم يكلّف هذا؟' },
    { de: 'Er hat mich gefragt, ob ich Deutsch spreche.', ar: 'سألني هل أتحدّث الألمانية.' },
    { de: 'Können Sie mir sagen, wann der Zug abfährt?', ar: 'هل يمكنكم إخباري متى يغادر القطار؟' },
  ],
  vocabulary: [
    { id: 'voc-indirekt-ob', word: 'ob', partOfSpeech: 'conjunction', meaningAr: 'هل (غير مباشر)', level: 'A2', category: 'أدوات ربط ثانوية', example: { de: 'Ich frage ihn, ob er Zeit hat.', ar: 'أسأله هل عنده وقت.' } },
    { id: 'voc-indirekt-sich-fragen', word: 'sich fragen', partOfSpeech: 'verb', meaningAr: 'يتساءل', level: 'A2', category: 'أفعال تقديم السؤال', verb: { praeteritum: 'fragte', partizip: 'gefragt', auxiliary: 'haben' }, example: { de: 'Ich frage mich, wo er ist.', ar: 'أتساءل أين هو.' } },
    { id: 'voc-indirekt-wissen', word: 'wissen', partOfSpeech: 'verb', meaningAr: 'يعرف', level: 'A2', category: 'أفعال تقديم السؤال', verb: { present: ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'], praeteritum: 'wusste', partizip: 'gewusst', auxiliary: 'haben' }, example: { de: 'Ich weiß nicht, wo er wohnt.', ar: 'لا أعرف أين يسكن.' } },
    { id: 'voc-indirekt-sagen', word: 'sagen', partOfSpeech: 'verb', meaningAr: 'يقول', level: 'A2', category: 'أفعال تقديم السؤال', verb: { praeteritum: 'sagte', partizip: 'gesagt', auxiliary: 'haben' }, example: { de: 'Kannst du mir sagen, wie spät es ist?', ar: 'هل تستطيع أن تخبرني كم الساعة؟' } },
  ],
  dialogues: [
    {
      id: 'dialogue-indirekt-informell',
      level: 'A2',
      moduleId: 'a2-m09',
      lessonId: 'a2-m09-l01',
      titleDe: 'Ein Treffen abstimmen',
      titleAr: 'تنسيق لقاء',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Mara', de: 'Weißt du, ob Jonas heute kommt?', ar: 'هل تعرف هل يوناس سيأتي اليوم؟' },
        { speaker: 'b', name: 'Elias', de: 'Ich weiß nicht, ob er Zeit hat.', ar: 'لا أعرف هل لديه وقت.' },
        { speaker: 'a', name: 'Mara', de: 'Kannst du ihn fragen, wann er ankommt?', ar: 'هل يمكنك سؤاله متى سيصل؟' },
        { speaker: 'b', name: 'Elias', de: 'Klar, ich frage ihn, ob er sich meldet.', ar: 'بالتأكيد، سأسأله هل سيتواصل.' },
      ],
    },
    {
      id: 'dialogue-indirekt-formell',
      level: 'A2',
      moduleId: 'a2-m09',
      lessonId: 'a2-m09-l01',
      titleDe: 'Auskunft am Bahnhof',
      titleAr: 'الاستعلام في محطة القطار',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Reisende', de: 'Können Sie mir sagen, wann der nächste Zug fährt?', ar: 'هل يمكنكم إخباري متى يغادر القطار التالي؟' },
        { speaker: 'b', name: 'Beamter', de: 'Er fährt in zehn Minuten von Gleis drei.', ar: 'يغادر خلال عشر دقائق من الرصيف الثالث.' },
        { speaker: 'a', name: 'Reisende', de: 'Wissen Sie auch, ob er Verspätung hat?', ar: 'هل تعرفون أيضاً هل عليه تأخير؟' },
        { speaker: 'b', name: 'Beamter', de: 'Nein, er fährt pünktlich ab.', ar: 'لا، سيغادر في موعده.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'ob كلمة قصيرة بلا نبرة قوية', bodyAr: 'ob لا تحمل نبرة قوية، فتُنطق بسرعة قبل بقية الجملة الثانوية.', example: 'ob' },
    { titleAr: 'النبرة السؤالية تبقى في السؤال المهذّب', bodyAr: 'حتى مع الفعل في النهاية، ترتفع نبرة الجملة قليلاً في آخرها لتدلّ على طابعها الاستفهامي.', example: 'ob du Zeit hast' },
  ],
  exercises: [
    {
      id: 'ex-indirekt-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'حوّل: "Hast du Zeit؟" إلى سؤال غير مباشر',
      questionDe: 'Ich weiß nicht, ___.',
      options: ['ob du Zeit hast', 'dass du Zeit hast', 'wenn du Zeit hast', 'du hast Zeit'],
      correctIndex: 0,
      explanationAr: 'السؤال الأصلي بلا أداة استفهام (نعم/لا)، فيُضمَّن بـ ob.',
    },
    {
      id: 'ex-indirekt-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'حوّل: "Wo wohnst du؟" إلى سؤال غير مباشر',
      questionDe: 'Ich weiß nicht, ___.',
      options: ['wo du wohnst', 'ob du wohnst', 'wo wohnst du', 'dass du wohnst'],
      correctIndex: 0,
      explanationAr: 'السؤال يحتوي أداة استفهام wo، فتُستخدَم مباشرة مع نقل الفعل للنهاية.',
    },
    {
      id: 'ex-indirekt-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأكثر تهذيباً للسؤال عن المحطة',
      questionDe: '___',
      options: [
        'Können Sie mir sagen, wo der Bahnhof ist?',
        'Wo ist der Bahnhof?',
        'Sagen Sie mir wo ist der Bahnhof?',
        'Der Bahnhof wo ist?',
      ],
      correctIndex: 0,
      explanationAr: 'صيغة السؤال غير المباشر المضمَّن داخل "Können Sie mir sagen...؟" هي الأكثر تهذيباً.',
    },
    {
      id: 'ex-indirekt-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل: Ich frage mich, ____ er nicht geantwortet hat. (لماذا)',
      sentenceDe: 'Ich frage mich, ____ er nicht geantwortet hat.',
      acceptedAnswers: ['warum'],
      hint: 'أداة استفهام عن السبب',
      explanationAr: 'warum تُستخدَم مباشرة كأداة ربط في السؤال غير المباشر.',
    },
    {
      id: 'ex-indirekt-5',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Bei indirekten Fragen mit "ob" steht das Verb am Ende.',
      isTrue: true,
      explanationAr: 'صحيح — السؤال غير المباشر جملة ثانوية، فينطبق عليه قاعدة الفعل في النهاية.',
    },
    {
      id: 'ex-indirekt-6',
      type: 'matching',
      level: 'A2',
      promptAr: 'صل كل سؤال مباشر بصيغته غير المباشرة الصحيحة',
      pairs: [
        { de: 'Hast du Zeit?', ar: 'ob du Zeit hast' },
        { de: 'Wann kommst du?', ar: 'wann du kommst' },
        { de: 'Wo ist er?', ar: 'wo er ist' },
        { de: 'Sprichst du Deutsch?', ar: 'ob du Deutsch sprichst' },
      ],
      explanationAr: 'الأسئلة بأداة استفهام تستخدم الأداة نفسها، والأسئلة بلا أداة (نعم/لا) تستخدم ob.',
    },
    {
      id: 'ex-indirekt-7',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Können', 'Sie', 'mir', 'sagen,', 'wann', 'der', 'Zug', 'abfährt?'],
      correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
      explanationAr: 'الترتيب الصحيح: "Können Sie mir sagen, wann der Zug abfährt؟" — الفعل abfährt في نهاية السؤال المضمَّن.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich weiß nicht, wo wohnst du?',
      correct: 'Ich weiß nicht, wo du wohnst.',
      explanationAr: 'السؤال غير المباشر جملة ثانوية، فيجب نقل الفعل إلى النهاية، وليس إبقاءه في الموضع الثاني كسؤال مباشر.',
    },
    {
      wrong: 'Ich weiß nicht, dass du Zeit hast.',
      correct: 'Ich weiß nicht, ob du Zeit hast.',
      explanationAr: 'dass تعني "أنّ" (حقيقة مؤكَّدة)، بينما ob تعني "هل" (سؤال/عدم يقين) — المعنيان مختلفان تماماً.',
    },
    {
      wrong: 'Können Sie mir sagen wo ist der Bahnhof?',
      correct: 'Können Sie mir sagen, wo der Bahnhof ist?',
      explanationAr: 'يجب وضع فاصلة قبل السؤال المضمَّن، ونقل الفعل ist إلى نهايته.',
    },
    {
      wrong: 'Ich frage mich ob kommt er.',
      correct: 'Ich frage mich, ob er kommt.',
      explanationAr: 'بعد ob يأتي الفاعل مباشرة، والفعل المصرَّف في نهاية الجملة تماماً.',
    },
  ],
}

export const module09IndirekteFragen: Module = {
  id: 'a2-m09',
  slug: 'indirekte-fragen',
  level: 'A2',
  title: 'Indirekte Fragen',
  titleAr: 'الأسئلة غير المباشرة',
  order: 9,
  lessons: [lessonIndirekteFragen],
}
