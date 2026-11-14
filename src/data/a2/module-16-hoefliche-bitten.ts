import type { Lesson, Module } from '@/types'
import { lessonKleineWoerter } from './lesson-kleine-woerter'

/**
 * Polite requests and wishes. The forms könnte / würde / hätte are the Konjunktiv II, which the roadmap teaches
 * as a rule only at B1; here they are taught as the ready-made polite forms an A2 learner needs for shops,
 * offices and phone calls, with no grammar theory beyond their six forms and the position of the infinitive.
 */
export const lessonHoeflicheBitten: Lesson = {
  id: 'a2-m16-l01',
  slug: 'hoefliche-bitten',
  level: 'A2',
  moduleId: 'a2-m16',
  title: 'Höfliche Bitten und Wünsche',
  titleAr: 'الطلبات المهذّبة والأمنيات: könnte, würde, hätte gern',
  estimatedMinutes: 28,
  objectivesAr: [
    'طلب المساعدة أو شيء ما بأدب: Könnten Sie mir bitte helfen؟ / Könntest du …؟',
    'التعبير عن رغبة مهذّبة: Ich hätte gern … وIch würde gern + مصدر',
    'معرفة الصيغ الستّ لـ könnte وwürde وhätte ووضع المصدر في نهاية الجملة',
    'الرد على الطلب بأدب: Gern، Natürlich، Kein Problem، Leider nicht',
  ],
  explanation: [
    {
      titleAr: 'الأمر المباشر قد يبدو فظاً',
      bodyAr:
        'في العربية نقول "لو سمحت" ونخفّف الطلب بالنبرة. أما الألمانية فتخفّفه بالصيغة نفسها. "Gib mir das Salz!" أو "Ich will einen Kaffee." تبدوان آمرتين، خصوصاً مع من لا تعرفه. لذلك نستخدم ثلاث صيغ مهذّبة: **könnte** (هل يمكنك) و**würde** (هل تقبل أن) و**hätte** (لو كان عندي). ونضيف عادةً كلمة **bitte**.',
    },
    {
      titleAr: 'الطلب: Könnten Sie … / Könntest du …',
      bodyAr:
        'نبدأ بالفعل المساعد، كما في سؤال نعم/لا، ثم نضع **المصدر في نهاية الجملة**: **Könnten** Sie mir bitte **helfen**؟ **Könntest** du das Fenster **öffnen**؟ ويمكن استعمال würde بالمعنى نفسه: **Würden** Sie bitte die Tür **schließen**؟ مع الغريب والموظف نقول Sie، ومع الصديق du.',
    },
    {
      titleAr: 'الرغبة: Ich hätte gern … / Ich würde gern …',
      bodyAr:
        'في المتجر والمطعم نقول **Ich hätte gern** + اسم: Ich hätte gern einen Kaffee. (أودّ فنجان قهوة). وللفعل نقول **Ich würde gern** + مصدر في النهاية: Ich würde gern ein Zimmer **reservieren**. أما **Ich möchte** التي تعلّمتها فمهذّبة أيضاً. الأفظّ هو Ich will.',
    },
    {
      titleAr: 'كيف تجيب على الطلب؟',
      bodyAr:
        'للموافقة: **Gern!** (بكل سرور) أو **Natürlich.** (طبعاً) أو **Kein Problem.** (لا مشكلة). وللاعتذار: **Leider nicht.** (للأسف لا) ثم السبب: Leider habe ich keine Zeit. وللشكر: **Danke, das ist nett.**',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-hoefliche-bitten',
      slug: 'hoefliche-bitten',
      level: 'A2',
      titleDe: 'könnte, würde, hätte',
      titleAr: 'صيغ الأدب: könnte وwürde وhätte',
      conceptAr: 'نخفّف الطلب بصيغ جاهزة: könnte للإمكان، وwürde + مصدر للطلب أو الرغبة، وhätte gern للشيء الذي نريده.',
      ruleAr:
        'الطلب سؤال نعم/لا يبدأ بـ könnte أو würde، والمصدر في آخر الجملة. الرغبة في شيء: Ich hätte gern + مفعول به. الرغبة في فعل: Ich würde gern + مصدر في آخر الجملة. الصيغ تتغيّر بحسب الضمير كما في الجدول، والنهايات واحدة في الثلاثة.',
      tables: [
        {
          caption: 'الصيغ الستّ',
          headers: ['الضمير', 'könnte', 'würde', 'hätte'],
          rows: [
            { label: 'ich', values: ['könnte', 'würde', 'hätte'] },
            { label: 'du', values: ['könntest', 'würdest', 'hättest'] },
            { label: 'er / sie / es', values: ['könnte', 'würde', 'hätte'] },
            { label: 'wir', values: ['könnten', 'würden', 'hätten'] },
            { label: 'ihr', values: ['könntet', 'würdet', 'hättet'] },
            { label: 'sie / Sie', values: ['könnten', 'würden', 'hätten'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Könnten Sie mir bitte helfen?',
          ar: 'هل يمكنكم مساعدتي من فضلكم؟',
          tokens: [
            { text: 'Könnten', role: 'الفعل المساعد في الأول' },
            { text: 'Sie mir bitte', role: 'الفاعل ومفعول به وكلمة الأدب' },
            { text: 'helfen?', role: 'المصدر في النهاية' },
          ],
        },
        {
          de: 'Ich hätte gern einen Kaffee.',
          ar: 'أودّ فنجان قهوة.',
          tokens: [
            { text: 'Ich hätte gern', role: 'الرغبة المهذّبة' },
            { text: 'einen Kaffee.', role: 'المفعول به (Akkusativ)' },
          ],
        },
        {
          de: 'Ich würde gern ein Zimmer reservieren.',
          ar: 'أودّ أن أحجز غرفة.',
          tokens: [
            { text: 'Ich würde gern', role: 'الرغبة المهذّبة' },
            { text: 'ein Zimmer', role: 'المفعول به' },
            { text: 'reservieren.', role: 'المصدر في النهاية' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Könnten Sie das bitte wiederholen?', ar: 'هل يمكنكم إعادة ذلك من فضلكم؟' },
    { de: 'Könntest du mir kurz deinen Stift leihen?', ar: 'هل يمكنك أن تعيرني قلمك لحظة؟' },
    { de: 'Würden Sie bitte etwas langsamer sprechen?', ar: 'هل تتكلّمون بشكل أبطأ قليلاً من فضلكم؟' },
    { de: 'Ich hätte gern ein Glas Wasser.', ar: 'أودّ كوب ماء.' },
    { de: 'Leider habe ich heute keine Zeit.', ar: 'للأسف ليس عندي وقت اليوم.' },
    { de: 'Einen Moment, bitte.', ar: 'لحظة من فضلك.' },
  ],
  vocabulary: [
    { id: 'voc-bitten-bitte', word: 'Bitte', article: 'die', plural: 'Bitten', partOfSpeech: 'noun', meaningAr: 'الطلب / الرجاء', level: 'A2', category: 'الطلبات المهذّبة', example: { de: 'Ich habe eine Bitte an Sie.', ar: 'عندي طلب منكم.' } },
    { id: 'voc-bitten-moment', word: 'Moment', article: 'der', plural: 'Momente', partOfSpeech: 'noun', meaningAr: 'اللحظة', level: 'A2', category: 'الطلبات المهذّبة', example: { de: 'Einen Moment, bitte.', ar: 'لحظة من فضلك.' } },
    { id: 'voc-bitten-leihen', word: 'leihen', partOfSpeech: 'verb', meaningAr: 'يُعير', level: 'A2', category: 'الطلبات المهذّبة', verb: { praeteritum: 'lieh', partizip: 'geliehen', auxiliary: 'haben' }, example: { de: 'Kannst du mir bitte dein Handy leihen?', ar: 'هل تعيرني هاتفك من فضلك؟' } },
    { id: 'voc-bitten-wiederholen', word: 'wiederholen', partOfSpeech: 'verb', meaningAr: 'يُعيد / يكرّر', level: 'A2', category: 'الطلبات المهذّبة', verb: { praeteritum: 'wiederholte', partizip: 'wiederholt', auxiliary: 'haben' }, example: { de: 'Könnten Sie das bitte wiederholen?', ar: 'هل يمكنكم إعادة ذلك من فضلكم؟' } },
    { id: 'voc-bitten-reservieren', word: 'reservieren', partOfSpeech: 'verb', meaningAr: 'يحجز', level: 'A2', category: 'الطلبات المهذّبة', verb: { praeteritum: 'reservierte', partizip: 'reserviert', auxiliary: 'haben' }, example: { de: 'Ich würde gern einen Tisch reservieren.', ar: 'أودّ أن أحجز طاولة.' } },
    { id: 'voc-bitten-leider', word: 'leider', partOfSpeech: 'adverb', meaningAr: 'للأسف', level: 'A2', category: 'الطلبات المهذّبة', example: { de: 'Leider habe ich keine Zeit.', ar: 'للأسف ليس عندي وقت.' } },
    { id: 'voc-bitten-kurz', word: 'kurz', partOfSpeech: 'adverb', meaningAr: 'لحظة / قليلاً (وقتاً)', level: 'A2', category: 'الطلبات المهذّبة', example: { de: 'Haben Sie kurz Zeit?', ar: 'هل لديكم لحظة؟' } },
  ],
  dialogues: [
    {
      id: 'dialogue-bitten-informell',
      level: 'A2',
      moduleId: 'a2-m16',
      lessonId: 'a2-m16-l01',
      titleDe: 'Hilfe beim Umräumen',
      titleAr: 'مساعدة في ترتيب الغرفة',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Lina', de: 'Tom, könntest du mir bitte kurz helfen?', ar: 'توم، هل يمكنك أن تساعدني قليلاً من فضلك؟' },
        { speaker: 'b', name: 'Tom', de: 'Natürlich, gern. Was brauchst du?', ar: 'طبعاً، بكل سرور. ماذا تحتاجين؟' },
        { speaker: 'a', name: 'Lina', de: 'Ich würde gern den Tisch ans Fenster stellen.', ar: 'أودّ أن أضع الطاولة بجانب النافذة.' },
        { speaker: 'b', name: 'Tom', de: 'Kein Problem. Könntest du vielleicht die Tür öffnen? Der Tisch ist breit.', ar: 'لا مشكلة. هل يمكنك أن تفتحي الباب؟ فالطاولة عريضة.' },
      ],
    },
    {
      id: 'dialogue-bitten-formell',
      level: 'A2',
      moduleId: 'a2-m16',
      lessonId: 'a2-m16-l01',
      titleDe: 'Im Restaurant',
      titleAr: 'في المطعم',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Frau Demir', de: 'Guten Abend. Ich hätte gern einen Tisch für zwei Personen.', ar: 'مساء الخير. أودّ طاولة لشخصين.' },
        { speaker: 'b', name: 'Herr Bauer', de: 'Gern. Hier am Fenster ist noch ein Platz frei.', ar: 'بكل سرور. هنا بجانب النافذة ما زال هناك مكان.' },
        { speaker: 'a', name: 'Frau Demir', de: 'Das ist sehr schön. Könnten Sie uns bitte die Speisekarte bringen?', ar: 'هذا جميل جداً. هل يمكنكم أن تحضروا لنا قائمة الطعام من فضلكم؟' },
        { speaker: 'b', name: 'Herr Bauer', de: 'Natürlich. Einen Moment, bitte.', ar: 'طبعاً. لحظة من فضلكم.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'ö وü في könnte وwürde', bodyAr: 'ö تُنطق بشفتين مستديرتين كأنك تقول "إي" و"أو" معاً، وü مثلها مع "إي". كرّر: könnte، würde، hätte.', example: 'könnte' },
    { titleAr: 'نغمة الطلب المهذّب', bodyAr: 'في الطلب يرتفع الصوت قليلاً في آخر الجملة، وتأتي كلمة bitte ليّنة بعد الفعل المساعد: "Könnten Sie mir bitte helfen؟"', example: 'Könnten Sie mir bitte helfen?' },
  ],
  exercises: [
    {
      id: 'ex-bitten-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'أي جملة هي الأكثر أدباً لطلب الماء من نادل لا تعرفه؟',
      questionDe: 'Sie möchten Wasser bestellen. Was sagen Sie?',
      options: ['Gib mir Wasser!', 'Ich will Wasser.', 'Könnten Sie mir bitte ein Wasser bringen?', 'Wasser!'],
      correctIndex: 2,
      explanationAr: 'الطلب بـ Könnten Sie … bitte … هو الأكثر أدباً مع من لا تعرفه.',
    },
    {
      id: 'ex-bitten-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الصيغة الصحيحة للضمير du',
      questionDe: '___ du mir bitte helfen?',
      options: ['Könntest', 'Könnte', 'Könnten', 'Könntet'],
      correctIndex: 0,
      explanationAr: 'مع du تنتهي الصيغة بـ -st: könntest.',
    },
    {
      id: 'ex-bitten-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الجملة الصحيحة لطلب فنجان قهوة',
      questionDe: 'Im Café:',
      options: ['Ich hätte gern einen Kaffee.', 'Ich habe gern einen Kaffee.', 'Ich hätte gern Kaffee einen.', 'Ich gern hätte einen Kaffee.'],
      correctIndex: 0,
      explanationAr: 'الصيغة المهذّبة للرغبة هي Ich hätte gern + مفعول به.',
    },
    {
      id: 'ex-bitten-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل الجملة بصيغة الأدب',
      sentenceDe: 'Ich ___ gern ein Zimmer reservieren.',
      acceptedAnswers: ['würde'],
      hint: 'würde / hätte',
      explanationAr: 'مع الفعل نقول Ich würde gern + مصدر في النهاية.',
    },
    {
      id: 'ex-bitten-5',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل الطلب المهذّب',
      sentenceDe: '___ Sie das bitte wiederholen?',
      acceptedAnswers: ['Könnten', 'Würden', 'könnten', 'würden'],
      hint: 'Könnten / Würden',
      explanationAr: 'كلتا الصيغتين صحيحة: Könnten Sie … أو Würden Sie …، مع المصدر في النهاية.',
    },
    {
      id: 'ex-bitten-6',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'In „Könnten Sie mir bitte helfen?“ steht das Verb „helfen“ am Ende.',
      isTrue: true,
      explanationAr: 'صحيح. الفعل المساعد في الأول، والمصدر helfen في نهاية الجملة.',
    },
    {
      id: 'ex-bitten-7',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات لتكوين طلب مهذّب',
      words: ['mir', 'Könnten', 'bitte', 'Sie', 'helfen?'],
      correctOrder: [1, 3, 0, 2, 4],
      explanationAr: 'الترتيب: Könnten Sie mir bitte helfen؟',
    },
    {
      id: 'ex-bitten-8',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق ردّ الاستجابة مع معناه',
      pairs: [
        { de: 'Gern!', ar: 'بكل سرور' },
        { de: 'Natürlich.', ar: 'طبعاً' },
        { de: 'Kein Problem.', ar: 'لا مشكلة' },
        { de: 'Leider nicht.', ar: 'للأسف لا' },
      ],
      explanationAr: 'الثلاثة الأولى للموافقة، وLeider nicht للاعتذار.',
    },
    {
      id: 'ex-bitten-9',
      type: 'vocab-recall',
      level: 'A2',
      promptAr: 'ما معنى هذه الكلمة؟',
      vocabularyId: 'voc-bitten-reservieren',
      questionDe: 'reservieren',
      correctAnswerAr: 'يحجز',
      distractorsAr: ['يُلغي', 'يدفع', 'يطلب'],
      explanationAr: 'reservieren = يحجز، كما في: Ich würde gern einen Tisch reservieren.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich will einen Kaffee.',
      correct: 'Ich hätte gern einen Kaffee.',
      explanationAr: 'Ich will تبدو آمرة. للطلب في المقهى أو المتجر نقول Ich hätte gern أو Ich möchte.',
    },
    {
      wrong: 'Könnten Sie helfen mir bitte?',
      correct: 'Könnten Sie mir bitte helfen?',
      explanationAr: 'المصدر يذهب إلى نهاية الجملة، وقبله الضمير وكلمة bitte.',
    },
    {
      wrong: 'Ich würde gern reservieren ein Zimmer.',
      correct: 'Ich würde gern ein Zimmer reservieren.',
      explanationAr: 'بعد würde gern يأتي المفعول به ثم المصدر في آخر الجملة.',
    },
  ],
}

export const module16HoeflicheBitten: Module = {
  id: 'a2-m16',
  slug: 'hoefliche-bitten',
  level: 'A2',
  title: 'Höfliche Bitten und Wünsche',
  titleAr: 'الطلبات المهذّبة',
  order: 16,
  lessons: [lessonHoeflicheBitten, lessonKleineWoerter],
}
