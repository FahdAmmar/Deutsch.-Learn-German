import type { GrammarRule } from '@/types'

/**
 * Rule 32 — Futur I. Another Satzklammer pattern (werden + Infinitiv),
 * reusing the bracket idea from rules 11/12/17. Also covers the very
 * common everyday alternative: Präsens + time expression.
 */
const rule: GrammarRule = {
  id: 'gr-32',
  number: 32,
  slug: '32-futur-i',
  level: 'A2',
  termDe: 'Futur I',
  titleAr: 'المستقبل',
  eyebrowAr: 'الدرس السادس عشر في مستوى A2',
  taglineAr:
    'صيغة المستقبل الألمانية بسيطة التكوين: [[werden]] مصرَّفاً + مصدرٌ في آخر الجملة — نفس قوس الجملة الذي أصبح مألوفاً لك الآن. لكن المفاجأة: الألمان غالباً **لا يستخدمونها** للحديث عن المستقبل القريب، ويفضّلون المضارع بدلاً منها!',
  stats: [
    { value: '1', labelAr: 'فعل مساعد: werden' },
    { value: '2', labelAr: 'طريقتان للتعبير عن المستقبل' },
    { value: '25+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich werde dich morgen anrufen.',
    ar: 'سأتّصل بك غداً.',
  },
  objectivesAr: [
    'تصرّف [[werden]] وتبني جملة Futur I كاملة بقوس الجملة.',
    'تستخدم [[Präsens]] + ظرف زمن كبديل شائع للمستقبل القريب.',
    'تستخدم Futur I للتعبير عن الافتراض والوعد والتوقّع.',
  ],

  sections: [
    {
      id: 'formation',
      navLabelAr: 'التكوين',
      kickerDe: 'werden + Infinitiv',
      titleAr: 'التكوين: werden + مصدر',
      titleDe: 'Futur I',
      tone: 'accent',
      introAr: 'صرّف [[werden]] وضعه في الموضع الثاني، ثم أضف الفعل الرئيسي في صيغة المصدر في آخر الجملة.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'تصريف werden',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'werden', lang: 'de', tone: 'accent' },
          ],
          rows: [
            ['ich', 'werde'],
            ['du', 'wirst'],
            ['er, sie, es', 'wird'],
            ['wir', 'werden'],
            ['ihr', 'werdet'],
            ['sie / Sie', 'werden'],
          ],
        },
        {
          kind: 'formula',
          tags: [
            { text: 'Subjekt' },
            { text: 'werden', tone: 'accent', noteAr: 'مصرَّف، الموضع الثاني' },
            { text: '… (باقي الجملة)' },
            { text: 'Infinitiv', tone: 'plum', noteAr: 'آخر الجملة' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'werde', role: 'werden (٢)' },
            { text: 'dich morgen', role: 'باقي الجملة' },
            { text: 'anrufen.', role: 'المصدر (آخر الجملة)' },
          ],
          ar: 'سأتّصل بك غداً.',
        },
        {
          kind: 'examples',
          titleAr: 'جمل Futur I',
          tone: 'accent',
          items: [
            { badge: 'ich', de: 'Ich werde nächstes Jahr nach Deutschland fahren.', ar: 'سأذهب إلى ألمانيا العام القادم.' },
            { badge: 'sie (هي)', de: 'Sie wird bald einen neuen Job finden.', ar: 'ستجد عملاً جديداً قريباً.' },
            { badge: 'wir', de: 'Wir werden das Problem lösen.', ar: 'سنحلّ المشكلة.' },
          ],
        },
      ],
    },

    {
      id: 'praesens-alternative',
      navLabelAr: 'البديل: المضارع',
      kickerDe: 'Präsens statt Futur',
      titleAr: 'الأكثر شيوعاً: المضارع + ظرف زمن',
      titleDe: 'Präsens + Zeitangabe',
      tone: 'plum',
      introAr:
        'في الحياة اليومية، الألمان غالباً يستخدمون **المضارع** مع ظرف زمن يدلّ على المستقبل، بدل [[Futur I]] الرسمية — تماماً كما نقول بالعربية «أنا مسافر غداً» بدل «سأسافر غداً».',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'نفس المعنى، صيغتان',
          modes: [
            {
              labelAr: 'Futur I (أكثر رسمية)',
              captionAr: 'صحيحة تماماً، لكنها أقلّ شيوعاً في الكلام اليومي.',
              parts: [{ text: 'Ich' }, { text: 'werde', tone: 'accent' }, { text: 'morgen nach Berlin' }, { text: 'fahren.', tone: 'plum' }],
            },
            {
              labelAr: 'Präsens + morgen (أكثر شيوعاً)',
              captionAr: 'ظرف الزمن morgen وحده يكفي لتوضيح أن الحدث مستقبلي.',
              parts: [{ text: 'Ich' }, { text: 'fahre', tone: 'accent' }, { text: 'morgen nach Berlin.' }],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'المضارع بمعنى المستقبل',
          tone: 'plum',
          items: [
            { badge: 'Präsens', de: 'Ich komme später.', ar: 'سآتي لاحقاً.' },
            { badge: 'Präsens', de: 'Wir treffen uns um acht Uhr.', ar: 'سنلتقي الساعة الثامنة.' },
            { badge: 'Präsens', de: 'Nächste Woche beginnt der Kurs.', ar: 'تبدأ الدورة الأسبوع القادم.' },
          ],
        },
      ],
    },

    {
      id: 'usage',
      navLabelAr: 'متى نستخدم Futur I فعلاً',
      kickerDe: 'Vermutung & Versprechen',
      titleAr: 'متى نستخدم Futur I فعلاً؟',
      titleDe: 'Vermutung, Versprechen, Vorhersage',
      tone: 'highlight',
      introAr: '[[Futur I]] تبقى الخيار الأفضل في ثلاثة سياقات تحديداً: الافتراض (مع كلمات مثل [[wohl]]، [[wahrscheinlich]])، والوعد الرسمي، والتوقّعات بعيدة المدى.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'استخدامات Futur I المفضّلة',
          columns: [
            { header: 'الاستخدام', lang: 'ar' },
            { header: 'مثال', lang: 'de', tone: 'highlight' },
          ],
          rows: [
            ['افتراض عن الحاضر أو المستقبل', 'Er wird wohl zu Hause sein.'],
            ['وعد', 'Ich werde dir immer helfen.'],
            ['توقّع بعيد المدى', 'Die Bevölkerung wird weiter wachsen.'],
          ],
        },
        {
          kind: 'examples',
          titleAr: 'في جمل',
          tone: 'highlight',
          items: [
            { badge: 'افتراض', de: 'Sie wird wahrscheinlich krank sein.', ar: 'ربّما تكون مريضة.' },
            { badge: 'وعد', de: 'Ich werde pünktlich kommen, versprochen!', ar: 'سآتي في الموعد، أعدك!' },
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
      introAr: 'أشهر خطأ هو تصريف الفعلين معاً، أو نسيان إرسال المصدر إلى آخر الجملة.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich werde fahre morgen.',
              correct: 'Ich werde morgen fahren.',
              explanationAr: 'الفعل الثاني يبقى في صيغة المصدر [[fahren]]، في آخر الجملة.',
            },
            {
              wrong: 'Ich fahren werde morgen.',
              correct: 'Ich werde morgen fahren.',
              explanationAr: '[[werden]] هو الفعل المصرَّف، ويبقى في الموضع الثاني.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'werden (٢) … Infinitiv (نهاية)', hintAr: 'ما هذا الترتيب؟', backAr: 'قوس الجملة في Futur I.', exampleDe: 'Ich **werde** morgen **kommen**.' },
    { frontDe: 'Präsens + morgen', hintAr: 'ماذا يعني؟', backAr: 'بديل شائع جداً عن Futur I في الحياة اليومية.' },
    { frontDe: 'wohl, wahrscheinlich + werden', hintAr: 'متى نستخدم Futur I؟', backAr: 'للافتراض عن الحاضر أو المستقبل.' },
  ],

  quiz: [
    {
      id: 'gr32-q1',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['anrufen.', 'werde', 'Ich', 'dich', 'morgen'],
      correctOrder: [2, 1, 4, 3, 0],
      explanationAr: '[[Ich werde dich morgen anrufen.]]',
    },
    {
      id: 'gr32-q2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر التصريف الصحيح لـ werden',
      questionDe: 'Sie ___ bald ankommen.',
      options: ['werdet', 'wird', 'werden', 'wirst'],
      correctIndex: 1,
      explanationAr: 'مع [[sie]] (هي): [[wird]].',
    },
    {
      id: 'gr32-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im Alltag sagt man oft „Ich komme morgen" statt „Ich werde morgen kommen".',
      isTrue: true,
      explanationAr: 'صحيح: المضارع + ظرف زمن أكثر شيوعاً في الكلام اليومي.',
    },
  ],

  cheatSheet: [
    { de: 'werde · wirst · wird · werden · werdet · werden', ar: 'تصريف werden.' },
    { de: 'werden (٢) … Infinitiv (نهاية)', ar: 'قوس الجملة في Futur I.' },
    { de: 'Präsens + morgen/nächste Woche', ar: 'البديل الأكثر شيوعاً في الكلام اليومي.' },
  ],
}

export default rule
