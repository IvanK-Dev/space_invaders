export default class Enemy {
    constructor(initialX, initialY, container) {
      this.x = initialX;
      this.y = initialY;
      this.speedX = 2; // Скорость по оси X
      this.speedY = 2; // Скорость по оси Y 
      this.width = 30;
      this.height = 30;
      this.container = container;
      this.element = document.createElement('div');
      this.element.style.position = 'absolute';
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.backgroundColor = 'green';
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
  
      container.appendChild(this.element);
  
      this.moveEnemy = this.moveEnemy.bind(this);
      this.moveEnemy();
    }
  
    moveEnemy() {
      this.x += this.speedX;
      this.y += this.speedY;
  
      // Проверка границ игрового поля
      const containerWidth = this.container.offsetWidth;
      const containerHeight = this.container.offsetHeight;
  
      if (this.x <= 0 || this.x + this.width >= containerWidth) {
        this.speedX *= -1; // Изменение направления движения по горизонтали
      }
  
      if (this.y >= containerHeight) {
        this.y = 0; // Вернуть врага в начальное положение, если он достигает нижней границы
      }
  
      this.updatePosition();
      requestAnimationFrame(this.moveEnemy);
    }
  
    updatePosition() {
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
    }
  }