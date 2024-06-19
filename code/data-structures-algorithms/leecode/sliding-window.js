https://mp.weixin.qq.com/s/ioKXTMZufDECBUwRRp3zaA

/* 滑动窗口算法框架 */
// const slidingWindow = function(s, t) {
//   let need = {};
//   let window = {};
//   for (let i = 0; i < t.length; i++) {
//     need[t.charAt(i)] = 1;
//   }

//   let left = 0;
//   let right = 0;
//   let valid = 0;
//   while (right < s.length) {
//     // c 是将移入窗口的字符
//     const c = s.charAt(right);
//     // 右移窗口
//     right++;
//     // 进行窗口内数据的一系列更新
//     // ...

//     /*** debug 输出的位置 ***/
//     console.log('left right', left, right);

//     // 判断左侧窗口是否要收缩
//     while (window needs shrink) {
//       // d 是将移出窗口的字符
//       const d = s.charAt(left);
//       // 左移窗口
//       left++;
//       // 进行窗口内数据的一系列更新
//       // ...
//     }

//   }
  
// }

const slidingWindow = function(s, t) {
  let need = {};
  let window = {};
  for (let i = 0; i < t.length; i++) {
    need[t.charAt(i)] = 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;
  // 记录最小覆盖子串的起始索引及长度
  let start = 0;
  let len = Number.MAX_SAFE_INTEGER;
  while (right < s.length) {
    // c 是将移入窗口的字符
    const c = s.charAt(right);
    // 右移窗口
    right++;
    // 进行窗口内数据的一系列更新
    if (need[c]) {
      window[c] = window[c] ? window[c] + 1 : 1;
      if (window[c] === need[c]) {
        valid++;
      }
    }

    /*** debug 输出的位置 ***/
    // console.log('left right', left, right);

    // 判断左侧窗口是否要收缩
    while (valid === Object.keys(need).length) {
      // 在这里更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      // d 是将移出窗口的字符
      const d = s.charAt(left);
      // 左移窗口
      left++;
      // 进行窗口内数据的一系列更新
      if (need[d]) {
        if (window[d] == need[d]) {
          valid--;
        }
        if (window[d]) {
          window[d] -= 1;
        }
      } 
    }

  }
  
  return len === Number.MAX_SAFE_INTEGER ? '' : s.substring(start, start + len);
}
console.log(slidingWindow('EBBANCFCBA', 'ABC'));



const checkInclusion = function(t, s) {
  let need = {};
  let window = {};
  for (let i = 0; i < t.length; i++) {
    need[t.charAt(i)] = 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;
  while (right < s.length) {
    // c 是将移入窗口的字符
    const c = s.charAt(right);
    // 右移窗口
    right++;
    // 进行窗口内数据的一系列更新
    if (need[c]) {
      window[c] = window[c] ? window[c] + 1 : 1;
      if (window[c] === need[c]) {
        valid++;
      }
    }

    /*** debug 输出的位置 ***/
    // console.log('left right', left, right);

    // 判断左侧窗口是否要收缩
    while (right - left >= t.length) {
      // 在这里更新最小覆盖子串
      if (valid === Object.keys(need).length) {
        return true;
      }

      // d 是将移出窗口的字符
      const d = s.charAt(left);
      // 左移窗口
      left++;
      // 进行窗口内数据的一系列更新
      if (need[d]) {
        if (window[d] == need[d]) {
          valid--;
        }
        if (window[d]) {
          window[d] -= 1;
        }
      } 
    }

  }
  
  return false;
}

console.log(checkInclusion('ab', 'eidbaooo'));
console.log(checkInclusion('ab', 'eidboaoo'));



const findAnagrams = function(s, t) {
  let need = {};
  let window = {};
  for (let i = 0; i < t.length; i++) {
    need[t.charAt(i)] = 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;

  let res = [];
  while (right < s.length) {
    // c 是将移入窗口的字符
    const c = s.charAt(right);
    // 右移窗口
    right++;
    // 进行窗口内数据的一系列更新
    if (need[c]) {
      window[c] = window[c] ? window[c] + 1 : 1;
      if (window[c] === need[c]) {
        valid++;
      }
    }

    /*** debug 输出的位置 ***/
    // console.log('left right', left, right);

    // 判断左侧窗口是否要收缩
    while (right - left >= t.length) {
      // 在这里更新最小覆盖子串
      if (valid === Object.keys(need).length) {
        res.push(left);
      }

      // d 是将移出窗口的字符
      const d = s.charAt(left);
      // 左移窗口
      left++;
      // 进行窗口内数据的一系列更新
      if (need[d]) {
        if (window[d] == need[d]) {
          valid--;
        }
        if (window[d]) {
          window[d] -= 1;
        }
      } 
    }

  }
  
  return res;
}

console.log(findAnagrams('cbaebabacd', 'abc'));



const lengthOfLongestSubstring = function(s) {
  let window = {};
  let left = 0;
  let right = 0;

  let res = 0;
  while (right < s.length) {
    // c 是将移入窗口的字符
    const c = s.charAt(right);
    // 右移窗口
    right++;
    // 进行窗口内数据的一系列更新
    window[c] = window[c] ? window[c] + 1 : 1;

    /*** debug 输出的位置 ***/
    // console.log('left right', left, right);

    // 判断左侧窗口是否要收缩
    while (window[c] > 1) {
      // d 是将移出窗口的字符
      const d = s.charAt(left);
      // 左移窗口
      left++;
      // 进行窗口内数据的一系列更新
      window[d]--;
    }
    res = Math.max(res, right - left);
  }

  return res;
}

console.log(lengthOfLongestSubstring('abcdabcbb'));
console.log(lengthOfLongestSubstring('bbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));
















































