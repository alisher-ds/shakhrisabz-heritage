/* ========================================================
   AI ARCHITECTURAL RESTORATION (Before & After Slider)
   ======================================================== */
export function initAiRestoration() {
  const container = document.getElementById('comparisonContainer');
  const clipLayer = document.getElementById('comparisonClip');
  const handle = document.getElementById('comparisonHandle');

  if (!container || !clipLayer || !handle) return;

  let isDragging = false;
  let currentPercentage = 50;

  function updateSlider(percentage) {
    // Clamp between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    currentPercentage = percentage;

    clipLayer.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    handle.style.left = `${percentage}%`;
    handle.setAttribute('aria-valuenow', Math.round(percentage));
  }

  function getPercentageFromEvent(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - rect.left;
    return (offsetX / rect.width) * 100;
  }

  // Pointer / Mouse events
  function onStart(e) {
    isDragging = true;
    updateSlider(getPercentageFromEvent(e));
  }

  function onMove(e) {
    if (!isDragging) return;
    updateSlider(getPercentageFromEvent(e));
  }

  function onEnd() {
    isDragging = false;
  }

  container.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  container.addEventListener('touchstart', onStart, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onEnd);

  // Keyboard accessibility
  handle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      updateSlider(currentPercentage - 5);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      updateSlider(currentPercentage + 5);
    } else if (e.key === 'Home') {
      e.preventDefault();
      updateSlider(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      updateSlider(100);
    }
  });

  // Initial position
  updateSlider(50);
}
