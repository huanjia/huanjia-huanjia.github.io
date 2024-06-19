function clone (target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};

    if (map.has(target)) {
      return map.get(target);
    }
    
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }

    return cloneTarget;
  } else {
    return target;
  }
}