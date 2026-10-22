import type { Lesson } from '@/types'

import { lessonWochentage } from './lesson-wochentage'

export const lessonFamilie: Lesson = {
  id: 'a1-m02-l01',
  slug: 'familie',
  level: 'A1',
  moduleId: 'a1-m02',
  title: 'Familie',
  titleAr: 'العائلة',
  estimatedMinutes: 15,
  objectivesAr: [
    'تسمية أفراد العائلة الأساسيين بالألمانية',
    'التعرف على الجنس النحوي (der/die/das) لأسماء أفراد العائلة',
    'استخدام صفتَي الملكية "mein" و"meine" في جمل بسيطة',
  ],
  explanation: [
    {
      titleAr: 'أفراد العائلة',
      bodyAr:
        'لكل اسم في الألمانية جنس نحوي يجب حفظه معه: "die Mutter" (الأم)، "der Vater" (الأب)، "der Bruder" (الأخ)، "die Schwester" (الأخت)، "das Kind" (الطفل). كلمة "Eltern" (الوالدان) و"Geschwister" (الإخوة والأخوات) تُستخدمان غالباً بصيغة الجمع فقط.',
    },
    {
      titleAr: 'صفة الملكية mein / meine',
      bodyAr:
        'نستخدم "mein" مع الأسماء المذكرة والمحايدة (der/das)، و"meine" مع الأسماء المؤنثة (die): "mein Vater"، "mein Kind"، لكن "meine Mutter"، "meine Schwester". هذا يظهر جلياً أهمية حفظ جنس كل اسم عند تعلّمه.',
    },
  ],
  examples: [
    { de: 'Das ist meine Mutter.', ar: 'هذه أمي.' },
    { de: 'Mein Vater ist 50 Jahre alt.', ar: 'عمر أبي 50 عاماً.' },
    { de: 'Ich habe einen Bruder und zwei Schwestern.', ar: 'لدي أخ وأختان.' },
    { de: 'Wie viele Geschwister hast du?', ar: 'كم عدد إخوتك وأخواتك؟' },
  ],
  vocabulary: [
    { id: 'voc-familie-familie', word: 'Familie', article: 'die', plural: 'Familien', partOfSpeech: 'noun', meaningAr: 'العائلة', level: 'A1', category: 'Familie', example: { de: 'Das ist meine Familie.', ar: 'هذه عائلتي.' } },
    { id: 'voc-familie-mutter', word: 'Mutter', article: 'die', plural: 'Mütter', partOfSpeech: 'noun', meaningAr: 'الأم', level: 'A1', category: 'Familie', example: { de: 'Meine Mutter heißt Laila.', ar: 'اسم أمي ليلى.' } },
    { id: 'voc-familie-vater', word: 'Vater', article: 'der', plural: 'Väter', partOfSpeech: 'noun', meaningAr: 'الأب', level: 'A1', category: 'Familie', example: { de: 'Mein Vater ist Lehrer.', ar: 'أبي معلّم.' } },
    { id: 'voc-familie-bruder', word: 'Bruder', article: 'der', plural: 'Brüder', partOfSpeech: 'noun', meaningAr: 'الأخ', level: 'A1', category: 'Familie', example: { de: 'Mein Bruder heißt Omar.', ar: 'اسم أخي عمر.' } },
    { id: 'voc-familie-schwester', word: 'Schwester', article: 'die', plural: 'Schwestern', partOfSpeech: 'noun', meaningAr: 'الأخت', level: 'A1', category: 'Familie', example: { de: 'Meine Schwester ist Studentin.', ar: 'أختي طالبة جامعية.' } },
    { id: 'voc-familie-kind', word: 'Kind', article: 'das', plural: 'Kinder', partOfSpeech: 'noun', meaningAr: 'الطفل', level: 'A1', category: 'Familie', example: { de: 'Das Kind heißt Mia.', ar: 'اسم الطفلة ميا.' } },
    { id: 'voc-familie-eltern', word: 'Eltern', article: 'die', numberUse: 'only', partOfSpeech: 'noun', meaningAr: 'الوالدان (جمع فقط)', level: 'A1', category: 'Familie', example: { de: 'Meine Eltern wohnen in Köln.', ar: 'والداي يسكنان في كولونيا.' } },
    { id: 'voc-familie-geschwister', word: 'Geschwister', article: 'die', numberUse: 'only', partOfSpeech: 'noun', meaningAr: 'الإخوة والأخوات (جمع فقط)', level: 'A1', category: 'Familie', example: { de: 'Ich habe zwei Geschwister.', ar: 'عندي أخوان اثنان (إخوة أو أخوات).' } },
  ],
  exercises: [
    {
      id: 'ex-familie-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الأداة الصحيحة',
      questionDe: '___ Mutter ist Lehrerin.',
      options: ['Mein', 'Meine', 'Meinen', 'Meins'],
      correctIndex: 1,
      explanationAr: '"Mutter" اسم مؤنث (die)، لذا تُستخدم معها "meine" وليس "mein".',
    },
    {
      id: 'ex-familie-2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بصفة الملكية المناسبة',
      sentenceDe: 'Das ist ___ Bruder.',
      acceptedAnswers: ['mein'],
      hint: '"Bruder" اسم مذكر (der)',
      explanationAr: '"Bruder" مذكر، لذا نستخدم "mein" وليس "meine".',
    },
    {
      id: 'ex-familie-3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Geschwister" wird nur im Plural benutzt.',
      isTrue: true,
      explanationAr: 'صحيح، كلمة "Geschwister" تُستخدم دائماً بصيغة الجمع، ولا يوجد لها مفرد منفصل بهذا اللفظ.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'der Mutter',
      correct: 'die Mutter',
      explanationAr: 'كلمة "Mutter" مؤنثة دائماً، فأداتها الصحيحة هي "die" وليس "der".',
    },
    {
      wrong: 'mein Schwester',
      correct: 'meine Schwester',
      explanationAr: 'بما أن "Schwester" اسم مؤنث، يجب استخدام "meine" بدلاً من "mein".',
    },
  ],
}

export const lessonBerufe: Lesson = {
  id: 'a1-m02-l02',
  slug: 'berufe',
  level: 'A1',
  moduleId: 'a1-m02',
  title: 'Berufe',
  titleAr: 'المهن',
  estimatedMinutes: 15,
  objectivesAr: [
    'تسمية المهن الشائعة بصيغتيها المذكرة والمؤنثة',
    'السؤال عن مهنة شخص والإجابة عنها',
    'استخدام أسماء المهن بدون أداة نكرة بعد الفعل sein',
  ],
  explanation: [
    {
      titleAr: 'الصيغة المذكرة والمؤنثة للمهن',
      bodyAr:
        'تُبنى الصيغة المؤنثة لمعظم المهن بإضافة "-in" إلى الصيغة المذكرة: "der Lehrer" ← "die Lehrerin"، "der Student" ← "die Studentin". بعض المهن تتغيّر صيغتها بشكل أكبر مثل "der Arzt" ← "die Ärztin" (مع تحول حرف a إلى ä).',
    },
    {
      titleAr: 'عدم استخدام أداة النكرة مع المهنة',
      bodyAr:
        'خلافاً للعربية والإنجليزية، لا تُستخدم أداة النكرة "ein/eine" عادة مع اسم المهنة بعد فعل "sein": نقول "Ich bin Lehrer" وليس "Ich bin ein Lehrer". تُستخدم الأداة فقط إذا كانت المهنة موصوفة بصفة: "Ich bin ein guter Lehrer".',
    },
  ],
  examples: [
    { de: 'Was bist du von Beruf?', ar: 'ما مهنتك؟' },
    { de: 'Ich bin Ärztin.', ar: 'أنا طبيبة.' },
    { de: 'Er ist Ingenieur.', ar: 'هو مهندس.' },
    { de: 'Sie arbeitet als Krankenschwester.', ar: 'هي تعمل كممرضة.' },
  ],
  vocabulary: [
    { id: 'voc-berufe-beruf', word: 'Beruf', article: 'der', plural: 'Berufe', partOfSpeech: 'noun', meaningAr: 'المهنة', level: 'A1', category: 'Berufe', example: { de: 'Was ist dein Beruf?', ar: 'ما هي مهنتك؟' } },
    { id: 'voc-berufe-lehrer', word: 'Lehrer / Lehrerin', article: 'der', plural: 'Lehrer / Lehrerinnen', partOfSpeech: 'noun', meaningAr: 'معلّم / معلّمة', level: 'A1', category: 'Berufe', example: { de: 'Er ist Lehrer, sie ist Lehrerin.', ar: 'هو معلّم وهي معلّمة.' } },
    { id: 'voc-berufe-arzt', word: 'Arzt / Ärztin', article: 'der', plural: 'Ärzte / Ärztinnen', partOfSpeech: 'noun', meaningAr: 'طبيب / طبيبة', level: 'A1', category: 'Berufe', example: { de: 'Meine Schwester ist Ärztin.', ar: 'أختي طبيبة.' } },
    { id: 'voc-berufe-ingenieur', word: 'Ingenieur / Ingenieurin', article: 'der', plural: 'Ingenieure / Ingenieurinnen', partOfSpeech: 'noun', meaningAr: 'مهندس / مهندسة', level: 'A1', category: 'Berufe', example: { de: 'Mein Bruder ist Ingenieur.', ar: 'أخي مهندس.' } },
    { id: 'voc-berufe-student', word: 'Student / Studentin', article: 'der', plural: 'Studenten / Studentinnen', partOfSpeech: 'noun', meaningAr: 'طالب / طالبة (جامعي)', level: 'A1', category: 'Berufe', example: { de: 'Ich bin Student in Berlin.', ar: 'أنا طالب جامعي في برلين.' } },
    { id: 'voc-berufe-arbeiten', word: 'arbeiten', partOfSpeech: 'verb', meaningAr: 'يعمل', level: 'A1', category: 'Berufe', verb: { praeteritum: 'arbeitete', partizip: 'gearbeitet', auxiliary: 'haben' }, example: { de: 'Ich arbeite in Berlin.', ar: 'أعمل في برلين.' } },
  ],
  exercises: [
    {
      id: 'ex-berufe-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'ما الصيغة المؤنثة لكلمة "Lehrer"؟',
      questionDe: '',
      options: ['Lehrerin', 'Lehrerine', 'Lehrern', 'Lehrera'],
      correctIndex: 0,
      explanationAr: 'تُبنى الصيغة المؤنثة بإضافة "-in" إلى الصيغة المذكرة: Lehrer ← Lehrerin.',
    },
    {
      id: 'ex-berufe-2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Ich bin ein Lehrer" ist die typische Standardform.',
      isTrue: false,
      explanationAr: 'الصيغة المعتادة بدون صفة هي "Ich bin Lehrer" بدون أداة نكرة.',
    },
    {
      id: 'ex-berufe-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الجملة',
      sentenceDe: 'Ich bin ___. (طبيبة)',
      acceptedAnswers: ['Ärztin'],
      explanationAr: 'الصيغة المؤنثة لكلمة "Arzt" هي "Ärztin".',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich bin eine Lehrerin arbeiten.',
      correct: 'Ich bin Lehrerin. / Ich arbeite als Lehrerin.',
      explanationAr: 'لا يصح الجمع بين "sein" والفعل "arbeiten" في جملة واحدة دون رابط صحيح؛ استخدم إحدى الصيغتين المنفصلتين.',
    },
    {
      wrong: 'Er ist Krankenschwester.',
      correct: 'Er ist Krankenpfleger. / Sie ist Krankenschwester.',
      explanationAr: '"Krankenschwester" صيغة مؤنثة فقط؛ الصيغة المذكرة المقابلة هي "Krankenpfleger".',
    },
  ],
}

export const lessonTagesablauf: Lesson = {
  id: 'a1-m02-l03',
  slug: 'tagesablauf',
  level: 'A1',
  moduleId: 'a1-m02',
  title: 'Tagesablauf',
  titleAr: 'الروتين اليومي',
  estimatedMinutes: 18,
  objectivesAr: [
    'وصف روتين يومي بسيط باستخدام أفعال منفصلة (trennbare Verben)',
    'ترتيب الأحداث زمنياً باستخدام zuerst / dann / danach',
    'وضع الفعل المنفصل الملحق في نهاية الجملة بشكل صحيح',
  ],
  explanation: [
    {
      titleAr: 'الأفعال المنفصلة (trennbare Verben)',
      bodyAr:
        'بعض الأفعال الألمانية تتكون من بادئة + فعل أساسي، وتنفصل البادئة عن الفعل وتنتقل إلى نهاية الجملة عند التصريف في المضارع: "aufstehen" (يستيقظ) ← "Ich stehe um sieben Uhr auf."، حيث تبقى "auf" في آخر الجملة.',
    },
    {
      titleAr: 'ترتيب الأحداث',
      bodyAr:
        'نستخدم "zuerst" (أولاً)، "dann" (ثم)، "danach" (بعد ذلك) لربط أحداث الروتين اليومي زمنياً: "Zuerst stehe ich auf, dann frühstücke ich, danach arbeite ich."',
    },
  ],
  examples: [
    { de: 'Ich stehe um sieben Uhr auf.', ar: 'أستيقظ الساعة السابعة.' },
    { de: 'Dann frühstücke ich.', ar: 'ثم أتناول الفطور.' },
    { de: 'Danach arbeite ich bis fünf Uhr.', ar: 'بعد ذلك أعمل حتى الساعة الخامسة.' },
    { de: 'Am Abend sehe ich fern.', ar: 'في المساء أشاهد التلفاز.' },
  ],
  vocabulary: [
    { id: 'voc-tagesablauf-aufstehen', word: 'aufstehen', partOfSpeech: 'verb', meaningAr: 'يستيقظ / ينهض', level: 'A1', category: 'Tagesablauf', verb: { praeteritum: 'stand', partizip: 'aufgestanden', auxiliary: 'sein', separablePrefix: 'auf' }, example: { de: 'Ich stehe früh auf.', ar: 'أستيقظ باكراً.' } },
    { id: 'voc-tagesablauf-fruehstuecken', word: 'frühstücken', partOfSpeech: 'verb', meaningAr: 'يتناول الفطور', level: 'A1', category: 'Tagesablauf', verb: { praeteritum: 'frühstückte', partizip: 'gefrühstückt', auxiliary: 'haben' }, example: { de: 'Ich frühstücke um sieben Uhr.', ar: 'أتناول الفطور في الساعة السابعة.' } },
    { id: 'voc-tagesablauf-arbeiten', word: 'arbeiten', partOfSpeech: 'verb', meaningAr: 'يعمل', level: 'A1', category: 'Tagesablauf', verb: { praeteritum: 'arbeitete', partizip: 'gearbeitet', auxiliary: 'haben' }, example: { de: 'Er arbeitet von Montag bis Freitag.', ar: 'يعمل من الاثنين إلى الجمعة.' } },
    { id: 'voc-tagesablauf-schlafen', word: 'schlafen', partOfSpeech: 'verb', meaningAr: 'ينام', level: 'A1', category: 'Tagesablauf', verb: { present: ['schlafe', 'schläfst', 'schläft', 'schlafen', 'schlaft', 'schlafen'], praeteritum: 'schlief', partizip: 'geschlafen', auxiliary: 'haben' }, example: { de: 'Das Kind schläft.', ar: 'الطفل نائم.' } },
    { id: 'voc-tagesablauf-morgen', word: 'Morgen', article: 'der', plural: 'Morgen', partOfSpeech: 'noun', meaningAr: 'الصباح', level: 'A1', category: 'Tagesablauf', example: { de: 'Am Morgen trinke ich Kaffee.', ar: 'في الصباح أشرب القهوة.' } },
    { id: 'voc-tagesablauf-abend', word: 'Abend', article: 'der', plural: 'Abende', partOfSpeech: 'noun', meaningAr: 'المساء', level: 'A1', category: 'Tagesablauf', example: { de: 'Am Abend sehe ich fern.', ar: 'في المساء أشاهد التلفاز.' } },
    { id: 'voc-tagesablauf-dann', word: 'dann', partOfSpeech: 'adverb', meaningAr: 'ثم', level: 'A1', category: 'Tagesablauf', example: { de: 'Zuerst esse ich, dann arbeite ich.', ar: 'أولاً آكل، ثم أعمل.' } },
  ],
  exercises: [
    {
      id: 'ex-tagesablauf-1',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['auf', 'Ich', 'sieben', 'um', 'Uhr', 'stehe'],
      correctOrder: [1, 5, 3, 2, 4, 0],
      explanationAr: 'الترتيب الصحيح: "Ich stehe um sieben Uhr auf." — البادئة المنفصلة "auf" تنتقل إلى نهاية الجملة.',
    },
    {
      id: 'ex-tagesablauf-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أين تقع البادئة "auf" من فعل "aufstehen" في المضارع؟',
      questionDe: '',
      options: ['في بداية الجملة', 'في نهاية الجملة', 'قبل الفعل مباشرة', 'لا تنفصل أبداً'],
      correctIndex: 1,
      explanationAr: 'في الأفعال المنفصلة، تنتقل البادئة إلى نهاية الجملة الرئيسية عند تصريف الفعل في المضارع.',
    },
    {
      id: 'ex-tagesablauf-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الجملة بالكلمة المناسبة',
      sentenceDe: 'Zuerst stehe ich auf, ___ frühstücke ich.',
      acceptedAnswers: ['dann'],
      explanationAr: '"dann" (ثم) تربط الحدث الثاني بالحدث الأول في تسلسل الروتين اليومي.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich aufstehe um sieben Uhr.',
      correct: 'Ich stehe um sieben Uhr auf.',
      explanationAr: 'لا يُستخدم الفعل المنفصل ككتلة واحدة في المضارع؛ يجب فصل البادئة "auf" ووضعها في نهاية الجملة.',
    },
    {
      wrong: 'Ich stehe auf um sieben Uhr.',
      correct: 'Ich stehe um sieben Uhr auf.',
      explanationAr: 'البادئة المنفصلة تنتقل إلى آخر الجملة تماماً، وليس مباشرة بعد الفعل.',
    },
  ],
}

export const lessonUhrzeit: Lesson = {
  id: 'a1-m02-l04',
  slug: 'uhrzeit',
  level: 'A1',
  moduleId: 'a1-m02',
  title: 'Uhrzeit',
  titleAr: 'الوقت',
  estimatedMinutes: 18,
  objectivesAr: [
    'السؤال عن الوقت والإجابة عنه',
    'التمييز بين الوقت الرسمي (24 ساعة) وغير الرسمي',
    'فهم استخدام "halb" بشكل صحيح في العد غير الرسمي',
  ],
  explanation: [
    {
      titleAr: 'السؤال عن الوقت',
      bodyAr:
        'نسأل عن الوقت بـ"Wie spät ist es?" أو "Wie viel Uhr ist es?"، والإجابة الرسمية: "Es ist ... Uhr". في الجداول الرسمية (كالقطارات) تُستخدم صيغة الـ24 ساعة: "Es ist vierzehn Uhr dreißig" (الساعة 14:30).',
    },
    {
      titleAr: 'استخدام "halb" — تنبيه مهم',
      bodyAr:
        'في الألمانية، "halb" تشير إلى النصف المتبقي *قبل* الساعة القادمة وليس بعد الساعة الحالية، عكس الاستخدام الشائع في العربية أو الإنجليزية العامية: "halb drei" تعني 2:30 (النصف في طريقه إلى الثالثة) وليس 3:30. أيضاً: "viertel nach zwei" = 2:15، و"viertel vor fünf" = 4:45.',
    },
  ],
  examples: [
    { de: 'Wie spät ist es?', ar: 'كم الساعة؟' },
    { de: 'Es ist drei Uhr.', ar: 'الساعة الثالثة.' },
    { de: 'Es ist halb drei.', ar: 'الساعة الثانية والنصف (2:30).' },
    { de: 'Es ist viertel nach zwei.', ar: 'الساعة الثانية والربع (2:15).' },
    { de: 'Der Zug fährt um vierzehn Uhr fünfzehn.', ar: 'ينطلق القطار الساعة 14:15.' },
  ],
  vocabulary: [
    { id: 'voc-uhrzeit-uhrzeit', word: 'Uhrzeit', article: 'die', plural: 'Uhrzeiten', partOfSpeech: 'noun', meaningAr: 'الوقت/التوقيت', level: 'A1', category: 'Uhrzeit', example: { de: 'Welche Uhrzeit steht auf dem Ticket?', ar: 'ما الوقت المكتوب على التذكرة؟' } },
    { id: 'voc-uhrzeit-stunde', word: 'Stunde', article: 'die', plural: 'Stunden', partOfSpeech: 'noun', meaningAr: 'الساعة (مدة زمنية)', level: 'A1', category: 'Uhrzeit', example: { de: 'Eine Stunde hat sechzig Minuten.', ar: 'الساعة (المدة) فيها ستون دقيقة.' } },
    { id: 'voc-uhrzeit-minute', word: 'Minute', article: 'die', plural: 'Minuten', partOfSpeech: 'noun', meaningAr: 'الدقيقة', level: 'A1', category: 'Uhrzeit', example: { de: 'Der Bus kommt in fünf Minuten.', ar: 'الحافلة تأتي بعد خمس دقائق.' } },
    { id: 'voc-uhrzeit-halb', word: 'halb', partOfSpeech: 'adverb', meaningAr: 'النصف (قبل الساعة القادمة)', level: 'A1', category: 'Uhrzeit', example: { de: 'Es ist halb vier.', ar: 'الساعة الثالثة والنصف. (halb vier = نصف ساعة قبل الرابعة)' } },
    { id: 'voc-uhrzeit-viertel', word: 'Viertel', article: 'das', plural: 'Viertel', partOfSpeech: 'noun', meaningAr: 'الربع', level: 'A1', category: 'Uhrzeit', example: { de: 'Es ist Viertel nach drei.', ar: 'الساعة الثالثة والربع.' } },
  ],
  exercises: [
    {
      id: 'ex-uhrzeit-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'ماذا تعني "halb drei"؟',
      questionDe: '',
      options: ['3:00', '3:30', '2:30', '2:15'],
      correctIndex: 2,
      explanationAr: '"halb drei" تعني النصف في طريقه إلى الثالثة، أي الساعة 2:30 وليس 3:30.',
    },
    {
      id: 'ex-uhrzeit-2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Viertel nach zwei" bedeutet 2:15 Uhr.',
      isTrue: true,
      explanationAr: 'صحيح، "viertel nach zwei" تعني ربع ساعة بعد الثانية، أي 2:15.',
    },
    {
      id: 'ex-uhrzeit-3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل السؤال عن الوقت',
      sentenceDe: 'Wie ___ ist es?',
      acceptedAnswers: ['spät'],
      hint: 'السؤال غير الرسمي الشائع عن الوقت',
      explanationAr: 'السؤال المعتاد عن الوقت هو "Wie spät ist es?".',
    },
  ],
  commonMistakes: [
    {
      wrong: 'halb drei = 3:30',
      correct: 'halb drei = 2:30',
      explanationAr: 'هذا من أكثر الأخطاء شيوعاً لدى المتعلمين؛ "halb" تُحسب دائماً بالنسبة إلى الساعة القادمة وليس الحالية.',
    },
    {
      wrong: 'Es ist Uhr drei.',
      correct: 'Es ist drei Uhr.',
      explanationAr: 'الترتيب الصحيح في الألمانية هو الرقم أولاً ثم كلمة "Uhr".',
    },
  ],
}

export const module02Alltag = {
  id: 'a1-m02',
  slug: 'alltag',
  level: 'A1' as const,
  title: 'Alltag',
  titleAr: 'الحياة اليومية',
  order: 2,
  lessons: [lessonFamilie, lessonBerufe, lessonTagesablauf, lessonUhrzeit, lessonWochentage],
}
