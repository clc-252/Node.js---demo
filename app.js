// 引入模块
const http = require('http');
const template = require('art-template');


// 引入bindRender用户模块
let bindRender = require('./bindRender');
// 引入router用户模块
let router = require('./router');

// 创建一个服务器对象
let app = http.createServer();

// 监听请求端口
app.listen(3000, () => {
  console.log('server is running at http://127.0.0.1:3000');
})

// 注册一个监听用户请求的事件
app.on('request', (req, res) => {
  // 需要先调用bindRender
  bindRender(req, res);

  // 调用路由方法
  router(req, res);
})