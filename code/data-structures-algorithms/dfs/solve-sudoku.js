const m = 9;
const n = 9;
const solveSudoku = function(board) {
  backTrack(board, 0, 0);
  return board;
};

const backTrack = function(board, row, col) {
  if (col == n) {
    // 穷举到最后一列的话就换到下一行重新开始。
    backTrack(board, row + 1, 0);
  }
  if (row == m) {
    // 找到一个可行解，触发 base case
    return true;
  }

  for (let i = row; i < m; i++) {
    for (let j = col; j < n; j++) {
      if (board[i][j] != '.') {
        // 如果有预设数字，不用我们穷举
        return backTrack(board, i, j + 1);
      } 
      
      for (let char = 1; char <= 9; char++) {
        // 如果遇到不合法的数字，就跳过
        if (!isValid(board, i, j, char)) {
          continue;
        }

        board[i][j] = char;
        // 如果找到一个可行解，立即结束
        if (backTrack(board, i, j + 1)) {
          return true;
        }
        board[i][j] = '.';
      }
      // 穷举完 1~9，依然没有找到可行解，此路不通
      return false;
    }
  }
  return false;
};

// 判断 board[i][j] 是否可以填入 n
const isValid = function(board, r, c, n) {
  for (let i = 0; i < 9; i++) {
    // 判断行是否存在重复
    if (board[r][i] === n) {
      return false;
    }
    // 判断列是否存在重复
    if (board[i][c] === n) {
      return false;
    }
    // todo有bug没解决
    // 判断 3 x 3 方框是否存在重复
    if (board[(r / 3) * 3 + i / 3][(c / 3) * 3 + i % 3] === n) {
      return false;
    }
  }
  return true;
}

console.log(solveSudoku(Array(9).fill().map(() => Array(9).fill('.'))));