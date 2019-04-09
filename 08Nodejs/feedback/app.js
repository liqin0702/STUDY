/*步骤：1.请求/，响应主页index.html
       2.开放/public中的资源,当请求/public中的资源时，读取响应具体资源
       3.请求/post，响应post.html
       4.请求/comment
          4.1 接收表单提交数据
          4.2 存储表单提交数据
          4.3 重定向：res.statusCode =302
                    res.setHeader('location', '/')
*/

var fs = require('fs')
var http = require('http')
var template = require('art-template')
var url_module = require('url') // url模块

var comments = [ //这些数据放在哪？
{name:'zs1', msg:'hello', time:'2019.4.9'},
{name:'zs2', msg:'hello', time:'2019.4.9'},
{name:'zs3', msg:'hello', time:'2019.4.9'},
{name:'zs4', msg:'hello', time:'2019.4.9'},
{name:'zs5', msg:'hello', time:'2019.4.9'},
{name:'zs6', msg:'hello', time:'2019.4.9'},
]

//http://127.0.0.1:3000/comment?name=12312&msg=1231234
//对于这种表单提交的请求路径，由于其中具有用户动态填写的内容，所以你不能够通过判断完整的url路径来处理这个请求
// 所以只需要判定，如果你的请求路径是/comment时，那我就认为你提交表单的请求过来了

http.createServer(function (req, res) {
  /*注意：1.req.url包含端口号后的所有内容，
  比如一个请求是http://127.0.0.1:3000/comment?name=12312312&msg=123123123,
  那么req.url = /comment?name=12312312&msg=123123123
  而使用url核心模块，经过命令url_module.parse(url, true)后，将得到一个对象，其内容为
  Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=12312312&msg=123123123',
  query: { name: '12312312', msg: '123123123' },
  pathname: '/comment',
  path: '/comment?name=12312312&msg=123123123',
  href: '/comment?name=12312312&msg=123123123' }
  可以看到其中属性pathname就是url地址中的目录地址，而query就把请求的数据封装成了一个对象，便于操作
  */
  var url = req.url
  var parseUrl = url_module.parse(url, true)

  if (url === '/') {
    fs.readFile('./views/index.html', function (erro, data) {
      if (erro) {
        return res.end('404 Not Found')
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      })
      res.end(htmlStr)
    })
  } else if (url === '/post') {
    fs.readFile('./views/post.html', function (erro, data) {
      if (erro) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
  } else if (parseUrl.pathname === '/comment') { //这里也可以用url.indexOf('/comment') === 0来判断地址是否有comment
    var dataObj = parseUrl.query // 获得表单数据
    dataObj.time = '2019-4-9'
    comments.unshift(dataObj)
    // 状态码302临时重定向，301永久重定向：statusCode
    // 响应头中通过Location，告诉客户端往哪重定向：setHeader
    res.statusCode =302
    res.setHeader('location', '/')
    res.end()
  } else if (url.indexOf('/public') === 0) { // 如果地址以/public开头,就把资源响应出去
    fs.readFile('.' + url, function (erro, data) {
      if (erro) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
  } else {
    fs.readFile('./views/404.html', function (erro, data) {
       if (erro) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
  }

}).listen(3000, function () {
  console.log('running')
})
