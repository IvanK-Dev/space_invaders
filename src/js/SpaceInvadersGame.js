import { GAME_OPTIONS } from '../constants/game_options.js';
import { ENEMIES_MAP } from '../constants/enemies_map.js';
import Enemy from './Enemy.js';
import Player from './Player.js';
import Barrier from './Barrier.js';
import { createGameInformationPanels } from '../helpers/createGameInformationPanels.js';
import { formattedScore } from '../helpers/formattedScore.js';
import { setLifesHTML } from '../helpers/setLifesHTML.js';
import { explosionObj } from '../helpers/explosionObj.js';

/**
 * Представляет игру "Space Invaders".
 */
export default class SpaceInvadersGame {
  constructor() {
    this.parentElement = document.getElementById('game');

    this.gameBoard = this.createGameBoard();
    this.player = null;
    this.enemies = null;
    this.barriers = null;
    this.gameLevel = 1;
    this.gameOverFlag = false;
    this.nextLevelFlag = false;
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
    gameBoard.style.backgroundImage = `url(${GAME_OPTIONS.gameBoard.backgroundImage})`;
    gameBoard.style.position = 'relative';

    this.parentElement.appendChild(gameBoard);
    this.parentElement.style.width = `${
      parseInt(gameBoard.style.width) + 200
    }px`;
    return gameBoard;
  };

  /**
   * Создает игрока.
   * @returns {Player} - Игрок.
   */
  createPlayer = () =>
    new Player(
      0,
      0,
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
            enemyLevel,
            this.gameLevel
          );
          enemies.push(enemy); // Добавление врага в массив
        }
      }
    }
    return enemies;
  };

  /**
   * Создает барьеры.
   * @param {number} barrierCount - Количество барьеров для создания.
   * @param {number} barrierWidth - Ширина каждого барьера.
   * @param {number} barrierHeight - Высота каждого барьера.
   */
  createBarriers = (barrierCount, barrierWidth, barrierHeight) => {
    const barriers = [];
    const distanceBetweenBarriers =
      (this.gameBoard.offsetWidth - barrierWidth * barrierCount) /
      (barrierCount + 1); // Расстояние между барьерами
    const playerTop = this.player.y; // Определение верхней границы игрока
    const heightAbovePlayer = GAME_OPTIONS.barrier.spacingY; //Высота над игроком

    for (let i = 0; i < barrierCount; i++) {
      const barrier = new Barrier(
        i * (barrierWidth + distanceBetweenBarriers) + distanceBetweenBarriers,
        playerTop,
        barrierWidth,
        barrierHeight,
        this.gameBoard,
        heightAbovePlayer
      );
      barriers.push(barrier);
    }
    return barriers;
  };

  /**
   * Проверяет столкновение между двумя объектами.
   *
   * @param {GameObject} obj1 - Первый объект.
   * @param {GameObject} obj2 - Второй объект.
   * @returns {boolean} - Возвращает true, если есть столкновение, иначе false.
   */
  checkCollision = (obj1, obj2) => {
    const obj1Coordinates = obj1.getCoordinates();
    const obj2Coordinates = obj2.getCoordinates();

    return (
      obj1Coordinates.x + obj1Coordinates.width > obj2Coordinates.x &&
      obj1Coordinates.x < obj2Coordinates.x + obj2Coordinates.width &&
      obj1Coordinates.y < obj2Coordinates.y + obj2Coordinates.height &&
      obj1Coordinates.y + obj1Coordinates.height > obj2Coordinates.y
    );
  };

  /**
   * Проверяет столкновение пули с барьером и обрабатывает соответствующие действия.
   *
   * @param {Bullet} bullet - Пуля, для которой проверяется столкновение с барьером.
   * @returns {boolean} - Возвращает true, если пуля столкнулась с барьером и была удалена, иначе false.
   */
  checkBulletBarrierCollision = (bullet) => {
    for (let i = 0; i < this.barriers.length; i++) {
      const barrier = this.barriers[i];

      if (this.checkCollision(bullet, barrier)) {
        barrier.hpoint--;

        if (barrier.hpoint <= 0) {
          barrier.element.innerHTML =
            '<img src="/src/assets/boom.gif" alt="Boom"/>';
          setTimeout(() => {
            barrier.removeBarrier();
            this.barriers = this.barriers.filter((b) => b !== barrier);
          }, 700);
        }

        bullet.bulletRemove();
        bullet = null;

        break;
      }
    }
    return bullet === null;
  };

  /**
   * Обрабатывает столкновение пули с барьером.
   */
  handleBulletBarrierCollision = () => {
    if (this.player.bullet) {
      if (this.checkBulletBarrierCollision(this.player.bullet)) {
        this.player.bullet = null;
      }
    }

    this.enemies.forEach((enemy) => {
      if (enemy.bullet) {
        if (this.checkBulletBarrierCollision(enemy.bullet)) {
          enemy.bullet = null;
        }
      }
    });
  };

  /**
   * Обрабатывает столкновение патрона игрока с врагами.
   */
  handleBulletEnemyCollision = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (this.player.bullet) {
        const bulletCoordinates = this.player.bullet.getCoordinates();
        const enemyCoordinates = enemy.getCoordinates();

        if (this.checkCollision(this.player.bullet, enemy)) {
          enemy.hpoint--;

          if (enemy.hpoint <= 0) {
            //console.log("coordinates",bulletCoordinates,bulletCoordinates1 )

            // enemy.element.innerHTML =
            //   '<img src="/src/assets/boom.gif" alt="Boom"/>';
            const { x, y, width, height } = enemy.getCoordinates;
            const explosion = explosionObj(x, y, width, height, this.gameBoard);

            this.player.score += enemy.pointsPerKill;
            const updateScore = document.querySelector(
              '.score-panel>.score-text'
            );
            updateScore.innerHTML = formattedScore(this.player.score);
            //setTimeout(() => {
            if (enemy.element) {
              //enemy.element.remove(); // Удаление элемента врага
              enemy.stopShooting();
              enemy.removeEnemy();
            }
            this.enemies.splice(i, 1); // Удаление врага из массива
            setTimeout(() => {
              explosion.removeElemnt();
            }, 700);
            //}, 700);
          }

          this.player.bullet.bulletRemove(); // Удаление пули игрока
          this.player.bullet = null; // Обнуление ссылки на пулю игрока
          break; // Прекращаем обработку столкновений
        }
      }
    }
  };

  /**
   * Обрабатывает столкновение патрона врага с игроком.
   */
  handleBulletPlayerCollision = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      // console.log('enemy.bullet', enemy.bullet);
      if (enemy.bullet) {
        //Сравнение координат патрона врага с игроком
        if (this.checkCollision(enemy.bullet, this.player)) {
          this.player.lifes--;
          document.querySelector('.lifes-panel>.lifes-list').innerHTML =
            setLifesHTML(this.player.lifes);
          enemy.bullet.bulletRemove(); // Удаление патрона врага
          enemy.bullet = null; // Обнуление ссылки на патрон врага
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
    const playerCoordinates = this.player.getCoordinates();

    return this.enemies.some((enemy) => {
      const enemyCoordinates = enemy.getCoordinates();
      return (
        enemyCoordinates.y + enemyCoordinates.height >= playerCoordinates.y
      );
    });
  };

  /**
   * Обработка завершения игры.
   */
  handleGameOver = () => {
    this.player.speed = 0; // Остановка движения игрока
    this.enemies.forEach((enemy) => {
      enemy.stopShooting(); // Остановка атаки врагов
      enemy.speed = 0; // Остановка движения врагов по горизонтали
    });

    cancelAnimationFrame(this.animationFrameId); // Остановка игровой анимации
    this.gameOverFlag = true;
    return;
  };

  /**
   * Обработка перехода на следующий уровень.
   */
  handleNextGameLevel = () => {
    this.gameLevel++;
    cancelAnimationFrame(this.animationFrameId); // Остановка игровой анимации
    this.nextLevelFlag = true;
    return;
  };

  /**
   * Обновляет состояние игры.
   */
  updateGame = () => {
    // Проверяем условия завершения игры - отсутствие жизней у игрока или столкновение с врагами.
    if (this.player.lifes <= 0 || this.handleCollisionWithPlayerArea()) {
      this.handleGameOver(); // Игра завершена
      return;
    }

    // Проверяем условия завершения игры - отсутствие врагов.
    if (this.enemies.length <= 0) {
      this.handleNextGameLevel();
      return;
    }

    this.handleCollisions(); // Обработка столкновений объектов в игре

    // Удаляем снаряд игрока, если он выходит за пределы игрового поля.
    if (this.player.bullet && this.player.bullet.y < 0) {
      this.player.bullet.bulletRemove(); // Удаление снаряда игрока
      this.player.bullet = null; // Сброс ссылки на снаряд игрока
    }

    this.cleanupBullets(); // Очистка снарядов, вышедших за пределы игрового поля
    this.animationFrameId = requestAnimationFrame(this.updateGame);
  };

  /**
   * Обработка столкновений игровых объектов.
   */
  handleCollisions = () => {
    this.handleBulletEnemyCollision(); // Обработка столкновения снаряда игрока с врагами
    this.handleBulletPlayerCollision(); // Обработка столкновения снаряда врагов с игроком
    this.handleBulletBarrierCollision();
  };

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

  /**
   * Начинает игру.
   */
  startGame = () => {
    if (this.gameOverFlag) {
      this.player.removeElemnt();
      this.player = null;

      this.enemies.forEach((enemy) => {
        enemy.removeEnemy();
      });

      this.enemies = null;

      this.barriers.forEach((barrier) => {
        barrier.removeBarrier();
      });

      this.gameOverFlag = false;
    }
    this.nextLevelFlag = false;

    if (this.player === null) {
      this.player = this.createPlayer();
    }
    this.enemies = this.createEnemies(ENEMIES_MAP);
    this.barriers = this.createBarriers(
      4,
      GAME_OPTIONS.barrier.width,
      GAME_OPTIONS.barrier.height
    ); // Создание барьеров
    if (this.gameLevel == 1) {
      createGameInformationPanels(
        this.player.lifes,
        this.gameLevel,
        this.gameBoard
      );
    }

    this.updateGame();
  };
}
