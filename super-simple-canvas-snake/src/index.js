import { Board } from "./board";
import { Game } from "./game";

const BOARD_SIZE = 10;
const SNAKE_SIZE = 10;

const game = new Game(BOARD_SIZE);
const board = new Board(game, BOARD_SIZE, SNAKE_SIZE);

(function gameLoop() {
  game.calculateNewSnake();
  if (game.hasSnakeEatenTheFood()) {
    game.calculateRandomFood();
  }

  if (!game.isGameOver()) {
    board.draw();
    setTimeout(gameLoop, 150);
  }
})();