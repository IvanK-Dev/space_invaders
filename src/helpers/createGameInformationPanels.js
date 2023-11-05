/**
 * Создает информационные панели игры.
 * @param {number} score - Счет игрока.
 * @param {number} lifes - Оставшиеся жизни игрока.
 * @param {number} gameLevel - Уровень игры.
 */
export const createGameInformationPanels = (score, lifes, gameLevel, gameBoard) => {
  const informationPanel = document.createElement('div');

  informationPanel.classList.add('information-panel');

  const scorePanel = document.createElement('div');
  scorePanel.classList.add('score-panel');
  scorePanel.innerHTML = `<p>Score: ${score}<p>`;
  informationPanel.appendChild(scorePanel);

  const lifesPanel = document.createElement('div');
  lifesPanel.classList.add('lifes-panel');
  lifesPanel.textContent = `Lives: ${lifes}`;
  informationPanel.appendChild(lifesPanel);

  const levelPanel = document.createElement('div');
  levelPanel.classList.add('level-panel');
  levelPanel.textContent = `Level: ${gameLevel}`;
  informationPanel.appendChild(levelPanel);

  // Добавить информационные панели в DOM
  gameBoard.appendChild(informationPanel);
};
