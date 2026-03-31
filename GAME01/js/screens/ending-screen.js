import { typewriter } from '../utils/typewriter.js';
import { ENDINGS } from '../../data/endings.js';

/**
 * Determines and shows the ending screen.
 * @param {object} game - Main game controller
 */
export async function showEnding(game) {
  const { showScreen } = game._renderer;
  showScreen('ending');

  const screen = document.getElementById('screen-ending');

  // Find the first matching ending (already sorted by priority in data)
  let chosenEnding = null;
  for (const ending of ENDINGS) {
    if (game.eventEngine.evaluateConditions(ending.conditions)) {
      chosenEnding = ending;
      break;
    }
  }

  // Fallback to last ending (bad/normal ending with no conditions)
  if (!chosenEnding) {
    chosenEnding = ENDINGS[ENDINGS.length - 1];
  }

  screen.innerHTML = `
    <div class="ending-container">
      <h2 class="ending-name">${chosenEnding.name}</h2>
      <p class="ending-subtitle">${chosenEnding.subtitle}</p>
      <div class="ending-text-area">
        <p class="ending-text"></p>
      </div>
      <span class="ending-hint">클릭하여 계속...</span>
      <button class="btn btn-primary" id="btn-to-title" style="display:none;">타이틀로</button>
    </div>
  `;

  const textEl = screen.querySelector('.ending-text');
  const hintEl = screen.querySelector('.ending-hint');
  const btnTitle = screen.querySelector('#btn-to-title');
  const textArea = screen.querySelector('.ending-text-area');

  const lines = chosenEnding.text || [];
  let lineIndex = 0;
  let typing = false;

  async function showNextLine() {
    if (lineIndex >= lines.length) {
      hintEl.style.display = 'none';
      btnTitle.style.display = 'inline-block';
      return;
    }

    hintEl.style.visibility = 'hidden';
    typing = true;
    await typewriter(textEl, lines[lineIndex]);
    typing = false;
    hintEl.style.visibility = 'visible';
    lineIndex++;
  }

  textArea.addEventListener('click', () => {
    if (typing) return;
    showNextLine();
  });

  btnTitle.addEventListener('click', () => {
    game.goToTitle();
  });

  await showNextLine();
}
