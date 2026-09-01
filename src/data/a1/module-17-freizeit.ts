import type { Lesson, Module } from '@/types'

export const lessonFreizeit: Lesson = {
  id: 'a1-m17-l01',
  slug: 'freizeit-und-hobbys',
  level: 'A1',
  moduleId: 'a1-m17',
  title: 'Freizeit und Hobbys',
  titleAr: 'أوقات الفراغ والهوايات',
  estimatedMinutes: 28,
  objectivesAr: [
    'حفظ مفردات الهوايات وأنشطة أوقات الفراغ الشائعة',
    'التعبير عن التفضيل باستخدام gern وlieber وam liebsten',
    'التمييز بين mögen (مع اسم) وgern + فعل (مع نشاط)',
    'وضع gern في الموضع الصحيح من الجملة، مباشرة بعد الفعل المصرَّف',
  ],
  explanation: [
    {
      titleAr: 'gern: أداة وليست فعلاً',
      bodyAr:
        'للتعبير عن الاستمتاع بنشاط ما، تُضاف كلمة gern (بسرور) مباشرة بعد الفعل المصرَّف، وليس قبله: "Ich spiele gern Fußball" (حرفياً: ألعب بسرور كرة القدم = أحب لعب كرة القدم). هذا مختلف عن الإنجليزية والعربية اللتين تستخدمان فعل "أحب" مباشرة قبل النشاط.',
    },
    {
      titleAr: 'ثلاث درجات: gern، lieber، am liebsten',
      bodyAr:
        'مثل صفات المقارنة، لكلمة gern ثلاث درجات: gern (بسرور، الدرجة الأساسية)، lieber (أفضّل، درجة المقارنة، وهي شكل شاذّ وليس "gerner")، وam liebsten (الأكثر تفضيلاً، درجة التفضيل المطلق، شكل شاذّ تماماً أيضاً). القاعدة نفسها في بنية الجملة: تأتي بعد الفعل المصرَّف مباشرة.',
    },
    {
      titleAr: 'mögen مع الاسم، gern مع الفعل',
      bodyAr:
        'تذكّر الفرق الذي تعلّمته مع الأفعال الشرطية: mögen تُستخدم مع اسم مباشرة للتعبير عن الإعجاب بشيء ("Ich mag Fußball")، أما للتعبير عن الاستمتاع بفعل نشاط ما فتُستخدم gern مع الفعل المناسب ("Ich spiele gern Fußball")، وليس "Ich mag spielen Fußball" الذي يُعدّ خطأً شائعاً.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-gern-lieber-am-liebsten',
      slug: 'gern-lieber-am-liebsten',
      level: 'A1',
      titleDe: 'gern, lieber, am liebsten',
      titleAr: 'درجات التفضيل: gern وlieber وam liebsten',
      conceptAr: 'أداة توضع بعد الفعل المصرَّف مباشرة للتعبير عن مدى الاستمتاع بنشاط، بثلاث درجات شاذّة التكوين.',
      ruleAr:
        'ضع gern أو lieber أو am liebsten مباشرة بعد الفعل المصرَّف في الجملة الخبرية. lieber وam liebsten شكلان شاذّان تماماً ولا يُشتقّان من gern بإضافة نهاية منتظمة، فيجب حفظهما كما هما.',
      tables: [
        {
          caption: 'الدرجات الثلاث',
          headers: ['الدرجة', 'الشكل', 'المعنى'],
          rows: [
            { label: 'Positiv', values: ['gern', 'بسرور / أحب أن...'] },
            { label: 'Komparativ', values: ['lieber', 'أفضّل أن...'] },
            { label: 'Superlativ', values: ['am liebsten', 'أكثر ما أحب فعله هو...'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich spiele gern Fußball.',
          ar: 'أحب لعب كرة القدم.',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'spiele', role: 'الفعل' },
            { text: 'gern', role: 'أداة التفضيل' },
            { text: 'Fußball.', role: 'المفعول به' },
          ],
        },
        {
          de: 'Ich lese gern, aber ich schwimme lieber.',
          ar: 'أحب القراءة، لكنني أفضّل السباحة.',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'schwimme', role: 'الفعل' },
            { text: 'lieber.', role: 'أداة التفضيل (المقارنة)' },
          ],
        },
        {
          de: 'Am liebsten spiele ich Basketball.',
          ar: 'أكثر ما أحبّه هو لعب كرة السلة.',
          tokens: [
            { text: 'Am liebsten', role: 'أداة التفضيل (المطلق)' },
            { text: 'spiele', role: 'الفعل' },
            { text: 'ich', role: 'الفاعل' },
            { text: 'Basketball.', role: 'المفعول به' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Was machst du gern in deiner Freizeit?', ar: 'ماذا تحب أن تفعل في وقت فراغك؟' },
    { de: 'Ich höre gern Musik und tanze gern.', ar: 'أحب الاستماع إلى الموسيقى والرقص.' },
    { de: 'Er kocht lieber, als essen zu gehen.', ar: 'يفضّل الطبخ على الخروج لتناول الطعام.' },
    { de: 'Am liebsten fahre ich am Wochenende Rad.', ar: 'أكثر ما أحبّه هو ركوب الدراجة في نهاية الأسبوع.' },
  ],
  vocabulary: [
    { id: 'voc-freizeit-fussball', word: 'Fußball spielen', partOfSpeech: 'phrase', meaningAr: 'يلعب كرة القدم', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-schwimmen', word: 'schwimmen', partOfSpeech: 'verb', meaningAr: 'يسبح', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-lesen', word: 'lesen', partOfSpeech: 'verb', meaningAr: 'يقرأ', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-malen', word: 'malen', partOfSpeech: 'verb', meaningAr: 'يرسم', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-kochen', word: 'kochen', partOfSpeech: 'verb', meaningAr: 'يطبخ', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-tanzen', word: 'tanzen', partOfSpeech: 'verb', meaningAr: 'يرقص', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-singen', word: 'singen', partOfSpeech: 'verb', meaningAr: 'يغنّي', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-musik-hoeren', word: 'Musik hören', partOfSpeech: 'phrase', meaningAr: 'يستمع إلى الموسيقى', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-wandern', word: 'wandern', partOfSpeech: 'verb', meaningAr: 'يتنزّه سيراً على الأقدام', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-rad-fahren', word: 'Rad fahren', partOfSpeech: 'phrase', meaningAr: 'يركب الدراجة', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-fotografieren', word: 'fotografieren', partOfSpeech: 'verb', meaningAr: 'يصوّر', level: 'A1', category: 'الهوايات' },
    { id: 'voc-freizeit-freizeit', word: 'Freizeit', article: 'die', partOfSpeech: 'noun', meaningAr: 'وقت الفراغ', level: 'A1', category: 'الهوايات' },
  ],
  dialogues: [
    {
      id: 'dialogue-freizeit-informell',
      level: 'A1',
      moduleId: 'a1-m17',
      lessonId: 'a1-m17-l01',
      titleAr: 'الحديث عن الهوايات',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Aylin', de: 'Was machst du gern am Wochenende?', ar: 'ماذا تحب أن تفعل في نهاية الأسبوع؟' },
        { speaker: 'b', name: 'Noah', de: 'Ich wandere gern in den Bergen. Und du?', ar: 'أحب التنزّه في الجبال. وأنتِ؟' },
        { speaker: 'a', name: 'Aylin', de: 'Ich male gern, aber am liebsten fotografiere ich.', ar: 'أحب الرسم، لكن أكثر ما أحبّه هو التصوير.' },
        { speaker: 'b', name: 'Noah', de: 'Interessant! Vielleicht können wir zusammen wandern und fotografieren.', ar: 'مثير للاهتمام! ربما يمكننا التنزّه والتصوير معاً.' },
      ],
    },
    {
      id: 'dialogue-freizeit-formell',
      level: 'A1',
      moduleId: 'a1-m17',
      lessonId: 'a1-m17-l01',
      titleAr: 'محادثة تعارف في مقابلة',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Frau Keller', de: 'Was machen Sie gern in Ihrer Freizeit?', ar: 'ماذا تحبّون أن تفعلوا في وقت فراغكم؟' },
        { speaker: 'b', name: 'Herr Osei', de: 'Ich lese gern und ich koche auch gern.', ar: 'أحب القراءة وأحب الطبخ أيضاً.' },
        { speaker: 'a', name: 'Frau Keller', de: 'Und was machen Sie am liebsten?', ar: 'وما أكثر ما تحبّون فعله؟' },
        { speaker: 'b', name: 'Herr Osei', de: 'Am liebsten reise ich mit meiner Familie.', ar: 'أكثر ما أحبّه هو السفر مع عائلتي.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'ie في lieber تُنطق [iː] طويلة', bodyAr: 'حروف ie معاً تُنطق صوت i طويلاً واحداً.', example: 'lieber' },
    { titleAr: 'النبرة في am liebsten', bodyAr: 'النبرة الرئيسية تقع على liebsten، وam بلا نبرة تقريباً.', example: 'am liebsten' },
  ],
  exercises: [
    {
      id: 'ex-freizeit-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الترتيب الصحيح للجملة',
      questionDe: '___',
      options: ['Ich spiele gern Fußball.', 'Ich gern spiele Fußball.', 'Gern ich spiele Fußball.', 'Ich spiele Fußball gern es.'],
      correctIndex: 0,
      explanationAr: 'gern تأتي مباشرة بعد الفعل المصرَّف.',
    },
    {
      id: 'ex-freizeit-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر صيغة المقارنة الصحيحة لـ gern',
      questionDe: 'Ich lese gern, aber ich schwimme ___.',
      options: ['lieber', 'gerner', 'liebe', 'am liebsten'],
      correctIndex: 0,
      explanationAr: 'lieber هي صيغة المقارنة الشاذّة لـ gern، وليس gerner.',
    },
    {
      id: 'ex-freizeit-3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الجملة الصحيحة للتعبير عن حب نشاط',
      questionDe: '___',
      options: ['Ich spiele gern Tennis.', 'Ich mag spielen Tennis.', 'Ich mag Tennis spielen gern.', 'Ich gern mag Tennis.'],
      correctIndex: 0,
      explanationAr: 'للتعبير عن الاستمتاع بنشاط (فعل)، تُستخدم gern مع الفعل، وليس mögen.',
    },
    {
      id: 'ex-freizeit-4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل: ____ spiele ich Basketball. (الأكثر تفضيلاً)',
      sentenceDe: '____ spiele ich Basketball.',
      acceptedAnswers: ['Am liebsten'],
      hint: 'صيغة التفضيل المطلق',
      explanationAr: 'am liebsten هي صيغة التفضيل المطلق الشاذّة لـ gern.',
    },
    {
      id: 'ex-freizeit-5',
      type: 'matching',
      level: 'A1',
      promptAr: 'صل كل هواية بمعناها',
      pairs: [
        { de: 'wandern', ar: 'يتنزّه سيراً' },
        { de: 'malen', ar: 'يرسم' },
        { de: 'Rad fahren', ar: 'يركب الدراجة' },
        { de: 'fotografieren', ar: 'يصوّر' },
      ],
      explanationAr: 'كل هواية من هذه المجموعة لها مقابل واحد محدد بالعربية.',
    },
    {
      id: 'ex-freizeit-6',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Ich', 'höre', 'gern', 'Musik.'],
      correctOrder: [0, 1, 2, 3],
      explanationAr: 'الترتيب الصحيح: "Ich höre gern Musik."',
    },
    {
      id: 'ex-freizeit-7',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '"lieber" ist die regelmäßige Steigerung von "gern".',
      isTrue: false,
      explanationAr: 'خطأ — lieber شكل شاذّ تماماً، وليس gern + er.',
    },
    {
      id: 'ex-freizeit-8',
      type: 'vocab-recall',
      level: 'A1',
      promptAr: 'ما معنى هذه الكلمة؟',
      vocabularyId: 'voc-freizeit-wandern',
      questionDe: 'wandern',
      correctAnswerAr: 'يتنزّه سيراً على الأقدام',
      distractorsAr: ['يسبح', 'يرقص', 'يطبخ'],
      explanationAr: '"wandern" تعني التنزّه سيراً على الأقدام، عادة في الطبيعة أو الجبال.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich gern spiele Fußball.',
      correct: 'Ich spiele gern Fußball.',
      explanationAr: 'gern يجب أن تأتي بعد الفعل المصرَّف مباشرة، وليس قبله.',
    },
    {
      wrong: 'Ich mag spielen Fußball.',
      correct: 'Ich spiele gern Fußball.',
      explanationAr: 'mögen تُستخدم مع اسم مباشرة، وليس مع فعل لوصف الاستمتاع بنشاط؛ استخدم gern + الفعل بدلاً منها.',
    },
    {
      wrong: 'Ich schwimme gerner als lesen.',
      correct: 'Ich schwimme lieber als lesen.',
      explanationAr: 'صيغة المقارنة لـ gern شاذّة تماماً: lieber، وليس gerner.',
    },
    {
      wrong: 'Am meisten gern spiele ich Tennis.',
      correct: 'Am liebsten spiele ich Tennis.',
      explanationAr: 'صيغة التفضيل المطلق الصحيحة هي am liebsten، وهي شكل شاذّ واحد لا يتكوّن من كلمتين منفصلتين.',
    },
  ],
}

export const module17Freizeit: Module = {
  id: 'a1-m17',
  slug: 'freizeit-und-hobbys',
  level: 'A1',
  title: 'Freizeit und Hobbys',
  titleAr: 'أوقات الفراغ والهوايات',
  order: 17,
  lessons: [lessonFreizeit],
}
