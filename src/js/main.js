import { gameEventHandler } from '../helpers/gameEventHandler.js';
import ModalWindow from './ModalWindow.js';
import SpaceInvadersGame from './SpaceInvadersGame.js';

const game = new SpaceInvadersGame();
const modal = new ModalWindow();
const startGame = async() => {
  game.startGame()

  await gameEventHandler(game).then((res) => {
    if (res > 0) {
      modal.openModal(`Level ${game.gameLevel}`, startGame);
    } else {
      modal.openModal(`Restart Game`, startGame);
    }
  });
  
};

modal.openModal('START', startGame);

