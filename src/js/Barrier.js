import { BARRIER_PROPS } from '../constants/barrier_props.js';
import GameObject from './GameObject.js';

/**
 * Представляет барьер, который защищает игрока от пуль.
 */
export default class Barrier extends GameObject {
  /**
   * Создает новый экземпляр барьера.
   * @param {number} x - Координата X барьера.
   * @param {number} y - Координата Y барьера.
   * @param {number} width - Ширина барьера.
   * @param {number} height - Высота барьера.
   * @param {HTMLElement} container - DOM-элемент, в котором размещается барьер.
   * @param {number} heightAbovePlayer - Высота барьера над игроком.
   */
  constructor(x, y, width, height, container, heightAbovePlayer) {
    super(x, y, width, height, container);
    /**
     * Высота барьера над игроком.
     * @type {number}
     */
    this.heightAbovePlayer = heightAbovePlayer;
    this.hpoint = BARRIER_PROPS.hpoint;
    this.addBarrierProps();
  }

  /**
   * Добавляет свойства барьера.
   */
  addBarrierProps = () => {
    this.y -= 2 * this.heightAbovePlayer;
    this.createElement()
    this.element.innerHTML=`<svg width="${this.width}" height="${this.height}" >
    <use
      class="player__icon"
      href="../src/assets/sprite.svg#barrier"
    ></use>
  </svg>`
    this.element.classList.add('barrier');
  };

  /**
   * Удаляет барьер из DOM.
   */
  removeBarrier = () => {
    this.element.remove();
    this.element = null;
  };
}
