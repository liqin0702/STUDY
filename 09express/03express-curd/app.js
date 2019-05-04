const express = require('express')
const fs = require('fs')

const app = express()

// 将node_modules和public两个文件夹内的资源都开放出来
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

app.get('', (req, res) => {
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
app.listen(3000, () => {
  console.log('running')
})
