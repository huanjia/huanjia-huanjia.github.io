const express = require('./my-express');

const app = express();
const port = 3000;

// 1
app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url);
  next();
  console.log('1请求结束...');
})
// 2
app.use((req, res, next) => {
  console.log('处理cookie...');
  req.cookie = {
    useId: "test"
  };
  next();
  console.log('2请求结束...');
})
// 3
app.use('/api', (req, res, next) => {
  console.log('处理/api路由');
  next();
  console.log('3请求结束...');
})
// 4
app.get('/api', (req, res, next) => {
  console.log('get /api路由');
  next();
  console.log('4请求结束...');
})

app.listen(port, () => {
  console.log(`server is running at ${port}`);
})
