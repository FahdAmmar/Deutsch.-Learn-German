import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, nounPluralOnly, verb } from './builders'

export const lessonArbeit: Lesson = defineTheme({
  number: 1,
  slug: 'arbeit-und-beruf',
  title: 'Arbeit und Beruf',
  titleAr: 'العمل والمهنة',
  categoryAr: 'العمل والمهنة',
  objectivesAr: [
    'التفريق بين Arbeit وBeruf وStelle واستعمال كلٍّ منها في موضعه',
    'قول أين ولدى من تعمل: als للمهنة وbei لجهة العمل وin لمكان العمل',
    'فهم مفردات يوم العمل: الزملاء والاجتماعات والاستراحة وساعات الدوام',
    'الحديث عن البحث عن وظيفة والتقدّم إليها والاستقالة منها',
  ],
  explanation: [
    {
      titleAr: 'Arbeit وBeruf وStelle: ثلاث كلمات لثلاثة معانٍ',
      bodyAr:
        '«die Arbeit» هي النشاط نفسه أو مكانه: «Ich gehe zur Arbeit» (أذهب إلى العمل). «der Beruf» هو المهنة التي تعلّمتها وتمارسها: «Was sind Sie von Beruf؟» (ما مهنتكم؟). «die Stelle» هي الوظيفة المحدّدة التي تبحث عنها أو تشغلها: «Ich suche eine Stelle». أما «der Arbeitsplatz» فهو مكان العمل، ويُستعمل أيضاً بمعنى فرصة العمل.',
    },
    {
      titleAr: 'als وbei وin: مهنتك وجهة عملك ومكانه',
      bodyAr:
        'للمهنة استعمل «als» دون أداة تعريف أو تنكير: «Er arbeitet als Verkäufer» (يعمل بائعاً). لجهة العمل استعمل «bei» + Dativ: «Ich arbeite bei einer Firma». ولمكان العمل المادي استعمل «in» + Dativ: «Ich arbeite in einem Büro». ويلزم الانتباه إلى أن اسم المهنة بعد sein وals يأتي بلا أداة: «Ich bin Lehrer».',
    },
  ],
  examples: [
    { de: 'Ich arbeite bei einer Firma in Berlin.', ar: 'أعمل في شركة في برلين.' },
    { de: 'Er arbeitet als Verkäufer.', ar: 'يعمل بائعاً.' },
    { de: 'Die Besprechung beginnt um zehn Uhr.', ar: 'يبدأ الاجتماع في الساعة العاشرة.' },
    { de: 'Nach Feierabend treffe ich meine Kollegen.', ar: 'بعد انتهاء الدوام ألتقي زملائي.' },
    { de: 'Wie lange arbeitest du schon hier?', ar: 'منذ متى تعمل هنا؟' },
  ],
  words: [
    nounNoPlural('die', 'Arbeit', 'العمل', 'Ich gehe jeden Tag zur Arbeit.', 'أذهب إلى العمل كل يوم.'),
    noun('der', 'Arbeitsplatz', 'Arbeitsplätze', 'مكان العمل / الوظيفة', 'Mein Arbeitsplatz ist im Zentrum.', 'مكان عملي في وسط المدينة.'),
    noun('der', 'Kollege', 'Kollegen', 'الزميل', 'Meine Kollegen sind sehr nett.', 'زملائي لطفاء جداً.'),
    noun('der', 'Chef', 'Chefs', 'المدير (الرئيس)', 'Mein Chef ist heute nicht im Büro.', 'مديري ليس في المكتب اليوم.'),
    noun('das', 'Büro', 'Büros', 'المكتب', 'Ich arbeite in einem Büro.', 'أعمل في مكتب.'),
    noun('die', 'Firma', 'Firmen', 'الشركة', 'Er arbeitet bei einer Firma in München.', 'يعمل في شركة في ميونخ.'),
    noun('die', 'Stelle', 'Stellen', 'الوظيفة (الشاغرة)', 'Ich suche eine Stelle als Verkäufer.', 'أبحث عن وظيفة بائع.'),
    noun('der', 'Vertrag', 'Verträge', 'العقد', 'Ich habe den Vertrag unterschrieben.', 'وقّعتُ العقد.'),
    noun('die', 'Besprechung', 'Besprechungen', 'الاجتماع', 'Wir haben um zehn Uhr eine Besprechung.', 'لدينا اجتماع في الساعة العاشرة.'),
    noun('die', 'Pause', 'Pausen', 'الاستراحة', 'Wir machen um zwölf Uhr Pause.', 'نأخذ استراحة في الساعة الثانية عشرة.'),
    nounNoPlural('der', 'Feierabend', 'نهاية الدوام', 'Nach Feierabend gehe ich schwimmen.', 'بعد انتهاء الدوام أذهب للسباحة.'),
    nounPluralOnly('Überstunden', 'ساعات العمل الإضافية', 'Diese Woche habe ich viele Überstunden gemacht.', 'هذا الأسبوع عملتُ ساعات إضافية كثيرة.'),
    noun('der', 'Kunde', 'Kunden', 'الزبون', 'Der Kunde wartet an der Kasse.', 'الزبون ينتظر عند الصندوق.'),
    noun('der', 'Mitarbeiter', 'Mitarbeiter', 'الموظف', 'Die Firma hat zwanzig Mitarbeiter.', 'للشركة عشرون موظفاً.'),
    noun('die', 'Arbeitszeit', 'Arbeitszeiten', 'ساعات الدوام', 'Meine Arbeitszeit ist von acht bis siebzehn Uhr.', 'دوامي من الثامنة صباحاً إلى الخامسة مساءً.'),
    noun('der', 'Verkäufer', 'Verkäufer', 'البائع', 'Mein Bruder arbeitet als Verkäufer.', 'أخي يعمل بائعاً.'),
    verb('verdienen', 'يكسب (مالاً)', { praeteritum: 'verdiente', partizip: 'verdient', auxiliary: 'haben' }, 'Sie verdient gut.', 'دخلها جيد.'),
    verb('kündigen', 'يستقيل / يفسخ العقد', { praeteritum: 'kündigte', partizip: 'gekündigt', auxiliary: 'haben' }, 'Er hat seine Stelle gekündigt.', 'استقال من وظيفته.'),
    verb(
      'sich bewerben',
      'يتقدّم لوظيفة',
      { present: ['bewerbe', 'bewirbst', 'bewirbt', 'bewerben', 'bewerbt', 'bewerben'], praeteritum: 'bewarb', partizip: 'beworben', auxiliary: 'haben' },
      'Ich bewerbe mich um eine Stelle als Lehrer.',
      'أتقدّم لوظيفة معلّم.',
    ),
    verb('beginnen', 'يبدأ', { praeteritum: 'begann', partizip: 'begonnen', auxiliary: 'haben' }, 'Die Arbeit beginnt um acht Uhr.', 'يبدأ العمل في الساعة الثامنة.'),
    adjective('berufstätig', 'يعمل (لديه وظيفة)', 'Meine Mutter ist berufstätig.', 'أمي تعمل (لديها وظيفة).'),
    adjective('arbeitslos', 'عاطل عن العمل', 'Er ist seit drei Monaten arbeitslos.', 'هو عاطل عن العمل منذ ثلاثة أشهر.'),
    adjective('zuständig', 'مسؤول / مختصّ', 'Wer ist dafür zuständig?', 'من المسؤول عن ذلك؟'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich bin ein Lehrer.',
      correct: 'Ich bin Lehrer.',
      explanationAr: 'اسم المهنة بعد sein وals يأتي بلا أداة تنكير في الألمانية، على عكس ما قد يفعله المتكلم بالعربية أو الإنجليزية.',
    },
    {
      wrong: 'Ich gehe zu Arbeit.',
      correct: 'Ich gehe zur Arbeit.',
      explanationAr: 'zu + der تندمجان في «zur» لأن Arbeit مؤنث: «zur Arbeit».',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ü في Büro وÜberstunden',
      bodyAr: 'لا يوجد في العربية صوت ü. انطق حرف «ي» الطويل (ee) وأنت تدوّر شفتيك كأنك ستقول «و»، فيخرج صوت ü.',
      example: 'Büro',
    },
  ],
})
