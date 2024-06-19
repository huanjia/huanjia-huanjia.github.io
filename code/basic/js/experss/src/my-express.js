const http = require('http');
const slice = Array.prototype.slice;

class MyExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [],
      get: [],
      post: [],
    };
  }

  register(path) {
    const info = {};
    // 如果第一个参数是路由
    if (typeof path === "string") {
      info.path = path;
      // 从第二个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 1); // 取出第二个参数
    } else {
      // 如果第一个参数不是路由，则默认是根路由，则全部路由都会执行
      info.path = '/';
      // 从第一个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }

  use() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  match(method, url) {
    let stack = [];
    // 浏览器自带的icon请求
    if (url === "/favicon") {
      return stack;
    }

    // 获取routes
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all);
    curRoutes = curRoutes.concat(this.routes[method]); // 根据请求方法获取对应路由
    curRoutes.forEach(route => {
      if (url.indexOf(route.path) === 0) {
        // 判断是否属于当前路由或子路由
        stack = stack.concat(route.stack);
      }
    })
    return stack;
  }

  // 核心的next机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift();
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next);
      }
    }
    // 立马执行
    next();
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(data));
      };
      const url = req.url;
      const method = req.method.toLowerCase();
      // 根据方法区分哪些函数需要执行
      const resultList = this.match(method, url);
      this.handle(req, res, resultList);
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = () => {
  return new MyExpress();
}
