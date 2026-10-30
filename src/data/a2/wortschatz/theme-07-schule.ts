import type { Lesson } from '@/types'

import { defineTheme, noun, nounNoPlural, nounPluralOnly, verb } from './builders'

export const lessonSchule: Lesson = defineTheme({
  number: 7,
  slug: 'schule-und-lernen',
  title: 'Schule und Lernen',
  titleAr: 'المدرسة والدراسة',
  categoryAr: 'المدرسة والدراسة',
  objectivesAr: [
    'التفريق بين Kurs وUnterricht وKlasse وبين Ausbildung وStudium',
    'الحديث عن الواجبات والاختبارات والعلامات والإجازات',
    'استعمال أفعال الدراسة: üben وwiederholen وverstehen وanfangen',
    'سؤال المعلم وطلب الشرح بعبارات مهذّبة',
  ],
  explanation: [
    {
      titleAr: 'Kurs وUnterricht وKlasse',
      bodyAr:
        '«der Kurs» دورة تتعلّم فيها موضوعاً (Deutschkurs). و«der Unterricht» هو الدرس نفسه أي التدريس في الصف: «Der Unterricht beginnt um neun». و«die Klasse» مجموعة التلاميذ في المدرسة. وللحصة الواحدة تقول «die Stunde».',
    },
    {
      titleAr: 'Ausbildung أم Studium؟',
      bodyAr:
        '«die Ausbildung» تدريب مهني تتعلّم فيه مهنة محدّدة، وغالباً يجمع بين العمل في شركة والدراسة في مدرسة مهنية. أما «das Studium» فهو الدراسة في الجامعة. وتقول: «Sie macht eine Ausbildung als Krankenschwester» و«Er studiert an der Universität».',
    },
    {
      titleAr: 'كلمات المعلّم المفيدة',
      bodyAr:
        'للسؤال قل: «Darf ich eine Frage stellen؟» (هل يمكنني أن أسأل؟). ولطلب الإعادة: «Können Sie das bitte wiederholen؟». وللشرح: «Können Sie das bitte erklären؟». وإذا لم تفهم قل ببساطة: «Ich verstehe das nicht».',
    },
  ],
  examples: [
    { de: 'Der Kurs beginnt im Oktober.', ar: 'تبدأ الدورة في أكتوبر.' },
    { de: 'Der Unterricht fängt um neun Uhr an.', ar: 'يبدأ الدرس في الساعة التاسعة.' },
    { de: 'Darf ich eine Frage stellen?', ar: 'هل يمكنني أن أطرح سؤالاً؟' },
    { de: 'Bitte wiederholen Sie den Satz.', ar: 'من فضلكم، أعيدوا الجملة.' },
    { de: 'Ich übe jeden Tag Deutsch.', ar: 'أتدرّب على الألمانية كل يوم.' },
  ],
  words: [
    noun('der', 'Kurs', 'Kurse', 'الدورة', 'Der Kurs beginnt im Oktober.', 'تبدأ الدورة في أكتوبر.'),
    nounNoPlural('der', 'Unterricht', 'الدرس (التدريس)', 'Der Unterricht beginnt um neun Uhr.', 'يبدأ الدرس في الساعة التاسعة.'),
    noun('die', 'Klasse', 'Klassen', 'الصف (مجموعة التلاميذ)', 'Wie viele Kinder sind in der Klasse?', 'كم طفلاً في الصف؟'),
    noun('die', 'Hausaufgabe', 'Hausaufgaben', 'الواجب المنزلي', 'Ich mache die Hausaufgaben am Nachmittag.', 'أحلّ الواجبات في فترة بعد الظهر.'),
    noun('der', 'Test', 'Tests', 'الاختبار القصير', 'Morgen schreiben wir einen Test.', 'غداً نكتب اختباراً.'),
    noun('die', 'Note', 'Noten', 'العلامة (الدرجة)', 'Welche Note hast du bekommen?', 'أيّ علامة حصلت عليها؟'),
    noun('die', 'Universität', 'Universitäten', 'الجامعة', 'Er studiert an der Universität in Köln.', 'يدرس في الجامعة في كولونيا.'),
    nounNoPlural('das', 'Studium', 'الدراسة الجامعية', 'Mein Studium dauert drei Jahre.', 'تستغرق دراستي الجامعية ثلاث سنوات.'),
    noun('das', 'Fach', 'Fächer', 'المادة الدراسية', 'Welches Fach magst du am liebsten?', 'أيّ مادة تحبّها أكثر؟'),
    noun('der', 'Stundenplan', 'Stundenpläne', 'الجدول الدراسي', 'Mein Stundenplan ist voll.', 'جدولي الدراسي مزدحم.'),
    nounPluralOnly('Ferien', 'العطلة المدرسية', 'In den Ferien fahren wir ans Meer.', 'في العطلة نسافر إلى البحر.'),
    noun('das', 'Wörterbuch', 'Wörterbücher', 'القاموس', 'Ich benutze ein Wörterbuch.', 'أستعمل قاموساً.'),
    noun('die', 'Aufgabe', 'Aufgaben', 'المهمة / التمرين', 'Die Aufgabe ist nicht schwer.', 'التمرين ليس صعباً.'),
    noun('der', 'Fehler', 'Fehler', 'الخطأ', 'Ich habe nur einen Fehler gemacht.', 'ارتكبتُ خطأً واحداً فقط.'),
    noun('die', 'Antwort', 'Antworten', 'الإجابة', 'Die Antwort ist richtig.', 'الإجابة صحيحة.'),
    noun('die', 'Frage', 'Fragen', 'السؤال', 'Darf ich eine Frage stellen?', 'هل يمكنني أن أطرح سؤالاً؟'),
    noun('die', 'Übung', 'Übungen', 'التمرين (التدريب)', 'Die Übung ist leicht.', 'التمرين سهل.'),
    noun('die', 'Ausbildung', 'Ausbildungen', 'التدريب المهني', 'Meine Schwester macht eine Ausbildung als Krankenschwester.', 'تقوم أختي بتدريب مهني لتصبح ممرضة.'),
    verb('üben', 'يتدرّب', { praeteritum: 'übte', partizip: 'geübt', auxiliary: 'haben' }, 'Ich übe jeden Tag Deutsch.', 'أتدرّب على الألمانية كل يوم.'),
    verb('wiederholen', 'يكرّر / يراجع', { praeteritum: 'wiederholte', partizip: 'wiederholt', auxiliary: 'haben' }, 'Bitte wiederholen Sie den Satz.', 'من فضلكم، أعيدوا الجملة.'),
    verb('erklären', 'يشرح', { praeteritum: 'erklärte', partizip: 'erklärt', auxiliary: 'haben' }, 'Kannst du mir das erklären?', 'هل يمكنك أن تشرح لي هذا؟'),
    verb('verstehen', 'يفهم', { praeteritum: 'verstand', partizip: 'verstanden', auxiliary: 'haben' }, 'Ich verstehe das nicht.', 'لا أفهم هذا.'),
    verb('übersetzen', 'يترجم', { praeteritum: 'übersetzte', partizip: 'übersetzt', auxiliary: 'haben' }, 'Ich übersetze den Text.', 'أترجم النص.'),
    verb(
      'anfangen',
      'يبدأ',
      { present: ['fange', 'fängst', 'fängt', 'fangen', 'fangt', 'fangen'], praeteritum: 'fing', partizip: 'angefangen', auxiliary: 'haben', separablePrefix: 'an' },
      'Der Unterricht fängt um neun Uhr an.',
      'يبدأ الدرس في الساعة التاسعة.',
    ),
    verb(
      'vergessen',
      'ينسى',
      { present: ['vergesse', 'vergisst', 'vergisst', 'vergessen', 'vergesst', 'vergessen'], praeteritum: 'vergaß', partizip: 'vergessen', auxiliary: 'haben' },
      'Ich habe die Hausaufgaben vergessen.',
      'نسيتُ الواجبات المنزلية.',
    ),
  ],
  commonMistakes: [
    {
      wrong: 'Ich habe einen Frage.',
      correct: 'Ich habe eine Frage.',
      explanationAr: 'Frage مؤنثة، فتأخذ eine في حالة المفعول به أيضاً. تعلّم الاسم دائماً مع أداته.',
    },
    {
      wrong: 'Ich studiere in der Universität.',
      correct: 'Ich studiere an der Universität.',
      explanationAr: 'مع الجامعة يُستعمل حرف الجر an: «an der Universität»، وهو تعبير ثابت للدراسة فيها.',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ö وü في Wörterbuch وÜbung',
      bodyAr: 'ö تُنطق بشفتين مدوّرتين مع صوت «إي»، وü مع صوت «ي». الاثنتان غير موجودتين في العربية، فتدرّب عليهما بالمرآة.',
      example: 'Übung',
    },
  ],
})
