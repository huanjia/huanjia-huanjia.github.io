const res = [];

const subsets = function(nums) {
  const track = [];
  backTrack(nums, 0, track);
  return res;
};

const backTrack = function(nums, start, track) {
  res.push([...track]);

  for (let i = start; i < nums.length; i++) {
    track.push(nums[i]);
    backTrack(nums, i + 1, track);
    track.pop();
  }
};

console.log(subsets([1,2,3]));