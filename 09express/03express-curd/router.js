/**
  * router.js路由模块
  * 职责：
  *   处理路由
  *   根据不同请求方法+请求路径设置具体的请求处理函数
  *  模块职责单一，不要乱写
  *  我们划分模块的目的就是增强代码的可维护性
  *  提升开发效率
  */
const fs = require('fs')

// 方法1：不使用express的路由方法时
// module.exports = (app) => {
//   app.get('', (req, res) => {
//     // 使用utf8后，不需要再将data转换为字符串了
//     fs.readFile('./db.json', 'utf8', (erro, data) => {
//       if (erro) {
//         return res.status(500).send('sever erro')
//       }
//       const { student } = JSON.parse(data)// 由于data是string类型，所以先要转化为json类型。这里使用了对象解构
//       res.render('index.html', { // 渲染模板
//         fruits: ['苹果1', '香蕉', '梨子', '橘子'],
//         students: student,
//       })
//       return true // 箭头函数规定最后一行必须要有个return
//     })
//   })
// }

// 方法2：使用express的路由方法时
// 此时，不需要使用module.exports的函数方法
const express = require('express')

const router = express.Router()

router.get('/student', (req, res) => {
  // 使用utf8后，不需要再将data转换为字符串了
  fs.readFile('./db.json', 'utf8', (erro, data) => {
    if (erro) {
      return res.status(500).send('sever erro')
    }
    const { student } = JSON.parse(data)// 由于data是string类型，所以先要转化为json类型。这里使用了对象解构
    res.render('index.html', { // 渲染模板
      fruits: ['苹果1', '香蕉', '梨子', '橘子'],
      students: student,
    })
    return true // 箭头函数规定最后一行必须要有个return
  })
})

router.get('/student/new', (req, res) => {
  res.render('new.html')
})

router.post('/student/new', (req, res) => {
  // 1.获取表单数据
  // 在app.js中配置body-parser
  console.log(req.body)

  // 2.处理数据，即持久化到db.json当中
  // 步骤：先把db.json文件读取出来

})

router.get('/student/edit', (req, res) => {

})

router.post('/student/edit', (req, res) => {

})

router.get('/student/delete', (req, res) => {

})
module.exports = router
