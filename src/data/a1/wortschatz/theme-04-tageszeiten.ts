import type { Lesson } from '@/types'

import { adverb, defineTheme, noun, nounNoPlural, phrase } from './builders'

export const lessonTageszeiten: Lesson = defineTheme({
  number: 4,
  slug: 'tageszeiten-und-zeitangaben',
  title: 'Tageszeiten und Zeitangaben',
  titleAr: 'أوقات اليوم وكلمات الزمن',
  categoryAr: 'أوقات اليوم',
  objectivesAr: [
    'تسمية أجزاء اليوم: Morgen، Vormittag، Mittag، Nachmittag، Abend، Nacht',
    'التفريق بين am Morgen وmorgens، وبين der Morgen (الصباح) وmorgen (غداً)',
    'قول heute Abend وmorgen früh وgestern Abend وübermorgen',
  ],
  explanation: [
    {
      titleAr: 'أجزاء اليوم',
      bodyAr:
        'تقسّم الألمانية اليوم هكذا (تقريباً): **der Morgen** (الصباح الباكر) ← **der Vormittag** (من التاسعة إلى الظهر) ← **der Mittag** (حول الظهر) ← **der Nachmittag** (بعد الظهر حتى المساء) ← **der Abend** (المساء) ← **die Nacht** (الليل). والحدود بينها ليست دقيقة بالساعة.',
    },
    {
      titleAr: 'morgens أم am Morgen؟',
      bodyAr:
        'الكلمات المنتهية بـ -s (**morgens، vormittags، mittags، nachmittags، abends، nachts**) تعني "عادةً في هذا الوقت": **Morgens trinke ich Tee.** (كل صباح). أما **am Morgen** فتشير غالباً إلى صباح محدد. ونقول أيضاً **heute Morgen** (هذا الصباح) و**heute Abend** (الليلة) و**gestern Abend** (مساء أمس).',
    },
    {
      titleAr: 'Morgen أم morgen؟',
      bodyAr:
        'الكلمتان تُكتبان بحرفين مختلفين: **der Morgen** بحرف كبير (الصباح)، و**morgen** بحرف صغير (غداً). **Morgen** اسم و**morgen** ظرف زمان. ونقول **morgen früh** (غداً صباحاً)، و**übermorgen** (بعد غد)، و**vorgestern** (أول أمس).',
    },
  ],
  examples: [
    { de: 'Morgens trinke ich Tee.', ar: 'في الصباح (عادةً) أشرب الشاي.' },
    { de: 'Vormittags arbeite ich, nachmittags lerne ich Deutsch.', ar: 'أعمل قبل الظهر وأتعلم الألمانية بعد الظهر.' },
    { de: 'Mittags esse ich mit meiner Familie.', ar: 'في الظهر أتناول الطعام مع عائلتي.' },
    { de: 'Heute Abend gehe ich ins Kino.', ar: 'الليلة أذهب إلى السينما.' },
    { de: 'Morgen früh habe ich einen Termin.', ar: 'غداً صباحاً عندي موعد.' },
    { de: 'Gestern Abend war ich müde.', ar: 'مساء أمس كنت متعباً.' },
    { de: 'Nachts schlafe ich acht Stunden.', ar: 'في الليل أنام ثماني ساعات.' },
    { de: 'Übermorgen fahre ich nach Hamburg.', ar: 'بعد غد أسافر إلى هامبورغ.' },
  ],
  words: [
    noun('der', 'Vormittag', 'Vormittage', 'ما قبل الظهر', 'Am Vormittag arbeite ich.', 'قبل الظهر أعمل.'),
    noun('der', 'Mittag', 'Mittage', 'الظهر', 'Zu Mittag essen wir Reis.', 'عند الظهر نأكل أرزاً.'),
    noun('der', 'Nachmittag', 'Nachmittage', 'بعد الظهر', 'Am Nachmittag lerne ich Deutsch.', 'بعد الظهر أتعلم الألمانية.'),
    noun('die', 'Nacht', 'Nächte', 'الليل', 'In der Nacht ist es ruhig.', 'في الليل يسود الهدوء.'),
    nounNoPlural('die', 'Mitternacht', 'منتصف الليل', 'Um Mitternacht schlafe ich.', 'في منتصف الليل أكون نائماً.'),
    adverb('morgens', 'في الصباح (عادةً)', 'Morgens trinke ich Tee.', 'في الصباح أشرب الشاي.'),
    adverb('vormittags', 'قبل الظهر (عادةً)', 'Vormittags arbeite ich.', 'قبل الظهر أعمل.'),
    adverb('mittags', 'عند الظهر (عادةً)', 'Mittags esse ich mit meiner Familie.', 'عند الظهر آكل مع عائلتي.'),
    adverb('nachmittags', 'بعد الظهر (عادةً)', 'Nachmittags lerne ich Deutsch.', 'بعد الظهر أتعلم الألمانية.'),
    adverb('abends', 'في المساء (عادةً)', 'Abends sehe ich fern.', 'في المساء أشاهد التلفاز.'),
    adverb('nachts', 'في الليل (عادةً)', 'Nachts schlafe ich acht Stunden.', 'في الليل أنام ثماني ساعات.'),
    adverb('morgen', 'غداً', 'Morgen habe ich Zeit.', 'غداً عندي وقت.'),
    adverb('übermorgen', 'بعد غد', 'Übermorgen fahre ich nach Hamburg.', 'بعد غد أسافر إلى هامبورغ.'),
    adverb('vorgestern', 'أول أمس', 'Vorgestern war ich im Kino.', 'أول أمس كنت في السينما.'),
    adverb('bald', 'قريباً', 'Bald ist Wochenende.', 'قريباً تأتي عطلة نهاية الأسبوع.'),
    phrase('heute Abend', 'الليلة / هذا المساء', 'Heute Abend gehe ich ins Kino.', 'الليلة أذهب إلى السينما.'),
    phrase('morgen früh', 'غداً صباحاً', 'Morgen früh habe ich einen Termin.', 'غداً صباحاً عندي موعد.'),
    phrase('gestern Abend', 'مساء أمس', 'Gestern Abend war ich müde.', 'مساء أمس كنت متعباً.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich gehe Morgen ins Kino.',
      correct: 'Ich gehe morgen ins Kino.',
      explanationAr: 'morgen بمعنى "غداً" ظرف زمان ويُكتب بحرف صغير. أما Morgen بحرف كبير فهو الصباح.',
    },
    {
      wrong: 'Ich trinke in dem Morgen Tee.',
      correct: 'Ich trinke morgens Tee.',
      explanationAr: 'للعادة اليومية نستعمل morgens (أو jeden Morgen).',
    },
  ],
})
