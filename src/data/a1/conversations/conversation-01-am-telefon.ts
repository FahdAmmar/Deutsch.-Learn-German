import type { Dialogue } from '@/types'

export const conversationAmTelefon: Dialogue = {
  id: 'dialogue-a1-am-telefon',
  level: 'A1',
  moduleId: 'a1-m17',
  titleDe: 'Am Telefon',
  titleAr: 'مكالمة هاتفية لترتيب موعد',
  register: 'informal',
  lines: [
    { speaker: 'a', name: 'Sami', de: 'Hallo Lea, hier ist Sami. Hast du am Samstag Zeit?', ar: 'مرحبًا ليا، هنا سامي. هل عندك وقت يوم السبت؟' },
    { speaker: 'b', name: 'Lea', de: 'Hallo Sami! Ja, am Samstag habe ich Zeit. Was machen wir?', ar: 'مرحبًا سامي! نعم، يوم السبت عندي وقت. ماذا سنفعل؟' },
    { speaker: 'a', name: 'Sami', de: 'Ich möchte ins Kino gehen. Kommst du mit?', ar: 'أريد أن أذهب إلى السينما. هل تأتين معي؟' },
    { speaker: 'b', name: 'Lea', de: 'Gern! Welcher Film läuft denn?', ar: 'بكل سرور! أي فيلم يُعرض؟' },
    { speaker: 'a', name: 'Sami', de: 'Es gibt eine Komödie. Sie beginnt um acht Uhr.', ar: 'هناك فيلم كوميدي. يبدأ في الثامنة.' },
    { speaker: 'b', name: 'Lea', de: 'Das ist ziemlich spät. Wollen wir vorher eine Pizza essen?', ar: 'هذا متأخر قليلًا. هل نأكل بيتزا قبل ذلك؟' },
    { speaker: 'a', name: 'Sami', de: 'Gute Idee! Ich kenne ein Restaurant neben dem Kino.', ar: 'فكرة جيدة! أعرف مطعمًا بجانب السينما.' },
    { speaker: 'b', name: 'Lea', de: 'Super. Wann soll ich dort sein?', ar: 'رائع. متى يجب أن أكون هناك؟' },
    { speaker: 'a', name: 'Sami', de: 'Um sechs Uhr. Ich warte vor dem Restaurant auf dich.', ar: 'في السادسة. سأنتظرك أمام المطعم.' },
    { speaker: 'b', name: 'Lea', de: 'Alles klar. Bis Samstag, Sami! Tschüs!', ar: 'حسنًا تمامًا. إلى يوم السبت يا سامي! مع السلامة!' },
  ],
}
