/* ========================================================
   SILK ROAD GEOCULTURAL CORRIDOR (Interactive Map)
   ======================================================== */
import { currentLang } from './i18n.js';

export function initSilkRoadMap() {
  const citiesData = {
    shakhrisabz: {
      name: { en: "Shakhrisabz", zh: "沙赫里萨布兹", uz: "Shahrisabz" },
      role: { en: "Timurid Architectural Cradle", zh: "帖木儿建筑摇篮", uz: "Temuriylar Me'morchilik Beshigi" },
      desc: {
        en: "Birthplace of Amir Temur (UNESCO #885). Source of legendary craftsmen who transported Central Asian cobalt blue glazing and girih geometry across Eurasia.",
        zh: "帖木儿大帝的诞生地（联合国教科文组织 #885）。将中亚钴蓝釉彩和伊斯兰几何学传播到整个欧亚大陆的传奇工匠之源。",
        uz: "Amir Temurning tug'ilgan shahri (YUNESKO #885). Markaziy Osiyo kobalt moviy koshinchiligi va geometrik naqshlarini butun Yevroosiyoga yoygan buyuk me'morlar vatani."
      }
    },
    samarkand: {
      name: { en: "Samarkand", zh: "撒马尔罕", uz: "Samarqand" },
      role: { en: "Imperial Capital & Crossroads", zh: "帝国首都与丝路十字路口", uz: "Poytaxt va Buyuk Chorraha" },
      desc: {
        en: "The grand crossroad of cultures (UNESCO #603). Central trade hub receiving Chinese silk, raw jade, and paper while exporting Central Asian lapis lazuli and horses.",
        zh: "文明的十字路口（联合国教科文组织 #603）。汇聚中国丝绸、玉石和纸张，同时出口中亚青金石和汗血宝马的核心枢纽。",
        uz: "Madaniyatlar chorrahasi (YUNESKO #603). Xitoy ipaklari, nefrit va qog'ozini qabul qilib, o'rniga lojuvard toshlari va tulporlarini yetkazib bergan buyuk markaz."
      }
    },
    dunhuang: {
      name: { en: "Dunhuang", zh: "敦煌", uz: "Dunxuan" },
      role: { en: "Gateway of the Oasis Trail", zh: "丝路绿洲门户与莫高窟", uz: "Ipak Yo'li Voha Darvozasi" },
      desc: {
        en: "Home of the Mogao Caves (UNESCO #440). Historical junction where Central Asian Sogdian merchants traded and translated cultural manuscripts with China.",
        zh: "莫高窟所在地（联合国教科文组织 #440）。中亚粟特商人与中国商人进行文化手稿翻译和商贸往来的历史要冲。",
        uz: "Mogao g'orlari maskani (YUNESKO #440). Sug'd savdogarlari va xitoylik elchilar uchrashib, qadimiy qo'lyozmalarni almashgan tarixiy voha."
      }
    },
    xian: {
      name: { en: "Xi'an (Chang'an)", zh: "西安（长安）", uz: "Si'an (Chan'an)" },
      role: { en: "Eastern Silk Road Terminus", zh: "陆上丝绸之路东起点", uz: "Ipak Yo'lining Sharqiy Boshlanishi" },
      desc: {
        en: "Ancient imperial capital of China. Center of cultural synthesis where Central Asian music, polo, and glassware flourished during the Tang Dynasty.",
        zh: "中国古都。唐代中亚胡乐、马球和玻璃器皿在此大放异彩的文化交融中心。",
        uz: "Xitoyning qadimiy poytaxti. Tang sulolasi davrida Markaziy Osiyo musiqasi, kiyimlari va shisha san'ati gullab-yashnagan madaniy markaz."
      }
    },
    nanjing: {
      name: { en: "Nanjing", zh: "南京", uz: "Nanjing" },
      role: { en: "UNESCO City of Literature & 2026 IYF Host", zh: "文学之都·2026青年论坛主办地", uz: "Adabiyot Shahri & IYF 2026 Mezboni" },
      desc: {
        en: "UNESCO City of Literature and maritime Silk Road hub. Host city of the 2026 International Youth Forum exploring historical dialogue with Central Asia.",
        zh: "联合国教科文组织“文学之都”，海上丝绸之路重要节点。2026年国际青年论坛主办城市，推动与中亚的历史文明对话。",
        uz: "YUNESKO 'Adabiyot shahri' va 2026-yilgi Xalqaro Yoshlar Forumi mezbon shahri. Markaziy Osiyo bilan tarixiy madaniy aloqalarni o'rganish markazi."
      }
    },
    changsha: {
      name: { en: "Changsha", zh: "长沙", uz: "Changsha" },
      role: { en: "UNESCO City of Media Arts & 2026 IYF Host", zh: "媒体艺术之都·2026青年论坛主办地", uz: "Media San'ati Shahri & IYF 2026 Mezboni" },
      desc: {
        en: "UNESCO Creative City of Media Arts. Ancient home of Tongguan porcelain kilns that historically exported cobalt-glazed ceramics along maritime Silk Road corridors.",
        zh: "联合国教科文组织“媒体艺术之都”。历史上通过海上丝绸之路出口釉下彩瓷的铜官窑故乡，2026年国际青年论坛闭幕地。",
        uz: "YUNESKO 'Media san'ati shahri'. Qadimiy Tongguan sopolchilik markazi, Ipak yo'li bo'ylab sirlangan koshinlar eksport qilgan shahar va IYF 2026 mezbon markazi."
      }
    }
  };

  const titleEl = document.getElementById('mapCityTitle');
  const roleEl = document.getElementById('mapCityRole');
  const descEl = document.getElementById('mapCityDesc');

  function updateCityCard(key) {
    const city = citiesData[key];
    if (!city) return;

    const lang = currentLang || 'en';
    if (titleEl) titleEl.textContent = city.name[lang] || city.name.en;
    if (roleEl) roleEl.textContent = city.role[lang] || city.role.en;
    if (descEl) descEl.textContent = city.desc[lang] || city.desc.en;
  }

  // Bind city node buttons
  document.querySelectorAll('.silkroad-city-node').forEach((node) => {
    node.addEventListener('click', () => {
      const cityKey = node.getAttribute('data-city');
      updateCityCard(cityKey);
      document.querySelectorAll('.silkroad-city-node').forEach(n => n.classList.remove('active'));
      node.classList.add('active');
    });
  });

  // Listen to language change to update currently selected city
  window.addEventListener('languageChanged', () => {
    const activeNode = document.querySelector('.silkroad-city-node.active') || document.querySelector('.silkroad-city-node');
    if (activeNode) {
      updateCityCard(activeNode.getAttribute('data-city'));
    }
  });

  // Initial load
  updateCityCard('shakhrisabz');
}
