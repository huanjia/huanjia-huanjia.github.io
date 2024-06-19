// 记录已经使用过的字符,深度优先访问所有方案
function combine(str) {
  let result = [];
  (function _combine(str, path = '') {
    if (str.length === 0) {
      return result.push(path);
    }
    for (let i in str) {
      _combine(str.slice(0, i) + str.slice((+i) + 1, str.length), path + str[i]);
    }
  })(str);
  // 可能会出现类似"aa"=>[aa,aa,aa,aa]的情况,需要去重
  return [...new Set(result)];
}
console.log(combine('abcd'));



// 抽出一个字符s,对其余的进行排列,将s放在每种排列开头
function combine(str) {
  if (str.length === 1) {
    return [str];
  }
  let results = [];
  for (let i in str) {
    for (let s of combine(str.slice(0, i) + str.slice(1 + (+i)))) {
      results.push(str[i] + s);
    }
  }
  // 可能会出现类似"aa"=>[aa,aa,aa,aa]的情况,需要去重
  return [...new Set(results)];
}



