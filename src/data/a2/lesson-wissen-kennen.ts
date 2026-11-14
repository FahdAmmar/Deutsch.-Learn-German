import type { Lesson } from '@/types'

/**
 * wissen, kennen and können. Arabic has one verb, يعرف, for three German ideas: knowing a fact (wissen),
 * being acquainted with a person or place (kennen), and having a skill (können). The lesson separates them
 * by what follows the verb, which is what the learner can check in a sentence.
 */
export const lessonWissenKennen: Lesson = {
  id: 'a2-m19-l02',
  slug: 'wissen-kennen-koennen',
  level: 'A2',
  moduleId: 'a2-m19',
  title: 'wissen, kennen oder können?',
  titleAr: 'ثلاثة أفعال لكلمة "يعرف": wissen، kennen، können',
  estimatedMinutes: 22,
  objectivesAr: [
    'استعمال wissen للمعلومة والحقيقة: Ich weiß es nicht / Ich weiß, wo er wohnt',
    'استعمال kennen للأشخاص والأماكن: Ich kenne ihn / Kennst du Berlin؟',
    'استعمال können للمهارة: Ich kann schwimmen / Ich kann Deutsch',
    'معرفة تصريف wissen غير المنتظم: ich weiß، du weißt',
  ],
  explanation: [
    {
      titleAr: 'كلمة عربية واحدة وثلاثة أفعال',
      bodyAr:
        'العربية تقول "أعرف" في كل الحالات، أما الألمانية فتفرّق بحسب ما تعرفه: **wissen** = تعرف **معلومة** أو حقيقة. **kennen** = تعرف **شخصاً أو مكاناً أو شيئاً** (تعرّفت عليه). **können** = تعرف **كيف تفعل** شيئاً (مهارة). اسأل نفسك: ماذا بعد الفعل؟ معلومة ← wissen، شخص أو مكان ← kennen، مهارة ← können.',
    },
    {
      titleAr: 'wissen: معلومة',
      bodyAr:
        '**wissen** فعل غير منتظم: **ich weiß، du weißt، er weiß، wir wissen، ihr wisst، sie wissen** (الماضي: wusste). يأتي بعده غالباً **جملة فرعية** أو ضمير: **Ich weiß es nicht.** **Weißt du, wo der Bahnhof ist؟** **Ich weiß nicht, ob er kommt.** **Ich weiß, dass er krank ist.** (الفعل في آخر الجملة الفرعية).',
    },
    {
      titleAr: 'kennen: أشخاص وأماكن',
      bodyAr:
        '**kennen** فعل منتظم في الحاضر (ich kenne، du kennst) ويأخذ مفعولاً به Akkusativ: **Ich kenne ihn.** **Kennst du Berlin؟** **Ich kenne das Lied.** وللتعرّف لأول مرة نقول **kennenlernen**: Ich lerne neue Leute kennen.',
    },
    {
      titleAr: 'können: مهارة',
      bodyAr:
        '**können** للقدرة، ومع اللغات والمهارات بلا فعل آخر: **Ich kann schwimmen.** **Er kann gut kochen.** **Ich kann Deutsch.** (أعرف الألمانية = أتقنها). لا نقول Ich weiß Deutsch.',
    },
  ],
  examples: [
    { de: 'Ich weiß es nicht.', ar: 'لا أعرف (هذا).' },
    { de: 'Weißt du, wo der Bahnhof ist?', ar: 'هل تعرف أين المحطة؟' },
    { de: 'Ich weiß nicht, ob er kommt.', ar: 'لا أعرف إن كان سيأتي.' },
    { de: 'Kennst du Frau Klein?', ar: 'هل تعرف السيدة كلاين؟' },
    { de: 'Ich kenne den Bahnhof nicht.', ar: 'لا أعرف المحطة.' },
    { de: 'Ich kann schwimmen.', ar: 'أعرف السباحة.' },
    { de: 'Kannst du Deutsch? — Ja, ich kann ein bisschen Deutsch.', ar: 'هل تعرف الألمانية؟ — نعم، أعرف قليلاً منها.' },
    { de: 'Ich kenne ihn schon lange, aber ich weiß nicht, wo er wohnt.', ar: 'أعرفه منذ زمن طويل، لكنني لا أعرف أين يسكن.' },
  ],
  vocabulary: [
    { id: 'voc-wissen-wissen', word: 'wissen', partOfSpeech: 'verb', meaningAr: 'يعرف (معلومة)', level: 'A2', category: 'wissen, kennen, können', verb: { present: ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'], praeteritum: 'wusste', partizip: 'gewusst', auxiliary: 'haben' }, example: { de: 'Ich weiß es nicht.', ar: 'لا أعرف (هذا).' } },
    { id: 'voc-wissen-kennen', word: 'kennen', partOfSpeech: 'verb', meaningAr: 'يعرف (شخصاً أو مكاناً)', level: 'A2', category: 'wissen, kennen, können', verb: { praeteritum: 'kannte', partizip: 'gekannt', auxiliary: 'haben' }, example: { de: 'Kennst du Frau Klein?', ar: 'هل تعرف السيدة كلاين؟' } },
    { id: 'voc-wissen-kennenlernen', word: 'kennenlernen', partOfSpeech: 'verb', meaningAr: 'يتعرّف على (للمرة الأولى)', level: 'A2', category: 'wissen, kennen, können', verb: { praeteritum: 'lernte', partizip: 'kennengelernt', auxiliary: 'haben', separablePrefix: 'kennen' }, example: { de: 'Ich lerne im Kurs neue Leute kennen.', ar: 'أتعرّف في الدورة على أناس جدد.' } },
    { id: 'voc-wissen-bekannt', word: 'bekannt', partOfSpeech: 'adjective', meaningAr: 'معروف', level: 'A2', category: 'wissen, kennen, können', example: { de: 'Das Lied ist sehr bekannt.', ar: 'الأغنية معروفة جداً.' } },
    { id: 'voc-wissen-sicher', word: 'sicher', partOfSpeech: 'adjective', meaningAr: 'متأكد / آمن', level: 'A2', category: 'wissen, kennen, können', example: { de: 'Ich bin nicht sicher.', ar: 'لست متأكداً.' } },
    { id: 'voc-wissen-vielleicht', word: 'vielleicht', partOfSpeech: 'adverb', meaningAr: 'ربما', level: 'A2', category: 'wissen, kennen, können', example: { de: 'Vielleicht kommt er morgen.', ar: 'ربما يأتي غداً.' } },
    { id: 'voc-wissen-information', word: 'Information', article: 'die', plural: 'Informationen', partOfSpeech: 'noun', meaningAr: 'المعلومة', level: 'A2', category: 'wissen, kennen, können', example: { de: 'Ich brauche mehr Informationen.', ar: 'أحتاج مزيداً من المعلومات.' } },
  ],
  exercises: [
    {
      id: 'ex-wissen-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الفعل الصحيح',
      questionDe: 'Ich ___ Frau Klein sehr gut.',
      options: ['kenne', 'weiß', 'kann', 'muss'],
      correctIndex: 0,
      explanationAr: 'نعرف شخصاً ← kennen.',
    },
    {
      id: 'ex-wissen-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الفعل الصحيح',
      questionDe: 'Ich ___ nicht, wo er wohnt.',
      options: ['kenne', 'weiß', 'kann', 'mag'],
      correctIndex: 1,
      explanationAr: 'نعرف معلومة (أين يسكن) ← wissen.',
    },
    {
      id: 'ex-wissen-3',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (مهارة)',
      sentenceDe: 'Mein Bruder ___ sehr gut schwimmen.',
      acceptedAnswers: ['kann'],
      hint: 'مهارة',
      explanationAr: 'المهارة ← können: er kann.',
    },
    {
      id: 'ex-wissen-4',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'كيف تقول "أعرف المدينة"؟',
      questionDe: '',
      options: ['Ich kenne die Stadt.', 'Ich weiß die Stadt.', 'Ich kann die Stadt.', 'Ich kenne in der Stadt.'],
      correctIndex: 0,
      explanationAr: 'نعرف مكاناً ← kennen: Ich kenne die Stadt.',
    },
    {
      id: 'ex-wissen-5',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Man sagt: Ich weiß Deutsch.',
      isTrue: false,
      explanationAr: 'خطأ. للغة نقول Ich kann Deutsch.',
    },
    {
      id: 'ex-wissen-6',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بتصريف wissen مع du',
      sentenceDe: 'Du ___ es schon, oder?',
      acceptedAnswers: ['weißt', 'weisst'],
      hint: 'wissen',
      explanationAr: 'wissen: ich weiß، du weißt، er weiß.',
    },
    {
      id: 'ex-wissen-7',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق الفعل بما يُعرف به',
      pairs: [
        { de: 'wissen', ar: 'معلومة أو حقيقة' },
        { de: 'kennen', ar: 'شخص أو مكان' },
        { de: 'können', ar: 'مهارة أو قدرة' },
        { de: 'kennenlernen', ar: 'التعرّف للمرة الأولى' },
      ],
      explanationAr: 'اسأل نفسك: ماذا أعرف؟ معلومة، أم شخصاً، أم مهارة؟',
    },
    {
      id: 'ex-wissen-8',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['den', 'Kennst', 'Lehrer', 'du'],
      correctOrder: [1, 3, 0, 2],
      explanationAr: 'Kennst du den Lehrer؟ السؤال بالفعل أولاً.',
    },
    {
      id: 'ex-wissen-9',
      type: 'translation',
      level: 'A2',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'لا أعرف أين يسكن.',
      acceptedAnswers: ['Ich weiß nicht, wo er wohnt.', 'Ich weiß nicht, wo sie wohnt.'],
      explanationAr: 'معلومة ← wissen، والفعل في آخر الجملة الفرعية.',
    },
    {
      id: 'ex-wissen-10',
      type: 'translation',
      level: 'A2',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'هل تعرف السيدة كلاين؟',
      acceptedAnswers: ['Kennst du Frau Klein?', 'Kennen Sie Frau Klein?'],
      explanationAr: 'نعرف شخصاً ← kennen.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich weiß ihn.',
      correct: 'Ich kenne ihn.',
      explanationAr: 'wissen للمعلومات وليس للأشخاص.',
    },
    {
      wrong: 'Ich kenne nicht, wo er wohnt.',
      correct: 'Ich weiß nicht, wo er wohnt.',
      explanationAr: '"أين يسكن" معلومة، فنستعمل wissen.',
    },
    {
      wrong: 'Ich weiß Deutsch.',
      correct: 'Ich kann Deutsch.',
      explanationAr: 'اللغة مهارة، فنستعمل können.',
    },
  ],
}
