import type { Dialogue } from '@/types'

export const conversationNeueNachbarn: Dialogue = {
  id: 'dialogue-a1-neue-nachbarn',
  level: 'A1',
  moduleId: 'a1-m01',
  titleDe: 'Neue Nachbarn',
  titleAr: 'جيران جدد',
  register: 'informal',
  lines: [
    { speaker: 'a', name: 'Jana', de: 'Hallo! Bist du neu hier?', ar: 'مرحبًا! هل أنت جديد هنا؟' },
    { speaker: 'b', name: 'Karim', de: 'Ja, ich wohne seit gestern hier. Ich heiße Karim.', ar: 'نعم، أسكن هنا منذ أمس. اسمي كريم.' },
    { speaker: 'a', name: 'Jana', de: 'Freut mich, Karim! Ich bin Jana. Ich wohne in Wohnung zwölf.', ar: 'تشرفت يا كريم! أنا جانا. أسكن في الشقة رقم اثني عشر.' },
    { speaker: 'b', name: 'Karim', de: 'Und ich wohne in Wohnung vierzehn, direkt über dir.', ar: 'وأنا أسكن في الشقة رقم أربعة عشر، فوقك مباشرة.' },
    { speaker: 'a', name: 'Jana', de: 'Woher kommst du, Karim?', ar: 'من أين أنت يا كريم؟' },
    { speaker: 'b', name: 'Karim', de: 'Ich komme aus Ägypten, aber ich lebe jetzt in Deutschland.', ar: 'أنا من مصر، لكنني أعيش الآن في ألمانيا.' },
    { speaker: 'a', name: 'Jana', de: 'Und was machst du hier? Arbeitest du oder lernst du?', ar: 'وماذا تفعل هنا؟ هل تعمل أم تدرس؟' },
    { speaker: 'b', name: 'Karim', de: 'Ich lerne Deutsch und arbeite am Wochenende in einem Café.', ar: 'أتعلّم الألمانية وأعمل في عطلة نهاية الأسبوع في مقهى.' },
    { speaker: 'a', name: 'Jana', de: 'Toll! Brauchst du etwas für die Küche? Ich habe Teller und Gläser.', ar: 'رائع! هل تحتاج شيئًا للمطبخ؟ عندي صحون وأكواب.' },
    { speaker: 'b', name: 'Karim', de: 'Danke, das ist sehr nett! Heute Abend habe ich Tee. Kommst du vorbei?', ar: 'شكرًا، هذا لطف منك! الليلة عندي شاي. هل تمرّين عليّ؟' },
    { speaker: 'a', name: 'Jana', de: 'Gern! Um acht Uhr?', ar: 'بكل سرور! في الثامنة؟' },
    { speaker: 'b', name: 'Karim', de: 'Perfekt, bis später!', ar: 'ممتاز، إلى اللقاء لاحقًا!' },
  ],
}
