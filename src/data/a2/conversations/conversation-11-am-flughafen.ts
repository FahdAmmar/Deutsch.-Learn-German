import type { Dialogue } from '@/types'

export const conversationAmFlughafen: Dialogue = {
  id: 'dialogue-a2-am-flughafen',
  level: 'A2',
  moduleId: 'a2-m11',
  titleDe: 'Beim Check-in am Flughafen',
  titleAr: 'تسجيل الوصول في المطار',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Guten Morgen! Ihren Pass und Ihr Ticket, bitte.', ar: 'صباح الخير! جواز سفرك وتذكرتك من فضلك.' },
    { speaker: 'b', name: 'Herr Kamal', de: 'Bitte schön. Ich fliege nach Wien.', ar: 'تفضّلي. أنا مسافر إلى فيينا.' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Möchten Sie einen Koffer aufgeben?', ar: 'هل تريد تسليم حقيبة؟' },
    { speaker: 'b', name: 'Herr Kamal', de: 'Ja, einen Koffer. Und ich habe auch eine kleine Tasche als Handgepäck.', ar: 'نعم، حقيبة واحدة. ومعي أيضًا حقيبة صغيرة كأمتعة يد.' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Bitte stellen Sie den Koffer auf die Waage. Er wiegt zwanzig Kilo. Das ist in Ordnung.', ar: 'ضع الحقيبة من فضلك على الميزان. وزنها عشرون كيلوغرامًا. هذا مناسب.' },
    { speaker: 'b', name: 'Herr Kamal', de: 'Kann ich einen Fensterplatz bekommen?', ar: 'هل يمكنني الحصول على مقعد بجانب النافذة؟' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Ja, Sie sitzen auf Platz zwölf A. Das ist am Fenster.', ar: 'نعم، مقعدك رقم ١٢ A. وهو بجانب النافذة.' },
    { speaker: 'b', name: 'Herr Kamal', de: 'Wann beginnt das Boarding?', ar: 'متى يبدأ الصعود إلى الطائرة (Boarding)؟' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Das Boarding beginnt um halb zehn an Gate B sieben. Bitte seien Sie rechtzeitig dort.', ar: 'يبدأ الصعود في التاسعة والنصف عند البوابة B7. من فضلك كن هناك في الوقت المناسب.' },
    { speaker: 'b', name: 'Herr Kamal', de: 'Wo finde ich das Gate?', ar: 'أين أجد البوابة؟' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Gehen Sie hier geradeaus und dann links. Es ist nicht weit.', ar: 'اذهب من هنا مباشرة ثم إلى اليسار. إنها ليست بعيدة.' },
    { speaker: 'b', name: 'Herr Kamal', de: 'Vielen Dank! Wie lange dauert der Flug?', ar: 'شكرًا جزيلًا! كم تستغرق الرحلة الجوية؟' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Ungefähr eineinhalb Stunden. Guten Flug!', ar: 'نحو ساعة ونصف. رحلة سعيدة!' },
  ],
}
