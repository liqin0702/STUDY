var http = require('http')

var server = http.createServer()

server.on('request', function(req, res) {
  var url = req.url
  console.log('收到请求了，请求路径是：' + url)
  // 写法1
  // res.write('hello ')
  // res.write('world')
  // res.end()

  //写法2
  if (url === '/') {
    res.end('index page世界')
  } else if (url === '/login') {
    res.end('login page')
  } else if (url === '/products') {
    var products = {
      phone:[
        {
          name: 'iphone X',
          price: '6888'
        },
        {
          name: 'iphone X plus',
          price: '7888'
        }
      ]
    }
    //响应内容只能是二进制数据或者字符串，所以下面数组products要转成字符串
    res.end(JSON.stringify(products))
  } else {
    res.end('404 Not Found.')
  }
})

server.listen(8889, function() {
  console.log('服务器启动成功，可以访问了')
})
