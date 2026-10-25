import type { Dialogue } from '@/types'

export const conversationAnmeldungDeutschkurs: Dialogue = {
  id: 'dialogue-a1-anmeldung-deutschkurs',
  level: 'A1',
  moduleId: 'a1-m01',
  titleDe: 'Anmeldung zum Deutschkurs',
  titleAr: 'التسجيل في دورة اللغة الألمانية',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Sekretariat', de: 'Guten Morgen! Was kann ich für Sie tun?', ar: 'صباح الخير! ماذا أستطيع أن أفعل لك؟' },
    { speaker: 'b', name: 'Herr Mansour', de: 'Guten Morgen. Ich suche einen Deutschkurs.', ar: 'صباح الخير. أبحث عن دورة لغة ألمانية.' },
    { speaker: 'a', name: 'Sekretariat', de: 'Welches Niveau haben Sie? Sind Sie Anfänger?', ar: 'ما مستواك؟ هل أنت مبتدئ؟' },
    { speaker: 'b', name: 'Herr Mansour', de: 'Ja, ich bin Anfänger. Ich lerne erst seit zwei Monaten Deutsch.', ar: 'نعم، أنا مبتدئ. أتعلّم الألمانية منذ شهرين فقط.' },
    { speaker: 'a', name: 'Sekretariat', de: 'Dann passt der Kurs A1. Er beginnt am Montag um neun Uhr.', ar: 'إذن تناسبك دورة A1. تبدأ يوم الاثنين في التاسعة.' },
    { speaker: 'b', name: 'Herr Mansour', de: 'Gut. Wie viel kostet der Kurs?', ar: 'جيد. كم تكلفة الدورة؟' },
    { speaker: 'a', name: 'Sekretariat', de: 'Er kostet zweihundert Euro. Wie ist Ihr Name, bitte?', ar: 'تكلفتها مئتا يورو. ما اسمك من فضلك؟' },
    { speaker: 'b', name: 'Herr Mansour', de: 'Mein Name ist Khalil Mansour.', ar: 'اسمي خليل منصور.' },
    { speaker: 'a', name: 'Sekretariat', de: 'Können Sie das bitte buchstabieren?', ar: 'هل يمكنك تهجئة ذلك من فضلك؟' },
    { speaker: 'b', name: 'Herr Mansour', de: 'Ja. K – H – A – L – I – L. Und Mansour: M – A – N – S – O – U – R.', ar: 'نعم. K – H – A – L – I – L. ومنصور: M – A – N – S – O – U – R.' },
    { speaker: 'a', name: 'Sekretariat', de: 'Danke. Und Ihre Telefonnummer?', ar: 'شكرًا. ورقم هاتفك؟' },
    { speaker: 'b', name: 'Herr Mansour', de: 'Null eins sieben eins, drei vier fünf, sechs sieben acht.', ar: 'صفر واحد سبعة واحد، ثلاثة أربعة خمسة، ستة سبعة ثمانية.' },
    { speaker: 'a', name: 'Sekretariat', de: 'Vielen Dank, Herr Mansour. Bitte füllen Sie noch dieses Formular aus.', ar: 'شكرًا جزيلًا يا سيد منصور. من فضلك املأ أيضًا هذا النموذج.' },
  ],
}
