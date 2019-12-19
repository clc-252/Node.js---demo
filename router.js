//路由模块只负责路由的分发，不处理具体的业务

// 引入所需模块
const fs = require('fs');
const path = require('path');
//在node中提供了一个url模块专门用来处理请求的路径相关的数据
const urlModel = require('url');

// 引入控制器模块
let controller = require('./controller')

// 封装一个路由方法
function router(req, res) {
  let method = req.method;
  let url = req.url;
  let pathname = urlModel.parse(url, true).pathname;
  let query = urlModel.parse(url, true).query; // 可以获取到id
  // 把id信息挂载到res的query上
  req.query = query

  //相当于给req添加一个pathname的属性用来存储pathname的值
  req.pathname = pathname;

  if (method == 'GET' && (pathname == '/' || pathname == '/index' || pathname == '/index.html')) {
    // 读取首页的数据
    // fs.readFile(path.join(__dirname, './views/index.html'), (err, data) => {
    //   if (err) return console.log(err.message);
    //   res.end(data);
    // })

    // 模拟从数据库拿取数据
    // fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {
    //   if (err) return console.log(err.message);
    //   let herosData = JSON.parse(data);
    //   // let str = template(path.join(__dirname, './views/index.html'), {
    //   //   data: herosData
    //   // });
    //   // res.end(str)

    //   // 使用封装的函数
    //   res.render('index', {
    //     data: herosData
    //   })
    // })

    controller.showIndexPage(req, res);
  } else if (method == 'GET' && (pathname == '/edit') || pathname == '/edit.html') {
    // 读取编辑页面的数据
    // fs.readFile(path.join(__dirname, './views/edit.html'), (err, data) => {
    //   if (err) return console.log(err.message);
    //   res.end(data);
    // })

    // let str = template(path.join(__dirname, './views/edit.html'), {});
    // res.end(str)

    // res.render('edit', {})

    controller.showEditPage(req, res)
  } else if (method == 'GET' && (pathname == '/add') || pathname == '/add.html') {
    // 读取添加页面的数据
    // fs.readFile(path.join(__dirname, './views/add.html'), (err, data) => {
    //   if (err) return console.log(err.message);
    //   res.end(data);
    // })

    // let str = template(path.join(__dirname, './views/add.html'), {});
    // res.end(str)

    // res.render('add', {})

    controller.showAddPage(req, res)
  } else if (method == 'GET' && (pathname == '/info') || pathname == '/info.html') {
    // 读取查看页面的数据
    // fs.readFile(path.join(__dirname, './views/info.html'), (err, data) => {
    //   if (err) return console.log(err.message);
    //   res.end(data);
    // })

    // let str = template(path.join(__dirname, './views/info.html'), {});
    // res.end(str)

    // res.render('info', {})

    controller.showInfoPage(req, res);
  } else if (method == 'GET' && pathname.startsWith('/node_modules')) {
    // 如果是以/node_modules开头的，说明是要加载静态资源
    controller.loadStaticResource(req, res);
  } else {
    res.end('404');
  }
}

//暴露路由方法
module.exports = router;