# الخطة الشاملة: من A1 إلى A2

قائمة واحدة متسلسلة بكل ما يُدرَس: **الدروس** و**القواعد** و**النصوص** و**المحادثات**، بالترتيب الذي يحتاجه المتعلّم. تُعرض في الموقع كقائمة واحدة (صفحة المستويات `/levels`)، وتُفتح كدرج جانبي من أي صفحة بزر «خطة الدراسة» في الشريط العلوي.

## الأعداد

| المستوى | الفصول | الدروس | القواعد | النصوص | المحادثات المستقلة |
|---|---|---|---|---|---|
| A1 | 10 | 53 | 16 | 17 | 12 |
| A2 | 9 | 45 | 18 | 18 | 23 |

## مبادئ الترتيب

- القاعدة تأتي مباشرة بعد الدرس الذي يقدّمها، لترى القاعدة كاملة وتُختبر فيها.
- النص أو المحادثة يأتي بعد القواعد التي يعتمد عليها (لا نص فيه أفعال منفصلة قبل درس الأفعال المنفصلة)، وبجانب موضوعه.
- قواعد A2 التي يكتفي درس A1 بالتمهيد لها (Perfekt وKomparativ وWechselpräpositionen) موضعها في A2 كما تضعها خارطة القواعد.
- الترقيم متصل: تبدأ فصول A2 من الرقم التالي لآخر فصل في A1.
- الاختبار `src/lib/learningPath.test.ts` يضمن ألا يسقط أي درس أو قاعدة أو نص أو محادثة من الخطة، ويثبّت سبب موضع كل نص ومحادثة.

## الدروس التي أُضيفت لسدّ ثغرات

| الدرس | المستوى | الفصل | لماذا |
|---|---|---|---|
| Fragewörter (كلمات الاستفهام) | A1 | البداية | المتعلّم يعرّف بنفسه فيحتاج أن يسأل؛ قاعدة W-Fragen لاحقة تُعمّقه |
| Datum und Ordnungszahlen (التاريخ والأعداد الترتيبية) | A1 | الأيام والوقت | لا درس ولا قاعدة للأعداد الترتيبية والتاريخ |
| Zeitangaben: seit, vor, in, bis, ab (تعبيرات الزمن) | A2 | الحياة اليومية والعمل والمال | التمييز بين seit وvor وin ثغرة معروفة للمتعلّم العربي، ولا درس لها |
| Höfliche Bitten und Wünsche (الطلبات المهذّبة) | A2 | الحياة اليومية والعمل والمال | könnte/würde/hätte gern تظهر في كل محادثة ولا درس لها (قاعدة Konjunktiv II في خارطة القواعد عند B1) |
| Verben mit Präpositionen (أفعال بحرف جر ثابت) | A2 | الصحة والمشاعر | warten auf وdenken an وAngst haben vor في كل نص (القاعدة في الخارطة عند B1) |
| Länder, Nationalitäten und Sprachen (الدول والجنسيات واللغات) | A1 | البداية | بعد «Woher kommst du؟» يحتاج المتعلّم العربي جواب بلده (مع الدول التي لها أداة: der Irak وdie Türkei) وجنسيته (Syrer / Syrerin) ولغاته |
| Im Deutschkurs (لغة الصف) | A1 | البداية | عبارات البقاء في الحصة: Wie bitte؟ Langsamer, bitte. Was bedeutet das؟ Wie schreibt man das؟ |
| Zahlen ab 100, Preise und Telefonnummern | A1 | الحروف والأرقام | درس الأرقام ينتهي عند 99؛ والأسعار وأرقام الهاتف والسنوات تحتاج hundert وtausend وEuro وCent |
| Formular und kurze Nachricht (نموذج ورسالة قصيرة) | A1 | الحروف والأرقام | حقول النماذج وقراءة البريد الإلكتروني وبنية الرسالة القصيرة (تحية، نص، خاتمة) |
| nicht müssen oder nicht dürfen؟ | A1 | الأفعال وبناء الجملة | «لا يجب» العربية تقابل فعلين مختلفين: ليس لازماً / ممنوع |
| Mengen und Maßeinheiten (الكميات) | A1 | التسوّق والطعام | ein Kilo Äpfel بلا حرف جر، وviel / viele، وWie viel؟ |
| الوحدة a1-m21: Orte in der Stadt · Lebensmittel und Getränke · Schule und Schulfächer · Tageszeiten · Verkehrsmittel · Aussehen | A1 | موزّعة على الفصول | ست دروس مفردات موضوعية كما في A2؛ قائمة Goethe لـ A1 نحو 650 كلمة، وكانت دروس A1 تعرض نحو 280 |
| Verben mit Dativ (أفعال Dativ) | A2 | السكن والمدينة | gefallen وschmecken وgehören وpassen وwehtun، و«Mir ist kalt»، والمفعولان |
| wissen, kennen oder können؟ | A2 | السكن والمدينة | العربية تقول «يعرف» لثلاثة أفعال ألمانية |
| Alltag in Deutschland, Österreich und der Schweiz | A2 | السكن والمدينة | Pfand وMülltrennung وNachtruhe وAnmeldung، والتحيات واختلاف الكلمات (Grüezi، Servus) |
| deshalb, darum, trotzdem | A2 | ربط الجمل | النتيجة والتناقض بعد weil: الفعل بعد أداة الربط مباشرة |
| Vorschläge, Ratschläge und Meinungen | A2 | ربط الجمل | Wollen wir …؟ Du solltest … An deiner Stelle würde ich … Ich finde … |
| N-Deklination | A2 | الوصف والمستقبل | den Kollegen وdem Kunden: مفردات A2 فيها Kollege وKunde وNachbar وPatient |
| Adjektive im Dativ | A2 | الوصف والمستقبل | تكملة نهايات الصفة في Nominativ وAkkusativ |
| Präteritum erkennen | A2 | المقارنة والحكي | النصوص تحوي ging وkam وsah، والمنهج يدرّس Präteritum لـ sein وhaben والأفعال الشرطية فقط: تعرّف للقراءة لا إنتاج |


## ما يضاف حول الخطة

- **عبارات «أستطيع أن …»** لكل درس (`src/data/canDo.ts`): تظهر في بداية صفحة الدرس تحت الأهداف، ويضمن `canDo.test.ts` وجودها لكل درس.
- **مراجعة كل فصل**: رابط «مراجعة هذا الفصل» تحت كل فصل في الخطة (`/levels/:level/review/:chapterId`): 12 سؤالاً من تمارين دروس الفصل نفسها، موزّعة على دروسه.
- **الاختبار الختامي لكل مستوى** (`/levels/:level/abschlusstest`): 30 سؤالاً من أكبر عدد ممكن من دروس المستوى.
- **تدريب المحادثة** (`/practice/speaking`): مهام تحدّث وسؤال وطلب بصوتك أو بالكتابة، مع فحص للنقاط المطلوبة ونموذج تسمعه.

## المستوى A1

### 1. البداية — Ankommen

تحيّي الناس، وتعرّف بنفسك، وتسأل الأسئلة الأولى.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | التحية | Begrüßungen |
| 2 | درس | التعريف بالنفس | Sich vorstellen |
| 3 | درس | كلمات الاستفهام: Wer, Was, Wo … | Fragewörter |
| 4 | درس | الدول والجنسيات واللغات | Länder, Nationalitäten und Sprachen |
| 5 | درس | في دورة الألمانية: عبارات الصف | Im Deutschkurs |
| 6 | محادثة | عفواً؟ في حصة الألمانية | Wie bitte? |

### 2. الحروف والأرقام — Buchstaben und Zahlen

تنطق كل حرف، وتتهجّى اسمك، وتعدّ بالأرقام، وتقدّم نفسك في نص قصير.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | الأبجدية | Alphabet |
| 2 | درس | الأرقام | Zahlen |
| 3 | درس | الأرقام بعد المئة والأسعار وأرقام الهاتف | Zahlen ab 100, Preise und Telefonnummern |
| 4 | درس | نموذج البيانات الشخصية والرسالة القصيرة | Formular und kurze Nachricht |
| 5 | محادثة | رقمي هو … | Meine Nummer ist … |
| 6 | نص | أُعرِّف عن نفسي | Ich stelle mich vor |

### 3. الأيام والوقت — Tage und Uhrzeit

تقول اليوم والتاريخ والساعة، وتصف يومك.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | أيام الأسبوع والشهور | Wochentage und Monate |
| 2 | درس | التاريخ والأعداد الترتيبية | Datum und Ordnungszahlen |
| 3 | درس | الوقت | Uhrzeit |
| 4 | درس | الروتين اليومي | Tagesablauf |
| 5 | درس | أوقات اليوم وكلمات الزمن | Tageszeiten und Zeitangaben |
| 6 | نص | يومي | Mein Tag |

### 4. أساس القواعد — Grammatik-Fundament

تبني جملة صحيحة بالضمائر وsein وhaben والأفعال والأدوات والمفعول به.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | ضمائر الفاعل | Personalpronomen |
| 2 | قاعدة | ضمائر الشخص | Personalpronomen |
| 3 | درس | فعل الكينونة sein | sein |
| 4 | درس | فعل الامتلاك haben | haben |
| 5 | قاعدة | الفعلان الأساسيان | sein / haben |
| 6 | درس | الأفعال المنتظمة | Regelmäßige Verben |
| 7 | قاعدة | المضارع وتصريف الأفعال | Präsens |
| 8 | قاعدة | ترتيب الجملة | Satzbau |
| 9 | قاعدة | أسئلة W وأسئلة نعم/لا | W-Fragen / Ja-Nein-Fragen |
| 10 | درس | أدوات التعريف والتنكير | Artikel |
| 11 | قاعدة | حالة الفاعل | Nominativ |
| 12 | قاعدة | أدوات التعريف والتنكير | Artikel |
| 13 | درس | حالة المفعول به (الأكوزاتيف) | Akkusativ |
| 14 | قاعدة | المفعول به المباشر | Akkusativ |

### 5. عالمي — Meine Welt

تتحدث عن عائلتك ومهنتك وبيتك وجسمك، وتتعرّف على جيرانك.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | العائلة | Familie |
| 2 | نص | عائلتي | Meine Familie |
| 3 | درس | المهن | Berufe |
| 4 | درس | المنزل والغرف وحروف الجر المكانية | Die Wohnung |
| 5 | نص | غرفتي | Mein Zimmer |
| 6 | درس | الجسم والصحة وضمائر الجر | Körper, Gesundheit & Dativpronomen |
| 7 | قاعدة | المفعول غير المباشر | Dativ |
| 8 | قاعدة | الضمائر في Akkusativ/Dativ | Personalpronomen |
| 9 | محادثة | جيران جدد | Neue Nachbarn |

### 6. الأفعال وبناء الجملة — Verben und Sätze

تعبّر عن القدرة والرغبة والواجب، وتنفي جملتك، وتتحدث عمّا تملك.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | الأفعال الشرطية (المودالية) | Modalverben |
| 2 | قاعدة | الأفعال الناقصة | Modalverben |
| 3 | درس | الفرق بين nicht müssen وnicht dürfen | nicht müssen oder nicht dürfen? |
| 4 | محادثة | مكالمة هاتفية لترتيب موعد | Am Telefon |
| 5 | محادثة | هل نذهب إلى السينما؟ | Wollen wir ins Kino gehen? |
| 6 | درس | النفي: nicht وkein | Negation: nicht und kein |
| 7 | قاعدة | النفي | Negation: nicht / kein |
| 8 | نص | كلبنا ماكس | Unser Hund Max |
| 9 | درس | أدوات الملكية | Possessivartikel |
| 10 | قاعدة | الملكية | Possessivartikel |
| 11 | نص | صديقتي آنا | Meine Freundin Anna |
| 12 | درس | الأفعال الشاذة (تغيّر حرف العلة) | Unregelmäßige Verben |

### 7. أفعال الحياة اليومية — Verben im Alltag

تستخدم الأفعال المنفصلة وحروف الجر، وتحكي ما حدث، وتعطي أمراً أو نصيحة.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | الأفعال المنفصلة | Trennbare Verben |
| 2 | قاعدة | الأفعال القابلة للانفصال | Trennbare Verben |
| 3 | نص | والدي سائق حافلة | Mein Vater ist Busfahrer |
| 4 | نص | عيد ميلادي | Mein Geburtstag |
| 5 | درس | حروف الجر ذات الحالة الثابتة | Präpositionen mit festem Kasus |
| 6 | قاعدة | حروف الجر الأساسية | Präpositionen |
| 7 | نص | مدينتي | Meine Stadt |
| 8 | درس | الزمن الماضي المحكي (Perfekt) | Perfekt |
| 9 | درس | صيغة الأمر | Imperativ |
| 10 | قاعدة | صيغة الأمر | Imperativ |
| 11 | محادثة | في الصيدلية | In der Apotheke |

### 8. التسوّق والطعام — Einkaufen und Essen

تشتري ما تحتاجه، وتطلب في المقهى والمطعم، وتدفع الحساب.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | التسوّق وتكوين صيغة الجمع | Einkaufen und Pluralbildung |
| 2 | درس | الأطعمة والمشروبات | Lebensmittel und Getränke |
| 3 | درس | الكميات ووحدات القياس | Mengen und Maßeinheiten |
| 4 | محادثة | ماذا تريد؟ عند البائعة | Was darf es sein? |
| 5 | نص | التسوّق يوم الجمعة | Einkaufen am Freitag |
| 6 | درس | الطعام والشراب والطلب المهذّب | Essen und Trinken |
| 7 | نص | طعامي المفضّل | Mein Lieblingsessen |
| 8 | نص | في المقهى | Im Café |
| 9 | محادثة | الحساب من فضلك! | Zahlen, bitte! |

### 9. الطقس والملابس والفراغ — Wetter, Kleidung und Freizeit

تصف الطقس وملابسك، وتتحدث عن هواياتك وعدد مرات ممارستها.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | الطقس | Das Wetter |
| 2 | درس | الملابس والألوان | Kleidung und Farben |
| 3 | نص | الطقس في الخريف | Das Wetter im Herbst |
| 4 | درس | وصف المظهر | Aussehen |
| 5 | درس | أوقات الفراغ والهوايات | Freizeit und Hobbys |
| 6 | درس | الهاتف والإنترنت والبريد الإلكتروني | Handy, Internet und E-Mail |
| 7 | درس | كم مرة؟ أدوات التكرار | Wie oft? Häufigkeitsadverbien |
| 8 | درس | الأعياد والتهاني والشكر والاعتذار | Feste, Wünsche und Dank |
| 9 | نص | هواياتي | Meine Hobbys |
| 10 | نص | يوم أحد في الحديقة | Ein Sonntag im Park |

### 10. في الطريق وفي الدورة — Unterwegs und im Deutschkurs

تسأل عن الطريق، وتحجز غرفة في فندق، وتسجّل في دورة لغة، وتحكي عن دراستك.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | الأماكن في المدينة | Orte in der Stadt |
| 2 | درس | وصف الطريق | Wegbeschreibung |
| 3 | درس | قراءة اللافتات والإعلانات القصيرة | Schilder, Hinweise und Aushänge |
| 4 | درس | وسائل النقل والتذاكر | Verkehrsmittel und Fahrkarten |
| 5 | درس | فهم رسالة هاتفية وإعلان صوتي | Telefonnachricht und Durchsage |
| 6 | نص | في محطة القطار | Am Bahnhof |
| 7 | محادثة | عند شباك التذاكر | Am Fahrkartenschalter |
| 8 | محادثة | في مكتب البريد | Auf der Post |
| 9 | محادثة | تسجيل الوصول في الفندق | Im Hotel |
| 10 | محادثة | التسجيل في دورة اللغة الألمانية | Anmeldung zum Deutschkurs |
| 11 | درس | المدرسة والمواد الدراسية | Schule und Schulfächer |
| 12 | نص | دورتي في اللغة الألمانية | Mein Deutschkurs |


## المستوى A2

### 11. المقارنة والحكي — Vergleichen und Erzählen

تقارن بين الأشياء، وتحكي ما حدث بالماضي، وتتحدث عن أفعالك التي تعود على الفاعل.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | المقارنة والتفضيل | Komparativ und Superlativ |
| 2 | قاعدة | المقارنة والتفضيل | Komparativ / Superlativ |
| 3 | قاعدة | الماضي المحادثي | Perfekt |
| 4 | درس | الماضي البسيط لأفعال sein وhaben والأفعال الشرطية | Präteritum von sein, haben und Modalverben |
| 5 | قاعدة | الماضي للأفعال الأساسية | Präteritum |
| 6 | قاعدة | Perfekt vs. Präteritum | Vergangenheit |
| 7 | درس | الأفعال الانعكاسية | Reflexive Verben |
| 8 | قاعدة | الأفعال الانعكاسية | Reflexive Verben |
| 9 | قاعدة | الضمائر الانعكاسية | Reflexivpronomen |
| 10 | نص | أول يوم عمل لي | Mein erster Arbeitstag |
| 11 | نص | عطلة نهاية أسبوعي | Mein Wochenende |
| 12 | نص | يوم عند البحيرة | Ein Tag am See |
| 13 | درس | التعرّف على Präteritum عند القراءة: ging، kam، sah | Präteritum erkennen |

### 12. الحياة اليومية والعمل والمال — Alltag, Arbeit und Geld

ترتّب يومك بالكلمات الزمنية، وتقول منذ متى وحتى متى، وتتحدث عن عملك ومالك وأوراقك الرسمية، وتطلب بأدب.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | الوقت وتسلسل الأحداث | Zeit und Ablauf |
| 2 | درس | تعبيرات الزمن: seit وvor وin وbis وab | Zeitangaben: seit, vor, in, bis, ab |
| 3 | محادثة | التسجيل في النادي الرياضي | Anmeldung im Fitnessstudio |
| 4 | درس | العمل والمهنة | Arbeit und Beruf |
| 5 | درس | المال والبنك والبريد | Geld, Bank und Post |
| 6 | درس | الطلبات المهذّبة والأمنيات: könnte, würde, hätte gern | Höfliche Bitten und Wünsche |
| 7 | محادثة | طلب من الجارة | Eine Bitte an die Nachbarin |
| 8 | محادثة | فتح حساب في البنك | Ein Konto eröffnen |
| 9 | محادثة | عند الحلاق | Beim Friseur |
| 10 | درس | الدوائر الرسمية والاستمارات | Ämter und Formulare |
| 11 | قاعدة | الضمائر غير المحددة | Indefinitpronomen |

### 13. ربط الجمل — Sätze verbinden

تربط أفكارك بأدوات الربط، وتبني جملاً فرعية بـ weil وdass وwenn.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | قاعدة | أدوات الربط | Konjunktionen |
| 2 | درس | الجمل الفرعية: weil وdass وwenn | Nebensätze: weil, dass, wenn |
| 3 | قاعدة | الجمل الثانوية | Nebensätze |
| 4 | قاعدة | weil / dass / wenn / obwohl | Subjunktionen |
| 5 | قاعدة | ترتيب الكلمات في الجملة الثانوية | Satzstellung |
| 6 | درس | أدوات الربط deshalb وtrotzdem: الفعل بعدها مباشرة | deshalb, darum, trotzdem |
| 7 | درس | الاقتراحات والنصائح والآراء | Vorschläge, Ratschläge und Meinungen |
| 8 | محادثة | التخطيط لنهاية الأسبوع | Das Wochenende planen |
| 9 | نص | عند جدّي وجدّتي | Bei meinen Großeltern |

### 14. جمل أطول — Sätze erweitern

تعبّر عن الغرض بـ um … zu، وتنقل الأسئلة بشكل غير مباشر، وتصف الأشياء بجمل الصلة.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | التعبير عن الغرض: um...zu | um...zu + Infinitiv |
| 2 | محادثة | مقابلة عمل | Ein Vorstellungsgespräch |
| 3 | درس | الأسئلة غير المباشرة | Indirekte Fragen |
| 4 | محادثة | لماذا لم تكن في المكتب؟ | Warum warst du nicht da? |
| 5 | درس | جمل الصلة | Relativsätze |
| 6 | محادثة | في محل الهواتف | Im Handyshop |

### 15. السكن والمدينة — Wohnen und Stadt

تبحث عن شقة، وتصف بيتك وجيرانك، وتسجّل عنوانك، وتتنقّل في المدينة.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | البحث عن شقة | Wohnungssuche |
| 2 | نص | شقة جديدة | Eine neue Wohnung |
| 3 | درس | السكن والمنزل | Wohnen und Haushalt |
| 4 | قاعدة | الفرق بين Akkusativ وDativ | Akkusativ vs. Dativ |
| 5 | قاعدة | حروف الجر المتغيرة | Wechselpräpositionen |
| 6 | قاعدة | مكان ثابت أم اتجاه | Wo? / Wohin? |
| 7 | نص | جاري | Mein Nachbar |
| 8 | درس | أفعال تأخذ Dativ: gefallen، schmecken، gehören، passen … | Verben mit Dativ |
| 9 | درس | ثلاثة أفعال لكلمة "يعرف": wissen، kennen، können | wissen, kennen oder können? |
| 10 | محادثة | كيف تعجبك الشقة؟ | Wie gefällt dir die Wohnung? |
| 11 | محادثة | في مكتب شؤون المواطنين: تسجيل السكن | Beim Bürgeramt |
| 12 | درس | الحياة اليومية في ألمانيا والنمسا وسويسرا | Alltag in Deutschland, Österreich und der Schweiz |
| 13 | محادثة | في درج البناية | Im Treppenhaus |
| 14 | درس | المواصلات والمدينة | Verkehr und Stadt |
| 15 | محادثة | عند شباك المعلومات في المحطة | Am Informationsschalter |
| 16 | درس | قراءة الإعلانات وبرامج الفعاليات | Anzeigen und Veranstaltungsprogramme lesen |

### 16. السفر والطبيعة — Reisen und Natur

تسافر وتحجز فندقاً، وتتصرف في المطار، وتتحدث عن الطبيعة والبيئة.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | السفر ووسائل النقل | Reisen und Verkehrsmittel |
| 2 | نص | رحلة إلى برلين | Eine Reise nach Berlin |
| 3 | محادثة | تسجيل الوصول في المطار | Beim Check-in am Flughafen |
| 4 | درس | فهم الإعلانات الصوتية والرسائل الهاتفية | Durchsagen und Anrufbeantworter |
| 5 | نص | الحقيبة المفقودة | Der verlorene Koffer |
| 6 | درس | العطلة والفندق | Urlaub und Hotel |
| 7 | محادثة | حجز غرفة في الفندق | Ein Zimmer reservieren |
| 8 | درس | الطبيعة والبيئة | Natur und Umwelt |
| 9 | نص | فرز النفايات في ألمانيا | Müll trennen in Deutschland |

### 17. الصحة والمشاعر — Gesundheit und Gefühle

تشرح للطبيب ما يؤلمك، وتحجز موعداً، وتعبّر عن مشاعرك وطباعك، وتستخدم الأفعال المرتبطة بحرف جر.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | عند الطبيب | Beim Arzt |
| 2 | نص | زيارة إلى الطبيب | Ein Besuch beim Arzt |
| 3 | محادثة | حجز موعد عند الطبيب | Einen Arzttermin vereinbaren |
| 4 | محادثة | الاعتذار عن موعد | Eine Verabredung absagen |
| 5 | درس | الصحة والمرض | Gesundheit und Krankheit |
| 6 | نص | الحفاظ على اللياقة | Fit bleiben |
| 7 | درس | المشاعر والطباع | Gefühle und Charakter |
| 8 | درس | الأفعال المرتبطة بحرف جر: warten auf, denken an … | Verben mit Präpositionen |
| 9 | محادثة | توتّر الامتحان | Prüfungsstress |

### 18. الوصف والمستقبل — Beschreiben und Zukunft

تصف الأشياء بدقّة، وتعبّر عن الملكية، وتتحدث عمّا سيحدث.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | قاعدة | الصفات | Adjektive |
| 2 | درس | تصريف الصفة قبل الاسم | Adjektivdeklination |
| 3 | قاعدة | تصريف الصفات | Adjektivdeklination |
| 4 | محادثة | هدية لأمي | Ein Geschenk für die Mutter |
| 5 | درس | أسماء مذكّرة تأخذ -n / -en: den Kollegen، dem Kunden | N-Deklination |
| 6 | درس | نهايات الصفات في حالة Dativ | Adjektive im Dativ |
| 7 | درس | تكوين الكلمات: افهم الكلمة الجديدة من أجزائها | Wortbildung: Wörter verstehen |
| 8 | محادثة | الزملاء الجدد | Die neuen Kollegen |
| 9 | درس | حالة الإضافة (Genitiv) | Genitiv |
| 10 | قاعدة | حالة الإضافة | Genitiv |
| 11 | محادثة | في مكتب المفقودات | Im Fundbüro |
| 12 | درس | المستقبل (Futur I) | Futur I |
| 13 | قاعدة | المستقبل | Futur I |
| 14 | محادثة | خطط الإجازة | Urlaubspläne |
| 15 | نص | مدينتي الأم | Meine Heimatstadt |
| 16 | نص | خططي للعام القادم | Meine Pläne für nächstes Jahr |

### 19. الدراسة والفراغ والمناسبات — Lernen, Freizeit und Feste

تتحدث عن دراستك ووقت فراغك وطعامك ومناسباتك.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | المدرسة والدراسة | Schule und Lernen |
| 2 | نص | تعلّم الألمانية | Deutsch lernen |
| 3 | درس | وقت الفراغ والإعلام | Freizeit und Medien |
| 4 | نص | التسوّق عبر الإنترنت | Online einkaufen |
| 5 | نص | الحفل الموسيقي | Das Konzert |
| 6 | درس | الطعام والمطعم | Essen und Restaurant |
| 7 | محادثة | شكوى في المطعم | Eine Beschwerde im Restaurant |
| 8 | درس | الأعياد والاحتفالات | Feste und Feiern |
| 9 | نص | حفلة عيد الميلاد | Die Geburtstagsparty |
| 10 | نص | عيد الميلاد في ألمانيا | Weihnachten in Deutschland |
| 11 | محادثة | دعوة إلى عيد الفطر | Einladung zum Zuckerfest |

## الجولة الثانية: أدوات الربط وكلمات der-Wörter

أُضيفت سبعة دروس، ومستوى كل منها محدّد بمصدر لا بالتقدير. المصادر: قوائم مفردات Goethe-Zertifikat (A1 Start Deutsch 1 وA2 وB1) من goethe.de، وفهرس قواعد كتاب Menschen A2 (دار Hueber).

| الدرس | المعرّف | المستوى | الموضع | سبب المستوى |
|---|---|---|---|---|
| und, oder, aber (+ dann) | `a1-m03-l06` | A1 | آخر فصل أساس القواعد | قائمة A1 فيها aber وoder بأمثلة |
| Ja, nein, doch | `a1-m07-l02` | A1 | بعد قاعدة النفي | قائمة A1 فيها doch جواباً عن سؤال منفي |
| dieser, welcher (Nominativ وAkkusativ) | `a1-m18-l02` | A1 | بعد درس الملابس | قائمة A1 فيها «diesen Kuchen» و«Welches Buch …؟» |
| der-Wörter: dieser, welcher, jeder | `a2-m21-l03` | A2 | قبل درس تصريف الصفات | قائمة A2 فيها jed- وأمثلة بـ Dativ (diesem, welchem) |
| weil oder denn? | `a2-m20-l03` | A2 | بعد القاعدة 30 وقبل deshalb | Menschen A2 يدرّس weil، وقائمة A2 فيها denn |
| wenn, als, wann (+ seit, bis) | `a2-m03-l02` | A2 | بين deshalb وVorschläge | Menschen A2: wenn (dann) وals وbis وseit(dem)؛ قائمة A2 فيها «Wenn es nicht regnet, dann kommen wir» |
| Kleine Wörter: doch, mal, denn, ja | `a2-m16-l02` | A2 | بعد الطلبات المؤدبة | قائمة A2 تعرضها في أمثلة (Geh doch mal …، Das ist ja toll!) |

## الجولة الثالثة: القراءة والاستماع في الحياة اليومية

أُضيفت سبعة دروس (أربعة في A1 وثلاثة في A2) وأربع إضافات داخل دروس قائمة، ومستوى كل منها محدّد بمصدر لا بالتقدير. المصادر: وصف اختبارَي Goethe-Zertifikat A1: Start Deutsch 1 وGoethe-Zertifikat A2 (أجزاء القراءة والاستماع) وقائمتا المفردات الرسميتان (A1 Fit 1 وA2) من goethe.de. السبب العام: كان للموقع تمارين امتحان لهذه النصوص (لافتة، رسالة هاتفية، إعلان صوتي) لكن لا درس يعلّمها.

| الدرس | المعرّف | المستوى | الموضع | سبب المستوى |
|---|---|---|---|---|
| Schilder, Hinweise und Aushänge | `a1-m22-l01` | A1 | بعد وصف الطريق | قراءة A1 تتألف من ملاحظات قصيرة وإعلانات مبوّبة ولافتات وإعلانات معلّقة |
| Telefonnachricht und Durchsage | `a1-m22-l02` | A1 | بعد درس وسائل النقل | استماع A1 فيه رسائل هاتفية وإعلانات بمكبّر الصوت؛ قائمة A1 فيها Mailbox |
| Handy, Internet und E-Mail | `a1-m21-l07` | A1 | بعد الهوايات | قائمة A1 فيها مجموعة الكلمات الدخيلة (Smartphone وLaptop وLink وonline وmailen وgoogeln وsurfen) |
| Feste, Wünsche und Dank | `a1-m21-l08` | A1 | بعد أدوات التكرار | «الأعياد والاحتفالات» موضوع في قائمة A1، وكتابة A1 نص شخصي قصير (دعوة أو اعتذار) |
| Anzeigen und Veranstaltungsprogramme lesen | `a2-m22-l03` | A2 | آخر فصل السكن والمدينة | قراءة A2 فيها برامج فعاليات ومراسلات وإعلانات (إعلانات الشقق سبقت في a2-m13) |
| Durchsagen und Anrufbeantworter | `a2-m22-l04` | A2 | بعد محادثة المطار | الجزء الأول من استماع A2: الراديو والجهاز المجيب والإعلانات الصوتية |
| Wortbildung: Wörter verstehen | `a2-m21-l04` | A2 | بعد الصفات في Dativ | مقدمة قائمة A2 تحذف الأسماء المشتقة (Drucker، Zahlung) والأفعال المركبة الشفافة لأن المتعلم يستنتجها |

الإضافات الصغيرة: **Himmelsrichtungen** (Norden وSüden وOsten وWesten، مجموعة كلمات في قائمتَي A1 وA2) في درس الدول؛ **montags / dienstags** في درس أيام الأسبوع (قائمة A2 تعرضها مع am Montag)؛ **Prozent** في مفردات المال في A2 (قائمة A2 فيها الرمز %)؛ **darauf / darüber / dafür** للفهم فقط في درس الأفعال بحرف جر ثابت (قائمة A2 فيها مركبات da(r)-؛ أمّا أسئلة worauf / wofür فتبقى في B1).

لم يُضَف: Infinitiv mit zu (القاعدة 42 في B1) وPassiv وPlusquamperfekt وKonjunktiv II الكامل. وملاحظة: الموقع يدرّس في A2 ثلاثة موضوعات تضعها خارطة القواعد في B1 (Relativsätze وIndirekte Fragen وum … zu)، فلا تُزَد فوقها.

### ما أُجِّل إلى B1 عمداً

`nämlich` و`bevor` و`nachdem` موجودة في قائمة Goethe B1 وغائبة عن قائمة A2، لذلك لا درس لها في A2. تُضاف مع جمل الزمن الفرعية في B1.

### ملاحظة على التوافق مع الجدول

الجدول يضع القاعدة 27 (Konjunktionen) في A2، بينما يدرّس `a1-m03-l06` الكلمات und وoder وaber فقط (وهي في قائمة A1). لم يُربط الدرس بالقاعدة 27 عمداً، فلا تظهر له فروق في `levelAlignment`.
