import { NPCS } from '../../data/npcs.js';

/**
 * Shows the day summary screen.
 * @param {object} game - Main game controller
 */
export function showDaySummary(game) {
  const { showScreen } = game._renderer;
  showScreen('day-summary');

  const screen = document.getElementById('screen-day-summary');
  const currentDay = game.state.getVar('V001');

  // Build log entries
  const logHtml = game.state.todayLog.length > 0
    ? game.state.todayLog.map(entry => `<li>${entry}</li>`).join('')
    : '<li>특별한 일이 없었다...</li>';

  // Build NPC affinity display - only for met NPCs
  let affinityHtml = '';
  for (const npcId of Object.keys(NPCS)) {
    const npc = NPCS[npcId];
    const met = game.state.getSwitch(npc.metSwitch);
    if (!met) continue;

    const affinity = game.state.getVar(npc.affinityVar);
    const filledHearts = Math.min(5, Math.floor(affinity / 20));
    const hearts = '♥'.repeat(filledHearts) + '♡'.repeat(5 - filledHearts);

    affinityHtml += `
      <div class="summary-npc">
        <span class="summary-npc-name">${npc.emoji} ${npc.name}</span>
        <span class="summary-hearts">${hearts}</span>
      </div>
    `;
  }

  screen.innerHTML = `
    <div class="summary-container">
      <h2 class="summary-title">── ${currentDay}일차가 끝났습니다 ──</h2>
      <div class="summary-log">
        <ul>${logHtml}</ul>
      </div>
      ${affinityHtml ? `<div class="summary-affinity">${affinityHtml}</div>` : ''}
      <p class="summary-save-note">[자동 저장 완료]</p>
      <button class="btn btn-primary" id="btn-next-day">다음 날로</button>
    </div>
  `;

  // Auto-save
  game.state.save();

  screen.querySelector('#btn-next-day').addEventListener('click', () => {
    game.advanceDay();
  });
}
