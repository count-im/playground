import { LOCATIONS } from '../../data/locations.js';
import { NPCS } from '../../data/npcs.js';

/**
 * Builds the village map UI inside #screen-village.
 */
export function initVillageScreen(game) {
  const screen = document.getElementById('screen-village');
  if (!screen) return;

  screen.innerHTML = `
    <div class="village-container">
      <div class="village-top-bar">
        <span class="day-display" id="day-display"></span>
        <span class="actions-display" id="actions-display"></span>
      </div>
      <div class="village-grid" id="village-grid"></div>
      <div class="village-bottom-bar">
        <button class="btn btn-primary" id="btn-end-day">하루 마무리</button>
        <button class="btn btn-secondary" id="btn-save">저장</button>
      </div>
    </div>
  `;

  // Build location tiles
  const grid = screen.querySelector('#village-grid');
  const locationIds = Object.keys(LOCATIONS);

  for (const locId of locationIds) {
    const loc = LOCATIONS[locId];
    const tile = document.createElement('div');
    tile.className = `village-tile ${loc.cssClass}`;
    tile.dataset.locationId = locId;
    tile.innerHTML = `
      <span class="tile-icon">${loc.icon}</span>
      <span class="tile-name">${loc.name}</span>
      <div class="tile-npcs" id="tile-npcs-${locId}"></div>
    `;
    tile.addEventListener('click', () => {
      game.visitLocation(locId);
    });
    grid.appendChild(tile);
  }

  // Add a 6th empty tile if odd number for 3x2 grid
  if (locationIds.length % 2 !== 0) {
    const emptyTile = document.createElement('div');
    emptyTile.className = 'village-tile tile-empty';
    grid.appendChild(emptyTile);
  }

  screen.querySelector('#btn-end-day').addEventListener('click', () => {
    game.endDay();
  });

  screen.querySelector('#btn-save').addEventListener('click', () => {
    game.saveGame();
  });
}

/**
 * Refreshes day counter, actions remaining, and NPC positions.
 */
export function updateVillageScreen(game) {
  const currentDay = game.state.getVar('V001');
  const actions = game.state.getVar('V002');

  const dayDisplay = document.getElementById('day-display');
  const actionsDisplay = document.getElementById('actions-display');

  if (dayDisplay) dayDisplay.textContent = `${currentDay}일차`;
  if (actionsDisplay) actionsDisplay.textContent = `남은 행동: ${actions}`;

  // Update NPC names at each location
  for (const locId of Object.keys(LOCATIONS)) {
    const loc = LOCATIONS[locId];
    const npcsEl = document.getElementById(`tile-npcs-${locId}`);
    if (!npcsEl) continue;

    const npcIds = getNpcsAtLocation(loc, currentDay);
    npcsEl.innerHTML = npcIds
      .map(npcId => {
        const npc = NPCS[npcId];
        return npc ? `<span class="tile-npc-name">${npc.emoji} ${npc.name}</span>` : '';
      })
      .join('');
  }
}

/**
 * Returns NPC IDs at a location for a given day.
 * Checks location.npcsPerDay[day] first, falls back to default.
 */
function getNpcsAtLocation(location, day) {
  if (location.npcsPerDay[day]) {
    return location.npcsPerDay[day];
  }
  return location.npcsPerDay.default || [];
}
