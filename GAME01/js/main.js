import { GameState } from './engine/state.js';
import { EventEngine } from './engine/event-engine.js';
import { showScreen, fadeTransition, showNarration } from './engine/renderer.js';
import { initTitleScreen } from './screens/title-screen.js';
import { initVillageScreen, updateVillageScreen } from './screens/village-screen.js';
import { showDialogue } from './screens/dialogue-screen.js';
import { showDaySummary } from './screens/day-summary.js';
import { showEnding } from './screens/ending-screen.js';
import { CONFIG } from '../data/config.js';
import { EVENTS } from '../data/events.js';
import { NPCS } from '../data/npcs.js';
import { LOCATIONS } from '../data/locations.js';

// ── Main Game Controller ──

const game = {
  state: new GameState(),
  eventEngine: null,

  // Expose renderer methods for screens to use
  _renderer: { showScreen, fadeTransition, showNarration },

  async startNewGame() {
    game.state.newGame();
    game.eventEngine = new EventEngine(game.state);

    await fadeTransition(async () => {
      await game.processDayEvents('day_start');
      showScreen('village');
      updateVillageScreen(game);
    });
  },

  loadGame() {
    const success = game.state.load();
    if (!success) return;
    game.eventEngine = new EventEngine(game.state);

    fadeTransition(() => {
      showScreen('village');
      updateVillageScreen(game);
    });
  },

  async visitLocation(locationId) {
    const actions = game.state.getVar('V002');
    if (actions <= 0) {
      await showNarration(['남은 행동이 없습니다. 하루를 마무리하세요.']);
      return;
    }

    const location = LOCATIONS[locationId];
    if (!location) return;

    const currentDay = game.state.getVar('V001');
    const npcIds = getNpcsAtLocation(location, currentDay);

    if (!npcIds || npcIds.length === 0) {
      await showNarration(['아무도 없다...', '조용한 장소에 바람만 분다.']);
      return;
    }

    // Decrement actions
    game.state.addVar('V002', -1);

    if (npcIds.length === 1) {
      // Single NPC - go directly to dialogue
      const npcId = npcIds[0];
      game.state.todayLog.push(`${NPCS[npcId].emoji} ${location.name}에서 ${NPCS[npcId].name}을(를) 만났다.`);
      await showDialogue(game, npcId, locationId);
      showScreen('village');
      updateVillageScreen(game);
    } else {
      // Multiple NPCs - let player choose
      await chooseNpc(npcIds, locationId);
    }
  },

  async endDay() {
    await game.processDayEvents('day_end');
    showDaySummary(game);
  },

  async advanceDay() {
    const currentDay = game.state.getVar('V001');
    const nextDay = currentDay + 1;
    game.state.setVar('V001', nextDay);
    game.state.todayLog = [];

    if (nextDay > CONFIG.MAX_DAY) {
      await showEnding(game);
      return;
    }

    // Set actions for new day
    const actions = CONFIG.DEFAULT_ACTIONS[nextDay] ?? 3;
    game.state.setVar('V002', actions);

    await fadeTransition(async () => {
      await game.processDayEvents('day_start');

      // Day 10 is automatic - go straight to ending after farewell events
      if (nextDay === 10) {
        await showEnding(game);
        return;
      }

      showScreen('village');
      updateVillageScreen(game);
    });
  },

  async saveGame() {
    game.state.save();
    await showNarration(['저장되었습니다.']);
  },

  goToTitle() {
    fadeTransition(() => {
      initTitleScreen(game);
      showScreen('title');
    });
  },

  async processDayEvents(trigger) {
    const currentDay = game.state.getVar('V001');
    const filtered = game.eventEngine.getFilteredEvents(EVENTS, currentDay, trigger);

    for (const event of filtered) {
      if (!event.commands) continue;

      for (const cmd of event.commands) {
        switch (cmd.type) {
          case 'narration':
            await showNarration(cmd.lines);
            break;

          case 'set_switch':
            game.state.setSwitch(cmd.id, cmd.value);
            break;

          case 'set_variable':
            game.state.setVar(cmd.id, cmd.value);
            break;

          case 'check_festival':
            await checkFestival();
            break;

          default:
            console.warn(`Unknown command type: ${cmd.type}`);
        }
      }
    }
  },
};

// ── Festival Check ──

async function checkFestival() {
  const helpedPrep = game.state.getSwitch('S012');
  const trust = game.state.getVar('V030');
  const trustEnough = trust >= 40;

  // Count met NPCs
  let metCount = 0;
  for (const npcId of Object.keys(NPCS)) {
    if (game.state.getSwitch(NPCS[npcId].metSwitch)) {
      metCount++;
    }
  }
  const metEnough = metCount >= 3;

  if (helpedPrep && trustEnough && metEnough) {
    // Festival success
    game.state.setSwitch('S020', true);
    game.state.addVar('V030', 15);
    game.state.addVar('V020', 2);

    await showNarration([
      '축제가 성공적으로 진행된다!',
      '마을 사람들의 얼굴에 활기가 가득하다.',
      '당신이 도운 등불들이 마을을 환하게 밝힌다.',
      '달빛과 등불이 어우러져 마을이 빛난다.',
      '모두가 웃고 있다. 오랜만에 보는 풍경이라고 한다.',
    ]);
  } else {
    // Festival fail
    await showNarration([
      '축제가 열렸지만, 어딘가 허전하다.',
      '준비가 부족했던 탓인지 분위기가 어색하다.',
      '마을 사람들이 조용히 흩어진다.',
      '아쉬운 밤이다...',
    ]);
  }
}

// ── NPC choice when multiple NPCs at location ──

async function chooseNpc(npcIds, locationId) {
  const location = LOCATIONS[locationId];

  return new Promise(resolve => {
    const container = document.getElementById('game-container');
    const overlay = document.createElement('div');
    overlay.className = 'narration-overlay';

    let html = `<div class="narration-box"><p class="narration-text">${location.name}에 여러 사람이 있다. 누구와 이야기할까?</p><div class="npc-choice-buttons">`;

    for (const npcId of npcIds) {
      const npc = NPCS[npcId];
      html += `<button class="btn btn-choice" data-npc-id="${npcId}">${npc.emoji} ${npc.name}</button>`;
    }

    html += '</div></div>';
    overlay.innerHTML = html;
    container.appendChild(overlay);

    overlay.querySelectorAll('[data-npc-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const npcId = btn.dataset.npcId;
        overlay.remove();
        game.state.todayLog.push(`${NPCS[npcId].emoji} ${location.name}에서 ${NPCS[npcId].name}을(를) 만났다.`);
        await showDialogue(game, npcId, locationId);
        showScreen('village');
        updateVillageScreen(game);
        resolve();
      });
    });
  });
}

// ── Helpers ──

function getNpcsAtLocation(location, day) {
  if (location.npcsPerDay[day]) {
    return location.npcsPerDay[day];
  }
  return location.npcsPerDay.default || [];
}

// ── Bootstrap ──

document.addEventListener('DOMContentLoaded', () => {
  game.eventEngine = new EventEngine(game.state);
  initTitleScreen(game);
  initVillageScreen(game);
  showScreen('title');
});
