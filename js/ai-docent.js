/* ========================================================
   SILK ROAD AI DOCENT (Interactive Knowledge Assistant)
   ======================================================== */
import { currentLang } from './i18n.js';

export function initAiDocent() {
  const chatHistory = document.getElementById('chatHistory');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');

  if (!chatHistory || !chatInput || !chatSendBtn) return;

  const knowledgeBase = [
    {
      keywords: ["unesco", "heritage", "885", "status", "danger", "meros", "юнеско", "世界遗产"],
      response: {
        en: "The Historic Centre of Shakhrisabz was inscribed as UNESCO World Heritage Site #885 in 2000. It contains extraordinary monuments from the Timurid era (14th-15th centuries). Because of modernization pressures, it is monitored closely by UNESCO, making our digital archiving and AI documentation expedition essential for global preservation.",
        zh: "沙赫里萨布兹历史中心于2000年被列入联合国教科文组织世界遗产名录（#885），拥有14-15世纪帖木儿时期的杰出建筑群。鉴于城市化进程带来的保护压力，我们的数字化档案和AI记录考察对全球性遗产守护具有至关重要的意义。",
        uz: "Shahrisabzning tarixiy markazi 2000-yilda YUNESKO Butunjahon merosi ro'yxatiga (#885) kiritilgan. Bu yerda 14-15-asrlarga oid noyob Temuriylar davri obidalari joylashgan. Merosni asrab qolish uchun yoshlarimiz amalga oshirgan raqamli arxivlash va AI hujjatlashtirish ekspeditsiyasi dolzarb ahamiyatga ega."
      }
    },
    {
      keywords: ["aksaray", "oqsaroy", "palace", "1404", "clavijo", "arch", "qasr", "height", "白宫", "阿克萨赖", "1975", "2025", "50"],
      response: {
        en: "Ak-Saray Palace was commissioned by Amir Temur in 1380. Spanish envoy Ruy González de Clavijo recorded in 1404 that its monumental gateway soared over 70 meters high with a 22.5m arch span. Today, only the 38-meter twin pylons remain. Our 50-Year Transformation module compares 1975 archival surveys with our 2025 expedition, analyzing brick consolidation and UNESCO conservation ethics.",
        zh: "阿克萨赖宫始建于1380年。西班牙使节克拉维约于1404年记载其巍峨的拱门高逾70米，跨度达22.5米。如今仅存38米高的双塔遗址。我们的50年变迁对比模块将1975年历史档案与2025年考察进行了科学对照，深入解析了砖砌加固工程与遗产保护伦理。",
        uz: "Oqsaroy qurilishi 1380-yilda Amir Temur tomonidan boshlangan. 1404-yilda Ispan elchisi Klavixo uning peshtoqi 70 metrdan baland, ravog'i 22.5 metr ekanligini yozgan. Bugungi kunda uning 38 metrli ikki ustuni saqlangan bo'lib, bizning 50 yillik qiyosiy tahlilimiz 1975 va 2025-yillardagi o'zgarishlar hamda restavratsiya jarayonlarini ko'rsatib beradi."
      }
    },
    {
      keywords: ["grant", "wikimedia", "expedition", "karshi", "alisher", "photos", "commons", "loyihasi", "jamg'arma", "维基"],
      response: {
        en: "This expedition was funded by a $2,000 USD grant from the Wikimedia Foundation. Co-organized and guided by Alisher Tuychiev with 20 youth stewards trained at Karshi State University, the expedition field-surveyed Shakhrisabz and uploaded over 500 high-resolution assets to Wikimedia Commons under CC BY-SA 4.0 open licenses.",
        zh: "本次考察由维基媒体基金会提供的2000美元国际资助支持。由当地青年遗产向导Alisher Tuychiev与来自卡尔希国立大学的20名青年团队共同实地勘测，向维基共享资源上传了500多张高分辨率文化档案，全部采用CC BY-SA 4.0开放许可协议。",
        uz: "Mazkur ekspeditsiya Vikimedia Jamg'armasining 2,000 dollarlik xalqaro granti asosida amalga oshirildi. Alisher Tuychiyev va Qarshi davlat universitetining 20 nafar yoshlar jamoasi Shahrisabzni dala tadqiqotidan o'tkazib, 500 dan ortiq fotosuratlarni Wikimedia Commons'ga ochiq litsenziya bilan joylashtirdi."
      }
    },
    {
      keywords: ["china", "changsha", "nanjing", "silk road", "road", "kiln", "trade", "xitoy", "ipak", "中国", "丝绸之路"],
      response: {
        en: "Shakhrisabz and China share deep Silk Road heritage. Central Asian cobalt blue was historically exported to China to create iconic blue-and-white porcelain in centers like Changsha's Tongguan Kilns, while Chinese silk and paper arrived in Sogdian markets. The 2026 International Youth Forum in Nanjing and Changsha marks the modern continuation of this dialogue.",
        zh: "沙赫里萨布兹与中国拥有悠久的丝路渊源。历史上中亚的钴蓝颜料输入中国，为长沙铜官窑等瓷都创制经典青花瓷提供了原材料，而中国的丝绸与造纸术传入粟特绿洲。2026年在南京和长沙举办的国际青年论坛正是这一文明交流的现代延续。",
        uz: "Shahrisabz va Xitoy o'rtasida Buyuk Ipak yo'lining qadimiy aloqalari mavjud. Markaziy Osiyo kobalt moviy bo'yog'i Xitoyga keltirilib, mashhur Changsha koshinlarida ishlatilgan, Xitoydan esa ipak va qog'oz yurtimizga kelgan. Nanjing va Changshadagi 2026 IYF forumi mana shu 2000 yillik do'stlikning davomidir."
      }
    },
    {
      keywords: ["ai", "restoration", "vision", "model", "future", "sun'iy", "intellekt", "人工智能"],
      response: {
        en: "Our project integrates AI on two levels: 1) Historical Generative Reconstruction of lost monuments based on Timurid geometric ratios, and 2) Computer Vision epigraphy recognition to decipher Arabic and Persian stone inscriptions for global trilingual access.",
        zh: "我们的项目在两个层面整合AI应用：1）基于帖木儿几何黄金比例的遗址生成式数字复原；2）计算机视觉与碑文解析，自动识读古代阿拉伯语与波斯语石刻，并提供三语国际化展示。",
        uz: "Loyiha sun'iy intellektni 2 yo'nalishda qo'llaydi: 1) Yo'qolgan obidalarni Temuriylar geometrik nisbatlari asosida AI orqali fotorealistik tiklash; 2) Qadimiy tosh va devoriy bitiklarni Computer Vision orqali o'qib, o'zbek, ingliz va xitoy tillariga avtomatik tarjima qilish."
      }
    }
  ];

  function getAiResponse(userText) {
    const textLower = userText.toLowerCase();
    const lang = currentLang || 'en';

    for (const item of knowledgeBase) {
      if (item.keywords.some(k => textLower.includes(k))) {
        return item.response[lang] || item.response.en;
      }
    }

    // Default response
    const defaults = {
      en: "Thank you for exploring the Shakhrisabz Cultural Heritage Archive. Feel free to ask about our Wikimedia expedition, Ak-Saray's 50-year transformation (1975 vs 2025), UNESCO World Heritage #885, or the Silk Road connection to Changsha & Nanjing!",
      zh: "感谢您探索沙赫里萨布兹文化遗产档案。欢迎向我询问关于维基考察、阿克萨赖宫50年变迁对比（1975与2025）、联合国教科文组织第885号遗产，或是连接长沙与南京的丝路历史纽带！",
      uz: "Shahrisabz madaniy merosi arxiviga xush kelibsiz! Menga Vikimedia ekspeditsiyamiz, Oqsaroyning 50 yillik o'zgarishi (1975 vs 2025), YUNESKO #885 merosi yoki Changsha va Nanjingga bog'langan Ipak yo'li haqida savol berishingiz mumkin!"
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
    }, 350);
  }

  chatSendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Handle Quick Chips
  document.querySelectorAll('.chip-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();
      chatInput.value = text;
      handleSend();
    });
  });
}
