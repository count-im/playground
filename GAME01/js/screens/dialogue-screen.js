import { typewriter } from '../utils/typewriter.js';
import { NPCS } from '../../data/npcs.js';
import { LOCATIONS } from '../../data/locations.js';
import { DIALOGUE_YEONHEE } from '../../data/dialogue/npc-yeonhee.js';
import { DIALOGUE_DALSOO } from '../../data/dialogue/npc-dalsoo.js';
import { DIALOGUE_HAEMI } from '../../data/dialogue/npc-haemi.js';
import { DIALOGUE_JANGGUN } from '../../data/dialogue/npc-janggun.js';
import { DIALOGUE_BOMI } from '../../data/dialogue/npc-bomi.js';

/** Map npcId to dialogue tree */
const DIALOGUE_MAP = {
  yeonhee: DIALOGUE_YEONHEE,
  dalsoo: DIALOGUE_DALSOO,
  haemi: DIALOGUE_HAEMI,
  janggun: DIALOGUE_JANGGUN,
  bomi: DIALOGUE_BOMI,
};

/**
 * Shows dialogue with an NPC. Returns a Promise that resolves when dialogue ends.
 * @param {object} game - Main game controller
 * @param {string} npcId - NPC identifier
 * @param {string} locationId - Location identifier
 * @returns {Promise<void>}
 */
export function showDialogue(game, npcId, locationId) {
  return new Promise(resolve => {
    const { showScreen } = game._renderer;
    showScreen('dialogue');

    const screen = document.getElementById('screen-dialogue');
    const npc = NPCS[npcId];
    const location = LOCATIONS[locationId];
    const dialogueTree = DIALOGUE_MAP[npcId];

    if (!npc || !dialogueTree) {
      resolve();
      return;
    }

    screen.innerHTML = `
      <div class="dialogue-container">
        <div class="dialogue-header">
          <span class="dialogue-npc-emoji">${npc.emoji}</span>
          <span class="dialogue-npc-name">${npc.name}</span>
          <span class="dialogue-npc-role">${npc.role}</span>
          <span class="dialogue-location">@ ${location ? location.name : ''}</span>
        </div>
        <div class="dialogue-body">
          <p class="dialogue-text"></p>
          <span class="dialogue-speaker"></span>
        </div>
        <div class="dialogue-choices" id="dialogue-choices"></div>
        <span class="dialogue-hint">클릭하여 계속...</span>
      </div>
    `;

    const textEl = screen.querySelector('.dialogue-text');
    const speakerEl = screen.querySelector('.dialogue-speaker');
    const hintEl = screen.querySelector('.dialogue-hint');
    const choicesEl = screen.querySelector('#dialogue-choices');
    const bodyEl = screen.querySelector('.dialogue-body');

    // Find best dialogue node
    const node = game.eventEngine.getAvailableDialogueNode(dialogueTree.nodes, game.state);

    if (!node) {
      resolve();
      return;
    }

    async function showNode(currentNode) {
      const lines = currentNode.lines || [];
      let lineIndex = 0;
      choicesEl.innerHTML = '';
      hintEl.style.visibility = 'hidden';

      async function showNextLine() {
        if (lineIndex >= lines.length) {
          // All lines shown - handle choices or end
          hintEl.style.visibility = 'hidden';

          if (currentNode.choices && currentNode.choices.length > 0) {
            showChoices(currentNode.choices);
          } else {
            // Apply node effects if any, then end
            if (currentNode.effects) {
              game.eventEngine.applyEffects(currentNode.effects);
            }
            resolve();
          }
          return;
        }

        const line = lines[lineIndex];
        speakerEl.textContent = line.speaker || '';
        hintEl.style.visibility = 'hidden';
        await typewriter(textEl, line.text);
        hintEl.style.visibility = 'visible';
        lineIndex++;
      }

      // Click handler on body to advance lines
      function onBodyClick() {
        showNextLine();
      }

      bodyEl.addEventListener('click', onBodyClick);

      function showChoices(choices) {
        bodyEl.removeEventListener('click', onBodyClick);
        choicesEl.innerHTML = '';
        hintEl.style.visibility = 'hidden';

        for (const choice of choices) {
          const btn = document.createElement('button');
          btn.className = 'btn btn-choice';
          btn.textContent = choice.text;
          btn.addEventListener('click', async () => {
            // Apply effects
            if (choice.effects) {
              game.eventEngine.applyEffects(choice.effects);
            }

            // Log to todayLog
            game.state.todayLog.push(`${npc.name}: "${choice.text}"`);

            if (choice.next) {
              // Find next node by id
              const nextNode = dialogueTree.nodes.find(n => n.id === choice.next);
              if (nextNode) {
                await showNode(nextNode);
              } else {
                resolve();
              }
            } else {
              resolve();
            }
          });
          choicesEl.appendChild(btn);
        }
      }

      // Start showing lines
      await showNextLine();
    }

    showNode(node);
  });
}
