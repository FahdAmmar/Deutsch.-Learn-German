import type { ContrastiveNote } from '@/types'

/**
 * Notes for Arabic speakers, by the lesson where each one first matters. They describe real differences
 * between the two languages and say nothing about what a learner "usually" feels or finds hard.
 */
export const CONTRASTIVE_NOTES: readonly ContrastiveNote[] = [
  {
    id: 'copula',
    lessonIds: ['a1-m01-l02', 'a1-m03-l01'],
    titleAr: 'لا جملة بلا فعل: bin وist وsind',
    bodyAr:
      'في العربية نقول «أنا طالب» بلا فعل في المضارع. أما الألمانية فلا تقبل جملة خبرية بلا فعل مصرَّف، فيجب أن تضع **sein** بصيغته: **Ich bin Student**. لا تحذف bin وist وsind.',
    wrong: 'Ich Student.',
    correct: 'Ich bin Student.',
  },
  {
    id: 'indefinite-article',
    lessonIds: ['a1-m03-l04'],
    titleAr: 'النكرة بلا «ال» في العربية، وبـ ein في الألمانية',
    bodyAr:
      'تدلّ العربية على النكرة بغياب «ال» (وبالتنوين). أما الألمانية فتضع **ein / eine** قبل الاسم المفرد: «عندي سيارة» = **Ich habe ein Auto**. والاستثناء أن المهنة والجنسية بعد sein تأتيان بلا أداة: **Ich bin Lehrer**.',
    wrong: 'Ich habe Auto.',
    correct: 'Ich habe ein Auto.',
  },
  {
    id: 'gender-differs',
    lessonIds: ['a1-m03-l04'],
    titleAr: 'جنس الاسم في الألمانية ليس جنسه في العربية',
    bodyAr:
      'في العربية مذكّر ومؤنّث فقط، وفي الألمانية مذكّر ومؤنّث **ومحايد**، ولا يطابق أحدهما الآخر دائماً: «الكتاب» مذكّر في العربية لكنه **das Buch**، و«الفتاة» **das Mädchen** محايدة. لا تستنتج الأداة من العربية، بل احفظها مع كل اسم.',
    wrong: 'der Buch',
    correct: 'das Buch',
  },
  {
    id: 'capital-nouns',
    lessonIds: ['a1-m01-l03'],
    titleAr: 'الأسماء كلها بحرف كبير',
    bodyAr:
      'لا حروف كبيرة في العربية. أما في الألمانية فتُكتب **كل الأسماء** بحرف كبير، لا أسماء الأعلام وحدها، وكذلك أول كل جملة. هذا يساعدك على التعرّف على الاسم في الجملة.',
    wrong: 'ich habe einen hund.',
    correct: 'Ich habe einen Hund.',
  },
  {
    id: 'verb-second',
    lessonIds: ['a1-m03-l03'],
    titleAr: 'الفعل في الموضع الثاني',
    bodyAr:
      'في الجملة الألمانية الخبرية يأتي الفعل المصرَّف **ثانياً** دائماً. فإذا بدأتَ بالزمان أو المكان صار الفاعل بعد الفعل: «اليوم أتعلّم الألمانية» تُقال **Heute lerne ich Deutsch**، لا Heute ich lerne.',
    wrong: 'Heute ich lerne Deutsch.',
    correct: 'Heute lerne ich Deutsch.',
  },
  {
    id: 'nicht-kein',
    lessonIds: ['a1-m07-l01'],
    titleAr: 'نفيان في الألمانية',
    bodyAr:
      'تستعمل العربية «لا» و«ليس» و«ما»، أما الألمانية فتفرّق: **kein** ينفي الاسم الذي كان سيأتي مع ein أو بلا أداة («ليس عندي سيارة» = Ich habe **kein** Auto)، و**nicht** ينفي الفعل والصفة («لا أعمل» = Ich arbeite **nicht**).',
    wrong: 'Ich habe nicht Auto.',
    correct: 'Ich habe kein Auto.',
  },
  {
    id: 'subordinate-verb-last',
    lessonIds: ['a2-m03-l01'],
    titleAr: 'الفعل في آخر الجملة الفرعية',
    bodyAr:
      'بعد **weil** و**dass** و**wenn** يذهب الفعل المصرَّف إلى نهاية الجملة. ولا مقابل لهذا في العربية: «لأنني مريض» تُقال **weil ich krank bin**، فيبقى bin في الآخر.',
    wrong: 'Ich bleibe zu Hause, weil ich bin krank.',
    correct: 'Ich bleibe zu Hause, weil ich krank bin.',
  },
  {
    id: 'sound-p-b',
    lessonIds: ['a1-m01-l03'],
    titleAr: 'P وB: لا صوت /p/ في العربية الفصحى',
    bodyAr:
      'العربية الفصحى فيها الباء /b/ فقط، فيختلط عليك P وB. الـ **P** صوت انفجاري مهموس يخرج معه نَفَس: ضع كفّك أمام فمك وانطق Pass، فتشعر بالهواء، ولا يحدث ذلك مع Bass.',
    examples: ['Pass', 'Bass', 'Pier', 'Bier', 'Paar', 'Bar'],
  },
  {
    id: 'sound-w-v',
    lessonIds: ['a1-m01-l03'],
    titleAr: 'W ليست «و»، وV غالباً «ف»',
    bodyAr:
      'حرف **W** في الألمانية يُنطق /v/: أسنان عليا على الشفة السفلى مع اهتزاز الصوت، كما في Wasser وWein، وليس «و». أما **V** فتُنطق غالباً /f/ كالفاء: Vater وviel وvier. وفي بعض الكلمات المأخوذة من لغات أخرى تُنطق /v/ مثل Vase.',
    examples: ['Wasser', 'Wein', 'Vater', 'viel', 'vier', 'Vase'],
  },
  {
    id: 'sound-umlauts',
    lessonIds: ['a1-m01-l03'],
    titleAr: 'ü وö: صوتان لا يوجدان في العربية',
    bodyAr:
      'العربية فيها ثلاث حركات فقط (a وi وu). **ü**: انطق «ي» (i) ثم دوّر شفتيك كأنك ستنطق «و» دون أن تحرّك لسانك. **ö**: انطق e مغلقة وشفتاك مدوّرتان. والفرق مهم في المعنى: schon ≠ schön.',
    examples: ['schon', 'schön', 'Tor', 'Tür', 'Ofen', 'Öfen'],
  },
  {
    id: 'sound-ch',
    lessonIds: ['a1-m01-l03'],
    titleAr: 'لـ ch صوتان',
    bodyAr:
      'بعد a وo وu وau (ach, Buch, auch) يُنطق **ch** قريباً من «خ». وبعد بقية الحروف (ich, Milch, Mädchen, nicht) يُنطق صوتاً احتكاكياً ناعماً لا مقابل له في العربية، فلا تنطقه خاءً ولا شيناً: ضع لسانك كما لنطق «ي» ثم أخرج الهواء بحفيف.',
    examples: ['ach', 'ich', 'Buch', 'Bücher', 'Nacht', 'Nächte'],
  },
  {
    id: 'sound-clusters',
    lessonIds: ['a1-m01-l03'],
    titleAr: 'حرفان ساكنان في أول الكلمة',
    bodyAr:
      'لا تبدأ الكلمة العربية بساكنين، فيميل المتعلّم إلى إدخال حركة بينهما، فتصير Straße «إستراسه». انطق الحروف متصلة من غير حركة: **Str**-aße، **Schr**-eiben، **Pfl**-anze، **Zw**-ei.',
    examples: ['Straße', 'schreiben', 'Pflanze', 'zwei', 'Stuhl'],
  },
]

/** The notes that belong to a lesson, in the order written. */
export function getContrastiveNotes(lessonId: string): ContrastiveNote[] {
  return CONTRASTIVE_NOTES.filter((note) => note.lessonIds.includes(lessonId))
}
