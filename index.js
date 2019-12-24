const snake = [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 2],
];

const table = document.getElementById("board");
const rows = table.getElementsByTagName("tr");

for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  const row = rows[rowIndex];
  const cells = row.getElementsByTagName("td");
  for (let colIndex = 0; colIndex < cells.length; colIndex++) {
    const isSnakeCell = snake.some(c => c[0] === rowIndex && c[1] === colIndex);
    if (isSnakeCell) {
      const cell = cells[colIndex];
      cell.classList.add("black");
    }
  }
}