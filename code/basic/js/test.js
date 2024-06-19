// let set = new Set(['yellow', 'blue', 'black']);

// for (let item of set.keys()) {
//   console.log(item);
// }

// for (let item of set.values()) {
//   console.log(item);
// }

// for (let item of set.entries()) {
//   console.log(item);
// }

// for (let item of set) {
//   console.log(item);
// }



const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}

const map = new Map([
  [ 'key1', 'val1',],
  [ 'key2', 'val2',],
  [ 'key3', 'val3',]
]);

console.log(map.size);

console.log([...map]);


// var obj = new Proxy({}, {
//   get(target, propKey, receiver) {
//     console.log(`getting ${propKey}`);
//     return Reflect.get(target, propKey, receiver);
//   },
//   set(target, propKey, value, receiver) {
//     console.log(`setting ${propKey}`);
//     return Reflect.set(target, propKey, value, receiver)
//   }
// });


// obj.count = 1;
// ++obj.count;



// var handler = {
//   get: function(target, name) {
//     if (name === 'prototype') {
//       return Object.prototype;
//     }
//     return 'Hello, ' + name;
//   },

//   apply: function(target, thisBinding, args) {
//     return args[0];
//   },

//   construct: function(target, args) {
//     return {value: args[1]};
//   }
// };

// var fproxy = new Proxy(function(x, y) {
//   return x + y;
// }, handler);

// fproxy(1, 2) // 1
// new fproxy(1, 2) // {value: 2}
// fproxy.prototype === Object.prototype // true
// fproxy.foo === "Hello, foo" // true



// var pipe = function(value) {
//   var funcStack = [];
//   var oproxy = new Proxy({} , {
//     get: function(pipeObject, fnName) {
//       if (fnName === 'get') {
//         return funcStack.reduce(function(val, fn) {
//           return fn(val);
//         }, value);
//       }
//       funcStack.push(window[fnName]);
//       return oproxy;
//     }
//   });

//   return oproxy;
// }

// var double = n => n * 2;
// var pow    = n => n * n;
// var reverseInt = n => n.toString().split("").reverse().join("") | 0;

// pipe(3).double.pow.reverseInt.get; // 63


const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);



// let validator = {
//   set: function(obj, prop, value) {
//     if (prop === 'age') {
//       if (!Number.isInteger(value)) {
//         throw new TypeError('The age is not an integer');
//       }
//       if (value > 200) {
//         throw new RangeError('The age seems invalid');
//       }
//     }

//     // 对于满足条件的 age 属性以及其他属性，直接保存
//     obj[prop] = value;
//   }
// };

// let person = new Proxy({}, validator);

// person.age = 100;

// person.age // 100
// person.age = 'young' // 报错
// person.age = 300 // 报错



// const handler = {
//   get (target, key) {
//     invariant(key, 'get');
//     return target[key];
//   },
//   set (target, key, value) {
//     invariant(key, 'set');
//     target[key] = value;
//     return true;
//   }
// };
// function invariant (key, action) {
//   console.log(key);
//   if (key[0] === '_') {
//     throw new Error(`Invalid attempt to ${action} private "${key}" property`);
//   }
// }
// const target = {};
// const proxy = new Proxy(target, handler);
// proxy._prop
// // Error: Invalid attempt to get private "_prop" property
// proxy._prop = 'c'
// // Error: Invalid attempt to set private "_prop" property



const sum = (left, right) => {
  return left + right;
}

const handler = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
}

var proxy = new Proxy(sum, handler);

console.log(proxy(1, 2));
console.log(proxy.call(null, 5, 6));
console.log(proxy.apply(null, [7, 8]));
console.log(Reflect.apply(proxy, null, [9, 10]));



// var handler = {
//   has(target, key) {
//     if (key[0] === '_') {
//       return false;
//     }
//     return key in target;
//   }
// };
// var target = { _prop: 'foo', prop: 'foo' };
// var proxy = new Proxy(target, handler);
// '_prop' in proxy // false



// const ages = [11, 33, 12, 54, 18, 96];

// // 旧写法
// const youngest = Math.min.apply(Math, ages);
// const oldest = Math.max.apply(Math, ages);
// const type = Object.prototype.toString.call(youngest);

// // 新写法
// const youngest = Reflect.apply(Math.min, Math, ages);
// const oldest = Reflect.apply(Math.max, Math, ages);
// const type = Reflect.apply(Object.prototype.toString, youngest, []);



const queuedObservers = new Set();
const observe = (fn) => {
  return queuedObservers.add(fn);
}
const observable = (obj) => {
  return new Proxy(obj, { set });
}

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach((observer) => {
    observer();
  });
  return result;
}

const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`print ${person.name}, ${person.age}`)
}

function logInfo() {
  console.log(`logInfo ${person.name}, ${person.age}`)
}

observe(print);
observe(logInfo);
person.name = '李四';
// 输出
// 李四, 20


