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
  },

  // 获取单个英雄的信息
  getOneHero(id, callback) {
    // 先把所有英雄的信息读取出来
    this.getAllHero((err, data) => {
      if (err) return callback(err)
      // 然后再根据id找到那个英雄的信息
      let heroArr = JSON.parse(data)
      let obj;
      /*  Array.some(callback)
        some会遍历数组中的每个元素，让每个值都执行一遍callback函数
        如果有一个元素满足条件，返回true , 剩余的元素不会再执行检测。
        如果没有满足条件的元素，则返回false。
      */
      heroArr.some(item => {
        if (id == item.id) {
          // 把符合条件的数据存到obj里面
          obj = item;
        }
      })
      callback(null, obj);
    })
  }
}