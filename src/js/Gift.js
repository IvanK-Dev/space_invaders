import GameObject from './GameObject.js';

/**
 * Представляет подарок, который падает из врага при его уничтожении.
 */
export class Gift extends GameObject {
  /**
   * Создает экземпляр подарка.
   * @constructor
   * @param {number} x - Позиция по горизонтали.
   * @param {number} y - Позиция по вертикали.
   * @param {number} width - Ширина подарка.
   * @param {number} height - Высота подарка.
   * @param {HTMLElement} container - Родительский контейнер подарка.
   * @param {string} giftContent - Содержимое подарка.
   */
  constructor(x, y, width, height, container, giftContent) {
    super(x, y, width, height, container);
    this.giftContent = giftContent;
    this.fallingSpeed = 2;

    this.createGift();
  }

  /**
   * Создает DOM-элемент подарка и добавляет его в контейнер.
   */
  createGift = () => {
    this.createElement();
    this.element.classList.add('gift');

    this.element.innerHTML = `<p>${this.giftContent}</p>`; // Устанавливаем тип подарка
    this.element.style.backgroundColor = 'red';

    this.updatePosition();
    this.updateGift();
  };

  /**
   * Двигает подарок вниз по экрану.
   */
  move = () => {
    this.y += this.fallingSpeed;
    this.updatePosition();
  };

  /**
   * Обновляет позицию подарка на экране.
   */
  updateGift = () => {
    this.move();
    this.animationFrameId = requestAnimationFrame(this.updateGift);
  };

  /**
   * Удаляет подарок.
   */
  removeGift = () => {
    this.removeElemnt();
    cancelAnimationFrame(this.animationFrameId);
  };
}
