/**
 * Обрабатывает события уровня игры и завершения игры.
 *
 * @returns {Promise<number>} Возвращает промис с числовым значением, указывающим на уровень игры.
 */
export const gameEventHandler = async (game) => {
  return new Promise((resolve) => {
    const checkNextLevel = async () => {
      while (true) {
        if (game.nextLevelFlag) {
          console.log('NEXT LEVEL');
          resolve(game.gameLevel);
          break;
        }
        if (game.gameOverFlag) {
          resolve(0);
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Ожидание 1 секунды перед повторной проверкой
      }
    };
    checkNextLevel();
  });
};
