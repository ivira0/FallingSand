//Falling Sand

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr.length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let w = 10;
let cols, rows;


let hueValue = 200;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function mouseDragged() {
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);

  if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
    grid[col][row] = hueValue;
  }
  hueValue += 0.25;
  if (hueValue > 360) {
    hueValue = 1;
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0) {
        let below = grid[i][j + 1];

        let dir = random([-1, 1]);

        let belowR, belowL;

        if (i + dir >= 0 && i + dir <= cols - 1) {
          belowR = grid[i + dir][j + 1];
        }
        if (i - dir >= 0 && i - dir <= cols - 1) {
          belowL = grid[i - dir][j + 1];
        }

        if (j === rows - 1) {
          nextGrid[i][j] = grid[i][j];
        } else if (below === 0) {
          nextGrid[i][j + 1] = grid[i][j];
        } else if (belowR === 0) {
          nextGrid[i + dir][j + 1] = grid[i][j];
        } else if (belowL === 0) {
          nextGrid[i - dir][j + 1] = grid[i][j];
        } else {
          nextGrid[i][j] = grid[i][j];
        }
      }
    }
  }
  grid = nextGrid;
}
