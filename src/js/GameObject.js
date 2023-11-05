export default class GameObject {
  /**
   * Создает экземпляр игрового объекта.
   * @constructor
   * @param {number} x - Позиция по горизонтали.
   * @param {number} y - Позиция по вертикали.
   * @param {number} width - Ширина объекта.
   * @param {number} height - Высота объекта.
   * @param {HTMLElement} container - Родительский контейнер объекта.
   */
  constructor(x, y, width, height, container) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.container = container;
    this.element = null;

    this.createElement();
  }

  /**
   * Создает DOM-элемент объекта и добавляет его в контейнер.
   * @param {string} color - Цвет объекта.
   */
  createElement = (color) => {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.container.appendChild(this.element);
  };

  /**
   * Обновляет позицию объекта на игровом поле.
   */
  updatePosition = () => {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  };

  /**
   * Удаляет элемент объекта.
   */
  removeElemnt = () => {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  };

  /**
   * Получает координаты объекта.
   * @returns {object} - Объект с координатами x, y, width и height объекта.
   */
  getCoordinates = () => {
    const elementPosition = this.element.getBoundingClientRect(); // Получаем позицию элемента относительно окна браузера

    return {
      x: elementPosition.left, // Позиция x элемента относительно контейнера
      y: elementPosition.top, // Позиция y элемента относительно контейнера
      width: elementPosition.width, // Ширина элемента
      height: elementPosition.height, // Высота элемента
    };
  };
}
