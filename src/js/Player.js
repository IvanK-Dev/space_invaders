import { getElementCoordinates } from '../helpers/getElementCoordinates.js';
import { shoot } from '../helpers/shoot.js';

export default class Player {
  constructor(width, height, container) {
    this.x = container.offsetWidth / 2 - width / 2;
    this.y = container.offsetHeight - height - 10;
    this.speed = 5;
    this.shotSpeed = 5;
    this.width = width;
    this.height = height;
    this.bullet = null;
    this.lifes = 3;
    this.container = container;
    this.createPlayerElement();
    this.updatePlayer = this.updatePlayer.bind(this);
    this.updatePlayer();

    this.isMovingLeft = false;
    this.isMovingRight = false;
  }

  createPlayerElement = () => {
    this.element = document.createElement('div');
    this.element.id = 'player';

    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = 'blue';
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.container.appendChild(this.element);

    document.addEventListener('keydown', this.handleKeyChange);
    document.addEventListener('keyup', this.handleKeyChange);

    this.maxLeftPosition = 0;
    this.maxRightPosition = this.container.offsetWidth - this.width;
  };

  moveLeft = () => {
    this.x -= this.speed;
    if (this.x <= this.maxLeftPosition) this.x = this.maxLeftPosition;
    this.updatePosition();
  };

  moveRight = () => {
    this.x += this.speed;
    if (this.x >= this.maxRightPosition) this.x = this.maxRightPosition;

    this.updatePosition();
  };

  playerShoot = shoot.bind(this);

  updatePlayer = () => {
    if (this.isMovingLeft) {
      this.moveLeft();
    } else if (this.isMovingRight) {
      this.moveRight();
    }

    requestAnimationFrame(this.updatePlayer);
  };

  updatePosition = () => {
    this.element.style.left = `${this.x}px`;
  };

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

  getPlayerCoordinates = () => getElementCoordinates(this.element);
}
