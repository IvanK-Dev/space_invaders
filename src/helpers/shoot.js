import { GAME_OPTIONS } from '../constants/game_options.js';
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
      GAME_OPTIONS.bullet.width,
      GAME_OPTIONS.bullet.height,
      this.container,
      this.shotSpeed
    );
  }
}
