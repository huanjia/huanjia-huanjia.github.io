// https://mp.weixin.qq.com/s/l1crHNCLOsDmLbeQ921sNQ
// https://mp.weixin.qq.com/s/OVwdmTu2ynho7x1DK4qVUg 这一篇更好，使用queueMicrotask实现微任务



class Promise {
  state = undefined;
  value = undefined;
  reason = undefined;
  onResolvedTodoList = [];
  onRejectedTodoList = [];
  
  // 接收excutor函数作为构造参数并立即调用，根据excutor函数形参约定进行实参传递。
  constructor(excutor) {
    try {
      excutor(this.resolve, this.reject);
      this.state = Promise.PENDING;
    } catch (e) {
      this.reject(e)
    }
  }
  
  // 写容器数据
  resolve = value => {
    if (this.state !== Promise.PENDING) {
      return;
    }
    this.state = Promise.RESOLVED;
    this.value = value;
    while (this.onResolvedTodoList.length) {
      this.onResolvedTodoList.shift()(value);
    }
  }

  // 写容器数据
  reject = reason => {
    if (this.state !== Promise.PENDING) {
      return;
    }
    this.state = Promise.RESOLVED;
    this.reason = reason;
    while (this.onRejectedTodoList.length) {
      this.onRejectedTodoList.shift()(reason);
    }
  }

  // 读容器数据
  then(onResolved, onRejected) {
    onResolved = onResolved ? onResolved : value => value;
    onRejected = onRejected ? onRejected : reason => { throw reason; };
    let promiseBack = new Promise((resolve, reject) => {
      switch (this.state) {
        case Promise.PENDING:
          this.onResolvedTodoList.push(() => {
            setTimeout(() => {
              try {
                const value = onResolved(this.value);
                resolvePromise(promiseBack, value, resolve, reject);
              } catch (e) {
                reject(e);
              }
            });
          });
  
          this.onRejectedTodoList.push(() => {
            setTimeout(() => {
              try {
                const value = onRejected(this.reason);
                resolvePromise(promiseBack, value, resolve, reject);
              } catch (e) {
                reject(e);
              }
            });
          });
          break;
  
        case Promise.RESOLVED:
          setTimeout(() => {
            try {
              const value = onResolved(this.value);
              resolvePromise(promiseBack, value, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
          break;
        
        case Promise.REJECTED:
          setTimeout(() => {
            try {
              const value = onRejected(this.reason);
              resolvePromise(promiseBack, value, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
          break;
      }
    });
    return promiseBack;
  }

  static all = (arr) => {
    const args = Array.prototype.slice.call(arr);

    return new Promise((resolve, reject) => {
      if (args.length === 0) {
        return resolve([]);
      }
      let remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            const { then } = val;
            if (typeof then === 'function') {
              then.call(val, (val) => {
                res(i, val);
              }, reject);
              return;
            }
          }

          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (error) {
          reject(error);
        }
      }

      for (let i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    })
  }
  static race = (values) => {
    return new Promise((resolve, reject) => {
      for (let i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  }
}

Promise.PENDING = 'pending';
Promise.RESOLVED = 'resolved';
Promise.REJECTED = 'rejected';

function resolvePromise(promiseBack, value, resolve, reject) {
  // 回调函数返回一个非promise容器对象，这时候回调函数基本上等同于外部构造新容器时传入该回调函数作为异步操作
  if (!(value instanceof Promise)) {
    resolve(value);
  } else {
    // 回调函数返回一个promise容器对象，非自身，新的promise接管这个回调函数返回的promise容器对象的状态和数据
    if (value !== promiseBack) {
      value.then(resolve, reject);
    } else {
      // 回调函数返回一个promise容器对象，并且是新容器自身，这时新的promise接管新的promise容器对象的状态和数据（无限套娃）
      reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
  }
}

// 外部定义excutor函数，约定形参resolve和reject
const p1 = new Promise((resolve, reject) => {
  // 外部决定什么时候写入容器数据，写入什么数据
  setTimeout(() => {
    resolve(1);
  });
});

const p2 = p1.then((value) => {
  console.log(value);
  // return 'p2';
}, (reason) => {
  console.log(reason);
});

p2.then((value) => {
  console.log('p2', value);
  // return 'p3';
}, (reason) => {
  console.log('p2', reason);
}).then((value) => {
  console.log('p3', value);
}, (reason) => {
  console.log('p3', reason);
});

const p3 = new Promise((resolve, reject) => {
  // 外部决定什么时候写入容器数据，写入什么数据
  setTimeout(() => {
    resolve('p3');
  }, 3000);
});

Promise.all([p1, p2, p3]).then((values) => {
  console.log('all', values);
});

Promise.race([p1, p2, p3]).then((values) => {
  console.log('race', values);
});
