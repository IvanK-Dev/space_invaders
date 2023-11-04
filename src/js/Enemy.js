import { ENEMY_PROPS } from '../constants/enemyProps.js';
import { getElementCoordinates } from '../helpers/getElementCoordinates.js';
import { shoot } from '../helpers/shoot.js';

/**
 * Представляет экземпляр врага.
 */
export default class Enemy {
  /**
   * Создает новый экземпляр врага.
   * @constructor
   * @param {number} x - Позиция по горизонтали.
   * @param {number} y - Позиция по вертикали.
   * @param {number} enemyWidth - Ширина врага.
   * @param {number} enemyHeight - Высота врага.
   * @param {HTMLElement} container - Родительский контейнер врага.
   * @param {number} enemyLevel - Уровень врага.
   */
  constructor(x, y, enemyWidth, enemyHeight, container, enemyLevel) {
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.width = enemyWidth;
    this.height = enemyHeight;
    this.container = container;
    this.enemyLevel = enemyLevel;

    this.shotSpeed = ENEMY_PROPS[`lvl${this.enemyLevel}`].shootSpeed;
    this.hpoint = ENEMY_PROPS[`lvl${this.enemyLevel}`].hpoint;
    this.pointsPerKill = ENEMY_PROPS[`lvl${this.enemyLevel}`].points;
    this.bullet = null;

    this.enemyElement = this.createEnemyElement();
    container.appendChild(this.enemyElement);

    this.moveEnemy = this.moveEnemy.bind(this);
    this.moveEnemy();

    this.enemyShoot = shoot.bind(this);
    this.startShooting();
  }

  /**
   * Создает DOM-элемент врага и возвращает его.
   * @returns {HTMLElement} - DOM-элемент врага.
   */
  createEnemyElement = () => {
    const enemyElement = document.createElement('div');

    enemyElement.classList.add('enemy');
    enemyElement.style.position = 'absolute';
    enemyElement.style.width = `${this.width}px`;
    enemyElement.style.height = `${this.height}px`;
    enemyElement.style.backgroundColor =
      ENEMY_PROPS[`lvl${this.enemyLevel}`].view;
    enemyElement.style.left = `${this.x}px`;
    enemyElement.style.top = `${this.y}px`;

    return enemyElement;
  };

  /**
   * Двигает врага по игровому полю.
   */
  moveEnemy = () => {
    if (!this.enemyElement) return;
    const containerWidth = this.container.offsetWidth;
    const enemyWidth = this.width;
    const enemyHeight = this.height;

    this.x += this.speedX;

    if (this.x <= 0 || this.x + enemyWidth >= containerWidth) {
      this.speedX *= -1;
      this.y += enemyHeight; // Опускание на следующий ряд
    }

    this.updatePosition();
    requestAnimationFrame(this.moveEnemy);
  };

  /**
   * Обновляет позицию врага.
   */
  updatePosition = () => {
    this.enemyElement.style.left = `${this.x}px`;
    this.enemyElement.style.top = `${this.y}px`;
  };

  /**
   * Получает координаты врага.
   * @returns {object} - Объект с координатами x, y, width и height врага.
   */
  getEnemyCoordinates = () => getElementCoordinates(this.enemyElement);

  /**
   * Начинает стрельбу врага.
   */
  startShooting = () => {
    if (ENEMY_PROPS[`lvl${this.enemyLevel}`].shooting) {
      const randomInterval = (min, max) =>
        Math.floor(Math.random() * max) + min;

      // Устанавливаем интервал для последующих выстрелов
      this.shootingInterval = setInterval(() => {
        setTimeout(() => {
          if (Math.random() > 0.95) {
            //проверка что объект не зачищен
            if (this.enemyShoot) this.enemyShoot();
          }
        }, randomInterval(1000, 5000));
      }, 2000);
    }
  };

  /**
   * Останавливает стрельбу врага.
   */
  stopShooting = () => {
    clearInterval(this.shootingInterval);
  };

  /**
   * Удаляет экземпляр врага, обнуляя его свойства.
   */
  removeEnemy = () => {
    for (const key in this) {
      if (Object.hasOwnProperty.call(this, key)) {
        this[key] = null;
      }
    }
  };
}
