/* ========================================================
   CURATED PHOTO GALLERY (Data-Driven with JSON)
   Museum Editorial Edition
   ======================================================== */
import { currentLang } from './i18n.js';

export function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('modal');
  const mImg = document.getElementById('mImg');
  const mTitle = document.getElementById('mTitle');
  const mDesc = document.getElementById('mDesc');
  const mBadge = document.getElementById('mBadge');

  if (!grid) return;

  let archiveData = [];
  let currentFilter = 'all';

  function renderCards() {
    const lang = currentLang || 'en';
    grid.innerHTML = '';

    const filtered = currentFilter === 'all' 
      ? archiveData 
      : archiveData.filter(item => item.category === currentFilter);

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'gallery-card';
      card.setAttribute('data-cat', item.category);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-haspopup', 'dialog');

      card.innerHTML = `
        <div class="gallery-thumb-wrap">
          <img class="gallery-thumb" src="${item.image}" alt="${item.title[lang] || item.title.en}" loading="lazy">
          <span class="gallery-card-badge">${item.badge[lang] || item.badge.en}</span>
        </div>
        <div class="gallery-card-body">
          <span class="gallery-card-tag">${item.tag[lang] || item.tag.en}</span>
          <h3 class="gallery-card-title">${item.title[lang] || item.title.en}</h3>
          <p class="gallery-card-desc">${item.caption[lang] || item.caption.en}</p>
        </div>
      `;

      // Click & Keyboard to open modal
      card.addEventListener('click', () => openModal(item));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(item);
        }
      });

      grid.appendChild(card);
    });
  }

  function openModal(item) {
    if (!modal || !mImg || !mTitle || !mDesc) return;
    const lang = currentLang || 'en';

    mImg.src = item.image;
    mImg.alt = item.title[lang] || item.title.en;
    mTitle.textContent = item.modal.title[lang] || item.title[lang] || item.title.en;
    mDesc.textContent = item.modal.description[lang] || item.caption[lang] || item.caption.en;
    if (mBadge) mBadge.textContent = item.badge[lang] || item.badge.en;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus close button
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.closeModal = closeModal;

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderCards();
    });
  });

  // Fetch JSON archive
  fetch('data/heritage-archive.json')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      archiveData = data;
      renderCards();
    })
    .catch(err => {
      console.warn('Could not load heritage-archive.json, falling back...', err);
    });

  // Re-render when language changes
  window.addEventListener('languageChanged', () => {
    renderCards();
  });
}
