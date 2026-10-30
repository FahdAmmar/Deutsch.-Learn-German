import type { Lesson } from '@/types'

import { adjective, adverb, defineTheme, noun, verb } from './builders'

export const lessonZeit: Lesson = defineTheme({
  number: 12,
  slug: 'zeit-und-ablauf',
  title: 'Zeit und Ablauf',
  titleAr: 'الوقت وتسلسل الأحداث',
  categoryAr: 'الوقت والتسلسل',
  objectivesAr: [
    'ترتيب الأحداث بـ zuerst وdanach وschließlich وendlich',
    'وضع الفعل في المرتبة الثانية بعد ظرف الزمان الذي يفتتح الجملة',
    'التعبير عن أوقات اليوم: am Vormittag وam Nachmittag وin der Nacht',
    'الحديث عن المواعيد والتأخر: pünktlich وsich verspäten وsich verabreden',
  ],
  explanation: [
    {
      titleAr: 'zuerst وdanach وschließlich: الفعل ثانياً دائماً',
      bodyAr:
        'حين تفتتح الجملة بظرف زمان، يأتي الفعل المصرَّف في المرتبة الثانية ويتأخر الفاعل بعده: «Zuerst trinke ich Kaffee. Danach gehe ich zur Arbeit. Schließlich komme ich am Abend nach Hause.» لا تقل «Zuerst ich trinke»، فهذه عبارة خاطئة. والقاعدة نفسها مع «dann» و«heute» و«morgen» و«später».',
    },
    {
      titleAr: 'endlich وschließlich: الفرق',
      bodyAr:
        '«endlich» تُقال حين تنتظر شيئاً طويلاً وجاء أخيراً، وفيها ارتياح: «Endlich ist Freitag!». أما «schließlich» فتصف آخر خطوة في تسلسل أو النتيجة بعد مراحل: «Schließlich haben wir ein Taxi genommen» (وفي النهاية أخذنا سيارة أجرة).',
    },
    {
      titleAr: 'أوقات اليوم: am أم in der',
      bodyAr:
        'مع الصباح والظهيرة والمساء تستعمل am: «am Vormittag»، «am Nachmittag»، «am Abend». أما الليل فيُستثنى: «in der Nacht»، وللمنتصف الدقيق: «um Mitternacht». وهذا من الاستثناءات التي تُحفظ كما هي.',
    },
  ],
  examples: [
    { de: 'Zuerst trinke ich Kaffee, danach gehe ich zur Arbeit.', ar: 'أولاً أشرب القهوة ثم أذهب إلى العمل.' },
    { de: 'Am Nachmittag gehe ich ins Schwimmbad.', ar: 'بعد الظهر أذهب إلى المسبح.' },
    { de: 'Endlich ist Freitag!', ar: 'أخيراً حلّ يوم الجمعة!' },
    { de: 'Bitte komm pünktlich!', ar: 'من فضلك، تعال في الموعد!' },
    { de: 'Der Film dauert zwei Stunden.', ar: 'يستغرق الفيلم ساعتين.' },
  ],
  words: [
    noun('der', 'Moment', 'Momente', 'اللحظة', 'Einen Moment, bitte.', 'لحظة من فضلك.'),
    noun('der', 'Anfang', 'Anfänge', 'البداية', 'Am Anfang war alles neu.', 'في البداية كان كل شيء جديداً.'),
    noun('das', 'Ende', 'Enden', 'النهاية', 'Am Ende bin ich sehr müde.', 'في النهاية أكون متعباً جداً.'),
    noun('der', 'Vormittag', 'Vormittage', 'ما قبل الظهر', 'Am Vormittag habe ich Unterricht.', 'قبل الظهر عندي دروس.'),
    noun('der', 'Nachmittag', 'Nachmittage', 'ما بعد الظهر', 'Am Nachmittag gehe ich ins Schwimmbad.', 'بعد الظهر أذهب إلى المسبح.'),
    noun('die', 'Nacht', 'Nächte', 'الليل', 'In der Nacht schlafe ich tief.', 'أنام نوماً عميقاً في الليل.'),
    noun('die', 'Mitternacht', 'Mitternächte', 'منتصف الليل', 'Um Mitternacht gehen wir nach Hause.', 'عند منتصف الليل نذهب إلى المنزل.'),
    noun('die', 'Verabredung', 'Verabredungen', 'موعد (لقاء اجتماعي)', 'Ich habe heute Abend eine Verabredung.', 'عندي موعد مع أحدهم هذا المساء.'),
    noun('der', 'Kalender', 'Kalender', 'التقويم', 'Ich schreibe den Termin in meinen Kalender.', 'أكتب الموعد في تقويمي.'),
    adverb('jetzt', 'الآن', 'Ich komme jetzt.', 'أنا قادم الآن.'),
    adverb('gerade', 'الآن (في هذه اللحظة) / للتوّ', 'Ich esse gerade.', 'أنا آكل الآن.'),
    adverb('sofort', 'فوراً', 'Komm bitte sofort!', 'تعال فوراً من فضلك!'),
    adverb('plötzlich', 'فجأة', 'Plötzlich ist das Licht aus.', 'فجأة انطفأ الضوء.'),
    adverb('später', 'لاحقاً', 'Ich rufe dich später an.', 'سأتصل بك لاحقاً.'),
    adverb('zuerst', 'أولاً', 'Zuerst trinke ich Kaffee.', 'أولاً أشرب القهوة.'),
    adverb('danach', 'بعد ذلك', 'Danach gehe ich zur Arbeit.', 'بعد ذلك أذهب إلى العمل.'),
    adverb('schließlich', 'في النهاية', 'Schließlich haben wir ein Taxi genommen.', 'وفي النهاية أخذنا سيارة أجرة.'),
    adverb('endlich', 'أخيراً (بعد انتظار)', 'Endlich ist Freitag!', 'أخيراً حلّ يوم الجمعة!'),
    adverb('täglich', 'يومياً', 'Ich lerne täglich eine Stunde.', 'أدرس كل يوم ساعة.'),
    adverb('früh', 'مبكراً', 'Ich stehe jeden Tag früh auf.', 'أستيقظ مبكراً كل يوم.'),
    adverb('spät', 'متأخراً', 'Wir kommen heute spät nach Hause.', 'نصل إلى المنزل متأخرين اليوم.'),
    adverb('lange', 'طويلاً (لمدة طويلة)', 'Wie lange wartest du schon?', 'منذ متى تنتظر؟'),
    adjective('pünktlich', 'في الموعد (دقيق)', 'Bitte komm pünktlich!', 'من فضلك، تعال في الموعد!'),
    adverb('rechtzeitig', 'في الوقت المناسب', 'Wir sind rechtzeitig angekommen.', 'وصلنا في الوقت المناسب.'),
    verb('dauern', 'يستغرق', { praeteritum: 'dauerte', partizip: 'gedauert', auxiliary: 'haben' }, 'Der Film dauert zwei Stunden.', 'يستغرق الفيلم ساعتين.'),
    verb('sich verspäten', 'يتأخر', { praeteritum: 'verspätete', partizip: 'verspätet', auxiliary: 'haben' }, 'Ich verspäte mich leider.', 'سأتأخر للأسف.'),
    verb('sich verabreden', 'يتّفق على لقاء', { praeteritum: 'verabredete', partizip: 'verabredet', auxiliary: 'haben' }, 'Wir verabreden uns für Samstag.', 'نتّفق على لقاء يوم السبت.'),
  ],
  commonMistakes: [
    {
      wrong: 'Zuerst ich trinke Kaffee.',
      correct: 'Zuerst trinke ich Kaffee.',
      explanationAr: 'بعد ظرف الزمان الذي يفتتح الجملة يأتي الفعل المصرَّف في المرتبة الثانية، ثم الفاعل.',
    },
    {
      wrong: 'Am Nacht schlafe ich.',
      correct: 'In der Nacht schlafe ich.',
      explanationAr: 'الليل استثناء: «in der Nacht»، بينما بقية أوقات اليوم تأخذ am: am Morgen، am Abend. ويمكنك أيضاً قول «nachts».',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ch وsch في später وschließlich',
      bodyAr: 'schließlich تبدأ بـ sch «ش» وتنتهي بـ ch ناعم (ich-Laut). وفي später يُنطق sp «شب» لأنه في أول المقطع بعد البادئة.',
      example: 'schließlich',
    },
  ],
})
