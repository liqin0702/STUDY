//Apache目录列表功能

var http = require('http')
var fs = require('fs')
//使用art-template模板引擎
var template = require('art-template')


// 问题1：如何得到wwwAddr下的目录内容，用readdir
// 问题2：如何将得到的目录内容加载到静态页面中去，客户端渲染(ajax等方法)、服务端渲染（暴力方法，模板渲染），这里选择服务端渲染

// 使用模板渲染方法
// 步骤1，将template1静态页面加载进来
// 步骤2，将template1中需要动态加载数据的部分，用模板语法写好
// 步骤3，利用template.render，进行代码替换



var server = http.createServer()
var wwwAddr = '/home/liqin/sublimeProjects/08Nodejs/www'

server.on('request', function (req, res) {
  fs.readFile('./template1.html', function (erro, data) { // 这是步骤1. 步骤2在另处完成
    if (erro) {
      return res.end('404 Not Found')
    }
    fs.readdir(wwwAddr, function (erro, files) {
      if (erro) {
        res.end('can\'t find www dir')
      }
      var htmlStr = template.render(data.toString(), {  //步骤3
        files: files
      })
      res.end(htmlStr)
    })
  })
})

server.listen(3000, function () {
  console.log('serving run')
})

