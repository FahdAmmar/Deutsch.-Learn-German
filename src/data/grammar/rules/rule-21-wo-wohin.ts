import type { GrammarRule } from '@/types'

/**
 * Rule 21 — Wo? / Wohin?, deepening rule 20. Adds the classic
 * intransitive/transitive position-verb pairs (liegen/legen,
 * stehen/stellen, hängen/hängen, sitzen/setzen) — a notorious A2 topic —
 * plus `wohin`/`woher` as single words vs. the colloquial split
 * `wo…hin`/`wo…her`.
 */
const rule: GrammarRule = {
  id: 'gr-21',
  number: 21,
  slug: '21-wo-wohin',
  level: 'A2',
  termDe: 'Wo? / Wohin?',
  titleAr: 'مكان ثابت أم اتجاه',
  eyebrowAr: 'الدرس الخامس في مستوى A2',
  taglineAr:
    'في الدرس الأول (رقم ٠٥) تعرّفتَ على الفرق بين [[wo]] و[[wohin]] و[[woher]] بشكل أساسي. الآن، بعد أن أتقنتَ حروف الجرّ المتغيّرة، سنغوص أعمق في أزواج أفعال تُحيّر كثيراً من المتعلّمين: [[liegen/legen]]، [[stehen/stellen]]، [[hängen/hängen]]، [[sitzen/setzen]].',
  stats: [
    { value: '4', labelAr: 'أزواج أفعال سكون/وضع' },
    { value: '2', labelAr: 'سؤالان: Wo? وWohin?' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich lege das Buch auf den Tisch. Jetzt liegt das Buch auf dem Tisch.',
    ar: 'أضع الكتاب على الطاولة. الآن الكتاب موضوع (يرقد) على الطاولة.',
  },
  objectivesAr: [
    'تفرّق عملياً بين فعل «وضع الشيء» (حركة، Akkusativ) وفعل «وجود الشيء في وضعية» (سكون، Dativ).',
    'تحفظ أزواج الأفعال الأربعة الشائعة وتستخدم كلّاً منها في سياقه الصحيح.',
    'تجيب عن أسئلة [[Wo?]] و[[Wohin?]] بجملة كاملة باستخدام الفعل المناسب.',
  ],

  sections: [
    {
      id: 'pairs-concept',
      navLabelAr: 'فكرة الأزواج',
      kickerDe: 'Verbpaare',
      titleAr: 'كل زوج: فعل «وضع» وفعل «وجود»',
      titleDe: 'legen/liegen · stellen/stehen',
      tone: 'accent',
      introAr: 'لكل وضعية جسم أربعة أزواج أفعال في الألمانية: فعل **يصف فعل الوضع** (حركة — Akkusativ) وفعل **يصف نتيجة الوضع** (سكون — Dativ). العربية تستخدم غالباً فعلاً واحداً («أضع» / «موضوع») لكليهما، لذا هذا التمييز يحتاج انتباهاً خاصاً.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الأزواج الأربعة',
          columns: [
            { header: 'وضعية الجسم', lang: 'ar' },
            { header: 'فعل الوضع (حركة)', lang: 'de', tone: 'accent' },
            { header: 'فعل الوجود (سكون)', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['أفقي (مستلقٍ)', 'legen (يضع مستلقياً)', 'liegen (يرقد)'],
            ['عمودي (واقف)', 'stellen (يضع واقفاً)', 'stehen (يقف)'],
            ['معلّق', 'hängen (يعلّق)', 'hängen (معلَّق)'],
            ['جالس', 'setzen (يُجلس)', 'sitzen (يجلس)'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'كيف تختار الفعل الصحيح؟',
          bodyAr: 'اسأل: هل أصف **فعل النقل** (أنا أضع الشيء الآن) أم **نتيجة الوضع** (الشيء موجود بهذه الوضعية)؟ الأول دائماً فعل منتظم يأخذ مفعولاً به في Akkusativ وحرف جرّ متغيّر بـAkkusativ. الثاني دائماً فعل يصف حالة ويستخدم حرف الجرّ بـDativ.',
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'alert',
          titleAr: 'hängen استثناء: نفس الكلمة للاثنين',
          bodyAr: '[[hängen]] فريدة: تُستخدم للفعلين معاً، لكن تصريفها يختلف. بصيغة **منتظمة** ([[hängte]] في الماضي) حين تصف **فعل التعليق** (حركة)، وبصيغة **شاذّة** ([[hing]] في الماضي) حين تصف **حالة التعليق** (سكون). في A2 يكفي أن تلاحظ الفرق في المضارع بالسياق.',
        },
      ],
    },

    {
      id: 'application',
      navLabelAr: 'التطبيق',
      kickerDe: 'Anwendung',
      titleAr: 'الأزواج في جمل كاملة',
      titleDe: 'legen/liegen · stellen/stehen',
      tone: 'plum',
      introAr: 'قارن كل جملتين معاً: الأولى تصف لحظة الوضع (حركة)، والثانية تصف النتيجة بعد ذلك (سكون).',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'legen (يضع) مقابل liegen (يرقد)',
          modes: [
            {
              labelAr: 'legen — حركة',
              captionAr: 'فعل الوضع؛ يحتاج مفعولاً به + Akkusativ.',
              parts: [{ text: 'Ich lege das Buch auf' }, { text: 'den Tisch.', tone: 'accent' }],
            },
            {
              labelAr: 'liegen — سكون',
              captionAr: 'وصف الحالة الناتجة؛ يستخدم Dativ.',
              parts: [{ text: 'Das Buch liegt auf' }, { text: 'dem Tisch.', tone: 'plum' }],
            },
          ],
        },
        {
          kind: 'compare',
          titleAr: 'stellen (يضع واقفاً) مقابل stehen (يقف)',
          modes: [
            {
              labelAr: 'stellen — حركة',
              captionAr: 'فعل الوضع العمودي؛ Akkusativ.',
              parts: [{ text: 'Ich stelle die Flasche auf' }, { text: 'den Tisch.', tone: 'accent' }],
            },
            {
              labelAr: 'stehen — سكون',
              captionAr: 'وصف الحالة الواقفة؛ Dativ.',
              parts: [{ text: 'Die Flasche steht auf' }, { text: 'dem Tisch.', tone: 'plum' }],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'الأزواج الأربعة كلها في جمل',
          tone: 'plum',
          items: [
            { badge: 'legen', de: 'Ich **lege** die Jacke aufs Bett.', ar: 'أضع السترة على السرير.' },
            { badge: 'liegen', de: 'Die Jacke **liegt** auf dem Bett.', ar: 'السترة موضوعة على السرير.' },
            { badge: 'stellen', de: 'Er **stellt** den Stuhl an die Wand.', ar: 'يضع الكرسي بجانب الحائط.' },
            { badge: 'stehen', de: 'Der Stuhl **steht** an der Wand.', ar: 'الكرسي موضوع بجانب الحائط.' },
            { badge: 'hängen (وضع)', de: 'Sie **hängt** das Bild an die Wand.', ar: 'تعلّق اللوحة على الحائط.' },
            { badge: 'hängen (حالة)', de: 'Das Bild **hängt** an der Wand.', ar: 'اللوحة معلّقة على الحائط.' },
            { badge: 'setzen', de: 'Ich **setze** das Kind auf den Stuhl.', ar: 'أُجلس الطفل على الكرسي.' },
            { badge: 'sitzen', de: 'Das Kind **sitzt** auf dem Stuhl.', ar: 'الطفل جالس على الكرسي.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: اختر الفعل المناسب',
          exercises: [
            {
              id: 'gr21-p1-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'الكتاب موجود بالفعل على الطاولة — أيّ فعل؟',
              questionDe: 'Das Buch ___ auf dem Tisch.',
              options: ['legt', 'liegt', 'stellt', 'steht'],
              correctIndex: 1,
              explanationAr: 'وصف حالة سكون لجسم أفقي → [[liegen]].',
            },
            {
              id: 'gr21-p1-mc2',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'أنتَ الآن تضع الكتاب على الطاولة — أيّ فعل؟',
              questionDe: 'Ich ___ das Buch auf den Tisch.',
              options: ['liege', 'lege', 'stehe', 'stelle'],
              correctIndex: 1,
              explanationAr: 'فعل وضع لجسم أفقي → [[legen]].',
            },
            {
              id: 'gr21-p1-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (الكرسي واقف بجانب الطاولة — حالة)',
              sentenceDe: 'Der Stuhl ___ neben dem Tisch.',
              acceptedAnswers: ['steht'],
              hint: 'حالة سكون لجسم عمودي',
              explanationAr: 'وصف حالة سكون عمودية → [[stehen]].',
            },
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
      introAr: 'أشهر خطأ هو استخدام فعل الحالة بدل فعل الحركة (أو العكس)، لأن العربية لا تميّز بينهما بنفس الوضوح.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich liege das Buch auf den Tisch.',
              correct: 'Ich lege das Buch auf den Tisch.',
              explanationAr: '[[liegen]] لا تأخذ مفعولاً به؛ فعل الوضع الصحيح هو [[legen]].',
            },
            {
              wrong: 'Das Buch legt auf dem Tisch.',
              correct: 'Das Buch liegt auf dem Tisch.',
              explanationAr: 'لوصف حالة قائمة نستخدم [[liegen]] لا [[legen]].',
            },
            {
              wrong: 'Der Stuhl steht neben den Tisch.',
              correct: 'Der Stuhl steht neben dem Tisch.',
              explanationAr: '[[stehen]] فعل سكون، فيحتاج Dativ: [[dem Tisch]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'legen → liegen', hintAr: 'ما الفرق؟', backAr: 'legen = يضع (حركة، Akkusativ). liegen = يرقد (حالة، Dativ).' },
    { frontDe: 'stellen → stehen', hintAr: 'ما الفرق؟', backAr: 'stellen = يضع واقفاً (حركة). stehen = يقف (حالة).' },
    { frontDe: 'setzen → sitzen', hintAr: 'ما الفرق؟', backAr: 'setzen = يُجلس (حركة). sitzen = يجلس (حالة).' },
    { frontDe: 'hängen', hintAr: 'ماذا يحدث هنا؟', backAr: 'نفس الكلمة للحركة والحالة؛ السياق يحسم المعنى.' },
  ],

  quiz: [
    {
      id: 'gr21-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الفعل المناسب',
      questionDe: 'Die Lampe ___ über dem Tisch.',
      options: ['hängt', 'legt', 'steht', 'sitzt'],
      correctIndex: 0,
      explanationAr: 'وصف حالة تعليق → [[hängen]].',
    },
    {
      id: 'gr21-q2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الفعل المناسب',
      questionDe: 'Ich ___ mich auf den Stuhl.',
      options: ['sitze', 'setze', 'stehe', 'liege'],
      correctIndex: 1,
      explanationAr: 'فعل الجلوس (حركة) → [[setzen]] (مع ضمير انعكاسي، تفصيل الدرس القادم).',
    },
    {
      id: 'gr21-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Das Buch liegt auf dem Tisch" beschreibt einen Zustand (Dativ).',
      isTrue: true,
      explanationAr: 'صحيح: [[liegen]] يصف حالة سكون وتستخدم Dativ.',
    },
    {
      id: 'gr21-q4',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق فعل الحركة بفعل الحالة المقابل',
      pairs: [
        { de: 'legen', ar: 'liegen' },
        { de: 'stellen', ar: 'stehen' },
        { de: 'setzen', ar: 'sitzen' },
      ],
      explanationAr: 'راجع جدول الأزواج الأربعة أعلاه إن أخطأت.',
    },
  ],

  cheatSheet: [
    { de: 'legen (وضع) → liegen (حالة)', ar: 'أفقي.' },
    { de: 'stellen (وضع) → stehen (حالة)', ar: 'عمودي.' },
    { de: 'setzen (وضع) → sitzen (حالة)', ar: 'جالس.' },
    { de: 'hängen = حركة وحالة معاً', ar: 'نفس الكلمة؛ السياق يحسم المعنى.' },
    { de: 'وضع → Akkusativ · حالة → Dativ', ar: 'القاعدة العامة لكل الأزواج.' },
  ],
}

export default rule
