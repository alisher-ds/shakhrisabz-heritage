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

  // 5. Initialize Data-Driven Gallery
  initGallery();
});

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
