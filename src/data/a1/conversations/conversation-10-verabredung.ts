import type { Dialogue } from '@/types'

export const conversationVerabredung: Dialogue = {
  id: 'dialogue-a1-verabredung',
  level: 'A1',
  moduleId: 'a1-m06',
  titleDe: 'Wollen wir ins Kino gehen?',
  titleAr: 'هل نذهب إلى السينما؟',
  register: 'informal',
  lines: [
    { speaker: 'a', name: 'Anna', de: 'Hallo Omar! Was machst du am Samstag?', ar: 'مرحباً عمر! ماذا ستفعل يوم السبت؟' },
    { speaker: 'b', name: 'Omar', de: 'Hallo Anna. Am Samstag muss ich nicht arbeiten. Warum?', ar: 'مرحباً آنا. يوم السبت لست مضطراً للعمل. لماذا؟' },
    { speaker: 'a', name: 'Anna', de: 'Wollen wir zusammen ins Kino gehen? Der Film beginnt um acht Uhr.', ar: 'هل نذهب معاً إلى السينما؟ يبدأ الفيلم في الساعة الثامنة.' },
    { speaker: 'b', name: 'Omar', de: 'Gern! Muss ich Karten kaufen?', ar: 'بكل سرور! هل عليّ أن أشتري تذاكر؟' },
    { speaker: 'a', name: 'Anna', de: 'Nein, du musst nicht bezahlen. Ich habe schon zwei Karten.', ar: 'لا، ليس عليك أن تدفع. عندي تذكرتان بالفعل.' },
    { speaker: 'b', name: 'Omar', de: 'Danke! Darf man im Kino essen?', ar: 'شكراً! هل يُسمح بالأكل في السينما؟' },
    { speaker: 'a', name: 'Anna', de: 'Ja, du darfst Popcorn essen, aber du darfst nicht laut telefonieren.', ar: 'نعم، يمكنك أكل الفشار، لكن ممنوع أن تتكلم بالهاتف بصوت عالٍ.' },
    { speaker: 'b', name: 'Omar', de: 'Klar, mein Handy bleibt aus. Wann holst du mich ab?', ar: 'طبعاً، هاتفي سيبقى مغلقاً. متى ستأتين لتأخذيني؟' },
    { speaker: 'a', name: 'Anna', de: 'Um halb acht. Bis Samstag!', ar: 'في السابعة والنصف. إلى السبت!' },
    { speaker: 'b', name: 'Omar', de: 'Bis Samstag, Anna!', ar: 'إلى السبت يا آنا!' },
  ],
}
