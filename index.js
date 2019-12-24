const snake1 = [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 2],
];

const snake2 = [
  [0, 0],
  [1, 0],
  [1, 1],
  [2, 1],
  [2, 2],
];

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

let flag = false;

setInterval(() => {
  const snake = flag ? snake1 : snake2;
  flag = !flag;
  drawSnake(snake);
}, 1000);