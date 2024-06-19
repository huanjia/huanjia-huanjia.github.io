const http = require('http');

const express = () => {
  const funs = [];
  const app = (req, res) => {
    let i = 0;
    const next = () => {
      const middleware = funs[i++];
      if (!middleware) {
        return;
      }
      middleware(req, res, next);
    }

    next();
  }

  app.use = (middleware) => {
    funs.push(middleware);
  }

  return app;
}

const app = express();
http.createServer(app).listen(3000, () => {
  console.log('listening 3000');
});

const middlewareA = (req, res, next) => {
  console.log('A before');
  next();
  console.log('A after');
}

const middlewareB = (req, res, next) => {
  console.log('B before');
  next();
  console.log('B after');
}

const middlewareC = (req, res, next) => {
  console.log('C before');
  next();
  console.log('C after');
}

app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);