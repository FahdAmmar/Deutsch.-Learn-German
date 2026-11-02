import type { ExamSet } from '@/types'

/**
 * Exam-style practice for A1: short everyday texts and announcements with a true/false statement and a
 * question each. The texts are written for this app in the style of such tasks; they are not taken from any
 * exam. Every answer can be found in the text or the recording, never in outside knowledge.
 */
export const a1ExamSets: ExamSet[] = [
  {
    id: 'a1-lesen-1',
    level: 'A1',
    part: 'lesen',
    titleAr: 'القراءة A1: لافتات ورسائل وإعلانات',
    descriptionAr: 'أربعة نصوص قصيرة من الحياة اليومية، ولكل نص سؤالان. اقرأ النص ثم اختر الإجابة.',
    suggestedMinutes: 10,
    tasks: [
      {
        id: 'a1-lesen-1-praxis',
        titleAr: 'لافتة عيادة',
        kindDe: 'Schild',
        textDe:
          'Praxis Dr. Becker\nSprechzeiten:\nMontag, Dienstag, Donnerstag: 8 bis 12 Uhr\nMittwoch: 14 bis 18 Uhr\nFreitag: geschlossen\nTermine: Telefon 030 5558 1234',
        items: [
          {
            id: 'a1-lesen-1-praxis-1',
            kind: 'true-false',
            statementDe: 'Am Freitag ist die Praxis geschlossen.',
            isTrue: true,
            explanationAr: 'في اللافتة: «Freitag: geschlossen»، أي أن العيادة مغلقة يوم الجمعة.',
          },
          {
            id: 'a1-lesen-1-praxis-2',
            kind: 'choice',
            questionDe: 'Wann ist die Praxis am Mittwoch offen?',
            options: ['von 8 bis 12 Uhr', 'von 14 bis 18 Uhr', 'den ganzen Tag'],
            correctIndex: 1,
            explanationAr: 'في اللافتة: «Mittwoch: 14 bis 18 Uhr». الساعات من 8 إلى 12 هي للإثنين والثلاثاء والخميس.',
          },
        ],
      },
      {
        id: 'a1-lesen-1-picknick',
        titleAr: 'رسالة من صديقة',
        kindDe: 'E-Mail',
        textDe:
          'Hallo Tom,\nam Samstag machen wir ein Picknick im Park. Wir treffen uns um 11 Uhr am Bahnhof. Bring bitte Getränke mit. Kuchen und Salat haben wir schon.\nBis Samstag!\nLena',
        items: [
          {
            id: 'a1-lesen-1-picknick-1',
            kind: 'true-false',
            statementDe: 'Tom soll Kuchen mitbringen.',
            isTrue: false,
            explanationAr: 'تطلب Lena من Tom: «Bring bitte Getränke mit»، أي المشروبات. وتقول: «Kuchen und Salat haben wir schon».',
          },
          {
            id: 'a1-lesen-1-picknick-2',
            kind: 'choice',
            questionDe: 'Wo treffen sich Lena und Tom?',
            options: ['im Park', 'am Bahnhof', 'bei Lena zu Hause'],
            correctIndex: 1,
            explanationAr: 'في الرسالة: «Wir treffen uns um 11 Uhr am Bahnhof». الحديقة هي مكان النزهة وليست مكان اللقاء.',
          },
        ],
      },
      {
        id: 'a1-lesen-1-fahrrad',
        titleAr: 'إعلان بيع',
        kindDe: 'Anzeige',
        textDe: 'Zu verkaufen: Fahrrad, blau, zwei Jahre alt, 80 Euro.\nTelefon: 0170 555 0199\nBitte nach 18 Uhr anrufen.',
        items: [
          {
            id: 'a1-lesen-1-fahrrad-1',
            kind: 'true-false',
            statementDe: 'Man soll am Vormittag anrufen.',
            isTrue: false,
            explanationAr: 'الإعلان يقول: «Bitte nach 18 Uhr anrufen»، أي بعد السادسة مساءً وليس في الصباح.',
          },
          {
            id: 'a1-lesen-1-fahrrad-2',
            kind: 'choice',
            questionDe: 'Wie viel kostet das Fahrrad?',
            options: ['2 Euro', '18 Euro', '80 Euro'],
            correctIndex: 2,
            explanationAr: 'السعر في الإعلان: «80 Euro». الرقم 2 هو عمر الدراجة (zwei Jahre alt)، والرقم 18 هو الساعة.',
          },
        ],
      },
      {
        id: 'a1-lesen-1-kurs',
        titleAr: 'إعلان عن دورة اللغة',
        kindDe: 'Aushang',
        textDe:
          'Deutschkurs A1\nDer Kurs am Montag fällt aus. Frau Weber ist krank.\nDer nächste Unterricht ist am Mittwoch um 9 Uhr in Raum 12.',
        items: [
          {
            id: 'a1-lesen-1-kurs-1',
            kind: 'true-false',
            statementDe: 'Der Kurs findet am Montag statt.',
            isTrue: false,
            explanationAr: '«fällt aus» تعني أن الحصة أُلغيت. السبب: «Frau Weber ist krank».',
          },
          {
            id: 'a1-lesen-1-kurs-2',
            kind: 'choice',
            questionDe: 'Wo ist der nächste Unterricht?',
            options: ['in Raum 9', 'in Raum 12', 'bei Frau Weber zu Hause'],
            correctIndex: 1,
            explanationAr: 'في الإعلان: «am Mittwoch um 9 Uhr in Raum 12». الرقم 9 هو الساعة وليس رقم القاعة.',
          },
        ],
      },
    ],
  },
  {
    id: 'a1-hoeren-1',
    level: 'A1',
    part: 'hoeren',
    titleAr: 'الاستماع A1: إعلانات ومكالمات قصيرة',
    descriptionAr: 'أربع تسجيلات قصيرة يقرؤها الجهاز بصوت ألماني. استمع ثم أجب. إن كنت في وضع الامتحان فلكل تسجيل تشغيلان فقط.',
    suggestedMinutes: 8,
    tasks: [
      {
        id: 'a1-hoeren-1-zug',
        titleAr: 'إعلان في محطة القطار',
        kindDe: 'Durchsage',
        audioDe:
          'Achtung, eine Durchsage. Der Zug nach München fährt heute von Gleis fünf. Er fährt um vierzehn Uhr dreißig ab.',
        items: [
          {
            id: 'a1-hoeren-1-zug-1',
            kind: 'choice',
            questionDe: 'Von welchem Gleis fährt der Zug?',
            options: ['Gleis 3', 'Gleis 5', 'Gleis 15'],
            correctIndex: 1,
            explanationAr: 'قيل: «von Gleis fünf»، أي الرصيف الخامس. انتبه إلى الفرق بين fünf (5) وfünfzehn (15).',
          },
          {
            id: 'a1-hoeren-1-zug-2',
            kind: 'true-false',
            statementDe: 'Der Zug fährt um 14 Uhr 30 ab.',
            isTrue: true,
            explanationAr: 'قيل: «um vierzehn Uhr dreißig»، أي الثانية والنصف ظهراً بنظام 24 ساعة.',
          },
        ],
      },
      {
        id: 'a1-hoeren-1-kino',
        titleAr: 'رسالة على الهاتف',
        kindDe: 'Nachricht',
        audioDe:
          'Hallo Maria, hier ist Jan. Ich kann morgen nicht ins Kino gehen. Ich muss arbeiten. Am Freitag habe ich Zeit. Ruf mich bitte an.',
        items: [
          {
            id: 'a1-hoeren-1-kino-1',
            kind: 'choice',
            questionDe: 'Warum kann Jan nicht ins Kino gehen?',
            options: ['Er ist krank.', 'Er muss arbeiten.', 'Er hat keine Karten.'],
            correctIndex: 1,
            explanationAr: 'قال Jan: «Ich muss arbeiten»، أي أن عليه أن يعمل.',
          },
          {
            id: 'a1-hoeren-1-kino-2',
            kind: 'true-false',
            statementDe: 'Jan hat am Freitag Zeit.',
            isTrue: true,
            explanationAr: 'قال: «Am Freitag habe ich Zeit»، أي أنه متفرّغ يوم الجمعة.',
          },
        ],
      },
      {
        id: 'a1-hoeren-1-angebot',
        titleAr: 'إعلان في السوبرماركت',
        kindDe: 'Durchsage',
        audioDe:
          'Liebe Kunden, heute im Angebot: Äpfel, ein Kilo nur ein Euro neunundneunzig. Auch Bananen sind heute billiger. Das Angebot gilt nur heute.',
        items: [
          {
            id: 'a1-hoeren-1-angebot-1',
            kind: 'choice',
            questionDe: 'Was kostet ein Kilo Äpfel?',
            options: ['1 Euro 99', '9 Euro 90', '1 Euro 90'],
            correctIndex: 0,
            explanationAr: 'قيل: «ein Euro neunundneunzig»، أي يورو واحد وتسعة وتسعون سنتاً.',
          },
          {
            id: 'a1-hoeren-1-angebot-2',
            kind: 'true-false',
            statementDe: 'Das Angebot gilt die ganze Woche.',
            isTrue: false,
            explanationAr: 'قيل: «Das Angebot gilt nur heute»، أي أن العرض لهذا اليوم فقط.',
          },
        ],
      },
      {
        id: 'a1-hoeren-1-cafe',
        titleAr: 'حوار في المقهى',
        kindDe: 'Dialog',
        audioDe:
          'Guten Tag, was möchten Sie? Einen Tee und ein Stück Kuchen, bitte. Gern. Das macht vier Euro fünfzig.',
        items: [
          {
            id: 'a1-hoeren-1-cafe-1',
            kind: 'choice',
            questionDe: 'Was bestellt der Gast?',
            options: ['Kaffee und Kuchen', 'Tee und Kuchen', 'Tee und Brot'],
            correctIndex: 1,
            explanationAr: 'قال الزبون: «Einen Tee und ein Stück Kuchen»، أي شاياً وقطعة كعك.',
          },
          {
            id: 'a1-hoeren-1-cafe-2',
            kind: 'choice',
            questionDe: 'Wie viel kostet es?',
            options: ['4 Euro 5', '4 Euro 50', '14 Euro 50'],
            correctIndex: 1,
            explanationAr: 'قيل: «vier Euro fünfzig»، أي أربعة يورو وخمسون سنتاً.',
          },
        ],
      },
    ],
  },
]
