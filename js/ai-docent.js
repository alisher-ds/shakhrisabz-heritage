/* ========================================================
   SILK ROAD AI DOCENT (Interactive Knowledge Assistant)
   Semantic Multi-Token Scoring Engine with Trilingual NLU
   ======================================================== */
import { currentLang } from './i18n.js';

export function initAiDocent() {
  const drawer = document.getElementById('docentDrawer');
  const backdrop = document.getElementById('docentBackdrop');
  const closeBtn = document.getElementById('docentCloseBtn');
  const floatingBtn = document.getElementById('floatingDocentBtn');
  const openSpotlightBtn = document.getElementById('openDocentDrawerBtn');
  const drawerChatStream = document.getElementById('drawerChatStream');
  const drawerInput = document.getElementById('drawerInput');
  const drawerSendBtn = document.getElementById('drawerSendBtn');
  const samplePills = document.querySelectorAll('.prompt-sample-pill');
  const miniChips = document.querySelectorAll('.chip-mini-btn');

  if (!drawer || !drawerChatStream) return;

  // Enforce bottom-right corner positioning regardless of any client cache
  const applyRightPosition = () => {
    if (!floatingBtn) return;
    if (drawer.classList.contains('active')) {
      floatingBtn.style.setProperty('display', 'none', 'important');
      return;
    }
    const isMobile = window.innerWidth <= 768;
    floatingBtn.style.removeProperty('display');
    floatingBtn.style.setProperty('position', 'fixed', 'important');
    floatingBtn.style.setProperty('right', isMobile ? '1.2rem' : '1.75rem', 'important');
    floatingBtn.style.setProperty('left', 'auto', 'important');
    floatingBtn.style.setProperty('bottom', isMobile ? 'max(1.2rem, env(safe-area-inset-bottom))' : '1.75rem', 'important');
    floatingBtn.style.setProperty('z-index', '9999', 'important');
  };

  if (floatingBtn) {
    applyRightPosition();
    window.addEventListener('resize', applyRightPosition, { passive: true });
  }

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
    },

    // 16. Curatorial Greetings & Persona Introduction
    {
      id: "greetings",
      phrases: [
        "salom", "assalomu alaykum", "hello", "hi there", "hey", "good morning", "good afternoon",
        "你好", "您好", "sen kimsan", "who are you", "what can you do", "vazifang nima", "qanday yordam",
        "bot kimsan", "tanishtir", "help me"
      ],
      keywords: ["salom", "assalom", "hello", "hi", "hey", "greetings", "kimsan", "tanishtir", "vazifa", "help", "yordam", "bot", "docent", "maslahatchi", "你好", "你是谁", "介绍"],
      response: {
        en: "Greetings! I am the Silk Road AI Docent, your autonomous curatorial guide for the Shakhrisabz Cultural Heritage Archive. You can ask me anything about: 1) Ak-Saray's 50-year metamorphosis, 2) Amir Temur's birthplace in Kesh, 3) UNESCO #885 World Heritage in Danger, 4) Dorut Tilovat & Kok Gumbaz, 5) Kashkadarya Tandir Kebab gastronomy, 6) The 2026 IYF Forum in China, or 7) Our youth Wikimedia expedition.",
        zh: "您好！我是丝绸之路AI策展导览助手，专门为您解说沙赫里萨布兹文化遗产档案。您可以随时向我咨询：1）阿克萨赖宫50年变迁；2）帖木儿故里古城渴石；3）联合国教科文组织885号濒危遗产；4）多鲁特提洛瓦特与青色穹顶；5）地坑焖烤羊肉美食；6）2026年中国国际青年论坛；7）青年维基媒体考察成果。",
        uz: "Assalomu alaykum! Men Shahrisabz madaniy merosi arxivi bo'yicha sun'iy intellekt kuratori — Silk Road AI Docentman. Mendan quyidagilar haqida so'rashingiz mumkin: 1) Oqsaroyning 50 yillik o'zgarishi, 2) Amir Temurning tavalludi va Kesh tarixi, 3) YUNESKO #885 xavf ostidagi meros holati, 4) Dorut Tilovat va Ko'k Gumbaz, 5) Qashqadaryo tandir go'shti, 6) 2026-yilgi Xitoydagi IYF forumi, yoki 7) Yoshlar Vikimedia ekspeditsiyamiz."
      }
    },

    // 17. Gratitude, Compliments & Cultural Courtesy
    {
      id: "gratitude",
      phrases: [
        "rahmat", "tashakkur", "katta rahmat", "thank you", "thanks", "appreciate", "ajoyib", "zo'r",
        "super", "maladets", "great job", "awesome", "perfect", "qoyil", "barakalla", "谢谢", "太棒了", "多谢"
      ],
      keywords: ["rahmat", "tashakkur", "spasibo", "thanks", "thank", "great", "zo'r", "ajoyib", "good", "bravo", "qoyil", "barakalla", "super", "awesome", "谢谢", "感谢", "太棒了"],
      response: {
        en: "You are most welcome! It is an absolute honor to share the extraordinary heritage of Shakhrisabz and the Timurid Renaissance with curious minds worldwide. Feel free to ask more questions about our architectural surveys, local legends, or expedition findings!",
        zh: "不客气！非常荣幸能与您分享沙赫里萨布兹与帖木儿文艺复兴的辉煌文明。如果您对我们的建筑考察、历史传奇或实地学术成果还有任何疑问，欢迎随时提问！",
        uz: "Arzimas, xursandman! Shahrisabzning buyuk tarixi va Temuriylar davri renessansi haqidagi bilimlarni siz bilan ulashish men uchun sharafdir. Yana qandaydir savollaringiz, me'moriy obidalar yoki ekspeditsiyamiz haqida qiziqishlaringiz bo'lsa, bemalol so'rang!"
      }
    },

    // 18. 2026 International Youth Forum (IYF in Changsha & Nanjing)
    {
      id: "iyf_forum",
      phrases: [
        "iyf 2026", "international youth forum", "changsha forum", "nanjing forum", "china forum",
        "xitoydagi forum", "forum nima", "iyf haqida", "iyf nima", "2026 forum", "forum sanasi", "november 15-20", "国际青年论坛", "iyf"
      ],
      keywords: ["iyf", "forum", "changsha", "nanjing", "november", "noyabr", "15-20", "youth", "yoshlar", "xalqaro", "unesco", "china", "xitoy", "mezbon", "host", "论坛", "国际青年", "长沙", "南京"],
      response: {
        en: "The 2026 International Youth Forum (IYF) on Creativity and Heritage along the Silk Roads takes place on November 15–20, 2026, hosted in Changsha (UNESCO City of Media Arts) and Nanjing (UNESCO City of Literature), China. Organized by UNESCO and the Chinese National Commission, the forum convenes outstanding young cultural leaders to explore 'Youth-led Creative Expression of Heritage in the Age of AI'. Our Shakhrisabz digital archive was specifically built for this global stage.",
        zh: "2026年“一带一路”青年创意与遗产国际论坛（IYF）将于2026年11月15日至20日在中国长沙（联合国教科文组织“媒体艺术之都”）与南京（“文学之都”）举行。由联合国教科文组织与中国联合国教科文组织全国委员会联合主办，汇聚全球青年英才探讨“人工智能时代的青年文化遗产创意表达”。我们这套沙赫里萨布兹数字化档案正是为该国际盛会量身打造的代表作。",
        uz: "2026-yilgi 'Ipak yo'li bo'ylab ijodkorlik va madaniy meros' Xalqaro Yoshlar Forumi (IYF) 2026-yil 15–20-noyabr kunlari Xitoyning Changsha (YUNESKO Media san'ati shahri) va Nanjing (YUNESKO Adabiyot shahri) shaharlarida bo'lib o'tadi. YUNESKO va Xitoy Milliy komissiyasi tomonidan tashkil etilgan ushbu nufuzli anjuman 'AI davrida yoshlarning madaniy merosni ifodalashi' mavzusiga bag'ishlangan bo'lib, bizning raqamli platformamiz aynan shu forumga taqdim etilmoqda."
      }
    },

    // 19. Ruy González de Clavijo's Historical Embassy (1404)
    {
      id: "clavijo_embassy",
      phrases: [
        "clavijo", "ruy gonzalez", "ispan elchisi", "clavijo kim", "spanish ambassador", "castilian envoy",
        "1404", "embajada a tamorlan", "klavixo", "klavixo kundaligi", "克拉维约", "西班牙使节"
      ],
      keywords: ["clavijo", "klavixo", "elchi", "ispan", "spanish", "castilian", "1404", "envoy", "ambassador", "kundalik", "tavsif", "ruy", "gonzalez", "embajada", "tamorlan", "克拉维约", "使节", "出使", "西班牙"],
      response: {
        en: "Ruy González de Clavijo was a Spanish diplomat dispatched by King Henry III of Castile to the imperial court of Amir Temur in 1404. Passing through Shakhrisabz in late August 1404, Clavijo recorded the only surviving eyewitness account of Ak-Saray Palace in its fully operational glory. He wrote about the colossal 70-meter vault, glistening turquoise tiles, gold leaf ceilings, and lush courtyard fountains, describing it as an architectural miracle surpassing European palaces.",
        zh: "鲁伊·冈萨雷斯·德·克拉维约（Ruy González de Clavijo）是卡斯蒂利亚国王亨利三世于1404年派遣出使帖木儿帝国的西班牙使节。他在1404年8月途经沙赫里萨布兹，留下了关于阿克萨赖宫全盛时期唯一存世的目击文献。他在其名著《克拉维约东使记》中惊叹于宫殿高达70余米的巨型穹拱、蔚蓝璀璨的琉璃瓦、鎏金藻井与中庭涌泉，盛赞其建筑奇迹远超当时欧洲任何宫殿。",
        uz: "Ruy Gonsales de Klavixo — 1404-yilda Kastiliya (Ispaniya) qiroli Genrix III tomonidan Amir Temur huzuriga yuborilgan elchidir. U 1404-yil avgust oyida Shahrisabzda bo'lib, Oqsaroyning butun mahobati va go'zalligini o'z ko'zi bilan ko'rgan yagona xorijiy elchidir. Klavixo o'zining mashhur 'Samarqandga Amir Temur saroyiga sayohat kundaligi' kitobida Oqsaroyning 70 metrlik peshtoqi, tillarang naqshlari, favvoralari va bog'larini hayrat bilan ta'riflab, uni Yevropada tengi yo'q me'moriy mo''jiza deb atagan."
      }
    },

    // 20. Ak-Saray Monumental Dimensions & Vault Arch
    {
      id: "aksaray_dimensions",
      phrases: [
        "oqsaroy balandligi", "aksaray height", "dimensions of aksaray", "arch span", "how tall was aksaray",
        "peshtoqi qancha", "necha metr", "oqsaroy ulchamlari", "palace size", "ravoq kengligi", "pilonlar balandligi", "阿克萨赖高度", "宫殿规模", "穹拱跨度"
      ],
      keywords: ["balandlik", "metr", "height", "tall", "size", "dimension", "dimensions", "span", "pilon", "ustun", "70", "38", "22", "ravoq", "peshtoq", "ulcham", "hajmi", "scale", "规模", "高度", "米", "跨度"],
      response: {
        en: "Ak-Saray was a monumental marvel of unprecedented scale: its central triumphal entrance portal originally towered over 70 meters (approx. 230 feet) high, with a colossal arch span of 22.5 meters. The central courtyard stretched over 250 meters in length, flanked by hundreds of vaulted reception suites, marble pools, and blue-tiled galleries. Today, the two surviving weathered corner pylons still stand at an imposing 38 meters (equivalent to a 12-story building).",
        zh: "阿克萨赖宫在历史上拥有空前绝后的宏伟尺度：其中央主入口凯旋门原高逾70米（约23层楼高），主拱跨度达22.5米。主庭院纵深超过250米，两侧环绕着数百间带拱顶的国宾会客厅、大理石喷水池与青金石琉璃回廊。如今历经600年沧桑，残存的两座塔柱依然耸立达38米高（相当于12层现代建筑高度）。"
        uz: "Oqsaroy o'z davrining eng ulkan me'moriy inshooti bo'lgan: uning bosh peshtoqi balandligi 70 metrdan ortiq (taxminan 23 qavatli bino balandligida), ravog'ining kengligi esa 22.5 metr bo'lgan. Saroyning ichki hovlisi 250 metrdan ziyod uzunlikda bo'lib, marmar hovuzlar va koshinli xonalar bilan o'ralgan. Bugungi kungacha saqlanib qolgan ikki pilonning (ustunning) o'zi 38 metr balandlikka ega bo'lib, 12 qavatli uy balandligiga tengdir."
      }
    },

    // 21. UNESCO Conservation Ethics & The Venice Charter (1964)
    {
      id: "conservation_ethics",
      phrases: [
        "restavratsiya etikasi", "conservation dilemma", "venice charter", "why modern buildings cleared",
        "nega mahallalar buzildi", "unesco xavf sababi", "authenticity", "haqqoniylik", "badiiy restavratsiya", "保护伦理", "威尼斯宪章", "历史真实性"
      ],
      keywords: ["etika", "ethics", "buzuq", "clearing", "buzish", "venice", "charter", "nara", "authenticity", "haqqoniy", "dilemma", "buffer", "xavf", "danger", "1964", "2016", "restavratsiya", "伦理", "真实性", "保护"],
      response: {
        en: "The conservation dilemma at Shakhrisabz centers on the delicate balance between modern urban beautification and historical authenticity under the Venice Charter (1964). In 2014–2016, historic residential quarters (mahallas) in the core buffer zone were cleared to build tourist esplanades, leading UNESCO to place site #885 on the Danger List. Our project advocates for science-based, reversible, non-invasive digital archiving that preserves historical truth rather than synthetic over-reconstruction.",
        zh: "沙赫里萨布兹的遗产保护困境反映了现代旅游景观开发与《威尼斯宪章》（1964）强调的历史真实性之间的深刻博弈。2014至2016年间，保护缓冲区内的传统历史社区（马哈拉）遭到大面积拆除以修建游客步行广场，导致其被列入《濒危世界遗产名录》。我们项目提倡基于数字化基线、非侵入式、可逆的现代科技保护路径，尊重原真性而非人工假古董改造。",
        uz: "Shahrisabzdagi merosni asrash dilemmasi xalqaro Venetsiya xartiyasi (1964) va YUNESKO talablari bilan bevosita bog'liq. 2014-2016 yillarda Oqsaroy atrofidagi qadimiy an'anaviy mahallalar sayyohlik maydoni qurish maqsadida buzilgani sababli, YUNESKO uni 2016-yilda 'Xavf ostidagi butunjahon merosi' ro'yxatiga kiritgan. Bizning raqamli loyihamiz asriy yodgorliklarning asl qiyofasini buzmasdan, raqamli texnologiyalar orqali haqiqiy tarixiy haqiqatni asrab qolishni ilgari suradi."
      }
    },

    // 22. Ancient Kesh, Sogdian Civilization & Alexander the Great
    {
      id: "ancient_kesh",
      phrases: [
        "ancient kesh", "qadimiy kesh", "sogdiana", "sogdian heritage", "alexander the great", "temurgacha",
        "before timur", "shakhrisabz kelib chiqishi", "qadimgi shahar", "so'g'd", "nautaca", "渴石古城", "粟特文明", "亚历山大大帝"
      ],
      keywords: ["kesh", "sogd", "so'g'd", "sogdiana", "alexander", "iskandar", "qadim", "ancient", "bc", "miloddan", "kelib", "chiqishi", "nautaca", "navtaka", "zoroastrian", "zardushtiylik", "粟特", "古城", "亚历山大"],
      response: {
        en: "Long before Amir Temur made it his imperial sanctuary, Shakhrisabz flourished for over 2,700 years as the ancient Sogdian city of Kesh (also identified with ancient Nautaca). In 328 BC, Alexander the Great wintered his armies in Nautaca while subduing Sogdiana and marrying the Bactrian noblewoman Roxana. Chinese Tang Dynasty chronicles documented Kesh as the 'Kingdom of Shi' (史国), renowned for brave caravan merchants, wine, and celestial dancers.",
        zh: "早在帖木儿将其营建为皇家圣地之前，沙赫里萨布兹作为古粟特名城“渴石”（古称诺塔卡 Nautaca）已有超过2700年的建城史。公元前328年，亚历山大大帝曾在此地驻军过冬以平定粟特反抗，并迎娶了巴克特里亚贵族罗克珊娜。中国唐代玄奘法师与典籍中将其记载为西域昭武九姓之一的“史国”，以擅长丝路长途商贸、葡萄酒与胡旋舞闻名于世。",
        uz: "Amir Temur davrigacha ham Shahrisabz 2,700 yillik ulkan tarixga ega bo'lgan va So'g'diyona davlatining 'Kesh' (qadimda Navtaka) deb atalgan yirik madaniyat markazi bo'lgan. Miloddan avvalgi 328-yilda Iskandar Zulqarnayn (Aleksandr Makedonskiy) aynan shu yerda qishlab, So'g'd qoyasini egallagan. Xitoy manbalarida (Tang sulolasi yilnomalarida) Kesh shahri Buyuk Ipak yo'lidagi 'Shi davlati' (昭武九姓) sifatida qayd etilgan bo'lib, uning savdogarlari Xitoygacha karvonlar olib borgan."
      }
    },

    // 23. Suzani Motifs & Spiritual Symbolism
    {
      id: "suzani_symbolism",
      phrases: [
        "suzani naqshlari", "so'zana ramzlari", "symbols in suzani", "pomegranate symbol", "sun rosette",
        "anor ramzi", "quyosh naqshi", "iroqi kashta siri", "kashtachilik ma'nosi", "do'ppi naqshi", "苏扎尼图案寓意", "刺绣象征", "石榴纹", "太阳花纹"
      ],
      keywords: ["naqsh", "suzani", "so'zana", "anor", "pomegranate", "quyosh", "sun", "rosette", "tumor", "symbol", "ramz", "meaning", "kashta", "iroqi", "do'ppi", "palak", "bodom", "kalampir", "图案", "寓意", "石榴", "刺绣"],
      response: {
        en: "In Shakhrisabz Suzani tapestries and Iroki skullcaps, every embroidered motif carries ancient talismanic and spiritual symbolism. The blazing circular sun rosettes represent solar energy and life continuity; bursting pomegranates (anor) symbolize fertility, abundance, and unity of family; and red hot-pepper (murch/kalampir) motifs serve as protective talismans warding off the evil eye. The rich crimson, gold, and turquoise threads reflect the desert oasis palette.",
        zh: "沙赫里萨布兹的苏扎尼（Suzani）丝挂毯与伊洛基刺绣小帽中，每一个针法图案都蕴含着深邃的祈福与辟邪象征。炽热盛开的圆形太阳花纹象征阳光、永恒与生命轮回；裂口繁籽的石榴（Anor）寓意多子多福、富足繁荣与家族团结；而卷曲的红辣椒与杏仁（Kalampir/Bodom）纹样则是阻挡厄运的护身图腾。绛红、明黄与绿松石绿的丝线构成了绿洲绿原的视觉诗篇。",
        uz: "Shahrisabz So'zanalari va Iroqi do'ppilaridagi har bir naqsh chuqur falsafiy va qadimiy tumor ramzlariga ega. Doira shaklidagi quyosh gullari (rozetkalar) hayot abadiyligi va quyosh energiyasini anglatadi; donalari to'kilgan qizil anor mevasi to'kinchilik, baraka va oilaviy totuvlik ramzidir; qalampir va bodom gullari esa yomon ko'zdan asrovchi tumor (himoya) hisoblangan. Qizil, feruza va sariq ipak iplar tabiatning yorqin ranglarini aks ettiradi."
      }
    },

    // 24. Youth Leadership & Grassroots Cultural Stewardship
    {
      id: "youth_leadership",
      phrases: [
        "yoshlar yetakchiligi", "youth leadership", "student role", "talabalar nima qildi", "qarshi davlat universiteti talabalari",
        "why youth", "yoshlar ekspeditsiyasi", "o'quvchilar loyihasi", "青年领导力", "学生参与", "青年倡议"
      ],
      keywords: ["yoshlar", "youth", "student", "talaba", "leadership", "yetakchi", "qdu", "karshi", "cohort", "jamoa", "tashabbus", "initiative", "volunteers", "volontyor", "avlod", "generation", "青年", "大学生", "领导力", "志愿"],
      response: {
        en: "This platform is 100% conceived, documented, and developed by youth. Rather than waiting for top-down institutional initiatives, high school researcher Alisher Tuychiyev united 20 undergraduate historians and students from Karshi State University. Armed with modern cameras, field surveying protocols, and machine learning tools, our youth cohort demonstrated how the next generation can actively steward UNESCO heritage through digital humanities.",
        zh: "本项目从实地调研、学术整理到代码架构100%由青年自主发起并完成。高中生研究员Alisher Tuychiyev联合了卡尔希国立大学历史与文博专业的20名青年大学生。年轻团队携带专业摄影设备、文献调研方案与机器学习工具开展全域考察，生动诠释了联合国教科文组织“青年视角”（Youth Lens）如何以数字人文激活世界遗产的保护与传承。",
        uz: "Ushbu platforma 100% yoshlar tashabbusi bilan yaratilgan va amalga oshirilgan. Qandaydir rasmiy topshiriqni kutmasdan, 11-sinf o'quvchisi Alisher Tuychiyev Qarshi davlat universitetining 20 nafar yosh talabalarini birlashtirdi. Yosh tadqiqotchilar professional fotoapparatlar, o'lchov protokollari va sun'iy intellekt texnologiyalari bilan Shahrisabzning har bir burchagini o'rganib chiqib, yoshlar YUNESKO merosini asrashda eng yetakchi kuch bo'la olishini isbotladi."
      }
    },

    // 25. Open Access CC BY-SA 4.0 Licensing & Wikimedia Commons
    {
      id: "open_access_license",
      phrases: [
        "cc by-sa", "open access", "erkin litsenziya", "rasmlar mualliflik huquqi", "can i use photos",
        "suratlarni ishlatsam bo'ladimi", "creative commons", "wikimedia commons", "mualliflik huquqi", "download photos", "开放获取", "知识共享", "版权许可", "免费下载使用"
      ],
      keywords: ["cc", "license", "litsenziya", "open", "erkin", "copyright", "use", "ishlatish", "bepul", "free", "commons", "download", "yuklab", "by-sa", "ochiq", "ruxsat", "共享", "许可", "免费", "维基共享"],
      response: {
        en: "All 500+ high-resolution photographs, expedition videos, and architectural datasets gathered by our expedition are published under the open Creative Commons Attribution-ShareAlike 4.0 International license (CC BY-SA 4.0). Anyone—including students, international researchers, journalists, and educators—can freely download, use, adapt, and republish our materials with proper attribution, permanently enriching global open knowledge on Wikimedia Commons.",
        zh: "我们考察团采集的500多张超高清文献影像、纪录视频与建筑测绘数据，全部遵循国际知识共享许可协议CC BY-SA 4.0（署名-相同方式共享）开放发布。全球任何学者、大学生、教育工作者和媒体记者均可免费无障碍下载、研究、使用和再发布我们的数字资产，永久性地为维基共享资源（Wikimedia Commons）与世界百科全书补充关键数据。",
        uz: "Ekspeditsiyamiz tomonidan to'plangan 500 dan ortiq professional fotosuratlar, video lavhalar va tadqiqot ma'lumotlari xalqaro Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0) erkin litsenziyasi ostida ochiq e'lon qilingan. Dunyoning istalgan nuqtasidagi talabalar, tadqiqotchilar, o'qituvchilar va OAV xodimlari bizning suratlarimizni bepul yuklab olishi, o'z ishlarida ishlatishi va Vikipediyada erkin ulashishi mumkin."
      }
    },

    // 26. 3D Digital Twins, LiDAR & Photogrammetry
    {
      id: "digital_twins_3d",
      phrases: [
        "digital twin", "3d model", "raqamli egizak", "photogrammetry", "lidar", "dron tasvirlari",
        "virtual reality", "metaverse", "3d scan", "uch o'lchamli", "drone survey", "数字孪生", "三维建模", "激光雷达", "虚拟现实"
      ],
      keywords: ["3d", "twin", "egizak", "scan", "skaner", "model", "drone", "dron", "lidar", "photogrammetry", "fotogrammetriya", "vr", "virtual", "metaverse", "mesh", "pointcloud", "数字孪生", "三维", "激光", "点云"],
      response: {
        en: "Phase II of our digital heritage initiative expands from 2D photography to millimeter-accurate 3D Digital Twins using aerial drone photogrammetry and terrestrial LiDAR scanning. By creating exact volumetric point-cloud models of Ak-Saray's collapsing pylon arches, we generate structural deformation heatmaps that allow international conservation engineers to monitor micro-fractures in real-time, even in immersive VR/Metaverse environments.",
        zh: "我们数字化遗产计划的第二阶段正从二维高精度摄影迈向毫米级“三维数字孪生”（3D Digital Twins）。结合无人机全景航测倾斜摄影与地面激光雷达（LiDAR），我们正在为阿克萨赖残存塔柱构建高密度点云与三维网格模型。这能够生成结构形变监测热力图，让全球修缮工程师在虚拟现实（VR）或元宇宙环境中实时监测砖砌体微观裂隙。",
        uz: "Loyiha tadqiqotlarimizning navbatdagi bosqichi — 2D suratlardan millimetr aniqligidagi 'Raqamli Egizaklar' (3D Digital Twins) va dron fotogrammetriyasiga o'tishdir. Oqsaroy pilonlari va Dorut Tilovat gumbazlarini lazerli LiDAR va dronlar orqali skanerlash orqali biz yoriqlarning kengayishi va yemirilishini 3D formatda aniqlay olamiz. Bu YUNESKO muhandislariga xavfni masofadan turib, virtual ko'zoynaklarda ham tahlil qilish imkonini beradi."
      }
    },

    // 27. The Mystery of Timur's Empty Limestone Crypt
    {
      id: "timur_crypt_mystery",
      phrases: [
        "temur daxmasi siri", "bo'sh qabr", "empty crypt", "why buried in samarkand", "nega samarqandda dafn etilgan",
        "guri amir", "gur-e-amir", "limestone crypt", "sardoba siri", "jahongir maqbarasi", "帖木儿地宫之谜", "空墓", "为什么葬在撒马尔罕"
      ],
      keywords: ["daxma", "crypt", "qabr", "bo'sh", "empty", "samarqand", "samarkand", "gur-e-amir", "guri", "amir", "otrar", "qish", "sir", "mystery", "limestone", "marmar", "sarkofag", "sarcophagus", "地宫", "陵墓", "空", "奥特拉尔"],
      response: {
        en: "Inside the Dorus Saodat complex lies an enigmatic underground crypt discovered in 1943. Constructed from monolithic limestone and covered with Quranic calligraphic reliefs, it features a massive marble sarcophagus prepared specifically for Amir Temur himself. However, when Temur died in Otrar in the harsh winter of February 1405, heavy snow blocked the mountain passes to Shakhrisabz, forcing his sudden burial in Samarkand's Gur-e-Amir, leaving this imperial crypt forever empty.",
        zh: "在多鲁斯·萨达特建筑群地下深处，隐藏着一处于1943年偶然发现的神秘地宫。暗室以坚固的石灰岩巨石筑成，通体刻满精美古兰经铭文，正中摆放着一具帖木儿生前为自己预备的巨型单体大理石石棺。然而1405年2月严冬，帖木儿东征途中猝逝于讹答剌，漫天暴雪彻底封冻了翻越吉萨尔山脉通往沙赫里萨布兹的山口，灵柩被迫就近改葬于撒马尔罕的古尔·阿米尔陵，使得这处帝王地宫永远空置至今。",
        uz: "Dorus Saodat majmuasi ostida 1943-yilda tasodifan topilgan sirli yerosti daxmasi (Temur xilxonasi) mavjud. Butunlay yaxlit marmar va ohaktoshdan o'yilgan bu daxmadagi ulkan tosh tobut Amir Temurning o'zi uchun maxsus tayyorlangan edi. Biroq 1405-yil fevral oyining qattiq qishida Amir Temur O'trorda vafot etgach, qalin qor dovonlarni yopib qo'ygan va jasadni Shahrisabzga olib kelish imkonsiz bo'lib, Sohibqiron zudlik bilan Samarqanddagi Go'ri Amirga dafn etilgan. Natijada Shahrisabzdagi bu daxma manguga bo'sh qolgan."
      }
    },

    // 28. Contact, Partnerships & Collaboration
    {
      id: "contact_collaboration",
      phrases: [
        "aloqa", "bog'lanish", "how to contact", "contact author", "hamkorlik", "collaborate",
        "join project", "loyiha bilan bog'lanish", "support project", "email", "telegram", "github", "联系我们", "如何合作", "参与项目"
      ],
      keywords: ["aloqa", "contact", "bog'lanish", "email", "pochta", "telegram", "hamkorlik", "join", "qo'shilish", "collaborate", "partnership", "support", "yordam", "github", "muallif", "联系", "合作", "加入"],
      response: {
        en: "We enthusiastically welcome international partnerships, academic collaborations, and youth volunteers! You can connect directly with project leader Alisher Tuychiyev and the research team via email at alishertuuchiyev@gmail.com, explore our open source codebase on GitHub (github.com/alisher-ds/shakhrisabz-heritage), or connect on LinkedIn and Telegram. All dataset inquiries from UNESCO experts and educators are prioritized.",
        zh: "我们热忱欢迎全球学术机构、文博专家与青年志愿者开展合作！您可以直接通过电子邮件（alishertuuchiyev@gmail.com）联系项目发起人Alisher Tuychiyev与课题团队，在GitHub（github.com/alisher-ds/shakhrisabz-heritage）查阅开源代码，或在领英与Telegram互动。我们优先响应联合国教科文组织专家与教育机构的数据协作请求。",
        uz: "Biz xalqaro hamkorlik, akademik tadqiqotchilar va ko'ngilli yoshlar bilan birgalikda ishlashdan mamnun bo'lamiz! Loyiha rahbari Alisher Tuychiyev va jamoa bilan to'g'ridan-to'g'ri alishertuuchiyev@gmail.com elektron pochtasi orqali, loyihaning GitHub ochiq kodli sahifasi (github.com/alisher-ds/shakhrisabz-heritage) yoki Telegram orqali bog'lanishingiz mumkin. YUNESKO ekspertlari va ta'lim muassasalari so'rovlariga zudlik bilan javob beriladi."
      }
    },

    // 29. Second Capital Status of the Timurid Empire
    {
      id: "second_capital_status",
      phrases: [
        "ikkinchi poytaxt", "second capital", "status of shakhrisabz", "nege poytaxt", "capital city",
        "shahrisabz maqomi", "imperial summer residence", "yozgi poytaxt", "saltanat markazi", "第二都城", "陪都地位", "夏都"
      ],
      keywords: ["poytaxt", "capital", "ikkinchi", "second", "maqom", "status", "yozgi", "summer", "saroy", "residence", "hukumat", "saltanat", "empire", "diplomacy", "marosim", "都城", "陪都", "夏都", "地位"],
      response: {
        en: "Throughout the Timurid Empire, Shakhrisabz held the official status of the empire's 'Second Capital' and ancestral spiritual cradle. While Samarkand was the bustling administrative and economic metropolis, Shakhrisabz served as the ceremonial summer residence where Temur celebrated victorious military returns, received foreign ambassadors from Castile and Ming China, and erected dynastic shrines honoring his lineage.",
        zh: "在帖木儿帝国全盛时期，沙赫里萨布兹享有帝国“第二都城”（陪都）与精神宗祠的至高官方地位。尽管撒马尔罕是繁忙的行政与经贸核心大都会，但沙赫里萨布兹作为避暑夏都与宗室祖地，是帖木儿举行凯旋大典、接见西班牙与大明王朝使节、以及营建王室陵寝的最高礼仪圣所。",
        uz: "Temuriylar saltanati davrida Shahrisabz davlatning rasman 'Ikkinchi poytaxti' va Sohibqiron xonadonining muqaddas sulolaviy markazi maqomiga ega bo'lgan. Samarqand saltanatning bosh siyosiy va savdo poytaxti bo'lsa, Shahrisabz tantanavor yozgi poytaxt vazifasini bajargan. Bu yerda Temur zafarli yurishlardan so'ng dabdabali to'ylar o'tkazgan, Xitoy (Min sulolasi) va Yevropa elchilarini qabul qilgan hamda oilaviy daxmalar qurdirgan."
      }
    },

    // 30. Oasis Climate, Weather & Mountain Breezes
    {
      id: "weather_seasons",
      phrases: [
        "ob havo", "weather in shakhrisabz", "harorat", "qishda", "yozda", "temperature",
        "climate", "iqlim", "havo qanday", "travel tips", "eng yaxshi vaqt", "best time", "天气", "气候", "气温", "最佳时间"
      ],
      keywords: ["havo", "weather", "ob-havo", "iqlim", "climate", "harorat", "temperature", "daraja", "issiq", "sovuq", "yomg'ir", "qor", "fasl", "autumn", "kuz", "bahor", "spring", "天气", "气候", "温度", "季节"],
      response: {
        en: "Shakhrisabz enjoys a classic dry continental climate with over 300 days of annual sunshine, shielded by the surrounding Hissar mountains. Summers (July–August) are hot and dry (35°C–40°C), making early mornings and evenings ideal for exploring. Winters are crisp with occasional snow on monument ruins (0°C–8°C). The golden window to visit is Spring (April–May) when almond groves bloom, and Autumn (September–October) during harvest season with crystal-clear skies.",
        zh: "沙赫里萨布兹享有典型的大陆性绿洲气候，年日照天数超过300天，受吉萨尔山脉天然屏障庇护。盛夏（7-8月）干燥炎热（35°C-40°C），清晨与傍晚是漫步古建筑的绝佳时刻；冬季清朗，偶有白雪覆瓦（0°C-8°C）。最宜人的黄金造访期是杏花初绽的春季（4-5月）与瓜果飘香、天高云淡的秋季（9-10月）。",
        uz: "Shahrisabz Hisor tog'lari etagida joylashganligi sababli, uning havosi tog' shabadasi bilan doim toza va serquyosh (yiliga 300 kundan ortiq quyoshli). Yoz oylari (iyul-avgust) ancha issiq va quruq (35°C–40°C) bo'lib, obidalarni ertalab va kechki paytlarda tomosha qilish qulay. Qish oylarida harorat 0°C dan 8°C gacha bo'ladi. Eng ajoyib vaqt — daraxtlar gullaydigan bahor (aprel-may) hamda shirin mevalar pishgan, musaffo osmonli oltin kuz (sentyabr-oktyabr) faslidir."
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
      en: "Thank you for asking! I specialize in the complete cultural heritage of Shakhrisabz. You can ask me about: 1) Ak-Saray's 70m portal & 50-yr metamorphosis, 2) The mystery of Amir Temur's empty crypt in Dorus Saodat, 3) Clavijo's 1404 embassy, 4) 2026 IYF China Youth Forum & UNESCO #885, 5) 3D LiDAR digital twins & conservation ethics, 6) Ancient Sogdian Kesh & Alexander the Great, 7) Suzani motif symbolism & local Tandir Kebab, or 8) How to collaborate with our youth research expedition.",
      zh: "感谢您的提问！我精通沙赫里萨布兹与帖木儿帝国的全方位文化遗产。您可以向我咨询：1）阿克萨赖宫70米天门与50年沧桑对比；2）多鲁斯·萨达特与帖木儿空置地宫之谜；3）1404年西班牙克拉维约使团实录；4）2026国际青年论坛（中国）与联合国教科文组织885号遗产；5）三维激光雷达数字孪生与原真性保护；6）粟特渴石古城与亚历山大大帝；7）苏扎尼刺绣寓意与卡什卡达里亚地坑烤肉；或 8）青年科研团队与开放数据合作。",
      uz: "Savolingiz uchun tashakkur! Men Shahrisabz va Temuriylar davri merosi bo'yicha to'liq ma'lumotga egaman. Menga quyidagi mavzularda savol berishingiz mumkin: 1) Oqsaroyning 70 metrli peshtoqi va 50 yillik qiyofasi, 2) Dorus Saodatdagi Temur xilxonasi va bo'sh tobut siri, 3) 1404-yilgi Klavixo elchiligi xotiralari, 4) 2026 Xitoy Xalqaro Yoshlar Forumi (IYF) va YUNESKO #885 merosi, 5) 3D LiDAR raqamli egizaklar va restavratsiya etikasi, 6) Qadimiy Kesh (So'g'diyona) va Aleksandr Makedonskiy, 7) So'zana naqshlari siri va Tandir go'shti, yoki 8) Yoshlar tadqiqot jamoamiz bilan hamkorlik."
    };
    return defaults[lang] || defaults.en;
  }

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.classList.add('docent-drawer-open');
    document.body.style.overflow = 'hidden';
    if (floatingBtn) {
      floatingBtn.classList.add('btn-hidden');
      floatingBtn.style.setProperty('display', 'none', 'important');
    }
    setTimeout(() => {
      if (drawerInput) drawerInput.focus();
    }, 200);
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.classList.remove('docent-drawer-open');
    document.body.style.overflow = '';
    if (floatingBtn) {
      floatingBtn.classList.remove('btn-hidden');
      floatingBtn.style.removeProperty('display');
      applyRightPosition();
    }
  }

  if (floatingBtn) floatingBtn.addEventListener('click', openDrawer);
  if (openSpotlightBtn) openSpotlightBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  const thinkingPhrases = {
    uz: {
      quick: "AI o'ylamoqda...",
      medium: "Tarixiy arxiv manbalari tahlil qilinmoqda...",
      complex: "Chuqur arxiv tadqiqotlari va Temuriylar davri xronikasi o'rganilmoqda..."
    },
    en: {
      quick: "AI is thinking...",
      medium: "Analyzing historical archive and curatorial records...",
      complex: "Synthesizing deep archival surveys and Timurid chronicles..."
    },
    zh: {
      quick: "AI 正在思考中...",
      medium: "正在检索历史文献与考察档案...",
      complex: "正在深度综合学术文献与实地考察报告..."
    }
  };

  function getThinkingDetails(query) {
    const lang = (currentLang && thinkingPhrases[currentLang]) ? currentLang : 'en';
    const dict = thinkingPhrases[lang];
    const len = query.trim().length;

    let label = dict.quick;
    let duration = 1200 + Math.floor(Math.random() * 400); // 1.2s - 1.6s

    if (len >= 25 && len < 60) {
      label = dict.medium;
      duration = 1800 + Math.floor(Math.random() * 600); // 1.8s - 2.4s
    } else if (len >= 60) {
      label = dict.complex;
      duration = 2500 + Math.min(len * 12, 1100) + Math.floor(Math.random() * 400); // 2.5s - 3.9s
    }

    return { label, duration };
  }

  function appendMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `drawer-bubble ${sender}`;
    bubble.textContent = text;
    drawerChatStream.appendChild(bubble);
    drawerChatStream.scrollTop = drawerChatStream.scrollHeight;
    return bubble;
  }

  function showThinkingIndicator(label) {
    const bubble = document.createElement('div');
    bubble.className = 'drawer-bubble bot thinking-bubble';
    bubble.id = 'aiThinkingBubble';

    const wrapper = document.createElement('div');
    wrapper.className = 'thinking-wrapper';

    const dots = document.createElement('div');
    dots.className = 'thinking-dots';
    dots.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      dot.className = 'thinking-dot';
      dots.appendChild(dot);
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'thinking-label';
    labelSpan.textContent = label;

    wrapper.appendChild(dots);
    wrapper.appendChild(labelSpan);
    bubble.appendChild(wrapper);

    drawerChatStream.appendChild(bubble);
    drawerChatStream.scrollTop = drawerChatStream.scrollHeight;
    return bubble;
  }

  function typewriterBotResponse(text, onComplete) {
    const bubble = document.createElement('div');
    bubble.className = 'drawer-bubble bot';
    drawerChatStream.appendChild(bubble);

    // Fast, authentic word-by-word streaming
    const words = text.split(' ');
    let wordIndex = 0;
    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        bubble.textContent = words.slice(0, wordIndex + 1).join(' ');
        drawerChatStream.scrollTop = drawerChatStream.scrollHeight;
        wordIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 28);
  }

  let isAiResponding = false;

  function handleSend(customText) {
    if (isAiResponding) return;

    const query = (customText || (drawerInput ? drawerInput.value : '')).trim();
    if (!query) return;

    appendMessage('user', query);
    if (drawerInput && !customText) drawerInput.value = '';

    isAiResponding = true;
    if (drawerSendBtn) drawerSendBtn.disabled = true;
    if (drawerInput) drawerInput.disabled = true;

    const { label, duration } = getThinkingDetails(query);
    const thinkingBubble = showThinkingIndicator(label);

    setTimeout(() => {
      if (thinkingBubble && thinkingBubble.parentNode) {
        thinkingBubble.parentNode.removeChild(thinkingBubble);
      }

      const response = getAiResponse(query);
      typewriterBotResponse(response, () => {
        isAiResponding = false;
        if (drawerSendBtn) drawerSendBtn.disabled = false;
        if (drawerInput) {
          drawerInput.disabled = false;
          drawerInput.focus();
        }
      });
    }, duration);
  }

  if (drawerSendBtn && drawerInput) {
    drawerSendBtn.addEventListener('click', () => handleSend());
    drawerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // Bind mini chips inside drawer
  miniChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (isAiResponding) return;
      const text = chip.textContent.trim();
      handleSend(text);
    });
  });

  // Bind sample prompt pills in section 04 spotlight card
  samplePills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (isAiResponding) return;
      const query = pill.getAttribute('data-query') || pill.textContent.trim();
      openDrawer();
      setTimeout(() => {
        handleSend(query);
      }, 350);
    });
  });
}
