let memo;

const longestCommonSubsequence = function(s1, s2) {
  memo = Array(s1.length).fill().map(() => Array(s2.length).fill(-1));
  return dp(s1, 0, s2, 0);
};
const dp = function(s1, i, s2, j) {
  if (i === s1.length || j === s2.length) {
    return 0;
  }
  if (memo[i][j] !== -1) {
    return memo[i][j];
  }

  if (s1.charAt(i) === s2.charAt(j)) {
    memo[i][j] = 1 + dp(s1, i + 1, s2, j + 1);
  } else {
    memo[i][j] = Math.max(dp(s1, i + 1, s2, j), dp(s1, i, s2, j + 1));
  }
  return memo[i][j];
};
console.log(longestCommonSubsequence('zabcde', 'acez'));

const minDistance = function(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const lcs = longestCommonSubsequence(s1, s2);
  return m - lcs + n - lcs;
};
console.log(minDistance('sea', 'eat'));