import type { Lesson } from '@/types'

/**
 * Classroom language and communication strategies: what to say when something is not understood, how to ask for
 * a repetition, a meaning or a spelling. The phrases are learned whole (the modal verbs and the Imperativ come
 * later in the course), so only fixed sentences are used and nothing is built from rules the learner has not met.
 */
export const lessonImKurs: Lesson = {
  id: 'a1-m01-l08',
  slug: 'im-deutschkurs',
  level: 'A1',
  moduleId: 'a1-m01',
  title: 'Im Deutschkurs',
  titleAr: 'في دورة الألمانية: عبارات الصف',
  estimatedMinutes: 20,
  objectivesAr: [
    'قول إنك لم تفهم، وطلب الإعادة والكلام الأبطأ',
    'السؤال عن معنى كلمة وعن كتابتها: Was bedeutet das؟ Wie schreibt man das؟',
    'السؤال عن كلمة بالألمانية: Wie heißt das auf Deutsch؟',
    'فهم أوامر المعلم الشائعة: Hören Sie. Lesen Sie. Schreiben Sie.',
  ],
  explanation: [
    {
      titleAr: 'لم أفهم — Wie bitte؟',
      bodyAr:
        'عندما لا تسمع جيداً أو لا تفهم، قل **Wie bitte؟** (ماذا؟ / عفواً؟). وإذا فهمت الكلمات ولم تفهم المعنى: **Ich verstehe das nicht.** (أنا لا أفهم هذا). لاحظ ترتيب الجملة: الفعل في المرتبة الثانية، و**nicht** في آخرها: لا نقول Ich nicht verstehe.',
    },
    {
      titleAr: 'اطلب الإعادة والبطء',
      bodyAr:
        'للإعادة: **Noch einmal, bitte.** (مرة أخرى من فضلك) أو بشكل مهذب **Können Sie das bitte wiederholen؟**. وللكلام الأبطأ: **Langsamer, bitte.** مع المعلم نستعمل Sie (الرسمية)، ومع زميل في الصف نقول Kannst du das wiederholen؟ احفظ هذه الجمل كما هي الآن، وستفهم بناءها عند درس الأفعال المساعدة.',
    },
    {
      titleAr: 'اسأل عن المعنى والكتابة',
      bodyAr:
        'كلمات السؤال التي تعلمتها تعمل هنا: **Was bedeutet das Wort …؟** (ما معنى كلمة …؟)، **Wie heißt das auf Deutsch؟** (ما اسم هذا بالألمانية؟)، **Wie schreibt man das؟** (كيف يُكتب هذا؟)، **Können Sie das buchstabieren؟** (هل يمكنك تهجئته؟). لاحظ: نقول Wie heißt das auf Deutsch؟ وليس Was ist das auf Deutsch؟.',
    },
    {
      titleAr: 'تكلّم مع المعلم',
      bodyAr:
        'للمشاركة: **Ich habe eine Frage.** (عندي سؤال)، **Ich brauche Hilfe.** (أحتاج مساعدة)، **Ich bin fertig.** (انتهيت)، **Ich komme zu spät.** (أتأخر / وصلت متأخراً). والاعتذار قبلها: **Entschuldigung, …**.',
    },
    {
      titleAr: 'أوامر المعلم التي ستسمعها',
      bodyAr:
        'المعلم يتكلم معك بصيغة الأمر الرسمية: **Hören Sie.** (استمع)، **Lesen Sie.** (اقرأ)، **Schreiben Sie.** (اكتب)، **Sprechen Sie.** (تكلّم)، **Wiederholen Sie.** (أعد)، **Machen Sie Übung drei.** (قم بالتمرين الثالث)، **Öffnen Sie das Buch auf Seite zehn.** (افتح الكتاب على الصفحة 10). يكفي الآن أن تفهمها؛ وستتعلم صيغة الأمر كاملة في درس Imperativ.',
    },
  ],
  examples: [
    { de: 'Wie bitte?', ar: 'عفواً؟ (لم أسمع)' },
    { de: 'Ich verstehe das nicht.', ar: 'أنا لا أفهم هذا.' },
    { de: 'Noch einmal, bitte.', ar: 'مرة أخرى من فضلك.' },
    { de: 'Langsamer, bitte.', ar: 'أبطأ من فضلك.' },
    { de: 'Können Sie das bitte wiederholen?', ar: 'هل يمكنك أن تعيد هذا من فضلك؟' },
    { de: 'Was bedeutet das Wort „Feierabend“?', ar: 'ما معنى كلمة «Feierabend»؟' },
    { de: 'Wie heißt das auf Deutsch?', ar: 'ما اسم هذا بالألمانية؟' },
    { de: 'Wie schreibt man das?', ar: 'كيف يُكتب هذا؟' },
    { de: 'Hören Sie bitte und lesen Sie den Text.', ar: 'استمعوا من فضلكم ثم اقرؤوا النص.' },
    { de: 'Machen Sie Übung drei auf Seite zehn.', ar: 'قوموا بالتمرين الثالث في الصفحة العاشرة.' },
  ],
  vocabulary: [
    { id: 'voc-imkurs-wie-bitte', word: 'Wie bitte?', partOfSpeech: 'phrase', meaningAr: 'عفواً؟ / ماذا؟ (لم أسمع جيداً)', level: 'A1', category: 'Im Kurs', example: { de: 'Wie bitte? Ich höre Sie nicht gut.', ar: 'عفواً؟ لا أسمعك جيداً.' } },
    { id: 'voc-imkurs-noch-einmal', word: 'Noch einmal, bitte.', partOfSpeech: 'phrase', meaningAr: 'مرة أخرى من فضلك', level: 'A1', category: 'Im Kurs', example: { de: 'Noch einmal, bitte. Das Wort ist neu für mich.', ar: 'مرة أخرى من فضلك. هذه الكلمة جديدة عليّ.' } },
    { id: 'voc-imkurs-langsamer', word: 'Langsamer, bitte.', partOfSpeech: 'phrase', meaningAr: 'أبطأ من فضلك', level: 'A1', category: 'Im Kurs', example: { de: 'Langsamer, bitte. Ich lerne noch Deutsch.', ar: 'أبطأ من فضلك. ما زلت أتعلم الألمانية.' } },
    { id: 'voc-imkurs-verstehe-nicht', word: 'Ich verstehe das nicht.', partOfSpeech: 'phrase', meaningAr: 'أنا لا أفهم هذا', level: 'A1', category: 'Im Kurs', example: { de: 'Entschuldigung, ich verstehe das nicht.', ar: 'المعذرة، أنا لا أفهم هذا.' } },
    { id: 'voc-imkurs-wiederholen', word: 'Können Sie das wiederholen?', partOfSpeech: 'phrase', meaningAr: 'هل يمكنك إعادة هذا؟', level: 'A1', category: 'Im Kurs', example: { de: 'Entschuldigung, können Sie das bitte wiederholen?', ar: 'المعذرة، هل يمكنك إعادة هذا من فضلك؟' } },
    { id: 'voc-imkurs-was-bedeutet', word: 'Was bedeutet das?', partOfSpeech: 'phrase', meaningAr: 'ما معنى هذا؟', level: 'A1', category: 'Im Kurs', example: { de: 'Was bedeutet das Wort „Hausaufgabe“?', ar: 'ما معنى كلمة «Hausaufgabe»؟' } },
    { id: 'voc-imkurs-wie-heisst-das', word: 'Wie heißt das auf Deutsch?', partOfSpeech: 'phrase', meaningAr: 'ما اسم هذا بالألمانية؟', level: 'A1', category: 'Im Kurs', example: { de: 'Wie heißt das auf Deutsch?', ar: 'ما اسم هذا بالألمانية؟' } },
    { id: 'voc-imkurs-wie-schreibt-man', word: 'Wie schreibt man das?', partOfSpeech: 'phrase', meaningAr: 'كيف يُكتب هذا؟', level: 'A1', category: 'Im Kurs', example: { de: 'Wie schreibt man das? Können Sie das buchstabieren?', ar: 'كيف يُكتب هذا؟ هل يمكنك تهجئته؟' } },
    { id: 'voc-imkurs-habe-eine-frage', word: 'Ich habe eine Frage.', partOfSpeech: 'phrase', meaningAr: 'عندي سؤال', level: 'A1', category: 'Im Kurs', example: { de: 'Entschuldigung, ich habe eine Frage.', ar: 'المعذرة، عندي سؤال.' } },
    { id: 'voc-imkurs-brauche-hilfe', word: 'Ich brauche Hilfe.', partOfSpeech: 'phrase', meaningAr: 'أحتاج إلى مساعدة', level: 'A1', category: 'Im Kurs', example: { de: 'Ich brauche Hilfe bei der Hausaufgabe.', ar: 'أحتاج إلى مساعدة في الواجب.' } },
    { id: 'voc-imkurs-bin-fertig', word: 'Ich bin fertig.', partOfSpeech: 'phrase', meaningAr: 'انتهيت', level: 'A1', category: 'Im Kurs', example: { de: 'Ich bin fertig. Und Sie?', ar: 'انتهيت. وأنتم؟' } },
    { id: 'voc-imkurs-zu-spaet', word: 'Ich komme zu spät.', partOfSpeech: 'phrase', meaningAr: 'أتأخر / أصل متأخراً', level: 'A1', category: 'Im Kurs', example: { de: 'Entschuldigung, ich komme heute zu spät.', ar: 'المعذرة، سأتأخر اليوم.' } },
    { id: 'voc-imkurs-wort', word: 'Wort', article: 'das', plural: 'Wörter', partOfSpeech: 'noun', meaningAr: 'الكلمة', level: 'A1', category: 'Im Kurs', example: { de: 'Ich kenne das Wort nicht.', ar: 'لا أعرف هذه الكلمة.' } },
    { id: 'voc-imkurs-satz', word: 'Satz', article: 'der', plural: 'Sätze', partOfSpeech: 'noun', meaningAr: 'الجملة', level: 'A1', category: 'Im Kurs', example: { de: 'Das ist ein kurzer Satz.', ar: 'هذه جملة قصيرة.' } },
    { id: 'voc-imkurs-seite', word: 'Seite', article: 'die', plural: 'Seiten', partOfSpeech: 'noun', meaningAr: 'الصفحة', level: 'A1', category: 'Im Kurs', example: { de: 'Öffnen Sie bitte das Buch auf Seite zehn.', ar: 'افتحوا الكتاب على الصفحة العاشرة من فضلكم.' } },
    { id: 'voc-imkurs-uebung', word: 'Übung', article: 'die', plural: 'Übungen', partOfSpeech: 'noun', meaningAr: 'التمرين', level: 'A1', category: 'Im Kurs', example: { de: 'Die Übung ist nicht schwer.', ar: 'التمرين ليس صعباً.' } },
    { id: 'voc-imkurs-hausaufgabe', word: 'Hausaufgabe', article: 'die', plural: 'Hausaufgaben', partOfSpeech: 'noun', meaningAr: 'الواجب المنزلي', level: 'A1', category: 'Im Kurs', example: { de: 'Die Hausaufgabe ist für morgen.', ar: 'الواجب المنزلي لغدٍ.' } },
    { id: 'voc-imkurs-pause', word: 'Pause', article: 'die', plural: 'Pausen', partOfSpeech: 'noun', meaningAr: 'الاستراحة', level: 'A1', category: 'Im Kurs', example: { de: 'Wir machen zehn Minuten Pause.', ar: 'نأخذ استراحة عشر دقائق.' } },
  ],
  dialogues: [
    {
      id: 'dialogue-imkurs-formell',
      level: 'A1',
      moduleId: 'a1-m01',
      lessonId: 'a1-m01-l08',
      titleDe: 'Eine Frage an die Lehrerin',
      titleAr: 'سؤال للمعلمة',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Frau Klein', de: 'Lesen Sie bitte den Satz noch einmal.', ar: 'اقرأ الجملة مرة أخرى من فضلك.' },
        { speaker: 'b', name: 'Omar', de: 'Entschuldigung, ich verstehe das nicht.', ar: 'المعذرة، أنا لا أفهم هذا.' },
        { speaker: 'a', name: 'Frau Klein', de: 'Was verstehen Sie nicht?', ar: 'ما الذي لا تفهمه؟' },
        { speaker: 'b', name: 'Omar', de: 'Was bedeutet das Wort „Feierabend“?', ar: 'ما معنى كلمة «Feierabend»؟' },
        { speaker: 'a', name: 'Frau Klein', de: 'Das ist die Zeit nach der Arbeit.', ar: 'هو الوقت بعد انتهاء العمل.' },
        { speaker: 'b', name: 'Omar', de: 'Danke. Wie schreibt man das?', ar: 'شكراً. كيف يُكتب؟' },
      ],
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'نغمة السؤال في Wie bitte؟',
      bodyAr: 'يرتفع الصوت في آخر Wie bitte؟ كما في العربية "عفواً؟". وحرف W يُنطق "ڤ"، وie في Wie تُنطق ياءً طويلة: ڤي بِتِه.',
      example: 'Wie bitte?',
    },
  ],
  exercises: [
    {
      id: 'ex-imkurs-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'ماذا تقول إذا لم تفهم كلمة؟',
      questionDe: '',
      options: ['Ich verstehe das nicht.', 'Auf Wiedersehen!', 'Ich bin fertig.', 'Guten Appetit!'],
      correctIndex: 0,
      explanationAr: 'Ich verstehe das nicht = لا أفهم هذا. الجمل الأخرى لا علاقة لها بعدم الفهم.',
    },
    {
      id: 'ex-imkurs-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'ما معنى Wie heißt das auf Deutsch؟',
      questionDe: '',
      options: ['ما اسم هذا بالألمانية؟', 'ما معنى هذا؟', 'كيف يُكتب هذا؟', 'هل يمكنك أن تعيد؟'],
      correctIndex: 0,
      optionLanguage: 'ar',
      explanationAr: 'Wie heißt das auf Deutsch؟ تسأل عن اسم الشيء بالألمانية.',
    },
    {
      id: 'ex-imkurs-3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ جملة تطلب بها من المعلمة أن تعيد ما قالته؟',
      questionDe: '',
      options: ['Können Sie das bitte wiederholen?', 'Wie schreibt man das?', 'Ich bin fertig.', 'Was bedeutet das?'],
      correctIndex: 0,
      explanationAr: 'wiederholen = يعيد. Können Sie das bitte wiederholen؟ طلب مهذب للإعادة.',
    },
    {
      id: 'ex-imkurs-4',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق كل عبارة بمعناها',
      pairs: [
        { de: 'Wie bitte?', ar: 'عفواً؟ (لم أسمع)' },
        { de: 'Langsamer, bitte.', ar: 'أبطأ من فضلك' },
        { de: 'Was bedeutet das?', ar: 'ما معنى هذا؟' },
        { de: 'Wie schreibt man das?', ar: 'كيف يُكتب هذا؟' },
      ],
      explanationAr: 'هذه أربع عبارات تحتاجها في كل حصة.',
    },
    {
      id: 'ex-imkurs-5',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بالفعل الناقص',
      sentenceDe: 'Wie ___ man das?',
      acceptedAnswers: ['schreibt'],
      hint: 'يكتب',
      explanationAr: 'Wie schreibt man das؟ = كيف يُكتب هذا؟ مع man يأخذ الفعل النهاية -t.',
    },
    {
      id: 'ex-imkurs-6',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بالكلمة الناقصة',
      sentenceDe: 'Entschuldigung, ich habe eine ___.',
      acceptedAnswers: ['Frage'],
      hint: 'سؤال',
      explanationAr: 'Ich habe eine Frage = عندي سؤال.',
    },
    {
      id: 'ex-imkurs-7',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Langsamer, bitte“ bedeutet: Bitte sprechen Sie nicht so schnell.',
      isTrue: true,
      explanationAr: 'صحيح. langsamer = أبطأ، وهي طريقة مهذبة لطلب الكلام ببطء.',
    },
    {
      id: 'ex-imkurs-8',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات لتكوّن سؤالاً مهذباً',
      words: ['wiederholen', 'Sie', 'Können', 'bitte', 'das'],
      correctOrder: [2, 1, 4, 3, 0],
      explanationAr: 'Können Sie das bitte wiederholen؟ الفعل Können في أول السؤال، والفعل wiederholen في آخره.',
    },
    {
      id: 'ex-imkurs-9',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'أنا لا أفهم هذا.',
      acceptedAnswers: ['Ich verstehe das nicht.', 'Ich verstehe das nicht'],
      explanationAr: 'الفعل في المرتبة الثانية، وnicht في آخر الجملة: Ich verstehe das nicht.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Was ist das auf Deutsch?',
      correct: 'Wie heißt das auf Deutsch?',
      explanationAr: 'لسؤال "ما اسم هذا بالألمانية؟" نستعمل Wie heißt … وليس Was ist ….',
    },
    {
      wrong: 'Ich nicht verstehe das.',
      correct: 'Ich verstehe das nicht.',
      explanationAr: 'الفعل يبقى في المرتبة الثانية دائماً، و nicht تأتي بعده وفي آخر الجملة غالباً.',
    },
    {
      wrong: 'Entschuldigung, ich bin spät.',
      correct: 'Entschuldigung, ich komme zu spät.',
      explanationAr: 'للتأخر نقول zu spät kommen، وليس sein spät.',
    },
  ],
}
