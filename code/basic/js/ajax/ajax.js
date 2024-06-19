function ajax(method, url, params, async = true) {
  return new Promise((resolve, reject) => {
    method = method.toUpperCase();

    const xhr = new XMLHttpRequest();

    // 监听 statuschange
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          return resolve(xhr.statusText);
        } else {
          return reject({
            errorType: 'OnError',
            xhr: xhr
          });
        }
      }
    }

    // 超时
    xhr.ontimeout = function () {
      reject({
        errorType: "Timeout",
        xhr: xhr
      });
    };

    // 报错
    xhr.onerror = function () {
      reject({
        errorType: 'Onerror',
        xhr: xhr
      });
    };

    // 发送请求
    if (method === 'POST') {
      xhr.open(method, url, async);
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json"');
      xhr.send(JSON.parse(params));
    } else {
      let temp = [];
      for (const key in params) {
        temp.push(`${key}=${params[key]}`);
      }
      params = temp.join('&');
      xhr.open(method, `${url}?${params}`, async);
      xhr.send();
    }
  });
}