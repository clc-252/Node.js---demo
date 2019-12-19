// 引入模块
const fs = require('fs');
const path = require('path');

// 处理数据，并暴露
module.exports = {
  // 获取全部英雄的数据
  getAllHero(callback) {
    fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {
      // 如果获取错误，要把错误信息传输到控制器，再提示给用户
      if (err) return callback(err)
      callback(null, data)
    })
  }
}