import type { Lesson } from '@/types'

/**
 * nicht müssen versus nicht dürfen. The Modalverben lesson teaches every modal in one go; this short lesson
 * isolates the pair an Arabic speaker most often mixes up, because Arabic "لا يجب" can mean both
 * "not necessary" and "forbidden". It reuses only the verbs of that lesson.
 */
export const lessonMuessenDuerfen: Lesson = {
  id: 'a1-m06-l02',
  slug: 'nicht-muessen-nicht-duerfen',
  level: 'A1',
  moduleId: 'a1-m06',
  title: 'nicht müssen oder nicht dürfen?',
  titleAr: 'الفرق بين nicht müssen وnicht dürfen',
  estimatedMinutes: 15,
  objectivesAr: [
    'التمييز بين "ليس لازماً" (nicht müssen) و"ممنوع" (nicht dürfen)',
    'فهم لافتات المنع والسماح: verboten وerlaubt',
    'الإجابة على أسئلة Muss ich …؟ وDarf ich …؟ إجابة صحيحة',
  ],
  explanation: [
    {
      titleAr: 'المشكلة: "لا يجب" بمعنيين',
      bodyAr:
        'بالعربية قد تعني "لا يجب أن تأتي" شيئين مختلفين: **ليس لازماً أن تأتي** (يمكنك أن تأتي أو لا)، أو **ممنوع أن تأتي**. الألمانية تفصل بينهما بفعلين مختلفين، وخلطهما يغيّر المعنى تماماً.',
    },
    {
      titleAr: 'nicht müssen = ليس لازماً',
      bodyAr:
        '**Du musst nicht kommen.** = ليس عليك أن تأتي (الأمر اختياري، لا أحد يطلب منك). نستعملها عندما لا يوجد إلزام: **Morgen ist Sonntag. Ich muss nicht arbeiten.** و**Der Eintritt ist kostenlos. Sie müssen nicht bezahlen.**',
    },
    {
      titleAr: 'nicht dürfen = ممنوع',
      bodyAr:
        '**Du darfst nicht kommen.** = ممنوع عليك أن تأتي (هناك قاعدة أو أمر يمنعك). نستعملها للمنع: **Hier darf man nicht rauchen.** و**Im Museum darfst du nicht fotografieren.**',
    },
    {
      titleAr: 'جدول سريع',
      bodyAr:
        '**Ich muss** = أنا مضطر (واجب). **Ich muss nicht** = لست مضطراً (اختياري). **Ich darf** = مسموح لي. **Ich darf nicht** = ممنوع عليّ. تذكّر: nicht **müssen** ليست عكس müssen بمعنى "ممنوع"؛ عكس "مسموح" هو nicht dürfen.',
    },
    {
      titleAr: 'الأسئلة والأجوبة',
      bodyAr:
        '**Muss ich bezahlen؟** — **Nein, Sie müssen nicht.** (لا، ليس عليك) أو **Ja, Sie müssen.** **Darf ich hier parken؟** — **Nein, das dürfen Sie nicht.** (لا، ممنوع) أو **Ja, das dürfen Sie.** وعلى اللافتات تجد **verboten** (ممنوع) و**erlaubt** (مسموح): Rauchen verboten.',
    },
  ],
  examples: [
    { de: 'Du musst nicht kommen.', ar: 'ليس عليك أن تأتي.' },
    { de: 'Du darfst nicht kommen.', ar: 'ممنوع عليك أن تأتي.' },
    { de: 'Am Sonntag muss ich nicht arbeiten.', ar: 'يوم الأحد لست مضطراً للعمل.' },
    { de: 'Im Museum darf man nicht fotografieren.', ar: 'في المتحف ممنوع التصوير.' },
    { de: 'Der Eintritt ist kostenlos. Sie müssen nicht bezahlen.', ar: 'الدخول مجاني. ليس عليكم أن تدفعوا.' },
    { de: 'Hier darf man nicht parken.', ar: 'ممنوع الوقوف هنا.' },
    { de: 'Muss ich heute warten? — Nein, Sie müssen nicht warten.', ar: 'هل عليّ أن أنتظر اليوم؟ — لا، ليس عليك أن تنتظر.' },
    { de: 'Darf ich hier rauchen? — Nein, das dürfen Sie nicht.', ar: 'هل يمكنني التدخين هنا؟ — لا، هذا ممنوع.' },
  ],
  vocabulary: [
    { id: 'voc-muessen-verboten', word: 'verboten', partOfSpeech: 'adjective', meaningAr: 'ممنوع', level: 'A1', category: 'Erlaubt und verboten', example: { de: 'Rauchen ist hier verboten.', ar: 'التدخين ممنوع هنا.' } },
    { id: 'voc-muessen-erlaubt', word: 'erlaubt', partOfSpeech: 'adjective', meaningAr: 'مسموح', level: 'A1', category: 'Erlaubt und verboten', example: { de: 'Fotografieren ist im Park erlaubt.', ar: 'التصوير مسموح في الحديقة.' } },
    { id: 'voc-muessen-kostenlos', word: 'kostenlos', partOfSpeech: 'adjective', meaningAr: 'مجاني', level: 'A1', category: 'Erlaubt und verboten', example: { de: 'Der Kaffee ist kostenlos.', ar: 'القهوة مجانية.' } },
    { id: 'voc-muessen-museum', word: 'Museum', article: 'das', plural: 'Museen', partOfSpeech: 'noun', meaningAr: 'المتحف', level: 'A1', category: 'Erlaubt und verboten', example: { de: 'Das Museum ist am Montag geschlossen.', ar: 'المتحف مغلق يوم الاثنين.' } },
    { id: 'voc-muessen-schild', word: 'Schild', article: 'das', plural: 'Schilder', partOfSpeech: 'noun', meaningAr: 'اللافتة', level: 'A1', category: 'Erlaubt und verboten', example: { de: 'Auf dem Schild steht: Parken verboten.', ar: 'على اللافتة مكتوب: الوقوف ممنوع.' } },
    { id: 'voc-muessen-eintritt', word: 'Eintritt', article: 'der', numberUse: 'none', partOfSpeech: 'noun', meaningAr: 'سعر الدخول', level: 'A1', category: 'Erlaubt und verboten', example: { de: 'Der Eintritt kostet acht Euro.', ar: 'الدخول يكلّف ثمانية يورو.' } },
    { id: 'voc-muessen-fotografieren', word: 'fotografieren', partOfSpeech: 'verb', meaningAr: 'يصوّر', level: 'A1', category: 'Erlaubt und verboten', verb: { praeteritum: 'fotografierte', partizip: 'fotografiert', auxiliary: 'haben' }, example: { de: 'Hier darf man nicht fotografieren.', ar: 'هنا ممنوع التصوير.' } },
    { id: 'voc-muessen-parken', word: 'parken', partOfSpeech: 'verb', meaningAr: 'يركن (السيارة)', level: 'A1', category: 'Erlaubt und verboten', verb: { praeteritum: 'parkte', partizip: 'geparkt', auxiliary: 'haben' }, example: { de: 'Hier darf man nicht parken.', ar: 'ممنوع الوقوف هنا.' } },
    { id: 'voc-muessen-warten', word: 'warten', partOfSpeech: 'verb', meaningAr: 'ينتظر', level: 'A1', category: 'Erlaubt und verboten', verb: { praeteritum: 'wartete', partizip: 'gewartet', auxiliary: 'haben' }, example: { de: 'Sie müssen nicht warten.', ar: 'ليس عليكم أن تنتظروا.' } },
  ],
  exercises: [
    {
      id: 'ex-muessen-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'في المتحف التصوير ممنوع. ما الجملة الصحيحة؟',
      questionDe: '',
      options: ['Man muss nicht fotografieren.', 'Man darf nicht fotografieren.', 'Man muss fotografieren.', 'Man darf fotografieren.'],
      correctIndex: 1,
      explanationAr: 'المنع = nicht dürfen: Man darf nicht fotografieren.',
    },
    {
      id: 'ex-muessen-2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'الدخول مجاني. أكمل بالفعل المناسب',
      sentenceDe: 'Der Eintritt ist kostenlos. Sie ___ nicht bezahlen.',
      acceptedAnswers: ['müssen'],
      hint: 'ليس لازماً',
      explanationAr: 'ليس لازماً أن يدفعوا، فنقول Sie müssen nicht bezahlen.',
    },
    {
      id: 'ex-muessen-3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Du musst nicht kommen“ bedeutet: Es ist verboten, zu kommen.',
      isTrue: false,
      explanationAr: 'خطأ. معناها: ليس لازماً أن تأتي. أما المنع فهو Du darfst nicht kommen.',
    },
    {
      id: 'ex-muessen-4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بالفعل المناسب',
      sentenceDe: 'Hier ___ man nicht rauchen. Es ist verboten.',
      acceptedAnswers: ['darf'],
      hint: 'ممنوع',
      explanationAr: 'المنع = darf nicht: Hier darf man nicht rauchen.',
    },
    {
      id: 'ex-muessen-5',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'ما معنى Ich muss nicht arbeiten؟',
      questionDe: '',
      options: ['لست مضطراً للعمل', 'ممنوع أن أعمل', 'يجب أن أعمل', 'أريد أن أعمل'],
      correctIndex: 0,
      optionLanguage: 'ar',
      explanationAr: 'muss nicht = ليس لازماً. أما ممنوع فهي darf nicht.',
    },
    {
      id: 'ex-muessen-6',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق كل جملة بمعناها',
      pairs: [
        { de: 'Du musst.', ar: 'لازم عليك' },
        { de: 'Du musst nicht.', ar: 'ليس لازماً' },
        { de: 'Du darfst.', ar: 'مسموح لك' },
        { de: 'Du darfst nicht.', ar: 'ممنوع عليك' },
      ],
      explanationAr: 'müssen لـ "لازم" وnicht müssen لـ "ليس لازماً"، وdürfen لـ "مسموح" وnicht dürfen لـ "ممنوع".',
    },
    {
      id: 'ex-muessen-7',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['nicht', 'man', 'Hier', 'parken', 'darf'],
      correctOrder: [2, 4, 1, 0, 3],
      explanationAr: 'Hier darf man nicht parken. الفعل darf في المرتبة الثانية، وparken في آخر الجملة.',
    },
    {
      id: 'ex-muessen-8',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'ليس عليك أن تنتظر.',
      acceptedAnswers: ['Du musst nicht warten.', 'Sie müssen nicht warten.', 'Ihr müsst nicht warten.'],
      explanationAr: 'ليس لازماً = nicht müssen: Du musst nicht warten.',
    },
    {
      id: 'ex-muessen-9',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'ممنوع التدخين هنا.',
      acceptedAnswers: ['Hier darf man nicht rauchen.', 'Hier darfst du nicht rauchen.', 'Hier dürfen Sie nicht rauchen.'],
      explanationAr: 'المنع = nicht dürfen: Hier darf man nicht rauchen.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Hier musst du nicht rauchen. (بمعنى: ممنوع التدخين)',
      correct: 'Hier darfst du nicht rauchen.',
      explanationAr: 'للمنع نستعمل nicht dürfen. أما musst nicht فمعناها: ليس مطلوباً منك أن تدخّن.',
    },
    {
      wrong: 'Du darfst nicht warten. (بمعنى: ليس عليك أن تنتظر)',
      correct: 'Du musst nicht warten.',
      explanationAr: 'darfst nicht معناها ممنوع عليك الانتظار. وإذا لم يكن الانتظار لازماً نقول musst nicht.',
    },
  ],
}
