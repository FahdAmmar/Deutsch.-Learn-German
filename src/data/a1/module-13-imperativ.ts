import type { Lesson, Module } from '@/types'

export const lessonImperativ: Lesson = {
  id: 'a1-m13-l01',
  slug: 'imperativ',
  level: 'A1',
  moduleId: 'a1-m13',
  title: 'Imperativ',
  titleAr: 'صيغة الأمر',
  estimatedMinutes: 26,
  objectivesAr: [
    'تكوين صيغة الأمر لـ du بشكل صحيح، بما في ذلك الاستثناءات الصوتية',
    'تكوين صيغتَي الأمر لـ ihr وSie',
    'التمييز بين الأفعال التي تحتفظ بتغيّر حرف العلة في الأمر (e→i) والتي تفقده (a→ä)',
    'تطبيق قاعدة الإطار اللفظي على الأفعال المنفصلة في صيغة الأمر',
  ],
  explanation: [
    {
      titleAr: 'ثلاث صيغ أمر حسب من تخاطب',
      bodyAr:
        'للألمانية ثلاث صيغ أمر منفصلة حسب صيغة المخاطبة: du (غير رسمي، مفرد)، ihr (غير رسمي، جمع)، وSie (رسمي، مفرد أو جمع). صيغة du تُشتق من جذع الفعل مباشرة بلا ضمير، وصيغة ihr هي ببساطة صيغة ihr المعتادة في المضارع بلا الضمير نفسه، أما صيغة Sie فهي الفعل بصيغة المصدر يليه Sie مباشرة (انعكاس ترتيب الفاعل والفعل).',
    },
    {
      titleAr: 'ماذا يحدث لتغيّر حرف العلة في صيغة du؟',
      bodyAr:
        'الأفعال التي تُغيّر e إلى i أو ie في صيغة du المعتادة تحتفظ بهذا التغيير في الأمر: sprechen → du sprichst → Sprich! أما الأفعال التي تُغيّر a إلى ä فتفقد الـUmlaut في الأمر وتعود لحرف العلة الأصلي: fahren → du fährst → لكن الأمر هو Fahr! (بلا Umlaut). هذا فرق دقيق يستحق الانتباه لأنه يخالف التوقع المباشر.',
    },
    {
      titleAr: 'الأفعال المنفصلة في الأمر',
      bodyAr:
        'تنطبق قاعدة الإطار اللفظي نفسها على صيغة الأمر: الفعل المصرَّف في البداية، والبادئة المنفصلة تنتقل إلى نهاية الجملة: "Mach die Tür auf!" (من aufmachen). هذا نفس النمط الذي رأيته مع الأفعال الشرطية والأفعال المنفصلة في المضارع وPerfekt.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a1-imperativ',
      slug: 'imperativ-formen',
      level: 'A1',
      titleDe: 'Imperativ: du, ihr, Sie',
      titleAr: 'صيغة الأمر: du وihr وSie',
      conceptAr: 'ثلاث صيغ أمر منفصلة حسب صيغة المخاطبة، مشتقة من صيغ المضارع المعتادة لكل منها.',
      ruleAr:
        'صيغة du: احذف الضمير du والنهاية -st من صيغة المضارع (أضف -e فقط إن كان الجذع ينتهي بـ d/t أو عنقود صوامت صعب النطق). صيغة ihr: احذف الضمير ihr فقط، واحتفظ بالفعل كما هو. صيغة Sie: ضع الفعل بصيغة المصدر (نفس صيغة Sie في المضارع) قبل Sie مباشرة، بترتيب معكوس (الفعل أولاً).',
      tables: [
        {
          caption: 'مقارنة الصيغ الثلاث',
          headers: ['المخاطب', 'kommen', 'sprechen', 'sein'],
          rows: [
            { label: 'du', values: ['Komm!', 'Sprich!', 'Sei!'] },
            { label: 'ihr', values: ['Kommt!', 'Sprecht!', 'Seid!'] },
            { label: 'Sie', values: ['Kommen Sie!', 'Sprechen Sie!', 'Seien Sie!'] },
          ],
        },
        {
          caption: 'تأثير تغيّر حرف العلة على صيغة du',
          headers: ['النمط', 'المصدر', 'صيغة الأمر لـ du'],
          rows: [
            { label: 'e → i (يبقى)', values: ['sprechen', 'Sprich!'] },
            { label: 'e → i (يبقى)', values: ['nehmen', 'Nimm!'] },
            { label: 'a → ä (يزول)', values: ['fahren', 'Fahr!'] },
            { label: 'a → ä (يزول)', values: ['schlafen', 'Schlaf!'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Mach die Tür auf!',
          ar: 'افتح الباب! (aufmachen، البادئة في النهاية)',
          tokens: [
            { text: 'Mach', role: 'فعل الأمر' },
            { text: 'die Tür', role: 'المفعول به' },
            { text: 'auf!', role: 'البادئة المنفصلة' },
          ],
        },
        {
          de: 'Sprich bitte langsamer!',
          ar: 'تحدّث ببطء أكثر رجاءً! (e→i يبقى في الأمر)',
          tokens: [
            { text: 'Sprich', role: 'فعل الأمر' },
            { text: 'bitte', role: 'أداة تهذيب' },
            { text: 'langsamer!', role: 'الحال' },
          ],
        },
        {
          de: 'Öffnen Sie das Fenster, bitte!',
          ar: 'افتحوا النافذة رجاءً! (صيغة Sie الرسمية)',
          tokens: [
            { text: 'Öffnen', role: 'فعل الأمر' },
            { text: 'Sie', role: 'المخاطَب الرسمي' },
            { text: 'das Fenster,', role: 'المفعول به' },
            { text: 'bitte!', role: 'أداة تهذيب' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Hab keine Angst!', ar: 'لا تخف! (haben شاذّة قليلاً في الأمر)' },
    { de: 'Kommt bitte pünktlich!', ar: 'تعالوا في الموعد رجاءً! (ihr)' },
    { de: 'Nehmen Sie bitte Platz!', ar: 'تفضّلوا بالجلوس! (Sie)' },
    { de: 'Fahr vorsichtig!', ar: 'قُد بحذر! (a→ä تزول في الأمر)' },
  ],
  vocabulary: [
    { id: 'voc-imperativ-warten', word: 'warten', partOfSpeech: 'verb', meaningAr: 'ينتظر', level: 'A1', category: 'أفعال الأمر' },
    { id: 'voc-imperativ-oeffnen', word: 'öffnen', partOfSpeech: 'verb', meaningAr: 'يفتح', level: 'A1', category: 'أفعال الأمر' },
    { id: 'voc-imperativ-schliessen', word: 'schließen', partOfSpeech: 'verb', meaningAr: 'يغلق', level: 'A1', category: 'أفعال الأمر' },
    { id: 'voc-imperativ-ruhig', word: 'ruhig', partOfSpeech: 'adjective', meaningAr: 'هادئ', level: 'A1', category: 'أفعال الأمر', example: { de: 'Sei ruhig!', ar: 'كن هادئاً!' } },
    { id: 'voc-imperativ-vorsichtig', word: 'vorsichtig', partOfSpeech: 'adjective', meaningAr: 'حذر', level: 'A1', category: 'أفعال الأمر' },
    { id: 'voc-imperativ-langsam', word: 'langsam', partOfSpeech: 'adjective', meaningAr: 'بطيء / ببطء', level: 'A1', category: 'أفعال الأمر' },
    { id: 'voc-imperativ-platz-nehmen', word: 'Platz nehmen', partOfSpeech: 'phrase', meaningAr: 'يجلس (تعبير مهذب)', level: 'A1', category: 'أفعال الأمر' },
  ],
  dialogues: [
    {
      id: 'dialogue-imperativ-informell',
      level: 'A1',
      moduleId: 'a1-m13',
      lessonId: 'a1-m13-l01',
      titleAr: 'نصائح قبل الامتحان',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Mama', de: 'Schlaf heute früh, du hast morgen eine Prüfung!', ar: 'نم باكراً اليوم، لديك امتحان غداً!' },
        { speaker: 'b', name: 'Lukas', de: 'Ja, Mama. Mach dir keine Sorgen.', ar: 'حسناً يا أمي. لا تقلقي.' },
        { speaker: 'a', name: 'Mama', de: 'Und vergiss dein Buch nicht!', ar: 'ولا تنسَ كتابك!' },
        { speaker: 'b', name: 'Lukas', de: 'Ist schon in meiner Tasche. Sei ruhig!', ar: 'موجود بالفعل في حقيبتي. كوني هادئة!' },
      ],
    },
    {
      id: 'dialogue-imperativ-formell',
      level: 'A1',
      moduleId: 'a1-m13',
      lessonId: 'a1-m13-l01',
      titleAr: 'تعليمات في العيادة',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Arzthelferin', de: 'Nehmen Sie bitte Platz, der Arzt kommt gleich.', ar: 'تفضّلوا بالجلوس، سيأتي الطبيب حالاً.' },
        { speaker: 'b', name: 'Herr Costa', de: 'Vielen Dank.', ar: 'شكراً جزيلاً.' },
        { speaker: 'a', name: 'Arzthelferin', de: 'Füllen Sie bitte dieses Formular aus.', ar: 'يرجى تعبئة هذه الاستمارة.' },
        { speaker: 'b', name: 'Herr Costa', de: 'Natürlich, kein Problem.', ar: 'بالتأكيد، لا مشكلة.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'النبرة والحسم في نبرة الأمر', bodyAr: 'صيغة الأمر تُنطق بنبرة هابطة حاسمة على الفعل نفسه، أوضح من الجملة الخبرية العادية.', example: 'Komm!' },
    { titleAr: 'ö في öffnen صوت مقرّب خلفي', bodyAr: 'حرف ö يُشبه ü لكن بموضع فم أوسع قليلاً — قرّب شفتيك ولفظ "إيه" في آن واحد.', example: 'öffnen' },
  ],
  exercises: [
    {
      id: 'ex-imperativ-1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر صيغة الأمر الصحيحة لـ du: kommen',
      questionDe: '___! (du, kommen)',
      options: ['Komm', 'Kommst', 'Kommt', 'Kommen'],
      correctIndex: 0,
      explanationAr: 'صيغة الأمر لـ du تُشتق بحذف du والنهاية -st: Komm!',
    },
    {
      id: 'ex-imperativ-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر صيغة الأمر الصحيحة لـ du: sprechen (e→i تبقى)',
      questionDe: '___ bitte langsamer! (du, sprechen)',
      options: ['Sprich', 'Sprech', 'Sprichst', 'Sprecht'],
      correctIndex: 0,
      explanationAr: 'sprechen تحتفظ بتغيّر e→i في الأمر: Sprich!',
    },
    {
      id: 'ex-imperativ-3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر صيغة الأمر الصحيحة لـ du: fahren (a→ä تزول)',
      questionDe: '___ vorsichtig! (du, fahren)',
      options: ['Fahr', 'Fähr', 'Fährst', 'Fahrt'],
      correctIndex: 0,
      explanationAr: 'fahren تفقد الـUmlaut في صيغة الأمر: Fahr! وليس Fähr!',
    },
    {
      id: 'ex-imperativ-4',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر صيغة الأمر الرسمية الصحيحة لـ kommen',
      questionDe: '___ bitte pünktlich! (Sie, kommen)',
      options: ['Kommen Sie', 'Sie kommen', 'Komm Sie', 'Kommt Sie'],
      correctIndex: 0,
      explanationAr: 'صيغة Sie الرسمية: الفعل أولاً ثم Sie: Kommen Sie!',
    },
    {
      id: 'ex-imperativ-5',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل: ____ ruhig! (du, sein)',
      sentenceDe: '____ ruhig!',
      acceptedAnswers: ['Sei'],
      hint: 'sein شاذّة في الأمر',
      explanationAr: 'sein شاذّة: صيغة الأمر لـ du هي Sei!',
    },
    {
      id: 'ex-imperativ-6',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل: Mach die Tür ____! (aufmachen)',
      sentenceDe: 'Mach die Tür ____!',
      acceptedAnswers: ['auf'],
      hint: 'البادئة تنتقل إلى النهاية',
      explanationAr: 'aufmachen: البادئة auf تنتقل إلى نهاية جملة الأمر أيضاً.',
    },
    {
      id: 'ex-imperativ-7',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Bei "fahren" bleibt der Umlaut im Imperativ (du) erhalten.',
      isTrue: false,
      explanationAr: 'خطأ — أفعال a→ä تفقد الـUmlaut في صيغة أمر du: Fahr! وليس Fähr!',
    },
    {
      id: 'ex-imperativ-8',
      type: 'matching',
      level: 'A1',
      promptAr: 'صل كل صيغة أمر لـ du بمصدرها',
      pairs: [
        { de: 'Komm!', ar: 'kommen' },
        { de: 'Sprich!', ar: 'sprechen' },
        { de: 'Sei!', ar: 'sein' },
        { de: 'Nimm!', ar: 'nehmen' },
      ],
      explanationAr: 'كل صيغة أمر مشتقّة من مصدر فعل محدد حسب قواعد الأمر.',
    },
    {
      id: 'ex-imperativ-9',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتب الكلمات لتكوين جملة أمر صحيحة',
      words: ['Öffnen', 'Sie', 'das', 'Fenster,', 'bitte!'],
      correctOrder: [0, 1, 2, 3, 4],
      explanationAr: 'الترتيب الصحيح: "Öffnen Sie das Fenster, bitte!"',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Du kommst hier!',
      correct: 'Komm hier!',
      explanationAr: 'صيغة المضارع العادية ليست أمراً؛ يجب استخدام صيغة الأمر المشتقّة بحذف الضمير والنهاية -st.',
    },
    {
      wrong: 'Sprech lauter!',
      correct: 'Sprich lauter!',
      explanationAr: 'sprechen تحتفظ بتغيّر حرف العلة e→i حتى في صيغة الأمر.',
    },
    {
      wrong: 'Fähr langsamer!',
      correct: 'Fahr langsamer!',
      explanationAr: 'أفعال a→ä تفقد الـUmlaut في صيغة الأمر، بعكس أفعال e→i التي تحتفظ به.',
    },
    {
      wrong: 'Sie kommen bitte!',
      correct: 'Kommen Sie bitte!',
      explanationAr: 'صيغة الأمر الرسمية تتطلّب انعكاس الترتيب: الفعل أولاً ثم Sie.',
    },
    {
      wrong: 'Mach auf die Tür!',
      correct: 'Mach die Tür auf!',
      explanationAr: 'في الأفعال المنفصلة، تنتقل البادئة إلى نهاية جملة الأمر تماماً، وليس تبقى قريبة من الفعل.',
    },
  ],
}

export const module13Imperativ: Module = {
  id: 'a1-m13',
  slug: 'imperativ',
  level: 'A1',
  title: 'Imperativ',
  titleAr: 'صيغة الأمر',
  order: 13,
  lessons: [lessonImperativ],
}
