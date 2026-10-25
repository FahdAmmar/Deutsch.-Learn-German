import type { Dialogue } from '@/types'

export const conversationInDerApotheke: Dialogue = {
  id: 'dialogue-a1-in-der-apotheke',
  level: 'A1',
  moduleId: 'a1-m05',
  titleDe: 'In der Apotheke',
  titleAr: 'في الصيدلية',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Apothekerin', de: 'Guten Tag! Wie kann ich Ihnen helfen?', ar: 'مرحبًا! كيف أستطيع مساعدتك؟' },
    { speaker: 'b', name: 'Herr Hassan', de: 'Guten Tag. Ich habe Kopfschmerzen und Halsschmerzen.', ar: 'مرحبًا. عندي صداع وألم في الحلق.' },
    { speaker: 'a', name: 'Apothekerin', de: 'Seit wann haben Sie die Schmerzen?', ar: 'منذ متى تعاني من هذه الآلام؟' },
    { speaker: 'b', name: 'Herr Hassan', de: 'Seit gestern. Ich bin auch sehr müde.', ar: 'منذ أمس. وأنا متعب جدًا أيضًا.' },
    { speaker: 'a', name: 'Apothekerin', de: 'Haben Sie Fieber?', ar: 'هل عندك حرارة؟' },
    { speaker: 'b', name: 'Herr Hassan', de: 'Nein, ich habe kein Fieber.', ar: 'لا، ليس عندي حرارة.' },
    { speaker: 'a', name: 'Apothekerin', de: 'Dann nehmen Sie diese Tabletten nach dem Essen. Und trinken Sie viel Wasser.', ar: 'إذن خذ هذه الأقراص بعد الأكل. واشرب ماءً كثيرًا.' },
    { speaker: 'b', name: 'Herr Hassan', de: 'Danke. Was kostet das?', ar: 'شكرًا. كم الثمن؟' },
    { speaker: 'a', name: 'Apothekerin', de: 'Das macht sieben Euro fünfzig.', ar: 'الإجمالي سبعة يورو وخمسون سنتًا.' },
    { speaker: 'b', name: 'Herr Hassan', de: 'Hier sind zehn Euro.', ar: 'تفضّلي عشرة يورو.' },
    { speaker: 'a', name: 'Apothekerin', de: 'Danke, und zwei Euro fünfzig zurück. Gute Besserung!', ar: 'شكرًا، وهذا الباقي: يوروان وخمسون سنتًا. الشفاء العاجل!' },
    { speaker: 'b', name: 'Herr Hassan', de: 'Auf Wiedersehen!', ar: 'إلى اللقاء!' },
  ],
}
