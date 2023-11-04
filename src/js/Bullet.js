import GameObject from './GameObject.js';

/**
 * Представляет экземпляр патрона.
 */
export default class Bullet extends GameObject {
  /**
   * Создает новый экземпляр патрона.
   * @constructor
   * @param {number} x - Позиция по горизонтали.
   * @param {number} y - Позиция по вертикали.
   * @param {number} width - Ширина патрона.
   * @param {number} height - Высота патрона.
   * @param {HTMLElement} container - Родительский контейнер патрона.
   * @param {number} speed - Скорость движения патрона.
   */
  constructor(x, y, width, height, container, speed) {
    super(x, y, width, height, container);

    this.speed = speed;

    this.addElementProps();
    this.updateBullet();
  }

  /**
   * Создает DOM-элемент патрона и добавляет его в контейнер.
   */
  addElementProps = () => {
    this.element.classList.add('bullet');
    this.element.style.backgroundColor = 'red';
  };

  /**
   * Двигает патрон.
   */
  move = () => {
    this.y -= this.speed;
    this.updatePosition();
  };

  /**
   * Удаляет патрон.
   */
  bulletRemove = () => {
    // Остановить анимацию
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    this.element.remove();
    this.element = null;
  };

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
