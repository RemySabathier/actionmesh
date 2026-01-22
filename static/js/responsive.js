/**
 * Responsive scaling for .scalable-content sections
 * Applies CSS transform scaling on narrow screens (<900px) to prevent grid collapse
 */

function updateScalableContent() {
  const vw = window.innerWidth;
  const baseWidth = 900;
  const margin = 8;
  const scalables = document.querySelectorAll('.scalable-content');

  scalables.forEach(el => {
    if (vw < baseWidth) {
      const scale = (vw - margin) / baseWidth;

      // Set fixed width and apply scale transform
      el.style.width = baseWidth + 'px';
      el.style.minWidth = baseWidth + 'px';
      el.style.transform = 'scale(' + scale + ')';
      el.style.transformOrigin = 'top left';

      // Adjust margin to compensate for scaled height
      el.style.marginBottom = ((scale - 1) * el.scrollHeight) + 'px';

      // Prevent horizontal overflow from parent
      if (el.parentElement) {
        el.parentElement.style.overflowX = 'hidden';
      }
    } else {
      // Reset styles on wide screens
      el.style.width = '';
      el.style.minWidth = '';
      el.style.transform = '';
      el.style.marginBottom = '';

      if (el.parentElement) {
        el.parentElement.style.overflowX = '';
      }
    }
  });
}

// Initialize on load, resize, and after short delay
window.addEventListener('load', updateScalableContent);
window.addEventListener('resize', updateScalableContent);
setTimeout(updateScalableContent, 100);
