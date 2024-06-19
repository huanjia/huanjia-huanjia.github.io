// 单调栈模板函数，从后开始遍历，比当前值还小，依次出栈栈顶元素，否则入栈。
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const nextGreaterElement = function(nums) {
  let res = [];
  let stack = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length !== 0 && stack[0] <= nums[i]) {
      stack.shift();
    }
    res[i] = stack[0] ? stack[0] : -1;
    stack.unshift(nums[i]);
  }
  return res;
};
// console.log(nextGreaterElement([2,1,2,4,3]));



/**
 * @param {number[]} nums
 * @return {number[]}
 */
const dailyTemperatures = function(nums) {
  let res = [];
  let stack = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length !== 0 && nums[stack[0]] <= nums[i]) {
      stack.shift();
    }
    res[i] = stack[0] ? stack[0] - i : 0;
    stack.unshift(i);
  }
  return res;
};
// console.log(dailyTemperatures([73,74,75,71,69,76]));



/**
 * @param {number[]} nums
 * @return {number[]}
 */
const nextGreaterElement2 = function(nums) {
  let res = [];
  let stack = [];
  const n = nums.length;
  // 数组长度翻倍，求模赋值
  for (let i = 2 * n - 1; i >= 0; i--) {
    while (stack.length !== 0 && stack[0] <= nums[i % n]) {
      stack.shift();
    }
    res[i % n] = stack[0] ? stack[0] : -1;
    stack.unshift(nums[i % n]);
  }
  return res;
};
console.log(nextGreaterElement2([2,1,2,4,3]));
















