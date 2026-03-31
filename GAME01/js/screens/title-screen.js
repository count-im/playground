/**
 * Title screen - game start menu.
 */
export function initTitleScreen(game) {
  const screen = document.getElementById('screen-title');
  if (!screen) return;

  const hasSave = game.state.hasSave();

  screen.innerHTML = `
    <div class="title-container">
      <h1 class="title-logo">열흘의 마을</h1>
      <p class="title-subtitle">달빛 마을에서 보내는 10일간의 이야기</p>
      <div class="title-buttons">
        <button class="btn btn-primary" id="btn-new-game">새 게임</button>
        <button class="btn btn-secondary" id="btn-load-game" ${hasSave ? '' : 'disabled'}>이어하기</button>
      </div>
    </div>
  `;

  screen.querySelector('#btn-new-game').addEventListener('click', () => {
    game.startNewGame();
  });

  screen.querySelector('#btn-load-game').addEventListener('click', () => {
    if (game.state.hasSave()) {
      game.loadGame();
    }
  });
}
