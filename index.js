const Direction = Object.freeze({ "up": 1, "down": 2, "left": 3, "right": 4 })

const directionByKeyCode = {
  '37': Direction.left,
  '38': Direction.up,
  '39': Direction.right,
  '40': Direction.down,
}

const BOARD_SIZE = 50;
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

function drawSnake(snake) {
  const table = document.getElementById("board");
  const rows = table.getElementsByTagName("tr");
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const cells = row.getElementsByTagName("td");
    for (let colIndex = 0; colIndex < cells.length; colIndex++) {
      const cell = cells[colIndex];
      const isSnakeCell = snake.some(c => c[0] === rowIndex && c[1] === colIndex);
      if (isSnakeCell) {
        cell.classList.add("black");
      } else {
        cell.classList.remove("black");
      }
    }
  }
}

function calculateNewSnake(oldSnake, direction) {
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


  return [...oldSnake.slice(1), newHead];
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
    direction = newDirection;
  }
}

let snake = BASE_SNAKE;
let direction = Direction.right;

createBoard(BOARD_SIZE);
captureSnakeMovements();
setInterval(() => {
  snake = calculateNewSnake(snake, direction);
  drawSnake(snake);
}, 100);