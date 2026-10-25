import type { Dialogue } from '@/types'

export const conversationArzttermin: Dialogue = {
  id: 'dialogue-a2-arzttermin',
  level: 'A2',
  moduleId: 'a2-m12',
  titleDe: 'Einen Arzttermin vereinbaren',
  titleAr: 'حجز موعد عند الطبيب',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Praxis', de: 'Praxis Dr. Berger, guten Tag.', ar: 'عيادة الدكتور برغر، مرحبًا.' },
    { speaker: 'b', name: 'Frau Yilmaz', de: 'Guten Tag, hier ist Yilmaz. Ich möchte gern einen Termin vereinbaren.', ar: 'مرحبًا، معك يلماز. أودّ حجز موعد.' },
    { speaker: 'a', name: 'Praxis', de: 'Worum geht es denn?', ar: 'ما الأمر؟' },
    { speaker: 'b', name: 'Frau Yilmaz', de: 'Ich habe seit drei Tagen starke Rückenschmerzen. Ich kann kaum schlafen.', ar: 'عندي منذ ثلاثة أيام آلام شديدة في الظهر. بالكاد أستطيع النوم.' },
    { speaker: 'a', name: 'Praxis', de: 'Das tut mir leid. Können Sie heute Nachmittag kommen?', ar: 'يؤسفني ذلك. هل يمكنك المجيء بعد ظهر اليوم؟' },
    { speaker: 'b', name: 'Frau Yilmaz', de: 'Heute geht es leider nicht, weil ich arbeiten muss. Haben Sie morgen Vormittag Zeit?', ar: 'اليوم لا يناسبني للأسف لأن عليّ أن أعمل. هل عندكم وقت صباح الغد؟' },
    { speaker: 'a', name: 'Praxis', de: 'Morgen um halb zehn ist noch ein Termin frei.', ar: 'غدًا في التاسعة والنصف يوجد موعد شاغر.' },
    { speaker: 'b', name: 'Frau Yilmaz', de: 'Das passt gut. Muss ich etwas mitbringen?', ar: 'هذا مناسب. هل عليّ أن أحضر شيئًا؟' },
    { speaker: 'a', name: 'Praxis', de: 'Bitte bringen Sie Ihre Gesundheitskarte mit. Das ist die Karte Ihrer Krankenkasse.', ar: 'من فضلك أحضري بطاقتك الصحية (Gesundheitskarte). وهي بطاقة شركة التأمين الصحي الخاصة بك.' },
    { speaker: 'b', name: 'Frau Yilmaz', de: 'Das ist kein Problem. Soll ich früher kommen?', ar: 'لا مشكلة في ذلك. هل أحضر قبل الموعد؟' },
    { speaker: 'a', name: 'Praxis', de: 'Ja, bitte seien Sie zehn Minuten vorher da.', ar: 'نعم، من فضلك كوني هنا قبل الموعد بعشر دقائق.' },
    { speaker: 'b', name: 'Frau Yilmaz', de: 'Gut, dann bis morgen. Vielen Dank!', ar: 'حسنًا، إذن إلى الغد. شكرًا جزيلًا!' },
    { speaker: 'a', name: 'Praxis', de: 'Gern. Gute Besserung, Frau Yilmaz!', ar: 'عفوًا. الشفاء العاجل يا سيدة يلماز!' },
  ],
}
