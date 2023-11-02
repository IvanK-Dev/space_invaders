import Enemy from './Enemy.js';
import Player from './Player.js';

export default class SpaceInvadersGame {
  constructor() {
    this.parentElement = document.getElementById('game');

    this.gameBoard = this.createGameBoard();
    this.player = this.createPlayer();
    this.enemies = this.createEnemies(5, 11);
    this.updateGame();
  }

  createGameBoard = () => {
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');
    gameBoard.style.width = '800px';
    gameBoard.style.height = '600px';
    gameBoard.style.backgroundColor = 'black';
    gameBoard.style.position = 'relative';

    this.parentElement.appendChild(gameBoard);
    return gameBoard; 
  };

  createPlayer = () => new Player(50, 25, this.gameBoard);

  createEnemies=(rows, cols)=> {
    const enemies = []; // Массив для хранения врагов

    const enemyWidth = 50;
    const enemyHeight = 30;

    const spacingX = 10; // Расстояние между столбцами
    const spacingY = 10; // Расстояние между рядами

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const enemy = new Enemy(
          j * (enemyWidth + spacingX), // X координата
          i * (enemyHeight + spacingY), // Y координата
          enemyWidth,
          enemyHeight,
          this.gameBoard
        );

        enemies.push(enemy); //Добавление врага в массив
      }
    }
    return enemies;
  }

  handleBulletEnemyCollision=()=> {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (this.player.bullet) {
        const bulletCoordinates =
          this.player.bullet.element.getBoundingClientRect();
        const enemyCoordinates = enemy.getElementCoordinates();

        if (
          bulletCoordinates.left <
            enemyCoordinates.x + enemyCoordinates.width &&
          bulletCoordinates.left + bulletCoordinates.width >
            enemyCoordinates.x &&
          bulletCoordinates.top <
            enemyCoordinates.y + enemyCoordinates.height &&
          bulletCoordinates.top + bulletCoordinates.height > enemyCoordinates.y
        ) {
          enemy.element.remove(); // Удаление элемента врага
          this.enemies.splice(i, 1); // Удаление врага из массива
          this.player.bullet.remove(); // Удаление пули игрока
          this.player.bullet = null; // Обнуление ссылки на пулю игрока
          break; // Прекращаем обработку столкновений после удаления врага
        }
      }
    }
  }

  updateGame = () => {
    // Обновление позиции игрока, пуль и врагов

    if (this.player.bullet) {
      this.player.bullet.move();
      if (this.player.bullet.y < 0) {
        this.player.bullet.remove();
        this.player.bullet = null;
      }
    }

    this.handleBulletEnemyCollision(); // Вызов метода обработки столкновений пули с врагами

    requestAnimationFrame(this.updateGame);
  };
}
