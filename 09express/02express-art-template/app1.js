var express = require('express')

var app = express()

app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

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
  res.render('post.html')
})

app.get('/comment', function (req, res) {
  var dataObj = req.query //这里就相当于前面留言栏项目中使用的url核心模块，然后通过var url_module = require('url')，url_module.parse(url, true)命令后，得到一个对象，对象中有一个query属性，包含了要想要的数据。可见使用express框架，帮我们封装了很多命令
  comments.unshift(dataObj) //将评论数据插入对象中
  //写法1：原生写法
  // res.statusCode = 302 //重置状态码，302表示临时重定向
  // res.setHeader('Location', '/') // 重定向
  // res.send()

  //写法2
  res.redirect('/') //redirect也是express封装的方法
})

app.listen(3000, function () {
  console.log('running')
})