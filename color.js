const colorGrid = document.querySelector('.color-grid');
const numRows = 10;
const numCols = 10;
let grid = [];

// color generation
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// initializing grid with colors
for (let i = 0; i < numRows; i++) {
  let row = [];
  const tr = document.createElement('tr');

  for (let j = 0; j < numCols; j++) {
    const cell = document.createElement('td');
    cell.classList.add('color-cell');

    const color = getRandomColor();
    cell.style.backgroundColor = color;
    row.push(color);
    tr.appendChild(cell);
  }

  grid.push(row);
  colorGrid.appendChild(tr);
}

// Adding event listener to the grid
colorGrid.addEventListener('click', (event) => {
  const selectedCell = colorGrid.querySelector('.selected');
  if (selectedCell) {
    selectedCell.classList.remove('selected');
  }
  if (event.target.matches('.color-cell')) {
    event.target.classList.add('selected');
  }
});

// Flood fill algo
function floodFill(row, col, newColor, oldColor) {
  if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
    return;
  }

  const cell = colorGrid.rows[row].cells[col];
  const color = grid[row][col];

  if (color !== oldColor || color === newColor) {
    return;
  }

  cell.style.backgroundColor = newColor;
  grid[row][col] = newColor;

  floodFill(row - 1, col, newColor, oldColor); //  up
  floodFill(row + 1, col, newColor, oldColor); //  down
  floodFill(row, col - 1, newColor, oldColor); //  left
  floodFill(row, col + 1, newColor, oldColor); //  right
}

// choosing color
const colorCells = document.querySelectorAll('.pick-color-cell');
let customColor;

colorCells.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    customColor = event.target.getAttribute('bgcolor');
    console.log('Selected color:', customColor);

    const selectedCell = colorGrid.querySelector('.selected');
    if (selectedCell) {
      const rowIndex = selectedCell.parentNode.rowIndex;
      const colIndex = selectedCell.cellIndex;
      const oldColor = grid[rowIndex][colIndex];
      floodFill(rowIndex, colIndex, customColor, oldColor);
    }
  });
});
