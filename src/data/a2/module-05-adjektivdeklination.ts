import type { Lesson, Module } from '@/types'

export const lessonAdjektivdeklination: Lesson = {
  id: 'a2-m05-l01',
  slug: 'adjektivdeklination',
  level: 'A2',
  moduleId: 'a2-m05',
  title: 'Adjektivdeklination',
  titleAr: 'تصريف الصفة قبل الاسم',
  estimatedMinutes: 36,
  objectivesAr: [
    'فهم القاعدة الذهبية: مجموع (نهاية الأداة + نهاية الصفة) يجب أن "يغطّي" معلومة الجنس والحالة مرة واحدة فقط',
    'تصريف الصفة بعد أداة تعريف (der/die/das) في Nominativ وAkkusativ',
    'تصريف الصفة بعد أداة تنكير (ein/eine/kein/mein...) في Nominativ وAkkusativ',
    'تصريف الصفة بلا أي أداة إطلاقاً، حيث تحمل الصفة نفسها معلومة الحالة كاملة',
  ],
  explanation: [
    {
      titleAr: 'القاعدة الذهبية: معلومة واحدة، لا تتكرّر مرتين',
      bodyAr:
        'بدل حفظ جداول منفصلة عشوائياً، تذكّر مبدأً واحداً يفسّر كل شيء: يجب أن تحمل الأداة والصفة معاً معلومة "جنس الاسم وحالته" مرة واحدة فقط. إن كانت الأداة نفسها واضحة تماماً (der، die، das تُظهر الجنس بجلاء)، تكتفي الصفة بنهاية محايدة خفيفة (-e أو -en). لكن إن كانت الأداة "صامتة" ولا تُظهر الجنس (ein وkein في المذكر/المحايد لا تحملان أي نهاية تدلّ على الجنس)، يجب أن "تتحمّل" الصفة هذه المسؤولية وتأخذ نهاية أقوى تُعوّض غياب المعلومة.',
    },
    {
      titleAr: 'بلا أداة إطلاقاً: الصفة تلبس "قناع" أداة التعريف',
      bodyAr:
        'عندما لا توجد أداة إطلاقاً قبل الصفة (كما في الحديث عن الأشياء بشكل عام: "guter Kaffee" = قهوة جيدة عموماً)، تأخذ الصفة تماماً نفس نهاية أداة التعريف التي كانت ستظهر لو وُجدت (der → -er، die → -e، das → -es، die-جمع → -e)، وكأنها "تتذكّر" شكل الأداة الغائبة.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-adjektivdeklination',
      slug: 'adjektivdeklination-tabellen',
      level: 'A2',
      titleDe: 'Adjektivdeklination: Nominativ und Akkusativ',
      titleAr: 'تصريف الصفة: Nominativ وAkkusativ',
      conceptAr: 'ثلاثة أنماط تصريف حسب نوع الأداة (تعريف / تنكير / بلا أداة)، تحكمها كلها قاعدة واحدة: توزيع معلومة الجنس والحالة بين الأداة والصفة.',
      ruleAr:
        'بعد أداة تعريف: أضف -e في Nominativ لكل الأجناس، و-en في كل حالات Akkusativ وكل صيغ الجمع. بعد أداة تنكير: نفس القاعدة، إلا في حالتين حيث الأداة "صامتة" فتأخذ الصفة -er (مذكّر Nominativ) أو -es (محايد Nominativ وAkkusativ) بدلاً من -e. بلا أداة إطلاقاً: تأخذ الصفة نهاية أداة التعريف الغائبة تماماً.',
      tables: [
        {
          caption: 'بعد أداة تعريف (der/die/das/die)',
          headers: ['الجنس', 'Nominativ', 'Akkusativ'],
          rows: [
            { label: 'مذكّر', values: ['der große Mann', 'den großen Mann'] },
            { label: 'مؤنث', values: ['die große Frau', 'die große Frau'] },
            { label: 'محايد', values: ['das kleine Kind', 'das kleine Kind'] },
            { label: 'جمع', values: ['die kleinen Kinder', 'die kleinen Kinder'] },
          ],
        },
        {
          caption: 'بعد أداة تنكير (ein/eine/kein/mein...)',
          headers: ['الجنس', 'Nominativ', 'Akkusativ'],
          rows: [
            { label: 'مذكّر', values: ['ein großer Mann', 'einen großen Mann'] },
            { label: 'مؤنث', values: ['eine große Frau', 'eine große Frau'] },
            { label: 'محايد', values: ['ein kleines Kind', 'ein kleines Kind'] },
            { label: 'جمع', values: ['keine kleinen Kinder', 'keine kleinen Kinder'] },
          ],
        },
        {
          caption: 'بلا أداة إطلاقاً (الصفة "تلبس قناع" أداة التعريف)',
          headers: ['الجنس', 'Nominativ', 'Akkusativ'],
          rows: [
            { label: 'مذكّر', values: ['guter Kaffee', 'guten Kaffee'] },
            { label: 'مؤنث', values: ['frische Milch', 'frische Milch'] },
            { label: 'محايد', values: ['kaltes Wasser', 'kaltes Wasser'] },
            { label: 'جمع', values: ['frische Äpfel', 'frische Äpfel'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Der große Mann trägt einen großen Rucksack.',
          ar: 'الرجل الطويل يحمل حقيبة ظهر كبيرة. (بعد أداة تعريف ثم أداة تنكير مذكّر Akkusativ)',
          tokens: [
            { text: 'Der große Mann', role: 'الفاعل (تعريف، Nominativ)' },
            { text: 'trägt', role: 'الفعل' },
            { text: 'einen großen Rucksack.', role: 'المفعول به (تنكير، Akkusativ)' },
          ],
        },
        {
          de: 'Ich trinke gern guten Kaffee.',
          ar: 'أحب شرب قهوة جيدة. (بلا أداة، الصفة تحمل نهاية Akkusativ المذكّر بنفسها)',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'trinke gern', role: 'الفعل + الحال' },
            { text: 'guten Kaffee.', role: 'المفعول به (بلا أداة)' },
          ],
        },
      ],
      exceptionsAr: [
        'المؤنث والجمع لا يتغيّران أبداً بين Nominativ وAkkusativ في أيّ من الأنماط الثلاثة — فقط المذكّر يتغيّر.',
        'المحايد لا يتغيّر أبداً بين Nominativ وAkkusativ أيضاً، تماماً مثل أداته الخاصة (das/ein تبقيان كما هما).',
      ],
    },
  ],
  examples: [
    { de: 'Meine neue Wohnung ist sehr hell.', ar: 'شقتي الجديدة مضيئة جداً.' },
    { de: 'Wir suchen ein billiges Hotel.', ar: 'نبحث عن فندق رخيص.' },
    { de: 'Sie trägt eine schöne rote Bluse.', ar: 'ترتدي بلوزة حمراء جميلة.' },
    { de: 'Frisches Obst ist gesund.', ar: 'الفواكه الطازجة صحية. (بلا أداة، جمع/غير معدود)' },
  ],
  vocabulary: [
    { id: 'voc-adjektiv-gross', word: 'groß', partOfSpeech: 'adjective', meaningAr: 'كبير', level: 'A2', category: 'صفات وصفية', example: { de: 'Das ist ein großes Haus.', ar: 'هذا بيت كبير.' } },
    { id: 'voc-adjektiv-klein', word: 'klein', partOfSpeech: 'adjective', meaningAr: 'صغير', level: 'A2', category: 'صفات وصفية', example: { de: 'Wir haben eine kleine Wohnung.', ar: 'عندنا شقة صغيرة.' } },
    { id: 'voc-adjektiv-neu', word: 'neu', partOfSpeech: 'adjective', meaningAr: 'جديد', level: 'A2', category: 'صفات وصفية', example: { de: 'Ich kaufe ein neues Handy.', ar: 'أشتري هاتفاً جديداً.' } },
    { id: 'voc-adjektiv-alt', word: 'alt', partOfSpeech: 'adjective', meaningAr: 'قديم', level: 'A2', category: 'صفات وصفية', example: { de: 'Das ist ein altes Auto.', ar: 'هذه سيارة قديمة.' } },
    { id: 'voc-adjektiv-billig', word: 'billig', partOfSpeech: 'adjective', meaningAr: 'رخيص', level: 'A2', category: 'صفات وصفية', example: { de: 'Das ist ein billiges Hemd.', ar: 'هذا قميص رخيص.' } },
    { id: 'voc-adjektiv-hell', word: 'hell', partOfSpeech: 'adjective', meaningAr: 'مضيء', level: 'A2', category: 'صفات وصفية', example: { de: 'Wir haben ein helles Zimmer.', ar: 'عندنا غرفة مضيئة.' } },
    { id: 'voc-adjektiv-frisch', word: 'frisch', partOfSpeech: 'adjective', meaningAr: 'طازج', level: 'A2', category: 'صفات وصفية', example: { de: 'Ich kaufe frisches Brot.', ar: 'أشتري خبزاً طازجاً.' } },
    { id: 'voc-adjektiv-rucksack', word: 'Rucksack', article: 'der', plural: 'Rucksäcke', partOfSpeech: 'noun', meaningAr: 'حقيبة الظهر', level: 'A2', category: 'مفردات مرافقة', example: { de: 'Mein Rucksack ist schwer.', ar: 'حقيبة ظهري ثقيلة.' } },
  ],
  dialogues: [
    {
      id: 'dialogue-adjektiv-informell',
      level: 'A2',
      moduleId: 'a2-m05',
      lessonId: 'a2-m05-l01',
      titleDe: 'Die neue Wohnung',
      titleAr: 'وصف شقة جديدة',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Sophie', de: 'Wie ist deine neue Wohnung?', ar: 'كيف هي شقتك الجديدة؟' },
        { speaker: 'b', name: 'Kemal', de: 'Sehr schön! Ich habe ein großes Wohnzimmer.', ar: 'جميلة جداً! لدي غرفة معيشة كبيرة.' },
        { speaker: 'a', name: 'Sophie', de: 'Und die Küche?', ar: 'والمطبخ؟' },
        { speaker: 'b', name: 'Kemal', de: 'Die Küche ist klein, aber modern.', ar: 'المطبخ صغير لكنه عصري.' },
      ],
    },
    {
      id: 'dialogue-adjektiv-formell',
      level: 'A2',
      moduleId: 'a2-m05',
      lessonId: 'a2-m05-l01',
      titleDe: 'Ein Hotel suchen',
      titleAr: 'البحث عن فندق',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Herr Voss', de: 'Wir suchen ein ruhiges Hotel im Zentrum.', ar: 'نبحث عن فندق هادئ في وسط المدينة.' },
        { speaker: 'b', name: 'Rezeptionistin', de: 'Ich empfehle Ihnen ein kleines, aber sehr gemütliches Hotel.', ar: 'أنصحكم بفندق صغير لكنه مريح جداً.' },
        { speaker: 'a', name: 'Herr Voss', de: 'Hat es ein günstiges Zimmer für zwei Personen?', ar: 'هل لديه غرفة بسعر جيد لشخصين؟' },
        { speaker: 'b', name: 'Rezeptionistin', de: 'Ja, wir haben ein schönes Doppelzimmer frei.', ar: 'نعم، لدينا غرفة مزدوجة جميلة شاغرة.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'النهايات -en وأداة النطق السريعة', bodyAr: 'في الكلام الطبيعي، تُنطق نهاية -en أحياناً بصوت مقتضب [ən] أو حتى [n] فقط، لكن الكتابة تحتفظ بها كاملة.', example: 'großen' },
    { titleAr: 'ß في groß تبقى صوت s حادة', bodyAr: 'ß تُنطق دائماً [s]، بغضّ النظر عن النهاية المضافة بعدها: groß، großer، großen.', example: 'großer' },
  ],
  exercises: [
    {
      id: 'ex-adjektiv-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر النهاية الصحيحة: der groß__ Mann (Nominativ)',
      questionDe: 'der groß__ Mann',
      options: ['-e', '-er', '-en', '-es'],
      correctIndex: 0,
      explanationAr: 'بعد أداة تعريف واضحة (der)، تكتفي الصفة بنهاية محايدة -e.',
    },
    {
      id: 'ex-adjektiv-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر النهاية الصحيحة: ein groß__ Mann (Nominativ، أداة تنكير صامتة)',
      questionDe: 'ein groß__ Mann',
      options: ['-er', '-e', '-en', '-es'],
      correctIndex: 0,
      explanationAr: 'ein لا تُظهر الجنس المذكّر في Nominativ، فتُعوّض الصفة بنهاية -er.',
    },
    {
      id: 'ex-adjektiv-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر النهاية الصحيحة: Ich trinke gern gut__ Kaffee. (بلا أداة، Akkusativ مذكّر)',
      questionDe: 'Ich trinke gern gut__ Kaffee.',
      options: ['-en', '-er', '-e', '-es'],
      correctIndex: 0,
      explanationAr: 'بلا أداة، تحمل الصفة نهاية أداة التعريف الغائبة: den → -en.',
    },
    {
      id: 'ex-adjektiv-4',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر النهاية الصحيحة: ein klein__ Kind (محايد، Nominativ، أداة تنكير)',
      questionDe: 'ein klein__ Kind',
      options: ['-es', '-e', '-er', '-en'],
      correctIndex: 0,
      explanationAr: 'ein لا تُظهر الجنس المحايد، فتُعوّض الصفة بنهاية -es.',
    },
    {
      id: 'ex-adjektiv-5',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل: Wir suchen ein billig__ Hotel. (محايد، Akkusativ، أداة تنكير)',
      sentenceDe: 'Wir suchen ein billig__ Hotel.',
      acceptedAnswers: ['es'],
      hint: 'محايد لا يتغيّر بين Nominativ وAkkusativ',
      explanationAr: 'Hotel محايدة؛ لا فرق بين Nominativ وAkkusativ هنا: billiges.',
    },
    {
      id: 'ex-adjektiv-6',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Feminine und Plural-Adjektivendungen ändern sich zwischen Nominativ und Akkusativ.',
      isTrue: false,
      explanationAr: 'خطأ — المؤنث والجمع لا يتغيّران أبداً بين Nominativ وAkkusativ في أيّ من الأنماط.',
    },
    {
      id: 'ex-adjektiv-7',
      type: 'matching',
      level: 'A2',
      promptAr: 'صل كل عبارة بنهايتها الصحيحة',
      pairs: [
        { de: 'der groß__ Mann', ar: '-e' },
        { de: 'ein groß__ Mann', ar: '-er' },
        { de: 'ein klein__ Kind', ar: '-es' },
        { de: 'einen groß__ Mann', ar: '-en' },
      ],
      explanationAr: 'كل عبارة تتبع قاعدة توزيع المعلومة بين الأداة والصفة حسب نوعها.',
    },
    {
      id: 'ex-adjektiv-8',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Sie', 'trägt', 'eine', 'schöne', 'rote', 'Bluse.'],
      correctOrder: [0, 1, 2, 3, 4, 5],
      explanationAr: 'الترتيب الصحيح: "Sie trägt eine schöne rote Bluse." — يمكن تتابع أكثر من صفة، وكلها تأخذ النهاية نفسها.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'der groß Mann',
      correct: 'der große Mann',
      explanationAr: 'الصفة قبل الاسم مباشرة تحتاج نهاية دائماً، ولا تبقى أبداً بشكلها الأساسي بلا نهاية.',
    },
    {
      wrong: 'ein große Mann',
      correct: 'ein großer Mann',
      explanationAr: 'بعد ein في حالة المذكّر Nominativ، تحتاج الصفة نهاية -er لتعويض غياب إشارة الجنس في الأداة.',
    },
    {
      wrong: 'Ich trinke guten Kaffee jeden Tag ohne Artikel أداة.',
      correct: 'Ich trinke jeden Tag guten Kaffee.',
      explanationAr: 'بلا أداة، تحمل الصفة نهاية أداة التعريف الغائبة كاملة (هنا -en لأن Kaffee مذكّر في Akkusativ).',
    },
    {
      wrong: 'die große Männer',
      correct: 'die großen Männer',
      explanationAr: 'الجمع يأخذ دائماً النهاية -en بعد أداة التعريف، وليس -e.',
    },
  ],
}

export const module05Adjektivdeklination: Module = {
  id: 'a2-m05',
  slug: 'adjektivdeklination',
  level: 'A2',
  title: 'Adjektivdeklination',
  titleAr: 'تصريف الصفة',
  order: 5,
  lessons: [lessonAdjektivdeklination],
}
