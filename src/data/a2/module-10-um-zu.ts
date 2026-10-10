import type { Lesson, Module } from '@/types'

export const lessonUmZu: Lesson = {
  id: 'a2-m10-l01',
  slug: 'um-zu-infinitiv',
  level: 'A2',
  moduleId: 'a2-m10',
  title: 'um...zu + Infinitiv',
  titleAr: 'التعبير عن الغرض: um...zu',
  estimatedMinutes: 30,
  objectivesAr: [
    'تكوين جملة الغرض باستخدام um...zu + Infinitiv للتعبير عن هدف فعل',
    'التمييز بين um...zu (نفس الفاعل في الجملتين) وweil/damit (فاعل مختلف)',
    'استخدام ohne...zu للتعبير عن فعل شيء دون فعل آخر',
    'استخدام مفردات المهنة والعمل والدراسة في سياق التعبير عن الأهداف',
  ],
  explanation: [
    {
      titleAr: 'um...zu: هدف الفاعل نفسه',
      bodyAr:
        'تُستخدَم um...zu + Infinitiv للتعبير عن الغرض أو الهدف من فعل ما، لكن بشرط أساسي: يجب أن يكون فاعل الجملتين (الرئيسية والغرض) نفس الشخص. "Ich lerne Deutsch, um in Deutschland zu arbeiten" (أتعلّم الألمانية لكي أعمل في ألمانيا) — أنا التي أتعلّم، وأنا نفسي التي سأعمل.',
    },
    {
      titleAr: 'ماذا لو اختلف الفاعل؟ استخدم damit',
      bodyAr:
        'إن كان فاعل الهدف مختلفاً عن فاعل الجملة الرئيسية، لا يمكن استخدام um...zu، بل يجب استخدام damit (جملة ثانوية كاملة بفعل مصرَّف): "Ich spreche langsam, damit du mich verstehst" (أتحدّث ببطء لكي تفهمني أنت) — أنا أتحدّث، لكن أنت من يفهم، ففاعلان مختلفان.',
    },
    {
      titleAr: 'بلا zu مع الأفعال المنفصلة: zu تدخل بين البادئة والجذع',
      bodyAr:
        'مع الأفعال المنفصلة، تدخل zu بين البادئة والجذع تماماً كما رأيت مع um: "..., um früh aufzustehen" (لكي أستيقظ باكراً) — auf-zu-stehen، وليس zu aufstehen.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-um-zu',
      slug: 'um-zu-damit-ohne-zu',
      level: 'A2',
      titleDe: 'um...zu, damit, ohne...zu',
      titleAr: 'أدوات الغرض: um...zu وdamit وohne...zu',
      conceptAr: 'um...zu لهدف بنفس الفاعل (مصدر بلا فاعل)؛ damit لهدف بفاعل مختلف (جملة كاملة)؛ ohne...zu لفعل بلا فعل آخر مرافق.',
      ruleAr:
        'إن كان فاعل الجملتين نفسه، استخدم um...zu + Infinitiv في نهاية الجملة (بلا فاعل ثانٍ). إن اختلف الفاعل، استخدم damit كجملة ثانوية كاملة بفعل مصرَّف في النهاية. لنفي وجود فعل مرافق استخدم ohne...zu بنفس بنية um...zu.',
      tables: [
        {
          caption: 'مقارنة الأدوات الثلاث',
          headers: ['الأداة', 'البنية', 'متى تُستخدَم'],
          rows: [
            { label: 'um...zu', values: ['+ Infinitiv (بلا فاعل)', 'نفس الفاعل في الجملتين'] },
            { label: 'damit', values: ['+ جملة كاملة (فعل مصرَّف)', 'فاعل مختلف'] },
            { label: 'ohne...zu', values: ['+ Infinitiv (بلا فاعل)', 'فعل شيء بلا فعل آخر مرافق'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich lerne jeden Tag, um die Prüfung zu bestehen.',
          ar: 'أدرس كل يوم لكي أنجح في الامتحان. (نفس الفاعل)',
          tokens: [
            { text: 'Ich lerne jeden Tag,', role: 'الجملة الرئيسية' },
            { text: 'um', role: 'أداة الغرض' },
            { text: 'die Prüfung', role: 'المفعول به' },
            { text: 'zu bestehen.', role: 'zu + Infinitiv (بلا فاعل)' },
          ],
        },
        {
          de: 'Ich spreche langsam, damit du mich verstehst.',
          ar: 'أتحدّث ببطء لكي تفهمني. (فاعل مختلف)',
          tokens: [
            { text: 'Ich spreche langsam,', role: 'الجملة الرئيسية' },
            { text: 'damit', role: 'أداة الغرض (فاعل مختلف)' },
            { text: 'du mich', role: 'فاعل جديد + مفعول به' },
            { text: 'verstehst.', role: 'الفعل في النهاية' },
          ],
        },
        { de: 'Er ist gegangen, ohne sich zu verabschieden.', ar: 'ذهب دون أن يودّع. (ohne...zu)' },
      ],
    },
  ],
  examples: [
    { de: 'Ich arbeite hart, um Karriere zu machen.', ar: 'أعمل بجدّ لكي أحقّق تقدّماً مهنياً.' },
    { de: 'Sie studiert Medizin, um Ärztin zu werden.', ar: 'تدرس الطب لكي تصبح طبيبة.' },
    { de: 'Wir sparen Geld, um ein Haus zu kaufen.', ar: 'ندّخر المال لكي نشتري بيتاً.' },
    { de: 'Ruf mich an, damit wir uns treffen können.', ar: 'اتصل بي لكي نتمكّن من اللقاء.' },
  ],
  vocabulary: [
    { id: 'voc-umzu-karriere', word: 'Karriere', article: 'die', partOfSpeech: 'noun', meaningAr: 'المسيرة المهنية', level: 'A2', category: 'المهنة والعمل' },
    { id: 'voc-umzu-bewerbung', word: 'Bewerbung', article: 'die', partOfSpeech: 'noun', meaningAr: 'طلب التوظيف', level: 'A2', category: 'المهنة والعمل' },
    { id: 'voc-umzu-lebenslauf', word: 'Lebenslauf', article: 'der', partOfSpeech: 'noun', meaningAr: 'السيرة الذاتية', level: 'A2', category: 'المهنة والعمل' },
    { id: 'voc-umzu-vorstellungsgespraech', word: 'Vorstellungsgespräch', article: 'das', partOfSpeech: 'noun', meaningAr: 'مقابلة العمل', level: 'A2', category: 'المهنة والعمل' },
    { id: 'voc-umzu-gehalt', word: 'Gehalt', article: 'das', partOfSpeech: 'noun', meaningAr: 'الراتب', level: 'A2', category: 'المهنة والعمل' },
    { id: 'voc-umzu-erfahrung', word: 'Erfahrung', article: 'die', partOfSpeech: 'noun', meaningAr: 'الخبرة', level: 'A2', category: 'المهنة والعمل' },
    { id: 'voc-umzu-bestehen', word: 'bestehen', partOfSpeech: 'verb', meaningAr: 'ينجح (في امتحان)', level: 'A2', category: 'مفردات مرافقة' },
    { id: 'voc-umzu-sparen', word: 'sparen', partOfSpeech: 'verb', meaningAr: 'يدّخر', level: 'A2', category: 'مفردات مرافقة' },
  ],
  dialogues: [
    {
      id: 'dialogue-umzu-informell',
      level: 'A2',
      moduleId: 'a2-m10',
      lessonId: 'a2-m10-l01',
      titleDe: 'Pläne für die Zukunft',
      titleAr: 'خطط للمستقبل',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Selin', de: 'Warum lernst du jeden Abend so lange?', ar: 'لماذا تدرس كل مساء لوقت طويل؟' },
        { speaker: 'b', name: 'Boris', de: 'Um die Prüfung nächste Woche zu bestehen.', ar: 'لكي أنجح في امتحان الأسبوع القادم.' },
        { speaker: 'a', name: 'Selin', de: 'Und danach? Was sind deine Pläne?', ar: 'وبعد ذلك؟ ما خططك؟' },
        { speaker: 'b', name: 'Boris', de: 'Ich möchte mich bewerben, um bei dieser Firma zu arbeiten.', ar: 'أريد أن أتقدّم بطلب لكي أعمل في هذه الشركة.' },
      ],
    },
    {
      id: 'dialogue-umzu-formell',
      level: 'A2',
      moduleId: 'a2-m10',
      lessonId: 'a2-m10-l01',
      titleDe: 'Das Vorstellungsgespräch',
      titleAr: 'مقابلة عمل',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Frau Neumann', de: 'Warum möchten Sie bei uns arbeiten?', ar: 'لماذا تريدون العمل لدينا؟' },
        { speaker: 'b', name: 'Herr Boateng', de: 'Um meine Erfahrung in einem internationalen Team zu erweitern.', ar: 'لكي أوسّع خبرتي في فريق دولي.' },
        { speaker: 'a', name: 'Frau Neumann', de: 'Haben Sie Fragen an uns?', ar: 'هل لديكم أسئلة لنا؟' },
        { speaker: 'b', name: 'Herr Boateng', de: 'Ja, damit ich mich gut vorbereiten kann: Wann beginnt die Stelle?', ar: 'نعم، لكي أستعدّ جيداً: متى تبدأ الوظيفة؟' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'um وzu بلا نبرة قوية', bodyAr: 'um وzu كلمتان قصيرتان بلا نبرة؛ النبرة تقع على الفعل في نهاية الجملة.', example: 'um zu bestehen' },
    { titleAr: 'damit كلمة واحدة متصلة', bodyAr: 'damit تُنطق ككلمة واحدة [daˈmɪt]، بنبرة على المقطع الثاني.', example: 'damit' },
  ],
  exercises: [
    {
      id: 'ex-umzu-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: Ich lerne Deutsch, ___ in Deutschland zu arbeiten. (نفس الفاعل)',
      questionDe: 'Ich lerne Deutsch, ___ in Deutschland zu arbeiten.',
      options: ['um', 'damit', 'weil', 'ohne'],
      correctIndex: 0,
      explanationAr: 'نفس الفاعل (أنا) في الجملتين، فتُستخدَم um...zu.',
    },
    {
      id: 'ex-umzu-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: Ich spreche langsam, ___ du mich verstehst. (فاعل مختلف)',
      questionDe: 'Ich spreche langsam, ___ du mich verstehst.',
      options: ['damit', 'um', 'ohne', 'weil'],
      correctIndex: 0,
      explanationAr: 'الفاعل مختلف (أنا/أنت)، فيجب استخدام damit مع جملة كاملة.',
    },
    {
      id: 'ex-umzu-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الترتيب الصحيح',
      questionDe: '___',
      options: [
        'Ich arbeite hart, um Karriere zu machen.',
        'Ich arbeite hart, um zu Karriere machen.',
        'Ich arbeite hart, um machen Karriere zu.',
        'Ich arbeite hart, Karriere um zu machen.',
      ],
      correctIndex: 0,
      explanationAr: 'zu تقع مباشرة قبل الفعل في نهاية الجملة: um Karriere zu machen.',
    },
    {
      id: 'ex-umzu-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل: Er ist gegangen, ____ sich zu verabschieden. (بدون)',
      sentenceDe: 'Er ist gegangen, ____ sich zu verabschieden.',
      acceptedAnswers: ['ohne'],
      hint: 'أداة تعني "بدون"',
      explanationAr: 'ohne...zu تعني "بدون أن يفعل شيئاً".',
    },
    {
      id: 'ex-umzu-5',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '"um...zu" kann man nur benutzen, wenn beide Sätze das gleiche Subjekt haben.',
      isTrue: true,
      explanationAr: 'صحيح — um...zu تتطلّب نفس الفاعل في الجملتين، وإلا يجب استخدام damit.',
    },
    {
      id: 'ex-umzu-6',
      type: 'matching',
      level: 'A2',
      promptAr: 'صل كل كلمة بمعناها',
      pairs: [
        { de: 'die Bewerbung', ar: 'طلب التوظيف' },
        { de: 'der Lebenslauf', ar: 'السيرة الذاتية' },
        { de: 'das Gehalt', ar: 'الراتب' },
        { de: 'die Erfahrung', ar: 'الخبرة' },
      ],
      explanationAr: 'كل كلمة من هذه المجموعة لها مقابل واحد محدد بالعربية.',
    },
    {
      id: 'ex-umzu-7',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Sie', 'studiert', 'Medizin,', 'um', 'Ärztin', 'zu', 'werden.'],
      correctOrder: [0, 1, 2, 3, 4, 5, 6],
      explanationAr: 'الترتيب الصحيح: "Sie studiert Medizin, um Ärztin zu werden."',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich lerne Deutsch, um ich in Deutschland arbeite.',
      correct: 'Ich lerne Deutsch, um in Deutschland zu arbeiten.',
      explanationAr: 'um...zu لا تأخذ فاعلاً ولا فعلاً مصرَّفاً؛ تحتاج Infinitiv فقط بلا فاعل.',
    },
    {
      wrong: 'Ich spreche langsam, um du mich verstehst.',
      correct: 'Ich spreche langsam, damit du mich verstehst.',
      explanationAr: 'الفاعل هنا مختلف (أنا/أنت)، فلا يمكن استخدام um...zu؛ يجب استخدام damit.',
    },
    {
      wrong: '..., um aufzustehen früh.',
      correct: '..., um früh aufzustehen.',
      explanationAr: 'zu تدخل بين البادئة المنفصلة والجذع، ويبقى الفعل بأكمله في نهاية الجملة: aufzustehen.',
    },
    {
      wrong: 'Er ist gegangen, ohne er sich verabschiedet.',
      correct: 'Er ist gegangen, ohne sich zu verabschieden.',
      explanationAr: 'ohne...zu (بنفس الفاعل) لا تأخذ فاعلاً ثانياً ولا فعلاً مصرَّفاً؛ تحتاج Infinitiv فقط.',
    },
  ],
}

export const module10UmZu: Module = {
  id: 'a2-m10',
  slug: 'um-zu-infinitiv',
  level: 'A2',
  title: 'um...zu + Infinitiv',
  titleAr: 'التعبير عن الغرض',
  order: 10,
  lessons: [lessonUmZu],
}
