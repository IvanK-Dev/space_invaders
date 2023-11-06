import GameObject from './GameObject.js';

export class Gift extends GameObject {
  constructor(x, y, width, height, container, giftContent) {
    super(x, y, width, height, container);
    this.giftContent = giftContent;
    this.fallingSpeed = 2;

    this.createGift();
  }

  createGift = () => {
    this.createElement();
    this.element.classList.add('gift');

    this.element.innerHTML =`<p>${ this.giftContent}</p>`; // Устанавливаем тип подарка
    this.element.style.backgroundColor = 'red';

    this.updatePosition();
    this.updateGift()
  };

  move = () => {
    this.y += this.fallingSpeed;
    this.updatePosition();
  };

  updateGift=()=>{
    this.move();
    this.animationFrameId = requestAnimationFrame(this.updateGift);
  }
  
  removeGift=()=>{
    this.removeElemnt();
    cancelAnimationFrame(this.animationFrameId);

  }
}
