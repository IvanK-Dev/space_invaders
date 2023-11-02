export default class Enemy {
  constructor(initialX, initialY, enemyWidth, enemyHeight, container,level=1) {
    this.x = initialX;
    this.y = initialY;
    this.speedX = 2;
    this.speedY = 2;
    this.width = enemyWidth;
    this.height = enemyHeight;
    this.container = container;
    this.level = level;

    this.element = this.createEnemyElement();
    container.appendChild(this.element);
    
    this.moveEnemy = this.moveEnemy.bind(this);
    this.moveEnemy();
  }

  createEnemyElement() {
    const enemyElement = document.createElement('div');

    enemyElement.classList.add('enemy');
    enemyElement.style.position = 'absolute';
    enemyElement.style.width = `${this.width}px`;
    enemyElement.style.height = `${this.height}px`;
    enemyElement.style.backgroundColor = 'green';
    enemyElement.style.left = `${this.x}px`;
    enemyElement.style.top = `${this.y}px`;

    return enemyElement;
  }

  moveEnemy() {
    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;
    const enemyWidth = this.width;
    const enemyHeight = this.height;

    this.x += this.speedX;

    if (this.x <= 0 || this.x + enemyWidth >= containerWidth) {
      this.speedX *= -1;
      this.y += enemyHeight; // Опускание на следующий ряд

      // Дополнительная проверка, чтобы враги не выходили за пределы нижней границы
      if (this.y + enemyHeight >= containerHeight) {
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

  getElementCoordinates() {
    const elementPosition = this.element.getBoundingClientRect(); // Получаем позицию элемента относительно окна браузера
    const containerPosition = this.container.getBoundingClientRect(); // Получаем позицию контейнера (игрового поля) относительно окна браузера

    const elementCoordinates = {
      x: elementPosition.left - containerPosition.left, // Позиция x элемента относительно контейнера
      y: elementPosition.top - containerPosition.top, // Позиция y элемента относительно контейнера
      width: elementPosition.width, // Ширина элемента
      height: elementPosition.height, // Высота элемента
    };

    return elementCoordinates;
  }
}
