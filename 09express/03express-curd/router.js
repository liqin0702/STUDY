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
const Student = require('./student.js') // 加载student模块,这里面封装了一些操作

const router = express.Router()

router.get('/student', (req, res) => {
/*  // 使用utf8后，不需要再将data转换为字符串了
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
  */

  // 以上方法是使用封装前的方法，现在使用封装后的方法
  Student.find((erro, student) => {
    if (erro) return res.status(500).send('sever erro')
    res.render('index.html', { // 渲染模板
      fruits: ['苹果1', '香蕉', '梨子', '橘子'],
      students: student,
    })
    return true
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
  // 步骤：先把db.json文件读取出来->转成对象->往对象中push->转成字符串->把字符串再次写入文件
  Student.save(req.body, (erro) => {
    if (erro) return res.status(500).send('sever erro')
    res.redirect('/student')
    return true
  })
})

// 渲染编辑学生页面
router.get('/student/edit', (req, res) => {
  // 1.在客户端的列表页中处理链接问题（需要有id参数）
  // 2.获取要编辑的学生id
  // 3.渲染编辑页面
  Student.findById(parseInt(req.query.id, 10), (erro, student) => {
    if (erro) return res.status(500).send('sever erro')
    console.log(student)
    res.render('edit.html', {
      students: student,
    })
    return true
  })
})

// 处理编辑学生
router.post('/student/edit', (req, res) => {

})

// 处理删除学生
router.get('/student/delete', (req, res) => {

})
module.exports = router
