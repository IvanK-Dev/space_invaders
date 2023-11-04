import { GAME_OPTIONS } from '../constants/game_options.js';
import { getElementCoordinates } from '../helpers/getElementCoordinates.js';

export default class Bullet {
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

  move = () => {
    this.y -= this.speed;
    this.updatePosition();
  };

  updatePosition = () => {
    this.bulletElement.style.left = `${this.x}px`;
    this.bulletElement.style.top = `${this.y}px`;
  };

  bulletRemove = () => {
    // Остановить анимацию
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId=null
    // Удалить элемент из DOM
    this.bulletElement.remove();
    this.bulletElement = null;
  };

  getBulletCoordinates = () => getElementCoordinates(this.bulletElement);

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
