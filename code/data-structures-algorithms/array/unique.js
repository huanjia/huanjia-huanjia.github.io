// 去除数组的重复成员
[...new Set(array)];



function unique(array) {
  return Array.from(new Set(array));
}

