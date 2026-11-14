import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, verb } from './builders'

export const lessonSchule: Lesson = defineTheme({
  number: 3,
  slug: 'schule-und-schulfaecher',
  title: 'Schule und Schulfächer',
  titleAr: 'المدرسة والمواد الدراسية',
  categoryAr: 'المدرسة والمواد الدراسية',
  objectivesAr: [
    'تسمية المواد الدراسية وأدوات الصف',
    'قول مادتك المفضلة: Mein Lieblingsfach ist …',
    'قول ما تحتاجه في الصف: Ich brauche ein Heft und einen Stift',
  ],
  explanation: [
    {
      titleAr: 'المواد الدراسية بلا أداة',
      bodyAr:
        'نذكر المادة الدراسية **بلا أداة** عند الحديث عنها: **Ich habe Mathematik am Montag.** **Geschichte ist interessant.** **Mein Lieblingsfach ist Biologie.** (die Mathematik، die Biologie … لها أداة، لكننا نادراً ما نحتاجها في الجملة.)',
    },
    {
      titleAr: 'أدوات الصف: ein / eine / einen',
      bodyAr:
        'للأدوات نستعمل أداة التنكير: **Ich brauche ein Heft** (das Heft)، **einen Stift** (der Stift، وفي Akkusativ einen)، **eine Tafel** (die Tafel). والسؤال: **Was brauchst du für die Schule؟**',
    },
    {
      titleAr: 'Schüler وStudent',
      bodyAr:
        '**der Schüler / die Schülerin** هو من يدرس في المدرسة. أما **der Student / die Studentin** فهو من يدرس في الجامعة. لا تخلط بينهما، فالمعنى يختلف.',
    },
  ],
  examples: [
    { de: 'Mein Lieblingsfach ist Biologie.', ar: 'مادتي المفضلة هي الأحياء.' },
    { de: 'Am Montag haben wir Mathematik und Sport.', ar: 'يوم الاثنين عندنا رياضيات ورياضة بدنية.' },
    { de: 'Ich brauche ein Heft und einen Stift.', ar: 'أحتاج دفتراً وقلماً.' },
    { de: 'Die Schülerin schreibt an die Tafel.', ar: 'الطالبة (في المدرسة) تكتب على السبورة.' },
    { de: 'Geschichte ist nicht leicht.', ar: 'التاريخ ليس سهلاً.' },
    { de: 'Mein Bruder ist Schüler.', ar: 'أخي تلميذ في المدرسة.' },
    { de: 'Wir rechnen im Unterricht viel.', ar: 'نحسب كثيراً في الحصة.' },
    { de: 'Ich schreibe mit dem Kugelschreiber.', ar: 'أكتب بقلم الحبر.' },
  ],
  words: [
    noun('der', 'Schüler', 'Schüler', 'التلميذ', 'Mein Bruder ist Schüler.', 'أخي تلميذ في المدرسة.'),
    noun('die', 'Schülerin', 'Schülerinnen', 'التلميذة', 'Die Schülerin liest ein Buch.', 'التلميذة تقرأ كتاباً.'),
    noun('die', 'Tafel', 'Tafeln', 'السبورة', 'Die Lehrerin schreibt an die Tafel.', 'المعلمة تكتب على السبورة.'),
    noun('das', 'Heft', 'Hefte', 'الدفتر', 'Ich brauche ein Heft.', 'أحتاج دفتراً.'),
    noun('der', 'Stift', 'Stifte', 'القلم', 'Hast du einen Stift?', 'هل عندك قلم؟'),
    noun('der', 'Kugelschreiber', 'Kugelschreiber', 'قلم الحبر الجاف', 'Ich schreibe mit dem Kugelschreiber.', 'أكتب بقلم الحبر.'),
    noun('das', 'Lieblingsfach', 'Lieblingsfächer', 'المادة المفضلة', 'Mein Lieblingsfach ist Sport.', 'مادتي المفضلة هي الرياضة.'),
    nounNoPlural('die', 'Mathematik', 'الرياضيات', 'Mathematik ist mein Lieblingsfach.', 'الرياضيات مادتي المفضلة.'),
    nounNoPlural('die', 'Biologie', 'الأحياء', 'Biologie finde ich interessant.', 'أجد الأحياء ممتعة.'),
    nounNoPlural('die', 'Chemie', 'الكيمياء', 'Chemie ist schwer für mich.', 'الكيمياء صعبة عليّ.'),
    nounNoPlural('die', 'Physik', 'الفيزياء', 'Heute haben wir Physik.', 'اليوم عندنا فيزياء.'),
    nounNoPlural('die', 'Geschichte', 'التاريخ (المادة)', 'Geschichte ist nicht leicht.', 'التاريخ ليس سهلاً.'),
    nounNoPlural('der', 'Sport', 'الرياضة البدنية', 'Wir haben um zehn Uhr Sport.', 'عندنا رياضة في الساعة العاشرة.'),
    nounNoPlural('die', 'Kunst', 'الفنون', 'Kunst macht mir Spaß.', 'الفنون تمتعني.'),
    nounNoPlural('die', 'Musik', 'الموسيقى (المادة)', 'Musik ist am Mittwoch.', 'الموسيقى يوم الأربعاء.'),
    nounNoPlural('die', 'Informatik', 'علوم الحاسوب', 'In Informatik lernen wir programmieren.', 'نتعلم في الحاسوب البرمجة.'),
    verb('rechnen', 'يحسب', { praeteritum: 'rechnete', partizip: 'gerechnet', auxiliary: 'haben' }, 'Wir rechnen im Unterricht viel.', 'نحسب كثيراً في الحصة.'),
    verb('zeichnen', 'يرسم', { praeteritum: 'zeichnete', partizip: 'gezeichnet', auxiliary: 'haben' }, 'Mein Sohn zeichnet gern.', 'ابني يحب الرسم.'),
    adjective('leicht', 'سهل / خفيف', 'Die Aufgabe ist leicht.', 'المهمة سهلة.'),
    adjective('schwer', 'صعب / ثقيل', 'Die Prüfung ist schwer.', 'الامتحان صعب.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich bin Student in der Schule.',
      correct: 'Ich bin Schüler in der Schule.',
      explanationAr: 'Student للجامعة، وSchüler للمدرسة.',
    },
    {
      wrong: 'Ich brauche eine Stift.',
      correct: 'Ich brauche einen Stift.',
      explanationAr: 'Stift مذكّر، وفي Akkusativ يصبح einen Stift.',
    },
  ],
})
