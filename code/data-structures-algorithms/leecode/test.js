const longestPalindromeSubseq = function(str) {
  const size = str.length;
  const dp = Array(size).fill().map(() => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
    dp[i][i] = 1;
  }

  for (let i = size - 1; i >= 0; i--) {
    for (let j = i + 1; j < size; j++) {
      if (str.charAt(i) === str.charAt(j)) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(
          dp[i + 1][j],
          dp[i][j - 1]
        );
      }
    }
  }

  return dp[0][size - 1];
};

console.log(longestPalindromeSubseq('aababbbbaba'));