import GameObject from '../js/GameObject.js';

/**
 * Создает объект взрыва для игровой сцены.
 *
 * @param {number} x - Координата по оси X, где должен отображаться взрыв.
 * @param {number} y - Координата по оси Y, где должен отображаться взрыв.
 * @param {number} width - Ширина объекта взрыва.
 * @param {number} height - Высота объекта взрыва.
 * @param {HTMLElement} container - Элемент-контейнер, в который будет добавлен объект взрыва.
 * @returns {GameObject} - Возвращает объект взрыва для игровой сцены.
 */
export const explosionObj = (x, y, width, height, container) => {
  const object = new GameObject(x, y, width, height, container);
  object.element.innerHTML = '<img src="/src/assets/boom.gif" alt="Boom"/>';
  object.element.classList.add('explosion');

  setTimeout(() => {
    object.removeElemnt();
  }, 700);

};
