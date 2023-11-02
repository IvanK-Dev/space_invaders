export default class Bullet {
  constructor(x, y, container) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.width = 5;
    this.height = 10;
    this.container = container;
    this.element = this.createBulletElement();
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
    return bullet
  };

  move = () => {
    this.y -= this.speed;
    this.updatePosition();
  };

  updatePosition = () => {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  };

  remove = () => {
    this.element.remove();
  };

  updateBullet=()=>{
    this.move()
    if(this.y<0){
      this.remove()
    }
    requestAnimationFrame(this.updateBullet);
  }
}
