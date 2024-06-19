// https://juejin.cn/post/6844903929705136141

function clone(target, map = new WeakMap()) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};

    if (map.get(target)) {
      return map.get(target);
    }

    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }

    return cloneTarget;
  } else {
    return target;
  }
}

var test = {
  a: 1,
  b: 2,
};
var obj = {
  a: {
    a1: "test",
  },
  b: {
    c: test,
  },
};
console.log(obj);
const objCopy = clone(obj);
objCopy.b.c.a = 2;
console.log(objCopy);
