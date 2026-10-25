import type { Dialogue } from '@/types'

export const conversationEinGeschenk: Dialogue = {
  id: 'dialogue-a2-ein-geschenk',
  level: 'A2',
  moduleId: 'a2-m05',
  titleDe: 'Ein Geschenk für die Mutter',
  titleAr: 'هدية لأمي',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Verkäuferin', de: 'Guten Tag! Kann ich Ihnen helfen?', ar: 'مرحبًا! هل أستطيع مساعدتك؟' },
    { speaker: 'b', name: 'Herr Said', de: 'Ja, ich suche ein Geschenk für meine Mutter. Sie hat bald Geburtstag.', ar: 'نعم، أبحث عن هدية لأمي. عيد ميلادها قريب.' },
    { speaker: 'a', name: 'Verkäuferin', de: 'Was für ein Geschenk möchten Sie? Vielleicht einen warmen Schal?', ar: 'أي نوع من الهدايا تريد؟ ربما وشاحًا دافئًا؟' },
    { speaker: 'b', name: 'Herr Said', de: 'Ein Schal ist eine gute Idee. Sie trägt gern bunte Farben.', ar: 'الوشاح فكرة جيدة. هي تحب ارتداء الألوان الزاهية.' },
    { speaker: 'a', name: 'Verkäuferin', de: 'Dann schauen Sie sich diesen roten Schal an. Er ist aus weicher Wolle.', ar: 'إذن انظر إلى هذا الوشاح الأحمر. إنه مصنوع من صوف ناعم.' },
    { speaker: 'b', name: 'Herr Said', de: 'Der ist sehr schön. Haben Sie ihn auch in einer anderen Farbe?', ar: 'إنه جميل جدًا. هل عندكم منه بلون آخر؟' },
    { speaker: 'a', name: 'Verkäuferin', de: 'Ja, wir haben ihn auch in Blau. Der blaue Schal kostet fünfundzwanzig Euro.', ar: 'نعم، عندنا منه أيضًا بالأزرق. الوشاح الأزرق ثمنه خمسة وعشرون يورو.' },
    { speaker: 'b', name: 'Herr Said', de: 'Der blaue gefällt mir besser. Ich nehme ihn.', ar: 'الأزرق يعجبني أكثر. سآخذه.' },
    { speaker: 'a', name: 'Verkäuferin', de: 'Soll ich ihn als Geschenk einpacken?', ar: 'هل أغلّفه كهدية؟' },
    { speaker: 'b', name: 'Herr Said', de: 'Ja, bitte. In schönes Papier, wenn möglich.', ar: 'نعم، من فضلك. بورق جميل إن أمكن.' },
    { speaker: 'a', name: 'Verkäuferin', de: 'Natürlich. Hier ist Ihr Schal. Ich wünsche Ihrer Mutter alles Gute zum Geburtstag!', ar: 'بالتأكيد. تفضّل وشاحك. أتمنى لوالدتك عيد ميلاد سعيدًا!' },
    { speaker: 'b', name: 'Herr Said', de: 'Vielen Dank! Auf Wiedersehen!', ar: 'شكرًا جزيلًا! إلى اللقاء!' },
  ],
}
