const fs = require('fs');
let buf = Buffer.alloc(6); // 创建6字节长度的buf缓存对象

// 打开文件
fs.open('./open.txt', 'r', (err, fd) => {
  // 读取文件
  fs.read(fd, buf, 0, 3, 0, (err, bytesRead, buffer) => {
    console.log(bytesRead);
    console.log(buffer);

    // 继续读取
    fs.read(fd, buf, 3, 3, 3, (err, bytesRead, buffer) => {
      console.log(bytesRead);
      console.log(buffer);
      console.log(buffer.toString());
    });
  });
});