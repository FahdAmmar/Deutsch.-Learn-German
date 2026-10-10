import type { GrammarRule } from '@/types'

/**
 * Rule 12 — Trennbare Verben. Reuses the Satzklammer (verb-bracket) idea
 * from rule 11: the conjugated stem stays in position 2, the separated
 * prefix moves to the very end. Untrennbare (inseparable) prefixes are
 * mentioned only as a contrast, not taught in depth here.
 */
const rule: GrammarRule = {
  id: 'gr-12',
  number: 12,
  slug: '12-trennbare-verben',
  level: 'A1',
  termDe: 'Trennbare Verben',
  titleAr: 'الأفعال القابلة للانفصال',
  eyebrowAr: 'الدرس الثاني عشر في خارطة القواعد',
  taglineAr:
    'بعض الأفعال الألمانية تُبنى من **بادئة + فعل أساسي**، مثل [[aufstehen]] (أن يستيقظ) من [[auf]] + [[stehen]]. في الجملة الرئيسية، البادئة **تنفصل** وتنتقل إلى آخر الجملة — نفس فكرة قوس الجملة التي تعلّمتها مع الأفعال الناقصة.',
  stats: [
    { value: '1', labelAr: 'مقطع منفصل ينتقل لآخر الجملة' },
    { value: '10+', labelAr: 'بادئة قابلة للانفصال شائعة' },
    { value: '30+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich stehe um sieben Uhr auf.',
    ar: 'أستيقظ في الساعة السابعة.',
  },
  objectivesAr: [
    'تتعرّف على أشهر الأفعال القابلة للانفصال وبادئاتها.',
    'تصرّف الجزء الأساسي من الفعل وتضع البادئة في آخر الجملة.',
    'تميّز الفعل القابل للانفصال في المصدر من خلال **نبرة الصوت** على البادئة.',
    'تتعامل مع هذه الأفعال في جمل مع فعل ناقص (حيث يبقى الفعل متّصلاً في صيغة المصدر).',
  ],

  sections: [
    {
      id: 'overview',
      navLabelAr: 'نظرة عامة',
      kickerDe: 'Überblick',
      titleAr: 'بادئة + فعل = معنى جديد',
      titleDe: 'Präfix + Verb',
      tone: 'accent',
      introAr: 'إضافة بادئة إلى فعل بسيط تُنتج غالباً معنى مختلفاً تماماً. قارن: [[stehen]] (يقف) و[[aufstehen]] (يستيقظ) و[[verstehen]] (يفهم) — ثلاثة أفعال مختلفة تماماً من الجذر نفسه.',
      blocks: [
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'أفعال قابلة للانفصال شائعة',
              tone: 'accent',
              items: [
                { de: 'aufstehen', ar: 'يستيقظ' },
                { de: 'einkaufen', ar: 'يتسوّق' },
                { de: 'fernsehen', ar: 'يشاهد التلفاز' },
                { de: 'anrufen', ar: 'يتّصل هاتفياً' },
                { de: 'mitkommen', ar: 'يرافق / يأتي معه' },
                { de: 'aufmachen', ar: 'يفتح' },
                { de: 'zumachen', ar: 'يغلق' },
                { de: 'ankommen', ar: 'يصل' },
              ],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'كيف تعرف أن البادئة قابلة للانفصال؟',
          bodyAr: 'في المصدر، النبرة الصوتية تقع دائماً على البادئة القابلة للانفصال — في [[aufstehen]] و[[einkaufen]] و[[anrufen]] تسمع النبرة في أول الكلمة. القواميس تكتب هذه الأفعال أحياناً بفاصل: [[auf|stehen]].',
        },
      ],
    },

    {
      id: 'satzklammer',
      navLabelAr: 'قوس الجملة',
      kickerDe: 'Satzklammer',
      titleAr: 'الانفصال في الجملة الرئيسية',
      titleDe: 'Verb (Position 2) … Präfix (Ende)',
      tone: 'plum',
      introAr: 'في الجملة الرئيسية، صرّف الجزء الأساسي من الفعل وضعه في الموضع الثاني كالمعتاد — ثم أرسل البادئة وحدها إلى **آخر الجملة**.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Subjekt' },
            { text: 'steh(e)', tone: 'accent', noteAr: 'الجذع + النهاية، الموضع الثاني' },
            { text: '… (باقي الجملة)' },
            { text: 'auf', tone: 'plum', noteAr: 'البادئة، آخر الجملة' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'stehe', role: 'الجذع + النهاية (٢)' },
            { text: 'um sieben Uhr', role: 'باقي الجملة' },
            { text: 'auf.', role: 'البادئة (آخر الجملة)' },
          ],
          ar: 'أستيقظ في الساعة السابعة.',
        },
        {
          kind: 'examples',
          titleAr: 'الفعل ينفصل في جمل مختلفة',
          tone: 'plum',
          items: [
            { badge: 'einkaufen', de: 'Ich **kaufe** heute **ein**.', ar: 'أتسوّق اليوم.' },
            { badge: 'anrufen', de: 'Sie **ruft** ihre Mutter **an**.', ar: 'هي تتّصل بأمّها.' },
            { badge: 'fernsehen', de: 'Wir **sehen** abends **fern**.', ar: 'نشاهد التلفاز مساءً.' },
            { badge: 'ankommen', de: 'Der Zug **kommt** um acht **an**.', ar: 'يصل القطار الساعة الثامنة.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'مع فعل ناقص: الفعل يبقى متّصلاً!',
          bodyAr: 'حين يظهر فعل ناقص في الجملة، الفعل القابل للانفصال **لا ينفصل** — يبقى كلمة واحدة في صيغة المصدر في آخر الجملة: [[Ich muss früh aufstehen.]] (يجب أن أستيقظ باكراً) — وليس [[Ich muss früh auf stehen]] أو [[aufstehen]] منفصلة.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: افصل الفعل بشكل صحيح',
          exercises: [
            {
              id: 'gr12-p1-order1',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات (einkaufen)',
              words: ['ein.', 'heute', 'Ich', 'kaufe'],
              correctOrder: [2, 3, 1, 0],
              explanationAr: '[[Ich kaufe heute ein.]] — الجذع ثانياً، البادئة أخيراً.',
            },
            {
              id: 'gr12-p1-order2',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات (aufstehen مع فعل ناقص — بلا انفصال)',
              words: ['früh', 'muss', 'aufstehen.', 'Ich'],
              correctOrder: [3, 1, 0, 2],
              explanationAr: '[[Ich muss früh aufstehen.]] — الفعل يبقى متّصلاً بعد الفعل الناقص.',
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
      introAr: 'أشهر خطأ هو نسيان فصل البادئة في الجملة الرئيسية، أو فصلها خطأً بعد فعل ناقص.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich aufstehe um sieben Uhr.',
              correct: 'Ich stehe um sieben Uhr auf.',
              explanationAr: 'في الجملة الرئيسية، الفعل ينفصل: الجذع ثانياً، والبادئة في آخر الجملة.',
            },
            {
              wrong: 'Ich muss auf früh stehen.',
              correct: 'Ich muss früh aufstehen.',
              explanationAr: 'مع فعل ناقص لا ينفصل الفعل — يبقى [[aufstehen]] كلمة واحدة في صيغة المصدر.',
            },
            {
              wrong: 'Sie ruft an ihre Mutter.',
              correct: 'Sie ruft ihre Mutter an.',
              explanationAr: 'البادئة [[an]] تنتقل إلى آخر الجملة، وليس فوراً بعد الفعل.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'AUFstehen', hintAr: 'أين تقع النبرة؟', backAr: 'على البادئة — علامة أن الفعل قابل للانفصال.' },
    { frontDe: 'Ich stehe … auf.', hintAr: 'أين تذهب البادئة؟', backAr: 'إلى آخر الجملة، في الجملة الرئيسية.' },
    { frontDe: 'Ich muss aufstehen.', hintAr: 'هل ينفصل الفعل هنا؟', backAr: 'لا — مع فعل ناقص يبقى الفعل كلمة واحدة في صيغة المصدر.' },
    { frontDe: 'einkaufen · anrufen · fernsehen', hintAr: 'ماذا تعني؟', backAr: 'يتسوّق · يتّصل هاتفياً · يشاهد التلفاز.' },
  ],

  quiz: [
    {
      id: 'gr12-q1',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['an.', 'Er', 'seinen Freund', 'ruft'],
      correctOrder: [1, 3, 2, 0],
      explanationAr: '[[Er ruft seinen Freund an.]]',
    },
    {
      id: 'gr12-q2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Mit einem Modalverb bleibt das trennbare Verb zusammen: Ich muss einkaufen.',
      isTrue: true,
      explanationAr: 'صحيح: مع الفعل الناقص لا ينفصل الفعل.',
    },
    {
      id: 'gr12-q3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ جملة صحيحة؟',
      questionDe: '',
      options: ['Ich sehe fern heute.', 'Ich sehe heute fern.', 'Ich fernsehe heute.', 'Fern ich sehe heute.'],
      correctIndex: 1,
      explanationAr: 'البادئة [[fern]] تذهب إلى آخر الجملة تماماً.',
    },
    {
      id: 'gr12-q4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بالبادئة الصحيحة (einkaufen)',
      sentenceDe: 'Wir kaufen im Supermarkt ___.',
      acceptedAnswers: ['ein'],
      explanationAr: '[[einkaufen]] → [[kaufen … ein]].',
    },
  ],

  cheatSheet: [
    { de: 'AUFstehen, EINkaufen, ANrufen', ar: 'النبرة على البادئة = فعل قابل للانفصال.' },
    { de: 'Verb (٢) … Präfix (نهاية)', ar: 'في الجملة الرئيسية، البادئة تنفصل وتذهب لآخر الجملة.' },
    { de: 'Ich muss aufstehen.', ar: 'مع فعل ناقص، الفعل يبقى متّصلاً في صيغة المصدر.' },
  ],
}

export default rule
