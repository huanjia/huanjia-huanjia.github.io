/**
 * @param {number} n
 * @return {number}
 */
let memb;

const numTrees = function(n) {
  memb = Array(n + 1).fill().map(() => Array(n + 1).fill(0));
  return count(1, n);
};

const count = function(lo, hi) {
  let res = 0;
  if (lo > hi) {
    return 1;
  }
  if (memb[lo][hi] !== 0) {
    return memb[lo][hi];
  }

  for (let i = lo; i <= hi; i++) {
    const left = count(lo, i - 1);
    const right = count(i + 1, hi);
    res += left * right;
  }
  memb[lo][hi] = res;
  return res;
}
// console.log(numTrees(3));
// console.log(numTrees(5));



const TreeNode = function(val) {
  this.val = val;
  this.left = this.right = null;
};

const generateTrees = function(n) {
  if (n === 0) {
    return null;
  }
  return build(1, n);
}

const build = function(lo, hi) {
  let res = [];
  if (lo > hi) {
    res.push(null);
    return res;
  }
  for (let i = lo; i <= hi; i++) {
    const leftTree = build(lo, i - 1);
    const rightTree = build(i + 1, hi);
    for (let m = 0; m < leftTree.length; m++) {
      for (let n = 0; n < rightTree.length; n++) {
        const root = new TreeNode(i);
        root.left = leftTree[m];
        root.right = rightTree[n];
        res.push(root);
      }
    }
  }
  return res;
}
// console.log(generateTrees(3));






















