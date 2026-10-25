import type { Dialogue } from '@/types'

export const conversationGesternImBuero: Dialogue = {
  id: 'dialogue-a2-gestern-im-buero',
  level: 'A2',
  moduleId: 'a2-m02',
  titleDe: 'Warum warst du nicht da?',
  titleAr: 'لماذا لم تكن في المكتب؟',
  register: 'informal',
  lines: [
    { speaker: 'a', name: 'Nina', de: 'Hallo Daniel! Wo warst du gestern? Du warst nicht im Büro.', ar: 'مرحبًا دانيال! أين كنتَ أمس؟ لم تكن في المكتب.' },
    { speaker: 'b', name: 'Daniel', de: 'Hallo Nina. Ich war krank. Ich hatte starke Kopfschmerzen und Fieber.', ar: 'مرحبًا نينا. كنتُ مريضًا. كان عندي صداع شديد وحرارة.' },
    { speaker: 'a', name: 'Nina', de: 'Oje! Warst du beim Arzt?', ar: 'يا إلهي! هل زرتَ الطبيب؟' },
    { speaker: 'b', name: 'Daniel', de: 'Ja, ich konnte am Vormittag einen Termin bekommen. Der Arzt war sehr freundlich.', ar: 'نعم، استطعتُ الحصول على موعد في الصباح. وكان الطبيب لطيفًا جدًا.' },
    { speaker: 'a', name: 'Nina', de: 'Und was hat er gesagt?', ar: 'وماذا قال؟' },
    { speaker: 'b', name: 'Daniel', de: 'Ich musste zu Hause bleiben und durfte nicht arbeiten. Heute geht es mir schon besser.', ar: 'كان عليّ أن أبقى في البيت ولم يكن مسموحًا لي بالعمل. واليوم أشعر بتحسّن بالفعل.' },
    { speaker: 'a', name: 'Nina', de: 'Das ist gut. Wir hatten gestern eine wichtige Besprechung. Der Chef wollte mit dir sprechen.', ar: 'هذا جيد. كان عندنا أمس اجتماع مهم. وأراد المدير أن يتحدث معك.' },
    { speaker: 'b', name: 'Daniel', de: 'Oh nein. Was wollte er denn?', ar: 'يا للأسف. وماذا أراد؟' },
    { speaker: 'a', name: 'Nina', de: 'Er wollte wissen, ob du den Bericht schon fertig hast.', ar: 'أراد أن يعرف إن كنتَ قد أنهيتَ التقرير.' },
    { speaker: 'b', name: 'Daniel', de: 'Ja, den Bericht hatte ich am Montag schon fertig. Ich schicke ihn gleich.', ar: 'نعم، كنتُ قد أنهيتُ التقرير يوم الاثنين. سأرسله حالًا.' },
    { speaker: 'a', name: 'Nina', de: 'Prima. Und trink viel Tee!', ar: 'ممتاز. واشرب شايًا كثيرًا!' },
    { speaker: 'b', name: 'Daniel', de: 'Danke, Nina! Das war nett von dir.', ar: 'شكرًا نينا! هذا لطف منك.' },
  ],
}
