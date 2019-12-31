import { Direction, directionByKeyCode } from "./directions";

export class Board {
  constructor(game, boardSize, snakeSize) {
    this.game = game;
    this.boardSize = boardSize;
    this.snakeSize = snakeSize;
    const board = document.getElementById("board");
    board.height = this.snakeSize * this.boardSize;
    board.width = this.snakeSize * this.boardSize;

    document.onkeydown = this.captureSnakeMovements.bind(this);
  }

  draw() {
    const snake = this.game.snake;
    const food = this.game.food;
    const board = document.getElementById('board');
    const ctx = board.getContext('2d');

    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, board.height, board.width);

    // Draw snake
    snake.forEach(s => {
      const x = s[1] * this.snakeSize;
      const y = s[0] * this.snakeSize;
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, this.snakeSize, this.snakeSize);
    });

    //Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food[1] * this.snakeSize, food[0] * this.snakeSize, this.snakeSize, this.snakeSize);
  }

  captureSnakeMovements(e) {
    e = e || window.event;
    const newDirection = directionByKeyCode[e.keyCode];
    if (newDirection) {
      this.setNewDirection(newDirection);
      e.preventDefault();
    }
  }

  setNewDirection(newDirection) {
    const isOpositeDirection =
      (newDirection === Direction.up && this.game.direction === Direction.down)
      || (newDirection === Direction.down && this.game.direction === Direction.up)
      || (newDirection === Direction.left && this.game.direction === Direction.right)
      || (newDirection === Direction.right && this.game.direction === Direction.left);

    if (!isOpositeDirection) {
      this.game.direction = newDirection;
    }
  }
}