import type { GrammarRule } from '@/types'

/**
 * Rule 01 — Personalpronomen (Nominativ).
 *
 * Scope note: this lesson covers the *subject* forms only. The
 * Akkusativ/Dativ pronouns (mich, mir, …) belong to rule 16 and are
 * deliberately not used here. Verb endings are only previewed (rules 02
 * and 03 teach them), so the sample verbs are limited to wohnen, kommen,
 * heißen, lernen and sein.
 */
const rule: GrammarRule = {
  id: 'gr-01',
  number: 1,
  slug: '01-personalpronomen',
  level: 'A1',
  termDe: 'Personalpronomen',
  titleAr: 'ضمائر الشخص',
  eyebrowAr: 'الدرس الأول في خارطة القواعد',
  taglineAr:
    'ضمائر الشخص هي الكلمات القصيرة التي تنوب عن الأسماء: [[ich]] و[[du]] و[[er]] و[[sie]] وغيرها. في الألمانية هي ليست مجرّد بديل عن الاسم — بل **تحدّد نهاية الفعل**، ولا يجوز حذفها كما نفعل في العربية. ستتقن هنا الأشكال التسعة، والفرق بين [[du]] و[[ihr]] و[[Sie]]، ولماذا يكون [[der Tisch]] هو [[er]] وليس «هي».',
  stats: [
    { value: '9', labelAr: 'أشكال للضمير' },
    { value: '3', labelAr: 'معانٍ لـ sie / Sie' },
    { value: '60+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich heiße Sara und ich komme aus Syrien.',
    ar: 'اسمي سارة وأنا من سوريا.',
  },
  objectivesAr: [
    'تحفظ الأشكال التسعة لضمائر الفاعل ومقابلها بالعربية.',
    'تفرّق بين [[du]] و[[ihr]] و[[Sie]] وتختار الصيغة المناسبة لكل موقف.',
    'تعرف لماذا يكون [[der Tisch]] هو [[er]]، وتربط الضمير بجنس الاسم لا بمعناه.',
    'تميّز بين [[sie]] (هي) و[[sie]] (هم) و[[Sie]] (حضرتك) من الحرف والفعل والسياق.',
    'تستخدم [[es]] في الطقس والوقت وتفهم لماذا لا يُحذف الضمير في الألمانية.',
  ],

  sections: [
    /* ------------------------------------------------------------ */
    {
      id: 'overview',
      navLabelAr: 'نظرة عامة',
      kickerDe: 'Überblick',
      titleAr: 'ما هي ضمائر الشخص؟',
      titleDe: 'Personalpronomen',
      tone: 'accent',
      introAr:
        'بدل أن نكرّر «سارة» أو «الكتاب» في كل جملة نستعمل ضميراً ينوب عنه. للعربية «أنا» و«هو» و«نحن»، وللألمانية تسعة أشكال في حالة الفاعل ([[Nominativ]]). هي أول ما يجب أن تتقنه لأنها تدخل في كل جملة تقريباً.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Pronomen', tone: 'accent', noteAr: 'الفاعل' },
            { text: 'Verb', tone: 'primary', noteAr: 'تتغيّر نهايته حسب الضمير' },
            { text: '… (باقي الجملة)' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'lerne', role: 'الفعل' },
            { text: 'Deutsch.', role: 'المكمّل' },
          ],
          ar: 'أنا أتعلّم الألمانية.',
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'ثلاثة فروق مهمة عن العربية',
          bodyAr:
            '**١)** الضمير يجب أن يُذكر: لا نقول [[Wohne in Berlin]] بل [[Ich wohne in Berlin]]. **٢)** الضمير يحدّد نهاية الفعل، فهو الذي يكشف من يقوم بالفعل. **٣)** ضمير الغائب ([[er]] / [[sie]] / [[es]]) يتبع **جنس الاسم الألماني** لا معناه بالعربية.',
        },
        {
          kind: 'examples',
          titleAr: 'كل ضمير في جملة',
          tone: 'accent',
          items: [
            { badge: 'ich · أنا', de: '**Ich** heiße Sara.', ar: 'اسمي سارة.' },
            { badge: 'du · أنتَ / أنتِ', de: '**Du** kommst aus Syrien.', ar: 'أنتَ من سوريا.' },
            { badge: 'er · هو', de: '**Er** wohnt in Berlin.', ar: 'هو يسكن في برلين.' },
            { badge: 'sie · هي', de: '**Sie** arbeitet als Ärztin.', ar: 'هي تعمل طبيبة.' },
            { badge: 'es', de: '**Es** ist kalt.', ar: 'الجوّ بارد.', noteAr: 'هنا [[es]] فاعل شكلي للطقس — نشرحه في قسمٍ خاص.' },
            { badge: 'wir · نحن', de: '**Wir** lernen Deutsch.', ar: 'نحن نتعلّم الألمانية.' },
            { badge: 'ihr · أنتم', de: '**Ihr** seid nett.', ar: 'أنتم لطفاء.' },
            {
              badge: 'sie · هم',
              de: '**Sie** sind Lehrer.',
              ar: 'هم معلّمون.',
              noteAr: 'قد تعني الجملة نفسها «حضراتكم معلّمون» في السياق الرسمي — يحسم السياقُ المعنى.',
            },
            { badge: 'Sie · حضرتك', de: 'Sind **Sie** Herr Weber?', ar: 'هل حضرتك السيد فيبر؟' },
          ],
        },
        {
          kind: 'details',
          summaryAr: 'هل يمكن حذف الضمير في الكلام العامّي؟',
          paragraphsAr: [
            'في المحادثة السريعة قد يحذف الألمان [[ich]] في عبارات جاهزة مثل [[Weiß nicht]] أو [[Habe keine Zeit]]. هذا اختصارٌ عامّي وليس قاعدة، وهو لا يصلح كأساس للمتعلّم.',
            'القاعدة التي تلتزم بها في الكتابة والامتحانات: الجملة الخبرية تحتاج فاعلاً ظاهراً. الاستثناء النظامي الوحيد هو الأمر ([[Imperativ]])، مثل [[Komm!]]، وسنتعلّمه لاحقاً في الخارطة.',
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: 'forms',
      navLabelAr: 'الأشكال التسعة',
      kickerDe: 'Die Formen',
      titleAr: 'الأشكال التسعة',
      titleDe: 'Nominativ',
      tone: 'primary',
      introAr:
        'الجدول التالي هو خارطتك. انقر على أي ضمير لسماع نطقه. لاحظ أن ضمير المخاطَب ينقسم إلى **مألوف** ([[du]] / [[ihr]]) و**رسمي** ([[Sie]]).',
      blocks: [
        {
          kind: 'table',
          captionAr: 'ضمائر الفاعل في الألمانية',
          columns: [
            { header: 'الشخص', lang: 'ar' },
            { header: 'المفرد · Singular', lang: 'de', tone: 'accent' },
            { header: 'يقابله بالعربية', lang: 'ar' },
            { header: 'الجمع · Plural', lang: 'de', tone: 'plum' },
            { header: 'يقابله بالعربية', lang: 'ar' },
          ],
          rows: [
            ['المتكلّم', 'ich', 'أنا', 'wir', 'نحن'],
            ['المخاطَب (مألوف)', 'du', 'أنتَ / أنتِ', 'ihr', 'أنتم / أنتنّ'],
            ['الغائب', 'er, sie, es', 'هو · هي · (es بلا مقابل مباشر)', 'sie', 'هم / هنّ'],
            ['المخاطَب (رسمي)', 'Sie', 'حضرتك', 'Sie', 'حضراتكم'],
          ],
          emphasisRows: [3],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'لا مثنّى ولا تأنيث في الجمع',
          bodyAr:
            'العربية تفرّق بين المفرد والمثنّى والجمع، وبين المذكّر والمؤنّث في «هم / هنّ» و«أنتم / أنتنّ». الألمانية أبسط هنا: [[wir]] لاثنين أو أكثر، و[[sie]] لاثنين أو أكثر، ولا تمييز بين المذكّر والمؤنّث في الجمع، ولا في [[du]] و[[ihr]].',
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'alert',
          titleAr: 'كلمة sie بثلاثة معانٍ',
          bodyAr:
            '[[sie]] = هي (مفرد)، و[[sie]] = هم (جمع)، و[[Sie]] = حضرتك (رسمي). الأشكال الثلاثة تُنطق بالطريقة نفسها، ونفرّق بينها بالحرف الأول ونهاية الفعل والسياق — قسمٌ كامل لذلك بعد قليل.',
        },
        {
          kind: 'examples',
          titleAr: 'صيغ الجمع في جمل',
          tone: 'plum',
          items: [
            { badge: 'wir', de: '**Wir** sind Studenten.', ar: 'نحن طلاب.' },
            { badge: 'wir', de: '**Wir** wohnen in Hamburg.', ar: 'نحن نسكن في هامبورغ.' },
            { badge: 'ihr', de: '**Ihr** wohnt in München.', ar: 'أنتم تسكنون في ميونخ.' },
            { badge: 'sie', de: '**Sie** spielen Fußball.', ar: 'هم يلعبون كرة القدم.' },
            { badge: 'du', de: 'Ich bin Leyla, und **du**?', ar: 'أنا ليلى، وأنتَ؟' },
            { badge: 'ich · du → wir', de: 'Du und ich, **wir** sind Freunde.', ar: 'أنتَ وأنا، نحن صديقان.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: طابق الضمير بمعناه',
          descriptionAr: 'ابدأ بالمطابقة ثم رتّب جملتين.',
          exercises: [
            {
              id: 'gr01-p1-match',
              type: 'matching',
              level: 'A1',
              promptAr: 'طابق كل ضمير ألماني مع معناه',
              pairs: [
                { de: 'ich', ar: 'أنا' },
                { de: 'wir', ar: 'نحن' },
                { de: 'du', ar: 'أنتَ (صديق واحد)' },
                { de: 'ihr', ar: 'أنتم (عدّة أصدقاء)' },
                { de: 'er', ar: 'هو' },
                { de: 'Sie', ar: 'حضرتك (رسمي)' },
              ],
              explanationAr: 'تذكّر: [[du]] لشخص واحد مألوف، و[[ihr]] لعدّة أشخاص مألوفين، و[[Sie]] للصيغة الرسمية.',
            },
            {
              id: 'gr01-p1-order1',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات لتكوّن جملة صحيحة',
              words: ['wohne', 'Ich', 'in', 'Berlin'],
              correctOrder: [1, 0, 2, 3],
              explanationAr: 'الفاعل [[Ich]] أولاً ثم الفعل [[wohne]] — الفعل يأتي في الموضع الثاني.',
            },
            {
              id: 'gr01-p1-order2',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات لتكوّن جملة صحيحة',
              words: ['lernen', 'Deutsch', 'Wir'],
              correctOrder: [2, 0, 1],
              explanationAr: 'مع [[wir]] يبقى الفعل بصيغة المصدر: [[lernen]].',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: 'du-ihr-sie',
      navLabelAr: 'du · ihr · Sie',
      kickerDe: 'Du oder Sie?',
      titleAr: 'du أم ihr أم Sie؟',
      titleDe: 'Anrede',
      tone: 'highlight',
      introAr:
        'الألمانية لا تفرّق في «أنت» بين المذكّر والمؤنّث، لكنها تفرّق بين **المألوف** و**الرسمي**. اختيار الصيغة الخاطئة قد يبدو وقحاً أو متكلّفاً، لذلك هذا أهمّ قسم عملياً في الدرس.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'متى أستخدم أيّ صيغة؟',
          columns: [
            { header: 'الموقف', lang: 'ar' },
            { header: 'الضمير', lang: 'de', tone: 'highlight' },
            { header: 'مثال', lang: 'de' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['صديق واحد، فرد من العائلة، طفل', 'du', 'Wie heißt du?', 'ما اسمك؟'],
            ['عدّة أصدقاء أو أفراد من العائلة أو أطفال', 'ihr', 'Wie heißt ihr?', 'ما اسمكم؟'],
            ['شخص غريب، موظف، مدير، زبون (واحد أو أكثر)', 'Sie', 'Wie heißen Sie?', 'ما اسم حضرتك؟'],
          ],
        },
        {
          kind: 'compare',
          titleAr: 'جرّب بنفسك: نفس السؤال بثلاث صيغ',
          modes: [
            {
              labelAr: 'du — مألوف',
              captionAr: 'تسأل صديقاً واحداً. مع [[du]] ينتهي الفعل بـ [[-st]].',
              parts: [
                { text: 'Woher' },
                { text: 'kommst', tone: 'accent' },
                { text: 'du', tone: 'highlight' },
                { text: '?' },
              ],
            },
            {
              labelAr: 'ihr — مألوف (جمع)',
              captionAr: 'تسأل عدّة أصدقاء. مع [[ihr]] ينتهي الفعل هنا بـ [[-t]].',
              parts: [
                { text: 'Woher' },
                { text: 'kommt', tone: 'accent' },
                { text: 'ihr', tone: 'highlight' },
                { text: '?' },
              ],
            },
            {
              labelAr: 'Sie — رسمي',
              captionAr: 'تسأل شخصاً غريباً. [[Sie]] رسمي ويأخذ صيغة الفعل نفسها التي مع [[wir]] و[[sie]] (هم): [[kommen]].',
              parts: [
                { text: 'Woher' },
                { text: 'kommen', tone: 'accent' },
                { text: 'Sie', tone: 'highlight' },
                { text: '?' },
              ],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'alert',
          titleAr: 'Sie تُكتب دائماً بحرف S كبير',
          bodyAr:
            'الصيغة الرسمية تُكتب بحرف **S كبير** حتى في وسط الجملة: [[Woher kommen Sie?]] أمّا [[sie]] بمعنى «هي» أو «هم» فتُكتب بحرف صغير في وسط الجملة. وتنطبق القاعدة نفسها على مشتقّات الصيغة الرسمية مثل [[Ihr]] (ملكية) و[[Ihnen]].',
        },
        {
          kind: 'examples',
          titleAr: 'المألوف مقابل الرسمي في جمل يومية',
          tone: 'highlight',
          items: [
            { badge: 'du', de: 'Wo wohnst **du**?', ar: 'أين تسكن؟ (لصديق)' },
            { badge: 'Sie', de: 'Wo wohnen **Sie**?', ar: 'أين تسكن حضرتك؟ (رسمي)' },
            { badge: 'du', de: 'Hast **du** Zeit?', ar: 'هل لديك وقت؟ (لصديق)' },
            { badge: 'Sie', de: 'Haben **Sie** Zeit?', ar: 'هل لدى حضرتك وقت؟ (رسمي)' },
            { badge: 'du', de: 'Bist **du** müde?', ar: 'هل أنتَ متعب؟' },
            { badge: 'Sie', de: 'Sind **Sie** Frau Braun?', ar: 'هل حضرتك السيدة براون؟' },
            { badge: 'ihr', de: 'Seid **ihr** Brüder?', ar: 'هل أنتما / أنتم إخوة؟' },
            { badge: 'ihr', de: 'Kommt **ihr** aus Ägypten?', ar: 'هل أنتم من مصر؟' },
            { badge: 'ihr', de: 'Was macht **ihr** heute?', ar: 'ماذا تفعلون اليوم؟' },
          ],
        },
        {
          kind: 'details',
          summaryAr: 'متى أنتقل من Sie إلى du؟',
          paragraphsAr: [
            'العُرف أن الأكبر سنّاً أو الأعلى مركزاً هو من يعرض الانتقال إلى [[du]]. فإذا بدأ محدّثك بـ [[du]] معك فأنت تستطيع الردّ بالمثل. وإن لم تكن متأكداً فابدأ بـ [[Sie]] — الخطأ في اتجاه الاحترام أسلم.',
            'في بعض البيئات يشيع [[du]] بين الجميع، مثل الطلّاب والأندية الرياضية والمجموعات الشبابية. ملاحظة الآخرين حولك هي أفضل دليل.',
            'ستتعلّم لاحقاً في الخارطة كيف تعرض الانتقال إلى [[du]] أو تقبله بعبارات جاهزة؛ في هذه المرحلة يكفي أن تفهم الفكرة.',
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: اختر الصيغة المناسبة للموقف',
          exercises: [
            {
              id: 'gr01-p2-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'تتحدّث مع مديرة البنك لأول مرة وتريد أن تسأل عن اسمها. أيّ جملة تختار؟',
              questionDe: '',
              options: ['Wie heißt du?', 'Wie heißen Sie?', 'Wie heißt ihr?', 'Wie heiße ich?'],
              correctIndex: 1,
              explanationAr: 'موقف رسمي مع شخص غريب: [[Sie]] مع الفعل بصيغة [[heißen]].',
            },
            {
              id: 'gr01-p2-mc2',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'تسأل ثلاثة من أصدقائك عن بلدهم. أيّ جملة تختار؟',
              questionDe: '',
              options: ['Woher kommst du?', 'Woher kommen Sie?', 'Woher kommt ihr?', 'Woher komme ich?'],
              correctIndex: 2,
              explanationAr: 'عدّة أصدقاء = [[ihr]]، والفعل ينتهي بـ [[-t]]: [[kommt]].',
            },
            {
              id: 'gr01-p2-mc3',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'تتحدّث مع طفل عمره ستّ سنوات. أيّ جملة تختار؟',
              questionDe: '',
              options: ['Sind Sie müde?', 'Seid ihr müde?', 'Ist er müde?', 'Bist du müde?'],
              correctIndex: 3,
              explanationAr: 'الطفل الواحد يُخاطَب بـ [[du]]: [[Bist du müde?]]',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: 'er-sie-es',
      navLabelAr: 'er · sie · es',
      kickerDe: 'Das grammatische Geschlecht',
      titleAr: 'er / sie / es: الجنس النحوي',
      titleDe: 'der · die · das',
      tone: 'plum',
      introAr:
        'هنا أكبر فخّ لمتحدّثي العربية: نميل إلى اختيار الضمير حسب جنس الكلمة في العربية. لكن الضمير الألماني يتبع **جنس الاسم الألماني** ([[der]] / [[die]] / [[das]]) — حتى للأشياء.',
      blocks: [
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'مذكّر — der',
              subAr: 'الضمير: er',
              formula: 'der Tisch → er',
              tone: 'der',
              items: [
                { de: 'der Mann', ar: '→ **er** · الرجل' },
                { de: 'der Tisch', ar: '→ **er** · الطاولة (مؤنّثة بالعربية!)' },
                { de: 'der Stuhl', ar: '→ **er** · الكرسي' },
                { de: 'der Computer', ar: '→ **er** · الحاسوب' },
              ],
            },
            {
              titleAr: 'مؤنّث — die',
              subAr: 'الضمير: sie',
              formula: 'die Tür → sie',
              tone: 'die',
              items: [
                { de: 'die Frau', ar: '→ **sie** · المرأة' },
                { de: 'die Tür', ar: '→ **sie** · الباب (مذكّر بالعربية!)' },
                { de: 'die Lampe', ar: '→ **sie** · المصباح (مذكّر بالعربية!)' },
                { de: 'die Tasche', ar: '→ **sie** · الحقيبة' },
              ],
            },
            {
              titleAr: 'محايد — das',
              subAr: 'الضمير: es',
              formula: 'das Auto → es',
              tone: 'das',
              items: [
                { de: 'das Kind', ar: '→ **es** · الطفل' },
                { de: 'das Buch', ar: '→ **es** · الكتاب' },
                { de: 'das Auto', ar: '→ **es** · السيارة (مؤنّثة بالعربية!)' },
                { de: 'das Fenster', ar: '→ **es** · النافذة (مؤنّثة بالعربية!)' },
              ],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'compass',
          titleAr: 'لا تقس على العربية',
          bodyAr:
            'العربية ليس فيها «محايد»، وجنس الكلمة فيها قد يختلف عن الألمانية: [[der Tisch]] مذكّر لكن «الطاولة» مؤنّثة، و[[die Tür]] مؤنّثة لكن «الباب» مذكّر، و[[das Auto]] محايد لكن «السيارة» مؤنّثة. لذلك **تعلّم كل اسم مع أداته** ([[der]] / [[die]] / [[das]]) ودع الضمير يتبعها.',
        },
        {
          kind: 'ruleBox',
          tone: 'success',
          icon: 'check',
          titleAr: 'في الجمع: sie دائماً',
          bodyAr:
            'أيّاً كان جنس الاسم في المفرد، فإذا صار جمعاً فضميره [[sie]]: [[die Kinder]] → [[sie]]، [[die Bücher]] → [[sie]]، [[die Tische]] → [[sie]].',
        },
        {
          kind: 'examples',
          titleAr: 'الاسم ثم الضمير الذي ينوب عنه',
          tone: 'plum',
          items: [
            {
              badge: 'der → er',
              de: 'Der Tisch ist groß. **Er** ist braun.',
              ar: 'الطاولة كبيرة. لونها بنّي.',
              noteAr: 'الضمير [[er]] رغم أن «الطاولة» مؤنّثة بالعربية.',
            },
            {
              badge: 'die → sie',
              de: 'Die Tür ist offen. **Sie** ist neu.',
              ar: 'الباب مفتوح. إنه جديد.',
              noteAr: 'الضمير [[sie]] رغم أن «الباب» مذكّر بالعربية.',
            },
            { badge: 'das → es', de: 'Das Auto ist schnell. **Es** ist rot.', ar: 'السيارة سريعة. لونها أحمر.' },
            { badge: 'der → er', de: 'Der Lehrer ist nett. **Er** kommt aus Bonn.', ar: 'المعلّم لطيف. هو من بون.' },
            { badge: 'die → sie', de: 'Die Lehrerin ist nett. **Sie** kommt aus Wien.', ar: 'المعلّمة لطيفة. هي من فيينا.' },
            { badge: 'das → es', de: 'Das Kind ist müde. **Es** schläft.', ar: 'الطفل متعب. إنه ينام.' },
            { badge: 'die → sie', de: 'Die Lampe ist neu. **Sie** ist schön.', ar: 'المصباح جديد. إنه جميل.' },
            { badge: 'das → es', de: 'Das Buch ist interessant. **Es** ist teuer.', ar: 'الكتاب مثير للاهتمام. إنه غالٍ.' },
            { badge: 'Plural → sie', de: 'Die Bücher sind alt. **Sie** sind interessant.', ar: 'الكتب قديمة. إنها مثيرة للاهتمام.' },
            { badge: 'der → er', de: 'Der Kaffee ist heiß. **Er** schmeckt gut.', ar: 'القهوة ساخنة. طعمها جيّد.' },
            { badge: 'die → sie', de: 'Die Tasche ist schwer. **Sie** ist rot.', ar: 'الحقيبة ثقيلة. لونها أحمر.' },
            { badge: 'das → es', de: 'Das Mädchen ist klug. **Es** liest viel.', ar: 'الفتاة ذكية. إنها تقرأ كثيراً.' },
          ],
        },
        {
          kind: 'details',
          summaryAr: 'وماذا عن das Mädchen — أليست فتاة؟',
          paragraphsAr: [
            'من حيث القاعدة النحوية [[das Mädchen]] محايدة بسبب اللاحقة [[-chen]]، لذلك الضمير الأساسي هو [[es]]. قد تسمع في الكلام اليومي [[sie]] للإشارة إلى الفتاة، خاصةً حين يبتعد الضمير عن الاسم، لكن في المستوى A1 التزم بالقاعدة: [[es]].',
          ],
        },
        {
          kind: 'details',
          summaryAr: 'كيف أعرف جنس الاسم؟',
          paragraphsAr: [
            'لا توجد قاعدة تغطي كل الأسماء، ولذلك يتعلّم الدارسون كل اسم **مع أداته** من البداية. هناك بعض الإرشادات التقريبية التي نشرحها في درس أدوات التعريف والتنكير ([[Artikel]]، الدرس ٠٧) — ولا تُبنَ عليها بثقة تامة.',
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أيّ ضمير ينوب عن الاسم؟',
          descriptionAr: 'اكتب الضمير المناسب في الفراغ. لا يهمّ حجم الحرف.',
          exercises: [
            {
              id: 'gr01-p3-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'اكتب الضمير المناسب',
              sentenceDe: 'Der Computer ist neu. ___ ist schnell.',
              acceptedAnswers: ['Er', 'er'],
              hint: 'der Computer — مذكّر',
              explanationAr: '[[der Computer]] مذكّر، فضميره [[er]].',
            },
            {
              id: 'gr01-p3-fill2',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'اكتب الضمير المناسب',
              sentenceDe: 'Die Uhr ist teuer. ___ ist neu.',
              acceptedAnswers: ['Sie', 'sie'],
              hint: 'die Uhr — مؤنّث',
              explanationAr: '[[die Uhr]] مؤنّث، فضميرها [[sie]].',
            },
            {
              id: 'gr01-p3-fill3',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'اكتب الضمير المناسب',
              sentenceDe: 'Das Fenster ist groß. ___ ist offen.',
              acceptedAnswers: ['Es', 'es'],
              hint: 'das Fenster — محايد',
              explanationAr: '[[das Fenster]] محايد، فضميره [[es]].',
            },
            {
              id: 'gr01-p3-fill4',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'اكتب الضمير المناسب',
              sentenceDe: 'Die Kinder sind müde. ___ schlafen.',
              acceptedAnswers: ['Sie', 'sie'],
              hint: 'جمع',
              explanationAr: 'الجمع بأي جنس يأخذ [[sie]]، والفعل بصيغة [[schlafen]].',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: 'es-special',
      navLabelAr: 'es الشكلي',
      kickerDe: 'Das Wörtchen „es“',
      titleAr: 'es: ليس دائماً «هو»',
      titleDe: 'es',
      tone: 'highlight',
      introAr:
        'لـ [[es]] استخدام آخر لا مقابل مباشر له في العربية: **فاعل شكلي** لا يشير إلى شيء محدّد، نستعمله في الطقس والوقت وبعض العبارات الثابتة. وهو **إلزامي** — لا تُبنى الجملة بدونه.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الاستخدامات الأساسية لـ es الشكلي',
          columns: [
            { header: 'الاستخدام', lang: 'ar' },
            { header: 'مثال', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['الطقس', 'Es regnet.', 'إنها تمطر.'],
            ['الطقس', 'Es schneit.', 'إنها تثلج.'],
            ['درجة الحرارة', 'Es ist kalt.', 'الجوّ بارد.'],
            ['الساعة', 'Wie spät ist es?', 'كم الساعة؟'],
            ['الساعة', 'Es ist acht Uhr.', 'الساعة الثامنة.'],
            ['الوجود (عبارة ثابتة)', 'Es gibt hier ein Café.', 'يوجد هنا مقهى.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'لا تحذف es',
          bodyAr:
            'في العربية يكفي «تمطر» لأن الضمير مستتر. في الألمانية الجملة تحتاج فاعلاً ظاهراً دائماً، فتقول [[Es regnet]] وليس [[Regnet]]. ولا تستبدل [[es]] بـ [[er]] أو [[sie]] هنا: الطقس ليس «هو» ولا «هي».',
        },
        {
          kind: 'examples',
          titleAr: 'es في الحياة اليومية',
          tone: 'highlight',
          items: [
            { badge: 'Wetter', de: '**Es** regnet heute.', ar: 'تمطر اليوم.' },
            { badge: 'Wetter', de: '**Es** ist heute sehr heiß.', ar: 'الجوّ حارّ جداً اليوم.' },
            { badge: 'Wetter', de: '**Es** schneit im Winter.', ar: 'تثلج في الشتاء.' },
            { badge: 'Uhrzeit', de: 'Wie spät ist **es**?', ar: 'كم الساعة؟' },
            {
              badge: 'Uhrzeit',
              de: '**Es** ist halb drei.',
              ar: 'الساعة الثانية والنصف.',
              noteAr: 'انتبه: [[halb drei]] = 2:30 وليس 3:30 (نصف الساعة في اتجاه الثالثة).',
            },
            { badge: 'es gibt', de: '**Es** gibt hier ein Café.', ar: 'يوجد هنا مقهى.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: 'sie-decoder',
      navLabelAr: 'sie أم Sie',
      kickerDe: 'sie · sie · Sie',
      titleAr: 'sie أم Sie؟ كيف تعرف',
      titleDe: 'sie / Sie',
      tone: 'accent',
      introAr:
        'ثلاث كلمات تُنطق بالطريقة نفسها: [[sie]] (هي)، [[sie]] (هم)، [[Sie]] (حضرتك). المفاتيح الثلاثة لحلّ اللغز: **الحرف الأول**، **نهاية الفعل**، **السياق**.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'فكّ الشيفرة',
          columns: [
            { header: 'الجملة', lang: 'de', tone: 'accent' },
            { header: 'من المقصود؟', lang: 'ar' },
            { header: 'كيف عرفنا؟', lang: 'ar' },
          ],
          rows: [
            ['Sie kommt aus Spanien.', 'هي (مفرد)', 'الفعل [[kommt]] بنهاية -t للمفرد الغائب.'],
            [
              'Sie kommen aus Spanien.',
              'هم — أو حضراتكم (رسمي)',
              'الفعل [[kommen]] جمع. في بداية الجملة لا يفرّق الحرف الكبير، فيحسم السياق.',
            ],
            ['Woher kommen Sie?', 'حضرتك / حضراتكم', 'حرف S كبير في وسط الجملة.'],
            ['Woher kommen sie?', 'هم', 'حرف s صغير في وسط الجملة.'],
            ['Kommt sie aus Spanien?', 'هي', 'الفعل [[kommt]] مفرد.'],
            ['Sind Sie Lehrer?', 'حضرتك', 'حرف S كبير.'],
            ['Sind sie Lehrer?', 'هم', 'حرف s صغير.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'في الكلام المنطوق لا فرق في النطق',
          bodyAr:
            'الفرق بين [[sie]] و[[Sie]] مكتوب فقط. في المحادثة يفهم المستمع المقصود من السياق ومن نهاية الفعل، فإن التبس الأمر يمكنه أن يسأل.',
        },
        {
          kind: 'examples',
          titleAr: 'السياق يحسم المعنى',
          tone: 'accent',
          items: [
            { badge: 'sie · هي', de: 'Das ist Frau Braun. **Sie** ist Ärztin.', ar: 'هذه السيدة براون. هي طبيبة.' },
            {
              badge: 'sie · هم',
              de: 'Das sind Anna und Tom. **Sie** sind Geschwister.',
              ar: 'هذان آنا وتوم. هما شقيقان.',
            },
            { badge: 'Sie · حضرتك', de: 'Guten Tag, Herr Weber. Sind **Sie** neu hier?', ar: 'مرحباً سيد فيبر. هل حضرتك جديد هنا؟' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: صح أم خطأ؟',
          exercises: [
            {
              id: 'gr01-p4-tf1',
              type: 'true-false',
              level: 'A1',
              promptAr: 'تخاطب موظف استقبال غريباً. هل هذه الجملة مناسبة؟',
              statementDe: 'Wie heißen Sie?',
              isTrue: true,
              explanationAr: 'صحيحة: موقف رسمي فنستخدم [[Sie]] مع [[heißen]].',
            },
            {
              id: 'gr01-p4-tf2',
              type: 'true-false',
              level: 'A1',
              promptAr: 'تخاطب صديقك المقرّب. هل هذه الجملة مناسبة؟',
              statementDe: 'Wo wohnen Sie?',
              isTrue: false,
              explanationAr: 'غير مناسبة: [[Sie]] رسمية وتبدو متكلّفة مع صديق مقرّب. الأنسب [[Wo wohnst du?]]',
            },
            {
              id: 'gr01-p4-tf3',
              type: 'true-false',
              level: 'A1',
              promptAr: 'هل الجملة التالية صحيحة نحوياً؟',
              statementDe: 'Der Tisch ist groß. Sie ist braun.',
              isTrue: false,
              explanationAr: '[[der Tisch]] مذكّر، فالضمير [[er]]: [[Er ist braun.]]',
            },
            {
              id: 'gr01-p4-tf4',
              type: 'true-false',
              level: 'A1',
              promptAr: 'هل الجملة التالية صحيحة؟',
              statementDe: 'Es regnet heute.',
              isTrue: true,
              explanationAr: 'صحيحة: [[es]] فاعل شكلي إلزامي مع أفعال الطقس.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: 'combining',
      navLabelAr: 'دمج الفاعلين',
      kickerDe: 'Mehrere Personen',
      titleAr: 'حين يجتمع أكثر من شخص',
      titleDe: 'wir · ihr · sie',
      tone: 'success',
      introAr:
        'عندما تجمع شخصين أو أكثر في فاعل واحد يتحدّد الضمير الجامع بمن هو موجود في المجموعة، وليس بترتيب الأسماء.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الفاعل المركّب والضمير الذي ينوب عنه',
          columns: [
            { header: 'الفاعل', lang: 'de' },
            { header: 'يصبح', lang: 'de', tone: 'success' },
            { header: 'مثال', lang: 'de' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['Karim und ich', 'wir', 'Karim und ich wohnen in Köln.', 'كريم وأنا نسكن في كولن.'],
            ['Du und ich', 'wir', 'Du und ich sind Freunde.', 'أنتَ وأنا صديقان.'],
            ['Lina und du', 'ihr', 'Lina und du seid pünktlich.', 'لينا وأنتَ في الموعد.'],
            ['Karim und Lina', 'sie', 'Karim und Lina sind Kollegen.', 'كريم ولينا زميلان.'],
            ['der Tisch und der Stuhl', 'sie', 'Der Tisch und der Stuhl sind neu.', 'الطاولة والكرسي جديدان.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'success',
          icon: 'check',
          titleAr: 'من يفوز؟ ich ثم du ثم الباقون',
          bodyAr:
            'إن كنتَ **أنت المتكلّم** ضمن المجموعة فالضمير [[wir]]. وإن لم تكن، وكان **المخاطَب** ضمنها فالضمير [[ihr]]. وإن كانت المجموعة كلّها **غائبة** فالضمير [[sie]].',
        },
        {
          kind: 'details',
          summaryAr: 'هل أقول Karim und ich أم Ich und Karim؟',
          paragraphsAr: [
            'الأكثر لباقةً أن تذكر الآخر أولاً ثم نفسك: [[Karim und ich]]. هذا عُرف أسلوبي وليس قاعدة نحوية صارمة، لكنه الشائع في الكتابة والكلام المهذّب.',
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: ترجم جملة',
          exercises: [
            {
              id: 'gr01-p5-tr1',
              type: 'translation',
              level: 'A1',
              promptAr: 'ترجم إلى الألمانية',
              direction: 'ar-to-de',
              sourceText: 'كريم وأنا نسكن في كولن.',
              acceptedAnswers: ['Karim und ich wohnen in Köln.', 'Karim und ich wohnen in Koeln.'],
              explanationAr: '[[Karim und ich]] = [[wir]]، لذلك الفعل بصيغة [[wohnen]].',
            },
            {
              id: 'gr01-p5-tr2',
              type: 'translation',
              level: 'A1',
              promptAr: 'ترجم إلى الألمانية (الكلمات: der Tisch، groß، braun)',
              direction: 'ar-to-de',
              sourceText: 'الطاولة كبيرة. لونها بنّي.',
              acceptedAnswers: ['Der Tisch ist groß. Er ist braun.', 'Der Tisch ist gross. Er ist braun.'],
              explanationAr: 'الضمير [[er]] لأن [[der Tisch]] مذكّر.',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: 'verb-link',
      navLabelAr: 'الضمير والفعل',
      kickerDe: 'Pronomen und Verb',
      titleAr: 'الضمير يحدّد نهاية الفعل',
      titleDe: 'Verb + Pronomen',
      tone: 'accent',
      introAr:
        'الفعل الألماني يتغيّر حسب الضمير. لا تقلق من التفاصيل الآن — التصريف الكامل في الدرسين ٠٢ ([[sein / haben]]) و٠٣ ([[Präsens]]). المهم هنا أن تلاحظ لماذا **الضمير ضروري**: لأنه يكشف من يقوم بالفعل.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'معاينة: فعل منتظم (wohnen) وفعل شاذّ (sein)',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'wohnen · يسكن', lang: 'de', tone: 'accent' },
            { header: 'sein · يكون', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['ich', 'wohne', 'bin'],
            ['du', 'wohnst', 'bist'],
            ['er, sie, es', 'wohnt', 'ist'],
            ['wir', 'wohnen', 'sind'],
            ['ihr', 'wohnt', 'seid'],
            ['sie', 'wohnen', 'sind'],
            ['Sie', 'wohnen', 'sind'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'ملاحظتان تسهّلان الحفظ',
          bodyAr:
            '**١)** مع [[wir]] و[[sie]] (هم) و[[Sie]] يأتي الفعل بصيغة المصدر ([[wohnen]])، والاستثناء الوحيد هو [[sein]] → [[sind]]. **٢)** الضمائر [[er]] و[[sie]] (هي) و[[es]] تأخذ دائماً صيغة الفعل نفسها.',
        },
        {
          kind: 'examples',
          titleAr: 'الفعل يتبع الضمير',
          tone: 'accent',
          items: [
            { badge: 'ich', de: '**Ich** wohne in Kairo.', ar: 'أسكن في القاهرة.' },
            { badge: 'du', de: '**Du** wohnst in Berlin.', ar: 'أنتَ تسكن في برلين.' },
            { badge: 'er', de: '**Er** wohnt in Wien.', ar: 'هو يسكن في فيينا.' },
            { badge: 'wir', de: '**Wir** wohnen in Hamburg.', ar: 'نحن نسكن في هامبورغ.' },
            { badge: 'ihr', de: '**Ihr** wohnt in München.', ar: 'أنتم تسكنون في ميونخ.' },
            { badge: 'sie', de: '**Sie** wohnen in Dresden.', ar: 'هم يسكنون في دريسدن.' },
            { badge: 'ich · sein', de: '**Ich** bin müde.', ar: 'أنا متعب.' },
            { badge: 'wir · sein', de: '**Wir** sind müde.', ar: 'نحن متعبون.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: 'mistakes',
      navLabelAr: 'أخطاء شائعة',
      kickerDe: 'Typische Fehler',
      titleAr: 'أخطاء يقع فيها متحدّثو العربية',
      titleDe: 'Fehler',
      tone: 'error',
      introAr:
        'أغلب الأخطاء هنا ناتجة عن نقل عادات العربية إلى الألمانية: حذف الفاعل، واختيار الضمير حسب جنس الكلمة العربية، والخلط بين المألوف والرسمي.',
      blocks: [
        {
          kind: 'mistakes',
          titleAr: 'قبل وبعد',
          items: [
            {
              wrong: 'Der Tisch ist groß. Sie ist braun.',
              correct: 'Der Tisch ist groß. Er ist braun.',
              explanationAr: 'الضمير يتبع جنس الاسم الألماني ([[der]] = [[er]]) وليس جنس «الطاولة» بالعربية.',
            },
            {
              wrong: 'Das Auto ist neu. Sie ist schnell.',
              correct: 'Das Auto ist neu. Es ist schnell.',
              explanationAr: '«السيارة» مؤنّثة بالعربية، لكن [[das Auto]] محايد فضميره [[es]].',
            },
            {
              wrong: 'Wohne in Berlin.',
              correct: 'Ich wohne in Berlin.',
              explanationAr: 'الفاعل يجب أن يظهر في الجملة الخبرية؛ لا ضمير مستتراً في الألمانية.',
            },
            {
              wrong: 'Du kommen aus Syrien.',
              correct: 'Du kommst aus Syrien.',
              explanationAr: 'مع [[du]] ينتهي الفعل بـ [[-st]]. التفاصيل في درس المضارع ([[Präsens]]).',
            },
            {
              wrong: 'Ihr bist müde.',
              correct: 'Ihr seid müde.',
              explanationAr: 'تصريف [[sein]] مع [[ihr]] هو [[seid]].',
            },
            {
              wrong: 'Woher kommst Sie?',
              correct: 'Woher kommen Sie?',
              explanationAr: '[[Sie]] الرسمية تأخذ صيغة الجمع من الفعل: [[kommen]].',
            },
            {
              wrong: 'Guten Tag, Herr Weber. Wie heißt du?',
              correct: 'Guten Tag, Herr Weber. Wie heißen Sie?',
              explanationAr: 'مع شخص غريب أو رسمي نستخدم [[Sie]]. استخدام [[du]] هنا يبدو غير مهذّب.',
            },
            {
              wrong: 'Wie heißen sie? (وأنت تقصد شخصاً رسمياً)',
              correct: 'Wie heißen Sie?',
              explanationAr: '[[sie]] بحرف صغير تعني «هم». للصيغة الرسمية اكتب [[Sie]] بحرف كبير.',
            },
            {
              wrong: 'Regnet heute.',
              correct: 'Es regnet heute.',
              explanationAr: 'فعل الطقس يحتاج فاعلاً شكلياً هو [[es]].',
            },
            {
              wrong: 'Er ist kalt. (وتقصد الطقس)',
              correct: 'Es ist kalt.',
              explanationAr: 'للطقس نستخدم [[es]] وليس [[er]]. أمّا [[Er ist kalt]] فجملة عن شخص أو شيء مذكّر، وليست عن الجوّ.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    {
      frontDe: 'Sie (mit großem S)',
      hintAr: 'متى أستعملها؟',
      backAr: 'الصيغة الرسمية: حضرتك / حضراتكم. للغرباء والمواقف الرسمية، والفعل بصيغة الجمع.',
      exampleDe: 'Woher kommen **Sie**?',
    },
    {
      frontDe: 'ihr',
      hintAr: 'مع من؟',
      backAr: 'أنتم — لعدّة أصدقاء أو أفراد عائلة أو أطفال. الفعل ينتهي غالباً بـ -t.',
      exampleDe: 'Woher kommt **ihr**?',
    },
    {
      frontDe: 'der Tisch → ?',
      hintAr: 'أيّ ضمير؟',
      backAr: 'er — الضمير يتبع جنس الاسم الألماني (der = مذكّر) وليس معناه بالعربية.',
      exampleDe: 'Der Tisch ist groß. **Er** ist braun.',
    },
    {
      frontDe: 'die Tür → ?',
      hintAr: 'أيّ ضمير؟',
      backAr: 'sie — رغم أن «الباب» مذكّر بالعربية.',
      exampleDe: 'Die Tür ist offen. **Sie** ist neu.',
    },
    {
      frontDe: 'das Auto → ?',
      hintAr: 'أيّ ضمير؟',
      backAr: 'es — الاسم المحايد لا مقابل له في العربية.',
      exampleDe: 'Das Auto ist schnell. **Es** ist rot.',
    },
    {
      frontDe: 'Es regnet.',
      hintAr: 'ما وظيفة es هنا؟',
      backAr: 'فاعل شكلي في الطقس والوقت. إلزامي ولا يُحذف.',
      exampleDe: '**Es** ist heute sehr kalt.',
    },
    {
      frontDe: 'sie kommt / sie kommen',
      hintAr: 'فرّق بين المعنيين',
      backAr: 'kommt = هي (مفرد). kommen = هم (أو Sie الرسمية، بحسب السياق).',
      exampleDe: '**Sie** kommt aus Spanien.',
    },
    {
      frontDe: 'Karim und ich → ?',
      hintAr: 'أيّ ضمير؟',
      backAr: 'wir — لأنك أنت المتكلّم ضمن المجموعة.',
      exampleDe: 'Karim und ich wohnen in Köln.',
    },
    {
      frontDe: 'Lina und du → ?',
      hintAr: 'أيّ ضمير؟',
      backAr: 'ihr — المخاطَب ضمن المجموعة ولا يوجد متكلّم.',
      exampleDe: 'Lina und du seid pünktlich.',
    },
    {
      frontDe: 'wir / sie / Sie + الفعل',
      hintAr: 'ما شكل الفعل؟',
      backAr: 'نفس صيغة المصدر (wohnen). الاستثناء الوحيد: sein → sind.',
      exampleDe: '**Wir** wohnen in Hamburg.',
    },
  ],

  quiz: [
    {
      id: 'gr01-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الضمير الصحيح للفراغ (المقصود: نحن)',
      questionDe: '___ lernen Deutsch.',
      options: ['Ich', 'Wir', 'Ihr', 'Er'],
      correctIndex: 1,
      explanationAr: '[[wir]] = نحن، والفعل [[lernen]] بصيغة المصدر.',
    },
    {
      id: 'gr01-q2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ ضمير ينوب عن «das Buch»؟',
      questionDe: 'Das Buch ist alt. ___ ist interessant.',
      options: ['Er', 'Sie', 'Es', 'Wir'],
      correctIndex: 2,
      explanationAr: '[[das Buch]] محايد، فضميره [[es]].',
    },
    {
      id: 'gr01-q3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ ضمير ينوب عن «die Tür»؟',
      questionDe: 'Die Tür ist neu. ___ ist offen.',
      options: ['Es', 'Er', 'Sie', 'Ihr'],
      correctIndex: 2,
      explanationAr: '[[die Tür]] مؤنّث، فضميرها [[sie]] (رغم أن «الباب» مذكّر بالعربية).',
    },
    {
      id: 'gr01-q4',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ ضمير ينوب عن «der Stuhl»؟',
      questionDe: 'Der Stuhl ist alt. ___ ist braun.',
      options: ['Sie', 'Er', 'Es', 'Ihr'],
      correctIndex: 1,
      explanationAr: '[[der Stuhl]] مذكّر، فضميره [[er]].',
    },
    {
      id: 'gr01-q5',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'اكتب الضمير المناسب للطقس',
      sentenceDe: '___ ist heute sehr kalt.',
      acceptedAnswers: ['Es', 'es'],
      hint: 'فاعل شكلي',
      explanationAr: 'مع الطقس نستخدم [[es]] الشكلي.',
    },
    {
      id: 'gr01-q6',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'تسأل جارك الغريب عن مكان سكنه (بشكل رسمي). أيّ جملة تختار؟',
      questionDe: '',
      options: ['Wo wohnst du?', 'Wo wohnt ihr?', 'Wo wohnen Sie?', 'Wo wohne ich?'],
      correctIndex: 2,
      explanationAr: 'رسمي مع شخص غريب: [[Sie]] مع [[wohnen]].',
    },
    {
      id: 'gr01-q7',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟ (Karim und ich = ihr)',
      statementDe: 'Karim und ich → ihr',
      isTrue: false,
      explanationAr: 'خطأ: أنت المتكلّم ضمن المجموعة، فالضمير [[wir]].',
    },
    {
      id: 'gr01-q8',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات لتكوّن سؤالاً رسمياً',
      words: ['kommen', 'Sie', 'Woher'],
      correctOrder: [2, 0, 1],
      explanationAr: 'كلمة السؤال أولاً، ثم الفعل، ثم الفاعل: [[Woher kommen Sie?]]',
    },
    {
      id: 'gr01-q9',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الاسم مع ضميره',
      pairs: [
        { de: 'der Tisch', ar: 'er (مذكّر)' },
        { de: 'die Tür', ar: 'sie (مؤنّث)' },
        { de: 'das Auto', ar: 'es (محايد)' },
        { de: 'die Kinder', ar: 'sie (جمع)' },
      ],
      explanationAr: 'الضمير يتبع جنس الاسم الألماني، والجمع دائماً [[sie]].',
    },
    {
      id: 'gr01-q10',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية (بصيغة رسمية، الاسم: Herr Weber)',
      direction: 'ar-to-de',
      sourceText: 'هل حضرتك السيد فيبر؟',
      acceptedAnswers: ['Sind Sie Herr Weber?'],
      explanationAr: 'الصيغة الرسمية: [[Sind Sie Herr Weber?]] مع [[Sie]] بحرف كبير.',
    },
  ],

  cheatSheet: [
    { de: 'ich · du · er / sie / es', ar: 'المفرد: أنا · أنتَ (مألوف) · هو / هي / المحايد' },
    { de: 'wir · ihr · sie', ar: 'الجمع: نحن · أنتم (مألوف) · هم' },
    { de: 'Sie', ar: 'رسمي: حضرتك / حضراتكم. دائماً بحرف S كبير، والفعل بصيغة الجمع.' },
    { de: 'der → er · die → sie · das → es', ar: 'ضمير الغائب يتبع جنس الاسم الألماني لا معناه بالعربية.' },
    { de: 'die Kinder → sie', ar: 'الجمع بأي جنس → sie.' },
    { de: 'Es regnet. Es ist kalt.', ar: 'es فاعل شكلي للطقس والوقت — لا يُحذف.' },
    { de: 'Karim und ich → wir', ar: 'أنا ضمن المجموعة → wir. أنتَ بلا أنا → ihr. غيرنا → sie.' },
    { de: 'Ich wohne in Berlin.', ar: 'الفاعل إلزامي في الجملة الخبرية (لا نقول: Wohne in Berlin).' },
  ],
}

export default rule
