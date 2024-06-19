'use strict';

function CancelToken(executor) {
  var resolvePromise;
  this.promise = new Promise(function(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function(message) {
    console.log(message);
    token.reason = {
      message: message
    };
    resolvePromise(token.reason);
  });
}

CancelToken.prototype.throwError = function() {
  throw this.reason;
}

CancelToken.source = function() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

const source = CancelToken.source();
console.log(source);
source.cancel('cancel');
new Promise((resolve, reject) => {
  source.token.throwError();
}).then((res) => {
  console.log('res', res);
}).catch((e) => {
  console.log('error', e.message);
})