/* ========================================================
   TRILINGUAL LOCALIZATION ENGINE (EN, ZH, UZ)
   ======================================================== */
export let currentLang = 'en';

export function initI18n() {
  const langEnBtn = document.getElementById('langEnBtn');
  const langZhBtn = document.getElementById('langZhBtn');
  const langUzBtn = document.getElementById('langUzBtn');

  function setLang(lang) {
    if (!['en', 'zh', 'uz'].includes(lang)) lang = 'en';
    currentLang = lang;
    document.documentElement.lang = lang;

    try {
      localStorage.setItem('shakhrisabz_lang', lang);
    } catch (e) {}

    // Update active button state
    if (langEnBtn) langEnBtn.classList.toggle('active', lang === 'en');
    if (langZhBtn) langZhBtn.classList.toggle('active', lang === 'zh');
    if (langUzBtn) langUzBtn.classList.toggle('active', lang === 'uz');

    // Update all static DOM elements with data-[lang] attributes
    document.querySelectorAll('[data-en]').forEach((el) => {
      const val = el.getAttribute('data-' + lang);
      if (val !== null && val !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Update image alt tags
    document.querySelectorAll('[data-alt-en]').forEach((img) => {
      const altVal = img.getAttribute('data-alt-' + lang);
      if (altVal) img.alt = altVal;
    });

    // Dispatch event for dynamic components to update
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  // Bind buttons
  if (langEnBtn) langEnBtn.addEventListener('click', () => setLang('en'));
  if (langZhBtn) langZhBtn.addEventListener('click', () => setLang('zh'));
  if (langUzBtn) langUzBtn.addEventListener('click', () => setLang('uz'));

  // Initialize from storage or default
  const savedLang = localStorage.getItem('shakhrisabz_lang') || 'en';
  setLang(savedLang);

  return { setLang, getCurrentLang: () => currentLang };
}
