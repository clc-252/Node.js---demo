// 引入模块
const fs = require('fs');
const path = require('path');
// 引入moment模块
const moment = require('moment')

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
  },

  // 添加英雄
  addHeroInfo(hero, callback) {
    // 获取所有英雄的信息
    this.getAllHero((err, data) => {
      if (err) return callback(false);
      let heroArr = JSON.parse(data)
      // 添加的数据没有id和时间
      hero.date = moment().format('YYYY-MM-DD HH:mm:ss');
      // heroArr[heroArr.length - 1].id 这样得到的是一个字符串
      hero.id = +heroArr[heroArr.length - 1].id + 1;
      heroArr.push(hero);
      // console.log(heroArr);
      // 再重新写入到json文件中
      fs.writeFile(path.join(__dirname, './heros.json'), JSON.stringify(heroArr), err => {
        if (err) return callback(false);
        callback(true)
      })
    })
  },

  // 编辑英雄信息的方法
  editHeroInfo(hero, callback) {
    // 获取所有英雄的信息
    this.getAllHero((err, data) => {
      if (err) return callback(false)
      let heroArr = JSON.parse(data);
      hero.date = moment().format('YYYY-MM-DD HH:mm:ss');
      // 找到id和我们编辑的英雄信息匹配的那个数据
      heroArr.some((item, index) => {
        if (hero.id == item.id) {
          // 由于json文件无法只修改我们修改了的内容数据，所以需要把整条数据删除再重新写入
          heroArr.splice(index, 1, hero)
          return
        }
      })
      // 将数据重新写回json文件中
      fs.writeFile(path.join(__dirname, './heros.json'), JSON.stringify(heroArr), err => {
        if (err) return callback(false)
        callback(true)
      })
    })
  },

  // 删除英雄的方法
  deleteHeroInfo(id, callback) {
    // 获取所有英雄的信息
    this.getAllHero((err, data) => {
      if (err) return callback(false)
      // 获取成功之后
      let heroArr = JSON.parse(data)
      // 找到和我们想要删除的那个英雄相匹配的那条数据
      heroArr.some((item, index) => {
        if (id == item.id) {
          heroArr.splice(index, 1)
        }
      })
      // 将数据重新写入json文件
      fs.writeFile(path.join(__dirname, './heros.json'), JSON.stringify(heroArr), err => {
        if (err) return callback(false)
        callback(true)
      })
    })
  }
}