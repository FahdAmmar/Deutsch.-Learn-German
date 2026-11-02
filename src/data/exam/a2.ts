import type { ExamSet } from '@/types'

/**
 * Exam-style practice for A2: longer everyday texts and recordings. Written for this app in the style of such
 * tasks; none of it is taken from an exam. The grammar stays within A2 (weil, comparatives, Perfekt).
 */
export const a2ExamSets: ExamSet[] = [
  {
    id: 'a2-lesen-1',
    level: 'A2',
    part: 'lesen',
    titleAr: 'القراءة A2: رسائل وإعلانات أطول',
    descriptionAr: 'أربعة نصوص من الحياة اليومية، ولكل نص سؤالان. الإجابة موجودة في النص دائماً.',
    suggestedMinutes: 15,
    tasks: [
      {
        id: 'a2-lesen-1-wohnung',
        titleAr: 'بريد عن شقة للإيجار',
        kindDe: 'E-Mail',
        textDe:
          'Liebe Frau Schmidt,\nich interessiere mich für die Wohnung in der Lindenstraße. Ist die Wohnung noch frei? Ich möchte sie gern am Samstag um 10 Uhr besichtigen. Wenn der Termin nicht passt, kann ich auch am Sonntag kommen.\nMit freundlichen Grüßen\nKarim Haddad',
        items: [
          {
            id: 'a2-lesen-1-wohnung-1',
            kind: 'choice',
            questionDe: 'Was möchte Herr Haddad?',
            options: ['Er möchte die Wohnung ansehen.', 'Er möchte die Wohnung kaufen.', 'Er möchte die Wohnung vermieten.'],
            correctIndex: 0,
            explanationAr: '«besichtigen» تعني معاينة المكان. يسأل إن كانت الشقة ما زالت شاغرة ويريد رؤيتها يوم السبت.',
          },
          {
            id: 'a2-lesen-1-wohnung-2',
            kind: 'true-false',
            statementDe: 'Herr Haddad kann nur am Samstag kommen.',
            isTrue: false,
            explanationAr: 'يكتب: «Wenn der Termin nicht passt, kann ich auch am Sonntag kommen»، أي يستطيع الحضور يوم الأحد أيضاً.',
          },
        ],
      },
      {
        id: 'a2-lesen-1-bibliothek',
        titleAr: 'خبر عن المكتبة',
        kindDe: 'Information',
        textDe:
          'Neue Öffnungszeiten in der Stadtbibliothek: Ab 1. November ist die Bibliothek länger geöffnet. Sie ist dann von Montag bis Samstag von 9 bis 19 Uhr offen. Am Sonntag bleibt sie geschlossen. Neu: Man kann Bücher jetzt auch im Internet verlängern.',
        items: [
          {
            id: 'a2-lesen-1-bibliothek-1',
            kind: 'choice',
            questionDe: 'Was ist neu?',
            options: [
              'Die Bibliothek ist auch sonntags offen.',
              'Man kann Bücher im Internet verlängern.',
              'Die Bibliothek ist jetzt kostenlos.',
            ],
            correctIndex: 1,
            explanationAr: 'بعد كلمة «Neu:» يقول النص: «Man kann Bücher jetzt auch im Internet verlängern». أما يوم الأحد فالمكتبة تبقى مغلقة.',
          },
          {
            id: 'a2-lesen-1-bibliothek-2',
            kind: 'true-false',
            statementDe: 'Am Samstag ist die Bibliothek geschlossen.',
            isTrue: false,
            explanationAr: 'النص: «von Montag bis Samstag von 9 bis 19 Uhr offen»، فالسبت داخل أيام الفتح. المغلق هو الأحد.',
          },
        ],
      },
      {
        id: 'a2-lesen-1-wetter',
        titleAr: 'نشرة الطقس لعطلة الأسبوع',
        kindDe: 'Wetterbericht',
        textDe:
          'Das Wetter am Wochenende: Am Samstag scheint in ganz Deutschland die Sonne. Es wird bis zu 22 Grad warm. Am Sonntag regnet es im Norden, im Süden bleibt es trocken. Wer am Sonntag in Hamburg ist, sollte einen Regenschirm mitnehmen.',
        items: [
          {
            id: 'a2-lesen-1-wetter-1',
            kind: 'true-false',
            statementDe: 'Am Samstag regnet es.',
            isTrue: false,
            explanationAr: 'النص: «Am Samstag scheint in ganz Deutschland die Sonne»، أي أن الشمس مشرقة يوم السبت. المطر يوم الأحد.',
          },
          {
            id: 'a2-lesen-1-wetter-2',
            kind: 'choice',
            questionDe: 'Wo bleibt es am Sonntag trocken?',
            options: ['im Norden', 'in Hamburg', 'im Süden'],
            correctIndex: 2,
            explanationAr: 'النص: «im Süden bleibt es trocken». أما في الشمال (ومنه Hamburg) فيمطر يوم الأحد.',
          },
        ],
      },
      {
        id: 'a2-lesen-1-ausflug',
        titleAr: 'رسالة إلى الزملاء',
        kindDe: 'Mitteilung',
        textDe:
          'Liebe Kolleginnen und Kollegen,\nunser Ausflug am Freitag beginnt später als geplant: nicht um 9 Uhr, sondern erst um 10 Uhr. Wir fahren mit dem Bus vom Parkplatz ab. Bitte seid pünktlich, weil der Bus nicht warten kann. Wer nicht mitkommen kann, sagt bitte bis Mittwoch Bescheid.',
        items: [
          {
            id: 'a2-lesen-1-ausflug-1',
            kind: 'choice',
            questionDe: 'Wann beginnt der Ausflug?',
            options: ['um 10 Uhr', 'um 9 Uhr', 'am Mittwoch'],
            correctIndex: 0,
            explanationAr: '«nicht um 9 Uhr, sondern erst um 10 Uhr»: الموعد تغيّر من التاسعة إلى العاشرة. أما الأربعاء فهو آخر موعد للإبلاغ عن عدم الحضور.',
          },
          {
            id: 'a2-lesen-1-ausflug-2',
            kind: 'true-false',
            statementDe: 'Wer nicht mitkommen kann, muss bis Mittwoch Bescheid sagen.',
            isTrue: true,
            explanationAr: 'النص: «Wer nicht mitkommen kann, sagt bitte bis Mittwoch Bescheid»، و«Bescheid sagen» تعني: يُبلغ.',
          },
        ],
      },
    ],
  },
  {
    id: 'a2-hoeren-1',
    level: 'A2',
    part: 'hoeren',
    titleAr: 'الاستماع A2: إعلانات وحوارات',
    descriptionAr: 'أربعة تسجيلات يقرؤها الجهاز بصوت ألماني. استمع ثم أجب. في وضع الامتحان لكل تسجيل تشغيلان فقط.',
    suggestedMinutes: 12,
    tasks: [
      {
        id: 'a2-hoeren-1-kaufhaus',
        titleAr: 'إعلان في المتجر الكبير',
        kindDe: 'Durchsage',
        audioDe:
          'Achtung, liebe Kunden. In zehn Minuten schließt das Kaufhaus. Bitte gehen Sie jetzt zur Kasse. Morgen sind wir ab neun Uhr wieder für Sie da.',
        items: [
          {
            id: 'a2-hoeren-1-kaufhaus-1',
            kind: 'choice',
            questionDe: 'Wann schließt das Kaufhaus?',
            options: ['in zehn Minuten', 'um neun Uhr', 'morgen'],
            correctIndex: 0,
            explanationAr: 'قيل: «In zehn Minuten schließt das Kaufhaus»، أي يُغلق بعد عشر دقائق. التاسعة هي موعد فتحه غداً.',
          },
          {
            id: 'a2-hoeren-1-kaufhaus-2',
            kind: 'true-false',
            statementDe: 'Morgen öffnet das Kaufhaus um 9 Uhr.',
            isTrue: true,
            explanationAr: 'قيل: «Morgen sind wir ab neun Uhr wieder für Sie da»، أي نعود لخدمتكم غداً من التاسعة.',
          },
        ],
      },
      {
        id: 'a2-hoeren-1-praxis',
        titleAr: 'رسالة مسجّلة من عيادة',
        kindDe: 'Telefonansage',
        audioDe:
          'Guten Tag, Sie sind verbunden mit der Praxis Doktor Keller. Unsere Sprechstunde ist heute leider schon zu Ende. Bei einem Notfall rufen Sie bitte die eins eins zwei an. Für einen Termin rufen Sie morgen ab acht Uhr wieder an.',
        items: [
          {
            id: 'a2-hoeren-1-praxis-1',
            kind: 'choice',
            questionDe: 'Was soll man bei einem Notfall tun?',
            options: ['morgen wieder anrufen', 'die 112 anrufen', 'in die Praxis kommen'],
            correctIndex: 1,
            explanationAr: 'قيل: «Bei einem Notfall rufen Sie bitte die eins eins zwei an»، أي في الحالة الطارئة اتصل بالرقم 112.',
          },
          {
            id: 'a2-hoeren-1-praxis-2',
            kind: 'true-false',
            statementDe: 'Die Praxis ist heute noch geöffnet.',
            isTrue: false,
            explanationAr: 'قيل: «Unsere Sprechstunde ist heute leider schon zu Ende»، أي انتهت ساعات الاستقبال اليوم.',
          },
        ],
      },
      {
        id: 'a2-hoeren-1-weg',
        titleAr: 'سؤال عن الطريق',
        kindDe: 'Dialog',
        audioDe:
          'Entschuldigung, wo ist die Post? Gehen Sie hier geradeaus bis zur Ampel. Dort biegen Sie links ab. Die Post ist dann auf der rechten Seite, neben der Bäckerei.',
        items: [
          {
            id: 'a2-hoeren-1-weg-1',
            kind: 'choice',
            questionDe: 'Wo biegt man links ab?',
            options: ['an der Bäckerei', 'an der Ampel', 'an der Post'],
            correctIndex: 1,
            explanationAr: 'قيل: «bis zur Ampel. Dort biegen Sie links ab»، أي عند إشارة المرور تنعطف يساراً.',
          },
          {
            id: 'a2-hoeren-1-weg-2',
            kind: 'choice',
            questionDe: 'Wo ist die Post?',
            options: ['neben der Bäckerei', 'neben der Ampel', 'gegenüber dem Bahnhof'],
            correctIndex: 0,
            explanationAr: 'قيل: «auf der rechten Seite, neben der Bäckerei»، أي على الجانب الأيمن بجانب المخبز.',
          },
        ],
      },
      {
        id: 'a2-hoeren-1-nora',
        titleAr: 'رسالة صوتية من زميلة',
        kindDe: 'Nachricht',
        audioDe:
          'Hallo Tim, ich bin es, Nora. Ich habe leider verschlafen und komme heute eine Stunde später ins Büro. Kannst du bitte den Termin mit Herrn Franke um elf Uhr übernehmen? Ich bin gegen halb zehn da. Danke!',
        items: [
          {
            id: 'a2-hoeren-1-nora-1',
            kind: 'choice',
            questionDe: 'Warum kommt Nora später?',
            options: ['Sie ist krank.', 'Sie hat verschlafen.', 'Sie hat einen Termin.'],
            correctIndex: 1,
            explanationAr: 'قالت: «Ich habe leider verschlafen»، أي أنها نامت أكثر من اللازم. وهذه جملة Perfekt: habe + Partizip II.',
          },
          {
            id: 'a2-hoeren-1-nora-2',
            kind: 'true-false',
            statementDe: 'Tim soll den Termin um elf Uhr übernehmen.',
            isTrue: true,
            explanationAr: 'طلبت منه: «Kannst du bitte den Termin mit Herrn Franke um elf Uhr übernehmen?»، أي أن يتولّى موعد الحادية عشرة.',
          },
        ],
      },
    ],
  },
]
