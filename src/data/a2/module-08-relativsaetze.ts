import type { Lesson, Module } from '@/types'

export const lessonRelativsaetze: Lesson = {
  id: 'a2-m08-l01',
  slug: 'relativsaetze',
  level: 'A2',
  moduleId: 'a2-m08',
  title: 'Relativsätze',
  titleAr: 'جمل الصلة',
  estimatedMinutes: 32,
  objectivesAr: [
    'تكوين جمل الصلة باستخدام der/die/das كضمائر وصل',
    'اختيار جنس وعدد ضمير الوصل حسب الاسم الذي يعود عليه، وحالته النحوية حسب دوره داخل جملة الصلة',
    'تطبيق قاعدة الفعل في النهاية على جملة الصلة، تماماً كباقي الجمل الثانوية',
    'التمييز بين استخدام was وder/die/das',
  ],
  explanation: [
    {
      titleAr: 'ضمير الوصل: قرار مزدوج',
      bodyAr:
        'جملة الصلة تصف اسماً بجملة كاملة بدل صفة واحدة: "Der Mann, der dort steht, ist mein Lehrer" (الرجل الذي يقف هناك هو معلّمي). اختيار ضمير الوصل يتطلّب قرارين منفصلين: الجنس والعدد يأتيان من الاسم الذي يصفه ضمير الوصل (Mann مذكّر مفرد)، بينما الحالة النحوية (Nominativ/Akkusativ/Dativ) تُحدَّد حسب دور ضمير الوصل داخل جملة الصلة نفسها فقط، بلا أي علاقة بدوره في الجملة الرئيسية.',
    },
    {
      titleAr: 'الفعل في النهاية، كالمعتاد',
      bodyAr:
        'جملة الصلة نوع من الجمل الثانوية، فتنطبق عليها نفس قاعدة الفعل في النهاية التي رأيتها مع weil وdass وwenn: "Der Mann, den ich sehe, ist mein Lehrer" — لاحظ sehe في نهاية جملة الصلة.',
    },
    {
      titleAr: 'was بدل der/die/das في حالات محدودة',
      bodyAr:
        'تُستخدَم was بدل der/die/das فقط عندما يعود ضمير الوصل على كلمة غير محدّدة مثل alles وetwas وnichts، أو على جملة كاملة سابقة: "Das ist alles, was ich weiß" (هذا كل ما أعرفه). لا تستخدم was أبداً للإشارة إلى شخص أو شيء محدّد له جنس معروف.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-relativsaetze',
      slug: 'relativpronomen',
      level: 'A2',
      titleDe: 'Relativpronomen und Relativsätze',
      titleAr: 'ضمائر الوصل وجمل الصلة',
      conceptAr: 'ضمير الوصل يطابق الاسم في الجنس والعدد، لكنه يأخذ حالته النحوية من دوره داخل جملة الصلة نفسها.',
      ruleAr:
        'حدّد أولاً جنس وعدد الاسم الموصوف، ثم حدّد دور ضمير الوصل داخل جملة الصلة (فاعل، مفعول به مباشر، مفعول به غير مباشر) لاختيار حالته الصحيحة من الجدول. ضع الفعل المصرَّف في نهاية جملة الصلة دائماً، وافصلها بفاصلة عن الجملة الرئيسية.',
      tables: [
        {
          caption: 'تصريف ضمائر الوصل',
          headers: ['الحالة', 'مذكّر', 'مؤنث', 'محايد', 'جمع'],
          rows: [
            { label: 'Nominativ', values: ['der', 'die', 'das', 'die'] },
            { label: 'Akkusativ', values: ['den', 'die', 'das', 'die'] },
            { label: 'Dativ', values: ['dem', 'der', 'dem', 'denen'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Der Mann, der dort steht, ist mein Lehrer.',
          ar: 'الرجل الذي يقف هناك هو معلّمي. (ضمير الوصل فاعل داخل جملة الصلة: Nominativ)',
          tokens: [
            { text: 'Der Mann,', role: 'الاسم الموصوف' },
            { text: 'der', role: 'ضمير الوصل (فاعل، Nominativ)' },
            { text: 'dort steht,', role: 'بقية جملة الصلة' },
            { text: 'ist mein Lehrer.', role: 'الجملة الرئيسية' },
          ],
        },
        {
          de: 'Der Mann, den ich sehe, ist mein Lehrer.',
          ar: 'الرجل الذي أراه هو معلّمي. (ضمير الوصل مفعول به داخل جملة الصلة: Akkusativ)',
          tokens: [
            { text: 'Der Mann,', role: 'الاسم الموصوف' },
            { text: 'den', role: 'ضمير الوصل (مفعول به، Akkusativ)' },
            { text: 'ich sehe,', role: 'بقية جملة الصلة' },
            { text: 'ist mein Lehrer.', role: 'الجملة الرئيسية' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Die Frau, der ich geholfen habe, war sehr dankbar.', ar: 'المرأة التي ساعدتها كانت شاكرة جداً. (helfen تأخذ Dativ)' },
    { de: 'Das Buch, das auf dem Tisch liegt, gehört mir.', ar: 'الكتاب الذي على الطاولة ملكي.' },
    { de: 'Das ist alles, was ich weiß.', ar: 'هذا كل ما أعرفه. (was بعد alles)' },
    { de: 'Die Kinder, die im Garten spielen, sind meine Neffen.', ar: 'الأطفال الذين يلعبون في الحديقة هم أبناء إخوتي.' },
  ],
  vocabulary: [
    { id: 'voc-relativ-dankbar', word: 'dankbar', partOfSpeech: 'adjective', meaningAr: 'شاكر / ممتنّ', level: 'A2', category: 'مفردات مرافقة' },
    { id: 'voc-relativ-gehoeren', word: 'gehören', partOfSpeech: 'verb', meaningAr: 'يخصّ / يملك', level: 'A2', category: 'مفردات مرافقة' },
    { id: 'voc-relativ-neffe', word: 'Neffe', article: 'der', partOfSpeech: 'noun', meaningAr: 'ابن الأخ/الأخت', level: 'A2', category: 'مفردات مرافقة' },
  ],
  dialogues: [
    {
      id: 'dialogue-relativ-informell',
      level: 'A2',
      moduleId: 'a2-m08',
      lessonId: 'a2-m08-l01',
      titleDe: 'Wer ist das auf dem Foto?',
      titleAr: 'التعرّف على شخص في صورة',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Pia', de: 'Wer ist die Frau, die neben dir steht?', ar: 'من هي المرأة التي تقف بجانبك؟' },
        { speaker: 'b', name: 'Amir', de: 'Das ist die Kollegin, die ich dir erzählt habe.', ar: 'هذه الزميلة التي أخبرتك عنها.' },
        { speaker: 'a', name: 'Pia', de: 'Ah, die, der du bei dem Projekt geholfen hast?', ar: 'آه، التي ساعدتها في المشروع؟' },
        { speaker: 'b', name: 'Amir', de: 'Genau die!', ar: 'هي بالضبط!' },
      ],
    },
    {
      id: 'dialogue-relativ-formell',
      level: 'A2',
      moduleId: 'a2-m08',
      lessonId: 'a2-m08-l01',
      titleDe: 'Eine Frage zur Datei',
      titleAr: 'استفسار عن ملف',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Herr Voss', de: 'Wo ist die Datei, die Sie gestern erwähnt haben?', ar: 'أين الملف الذي ذكرتموه أمس؟' },
        { speaker: 'b', name: 'Frau Ilic', de: 'Die Datei, die Sie meinen, ist im gemeinsamen Ordner.', ar: 'الملف الذي تقصدونه موجود في المجلّد المشترك.' },
        { speaker: 'a', name: 'Herr Voss', de: 'Danke. Ist das die Version, die wir besprochen haben?', ar: 'شكراً. هل هذه النسخة التي ناقشناها؟' },
        { speaker: 'b', name: 'Frau Ilic', de: 'Ja, genau die.', ar: 'نعم، هي بالضبط.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'وقفة قصيرة قبل جملة الصلة', bodyAr: 'الفاصلة قبل ضمير الوصل تُقابلها وقفة نفَسية قصيرة في النطق.', example: 'der Mann, der...' },
    { titleAr: 'denen: نهاية -en واضحة', bodyAr: 'ضمير الوصل الجمع في Dativ denen يُنطق بنهاية -en واضحة ومنبورة قليلاً.', example: 'denen' },
  ],
  exercises: [
    {
      id: 'ex-relativ-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر ضمير الوصل الصحيح: Der Mann, ___ dort steht, ist mein Lehrer. (فاعل)',
      questionDe: 'Der Mann, ___ dort steht, ist mein Lehrer.',
      options: ['der', 'den', 'dem', 'die'],
      correctIndex: 0,
      explanationAr: 'ضمير الوصل فاعل داخل جملة الصلة (يقف)، فيأخذ Nominativ: der.',
    },
    {
      id: 'ex-relativ-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر ضمير الوصل الصحيح: Der Mann, ___ ich sehe, ist mein Lehrer. (مفعول به)',
      questionDe: 'Der Mann, ___ ich sehe, ist mein Lehrer.',
      options: ['den', 'der', 'dem', 'die'],
      correctIndex: 0,
      explanationAr: 'ضمير الوصل مفعول به مباشر لـ sehen داخل جملة الصلة، فيأخذ Akkusativ: den.',
    },
    {
      id: 'ex-relativ-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر ضمير الوصل الصحيح: Die Frau, ___ ich geholfen habe. (helfen + Dativ)',
      questionDe: 'Die Frau, ___ ich geholfen habe.',
      options: ['der', 'die', 'den', 'was'],
      correctIndex: 0,
      explanationAr: 'helfen تأخذ Dativ دائماً، وFrau مؤنثة، فضمير الوصل في Dativ المؤنث هو der.',
    },
    {
      id: 'ex-relativ-4',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: Das ist alles, ___ ich weiß.',
      questionDe: 'Das ist alles, ___ ich weiß.',
      options: ['was', 'das', 'der', 'die'],
      correctIndex: 0,
      explanationAr: 'was تُستخدَم بعد alles/etwas/nichts، وليس der/die/das.',
    },
    {
      id: 'ex-relativ-5',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل: Das Buch, ____ auf dem Tisch liegt, gehört mir. (محايد، فاعل)',
      sentenceDe: 'Das Buch, ____ auf dem Tisch liegt, gehört mir.',
      acceptedAnswers: ['das'],
      hint: 'محايد Nominativ',
      explanationAr: 'Buch محايدة وضمير الوصل فاعل (يقع)، فيأخذ Nominativ المحايد: das.',
    },
    {
      id: 'ex-relativ-6',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Das Relativpronomen bekommt seinen Kasus von seiner Rolle im Hauptsatz.',
      isTrue: false,
      explanationAr: 'خطأ — ضمير الوصل يأخذ حالته من دوره داخل جملة الصلة نفسها، وليس من الجملة الرئيسية.',
    },
    {
      id: 'ex-relativ-7',
      type: 'matching',
      level: 'A2',
      promptAr: 'صل كل جملة بضمير الوصل الصحيح',
      pairs: [
        { de: 'Der Mann, ___ dort steht', ar: 'der' },
        { de: 'Der Mann, ___ ich sehe', ar: 'den' },
        { de: 'Die Leute, ___ ich geholfen habe', ar: 'denen' },
        { de: 'Das Kind, ___ dort spielt', ar: 'das' },
      ],
      explanationAr: 'كل جملة تحتاج ضمير وصل يطابق جنس الاسم وحالته النحوية داخل جملة الصلة.',
    },
    {
      id: 'ex-relativ-8',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Die', 'Kinder,', 'die', 'im', 'Garten', 'spielen,', 'sind', 'meine', 'Neffen.'],
      correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      explanationAr: 'الترتيب الصحيح: "Die Kinder, die im Garten spielen, sind meine Neffen."',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Der Mann, der ich sehe, ist mein Lehrer.',
      correct: 'Der Mann, den ich sehe, ist mein Lehrer.',
      explanationAr: 'ضمير الوصل هنا مفعول به مباشر لـ sehen، فيحتاج Akkusativ (den)، وليس Nominativ (der).',
    },
    {
      wrong: 'Der Mann, der dort steht ist mein Lehrer.',
      correct: 'Der Mann, der dort steht, ist mein Lehrer.',
      explanationAr: 'يجب وضع فاصلة في نهاية جملة الصلة قبل استئناف الجملة الرئيسية.',
    },
    {
      wrong: 'Die Frau, die ich geholfen habe.',
      correct: 'Die Frau, der ich geholfen habe.',
      explanationAr: 'helfen تأخذ Dativ دائماً، فضمير الوصل يجب أن يكون في Dativ (der)، وليس Akkusativ/Nominativ (die).',
    },
    {
      wrong: 'Das Buch, das ich sehe es, ist interessant.',
      correct: 'Das Buch, das ich sehe, ist interessant.',
      explanationAr: 'ضمير الوصل يحل محل المفعول به بالكامل؛ لا يجوز تكراره بضمير إضافي (es) داخل نفس الجملة.',
    },
  ],
}

export const module08Relativsaetze: Module = {
  id: 'a2-m08',
  slug: 'relativsaetze',
  level: 'A2',
  title: 'Relativsätze',
  titleAr: 'جمل الصلة',
  order: 8,
  lessons: [lessonRelativsaetze],
}
