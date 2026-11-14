import type { Dialogue } from '@/types'

export const conversationNeueKollegen: Dialogue = {
  id: 'dialogue-a2-neue-kollegen',
  level: 'A2',
  moduleId: 'a2-m21',
  titleDe: 'Die neuen Kollegen',
  titleAr: 'الزملاء الجدد',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Frau Berg', de: 'Guten Morgen, Herr Ali. Kennen Sie schon den Kollegen aus der Buchhaltung?', ar: 'صباح الخير يا سيد علي. هل تعرف الزميل من قسم المحاسبة؟' },
    { speaker: 'b', name: 'Herr Ali', de: 'Guten Morgen, Frau Berg. Nein, ich kenne den Kollegen noch nicht.', ar: 'صباح الخير يا سيدة بيرغ. لا، لا أعرف الزميل بعد.' },
    { speaker: 'a', name: 'Frau Berg', de: 'Er heißt Herr Weber und sitzt im ersten Stock. Er hilft dem neuen Kollegen gern.', ar: 'اسمه السيد فيبر ويجلس في الطابق الأول. وهو يساعد الزميل الجديد بكل سرور.' },
    { speaker: 'b', name: 'Herr Ali', de: 'Das ist nett. Ich möchte auch den Kunden von gestern anrufen.', ar: 'هذا لطف منه. وأريد أيضاً أن أتصل بالزبون الذي جاء أمس.' },
    { speaker: 'a', name: 'Frau Berg', de: 'Das ist nicht nötig. Der Kunde ruft heute wieder an. Er wartet schon auf einen Termin.', ar: 'ليس ضرورياً. الزبون سيتصل مجدداً اليوم. وهو ينتظر موعداً.' },
    { speaker: 'b', name: 'Herr Ali', de: 'Gut. Mit wem arbeite ich im Team zusammen?', ar: 'حسناً. مع من أعمل في الفريق؟' },
    { speaker: 'a', name: 'Frau Berg', de: 'Sie arbeiten mit dem freundlichen Team in der kleinen Abteilung.', ar: 'ستعمل مع الفريق الودود في القسم الصغير.' },
    { speaker: 'b', name: 'Herr Ali', de: 'Wunderbar. Ich bin gespannt auf die neuen Kollegen.', ar: 'رائع. أنا متشوق لزملائي الجدد.' },
    { speaker: 'a', name: 'Frau Berg', de: 'Heute Mittag stelle ich Sie dem Team vor. Sind Sie damit einverstanden?', ar: 'ظهر اليوم سأعرّفكم بالفريق. هل أنتم موافقون على ذلك؟' },
    { speaker: 'b', name: 'Herr Ali', de: 'Ja, ich bin einverstanden. Vielen Dank für die Hilfe, Frau Berg.', ar: 'نعم، أنا موافق. شكراً جزيلاً على المساعدة يا سيدة بيرغ.' },
  ],
}
