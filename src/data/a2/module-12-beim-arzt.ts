import type { Lesson, Module } from '@/types'

export const lessonBeimArzt: Lesson = {
  id: 'a2-m12-l01',
  slug: 'beim-arzt',
  level: 'A2',
  moduleId: 'a2-m12',
  title: 'Beim Arzt',
  titleAr: 'عند الطبيب',
  estimatedMinutes: 30,
  objectivesAr: [
    'حجز موعد طبي ووصف الأعراض بتفصيل أكبر مما تعلّمته في A1',
    'استخدام seit + Dativ مع المضارع البسيط للتعبير عن حالة مستمرة منذ وقت معيّن',
    'التمييز بين هذا التركيب الألماني والتركيب الذي قد تعرفه بلغات أخرى (ماضٍ تام مستمر)',
    'فهم مفردات الصيدلية والوصفات الطبية',
  ],
  explanation: [
    {
      titleAr: 'seit + مضارع بسيط: حالة مستمرة حتى الآن',
      bodyAr:
        'لوصف حالة بدأت في الماضي وما زالت مستمرة حتى الآن، تستخدم الألمانية seit + Dativ مع زمن المضارع البسيط: "Ich habe seit drei Tagen Kopfschmerzen" (حرفياً: لدي صداع منذ ثلاثة أيام، وما زلت أعاني منه الآن). هذا يخالف لغات أخرى قد تستخدم فيها زمناً مركّباً (كالماضي التام المستمر)، فانتبه: لا تستخدم Perfekt هنا أبداً، فالمضارع وحده يكفي لأن الحالة ما زالت قائمة.',
    },
    {
      titleAr: 'wie lange؟ للسؤال عن المدة',
      bodyAr:
        'يُستخدَم السؤال "Wie lange haben Sie schon...؟" (منذ متى لديكم...؟) لسؤال المريض عن مدة استمرار الأعراض، والجواب دائماً بصيغة seit + مدة + مضارع: "Seit einer Woche" (منذ أسبوع).',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-seit-praesens',
      slug: 'seit-plus-praesens',
      level: 'A2',
      titleDe: 'seit + Präsens für andauernde Zustände',
      titleAr: 'seit + المضارع للحالات المستمرة',
      conceptAr: 'حالة بدأت في الماضي وما زالت مستمرة تُوصَف بالمضارع البسيط + seit، وليس بزمن مركّب.',
      ruleAr:
        'استخدم seit + Dativ (المدة أو نقطة البداية) مع فعل في المضارع البسيط لوصف حالة أو نشاط مستمر حتى لحظة الكلام. لا تستخدم Perfekt هنا، فالمضارع البسيط في الألمانية يكفي وحده للدلالة على الاستمرارية عند وجود seit.',
      tables: [
        {
          caption: 'أمثلة seit + مضارع',
          headers: ['الألمانية', 'المعنى'],
          rows: [
            { label: 'Ich habe seit drei Tagen Kopfschmerzen.', values: ['لدي صداع منذ ثلاثة أيام (وما زال مستمراً)'] },
            { label: 'Sie wohnt seit zwei Jahren hier.', values: ['تسكن هنا منذ سنتين (وما زالت تسكن)'] },
            { label: 'Wir warten seit einer Stunde.', values: ['ننتظر منذ ساعة (وما زلنا ننتظر)'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich habe seit gestern Fieber.',
          ar: 'لدي حمّى منذ أمس. (المضارع habe)',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'habe', role: 'الفعل (مضارع)' },
            { text: 'seit gestern', role: 'نقطة البداية' },
            { text: 'Fieber.', role: 'المفعول به' },
          ],
        },
        {
          de: 'Wie lange haben Sie schon diese Schmerzen?',
          ar: 'منذ متى لديكم هذا الألم؟',
          tokens: [
            { text: 'Wie lange', role: 'أداة السؤال عن المدة' },
            { text: 'haben', role: 'الفعل' },
            { text: 'Sie schon diese Schmerzen?', role: 'الفاعل + المفعول به' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Ich möchte einen Termin vereinbaren.', ar: 'أودّ تحديد موعد.' },
    { de: 'Ich habe seit einer Woche Husten.', ar: 'لدي سعال منذ أسبوع.' },
    { de: 'Der Arzt hat mir ein Rezept ausgestellt.', ar: 'كتب لي الطبيب وصفة طبية.' },
    { de: 'Nehmen Sie diese Tabletten dreimal täglich.', ar: 'تناولوا هذه الحبوب ثلاث مرات يومياً.' },
  ],
  vocabulary: [
    { id: 'voc-arzt-termin', word: 'Termin', article: 'der', partOfSpeech: 'noun', meaningAr: 'الموعد', level: 'A2', category: 'عند الطبيب' },
    { id: 'voc-arzt-rezept', word: 'Rezept', article: 'das', partOfSpeech: 'noun', meaningAr: 'الوصفة الطبية', level: 'A2', category: 'عند الطبيب' },
    { id: 'voc-arzt-tablette', word: 'Tablette', article: 'die', partOfSpeech: 'noun', meaningAr: 'الحبّة الدوائية', level: 'A2', category: 'الصيدلية' },
    { id: 'voc-arzt-symptom', word: 'Symptom', article: 'das', partOfSpeech: 'noun', meaningAr: 'العرض (المرضي)', level: 'A2', category: 'عند الطبيب' },
    { id: 'voc-arzt-untersuchung', word: 'Untersuchung', article: 'die', partOfSpeech: 'noun', meaningAr: 'الفحص الطبي', level: 'A2', category: 'عند الطبيب' },
    { id: 'voc-arzt-facharzt', word: 'Facharzt', article: 'der', partOfSpeech: 'noun', meaningAr: 'الطبيب الأخصائي', level: 'A2', category: 'عند الطبيب' },
    { id: 'voc-arzt-versicherung', word: 'Versicherung', article: 'die', partOfSpeech: 'noun', meaningAr: 'التأمين', level: 'A2', category: 'عند الطبيب' },
    { id: 'voc-arzt-vereinbaren', word: 'vereinbaren', partOfSpeech: 'verb', meaningAr: 'يحدّد (موعداً)', level: 'A2', category: 'عند الطبيب' },
  ],
  dialogues: [
    {
      id: 'dialogue-arzt-informell',
      level: 'A2',
      moduleId: 'a2-m12',
      lessonId: 'a2-m12-l01',
      titleDe: 'Einen Termin vereinbaren',
      titleAr: 'حجز موعد هاتفياً',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Sprechstundenhilfe', de: 'Praxis Dr. Kern, guten Tag.', ar: 'عيادة الدكتور كيرن، نهارك سعيد.' },
        { speaker: 'b', name: 'Deniz', de: 'Hallo, ich brauche einen Termin. Ich habe seit drei Tagen Kopfschmerzen.', ar: 'مرحباً، أحتاج موعداً. لدي صداع منذ ثلاثة أيام.' },
        { speaker: 'a', name: 'Sprechstundenhilfe', de: 'Können Sie morgen um 10 Uhr kommen?', ar: 'هل يمكنكم الحضور غداً الساعة العاشرة؟' },
        { speaker: 'b', name: 'Deniz', de: 'Ja, das passt gut. Vielen Dank.', ar: 'نعم، هذا مناسب. شكراً جزيلاً.' },
      ],
    },
    {
      id: 'dialogue-arzt-formell',
      level: 'A2',
      moduleId: 'a2-m12',
      lessonId: 'a2-m12-l01',
      titleDe: 'Bei der Ärztin',
      titleAr: 'الفحص عند الطبيب',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Ärztin', de: 'Wie lange haben Sie schon diese Schmerzen?', ar: 'منذ متى لديكم هذا الألم؟' },
        { speaker: 'b', name: 'Herr Rossi', de: 'Seit ungefähr einer Woche.', ar: 'منذ أسبوع تقريباً.' },
        { speaker: 'a', name: 'Ärztin', de: 'Ich stelle Ihnen ein Rezept aus. Nehmen Sie die Tabletten zweimal täglich.', ar: 'سأكتب لكم وصفة طبية. تناولوا الحبوب مرتين يومياً.' },
        { speaker: 'b', name: 'Herr Rossi', de: 'Verstanden, vielen Dank für die Untersuchung.', ar: 'مفهوم، شكراً جزيلاً على الفحص.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'ch في Untersuchung بعد u', bodyAr: 'حرف ch بعد u الخلفية يُنطق [x] خلفية قوية، أقرب لصوت الخاء.', example: 'Untersuchung' },
    { titleAr: 'V في Versicherung تُنطق [f]', bodyAr: 'حرف V الألماني الأصيل يُنطق [f] دائماً تقريباً.', example: 'Versicherung' },
  ],
  exercises: [
    {
      id: 'ex-arzt-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الزمن الصحيح: Ich ___ seit drei Tagen Kopfschmerzen.',
      questionDe: 'Ich ___ seit drei Tagen Kopfschmerzen.',
      options: ['habe', 'habe gehabt', 'hatte', 'werde haben'],
      correctIndex: 0,
      explanationAr: 'seit + مضارع بسيط تكفي للتعبير عن حالة مستمرة؛ لا حاجة لـ Perfekt.',
    },
    {
      id: 'ex-arzt-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر السؤال الصحيح عن مدة العرض',
      questionDe: '___ haben Sie schon diese Schmerzen?',
      options: ['Wie lange', 'Wie viel', 'Wann', 'Wie oft'],
      correctIndex: 0,
      explanationAr: '"Wie lange" هي أداة السؤال الصحيحة عن المدة.',
    },
    {
      id: 'ex-arzt-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الترجمة الصحيحة لكلمة "الوصفة الطبية"',
      questionDe: '___',
      options: ['das Rezept', 'die Tablette', 'der Termin', 'die Untersuchung'],
      correctIndex: 0,
      explanationAr: 'das Rezept تعني "الوصفة الطبية".',
    },
    {
      id: 'ex-arzt-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل: Sie wohnt ____ zwei Jahren hier. (منذ)',
      sentenceDe: 'Sie wohnt ____ zwei Jahren hier.',
      acceptedAnswers: ['seit'],
      hint: 'حرف جر + مضارع لحالة مستمرة',
      explanationAr: 'seit + مضارع للتعبير عن استمرارية منذ نقطة زمنية.',
    },
    {
      id: 'ex-arzt-5',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Mit "seit" benutzt man im Deutschen normalerweise das Perfekt für andauernde Zustände.',
      isTrue: false,
      explanationAr: 'خطأ — يُستخدَم المضارع البسيط، وليس Perfekt، مع seit للحالات المستمرة.',
    },
    {
      id: 'ex-arzt-6',
      type: 'matching',
      level: 'A2',
      promptAr: 'صل كل كلمة بمعناها',
      pairs: [
        { de: 'der Termin', ar: 'الموعد' },
        { de: 'das Symptom', ar: 'العرض المرضي' },
        { de: 'der Facharzt', ar: 'الطبيب الأخصائي' },
        { de: 'die Versicherung', ar: 'التأمين' },
      ],
      explanationAr: 'كل كلمة من هذه المجموعة لها مقابل واحد محدد بالعربية.',
    },
    {
      id: 'ex-arzt-7',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Ich', 'habe', 'seit', 'gestern', 'Fieber.'],
      correctOrder: [0, 1, 2, 3, 4],
      explanationAr: 'الترتيب الصحيح: "Ich habe seit gestern Fieber."',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich habe seit drei Tagen Kopfschmerzen gehabt.',
      correct: 'Ich habe seit drei Tagen Kopfschmerzen.',
      explanationAr: 'المضارع البسيط وحده كافٍ مع seit للتعبير عن الاستمرارية؛ لا تُستخدَم صيغة Perfekt هنا.',
    },
    {
      wrong: 'Ich hatte seit gestern Fieber.',
      correct: 'Ich habe seit gestern Fieber.',
      explanationAr: 'ما دامت الحالة مستمرة حتى الآن، يجب استخدام المضارع habe، وليس الماضي hatte.',
    },
    {
      wrong: 'Wie lang Zeit haben Sie diese Schmerzen?',
      correct: 'Wie lange haben Sie schon diese Schmerzen?',
      explanationAr: 'أداة السؤال الصحيحة عن المدة هي "Wie lange"، وتُضاف عادة "schon" لتأكيد الاستمرارية.',
    },
  ],
}

export const module12BeimArzt: Module = {
  id: 'a2-m12',
  slug: 'beim-arzt',
  level: 'A2',
  title: 'Beim Arzt',
  titleAr: 'عند الطبيب',
  order: 12,
  lessons: [lessonBeimArzt],
}
