const Direction = Object.freeze({ "up": 1, "down": 2, "left": 3, "right": 4 })

const directionByKeyCode = {
  '37': Direction.left,
  '38': Direction.up,
  '39': Direction.right,
  '40': Direction.down,
}

const BOARD_SIZE = 10;
const BASE_SNAKE = [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 2],
];

function createBoard(size) {
  const table = document.getElementById("board");
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    const row = table.insertRow();
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      row.insertCell();
    }
  }
}

function draw(snake, food) {
  const table = document.getElementById("board");
  const rows = table.getElementsByTagName("tr");
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const cells = row.getElementsByTagName("td");
    for (let colIndex = 0; colIndex < cells.length; colIndex++) {
      const cell = cells[colIndex];
      const isSnakeCell = isPointInSnake([rowIndex, colIndex], snake);
      if (isSnakeCell) {
        cell.classList.add("snake");
      } else {
        cell.classList.remove("snake");
      }

      const isFoodCell = food[0] === rowIndex && food[1] === colIndex;
      if (isFoodCell) {
        cell.classList.add("food");
      } else {
        cell.classList.remove("food");
      }
    }
  }
}

function isPointInSnake(point, snake) {
  return snake.some(s => isSamePoint(s, point));
}

function isSamePoint(p1, p2) {
  return p1[0] === p2[0] && p1[1] === p2[1];
}

function calculateNewSnake(oldSnake, direction, food) {
  const oldHead = oldSnake[oldSnake.length - 1];

  let newHead;
  if (direction == Direction.up) {
    newHead = [oldHead[0] - 1, oldHead[1]];
  }
  else if (direction == Direction.down) {
    newHead = [oldHead[0] + 1, oldHead[1]];
  }
  else if (direction == Direction.left) {
    newHead = [oldHead[0], oldHead[1] - 1];
  }
  else if (direction == Direction.right) {
    newHead = [oldHead[0], oldHead[1] + 1];
  }

  const hasEaten = isSamePoint(food, newHead);

  return [...oldSnake.slice(hasEaten ? 0 : 1), newHead];
}

function captureSnakeMovements() {
  document.onkeydown = function checkKey(e) {
    e = e || window.event;

    const newDirection = directionByKeyCode[e.keyCode];
    if (newDirection) {
      setNewDirection(newDirection);
      e.preventDefault();
    }
  }

  function setNewDirection(newDirection) {
    const isOpositeDirection =
      (newDirection === Direction.up && direction === Direction.down)
      || (newDirection === Direction.down && direction === Direction.up)
      || (newDirection === Direction.left && direction === Direction.right)
      || (newDirection === Direction.right && direction === Direction.left);

    if (!isOpositeDirection) {
      direction = newDirection;
    }
  }
}

function isGameOver(snake) {
  const head = snake[snake.length - 1];

  return head[0] < 0
    || head[1] < 0
    || head[0] > BOARD_SIZE - 1
    || head[1] > BOARD_SIZE - 1
    || isPointInSnake(head, snake.slice(0, -1));
}

function getRandomPoint() {
  const food = [Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)];

  return isPointInSnake(food, snake) ? getRandomPoint() : food;
}

function hasSnakeEatenTheFood(snake, food) {
  const head = snake[snake.length - 1];
  return isSamePoint(food, head);
}

let snake = BASE_SNAKE;
let direction = Direction.right;
let food = getRandomPoint();
createBoard(BOARD_SIZE);
captureSnakeMovements();

(function gameLoop() {
  snake = calculateNewSnake(snake, direction, food);
  if (hasSnakeEatenTheFood(snake, food)) {
    food = getRandomPoint();
  }

  if (!isGameOver(snake)) {
    draw(snake, food);
    setTimeout(gameLoop, 150);
  }
})();