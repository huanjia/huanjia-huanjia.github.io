const targetMap = new WeakMap();
let activeEffect = null; // 引入 activeEffect 变量

const effect = (eff) => {
  activeEffect = eff; // 1. 将副作用赋值给 activeEffect
  activeEffect(); // 2. 执行 activeEffect
  activeEffect = null; // 3. 重置 activeEffect
};

const track = (target, key) => {
  if (activeEffect) {
    // 1. 判断当前是否有 activeEffect
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect); // 2. 添加 activeEffect 依赖
  }
};

const trigger = (target, key) => {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
};

const reactive = (target) => {
  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue != result) {
        trigger(target, key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
};

let product = reactive({ price: 10, quantity: 2 });
let total = 0,
  salePrice = 0;
// 修改 effect 使用方式，将副作用作为参数传给 effect 方法
effect(() => {
  total = product.price * product.quantity;
});
effect(() => {
  salePrice = product.price * 0.9;
});
console.log(total, salePrice); // 20 9
product.quantity = 5;
console.log(total, salePrice); // 50 9
product.price = 20;
console.log(total, salePrice); // 100 18
