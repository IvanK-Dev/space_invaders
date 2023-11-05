class ModalWindow {
  constructor(gameName, buttonText) {
    this.gameName = gameName;
    this.modal = null;
    this.buttonText = buttonText;
  }

  createModal() {
    // Создание модального окна
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    // Заголовок с названием игры
    const title = document.createElement('h1');
    title.textContent = this.gameName;

    // Кнопка "Старт"
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = this.buttonText;
    button.addEventListener('click', () => {
      this.closeModal();
      this.startGame();
    });

    this.modal.appendChild(title);
    this.modal.appendChild(button);

    return this.modal;
  }

  openModal() {
    if (!this.modal) {
      this.createModal();
    }

    document.body.appendChild(this.modal);
  }

  closeModal() {
    if (this.modal) {
      this.modal.remove();
    }
  }

  startGame() {
    // Реализация начала игры
    console.log('Игра началась!');
  }
}

// Пример использования:
const gameModal = new ModalWindow('Space Invaders');
gameModal.openModal();
