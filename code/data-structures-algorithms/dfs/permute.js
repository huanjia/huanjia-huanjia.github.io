const res = [];

const permute = function(nums) {
  const track = [];
  backTrack(nums, track);
  return res;
};

const backTrack = function(nums, track) {
  if (track.length === nums.length) {
    res.push([...track]);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    let flag = false;
    for (let j = 0; j < track.length; j++) {
      if (track[j] === nums[i]) {
        flag = true;
      }
    }
    if (flag) {
      continue;
    }

    track.push(nums[i]);
    backTrack(nums, track);
    track.pop();
  }
};

console.log(permute([1,2,3]));