/* ========================================================
   MAIN APPLICATION CONTROLLER — MUSEUM EDITORIAL EDITION
   ======================================================== */
import { initTheme } from './theme.js';
import { initI18n } from './i18n.js';
import { initTransformationSlider } from './transformation.js';
import { initGallery } from './gallery.js';
import { initSilkRoadMap } from './silkroad-map.js';
import { initAiDocent } from './ai-docent.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Core Engines
  initTheme();
  initI18n();

  // 2. Initialize Scroll Progress Bar
  initScrollProgressBar();

  // 3. Initialize Hero Slideshow & Transformation Comparison
  initHeroSlider();
  initTransformationSlider();

  // 4. Initialize Silk Road & AI Modules
  initSilkRoadMap();
  initAiDocent();

  // 5. Initialize Video Kiosk Chapters & Gallery
  initVideoChapters();
  initGallery();

  // 6. Initialize Mobile Navigation Drawer
  initMobileMenu();
});

/* Mobile Navigation Drawer Controller */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const closeBtn = document.getElementById('mobileNavCloseBtn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileLangBtns = document.querySelectorAll('.mobile-lang-btn');
  const mobileThemeBtns = document.querySelectorAll('.mobile-theme-btn');

  if (!menuBtn || !drawer) return;

  function openMenu() {
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    if (drawer.classList.contains('active')) closeMenu();
    else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeMenu();
    }
  });

  // Mobile Language Switching
  mobileLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      const desktopBtn = document.getElementById(`lang${lang.charAt(0).toUpperCase() + lang.slice(1)}Btn`);
      if (desktopBtn) desktopBtn.click();
      mobileLangBtns.forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  window.addEventListener('languageChanged', (e) => {
    const lang = e.detail?.lang || 'en';
    mobileLangBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  });

  // Mobile Theme Switching
  mobileThemeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      const desktopBtn = document.getElementById(`theme${theme.charAt(0).toUpperCase() + theme.slice(1)}Btn`);
      if (desktopBtn) desktopBtn.click();
      mobileThemeBtns.forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  window.addEventListener('themeChanged', (e) => {
    const theme = e.detail?.theme || 'dark';
    mobileThemeBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-theme') === theme);
    });
  });

  const curTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  mobileThemeBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-theme') === curTheme));

  const curLang = document.documentElement.lang || 'en';
  mobileLangBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === curLang));
}

/* Documentary Reel Chapters Controller */
function initVideoChapters() {
  const video = document.getElementById('docuVideo');
  const chapterBtns = document.querySelectorAll('.chapter-btn');
  if (!video || !chapterBtns.length) return;

  chapterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const timeSec = parseFloat(btn.getAttribute('data-time')) || 0;
      chapterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      video.currentTime = timeSec;
      video.play().catch(() => {});
    });
  });

  video.addEventListener('timeupdate', () => {
    const cur = video.currentTime;
    let activeIndex = 0;
    if (cur >= 35) activeIndex = 2;
    else if (cur >= 19) activeIndex = 1;

    chapterBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === activeIndex);
    });
  });
}

/* Top Scroll Progress Bar */
function initScrollProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = `${scrolled}%`;
  }, { passive: true });
}

/* Hero Slider Logic */
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const playPauseBtn = document.getElementById('sliderPlayPauseBtn');
  const heroContainer = document.getElementById('heroSlider');

  if (!slides.length) return;

  let currentSlide = 0;
  let isPlaying = true;
  let slideInterval = null;
  const slideDuration = 6500;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentSlide = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, slideDuration);
    isPlaying = true;
    updatePlayPauseButton();
  }

  function stopAutoplay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = null;
    isPlaying = false;
    updatePlayPauseButton();
  }

  function updatePlayPauseButton() {
    if (!playPauseBtn) return;
    const iconPause = playPauseBtn.querySelector('.icon-pause');
    const iconPlay = playPauseBtn.querySelector('.icon-play');
    if (iconPause && iconPlay) {
      iconPause.style.display = isPlaying ? 'block' : 'none';
      iconPlay.style.display = isPlaying ? 'none' : 'block';
    }
  }

  window.nextSlide = () => { nextSlide(); if (isPlaying) startAutoplay(); };
  window.prevSlide = () => { prevSlide(); if (isPlaying) startAutoplay(); };
  window.goToSlide = (idx) => { showSlide(idx); if (isPlaying) startAutoplay(); };
  window.jumpToSlide = (idx) => { showSlide(idx); if (isPlaying) startAutoplay(); };
  window.toggleSlidePlay = () => {
    if (isPlaying) stopAutoplay();
    else startAutoplay();
  };

  if (heroContainer) {
    heroContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') window.nextSlide();
      if (e.key === 'ArrowLeft') window.prevSlide();
    });
  }

  startAutoplay();
}
