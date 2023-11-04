import Bullet from '../js/Bullet.js ';

/**
 * Стреляет пулей, создавая экземпляр класса Bullet.
 * @function shoot
 * @this {object} Enemy - Экземпляр класса Enemy, который стреляет.
 */
export function shoot() {
  if (!this.bullet) {
    /**
     * @type {Bullet} bullet - Созданный экземпляр класса Bullet.
     */
    this.bullet = new Bullet(
      this.x + this.width / 2 - 2,
      this.y,
      this.container,
      this.shotSpeed
    );
  }
}
