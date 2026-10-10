import type { GrammarRule } from '@/types'

/**
 * Rule 23 — Reflexivpronomen: the full table (Akkusativ + Dativ), plus
 * when a reflexive verb needs the Dativ form instead of Akkusativ
 * (typically: a body-part/object is the direct Akkusativ object, and the
 * reflexive pronoun shifts to Dativ — "Ich putze mir die Zähne").
 */
const rule: GrammarRule = {
  id: 'gr-23',
  number: 23,
  slug: '23-reflexivpronomen',
  level: 'A2',
  termDe: 'Reflexivpronomen',
  titleAr: 'الضمائر الانعكاسية',
  eyebrowAr: 'الدرس السابع في مستوى A2',
  taglineAr:
    'في الدرس السابق استخدمتَ [[mich]] و[[sich]] دون تفصيل كامل. الآن الجدول الكامل: الضمائر الانعكاسية لها شكل في [[Akkusativ]] يتطابق تماماً مع ضمائر المفعول به المباشر (الدرس ١٦) — باستثناء واحد فقط يستحقّ الانتباه.',
  stats: [
    { value: '1', labelAr: 'استثناء وحيد: sich (لا mir/dir)' },
    { value: '2', labelAr: 'حالتان: Akkusativ وDativ' },
    { value: '30+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich wasche mich. Ich putze mir die Zähne.',
    ar: 'أغتسل. أنظّف أسناني.',
  },
  objectivesAr: [
    'تحفظ الجدول الكامل للضمائر الانعكاسية في Akkusativ وDativ.',
    'تلاحظ أنها تتطابق مع ضمائر الدرس ١٦ تماماً، باستثناء الشخص الثالث ([[sich]]).',
    'تعرف متى يتحوّل الضمير الانعكاسي إلى Dativ: حين يوجد مفعول به مباشر آخر في الجملة.',
  ],

  sections: [
    {
      id: 'table',
      navLabelAr: 'الجدول الكامل',
      kickerDe: 'Die Formen',
      titleAr: 'الجدول الكامل',
      titleDe: 'mich/mir · dich/dir · sich',
      tone: 'accent',
      introAr: 'قارن هذا الجدول بجدول ضمائر المفعول به من الدرس ١٦ — ستلاحظ أنه **مطابق تماماً**، إلا في عمود واحد.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الضمائر الانعكاسية',
          columns: [
            { header: 'Nominativ', lang: 'de' },
            { header: 'Akkusativ', lang: 'de', tone: 'accent' },
            { header: 'Dativ', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['ich', 'mich', 'mir'],
            ['du', 'dich', 'dir'],
            ['er, sie, es', 'sich', 'sich'],
            ['wir', 'uns', 'uns'],
            ['ihr', 'euch', 'euch'],
            ['sie / Sie', 'sich', 'sich'],
          ],
          emphasisRows: [2, 5],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'الاستثناء الوحيد: sich',
          bodyAr: 'ضمائر المفعول به العادية تفرّق بين Akkusativ وDativ مع الشخص الثالث ([[ihn]]/[[ihm]]، [[ihr]]/[[ihr]]…). الضمير الانعكاسي أبسط: **[[sich]] للشخص الثالث بكل أشكاله**، في كلتا الحالتين، بلا أيّ تمييز.',
        },
      ],
    },

    {
      id: 'akkusativ-oder-dativ',
      navLabelAr: 'Akkusativ أم Dativ',
      kickerDe: 'Wann Dativ?',
      titleAr: 'متى يتحوّل الضمير إلى Dativ؟',
      titleDe: 'sich die Zähne putzen',
      tone: 'plum',
      introAr: 'القاعدة الافتراضية: الضمير الانعكاسي في [[Akkusativ]] ([[Ich wasche mich]]). لكن إن وُجد **مفعول به مباشر آخر** في الجملة (غالباً جزء من الجسم أو شيء شخصي)، ينتقل الضمير الانعكاسي إلى [[Dativ]] ليفسح المجال لذلك المفعول في Akkusativ.',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'جرّب بنفسك',
          modes: [
            {
              labelAr: 'بلا مفعول آخر — Akkusativ',
              captionAr: 'لا يوجد شيء آخر في الجملة، فالضمير في Akkusativ.',
              parts: [{ text: 'Ich wasche' }, { text: 'mich.', tone: 'accent' }],
            },
            {
              labelAr: 'مع مفعول آخر — Dativ',
              captionAr: '«الأسنان» هي المفعول به المباشر الآن، فالضمير ينتقل إلى Dativ.',
              parts: [{ text: 'Ich putze' }, { text: 'mir', tone: 'plum' }, { text: 'die Zähne.' }],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'أمثلة إضافية على التحوّل',
          tone: 'plum',
          items: [
            { badge: 'Akkusativ', de: 'Ich kämme **mich**.', ar: 'أمشّط شعري.' },
            { badge: 'Dativ', de: 'Ich kämme **mir** die Haare.', ar: 'أمشّط شعري (بالتحديد).' },
            { badge: 'Akkusativ', de: 'Zieh **dich** warm an!', ar: 'البس ملابس دافئة!' },
            { badge: 'Dativ', de: 'Zieh **dir** die Jacke an!', ar: 'البس السترة!' },
            { badge: 'Dativ', de: 'Ich wasche **mir** die Hände.', ar: 'أغسل يديّ.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'حيلة للتذكّر',
          bodyAr: 'إن كانت الجملة تذكر **جزءاً محدَّداً** (الأسنان، الشعر، اليدين) يأتي بعد الفعل مباشرة، فذلك الجزء هو مفعول Akkusativ، وينتقل الضمير الانعكاسي تلقائياً إلى Dativ.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: Akkusativ أم Dativ؟',
          exercises: [
            {
              id: 'gr23-p1-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الضمير الصحيح',
              questionDe: 'Ich putze ___ die Zähne.',
              options: ['mich', 'mir', 'sich', 'dich'],
              correctIndex: 1,
              explanationAr: 'يوجد مفعول آخر ([[die Zähne]])، فالضمير في Dativ: [[mir]].',
            },
            {
              id: 'gr23-p1-mc2',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الضمير الصحيح',
              questionDe: 'Sie wäscht ___ schnell.',
              options: ['sich', 'ihr', 'sie', 'ihm'],
              correctIndex: 0,
              explanationAr: 'لا يوجد مفعول آخر، فالضمير في Akkusativ: [[sich]].',
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
      introAr: 'أشهر خطأ هو استخدام [[mich]]/[[dich]] بدل [[mir]]/[[dir]] حين يوجد مفعول به آخر في الجملة.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich putze mich die Zähne.',
              correct: 'Ich putze mir die Zähne.',
              explanationAr: '[[die Zähne]] مفعول به مباشر، فالضمير الانعكاسي ينتقل إلى Dativ: [[mir]].',
            },
            {
              wrong: 'Er wäscht ihm.',
              correct: 'Er wäscht sich.',
              explanationAr: '[[sich]] هي الضمير الانعكاسي للشخص الثالث، وليس [[ihm]] (ضمير مفعول عادي).',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'mich / dich / sich / uns / euch / sich', hintAr: 'ما هذه؟', backAr: 'الضمائر الانعكاسية في Akkusativ.' },
    { frontDe: 'mir / dir / sich / uns / euch / sich', hintAr: 'ما هذه؟', backAr: 'الضمائر الانعكاسية في Dativ.' },
    { frontDe: 'sich', hintAr: 'لمن تُستخدم؟', backAr: 'er/sie/es/sie/Sie — في Akkusativ وDativ كليهما، بلا تمييز.' },
    { frontDe: 'Ich putze mir die Zähne.', hintAr: 'لماذا mir وليس mich؟', backAr: 'يوجد مفعول به آخر (die Zähne)، فالضمير ينتقل إلى Dativ.' },
  ],

  quiz: [
    {
      id: 'gr23-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الضمير الصحيح',
      questionDe: 'Wir waschen ___.',
      options: ['uns', 'euch', 'sich', 'unsere'],
      correctIndex: 0,
      explanationAr: 'مع [[wir]]: [[uns]].',
    },
    {
      id: 'gr23-q2',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (du + die Haare → مفعول آخر)',
      sentenceDe: 'Kämmst du ___ die Haare?',
      acceptedAnswers: ['dir'],
      explanationAr: 'يوجد مفعول آخر ([[die Haare]])، فالضمير في Dativ: [[dir]].',
    },
    {
      id: 'gr23-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im Dativ unterscheidet sich „sich" zwischen er/sie/es.',
      isTrue: false,
      explanationAr: 'خطأ: [[sich]] واحدة لكل الشخص الثالث، بلا تمييز بين الجنسين أو بين Akkusativ وDativ.',
    },
  ],

  cheatSheet: [
    { de: 'mich/mir · dich/dir · sich', ar: 'المفرد (ich, du, er/sie/es).' },
    { de: 'uns · euch · sich', ar: 'الجمع (wir, ihr, sie/Sie).' },
    { de: 'بلا مفعول آخر → Akkusativ', ar: 'Ich wasche mich.' },
    { de: 'مع مفعول آخر → Dativ', ar: 'Ich putze mir die Zähne.' },
  ],
}

export default rule
