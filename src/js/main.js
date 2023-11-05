import ModalWindow from './ModalWindow.js';
import SpaceInvadersGame from './SpaceInvadersGame.js';

const game = new SpaceInvadersGame();
const modal=new ModalWindow()

modal.openModal('SpaceInvaders','Start',game.startGame)
