// 使用post方法

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

// 配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var comments = [ //这些数据放在哪？
{name:'zs1', msg:'hello', time:'2019.4.9'},
{name:'zs2', msg:'hello', time:'2019.4.9'},
{name:'zs3', msg:'hello', time:'2019.4.9'},
{name:'zs4', msg:'hello', time:'2019.4.9'},
{name:'zs5', msg:'hello', time:'2019.4.9'},
{name:'zs6', msg:'hello', time:'2019.4.9'},
]

app.get('/', function (req, res) {

  res.render('index.html', {
    comments:comments
  })
})
app.get('/post', function (req, res) {
  res.render('post2.html')
})

// post方法
app.post('/post', function (req, res) {
  console.log(req.body)
  var dataObj = req.body
  comments.unshift(dataObj) //将评论数据插入对象中
  res.redirect('/') //redirect也是express封装的方法
})

app.listen(3000, function () {
  console.log('running')
})