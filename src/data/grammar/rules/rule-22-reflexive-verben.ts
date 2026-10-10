import type { GrammarRule } from '@/types'

/**
 * Rule 22 — Reflexive Verben (the concept + the most common verbs). The
 * full reflexive-pronoun declension table (mich/dich/sich... vs.
 * mir/dir/sich...) is rule 23, directly next — here `sich` is used as a
 * placeholder for "the matching reflexive pronoun" without breaking it
 * down yet.
 */
const rule: GrammarRule = {
  id: 'gr-22',
  number: 22,
  slug: '22-reflexive-verben',
  level: 'A2',
  termDe: 'Reflexive Verben',
  titleAr: 'الأفعال الانعكاسية',
  eyebrowAr: 'الدرس السادس في مستوى A2',
  taglineAr:
    'الفعل الانعكاسي يعود فيه الفعل إلى فاعله: «أنا أغسل **نفسي**». الألمانية تستخدم هذا التركيب أكثر بكثير من العربية — أفعال مثل [[sich freuen]] (يفرح) و[[sich interessieren]] (يهتمّ) تحتاج الضمير الانعكاسي [[sich]] دائماً حتى لو لم تشعر العربية بحاجة لـ«نفسه» هنا.',
  stats: [
    { value: '2', labelAr: 'نوعا أفعال انعكاسية' },
    { value: '10+', labelAr: 'فعل انعكاسي شائع في A2' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich freue mich auf die Ferien. Wir treffen uns morgen.',
    ar: 'أنا متحمّس للعطلة. سنلتقي غداً.',
  },
  objectivesAr: [
    'تفهم معنى «فعل انعكاسي» ولماذا تحتاجه الألمانية أكثر من العربية.',
    'تميّز بين أفعال انعكاسية **إلزامية** (لا معنى لها بدون الضمير) وأفعال **اختيارية** (انعكاسية وغير انعكاسية بمعنيين مختلفين).',
    'تحفظ أشهر عشرة أفعال انعكاسية في A2 وحروف الجرّ الثابتة التي ترافقها.',
  ],

  sections: [
    {
      id: 'concept',
      navLabelAr: 'الفكرة',
      kickerDe: 'Was ist reflexiv?',
      titleAr: 'ما الفعل الانعكاسي؟',
      titleDe: 'sich + Verb',
      tone: 'accent',
      introAr: 'الفعل الانعكاسي يحتاج ضميراً يشير إلى **الفاعل نفسه**. بعض هذه الأفعال فيها منطق واضح (يغسل نفسه)، وبعضها **لا معنى منطقياً** لانعكاسيته بالعربية — ببساطة هكذا يُبنى الفعل في الألمانية ويجب حفظه مع [[sich]].',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Subjekt' },
            { text: 'Verb', tone: 'accent' },
            { text: 'sich/mich/dich…', tone: 'plum', noteAr: 'الضمير الانعكاسي المطابق للفاعل' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'freue', role: 'الفعل' },
            { text: 'mich', role: 'الضمير الانعكاسي' },
            { text: 'auf die Ferien.', role: 'باقي الجملة' },
          ],
          ar: 'أنا متحمّس للعطلة.',
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'لماذا mich وليس sich هنا؟',
          bodyAr: 'الضمير الانعكاسي **يتطابق مع الفاعل** دائماً: مع [[ich]] نستخدم [[mich]]، ومع [[du]] نستخدم [[dich]]، وهكذا. [[sich]] هي صيغة القاموس (تُستخدم فقط مع [[er/sie/es]] و[[sie]] (هم) و[[Sie]]) — الجدول الكامل في الدرس القادم.',
        },
      ],
    },

    {
      id: 'types',
      navLabelAr: 'نوعا الأفعال',
      kickerDe: 'Zwei Arten',
      titleAr: 'إلزامية أم اختيارية؟',
      titleDe: 'echt reflexiv vs. reflexiv verwendet',
      tone: 'plum',
      introAr: 'بعض الأفعال انعكاسية **دائماً** ولا تُستخدم بدون [[sich]]. وبعضها له معنيان: عادي (بدون انعكاس) وانعكاسي (بمعنى مختلف قليلاً أو بنفس المعنى).',
      blocks: [
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'انعكاسية دائماً',
              subAr: 'لا تُستخدم أبداً بدون sich',
              tone: 'plum',
              items: [
                { de: 'sich freuen', ar: 'يفرح' },
                { de: 'sich interessieren', ar: 'يهتمّ' },
                { de: 'sich erinnern', ar: 'يتذكّر' },
                { de: 'sich beeilen', ar: 'يستعجل' },
                { de: 'sich entscheiden', ar: 'يقرّر' },
              ],
            },
            {
              titleAr: 'لها استخدام عادي أيضاً',
              subAr: 'بمعنى مختلف قليلاً بدون sich',
              tone: 'highlight',
              items: [
                { de: 'waschen → sich waschen', ar: 'يغسل (شيئاً) ← يغتسل' },
                { de: 'anziehen → sich anziehen', ar: 'يُلبس (شخصاً) ← يرتدي ملابسه' },
                { de: 'treffen → sich treffen', ar: 'يقابل (شخصاً) ← يلتقيان ببعضهما' },
              ],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'أفعال انعكاسية شائعة مع حروف جرّها الثابتة',
          tone: 'plum',
          items: [
            { badge: 'sich freuen auf', de: 'Ich freue **mich** auf das Wochenende.', ar: 'أنا متحمّس لعطلة نهاية الأسبوع.', noteAr: '[[sich freuen auf]] + Akkusativ: شيء قادم لم يحدث بعد.' },
            { badge: 'sich freuen über', de: 'Sie freut **sich** über das Geschenk.', ar: 'هي سعيدة بالهدية.', noteAr: '[[sich freuen über]] + Akkusativ: شيء حدث بالفعل.' },
            { badge: 'sich interessieren für', de: 'Er interessiert **sich** für Musik.', ar: 'هو مهتمّ بالموسيقى.' },
            { badge: 'sich erinnern an', de: 'Ich erinnere **mich** an meine Kindheit.', ar: 'أتذكّر طفولتي.' },
            { badge: 'sich waschen', de: 'Ich wasche **mich** jeden Morgen.', ar: 'أغتسل كل صباح.' },
            { badge: 'sich anziehen', de: 'Die Kinder ziehen **sich** schnell an.', ar: 'يرتدي الأطفال ملابسهم بسرعة.' },
            { badge: 'sich treffen', de: 'Wir treffen **uns** um acht Uhr.', ar: 'سنلتقي الساعة الثامنة.' },
            { badge: 'sich beeilen', de: 'Beeil **dich**, wir sind spät dran!', ar: 'استعجل، لقد تأخّرنا!' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'star',
          titleAr: 'احفظ الفعل مع حرف جرّه الثابت',
          bodyAr: 'كثير من الأفعال الانعكاسية ترتبط بحرف جرّ ثابت المعنى (مثل [[für]]، [[an]]، [[auf]]، [[über]]) لا علاقة له بقواعد الحركة/السكون — احفظهما كوحدة واحدة: [[sich interessieren für]]، [[sich freuen auf]].',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بالضمير الانعكاسي المناسب',
          exercises: [
            {
              id: 'gr22-p1-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (du)',
              sentenceDe: 'Interessierst du ___ für Fußball?',
              acceptedAnswers: ['dich'],
              hint: 'du → ؟',
              explanationAr: 'مع [[du]]: [[dich]].',
            },
            {
              id: 'gr22-p1-fill2',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (wir)',
              sentenceDe: 'Wir freuen ___ auf den Urlaub.',
              acceptedAnswers: ['uns'],
              hint: 'wir → ؟',
              explanationAr: 'مع [[wir]]: [[uns]].',
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
      introAr: 'أشهر خطأين: نسيان الضمير الانعكاسي تماماً، أو استخدام [[sich]] الثابتة بدل الضمير المطابق للفاعل.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich interessiere für Musik.',
              correct: 'Ich interessiere mich für Musik.',
              explanationAr: '[[sich interessieren]] انعكاسي إلزامي؛ لا يجوز حذف الضمير.',
            },
            {
              wrong: 'Ich freue sich auf die Party.',
              correct: 'Ich freue mich auf die Party.',
              explanationAr: '[[sich]] فقط مع [[er/sie/es/sie/Sie]]؛ مع [[ich]] نستخدم [[mich]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'sich freuen auf', hintAr: 'متى تُستخدم؟', backAr: 'لشيء قادم لم يحدث بعد.', exampleDe: 'Ich freue mich **auf** die Ferien.' },
    { frontDe: 'sich freuen über', hintAr: 'متى تُستخدم؟', backAr: 'لشيء حدث بالفعل.', exampleDe: 'Ich freue mich **über** das Geschenk.' },
    { frontDe: 'sich interessieren für', hintAr: 'ماذا تعني؟', backAr: 'يهتمّ بـ.' },
    { frontDe: 'sich = er/sie/es/sie/Sie فقط', hintAr: 'متى أستخدم sich؟', backAr: 'مع ich/du/wir/ihr نستخدم mich/dich/uns/euch بدلاً منها.' },
  ],

  quiz: [
    {
      id: 'gr22-q1',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (er)',
      sentenceDe: 'Er erinnert ___ an den Film.',
      acceptedAnswers: ['sich'],
      explanationAr: 'مع [[er]]: [[sich]].',
    },
    {
      id: 'gr22-q2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر حرف الجرّ المناسب لحدث قادم',
      questionDe: 'Ich freue mich ___ den Urlaub.',
      options: ['über', 'auf', 'für', 'an'],
      correctIndex: 1,
      explanationAr: 'شيء قادم → [[sich freuen auf]].',
    },
    {
      id: 'gr22-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„sich" wird auch mit „ich" benutzt: Ich freue sich.',
      isTrue: false,
      explanationAr: 'خطأ: مع [[ich]] نستخدم [[mich]]، وليس [[sich]].',
    },
  ],

  cheatSheet: [
    { de: 'sich freuen, sich interessieren, sich erinnern', ar: 'أفعال انعكاسية إلزامية.' },
    { de: 'sich freuen auf (قادم) / über (حدث)', ar: 'حرف الجرّ يحدّد الزمن.' },
    { de: 'sich interessieren für', ar: 'يهتمّ بـ.' },
    { de: 'sich = هو فقط', ar: 'باقي الضمائر: mich, dich, uns, euch (التفاصيل في الدرس القادم).' },
  ],
}

export default rule
