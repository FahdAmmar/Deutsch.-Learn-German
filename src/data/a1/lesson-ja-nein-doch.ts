import type { Lesson } from '@/types'

/**
 * ja, nein, doch: how to answer a yes/no question. The only real difficulty is the negative question
 * ("Hast du keinen Hunger?"), where German says doch (= بلى) to contradict the negation. doch is on the Goethe A1
 * word list with exactly this use, and Arabic speakers have the matching word in «بلى», so the lesson builds on it.
 */
export const lessonJaNeinDoch: Lesson = {
  id: 'a1-m07-l02',
  slug: 'ja-nein-doch',
  level: 'A1',
  moduleId: 'a1-m07',
  title: 'Ja, nein, doch',
  titleAr: 'الإجابة بـ ja وnein وdoch',
  estimatedMinutes: 15,
  objectivesAr: [
    'الإجابة عن سؤال عادي بـ ja أو nein',
    'الإجابة عن سؤال منفي بـ doch عندما تقصد «بلى»',
    'التمييز بين nein وdoch بعد سؤال فيه nicht أو kein',
  ],
  explanation: [
    {
      titleAr: 'سؤال عادي: ja أو nein',
      bodyAr:
        'للسؤال العادي تكفي **Ja** (نعم) أو **Nein** (لا). **Hast du Hunger? Ja, ich habe Hunger.** أو **Nein, ich habe keinen Hunger.** من الأفضل أن تُتبع الكلمة بجملة قصيرة كاملة.',
    },
    {
      titleAr: 'سؤال منفي: doch = بلى',
      bodyAr:
        'إذا كان السؤال منفياً (فيه **nicht** أو **kein**) فنحن نجيب بنعم أو بلا عن **النفي نفسه**. لهذا نقول **Doch** (بلى) حين نقصد عكس النفي: **Hast du keinen Hunger? Doch, ich habe Hunger.** (ألا تجوع؟ بلى، أنا جائع). ولا نقول Ja في هذه الحالة.',
    },
    {
      titleAr: 'متى nein بعد سؤال منفي؟',
      bodyAr:
        'إذا وافقنا على النفي نقول **Nein**: **Hast du keinen Hunger? Nein, ich habe keinen Hunger.** (لا، لست جائعاً). القاعدة السهلة: **doch** ← الجواب فيه إثبات (بلى). **nein** ← الجواب فيه نفي، وبعد nein تأتي الجملة المنفية.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-ja-nein-doch',
      slug: 'ja-nein-doch',
      level: 'A1',
      titleDe: 'Ja, nein, doch',
      titleAr: 'نعم، لا، بلى',
      conceptAr: 'بعد السؤال المنفي نستعمل doch لنقول «بلى»، أمّا ja فتبقى للسؤال غير المنفي.',
      ruleAr:
        'سؤال غير منفي ← ja أو nein. سؤال منفي (nicht / kein) ← doch إن أردتَ الإثبات، وnein إن وافقتَ على النفي. بعد doch لا تأتي جملة منفية.',
      tables: [
        {
          caption: 'السؤال والجواب',
          headers: ['السؤال', 'جواب مثبت', 'جواب منفي'],
          rows: [
            { label: 'سؤال عادي', values: ['Hast du Hunger?', 'Ja, ich habe Hunger.', 'Nein, ich habe keinen Hunger.'] },
            { label: 'سؤال منفي', values: ['Hast du keinen Hunger?', 'Doch, ich habe Hunger.', 'Nein, ich habe keinen Hunger.'] },
            { label: 'سؤال منفي', values: ['Bist du nicht müde?', 'Doch, ich bin müde.', 'Nein, ich bin nicht müde.'] },
          ],
        },
      ],
      examples: [
        { de: 'Hast du keinen Hunger? Doch, ich habe Hunger.', ar: 'ألا تجوع؟ بلى، أنا جائع.' },
        { de: 'Bist du nicht müde? Nein, ich bin nicht müde.', ar: 'ألست متعباً؟ لا، لست متعباً.' },
      ],
    },
  ],
  examples: [
    { de: 'Hast du Hunger? Ja, ich habe Hunger.', ar: 'هل أنت جائع؟ نعم، أنا جائع.' },
    { de: 'Hast du Hunger? Nein, ich habe keinen Hunger.', ar: 'هل أنت جائع؟ لا، لست جائعاً.' },
    { de: 'Hast du keinen Hunger? Doch, ich habe Hunger.', ar: 'ألا تجوع؟ بلى، أنا جائع.' },
    { de: 'Hast du keinen Hunger? Nein, ich habe keinen Hunger.', ar: 'ألا تجوع؟ لا، لست جائعاً.' },
    { de: 'Bist du nicht müde? Doch, ich bin sehr müde.', ar: 'ألست متعباً؟ بلى، أنا متعب جداً.' },
    { de: 'Magst du keinen Fisch? Doch, ich mag Fisch.', ar: 'ألا تحب السمك؟ بلى، أحب السمك.' },
    { de: 'Hast du Zeit? Leider nicht.', ar: 'هل عندك وقت؟ للأسف لا.' },
    { de: 'Kommst du heute? Vielleicht.', ar: 'هل ستأتي اليوم؟ ربما.' },
  ],
  vocabulary: [
    { id: 'voc-jnd-ja', word: 'ja', partOfSpeech: 'interjection', meaningAr: 'نعم', level: 'A1', category: 'Antworten', example: { de: 'Ja, ich komme aus Syrien.', ar: 'نعم، أنا من سوريا.' } },
    { id: 'voc-jnd-nein', word: 'nein', partOfSpeech: 'interjection', meaningAr: 'لا', level: 'A1', category: 'Antworten', example: { de: 'Nein, ich habe keinen Bruder.', ar: 'لا، ليس لي أخ.' } },
    { id: 'voc-jnd-doch', word: 'doch', partOfSpeech: 'interjection', meaningAr: 'بلى (جواب عن سؤال منفي)', level: 'A1', category: 'Antworten', example: { de: 'Bist du nicht müde? Doch, ich bin sehr müde.', ar: 'ألست متعباً؟ بلى، أنا متعب جداً.' } },
    { id: 'voc-jnd-natuerlich', word: 'natürlich', partOfSpeech: 'adverb', meaningAr: 'طبعاً', level: 'A1', category: 'Antworten', example: { de: 'Möchtest du Kaffee? Natürlich!', ar: 'هل تريد قهوة؟ طبعاً!' } },
    { id: 'voc-jnd-vielleicht', word: 'vielleicht', partOfSpeech: 'adverb', meaningAr: 'ربما', level: 'A1', category: 'Antworten', example: { de: 'Vielleicht komme ich morgen.', ar: 'ربما آتي غداً.' } },
    { id: 'voc-jnd-leider', word: 'leider', partOfSpeech: 'adverb', meaningAr: 'للأسف', level: 'A1', category: 'Antworten', example: { de: 'Leider habe ich keine Zeit.', ar: 'للأسف ليس عندي وقت.' } },
  ],
  exercises: [
    {
      id: 'ex-jnd-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الجواب',
      questionDe: 'Hast du keinen Hunger? – ___, ich habe Hunger.',
      options: ['Ja', 'Nein', 'Doch', 'Bitte'],
      correctIndex: 2,
      explanationAr: 'سؤال منفي وأنت جائع ← Doch (بلى).',
    },
    {
      id: 'ex-jnd-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الجواب',
      questionDe: 'Hast du Hunger? – ___, ich habe Hunger.',
      options: ['Ja', 'Doch', 'Nein', 'Leider'],
      correctIndex: 0,
      explanationAr: 'السؤال غير منفي، فنقول Ja. (doch لا تُستعمل هنا).',
    },
    {
      id: 'ex-jnd-3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الجواب',
      questionDe: 'Bist du nicht müde? – ___, ich bin nicht müde.',
      options: ['Doch', 'Nein', 'Ja', 'Natürlich'],
      correctIndex: 1,
      explanationAr: 'أنت توافق على النفي (لست متعباً) ← Nein.',
    },
    {
      id: 'ex-jnd-4',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Auf die Frage „Hast du keinen Hunger?“ sagt man „Ja“, wenn man doch Hunger hat.',
      isTrue: false,
      explanationAr: 'خطأ. في السؤال المنفي نقول Doch (بلى) وليس Ja.',
    },
    {
      id: 'ex-jnd-5',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (بلى)',
      sentenceDe: 'Magst du keinen Fisch? – ___, ich mag Fisch.',
      acceptedAnswers: ['Doch'],
      hint: 'بلى',
      explanationAr: 'سؤال منفي والجواب مثبت ← Doch.',
    },
    {
      id: 'ex-jnd-6',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'ألا تحب القهوة؟ — بلى، أحبها. أيّ جواب صحيح؟',
      questionDe: '',
      options: ['Ja, ich mag Kaffee.', 'Doch, ich mag Kaffee.', 'Nein, ich mag Kaffee.', 'Doch, ich mag keinen Kaffee.'],
      correctIndex: 1,
      explanationAr: 'بلى = Doch ثم جملة مثبتة: Doch, ich mag Kaffee.',
      optionLanguage: 'de',
    },
    {
      id: 'ex-jnd-7',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['habe', 'Doch,', 'Hunger.', 'ich'],
      correctOrder: [1, 3, 0, 2],
      explanationAr: 'Doch, ich habe Hunger. بعد doch جملة مثبتة عادية.',
    },
    {
      id: 'ex-jnd-8',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق كل كلمة بمعناها',
      pairs: [
        { de: 'ja', ar: 'نعم' },
        { de: 'nein', ar: 'لا' },
        { de: 'doch', ar: 'بلى (جواب عن سؤال منفي)' },
        { de: 'vielleicht', ar: 'ربما' },
        { de: 'leider', ar: 'للأسف' },
      ],
      explanationAr: 'doch هي كلمة «بلى» الألمانية، وتُستعمل فقط بعد سؤال منفي.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Hast du keinen Hunger? – Ja, ich habe Hunger.',
      correct: 'Hast du keinen Hunger? – Doch, ich habe Hunger.',
      explanationAr: 'بعد السؤال المنفي نقول Doch للإثبات. Ja تُستعمل بعد سؤال غير منفي.',
    },
    {
      wrong: 'Doch, ich habe keinen Hunger.',
      correct: 'Nein, ich habe keinen Hunger.',
      explanationAr: 'doch تعني «بلى» أي الإثبات، فلا تُتبع بجملة منفية. للنفي نقول Nein.',
    },
  ],
}
