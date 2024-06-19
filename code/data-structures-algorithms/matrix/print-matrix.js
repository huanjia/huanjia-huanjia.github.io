// https://blog.csdn.net/julian_draxler/java/article/details/88254327

/* 
 * 每次取出数组的第一行放入输出数组中，随后执行一次数组旋转操作，把最后一列旋转至第一行。
 */
const printMatrix = (matrix) => {
  if (matrix === null) {
    return null;
  }
  let output = [];
  output.push(matrix.shift());
  while (matrix.length) {
    if (matrix[0].length > 1) {
      matrix = rotateMatrix(matrix);
    }
    output.push(matrix.shift());
  }
  return output;
};

// 逆时针旋转数组
const rotateMatrix = (matrix) => {
  let newMatrix = [];
  for (let j = matrix[0].length - 1; j >= 0; j--) {
    let tempMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      tempMatrix.push(matrix[i][j]);
    }
    newMatrix.push(tempMatrix);
  }
  return newMatrix;
};

const matrixArray = printMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
console.log('matrixArray', matrixArray);