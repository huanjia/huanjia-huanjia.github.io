const res = [];

const combine = function(n, k) {
  const track = [];
  backTrack(n, k, 1, track);
  return res;
};

const backTrack = function(n, k, start, track) {
  if (track.length === k) {
    res.push([...track]);
    return;
  }

  for (let i = start; i <= n; i++) {
    track.push(i);
    backTrack(n, k, i + 1, track);
    track.pop();
  }
};

console.log(combine(4, 2));