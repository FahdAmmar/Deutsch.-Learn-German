import type { Dialogue } from '@/types'

export const conversationAufDerBank: Dialogue = {
  id: 'dialogue-a2-auf-der-bank',
  level: 'A2',
  moduleId: 'a2-m15',
  titleDe: 'Ein Konto eröffnen',
  titleAr: 'فتح حساب في البنك',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Bankangestellte', de: 'Guten Tag, wie kann ich Ihnen helfen?', ar: 'مرحبًا، كيف يمكنني مساعدتكم؟' },
    { speaker: 'b', name: 'Herr Ali', de: 'Guten Tag. Ich möchte ein Konto eröffnen.', ar: 'مرحبًا. أودّ فتح حساب.' },
    { speaker: 'a', name: 'Bankangestellte', de: 'Gern. Haben Sie Ihren Ausweis oder Reisepass dabei?', ar: 'بكل سرور. هل معكم بطاقة الهوية أو جواز السفر؟' },
    { speaker: 'b', name: 'Herr Ali', de: 'Ja, hier ist mein Reisepass.', ar: 'نعم، هذا هو جواز سفري.' },
    { speaker: 'a', name: 'Bankangestellte', de: 'Danke. Bitte füllen Sie dieses Formular aus und unterschreiben Sie hier.', ar: 'شكرًا. من فضلكم املؤوا هذه الاستمارة ووقّعوا هنا.' },
    { speaker: 'b', name: 'Herr Ali', de: 'Wann bekomme ich meine Karte?', ar: 'متى سأحصل على بطاقتي؟' },
    { speaker: 'a', name: 'Bankangestellte', de: 'Die Karte kommt in etwa einer Woche mit der Post.', ar: 'تصلكم البطاقة بالبريد خلال أسبوع تقريبًا.' },
    { speaker: 'b', name: 'Herr Ali', de: 'Kann ich damit auch im Ausland Geld abheben?', ar: 'هل يمكنني بها سحب المال في الخارج أيضًا؟' },
    { speaker: 'a', name: 'Bankangestellte', de: 'Ja, aber manchmal kostet das eine Gebühr.', ar: 'نعم، لكن ذلك يكلّف رسومًا في بعض الأحيان.' },
    { speaker: 'b', name: 'Herr Ali', de: 'Und wie kann ich Geld überweisen?', ar: 'وكيف يمكنني تحويل المال؟' },
    { speaker: 'a', name: 'Bankangestellte', de: 'Das geht ganz einfach online oder mit einer Überweisung hier am Schalter.', ar: 'الأمر بسيط جدًا عبر الإنترنت أو بحوالة مصرفية هنا عند الشبّاك.' },
    { speaker: 'b', name: 'Herr Ali', de: 'Wunderbar, vielen Dank für Ihre Hilfe.', ar: 'رائع، شكرًا جزيلًا على مساعدتكم.' },
    { speaker: 'a', name: 'Bankangestellte', de: 'Gern geschehen. Einen schönen Tag noch!', ar: 'على الرحب والسعة. أتمنى لكم يومًا جميلًا!' },
  ],
}
