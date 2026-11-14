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
  'a1-m01-l06': {
    ar: 'ما اسمك؟ وأين تسكن؟',
    de: [
      'Wie heißt du? Und wo wohnst du?',
      'Wie heißt du? Wo wohnst du?',
      'Wie ist dein Name? Und wo wohnst du?',
      'Wie ist dein Name? Wo wohnst du?',
      'Wie heißen Sie? Und wo wohnen Sie?',
      'Wie heißen Sie? Wo wohnen Sie?',
      'Wie ist Ihr Name? Und wo wohnen Sie?',
      'Wie ist Ihr Name? Wo wohnen Sie?',
    ],
    noteAr: 'السؤال بكلمة استفهام: الفعل ثانياً مباشرة بعدها (wo wohnst du).',
  },
  'a1-m02-l05': {
    ar: 'دورة الألمانية يوم الاثنين.',
    de: ['Der Deutschkurs ist am Montag.'],
  },
  'a1-m02-l06': {
    ar: 'عيد ميلادي في الخامس من مارس.',
    de: [
      'Mein Geburtstag ist am fünften März.',
      'Ich habe am fünften März Geburtstag.',
      'Mein Geburtstag ist am 5. März.',
      'Ich habe am 5. März Geburtstag.',
    ],
    noteAr: 'بعد am نضيف -n إلى الترتيبي: am fünften.',
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
  'a1-m03-l06': {
    ar: 'أنا جائع، لكن ليس عندي مال.',
    de: ["Ich habe Hunger, aber ich habe kein Geld.", "Ich habe Hunger, aber kein Geld."],
    hintAr: 'استعمل aber',
    noteAr: 'بعد aber يبقى ترتيب الجملة عادياً.',
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
  'a1-m07-l02': {
    ar: 'بلى، أنا جائع.',
    de: ["Doch, ich habe Hunger.", "Doch, ich bin hungrig."],
    hintAr: 'جواب عن سؤال منفي',
    noteAr: 'doch = بلى، ولا تُتبع بجملة منفية.',
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
  'a1-m18-l02': {
    ar: 'أشتري هذا البلوفر.',
    de: ["Ich kaufe diesen Pullover.", "Ich nehme diesen Pullover."],
    hintAr: 'der Pullover ← مفعول به',
    noteAr: 'المذكر في المفعول به: diesen.',
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

  // The A1 Themenwortschatz lessons (module a1-m21)
  'a1-m21-l01': {
    ar: 'أذهب إلى البنك ثم إلى البريد.',
    de: ['Ich gehe zur Bank und dann zur Post.', 'Ich gehe zur Bank und danach zur Post.', 'Ich gehe zuerst zur Bank und dann zur Post.'],
    noteAr: 'للأماكن التي تقصدها لإنجاز عمل نقول zu: zur Bank، zur Post.',
  },
  'a1-m21-l02': {
    ar: 'أشرب الشاي كل صباح.',
    de: ['Ich trinke jeden Morgen Tee.', 'Jeden Morgen trinke ich Tee.', 'Ich trinke morgens Tee.', 'Morgens trinke ich Tee.'],
    noteAr: 'الشاي هنا مادة عامة، فلا نضع أداة: Tee.',
  },
  'a1-m21-l03': {
    ar: 'مادتي المفضلة هي الأحياء.',
    de: ['Mein Lieblingsfach ist Biologie.'],
  },
  'a1-m21-l04': {
    ar: 'غداً صباحاً عندي موعد.',
    de: ['Morgen früh habe ich einen Termin.', 'Ich habe morgen früh einen Termin.'],
    noteAr: 'morgen (غداً) بحرف صغير، وبعده früh.',
  },
  'a1-m21-l05': {
    ar: 'أذهب إلى العمل بالحافلة.',
    de: ['Ich fahre mit dem Bus zur Arbeit.', 'Mit dem Bus fahre ich zur Arbeit.'],
    noteAr: 'بعد mit تأتي حالة Dativ: mit dem Bus.',
  },
  'a1-m21-l06': {
    ar: 'أخي طويل وله لحية.',
    de: ['Mein Bruder ist groß und hat einen Bart.', 'Mein Bruder ist groß und er hat einen Bart.'],
    noteAr: 'sein للصفة (ist groß) وhaben للجزء (hat einen Bart).',
  },
  'a1-m21-l07': {
    ar: 'سأكتب لك رسالة بريد إلكتروني.',
    de: ['Ich schreibe dir eine E-Mail.', 'Ich schreibe dir eine Mail.', 'Ich maile dir.'],
    noteAr: 'dir = لك (Dativ)، وeine E-Mail هي الشيء المكتوب.',
  },
  'a1-m21-l08': {
    ar: 'تهانينا بعيد ميلادك!',
    de: ['Herzlichen Glückwunsch zum Geburtstag!', 'Alles Gute zum Geburtstag!'],
    noteAr: 'zum Geburtstag = بمناسبة عيد الميلاد.',
  },

  'a1-m22-l01': {
    ar: 'يوم الأحد يكون البنك مغلقاً.',
    de: ['Am Sonntag ist die Bank geschlossen.', 'Die Bank ist am Sonntag geschlossen.', 'Die Bank hat am Sonntag geschlossen.'],
    noteAr: 'geschlossen = مغلق، وضدّها geöffnet = مفتوح.',
  },
  'a1-m22-l02': {
    ar: 'من فضلك أعد الاتصال بي.',
    de: ['Bitte ruf mich zurück.', 'Ruf mich bitte zurück.', 'Bitte rufen Sie mich zurück.', 'Rufen Sie mich bitte zurück.'],
    hintAr: 'zurückrufen فعل منفصل',
    noteAr: 'ruf للصديق (du) وrufen Sie لمن تخاطبه بصيغة الاحترام، وzurück في آخر الجملة.',
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
  'a2-m16-l01': {
    ar: 'هل يمكنكم مساعدتي من فضلكم؟',
    de: ['Könnten Sie mir bitte helfen?', 'Könnten Sie mir helfen?', 'Würden Sie mir bitte helfen?', 'Könntest du mir bitte helfen?', 'Würdest du mir bitte helfen?'],
    noteAr: 'الطلب المهذّب: Könnten/Würden + الضمير، والمصدر في النهاية.',
  },
  'a2-m03-l02': {
    ar: 'عندما كنتُ طفلاً، كان عندي كلب.',
    de: ["Als ich Kind war, hatte ich einen Hund.", "Als ich ein Kind war, hatte ich einen Hund."],
    hintAr: 'مرة واحدة في الماضي ← als',
    noteAr: 'الفعل في آخر الجملة الفرعية، ثم الفعل مباشرة في الجملة الرئيسية.',
  },
  'a2-m16-l02': {
    ar: 'تعال لزيارتنا!',
    de: ["Komm doch mal vorbei!", "Komm doch mal bei uns vorbei!", "Kommt doch mal vorbei!", "Kommen Sie doch mal vorbei!"],
    noteAr: 'doch وmal تجعلان الدعوة ودّية.',
  },
  'a2-m20-l03': {
    ar: 'أبقى في البيت لأنني مريض.',
    de: ["Ich bleibe zu Hause, weil ich krank bin.", "Ich bleibe zu Hause, denn ich bin krank.", "Weil ich krank bin, bleibe ich zu Hause."],
    hintAr: 'weil أو denn',
    noteAr: 'weil ← الفعل في الآخر، denn ← الفعل ثانياً.',
  },
  'a2-m21-l03': {
    ar: 'في أيّ غرفة تسكن؟',
    de: ["In welchem Zimmer wohnst du?", "In welchem Zimmer wohnen Sie?"],
    hintAr: 'in + أين؟ ← Dativ',
    noteAr: 'das Zimmer ← welchem.',
  },
  'a2-m21-l04': {
    ar: 'الطبيبة تعمل في عيادة.',
    de: ['Die Ärztin arbeitet in einer Praxis.', 'Die Ärztin arbeitet in der Praxis.'],
    noteAr: 'نضيف -in لمؤنث المهنة، وقد يتغيّر حرف العلة: Arzt ← Ärztin.',
  },
  'a2-m22-l03': {
    ar: 'يبدأ الحفل الموسيقي في الساعة السابعة مساءً.',
    de: ['Das Konzert beginnt um 19 Uhr.', 'Das Konzert fängt um 19 Uhr an.', 'Das Konzert beginnt um sieben Uhr.', 'Das Konzert fängt um sieben Uhr an.'],
    noteAr: 'beginnen غير منفصل، وanfangen منفصل: fängt … an.',
  },
  'a2-m22-l04': {
    ar: 'قطار برلين ملغى اليوم.',
    de: ['Der Zug nach Berlin fällt heute aus.', 'Heute fällt der Zug nach Berlin aus.'],
    noteAr: 'ausfallen فعل منفصل: البادئة aus في آخر الجملة.',
  },
  'a2-m17-l01': {
    ar: 'أسكن في برلين منذ ثلاث سنوات.',
    de: ['Ich wohne seit drei Jahren in Berlin.', 'Seit drei Jahren wohne ich in Berlin.', 'Ich lebe seit drei Jahren in Berlin.', 'Seit drei Jahren lebe ich in Berlin.'],
    noteAr: 'seit + Dativ مع المضارع للأمر المستمر.',
  },
  'a2-m18-l01': {
    ar: 'أنتظر الحافلة.',
    de: ['Ich warte auf den Bus.'],
    noteAr: 'warten auf + Akkusativ.',
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
