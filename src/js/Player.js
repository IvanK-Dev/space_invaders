import Bullet from './Bullet.js';

export default class Player {
  constructor(initialX, initialY, container) {
    this.x = initialX;
    this.y = container.offsetHeight-initialY;
    this.speed = 5;
    this.width = 50;
    this.height = 25;
    this.container = container;
    this.playerCreate()
    this.updateGame = this.updateGame.bind(this);
    this.updateGame();
  }

  playerCreate=()=>{

    this.element = document.createElement('div');
    this.element.id='player'

    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = 'blue';
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
      this.bullet = null;

    this.container.appendChild(this.element);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    document.addEventListener('keydown', this.handleKeyPress);
  
    this.maxLeftPosition=0;
    this.maxRightPosition=this.container.offsetWidth-this.width;
  
  }

  moveLeft() {
    this.x -= this.speed;
    if(this.x<=this.maxLeftPosition) this.x=this.maxLeftPosition
    this.updatePosition();
  }

  moveRight() {

    this.x += this.speed;
    if(this.x>=this.maxRightPosition) this.x=this.maxRightPosition

    this.updatePosition();
  }

  shoot() {
    if (!this.bullet) {
      this.bullet = new Bullet(
        this.x + this.width / 2 - 2,
        this.y,
        this.container
      );
    }
  }

  handleBulletCollision() {
    if (this.bullet) {
      for (let i = 0; i < this.enemies.length; i++) {
        const enemy = this.enemies[i];
        if (
          this.bullet.x < enemy.x + enemy.width &&
          this.bullet.x + this.bullet.width > enemy.x &&
          this.bullet.y < enemy.y + enemy.height &&
          this.bullet.y + this.bullet.height > enemy.y
        ) {
          // Обработка столкновения
          enemy.remove();
          this.enemies.splice(i, 1);

          this.bullet.remove();
          this.bullet = null;
          break;
        }
      }
    }
  }

  updateGame = () => {
    this.updatePosition();
    // this.handleBulletCollision();

    this.updatePosition();
    if (this.bullet) {
      this.bullet.move();
      if (this.bullet.y < 0) {
        this.bullet.remove();
        this.bullet = null;
      }
    }
    requestAnimationFrame(this.updateGame);
  };

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    // this.element.style.top = `${this.y}px`;
  }

  handleKeyPress(event) {
    switch (event.key) {
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case ' ':
        this.shoot();
        event.preventDefault();
        break;
      default:
        break;
    }
  }
}
