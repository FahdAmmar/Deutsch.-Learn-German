import type { Lesson } from '@/types'

export const lessonBegruessungen: Lesson = {
  id: 'a1-m01-l01',
  slug: 'begruessungen',
  level: 'A1',
  moduleId: 'a1-m01',
  title: 'Begrüßungen',
  titleAr: 'التحية',
  estimatedMinutes: 15,
  objectivesAr: [
    'التعرف على أهم عبارات التحية في اللغة الألمانية',
    'التمييز بين التحية الرسمية وغير الرسمية',
    'استخدام عبارات الوداع المناسبة لكل موقف',
  ],
  explanation: [
    {
      titleAr: 'التحية الرسمية وغير الرسمية',
      bodyAr:
        'تختلف التحية في الألمانية باختلاف الوقت من اليوم ودرجة الرسمية. "Guten Morgen" تعني صباح الخير وتُستخدم حتى حوالي العاشرة أو الحادية عشرة صباحاً. "Guten Tag" تحية رسمية تُستخدم خلال النهار مع أي شخص. "Guten Abend" تُستخدم مساءً. أما "Hallo" فهي تحية غير رسمية تصلح في أي وقت من اليوم بين الأصدقاء والمعارف.',
    },
    {
      titleAr: 'الوداع',
      bodyAr:
        '"Auf Wiedersehen" وداع رسمي يُستخدم مع الغرباء أو في العمل. "Tschüss" وداع غير رسمي بين الأصدقاء والعائلة. "Bis bald" تعني "إلى اللقاء قريباً"، و"Gute Nacht" (تصبح على خير) لا تُستخدم كتحية بل فقط عند النوم أو الانصراف ليلاً.',
    },
  ],
  examples: [
    { de: 'Guten Morgen!', ar: 'صباح الخير!' },
    { de: 'Guten Tag, Frau Müller!', ar: 'نهارك سعيد، سيدة مولر!' },
    { de: "Hallo, wie geht's?", ar: 'مرحباً، كيف حالك؟' },
    { de: 'Auf Wiedersehen!', ar: 'إلى اللقاء!' },
    { de: 'Tschüss! Bis morgen!', ar: 'وداعاً! إلى الغد!' },
  ],
  vocabulary: [
    { id: 'voc-begruessungen-hallo', word: 'Hallo', partOfSpeech: 'interjection', meaningAr: 'مرحباً', level: 'A1', category: 'Begrüßungen' },
    { id: 'voc-begruessungen-guten-morgen', word: 'Guten Morgen', partOfSpeech: 'phrase', meaningAr: 'صباح الخير', level: 'A1', category: 'Begrüßungen' },
    { id: 'voc-begruessungen-guten-tag', word: 'Guten Tag', partOfSpeech: 'phrase', meaningAr: 'نهارك سعيد', level: 'A1', category: 'Begrüßungen' },
    { id: 'voc-begruessungen-guten-abend', word: 'Guten Abend', partOfSpeech: 'phrase', meaningAr: 'مساء الخير', level: 'A1', category: 'Begrüßungen' },
    { id: 'voc-begruessungen-auf-wiedersehen', word: 'Auf Wiedersehen', partOfSpeech: 'phrase', meaningAr: 'إلى اللقاء (رسمي)', level: 'A1', category: 'Begrüßungen' },
    { id: 'voc-begruessungen-tschuess', word: 'Tschüss', partOfSpeech: 'interjection', meaningAr: 'وداعاً (غير رسمي)', level: 'A1', category: 'Begrüßungen' },
    {
      id: 'voc-begruessungen-wie-gehts',
      word: "Wie geht's?",
      partOfSpeech: 'phrase',
      meaningAr: 'كيف حالك؟ (غير رسمي)',
      level: 'A1',
      category: 'Begrüßungen',
      example: { de: "Hallo Tom, wie geht's?", ar: 'مرحباً توم، كيف حالك؟' },
    },
    { id: 'voc-begruessungen-danke', word: 'danke', partOfSpeech: 'adverb', meaningAr: 'شكراً', level: 'A1', category: 'Begrüßungen' },
    { id: 'voc-begruessungen-bitte', word: 'bitte', partOfSpeech: 'adverb', meaningAr: 'من فضلك / عفواً', level: 'A1', category: 'Begrüßungen' },
  ],
  exercises: [
    {
      id: 'ex-begruessungen-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أي عبارة تُستخدم للتحية في المساء؟',
      questionDe: '___ ! Wie war dein Tag?',
      options: ['Guten Morgen', 'Guten Abend', 'Gute Nacht', 'Guten Tag'],
      correctIndex: 1,
      explanationAr:
        '"Guten Abend" تُستخدم للتحية في المساء عند اللقاء، بينما "Gute Nacht" تُقال فقط عند النوم أو الوداع ليلاً وليست تحية عند اللقاء.',
    },
    {
      id: 'ex-begruessungen-2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Tschüss" ist eine formelle Verabschiedung.',
      isTrue: false,
      explanationAr:
        '"Tschüss" غير رسمية وتُستخدم بين الأصدقاء والمعارف، أما الوداع الرسمي فهو "Auf Wiedersehen".',
    },
    {
      id: 'ex-begruessungen-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل التحية الصباحية',
      sentenceDe: '___ Morgen! Wie geht\'s?',
      acceptedAnswers: ['Guten'],
      hint: 'التحية الصباحية تتكون من كلمتين: كلمة الوصف + Morgen',
      explanationAr: 'التحية الصباحية الكاملة هي "Guten Morgen".',
    },
    {
      id: 'ex-begruessungen-4',
      type: 'listening',
      level: 'A1',
      promptAr: 'استمع واختر ما سمعت',
      audioText: 'Guten Tag, wie geht es Ihnen?',
      options: ['Guten Tag, wie geht es Ihnen?', 'Guten Abend, bis morgen!', 'Hallo, wie heißt du?', 'Auf Wiedersehen!'],
      correctIndex: 0,
      explanationAr: 'الجملة المسموعة هي تحية رسمية نهارية مع سؤال عن الحال: "Guten Tag, wie geht es Ihnen?".',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Guten Nacht! (عند اللقاء)',
      correct: 'Guten Abend!',
      explanationAr: 'تُستخدم "Gute Nacht" فقط عند النوم أو الانصراف ليلاً، وليست تحية تُقال عند اللقاء.',
    },
    {
      wrong: 'Tschüss (في نهاية رسالة عمل رسمية)',
      correct: 'Mit freundlichen Grüßen',
      explanationAr: 'في السياقات الرسمية يُفضَّل استخدام صيغ ختامية أكثر رسمية بدلاً من "Tschüss".',
    },
  ],
}

export const lessonSichVorstellen: Lesson = {
  id: 'a1-m01-l02',
  slug: 'sich-vorstellen',
  level: 'A1',
  moduleId: 'a1-m01',
  title: 'Sich vorstellen',
  titleAr: 'التعريف بالنفس',
  estimatedMinutes: 15,
  objectivesAr: [
    'تكوين جمل بسيطة للتعريف بالنفس',
    'طرح أسئلة عن الاسم وبلد المنشأ',
    'استخدام الفعلين heißen و kommen في هذا السياق',
  ],
  explanation: [
    {
      titleAr: 'السؤال عن الاسم',
      bodyAr:
        'نستخدم الفعل "heißen" (يُدعى) للسؤال عن الاسم: "Wie heißt du؟" (غير رسمي) أو "Wie heißen Sie؟" (رسمي)، والإجابة تكون: "Ich heiße" + الاسم.',
    },
    {
      titleAr: 'التعريف بالبلد',
      bodyAr:
        'للسؤال عن بلد المنشأ نقول "Woher kommst du؟" (من أين أنتَ؟)، والإجابة: "Ich komme aus" + اسم البلد. لاحظ ضرورة استخدام حرف الجر "aus" مع الفعل "kommen" في هذا السياق.',
    },
  ],
  examples: [
    { de: 'Wie heißt du?', ar: 'ما اسمك؟' },
    { de: 'Ich heiße Anna.', ar: 'اسمي آنا.' },
    { de: 'Woher kommst du?', ar: 'من أين أنتَ؟' },
    { de: 'Ich komme aus Ägypten.', ar: 'أنا من مصر.' },
    { de: 'Ich bin Student.', ar: 'أنا طالب.' },
  ],
  vocabulary: [
    { id: 'voc-sich-vorstellen-heissen', word: 'heißen', partOfSpeech: 'verb', meaningAr: 'يُدعى / اسمه', level: 'A1', category: 'Sich vorstellen', example: { de: 'Ich heiße Omar.', ar: 'اسمي عمر.' } },
    { id: 'voc-sich-vorstellen-kommen', word: 'kommen', partOfSpeech: 'verb', meaningAr: 'يأتي / قادم من', level: 'A1', category: 'Sich vorstellen', example: { de: 'Ich komme aus Jordanien.', ar: 'أنا من الأردن.' } },
    { id: 'voc-sich-vorstellen-name', word: 'Name', article: 'der', plural: 'Namen', partOfSpeech: 'noun', meaningAr: 'الاسم', level: 'A1', category: 'Sich vorstellen' },
    { id: 'voc-sich-vorstellen-land', word: 'Land', article: 'das', plural: 'Länder', partOfSpeech: 'noun', meaningAr: 'البلد', level: 'A1', category: 'Sich vorstellen' },
    { id: 'voc-sich-vorstellen-woher', word: 'Woher?', partOfSpeech: 'phrase', meaningAr: 'من أين؟', level: 'A1', category: 'Sich vorstellen' },
  ],
  exercises: [
    {
      id: 'ex-sich-vorstellen-1',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الجملة',
      sentenceDe: 'Ich ___ Sara.',
      acceptedAnswers: ['heiße'],
      hint: 'تصريف heißen مع "ich"',
      explanationAr: 'مع الضمير "ich" يُصرَّف الفعل heißen إلى "heiße".',
    },
    {
      id: 'ex-sich-vorstellen-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أي سؤال يناسب الإجابة التالية؟',
      questionDe: '„Ich komme aus Marokko."',
      options: ['Wie heißt du?', 'Woher kommst du?', "Wie geht's?", 'Was ist das?'],
      correctIndex: 1,
      explanationAr: 'الإجابة تتحدث عن بلد المنشأ، لذا السؤال المناسب هو "Woher kommst du?".',
    },
    {
      id: 'ex-sich-vorstellen-3',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتب الكلمات لتكوين سؤال صحيح',
      words: ['heißt', '?', 'Wie', 'du'],
      correctOrder: [2, 0, 3, 1],
      explanationAr: 'الترتيب الصحيح: "Wie heißt du?" — أداة الاستفهام أولاً، ثم الفعل، ثم الفاعل.',
    },
    {
      id: 'ex-sich-vorstellen-4',
      type: 'vocab-recall',
      level: 'A1',
      promptAr: 'ما معنى هذه الكلمة؟',
      vocabularyId: 'voc-sich-vorstellen-name',
      questionDe: 'der Name',
      correctAnswerAr: 'الاسم',
      distractorsAr: ['البلد', 'السؤال', 'الصديق'],
      explanationAr: '"der Name" تعني "الاسم"، وهي اسم مذكر (der).',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich bin heiße Tom.',
      correct: 'Ich heiße Tom.',
      explanationAr: 'لا يجوز الجمع بين "bin" و"heiße" في الجملة نفسها؛ استخدم فعلاً واحداً فقط للتعريف بالاسم.',
    },
    {
      wrong: 'Ich komme Ägypten.',
      correct: 'Ich komme aus Ägypten.',
      explanationAr: 'يجب استخدام حرف الجر "aus" مع الفعل kommen عند ذكر بلد المنشأ.',
    },
  ],
}

export const lessonAlphabet: Lesson = {
  id: 'a1-m01-l03',
  slug: 'alphabet',
  level: 'A1',
  moduleId: 'a1-m01',
  title: 'Alphabet',
  titleAr: 'الأبجدية',
  estimatedMinutes: 12,
  objectivesAr: [
    'التعرف على الحروف الأبجدية الألمانية ونطقها',
    'التعرف على الحروف المتحولة (Umlaute: ä ö ü) وحرف ß',
    'تهجئة الكلمات والأسماء بالألمانية',
  ],
  explanation: [
    {
      titleAr: 'الأبجدية والحروف الخاصة',
      bodyAr:
        'تتكون الأبجدية الألمانية من الحروف اللاتينية الـ26 نفسها بالإضافة إلى ثلاثة حروف متحولة (Umlaute): ä، ö، ü، وحرف الإس-تسيت (ß) الذي يُنطق مثل "s" مشدَّدة ولا يظهر أبداً في بداية الكلمة.',
    },
    {
      titleAr: 'التهجئة',
      bodyAr:
        'تُستخدم التهجئة (Buchstabieren) لتوضيح الأسماء، خاصة عبر الهاتف: "Können Sie das buchstabieren?" (هل يمكنك تهجئتها؟).',
    },
  ],
  examples: [
    { de: 'Wie schreibt man das?', ar: 'كيف تُكتب هذه الكلمة؟' },
    { de: 'Können Sie das buchstabieren?', ar: 'هل يمكنك تهجئتها؟' },
    { de: 'Das Wort „schön" hat einen Umlaut.', ar: 'كلمة "schön" تحتوي على حرف متحول.' },
  ],
  vocabulary: [
    { id: 'voc-alphabet-buchstabe', word: 'Buchstabe', article: 'der', plural: 'Buchstaben', partOfSpeech: 'noun', meaningAr: 'الحرف', level: 'A1', category: 'Alphabet' },
    { id: 'voc-alphabet-buchstabieren', word: 'buchstabieren', partOfSpeech: 'verb', meaningAr: 'يتهجّى', level: 'A1', category: 'Alphabet' },
    { id: 'voc-alphabet-alphabet', word: 'Alphabet', article: 'das', partOfSpeech: 'noun', meaningAr: 'الأبجدية', level: 'A1', category: 'Alphabet' },
    { id: 'voc-alphabet-umlaut', word: 'Umlaut', article: 'der', plural: 'Umlaute', partOfSpeech: 'noun', meaningAr: 'الحرف المتحول (ä, ö, ü)', level: 'A1', category: 'Alphabet' },
  ],
  exercises: [
    {
      id: 'ex-alphabet-1',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Der Buchstabe „ß" steht am Wortanfang.',
      isTrue: false,
      explanationAr: 'حرف "ß" لا يظهر أبداً في بداية الكلمة في اللغة الألمانية.',
    },
    {
      id: 'ex-alphabet-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أي كلمة تحتوي على حرف متحول (Umlaut)؟',
      questionDe: '',
      options: ['Haus', 'Straße', 'schön', 'Buch'],
      correctIndex: 2,
      explanationAr: 'كلمة "schön" تحتوي على الحرف المتحول "ö".',
    },
    {
      id: 'ex-alphabet-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الجملة',
      sentenceDe: 'Ä, Ö und Ü heißen ___.',
      acceptedAnswers: ['Umlaute', 'Umlaut'],
      explanationAr: 'تُسمى هذه الحروف الثلاثة "Umlaute" (حروف متحولة).',
    },
  ],
  commonMistakes: [
    {
      wrong: 'نطق "ß" مثل حرف B',
      correct: 'ينطق "ß" مثل حرف "s" مشددة (كما في كلمة Straße)',
      explanationAr: 'حرف ß يُنطق دائماً كصوت "س" وليس "ب"، رغم تشابه شكله مع حرف B في بعض الخطوط.',
    },
  ],
}

export const lessonZahlen: Lesson = {
  id: 'a1-m01-l04',
  slug: 'zahlen',
  level: 'A1',
  moduleId: 'a1-m01',
  title: 'Zahlen',
  titleAr: 'الأرقام',
  estimatedMinutes: 18,
  objectivesAr: [
    'عد الأرقام من صفر إلى عشرين، والعشرات حتى المئة',
    'تكوين الأرقام المركبة مثل 21 و23',
    'استخدام الأرقام في جمل بسيطة عن العمر والكمية',
  ],
  explanation: [
    {
      titleAr: 'الأرقام من 0 إلى 12',
      bodyAr: 'null، eins، zwei، drei، vier، fünf، sechs، sieben، acht، neun، zehn، elf، zwölf — أرقام أساسية لها أشكال فريدة يجب حفظها مباشرة.',
    },
    {
      titleAr: 'من 13 إلى 19',
      bodyAr:
        'تُبنى بإضافة "-zehn" إلى الرقم الأساسي: dreizehn (13)، vierzehn (14)، fünfzehn (15). استثناءان مهمان: sechzehn (16، تُحذف حرف s من sechs) وsiebzehn (17، تُحذف "en" من sieben).',
    },
    {
      titleAr: 'العشرات والأرقام المركبة',
      bodyAr:
        'تُبنى العشرات بإضافة "-zig": zwanzig (20)، vierzig (40)... باستثناء dreißig (30، بحرف ß بدلاً من zig). أما الأرقام المركبة فتُقرأ الآحاد أولاً ثم العشرات، وتُربط بأداة "und": einundzwanzig (21) = eins + und + zwanzig.',
    },
  ],
  examples: [
    { de: 'Ich bin zwanzig Jahre alt.', ar: 'عمري عشرون عاماً.' },
    { de: 'Er hat drei Kinder.', ar: 'لديه ثلاثة أطفال.' },
    { de: 'Die Zahl einundzwanzig kommt nach zwanzig.', ar: 'الرقم واحد وعشرون يأتي بعد عشرين.' },
  ],
  vocabulary: [
    { id: 'voc-zahlen-eins', word: 'eins', partOfSpeech: 'number', meaningAr: 'واحد', level: 'A1', category: 'Zahlen' },
    { id: 'voc-zahlen-zwei', word: 'zwei', partOfSpeech: 'number', meaningAr: 'اثنان', level: 'A1', category: 'Zahlen' },
    { id: 'voc-zahlen-drei', word: 'drei', partOfSpeech: 'number', meaningAr: 'ثلاثة', level: 'A1', category: 'Zahlen' },
    { id: 'voc-zahlen-zehn', word: 'zehn', partOfSpeech: 'number', meaningAr: 'عشرة', level: 'A1', category: 'Zahlen' },
    { id: 'voc-zahlen-zwanzig', word: 'zwanzig', partOfSpeech: 'number', meaningAr: 'عشرون', level: 'A1', category: 'Zahlen' },
    { id: 'voc-zahlen-hundert', word: 'hundert', partOfSpeech: 'number', meaningAr: 'مئة', level: 'A1', category: 'Zahlen' },
    { id: 'voc-zahlen-die-zahl', word: 'Zahl', article: 'die', plural: 'Zahlen', partOfSpeech: 'noun', meaningAr: 'الرقم', level: 'A1', category: 'Zahlen' },
    { id: 'voc-zahlen-jahr', word: 'Jahr', article: 'das', plural: 'Jahre', partOfSpeech: 'noun', meaningAr: 'السنة/العام', level: 'A1', category: 'Zahlen' },
  ],
  exercises: [
    {
      id: 'ex-zahlen-1',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'اكتب الرقم 23 بالألمانية',
      sentenceDe: 'Ich bin ___ Jahre alt.',
      acceptedAnswers: ['dreiundzwanzig'],
      hint: 'الآحاد أولاً (drei) ثم und ثم العشرات (zwanzig)',
      explanationAr: 'الرقم 23 يُكتب "dreiundzwanzig" (drei + und + zwanzig).',
    },
    {
      id: 'ex-zahlen-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'كيف يُكتب الرقم 16 بالألمانية؟',
      questionDe: '',
      options: ['sechzehn', 'sechszehn', 'sechsehn', 'sechzen'],
      correctIndex: 0,
      explanationAr: 'الرقم 16 هو استثناء: تُحذف حرف "s" من "sechs" فيصبح "sechzehn" وليس "sechszehn".',
    },
    {
      id: 'ex-zahlen-3',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتب الأرقام تصاعدياً',
      words: ['zehn', 'zwei', 'fünf', 'acht'],
      correctOrder: [1, 2, 3, 0],
      explanationAr: 'الترتيب التصاعدي: zwei (2)، fünf (5)، acht (8)، zehn (10).',
    },
  ],
  commonMistakes: [
    {
      wrong: 'sechszehn',
      correct: 'sechzehn',
      explanationAr: 'الرقم 16 استثناء: تُحذف حرف s من "sechs" قبل إضافة "-zehn".',
    },
    {
      wrong: 'siebenzehn',
      correct: 'siebzehn',
      explanationAr: 'الرقم 17 استثناء: تُحذف "en" من "sieben" قبل إضافة "-zehn".',
    },
    {
      wrong: 'zwanzigeins (لكتابة 21)',
      correct: 'einundzwanzig',
      explanationAr: 'في الأرقام المركبة تُقرأ الآحاد قبل العشرات دائماً، وتُربط بأداة "und".',
    },
  ],
}

export const lessonPersonalpronomen: Lesson = {
  id: 'a1-m01-l05',
  slug: 'personalpronomen',
  level: 'A1',
  moduleId: 'a1-m01',
  title: 'Personalpronomen',
  titleAr: 'ضمائر الفاعل',
  estimatedMinutes: 15,
  objectivesAr: [
    'التعرف على جميع ضمائر الفاعل في اللغة الألمانية',
    'التمييز بين صيغة "du" غير الرسمية وصيغة "Sie" الرسمية',
    'استخدام الضمير المناسب حسب الموقف',
  ],
  explanation: [
    {
      titleAr: 'ضمائر الفاعل',
      bodyAr:
        'ich (أنا) — du (أنتَ/أنتِ، غير رسمي) — er (هو) — sie (هي) — es (هو/هي لغير العاقل حسب الجنس النحوي) — wir (نحن) — ihr (أنتم، جمع غير رسمي) — sie (هم/هن) — Sie (صيغة الاحترام، تُكتب دائماً بحرف كبير).',
    },
    {
      titleAr: 'du مقابل Sie',
      bodyAr:
        'تُستخدم "du" مع الأصدقاء والعائلة والأطفال، بينما تُستخدم "Sie" (بحرف S كبير) في المواقف الرسمية مثل التحدث مع شخص غريب أو في بيئة العمل، وتُصرَّف الأفعال معها كما تُصرَّف مع "sie" (هم).',
    },
  ],
  examples: [
    { de: 'Ich lerne Deutsch.', ar: 'أنا أتعلم الألمانية.' },
    { de: 'Du bist mein Freund.', ar: 'أنتَ صديقي.' },
    { de: 'Wir kommen aus Syrien.', ar: 'نحن من سوريا.' },
    { de: 'Sprechen Sie Englisch?', ar: 'هل تتحدث الإنجليزية؟ (رسمي)' },
  ],
  vocabulary: [
    { id: 'voc-personalpronomen-ich', word: 'ich', partOfSpeech: 'pronoun', meaningAr: 'أنا', level: 'A1', category: 'Personalpronomen' },
    { id: 'voc-personalpronomen-du', word: 'du', partOfSpeech: 'pronoun', meaningAr: 'أنتَ/أنتِ (غير رسمي)', level: 'A1', category: 'Personalpronomen' },
    { id: 'voc-personalpronomen-er', word: 'er', partOfSpeech: 'pronoun', meaningAr: 'هو', level: 'A1', category: 'Personalpronomen' },
    { id: 'voc-personalpronomen-sie', word: 'sie', partOfSpeech: 'pronoun', meaningAr: 'هي / هم', level: 'A1', category: 'Personalpronomen' },
    { id: 'voc-personalpronomen-wir', word: 'wir', partOfSpeech: 'pronoun', meaningAr: 'نحن', level: 'A1', category: 'Personalpronomen' },
    { id: 'voc-personalpronomen-ihr', word: 'ihr', partOfSpeech: 'pronoun', meaningAr: 'أنتم (جمع غير رسمي)', level: 'A1', category: 'Personalpronomen' },
    { id: 'voc-personalpronomen-Sie', word: 'Sie', partOfSpeech: 'pronoun', meaningAr: 'حضرتك/حضرتكم (صيغة الاحترام)', level: 'A1', category: 'Personalpronomen' },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-personalpronomen',
      slug: 'personalpronomen',
      level: 'A1',
      titleDe: 'Personalpronomen',
      titleAr: 'ضمائر الفاعل',
      conceptAr: 'ضمائر تحل محل الفاعل في الجملة، ولكل منها استخدام محدد حسب العدد ودرجة الرسمية.',
      ruleAr:
        'يوجد في الألمانية 9 صيغ لضمائر الفاعل. صيغة الاحترام "Sie" تُكتب دائماً بحرف كبير للتمييز بينها وبين "sie" (هي/هم).',
      tables: [
        {
          caption: 'ضمائر الفاعل في الألمانية',
          headers: ['الضمير', 'المعنى بالعربية'],
          rows: [
            { label: 'ich', values: ['أنا'] },
            { label: 'du', values: ['أنتَ/أنتِ (غير رسمي)'] },
            { label: 'er / sie / es', values: ['هو / هي / هو-هي (غير عاقل)'] },
            { label: 'wir', values: ['نحن'] },
            { label: 'ihr', values: ['أنتم (جمع، غير رسمي)'] },
            { label: 'sie', values: ['هم/هن'] },
            { label: 'Sie', values: ['حضرتك/حضرتكم (رسمي، بحرف كبير دائماً)'] },
          ],
        },
      ],
      examples: [
        { de: 'Ich lerne Deutsch.', ar: 'أنا أتعلم الألمانية.' },
        { de: 'Sprechen Sie Englisch?', ar: 'هل تتحدث الإنجليزية؟ (رسمي)' },
      ],
      commonMistakes: [
        {
          wrong: 'sie (بحرف صغير) بمعنى صيغة الاحترام',
          correct: 'Sie (بحرف كبير دائماً)',
          explanationAr: 'صيغة المخاطب الرسمي "Sie" تُكتب دائماً بحرف كبير في بداية الكلمة، أينما وردت في الجملة.',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'ex-personalpronomen-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أي ضمير يُستخدم في المواقف الرسمية؟',
      questionDe: '',
      options: ['du', 'ihr', 'Sie', 'er'],
      correctIndex: 2,
      explanationAr: 'يُستخدم ضمير "Sie" (بحرف كبير) في المواقف الرسمية بغض النظر عن عدد المخاطَبين.',
    },
    {
      id: 'ex-personalpronomen-2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„sie" (klein geschrieben) kann sowohl „sie" (Einzahl, feminin) als auch „sie" (Mehrzahl) bedeuten.',
      isTrue: true,
      explanationAr: 'صحيح، الضمير "sie" بحرف صغير له معنيان حسب السياق: هي (مفرد مؤنث) أو هم/هن (جمع).',
    },
    {
      id: 'ex-personalpronomen-3',
      type: 'matching',
      level: 'A1',
      promptAr: 'صل كل ضمير بمعناه',
      pairs: [
        { de: 'ich', ar: 'أنا' },
        { de: 'wir', ar: 'نحن' },
        { de: 'du', ar: 'أنتَ' },
        { de: 'ihr', ar: 'أنتم' },
      ],
      explanationAr: 'كل ضمير من ضمائر الفاعل له مقابل واحد محدد بالعربية.',
    },
    {
      id: 'ex-personalpronomen-4',
      type: 'translation',
      level: 'A1',
      direction: 'ar-to-de',
      promptAr: 'ترجم الجملة التالية إلى الألمانية',
      sourceText: 'نحن نتعلم الألمانية.',
      acceptedAnswers: ['Wir lernen Deutsch', 'Wir lernen Deutsch.'],
      explanationAr: '"نحن" = wir، والفعل lernen يُصرَّف مع wir بدون تغيير عن صيغة المصدر: "Wir lernen Deutsch."',
    },
  ],
  commonMistakes: [
    {
      wrong: 'sie sind Lehrer (بمعنى: حضرتك معلم)',
      correct: 'Sie sind Lehrer.',
      explanationAr: 'يجب كتابة "Sie" بحرف كبير دائماً عند استخدامها كصيغة مخاطب رسمي، حتى في وسط الجملة.',
    },
    {
      wrong: 'استخدام "du" مع شخص غريب في موقف رسمي',
      correct: 'استخدام "Sie" في المواقف الرسمية أو مع الغرباء',
      explanationAr: 'اختيار الضمير الخاطئ قد يبدو غير مهذَّب في الثقافة الألمانية؛ "du" تقتصر على العلاقات القريبة أو غير الرسمية.',
    },
  ],
}

export const module01Grundlagen = {
  id: 'a1-m01',
  slug: 'grundlagen',
  level: 'A1' as const,
  title: 'Grundlagen',
  titleAr: 'الأساسيات',
  order: 1,
  lessons: [
    lessonBegruessungen,
    lessonSichVorstellen,
    lessonAlphabet,
    lessonZahlen,
    lessonPersonalpronomen,
  ],
}
