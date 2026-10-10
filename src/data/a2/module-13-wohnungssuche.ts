import type { Lesson, Module } from '@/types'

export const lessonWohnungssuche: Lesson = {
  id: 'a2-m13-l01',
  slug: 'wohnungssuche',
  level: 'A2',
  moduleId: 'a2-m13',
  title: 'Wohnungssuche',
  titleAr: 'البحث عن شقة',
  estimatedMinutes: 32,
  objectivesAr: [
    'قراءة إعلان شقة وفهم اختصاراته الشائعة',
    'مفردات الإيجار والعقد والودائع',
    'تكوين طلبات مهذبة باستخدام würde + Infinitiv',
    'الحديث مع مالك العقار في زيارة معاينة شقة',
  ],
  explanation: [
    {
      titleAr: 'würde + Infinitiv: طلب مهذّب أو افتراضي',
      bodyAr:
        'تركيب würde (مصرَّفة) + Infinitiv في نهاية الجملة يُستخدَم للتعبير عن رغبة مهذبة أو أمر افتراضي غير مؤكَّد، مشابه لصيغة would الإنجليزية: "Ich würde gern die Wohnung besichtigen" (أودّ معاينة الشقة، بتهذيب أكبر من "Ich will"). هذا التركيب بديل عملي منتشر لصيغة Konjunktiv II الكاملة (التي غالباً معقّدة الشكل لمعظم الأفعال)، فيكفيك حفظ würde + Infinitiv لتغطية أغلب الحالات اليومية.',
    },
    {
      titleAr: 'اختصارات شائعة في إعلانات الشقق',
      bodyAr:
        'تحتوي إعلانات الشقق الألمانية اختصارات كثيرة لتوفير المساحة: qm (Quadratmeter = متر مربّع)، Zi. (Zimmer = غرفة)، NK (Nebenkosten = تكاليف إضافية كالماء والتدفئة)، KM (Kaltmiete = الإيجار الأساسي بلا تكاليف إضافية)، WM (Warmmiete = الإيجار الكلّي شاملاً كل التكاليف).',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-wuerde-infinitiv',
      slug: 'wuerde-plus-infinitiv',
      level: 'A2',
      titleDe: 'würde + Infinitiv (Konjunktiv II vereinfacht)',
      titleAr: 'würde + Infinitiv (صيغة مبسّطة من Konjunktiv II)',
      conceptAr: 'صيغة مهذبة أو افتراضية بديلة عن Konjunktiv II الكاملة، تصلح لمعظم الأفعال في الحديث اليومي.',
      ruleAr:
        'صرّف würde حسب الفاعل وضعها في الموضع الثاني، ثم ضع الفعل الأساسي في صيغة المصدر بنهاية الجملة تماماً — نفس مبدأ الإطار اللفظي الذي رأيته مع الأفعال الشرطية وFutur I.',
      tables: [
        {
          caption: 'تصريف würde',
          headers: ['الضمير', 'würde'],
          rows: [
            { label: 'ich', values: ['würde'] },
            { label: 'du', values: ['würdest'] },
            { label: 'er / sie / es', values: ['würde'] },
            { label: 'wir', values: ['würden'] },
          ],
        },
        {
          caption: 'اختصارات إعلانات الشقق',
          headers: ['الاختصار', 'المعنى الكامل'],
          rows: [
            { label: 'qm', values: ['Quadratmeter — متر مربّع'] },
            { label: 'Zi.', values: ['Zimmer — غرفة'] },
            { label: 'NK', values: ['Nebenkosten — تكاليف إضافية'] },
            { label: 'KM', values: ['Kaltmiete — الإيجار الأساسي'] },
            { label: 'WM', values: ['Warmmiete — الإيجار الكلّي'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich würde die Wohnung gern besichtigen.',
          ar: 'أودّ معاينة الشقة.',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'würde', role: 'الفعل المساعد' },
            { text: 'die Wohnung gern', role: 'المفعول به + الحال' },
            { text: 'besichtigen.', role: 'الفعل الأساسي (مصدر)' },
          ],
        },
        { de: 'Würden Sie mir bitte den Mietvertrag schicken?', ar: 'هل يمكنكم إرسال عقد الإيجار لي رجاءً؟' },
      ],
    },
  ],
  examples: [
    { de: 'Die Miete beträgt 650 Euro warm.', ar: 'الإيجار ٦٥٠ يورو شاملاً التكاليف.' },
    { de: 'Wir brauchen eine Kaution von zwei Monatsmieten.', ar: 'نحتاج وديعة تعادل شهرَي إيجار.' },
    { de: 'Wann könnte ich die Wohnung besichtigen?', ar: 'متى يمكنني معاينة الشقة؟' },
    { de: 'Der Vermieter hat den Mietvertrag noch nicht unterschrieben.', ar: 'لم يوقّع المالك عقد الإيجار بعد.' },
  ],
  vocabulary: [
    { id: 'voc-wohnung-miete', word: 'Miete', article: 'die', partOfSpeech: 'noun', meaningAr: 'الإيجار', level: 'A2', category: 'البحث عن شقة' },
    { id: 'voc-wohnung-kaution', word: 'Kaution', article: 'die', partOfSpeech: 'noun', meaningAr: 'وديعة الضمان', level: 'A2', category: 'البحث عن شقة' },
    { id: 'voc-wohnung-vermieter', word: 'Vermieter', article: 'der', partOfSpeech: 'noun', meaningAr: 'المؤجّر / المالك', level: 'A2', category: 'البحث عن شقة' },
    { id: 'voc-wohnung-mieter', word: 'Mieter', article: 'der', partOfSpeech: 'noun', meaningAr: 'المستأجر', level: 'A2', category: 'البحث عن شقة' },
    { id: 'voc-wohnung-mietvertrag', word: 'Mietvertrag', article: 'der', partOfSpeech: 'noun', meaningAr: 'عقد الإيجار', level: 'A2', category: 'البحث عن شقة' },
    { id: 'voc-wohnung-besichtigung', word: 'Besichtigung', article: 'die', partOfSpeech: 'noun', meaningAr: 'معاينة (الشقة)', level: 'A2', category: 'البحث عن شقة' },
    { id: 'voc-wohnung-anzeige', word: 'Anzeige', article: 'die', partOfSpeech: 'noun', meaningAr: 'الإعلان', level: 'A2', category: 'البحث عن شقة' },
    { id: 'voc-wohnung-umziehen', word: 'umziehen', partOfSpeech: 'verb', meaningAr: 'ينتقل (للسكن)', level: 'A2', category: 'البحث عن شقة' },
  ],
  dialogues: [
    {
      id: 'dialogue-wohnung-informell',
      level: 'A2',
      moduleId: 'a2-m13',
      lessonId: 'a2-m13-l01',
      titleDe: 'Eine Wohnungsanzeige',
      titleAr: 'مشاركة إعلان شقة',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Alina', de: 'Schau mal, diese Anzeige! 65 qm, 2 Zi., 650 € KM.', ar: 'انظري، هذا الإعلان! ٦٥ متراً مربّعاً، غرفتان، ٦٥٠ يورو إيجار أساسي.' },
        { speaker: 'b', name: 'Berat', de: 'Das klingt gut. Wie hoch sind die Nebenkosten?', ar: 'يبدو جيداً. كم تبلغ التكاليف الإضافية؟' },
        { speaker: 'a', name: 'Alina', de: 'Ich würde einfach anrufen und fragen.', ar: 'سأتصل ببساطة وأسأل.' },
        { speaker: 'b', name: 'Berat', de: 'Gute Idee. Können wir die Wohnung diese Woche besichtigen?', ar: 'فكرة جيدة. هل يمكننا معاينة الشقة هذا الأسبوع؟' },
      ],
    },
    {
      id: 'dialogue-wohnung-formell',
      level: 'A2',
      moduleId: 'a2-m13',
      lessonId: 'a2-m13-l01',
      titleDe: 'Die Wohnungsbesichtigung',
      titleAr: 'معاينة شقة مع المالك',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Herr Vogel', de: 'Willkommen! Das ist das Wohnzimmer.', ar: 'أهلاً بكم! هذه غرفة المعيشة.' },
        { speaker: 'b', name: 'Frau Adeyemi', de: 'Sehr schön. Wie hoch ist die Kaution?', ar: 'جميلة جداً. كم تبلغ وديعة الضمان؟' },
        { speaker: 'a', name: 'Herr Vogel', de: 'Zwei Monatsmieten. Würden Sie gern den Mietvertrag durchlesen?', ar: 'شهرا إيجار. هل تودّون قراءة عقد الإيجار؟' },
        { speaker: 'b', name: 'Frau Adeyemi', de: 'Ja, gerne. Wann könnten wir einziehen?', ar: 'نعم، بكل سرور. متى يمكننا الانتقال؟' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'ü في Mieter وMietvertrag ليس ü حقيقياً', bodyAr: 'انتبه: Miete تحتوي ie (صوت طويل [iː])، وليس ü — لا تخلط بين الاثنين.', example: 'Miete' },
    { titleAr: 'würde: ü مقرّبة قصيرة', bodyAr: 'حرف ü في würde قصير [ʏ]، بخلاف طول ie في Miete.', example: 'würde' },
  ],
  exercises: [
    {
      id: 'ex-wohnung-such-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'ماذا يعني اختصار "NK" في إعلانات الشقق؟',
      questionDe: 'NK = ?',
      options: ['Nebenkosten', 'Neue Küche', 'Nächste Kaution', 'Nord Kreuzung'],
      correctIndex: 0,
      explanationAr: 'NK اختصار Nebenkosten (التكاليف الإضافية).',
    },
    {
      id: 'ex-wohnung-such-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الصيغة المهذبة الصحيحة: Ich ___ die Wohnung gern besichtigen.',
      questionDe: 'Ich ___ die Wohnung gern besichtigen.',
      options: ['würde', 'werde', 'wurde', 'bin'],
      correctIndex: 0,
      explanationAr: 'würde + Infinitiv تُستخدَم للتعبير عن رغبة مهذبة.',
    },
    {
      id: 'ex-wohnung-such-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الترجمة الصحيحة لكلمة "المؤجّر"',
      questionDe: '___',
      options: ['der Vermieter', 'der Mieter', 'die Miete', 'die Kaution'],
      correctIndex: 0,
      explanationAr: 'der Vermieter هو صاحب العقار الذي يؤجّره.',
    },
    {
      id: 'ex-wohnung-such-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل: ____ Sie mir bitte den Mietvertrag schicken? (صيغة مهذبة، Sie)',
      sentenceDe: '____ Sie mir bitte den Mietvertrag schicken?',
      acceptedAnswers: ['Würden'],
      hint: 'würde مصرّفة مع Sie',
      explanationAr: 'würden Sie...؟ صيغة سؤال مهذّبة شائعة جداً.',
    },
    {
      id: 'ex-wohnung-such-5',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '"Warmmiete" bedeutet die Miete ohne Nebenkosten.',
      isTrue: false,
      explanationAr: 'خطأ — Warmmiete تعني الإيجار الكلّي شاملاً كل التكاليف؛ Kaltmiete هي الإيجار بلا تكاليف إضافية.',
    },
    {
      id: 'ex-wohnung-such-6',
      type: 'matching',
      level: 'A2',
      promptAr: 'صل كل كلمة بمعناها',
      pairs: [
        { de: 'die Kaution', ar: 'وديعة الضمان' },
        { de: 'der Mietvertrag', ar: 'عقد الإيجار' },
        { de: 'die Besichtigung', ar: 'معاينة الشقة' },
        { de: 'umziehen', ar: 'ينتقل للسكن' },
      ],
      explanationAr: 'كل كلمة من هذه المجموعة لها مقابل واحد محدد بالعربية.',
    },
    {
      id: 'ex-wohnung-such-7',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Ich', 'würde', 'die', 'Wohnung', 'gern', 'besichtigen.'],
      correctOrder: [0, 1, 2, 3, 4, 5],
      explanationAr: 'الترتيب الصحيح: "Ich würde die Wohnung gern besichtigen."',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich würde besichtigen die Wohnung.',
      correct: 'Ich würde die Wohnung besichtigen.',
      explanationAr: 'الفعل الأساسي في صيغة المصدر يجب أن يبقى في نهاية الجملة تماماً، وليس مباشرة بعد würde.',
    },
    {
      wrong: 'Die Miete ist 650 Euro kalt und warm.',
      correct: 'Die Kaltmiete ist 650 Euro, die Warmmiete ist höher.',
      explanationAr: 'Kaltmiete وWarmmiete مصطلحان مختلفان يجب عدم الخلط بينهما: الأول بلا تكاليف إضافية، والثاني شاملاً لها.',
    },
    {
      wrong: 'Wir haben eine Kaution für zwei Monate.',
      correct: 'Wir zahlen eine Kaution von zwei Monatsmieten.',
      explanationAr: 'التعبير الصحيح لوصف قيمة الوديعة هو "von + عدد + Monatsmieten"، وليس "für".',
    },
  ],
}

export const module13Wohnungssuche: Module = {
  id: 'a2-m13',
  slug: 'wohnungssuche',
  level: 'A2',
  title: 'Wohnungssuche',
  titleAr: 'البحث عن شقة',
  order: 13,
  lessons: [lessonWohnungssuche],
}
