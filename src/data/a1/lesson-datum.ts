import type { Lesson } from '@/types'

/**
 * The date. It follows "Wochentage und Monate" (the learner already says am Montag and im Mai) and comes before the
 * clock, so a learner can answer "Wann hast du Geburtstag?" with a day and a month. The ordinal numbers 1–31 are
 * the whole point: they are the one part of numbers the Zahlen lesson leaves out.
 */
export const lessonDatum: Lesson = {
  id: 'a1-m02-l06',
  slug: 'datum',
  level: 'A1',
  moduleId: 'a1-m02',
  title: 'Datum und Ordnungszahlen',
  titleAr: 'التاريخ والأعداد الترتيبية',
  estimatedMinutes: 18,
  taglineAr:
    'كيف تقول تاريخاً كاملاً: الأعداد الترتيبية، والسؤال عن التاريخ، وكتابته وقراءته.',
  heroExample: { de: 'Heute ist der dritte Mai.', ar: 'اليوم هو الثالث من مايو.' },
  objectivesAr: [
    'تكوين الأعداد الترتيبية من 1 إلى 31 (der erste، der zweite، der dritte …)',
    'السؤال عن التاريخ والإجابة: Der Wievielte ist heute? — Heute ist der dritte Mai.',
    'قول موعد حدث بالتاريخ بعد am: am dritten Mai',
    'كتابة التاريخ الألماني (اليوم قبل الشهر) وقراءته',
  ],
  explanation: [
    {
      icon: 'calendar',
      kickerDe: 'Die Ordinalzahlen',
      tone: 'accent',
      titleAr: 'الأعداد الترتيبية (die Ordinalzahlen)',
      bodyAr:
        'نستخدم الترتيبي للتاريخ: «الثالث من مايو». من 1 إلى 19 نضيف **-te** إلى العدد، ومن 20 فما فوق نضيف **-ste**. وأربعة أعداد تخرج عن القاعدة فقط. وفي الكتابة نضع نقطة بعد الرقم: 3. تُقرأ [[dritte]].',
      blocks: [
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'من 1 إلى 19',
              subAr: 'العدد + te',
              formula: 'vier + te',
              tone: 'accent',
              items: [
                { de: 'vierte', ar: 'الرابع' },
                { de: 'zwölfte', ar: 'الثاني عشر' },
                { de: 'neunzehnte', ar: 'التاسع عشر' },
              ],
            },
            {
              titleAr: 'من 20 فما فوق',
              subAr: 'العدد + ste',
              formula: 'zwanzig + ste',
              tone: 'highlight',
              items: [
                { de: 'zwanzigste', ar: 'العشرون' },
                { de: 'einunddreißigste', ar: 'الحادي والثلاثون' },
              ],
            },
            {
              titleAr: 'أربعة استثناءات',
              subAr: 'تُحفظ كما هي',
              tone: 'error',
              items: [
                { de: 'erste', ar: 'الأول' },
                { de: 'dritte', ar: 'الثالث' },
                { de: 'siebte', ar: 'السابع (نحذف en من sieben)' },
                { de: 'achte', ar: 'الثامن (t واحدة)' },
              ],
            },
          ],
        },
        {
          kind: 'tileGrid',
          columns: 4,
          items: [
            { mark: '1.', de: 'erste', ar: 'الأول', tone: 'plum' },
            { mark: '2.', de: 'zweite', ar: 'الثاني' },
            { mark: '3.', de: 'dritte', ar: 'الثالث', tone: 'plum' },
            { mark: '4.', de: 'vierte', ar: 'الرابع' },
            { mark: '5.', de: 'fünfte', ar: 'الخامس' },
            { mark: '6.', de: 'sechste', ar: 'السادس' },
            { mark: '7.', de: 'siebte', ar: 'السابع', tone: 'plum' },
            { mark: '8.', de: 'achte', ar: 'الثامن', tone: 'plum' },
            { mark: '9.', de: 'neunte', ar: 'التاسع' },
            { mark: '10.', de: 'zehnte', ar: 'العاشر' },
            { mark: '11.', de: 'elfte', ar: 'الحادي عشر' },
            { mark: '12.', de: 'zwölfte', ar: 'الثاني عشر' },
            { mark: '20.', de: 'zwanzigste', ar: 'العشرون', tone: 'highlight' },
            { mark: '21.', de: 'einundzwanzigste', ar: 'الحادي والعشرون', tone: 'highlight' },
            { mark: '30.', de: 'dreißigste', ar: 'الثلاثون', tone: 'highlight' },
            { mark: '31.', de: 'einunddreißigste', ar: 'الحادي والثلاثون', tone: 'highlight' },
          ],
        },
      ],
    },
    {
      icon: 'calendar',
      kickerDe: 'Das Datum',
      tone: 'primary',
      titleAr: 'السؤال عن التاريخ',
      bodyAr:
        'نسأل [[Der Wievielte ist heute?]] (السؤال يطلب الرقم الترتيبي لليوم) أو [[Welches Datum haben wir heute?]] ونجيب بالترتيب نفسه دائماً: [[der]] + الترتيبي + اسم الشهر بحرف كبير.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Heute ist', tone: 'primary' },
            { text: 'der', tone: 'accent', noteAr: 'ثابتة' },
            { text: 'dritte', tone: 'plum', noteAr: 'الترتيبي' },
            { text: 'Mai', tone: 'highlight', noteAr: 'الشهر' },
          ],
        },
        {
          kind: 'examples',
          columns: 2,
          items: [
            { de: 'Der Wievielte ist heute?', ar: 'ما تاريخ اليوم؟', badge: 'سؤال' },
            { de: 'Heute ist der dritte Mai.', ar: 'اليوم هو الثالث من مايو.', badge: 'جواب' },
          ],
        },
      ],
    },
    {
      icon: 'calendar',
      kickerDe: 'am + -n',
      tone: 'accent',
      titleAr: 'am للموعد: am + الترتيبي + n',
      bodyAr:
        'مع التاريخ نستخدم [[am]] أيضاً، لكن يُضاف **-n** إلى الترتيبي. تذكّر: الشهر وحده يأخذ [[im]]، أما اليوم والشهر معاً فيأخذان [[am]].',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'جرّب بنفسك: التاريخ أم الموعد؟',
          modes: [
            {
              labelAr: 'التاريخ',
              captionAr: 'نذكر التاريخ نفسه: der dritte Mai.',
              parts: [
                { text: 'der', tone: 'accent' },
                { text: 'dritte', tone: 'primary' },
                { text: 'Mai' },
              ],
            },
            {
              labelAr: 'الموعد',
              captionAr: 'نذكر متى يحدث الشيء: am dritten Mai، ويُضاف n.',
              parts: [
                { text: 'am', tone: 'accent' },
                { text: 'dritten', tone: 'primary' },
                { text: 'Mai' },
              ],
            },
            {
              labelAr: 'الشهر وحده',
              captionAr: 'الشهر وحده يأخذ im: im Mai.',
              parts: [
                { text: 'im', tone: 'highlight' },
                { text: 'Mai' },
              ],
            },
          ],
        },
        {
          kind: 'examples',
          columns: 2,
          items: [
            { de: 'Wann hast du Geburtstag?', ar: 'متى عيد ميلادك؟', badge: 'سؤال' },
            { de: 'Am dritten Mai.', ar: 'في الثالث من مايو.', badge: 'جواب' },
            { de: 'Am ersten Januar.', ar: 'في الأول من يناير.' },
            { de: 'Am zwanzigsten Juni.', ar: 'في العشرين من يونيو.' },
          ],
        },
      ],
    },
    {
      icon: 'calendar',
      kickerDe: 'Schreibweise',
      tone: 'plum',
      titleAr: 'كتابة التاريخ: اليوم أولاً',
      bodyAr:
        'في ألمانيا يُكتب اليوم ثم الشهر ثم السنة، وتفصل بينها نقاط. ونكتب بالحروف أيضاً، وبعد الرقم نقطة دائماً حين يكون ترتيبياً.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: '12.', tone: 'primary', noteAr: 'اليوم' },
            { text: '03.', tone: 'accent', noteAr: 'الشهر' },
            { text: '1998', tone: 'highlight', noteAr: 'السنة' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: '12.03.1998 هو 12 مارس',
          bodyAr:
            'التاريخ [[12.03.1998]] هو 12 مارس 1998، وليس 3 ديسمبر كما في الأسلوب الأمريكي. ونكتبه بالحروف [[der 12. März 1998]] ويُقرأ [[der zwölfte März]].',
        },
      ],
    },
    {
      icon: 'hash',
      kickerDe: 'Jahreszahlen',
      tone: 'highlight',
      titleAr: 'قراءة السنة',
      bodyAr:
        'تُقرأ السنوات من 1100 إلى 1999 كأنها مئات، أما من عام 2000 فتُقرأ ألفين. وعند ذكر التاريخ كاملاً نقرأ اليوم ثم الشهر ثم السنة.',
      blocks: [
        {
          kind: 'table',
          wrap: true,
          captionAr: 'كيف تُقرأ السنة',
          columns: [
            { header: 'السنة', lang: 'ar' },
            { header: 'Deutsch', lang: 'de', tone: 'highlight' },
          ],
          rows: [
            ['1998', 'neunzehnhundertachtundneunzig'],
            ['2000', 'zweitausend'],
            ['2026', 'zweitausendsechsundzwanzig'],
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Der Wievielte ist heute?', ar: 'ما تاريخ اليوم؟' },
    { de: 'Heute ist der dritte Mai.', ar: 'اليوم هو الثالث من مايو.' },
    { de: 'Wann hast du Geburtstag?', ar: 'متى عيد ميلادك؟' },
    { de: 'Ich habe am zwölften März Geburtstag.', ar: 'عيد ميلادي في الثاني عشر من مارس.' },
    { de: 'Der erste Januar ist Neujahr.', ar: 'الأول من يناير هو رأس السنة.' },
    { de: 'Der Deutschkurs beginnt am fünften Oktober.', ar: 'تبدأ دورة الألمانية في الخامس من أكتوبر.' },
    { de: 'Am zwanzigsten Juni habe ich Zeit.', ar: 'في العشرين من يونيو عندي وقت.' },
    { de: 'Mein Geburtsdatum ist der 12. März 1998.', ar: 'تاريخ ميلادي هو 12 مارس 1998.' },
  ],
  vocabulary: [
    { id: 'voc-datum-datum', word: 'Datum', article: 'das', plural: 'Daten', partOfSpeech: 'noun', meaningAr: 'التاريخ', level: 'A1', category: 'Datum', example: { de: 'Welches Datum haben wir heute?', ar: 'ما تاريخ اليوم؟' } },
    { id: 'voc-datum-geburtsdatum', word: 'Geburtsdatum', article: 'das', plural: 'Geburtsdaten', partOfSpeech: 'noun', meaningAr: 'تاريخ الميلاد', level: 'A1', category: 'Datum', example: { de: 'Mein Geburtsdatum ist der 12. März.', ar: 'تاريخ ميلادي 12 مارس.' } },
    { id: 'voc-datum-wievielte', word: 'Der Wievielte ist heute?', partOfSpeech: 'phrase', meaningAr: 'ما تاريخ اليوم؟', level: 'A1', category: 'Datum', example: { de: 'Der Wievielte ist heute? — Heute ist der vierte Mai.', ar: 'ما تاريخ اليوم؟ — اليوم هو الرابع من مايو.' } },
    { id: 'voc-datum-erste', word: 'erste', partOfSpeech: 'number', meaningAr: 'الأول', level: 'A1', category: 'Datum', example: { de: 'Der erste Januar ist Neujahr.', ar: 'الأول من يناير هو رأس السنة.' } },
    { id: 'voc-datum-zweite', word: 'zweite', partOfSpeech: 'number', meaningAr: 'الثاني', level: 'A1', category: 'Datum', example: { de: 'Heute ist der zweite Mai.', ar: 'اليوم هو الثاني من مايو.' } },
    { id: 'voc-datum-dritte', word: 'dritte', partOfSpeech: 'number', meaningAr: 'الثالث', level: 'A1', category: 'Datum', example: { de: 'Heute ist der dritte Mai.', ar: 'اليوم هو الثالث من مايو.' } },
    { id: 'voc-datum-siebte', word: 'siebte', partOfSpeech: 'number', meaningAr: 'السابع', level: 'A1', category: 'Datum', example: { de: 'Heute ist der siebte Juli.', ar: 'اليوم هو السابع من يوليو.' } },
    { id: 'voc-datum-zwoelfte', word: 'zwölfte', partOfSpeech: 'number', meaningAr: 'الثاني عشر', level: 'A1', category: 'Datum', example: { de: 'Heute ist der zwölfte März.', ar: 'اليوم هو الثاني عشر من مارس.' } },
    { id: 'voc-datum-zwanzigste', word: 'zwanzigste', partOfSpeech: 'number', meaningAr: 'العشرون', level: 'A1', category: 'Datum', example: { de: 'Heute ist der zwanzigste Juni.', ar: 'اليوم هو العشرون من يونيو.' } },
  ],
  pronunciationTips: [
    {
      titleAr: 'zw في بداية zwanzigste وzwölfte',
      bodyAr: 'حرف z يُنطق "تس" وحرف w يُنطق "ڤ"، فيُنطق zw "تسڤ": zwanzigste "تسڤانتسيشتَه". تدرّب عليها ببطء.',
      example: 'zwanzigste',
    },
    {
      titleAr: 'dritte وsiebte',
      bodyAr: 'في dritte يُنطق المقطع الأول "دريـ" بحرف r خفيف في الحلق. وفي siebte يُنطق ie طويلة "ي"، ثم b ثم te: "زيبتَه".',
      example: 'dritte',
    },
  ],
  exercises: [
    {
      id: 'ex-datum-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أي رقم يقابل هذا الترتيبي؟',
      questionDe: 'siebte',
      options: ['5.', '6.', '7.', '8.'],
      correctIndex: 2,
      explanationAr: 'siebte هو السابع (7.): نحذف -en من sieben ثم نضيف -te.',
    },
    {
      id: 'ex-datum-2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الجملة (الرقم 1.)',
      sentenceDe: 'Heute ist der ___ Mai.',
      acceptedAnswers: ['erste'],
      hint: '1.',
      explanationAr: 'الترتيبي لـ 1 هو erste، وهو من الأعداد الأربعة الشاذة.',
    },
    {
      id: 'ex-datum-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الجملة (الرقم 3.)',
      sentenceDe: 'Mein Geburtstag ist am ___ Mai.',
      acceptedAnswers: ['dritten'],
      hint: '3.',
      explanationAr: 'بعد am نضيف -n إلى الترتيبي: am dritten Mai.',
    },
    {
      id: 'ex-datum-4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الجملة (الرقم 20.)',
      sentenceDe: 'Der Kurs beginnt am ___ Oktober.',
      acceptedAnswers: ['zwanzigsten'],
      hint: '20.',
      explanationAr: 'من 20 فما فوق نضيف -ste (zwanzigste)، وبعد am نضيف n: am zwanzigsten.',
    },
    {
      id: 'ex-datum-5',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'كيف تُقرأ هذه العبارة؟',
      questionDe: 'am 12. März',
      options: ['am zwölften März', 'am zwölfte März', 'am zwei März', 'am zwölf März'],
      correctIndex: 0,
      explanationAr: 'الرقم 12 يقابله الترتيبي zwölfte، وبعد am نضيف -n: am zwölften März.',
    },
    {
      id: 'ex-datum-6',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Heute ist der drei Mai.',
      isTrue: false,
      explanationAr: 'الجملة خاطئة. للتاريخ نستخدم الترتيبي: der dritte Mai، وليس العدد العادي drei.',
    },
    {
      id: 'ex-datum-7',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات لتكوين جملة',
      words: ['der', 'Heute', 'dritte', 'ist', 'Mai'],
      correctOrder: [1, 3, 0, 2, 4],
      explanationAr: 'الجملة الصحيحة: Heute ist der dritte Mai. الفعل ist في المرتبة الثانية.',
    },
    {
      id: 'ex-datum-8',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الترتيبي مع معناه',
      pairs: [
        { de: 'erste', ar: 'الأول' },
        { de: 'zweite', ar: 'الثاني' },
        { de: 'dritte', ar: 'الثالث' },
        { de: 'zwölfte', ar: 'الثاني عشر' },
        { de: 'zwanzigste', ar: 'العشرون' },
      ],
      explanationAr: 'من 1 إلى 19 تنتهي الترتيبية بـ -te (عدا erste وdritte)، ومن 20 فما فوق بـ -ste.',
    },
    {
      id: 'ex-datum-9',
      type: 'vocab-recall',
      level: 'A1',
      promptAr: 'ما معنى هذه الكلمة؟',
      vocabularyId: 'voc-datum-geburtsdatum',
      questionDe: 'das Geburtsdatum',
      correctAnswerAr: 'تاريخ الميلاد',
      distractorsAr: ['عيد الميلاد', 'اسم اليوم', 'السنة'],
      explanationAr: 'Geburtsdatum هو يوم الميلاد كاملاً (اليوم والشهر والسنة)، أما Geburtstag فهو عيد الميلاد نفسه.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Heute ist der dreite Mai.',
      correct: 'Heute ist der dritte Mai.',
      explanationAr: 'الترتيبي لـ 3 شاذّ: dritte، وليس dreite. وكذلك erste لـ 1 وsiebte لـ 7 وachte لـ 8.',
    },
    {
      wrong: 'Ich habe am dritte Mai Geburtstag.',
      correct: 'Ich habe am dritten Mai Geburtstag.',
      explanationAr: 'بعد am نضيف -n إلى الترتيبي: am dritten Mai، وليس am dritte.',
    },
    {
      wrong: 'der 3 Mai',
      correct: 'der 3. Mai',
      explanationAr: 'حين نكتب الترتيبي بالأرقام نضع نقطة بعد الرقم، فتدلّ النقطة على أنه ترتيبي.',
    },
  ],
}
