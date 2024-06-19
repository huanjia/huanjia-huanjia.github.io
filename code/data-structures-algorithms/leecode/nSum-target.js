// https://mp.weixin.qq.com/s/fSyJVvggxHq28a0SdmZm6Q

var twoSumTarget = function(nums, start, target) {
  // nums.sort();

  let lo = start;
  let hi = nums.length - 1;
  let res = [];
  while (lo < hi) {
    const sum = nums[lo] + nums[hi];
    const left  = nums[lo];
    const right = nums[hi];
    if (sum > target) {
      while (lo < hi && nums[hi] === right) {
        hi--;
      }
    } else if (sum < target) {
      while (lo < hi && nums[lo] === left) {
        lo++;
      }
    } else {
      res.push([left, right]);
      while (lo < hi && nums[lo] === left) {
        lo++;
      }
      while (lo < hi && nums[hi] === right) {
        hi--;
      }
    }
  }
  return res;
};
// console.log(twoSumTarget([1,3,1,2,2,3], 0, 4));



var threeSum = function(nums) {
  return threeSumTarget(nums, 0, 0);
};
var threeSumTarget = function(nums, start, target) {
  // nums.sort();

  const n = nums.length;
  let res = [];
  for (let i = start; i < n; i++) {
    const tuples = twoSumTarget(nums, i + 1, target - nums[i]);
    for (let j = 0; j < tuples.length; j++) {
      tuples[j].push(nums[i]);
      res.push(tuples[j]);
    }
    while (i < n - 1 && nums[i] === nums[i + 1]) {
      i++;
    }
  }

  return res;
};
// console.log(threeSum([-1,0,1,2,-1,4]));
// console.log(threeSumTarget([-1,0,1,2,-1,4,0,0], 0, -1));



var fourSum = function(nums) {
  return fourSumTarget(nums, 0, 0);
};
var fourSumTarget = function(nums, start, target) {
  nums.sort();

  const n = nums.length;
  let res = [];
  for (let i = start; i < n; i++) {
    const tuples = threeSumTarget(nums, i + 1, target - nums[i]);
    for (let j = 0; j < tuples.length; j++) {
      tuples[j].push(nums[i]);
      res.push(tuples[j]);
    }
    while (i < n - 1 && nums[i] === nums[i + 1]) {
      i++;
    }
  }

  return res;
};
// console.log(fourSum([1,0,-1,0,-2,2]));



var nSumTarget = function(nums, n, start, target) {
  nums.sort();
  const len = nums.length;

  let res = [];
  if (n < 2 || len < n) {
    return res;
  }

  if (n === 2) {
    let lo = start;
    let hi = len - 1;
    while (lo < hi) {
      const sum = nums[lo] + nums[hi];
      const left = nums[lo];
      const right = nums[hi];
      if (sum > target) {
        while (lo < hi && nums[hi] === right) {
          hi--;
        }
      } else if (sum < target) {
        while (lo < hi && nums[lo] === left) {
          lo++;
        }
      } else {
        res.push([left, right]);
        while (lo < hi && nums[lo] === left) {
          lo++;
        }
        while (lo < hi && nums[hi] === right) {
          hi--;
        }
      }
    }
  } else {
    for (let i = start; i < len; i++) {
      let sub = nSumTarget(nums, n - 1, i + 1, target - nums[i]);
      for (let j = 0; j < sub.length; j++) {
        sub[j].push(nums[i]);
        res.push(sub[j]);
      }
      while (i < len - 1 && nums[i] === nums[i + 1]) {
        i++;
      }
    }
  }

  return res;
};
// console.log(nSumTarget([1,0,-1,0,-2,2], 4, 0, 0));






