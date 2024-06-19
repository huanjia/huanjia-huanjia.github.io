//event.js 文件
var events = require('./events');
var emitter = new events();

emitter.on('someEvent', function(arg1, arg2) {
  console.log('listener1', arg1, arg2); 
});

emitter.on('someEvent', function(arg1, arg2) {
  console.log('listener2', arg1, arg2);
});

emitter.on('newListener', function(arg1) {
  console.log(arg1);
});

emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');