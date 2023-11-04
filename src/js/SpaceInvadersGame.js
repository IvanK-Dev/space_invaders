import { GAME_OPTIONS } from '../constants/game_options.js';
import { ENEMIES_MAP } from '../constants/enemiesMap.js';
import Enemy from './Enemy.js';
import Player from './Player.js';
import { ENEMY_PROPS } from '../constants/enemyProps.js';

/**
 * Представляет игру "Space Invaders".
 */
export default class SpaceInvadersGame {
  constructor() {
    this.parentElement = document.getElementById('game');

    this.gameBoard = this.createGameBoard();
    this.player = this.createPlayer();
    this.enemies = this.createEnemies(ENEMIES_MAP);
    this.updateGame();
  }

  /**
   * Создает игровое поле и добавляет его в DOM.
   * @returns {HTMLElement} - Элемент игрового поля.
   */
  createGameBoard = () => {
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');
    gameBoard.style.width = GAME_OPTIONS.gameBoard.width;
    gameBoard.style.height = GAME_OPTIONS.gameBoard.height;
    gameBoard.style.backgroundColor = GAME_OPTIONS.gameBoard.backgroundColor;
    gameBoard.style.position = 'relative';

    this.parentElement.appendChild(gameBoard);
    return gameBoard;
  };

  /**
   * Создает информационные панели игры.
   */
  createGameInformationPanels = () => {};

  /**
   * Создает игрока.
   * @returns {Player} - Игрок.
   */
  createPlayer = () =>
    new Player(
      GAME_OPTIONS.player.width,
      GAME_OPTIONS.player.height,
      this.gameBoard
    );

  /**
   * Создает врагов.
   * @param {number[][]} enemiesMap - Карта врагов.
   * @returns {Enemy[]} - Массив врагов.
   */
  createEnemies = (enemiesMap) => {
    const enemies = []; // Массив для хранения врагов
    const enemyWidth = GAME_OPTIONS.enemy.width;
    const enemyHeight = GAME_OPTIONS.enemy.height;

    for (let i = 0; i < enemiesMap.length; i++) {
      for (let j = 0; j < enemiesMap[i].length; j++) {
        if (enemiesMap[i][j] !== 0) {
          const enemyLevel = enemiesMap[i][j];
          const enemy = new Enemy(
            j * (enemyWidth + GAME_OPTIONS.enemy.spacingX), // X координата
            i * (enemyHeight + enemyHeight), // Y координата
            enemyWidth,
            enemyHeight,
            this.gameBoard,
            enemyLevel
          );
          enemies.push(enemy); // Добавление врага в массив
        }
      }
    }
    return enemies;
  };

  /**
   * Обрабатывает столкновение снаряда игрока с врагами.
   */
  handleBulletEnemyCollision = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (this.player.bullet) {
        const bulletCoordinates = this.player.bullet.getBulletCoordinates();
        const enemyCoordinates = enemy.getEnemyCoordinates();

        if (
          bulletCoordinates.x + bulletCoordinates.width > enemyCoordinates.x &&
          bulletCoordinates.x < enemyCoordinates.x + enemyCoordinates.width &&
          bulletCoordinates.y < enemyCoordinates.y + enemyCoordinates.height &&
          bulletCoordinates.y + bulletCoordinates.height > enemyCoordinates.y
        ) {
          enemy.hpoint--;

          if (enemy.hpoint <= 0) {
            this.player.score += enemy.pointsPerKill;
            enemy.enemyElement.remove(); // Удаление элемента врага
            enemy.stopShooting();
            enemy.removeEnemy();
            this.enemies.splice(i, 1); // Удаление врага из массива
          }

          this.player.bullet.bulletRemove(); // Удаление пули игрока
          this.player.bullet = null; // Обнуление ссылки на пулю игрока
          break; // Прекращаем обработку столкновений
        }
      }
    }
  };

  /**
   * Обрабатывает столкновение снаряда врага с игроком.
   */
  handleBulletPlayerCollision = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      // console.log('enemy.bullet', enemy.bullet);
      if (enemy.bullet) {
        const bulletCoordinates = enemy.bullet.getBulletCoordinates();
        const playerCoordinates = this.player.getPlayerCoordinates();

        if (
          bulletCoordinates.x > playerCoordinates.x &&
          bulletCoordinates.x + bulletCoordinates.width <
            playerCoordinates.x + playerCoordinates.width &&
          bulletCoordinates.y + bulletCoordinates.height >
            playerCoordinates.y &&
          bulletCoordinates.y + bulletCoordinates.height <
            playerCoordinates.y + playerCoordinates.height
        ) {
          this.player.lifes--;
          console.log('this.player.lifes', this.player.lifes);
          enemy.bullet.bulletRemove(); // Удаление пули врага
          enemy.bullet = null; // Обнуление ссылки на пулю врага
          break; // Прекращаем обработку столкновений после удаления врага
        }
      }
    }
  };

  /**
   * Проверяет столкновение врагов с областью игрока.
   * @returns {boolean} - Возвращает true, если есть столкновение, иначе false.
   */
  handleCollisionWithPlayerArea = () => {
    const playerCoordinates = this.player.getPlayerCoordinates();

    return this.enemies.some((enemy) => {
      const enemyCoordinates = enemy.getEnemyCoordinates();
      return (
        enemyCoordinates.y + enemyCoordinates.height >= playerCoordinates.y
      );
    });
  };

  /**
   * Обновляет состояние игры.
   */
  updateGame = () => {
    // Проверяем условия завершения игры - отсутствие жизней у игрока или столкновение с врагами.
    if (this.player.lifes <= 0 || this.handleCollisionWithPlayerArea()) {
      this.gameOver();// Игра завершена
      return;
    }

    this.handleCollisions();// Обработка столкновений объектов в игре

    // Удаляем снаряд игрока, если он выходит за пределы игрового поля.
    if (this.player.bullet && this.player.bullet.y < 0) {
      this.player.bullet.bulletRemove();// Удаление снаряда игрока
      this.player.bullet = null;// Сброс ссылки на снаряд игрока
    }

    this.cleanupBullets();// Очистка снарядов, вышедших за пределы игрового поля
    this.animationFrameId = requestAnimationFrame(this.updateGame);
  };

  /**
   * Обработка завершения игры.
   */
  gameOver = () => {
    this.player.speed = 0;// Остановка движения игрока
    this.enemies.forEach((enemy) => {
      enemy.stopShooting();// Остановка атаки врагов
      enemy.speedX = 0;// Остановка движения врагов по горизонтали
    });
    cancelAnimationFrame(this.animationFrameId);// Остановка игровой анимации
    console.log('Game Over');
    return;
  };

  /**
   * Обработка столкновений игровых объектов.
   */
  handleCollisions = () => {
    this.handleBulletEnemyCollision();// Обработка столкновения снаряда игрока с врагами
    this.handleBulletPlayerCollision(); // Обработка столкновения снаряда врагов с игроком

  /**
   * Очистка снарядов, вышедших за пределы игрового поля.
   */
  cleanupBullets = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (
        enemy.bullet &&
        enemy.bullet.y + enemy.bullet.height > this.gameBoard.offsetHeight
      ) {
        enemy.bullet.bulletRemove();
        enemy.bullet = null;
      }
    }
  };
}
