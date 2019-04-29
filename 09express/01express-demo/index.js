var express = require('express')

var app = express()

//只要这样做，就可以直接通过 /public/xx的方式访问public目录中的所有资源了
app.use('/public', express.static('./public/'))

app.get('/', function (req, res) {
  res.send('hello 1')
})

app.get('/about', function (req, res) {
  res.send('123')
})
app.listen(3000, function () {
  console.log('app is running')
})