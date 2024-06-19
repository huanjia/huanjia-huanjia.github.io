var LFUCache = function(capacity) {
  this.capacity = capacity;
  this.map = {}; // key: { value: "value", freq: 1 }
  this.freqMap = {}; // freq: [key1, key2, key3]
};

LFUCache.prototype.get = function(key) {
  let r = -1;
  if (typeof this.map[key] !== "undefined") {
    let o = this.map[key];
    r = o.value;
    // 更新频率记录
    this.updateL(key, o);
  }
  return r;
};

LFUCache.prototype.updateL = function(key, obj) {
  let freq = obj.freq;
  let arr = this.freqMap[freq];
  // 删除原频率记录
  this.freqMap[freq].splice(arr.indexOf(key), 1);
  // 清理
  if (this.freqMap[freq].length === 0) {
    delete this.freqMap[freq];
  }
  // 更新频率
  freq = obj.freq = obj.freq + 1;
  if (!this.freqMap[freq]) {
    this.freqMap[freq] = [];
  }
  this.freqMap[freq].push(key);
};

LFUCache.prototype.set = function(key, value) {
  if (this.capacity <= 0) {
    return;
  }
  if (typeof key === "undefined" || typeof value === "undefined") {
    throw new Error('key or value is undefined');
  }

  // 存在则直接更新
  if (typeof this.map[key] === "undefined") {
    // 获取频率 key
    // 判断容量是否满
    if (Object.keys(this.map).length === this.capacity) {
      let fkeys = Object.keys(this.freqMap);
      let freq = fkeys[0];
      // 获取key集合
      let keys = this.freqMap[freq];
      // 淘汰首位
      delete this.map[keys.shift()]; 
      // delete this.map[keys[0]];
      // keys.splice(0, 1);
      // 清理
      if (this.freqMap[freq].length === 0) {
        delete this.freqMap[freq];
      }
    }

    // 频率记录是否存在
    if (!this.freqMap[1]) {
      this.freqMap[1] = [];
    }

    // 插入新值
    this.freqMap[1].push(key);
    this.map[key] = {
      value: value,
      freq: 1 // 默认的频率
    };
  } else {
    this.map[key].value = value;
    // 更新频率记录
    this.updateL(key, this.map[key]);
  }
};