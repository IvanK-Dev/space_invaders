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
