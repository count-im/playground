import { typewriter } from '../utils/typewriter.js';

/**
 * Shows only the specified screen by toggling the 'active' class.
 * @param {string} screenId - One of: 'title', 'village', 'dialogue', 'day-summary', 'ending'
 */
export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active');
  });
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('active');
  }
}

/**
 * Performs a fade-to-black transition.
 * @param {Function} callback - Called at peak darkness
 * @param {number} duration - Total fade duration in ms (default 500)
 * @returns {Promise<void>}
 */
export function fadeTransition(callback, duration = 500) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'screen-transition';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: #000; opacity: 0; z-index: 9999;
      transition: opacity ${duration / 2}ms ease;
      pointer-events: none;
    `;
    document.body.appendChild(overlay);

    // Force reflow then fade in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    setTimeout(async () => {
      if (callback) await callback();

      overlay.style.opacity = '0';

      setTimeout(() => {
        overlay.remove();
        resolve();
      }, duration / 2);
    }, duration / 2);
  });
}

/**
 * Shows narration lines one by one in an overlay.
 * Click to advance each line. Uses typewriter effect.
 * @param {string[]} lines - Array of narration text lines
 * @returns {Promise<void>}
 */
export function showNarration(lines) {
  return new Promise(resolve => {
    if (!lines || lines.length === 0) {
      resolve();
      return;
    }

    const container = document.getElementById('game-container');

    const overlay = document.createElement('div');
    overlay.className = 'narration-overlay';
    overlay.innerHTML = `
      <div class="narration-box">
        <p class="narration-text"></p>
        <span class="narration-hint">클릭하여 계속...</span>
      </div>
    `;
    container.appendChild(overlay);

    const textEl = overlay.querySelector('.narration-text');
    const hintEl = overlay.querySelector('.narration-hint');
    let lineIndex = 0;
    let typing = false;

    async function showLine() {
      if (lineIndex >= lines.length) {
        overlay.remove();
        resolve();
        return;
      }

      hintEl.style.visibility = 'hidden';
      typing = true;
      await typewriter(textEl, lines[lineIndex]);
      typing = false;
      hintEl.style.visibility = 'visible';
      lineIndex++;
    }

    overlay.addEventListener('click', () => {
      if (typing) return; // typewriter handles its own skip
      showLine();
    });

    showLine();
  });
}
