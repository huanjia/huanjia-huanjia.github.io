let memo;

const minimumDeleteSum = function(s1, s2) {
  memo = Array(s1.length).fill().map(() => Array(s2.length).fill(-1));
  return dp(s1, 0, s2, 0);
};
const dp = function(s1, i, s2, j) {
  let res = 0;
  // base case
  if (i == s1.length) {
    // 如果 s1 到头了，那么 s2 剩下的都得删除
    for (; j < s2.length; j++) {
      res += s2.charAt(j).charCodeAt();
    } 
    return res;
  }
  if (j == s2.length) {
    // 如果 s2 到头了，那么 s1 剩下的都得删除
    for (; i < s1.length; i++) {
      res += s1.charAt(i).charCodeAt();
    }  
    return res;
  }


  if (memo[i][j] !== -1) {
    return memo[i][j];
  }

  if (s1.charAt(i) === s2.charAt(j)) {
    memo[i][j] = dp(s1, i + 1, s2, j + 1);
  } else {
    memo[i][j] = Math.min(
      s1.charAt(i).charCodeAt() + dp(s1, i + 1, s2, j),
      s2.charAt(i).charCodeAt() + dp(s1, i, s2, j + 1)
    );
  }
  return memo[i][j];
};
console.log(minimumDeleteSum('eat', 'sea'));
