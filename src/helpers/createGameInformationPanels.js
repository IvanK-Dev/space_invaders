import { formattedScore } from './formattedScore.js';
import { setLifesHTML } from './setLifesHTML.js';

/**
 * Создает информационные панели игры.
 *
 * @param {number} lifes - Оставшиеся жизни игрока.
 * @param {number} gameLevel - Уровень игры.
 * @param {HTMLElement} gameBoard - Элемент игрового поля, к которому нужно добавить информационные панели.
 */
export const createGameInformationPanels = (
  lifes = 3,
  gameLevel,
  gameBoard
) => {
  // Панель для отображения счета игрока
  const scorePanel = document.createElement('div');
  scorePanel.classList.add('score-panel');
  scorePanel.innerHTML = `
  <p ">SCORE</p>
  <p class="score-text" style="font-size: 35px;">${formattedScore(0)}</p>
  `;
  scorePanel.style.position = 'absolute';
  gameBoard.appendChild(scorePanel);

  // Панель для отображения оставшихся жизней игрока
  const lifesPanel = document.createElement('div');
  lifesPanel.classList.add('lifes-panel');
  lifesPanel.innerHTML = `
  <p >LIVES:</p>
  <ul class="lifes-list">  
  ${setLifesHTML(lifes)}
  </ul>
  `;
  gameBoard.appendChild(lifesPanel);

  // Панель для отображения текущего уровня игры
  const levelPanel = document.createElement('div');
  levelPanel.classList.add('level-panel');
  levelPanel.textContent = `LEVEL: ${gameLevel}`;
  gameBoard.appendChild(levelPanel);

};
