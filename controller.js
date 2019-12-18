// 不同的业务的处理逻辑不同，意味着我们需要些很多的方法来处理，我们对外需要暴露很多的方法，所以我们使用一个对象，将方法放在对象中，对位暴露这个对象就可以了

// 控制器模块：负责处理业务逻辑

// 引入模块
const fs = require('fs');
const path = require('path');

// 封装一个控制器函数，并暴露出去
module.exports = {
  //显示首页
  showIndexPage(req, res) {
    fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {
      if (err) return console.log(err.message);
      let herosData = JSON.parse(data);
      // 使用封装的函数
      res.render('index', {
        data: herosData
      })
    })
  },
  //显示添加页面
  showAddPage(req, res) {
    res.render('edit', {})
  },
  //显示编辑页面
  showEditPage(req, res) {
    res.render('add', {})
  },
  //显示详情页面
  showInfoPage(req, res) {
    res.render('info', {})
  },
  // 加载静态资源
  loadStaticResource(req, res) {
    fs.readFile(path.join(__dirname, req.pathname), (err, data) => {
      if (err) return console.log(err.message);
      if (req.pathname.endsWith('.css')) {
        res.writeHeader(200, {
          'Content-Type': 'text/css;charset=utf-8;'
        })
      }
      res.end(data)
    })
  }
}