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

function calculateNewSnake(oldSnake) {
  // just moving to the rigth for the moment...
  const oldHead = oldSnake[oldSnake.length - 1];
  const newHead = [oldHead[0], oldHead[1] + 1];

  return [...oldSnake.slice(1), newHead];
}

createBoard(BOARD_SIZE);

let snake = BASE_SNAKE;
setInterval(() => {
  snake = calculateNewSnake(snake);
  drawSnake(snake);
}, 1000);

