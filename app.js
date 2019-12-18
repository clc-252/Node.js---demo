// 引入模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const template = require('art-template');
//在node中提供了一个url模块专门用来处理请求的路径相关的数据
const urlModel = require('url');

// 创建一个服务器对象
let app = http.createServer();

// 监听请求端口
app.listen(3000, () => {
  console.log('server is running at http://127.0.0.1:3000');
})

// 注册一个监听用户请求的事件
app.on('request', (req, res) => {
  let method = req.method;
  let url = req.url;
  let pathname = urlModel.parse(url, true).pathname;
  let query = urlModel.parse(url, true).query;

  if (method == 'GET' && (pathname == '/' || pathname == '/index' || pathname == '/index.html')) {
    // 读取首页的数据
    // fs.readFile(path.join(__dirname, './views/index.html'), (err, data) => {
    //   if (err) return console.log(err.message);
    //   res.end(data);
    // })
    // 模拟从数据库拿取数据
    fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {
      if (err) return console.log(err.message);
      let herosData = JSON.parse(data);
      let str = template(path.join(__dirname, './views/index.html'), {
        data: herosData
      });
      res.end(str)
    })
  } else if (method == 'GET' && (pathname == '/edit') || pathname == '/edit.html') {
    // 读取编辑页面的数据
    fs.readFile(path.join(__dirname, './views/edit.html'), (err, data) => {
      if (err) return console.log(err.message);
      res.end(data);
    })
  } else if (method == 'GET' && (pathname == '/add') || pathname == '/add.html') {
    // 读取添加页面的数据
    fs.readFile(path.join(__dirname, './views/add.html'), (err, data) => {
      if (err) return console.log(err.message);
      res.end(data);
    })
  } else if (method == 'GET' && (pathname == '/info') || pathname == '/info.html') {
    // 读取查看页面的数据
    fs.readFile(path.join(__dirname, './views/info.html'), (err, data) => {
      if (err) return console.log(err.message);
      res.end(data);
    })
  } else if (method == 'GET' && pathname == '/node_modules/bootstrap/dist/css/bootstrap.css') {
    fs.readFile(path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'), (err, data) => {
      if (err) return console.log(err.message);
      res.end(data);
    })
  } else if (method == 'GET' && pathname == '/node_modules/jquery/dist/jquery.js') {
    fs.readFile(path.join(__dirname, './node_modules/jquery/dist/jquery.js'), (err, data) => {
      if (err) return console.log(err.message);
      res.end(data);
    })
  } else {
    res.end('404');
  }
})