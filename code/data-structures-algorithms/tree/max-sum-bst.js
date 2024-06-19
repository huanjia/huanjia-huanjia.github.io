const maxSum = 0;

const maxSumBST = function(root) {
  traverse(root);
  return maxSum;
};

const traverse = function(root) {
  if (root === null) {
    return [1, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 0];
  }

  const left = traverse(root.left);
  const right = traverse(root.right);

  const res = [];
  if (left[0] === 1 && right[0] === 1 && root.val > left[2] && root.val < right[1]) {
    res[0] = 1;
    res[1] = Math.min(left[1], root.val);
    res[2] = Math.max(right[2], root.val);
    res[3] = left[3] + right[3] + root.val;
    maxSum = Math.max(maxSum, res[3]);
  } else {
    res[0] = 0;
  }

  return res;
};



