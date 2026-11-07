import type { Lesson, Module } from '@/types'

export const lessonZeitangaben: Lesson = {
  id: 'a2-m17-l01',
  slug: 'zeitangaben',
  level: 'A2',
  moduleId: 'a2-m17',
  title: 'Zeitangaben: seit, vor, in, bis, ab',
  titleAr: 'تعبيرات الزمن: seit وvor وin وbis وab',
  estimatedMinutes: 28,
  objectivesAr: [
    'التمييز بين seit (منذ، ما زال مستمراً) وvor (قبل، انتهى) وin (بعد، في المستقبل)',
    'استخدام bis وab وvon … bis لتحديد نهاية الزمن وبدايته',
    'السؤال والجواب: Seit wann؟ Wie lange؟ Bis wann؟ Ab wann؟',
    'كتابة نهاية الاسم الصحيحة بعد seit وvor وin (الحالة Dativ)',
  ],
  explanation: [
    {
      titleAr: 'seit: بدأ في الماضي وما زال مستمراً',
      bodyAr:
        'نستخدم **seit** + Dativ لما بدأ في الماضي ولم ينتهِ بعد، ونستعمل معه **المضارع**: Ich wohne **seit** drei Jahren in Berlin. (أسكن في برلين منذ ثلاث سنوات). لاحظ أن العربية تفعل الشيء نفسه ("أسكن منذ")، بينما الإنجليزية تستعمل الماضي التام. السؤال: **Seit wann** wohnst du in Berlin؟ — Seit drei Jahren.',
    },
    {
      titleAr: 'vor: حدث انتهى منذ مدة',
      bodyAr:
        'نستخدم **vor** + Dativ لحدث وقع وانتهى، ومعه عادةً **الماضي** (Perfekt أو Präteritum): Ich bin **vor** drei Jahren nach Berlin gezogen. (انتقلتُ إلى برلين قبل ثلاث سنوات). القاعدة العملية: إن كان الأمر ما زال مستمراً فهو seit، وإن كان قد انتهى فهو vor.',
    },
    {
      titleAr: 'in: بعد مدة من الآن',
      bodyAr:
        'نستخدم **in** + Dativ للمستقبل القريب: **In** einer Stunde beginnt der Kurs. (بعد ساعة يبدأ الدورة). **In** zwei Wochen habe ich Urlaub. (بعد أسبوعين عندي إجازة). ونتذكّر ما تعلّمناه عن الأشهر: im Mai.',
    },
    {
      titleAr: 'bis وab وvon … bis',
      bodyAr:
        '**bis** (حتى) لنهاية الزمن: Ich arbeite **bis** 17 Uhr. ومع الأيام لا نضع أداة تعريف: **bis** Freitag. أما مع التاريخ فنقول **bis zum** 10. Mai. و**ab** (ابتداءً من) للبداية: **Ab** Montag habe ich Zeit. / **Ab dem** 1. März wohne ich in Köln. وللمدى: Das Geschäft ist **von** Montag **bis** Samstag geöffnet.',
    },
    {
      titleAr: 'Wie lange؟ مدّة بلا أداة',
      bodyAr:
        'نسأل عن المدّة بـ **Wie lange**، ونجيب بالمدة نفسها دون أداة: Wie lange bleibst du in Köln؟ — **Zwei Wochen.** ومع الخطة المسبقة يمكن أن نضيف **für**: Ich bleibe **für** zwei Wochen in Köln. والفعل **dauern** يُستعمل للمدة: Der Kurs **dauert** drei Monate.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-zeitangaben',
      slug: 'zeitangaben',
      level: 'A2',
      titleDe: 'seit, vor, in, bis, ab',
      titleAr: 'أدوات الزمن',
      conceptAr: 'seit للمستمر حتى الآن، وvor للمنتهي في الماضي، وin للمستقبل، وbis وab لنهاية الزمن وبدايته.',
      ruleAr:
        'seit وvor وin وab تأخذ الحالة Dativ، فنضيف -n إلى الجمع: seit drei Jahren، vor zwei Wochen. مع seit نستعمل المضارع لما هو مستمر. أما bis مع اليوم والساعة فلا يحتاج أداة: bis Freitag، bis 17 Uhr.',
      tables: [
        {
          caption: 'أدوات الزمن',
          headers: ['السؤال', 'الأداة', 'المعنى', 'مثال'],
          rows: [
            { label: 'Seit wann?', values: ['seit + Dativ', 'منذ (مستمر)', 'Ich lerne seit einem Jahr Deutsch.'] },
            { label: 'Wann? (قبل)', values: ['vor + Dativ', 'قبل (انتهى)', 'Ich bin vor einem Jahr gekommen.'] },
            { label: 'Wann? (بعد)', values: ['in + Dativ', 'بعد (مستقبل)', 'In einer Woche habe ich Urlaub.'] },
            { label: 'Bis wann?', values: ['bis', 'حتى', 'Ich arbeite bis 17 Uhr.'] },
            { label: 'Ab wann?', values: ['ab + Dativ', 'ابتداءً من', 'Ab Montag habe ich Zeit.'] },
            { label: 'Wie lange?', values: ['(بلا أداة) / für', 'مدّة', 'Ich bleibe zwei Wochen.'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich wohne seit drei Jahren in Berlin.',
          ar: 'أسكن في برلين منذ ثلاث سنوات. (ما زلت أسكن)',
          tokens: [
            { text: 'Ich wohne', role: 'المضارع: الأمر مستمر' },
            { text: 'seit drei Jahren', role: 'seit + Dativ (الجمع بـ -n)' },
            { text: 'in Berlin.', role: 'المكان' },
          ],
        },
        {
          de: 'Ich bin vor drei Jahren nach Berlin gezogen.',
          ar: 'انتقلت إلى برلين قبل ثلاث سنوات. (انتهى الانتقال)',
          tokens: [
            { text: 'Ich bin', role: 'Perfekt: الأمر انتهى' },
            { text: 'vor drei Jahren', role: 'vor + Dativ' },
            { text: 'nach Berlin gezogen.', role: 'الوجهة والفعل' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Seit wann lernst du Deutsch? — Seit einem Jahr.', ar: 'منذ متى تتعلّم الألمانية؟ — منذ سنة.' },
    { de: 'Vor einer Woche war ich noch im Urlaub.', ar: 'قبل أسبوع كنت ما زلت في إجازة.' },
    { de: 'In einer Stunde beginnt der Kurs.', ar: 'بعد ساعة تبدأ الدورة.' },
    { de: 'Ich arbeite bis 17 Uhr.', ar: 'أعمل حتى الساعة الخامسة مساءً.' },
    { de: 'Ab Montag habe ich Urlaub.', ar: 'ابتداءً من الإثنين عندي إجازة.' },
    { de: 'Das Geschäft ist von Montag bis Samstag geöffnet.', ar: 'المتجر مفتوح من الإثنين حتى السبت.' },
    { de: 'Wie lange bleibst du in Köln? — Zwei Wochen.', ar: 'كم ستبقى في كولن؟ — أسبوعين.' },
  ],
  vocabulary: [
    { id: 'voc-zeit-vor', word: 'vor', partOfSpeech: 'preposition', meaningAr: 'قبل (زمنياً)', level: 'A2', category: 'تعبيرات الزمن', example: { de: 'Vor einer Woche war ich im Urlaub.', ar: 'قبل أسبوع كنت في إجازة.' } },
    { id: 'voc-zeit-bis', word: 'bis', partOfSpeech: 'preposition', meaningAr: 'حتى', level: 'A2', category: 'تعبيرات الزمن', example: { de: 'Ich arbeite bis 17 Uhr.', ar: 'أعمل حتى الخامسة مساءً.' } },
    { id: 'voc-zeit-ab', word: 'ab', partOfSpeech: 'preposition', meaningAr: 'ابتداءً من', level: 'A2', category: 'تعبيرات الزمن', example: { de: 'Ab Montag habe ich Zeit.', ar: 'ابتداءً من الإثنين عندي وقت.' } },
    { id: 'voc-zeit-anfang', word: 'Anfang', article: 'der', plural: 'Anfänge', partOfSpeech: 'noun', meaningAr: 'البداية', level: 'A2', category: 'تعبيرات الزمن', example: { de: 'Anfang Mai fahre ich nach Hause.', ar: 'في بداية مايو أسافر إلى البيت.' } },
    { id: 'voc-zeit-ende', word: 'Ende', article: 'das', plural: 'Enden', partOfSpeech: 'noun', meaningAr: 'النهاية', level: 'A2', category: 'تعبيرات الزمن', example: { de: 'Ende Juni fliege ich nach Hause.', ar: 'في نهاية يونيو أسافر بالطائرة إلى البيت.' } },
    { id: 'voc-zeit-dauern', word: 'dauern', partOfSpeech: 'verb', meaningAr: 'يستغرق', level: 'A2', category: 'تعبيرات الزمن', verb: { praeteritum: 'dauerte', partizip: 'gedauert', auxiliary: 'haben' }, example: { de: 'Wie lange dauert der Kurs?', ar: 'كم يستغرق الدورة؟' } },
    { id: 'voc-zeit-schon', word: 'schon', partOfSpeech: 'adverb', meaningAr: 'منذ الآن / بالفعل', level: 'A2', category: 'تعبيرات الزمن', example: { de: 'Wie lange wohnst du schon hier?', ar: 'منذ متى تسكن هنا؟' } },
  ],
  dialogues: [
    {
      id: 'dialogue-zeit-informell',
      level: 'A2',
      moduleId: 'a2-m17',
      lessonId: 'a2-m17-l01',
      titleDe: 'Ein neuer Job',
      titleAr: 'وظيفة جديدة',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Jonas', de: 'Seit wann wohnst du eigentlich in Hamburg?', ar: 'منذ متى تسكنين في هامبورغ في الحقيقة؟' },
        { speaker: 'b', name: 'Mara', de: 'Seit zwei Jahren. Vor zwei Jahren bin ich für die Arbeit umgezogen.', ar: 'منذ سنتين. قبل سنتين انتقلت بسبب العمل.' },
        { speaker: 'a', name: 'Jonas', de: 'Und wann beginnt dein neuer Job?', ar: 'ومتى تبدأ وظيفتك الجديدة؟' },
        { speaker: 'b', name: 'Mara', de: 'Ab dem 1. März. Bis Ende Februar habe ich noch Urlaub.', ar: 'ابتداءً من 1 مارس. وحتى نهاية فبراير ما زالت عندي إجازة.' },
      ],
    },
    {
      id: 'dialogue-zeit-formell',
      level: 'A2',
      moduleId: 'a2-m17',
      lessonId: 'a2-m17-l01',
      titleDe: 'Beim Arzt',
      titleAr: 'عند الطبيب',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Dr. Roth', de: 'Seit wann haben Sie die Schmerzen?', ar: 'منذ متى تشعر بالألم؟' },
        { speaker: 'b', name: 'Herr Aydin', de: 'Seit drei Tagen. Vor einer Woche war ich noch gesund.', ar: 'منذ ثلاثة أيام. قبل أسبوع كنت ما زلت بصحة جيدة.' },
        { speaker: 'a', name: 'Dr. Roth', de: 'Bitte kommen Sie in einer Woche wieder. Bis dahin nehmen Sie die Tabletten.', ar: 'تعال مرة أخرى بعد أسبوع من فضلك. وحتى ذلك الحين تناول الأقراص.' },
        { speaker: 'b', name: 'Herr Aydin', de: 'Danke. Ab wann darf ich wieder arbeiten?', ar: 'شكراً. ابتداءً من متى يُسمح لي بالعمل؟' },
        { speaker: 'a', name: 'Dr. Roth', de: 'Ab Montag, aber nur halbtags.', ar: 'ابتداءً من الإثنين، لكن نصف يوم فقط.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'seit وbis', bodyAr: 'في seit يُنطق ei "آي" وs "ز": "زايت". وفي bis الحرف s في الآخر "س" خفيف: "بِس".', example: 'seit' },
    { titleAr: 'نبرة الجملة التي تبدأ بالزمن', bodyAr: 'حين نبدأ بالزمن (Seit zwei Jahren wohne ich hier) تقع النبرة على الزمن، ثم يأتي الفعل مباشرة في المرتبة الثانية.', example: 'Seit zwei Jahren wohne ich hier.' },
  ],
  exercises: [
    {
      id: 'ex-zeit-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: الشيء مستمر حتى الآن',
      questionDe: 'Ich wohne ___ drei Jahren in Berlin.',
      options: ['seit', 'vor', 'in', 'bis'],
      correctIndex: 0,
      explanationAr: 'أسكن الآن وما زلت: seit + مضارع.',
    },
    {
      id: 'ex-zeit-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: حدث انتهى منذ مدة',
      questionDe: 'Ich bin ___ drei Jahren nach Berlin gezogen.',
      options: ['vor', 'seit', 'bis', 'ab'],
      correctIndex: 0,
      explanationAr: 'الانتقال حدث وانتهى، فنقول vor + Dativ مع الـ Perfekt.',
    },
    {
      id: 'ex-zeit-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: الحدث في المستقبل القريب',
      questionDe: '___ einer Stunde beginnt der Kurs.',
      options: ['In', 'Vor', 'Seit', 'Bis'],
      correctIndex: 0,
      explanationAr: 'بعد ساعة من الآن: in + Dativ.',
    },
    {
      id: 'ex-zeit-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بنهاية الجمع الصحيحة',
      sentenceDe: 'Seit zwei ___ wohne ich hier. (das Jahr)',
      acceptedAnswers: ['Jahren'],
      explanationAr: 'بعد seit نستعمل Dativ، وفي الجمع نضيف -n: seit zwei Jahren.',
    },
    {
      id: 'ex-zeit-5',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل الجملة',
      sentenceDe: 'Ich arbeite ___ 17 Uhr.',
      acceptedAnswers: ['bis'],
      hint: 'حتى',
      explanationAr: 'نهاية الزمن: bis + الساعة.',
    },
    {
      id: 'ex-zeit-6',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Ich habe seit drei Jahren in Berlin gewohnt. (Ich wohne noch dort.)',
      isTrue: false,
      explanationAr: 'خطأ. للأمر المستمر نستعمل المضارع مع seit: Ich wohne seit drei Jahren in Berlin.',
    },
    {
      id: 'ex-zeit-7',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات لتكوين جملة',
      words: ['seit', 'wohne', 'Ich', 'Jahren', 'drei', 'hier.'],
      correctOrder: [2, 1, 0, 4, 3, 5],
      explanationAr: 'الترتيب: Ich wohne seit drei Jahren hier.',
    },
    {
      id: 'ex-zeit-8',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق الأداة مع معناها',
      pairs: [
        { de: 'seit', ar: 'منذ (ما زال مستمراً)' },
        { de: 'vor', ar: 'قبل (انتهى)' },
        { de: 'bis', ar: 'حتى' },
        { de: 'ab', ar: 'ابتداءً من' },
      ],
      explanationAr: 'seit للمستمر، وvor للمنتهي، وbis للنهاية، وab لنقطة البداية.',
    },
    {
      id: 'ex-zeit-9',
      type: 'vocab-recall',
      level: 'A2',
      promptAr: 'ما معنى هذه الكلمة؟',
      vocabularyId: 'voc-zeit-dauern',
      questionDe: 'dauern',
      correctAnswerAr: 'يستغرق',
      distractorsAr: ['يبدأ', 'ينتظر', 'يتأخّر'],
      explanationAr: 'dauern = يستغرق مدة معينة: Der Kurs dauert drei Monate.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich habe seit drei Jahren in Berlin gewohnt.',
      correct: 'Ich wohne seit drei Jahren in Berlin.',
      explanationAr: 'إن كان الأمر مستمراً حتى الآن نستعمل المضارع مع seit، لا الـ Perfekt.',
    },
    {
      wrong: 'Ich bin seit zwei Jahren nach Berlin gezogen.',
      correct: 'Ich bin vor zwei Jahren nach Berlin gezogen.',
      explanationAr: 'الانتقال حدث انتهى، فنستعمل vor (قبل)، لا seit.',
    },
    {
      wrong: 'Seit drei Jahre wohne ich hier.',
      correct: 'Seit drei Jahren wohne ich hier.',
      explanationAr: 'بعد seit نستعمل Dativ، وفي الجمع نضيف -n إلى الاسم.',
    },
    {
      wrong: 'Ich arbeite bis der Freitag.',
      correct: 'Ich arbeite bis Freitag.',
      explanationAr: 'بعد bis مع أسماء الأيام لا نضع أداة تعريف.',
    },
  ],
}

export const module17Zeitangaben: Module = {
  id: 'a2-m17',
  slug: 'zeitangaben',
  level: 'A2',
  title: 'Zeitangaben: seit, vor, in, bis, ab',
  titleAr: 'تعبيرات الزمن',
  order: 17,
  lessons: [lessonZeitangaben],
}
