import GameObject from '../js/GameObject.js';

export const explosionObj = (x, y, width, height, container) => {
  const object = new GameObject(x, y, width, height, container);
  object.innerHTML = '<img src="/src/assets/boom.gif" alt="Boom"/>';
  return object;
};
