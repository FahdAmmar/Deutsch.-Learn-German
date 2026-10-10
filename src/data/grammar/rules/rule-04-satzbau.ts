import type { GrammarRule } from '@/types'

/**
 * Rule 04 — Satzbau, scoped to the declarative sentence (Aussagesatz)
 * only. Question word order is rule 05; subordinate-clause word order
 * (verb-final) is rule 28/30 and explicitly out of scope here — every
 * example in this rule is a simple main clause.
 */
const rule: GrammarRule = {
  id: 'gr-04',
  number: 4,
  slug: '04-satzbau',
  level: 'A1',
  termDe: 'Satzbau',
  titleAr: 'ترتيب الجملة',
  eyebrowAr: 'الدرس الرابع في خارطة القواعد',
  taglineAr:
    'أهمّ قاعدة في بناء الجملة الألمانية بأكملها: **الفعل المصرَّف يحتلّ دائماً الموضع الثاني**. ليس بالضرورة الكلمة الثانية — بل العنصر الثاني، مهما كان طويلاً. هذه القاعدة تسمح لك بالبدء بأيّ عنصر تريد التركيز عليه دون كسر بنية الجملة.',
  stats: [
    { value: '2', labelAr: 'موضع الفعل دائماً' },
    { value: '4', labelAr: 'أنواع عناصر يمكن أن تبدأ بها الجملة' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Heute lerne ich mit meiner Freundin Deutsch.',
    ar: 'اليوم أتعلّم الألمانية مع صديقتي.',
  },
  objectivesAr: [
    'تفهم قاعدة «الفعل في الموضع الثاني» وتطبّقها بثقة.',
    'تبدأ الجملة بعناصر مختلفة (وقت، مكان، مفعول به) دون أن يتحرّك الفعل من موضعه.',
    'تلاحظ أن الفاعل ينتقل بعد الفعل حين يبدأ عنصر آخر الجملة (الانقلاب / Inversion).',
    'ترتّب الظروف داخل الجملة بترتيب منطقي (الزمان ثم السبب ثم الطريقة ثم المكان).',
  ],

  sections: [
    {
      id: 'position-2',
      navLabelAr: 'الفعل في الموضع الثاني',
      kickerDe: 'Verb an Position 2',
      titleAr: 'الفعل دائماً في الموضع الثاني',
      titleDe: 'Verb-Zweit-Stellung',
      tone: 'accent',
      introAr:
        '«الموضع الثاني» يعني **العنصر** الثاني في الجملة، لا الكلمة الثانية. العنصر الأول قد يكون كلمة واحدة أو عبارة كاملة — المهم أن الفعل المصرَّف يأتي مباشرة بعده.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'العنصر الأول', tone: 'accent', noteAr: 'فاعل، ظرف، مفعول به…' },
            { text: 'Verb', tone: 'primary', noteAr: 'الموضع الثاني دائماً' },
            { text: '… (باقي الجملة)' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'العنصر ١' },
            { text: 'lerne', role: 'الفعل (٢)' },
            { text: 'heute', role: 'العنصر ٣' },
            { text: 'Deutsch.', role: 'العنصر ٤' },
          ],
          ar: 'أنا أتعلّم الألمانية اليوم.',
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Heute', role: 'العنصر ١' },
            { text: 'lerne', role: 'الفعل (٢)' },
            { text: 'ich', role: 'العنصر ٣' },
            { text: 'Deutsch.', role: 'العنصر ٤' },
          ],
          ar: 'اليوم أتعلّم الألمانية.',
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'الانقلاب: الفاعل يتنازل عن مكانه',
          bodyAr:
            'في الجملة الثانية أعلاه بدأنا بـ [[Heute]] بدل الفاعل. الفعل [[lerne]] **يبقى في الموضع الثاني** كما هو، فيضطرّ الفاعل [[ich]] إلى الانتقال إلى **بعد** الفعل مباشرة. هذا يسمى **الانقلاب** ([[Inversion]])، وهو ليس استثناءً بل نتيجة طبيعية لقاعدة الموضع الثاني.',
        },
        {
          kind: 'compare',
          titleAr: 'جرّب بنفسك: ابدأ بعنصر مختلف',
          modes: [
            {
              labelAr: 'يبدأ بالفاعل',
              captionAr: 'الترتيب المعتاد: فاعل، فعل، باقي الجملة.',
              parts: [
                { text: 'Ich', tone: 'accent' },
                { text: 'trinke', tone: 'primary' },
                { text: 'morgens', tone: 'accent' },
                { text: 'Kaffee.', tone: 'accent' },
              ],
            },
            {
              labelAr: 'يبدأ بالزمن',
              captionAr: 'الفعل يبقى ثانياً، والفاعل [[ich]] ينتقل إلى بعده.',
              parts: [
                { text: 'Morgens', tone: 'accent' },
                { text: 'trinke', tone: 'primary' },
                { text: 'ich', tone: 'accent' },
                { text: 'Kaffee.', tone: 'accent' },
              ],
            },
            {
              labelAr: 'يبدأ بالمفعول به',
              captionAr: 'نفس القاعدة: الفعل ثانياً، والفاعل بعده مباشرة.',
              parts: [
                { text: 'Kaffee', tone: 'accent' },
                { text: 'trinke', tone: 'primary' },
                { text: 'ich', tone: 'accent' },
                { text: 'morgens.', tone: 'accent' },
              ],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'نفس المعنى، بدايات مختلفة',
          tone: 'accent',
          items: [
            { badge: 'فاعل أولاً', de: '**Ich** wohne seit zwei Jahren in Berlin.', ar: 'أنا أسكن في برلين منذ سنتين.' },
            {
              badge: 'زمن أولاً',
              de: '**Seit zwei Jahren** wohne ich in Berlin.',
              ar: 'منذ سنتين أسكن في برلين.',
              noteAr: 'العبارة الزمنية كاملة ([[seit zwei Jahren]]) تُحسب عنصراً واحداً، والفعل بعدها مباشرة.',
            },
            { badge: 'مكان أولاً', de: '**In Berlin** wohne ich seit zwei Jahren.', ar: 'في برلين أسكن منذ سنتين.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: رتّب الجملة',
          exercises: [
            {
              id: 'gr04-p1-order1',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات لتبدأ بالفاعل',
              words: ['Deutsch.', 'lernt', 'Sie'],
              correctOrder: [2, 1, 0],
              explanationAr: '[[Sie lernt Deutsch.]] — فاعل، فعل، مفعول به.',
            },
            {
              id: 'gr04-p1-order2',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات لتبدأ بالزمن',
              words: ['Deutsch.', 'lerne', 'Heute', 'ich'],
              correctOrder: [2, 1, 3, 0],
              explanationAr: '[[Heute lerne ich Deutsch.]] — الفعل يبقى ثانياً، والفاعل بعده.',
            },
          ],
        },
      ],
    },

    {
      id: 'mistake-position-3',
      navLabelAr: 'خطأ الموضع الثالث',
      kickerDe: 'Der häufigste Fehler',
      titleAr: 'أشهر خطأ: نسيان الانقلاب',
      titleDe: 'Verb an Position 3?',
      tone: 'error',
      introAr:
        'أكثر خطأ يقع فيه متحدّثو العربية والإنجليزية: الاحتفاظ بالفاعل في مكانه الأصلي بعد أن بدأت الجملة بعنصر آخر، فيصبح الفعل في الموضع الثالث خطأً.',
      blocks: [
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'لماذا يحدث هذا الخطأ؟',
          bodyAr:
            'في الإنجليزية نقول Today **I** learn German — الفاعل يبقى قبل الفعل حتى لو بدأت الجملة بظرف الزمان. الألمانية **لا تسمح بذلك**: بمجرد أن يشغل عنصر آخر الموضع الأول، ينتقل الفاعل تلقائياً إلى ما بعد الفعل.',
        },
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Heute ich lerne Deutsch.',
              correct: 'Heute lerne ich Deutsch.',
              explanationAr: 'الفعل يجب أن يبقى في الموضع الثاني؛ الفاعل [[ich]] ينتقل إلى بعده.',
            },
            {
              wrong: 'Morgen wir fahren nach Bonn.',
              correct: 'Morgen fahren wir nach Bonn.',
              explanationAr: 'نفس القاعدة: [[fahren]] في الموضع الثاني، و[[wir]] بعده.',
            },
            {
              wrong: 'In Berlin ich wohne.',
              correct: 'In Berlin wohne ich.',
              explanationAr: 'العبارة [[In Berlin]] عنصر واحد يشغل الموضع الأول، فينتقل الفعل [[wohne]] إلى الموضع الثاني مباشرة بعده.',
            },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: صح أم خطأ؟',
          exercises: [
            {
              id: 'gr04-p2-tf1',
              type: 'true-false',
              level: 'A1',
              promptAr: 'هل ترتيب هذه الجملة صحيح؟',
              statementDe: 'Am Wochenende ich spiele Fußball.',
              isTrue: false,
              explanationAr: 'خطأ: الصحيح [[Am Wochenende spiele ich Fußball.]]',
            },
            {
              id: 'gr04-p2-tf2',
              type: 'true-false',
              level: 'A1',
              promptAr: 'هل ترتيب هذه الجملة صحيح؟',
              statementDe: 'Am Wochenende spiele ich Fußball.',
              isTrue: true,
              explanationAr: 'صحيح: الفعل [[spiele]] في الموضع الثاني، والفاعل [[ich]] بعده.',
            },
          ],
        },
      ],
    },

    {
      id: 'tekamolo',
      navLabelAr: 'ترتيب الظروف',
      kickerDe: 'Te-Ka-Mo-Lo',
      titleAr: 'ترتيب أكثر من ظرف في الجملة',
      titleDe: 'Temporal · Kausal · Modal · Lokal',
      tone: 'plum',
      introAr:
        'حين تجتمع أكثر من عبارة ظرفية في الجزء الأوسط من الجملة (بعد الفعل)، يوجد ترتيب منطقي يُختصر بكلمة **Te-Ka-Mo-Lo**: الزمان، ثم السبب، ثم الطريقة، ثم المكان.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'Te-Ka-Mo-Lo',
          columns: [
            { header: 'الترتيب', lang: 'ar' },
            { header: 'النوع', lang: 'de', tone: 'plum' },
            { header: 'مثال', lang: 'de' },
            { header: 'السؤال', lang: 'ar' },
          ],
          rows: [
            ['١', 'Temporal (زمان)', 'heute', 'متى؟'],
            ['٢', 'Kausal (سبب)', 'wegen der Prüfung', 'لماذا؟'],
            ['٣', 'Modal (طريقة)', 'mit dem Bus', 'كيف؟'],
            ['٤', 'Lokal (مكان)', 'nach Hause', 'إلى أين؟'],
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'fahre', role: 'الفعل' },
            { text: 'heute', role: 'زمان (Te)' },
            { text: 'mit dem Bus', role: 'طريقة (Mo)' },
            { text: 'nach Hause.', role: 'مكان (Lo)' },
          ],
          ar: 'أذهب اليوم بالحافلة إلى البيت.',
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'لا تحتاج كل الظروف الأربعة معاً',
          bodyAr:
            'أغلب الجمل تحتوي واحداً أو اثنين من هذه الظروف فقط، وTe-Ka-Mo-Lo يخبرك بالترتيب **إن اجتمعت**. في المستوى A1 يكفي أن تتقن ترتيب اثنين معاً (غالباً الزمان مع المكان، أو الزمان مع الطريقة).',
        },
        {
          kind: 'examples',
          titleAr: 'أمثلة بظرفين',
          tone: 'plum',
          items: [
            { badge: 'Te + Lo', de: 'Wir fahren **morgen** **nach Berlin**.', ar: 'نذهب غداً إلى برلين.' },
            { badge: 'Te + Mo', de: 'Ich komme **heute** **zu Fuß**.', ar: 'أتيت اليوم سيراً على الأقدام.' },
            { badge: 'Te + Mo + Lo', de: 'Er fährt **jeden Tag** **mit dem Auto** **zur Arbeit**.', ar: 'هو يذهب كل يوم بالسيارة إلى العمل.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: رتّب الظروف',
          exercises: [
            {
              id: 'gr04-p3-order1',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات (زمان قبل مكان)',
              words: ['zur Schule.', 'geht', 'Das Kind', 'morgens'],
              correctOrder: [2, 1, 3, 0],
              explanationAr: '[[Das Kind geht morgens zur Schule.]] — الزمان (morgens) قبل المكان (zur Schule).',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    {
      frontDe: 'Verb-Zweit-Stellung',
      hintAr: 'ما القاعدة؟',
      backAr: 'الفعل المصرَّف يحتلّ دائماً العنصر الثاني في الجملة الرئيسية، أياً كان العنصر الأول.',
      exampleDe: '**Heute** **lerne** ich Deutsch.',
    },
    {
      frontDe: 'Inversion',
      hintAr: 'متى يحدث؟',
      backAr: 'حين يبدأ عنصر غير الفاعل الجملة، ينتقل الفاعل إلى ما بعد الفعل.',
      exampleDe: 'Heute **lerne** **ich** Deutsch.',
    },
    {
      frontDe: 'Te-Ka-Mo-Lo',
      hintAr: 'ماذا يعني؟',
      backAr: 'ترتيب الظروف: الزمان (Temporal) ثم السبب (Kausal) ثم الطريقة (Modal) ثم المكان (Lokal).',
      exampleDe: 'Ich fahre **heute** **mit dem Bus** **nach Hause**.',
    },
    {
      frontDe: 'Heute ich lerne Deutsch.',
      hintAr: 'صح أم خطأ؟',
      backAr: 'خطأ — الفعل يجب أن يبقى ثانياً: Heute lerne ich Deutsch.',
    },
  ],

  quiz: [
    {
      id: 'gr04-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ ترتيب صحيح؟',
      questionDe: '',
      options: ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.', 'Ich heute lerne Deutsch.', 'Lerne ich heute Deutsch.'],
      correctIndex: 1,
      explanationAr: 'الفعل [[lerne]] في الموضع الثاني، والفاعل [[ich]] بعده.',
    },
    {
      id: 'gr04-q2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'In Berlin wohnt sie.',
      isTrue: true,
      explanationAr: 'صحيح: [[wohnt]] في الموضع الثاني بعد العبارة المكانية [[In Berlin]].',
    },
    {
      id: 'gr04-q3',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الجملة لتبدأ بالمكان',
      words: ['wohnen', 'In Bonn', 'viele Studenten.'],
      correctOrder: [1, 0, 2],
      explanationAr: '[[In Bonn wohnen viele Studenten.]] — الفعل ثانياً دائماً.',
    },
    {
      id: 'gr04-q4',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'رتّب Te-Ka-Mo-Lo: أيّ ترتيب صحيح لعبارتين؟',
      questionDe: '',
      options: [
        'Er fährt mit dem Auto heute zur Arbeit.',
        'Er fährt heute mit dem Auto zur Arbeit.',
        'Er fährt zur Arbeit heute mit dem Auto.',
        'Er fährt zur Arbeit mit dem Auto heute.',
      ],
      correctIndex: 1,
      explanationAr: 'الزمان (heute) يسبق الطريقة (mit dem Auto) التي تسبق المكان (zur Arbeit).',
    },
    {
      id: 'gr04-q5',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل الترتيب الصحيح (ابدأ بـ Morgen)',
      sentenceDe: 'Morgen ___ wir nach München.',
      acceptedAnswers: ['fahren'],
      hint: 'الفعل في الموضع الثاني',
      explanationAr: '[[Morgen fahren wir nach München.]] — الفعل ثانياً، الفاعل بعده.',
    },
    {
      id: 'gr04-q6',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية، ابدأ بكلمة اليوم (Heute)',
      direction: 'ar-to-de',
      sourceText: 'اليوم أطبخ في البيت.',
      acceptedAnswers: ['Heute koche ich zu Hause.'],
      explanationAr: 'الفعل [[koche]] يبقى ثانياً، والفاعل [[ich]] بعده.',
    },
  ],

  cheatSheet: [
    { de: 'Subjekt/Element 1 → Verb (Position 2) → …', ar: 'قاعدة الموضع الثاني — أساس كل جملة ألمانية.' },
    { de: 'Heute lerne ich Deutsch.', ar: 'العنصر الأول قد يكون ظرفاً، والفاعل ينتقل بعد الفعل (Inversion).' },
    { de: 'Te → Ka → Mo → Lo', ar: 'ترتيب الظروف: الزمان، السبب، الطريقة، المكان.' },
    { de: '✗ Heute ich lerne', ar: 'خطأ شائع: نسيان نقل الفاعل بعد الفعل.' },
  ],
}

export default rule
