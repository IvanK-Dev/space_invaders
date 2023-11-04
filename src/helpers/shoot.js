import Bullet from '../js/Bullet.js ';

export function shoot() {
  if (!this.bullet) {
    this.bullet = new Bullet(
      this.x + this.width / 2 - 2,
      this.y,
      this.container,
      this.shotSpeed
    );
  }
}
