/**
 * Получает координаты элемента относительно его контейнера.
 * @param {HTMLElement} element - Элемент, для которого нужно получить координаты.
 * @returns {Object} Объект с данными о позиции элемента.
 * @property {number} x - X-позиция элемента относительно его контейнера.
 * @property {number} y - Y-позиция элемента относительно его контейнера.
 * @property {number} width - Ширина элемента.
 * @property {number} height - Высота элемента.
 */
export const getElementCoordinates = (element) => {
  const elementPosition = element.getBoundingClientRect(); // Получаем позицию элемента относительно окна браузера

  const elementCoordinates = {
    x: elementPosition.left, // Позиция x элемента относительно контейнера
    y: elementPosition.top, // Позиция y элемента относительно контейнера
    width: elementPosition.width, // Ширина элемента
    height: elementPosition.height, // Высота элемента
  };
  
  return elementCoordinates;
};
