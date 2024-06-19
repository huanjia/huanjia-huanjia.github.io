// Does not work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) {
  (function() {
    var slice = Array.prototype.slice;
    Function.prototype.bind = function() {
      var thatFunc = this, thatArg = arguments[0];
      var args = slice.call(arguments, 1);
      if (typeof thatFunc !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }
      return function() {
        var funcArgs = args.concat(slice.call(arguments));
        return thatFunc.apply(thatArg, funcArgs);
      };
    };
  })();
}



//  Yes, it does work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) {
  (function(){
    var ArrayPrototypeSlice = Array.prototype.slice;
    Function.prototype.bind = function(otherThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }
  
      var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
          baseArgsLength = baseArgs.length,
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            baseArgs.length = baseArgsLength; // reset to default base arguments
            baseArgs.push.apply(baseArgs, arguments);
            return fToBind.apply(
                   fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
            );
          };

      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();
  
      return fBound;
    };
  })();
}



Function.prototype.myApply = function(context, args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}



Function.prototype.myCall = function(context, ...args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}



// 浏览器环境 非严格模式
function getGlobalObject() {
  return this;
}

function generateFunctionCode(argsArrayLength) {
  var code = 'return arguments[0][arguments[1]](';
  for (var i = 0; i < argsArrayLength; i++) {
    if (i > 0) {
      code += ',';
    }
    code += 'arguments[2][' + i + ']';
  }
  code += ')';
  return code;
}

Function.prototype.applyFn = function apply(thisArg, argsArray) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }
  if (typeof argsArray === 'undefined' || argsArray === null) {
    argsArray = [];
  }
  if (argsArray !== new Object(argsArray)) {
    throw new TypeError('CreateListFromArrayLike called on non-object');
  }
  if (typeof thisArg === 'undefined' || thisArg === null) {
    thisArg = getGlobalObject();
  }
  thisArg = new Object(thisArg);
  var __fn = '__' + new Date().getTime();
  var originalVal = thisArg[__fn];
  var hasOriginalVal = thisArg.hasOwnProperty(__fn);
  thisArg[__fn] = this;
  var code = generateFunctionCode(argsArray.length);
  var result = (new Function(code))(thisArg, __fn, argsArray);
  delete thisArg[__fn];
  if (hasOriginalVal) {
    thisArg[__fn] = originalVal;
  }
  return result;
};

Function.prototype.callFn = function call(thisArg) {
  var argsArray = [];
  var argumentsLength = arguments.length;
  for (var i = 0; i < argumentsLength - 1; i++){
    argsArray[i] = arguments[i + 1];
  }
  return this.applyFn(thisArg, argsArray);
}

