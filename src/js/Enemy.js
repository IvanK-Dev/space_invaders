import { ENEMY_PROPS } from '../constants/enemy_props.js';
import { shoot } from '../helpers/shoot.js';
import GameObject from './GameObject.js';

/**
 * Представляет экземпляр врага.
 */
export default class Enemy extends GameObject {
  constructor(x, y, width, height, container, enemyLevel) {
    super(x, y, width, height, container);

    this.speed = 1;
    this.enemyLevel = enemyLevel;


    this.shotSpeed = ENEMY_PROPS[`lvl${this.enemyLevel}`].shootSpeed;
    this.hpoint = ENEMY_PROPS[`lvl${this.enemyLevel}`].hpoint;
    this.pointsPerKill = ENEMY_PROPS[`lvl${this.enemyLevel}`].points;
    this.bullet = null;

    // this.enemyElement = this.createEnemyElement();
    this.addElementProps();

    this.moveEnemy = this.moveEnemy.bind(this);
    this.moveEnemy();

    this.enemyShoot = shoot.bind(this);
    this.startShooting();
  }

  /**
   * Создает DOM-элемент врага и возвращает его.
   * @returns {HTMLElement} - DOM-элемент врага.
   */
  addElementProps = () => {
    this.element.classList.add('enemy');

    if(this.enemyLevel===6){
      this.width*=2
      this.height*=2
      this.speed*=1.2
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
  
    }
    this.element.innerHTML=`<svg width="${this.width}" height="${this.height}">
    <use
      class="enemy__icon"
      href="../src/assets/sprite.svg#enemyLvl${this.enemyLevel}"
    ></use>
  </svg>`

  };

  /**
   * Двигает врага по игровому полю.
   */
  moveEnemy = () => {
    if (!this.element) return;
    const containerWidth = this.container.offsetWidth;

    this.x += this.speed;

    if (this.x <= 0 || this.x + this.width >= containerWidth) {
      this.speed *= -1;
      this.y += this.height; // Опускание на следующий ряд
    }

    this.updatePosition();
    requestAnimationFrame(this.moveEnemy);
  };

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
