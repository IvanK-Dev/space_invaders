import { GAME_OPTIONS } from '../constants/game_options.js';
import { getElementCoordinates } from '../helpers/getElementCoordinates.js';

/**
 * Представляет экземпляр патрона.
 */
export default class Bullet {
  /**
   * Создает новый экземпляр патрона.
   * @constructor
   * @param {number} x - Позиция по горизонтали.
   * @param {number} y - Позиция по вертикали.
   * @param {HTMLElement} container - Родительский контейнер патрона.
   * @param {number} speed - Скорость движения патрона.
   */
  constructor(x, y, container, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = GAME_OPTIONS.bullet.width;
    this.height = GAME_OPTIONS.bullet.height;
    this.container = container;
    this.bulletElement = this.createBulletElement();
    this.updateBullet();
  }

  /**
   * Создает DOM-элемент патрона и возвращает его.
   * @returns {HTMLElement} - DOM-элемент патрона.
   */
  createBulletElement = () => {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.position = 'absolute';
    bullet.style.width = `${this.width}px`;
    bullet.style.height = `${this.height}px`;
    bullet.style.backgroundColor = 'red';
    bullet.style.left = `${this.x}px`;
    bullet.style.top = `${this.y}px`;

    this.container.appendChild(bullet);
    return bullet;
  };

  /**
   * Двигает патрон.
   */
  move = () => {
    this.y -= this.speed;
    this.updatePosition();
  };

  /**
   * Обновляет позицию патрона.
   */
  updatePosition = () => {
    this.bulletElement.style.left = `${this.x}px`;
    this.bulletElement.style.top = `${this.y}px`;
  };

  /**
   * Удаляет патрон.
   */
  bulletRemove = () => {
    // Остановить анимацию
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    // Удалить элемент из DOM
    this.bulletElement.remove();
    this.bulletElement = null;
  };

  /**
   * Получает координаты патрона.
   * @returns {object} - Объект с координатами x, y, width и height патрона.
   */
  getBulletCoordinates = () => getElementCoordinates(this.bulletElement);

  /**
   * Обновляет патрон, двигая его и запрашивая следующий кадр анимации.
   */
  updateBullet = () => {
    if (
      this.bulletElement === null ||
      this.y < 0 ||
      this.y + this.height > this.container.offsetHeight
    ) {
      this.bulletRemove();
      return;
    }

    this.move();
    this.animationFrameId = requestAnimationFrame(this.updateBullet);
  };
}
