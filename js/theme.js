/* ========================================================
   THEME ENGINE (Light & Dark Mode)
   ======================================================== */
export function initTheme() {
  const darkBtn = document.getElementById('themeDarkBtn');
  const lightBtn = document.getElementById('themeLightBtn');

  function setTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem('shakhrisabz_theme', mode);
    } catch (e) {}
    updateThemeButtons(mode);
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: mode } }));
  }

  function updateThemeButtons(mode) {
    if (darkBtn) darkBtn.classList.toggle('active', mode === 'dark');
    if (lightBtn) lightBtn.classList.toggle('active', mode === 'light');
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeButtons(currentTheme);

  if (darkBtn) darkBtn.addEventListener('click', () => setTheme('dark'));
  if (lightBtn) lightBtn.addEventListener('click', () => setTheme('light'));

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem('shakhrisabz_theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch (err) {}
    });
  }
}
