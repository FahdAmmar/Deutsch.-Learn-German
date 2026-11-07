# الخطة الشاملة: من A1 إلى A2

قائمة واحدة متسلسلة بكل ما يُدرَس: **الدروس** و**القواعد** و**النصوص** و**المحادثات**، بالترتيب الذي يحتاجه المتعلّم. تُعرض في الموقع كقائمة واحدة (صفحة المستويات `/levels`)، وتُفتح كدرج جانبي من أي صفحة بزر «خطة الدراسة» في الشريط العلوي.

## الأعداد

| المستوى | الفصول | الدروس | القواعد | النصوص | المحادثات المستقلة |
|---|---|---|---|---|---|
| A1 | 10 | 34 | 16 | 17 | 6 |
| A2 | 9 | 30 | 18 | 18 | 19 |

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


## المستوى A1

### 1. البداية — Ankommen

تحيّي الناس، وتعرّف بنفسك، وتسأل الأسئلة الأولى.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | التحية | Begrüßungen |
| 2 | درس | التعريف بالنفس | Sich vorstellen |
| 3 | درس | كلمات الاستفهام: Wer, Was, Wo … | Fragewörter |

### 2. الحروف والأرقام — Buchstaben und Zahlen

تنطق كل حرف، وتتهجّى اسمك، وتعدّ بالأرقام، وتقدّم نفسك في نص قصير.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | الأبجدية | Alphabet |
| 2 | درس | الأرقام | Zahlen |
| 3 | نص | أُعرِّف عن نفسي | Ich stelle mich vor |

### 3. الأيام والوقت — Tage und Uhrzeit

تقول اليوم والتاريخ والساعة، وتصف يومك.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | أيام الأسبوع والشهور | Wochentage und Monate |
| 2 | درس | التاريخ والأعداد الترتيبية | Datum und Ordnungszahlen |
| 3 | درس | الوقت | Uhrzeit |
| 4 | درس | الروتين اليومي | Tagesablauf |
| 5 | نص | يومي | Mein Tag |

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
| 3 | محادثة | مكالمة هاتفية لترتيب موعد | Am Telefon |
| 4 | درس | النفي: nicht وkein | Negation: nicht und kein |
| 5 | قاعدة | النفي | Negation: nicht / kein |
| 6 | نص | كلبنا ماكس | Unser Hund Max |
| 7 | درس | أدوات الملكية | Possessivartikel |
| 8 | قاعدة | الملكية | Possessivartikel |
| 9 | نص | صديقتي آنا | Meine Freundin Anna |
| 10 | درس | الأفعال الشاذة (تغيّر حرف العلة) | Unregelmäßige Verben |

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
| 2 | نص | التسوّق يوم الجمعة | Einkaufen am Freitag |
| 3 | درس | الطعام والشراب والطلب المهذّب | Essen und Trinken |
| 4 | نص | طعامي المفضّل | Mein Lieblingsessen |
| 5 | نص | في المقهى | Im Café |
| 6 | محادثة | الحساب من فضلك! | Zahlen, bitte! |

### 9. الطقس والملابس والفراغ — Wetter, Kleidung und Freizeit

تصف الطقس وملابسك، وتتحدث عن هواياتك وعدد مرات ممارستها.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | الطقس | Das Wetter |
| 2 | درس | الملابس والألوان | Kleidung und Farben |
| 3 | نص | الطقس في الخريف | Das Wetter im Herbst |
| 4 | درس | أوقات الفراغ والهوايات | Freizeit und Hobbys |
| 5 | درس | كم مرة؟ أدوات التكرار | Wie oft? Häufigkeitsadverbien |
| 6 | نص | هواياتي | Meine Hobbys |
| 7 | نص | يوم أحد في الحديقة | Ein Sonntag im Park |

### 10. في الطريق وفي الدورة — Unterwegs und im Deutschkurs

تسأل عن الطريق، وتحجز غرفة في فندق، وتسجّل في دورة لغة، وتحكي عن دراستك.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | وصف الطريق | Wegbeschreibung |
| 2 | نص | في محطة القطار | Am Bahnhof |
| 3 | محادثة | تسجيل الوصول في الفندق | Im Hotel |
| 4 | محادثة | التسجيل في دورة اللغة الألمانية | Anmeldung zum Deutschkurs |
| 5 | نص | دورتي في اللغة الألمانية | Mein Deutschkurs |


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
| 6 | نص | عند جدّي وجدّتي | Bei meinen Großeltern |

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
| 8 | محادثة | في مكتب شؤون المواطنين: تسجيل السكن | Beim Bürgeramt |
| 9 | درس | المواصلات والمدينة | Verkehr und Stadt |
| 10 | محادثة | عند شباك المعلومات في المحطة | Am Informationsschalter |

### 16. السفر والطبيعة — Reisen und Natur

تسافر وتحجز فندقاً، وتتصرف في المطار، وتتحدث عن الطبيعة والبيئة.

| # | النوع | العنوان | Titel |
|---|---|---|---|
| 1 | درس | السفر ووسائل النقل | Reisen und Verkehrsmittel |
| 2 | نص | رحلة إلى برلين | Eine Reise nach Berlin |
| 3 | محادثة | تسجيل الوصول في المطار | Beim Check-in am Flughafen |
| 4 | نص | الحقيبة المفقودة | Der verlorene Koffer |
| 5 | درس | العطلة والفندق | Urlaub und Hotel |
| 6 | محادثة | حجز غرفة في الفندق | Ein Zimmer reservieren |
| 7 | درس | الطبيعة والبيئة | Natur und Umwelt |
| 8 | نص | فرز النفايات في ألمانيا | Müll trennen in Deutschland |

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
| 5 | درس | حالة الإضافة (Genitiv) | Genitiv |
| 6 | قاعدة | حالة الإضافة | Genitiv |
| 7 | محادثة | في مكتب المفقودات | Im Fundbüro |
| 8 | درس | المستقبل (Futur I) | Futur I |
| 9 | قاعدة | المستقبل | Futur I |
| 10 | محادثة | خطط الإجازة | Urlaubspläne |
| 11 | نص | مدينتي الأم | Meine Heimatstadt |
| 12 | نص | خططي للعام القادم | Meine Pläne für nächstes Jahr |

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

