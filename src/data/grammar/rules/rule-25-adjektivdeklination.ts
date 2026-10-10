import type { GrammarRule } from '@/types'

/**
 * Rule 25 — Adjektivdeklination. One of the hardest A2 topics, so this
 * file is deliberately the most thorough in the roadmap so far: three
 * full declension tables (after der-words, after ein-words, with no
 * article) across Nominativ/Akkusativ/Dativ (Genitiv adjective endings
 * are out of scope — Genitiv itself is rule 33, much later), plus a
 * side-by-side summary and heavy example coverage per lesson brief.
 */
const rule: GrammarRule = {
  id: 'gr-25',
  number: 25,
  slug: '25-adjektivdeklination',
  level: 'A2',
  termDe: 'Adjektivdeklination',
  titleAr: 'تصريف الصفات',
  eyebrowAr: 'الدرس التاسع في مستوى A2 — من أهمّ دروس الخارطة',
  taglineAr:
    'هذا أحد أكثر موضوعات القواعد الألمانية تحدّياً — وأيضاً من أكثرها فائدة. حين تأتي الصفة **قبل الاسم مباشرة**، تأخذ نهاية. وأيّ نهاية بالضبط يعتمد على **ثلاثة أشياء**: هل توجد أداة تعريف أم أداة تنكير أم لا أداة إطلاقاً؟ وما جنس الاسم؟ وما الحالة الإعرابية؟',
  stats: [
    { value: '3', labelAr: 'أنماط تصريف (بعد der، بعد ein، بلا أداة)' },
    { value: '2', labelAr: 'نهايتان فقط يتكرّران: -e و-en (في أغلب الأحيان)' },
    { value: '3', labelAr: 'حالات إعرابية مغطّاة: Nominativ وAkkusativ وDativ' },
  ],
  heroExample: {
    de: 'Der alte Mann kauft einen neuen Mantel für seine kleine Tochter.',
    ar: 'يشتري الرجل العجوز معطفاً جديداً لابنته الصغيرة.',
  },
  objectivesAr: [
    'تفهم لماذا تحتاج الصفة نهاية أصلاً حين تكون قبل الاسم.',
    'تتقن النمط الأول: الصفة بعد أداة تعريف ([[der]]/[[die]]/[[das]]).',
    'تتقن النمط الثاني: الصفة بعد أداة تنكير أو ملكية أو [[kein]] ([[ein]]-Wörter).',
    'تتقن النمط الثالث: الصفة بلا أداة إطلاقاً.',
    'تطبّق الأنماط الثلاثة عبر Nominativ وAkkusativ وDativ بثقة.',
  ],

  sections: [
    {
      id: 'why',
      navLabelAr: 'لماذا تتغيّر؟',
      kickerDe: 'Warum eine Endung?',
      titleAr: 'لماذا تحتاج الصفة نهاية؟',
      titleDe: 'Die Grundidee',
      tone: 'accent',
      introAr: 'في كل عبارة اسمية ألمانية، **شيء واحد على الأقل** يجب أن يُظهر جنس الاسم وحالته بوضوح — إمّا الأداة، أو الصفة، أو كلاهما معاً. حين تكون الأداة واضحة تماماً (مثل [[der]])، تكتفي الصفة بنهاية بسيطة. وحين لا توجد أداة إطلاقاً، يجب أن **تحمل الصفة وحدها** كل هذه المعلومات.',
      blocks: [
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'القاعدة الذهبية',
          bodyAr: 'كلّما كانت الأداة **أقلّ وضوحاً** في تحديد الجنس (أو غابت تماماً)، كانت نهاية الصفة **أقوى وأوضح**. هذا هو المبدأ الذي يفسّر الأنماط الثلاثة القادمة كلّها.',
        },
      ],
    },

    {
      id: 'type-1-definite',
      navLabelAr: 'النمط الأول',
      kickerDe: 'Typ 1: nach der/die/das',
      titleAr: 'النمط الأول: بعد أداة التعريف',
      titleDe: 'schwache Deklination',
      tone: 'plum',
      introAr: 'حين تسبق الصفةَ أداةٌ معرّفة واضحة ([[der]]، [[die]]، [[das]]، [[die]])، فالأداة وحدها تكفي لتوضيح الجنس والحالة — فتأخذ الصفة **نهاية ضعيفة بسيطة**: إمّا [[-e]] أو [[-en]] فقط، لا غير.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'النمط الأول الكامل: der/die/das + صفة + اسم',
          columns: [
            { header: 'الحالة', lang: 'ar' },
            { header: 'مذكّر', lang: 'de', tone: 'plum' },
            { header: 'مؤنّث', lang: 'de', tone: 'plum' },
            { header: 'محايد', lang: 'de', tone: 'plum' },
            { header: 'جمع', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['Nominativ', 'der gute Mann', 'die gute Frau', 'das gute Kind', 'die guten Kinder'],
            ['Akkusativ', 'den guten Mann', 'die gute Frau', 'das gute Kind', 'die guten Kinder'],
            ['Dativ', 'dem guten Mann', 'der guten Frau', 'dem guten Kind', 'den guten Kindern'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'نهايتان فقط: -e أو -en',
          bodyAr: 'لاحظ أن النهاية **إمّا [[-e]] وإمّا [[-en]]**، لا شيء آخر. [[-e]] تظهر فقط في خمس خلايا (مذكّر-Nominativ، مؤنّث-Nominativ/Akkusativ، محايد-Nominativ/Akkusativ) — وكل الباقي [[-en]]. إن نسيتَ التفاصيل، استخدم [[-en]] كتخمين افتراضي وستكون صحيحاً في أغلب الحالات.',
        },
        {
          kind: 'examples',
          titleAr: 'النمط الأول في جمل متنوّعة',
          tone: 'plum',
          items: [
            { badge: 'مذكّر Nom.', de: '**Der alte** Mann liest die Zeitung.', ar: 'الرجل العجوز يقرأ الجريدة.' },
            { badge: 'مذكّر Akk.', de: 'Ich sehe **den alten** Mann.', ar: 'أرى الرجل العجوز.' },
            { badge: 'مؤنّث Dativ', de: 'Ich helfe **der alten** Frau.', ar: 'أساعد المرأة العجوز.' },
            { badge: 'محايد Nom.', de: '**Das kleine** Kind schläft.', ar: 'الطفل الصغير نائم.' },
            { badge: 'جمع Dativ', de: 'Ich gebe **den kleinen** Kindern Süßigkeiten.', ar: 'أعطي الأطفال الصغار حلوى.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بنهاية الصفة الصحيحة (النمط الأول)',
          exercises: [
            {
              id: 'gr25-p1-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (der Tisch — Nominativ)',
              sentenceDe: 'Der neu___ Tisch ist schön.',
              acceptedAnswers: ['e'],
              hint: 'مذكّر، Nominativ، بعد der',
              explanationAr: 'مذكّر في Nominativ بعد [[der]]: النهاية [[-e]].',
            },
            {
              id: 'gr25-p1-fill2',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (den Tisch — Akkusativ)',
              sentenceDe: 'Ich kaufe den neu___ Tisch.',
              acceptedAnswers: ['en'],
              hint: 'مذكّر، Akkusativ، بعد den',
              explanationAr: 'مذكّر في Akkusativ بعد [[den]]: النهاية [[-en]].',
            },
          ],
        },
      ],
    },

    {
      id: 'type-2-indefinite',
      navLabelAr: 'النمط الثاني',
      kickerDe: 'Typ 2: nach ein/mein/kein',
      titleAr: 'النمط الثاني: بعد ein-Wörter',
      titleDe: 'gemischte Deklination',
      tone: 'highlight',
      introAr: 'بعد [[ein]]، [[kein]]، أو أداة ملكية ([[mein]]، [[dein]]…)، الأداة نفسها **لا تُظهر الجنس بوضوح تامّ** في ثلاث خلايا فقط (مذكّر-Nominativ، محايد-Nominativ، محايد-Akkusativ) — لأن [[ein]] لا تحمل نهاية في هذه الحالات. فتتدخّل الصفة هناك بنهاية **أقوى** لتعوّض، بينما تبقى كالنمط الأول في كل مكان آخر — ولهذا يُسمّى «مختلطاً».',
      blocks: [
        {
          kind: 'table',
          captionAr: 'النمط الثاني الكامل: ein/mein/kein + صفة + اسم',
          columns: [
            { header: 'الحالة', lang: 'ar' },
            { header: 'مذكّر', lang: 'de', tone: 'highlight' },
            { header: 'مؤنّث', lang: 'de', tone: 'highlight' },
            { header: 'محايد', lang: 'de', tone: 'highlight' },
            { header: 'جمع', lang: 'de', tone: 'highlight' },
          ],
          rows: [
            ['Nominativ', 'ein guter Mann', 'eine gute Frau', 'ein gutes Kind', 'keine guten Kinder'],
            ['Akkusativ', 'einen guten Mann', 'eine gute Frau', 'ein gutes Kind', 'keine guten Kinder'],
            ['Dativ', 'einem guten Mann', 'einer guten Frau', 'einem guten Kind', 'keinen guten Kindern'],
          ],
          emphasisRows: [0],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'star',
          titleAr: 'الفرق الوحيد عن النمط الأول: ثلاث خلايا',
          bodyAr: 'قارن هذا الجدول بجدول النمط الأول — ستجدهما **متطابقين تماماً** إلا في ثلاث خلايا: مذكّر-Nominativ ([[guter]] بدل [[gute]])، ومحايد-Nominativ و-Akkusativ ([[gutes]] بدل [[gute]]). كل خلية أخرى بالضبط كما في النمط الأول.',
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'لاحظ: الجمع يستخدم keine/meine، لا eine',
          bodyAr: '[[ein]] ليس لها جمع (تعلّمتَ هذا في الدرس ٠٧)، فجمع هذا النمط يُبنى دائماً من [[kein]] أو أداة ملكية: [[keine guten Kinder]]، [[meine guten Freunde]] — وتتبع هنا نفس نهايات الجمع للنمط الأول تماماً ([[-en]] دائماً).',
        },
        {
          kind: 'examples',
          titleAr: 'النمط الثاني في جمل متنوّعة',
          tone: 'highlight',
          items: [
            { badge: 'مذكّر Nom. ⭐', de: '**Ein guter** Freund hilft immer.', ar: 'الصديق الجيّد يساعد دائماً.', noteAr: 'لاحظ [[guter]] بـ-er، وليس [[gute]].' },
            { badge: 'مذكّر Akk.', de: 'Ich habe **einen guten** Freund.', ar: 'لديّ صديق جيّد.' },
            { badge: 'محايد Nom. ⭐', de: '**Ein kleines** Kind weint.', ar: 'طفل صغير يبكي.', noteAr: 'لاحظ [[kleines]] بـ-es.' },
            { badge: 'مؤنّث Dativ', de: 'Ich schenke **meiner lieben** Mutter Blumen.', ar: 'أهدي أمّي الحبيبة زهوراً.' },
            { badge: 'جمع (kein)', de: 'Das sind **keine guten** Nachrichten.', ar: 'هذه ليست أخباراً جيدة.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بنهاية الصفة الصحيحة (النمط الثاني)',
          exercises: [
            {
              id: 'gr25-p2-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (ein Mann — Nominativ، مذكّر)',
              sentenceDe: 'Das ist ein neu___ Mann in der Firma.',
              acceptedAnswers: ['er'],
              hint: 'مذكّر، Nominativ، بعد ein',
              explanationAr: 'مذكّر في Nominativ بعد [[ein]]: النهاية [[-er]] (تعويضاً عن عدم وضوح [[ein]]).',
            },
            {
              id: 'gr25-p2-fill2',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (ein Kind — Nominativ، محايد)',
              sentenceDe: 'Das ist ein klein___ Kind.',
              acceptedAnswers: ['es'],
              hint: 'محايد، Nominativ، بعد ein',
              explanationAr: 'محايد في Nominativ بعد [[ein]]: النهاية [[-es]].',
            },
            {
              id: 'gr25-p2-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر النهاية الصحيحة (eine Frau — Nominativ، مؤنّث)',
              questionDe: 'Das ist eine nett___ Frau.',
              options: ['-er', '-e', '-es', '-en'],
              correctIndex: 1,
              explanationAr: 'المؤنّث لا يختلف عن النمط الأول في Nominativ: النهاية [[-e]].',
            },
          ],
        },
      ],
    },

    {
      id: 'type-3-no-article',
      navLabelAr: 'النمط الثالث',
      kickerDe: 'Typ 3: ohne Artikel',
      titleAr: 'النمط الثالث: بلا أداة إطلاقاً',
      titleDe: 'starke Deklination',
      tone: 'accent',
      introAr: 'حين لا توجد أداة إطلاقاً (مثلاً مع أسماء غير معدودة أو تعميمات)، لا يوجد شيء آخر يُظهر الجنس والحالة — فتحمل **الصفة وحدها** هذه المهمّة بنهايات **قوية**، تشبه إلى حدّ كبير نهايات أداة التعريف نفسها.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'النمط الثالث الكامل: صفة + اسم، بلا أداة',
          columns: [
            { header: 'الحالة', lang: 'ar' },
            { header: 'مذكّر', lang: 'de', tone: 'accent' },
            { header: 'مؤنّث', lang: 'de', tone: 'accent' },
            { header: 'محايد', lang: 'de', tone: 'accent' },
            { header: 'جمع', lang: 'de', tone: 'accent' },
          ],
          rows: [
            ['Nominativ', 'guter Wein', 'gute Milch', 'gutes Brot', 'gute Kinder'],
            ['Akkusativ', 'guten Wein', 'gute Milch', 'gutes Brot', 'gute Kinder'],
            ['Dativ', 'gutem Wein', 'guter Milch', 'gutem Brot', 'guten Kindern'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'قارنها بأداة التعريف نفسها',
          bodyAr: 'هذه النهايات ([[-er]]، [[-e]]، [[-es]]، [[-em]]، [[-en]]) تكاد تُطابق حروف نهاية أداة التعريف ([[der]]، [[die]]، [[das]]، [[dem]]، [[den]]) — الصفة هنا «تتصرّف مثل الأداة» لأنه لا توجد أداة فعلية لتقوم بهذا الدور.',
        },
        {
          kind: 'examples',
          titleAr: 'النمط الثالث في جمل متنوّعة',
          tone: 'accent',
          items: [
            { badge: 'مذكّر Nom.', de: '**Guter** Wein ist nicht immer teuer.', ar: 'النبيذ الجيّد ليس دائماً غالياً.' },
            { badge: 'مؤنّث Akk.', de: 'Ich trinke gern **kalte** Milch.', ar: 'أحبّ شرب الحليب البارد.' },
            { badge: 'محايد Dativ', de: 'Das Rezept schmeckt mit **frischem** Brot besser.', ar: 'الوصفة ألذّ مع خبز طازج.' },
            { badge: 'جمع Nom.', de: '**Kleine** Kinder brauchen viel Schlaf.', ar: 'الأطفال الصغار يحتاجون نوماً كثيراً.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بنهاية الصفة الصحيحة (النمط الثالث)',
          exercises: [
            {
              id: 'gr25-p3-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (Milch — مؤنّث، بلا أداة، Nominativ)',
              sentenceDe: 'Frisch___ Milch schmeckt gut.',
              acceptedAnswers: ['e'],
              hint: 'مؤنّث، بلا أداة، Nominativ',
              explanationAr: 'مؤنّث في Nominativ بلا أداة: النهاية [[-e]].',
            },
          ],
        },
      ],
    },

    {
      id: 'summary',
      navLabelAr: 'ملخّص شامل',
      kickerDe: 'Zusammenfassung',
      titleAr: 'الأنماط الثلاثة جنباً إلى جنب',
      titleDe: 'Alle drei Typen im Vergleich',
      tone: 'highlight',
      introAr: 'هذا الجدول يجمع الأنماط الثلاثة في حالة [[Nominativ]] فقط — استخدمه لرؤية الفرق دفعة واحدة، ثم راجع الجداول الكاملة أعلاه عند الحاجة.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'مقارنة الأنماط الثلاثة في Nominativ',
          columns: [
            { header: 'النمط', lang: 'ar' },
            { header: 'مذكّر', lang: 'de' },
            { header: 'مؤنّث', lang: 'de' },
            { header: 'محايد', lang: 'de' },
          ],
          rows: [
            ['بعد der/die/das', 'der gute Mann', 'die gute Frau', 'das gute Kind'],
            ['بعد ein/kein', 'ein guter Mann', 'eine gute Frau', 'ein gutes Kind'],
            ['بلا أداة', 'guter Wein', 'gute Milch', 'gutes Brot'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'sparkles',
          titleAr: 'نصيحة ختامية للحفظ',
          bodyAr: 'لاحظ أن النمط الثاني (بعد ein) يختلف عن الأول في ثلاث خلايا فقط: مذكّر-Nominativ ومحايد-Nominativ/Akkusativ، حيث تحمل الصفة نفسها إشارة الجنس ([[guter]]، [[gutes]]) لأن [[ein]] لا يُظهرها. أمّا النمط الثالث (بلا أداة) فتحمل الصفة فيه نهاية الأداة المعرّفة كاملةً تقريباً: ستجد [[-er]] في مؤنّث-Dativ، و[[-em]] في مذكّر/محايد-Dativ، و[[-e]] في الجمع-Nominativ/Akkusativ (بدل [[-en]]). الخلايا الوحيدة المتطابقة في الأنماط الثلاثة هي مذكّر-Akkusativ ([[-en]]) ومؤنّث-Nominativ/Akkusativ ([[-e]]).',
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
      introAr: 'أشهر الأخطاء هنا هي تطبيق نهاية نمط واحد على كل الحالات، أو نسيان النهاية تماماً.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ein gute Mann hilft mir.',
              correct: 'Ein guter Mann hilft mir.',
              explanationAr: 'مذكّر-Nominativ بعد [[ein]] يحتاج [[-er]]، وليس [[-e]].',
            },
            {
              wrong: 'Das ist ein kleine Kind.',
              correct: 'Das ist ein kleines Kind.',
              explanationAr: 'محايد-Nominativ بعد [[ein]] يحتاج [[-es]].',
            },
            {
              wrong: 'Ich kaufe der neue Tisch.',
              correct: 'Ich kaufe den neuen Tisch.',
              explanationAr: 'الأداة يجب أن تتحوّل إلى Akkusativ ([[den]])، والصفة تأخذ [[-en]] معها.',
            },
            {
              wrong: 'Guter Wein ist teuer meistens.',
              correct: 'Guter Wein ist meistens teuer.',
              explanationAr: 'هذا خطأ ترتيب لا تصريف: الظرف [[meistens]] يأتي عادة قبل الصفة الخبرية في مثل هذا السياق.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'der gute Mann', hintAr: 'أيّ نمط؟', backAr: 'النمط الأول (بعد أداة تعريف) — نهاية ضعيفة: -e أو -en فقط.' },
    { frontDe: 'ein guter Mann', hintAr: 'لماذا -er؟', backAr: 'النمط الثاني، مذكّر-Nominativ: ein لا توضّح الجنس، فتعوّض الصفة بـ -er.' },
    { frontDe: 'ein gutes Kind', hintAr: 'لماذا -es؟', backAr: 'النمط الثاني، محايد: نفس فكرة التعويض.' },
    { frontDe: 'guter Wein', hintAr: 'أيّ نمط؟', backAr: 'النمط الثالث (بلا أداة) — الصفة تحمل كل المعلومات وحدها.' },
    { frontDe: 'النهايات الأكثر تكراراً', hintAr: 'ما هما؟', backAr: '-e و-en — يغطّيان أغلب خلايا النمط الأول والثاني.' },
    { frontDe: 'الاختلاف الحقيقي بين الأنماط', hintAr: 'أين يظهر؟', backAr: 'فقط في مذكّر-Nominativ ومحايد-Nominativ/Akkusativ.' },
  ],

  quiz: [
    {
      id: 'gr25-q1',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (der Mann — Nominativ)',
      sentenceDe: 'Der freundlich___ Mann wohnt nebenan.',
      acceptedAnswers: ['e'],
      explanationAr: 'النمط الأول، مذكّر-Nominativ: [[-e]].',
    },
    {
      id: 'gr25-q2',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (ein Mann — Nominativ)',
      sentenceDe: 'Das ist ein freundlich___ Mann.',
      acceptedAnswers: ['er'],
      explanationAr: 'النمط الثاني، مذكّر-Nominativ: [[-er]].',
    },
    {
      id: 'gr25-q3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر النهاية الصحيحة (ein Kind — Akkusativ، محايد)',
      questionDe: 'Sie hat ein klein___ Kind.',
      options: ['-e', '-es', '-en', '-er'],
      correctIndex: 1,
      explanationAr: 'محايد في Akkusativ بعد [[ein]]: [[-es]] (يبقى كما في Nominativ).',
    },
    {
      id: 'gr25-q4',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر النهاية الصحيحة (den Tisch — Akkusativ، مذكّر، بعد der)',
      questionDe: 'Ich kaufe den neu___ Tisch.',
      options: ['-e', '-er', '-en', '-es'],
      correctIndex: 2,
      explanationAr: 'مذكّر في Akkusativ بعد [[den]]: [[-en]].',
    },
    {
      id: 'gr25-q5',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (Wein — بلا أداة، Nominativ، مذكّر)',
      sentenceDe: 'Gut___ Wein kommt oft aus Deutschland.',
      acceptedAnswers: ['er'],
      explanationAr: 'النمط الثالث، مذكّر-Nominativ: [[-er]].',
    },
    {
      id: 'gr25-q6',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im Dativ sind alle drei Typen praktisch identisch.',
      isTrue: true,
      explanationAr: 'صحيح تقريباً: في Dativ الأنماط الثلاثة متطابقة أو شبه متطابقة.',
    },
    {
      id: 'gr25-q7',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق العبارة بنمط التصريف الصحيح',
      pairs: [
        { de: 'der gute Mann', ar: 'النمط الأول' },
        { de: 'ein guter Mann', ar: 'النمط الثاني' },
        { de: 'guter Wein', ar: 'النمط الثالث' },
      ],
      explanationAr: 'راجع الأقسام الثلاثة أعلاه إن أخطأت.',
    },
    {
      id: 'gr25-q8',
      type: 'translation',
      level: 'A2',
      promptAr: 'ترجم إلى الألمانية (der Tisch مذكّر، Nominativ)',
      direction: 'ar-to-de',
      sourceText: 'الطاولة الجديدة جميلة.',
      acceptedAnswers: ['Der neue Tisch ist schön.'],
      explanationAr: 'النمط الأول، مذكّر-Nominativ: [[Der neue Tisch]]. والصفة بعد [[ist]] بلا نهاية: [[schön]].',
    },
  ],

  cheatSheet: [
    { de: 'der gute · die gute · das gute · die guten', ar: 'النمط الأول (بعد أداة تعريف) — Nominativ.' },
    { de: 'ein guter · eine gute · ein gutes', ar: 'النمط الثاني (بعد ein/kein) — Nominativ.' },
    { de: 'guter · gute · gutes', ar: 'النمط الثالث (بلا أداة) — Nominativ.' },
    { de: 'الاختلاف الحقيقي: مذكّر-Nom. ومحايد-Nom./Akk. فقط', ar: 'كل شيء آخر شبه متطابق بين الأنماط.' },
    { de: '-e أو -en', ar: 'أكثر نهايتين تكراراً في النمطين الأول والثاني.' },
  ],
}

export default rule
