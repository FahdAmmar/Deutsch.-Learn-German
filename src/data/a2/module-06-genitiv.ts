import type { Lesson, Module } from '@/types'

export const lessonGenitiv: Lesson = {
  id: 'a2-m06-l01',
  slug: 'genitiv',
  level: 'A2',
  moduleId: 'a2-m06',
  title: 'Genitiv',
  titleAr: 'حالة الإضافة (Genitiv)',
  estimatedMinutes: 26,
  objectivesAr: [
    'التعرّف على Genitiv كحالة نحوية رابعة وأخيرة، تُستخدم للتعبير عن الملكية والانتماء',
    'تصريف أداة التعريف والتنكير في Genitiv',
    'إضافة -s أو -es إلى الأسماء المذكّرة والمحايدة في Genitiv',
    'إدراك أن von + Dativ يحلّ محل Genitiv تدريجياً في الحديث اليومي',
  ],
  explanation: [
    {
      titleAr: 'الحالة الرابعة: من/لـ (ملكية وانتماء)',
      bodyAr:
        'بعد Nominativ وAkkusativ وDativ، تُكمل Genitiv منظومة الحالات الأربع في الألمانية. تُستخدم أساساً للتعبير عن الملكية أو الانتماء، بمعنى مشابه لإضافة العربية: "das Auto des Mannes" (سيارة الرجل / سيارة الرجلِ). لاحظ خاصية فريدة: الاسم المذكّر أو المحايد نفسه يأخذ نهاية -s أو -es في Genitiv، بالإضافة إلى تغيّر الأداة — وهذا لا يحدث في أي حالة أخرى.',
    },
    {
      titleAr: 'von + Dativ: البديل الشائع في الحديث اليومي',
      bodyAr:
        'رغم صحة Genitiv نحوياً وأهميته في الكتابة الرسمية، يميل المتحدّثون الأصليون بشكل متزايد لاستبداله بتركيب von + Dativ في الحديث اليومي، خصوصاً مع الأسماء العادية: "das Auto von dem Mann" بدلاً من "das Auto des Mannes". يبقى Genitiv ضرورياً في الكتابة الرسمية والأكاديمية، وأيضاً مع أسماء الأعلام (Annas Buch).',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-genitiv',
      slug: 'genitiv-formen',
      level: 'A2',
      titleDe: 'Genitiv: Artikel und Nomenendung',
      titleAr: 'حالة الإضافة: الأداة ونهاية الاسم',
      conceptAr: 'حالة نحوية رابعة للملكية، فريدة بأنها تُغيّر شكل الاسم نفسه وليس فقط أداته.',
      ruleAr:
        'صرّف الأداة في Genitiv (des للمذكر/المحايد، der للمؤنث والجمع)، وأضف -s للأسماء المذكّرة/المحايدة المنتهية بصامت عادي، أو -es للمنتهية بـ s/ß/x/z أو المقاطع القصيرة. يأتي الاسم في حالة Genitiv عادة بعد الاسم الذي يملكه: "das Buch des Kindes" (كتاب الطفل).',
      tables: [
        {
          caption: 'أداة التعريف في الحالات الأربع',
          headers: ['الجنس', 'Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'],
          rows: [
            { label: 'مذكّر', values: ['der', 'den', 'dem', 'des'] },
            { label: 'مؤنث', values: ['die', 'die', 'der', 'der'] },
            { label: 'محايد', values: ['das', 'das', 'dem', 'des'] },
            { label: 'جمع', values: ['die', 'die', 'den', 'der'] },
          ],
        },
        {
          caption: 'أمثلة على نهاية الاسم في Genitiv',
          headers: ['المفرد (Nominativ)', 'Genitiv'],
          rows: [
            { label: 'der Mann', values: ['des Mannes'] },
            { label: 'das Kind', values: ['des Kindes'] },
            { label: 'der Vater', values: ['des Vaters'] },
            { label: 'die Frau', values: ['der Frau (بلا تغيير في الاسم)'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Das Auto des Mannes ist neu.',
          ar: 'سيارة الرجل جديدة.',
          tokens: [
            { text: 'Das Auto', role: 'الفاعل (الشيء المملوك)' },
            { text: 'des Mannes', role: 'المالك (Genitiv)' },
            { text: 'ist neu.', role: 'الخبر' },
          ],
        },
        { de: 'Das ist das Auto von dem Mann.', ar: 'هذه سيارة الرجل. (البديل الشائع في الحديث: von + Dativ)' },
      ],
    },
  ],
  examples: [
    { de: 'Die Farbe des Autos gefällt mir.', ar: 'لون السيارة يعجبني.' },
    { de: 'Das ist Annas Buch.', ar: 'هذا كتاب آنا. (اسم علم + s بلا أداة)' },
    { de: 'Der Titel des Films ist interessant.', ar: 'عنوان الفيلم مثير للاهتمام.' },
    { de: 'Trotz des schlechten Wetters gehen wir spazieren.', ar: 'رغم الطقس السيئ، سنذهب في نزهة. (trotz تأخذ Genitiv)' },
  ],
  vocabulary: [
    { id: 'voc-genitiv-farbe', word: 'Farbe', article: 'die', partOfSpeech: 'noun', meaningAr: 'اللون', level: 'A2', category: 'مفردات مرافقة' },
    { id: 'voc-genitiv-titel', word: 'Titel', article: 'der', partOfSpeech: 'noun', meaningAr: 'العنوان', level: 'A2', category: 'مفردات مرافقة' },
    { id: 'voc-genitiv-trotz', word: 'trotz', partOfSpeech: 'preposition', meaningAr: 'رغم', level: 'A2', category: 'حروف جر + Genitiv' },
    { id: 'voc-genitiv-waehrend', word: 'während', partOfSpeech: 'preposition', meaningAr: 'أثناء', level: 'A2', category: 'حروف جر + Genitiv' },
    { id: 'voc-genitiv-wegen', word: 'wegen', partOfSpeech: 'preposition', meaningAr: 'بسبب', level: 'A2', category: 'حروف جر + Genitiv' },
  ],
  dialogues: [
    {
      id: 'dialogue-genitiv-informell',
      level: 'A2',
      moduleId: 'a2-m06',
      lessonId: 'a2-m06-l01',
      titleDe: 'Wessen Auto ist das?',
      titleAr: 'وصف سيارة صديق',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Milan', de: 'Wessen Auto ist das?', ar: 'سيارة من هذه؟' },
        { speaker: 'b', name: 'Jasmin', de: 'Das ist das Auto meines Bruders.', ar: 'هذه سيارة أخي.' },
        { speaker: 'a', name: 'Milan', de: 'Die Farbe des Autos gefällt mir sehr.', ar: 'لون السيارة يعجبني كثيراً.' },
        { speaker: 'b', name: 'Jasmin', de: 'Trotz des hohen Preises hat er es gekauft.', ar: 'رغم السعر المرتفع، اشتراها.' },
      ],
    },
    {
      id: 'dialogue-genitiv-formell',
      level: 'A2',
      moduleId: 'a2-m06',
      lessonId: 'a2-m06-l01',
      titleDe: 'Der Titel des Berichts',
      titleAr: 'مناقشة تقرير',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Frau Böhm', de: 'Wegen des schlechten Wetters verschieben wir das Treffen.', ar: 'بسبب الطقس السيئ، سنؤجّل الاجتماع.' },
        { speaker: 'b', name: 'Herr Yildiz', de: 'Verstehe. Was ist der Titel des neuen Berichts?', ar: 'مفهوم. ما عنوان التقرير الجديد؟' },
        { speaker: 'a', name: 'Frau Böhm', de: 'Der Titel des Berichts lautet "Zukunft der Stadt".', ar: 'عنوان التقرير هو "مستقبل المدينة".' },
        { speaker: 'b', name: 'Herr Yildiz', de: 'Während der nächsten Woche lese ich ihn.', ar: 'سأقرؤه خلال الأسبوع القادم.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'نهاية -es تُضيف مقطعاً كاملاً', bodyAr: 'عندما يُضاف -es (وليس -s فقط)، يُضاف مقطع صوتي كامل جديد: Mann → Mannes [ˈmanəs].', example: 'Mannes' },
    { titleAr: 'wegen وtrotz وwährend كلمات بمقطعين', bodyAr: 'النبرة في هذه الحروف تقع على المقطع الأول: WEgen، TROTZ (مقطع واحد)، WÄHrend.', example: 'wegen' },
  ],
  exercises: [
    {
      id: 'ex-genitiv-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: Das Auto ___ Mannes ist neu.',
      questionDe: 'Das Auto ___ Mannes ist neu.',
      options: ['des', 'der', 'dem', 'den'],
      correctIndex: 0,
      explanationAr: 'أداة Genitiv للمذكّر هي des.',
    },
    {
      id: 'ex-genitiv-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر نهاية الاسم الصحيحة: das Buch des Kind__',
      questionDe: 'das Buch des Kind__',
      options: ['-es', '-s', '-e', '-en'],
      correctIndex: 0,
      explanationAr: 'Kind تنتهي بـ d، فتأخذ -es في Genitiv لسهولة النطق: Kindes.',
    },
    {
      id: 'ex-genitiv-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: die Farbe ___ Wand (مؤنث)',
      questionDe: 'die Farbe ___ Wand',
      options: ['der', 'des', 'die', 'dem'],
      correctIndex: 0,
      explanationAr: 'أداة Genitiv للمؤنث هي der، بلا تغيير في الاسم نفسه.',
    },
    {
      id: 'ex-genitiv-4',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر البديل الشائع لـ "das Auto des Mannes" في الحديث اليومي',
      questionDe: '___',
      options: ['das Auto von dem Mann', 'das Auto der Mann', 'das Auto den Mann', 'das Auto dem Mann'],
      correctIndex: 0,
      explanationAr: 'von + Dativ هو البديل الشائع لـ Genitiv في الحديث اليومي.',
    },
    {
      id: 'ex-genitiv-5',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل: Trotz ____ Wetters gehen wir spazieren. (المحايد Genitiv)',
      sentenceDe: 'Trotz ____ Wetters gehen wir spazieren.',
      acceptedAnswers: ['des'],
      hint: 'trotz تأخذ Genitiv',
      explanationAr: 'trotz تأخذ Genitiv دائماً، والأداة للمحايد هي des.',
    },
    {
      id: 'ex-genitiv-6',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im gesprochenen Deutsch wird der Genitiv oft durch "von + Dativ" ersetzt.',
      isTrue: true,
      explanationAr: 'صحيح — هذا الاستبدال شائع جداً في الحديث اليومي، رغم بقاء Genitiv صحيحاً في الكتابة الرسمية.',
    },
    {
      id: 'ex-genitiv-7',
      type: 'matching',
      level: 'A2',
      promptAr: 'صل كل حرف جر بمعناه (تأخذ كلها Genitiv)',
      pairs: [
        { de: 'trotz', ar: 'رغم' },
        { de: 'wegen', ar: 'بسبب' },
        { de: 'während', ar: 'أثناء' },
      ],
      explanationAr: 'هذه الحروف الثلاثة من أشهر حروف الجر التي تأخذ Genitiv.',
    },
    {
      id: 'ex-genitiv-8',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Der', 'Titel', 'des', 'Films', 'ist', 'interessant.'],
      correctOrder: [0, 1, 2, 3, 4, 5],
      explanationAr: 'الترتيب الصحيح: "Der Titel des Films ist interessant."',
    },
  ],
  commonMistakes: [
    {
      wrong: 'das Auto der Mannes',
      correct: 'das Auto des Mannes',
      explanationAr: 'أداة Genitiv للمذكّر هي des، وليس der (الخاصة بالمؤنث/الجمع).',
    },
    {
      wrong: 'das Buch des Kind',
      correct: 'das Buch des Kindes',
      explanationAr: 'يجب إضافة -es إلى الاسم المحايد/المذكّر نفسه في Genitiv، وليس فقط تغيير الأداة.',
    },
    {
      wrong: 'trotz das Wetter',
      correct: 'trotz des Wetters',
      explanationAr: 'trotz تأخذ Genitiv دائماً؛ يجب تصريف الأداة والاسم معاً.',
    },
    {
      wrong: 'die Farbe des Frau',
      correct: 'die Farbe der Frau',
      explanationAr: 'أداة Genitiv للمؤنث هي der، وليس des (الخاصة بالمذكّر/المحايد).',
    },
  ],
}

export const module06Genitiv: Module = {
  id: 'a2-m06',
  slug: 'genitiv',
  level: 'A2',
  title: 'Genitiv',
  titleAr: 'حالة الإضافة',
  order: 6,
  lessons: [lessonGenitiv],
}
