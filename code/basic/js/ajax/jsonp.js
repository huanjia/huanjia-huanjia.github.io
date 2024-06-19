function jsonp(url, params, callback) {
  const funName = `JSONP_` + Date.now() + Math.random().toString().substr(2, 5);

  if (typeof params === 'object') {
    let temp = [];
    for (const key in params) {
      temp.push(`${key}=${params[key]}`);
    }
    params = temp.join('&');
  }

  const srcipt = document.createElement('script');
  srcipt.url = `${url}?${params}&callback=${funName}`;
  document.body.appendChild(srcipt);

  return new Promise((resovle, reject) => {
    const timer = setTimeout(() => {
      reject('Timeout');
    }, 2000);

    timer();

    window[funName] = (res) => {
      delete window[funName];
      document.body.removeChild(srcipt);
      resovle(res);
      clearTimeout(timer);
      timer = null;
    }
  
    srcipt.onerror = function() {
      delete window[funName];
      document.body.removeChild(srcipt);
      reject('Jsonp Error');
      clearTimeout(timer);
      timer = null;
    }
  })
}