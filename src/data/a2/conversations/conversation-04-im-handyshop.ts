import type { Dialogue } from '@/types'

export const conversationImHandyshop: Dialogue = {
  id: 'dialogue-a2-im-handyshop',
  level: 'A2',
  moduleId: 'a2-m08',
  titleDe: 'Im Handyshop',
  titleAr: 'في محل الهواتف',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Verkäufer', de: 'Guten Tag! Kann ich Ihnen helfen?', ar: 'مرحبًا! هل أستطيع مساعدتك؟' },
    { speaker: 'b', name: 'Frau Hamdi', de: 'Ja, mein Handy funktioniert nicht mehr. Der Bildschirm ist kaputt.', ar: 'نعم، هاتفي لم يعد يعمل. الشاشة مكسورة.' },
    { speaker: 'a', name: 'Verkäufer', de: 'Darf ich mal sehen? Wie ist das passiert?', ar: 'هل أستطيع أن أرى؟ كيف حدث ذلك؟' },
    { speaker: 'b', name: 'Frau Hamdi', de: 'Es ist gestern vom Tisch gefallen.', ar: 'سقط أمس عن الطاولة.' },
    { speaker: 'a', name: 'Verkäufer', de: 'Das kann ich reparieren. Der Bildschirm ist das Teil, das am häufigsten kaputtgeht.', ar: 'يمكنني إصلاحه. الشاشة هي القطعة التي تتعطّل أكثر من غيرها.' },
    { speaker: 'b', name: 'Frau Hamdi', de: 'Wie lange dauert die Reparatur?', ar: 'كم تستغرق عملية الإصلاح؟' },
    { speaker: 'a', name: 'Verkäufer', de: 'Normalerweise zwei bis drei Tage. Ich muss das Ersatzteil bestellen.', ar: 'عادةً من يومين إلى ثلاثة. عليّ أن أطلب قطعة الغيار.' },
    { speaker: 'b', name: 'Frau Hamdi', de: 'Und was kostet das?', ar: 'وكم يكلّف ذلك؟' },
    { speaker: 'a', name: 'Verkäufer', de: 'Mit Arbeit und Ersatzteil kostet es hundertzwanzig Euro.', ar: 'مع العمل وقطعة الغيار يكلّف مئة وعشرين يورو.' },
    { speaker: 'b', name: 'Frau Hamdi', de: 'Das ist in Ordnung. Wissen Sie schon, wann ich es abholen kann?', ar: 'لا بأس. هل تعرف متى يمكنني أن أستلمه؟' },
    { speaker: 'a', name: 'Verkäufer', de: 'Ich rufe Sie an, wenn das Handy fertig ist.', ar: 'سأتصل بك عندما يكون الهاتف جاهزًا.' },
    { speaker: 'b', name: 'Frau Hamdi', de: 'Prima, vielen Dank!', ar: 'رائع، شكرًا جزيلًا!' },
  ],
}
