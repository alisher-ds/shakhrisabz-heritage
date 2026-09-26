/* ========================================================
   SILK ROAD AI DOCENT (Interactive Knowledge Assistant)
   Semantic Multi-Token Scoring Engine with Trilingual NLU
   ======================================================== */
import { currentLang } from './i18n.js';

export function initAiDocent() {
  const chatHistory = document.getElementById('chatHistory');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');

  if (!chatHistory || !chatInput || !chatSendBtn) return;

  const knowledgeBase = [
    // 1. UNESCO #885 & Heritage in Danger
    {
      id: "unesco",
      phrases: [
        "unesco world heritage", "unesco 885", "heritage in danger", "xavf ostida", "why in danger", "nega xavf",
        "danger list", "butunjahon merosi", "world heritage site", "unesco status", "濒危世界遗产", "世界遗产885"
      ],
      keywords: ["unesco", "885", "status", "danger", "meros", "ro'yxat", "in danger", "xavf", "xavfda", "юнеско", "世界遗产", "濒危"],
      response: {
        en: "The Historic Centre of Shakhrisabz was inscribed as UNESCO World Heritage Site #885 in 2000. It contains extraordinary monuments from the Timurid era (14th-15th centuries). In 2016, UNESCO placed it on the List of World Heritage in Danger due to aggressive urban clearing in the buffer zone. Our youth-led digital archive provides critical baseline documentation to support ethical conservation.",
        zh: "沙赫里萨布兹历史中心于2000年被列入联合国教科文组织世界遗产名录（#885），汇聚了14-15世纪帖木儿帝国的绝世建筑。2016年，因保护缓冲区内的过度现代景观改造，被列入《濒危世界遗产名录》。我们青年团队的数字化档案为促进真实性保护提供了关键的历史数据基线。",
        uz: "Shahrisabzning tarixiy markazi 2000-yilda YUNESKO Butunjahon merosi ro'yxatiga (#885) kiritilgan. Bu yerda 14-15-asrlarga oid noyob Temuriylar davri obidalari joylashgan. 2016-yilda shahar atrofidagi keskin qurilishlar sababli YUNESKO uni 'Xavf ostidagi meros' ro'yxatiga kiritgan. Bizning yoshlar ekspeditsiyamiz obidalarning asl qiyofasini raqamli saqlab qolishga xizmat qiladi."
      }
    },

    // 2. Ak-Saray Palace & 50-Year Transformation (1975 vs 2025)
    {
      id: "aksaray",
      phrases: [
        "ak saray", "ak-saray", "oq saroy", "oqsaroy", "white palace", "palace of timur",
        "1975 vs 2025", "50 year", "50 yillik", "clavijo", "ruy gonzalez", "阿克萨赖", "阿克萨莱", "白宫"
      ],
      keywords: ["aksaray", "oqsaroy", "palace", "1404", "1975", "2025", "clavijo", "arch", "qasr", "height", "pilon", "ustun", "minora", "restavratsiya", "consolidation", "50", "白宫", "阿克萨赖"],
      response: {
        en: "Ak-Saray Palace was commissioned by Amir Temur in 1380 as his grandest summer residence. Spanish envoy Ruy González de Clavijo recorded in 1404 that its monumental vault reached over 70 meters high with a 22.5m arch span. Today, only two colossal 38-meter pylons survive. Our interactive 50-Year Transformation slider compares 1975 Soviet-era archival surveys with our 2025 expedition, analyzing critical brick consolidation and plaza landscaping.",
        zh: "阿克萨赖宫建于1380年，是帖木儿大帝规模最宏伟的夏宫。西班牙使节克拉维约于1404年记载其巍峨的拱门高逾70米，跨度达22.5米。如今仅存两座38米高的巨型塔柱遗址。我们平台上的“50年变迁对比滑块”将1975年苏联时期的历史档案与2025年最新考察对比，深入解析了现代砖砌补强与外部步行广场的演变。",
        uz: "Oqsaroy qurilishi 1380-yilda Amir Temur farmoni bilan boshlangan. 1404-yilda Ispan elchisi Ruy Gonsales de Klavixo uning peshtoqi 70 metrdan ziyod, ravog'i 22.5 metr ekanligini qayd etgan. Bugungi kunda uning 38 metrli ikki ulkan piloni (ustuni) saqlanib qolgan. Saytimizdagi 50 yillik taqqoslash slayderi orqali 1975-yilgi xaroba holat bilan 2025-yilgi restavratsiya qilingan holatni solishtirishingiz mumkin."
      }
    },

    // 3. Amir Timur (Tamerlane): Birthplace, Kesh & Historical Roots
    {
      id: "temur_history",
      phrases: [
        "amir temur", "tamerlane", "temurlang", "where was timur born", "birthplace", "qayerda tug'ilgan",
        "kesh tarixi", "shakhrisabz and timur", "temur vatani", "帖木儿出生地", "帖木儿历史"
      ],
      keywords: ["temur", "timur", "tamerlane", "kesh", "tug'ilgan", "birth", "born", "birthplace", "1336", "xo'ja ilg'or", "taraghay", "ona yurti", "vatan", "帖木儿", "出生", "故乡"],
      response: {
        en: "Amir Temur (Tamerlane) was born on April 9, 1336, in the village of Khoja Ilgor, just 13 km south of Shakhrisabz (then known by its Sogdian name, Kesh). While Samarkand was the grand administrative capital of his empire, Temur regarded Shakhrisabz as his beloved ancestral hometown, turning it into a splendid second capital filled with magnificent imperial palaces and dynastic family shrines.",
        zh: "帖木儿大帝于1336年4月9日出生于沙赫里萨布兹以南13公里的霍贾·伊尔戈尔村（古称“渴石” Kesh）。尽管撒马尔罕是他帝国的行政首府，但帖木儿始终将沙赫里萨布兹视为自己的精神故乡与家族根脉，不惜重金将其营建为拥有壮丽宫殿和家族陵寝的第二都城。",
        uz: "Amir Temur 1336-yil 9-aprelda Shahrisabz yaqinidagi Xo'ja Ilg'or qishlog'ida (qadimiy Kesh shahrida) tavallud topgan. Samarqand uning saltanati poytaxti bo'lsa-da, Sohibqiron Shahrisabzni o'zining qadrdon kindik qoni to'kilgan ona vatani deb bilgan va uni saltanatning ikkinchi eng go'zal shahriga aylantirib, Oqsaroy va oilaviy daxmalar barpo ettirgan."
      }
    },

    // 4. Dorut Tilovat Complex & Shamsuddin Kulol
    {
      id: "dorut_tilovat",
      phrases: [
        "dorut tilovat", "doruttilovat", "shamsuddin kulol", "shamseddin", "taraghay maqbarasi",
        "house of meditation", "gumbazi sayyidon", "多鲁特提洛瓦特", "库洛尔陵墓"
      ],
      keywords: ["dorut", "tilovat", "doruttilovat", "kulol", "shamsuddin", "tarag'ay", "taraghay", "maqbara", "qabr", "tomb", "mausoleum", "meditation", "sayyidon", "提洛瓦特", "陵墓"],
      response: {
        en: "The Dorut Tilovat Complex ('House of Meditation/Recitation') is a sacred spiritual sanctuary developed around the tomb of Sheikh Shamsuddin Kulol (d. 1370), the revered spiritual Sufi mentor of Amir Temur and his father, Amir Taraghay. The complex houses the tomb of Taraghay, the Kulol mausoleum, the Kok Gumbaz Mosque, and the elegant 15th-century Gumbazi Sayyidon cupola built by Ulugh Beg.",
        zh: "多鲁特·提洛瓦特建筑群（意为“沉思与诵经之所”）是一处崇高的宗教圣地，围绕着帖木儿及其父亲阿米尔·塔拉盖的苏菲派精神导师沙姆斯丁·库洛尔长老（卒于1370年）之墓而建。该建筑群由库洛尔陵墓、塔拉盖之墓、青色穹顶清真寺以及兀鲁伯于15世纪为先知后裔建造的“赛义德之穹”组成。",
        uz: "Dorut Tilovat majmuasi ('Tilovat va Qur'on o'qish uyi') Amir Temur va uning otasi Amir Tarag'ayning ruhiy ustozi bo'lmish buyuk tasavvuf shayxi Shamsiddin Kulol (1370-y. vafot etgan) qabri atrofida shakllangan muqaddas ziyoratgohdir. Majmuada Amir Tarag'ay maqbarasi, Shamsiddin Kulol qabri, Ko'k Gumbaz masjidi hamda Mirzo Ulug'bek qurdirgan Gumbazi Sayyidon xonaqohi joylashgan."
      }
    },

    // 5. Kok Gumbaz Mosque & Mirzo Ulugh Beg
    {
      id: "kok_gumbaz",
      phrases: [
        "kok gumbaz", "ko'k gumbaz", "blue dome", "kok gumbaz mosque", "ulugh beg mosque",
        "ulug'bek masjidi", "shohrux sharafiga", "青色穹顶", "蓝色穹顶清真寺"
      ],
      keywords: ["kok", "ko'k", "gumbaz", "dome", "mosque", "masjid", "ulug'bek", "ulugh", "beg", "1435", "juma", "turquoise", "青色", "蓝色", "清真寺"],
      response: {
        en: "Kok Gumbaz Mosque ('The Blue Dome') was erected in 1435 by the great astronomer-ruler Mirzo Ulugh Beg in honor of his father, Shah Rukh. Its soaring turquoise double dome dominates the historic skyline of Shakhrisabz. The ceramic thuluth frieze around the drum features Quranic verses and Timurid calligraphic dedications.",
        zh: "青色穹顶清真寺（Kok Gumbaz）由帖木儿之孙、著名天文学家兼统治者兀鲁伯于1435年为纪念其父沙哈鲁而建。其高耸蔚蓝的双层绿松石穹顶俯瞰着沙赫里萨布兹古城的天际线，鼓座环绕着精美的三一体阿拉伯文古兰经铭文及帖木儿时期的题献书法。",
        uz: "Ko'k Gumbaz masjidi 1435-yilda buyuk munajjim va hukmdor Mirzo Ulug'bek tomonidan otasi Shohrux sharafiga qurilgan juma masjididir. Uning zangori feruza gumbazi Shahrisabz qadimiy osmonida yaqqol ajralib turadi. Gumbaz gardishidagi koshinli suls yozuvlarida Qur'on oyatlari va me'moriy bag'ishlovlar bitilgan."
      }
    },

    // 6. Dorus Saodat Complex & Jahangir's Crypt
    {
      id: "dorus_saodat",
      phrases: [
        "dorus saodat", "dorussaodat", "jahangir mirzo", "crypt of timur", "temur daxmasi",
        "house of power", "underground tomb", "多鲁斯萨达特", "贾汉吉尔陵墓", "地下地宫"
      ],
      keywords: ["dorus", "saodat", "dorussaodat", "jahongir", "jahangir", "crypt", "daxma", "sardoba", "o'g'li", "son", "tomb", "grave", "faryoz", "多鲁斯", "贾汉吉尔", "地宫"],
      response: {
        en: "Dorus Saodat ('Seat of Sovereignty and Power') was initiated by Amir Temur in 1379 after the heartbreaking premature death of his beloved 22-year-old eldest son and heir, Jahangir Mirza. The complex houses Jahangir's towering conical mausoleum and a dramatic, carved underground limestone crypt originally prepared for Temur himself before he was unexpectedly interred in Samarkand's Gur-e-Amir.",
        zh: "多鲁斯·萨达特建筑群（意为“显赫王权之所”）始建于1379年，起因是帖木儿挚爱且寄予厚望的22岁长子贾汉吉尔英年早逝。该建筑群包含贾汉吉尔高耸的圆锥形陵顶，以及一处极为震撼的地下石灰岩暗室地宫——这原是帖木儿为自己准备的最终归宿，但其骤逝后被改葬于撒马尔罕的古尔·阿米尔陵。",
        uz: "Dorus Saodat majmuasi ('Hukmronlik va saodat uyi') 1379-yilda Amir Temurning sevimli to'ng'ich o'g'li va taxt vorisi Jahongir Mirzo 22 yoshida bevaqt vafot etgach qurilgan. Majmua ichida Jahongir Mirzoning baland qirrali maqbarasi hamda Amir Temurning o'zi uchun maxsus tayyorlangan, ammo taqdir taqozosi bilan bo'sh qolgan sirli yerosti marmar daxmasi saqlangan."
      }
    },

    // 7. Traditional Craftsmanship: Chorsu Bazaar & Iroki Suzani Embroidery
    {
      id: "crafts_bazaar",
      phrases: [
        "chorsu", "chorsu bazaar", "kashtachilik", "iroki", "suzani", "embroidery", "crafts",
        "shakhrisabz bazaar", "bozor", "hunarmandchilik", "do'ppi", "恰尔苏", "传统手工艺", "刺绣"
      ],
      keywords: ["chorsu", "bozor", "bazaar", "market", "iroqi", "iroki", "suzani", "kashta", "kashtachilik", "craft", "crafts", "embroidery", "silk", "do'ppi", "skullcap", "suzanis", "恰尔苏", "刺绣", "巴扎"],
      response: {
        en: "Shakhrisabz is globally celebrated for its distinctive 'Iroki' cross-stitch embroidery and vibrant Suzani tapestries, recognized as UNESCO Intangible Cultural Heritage. At the center of town stands the 16th-century domed Chorsu covered trading bazaar, where Silk Road merchants traded spices, mountain lapis, silk cocoons, and finely woven ceramics for centuries.",
        zh: "沙赫里萨布兹以其独具一格的“伊洛基”（Iroki）十字挑花刺绣与绚丽的苏扎尼（Suzani）丝挂毯闻名于世，被列为人类非物质文化遗产。市中心耸立着建于16世纪的十字圆顶查尔苏（Chorsu）商贸巴扎，数个世纪以来，丝路商贾曾在此交易香料、高山青金石、蚕丝和精美陶器。",
        uz: "Shahrisabz o'zining mashhur 'Iroqi' uslubidagi mayda chokli kashtachiligi, do'ppilari va yorqin So'zanalari bilan dunyoga tanilgan. Shahar markazida 16-asrga oid gumbazli Chorsu savdo majmuasi qad rostlagan bo'lib, asrlar davomida Buyuk Ipak yo'li savdogarlari bu yerda ipak, ziravorlar, tog' lojuvardi va xalq amaliy san'ati buyumlarini sotishgan."
      }
    },

    // 8. Miraki Alpine Watershed, Oqsuv Stream & Nature
    {
      id: "miraki_nature",
      phrases: [
        "miraki", "oqsuv", "oqsuv canal", "hissar mountains", "nature of shakhrisabz",
        "watershed", "tog' tabiati", "miraki bog'i", "kashkadarya river", "米拉基", "自然风光", "高山水源"
      ],
      keywords: ["miraki", "oqsuv", "canal", "kanal", "river", "daryo", "tog'", "mountain", "nature", "tabiat", "water", "suv", "hissar", "gisar", "sayilgoh", "park", "米拉基", "自然", "高山"],
      response: {
        en: "Miraki, situated in the verdant foothills of the Hissar Mountain Range near Shakhrisabz, provides the essential mountain watershed for the ancient city. Our youth expedition field-surveyed the alpine Oqsuv canal, highlighting how Timurid engineers mastered sophisticated hydraulic irrigation systems to sustain lush urban oases, royal gardens, and royal hunting parks.",
        zh: "米拉基（Miraki）坐落在沙赫里萨布兹毗邻的吉萨尔山脉郁郁葱葱的山麓，是古城不可或缺的高山水塔。我们的青年文献考察团实地调研了奥克苏夫（Oqsuv）高山渠系，揭示了帖木儿时期的水利工程师如何巧妙构建灌溉网络，以此滋养绿洲城市、皇家苑囿与园林。",
        uz: "Miraki — Shahrisabz yaqinidagi Hisor tog' tizmasi etagida joylashgan so'lim va xushmanzara tog' maskanidir. Bizning ekspeditsiyamiz Mirakidagi qadimiy Oqsuv kanali va tabiatini o'rganib chiqdi. Qadimda Temuriylar aynan shu tog' suvlarini maxsus nov va kanallar orqali shahar bog'lari, Oqsaroy favvoralari va aholi ehtiyojlariga yetkazib bergan."
      }
    },

    // 9. Local Gastronomy: Kashkadarya Tandir Kebab & Food Culture
    {
      id: "gastronomy",
      phrases: [
        "tandir go'sht", "tandir kebab", "kashkadarya food", "what to eat", "cuisine",
        "traditional food", "ovqatlar", "taomlar", "tandir somsa", "qashqadaryo tandiri", "美食", "烤肉", "传统美食"
      ],
      keywords: ["tandir", "go'sht", "kebab", "kabob", "taom", "ovqat", "food", "cuisine", "eat", "somsa", "dish", "gastronomy", "archa", "juniper", "osh", "plov", "美食", "烤羊肉", "吃什么"],
      response: {
        en: "Kashkadarya region is renowned across Central Asia for its authentic Tandir Kebab (Tandir Go'sht)—marinated lamb slow-roasted deep inside a clay pit oven infused with wild mountain juniper branches (archa), giving the meat an unmistakable smoky mountain fragrance. Other iconic delicacies include Shakhrisabz leaf somsa and mountain herbal infusions.",
        zh: "卡什卡达里亚地区以其中亚闻名的“地坑焖烤羊肉”（Tandir Kebab）享誉美食界——将鲜嫩羊肉放入黏土深坑中，以野生产自高山的刺柏（Archa）枝条文火慢烤，赋予肉质独特的自然烟熏清香。此外，沙赫里萨布兹的薄叶烤包子（Somsa）与高山草药茶亦是不容错过的风味。",
        uz: "Qashqadaryo va Shahrisabz o'zining mashhur 'Tandir go'shti' bilan butun O'rta Osiyoda dong taratgan. Maxsus loy tandirda, tog'ning yovvoyi archa shoxlari tutunida dimlab pishiriladigan tandir go'shti betakror hid va mayin ta'mga ega bo'ladi. Shuningdek, Shahrisabzning tandir somsasi va tog' giyohlaridan damlangan choylar mintaqaning o'ziga xos mehmondo'stlik ramzidir."
      }
    },

    // 10. Travel Logistics: How to Visit, Route & Best Seasons
    {
      id: "travel_guide",
      phrases: [
        "how to get to shakhrisabz", "how to visit", "how to travel", "best season to visit",
        "qanday boriladi", "transport", "taxtaqoracha", "samarkand to shakhrisabz", "tashkent to shakhrisabz",
        "how to go", "qaysi faslda", "旅游攻略", "怎么去沙赫里萨布兹", "最佳旅游季节"
      ],
      keywords: ["visit", "travel", "transport", "route", "season", "months", "borish", "yo'l", "mashina", "dovon", "poezd", "fasl", "qachon", "samarqand", "samarkand", "taxtaqoracha", "tashkent", "toshkent", "旅游", "交通", "季节"],
      response: {
        en: "To visit Shakhrisabz, the most scenic route is driving from Samarkand across the picturesque Taxtaqoracha Mountain Pass (approx. 90 km, 1.5–2 hours by shared taxi), offering breathtaking views of the Zarafshan and Hissar ranges. Alternatively, high-speed and sleeper trains connect Tashkent directly to Shakhrisabz Railway Station. The optimal seasons to visit are Spring (April–June) for blossoming almond trees and Autumn (September–November) for crisp blue skies.",
        zh: "前往沙赫里萨布兹最经典的景观路线是从撒马尔罕出发，乘车翻越风景如画的塔赫塔卡拉查（Taxtaqoracha）高山山口（约90公里，乘出租车约1.5-2小时），俯瞰泽拉夫尚与吉萨尔山脉的绝美全景。此外，也有从塔什干直达沙赫里萨布兹的高速与客运列车。最佳旅游季节为春季（4-6月，杏花盛开）与秋季（9-11月，天朗气清）。",
        uz: "Shahrisabzga borishning eng go'zal yo'li — Samarqand shahridan mashinada Taxtaqoracha dovoni orqali o'tishdir (masofa taxminan 90 km, 1.5-2 soat). Tog' dovonidan Hisor va Zarafshon tog'larining ajoyib manzarasi ko'rinadi. Shuningdek, Toshkentdan Shahrisabz vokzaliga to'g'ridan-to'g'ri poyezdlar qatnaydi. Sayohat qilish uchun eng yaxshi fasllar — bahor (aprel-iyun oylarida daraxtlar gullagan payt) va kuz (sentyabr-noyabr oylarida mayin ob-havo) hisoblanadi."
      }
    },

    // 11. Epigraphy, Calligraphy & Famous Architectural Quotes
    {
      id: "epigraphy",
      phrases: [
        "inscriptions", "calligraphy", "famous quote", "what is written", "masjid bitiklari",
        "tarixiy tosh", "if you doubt our power", "qudratimizga shubha qilsangiz", "碑铭", "阿拉伯文书法", "著名格言"
      ],
      keywords: ["bitik", "yozuv", "calligraphy", "epigraphy", "inscription", "quote", "qudrat", "power", "doubt", "tosh", "stone", "arabic", "arabcha", "suls", "kufic", "koshin", "naxsh", "铭文", "题字", "名言"],
      response: {
        en: "The monuments of Shakhrisabz are celebrated for monumental epigraphy. Most famous is the imperial declaration once emblazoned across Ak-Saray's grand portal: 'If you doubt our power, look at our buildings!' (Agar bizning qudratimizga shubha qilsangiz, biz qurgan imoratlarga boqing!). Sacred Quranic verses in monumental Thuluth and geometric square Kufic script adorn the mosques, praising divine eternity and cosmic order.",
        zh: "沙赫里萨布兹古建筑以宏伟的题刻碑铭著称。其中最著名的是昔日镌刻在阿克萨赖宫宏伟拱门上的帝国格言：“若疑吾力，且观吾筑！”（If you doubt our power, look at our buildings!）。各大清真寺与陵寝鼓座上还布满了雄浑的三一体（Thuluth）和几何方块库法体（Kufic）古兰经文，颂扬神圣永恒与宇宙秩序。",
        uz: "Shahrisabz obidalari o'zining mahobatli epigrafik yozuvlari bilan mashhur. Ularning ichida eng mashhuri Oqsaroy peshtoqiga yozilgan Amir Temurning faxrli so'zlaridir: 'Agar bizning qudratimizga shubha qilsangiz, biz qurgan imoratlarga boqing!' Shuningdek, Ko'k Gumbaz va Dorut Tilovat devorlarida nozik suls va handasaviy kufiy xatlarida Qur'oni Karim oyatlari hamda hikmatli so'zlar bitilgan."
      }
    },

    // 12. Project Author: Who is Alisher Tuychiyev & The Leadership
    {
      id: "alisher_bio",
      phrases: [
        "who is alisher", "alisher tuychiev", "alisher tuychiyev", "who made this", "who developed", "who created",
        "who built", "archive creator", "about the author", "kim bu alisher", "sayt muallifi", "loyiha rahbari",
        "bu saytni kim", "kim yaratgan", "kim qilgan", "muallif kim", "abdulla oripov maktabi", "najot ta'lim", "阿利舍尔", "谁制作了这个"
      ],
      keywords: ["alisher", "tuychiev", "tuychiyev", "developer", "creator", "muallif", "rahbar", "author", "guide", "who", "kim", "oripov", "najot", "maktab", "school", "student", "talaba", "作者", "开发者", "向导"],
      response: {
        en: "Alisher Tuychiyev is an 11th-grade student at the specialized Abdulla Oripov Creative School in Karshi and a Machine Learning trainee at Najot Ta'lim IT Academy. Combining a passion for Central Asian cultural heritage with computer science, Alisher served as the youth co-organizer and local heritage guide for the Wikimedia-backed Shakhrisabz documentation expedition, architecting this open-access platform for the 2026 International Youth Forum.",
        zh: "阿利舍尔·图伊奇耶夫（Alisher Tuychiyev）是乌兹别克斯坦卡尔希阿卜杜拉·阿里波夫创意专科学校的11年级在读高中生，同时在Najot Ta'lim计算机学院接受机器学习系统训练。他将对中亚文化遗产的热忱与现代数据技术相结合，担任维基媒体基金会资助项目的青年联合组织者兼地方实地向导，为2026年国际青年论坛独立架构了本套全栈多语言平台。",
        uz: "Alisher Tuychiyev — Qarshi shahridagi Abdulla Oripov nomidagi ixtisoslashtirilgan ijod maktabining 11-sinf o'quvchisi hamda Najot Ta'lim IT akademiyasining Machine Learning (Sun'iy intellekt) yo'nalishi bitiruvchisi. U madaniy merosni zamonaviy texnologiyalar bilan asrashga qiziqib, Vikimedia jamg'armasi granti doirasidagi Shahrisabz ekspeditsiyasining hammuassisi va mahalliy gidi sifatida faoliyat yuritgan hamda ushbu xalqaro platformani yaratgan."
      }
    },

    // 13. Wikimedia Foundation Grant & Youth Cohort of Karshi State University
    {
      id: "grant_wikimedia",
      phrases: [
        "wikimedia grant", "wikimedia foundation", "2000 usd", "karshi state university",
        "qarshi davlat universiteti", "vikimedia granti", "talabalar", "youth cohort", "2000 dollar", "维基媒体资助", "卡尔希大学"
      ],
      keywords: ["grant", "wikimedia", "expedition", "karshi", "qdu", "universitet", "university", "cohort", "commons", "loyihasi", "jamg'arma", "talaba", "students", "2000", "sponsor", "homiy", "维基", "资助"],
      response: {
        en: "The expedition was funded by a $2,000 USD regional grant from the Wikimedia Foundation. Alisher Tuychiev co-organized the expedition alongside a cohort of 20 university students and mentors from Karshi State University. Over the course of intensive field surveys, the delegation archived over 500 high-resolution photographic and video assets to Wikimedia Commons under CC BY-SA 4.0 open licenses to enrich Wikipedia articles worldwide.",
        zh: "本次文献考察获得了维基媒体基金会（Wikimedia Foundation）2000美元国际区域资助支持。由Alisher Tuychiev与来自卡尔希国立大学的20名青年大学生及导师联合开展。考察团进行了全域高强度田野勘测，向维基共享资源（Wikimedia Commons）归档上传了500余份高分辨率影像与视频，全部采用CC BY-SA 4.0开放知识共享协议，填补了全球维基百科关于该古城的内容空白。",
        uz: "Ushbu ekspeditsiya Vikimedia Jamg'armasining \$2,000 dollarlik xalqaro granti ko'magida amalga oshirildi. Alisher Tuychiyev Qarshi davlat universitetining 20 nafar iqtidorli talabalari bilan birgalikda Shahrisabz bo'ylab dala tadqiqoti o'tkazdi. Ekspeditsiya davomida 500 dan ortiq professional fotosuratlar va videotasvirlar Wikimedia Commons xalqaro ochiq ensiklopediyasiga CC BY-SA 4.0 erkin litsenziyasi bilan yuklandi."
      }
    },

    // 14. Silk Road Ties: Shakhrisabz to Changsha & Nanjing
    {
      id: "china_silkroad",
      phrases: [
        "china connection", "changsha and nanjing", "silk road trade", "tongguan kiln",
        "xitoy bilan aloqalar", "nanjing", "changsha", "cobalt blue", "青花瓷", "丝绸之路交流", "长沙", "南京"
      ],
      keywords: ["china", "changsha", "nanjing", "silk road", "road", "kiln", "trade", "xitoy", "ipak", "porcelain", "chinnisi", "savdo", "caravan", "iyf", "forum", "中国", "丝绸之路", "瓷器"],
      response: {
        en: "Shakhrisabz and China share profound historical bonds along the ancient Silk Road. Central Asian cobalt mineral pigments were famously exported along the caravan arteries into China to create the iconic cobalt blue underglazes at imperial kilns (such as Changsha's Tongguan Kilns). In return, Chinese silk, porcelain, and papermaking transformed Central Asian craft. The 2026 IYF in Changsha and Nanjing continues this 2,000-year civilizational dialogue.",
        zh: "沙赫里萨布兹与中国通过古老的丝绸之路结下了深厚的历史渊源。历史上，中亚出产的优质苏麻离青（钴蓝矿物颜料）沿驼道传入中国，为著名的长沙铜官窑等瓷都烧制传世青花瓷提供了不可或缺的色彩源泉；而中国的桑蚕丝织、瓷器与造纸术深度滋养了中亚绿洲。2026年在长沙与南京举办的国际青年论坛正是这段延续两千年文明对话的当代新生。",
        uz: "Shahrisabz va Xitoy o'rtasida Buyuk Ipak yo'lining 2000 yillik qadimiy do'stlik rishtalari mavjud. Tarixda Markaziy Osiyodan keltirilgan kobalt zangori bo'yog'i Xitoyning mashhur Changsha koshinlarida nafis chinni buyumlar yasashda ishlatilgan. Xitoydan esa qog'oz va ipak yurtimizga kirib kelgan. 2026-yilda Changsha va Nanjing shaharlarida o'tkaziladigan IYF Forumi ana shu tarixiy madaniy aloqalarning zamonaviy davomidir."
      }
    },

    // 15. AI Technology & Computer Vision in Heritage Conservation
    {
      id: "ai_vision",
      phrases: [
        "how ai is used", "ai in heritage", "machine learning", "computer vision",
        "sun'iy intellekt qanday ishlatilgan", "ai loyihada", "sun'iy intellekt", "人工智能应用"
      ],
      keywords: ["ai", "vision", "model", "future", "sun'iy", "intellekt", "machine learning", "algorithm", "dastur", "nlp", "docent", "chat", "人工智能", "技术"],
      response: {
        en: "In our project, AI serves as an open-access cultural interpreter rather than a fabricator of artificial imagery. We employ Computer Vision algorithms to transcribe ancient stone epigraphy and Arabic/Persian calligraphic friezes, and natural language processing (NLP) to empower this trilingual Silk Road AI Docent, ensuring that historical Silk Road narratives are accessible to youth globally in real-time.",
        zh: "在我们的项目中，AI被定义为开放知识的“文化解译官”而非虚假图像的生成者。我们借助计算机视觉算法对古代石刻碑铭及三一体波斯/阿拉伯文书法进行高精度识别，并通过自然语言处理（NLP）驱动这套三语丝路AI导览导师，让全球青年能够即时跨越语言壁垒，探索真实的丝路文明档案。",
        uz: "Loyihamizda sun'iy intellekt soxta rasmlar to'qish uchun emas, balki qadimiy merosni to'g'ri tushuntirish va ommalashtirish uchun xizmat qiladi. Biz Computer Vision yordamida qadimiy tosh va devoriy bitiklarni avtomatik o'qish hamda tabiiy tilni qayta ishlash (NLP) orqali ushbu 3 tilda ishlovchi AI Docent maslahatchisini joriy qildik. Bu har qanday sayyohga qadimiy tariximizni o'z tilida bilib olish imkonini beradi."
      }
    }
  ];

  /**
   * Smart Semantic Matcher
   * Calculates relevance score based on phrase matches, word stems, and token overlap
   */
  function scoreQuery(queryLower, item) {
    let score = 0;

    // 1. Check full multi-word phrases (High weight: +10 points)
    if (item.phrases) {
      for (const phrase of item.phrases) {
        if (queryLower.includes(phrase.toLowerCase())) {
          score += 10;
        }
      }
    }

    // 2. Tokenize query into clean words
    const queryTokens = queryLower
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"“”!]/g, " ")
      .split(/\s+/)
      .filter(t => t.length > 0);

    // 3. Match keywords against tokens or stem matching
    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      for (const token of queryTokens) {
        if (token === kwLower) {
          score += kwLower.length >= 5 ? 4 : 3;
        } else if (token.startsWith(kwLower) && kwLower.length >= 4) {
          // e.g. "ovqat" matches "ovqatlari", "temur" matches "temurning"
          score += 3;
        }
      }
    }

    return score;
  }

  function getAiResponse(userText) {
    const textLower = userText.toLowerCase().trim();
    const lang = currentLang || 'en';

    let bestItem = null;
    let highestScore = 0;

    for (const item of knowledgeBase) {
      const score = scoreQuery(textLower, item);
      if (score > highestScore) {
        highestScore = score;
        bestItem = item;
      }
    }

    // Threshold score of 2 to trigger a matched answer
    if (bestItem && highestScore >= 2) {
      return bestItem.response[lang] || bestItem.response.en;
    }

    // Contextual fallback response if no match
    const defaults = {
      en: "Thank you for asking! While I specialize in Shakhrisabz's Timurid heritage, you can ask me about: 1) Ak-Saray's 50-year transformation, 2) Amir Temur's birthplace in Kesh, 3) Dorut Tilovat & Kok Gumbaz, 4) Chorsu bazaar & Iroki embroidery, 5) Local Tandir Kebab cuisine, 6) How to travel to Shakhrisabz, or 7) Our Wikimedia expedition.",
      zh: "感谢您的提问！我专注于沙赫里萨布兹与帖木儿时代文化遗产。您可以随时向我咨询：1）阿克萨赖宫50年变迁对比；2）帖木儿出生地与古城渴石；3）多鲁特提洛瓦特与青色穹顶清真寺；4）查尔苏巴扎与伊洛基刺绣；5）地坑焖烤羊肉美食；6）沙赫里萨布兹旅游交通攻略；7）维基媒体考察成果。",
      uz: "Savolingiz uchun tashakkur! Men Shahrisabz va Temuriylar merosi bo'yicha maslahatchiman. Menga quyidagi mavzularda savol berishingiz mumkin: 1) Oqsaroyning 50 yillik o'zgarishi, 2) Amir Temurning tavalludi va Kesh tarixi, 3) Dorut Tilovat va Ko'k Gumbaz, 4) Chorsu bozori va Iroqi kashtachilik, 5) Tandir go'shti milliy taomi, 6) Shahrisabzga qanday borish (sayohat yo'li), yoki 7) Vikimedia ekspeditsiyamiz."
    };
    return defaults[lang] || defaults.en;
  }

  function appendMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = text;
    chatHistory.appendChild(bubble);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function handleSend() {
    const query = chatInput.value.trim();
    if (!query) return;

    appendMessage('user', query);
    chatInput.value = '';

    // Show simulated typing delay
    setTimeout(() => {
      const response = getAiResponse(query);
      appendMessage('bot', response);
    }, 320);
  }

  chatSendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Bind quick topic chips in sidebar
  document.querySelectorAll('.quick-chips .chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();
      chatInput.value = text;
      handleSend();
    });
  });
}
