/**
 * 50-Year Transformation (1975 vs 2025) Interactive Comparison Module
 */

export function initTransformationSlider() {
  const comparisonBox = document.getElementById('comparisonBox');
  const rangeInput = document.getElementById('comparisonRange');
  const dividerLine = document.getElementById('comparisonDivider');

  if (!comparisonBox || !rangeInput) return;

  function updateSlider(val) {
    const clamped = Math.max(0, Math.min(100, val));
    comparisonBox.style.setProperty('--slider-pos', `${clamped}%`);
    if (dividerLine) {
      dividerLine.style.left = `${clamped}%`;
    }
    rangeInput.value = clamped;
  }

  // Handle range input changes (mouse, touch drag, keyboard arrow keys)
  rangeInput.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });

  // Enable direct mouse drag or click on the container
  let isDragging = false;

  function calculatePos(clientX) {
    const rect = comparisonBox.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    return percentage;
  }

  comparisonBox.addEventListener('pointerdown', (e) => {
    isDragging = true;
    comparisonBox.setPointerCapture(e.pointerId);
    updateSlider(calculatePos(e.clientX));
  });

  comparisonBox.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    updateSlider(calculatePos(e.clientX));
  });

  function stopDrag(e) {
    if (isDragging) {
      isDragging = false;
      try {
        comparisonBox.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Pointer capture release safety
      }
    }
  }

  comparisonBox.addEventListener('pointerup', stopDrag);
  comparisonBox.addEventListener('pointercancel', stopDrag);

  // Initialize at 50%
  updateSlider(50);
}
