import type { Dialogue } from '@/types'

export const conversationImTreppenhaus: Dialogue = {
  id: 'dialogue-a2-im-treppenhaus',
  level: 'A2',
  moduleId: 'a2-m22',
  titleDe: 'Im Treppenhaus',
  titleAr: 'في درج البناية',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Frau Becker', de: 'Guten Tag! Sind Sie der neue Nachbar? Ich wohne im zweiten Stock.', ar: 'نهارك سعيد! هل أنت الجار الجديد؟ أنا أسكن في الطابق الثاني.' },
    { speaker: 'b', name: 'Omar', de: 'Guten Tag, Frau Becker. Ja, ich bin gestern eingezogen. Kann ich Sie etwas fragen?', ar: 'نهارك سعيد يا سيدة بيكر. نعم، انتقلت أمس. هل يمكنني أن أسألك شيئاً؟' },
    { speaker: 'a', name: 'Frau Becker', de: 'Natürlich. Hier gibt es eine Hausordnung. Sie hängt im Treppenhaus.', ar: 'طبعاً. هنا يوجد نظام للبناية. وهو معلّق في الدرج.' },
    { speaker: 'b', name: 'Omar', de: 'Danke. Wohin kommt der Müll? Ich habe viele Flaschen und Papier.', ar: 'شكراً. أين توضع النفايات؟ عندي زجاجات كثيرة وورق.' },
    { speaker: 'a', name: 'Frau Becker', de: 'Das Altpapier kommt in die blaue Tonne, der Restmüll in die graue Tonne. Die Flaschen bringen Sie zum Supermarkt zurück, dort bekommen Sie Pfand.', ar: 'الورق في الحاوية الزرقاء والنفايات المتبقية في الرمادية. والزجاجات تعيدها إلى السوبرماركت، وهناك تستعيد مبلغ الرهن.' },
    { speaker: 'b', name: 'Omar', de: 'Ah, ich verstehe. Muss ich auch etwas bei der Stadt anmelden?', ar: 'آه، فهمت. هل عليّ أن أسجّل شيئاً لدى البلدية؟' },
    { speaker: 'a', name: 'Frau Becker', de: 'Ja, Sie müssen sich innerhalb von zwei Wochen anmelden. Sie brauchen Ihren Pass und den Mietvertrag.', ar: 'نعم، عليك أن تسجّل نفسك خلال أسبوعين. تحتاج إلى جواز السفر وعقد الإيجار.' },
    { speaker: 'b', name: 'Omar', de: 'Danke für den Tipp. Und wann muss ich leise sein?', ar: 'شكراً على النصيحة. ومتى يجب أن أكون هادئاً؟' },
    { speaker: 'a', name: 'Frau Becker', de: 'Nachts ab zweiundzwanzig Uhr gilt die Nachtruhe. Und am Sonntag sind die Geschäfte geschlossen, da ist auch Sonntagsruhe.', ar: 'ليلاً بعد العاشرة يسود هدوء الليل. ويوم الأحد تُغلق المحلات، وهناك أيضاً هدوء الأحد.' },
    { speaker: 'b', name: 'Omar', de: 'Alles klar. Vielen Dank, Frau Becker. Auf Wiedersehen!', ar: 'مفهوم. شكراً جزيلاً يا سيدة بيكر. إلى اللقاء!' },
  ],
}
