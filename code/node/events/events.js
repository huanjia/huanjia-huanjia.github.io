function EventEmitter() {
  //私有属性，保存订阅方法
  this._events = {};
}

//默认设置最大监听数
EventEmitter.defaultMaxListeners = 10;

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (type, listener, flag) {
  //保证存在实例属性
  if (!this._events) {
    this._events = Object.create(null);
  }

  if (this._events[type]) {
    if (flag) {//从头部插入
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }

  //绑定事件，触发newListener
  if (type !== 'newListener') {
    this.emit('newListener', type);
  }
};

EventEmitter.prototype.emit = function (type, ...args) {
  if (this._events[type]) {
    this._events[type].forEach(fn => fn.call(this, ...args));
  }
};

EventEmitter.prototype.once = function (type, listener) {
  let _this = this;

  //中间函数，在调用完之后立即删除订阅
  function only() {
    listener();
    _this.removeListener(type, only);
  }
  //origin保存原回调的引用，用于remove时的判断
  only.origin = listener;
  this.on(type, only);
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener = function (type, listener) {
  if (this._events[type]) {
    //过滤掉退订的方法，从数组中移除
    this._events[type] =this._events[type].filter(fn => {
      return fn !== listener && fn.origin !== listener;
    });
  }
};

EventEmitter.prototype.prependListener = function (type, listener) {
  this.on(type, listener, true);
};

module.exports = EventEmitter;