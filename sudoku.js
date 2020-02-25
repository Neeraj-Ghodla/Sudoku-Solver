function makeBoard(board) {
  const table = document.querySelector("#table");
  table.innerHTML = "";

  for (let i = 0; i < board.length; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < board.length; j++) {
      let cell = document.createElement("td");
      let textCell = document.createElement("input");
      textCell.id = `(${i},${j})`;
      textCell.maxLength = "1";
      textCell.size = "1";
      textCell.style.textAlign = "center";
      textCell.style.fontSize = "1.5rem";
      textCell.type = "text";
      textCell.autocomplete = "off";

      if (i % 3 == 0) cell.classList.add("top");
      if (j % 3 == 0) cell.classList.add("left");

      if (i == 8) cell.classList.add("bottom");
      if (j == 8) cell.classList.add("right");

      textCell.style.border = "none";
      if (board[i][j] == 0) textCell.value = "";
      else textCell.value = board[i][j];
      cell.append(textCell);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function onChangeHandler(board) {
  for (let i  = 0; i < 9; i ++) {
    for (let j= 0 ; j < 9; j++) {
      document.getElementById(`(${i},${j})`).addEventListener('change', () => {board[i][j] = parseInt(document.getElementById(`(${i},${j})`).value)})
    }
  }
}

function isValid(board, row, col, value) {
  return (
    !chechRow(board, row, value) &&
    !checkCol(board, col, value) &&
    !checkBox(board, row, col, value)
  );
}
function chechRow(board, row, value) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] == value) {
      return true;
    }
  }
  return false;
}

function checkCol(board, col, value) {
  for (let i = 0; i < 9; i++) {
    if (board[i][col] == value) {
      return true;
    }
  }
  return false;
}

function checkBox(board, row, col, value) {
  let width = row - (row % 3);
  let height = col - (col % 3);

  for (let i = width; i < width + 3; i++) {
    for (let j = height; j < height + 3; j++) {
      if (board[i][j] == value) {
        return true;
      }
    }
  }
  return false;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function solveSudoku(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        for (let k = 1; k < 10; k++) {
          if (isValid(board, i, j, k)) {
            board[i][j] = k;
            document.getElementById(`(${i},${j})`).value = k;
            await sleep(10);
            if (await solveSudoku(board)) {
              return true;
            } else {
              board[i][j] = 0;
              document.getElementById(`(${i},${j})`).value = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

// let board = [
//   [5, 3, 0, 0, 7, 0, 0, 0, 0],
//   [6, 0, 0, 1, 9, 5, 0, 0, 0],
//   [0, 9, 8, 0, 0, 0, 0, 6, 0],
//   [8, 0, 0, 0, 6, 0, 0, 0, 3],
//   [4, 0, 0, 8, 0, 3, 0, 0, 1],
//   [7, 0, 0, 0, 2, 0, 0, 0, 6],
//   [0, 6, 0, 0, 0, 0, 2, 8, 0],
//   [0, 0, 0, 4, 1, 9, 0, 0, 5],
//   [0, 0, 0, 0, 8, 0, 0, 7, 9]
// ];

let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function run() {
  solveSudoku(board);
}

function reset() {
  for (let i =0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = 0;
    }
  }
  makeBoard(board);
  onChangeHandler(board);
}

makeBoard(board);
onChangeHandler(board);
