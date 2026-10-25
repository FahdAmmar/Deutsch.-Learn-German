import type { Dialogue } from '@/types'

export const conversationTreffenAbsagen: Dialogue = {
  id: 'dialogue-a2-treffen-absagen',
  level: 'A2',
  moduleId: 'a2-m04',
  titleDe: 'Eine Verabredung absagen',
  titleAr: 'الاعتذار عن موعد',
  register: 'informal',
  lines: [
    { speaker: 'a', name: 'Mona', de: 'Hallo Jonas, ich habe leider schlechte Nachrichten.', ar: 'مرحبًا يوناس، عندي للأسف أخبار سيئة.' },
    { speaker: 'b', name: 'Jonas', de: 'Oje, was ist denn passiert?', ar: 'يا إلهي، ماذا حدث؟' },
    { speaker: 'a', name: 'Mona', de: 'Ich kann heute Abend nicht ins Konzert kommen, weil ich Fieber habe.', ar: 'لا أستطيع الحضور إلى الحفل الليلة لأن عندي حرارة.' },
    { speaker: 'b', name: 'Jonas', de: 'Das tut mir leid! Hast du schon mit einem Arzt gesprochen?', ar: 'يؤسفني ذلك! هل تحدثتِ مع طبيب؟' },
    { speaker: 'a', name: 'Mona', de: 'Ja, ich war heute Morgen in der Praxis. Ich soll im Bett bleiben und viel trinken.', ar: 'نعم، كنتُ في العيادة هذا الصباح. عليّ أن أبقى في السرير وأشرب كثيرًا.' },
    { speaker: 'b', name: 'Jonas', de: 'Dann bleib bitte zu Hause. Die Gesundheit ist wichtiger als das Konzert.', ar: 'إذن ابقَي في البيت من فضلك. الصحة أهم من الحفل.' },
    { speaker: 'a', name: 'Mona', de: 'Aber die Karten haben so viel gekostet! Kannst du jemand anderen mitnehmen?', ar: 'لكن التذاكر كلّفت الكثير! هل يمكنك أن تأخذ شخصًا آخر معك؟' },
    { speaker: 'b', name: 'Jonas', de: 'Ich frage meinen Bruder. Er interessiert sich sehr für Musik.', ar: 'سأسأل أخي. فهو مهتم جدًا بالموسيقى.' },
    { speaker: 'a', name: 'Mona', de: 'Gute Idee! Schick mir später ein Foto vom Konzert.', ar: 'فكرة جيدة! أرسل لي لاحقًا صورة من الحفل.' },
    { speaker: 'b', name: 'Jonas', de: 'Mach ich. Und du ruhst dich gut aus!', ar: 'حسنًا سأفعل. وأنتِ ارتاحي جيدًا!' },
    { speaker: 'a', name: 'Mona', de: 'Danke, du bist ein echter Freund. Bis bald!', ar: 'شكرًا، أنت صديق حقيقي. إلى اللقاء قريبًا!' },
  ],
}
