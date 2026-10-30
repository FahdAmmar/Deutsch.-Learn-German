/**
 * One Arabic → German translation task per lesson, written by hand.
 *
 * A translation is checked by comparing the learner's text with `de`, so every
 * answer a native speaker would call correct has to be listed: German word order
 * is flexible (the time phrase may open the sentence), du and Sie are both
 * correct for an Arabic "you", and some meanings have two natural verbs. A
 * sentence taken from an example would reject all of these — which is why these
 * are authored, and why `src/data/translationTasks.test.ts` checks their shape.
 *
 * Keep each sentence short and inside what the lesson (and the ones before it) teaches.
 * Spelling variants with ae/oe/ue/ss instead of ä/ö/ü/ß are added automatically.
 */
export interface TranslationTask {
  /** The sentence the learner translates. */
  ar: string
  /** Every accepted German answer; the first is the model answer shown after a mistake. */
  de: readonly string[]
  /** Optional nudge shown in the prompt, in Arabic ("استعمل man"). */
  hintAr?: string
  /** Optional extra note appended to the feedback. */
  noteAr?: string
}

export const TRANSLATION_TASKS: Readonly<Record<string, TranslationTask>> = {
  // ── A1 ──────────────────────────────────────────────────────────────────
  'a1-m01-l01': {
    ar: 'صباح الخير! كيف حالك؟',
    de: ['Guten Morgen! Wie geht es dir?', "Guten Morgen! Wie geht's dir?", "Guten Morgen! Wie geht's?", 'Guten Morgen! Wie geht es Ihnen?'],
    noteAr: 'dir للصديق وIhnen للشخص الذي تخاطبه بصيغة الاحترام.',
  },
  'a1-m01-l02': {
    ar: 'اسمي لينا وأنا من سوريا.',
    de: [
      'Ich heiße Lina und ich komme aus Syrien.',
      'Ich heiße Lina und komme aus Syrien.',
      'Ich heiße Lina. Ich komme aus Syrien.',
      'Mein Name ist Lina und ich komme aus Syrien.',
      'Mein Name ist Lina. Ich komme aus Syrien.',
      'Ich heiße Lina und ich bin aus Syrien.',
      'Ich heiße Lina und bin aus Syrien.',
    ],
  },
  'a1-m01-l03': {
    ar: 'كيف يُكتب هذا؟',
    de: ['Wie schreibt man das?'],
    hintAr: 'ابدأ بـ Wie واستعمل man',
  },
  'a1-m01-l04': {
    ar: 'عمري عشرون سنة.',
    de: ['Ich bin zwanzig Jahre alt.', 'Ich bin 20 Jahre alt.'],
  },
  'a1-m02-l01': {
    ar: 'لدي أخ وأختان.',
    de: ['Ich habe einen Bruder und zwei Schwestern.'],
  },
  'a1-m02-l02': {
    ar: 'أبي يعمل طبيباً.',
    de: ['Mein Vater ist Arzt.', 'Mein Vater arbeitet als Arzt.'],
  },
  'a1-m02-l03': {
    ar: 'أستيقظ في الساعة السابعة.',
    de: ['Ich stehe um sieben Uhr auf.', 'Ich stehe um sieben auf.', 'Um sieben Uhr stehe ich auf.', 'Um sieben stehe ich auf.'],
  },
  'a1-m02-l04': {
    ar: 'الساعة الآن الثالثة والنصف.',
    de: ['Es ist halb vier.', 'Es ist drei Uhr dreißig.'],
    noteAr: 'انتبه: halb vier تعني 3:30 وليس 4:30، لأن الألمانية تعدّ «نصف الساعة الرابعة».',
  },
  'a1-m02-l05': {
    ar: 'دورة الألمانية يوم الاثنين.',
    de: ['Der Deutschkurs ist am Montag.'],
  },
  'a1-m03-l01': {
    ar: 'هي طبيبة وهو مهندس.',
    de: ['Sie ist Ärztin und er ist Ingenieur.', 'Sie ist Ärztin und er Ingenieur.'],
  },
  'a1-m03-l02': {
    ar: 'لدي وقت اليوم.',
    de: ['Ich habe heute Zeit.', 'Heute habe ich Zeit.'],
  },
  'a1-m03-l03': {
    ar: 'هو يعمل كثيراً.',
    de: ['Er arbeitet viel.', 'Er arbeitet sehr viel.'],
  },
  'a1-m03-l04': {
    ar: 'هذا كتاب. الكتاب جديد.',
    de: ['Das ist ein Buch. Das Buch ist neu.', 'Das ist ein Buch und das Buch ist neu.'],
    noteAr: 'أول مرة تذكر الشيء: ein (نكرة)، وبعد أن صار معروفاً: das (معرفة).',
  },
  'a1-m03-l05': {
    ar: 'أشتري طاولة.',
    de: ['Ich kaufe einen Tisch.'],
    hintAr: 'der Tisch = الطاولة',
    noteAr: 'der Tisch مذكّر، فيصبح في حالة المفعول به einen Tisch.',
  },
  'a1-m04-l01': {
    ar: 'المصباح على الرف.',
    de: ['Die Lampe steht auf dem Regal.', 'Die Lampe ist auf dem Regal.'],
  },
  'a1-m05-l01': {
    ar: 'رأسي يؤلمني.',
    de: ['Mein Kopf tut weh.', 'Mein Kopf tut mir weh.', 'Der Kopf tut mir weh.'],
  },
  'a1-m06-l01': {
    ar: 'أريد أن أتعلّم الألمانية.',
    de: ['Ich will Deutsch lernen.', 'Ich möchte Deutsch lernen.', 'Ich möchte gern Deutsch lernen.', 'Ich möchte gerne Deutsch lernen.'],
  },
  'a1-m07-l01': {
    ar: 'ليس لدي وقت.',
    de: ['Ich habe keine Zeit.'],
    noteAr: 'الاسم المسبوق بأداة تنكير أو بلا أداة يُنفى بـ kein، وليس بـ nicht.',
  },
  'a1-m08-l01': {
    ar: 'أين حقيبتك؟',
    de: ['Wo ist deine Tasche?', 'Wo ist Ihre Tasche?', 'Wo ist eure Tasche?'],
    noteAr: 'deine للصديق، وIhre بصيغة الاحترام، وeure لعدّة أشخاص تخاطبهم بـ ihr.',
  },
  'a1-m09-l01': {
    ar: 'هو يقرأ كتاباً.',
    de: ['Er liest ein Buch.'],
  },
  'a1-m10-l01': {
    ar: 'أتسوّق يوم السبت.',
    de: ['Ich kaufe am Samstag ein.', 'Am Samstag kaufe ich ein.'],
  },
  'a1-m11-l01': {
    ar: 'أشرب القهوة بدون سكر.',
    de: ['Ich trinke Kaffee ohne Zucker.', 'Ich trinke den Kaffee ohne Zucker.', 'Ich trinke meinen Kaffee ohne Zucker.'],
  },
  'a1-m12-l01': {
    ar: 'شاهدنا الفيلم أمس.',
    de: ['Wir haben den Film gestern gesehen.', 'Wir haben gestern den Film gesehen.', 'Gestern haben wir den Film gesehen.'],
  },
  'a1-m13-l01': {
    ar: 'افتح النافذة من فضلك!',
    de: [
      'Öffne bitte das Fenster!',
      'Bitte öffne das Fenster!',
      'Öffnet bitte das Fenster!',
      'Bitte öffnet das Fenster!',
      'Öffnen Sie bitte das Fenster!',
      'Bitte öffnen Sie das Fenster!',
      'Mach bitte das Fenster auf!',
      'Machen Sie bitte das Fenster auf!',
    ],
    noteAr: 'للأمر ثلاث صيغ بحسب من تخاطبه: du (öffne) وihr (öffnet) وSie (öffnen Sie).',
  },
  'a1-m14-l01': {
    ar: 'كم يكلّف الخبز؟',
    de: ['Wie viel kostet das Brot?', 'Wieviel kostet das Brot?', 'Was kostet das Brot?'],
  },
  'a1-m15-l01': {
    ar: 'في الشتاء يكون الجو بارداً.',
    de: ['Im Winter ist es kalt.', 'Es ist im Winter kalt.'],
  },
  'a1-m16-l01': {
    ar: 'كيف أصل إلى محطة القطار؟',
    de: ['Wie komme ich zum Bahnhof?', 'Wie komme ich zum Hauptbahnhof?', 'Wie kommt man zum Bahnhof?'],
  },
  'a1-m17-l01': {
    ar: 'أحب الاستماع إلى الموسيقى.',
    de: ['Ich höre gern Musik.', 'Ich höre gerne Musik.'],
  },
  'a1-m18-l01': {
    ar: 'أرتدي اليوم سترة زرقاء.',
    de: ['Ich trage heute eine blaue Jacke.', 'Heute trage ich eine blaue Jacke.'],
  },
  'a1-m19-l01': {
    ar: 'أريد حساءً وسلطة، من فضلك.',
    de: [
      'Ich möchte eine Suppe und einen Salat, bitte.',
      'Ich möchte bitte eine Suppe und einen Salat.',
      'Ich hätte gern eine Suppe und einen Salat.',
      'Ich hätte gerne eine Suppe und einen Salat.',
      'Ich nehme eine Suppe und einen Salat.',
      'Bitte eine Suppe und einen Salat.',
    ],
  },
  'a1-m20-l01': {
    ar: 'نحن نرقص أحياناً في عطلة نهاية الأسبوع.',
    de: ['Wir tanzen manchmal am Wochenende.', 'Am Wochenende tanzen wir manchmal.', 'Manchmal tanzen wir am Wochenende.'],
  },

  // ── A2 ──────────────────────────────────────────────────────────────────
  'a2-m01-l01': {
    ar: 'في الشتاء يكون الجو أبرد منه في الصيف.',
    de: ['Im Winter ist es kälter als im Sommer.', 'Es ist im Winter kälter als im Sommer.'],
  },
  'a2-m02-l01': {
    ar: 'كان لدينا وقت قليل.',
    de: ['Wir hatten wenig Zeit.', 'Wir hatten nur wenig Zeit.'],
  },
  'a2-m03-l01': {
    ar: 'أبقى في البيت لأنني متعب.',
    de: [
      'Ich bleibe zu Hause, weil ich müde bin.',
      'Ich bleibe daheim, weil ich müde bin.',
      'Weil ich müde bin, bleibe ich zu Hause.',
      'Weil ich müde bin, bleibe ich daheim.',
    ],
    noteAr: 'بعد weil يذهب الفعل المصرَّف إلى آخر الجملة الفرعية: …weil ich müde bin.',
  },
  'a2-m04-l01': {
    ar: 'أنا أهتم بالموسيقى.',
    de: ['Ich interessiere mich für Musik.'],
  },
  'a2-m05-l01': {
    ar: 'أحتاج إلى سترة دافئة.',
    de: ['Ich brauche eine warme Jacke.'],
    noteAr: 'بعد eine (مؤنث، مفعول به) تأخذ الصفة النهاية -e: eine warme Jacke.',
  },
  'a2-m06-l01': {
    ar: 'عنوان الكتاب مثير للاهتمام.',
    de: ['Der Titel des Buches ist interessant.', 'Der Titel des Buchs ist interessant.'],
  },
  'a2-m07-l01': {
    ar: 'سوف تمطر قريباً.',
    de: ['Es wird bald regnen.', 'Bald wird es regnen.'],
  },
  'a2-m08-l01': {
    ar: 'الكتاب الذي على الطاولة يخصّني.',
    de: [
      'Das Buch, das auf dem Tisch liegt, gehört mir.',
      'Das Buch, das auf dem Tisch steht, gehört mir.',
      'Das Buch, das auf dem Tisch ist, gehört mir.',
    ],
  },
  'a2-m09-l01': {
    ar: 'هل تعرف كم يكلّف هذا؟',
    de: [
      'Weißt du, wie viel das kostet?',
      'Wissen Sie, wie viel das kostet?',
      'Weißt du, wieviel das kostet?',
      'Wissen Sie, wieviel das kostet?',
    ],
    noteAr: 'في السؤال غير المباشر يذهب الفعل إلى النهاية: …wie viel das kostet.',
  },
  'a2-m10-l01': {
    ar: 'أدّخر المال لكي أشتري سيارة.',
    de: ['Ich spare Geld, um ein Auto zu kaufen.'],
  },
  'a2-m11-l01': {
    ar: 'أين يجب أن أغيّر القطار؟',
    de: ['Wo muss ich umsteigen?'],
  },
  'a2-m12-l01': {
    ar: 'أعاني من السعال منذ أسبوع.',
    de: ['Ich habe seit einer Woche Husten.', 'Seit einer Woche habe ich Husten.'],
  },
  'a2-m13-l01': {
    ar: 'متى يمكنني معاينة الشقة؟',
    de: [
      'Wann kann ich die Wohnung besichtigen?',
      'Wann könnte ich die Wohnung besichtigen?',
      'Wann kann ich die Wohnung ansehen?',
      'Wann kann ich mir die Wohnung ansehen?',
    ],
  },
  'a2-m14-l01': {
    ar: 'نحتفل بليلة رأس السنة عند والديّ.',
    de: ['Wir feiern Silvester bei meinen Eltern.', 'Silvester feiern wir bei meinen Eltern.'],
  },

  // ── A2: Themenwortschatz (a2-m15) ───────────────────────────────────────
  'a2-m15-l01': {
    ar: 'أعمل في شركة في برلين.',
    de: ['Ich arbeite bei einer Firma in Berlin.', 'Ich arbeite in einer Firma in Berlin.'],
  },
  'a2-m15-l02': {
    ar: 'هل يمكنني الدفع ببطاقة الائتمان؟',
    de: ['Kann ich mit Kreditkarte bezahlen?', 'Kann ich mit der Kreditkarte bezahlen?', 'Kann ich mit einer Kreditkarte bezahlen?', 'Kann man mit Kreditkarte bezahlen?'],
  },
  'a2-m15-l03': {
    ar: 'لا آكل اللحم.',
    de: ['Ich esse kein Fleisch.'],
  },
  'a2-m15-l04': {
    ar: 'نسكن في الطابق الأرضي.',
    de: ['Wir wohnen im Erdgeschoss.'],
  },
  'a2-m15-l05': {
    ar: 'فاتتني الحافلة.',
    de: ['Ich habe den Bus verpasst.', 'Den Bus habe ich verpasst.'],
  },
  'a2-m15-l06': {
    ar: 'ظهري يؤلمني.',
    de: ['Mein Rücken tut weh.', 'Mein Rücken tut mir weh.', 'Mir tut der Rücken weh.', 'Der Rücken tut mir weh.'],
  },
  'a2-m15-l07': {
    ar: 'لا أفهم هذا.',
    de: ['Ich verstehe das nicht.', 'Das verstehe ich nicht.', 'Ich verstehe es nicht.'],
  },
  'a2-m15-l08': {
    ar: 'نذهب اليوم إلى السينما.',
    de: ['Wir gehen heute ins Kino.', 'Heute gehen wir ins Kino.'],
  },
  'a2-m15-l09': {
    ar: 'في الصيف نسافر إلى البحر.',
    de: ['Im Sommer fahren wir ans Meer.', 'Wir fahren im Sommer ans Meer.'],
  },
  'a2-m15-l10': {
    ar: 'وُلدتُ في دمشق.',
    de: ['Ich bin in Damaskus geboren.', 'Ich wurde in Damaskus geboren.'],
  },
  'a2-m15-l11': {
    ar: 'أخاف من الكلاب.',
    de: ['Ich habe Angst vor Hunden.', 'Ich habe Angst vor den Hunden.', 'Ich fürchte mich vor Hunden.'],
    noteAr: 'الخوف اسم يأتي مع haben: Angst haben vor + Dativ.',
  },
  'a2-m15-l12': {
    ar: 'أولاً أشرب القهوة ثم أذهب إلى العمل.',
    de: [
      'Zuerst trinke ich Kaffee, danach gehe ich zur Arbeit.',
      'Zuerst trinke ich Kaffee, dann gehe ich zur Arbeit.',
      'Zuerst trinke ich Kaffee und danach gehe ich zur Arbeit.',
      'Zuerst trinke ich Kaffee und dann gehe ich zur Arbeit.',
      'Zuerst trinke ich einen Kaffee, danach gehe ich zur Arbeit.',
    ],
    noteAr: 'بعد zuerst يأتي الفعل مباشرة ثم الفاعل: Zuerst trinke ich.',
  },
  'a2-m15-l13': {
    ar: 'حجزتُ غرفة.',
    de: ['Ich habe ein Zimmer reserviert.', 'Ich habe ein Zimmer gebucht.'],
  },
}
