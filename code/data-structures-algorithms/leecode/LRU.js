/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.hash = {};
  this.mark = [];
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (this.hash[key]) {
    this.updateMark(key);
    return this.hash[key];
  } else {
    return -1;
  }
};

LRUCache.prototype.updateMark = function(key) {
  let index = this.mark.indexOf(key);
  if (index !== -1) {
    this.mark.splice(index, 1);
  }
  this.mark.push(key);
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (this.hash[key]) {
    this.hash[key] = value;
    this.updateMark(key);
    return;
  }
  
  if (Object.keys(this.hash).length < this.capacity) {
    this.updateMark(key);
    this.hash[key] = value;
  } else {
    delete this.hash[this.mark[0]];
    this.mark.shift();
    this.hash[key] = value;
    this.mark.push(key);
  }

};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */



// Map实现
var LRUCache = function (capacity) {
  this.cache = new Map();
  this.capacity = capacity;
};
LRUCache.prototype.get = function (key) {
  let cache = this.cache;
  if (cache.has(key)) {
    let temp = cache.get(key);
    cache.delete(key);
    cache.set(key, temp);
    return temp;
  } else {
    return -1;
  }
};
LRUCache.prototype.put = function (key, value) {
  let cache = this.cache;
  if (cache.has(key)) {
    cache.delete(key);
  } else if (cache.size >= this.capacity) {
    cache.delete(cache.keys().next().value);
  }
  cache.set(key, value);
};