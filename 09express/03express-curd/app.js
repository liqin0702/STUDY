var express = require('express')

var app = express()

// 将node_modules和public两个文件夹内的资源都开放出来
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))



app.get('/', function (req, res) {
  res.render('index.html', {
    fruits:['苹果', '香蕉', '梨子', '橘子']
  })
})

app.listen(3000, function () {
  console.log('running')
})