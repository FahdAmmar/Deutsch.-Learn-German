import type { GrammarRule } from '@/types'

/**
 * Rule 26 — Komparativ / Superlativ. Predicate position only (schneller,
 * am schnellsten) — attributive comparative/superlative adjectives would
 * need rule 25's declension endings on top, so they're mentioned only as
 * a brief forward-pointing aside, not drilled here.
 */
const rule: GrammarRule = {
  id: 'gr-26',
  number: 26,
  slug: '26-komparativ-superlativ',
  level: 'A2',
  termDe: 'Komparativ / Superlativ',
  titleAr: 'المقارنة والتفضيل',
  eyebrowAr: 'الدرس العاشر في مستوى A2',
  taglineAr:
    'للمقارنة بين شيئين نضيف [[-er]] إلى الصفة، وللتفضيل المطلق (الأفضل/الأكبر/الأسرع) نستخدم تركيب [[am]] + الصفة + [[-sten]]. القاعدة بسيطة، لكن مجموعة من أشهر الصفات شاذّة تماماً — وهذه ستحفظها كمجموعة واحدة.',
  stats: [
    { value: '2', labelAr: 'نهايتان: -er وam -sten' },
    { value: '8', labelAr: 'صفات شاذّة شائعة جداً' },
    { value: '45+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Berlin ist groß, München ist größer, aber Tokio ist am größten.',
    ar: 'برلين كبيرة، وميونخ أكبر، لكن طوكيو الأكبر.',
  },
  objectivesAr: [
    'تكوّن صيغة المقارنة ([[Komparativ]]) بإضافة [[-er]].',
    'تكوّن صيغة التفضيل المطلق ([[Superlativ]]) بتركيب [[am]] + صفة + [[-sten]].',
    'تتعرّف على الصفات القصيرة التي تأخذ Umlaut (¨) في المقارنة والتفضيل.',
    'تحفظ أشهر الصفات الشاذّة (gut، viel، gern، hoch).',
    'تستخدم [[als]] للمقارنة بين شيئين مختلفين، و[[genauso … wie]] للتساوي.',
  ],

  sections: [
    {
      id: 'regular',
      navLabelAr: 'الصيغة المنتظمة',
      kickerDe: 'Regelmäßig',
      titleAr: 'المقارنة والتفضيل المنتظمان',
      titleDe: '-er · am -sten',
      tone: 'accent',
      introAr: 'القاعدة الأساسية بسيطة: أضف [[-er]] للمقارنة، واستخدم [[am]] + الصفة + [[-sten]] للتفضيل المطلق.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Adjektiv', tone: 'accent', noteAr: 'الأصل' },
            { text: '+ er', tone: 'plum', noteAr: 'Komparativ — المقارنة' },
            { text: 'am + Adjektiv + sten', tone: 'highlight', noteAr: 'Superlativ — التفضيل' },
          ],
        },
        {
          kind: 'table',
          captionAr: 'صفات منتظمة عبر الدرجات الثلاث',
          columns: [
            { header: 'الأصل', lang: 'de' },
            { header: 'Komparativ', lang: 'de', tone: 'plum' },
            { header: 'Superlativ', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['schnell', 'schneller', 'am schnellsten', 'سريع'],
            ['klein', 'kleiner', 'am kleinsten', 'صغير'],
            ['billig', 'billiger', 'am billigsten', 'رخيص'],
            ['interessant', 'interessanter', 'am interessantesten', 'مثير للاهتمام'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'alert',
          titleAr: 'صفات تنتهي بـ -d, -t, -s, -ß, -z, -sch تأخذ -esten',
          bodyAr:
            'لسهولة النطق، الصفات المنتهية بهذه الحروف تضيف [[-esten]] بدل [[-sten]] في التفضيل: [[laut]] → [[am lautesten]]، [[heiß]] → [[am heißesten]]، [[kurz]] → [[am kürzesten]] (لاحظ أيضاً Umlaut هنا).',
        },
        {
          kind: 'examples',
          titleAr: 'جمل مقارنة كاملة',
          tone: 'accent',
          items: [
            { badge: 'Komparativ', de: 'Mein Bruder ist **schneller** als ich.', ar: 'أخي أسرع منّي.' },
            { badge: 'Komparativ', de: 'Dieses Auto ist **billiger**.', ar: 'هذه السيارة أرخص.' },
            { badge: 'Superlativ', de: 'Das ist das **interessanteste** Buch.', ar: 'هذا أكثر كتاب مثير للاهتمام.', noteAr: 'هنا الصفة قبل الاسم فتأخذ نهاية إضافية — تفصيل رقيق يأتي لاحقاً مع تصريف الصفات.' },
            { badge: 'Superlativ', de: 'Im Sommer ist es **am heißesten**.', ar: 'الجوّ الأشدّ حرارة في الصيف.' },
          ],
        },
      ],
    },

    {
      id: 'umlaut',
      navLabelAr: 'صفات بـ Umlaut',
      kickerDe: 'Umlaut',
      titleAr: 'صفات قصيرة تأخذ Umlaut',
      titleDe: 'a → ä · o → ö · u → ü',
      tone: 'plum',
      introAr: 'أغلب الصفات القصيرة (مقطع واحد) التي تحتوي [[a]] أو [[o]] أو [[u]] تضيف Umlaut في المقارنة والتفضيل.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'صفات بـ Umlaut شائعة',
          columns: [
            { header: 'الأصل', lang: 'de' },
            { header: 'Komparativ', lang: 'de', tone: 'plum' },
            { header: 'Superlativ', lang: 'de', tone: 'highlight' },
          ],
          rows: [
            ['alt', 'älter', 'am ältesten'],
            ['jung', 'jünger', 'am jüngsten'],
            ['groß', 'größer', 'am größten'],
            ['kalt', 'kälter', 'am kältesten'],
            ['warm', 'wärmer', 'am wärmsten'],
            ['lang', 'länger', 'am längsten'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'alert',
          titleAr: 'لا قاعدة تحسم كل كلمة',
          bodyAr: 'ليست كل الصفات القصيرة تأخذ Umlaut: [[klar]] → [[klarer]] (بلا تغيير). الطريقة الأضمن أن تتعلّم كل صفة جديدة مع صيغتَي المقارنة والتفضيل منذ البداية.',
        },
        {
          kind: 'examples',
          titleAr: 'صفات Umlaut في جمل',
          tone: 'plum',
          items: [
            { badge: 'alt', de: 'Mein Opa ist **älter** als mein Vater.', ar: 'جدّي أكبر سنّاً من أبي.' },
            { badge: 'groß', de: 'Der Elefant ist **am größten**.', ar: 'الفيل هو الأكبر.' },
            { badge: 'kalt', de: 'Im Winter ist es **kälter**.', ar: 'الجوّ أبرد في الشتاء.' },
          ],
        },
      ],
    },

    {
      id: 'irregular',
      navLabelAr: 'صفات شاذّة',
      kickerDe: 'Unregelmäßig',
      titleAr: 'الصفات الشاذّة',
      titleDe: 'gut · viel · gern · hoch',
      tone: 'highlight',
      introAr: 'مجموعة صغيرة لكنها شائعة جداً من الصفات والظروف تتغيّر شكلها بالكامل في المقارنة والتفضيل — احفظها كوحدة.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الصفات الشاذّة الأساسية',
          columns: [
            { header: 'الأصل', lang: 'de', tone: 'highlight' },
            { header: 'Komparativ', lang: 'de' },
            { header: 'Superlativ', lang: 'de' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['gut', 'besser', 'am besten', 'جيّد'],
            ['viel', 'mehr', 'am meisten', 'كثير'],
            ['gern', 'lieber', 'am liebsten', 'بسرور (للأفعال)'],
            ['hoch', 'höher', 'am höchsten', 'عالٍ'],
            ['nah', 'näher', 'am nächsten', 'قريب'],
          ],
        },
        {
          kind: 'examples',
          titleAr: 'الصفات الشاذّة في جمل',
          tone: 'highlight',
          items: [
            { badge: 'gut', de: 'Dein Deutsch ist **besser** als meins.', ar: 'ألمانيّتك أفضل من ألمانيّتي.' },
            { badge: 'gern', de: 'Ich trinke **am liebsten** Tee.', ar: 'أفضّل شرب الشاي على كل شيء.', noteAr: '[[gern/lieber/am liebsten]] تصف تفضيل **الأفعال** لا صفات الأشياء.' },
            { badge: 'viel', de: 'Sie hat **mehr** Erfahrung als ich.', ar: 'لديها خبرة أكثر منّي.' },
            { badge: 'hoch', de: 'Der Mount Everest ist **am höchsten**.', ar: 'إفرست هو الأعلى.' },
          ],
        },
      ],
    },

    {
      id: 'comparisons',
      navLabelAr: 'أدوات المقارنة',
      kickerDe: 'als · wie',
      titleAr: 'als أم wie؟',
      titleDe: 'Vergleiche',
      tone: 'accent',
      introAr: 'استخدم [[als]] (من) بعد صيغة المقارنة للمفاضلة بين شيئين مختلفين، و[[genauso … wie]] (مثل) للتعبير عن التساوي.',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'als أم wie',
          modes: [
            {
              labelAr: 'مقارنة (als)',
              captionAr: 'شيء أكبر/أصغر من آخر.',
              parts: [{ text: 'Er ist' }, { text: 'größer', tone: 'plum' }, { text: 'als', tone: 'accent' }, { text: 'ich.' }],
            },
            {
              labelAr: 'تساوٍ (genauso … wie)',
              captionAr: 'شيئان متساويان في الصفة.',
              parts: [{ text: 'Er ist' }, { text: 'genauso groß', tone: 'highlight' }, { text: 'wie', tone: 'accent' }, { text: 'ich.' }],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'als وwie في جمل',
          tone: 'accent',
          items: [
            { badge: 'als', de: 'Berlin ist größer **als** München.', ar: 'برلين أكبر من ميونخ.' },
            { badge: 'genauso … wie', de: 'Meine Schwester ist **genauso** alt **wie** ich.', ar: 'أختي بنفس عمري تماماً.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: كوّن صيغة المقارنة أو التفضيل',
          exercises: [
            {
              id: 'gr26-p1-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل بصيغة المقارنة (schnell)',
              sentenceDe: 'Mein Auto ist ___ als deins.',
              acceptedAnswers: ['schneller'],
              explanationAr: '[[schnell]] منتظمة: [[schneller]].',
            },
            {
              id: 'gr26-p1-fill2',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل بصيغة التفضيل (gut)',
              sentenceDe: 'Das ist das ___ Restaurant der Stadt.',
              acceptedAnswers: ['beste'],
              hint: 'gut شاذّة',
              explanationAr: '[[gut]] → [[besser]] → [[am besten]] (وهنا أمام اسم: [[beste]]).',
            },
            {
              id: 'gr26-p1-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الصيغة الصحيحة (alt)',
              questionDe: 'Mein Opa ist ___ als mein Vater.',
              options: ['alter', 'älter', 'altest', 'am ältesten'],
              correctIndex: 1,
              explanationAr: '[[alt]] تأخذ Umlaut: [[älter]].',
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
      introAr: 'أشهر الأخطاء: استخدام more/most على الطريقة الإنجليزية، ونسيان Umlaut أو -esten.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Er ist mehr groß als ich.',
              correct: 'Er ist größer als ich.',
              explanationAr: 'الألمانية تضيف [[-er]] مباشرة إلى الصفة، ولا تستخدم كلمة منفصلة بمعنى «أكثر» كما في الإنجليزية.',
            },
            {
              wrong: 'Sie ist jünger als ich, aber ich bin alter als sie.',
              correct: 'Sie ist jünger als ich, aber ich bin älter als sie.',
              explanationAr: '[[alt]] تأخذ Umlaut في المقارنة: [[älter]].',
            },
            {
              wrong: 'Im Sommer ist es am heißsten.',
              correct: 'Im Sommer ist es am heißesten.',
              explanationAr: '[[heiß]] تنتهي بـ ß، فتحتاج [[-esten]] لا [[-sten]].',
            },
            {
              wrong: 'Mein Deutsch ist guter als letztes Jahr.',
              correct: 'Mein Deutsch ist besser als letztes Jahr.',
              explanationAr: '[[gut]] شاذّة تماماً: [[besser]]، وليس [[guter]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'schnell → schneller → am schnellsten', hintAr: 'ما القاعدة؟', backAr: 'المنتظم: +er للمقارنة، am + -sten للتفضيل.' },
    { frontDe: 'alt → älter → am ältesten', hintAr: 'ما الملاحظة؟', backAr: 'صفة قصيرة تأخذ Umlaut.' },
    { frontDe: 'gut → besser → am besten', hintAr: 'نوع الصفة؟', backAr: 'شاذّة تماماً — تُحفظ كوحدة.' },
    { frontDe: 'gern → lieber → am liebsten', hintAr: 'بماذا تتعلّق؟', backAr: 'بتفضيل الأفعال، لا صفات الأشياء.' },
    { frontDe: 'als', hintAr: 'متى تُستخدم؟', backAr: 'بعد صيغة المقارنة، للمفاضلة بين شيئين (من).' },
    { frontDe: 'genauso … wie', hintAr: 'متى تُستخدم؟', backAr: 'للتعبير عن التساوي (مثل).' },
  ],

  quiz: [
    {
      id: 'gr26-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر صيغة المقارنة الصحيحة (klein)',
      questionDe: '',
      options: ['kleiner', 'kleinster', 'am kleinsten', 'kleinest'],
      correctIndex: 0,
      explanationAr: 'صفة منتظمة: [[kleiner]].',
    },
    {
      id: 'gr26-q2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر صيغة التفضيل الصحيحة (gut)',
      questionDe: '',
      options: ['am gutsten', 'am besten', 'am guttesten', 'bester'],
      correctIndex: 1,
      explanationAr: '[[gut]] شاذّة: [[am besten]].',
    },
    {
      id: 'gr26-q3',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (groß، مع Umlaut)',
      sentenceDe: 'Der Elefant ist ___ als die Katze.',
      acceptedAnswers: ['größer'],
      explanationAr: '[[groß]] → [[größer]] (Umlaut).',
    },
    {
      id: 'gr26-q4',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„heiß" bildet den Superlativ als „am heißesten".',
      isTrue: true,
      explanationAr: 'صحيح: الصفات المنتهية بـ ß تأخذ -esten.',
    },
    {
      id: 'gr26-q5',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق الصفة بصيغة مقارنتها',
      pairs: [
        { de: 'viel', ar: 'mehr' },
        { de: 'gern', ar: 'lieber' },
        { de: 'hoch', ar: 'höher' },
        { de: 'gut', ar: 'besser' },
      ],
      explanationAr: 'هذه كلّها صفات/ظروف شاذّة.',
    },
    {
      id: 'gr26-q6',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['als', 'ist', 'Berlin', 'größer', 'München.'],
      correctOrder: [2, 1, 3, 0, 4],
      explanationAr: '[[Berlin ist größer als München.]]',
    },
  ],

  cheatSheet: [
    { de: 'Adjektiv + er', ar: 'Komparativ المنتظم.' },
    { de: 'am Adjektiv + sten', ar: 'Superlativ المنتظم.' },
    { de: 'alt → älter · groß → größer', ar: 'صفات قصيرة تأخذ Umlaut.' },
    { de: 'gut → besser → am besten', ar: 'شاذّة — احفظها كوحدة.' },
    { de: 'viel → mehr · gern → lieber · hoch → höher', ar: 'شاذّة أخرى شائعة.' },
    { de: 'als (من) · genauso … wie (مثل)', ar: 'أدوات المقارنة والتساوي.' },
  ],
}

export default rule
