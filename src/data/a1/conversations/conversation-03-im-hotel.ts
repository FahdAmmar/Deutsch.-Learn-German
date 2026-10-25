import type { Dialogue } from '@/types'

export const conversationImHotel: Dialogue = {
  id: 'dialogue-a1-im-hotel',
  level: 'A1',
  moduleId: 'a1-m04',
  titleDe: 'Im Hotel',
  titleAr: 'تسجيل الوصول في الفندق',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Rezeption', de: 'Guten Abend! Willkommen im Hotel Sonne.', ar: 'مساء الخير! أهلًا بكم في فندق الشمس (Sonne).' },
    { speaker: 'b', name: 'Frau Nour', de: 'Guten Abend. Ich habe ein Zimmer reserviert. Mein Name ist Nour.', ar: 'مساء الخير. لقد حجزتُ غرفة. اسمي نور.' },
    { speaker: 'a', name: 'Rezeption', de: 'Einen Moment, bitte. Ja, ein Einzelzimmer für drei Nächte. Stimmt das?', ar: 'لحظة من فضلك. نعم، غرفة فردية لثلاث ليالٍ. هل هذا صحيح؟' },
    { speaker: 'b', name: 'Frau Nour', de: 'Ja, das stimmt. Hat das Zimmer ein Bad?', ar: 'نعم، هذا صحيح. هل في الغرفة حمّام؟' },
    { speaker: 'a', name: 'Rezeption', de: 'Ja, mit Dusche und WC. Das Zimmer hat auch einen Balkon.', ar: 'نعم، مع دش ومرحاض. وللغرفة شرفة أيضًا.' },
    { speaker: 'b', name: 'Frau Nour', de: 'Wunderbar. Wann gibt es Frühstück?', ar: 'رائع. متى يُقدَّم الفطور؟' },
    { speaker: 'a', name: 'Rezeption', de: 'Das Frühstück ist von sieben bis zehn Uhr im Restaurant neben der Rezeption.', ar: 'الفطور من السابعة إلى العاشرة في المطعم بجانب الاستقبال.' },
    { speaker: 'b', name: 'Frau Nour', de: 'Danke. Gibt es hier WLAN?', ar: 'شكرًا. هل يوجد واي فاي هنا؟' },
    { speaker: 'a', name: 'Rezeption', de: 'Ja, das WLAN ist kostenlos. Hier ist Ihr Schlüssel. Ihr Zimmer ist die Nummer vierundzwanzig.', ar: 'نعم، الواي فاي مجاني. هذا مفتاحك. غرفتك رقم أربعة وعشرين.' },
    { speaker: 'b', name: 'Frau Nour', de: 'Vielen Dank. Gute Nacht!', ar: 'شكرًا جزيلًا. تصبحون على خير!' },
  ],
}
