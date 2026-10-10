import type { GrammarRule } from '@/types'

/**
 * Rule 14 — basic prepositions. Akkusativ prepositions (durch, für,
 * gegen, ohne, um) are taught fully and actively, since Akkusativ (rule
 * 09) is already known. Dativ prepositions (aus, bei, mit, nach, seit,
 * von, zu) are introduced only as a fixed list + common chunk phrases —
 * Dativ itself is rule 15, immediately next, which is where their full
 * declension is taught. Wechselpräpositionen are A2 (rule 20).
 */
const rule: GrammarRule = {
  id: 'gr-14',
  number: 14,
  slug: '14-praepositionen',
  level: 'A1',
  termDe: 'Präpositionen',
  titleAr: 'حروف الجر الأساسية',
  eyebrowAr: 'الدرس الرابع عشر في خارطة القواعد',
  taglineAr:
    'كل حرف جرّ ألماني «يفرض» حالة إعرابية معيّنة على الاسم الذي يليه. بعض حروف الجرّ تفرض [[Akkusativ]] دائماً — وهذه ستتقنها اليوم بالكامل. ومجموعة أخرى تفرض [[Dativ]]، الذي ستتعلّمه بالتفصيل في الدرس القادم مباشرة؛ هنا ستتعرّف عليها كعبارات جاهزة أولاً.',
  stats: [
    { value: '5', labelAr: 'حروف جرّ تفرض Akkusativ دائماً' },
    { value: '7', labelAr: 'حروف جرّ تفرض Dativ دائماً' },
    { value: '30+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Das Geschenk ist für meinen Bruder. Ich komme aus Ägypten.',
    ar: 'الهدية لأخي. أنا من مصر.',
  },
  objectivesAr: [
    'تحفظ حروف الجرّ الخمسة التي تفرض [[Akkusativ]] دائماً وتستخدمها بثقة.',
    'تتعرّف على حروف الجرّ السبعة التي تفرض [[Dativ]] وتستخدم عبارات شائعة بها.',
    'تفهم أن حرف الجرّ وحالته الإعرابية زوج ثابت يُحفظ معاً.',
  ],

  sections: [
    {
      id: 'concept',
      navLabelAr: 'الفكرة',
      kickerDe: 'Präposition + Kasus',
      titleAr: 'كل حرف جرّ له حالة ثابتة',
      titleDe: 'feste Präpositionen',
      tone: 'accent',
      introAr: 'حروف الجرّ في هذا الدرس **ثابتة**: نفس الحرف يفرض نفس الحالة دائماً، بلا استثناء ولا تغيّر حسب المعنى (خلافاً لحروف الجرّ المتغيّرة [[Wechselpräpositionen]] التي ستأتي في مستوى A2).',
      blocks: [
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'احفظ الحرف مع حالته كوحدة واحدة',
          bodyAr: 'بدل حفظ «معنى» كل حرف جرّ منفصلاً عن حالته، احفظهما معاً كوحدة: [[für + Akkusativ]]، [[mit + Dativ]]. هكذا لن تحتاج للتفكير لاحقاً — الحرف نفسه يذكّرك بالحالة.',
        },
      ],
    },

    {
      id: 'akkusativ-preps',
      navLabelAr: 'حروف Akkusativ',
      kickerDe: 'Präpositionen + Akkusativ',
      titleAr: 'حروف جرّ تفرض Akkusativ',
      titleDe: 'durch · für · gegen · ohne · um',
      tone: 'plum',
      introAr: 'خمسة حروف جرّ تفرض [[Akkusativ]] دائماً على الاسم الذي يليها — وبما أنك أتقنت [[Akkusativ]] بالفعل (الدرس ٠٩)، ستستخدمها بثقة فوراً.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'حروف Akkusativ الخمسة',
          columns: [
            { header: 'الحرف', lang: 'de', tone: 'plum' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['durch', 'عبر / خلال', 'durch den Park'],
            ['für', 'من أجل / لـ', 'für meinen Bruder'],
            ['gegen', 'ضدّ / مقابل', 'gegen die Wand'],
            ['ohne', 'بدون', 'ohne meinen Freund'],
            ['um', 'حول / في تمام الساعة', 'um den Tisch'],
          ],
        },
        {
          kind: 'examples',
          titleAr: 'حروف Akkusativ في جمل',
          tone: 'plum',
          items: [
            { badge: 'für', de: 'Das Geschenk ist **für den** Lehrer.', ar: 'الهدية للمعلّم.' },
            { badge: 'ohne', de: 'Ich gehe **ohne** meinen Bruder.', ar: 'أذهب بدون أخي.' },
            { badge: 'durch', de: 'Wir gehen **durch den** Park.', ar: 'نمشي عبر الحديقة.' },
            { badge: 'um', de: 'Der Kurs beginnt **um** acht Uhr.', ar: 'تبدأ الدورة الساعة الثامنة.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'star',
          titleAr: 'لا تنسَ: der يتحوّل إلى den',
          bodyAr: 'بعد أيّ حرف من هذه الخمسة، الاسم المذكّر المعرّف يتحوّل: [[der Park]] → [[durch den Park]]. المؤنّث والمحايد والجمع لا يتغيّرون، تماماً كقاعدة [[Akkusativ]] العامة.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بأداة Akkusativ الصحيحة',
          exercises: [
            {
              id: 'gr14-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'أكمل (für + der Vater)',
              sentenceDe: 'Das ist für ___ Vater.',
              acceptedAnswers: ['den'],
              hint: 'für تفرض Akkusativ',
              explanationAr: '[[der Vater]] مذكّر، وبعد [[für]] يصبح [[den Vater]].',
            },
            {
              id: 'gr14-p1-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'اختر حرف الجرّ المناسب: «أذهب بدون سيارتي»',
              questionDe: 'Ich gehe ___ mein Auto.',
              options: ['für', 'ohne', 'durch', 'gegen'],
              correctIndex: 1,
              explanationAr: '[[ohne]] تعني «بدون».',
            },
          ],
        },
      ],
    },

    {
      id: 'dativ-preps-preview',
      navLabelAr: 'معاينة حروف Dativ',
      kickerDe: 'Vorschau: Dativ-Präpositionen',
      titleAr: 'معاينة: حروف تفرض Dativ',
      titleDe: 'aus · bei · mit · nach · seit · von · zu',
      tone: 'highlight',
      introAr: 'هذه السبعة حروف تفرض [[Dativ]] دائماً. لم تتعلّم [[Dativ]] بتفاصيله بعد (الدرس القادم مباشرة)، فتعامل معها الآن كـ**عبارات جاهزة** تحفظها كوحدات — ستفهم *لماذا* شكلها هكذا في الدرس التالي.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'حروف Dativ السبعة (للتعرّف فقط الآن)',
          columns: [
            { header: 'الحرف', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'عبارة جاهزة', lang: 'de' },
          ],
          rows: [
            ['aus', 'من (أصل/مصدر)', 'aus Ägypten'],
            ['bei', 'عند / لدى', 'bei der Arbeit'],
            ['mit', 'مع / بواسطة', 'mit dem Bus'],
            ['nach', 'إلى / بعد', 'nach Hause'],
            ['seit', 'منذ', 'seit einem Jahr'],
            ['von', 'من (ملكية/مصدر)', 'von meiner Mutter'],
            ['zu', 'إلى (شخص/مكان)', 'zu Hause'],
          ],
        },
        {
          kind: 'examples',
          titleAr: 'عبارات جاهزة شائعة جداً',
          tone: 'highlight',
          items: [
            { badge: 'aus', de: 'Ich komme **aus** Syrien.', ar: 'أنا من سوريا.' },
            { badge: 'mit', de: 'Ich fahre **mit dem** Bus.', ar: 'أذهب بالحافلة.' },
            { badge: 'nach', de: 'Ich gehe **nach** Hause.', ar: 'أذهب إلى البيت.' },
            { badge: 'zu', de: 'Ich bin **zu** Hause.', ar: 'أنا في البيت.' },
          ],
        },
        {
          kind: 'details',
          summaryAr: 'لماذا dem وليس der أو das هنا؟',
          paragraphsAr: [
            'لاحظت في [[mit dem Bus]] أن [[der Bus]] (مذكّر) تحوّلت إلى [[dem Bus]]. هذا بالضبط ما سيشرحه الدرس القادم [[Dativ]] بالتفصيل الكامل — الآن يكفي أن تحفظ العبارة كما هي.',
          ],
        },
      ],
    },

    {
      id: 'mistakes',
      navLabelAr: 'أخطاء شائعة',
      kickerDe: 'Typische Fehler',
      titleAr: 'أخطاء شائعة',
      titleDe: 'Fehler',
      tone: 'error',
      introAr: 'أشهر خطأ هو استخدام أداة Nominativ بعد حرف جرّ يفرض Akkusativ.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Das Geschenk ist für der Lehrer.',
              correct: 'Das Geschenk ist für den Lehrer.',
              explanationAr: '[[für]] تفرض Akkusativ، فالمذكّر المعرّف يصبح [[den]].',
            },
            {
              wrong: 'Ich gehe durch der Park.',
              correct: 'Ich gehe durch den Park.',
              explanationAr: 'نفس القاعدة: [[durch]] + Akkusativ.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'durch · für · gegen · ohne · um', hintAr: 'أيّ حالة تفرضها؟', backAr: 'Akkusativ دائماً.' },
    { frontDe: 'aus · bei · mit · nach · seit · von · zu', hintAr: 'أيّ حالة تفرضها؟', backAr: 'Dativ دائماً (التفاصيل في الدرس القادم).' },
    { frontDe: 'für den Lehrer', hintAr: 'لماذا den؟', backAr: 'für تفرض Akkusativ، وder Lehrer مذكّر.' },
    { frontDe: 'mit dem Bus', hintAr: 'عبارة جاهزة', backAr: 'بالحافلة — احفظها كوحدة الآن.' },
  ],

  quiz: [
    {
      id: 'gr14-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الأداة الصحيحة',
      questionDe: 'Das ist für ___ Bruder.',
      options: ['der', 'den', 'dem', 'die'],
      correctIndex: 1,
      explanationAr: '[[für]] + Akkusativ → [[den Bruder]].',
    },
    {
      id: 'gr14-q2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„ohne" verlangt den Akkusativ.',
      isTrue: true,
      explanationAr: 'صحيح: [[ohne]] من حروف Akkusativ الخمسة.',
    },
    {
      id: 'gr14-q3',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق حرف الجرّ بمعناه',
      pairs: [
        { de: 'für', ar: 'من أجل / لـ' },
        { de: 'mit', ar: 'مع / بواسطة' },
        { de: 'ohne', ar: 'بدون' },
        { de: 'aus', ar: 'من (أصل/مصدر)' },
      ],
      explanationAr: 'راجع جدولَي حروف الجرّ أعلاه إن أخطأت.',
    },
    {
      id: 'gr14-q4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل: من أين أنتَ؟ — أنا من المغرب.',
      sentenceDe: 'Ich komme ___ Marokko.',
      acceptedAnswers: ['aus'],
      explanationAr: '[[aus]] = من (أصل/مصدر).',
    },
  ],

  cheatSheet: [
    { de: 'durch · für · gegen · ohne · um', ar: 'حروف Akkusativ الخمسة — احفظها كمجموعة.' },
    { de: 'aus · bei · mit · nach · seit · von · zu', ar: 'حروف Dativ السبعة — التفاصيل في الدرس القادم.' },
    { de: 'für den Lehrer', ar: 'مثال: حرف Akkusativ + مذكّر معرّف → den.' },
    { de: 'mit dem Bus · nach Hause · zu Hause', ar: 'عبارات Dativ جاهزة للحفظ الآن.' },
  ],
}

export default rule
