import type { Dialogue } from '@/types'

export const conversationImHotel: Dialogue = {
  id: 'dialogue-a2-im-hotel',
  level: 'A2',
  moduleId: 'a2-m15',
  titleDe: 'Ein Zimmer reservieren',
  titleAr: 'حجز غرفة في الفندق',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Rezeption', de: 'Hotel Sonne, guten Tag. Wie kann ich Ihnen helfen?', ar: 'فندق زونه، مرحبًا. كيف يمكنني مساعدتكم؟' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Guten Tag. Haben Sie noch ein Doppelzimmer frei?', ar: 'مرحبًا. هل لديكم غرفة مزدوجة شاغرة؟' },
    { speaker: 'a', name: 'Rezeption', de: 'Für wann brauchen Sie das Zimmer?', ar: 'لأي موعد تحتاجون الغرفة؟' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Für zwei Nächte, von Freitag bis Sonntag.', ar: 'لليلتين، من الجمعة إلى الأحد.' },
    { speaker: 'a', name: 'Rezeption', de: 'Ja, wir haben noch ein Zimmer. Eine Übernachtung kostet neunzig Euro.', ar: 'نعم، لدينا غرفة شاغرة. تكلّف الليلة الواحدة تسعين يورو.' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Ist das Frühstück im Preis?', ar: 'هل الفطور مشمول في السعر؟' },
    { speaker: 'a', name: 'Rezeption', de: 'Ja, das Frühstück gibt es von sieben bis zehn Uhr.', ar: 'نعم، الفطور متوفّر من السابعة حتى العاشرة.' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Sehr gut. Ich möchte das Zimmer reservieren.', ar: 'ممتاز. أودّ حجز الغرفة.' },
    { speaker: 'a', name: 'Rezeption', de: 'Auf welchen Namen, bitte?', ar: 'باسم من، من فضلكم؟' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Auf den Namen Kaya. K-A-Y-A.', ar: 'باسم كايا. K-A-Y-A.' },
    { speaker: 'a', name: 'Rezeption', de: 'Danke, Frau Kaya. Sie können ab vierzehn Uhr einchecken.', ar: 'شكرًا يا سيدة كايا. يمكنكم تسجيل الدخول ابتداءً من الثانية ظهرًا.' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Perfekt. Kann ich mein Gepäck auch früher abgeben?', ar: 'ممتاز. هل يمكنني تسليم أمتعتي قبل ذلك أيضًا؟' },
    { speaker: 'a', name: 'Rezeption', de: 'Ja, das ist kein Problem. Sie können es an der Rezeption lassen.', ar: 'نعم، لا مشكلة في ذلك. يمكنكم تركها عند الاستقبال.' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Wunderbar. Dann bis Freitag!', ar: 'رائع. إذن إلى الجمعة!' },
    { speaker: 'a', name: 'Rezeption', de: 'Bis Freitag, Frau Kaya. Wir freuen uns auf Sie.', ar: 'إلى الجمعة يا سيدة كايا. نتطلّع إلى استقبالكم.' },
  ],
}
