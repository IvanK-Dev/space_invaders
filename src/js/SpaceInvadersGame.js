import Enemy from './Enemy.js';
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
    this.enemies = []; // Массив для хранения врагов

    const rows = 5; // Количество рядов
    const cols = 11; // Количество врагов в ряду

    const enemyWidth = 30;
    const enemyHeight = 30;

    const spacingX = 10; // Расстояние между врагами по горизонтали
    const spacingY = 10; // Расстояние между рядами

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const enemy = new Enemy(
          j * (enemyWidth + spacingX), // X координата
          i * (enemyHeight + spacingY), // Y координата
          this.gameBoard
        );

        this.enemies.push(enemy); // Добавьте врага в массив
      }
    }
  }
}
