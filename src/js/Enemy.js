export default class Enemy {
    constructor(initialX, initialY, container) {
      this.x = initialX;
      this.y = initialY;
      this.speedX = 2; // Скорость по оси X
      this.speedY = 2; // Скорость по оси Y 
      this.width = 50;
      this.height = 30;
      this.container = container;
      this.element = document.createElement('div');
      this.element.style.position = 'absolute';
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.backgroundColor = 'green';
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;

      this.element.style.backgroundColor = 'yellow';
  
      container.appendChild(this.element);
  
      this.moveEnemy = this.moveEnemy.bind(this);
      this.moveEnemy();
    }
  
    moveEnemy() {
        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;
        const enemyWidth = this.width;

        this.x += this.speedX;

        if (this.x <= 0 || this.x + enemyWidth >= containerWidth) {
            this.speedX *= -1;
            this.y += this.height; // Опускание на следующий ряд

            // Дополнительная проверка, чтобы враги не выходили за пределы нижней границы
            if (this.y >= containerHeight) {
                //console.log("Game Over");
                return;
            }
        }

        this.updatePosition();
        requestAnimationFrame(this.moveEnemy);
    }
  
    updatePosition() {
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
    }
  }