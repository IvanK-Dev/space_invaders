export default class Bullet {
    constructor(x, y, container) {
      this.x = x;
      this.y = y;
      this.speed = 5;
      this.width = 5;
      this.height = 10;
      this.container = container;
      this.element = document.createElement('div');
      this.element.style.position = 'absolute';
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.backgroundColor = 'red';
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
  
      container.appendChild(this.element);
    }
  
    move() {
      this.y -= this.speed;
      this.updatePosition();
    }
  
    updatePosition() {
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
    }
  
    remove() {
      this.element.remove();
    }
  }