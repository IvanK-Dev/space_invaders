import Player from './Player.js';

export default class SpaceInvadersGame {
  constructor() {
    this.parentElement = document.getElementById('game');

    this.createGameBoard();
    this.createPlayer();
    this.createEnemies();
  }

  createGameBoard = () => {
    const gameBoard = document.createElement('div');
    gameBoard.classList = 'game-board';
    gameBoard.style.width = '1000px';
    gameBoard.style.height = '800px';
    gameBoard.style.backgroundColor = 'black';
    gameBoard.style.position = 'relative';

    this.parentElement.appendChild(gameBoard);
    this.gameBoard = gameBoard;
  };

  createPlayer = () => {
    this.player = new Player(475, 50, this.gameBoard);
  };

  createEnemies() {
    // Создание врагов
    // ...
  }
}
