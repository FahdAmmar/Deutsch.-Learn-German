import type { Dialogue } from '@/types'

export const conversationVorstellungsgespraech: Dialogue = {
  id: 'dialogue-a2-vorstellungsgespraech',
  level: 'A2',
  moduleId: 'a2-m10',
  titleDe: 'Ein Vorstellungsgespräch',
  titleAr: 'مقابلة عمل',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Frau Roth', de: 'Guten Tag, Herr Yusuf. Bitte nehmen Sie Platz.', ar: 'مرحبًا سيد يوسف. تفضّل بالجلوس.' },
    { speaker: 'b', name: 'Herr Yusuf', de: 'Guten Tag, Frau Roth. Vielen Dank für die Einladung.', ar: 'مرحبًا سيدة روت. شكرًا جزيلًا على الدعوة.' },
    { speaker: 'a', name: 'Frau Roth', de: 'Sie möchten bei uns als Verkäufer arbeiten. Warum interessiert Sie diese Stelle?', ar: 'تريد أن تعمل لدينا بائعًا. لماذا تهمّك هذه الوظيفة؟' },
    { speaker: 'b', name: 'Herr Yusuf', de: 'Ich arbeite gern mit Menschen und spreche gern Deutsch mit den Kunden. So kann ich auch meine Sprachkenntnisse verbessern.', ar: 'أحب العمل مع الناس وأحب التحدث بالألمانية مع الزبائن. وهكذا أستطيع أيضًا تحسين مهاراتي اللغوية.' },
    { speaker: 'a', name: 'Frau Roth', de: 'Haben Sie schon Erfahrung im Verkauf?', ar: 'هل لديك خبرة في البيع؟' },
    { speaker: 'b', name: 'Herr Yusuf', de: 'Ja, ich habe zwei Jahre in einem Geschäft gearbeitet. Dort habe ich Kunden beraten und an der Kasse gearbeitet.', ar: 'نعم، عملتُ سنتين في متجر. هناك قدّمتُ المشورة للزبائن وعملتُ على الصندوق.' },
    { speaker: 'a', name: 'Frau Roth', de: 'Das ist gut. Wie gut sprechen Sie Deutsch?', ar: 'هذا جيد. ما مدى إتقانك للألمانية؟' },
    { speaker: 'b', name: 'Herr Yusuf', de: 'Ich spreche Deutsch auf dem Niveau A2. Ich besuche noch einen Kurs, um besser zu werden.', ar: 'أتحدّث الألمانية بمستوى A2. وما زلتُ أحضر دورة لأتحسّن أكثر.' },
    { speaker: 'a', name: 'Frau Roth', de: 'Wann könnten Sie bei uns anfangen?', ar: 'متى يمكنك أن تبدأ عندنا؟' },
    { speaker: 'b', name: 'Herr Yusuf', de: 'Schon nächsten Monat, wenn Sie möchten.', ar: 'منذ الشهر القادم، إن أردتم.' },
    { speaker: 'a', name: 'Frau Roth', de: 'Sehr gut. Wir melden uns diese Woche bei Ihnen.', ar: 'جيد جدًا. سنتواصل معك هذا الأسبوع.' },
    { speaker: 'b', name: 'Herr Yusuf', de: 'Vielen Dank, Frau Roth. Auf Wiedersehen!', ar: 'شكرًا جزيلًا سيدة روت. إلى اللقاء!' },
  ],
}
