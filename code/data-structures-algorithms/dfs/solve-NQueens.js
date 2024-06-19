const res = [];

const solveNQueens = function(n) {
  const board = Array(n).fill().map(() => Array(n).fill('.'))
  backTrack(board, 0);
  return res;
};

const backTrack = function(board, row) {
  if (row === board.length) {
    console.log(board);
    res.push(JSON.parse(JSON.stringify(board)));
    return;
  }
  const n  = board[row].length;
  for (let col = 0; col < n; col++) {
    if (!isValid(board, row, col)) {
      continue;
    }
    board[row][col] = 'Q';
    backTrack(board, row + 1);
    board[row][col] = '.';
  }
};

const isValid = function(board, row, col) {
  const n = board.length;
  for (let i = 0; i < n; i++) {
    if (board[i][col] === 'Q') {
      return false;
    }
  }
  for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === 'Q') {
      return false;
    }
  }
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') {
      return false;
    }
  }

  return true;
};
console.log(solveNQueens(8));