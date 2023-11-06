import { GAME_OPTIONS } from '../constants/game_options.js';

/**
 * Генерирует SVG-элементы, представляющие жизни игрока, в виде строки.
 *
 * @param {number} lifes - Количество жизней игрока.
 * @returns {string} - Строка, содержащая SVG-элементы, представляющие жизни игрока.
 */
export const setLifesHTML = (lifes) => {
  let str = '';

  for (let i = 0; i < lifes; i++) {
    str += `<svg width="${GAME_OPTIONS.lifes.width}" height="${GAME_OPTIONS.lifes.height}" >
      <use
        class="player__icon"
        href="${GAME_OPTIONS.lifes.imageHref}"
      ></use>
    </svg>`;
  }
  return str;
};
