import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, phrase, verb } from './builders'

export const lessonVerkehrsmittel: Lesson = defineTheme({
  number: 5,
  slug: 'verkehrsmittel-und-fahrkarten',
  title: 'Verkehrsmittel und Fahrkarten',
  titleAr: 'وسائل النقل والتذاكر',
  categoryAr: 'وسائل النقل',
  objectivesAr: [
    'تسمية وسائل النقل مع mit + Dativ وzu Fuß',
    'شراء تذكرة: Eine Fahrkarte nach … Einfach oder hin und zurück؟',
    'فهم الأفعال المنفصلة في النقل: einsteigen، aussteigen، umsteigen، abfahren',
  ],
  explanation: [
    {
      titleAr: 'mit + وسيلة النقل',
      bodyAr:
        'لوسيلة النقل نستعمل **mit** ثم أداة في حالة Dativ: **mit dem Bus، mit dem Zug، mit dem Auto، mit dem Fahrrad** (للمذكر والمحايد: dem)، و**mit der U-Bahn** (للمؤنث: der). وللمشي نقول **zu Fuß** بلا أداة. أما الطائرة فنقول: **Ich fliege nach Berlin.** أو mit dem Flugzeug.',
    },
    {
      titleAr: 'شراء تذكرة',
      bodyAr:
        'عند الشباك أو الماكينة: **Eine Fahrkarte nach Hamburg, bitte.** يسألك الموظف: **Einfach oder hin und zurück؟** (ذهاب فقط أم ذهاب وإياب؟). ثم تسمع **Das macht vierzig Euro.** والقطار يغادر من **Gleis drei** (الرصيف 3).',
    },
    {
      titleAr: 'أفعال الرحلة المنفصلة',
      bodyAr:
        'كثير من أفعال النقل **منفصلة**: **Der Zug fährt um 9.15 Uhr ab.** (abfahren). **Wir steigen in Köln um.** (umsteigen). **Ich steige hier aus.** (aussteigen). **Bitte einsteigen!** (einsteigen). البادئة (ab، um، aus، ein) تذهب إلى آخر الجملة. والكلمات المفيدة: **die Abfahrt** (المغادرة)، **die Ankunft** (الوصول)، **die Verspätung** (التأخر).',
    },
  ],
  examples: [
    { de: 'Ich fahre mit dem Bus zur Arbeit.', ar: 'أذهب إلى العمل بالحافلة.' },
    { de: 'Meine Schwester fährt mit der U-Bahn.', ar: 'أختي تركب المترو.' },
    { de: 'Wir gehen zu Fuß zur Schule.', ar: 'نمشي إلى المدرسة على الأقدام.' },
    { de: 'Eine Fahrkarte nach Hamburg, bitte.', ar: 'تذكرة إلى هامبورغ من فضلك.' },
    { de: 'Einfach oder hin und zurück?', ar: 'ذهاب فقط أم ذهاب وإياب؟' },
    { de: 'Der Zug fährt von Gleis drei ab.', ar: 'القطار يغادر من الرصيف الثالث.' },
    { de: 'In Köln müssen wir umsteigen.', ar: 'في كولن علينا أن نغيّر القطار.' },
    { de: 'Der Zug hat zehn Minuten Verspätung.', ar: 'القطار متأخر عشر دقائق.' },
  ],
  words: [
    noun('der', 'Zug', 'Züge', 'القطار', 'Der Zug fährt um neun Uhr ab.', 'القطار يغادر في الساعة التاسعة.'),
    noun('der', 'Bus', 'Busse', 'الحافلة', 'Ich fahre mit dem Bus zur Arbeit.', 'أذهب إلى العمل بالحافلة.'),
    noun('die', 'U-Bahn', 'U-Bahnen', 'المترو', 'Meine Schwester fährt mit der U-Bahn.', 'أختي تركب المترو.'),
    noun('das', 'Auto', 'Autos', 'السيارة', 'Mein Vater fährt ein altes Auto.', 'أبي يقود سيارة قديمة.'),
    noun('das', 'Fahrrad', 'Fahrräder', 'الدراجة', 'Ich fahre gern mit dem Fahrrad.', 'أحب ركوب الدراجة.'),
    noun('das', 'Flugzeug', 'Flugzeuge', 'الطائرة', 'Das Flugzeug landet um zehn Uhr.', 'تهبط الطائرة في الساعة العاشرة.'),
    noun('das', 'Taxi', 'Taxis', 'سيارة الأجرة', 'Wir nehmen ein Taxi.', 'نأخذ سيارة أجرة.'),
    noun('die', 'Fahrkarte', 'Fahrkarten', 'تذكرة السفر', 'Ich kaufe eine Fahrkarte.', 'أشتري تذكرة سفر.'),
    noun('das', 'Gleis', 'Gleise', 'الرصيف (للقطار)', 'Der Zug steht auf Gleis fünf.', 'القطار واقف على الرصيف الخامس.'),
    noun('die', 'Abfahrt', 'Abfahrten', 'المغادرة', 'Die Abfahrt ist um acht Uhr.', 'المغادرة في الساعة الثامنة.'),
    noun('die', 'Ankunft', 'Ankünfte', 'الوصول', 'Die Ankunft ist um zwölf Uhr.', 'الوصول في الساعة الثانية عشرة.'),
    noun('die', 'Verspätung', 'Verspätungen', 'التأخير', 'Der Zug hat zehn Minuten Verspätung.', 'القطار متأخر عشر دقائق.'),
    noun('der', 'Fahrplan', 'Fahrpläne', 'جدول المواعيد', 'Der Fahrplan hängt am Bahnhof.', 'جدول المواعيد معلّق في المحطة.'),
    verb(
      'abfahren',
      'يغادر (وسيلة نقل)',
      { present: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'], praeteritum: 'fuhr', partizip: 'abgefahren', auxiliary: 'sein', separablePrefix: 'ab' },
      'Der Zug fährt um neun Uhr ab.',
      'القطار يغادر في الساعة التاسعة.',
    ),
    verb('einsteigen', 'يصعد (إلى وسيلة نقل)', { praeteritum: 'stieg', partizip: 'eingestiegen', auxiliary: 'sein', separablePrefix: 'ein' }, 'Bitte steigen Sie hier ein.', 'من فضلكم اصعدوا من هنا.'),
    verb('aussteigen', 'ينزل (من وسيلة نقل)', { praeteritum: 'stieg', partizip: 'ausgestiegen', auxiliary: 'sein', separablePrefix: 'aus' }, 'Ich steige am Bahnhof aus.', 'أنزل عند المحطة.'),
    verb('umsteigen', 'يغيّر وسيلة النقل', { praeteritum: 'stieg', partizip: 'umgestiegen', auxiliary: 'sein', separablePrefix: 'um' }, 'In Köln steigen wir um.', 'في كولن نغيّر القطار.'),
    verb('fliegen', 'يطير / يسافر بالطائرة', { praeteritum: 'flog', partizip: 'geflogen', auxiliary: 'sein' }, 'Wir fliegen im Sommer nach Spanien.', 'نسافر بالطائرة إلى إسبانيا في الصيف.'),
    adjective('einfach', 'بسيط / ذهاب فقط', 'Einfach oder hin und zurück?', 'ذهاب فقط أم ذهاب وإياب؟'),
    phrase('zu Fuß', 'مشياً على الأقدام', 'Wir gehen zu Fuß zur Schule.', 'نمشي إلى المدرسة على الأقدام.'),
    phrase('hin und zurück', 'ذهاب وإياب', 'Eine Fahrkarte nach Köln, hin und zurück.', 'تذكرة إلى كولن ذهاباً وإياباً.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich fahre mit den Bus.',
      correct: 'Ich fahre mit dem Bus.',
      explanationAr: 'بعد mit تأتي حالة Dativ: der Bus → mit dem Bus.',
    },
    {
      wrong: 'Der Zug fährt um neun Uhr.',
      correct: 'Der Zug fährt um neun Uhr ab.',
      explanationAr: 'abfahren فعل منفصل: لا تنسَ البادئة ab في آخر الجملة.',
    },
  ],
})
