import { Board } from "./board";
import { Game } from "./game";

const BOARD_SIZE = 10;
const SNAKE_SIZE = 10;
const SNAKE_SPEED = 150;

const game = new Game(BOARD_SIZE);
const board = new Board(game, BOARD_SIZE, SNAKE_SIZE);

(function gameLoop() {
  game.update();

  if (!game.isGameOver()) {
    board.draw();
    setTimeout(gameLoop, SNAKE_SPEED);
  }
})();