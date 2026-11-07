import type { Dialogue } from '@/types'

export const conversationImFitnessstudio: Dialogue = {
  id: 'dialogue-a2-im-fitnessstudio',
  level: 'A2',
  moduleId: 'a2-m17',
  titleDe: 'Anmeldung im Fitnessstudio',
  titleAr: 'التسجيل في النادي الرياضي',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Guten Tag, wie kann ich Ihnen helfen?', ar: 'مرحباً، كيف يمكنني مساعدتكم؟' },
    { speaker: 'b', name: 'Herr Yildiz', de: 'Guten Tag. Ich möchte mich im Fitnessstudio anmelden.', ar: 'مرحباً. أودّ التسجيل في النادي الرياضي.' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Gern. Ab wann möchten Sie anfangen?', ar: 'بكل سرور. ابتداءً من متى تريدون أن تبدؤوا؟' },
    { speaker: 'b', name: 'Herr Yildiz', de: 'Ab dem 1. Dezember. Bis Ende November trainiere ich noch in meinem alten Studio.', ar: 'ابتداءً من 1 ديسمبر. وحتى نهاية نوفمبر أتدرّب في ناديي القديم.' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Für wie lange möchten Sie den Vertrag abschließen?', ar: 'لأي مدة تريدون إبرام العقد؟' },
    { speaker: 'b', name: 'Herr Yildiz', de: 'Für ein Jahr. Wie lange dauert die Anmeldung?', ar: 'لسنة. كم يستغرق التسجيل؟' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Nur zehn Minuten. Wir sind von Montag bis Freitag bis 22 Uhr geöffnet.', ar: 'عشر دقائق فقط. نحن مفتوحون من الإثنين إلى الجمعة حتى الساعة العاشرة مساءً.' },
    { speaker: 'b', name: 'Herr Yildiz', de: 'Seit wann gibt es das Studio eigentlich?', ar: 'منذ متى يوجد هذا النادي في الحقيقة؟' },
    { speaker: 'a', name: 'Mitarbeiterin', de: 'Seit fünf Jahren. Vor drei Jahren haben wir es renoviert.', ar: 'منذ خمس سنوات. قبل ثلاث سنوات جدّدناه.' },
    { speaker: 'b', name: 'Herr Yildiz', de: 'Sehr gut. Dann bis Montag!', ar: 'جيد جداً. إذن إلى الإثنين!' },
  ],
}
