import type { Lesson } from '@/types'

export const lessonSein: Lesson = {
  id: 'a1-m03-l01',
  slug: 'sein',
  level: 'A1',
  moduleId: 'a1-m03',
  title: 'sein',
  titleAr: 'فعل الكينونة sein',
  estimatedMinutes: 15,
  objectivesAr: [
    'حفظ تصريف الفعل الشاذ "sein" (يكون) في المضارع مع كل الضمائر',
    'استخدام "sein" لوصف الهوية، الصفات، والانتماء',
    'تمييز التصريف الصحيح لكل ضمير',
  ],
  explanation: [
    {
      titleAr: 'فعل شاذ أساسي',
      bodyAr:
        'فعل "sein" (يكون) من أهم الأفعال الشاذة في الألمانية ولا يتبع نمط التصريف المنتظم، لذا يجب حفظ تصريفه كاملاً عن ظهر قلب لأنه يظهر في كل مكان تقريباً.',
    },
    {
      titleAr: 'استخدامات sein',
      bodyAr:
        'يُستخدم "sein" لوصف الهوية (Ich bin Sara)، الجنسية والمهنة (Er ist Arzt)، الصفات (Das Wetter ist schön)، والحالة (Wir sind müde).',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-sein',
      slug: 'sein-konjugation',
      level: 'A1',
      titleDe: 'sein — Präsens',
      titleAr: 'تصريف sein في المضارع',
      conceptAr: 'فعل شاذ يُصرَّف بشكل غير منتظم مع كل ضمير من ضمائر الفاعل.',
      ruleAr: 'يجب حفظ الصيغ الست لتصريف sein لأنها لا تتبع القاعدة العامة للأفعال المنتظمة.',
      tables: [
        {
          caption: 'تصريف sein في المضارع',
          headers: ['الضمير', 'التصريف'],
          rows: [
            { label: 'ich', values: ['bin'] },
            { label: 'du', values: ['bist'] },
            { label: 'er / sie / es', values: ['ist'] },
            { label: 'wir', values: ['sind'] },
            { label: 'ihr', values: ['seid'] },
            { label: 'sie / Sie', values: ['sind'] },
          ],
        },
      ],
      examples: [
        { de: 'Ich bin müde.', ar: 'أنا متعب.' },
        { de: 'Wir sind Freunde.', ar: 'نحن أصدقاء.' },
      ],
      commonMistakes: [
        {
          wrong: 'du ist',
          correct: 'du bist',
          explanationAr: 'مع الضمير "du" التصريف الصحيح هو "bist" وليس "ist".',
        },
      ],
    },
  ],
  examples: [
    { de: 'Ich bin Student.', ar: 'أنا طالب.' },
    { de: 'Du bist sehr nett.', ar: 'أنتَ لطيف جداً.' },
    { de: 'Sie ist Ärztin.', ar: 'هي طبيبة.' },
    { de: 'Wir sind aus Tunesien.', ar: 'نحن من تونس.' },
    { de: 'Seid ihr fertig?', ar: 'هل أنتم جاهزون؟' },
  ],
  vocabulary: [
    { id: 'voc-sein-sein', word: 'sein', partOfSpeech: 'verb', meaningAr: 'يكون', level: 'A1', category: 'Grundgrammatik', verb: { present: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'], praeteritum: 'war', partizip: 'gewesen', auxiliary: 'sein' }, example: { de: 'Wir sind Freunde.', ar: 'نحن أصدقاء.' } },
    { id: 'voc-sein-mued', word: 'müde', partOfSpeech: 'adjective', meaningAr: 'متعب', level: 'A1', category: 'Grundgrammatik', example: { de: 'Ich bin müde.', ar: 'أنا متعب.' } },
    { id: 'voc-sein-nett', word: 'nett', partOfSpeech: 'adjective', meaningAr: 'لطيف', level: 'A1', category: 'Grundgrammatik', example: { de: 'Mein Lehrer ist nett.', ar: 'معلّمي لطيف.' } },
    { id: 'voc-sein-fertig', word: 'fertig', partOfSpeech: 'adjective', meaningAr: 'جاهز/منتهٍ', level: 'A1', category: 'Grundgrammatik', example: { de: 'Ich bin fertig!', ar: 'أنا جاهز! / انتهيت!' } },
  ],
  exercises: [
    {
      id: 'ex-sein-1',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بتصريف sein المناسب',
      sentenceDe: 'Wir ___ Freunde.',
      acceptedAnswers: ['sind'],
      explanationAr: 'مع الضمير "wir" يُصرَّف sein إلى "sind".',
    },
    {
      id: 'ex-sein-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر التصريف الصحيح',
      questionDe: 'Du ___ sehr freundlich.',
      options: ['bin', 'bist', 'ist', 'seid'],
      correctIndex: 1,
      explanationAr: 'مع "du" التصريف الصحيح هو "bist".',
    },
    {
      id: 'ex-sein-3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Ihr seid" ist die richtige Form für „ihr".',
      isTrue: true,
      explanationAr: 'صحيح، مع الضمير "ihr" التصريف الصحيح هو "seid".',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich ist müde.',
      correct: 'Ich bin müde.',
      explanationAr: 'مع "ich" يُستخدم "bin" وليس "ist".',
    },
    {
      wrong: 'Sie (هي) bin Ärztin.',
      correct: 'Sie ist Ärztin.',
      explanationAr: 'مع "sie" (هي) التصريف الصحيح هو "ist".',
    },
  ],
}

export const lessonHaben: Lesson = {
  id: 'a1-m03-l02',
  slug: 'haben',
  level: 'A1',
  moduleId: 'a1-m03',
  title: 'haben',
  titleAr: 'فعل الامتلاك haben',
  estimatedMinutes: 15,
  objectivesAr: [
    'حفظ تصريف الفعل الشاذ "haben" (يملك) في المضارع',
    'استخدام haben للتعبير عن الامتلاك والعمر والحاجة',
    'صياغة أسئلة بسيطة باستخدام haben',
  ],
  explanation: [
    {
      titleAr: 'فعل haben',
      bodyAr:
        'مثل sein، فعل "haben" (يملك) شاذ جزئياً: تصريفه منتظم في معظم الصيغ لكنه يفقد حرف "b" مع "du" و"er/sie/es": "du hast" وليس "du habst"، و"er hat" وليس "er habt".',
    },
    {
      titleAr: 'استخدامات haben',
      bodyAr:
        'يُستخدم haben للتعبير عن الامتلاك (Ich habe ein Auto)، والحاجة (Ich habe Zeit / Ich habe Hunger). تنبيه: للتعبير عن العمر تُستخدم "sein" وليس "haben" (Ich bin zwanzig Jahre alt)، خلافاً لبعض اللغات الأخرى.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-haben',
      slug: 'haben-konjugation',
      level: 'A1',
      titleDe: 'haben — Präsens',
      titleAr: 'تصريف haben في المضارع',
      conceptAr: 'فعل شبه منتظم مع تغيّر صغير في صيغتَي du وer/sie/es.',
      ruleAr: 'يفقد الفعل حرف "b" في صيغتَي "du" و"er/sie/es" فقط، بينما تبقى بقية الصيغ منتظمة.',
      tables: [
        {
          caption: 'تصريف haben في المضارع',
          headers: ['الضمير', 'التصريف'],
          rows: [
            { label: 'ich', values: ['habe'] },
            { label: 'du', values: ['hast'] },
            { label: 'er / sie / es', values: ['hat'] },
            { label: 'wir', values: ['haben'] },
            { label: 'ihr', values: ['habt'] },
            { label: 'sie / Sie', values: ['haben'] },
          ],
        },
      ],
      examples: [
        { de: 'Ich habe einen Hund.', ar: 'لدي كلب.' },
        { de: 'Hast du Geschwister?', ar: 'هل لديك إخوة؟' },
      ],
      commonMistakes: [
        {
          wrong: 'er habt',
          correct: 'er hat',
          explanationAr: 'مع "er/sie/es" التصريف الصحيح هو "hat" وليس "habt" (التي تخص "ihr").',
        },
      ],
    },
  ],
  examples: [
    { de: 'Ich habe Hunger.', ar: 'أنا جائع.' },
    { de: 'Hast du Zeit?', ar: 'هل لديك وقت؟' },
    { de: 'Er hat zwei Kinder.', ar: 'لديه طفلان.' },
    { de: 'Wir haben keine Zeit.', ar: 'ليس لدينا وقت.' },
  ],
  vocabulary: [
    { id: 'voc-haben-haben', word: 'haben', partOfSpeech: 'verb', meaningAr: 'يملك/لديه', level: 'A1', category: 'Grundgrammatik', verb: { present: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'], praeteritum: 'hatte', partizip: 'gehabt', auxiliary: 'haben' }, example: { de: 'Ich habe eine Schwester.', ar: 'عندي أخت.' } },
    { id: 'voc-haben-hunger', word: 'Hunger', article: 'der', numberUse: 'none', partOfSpeech: 'noun', meaningAr: 'الجوع', level: 'A1', category: 'Grundgrammatik', example: { de: 'Ich habe Hunger.', ar: 'أنا جائع.' } },
    { id: 'voc-haben-zeit', word: 'Zeit', article: 'die', plural: 'Zeiten', partOfSpeech: 'noun', meaningAr: 'الوقت', level: 'A1', category: 'Grundgrammatik', example: { de: 'Hast du heute Zeit?', ar: 'هل عندك وقت اليوم؟' } },
    { id: 'voc-haben-hund', word: 'Hund', article: 'der', plural: 'Hunde', partOfSpeech: 'noun', meaningAr: 'الكلب', level: 'A1', category: 'Grundgrammatik', example: { de: 'Ich habe einen Hund.', ar: 'عندي كلب.' } },
  ],
  exercises: [
    {
      id: 'ex-haben-1',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بتصريف haben المناسب',
      sentenceDe: 'Er ___ einen Bruder.',
      acceptedAnswers: ['hat'],
      explanationAr: 'مع "er" التصريف الصحيح هو "hat".',
    },
    {
      id: 'ex-haben-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر التصريف الصحيح',
      questionDe: '___ du Geschwister?',
      options: ['Habst', 'Hast', 'Habt', 'Hat'],
      correctIndex: 1,
      explanationAr: 'مع "du" التصريف الصحيح هو "hast" (وليس "habst").',
    },
    {
      id: 'ex-haben-3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Wir haben" ist korrekt.',
      isTrue: true,
      explanationAr: 'صحيح، مع "wir" التصريف الصحيح هو "haben" بدون تغيير عن صيغة المصدر.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'du habst',
      correct: 'du hast',
      explanationAr: 'التصريف مع "du" هو "hast"؛ حرف "b" يسقط من الجذع.',
    },
    {
      wrong: 'Ich bin zehn Jahre.',
      correct: 'Ich bin zehn Jahre alt.',
      explanationAr: 'للتعبير عن العمر تُستخدم "sein" وليس "haben"، ولا يجوز حذف كلمة "alt" في نهاية الجملة.',
    },
  ],
}

export const lessonRegelmaessigeVerben: Lesson = {
  id: 'a1-m03-l03',
  slug: 'regelmaessige-verben',
  level: 'A1',
  moduleId: 'a1-m03',
  title: 'Regelmäßige Verben',
  titleAr: 'الأفعال المنتظمة',
  estimatedMinutes: 18,
  objectivesAr: [
    'فهم نمط تصريف الأفعال المنتظمة في المضارع',
    'التعرف على استثناءات التهجئة (إضافة -e، حذف s)',
    'تصريف أفعال جديدة بالقياس على النمط العام',
  ],
  explanation: [
    {
      titleAr: 'النمط العام',
      bodyAr:
        'تُصرَّف معظم الأفعال الألمانية بإضافة نهايات ثابتة إلى جذع الفعل: -e (ich)، -st (du)، -t (er/sie/es)، -en (wir)، -t (ihr)، -en (sie/Sie). مثال بفعل "lernen": ich lerne, du lernst, er lernt, wir lernen, ihr lernt, sie lernen.',
    },
    {
      titleAr: 'استثناءات التهجئة',
      bodyAr:
        'إذا انتهى جذع الفعل بحرف t أو d (مثل arbeiten)، تُضاف "e" إضافية قبل نهايات du وer/ihr لتسهيل النطق: "du arbeitest"، "er arbeitet". وإذا انتهى الجذع بـ s أو ß أو z (مثل heißen)، تُحذف الـs من نهاية "du" فتصبح "du heißt" بدلاً من "du heißst".',
    },
  ],
  examples: [
    { de: 'Ich lerne Deutsch.', ar: 'أتعلّم الألمانية.' },
    { de: 'Du wohnst in Berlin.', ar: 'أنتَ تسكن في برلين.' },
    { de: 'Er arbeitet viel.', ar: 'هو يعمل كثيراً.' },
    { de: 'Wir spielen Fußball.', ar: 'نلعب كرة القدم.' },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-regelmaessige-verben',
      slug: 'regelmaessige-verben-praesens',
      level: 'A1',
      titleDe: 'Regelmäßige Verben — Präsens',
      titleAr: 'تصريف الأفعال المنتظمة',
      conceptAr: 'نمط تصريف ثابت يُطبَّق على معظم الأفعال الألمانية عبر إضافة نهايات محددة إلى الجذع.',
      ruleAr: 'جذع الفعل + (e / st / t / en / t / en) حسب الضمير، مع مراعاة استثناءات التهجئة للجذوع المنتهية بـ t/d أو s/ß/z.',
      tables: [
        {
          caption: 'lernen (نموذج قياسي)',
          headers: ['الضمير', 'lernen', 'arbeiten (استثناء t)'],
          rows: [
            { label: 'ich', values: ['lerne', 'arbeite'] },
            { label: 'du', values: ['lernst', 'arbeitest'] },
            { label: 'er / sie / es', values: ['lernt', 'arbeitet'] },
            { label: 'wir', values: ['lernen', 'arbeiten'] },
            { label: 'ihr', values: ['lernt', 'arbeitet'] },
            { label: 'sie / Sie', values: ['lernen', 'arbeiten'] },
          ],
        },
      ],
      examples: [
        { de: 'Du arbeitest heute.', ar: 'أنتَ تعمل اليوم.' },
        { de: 'Er heißt Michael.', ar: 'اسمه مايكل.' },
        {
          de: 'Ich lerne Deutsch.',
          ar: 'أنا أتعلّم الألمانية. (الترتيب الأساسي: فاعل، فعل، مفعول به)',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'lerne', role: 'الفعل' },
            { text: 'Deutsch.', role: 'المفعول به' },
          ],
        },
      ],
      exceptionsAr: [
        'الجذوع المنتهية بـ t/d تضيف "e" إضافية: du arbeitest، er arbeitet.',
        'الجذوع المنتهية بـ s/ß/z تحذف الـs من صيغة du: du heißt (وليس heißst).',
      ],
      commonMistakes: [
        {
          wrong: 'du arbeitst',
          correct: 'du arbeitest',
          explanationAr: 'يجب إضافة "e" قبل "st" عندما ينتهي الجذع بـ t، تسهيلاً للنطق.',
        },
      ],
    },
  ],
  vocabulary: [
    { id: 'voc-regelmaessig-lernen', word: 'lernen', partOfSpeech: 'verb', meaningAr: 'يتعلّم', level: 'A1', category: 'Grundgrammatik', verb: { praeteritum: 'lernte', partizip: 'gelernt', auxiliary: 'haben' }, example: { de: 'Ich lerne jeden Tag Deutsch.', ar: 'أتعلّم الألمانية كل يوم.' } },
    { id: 'voc-regelmaessig-wohnen', word: 'wohnen', partOfSpeech: 'verb', meaningAr: 'يسكن', level: 'A1', category: 'Grundgrammatik', verb: { praeteritum: 'wohnte', partizip: 'gewohnt', auxiliary: 'haben' }, example: { de: 'Wir wohnen in Berlin.', ar: 'نحن نسكن في برلين.' } },
    { id: 'voc-regelmaessig-spielen', word: 'spielen', partOfSpeech: 'verb', meaningAr: 'يلعب', level: 'A1', category: 'Grundgrammatik', verb: { praeteritum: 'spielte', partizip: 'gespielt', auxiliary: 'haben' }, example: { de: 'Die Kinder spielen im Park.', ar: 'الأطفال يلعبون في الحديقة العامة.' } },
    { id: 'voc-regelmaessig-arbeiten', word: 'arbeiten', partOfSpeech: 'verb', meaningAr: 'يعمل', level: 'A1', category: 'Grundgrammatik', verb: { praeteritum: 'arbeitete', partizip: 'gearbeitet', auxiliary: 'haben' }, example: { de: 'Sie arbeitet in einer Bank.', ar: 'هي تعمل في بنك.' } },
  ],
  exercises: [
    {
      id: 'ex-regelmaessig-1',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بتصريف الفعل arbeiten',
      sentenceDe: 'Du ___ heute lange.',
      acceptedAnswers: ['arbeitest'],
      hint: 'تذكّر إضافة "e" الإضافية لأن الجذع ينتهي بـ t',
      explanationAr: 'التصريف الصحيح هو "arbeitest" مع إضافة "e" قبل "st".',
    },
    {
      id: 'ex-regelmaessig-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر التصريف الصحيح لفعل "wohnen" مع "wir"',
      questionDe: '',
      options: ['wohnt', 'wohnst', 'wohnen', 'wohne'],
      correctIndex: 2,
      explanationAr: 'مع "wir" تُضاف نهاية "-en" إلى الجذع: "wohnen".',
    },
    {
      id: 'ex-regelmaessig-3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„du heißst" ist die korrekte Form.',
      isTrue: false,
      explanationAr: 'خطأ، الصيغة الصحيحة هي "du heißt" لأن الجذع ينتهي بحرف ß فتُحذف الـs الإضافية.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'du arbeitst',
      correct: 'du arbeitest',
      explanationAr: 'الجذوع المنتهية بـ t أو d تحتاج إلى "e" إضافية قبل نهاية "du" و"er".',
    },
    {
      wrong: 'du heißst',
      correct: 'du heißt',
      explanationAr: 'الجذوع المنتهية بـ s/ß/z تفقد الـs الإضافية في صيغة "du".',
    },
  ],
}

export const lessonArtikel: Lesson = {
  id: 'a1-m03-l04',
  slug: 'artikel',
  level: 'A1',
  moduleId: 'a1-m03',
  title: 'Artikel',
  titleAr: 'أدوات التعريف والتنكير',
  estimatedMinutes: 15,
  objectivesAr: [
    'التعرف على أدوات التعريف الثلاث der/die/das',
    'التعرف على أدوات التنكير ein/eine/ein',
    'إدراك أهمية حفظ جنس كل اسم عند تعلّمه',
  ],
  explanation: [
    {
      titleAr: 'ثلاثة أجناس نحوية',
      bodyAr:
        'لكل اسم ألماني جنس نحوي ثابت: مذكر (der)، مؤنث (die)، أو محايد (das). هذا الجنس لا يرتبط دائماً بالمعنى الطبيعي للكلمة، ولا توجد قاعدة شاملة تحدده، لذا يُنصح بحفظ الأداة مع كل اسم جديد كوحدة واحدة منذ البداية.',
    },
    {
      titleAr: 'أدوات التنكير',
      bodyAr:
        'أداة التنكير (a/an) تتبع نفس الجنس: "ein" مع المذكر والمحايد، "eine" مع المؤنث: "ein Mann" (رجل)، "eine Frau" (امرأة)، "ein Kind" (طفل). لا توجد أداة تنكير لصيغة الجمع في الألمانية.',
    },
  ],
  examples: [
    { de: 'der Tisch — die Tische', ar: 'الطاولة — الطاولات' },
    { de: 'die Lampe — die Lampen', ar: 'المصباح — المصابيح' },
    { de: 'das Buch — die Bücher', ar: 'الكتاب — الكتب' },
    { de: 'Ich sehe ein Buch.', ar: 'أرى كتاباً.' },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-artikel',
      slug: 'bestimmte-unbestimmte-artikel',
      level: 'A1',
      titleDe: 'der/die/das — ein/eine/ein',
      titleAr: 'أدوات التعريف والتنكير',
      conceptAr: 'أداة تسبق الاسم وتدل على جنسه النحوي (مذكر/مؤنث/محايد) وعلى كونه معرَّفاً أو منكَّراً.',
      ruleAr: 'أداة التعريف تتغير حسب جنس الاسم: der (مذكر)، die (مؤنث)، das (محايد)، وفي الجمع تُستخدم "die" دائماً بغض النظر عن الجنس المفرد.',
      tables: [
        {
          caption: 'أدوات التعريف والتنكير',
          headers: ['الجنس', 'أداة التعريف', 'أداة التنكير'],
          rows: [
            { label: 'مذكر', values: ['der', 'ein'] },
            { label: 'مؤنث', values: ['die', 'eine'] },
            { label: 'محايد', values: ['das', 'ein'] },
            { label: 'جمع', values: ['die', '—'] },
          ],
        },
      ],
      examples: [
        { de: 'der Tisch, die Tische', ar: 'الطاولة، الطاولات' },
        { de: 'Das ist eine Lampe.', ar: 'هذا مصباح.' },
      ],
      exceptionsAr: ['لا توجد أداة تنكير في صيغة الجمع؛ يُستخدم الاسم مجرداً أو تُستخدم كلمة "keine" في النفي.'],
    },
  ],
  vocabulary: [
    { id: 'voc-artikel-tisch', word: 'Tisch', article: 'der', plural: 'Tische', partOfSpeech: 'noun', meaningAr: 'الطاولة', level: 'A1', category: 'Grundgrammatik', example: { de: 'Der Tisch ist groß.', ar: 'الطاولة كبيرة.' } },
    { id: 'voc-artikel-lampe', word: 'Lampe', article: 'die', plural: 'Lampen', partOfSpeech: 'noun', meaningAr: 'المصباح', level: 'A1', category: 'Grundgrammatik', example: { de: 'Die Lampe ist neu.', ar: 'المصباح جديد.' } },
    { id: 'voc-artikel-buch', word: 'Buch', article: 'das', plural: 'Bücher', partOfSpeech: 'noun', meaningAr: 'الكتاب', level: 'A1', category: 'Grundgrammatik', example: { de: 'Das Buch ist interessant.', ar: 'الكتاب ممتع.' } },
    { id: 'voc-artikel-stuhl', word: 'Stuhl', article: 'der', plural: 'Stühle', partOfSpeech: 'noun', meaningAr: 'الكرسي', level: 'A1', category: 'Grundgrammatik', example: { de: 'Der Stuhl ist braun.', ar: 'الكرسي بنّي اللون.' } },
  ],
  exercises: [
    {
      id: 'ex-artikel-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر أداة التعريف الصحيحة لكلمة "Buch"',
      questionDe: '',
      options: ['der', 'die', 'das', 'den'],
      correctIndex: 2,
      explanationAr: 'كلمة "Buch" محايدة الجنس، لذا أداتها هي "das".',
    },
    {
      id: 'ex-artikel-2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بأداة التنكير المناسبة',
      sentenceDe: 'Ich sehe ___ Lampe.',
      acceptedAnswers: ['eine'],
      explanationAr: '"Lampe" اسم مؤنث، لذا تُستخدم أداة التنكير "eine".',
    },
    {
      id: 'ex-artikel-3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im Plural benutzt man immer „die" als bestimmten Artikel.',
      isTrue: true,
      explanationAr: 'صحيح، في صيغة الجمع تُستخدم "die" دائماً بصرف النظر عن جنس الاسم في المفرد.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'die Buch',
      correct: 'das Buch',
      explanationAr: 'كلمة "Buch" محايدة (das) وليست مؤنثة؛ يجب حفظ جنس كل اسم عند تعلّمه.',
    },
    {
      wrong: 'ein Bücher',
      correct: 'Bücher (بدون أداة تنكير)',
      explanationAr: 'لا توجد أداة تنكير في صيغة الجمع في الألمانية.',
    },
  ],
}

export const lessonAkkusativ: Lesson = {
  id: 'a1-m03-l05',
  slug: 'akkusativ',
  level: 'A1',
  moduleId: 'a1-m03',
  title: 'Akkusativ',
  titleAr: 'حالة المفعول به (الأكوزاتيف)',
  estimatedMinutes: 18,
  objectivesAr: [
    'فهم وظيفة حالة الأكوزاتيف كمفعول به مباشر',
    'تصريف أداة التعريف/التنكير المذكرة في الأكوزاتيف (der→den, ein→einen)',
    'استخدام الأكوزاتيف مع أفعال شائعة مثل haben وsehen وkaufen',
  ],
  explanation: [
    {
      titleAr: 'ما هو الأكوزاتيف؟',
      bodyAr:
        'الأكوزاتيف حالة نحوية تدل على المفعول به المباشر، أي الشيء الذي يقع عليه فعل الفاعل مباشرة. نسأل عنه بـ"Wen?" (من؟ للعاقل) أو "Was?" (ماذا؟ لغير العاقل)، بينما نسأل عن الفاعل (Nominativ) بـ"Wer?" أو "Was?".',
    },
    {
      titleAr: 'التغيير الوحيد: المذكر فقط',
      bodyAr:
        'التغيير الوحيد الملموس يحدث مع الأسماء المذكرة فقط: "der" تصبح "den"، و"ein" تصبح "einen". أما المؤنث (die/eine) والمحايد (das/ein) والجمع (die) فتبقى بلا تغيير عن حالة الفاعل (Nominativ).',
    },
  ],
  examples: [
    { de: 'Ich habe einen Bruder.', ar: 'لدي أخ. (Bruder مذكر: ein → einen)' },
    { de: 'Ich sehe den Lehrer.', ar: 'أرى المعلّم. (Lehrer مذكر: der → den)' },
    { de: 'Sie kauft eine Tasche.', ar: 'هي تشتري حقيبة. (Tasche مؤنث: بلا تغيير)' },
    { de: 'Wir brauchen ein Buch.', ar: 'نحتاج كتاباً. (Buch محايد: بلا تغيير)' },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-akkusativ',
      slug: 'akkusativ-artikel',
      level: 'A1',
      titleDe: 'Akkusativ — Artikel',
      titleAr: 'أدوات التعريف في حالة الأكوزاتيف',
      conceptAr: 'حالة نحوية للمفعول به المباشر؛ يتغيّر شكل الأداة مع المذكر فقط.',
      ruleAr: 'Wer/Was? = Nominativ (فاعل) — Wen/Was? = Akkusativ (مفعول به). التغيير يقتصر على المذكر: der→den، ein→einen.',
      tables: [
        {
          caption: 'مقارنة Nominativ و Akkusativ',
          headers: ['الجنس', 'Nominativ', 'Akkusativ'],
          rows: [
            { label: 'مذكر', values: ['der / ein', 'den / einen'] },
            { label: 'مؤنث', values: ['die / eine', 'die / eine'] },
            { label: 'محايد', values: ['das / ein', 'das / ein'] },
            { label: 'جمع', values: ['die', 'die'] },
          ],
        },
      ],
      examples: [
        { de: 'Der Lehrer ist nett. (Nominativ)', ar: 'المعلّم لطيف. (فاعل)' },
        {
          de: 'Ich sehe den Lehrer.',
          ar: 'أرى المعلّم. (المفعول به في حالة الأكوزاتيف)',
          tokens: [
            { text: 'Ich', role: 'الفاعل — Nominativ' },
            { text: 'sehe', role: 'الفعل' },
            { text: 'den Lehrer.', role: 'المفعول به — Akkusativ' },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: 'Ich habe ein Bruder.',
          correct: 'Ich habe einen Bruder.',
          explanationAr: '"Bruder" مذكر، فيجب تحويل "ein" إلى "einen" في حالة الأكوزاتيف.',
        },
      ],
    },
  ],
  vocabulary: [
    { id: 'voc-akkusativ-sehen', word: 'sehen', partOfSpeech: 'verb', meaningAr: 'يرى', level: 'A1', category: 'Grundgrammatik', verb: { present: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'], praeteritum: 'sah', partizip: 'gesehen', auxiliary: 'haben' }, example: { de: 'Ich sehe einen Hund.', ar: 'أرى كلباً.' } },
    { id: 'voc-akkusativ-kaufen', word: 'kaufen', partOfSpeech: 'verb', meaningAr: 'يشتري', level: 'A1', category: 'Grundgrammatik', verb: { praeteritum: 'kaufte', partizip: 'gekauft', auxiliary: 'haben' }, example: { de: 'Ich kaufe ein Brot.', ar: 'أشتري رغيف خبز.' } },
    { id: 'voc-akkusativ-brauchen', word: 'brauchen', partOfSpeech: 'verb', meaningAr: 'يحتاج', level: 'A1', category: 'Grundgrammatik', verb: { praeteritum: 'brauchte', partizip: 'gebraucht', auxiliary: 'haben' }, example: { de: 'Ich brauche einen Stuhl.', ar: 'أحتاج إلى كرسي.' } },
    { id: 'voc-akkusativ-tasche', word: 'Tasche', article: 'die', plural: 'Taschen', partOfSpeech: 'noun', meaningAr: 'الحقيبة', level: 'A1', category: 'Grundgrammatik', example: { de: 'Ich habe eine Tasche.', ar: 'عندي حقيبة.' } },
  ],
  exercises: [
    {
      id: 'ex-akkusativ-1',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بالأداة الصحيحة في حالة الأكوزاتيف',
      sentenceDe: 'Ich habe ___ Bruder.',
      acceptedAnswers: ['einen'],
      hint: '"Bruder" اسم مذكر',
      explanationAr: 'في الأكوزاتيف، تتحول "ein" إلى "einen" مع الأسماء المذكرة.',
    },
    {
      id: 'ex-akkusativ-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الترجمة الصحيحة لسؤال المفعول به عن العاقل',
      questionDe: '',
      options: ['Wer?', 'Wen?', 'Wem?', 'Wessen?'],
      correctIndex: 1,
      explanationAr: 'نسأل عن المفعول به المباشر للعاقل في حالة الأكوزاتيف بأداة "Wen?".',
    },
    {
      id: 'ex-akkusativ-3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Feminine Artikel ändern sich im Akkusativ.',
      isTrue: false,
      explanationAr: 'خطأ، أدوات التعريف والتنكير المؤنثة (die/eine) لا تتغير في حالة الأكوزاتيف.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich habe ein Bruder.',
      correct: 'Ich habe einen Bruder.',
      explanationAr: 'يجب تحويل أداة التنكير المذكرة "ein" إلى "einen" عندما يكون الاسم مفعولاً به مباشراً.',
    },
    {
      wrong: 'Ich sehe der Lehrer.',
      correct: 'Ich sehe den Lehrer.',
      explanationAr: 'أداة التعريف المذكرة "der" تتحول إلى "den" في حالة الأكوزاتيف.',
    },
  ],
}

export const module03Grundgrammatik = {
  id: 'a1-m03',
  slug: 'grundgrammatik',
  level: 'A1' as const,
  title: 'Grundgrammatik',
  titleAr: 'القواعد الأساسية',
  order: 3,
  lessons: [lessonSein, lessonHaben, lessonRegelmaessigeVerben, lessonArtikel, lessonAkkusativ],
}
