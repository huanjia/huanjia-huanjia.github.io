// https://juejin.cn/post/6916317088521027598

function multiRequest(urls = [], maxNum) {
  const len = urls.length;
  const result = new Array(len).fill(false);
  let count = 0;

  return new Promise((resolve) => {
    while (count < maxNum) {
      next();
    }

    function next() {
      let current = count++;

      if (current >= len) {
        !result.includes(false) && resolve(result);
        return;
      }

      const url = urls[current];
      fetch(url).then((res) => {
        result[current] = res;

        next();
      }).catch((error) => {
        result[current] = error;
        next();
      })
      
    }
  });
}