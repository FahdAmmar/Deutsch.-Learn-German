import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, verb } from './builders'

export const lessonGefuehle: Lesson = defineTheme({
  number: 11,
  slug: 'gefuehle-und-charakter',
  title: 'Gefühle und Charakter',
  titleAr: 'المشاعر والطباع',
  categoryAr: 'المشاعر والطباع',
  objectivesAr: [
    'التعبير عن مشاعرك بالصفات (sein) وبالأسماء (haben)',
    'استعمال حروف الجر الثابتة: Angst haben vor وsich Sorgen machen um وsich ärgern über',
    'وصف طباع الناس: freundlich وehrlich وfleißig وmutig',
    'التحدث عن الضحك والبكاء والاشتياق',
  ],
  explanation: [
    {
      titleAr: 'sein مع الصفة وhaben مع الاسم',
      bodyAr:
        'بعض المشاعر صفات تُستعمل مع sein: «Ich bin nervös»، «Ich bin glücklich». وبعضها أسماء تُستعمل مع haben: «Ich habe Angst»، «Ich habe Stress»، «Ich habe Geduld». المتكلم بالعربية يقول «أنا خائف» فيُخطئ فيقول «Ich bin Angst»، والصحيح «Ich habe Angst».',
    },
    {
      titleAr: 'حروف الجر الثابتة مع المشاعر',
      bodyAr:
        'تُحفظ هذه التراكيب كوحدات: «Angst haben vor + Dativ» (Ich habe Angst vor Hunden)، «sich Sorgen machen um + Akkusativ» (Ich mache mir Sorgen um meine Mutter)، «sich ärgern über + Akkusativ» (Ich ärgere mich über den Lärm). لا تحاول ترجمة حرف الجر من العربية، فهو غير متطابق.',
    },
  ],
  examples: [
    { de: 'Ich habe Angst vor Hunden.', ar: 'أخاف من الكلاب.' },
    { de: 'Ich bin heute sehr nervös.', ar: 'أنا متوتّر جداً اليوم.' },
    { de: 'Ich mache mir Sorgen um meine Mutter.', ar: 'أشعر بالقلق على أمي.' },
    { de: 'Mein Bruder ist immer ehrlich.', ar: 'أخي صادق دائماً.' },
    { de: 'Ich vermisse meine Familie.', ar: 'أشتاق إلى عائلتي.' },
  ],
  words: [
    nounNoPlural('die', 'Freude', 'الفرح', 'Das Lernen macht mir Freude.', 'التعلّم يسعدني.'),
    noun('die', 'Angst', 'Ängste', 'الخوف', 'Ich habe Angst vor Hunden.', 'أخاف من الكلاب.'),
    nounNoPlural('der', 'Ärger', 'الانزعاج (المشكلة)', 'Ich habe Ärger mit meinem Chef.', 'عندي مشكلة مع مديري.'),
    noun('die', 'Sorge', 'Sorgen', 'القلق (الهمّ)', 'Ich mache mir Sorgen um meine Mutter.', 'أشعر بالقلق على أمي.'),
    nounNoPlural('der', 'Stress', 'التوتّر (الضغط)', 'Im Büro habe ich viel Stress.', 'عندي ضغط كبير في المكتب.'),
    nounNoPlural('die', 'Geduld', 'الصبر', 'Du brauchst viel Geduld.', 'تحتاج إلى صبر كبير.'),
    adjective('glücklich', 'سعيد', 'Ich bin sehr glücklich.', 'أنا سعيد جداً.'),
    adjective('traurig', 'حزين', 'Warum bist du so traurig?', 'لماذا أنت حزين هكذا؟'),
    adjective('nervös', 'متوتّر', 'Ich bin heute sehr nervös.', 'أنا متوتّر جداً اليوم.'),
    adjective('wütend', 'غاضب', 'Er ist wütend auf seinen Bruder.', 'هو غاضب من أخيه.'),
    adjective('überrascht', 'متفاجئ', 'Wir sind überrascht.', 'نحن متفاجئون.'),
    adjective('zufrieden', 'راضٍ', 'Ich bin mit meiner Arbeit zufrieden.', 'أنا راضٍ عن عملي.'),
    adjective('enttäuscht', 'خائب الأمل', 'Sie ist von dem Ergebnis enttäuscht.', 'هي خائبة الأمل من النتيجة.'),
    adjective('einsam', 'وحيد (يشعر بالوحدة)', 'In der neuen Stadt fühle ich mich einsam.', 'أشعر بالوحدة في المدينة الجديدة.'),
    adjective('freundlich', 'ودود', 'Mein Nachbar ist sehr freundlich.', 'جاري ودود جداً.'),
    adjective('höflich', 'مهذّب', 'Die Kinder sind immer höflich.', 'الأطفال مهذّبون دائماً.'),
    adjective('ehrlich', 'صادق', 'Mein Bruder ist immer ehrlich.', 'أخي صادق دائماً.'),
    adjective('fleißig', 'مجتهد', 'Meine Schwester ist sehr fleißig.', 'أختي مجتهدة جداً.'),
    adjective('faul', 'كسول', 'Am Sonntag bin ich faul.', 'يوم الأحد أكون كسولاً.'),
    adjective('mutig', 'شجاع', 'Das war sehr mutig von dir.', 'كان ذلك شجاعاً جداً منك.'),
    adjective('sympathisch', 'محبوب (لطيف المعشر)', 'Dein Freund ist sehr sympathisch.', 'صديقك لطيف جداً.'),
    verb('lachen', 'يضحك', { praeteritum: 'lachte', partizip: 'gelacht', auxiliary: 'haben' }, 'Wir lachen viel zusammen.', 'نضحك كثيراً معاً.'),
    verb('weinen', 'يبكي', { praeteritum: 'weinte', partizip: 'geweint', auxiliary: 'haben' }, 'Das Kind weint.', 'الطفل يبكي.'),
    verb('sich ärgern', 'يغضب (ينزعج)', { praeteritum: 'ärgerte', partizip: 'geärgert', auxiliary: 'haben' }, 'Ich ärgere mich über den Lärm.', 'أنزعج من الضجيج.'),
    verb('lieben', 'يحبّ (بعمق)', { praeteritum: 'liebte', partizip: 'geliebt', auxiliary: 'haben' }, 'Ich liebe meine Familie.', 'أحبّ عائلتي.'),
    verb('vermissen', 'يشتاق إلى', { praeteritum: 'vermisste', partizip: 'vermisst', auxiliary: 'haben' }, 'Ich vermisse meine Familie.', 'أشتاق إلى عائلتي.'),
    verb('sich langweilen', 'يشعر بالملل', { praeteritum: 'langweilte', partizip: 'gelangweilt', auxiliary: 'haben' }, 'Ich langweile mich im Unterricht.', 'أشعر بالملل في الدرس.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich bin Angst.',
      correct: 'Ich habe Angst.',
      explanationAr: 'Angst اسم يُستعمل مع haben. ولا تقل «Ich bin Angst» لأن معناها «أنا خوف».',
    },
    {
      wrong: 'Ich ärgere mich auf ihn.',
      correct: 'Ich ärgere mich über ihn.',
      explanationAr: 'sich ärgern يأخذ حرف الجر über + Akkusativ، ولا يُستعمل معه auf.',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ch في freundlich وehrlich وglücklich',
      bodyAr: 'بعد i وe وü وl وn يُنطق ch ناعماً (ich-Laut): صوت بين «ش» و«خ» مع احتكاك خفيف في مقدّمة الفم، وهو غير «خ» العربية.',
      example: 'freundlich',
    },
  ],
})
