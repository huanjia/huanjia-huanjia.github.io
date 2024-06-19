// https://juejin.im/post/5c6f7342f265da2de04ab9ca

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(handler);
  }

  off(type, handler) {
    if (!this.events[type]) {
      return;
    }
    this.events[type] = this.events[type].filter((item) => {
      item !== handler;
    })
  }

  emit(type, ...args) {
    this.events[type].forEach((item) => {
      Reflect.apply(item, this, args);
    })
  }

  once(type, handler) {
    this.on(type, this._onceWrap(type, handler, this));
  }

  _onceWrap(type, handler, target) {
    const state = {
      fired: false,
      type,
      handler,
      target
    }
    const wrapFn = this._onceWrapper.bind(state);
    state.wrapFn = wrapFn;
    return wrapFn;
  }

  _onceWrapper(...args) {
    if (!this.fired) {
      this.fired = true;
      Reflect.apply(this.handler, this.target, args);
      this.target.off(this.type, this.wrapFn);
    }
  }

  addListener(type, handler) {
    this.on(type, handler);
  }

  removeListener(type, handler) {
    this.off(type, handler);
  }
}

// 初始化
const ee = new EventEmitter();

// 注册所有事件
ee.once('wakeUp', (name) => { console.log(`${name}起来`); });
ee.on('eat', (name) => { console.log(`${name}吃馒头`) });
ee.on('eat', (name) => { console.log(`${name}喝水`) });
const meetingFn = (name) => { console.log(`${name}开早会`) };
ee.on('work', meetingFn);
ee.on('work', (name) => { console.log(`${name}码代码`) });

ee.emit('wakeUp', 'EventEmitter');
ee.emit('wakeUp', 'EventEmitter');  // 第二次没有触发
ee.emit('eat', 'EventEmitter');
ee.emit('work', 'EventEmitter');
ee.off('work', meetingFn);  // 移除开会事件
ee.emit('work', 'EventEmitter');  // 再次工作