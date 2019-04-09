//像Apache一样的功能
var http = require('http')
var fs = require('fs')

var server = http.createServer()
var addr = '/home/liqin/sublimeProjects/08Nodejs/www'

server.on('request',function (req, res) {
  var url = req.url
  // 写法1
 /* if (url === '/') {
    fs.readFile(addr +'/index.html',function (err, data) {// 绝对路径
      if (err) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
  } else if (url === '/a.txt') {
     fs.readFile(addr+'/a.txt',function (err, data) {
      if (err) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
  } else if (url === '/index.html') {
     fs.readFile(addr + '/index.html',function (err, data) {
      if (err) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
   } else if (url === '/apple/login.html') {
       fs.readFile(addr + '/apple/login.html',function (err, data) {
      if (err) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
   }*/

   //写法2:比上一个写法简单
  /* if (url === '/') {
    fs.readFile(addr +'/index.html',function (err, data){
      if (err) {
        return res.end('404 Not Found')
      }
      res.end(data)
     }) // 绝对路径
   } else {
    fs.readFile(addr+url, function(err, data) {
      if (err) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
   }*/


    //写法3：最简单，推荐
    var fileAddr = '/index.html'
    if (url !== '/') {
      fileAddr = url
    }
    fs.readFile(addr + fileAddr, function (erro, data) {
      if (erro) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
  })

server.listen(3000,function () {
  console.log('sever running')
})
