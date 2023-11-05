export default class ModalWindow {
  constructor() {
    this.buttonText = null;
    this.buttonFunction = null;
    this.modal = null;
  }

  createModal = () => {
    // Создание модального окна
    this.modal = document.createElement('div');
    
    this.modal.classList.add('modal');

    // Заголовок с названием игры
   // const title = document.createElement('h1');
    //title.textContent = this.gameName;

    //this.modal.appendChild(title);
    this.createButton();
    return this.modal;
  };

  createButton = () => {
    // Кнопка
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('modal__button');
    button.textContent = this.buttonText;
    button.addEventListener('click', () => {
      this.closeModal();
      this.buttonFunction();
    });
    this.modal.appendChild(button);
  };

  openModal = (gameName, buttonText, buttonFunction) => {
    if (!this.modal) {
      this.gameName = gameName;
      this.buttonText = buttonText;
      this.buttonFunction = buttonFunction;

      this.createModal();
    }

    document.body.appendChild(this.modal);
  };

  closeModal = () => {
    if (this.modal) {
      this.modal.remove();
    }
  };
}
