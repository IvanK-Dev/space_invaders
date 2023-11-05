import { shoot } from '../helpers/shoot.js';
import GameObject from './GameObject.js';

/**
 * Представляет экземпляр игрока.
 */
export default class Player extends GameObject {
  /**
   * Создает новый экземпляр игрока.
   * @constructor
   * @param {number} x - Позиция по горизонтали.
   * @param {number} y - Позиция по вертикали.
   * @param {number} width - Ширина игрока.
   * @param {number} height - Высота игрока.
   * @param {HTMLElement} container - Родительский контейнер игрока.
   */
  constructor(x, y, width, height, container) {
    super(x, y, width, height, container);

    this.speed = 5;
    this.shotSpeed = 5;
    this.bullet = null;
    this.lifes = 3;

    this.x = container.offsetWidth / 2 - width / 2;
    this.y = container.offsetHeight - height - 10;
    this.addElementProps();

    this.playerShoot = shoot.bind(this);

    this.updatePlayer = this.updatePlayer.bind(this);
    this.updatePlayer();

    this.score = 0;

    this.isMovingLeft = false;
    this.isMovingRight = false;
  }
  /**
   * Добавляет свойства элемента игрока.
   */
  addElementProps = () => {
    this.element.id = 'player';
    this.element.innerHTML=`<svg width="${this.width}" height="${this.height}" >
    <use
      class="player__icon"
      href="../src/assets/sprite.svg#player1"
    ></use>
  </svg>`
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    document.addEventListener('keydown', this.handleKeyChange);
    document.addEventListener('keyup', this.handleKeyChange);

    this.maxLeftPosition = 0;
    this.maxRightPosition = this.container.offsetWidth - this.width;
  };

  /**
   * Двигает игрока влево.
   */
  moveLeft = () => {
    this.x -= this.speed;
    if (this.x <= this.maxLeftPosition) this.x = this.maxLeftPosition;
    this.updatePosition();
  };

  /**
   * Двигает игрока вправо.
   */
  moveRight = () => {
    this.x += this.speed;
    if (this.x >= this.maxRightPosition) this.x = this.maxRightPosition;

    this.updatePosition();
  };

  /**
   * Обновляет позицию игрока на игровом поле.
   */
  updatePlayer = () => {
    if (this.isMovingLeft) {
      this.moveLeft();
    } else if (this.isMovingRight) {
      this.moveRight();
    }

    requestAnimationFrame(this.updatePlayer);
  };

  /**
   * Обрабатывает события клавиатуры для управления игроком.
   * @param {Event} event - Событие клавиатуры.
   */
  handleKeyChange = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        this.isMovingLeft = event.type === 'keydown';
        break;
      case 'ArrowRight':
        this.isMovingRight = event.type === 'keydown';
        break;
      case ' ':
        if (event.type === 'keydown') {
          this.playerShoot();
          event.preventDefault();
        }
        break;
      default:
        break;
    }
  };
}
