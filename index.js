const snake = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 1],
]

const table = document.getElementById("board");
const rows = table.getElementsByTagName("tr");

for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  const row = rows[rowIndex];
  const cells = row.getElementsByTagName("td");
  for (let colIndex = 0; colIndex < cells.length; colIndex++) {
    if (snake[rowIndex][colIndex]) {
      const cell = cells[colIndex];
      cell.classList.add("black");
    }
  }
}