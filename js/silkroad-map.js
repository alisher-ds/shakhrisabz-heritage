/* ========================================================
   SILK ROAD GEOCULTURAL CORRIDOR (LEAFLET GEOSPATIAL MAP)
   Real Eurasian Cartography with Historical Silk Road Waypoints
   ======================================================== */
import { currentLang } from './i18n.js';

export function initSilkRoadMap() {
  const mapElement = document.getElementById('silkroadMap');
  const detailsCard = document.getElementById('mapDetails');
  const cityTitleEl = document.getElementById('mapCityTitle');
  const cityTagEl = document.getElementById('mapCityCountry');
  const cityDescEl = document.getElementById('mapCityDesc');
  const resetBtn = document.getElementById('mapResetBtn');
  const cityPillBtns = document.querySelectorAll('.city-pill-btn');

  if (!mapElement) return;

  // City Data with Real Geographic Coordinates
  const cities = {
    shakhrisabz: {
      coords: [39.05, 66.83],
      country: { en: "Uzbekistan · UNESCO #885", zh: "乌兹别克斯坦 · 教科文组织第885号", uz: "O'zbekiston · YUNESKO #885" },
      title: { en: "Shakhrisabz (Kesh)", zh: "沙赫里萨布兹（古称渴石）", uz: "Shahrisabz (Qadimiy Kesh)" },
      desc: {
        en: "Birthplace of Amir Temur and monumental cradle of the Timurid Renaissance. Anchored by the colossal Ak-Saray Palace and Dorut-Tilovat, historically famed for exporting Central Asian cobalt blue minerals and lapis lazuli eastward to China.",
        zh: "帖木儿大帝诞生地，帖木儿文艺复兴建筑策源地。拥有巍峨阿克萨赖宫与多鲁特提洛瓦特圣地，历史上向东向中国输出优质钴蓝颜料与青金石。",
        uz: "Amir Temur tavallud topgan zamin va Temuriylar me'morchiligi beshigi. Ulkan Oqsaroy va Dorut Tilovat majmuasi bilan mashhur bo'lib, tarixdan Xitoyga zangori kobalt bo'yog'i va lojuvard eksport qilingan asosiy savdo maskani."
      },
      color: "gold"
    },
    samarkand: {
      coords: [39.65, 66.96],
      country: { en: "Uzbekistan · UNESCO #603", zh: "乌兹别克斯坦 · 丝路十字路口", uz: "O'zbekiston · YUNESKO #603" },
      title: { en: "Samarkand", zh: "撒马尔罕", uz: "Samarqand" },
      desc: {
        en: "Imperial capital of the Timurid Empire and the legendary crossroads of Silk Road caravans. Renowned for Registan square, Bibi-Khanym Mosque, and Sogdian merchant guilds connecting Mediterranean trade with Chang'an.",
        zh: "帖木儿帝国的帝国都城，丝绸之路上举世闻名的十字路口。以雷吉斯坦广场与比比哈努姆清真寺闻名，是联通地中海与长安的粟特商人贸易网络中枢。",
        uz: "Temuriylar saltanatining buyuk poytaxti va karvon yo'llarining markazi. Registon maydoni, Bibixonim masjidi va Xitoy bilan savdo qilgan qadimiy sug'd savdogarlarining tayanch shahri."
      },
      color: "lapis"
    },
    dunhuang: {
      coords: [40.14, 94.66],
      country: { en: "China · UNESCO #440", zh: "中国甘肃 · 莫高窟敦煌", uz: "Xitoy · Dunxuan (Mogao g'orlari)" },
      title: { en: "Dunhuang (Mogao Grottoes)", zh: "敦煌（莫高窟）", uz: "Dunxuan (Mogao g'orlari)" },
      desc: {
        en: "The historic oasis throat where the northern and southern Silk Roads converged. Home to the world-renowned Mogao Grottoes preserving millennia of Buddhist art, Sogdian merchant contracts, and multicultural Silk Road manuscripts.",
        zh: "丝绸之路南北两道在此交汇的绿洲重镇。世界文化遗产莫高窟所在地，珍藏着千百年来的佛教壁画、粟特古信札及多民族文明互鉴的珍贵经卷。",
        uz: "Ipak yo'lining shimoliy va janubiy tarmoqlari tutashgan qadimiy voha. Dunyoga mashhur Mogao g'orlari, buddaviylik san'ati va Buyuk Ipak yo'lining ko'p madaniyatli yozma yodgorliklari markazi."
      },
      color: "lapis"
    },
    xian: {
      coords: [34.34, 108.94],
      country: { en: "China · UNESCO #666", zh: "中国陕西 · 汉唐丝路起点", uz: "Xitoy · Sian (Qadimiy Chang'an)" },
      title: { en: "Xi'an (Ancient Chang'an)", zh: "西安（汉唐古都长安）", uz: "Sian (Qadimiy Chang'an)" },
      desc: {
        en: "Ancient Chang'an, the eastern departure terminal of the Silk Road. For centuries, Sogdian caravans from Central Asian oases like Kesh arrived here carrying jade, glass, and cobalt, trading for imperial silk rolls and tea.",
        zh: "古都长安，古代丝绸之路的东方起点。数百年来，来自中亚渴石等绿洲的粟特驼队历经万里抵达此处，以玉石、琉璃和钴蓝颜料交换丝绸绢匹与茶叶。",
        uz: "Qadimiy Chang'an — Buyuk Ipak yo'lining Sharqdagi boshlanish nuqtasi. Asrlar davomida Markaziy Osiyo karvonlari bu yerga kobalt, qimmatbaho toshlar olib borgan va Xitoy ipagi hamda choyi bilan savdo qilgan."
      },
      color: "lapis"
    },
    nanjing: {
      coords: [32.06, 118.79],
      country: { en: "China · 2026 IYF Host City", zh: "中国江苏 · 联合国教科文组织文学之都", uz: "Xitoy · 2026 IYF Mezbon Shahri" },
      title: { en: "Nanjing (2026 IYF)", zh: "南京（2026国际青年论坛）", uz: "Nankin (2026 IYF Mezboni)" },
      desc: {
        en: "UNESCO City of Literature and historic imperial capital of China. The 2026 International Youth Forum will convene here to foster youth-led creative expression of global heritage in the age of artificial intelligence.",
        zh: "联合国教科文组织“文学之都”，中国历史文化名城。2026年国际青年论坛（IYF）在此汇聚全球青年领袖，探讨人工智能时代青年如何创新守护与表达世界遗产。",
        uz: "YUNESKOning 'Adabiyot shahri' va Xitoyning qadimiy poytaxtlaridan biri. 2026-yilgi Xalqaro Yoshlar Forumi (IYF) mezbon shahri bo'lib, bu yerda sun'iy intellekt davrida yoshlarning madaniy merosni asrashdagi roli muhokama qilinadi."
      },
      color: "gold"
    },
    changsha: {
      coords: [28.23, 112.93],
      country: { en: "China · 2026 IYF Host City", zh: "中国湖南 · 联合国教科文组织媒体艺术之都", uz: "Xitoy · 2026 IYF Mezbon Shahri" },
      title: { en: "Changsha (2026 IYF)", zh: "长沙（2026国际青年论坛）", uz: "Changsha (2026 IYF Mezboni)" },
      desc: {
        en: "UNESCO City of Media Arts and home to the ancient Tongguan Kilns, which historically glazed iconic blue-and-white ceramics exported across the Maritime Silk Road using Central Asian cobalt mineral pigments.",
        zh: "联合国教科文组织“媒体艺术之都”，著名的长沙铜官窑所在地。历史上该窑口巧妙利用中亚输入的钴蓝矿料烧制极具丝路外销特色的早期青花与彩绘瓷器。",
        uz: "YUNESKOning 'Media san'ati shahri'. Tarixda Markaziy Osiyodan keltirilgan kobalt bo'yog'idan foydalanib mashhur moviy koshin va chinni buyumlar ishlab chiqargan qadimiy Tongguan markazi."
      },
      color: "gold"
    }
  };

  // Check if Leaflet is loaded
  if (typeof L === 'undefined') {
    console.warn('Leaflet library is loading or unavailable.');
    return;
  }

  // Initialize Map: Centered between Central Asia and East Asia
  const map = L.map('silkroadMap', {
    center: [36.0, 92.0],
    zoom: 4,
    minZoom: 3,
    maxZoom: 9,
    scrollWheelZoom: false, // Prevents accidental scroll interception
    zoomControl: true,
    attributionControl: false // Completely removes third-party attribution badges/links
  });

  // Esri World Dark Gray Base & Reference (No API key, no watermark, authentic cartography)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 16
  }).addTo(map);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 16,
    opacity: 0.85
  }).addTo(map);

  // Silk Road Trade Route Coordinates (Historical caravan path through oasis gates)
  const routeWaypoints = [
    [39.05, 66.83], // Shakhrisabz
    [39.65, 66.96], // Samarkand
    [40.53, 72.80], // Osh / Fergana
    [39.47, 75.99], // Kashgar
    [41.17, 80.26], // Aksu
    [41.72, 82.96], // Kucha
    [42.95, 89.19], // Turpan
    [40.14, 94.66], // Dunhuang
    [39.81, 98.29], // Jiayuguan Pass
    [36.06, 103.83], // Lanzhou (Yellow River Crossing)
    [34.34, 108.94], // Xi'an
    [32.06, 118.79], // Nanjing
    [28.23, 112.93]  // Changsha
  ];

  // Draw Glowing Polyline Caravan Route
  const routeLine = L.polyline(routeWaypoints, {
    color: '#0ea5e9',
    weight: 3.5,
    opacity: 0.85,
    dashArray: '8, 6',
    lineCap: 'round'
  }).addTo(map);

  // Markers Dictionary
  const markers = {};

  function createCustomIcon(isGold) {
    const colorClass = isGold ? 'gold' : 'lapis';
    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="custom-map-marker ${colorClass}">
          <div class="marker-pulse-ring"></div>
          <div class="marker-pin"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  }

  function getPopupHtml(key, lang) {
    const c = cities[key];
    if (!c) return '';
    const l = lang || currentLang || 'en';
    return `
      <div class="map-popup-title">${c.title[l] || c.title.en}</div>
      <div class="map-popup-tag">${c.country[l] || c.country.en}</div>
      <div class="map-popup-desc">${c.desc[l] || c.desc.en}</div>
    `;
  }

  function updateDetailsCard(cityKey) {
    const data = cities[cityKey];
    if (!data) return;
    const lang = currentLang || 'en';

    if (cityTitleEl) cityTitleEl.textContent = data.title[lang] || data.title.en;
    if (cityTagEl) cityTagEl.textContent = data.country[lang] || data.country.en;
    if (cityDescEl) cityDescEl.textContent = data.desc[lang] || data.desc.en;

    cityPillBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-city') === cityKey);
    });
  }

  // Add Markers for Cities
  Object.keys(cities).forEach(key => {
    const c = cities[key];
    const isGold = c.color === 'gold';
    const marker = L.marker(c.coords, { icon: createCustomIcon(isGold) }).addTo(map);

    const lang = currentLang || 'en';
    marker.bindPopup(getPopupHtml(key, lang), { maxWidth: 280 });

    marker.on('click', () => {
      const curLang = currentLang || 'en';
      marker.setPopupContent(getPopupHtml(key, curLang));
      updateDetailsCard(key);
      map.flyTo(c.coords, 5, { duration: 1.2 });
    });

    markers[key] = marker;
  });

  // Bind City Pill Buttons
  cityPillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cityKey = btn.getAttribute('data-city');
      const c = cities[cityKey];
      if (c) {
        const curLang = currentLang || 'en';
        updateDetailsCard(cityKey);
        map.flyTo(c.coords, 6, { duration: 1.5 });
        if (markers[cityKey]) {
          markers[cityKey].setPopupContent(getPopupHtml(cityKey, curLang));
          markers[cityKey].openPopup();
        }
      }
    });
  });

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      map.flyTo([36.0, 92.0], 4, { duration: 1.2 });
      updateDetailsCard('shakhrisabz');
    });
  }

  // Update text when language changes
  window.addEventListener('languageChanged', (e) => {
    const newLang = e.detail?.lang || currentLang || 'en';
    const activeBtn = document.querySelector('.city-pill-btn.active');
    const activeKey = activeBtn ? activeBtn.getAttribute('data-city') : 'shakhrisabz';
    updateDetailsCard(activeKey);

    // Refresh popup content for all markers dynamically
    Object.keys(markers).forEach(key => {
      markers[key].setPopupContent(getPopupHtml(key, newLang));
    });
  });

  // Initial selection
  updateDetailsCard('shakhrisabz');
}
