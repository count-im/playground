/**
 * Types text character-by-character into an element.
 * Click/tap on the element skips to the full text instantly.
 * Returns a Promise that resolves when the text is fully displayed.
 */
export function typewriter(element, text, speed = 30) {
  return new Promise(resolve => {
    let index = 0;
    let done = false;

    element.textContent = '';

    function finish() {
      if (done) return;
      done = true;
      clearInterval(timer);
      element.textContent = text;
      element.removeEventListener('click', onSkip);
      resolve();
    }

    function onSkip() {
      finish();
    }

    element.addEventListener('click', onSkip);

    const timer = setInterval(() => {
      if (index < text.length) {
        index++;
        element.textContent = text.slice(0, index);
      } else {
        finish();
      }
    }, speed);
  });
}
