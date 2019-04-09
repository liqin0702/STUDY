//Apache目录列表功能
// 问题1：如何得到wwwAddr下的目录内容，用readdir
// 问题2：如何将得到的目录内容加载到静态页面中去，客户端渲染(ajax等方法)、服务端渲染（暴力方法，模板渲染），这里选择服务端渲染

// 以下先使用暴力方法
// 步骤1，将template静态页面加载进来
// 步骤2，将template中需要替换的部分剪切并粘贴到当前页面，在被剪切的位置预留一个特殊标记
// 步骤3，将剪切的代码段，根据wwwAddr目录内容，进行代码拼接
// 步骤4，将特殊标记替换成拼接代码

var http = require('http')
var fs = require('fs')

var server = http.createServer()
var wwwAddr = '/home/liqin/sublimeProjects/08Nodejs/www'

server.on('request', function (req, res) {
  fs.readFile('./template.html', function (erro, data) { // 这是步骤1. 步骤2在另处完成
    if (erro) {
      return res.end('404 Not Found')
    }
    fs.readdir(wwwAddr, function (erro, files) {
      if (erro) {
        res.end('can\'t find www dir')
      }
      // console.log(files)
      var content = ''
      files.forEach(function (item) { //步骤3
        content += `
        <tr>
          <td data-value="apple/"><a class="icon dir" href="file:///home/liqin/sublimeProjects/08Nodejs/www/apple/">${item}/</a></td>
          <td class="detailsColumn" data-value="0"></td>
          <td class="detailsColumn" data-value="1554627255">2019/4/6 下午12:00:00</td>
        </tr>
        `
      })
      data = data.toString() // 由于默认是二进制，这里要转成字符串
      data = data.replace('@@@', content)  // 步骤4
      res.end(data) // 按照以往惯例，这一条语句应该写在下面那个括号的外面，但由于这里readdir是异步的，放在外面的话，这条语句会先于readdir这个函数体运行，会导致响应的结果仍然为没有更改过的template.html
    })
  })
})

server.listen(3000, function () {
  console.log('serving run')
})
