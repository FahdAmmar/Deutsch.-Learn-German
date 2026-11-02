import type { WritingTask } from '@/types'

/**
 * A2 writing tasks: messages of five to eight sentences with a reason, a request or a short report.
 * The model answers use what A2 teaches (Perfekt, weil, indirect questions) and no Konjunktiv II.
 */
export const a2WritingTasks: WritingTask[] = [
  {
    id: 'a2-write-01-absage',
    level: 'A2',
    register: 'informal',
    titleAr: 'الاعتذار عن حضور حفل مع اقتراح موعد بديل',
    titleDe: 'Eine Einladung absagen',
    situationDe:
      'Dein Freund Markus hat dich zum Grillfest am Samstag eingeladen. Du kannst nicht kommen. Schreibe ihm eine Nachricht.',
    situationAr:
      'دعاك صديقك Markus إلى حفلة شواء يوم السبت ولا تستطيع الحضور. اكتب له رسالة تعتذر فيها وتقترح موعداً آخر.',
    minWords: 40,
    points: [
      {
        id: 'decline',
        textAr: 'اشكره على الدعوة واعتذر عن الحضور.',
        promptDe: 'Danke und Absage',
        patterns: ['danke', 'leider', 'kann (leider )?nicht', 'tut mir leid'],
      },
      {
        id: 'reason',
        textAr: 'اذكر السبب باستعمال weil أو denn.',
        promptDe: 'Grund: Warum nicht?',
        patterns: ['\\bweil\\b', '\\bdenn\\b', 'muss', 'arbeit', 'krank', 'besuch', 'pruefung'],
      },
      {
        id: 'suggestion',
        textAr: 'اقترح موعداً آخر للقاء.',
        promptDe: 'Vorschlag: Neuer Termin',
        patterns: ['wie waere es', 'vorschlag', 'vielleicht', 'sollen wir', 'treffen wir', 'naechste', 'naechsten'],
      },
    ],
    usefulPhrases: [
      { de: 'Vielen Dank für die Einladung.', ar: 'شكراً جزيلاً على الدعوة.' },
      { de: 'Leider kann ich nicht kommen, weil ich arbeiten muss.', ar: 'للأسف لا أستطيع الحضور لأن عليّ أن أعمل.' },
      { de: 'Das tut mir wirklich leid.', ar: 'أنا آسف حقاً.' },
      { de: 'Wie wäre es mit nächstem Wochenende?', ar: 'ما رأيك في عطلة الأسبوع القادمة؟' },
    ],
    modelAnswer:
      'Lieber Markus,\nvielen Dank für die Einladung zum Grillfest. Leider kann ich nicht kommen, weil ich am Samstag arbeiten muss. Das tut mir wirklich leid. Wie wäre es mit nächstem Wochenende? Dann können wir uns bei mir treffen und zusammen kochen. Ich hoffe, ihr habt viel Spaß!\nLiebe Grüße\nTarek',
    modelAnswerAr:
      'عزيزي ماركوس، شكراً جزيلاً على دعوتك إلى حفلة الشواء. للأسف لا أستطيع الحضور لأن عليّ العمل يوم السبت، وأنا آسف حقاً. ما رأيك في عطلة الأسبوع القادمة؟ يمكننا حينها أن نلتقي عندي ونطبخ معاً. أتمنى لكم وقتاً ممتعاً! تحياتي الودّية، طارق',
  },
  {
    id: 'a2-write-02-reklamation',
    level: 'A2',
    register: 'formal',
    titleAr: 'شكوى من طلب غير مناسب والرغبة في استبداله',
    titleDe: 'Eine Beschwerde schreiben',
    situationDe:
      'Du hast im Internet eine Jacke bestellt. Sie ist zu klein. Schreibe eine E-Mail an den Kundenservice.',
    situationAr:
      'طلبتَ سترة عبر الإنترنت لكنها صغيرة عليك. اكتب بريداً رسمياً إلى خدمة العملاء، وخاطبهم بـ Sie.',
    minWords: 40,
    points: [
      {
        id: 'order',
        textAr: 'اذكر ما طلبته ومتى.',
        promptDe: 'Bestellung: Was? Wann?',
        patterns: ['bestell', 'bestellnummer', '\\d{1,2}\\. ?(januar|februar|maerz|april|mai|juni|juli|august|september|oktober|november|dezember)'],
      },
      {
        id: 'problem',
        textAr: 'اشرح المشكلة.',
        promptDe: 'Problem',
        patterns: ['zu klein', 'zu gross', 'passt', 'falsch', 'kaputt', 'defekt', 'beschaedigt'],
      },
      {
        id: 'wish',
        textAr: 'ماذا تريد: استبدال أم إرجاع؟',
        promptDe: 'Wunsch: Umtausch oder Geld zurück?',
        patterns: ['umtausch', 'tausch', 'zurueck', 'ersetz', 'groesse'],
      },
    ],
    usefulPhrases: [
      { de: 'Ich habe am 5. Oktober eine Jacke bestellt.', ar: 'طلبتُ سترة في الخامس من أكتوبر.' },
      { de: 'Leider ist die Jacke zu klein.', ar: 'للأسف السترة صغيرة جداً.' },
      { de: 'Ich möchte die Jacke umtauschen.', ar: 'أريد استبدال السترة.' },
      { de: 'Bitte schreiben Sie mir, wie ich die Jacke zurückschicken kann.', ar: 'أرجو أن تكتبوا لي كيف أعيد السترة.' },
    ],
    modelAnswer:
      'Sehr geehrte Damen und Herren,\nich habe am 5. Oktober eine Jacke in Größe M bei Ihnen bestellt. Leider ist die Jacke zu klein und passt mir nicht. Ich möchte sie gern in Größe L umtauschen. Bitte schreiben Sie mir, wie ich die Jacke zurückschicken kann.\nMit freundlichen Grüßen\nTarek Ali',
    modelAnswerAr:
      'السادة المحترمون، طلبتُ منكم في الخامس من أكتوبر سترة بالمقاس M. للأسف السترة صغيرة ولا تناسبني. أود استبدالها بالمقاس L. أرجو أن تكتبوا لي كيف يمكنني إعادة السترة. مع خالص التحية، طارق علي',
  },
  {
    id: 'a2-write-03-heizung',
    level: 'A2',
    register: 'formal',
    titleAr: 'إبلاغ مالك البيت بعطل في التدفئة',
    titleDe: 'Dem Vermieter schreiben',
    situationDe:
      'Die Heizung in deiner Wohnung funktioniert nicht. Schreibe eine E-Mail an deinen Vermieter, Herrn Müller.',
    situationAr: 'التدفئة في شقتك لا تعمل. اكتب بريداً رسمياً إلى مالك الشقة السيد Müller.',
    minWords: 40,
    points: [
      {
        id: 'problem',
        textAr: 'ما المشكلة؟',
        promptDe: 'Problem',
        patterns: ['heizung', 'funktioniert nicht', 'kaputt', 'defekt'],
      },
      {
        id: 'since',
        textAr: 'منذ متى؟',
        promptDe: 'Seit wann?',
        patterns: ['\\bseit\\b', 'tagen', 'woche', 'gestern'],
      },
      {
        id: 'request',
        textAr: 'ماذا تطلب؟ ومتى تكون في البيت؟',
        promptDe: 'Bitte und Termin',
        patterns: ['bitte', 'handwerker', 'reparatur', 'schicken', 'termin', 'zu hause'],
      },
    ],
    usefulPhrases: [
      { de: 'Seit drei Tagen funktioniert die Heizung nicht.', ar: 'منذ ثلاثة أيام لا تعمل التدفئة.' },
      { de: 'Abends ist es sehr kalt in der Wohnung.', ar: 'في المساء يكون البرد شديداً في الشقة.' },
      { de: 'Bitte schicken Sie einen Handwerker.', ar: 'أرجو أن ترسلوا عاملاً مختصاً.' },
      { de: 'Ich bin ab 16 Uhr zu Hause.', ar: 'أكون في البيت بعد الساعة الرابعة عصراً.' },
    ],
    modelAnswer:
      'Sehr geehrter Herr Müller,\nseit drei Tagen funktioniert die Heizung in meiner Wohnung nicht. Abends ist es sehr kalt, und ich kann nicht gut schlafen. Bitte schicken Sie so schnell wie möglich einen Handwerker. Ich bin ab 16 Uhr zu Hause.\nMit freundlichen Grüßen\nTarek Ali',
    modelAnswerAr:
      'السيد Müller المحترم، منذ ثلاثة أيام لا تعمل التدفئة في شقتي. المساء بارد جداً ولا أستطيع النوم جيداً. أرجو أن ترسلوا عاملاً مختصاً في أسرع وقت. أكون في البيت بعد الساعة الرابعة عصراً. مع خالص التحية، طارق علي',
  },
  {
    id: 'a2-write-04-wochenende',
    level: 'A2',
    register: 'informal',
    titleAr: 'ماذا فعلتَ في عطلة نهاية الأسبوع؟',
    titleDe: 'Vom Wochenende berichten',
    situationDe:
      'Deine Freundin Sara fragt: „Was hast du am Wochenende gemacht?“ Schreibe ihr eine Antwort.',
    situationAr:
      'سألتك صديقتك Sara: «ماذا فعلتَ في عطلة نهاية الأسبوع؟». اكتب لها جواباً تستعمل فيه الـ Perfekt.',
    minWords: 40,
    points: [
      {
        id: 'what',
        textAr: 'ماذا فعلتَ وأين؟ (بالـ Perfekt)',
        promptDe: 'Was? Wo?',
        patterns: ['\\b(habe|haben|hast|bin|sind)\\b'],
      },
      { id: 'who', textAr: 'مع من؟', promptDe: 'Mit wem?', patterns: ['\\bmit\\b'] },
      {
        id: 'opinion',
        textAr: 'كيف كان؟ هل أعجبك؟',
        promptDe: 'Wie war es?',
        patterns: ['schoen', 'toll', 'super', 'lustig', 'langweilig', 'anstrengend', 'gefallen', 'spass'],
      },
    ],
    usefulPhrases: [
      { de: 'Am Wochenende war ich in Köln.', ar: 'في عطلة نهاية الأسبوع كنتُ في كولن.' },
      { de: 'Wir haben den Dom besucht.', ar: 'زرنا الكاتدرائية.' },
      { de: 'Wir sind am Rhein spazieren gegangen.', ar: 'تمشّينا على ضفة نهر الراين.' },
      { de: 'Es war ein wunderschönes Wochenende.', ar: 'كانت عطلة نهاية أسبوع جميلة جداً.' },
    ],
    modelAnswer:
      'Liebe Sara,\nam Wochenende war ich mit meiner Familie in Köln. Wir haben den Dom besucht und sind am Rhein spazieren gegangen. Am Abend haben wir in einem Restaurant gegessen. Es war ein wunderschönes Wochenende, aber ich bin jetzt sehr müde. Und was hast du gemacht?\nViele Grüße\nTarek',
    modelAnswerAr:
      'عزيزتي سارة، في عطلة نهاية الأسبوع كنتُ مع عائلتي في كولن. زرنا الكاتدرائية وتمشّينا على ضفة الراين، وفي المساء تعشّينا في مطعم. كانت عطلة جميلة جداً لكنني الآن متعب. وأنتِ، ماذا فعلتِ؟ تحياتي، طارق',
  },
]
