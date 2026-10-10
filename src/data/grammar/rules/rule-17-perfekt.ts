import type { GrammarRule } from '@/types'

/**
 * Rule 17 — Perfekt, the conversational past tense. First A2 rule, and
 * the most content-heavy one: formation (regular/irregular Partizip II,
 * trennbar/untrennbar/-ieren prefixes) + the haben/sein auxiliary choice,
 * all reusing the Satzklammer (verb-bracket) idea from rules 11–12.
 * Präteritum is rule 18, directly next; the Perfekt/Präteritum usage
 * trade-off is revisited in depth in rule 31 (Vergangenheit).
 */
const rule: GrammarRule = {
  id: 'gr-17',
  number: 17,
  slug: '17-perfekt',
  level: 'A2',
  termDe: 'Perfekt',
  titleAr: 'الماضي المحادثي',
  eyebrowAr: 'الدرس الأول في مستوى A2',
  taglineAr:
    'الآن بعد أن أتقنتَ المضارع والحالات الأربع تقريباً، حان وقت الماضي. الألمانية المحكيّة تفضّل زمناً واحداً للماضي في أغلب الأحوال: [[Perfekt]]. تُبنى بفعلين — [[haben]] أو [[sein]] مصرَّفاً في الموضع الثاني، والفعل الأصلي في صيغة **Partizip II** في آخر الجملة — تماماً كقوس الجملة الذي تعلّمته مع الأفعال الناقصة.',
  stats: [
    { value: '2', labelAr: 'فعل مساعد (haben أم sein)' },
    { value: '3', labelAr: 'أنماط لتكوين Partizip II' },
    { value: '50+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich habe gestern einen Film gesehen, und danach bin ich nach Hause gegangen.',
    ar: 'شاهدتُ فيلماً بالأمس، وبعد ذلك ذهبتُ إلى البيت.',
  },
  objectivesAr: [
    'تكوّن [[Partizip II]] للأفعال المنتظمة والشاذّة.',
    'تتعامل مع الأفعال القابلة للانفصال وغير القابلة للانفصال والأفعال المنتهية بـ [[-ieren]] في Partizip II.',
    'تختار الفعل المساعد الصحيح: [[haben]] أم [[sein]].',
    'تبني جملة Perfekt كاملة بقوس الجملة: المساعد في الموضع الثاني، وPartizip II في النهاية.',
    'تستخدم Perfekt بثقة للحديث عن أحداث الأمس والأسبوع الماضي وما قبله.',
  ],

  sections: [
    {
      id: 'overview',
      navLabelAr: 'نظرة عامة',
      kickerDe: 'Überblick',
      titleAr: 'فعلان لزمن واحد',
      titleDe: 'haben/sein + Partizip II',
      tone: 'accent',
      introAr:
        'الألمانية المحكيّة لا تملك زمناً ماضياً بسيطاً بكلمة واحدة لمعظم الأفعال (كما في العربية «فعلتُ» أو الإنجليزية «did»). بدل ذلك تستخدم **فعلين**: فعل مساعد مصرَّف يحمل كل معلومات الفاعل، وفعل أصلي ثابت الشكل يحمل المعنى.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Subjekt' },
            { text: 'haben/sein', tone: 'accent', noteAr: 'مصرَّف، الموضع الثاني' },
            { text: '… (باقي الجملة)' },
            { text: 'Partizip II', tone: 'plum', noteAr: 'ثابت الشكل، آخر الجملة' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'habe', role: 'المساعد (٢)' },
            { text: 'gestern einen Film', role: 'باقي الجملة' },
            { text: 'gesehen.', role: 'Partizip II (آخر الجملة)' },
          ],
          ar: 'شاهدتُ فيلماً بالأمس.',
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'نفس قوس الجملة الذي تعرفه بالفعل',
          bodyAr: 'لاحظ التشابه التام مع الأفعال الناقصة (الدرس ١١): هناك كان [[Modalverb]] في الموضع الثاني و[[Infinitiv]] في النهاية. هنا [[haben]]/[[sein]] يحتلّ الموضع نفسه، و[[Partizip II]] يحتلّ موضع النهاية نفسه. فكرة قوس الجملة واحدة تتكرّر في عدّة تراكيب.',
        },
      ],
    },

    {
      id: 'partizip-regular',
      navLabelAr: 'Partizip II منتظم',
      kickerDe: 'regelmäßige Verben',
      titleAr: 'Partizip II للأفعال المنتظمة',
      titleDe: 'ge + Stamm + t',
      tone: 'plum',
      introAr: 'الفعل المنتظم (مثل [[machen]]، [[lernen]]) يكوّن Partizip II بإضافة [[ge-]] في البداية و[[-t]] في النهاية حول الجذع.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'ge', tone: 'accent', noteAr: 'بادئة ثابتة' },
            { text: 'mach', noteAr: 'الجذع' },
            { text: 't', tone: 'plum', noteAr: 'نهاية ثابتة' },
          ],
        },
        {
          kind: 'table',
          captionAr: 'أفعال منتظمة شائعة',
          columns: [
            { header: 'المصدر', lang: 'de' },
            { header: 'Partizip II', lang: 'de', tone: 'plum' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['machen', 'gemacht', 'فعل'],
            ['lernen', 'gelernt', 'تعلّم'],
            ['spielen', 'gespielt', 'لعب'],
            ['kaufen', 'gekauft', 'اشترى'],
            ['wohnen', 'gewohnt', 'سكن'],
            ['arbeiten', 'gearbeitet', 'عمل'],
          ],
          emphasisRows: [5],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'arbeiten: تذكّر إضافة e',
          bodyAr: 'الأفعال التي ينتهي جذعها بـ [[-d]] أو [[-t]] تحتاج [[-e-]] إضافية قبل [[-t]] الأخيرة لتسهيل النطق — تماماً كما في المضارع (الدرس ٠٣): [[arbeiten]] → [[gearbeitet]]، [[warten]] → [[gewartet]].',
        },
        {
          kind: 'examples',
          titleAr: 'أفعال منتظمة في جمل Perfekt كاملة',
          tone: 'plum',
          items: [
            { badge: 'machen', de: 'Ich habe meine Hausaufgaben **gemacht**.', ar: 'أنجزتُ واجبي.' },
            { badge: 'kaufen', de: 'Wir haben ein neues Auto **gekauft**.', ar: 'اشترينا سيارة جديدة.' },
            { badge: 'arbeiten', de: 'Sie hat den ganzen Tag **gearbeitet**.', ar: 'عملت طوال اليوم.' },
            { badge: 'spielen', de: 'Die Kinder haben im Garten **gespielt**.', ar: 'لعب الأطفال في الحديقة.' },
          ],
        },
      ],
    },

    {
      id: 'partizip-irregular',
      navLabelAr: 'Partizip II شاذّ',
      kickerDe: 'unregelmäßige Verben',
      titleAr: 'Partizip II للأفعال الشاذّة',
      titleDe: 'ge + Stamm (meist verändert) + en',
      tone: 'highlight',
      introAr: 'مجموعة كبيرة من أشهر الأفعال الألمانية شاذّة: جذعها يتغيّر (غالباً حرف العلّة)، والنهاية [[-en]] بدل [[-t]]. **لا توجد قاعدة تشتقّها** — يجب حفظ كل فعل مع صيغته.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أفعال شاذّة شائعة جداً',
          columns: [
            { header: 'المصدر', lang: 'de' },
            { header: 'Partizip II', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['gehen', 'gegangen', 'ذهب'],
            ['fahren', 'gefahren', 'سافر/قاد'],
            ['sehen', 'gesehen', 'رأى'],
            ['essen', 'gegessen', 'أكل'],
            ['trinken', 'getrunken', 'شرب'],
            ['lesen', 'gelesen', 'قرأ'],
            ['sprechen', 'gesprochen', 'تحدّث'],
            ['schreiben', 'geschrieben', 'كتب'],
            ['nehmen', 'genommen', 'أخذ'],
            ['helfen', 'geholfen', 'ساعد'],
            ['schlafen', 'geschlafen', 'نام'],
            ['finden', 'gefunden', 'وجد'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'compass',
          titleAr: 'نصيحة عملية: احفظ ثلاثياً',
          bodyAr: 'كثير من الكتب تُعلّم الفعل الشاذّ بثلاث صيغ معاً: [[gehen – ging – gegangen]] (المصدر، Präteritum، Partizip II). حتى لو لم تتعلّم [[Präteritum]] بعد (الدرس القادم مباشرة)، احفظ على الأقل زوج (المصدر، Partizip II) من اليوم الأول.',
        },
        {
          kind: 'examples',
          titleAr: 'أفعال شاذّة في جمل Perfekt',
          tone: 'highlight',
          items: [
            { badge: 'sehen', de: 'Hast du den Film schon **gesehen**?', ar: 'هل شاهدتَ الفيلم من قبل؟' },
            { badge: 'essen', de: 'Wir haben zu Mittag **gegessen**.', ar: 'تناولنا الغداء.' },
            { badge: 'schreiben', de: 'Ich habe ihr eine E-Mail **geschrieben**.', ar: 'كتبتُ لها بريداً إلكترونياً.' },
            { badge: 'nehmen', de: 'Er hat ein Taxi **genommen**.', ar: 'أخذ سيارة أجرة.' },
            { badge: 'helfen', de: 'Sie hat mir sehr **geholfen**.', ar: 'ساعدتني كثيراً.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: اختر Partizip II الصحيح',
          exercises: [
            {
              id: 'gr17-p1-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الشكل الصحيح لـ „sehen"',
              questionDe: 'Ich habe den Film schon ___.',
              options: ['gesehen', 'gesehnt', 'geseht', 'sehen'],
              correctIndex: 0,
              explanationAr: '[[sehen]] فعل شاذّ، صيغته [[gesehen]].',
            },
            {
              id: 'gr17-p1-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل بصيغة Partizip II من „essen"',
              sentenceDe: 'Wir haben Pizza ___.',
              acceptedAnswers: ['gegessen'],
              hint: 'essen → ge + ess(تغيّر) + en',
              explanationAr: '[[essen]] → [[gegessen]].',
            },
          ],
        },
      ],
    },

    {
      id: 'prefixes',
      navLabelAr: 'البادئات',
      kickerDe: 'Präfixe',
      titleAr: 'ثلاث حالات خاصة للبادئات',
      titleDe: 'trennbar · untrennbar · -ieren',
      tone: 'accent',
      introAr: 'موضع [[ge-]] وما إذا كانت تظهر أصلاً يعتمد على نوع البادئة التي يبدأ بها الفعل.',
      blocks: [
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'قابلة للانفصال',
              subAr: 'ge- تدخل بين البادئة والجذع',
              formula: 'auf + ge + standen',
              tone: 'accent',
              items: [
                { de: 'aufstehen → aufgestanden', ar: 'استيقظ' },
                { de: 'einkaufen → eingekauft', ar: 'تسوّق' },
                { de: 'anrufen → angerufen', ar: 'اتّصل هاتفياً' },
                { de: 'ankommen → angekommen', ar: 'وصل' },
              ],
            },
            {
              titleAr: 'غير قابلة للانفصال',
              subAr: 'بلا ge- إطلاقاً',
              formula: 'be / ge / er / ver / zer / ent / emp / miss + Stamm',
              tone: 'plum',
              items: [
                { de: 'verstehen → verstanden', ar: 'فهم' },
                { de: 'bekommen → bekommen', ar: 'حصل على' },
                { de: 'besuchen → besucht', ar: 'زار' },
                { de: 'erklären → erklärt', ar: 'شرح' },
              ],
            },
            {
              titleAr: 'أفعال -ieren',
              subAr: 'بلا ge- إطلاقاً',
              formula: 'Stamm + iert',
              tone: 'highlight',
              items: [
                { de: 'studieren → studiert', ar: 'درس (جامعياً)' },
                { de: 'telefonieren → telefoniert', ar: 'تحدّث هاتفياً' },
                { de: 'fotografieren → fotografiert', ar: 'صوّر' },
              ],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'القاعدة الذهبية لـ ge-',
          bodyAr: '[[ge-]] لا تظهر أبداً إن كانت **النبرة على البادئة الأولى لا تقع** — وهذا بالضبط حال البادئات غير القابلة للانفصال (التي لا تحمل نبرة) وأفعال [[-ieren]] (فرنسية الأصل، نبرتها على [[-ieren]] نفسها).',
        },
        {
          kind: 'examples',
          titleAr: 'الأنواع الثلاثة في جمل Perfekt',
          tone: 'accent',
          items: [
            { badge: 'قابلة للانفصال', de: 'Ich bin um sieben **aufgestanden**.', ar: 'استيقظتُ الساعة السابعة.' },
            { badge: 'غير قابلة للانفصال', de: 'Hast du die Grammatik **verstanden**?', ar: 'هل فهمتَ القاعدة؟' },
            { badge: '-ieren', de: 'Er hat in Berlin **studiert**.', ar: 'درس في برلين.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: ضع ge- في مكانها الصحيح (أو لا تضعها)',
          exercises: [
            {
              id: 'gr17-p2-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر صيغة Partizip II الصحيحة لـ „verstehen"',
              questionDe: '',
              options: ['geverstanden', 'verstanden', 'verstehet', 'gestanden'],
              correctIndex: 1,
              explanationAr: 'البادئة [[ver-]] غير قابلة للانفصال، فلا تظهر [[ge-]] إطلاقاً.',
            },
            {
              id: 'gr17-p2-mc2',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر صيغة Partizip II الصحيحة لـ „aufstehen"',
              questionDe: '',
              options: ['geaufstanden', 'aufgestanden', 'aufgestehen', 'gestanden'],
              correctIndex: 1,
              explanationAr: 'البادئة [[auf-]] قابلة للانفصال، فتدخل [[ge-]] بينها وبين الجذع: [[aufgestanden]].',
            },
          ],
        },
      ],
    },

    {
      id: 'haben-oder-sein',
      navLabelAr: 'haben أم sein',
      kickerDe: 'haben oder sein?',
      titleAr: 'اختيار الفعل المساعد',
      titleDe: 'haben vs. sein',
      tone: 'plum',
      introAr: 'أغلب الأفعال تستخدم [[haben]]. لكن مجموعة محدَّدة — أفعال **الحركة** و**تغيّر الحالة** — تستخدم [[sein]] بدلاً منه.',
      blocks: [
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'star',
          titleAr: 'القاعدة: sein لثلاث مجموعات فقط',
          bodyAr: '**١) حركة من مكان إلى آخر** ([[gehen]]، [[fahren]]، [[kommen]]، [[fliegen]])، **٢) تغيّر حالة** ([[aufstehen]]، [[einschlafen]]، [[werden]]، [[sterben]])، **٣) أفعال خاصّة**: [[sein]] نفسه ([[gewesen]]) و[[bleiben]] ([[geblieben]]) و[[passieren]] ([[passiert]]). **كل شيء آخر يستخدم [[haben]]**.',
        },
        {
          kind: 'table',
          captionAr: 'أفعال sein الشائعة',
          columns: [
            { header: 'المصدر', lang: 'de' },
            { header: 'Perfekt', lang: 'de', tone: 'plum' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['gehen', 'ist gegangen', 'ذهب'],
            ['fahren', 'ist gefahren', 'سافر/قاد'],
            ['kommen', 'ist gekommen', 'أتى'],
            ['fliegen', 'ist geflogen', 'طار'],
            ['aufstehen', 'ist aufgestanden', 'استيقظ'],
            ['werden', 'ist geworden', 'أصبح'],
            ['bleiben', 'ist geblieben', 'بقي'],
            ['sein', 'ist gewesen', 'كان'],
          ],
        },
        {
          kind: 'examples',
          titleAr: 'haben وsein جنباً إلى جنب',
          tone: 'plum',
          items: [
            { badge: 'sein — حركة', de: 'Ich **bin** nach Berlin **gefahren**.', ar: 'سافرتُ إلى برلين.' },
            { badge: 'haben — عادي', de: 'Ich **habe** ein Auto **gekauft**.', ar: 'اشتريتُ سيارة.' },
            { badge: 'sein — تغيّر حالة', de: 'Das Kind **ist** schnell **eingeschlafen**.', ar: 'نام الطفل بسرعة.' },
            { badge: 'sein — خاص', de: 'Wo **bist** du **gewesen**?', ar: 'أين كنتَ؟' },
            { badge: 'sein — خاص', de: 'Wir **sind** den ganzen Tag zu Hause **geblieben**.', ar: 'بقينا في البيت طوال اليوم.' },
          ],
        },
        {
          kind: 'details',
          summaryAr: 'لماذا لا تُستخدم sein مع كل الأفعال؟',
          paragraphsAr: [
            'الفكرة أن [[sein]] تُستخدم حين **يتغيّر الفاعل نفسه** (موقعه أو حالته)، بينما [[haben]] تُستخدم حين يبقى الفاعل كما هو ويفعل شيئاً لغيره. هذا تفسير مساعد للفهم، لكن الطريقة الأضمن هي حفظ كل فعل حركة أو تغيّر حالة مع مساعده منذ البداية.',
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: haben أم sein؟',
          exercises: [
            {
              id: 'gr17-p3-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر المساعد الصحيح',
              questionDe: 'Ich ___ gestern nach München gefahren.',
              options: ['habe', 'bin', 'hat', 'ist'],
              correctIndex: 1,
              explanationAr: '[[fahren]] فعل حركة، فيستخدم [[sein]]: [[Ich bin gefahren]].',
            },
            {
              id: 'gr17-p3-mc2',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر المساعد الصحيح',
              questionDe: 'Sie ___ ein Buch gelesen.',
              options: ['hat', 'ist', 'habe', 'sind'],
              correctIndex: 0,
              explanationAr: '[[lesen]] ليس فعل حركة ولا تغيّر حالة، فيستخدم [[haben]].',
            },
            {
              id: 'gr17-p3-order1',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات',
              words: ['gegangen.', 'ins Kino', 'Wir', 'sind'],
              correctOrder: [2, 3, 1, 0],
              explanationAr: '[[Wir sind ins Kino gegangen.]] — المساعد ثانياً، Partizip II في النهاية.',
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
      introAr: 'أشهر ثلاثة أخطاء: اختيار المساعد الخاطئ، نسيان قوس الجملة، وإضافة ge- لفعل لا يحتاجها.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich habe nach Hause gegangen.',
              correct: 'Ich bin nach Hause gegangen.',
              explanationAr: '[[gehen]] فعل حركة، يحتاج [[sein]] لا [[haben]].',
            },
            {
              wrong: 'Ich habe gegessen die Pizza.',
              correct: 'Ich habe die Pizza gegessen.',
              explanationAr: 'Partizip II يجب أن يكون آخر كلمة في الجملة، بعد كل العناصر الأخرى.',
            },
            {
              wrong: 'Ich habe geverstanden.',
              correct: 'Ich habe verstanden.',
              explanationAr: 'البادئة [[ver-]] غير قابلة للانفصال، فلا تُضاف [[ge-]] إطلاقاً.',
            },
            {
              wrong: 'Wir haben in Köln gestudiert.',
              correct: 'Wir haben in Köln studiert.',
              explanationAr: 'أفعال [[-ieren]] لا تأخذ [[ge-]] في Partizip II.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'haben/sein (٢) … Partizip II (نهاية)', hintAr: 'ما هذا الترتيب؟', backAr: 'قوس جملة Perfekt — نفس فكرة الأفعال الناقصة.', exampleDe: 'Ich **habe** einen Film **gesehen**.' },
    { frontDe: 'ge + Stamm + t', hintAr: 'لأيّ نوع أفعال؟', backAr: 'الأفعال المنتظمة.', exampleDe: 'machen → **gemacht**' },
    { frontDe: 'ge + Stamm(متغيّر) + en', hintAr: 'لأيّ نوع أفعال؟', backAr: 'الأفعال الشاذّة — تحفظ فرداً فرداً.', exampleDe: 'gehen → **gegangen**' },
    { frontDe: 'بادئة غير قابلة للانفصال أو -ieren', hintAr: 'هل تظهر ge-؟', backAr: 'لا — بلا ge- إطلاقاً.', exampleDe: 'verstehen → **verstanden**' },
    { frontDe: 'sein: حركة + تغيّر حالة', hintAr: 'أيّ أفعال تستخدم sein؟', backAr: 'gehen, fahren, kommen, aufstehen, werden, bleiben, sein نفسها.' },
    { frontDe: 'كل شيء آخر', hintAr: 'أيّ مساعد؟', backAr: 'haben — الافتراضي لمعظم الأفعال.' },
  ],

  quiz: [
    {
      id: 'gr17-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر المساعد الصحيح',
      questionDe: 'Er ___ gestern spät aufgestanden.',
      options: ['hat', 'ist', 'habe', 'sind'],
      correctIndex: 1,
      explanationAr: '[[aufstehen]] تغيّر حالة، يستخدم [[sein]].',
    },
    {
      id: 'gr17-q2',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بصيغة Partizip II من „trinken"',
      sentenceDe: 'Ich habe einen Kaffee ___.',
      acceptedAnswers: ['getrunken'],
      explanationAr: '[[trinken]] → [[getrunken]] (فعل شاذّ).',
    },
    {
      id: 'gr17-q3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر صيغة Partizip II الصحيحة لـ „telefonieren"',
      questionDe: '',
      options: ['getelefoniert', 'telefoniert', 'telefoniet', 'getelefont'],
      correctIndex: 1,
      explanationAr: 'أفعال [[-ieren]] لا تأخذ [[ge-]]: [[telefoniert]].',
    },
    {
      id: 'gr17-q4',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Partizip II steht am Ende des Satzes: Ich habe das Buch gelesen.',
      isTrue: true,
      explanationAr: 'صحيح: Partizip II يحتلّ دائماً آخر موضع في قوس الجملة.',
    },
    {
      id: 'gr17-q5',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['Hausaufgaben', 'habe', 'gemacht.', 'Ich', 'meine'],
      correctOrder: [3, 1, 4, 0, 2],
      explanationAr: '[[Ich habe meine Hausaufgaben gemacht.]]',
    },
    {
      id: 'gr17-q6',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق المصدر بصيغة Partizip II الصحيحة',
      pairs: [
        { de: 'gehen', ar: 'gegangen' },
        { de: 'sehen', ar: 'gesehen' },
        { de: 'verstehen', ar: 'verstanden' },
        { de: 'studieren', ar: 'studiert' },
      ],
      explanationAr: 'راجع جدول الأفعال الشاذّة والبادئات أعلاه إن أخطأت.',
    },
    {
      id: 'gr17-q7',
      type: 'translation',
      level: 'A2',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'شاهدنا فيلماً بالأمس.',
      acceptedAnswers: ['Wir haben gestern einen Film gesehen.', 'Wir haben einen Film gestern gesehen.'],
      explanationAr: '[[sehen]] يستخدم [[haben]]، وPartizip II هو [[gesehen]].',
    },
  ],

  cheatSheet: [
    { de: 'haben/sein (٢) … Partizip II (نهاية)', ar: 'تركيب Perfekt الأساسي.' },
    { de: 'ge + Stamm + t', ar: 'الأفعال المنتظمة.' },
    { de: 'ge + Stamm(تغيّر) + en', ar: 'الأفعال الشاذّة — تُحفظ فرداً فرداً.' },
    { de: 'بلا ge-: بادئة غير قابلة للانفصال أو -ieren', ar: 'verstanden, besucht, studiert, telefoniert.' },
    { de: 'sein: حركة + تغيّر حالة + bleiben/sein/passieren', ar: 'كل شيء آخر يستخدم haben.' },
  ],
}

export default rule
