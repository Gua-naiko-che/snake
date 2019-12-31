import { Direction } from "./directions";

const BASE_SNAKE = [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 2],
];

export class Game {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.snake = BASE_SNAKE;
    this.direction = Direction.right;
    this.calculateRandomFood();
  }

  isGameOver() {
    const head = this.snake[this.snake.length - 1];

    return head[0] < 0
      || head[1] < 0
      || head[0] > this.boardSize - 1
      || head[1] > this.boardSize - 1
      || this.isPointInArray(head, this.snake.slice(0, -1));
  }

  calculateRandomFood() {
    const food = [Math.floor(Math.random() * this.boardSize), Math.floor(Math.random() * this.boardSize)];

    if (this.isPointInSnake(food)) {
      this.calculateRandomFood();
    } else {
      this.food = food;
    }
  }

  hasSnakeEatenTheFood() {
    const head = this.snake[this.snake.length - 1];
    return this.isSamePoint(this.food, head);
  }

  calculateNewSnake() {
    const oldHead = this.snake[this.snake.length - 1];

    let newHead;
    if (this.direction == Direction.up) {
      newHead = [oldHead[0] - 1, oldHead[1]];
    }
    else if (this.direction == Direction.down) {
      newHead = [oldHead[0] + 1, oldHead[1]];
    }
    else if (this.direction == Direction.left) {
      newHead = [oldHead[0], oldHead[1] - 1];
    }
    else if (this.direction == Direction.right) {
      newHead = [oldHead[0], oldHead[1] + 1];
    }

    const hasEaten = this.isSamePoint(this.food, newHead);

    this.snake = [...this.snake.slice(hasEaten ? 0 : 1), newHead];
  }

  isPointInSnake(point) {
    return this.isPointInArray(point, this.snake);
  }

  isPointInArray(point, array) {
    return array.some(s => this.isSamePoint(s, point));
  }


  isSamePoint(p1, p2) {
    return p1[0] === p2[0] && p1[1] === p2[1];
  }
}