import type { GrammarRule } from '@/types'

/**
 * Rule 33 — Genitiv, the fourth and final case. Mainly a written-register
 * topic; the very common spoken alternative (von + Dativ) is taught
 * alongside it from the start, not as an afterthought.
 */
const rule: GrammarRule = {
  id: 'gr-33',
  number: 33,
  slug: '33-genitiv',
  level: 'A2',
  termDe: 'Genitiv',
  titleAr: 'حالة الإضافة',
  eyebrowAr: 'الدرس السابع عشر في مستوى A2',
  taglineAr:
    'الحالة الرابعة والأخيرة: [[Genitiv]]، أو حالة **الإضافة والملكية** — ما يقابل «كتابُ الرجلِ» بالعربية. هي أقلّ الحالات استخداماً في الكلام اليومي، لكنها شائعة جداً في الكتابة الرسمية — ولها بديل محكيّ شائع ستتعلّمه أيضاً.',
  stats: [
    { value: '4', labelAr: 'أدوات Genitiv' },
    { value: '1', labelAr: 'نهاية إضافية على الاسم المذكّر/المحايد (-s/-es)' },
    { value: '30+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Das ist das Auto meines Vaters.',
    ar: 'هذه سيّارة أبي.',
  },
  objectivesAr: [
    'تحدّد علاقة الإضافة بسؤال [[Wessen?]] (ملك من؟).',
    'تحفظ أدوات Genitiv الأربعة وتضيف -s/-es إلى الاسم المذكّر والمحايد.',
    'تستخدم [[von]] + Dativ كبديل محكيّ شائع لـ Genitiv.',
    'تستخدم حروف الجرّ الشائعة التي تفرض Genitiv: [[wegen]]، [[trotz]]، [[während]].',
  ],

  sections: [
    {
      id: 'wessen',
      navLabelAr: 'Wessen؟',
      kickerDe: 'Wessen?',
      titleAr: 'Wessen؟ — لمن يعود الشيء؟',
      titleDe: 'Genitiv',
      tone: 'accent',
      introAr: 'اطرح [[Wessen?]] (ملك من؟) لتحديد علاقة الإضافة. الجواب يأتي في [[Genitiv]]، ويأتي عادة **بعد** الاسم الذي يملكه، عكس ترتيب «كتاب الرجل» بالعربية تماماً — بل مطابق له: [[das Auto meines Vaters]] = سيّارة أبي (المالِك بعد المملوك).',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أدوات Genitiv المعرّفة',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'الأداة', lang: 'de', tone: 'accent' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['مذكّر', 'des (+ -s/-es على الاسم)', 'des Mannes'],
            ['مؤنّث', 'der', 'der Frau'],
            ['محايد', 'des (+ -s/-es على الاسم)', 'des Kindes'],
            ['جمع', 'der', 'der Kinder'],
          ],
          emphasisRows: [0, 2],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'لا تنسَ: -s أو -es على الاسم نفسه',
          bodyAr: 'في Genitiv، الاسم **المذكّر أو المحايد** يأخذ نهاية إضافية على نفسه، لا على الأداة فقط: [[der Mann]] → [[des Mannes]]، [[das Kind]] → [[des Kindes]]. الأسماء القصيرة (مقطع واحد) غالباً تأخذ [[-es]]، والأطول تكتفي بـ [[-s]].',
        },
        {
          kind: 'examples',
          titleAr: 'علاقات إضافة في جمل',
          tone: 'accent',
          items: [
            { badge: 'مذكّر', de: 'Das ist das Auto des Lehrers.', ar: 'هذه سيّارة المعلّم.' },
            { badge: 'مؤنّث', de: 'Die Farbe der Wand gefällt mir.', ar: 'لون الحائط يعجبني.' },
            { badge: 'محايد', de: 'Der Titel des Buches ist interessant.', ar: 'عنوان الكتاب مثير للاهتمام.' },
            { badge: 'جمع', de: 'Die Namen der Kinder sind schön.', ar: 'أسماء الأطفال جميلة.' },
          ],
        },
      ],
    },

    {
      id: 'von-alternative',
      navLabelAr: 'البديل: von',
      kickerDe: 'von + Dativ',
      titleAr: 'البديل المحكيّ الشائع: von + Dativ',
      titleDe: 'von statt Genitiv',
      tone: 'plum',
      introAr: 'في الكلام اليومي، كثير من الألمان يستبدلون [[Genitiv]] بـ [[von]] + [[Dativ]] — أبسط وأسهل نطقاً.',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'نفس المعنى، صيغتان',
          modes: [
            {
              labelAr: 'Genitiv (رسمي، كتابة)',
              captionAr: 'الصيغة الأدق، شائعة في الكتابة.',
              parts: [{ text: 'das Auto' }, { text: 'meines Vaters', tone: 'accent' }],
            },
            {
              labelAr: 'von + Dativ (محكيّ)',
              captionAr: 'أكثر شيوعاً في الحديث اليومي.',
              parts: [{ text: 'das Auto' }, { text: 'von', tone: 'plum' }, { text: 'meinem Vater', tone: 'plum' }],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'Genitiv مقابل von',
          tone: 'plum',
          items: [
            { badge: 'Genitiv', de: 'die Tasche der Frau', ar: 'حقيبة المرأة' },
            { badge: 'von', de: 'die Tasche von der Frau', ar: 'حقيبة المرأة (محكيّ)' },
            { badge: 'Genitiv', de: 'das Haus meiner Eltern', ar: 'بيت والديّ' },
            { badge: 'von', de: 'das Haus von meinen Eltern', ar: 'بيت والديّ (محكيّ)' },
          ],
        },
      ],
    },

    {
      id: 'genitiv-praepositionen',
      navLabelAr: 'حروف جرّ Genitiv',
      kickerDe: 'wegen · trotz · während',
      titleAr: 'حروف جرّ تفرض Genitiv',
      titleDe: 'wegen · trotz · während · außerhalb',
      tone: 'highlight',
      introAr: 'مجموعة صغيرة من حروف الجرّ تفرض [[Genitiv]] — وبعضها شائع حتى في الكلام المنطوق.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'حروف Genitiv الشائعة',
          columns: [
            { header: 'الحرف', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['wegen', 'بسبب', 'wegen des Wetters'],
            ['trotz', 'رغم', 'trotz des Regens'],
            ['während', 'خلال/أثناء', 'während der Woche'],
            ['außerhalb', 'خارج', 'außerhalb der Stadt'],
          ],
        },
        {
          kind: 'examples',
          titleAr: 'في جمل كاملة',
          tone: 'highlight',
          items: [
            { badge: 'wegen', de: 'Wegen des schlechten Wetters bleiben wir zu Hause.', ar: 'بسبب سوء الطقس، نبقى في البيت.' },
            { badge: 'trotz', de: 'Trotz der Kälte gehen sie spazieren.', ar: 'رغم البرد، يذهبون للتنزّه.' },
            { badge: 'während', de: 'Während der Prüfung darf man nicht sprechen.', ar: 'خلال الامتحان، لا يُسمح بالكلام.' },
          ],
        },
        {
          kind: 'details',
          summaryAr: 'هل wegen تُستخدم مع Dativ في الكلام؟',
          paragraphsAr: [
            'نعم — في الكلام اليومي العامّي يسمع المرء أحياناً [[wegen dem Wetter]] (بـ Dativ) بدل [[wegen des Wetters]]. هذا شائع لكنه يُعدّ أقلّ رسمية؛ في الكتابة والاختبارات التزم بـ [[Genitiv]].',
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بأداة Genitiv الصحيحة',
          exercises: [
            {
              id: 'gr33-p1-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (wegen + das Wetter)',
              sentenceDe: 'Wegen ___ Wetters bleiben wir zu Hause.',
              acceptedAnswers: ['des'],
              hint: 'das Wetter محايد',
              explanationAr: '[[das Wetter]] محايد، ففي Genitiv: [[des Wetters]].',
            },
            {
              id: 'gr33-p1-fill2',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (die Farbe + die Wand)',
              sentenceDe: 'Die Farbe ___ Wand gefällt mir.',
              acceptedAnswers: ['der'],
              hint: 'die Wand مؤنّث',
              explanationAr: '[[die Wand]] مؤنّث، ففي Genitiv: [[der Wand]] (بلا تغيير في الأداة).',
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
      introAr: 'أشهر خطأ هو نسيان -s/-es على الاسم المذكّر أو المحايد.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'das Auto des Lehrer',
              correct: 'das Auto des Lehrers',
              explanationAr: 'الاسم المذكّر يأخذ -s إضافية في Genitiv: [[des Lehrers]].',
            },
            {
              wrong: 'die Tasche der Frauen (لامرأة واحدة)',
              correct: 'die Tasche der Frau',
              explanationAr: '[[der Frau]] هنا Genitiv مفرد، وليس جمعاً.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'Wessen?', hintAr: 'ما وظيفته؟', backAr: 'يحدّد علاقة الإضافة — Genitiv.' },
    { frontDe: 'des · der · des · der', hintAr: 'ما هذه الأشكال؟', backAr: 'أدوات Genitiv: مذكّر، مؤنّث، محايد، جمع.' },
    { frontDe: 'der Mann → des Mannes', hintAr: 'ماذا يحدث للاسم؟', backAr: 'يأخذ -s أو -es إضافية (مذكّر/محايد فقط).' },
    { frontDe: 'von + Dativ', hintAr: 'ما هذا؟', backAr: 'بديل محكيّ شائع لـ Genitiv.' },
    { frontDe: 'wegen · trotz · während', hintAr: 'أيّ حالة تفرضها؟', backAr: 'Genitiv.' },
  ],

  quiz: [
    {
      id: 'gr33-q1',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (der Mann → Genitiv)',
      sentenceDe: 'Das ist das Buch ___ Mannes.',
      acceptedAnswers: ['des'],
      explanationAr: '[[der Mann]] مذكّر → [[des Mannes]].',
    },
    {
      id: 'gr33-q2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الشكل الصحيح للاسم',
      questionDe: 'die Farbe des ___',
      options: ['Auto', 'Autos', 'Auton', 'Autoes'],
      correctIndex: 1,
      explanationAr: '[[das Auto]] محايد → [[des Autos]] (+s).',
    },
    {
      id: 'gr33-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„von + Dativ" ist eine gesprochene Alternative zum Genitiv.',
      isTrue: true,
      explanationAr: 'صحيح.',
    },
    {
      id: 'gr33-q4',
      type: 'translation',
      level: 'A2',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'هذه سيّارة أختي.',
      acceptedAnswers: ['Das ist das Auto meiner Schwester.'],
      explanationAr: '[[meine Schwester]] مؤنّث → [[meiner Schwester]] في Genitiv.',
    },
  ],

  cheatSheet: [
    { de: 'Wessen?', ar: 'سؤال تحديد الإضافة.' },
    { de: 'des (+s/es) · der · des (+s/es) · der', ar: 'أدوات Genitiv.' },
    { de: 'von + Dativ', ar: 'بديل محكيّ شائع.' },
    { de: 'wegen · trotz · während · außerhalb', ar: 'حروف جرّ Genitiv شائعة.' },
  ],
}

export default rule
