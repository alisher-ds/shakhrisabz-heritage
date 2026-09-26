/* ========================================================
   CURATED PHOTO GALLERY (Data-Driven with JSON)
   ======================================================== */
import { currentLang } from './i18n.js';

export function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('modal');
  const mImg = document.getElementById('mImg');
  const mTitle = document.getElementById('mTitle');
  const mDesc = document.getElementById('mDesc');

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
      card.className = 'photo-card';
      card.setAttribute('data-cat', item.category);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-haspopup', 'dialog');

      card.innerHTML = `
        <div class="photo-media">
          <img src="${item.image}" alt="${item.title[lang] || item.title.en}" loading="lazy">
          <span class="photo-overlay">${item.badge[lang] || item.badge.en}</span>
        </div>
        <div class="photo-body">
          <h3 class="photo-title">${item.title[lang] || item.title.en}</h3>
          <p class="photo-caption">${item.caption[lang] || item.caption.en}</p>
          <div class="photo-footer">
            <span><span>Photo:</span> <strong>Alisher Tuychiev & Youth Team</strong></span>
            <span>${item.tag[lang] || item.tag.en}</span>
          </div>
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

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus close button
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
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

  // Re-render when language changes
  window.addEventListener('languageChanged', () => {
    renderCards();
  });

  // Fetch JSON data
  fetch('data/heritage-archive.json')
    .then(res => res.json())
    .then(data => {
      archiveData = data;
      renderCards();
    })
    .catch(err => {
      console.error('Failed to load heritage data:', err);
    });
}
