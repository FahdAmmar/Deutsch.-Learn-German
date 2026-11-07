import type { Lesson } from '@/types'

/**
 * Question words. They sit in the first chapter, right after "Sich vorstellen": a learner who can say who
 * they are needs to ask the same things back. Only the verbs the learner has met (heißen, kommen, wohnen,
 * lernen, sein) are used, and nothing that needs numbers, days or the article system.
 */
export const lessonFragewoerter: Lesson = {
  id: 'a1-m01-l06',
  slug: 'fragewoerter',
  level: 'A1',
  moduleId: 'a1-m01',
  title: 'Fragewörter',
  titleAr: 'كلمات الاستفهام: Wer, Was, Wo …',
  estimatedMinutes: 18,
  objectivesAr: [
    'معرفة كلمات الاستفهام الأساسية: Wer؟ Was؟ Wo؟ Woher؟ Wann؟ Wie؟',
    'طرح سؤال W-Frage بالترتيب الصحيح: كلمة الاستفهام ثم الفعل ثم الفاعل',
    'طرح سؤال نعم/لا بوضع الفعل في أول الجملة',
    'التمييز بين Wo (أين) وWoher (من أين) والإجابة عن كل منهما',
  ],
  explanation: [
    {
      titleAr: 'كلمات الاستفهام (die Fragewörter)',
      bodyAr:
        'تبدأ معظم كلمات الاستفهام الألمانية بحرف W، ولذلك تُسمّى W-Fragen. وحرف W في الألمانية يُنطق مثل "ڤ". المهم منها الآن ستّ: **Wer** (من: للأشخاص)، **Was** (ماذا / ما: للأشياء والأفعال)، **Wo** (أين: المكان الثابت)، **Woher** (من أين: أصل الشخص أو الشيء)، **Wann** (متى: الوقت)، **Wie** (كيف / ما: الطريقة والاسم والحال).',
    },
    {
      titleAr: 'ترتيب سؤال W-Frage',
      bodyAr:
        'تأتي كلمة الاستفهام أولاً، ثم الفعل مباشرة في المرتبة الثانية، ثم الفاعل: **Wo** wohnst du؟ **Woher** kommst du؟ **Was** machst du؟ لا نضيف أي كلمة بعد كلمة الاستفهام قبل الفعل. الفعل يبقى في المرتبة الثانية دائماً، كما في الجملة الخبرية.',
    },
    {
      titleAr: 'سؤال نعم / لا (die Ja-Nein-Frage)',
      bodyAr:
        'العربية تبدأ السؤال بـ "هل"، أما الألمانية فليس فيها كلمة تقابلها. نضع **الفعل في أول الجملة** ويرتفع الصوت في آخرها: Wohnst du in Berlin؟ Bist du Student؟ ونجيب بـ **Ja** (نعم) أو **Nein** (لا)، ويُفضَّل أن نتبعها بجملة كاملة: "Ja, ich wohne in Berlin." أو "Nein, ich wohne in Köln."',
    },
    {
      titleAr: 'Wo أم Woher؟',
      bodyAr:
        'في العربية نقول "أين" و"من أين"، وهما في الألمانية كلمتان مختلفتان. **Wo** تسأل عن المكان الحالي: Wo wohnst du؟ — In Berlin. و**Woher** تسأل عن الأصل: Woher kommst du؟ — Aus Syrien. لاحظ أن الجواب يبدأ بحرف جر مختلف: in للمكان الحالي، وaus للأصل.',
    },
    {
      titleAr: 'Wie تعني أكثر من "كيف"',
      bodyAr:
        'في Wie heißt du؟ لا نترجم Wie بـ "كيف" حرفياً، فالمعنى "ما اسمك؟". وفي Wie geht\'s؟ تعني "كيف الحال؟". احفظ الجملتين كما هما: هما من أكثر الأسئلة استعمالاً.',
    },
  ],
  examples: [
    { de: 'Wer ist das?', ar: 'من هذا؟' },
    { de: 'Was machst du?', ar: 'ماذا تفعل؟' },
    { de: 'Ich lerne Deutsch.', ar: 'أنا أتعلّم الألمانية.' },
    { de: 'Wo wohnst du?', ar: 'أين تسكن؟' },
    { de: 'Ich wohne in Berlin.', ar: 'أنا أسكن في برلين.' },
    { de: 'Woher kommst du?', ar: 'من أين أنت؟' },
    { de: 'Ich komme aus Syrien.', ar: 'أنا من سوريا.' },
    { de: 'Wie heißt du?', ar: 'ما اسمك؟' },
    { de: 'Kommst du aus Ägypten?', ar: 'هل أنت من مصر؟' },
    { de: 'Nein, ich komme aus Marokko.', ar: 'لا، أنا من المغرب.' },
  ],
  vocabulary: [
    { id: 'voc-fragewoerter-wer', word: 'Wer?', partOfSpeech: 'phrase', meaningAr: 'من؟ (للأشخاص)', level: 'A1', category: 'Fragewörter', example: { de: 'Wer ist das?', ar: 'من هذا؟' } },
    { id: 'voc-fragewoerter-was', word: 'Was?', partOfSpeech: 'phrase', meaningAr: 'ماذا؟ / ما؟', level: 'A1', category: 'Fragewörter', example: { de: 'Was machst du?', ar: 'ماذا تفعل؟' } },
    { id: 'voc-fragewoerter-wo', word: 'Wo?', partOfSpeech: 'phrase', meaningAr: 'أين؟', level: 'A1', category: 'Fragewörter', example: { de: 'Wo wohnst du?', ar: 'أين تسكن؟' } },
    { id: 'voc-fragewoerter-wann', word: 'Wann?', partOfSpeech: 'phrase', meaningAr: 'متى؟', level: 'A1', category: 'Fragewörter', example: { de: 'Wann kommst du?', ar: 'متى تأتي؟' } },
    { id: 'voc-fragewoerter-wie', word: 'Wie?', partOfSpeech: 'phrase', meaningAr: 'كيف؟ / ما؟', level: 'A1', category: 'Fragewörter', example: { de: 'Wie heißt du?', ar: 'ما اسمك؟' } },
    { id: 'voc-fragewoerter-ja', word: 'ja', partOfSpeech: 'interjection', meaningAr: 'نعم', level: 'A1', category: 'Fragewörter', example: { de: 'Ja, ich komme aus Syrien.', ar: 'نعم، أنا من سوريا.' } },
    { id: 'voc-fragewoerter-nein', word: 'nein', partOfSpeech: 'interjection', meaningAr: 'لا', level: 'A1', category: 'Fragewörter', example: { de: 'Nein, ich wohne in Köln.', ar: 'لا، أنا أسكن في كولن.' } },
    { id: 'voc-fragewoerter-frage', word: 'Frage', article: 'die', plural: 'Fragen', partOfSpeech: 'noun', meaningAr: 'السؤال', level: 'A1', category: 'Fragewörter', example: { de: 'Die Frage ist: Wer ist das?', ar: 'السؤال هو: من هذا؟' } },
    { id: 'voc-fragewoerter-antwort', word: 'Antwort', article: 'die', plural: 'Antworten', partOfSpeech: 'noun', meaningAr: 'الجواب', level: 'A1', category: 'Fragewörter', example: { de: 'Die Antwort ist: Das ist Anna.', ar: 'الجواب: هذه آنا.' } },
    { id: 'voc-fragewoerter-fragen', word: 'fragen', partOfSpeech: 'verb', meaningAr: 'يسأل', level: 'A1', category: 'Fragewörter', verb: { praeteritum: 'fragte', partizip: 'gefragt', auxiliary: 'haben' }, example: { de: 'Ich frage: Wer bist du?', ar: 'أسأل: من أنت؟' } },
  ],
  pronunciationTips: [
    {
      titleAr: 'حرف W يُنطق "ڤ"',
      bodyAr: 'في Wer وWo وWann وWie يُنطق W مثل حرف "ڤ" (أسنان العليا على الشفة السفلى)، وليس مثل "و" العربية. فتُنطق Wie "ڤي" وWo "ڤو".',
      example: 'Wie',
    },
    {
      titleAr: 'نغمة السؤال',
      bodyAr: 'في سؤال W-Frage ينزل الصوت في آخر الجملة، أما في سؤال نعم/لا فيرتفع الصوت في آخرها. جرّب: Wo wohnst du؟ (ينزل) / Wohnst du hier؟ (يرتفع).',
      example: 'Wohnst du hier?',
    },
  ],
  exercises: [
    {
      id: 'ex-fragewoerter-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أي سؤال يناسب هذا الجواب؟',
      questionDe: '„Ich wohne in Berlin.“',
      options: ['Woher kommst du?', 'Wo wohnst du?', 'Wie heißt du?', 'Wer ist das?'],
      correctIndex: 1,
      explanationAr: 'الجواب يذكر المكان الذي يسكنه المتكلم، فالسؤال المناسب هو Wo wohnst du؟ (أين تسكن؟).',
    },
    {
      id: 'ex-fragewoerter-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر كلمة الاستفهام الصحيحة',
      questionDe: '___ kommst du? — Aus Syrien.',
      options: ['Wo', 'Woher', 'Wann', 'Was'],
      correctIndex: 1,
      explanationAr: 'الجواب Aus Syrien يدلّ على الأصل، فنسأل بـ Woher (من أين).',
    },
    {
      id: 'ex-fragewoerter-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل السؤال',
      sentenceDe: '___ heißt du?',
      acceptedAnswers: ['Wie', 'wie'],
      explanationAr: 'للسؤال عن الاسم نقول Wie heißt du؟ (ما اسمك؟).',
    },
    {
      id: 'ex-fragewoerter-4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل السؤال',
      sentenceDe: '___ ist das? — Das ist Anna.',
      acceptedAnswers: ['Wer', 'wer'],
      explanationAr: 'الجواب اسم شخص (Anna)، فنسأل بـ Wer (من).',
    },
    {
      id: 'ex-fragewoerter-5',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات لتكوين سؤال W-Frage',
      words: ['wohnst', 'Wo', 'du'],
      correctOrder: [1, 0, 2],
      roles: ['verb', 'question-word', 'subject'],
      explanationAr: 'الترتيب: كلمة الاستفهام Wo، ثم الفعل wohnst في المرتبة الثانية، ثم الفاعل du.',
    },
    {
      id: 'ex-fragewoerter-6',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات لتكوين سؤال نعم/لا',
      words: ['du', 'Student', 'Bist'],
      correctOrder: [2, 0, 1],
      roles: ['subject', 'other', 'verb'],
      explanationAr: 'في سؤال نعم/لا يأتي الفعل أولاً: Bist du Student؟',
    },
    {
      id: 'ex-fragewoerter-7',
      type: 'true-false',
      level: 'A1',
      promptAr: 'هل هذا السؤال صحيح؟',
      statementDe: 'Wie du heißt?',
      isTrue: false,
      explanationAr: 'الجملة خاطئة. بعد كلمة الاستفهام يأتي الفعل مباشرة: Wie heißt du؟',
    },
    {
      id: 'ex-fragewoerter-8',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق كلمة الاستفهام مع معناها',
      pairs: [
        { de: 'Wer?', ar: 'من؟' },
        { de: 'Was?', ar: 'ماذا؟' },
        { de: 'Wo?', ar: 'أين؟' },
        { de: 'Wann?', ar: 'متى؟' },
        { de: 'Woher?', ar: 'من أين؟' },
      ],
      explanationAr: 'Wo للمكان الحالي، وWoher للأصل، وWer للأشخاص، وWas للأشياء والأفعال، وWann للوقت.',
    },
    {
      id: 'ex-fragewoerter-9',
      type: 'vocab-recall',
      level: 'A1',
      promptAr: 'ما معنى هذه الكلمة؟',
      vocabularyId: 'voc-fragewoerter-frage',
      questionDe: 'die Frage',
      correctAnswerAr: 'السؤال',
      distractorsAr: ['الجواب', 'الاسم', 'البلد'],
      explanationAr: 'die Frage هي السؤال، وdie Antwort هي الجواب. كلتاهما مؤنثة.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Wo kommst du?',
      correct: 'Woher kommst du?',
      explanationAr: 'للسؤال عن الأصل نستخدم Woher (من أين)، أما Wo فللمكان الحالي فقط.',
    },
    {
      wrong: 'Du wohnst in Berlin? (ككلمات مرتّبة كجملة خبرية)',
      correct: 'Wohnst du in Berlin?',
      explanationAr: 'في سؤال نعم/لا نضع الفعل أولاً. الترتيب Du wohnst هو ترتيب الجملة الخبرية.',
    },
    {
      wrong: 'Wie du heißt?',
      correct: 'Wie heißt du?',
      explanationAr: 'بعد كلمة الاستفهام يأتي الفعل مباشرة، ثم الفاعل.',
    },
  ],
}
