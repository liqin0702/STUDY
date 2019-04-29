# Node.js

**注意1.**：如果一个代码是`( [ `以及`开头的话，则必须在他们前面加个分号。
**注意2.**：node开启的服务器默认是黑盒子，所有资源都不允许用户来访问，而是由开发人员编写设计的代码为准；而php无论是代码还是网页，都可以直接通过web url路径来访问。

## 1.简介
Node.js不是语言、不是库、不是框架，是一个构建在chrome的V8引擎之上的js运行环境。以前只有浏览器可以执行js代码，现在使用Node.js，可以脱离浏览器而执行
- chrome的V8引擎是目前公认的解析js代码最快的

### 1-1.浏览器中js和Node.js中的js区别
- 前者包括es语法、bom和dom操作
- 后者没有bom和dom操作，只包括es语法，和一些服务器界别的操作api,例如文件读写、网络服务的构建、网络通信、http服务器等等，其实就是**web服务器开发。**

### 1-2.Node特性
- 事件驱动
- 非阻塞IO模型
- 轻量和高效

### 1-3.npm
- npm是世界上最大的开源库生态系统
- 绝大多数的js相关的包都放在了npm平台上

### 1-4.Node.js能做什么
- web服务器后台
- 命令行工具
- 游戏服务器
- 接口服务器
- ...

## 2.读写文件
- 浏览器中的js是没有操作文件的能力的，而Nodejs中具备操作文件能力
- fs是file-system的简写，就是文件系统的意识。在Nodejs中想要操作文件，就必须使用require引入fs这个核心模块。
  `var fs = require('fs')`

### 2-1.fs.readFile读文件
- 第一个参数是文件地址，第二个参数是一个回调函数
- 回调函数有两个参数，第一个是error，第二个是data
> 成功时，data返回数据，error返回null  
> 失败时，data返回undefined，error返回错误对象
```
fs.readFile('hello.txt',function(error,data) {
    console.log(data) //返回十六进制
    console.log(data.toString()) //将十六进制转换成字符串输出
}
```

### 2-1.fs.readFile读文件
- 第一个参数是文件地址，第二个参数文件内容
- 第三个参数是回调函数，但是只有一个参数，error
> 成功,error为null  
> 失败，error为错误对象
```
fs.writeFile('01-hello.txt', '你好，Node.js', function(error) {
  console.log('success')
})
```
**注意**：写入会覆盖源文件

## 3.http服务
核心模块:http
- 一个请求对应一个响应，如果请求过程中，结束响应了，则不能重复发送响应；没有请求就没有响应

```javascript
// 加载http核心模块
var http = require('http')
// 使用http.createServer()创建一个web服务器
var server = http.createServer()
//监听请求，回调函数中两个参数，分别为request和response 
server.on('request', function(req, res) {
  var url = req.url
  console.log('收到请求了，请求路径是：' + url)
  // 写法1
  // res.write('你好')
  // res.write('世界')
  // res.end()
  // res.setHeader('content-Type','text/plain;charset=utf-8') //解决中文乱码问题

  //写法2
  if (url === '/') {
    res.end('index page')
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
//监听端口8889
server.listen(8889, function() {
  console.log('服务器启动成功，可以访问了')
})
```
### 3-1.加载外部资源
当http服务响应的资源是文件时，要用到fs和http两个核心模块.如，要加载resource文件夹里面的time.jpeg和index.html，如图：
![2019-04-06 19-42-19屏幕截图.jpg](https://note.youdao.com/yws/res/9578/WEBRESOURCE693dc9ef1d70ec59a9502038032bf3fa)

```javascript
//加载外部资源

var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request',function(req, res) {
  var url = req.url

  if(url === '/') {
    fs.readFile('./resource/index.html', function(err, data) {
      if (err) {
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        console.log('资源不存在')
      } else {
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/sexy') {
    fs.readFile('./resource/timg.jpeg', function(err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end('资源不存在')
      } else {
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })
  }
})

server.listen(3000,function(){
  console.log('服务启动...')
})
```
### 3-2实现像Apache一样的功能

首先了解客户端渲染和服务端渲染。客户端渲染不利于seo搜索引擎优化。服务端渲染是可以被爬虫抓取到，客户端异步渲染（ajax)是很难被爬到。所以真正的网站即不是纯异步，也不是纯服务端渲染出来的，而是两者结合出来的。

#### 3-2-1服务器端渲染
- 优点：
    1. 前端耗时少。因为后端拼接完了html，浏览器只需要直接渲染出来。
    2. 有利于SEO。因为在后端有完整的html页面，所以爬虫更容易爬取获得信息，更有利于seo。
    3. 无需占用客户端资源。即解析模板的工作完全交由后端来做，客户端只要解析标准的html页面即可，这样对于客户端的资源占用更少，尤其是移动端，也可以更省电。
    4. 后端生成静态化文件。即生成缓存片段，这样就可以减少数据库查询浪费的时间了，且对于数据变化不大的页面非常高效 。
- 缺点：
    1. 不利于前后端分离，开发效率低。使用服务器端渲染，则无法进行分工合作，则对于前端复杂度高的项目，不利于项目高效开发。另外，如果是服务器端渲染，则前端一般就是写一个静态html文件，然后后端再修改为模板，这样是非常低效的，并且还常常需要前后端共同完成修改的动作；
    2. 或者是前端直接完成html模板，然后交由后端。另外，如果后端改了模板，前端还需要根据改动的模板再调节css，这样使得前后端联调的时间增加。
    3. 占用服务器端资源。即服务器端完成html模板的解析，如果请求较多，会对服务器造成一定的访问压力。而如果使用前端渲染，就是把这些解析的压力分摊了前端，而这里确实完全交给了一个服务器。


#### 3-2-2客户端渲染
- 优点：　　
    1. 前后端分离。前端专注于前端UI，后端专注于api开发，且前端有更多的选择性，而不需要遵循后端特定的模板。
    2. 体验更好。比如，我们将网站做成SPA或者部分内容做成SPA，这样，尤其是移动端，可以使体验更接近于原生app。
- 缺点：
    1. 前端响应较慢。如果是客户端渲染，前端还要进行拼接字符串的过程，需要耗费额外的时间，不如服务器端渲染速度快。
    2. 不利于SEO。目前比如百度、谷歌的爬虫对于SPA都是不认的，只是记录了一个页面，所以SEO很差。因为服务器端可能没有保存完整的html，而是前端通过js进行dom的拼接，那么爬虫无法爬取信息。 除非搜索引擎的seo可以增加对于JavaScript的爬取能力，这才能保证seo。

#### 3-2-3两者应用场景
- 不谈业务场景而盲目选择使用何种渲染方式都是耍流氓。比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的SEO，则这时我们就需要使用服务器端渲染；而类似后台管理页面，交互性比较强，不需要seo的考虑，那么就可以使用客户端渲染。
- 另外，具体使用何种渲染方法并不是绝对的，比如现在一些网站采用了首屏服务器端渲染，即对于用户最开始打开的那个页面采用的是服务器端渲染，这样就保证了渲染速度，而其他的页面采用客户端渲染，这样就完成了前后端分离。




#### 3-3-1在浏览器上打开本地资源
之前学的http服务中，在浏览器url输入不带后缀名的地址，通过res.end响应一个对应的资源，下面通过直接输入文件名+后缀名，打开资源

```javascript
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
```
![2019-04-07 17-05-31屏幕截图.jpg](https://note.youdao.com/yws/res/9675/WEBRESOURCEf4df96663096283953a9fbf0777cbb78)
![2019-04-07 17-06-04屏幕截图.jpg](https://note.youdao.com/yws/res/9678/WEBRESOURCE74c16d7f5c751cbe9802093ce64f2062)
![2019-04-07 17-06-28屏幕截图.jpg](https://note.youdao.com/yws/res/9680/WEBRESOURCEd097eecab98d2dd259c4413a92bf5c76)

#### 3-3-2Apache目录列表

1. 服务端渲染之暴力方法实现如下：  
    其实就是自己手动拼接

项目图如下：

![2019-04-07 19-27-34屏幕截图.jpg](https://note.youdao.com/yws/res/9686/WEBRESOURCE3265779ebd46564a6beba4846135367b) 

```html
//template关键代码如下

<body>
<h1 id="header">/home/liqin/sublimeProjects/08Nodejs/www/ 的索引</h1>
<div id="parentDirLinkBox" style="display: block;">
  <a id="parentDirLink" class="icon up" href="file:///home/liqin/sublimeProjects/08Nodejs/">
    <span id="parentDirText">[上级目录]</span>
  </a>
</div>
<table>
  <thead>
    <tr class="header" id="theader">
      <th onclick="javascript:sortTable(0);">名称</th>
      <th class="detailsColumn" onclick="javascript:sortTable(1);">大小</th>
      <th class="detailsColumn" onclick="javascript:sortTable(2);">修改日期</th>
    </tr>
  </thead>
  <tbody id="tbody">
  @@@
  </tbody>
</table>
</body>
```

```javascript
//js代码如下
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
          <td class="detailsColumn" data-value="1554627255">2019/4/7 下午4:54:15</td>
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
```
![2019-04-07 19-30-44屏幕截图.png](https://note.youdao.com/yws/res/9693/WEBRESOURCEea5a3e20e7262e9c3abaf5c8e6a8bd34)

2. 服务端渲染之模板引擎方法实现如下：  
    使用art-template模板引擎:
- art-template 是一个简约、超快的模板引擎。
- 它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。
- 模板引擎最早诞生于服务器领域，后来才发展到了前端
- art-template示例：

```html
<body>
  <script src="./node_modules/art-template/lib/template-web.js"></script>
  <script type="text/template" id="tp1">
    大家好，我叫： {{ name }}
    我今年 {{ age }} 岁了
    我来自 {{ province }}
    我喜欢： {{ each hobbies }} {{ $value }} {{ /each }}
  </script>
  <script>
    var ret = template('tp1', {
      name: 'Jack',
      age: 18,
      province: '北京',
      hobbies: [
        '唱歌',
        '运动'
      ]
    })
    console.log(ret)
  </script>
</body>
```
![2019-04-07 20-33-10屏幕截图.jpg](https://note.youdao.com/yws/res/9708/WEBRESOURCE12f51f885e4cf52ed3c9a2d0f85cc7ee)

```html
//template1.html核心代码

<body>

<h1 id="header">/home/liqin/sublimeProjects/08Nodejs/www/ 的索引</h1>

<div id="parentDirLinkBox" style="display: block;">
  <a id="parentDirLink" class="icon up" href="file:///home/liqin/sublimeProjects/08Nodejs/">
    <span id="parentDirText">[上级目录]</span>
  </a>
</div>
<table>
  <thead>
    <tr class="header" id="theader">
      <th onclick="javascript:sortTable(0);">名称</th>
      <th class="detailsColumn" onclick="javascript:sortTable(1);">大小</th>
      <th class="detailsColumn" onclick="javascript:sortTable(2);">修改日期</th>
    </tr>
  </thead>
  <tbody id="tbody">
    {{ each files}}
     <tr>
        <td data-value="apple/"><a class="icon dir" href="file:///home/liqin/sublimeProjects/08Nodejs/www/apple/">{{ $value }}/</a></td>
        <td class="detailsColumn" data-value="0"></td>
        <td class="detailsColumn" data-value="1554627255">2019/4/6 下午12:00:00</td>
        </tr>
    {{ /each }}
  </tbody>
</table>
</body>
```

```javascript
//js

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

```
### 3-4.处理静态资源

- 当浏览器收到Html响应内容后，从上到下依次解析，当解析发现，代码中有link,script,img,iframe,video,audio等具有src,link,herf属性且自动执行的标签时（不包括a标签，因为a标签必须要点击，而不是自动），浏览器会自动对这些资源发送新的请求。这些资源通常是外链资源
- 注意:在服务端中，文件的路径就不要去写相对路径了。因为这个时候所有的资源都是通过url标识来获取的，我的服务器开放了/public目录，所以这里的请求路径写成/pubulic,而不是../public, /在这里就是url根路径的意思，浏览器在真正发送请求的时候会把http://127.0.0.1:3000拼上
- 不要再想文件路径了，把所有的路径都想象成url地址

#### 3-4-1 评论案例
![2019-04-09 17-58-14屏幕截图.jpg](https://note.youdao.com/yws/res/9727/WEBRESOURCEfec073483bc6262e67003396e3cde6ab)

```javascript
// app.js
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
```

```html
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title></title>
  <!-- 当浏览器收到Html响应内容后，从上到下依次解析，当解析发现，代码中有link,script,img,iframe,video,audio等具有src,link,herf属性且自动执行的标签时（不包括a标签，因为a标签必须要点击，而不是自动），浏览器会自动对这些资源发送新的请求。这些资源通常是外链资源 -->
  <!-- 注意:在服务端中，文件的路径就不要去写相对路径了。因为这个时候所有的资源都是通过url标识来获取的，我的服务器开放了/public目录，所以这里的请求路径写成/pubulic,而不是../public, /在这里就是url根路径的意思，浏览器在真正发送请求的时候会把http://127.0.0.1:3000拼上-->
  <!-- 不要再想文件路径了，把所有的路径都想象成url地址 -->
  <link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">

</head>
<body>
  <div class="header container">
    <div class="page-header">
      <h1>Example page header <small>Subtext for header</small></h1>
      <a href="/post" class="btn btn-success">发表留言</a>
    </div>
  </div>
  <div class="comments container">
    <ul class="list-group">
    {{each comments}}
      <l1 class="list-group-item">{{ $value.name }}说：{{ $value.msg }} <span style="float: right;">{{ $value.time }}</span></l1>
    {{/each}}
    </ul>
  </div>
</body>
</html>
```

```html
//post.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
  <link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
</head>
<body>
  <div class="header container">
    <div class="page-header">
      <h1><a href="/">Example page header</a> <small>Subtext for header</small></h1>
    </div>
  </div>
  <div class="comments container">
    <!-- 以前表单数据是如何提交的
          1.表单中需要提交的表单空间必须有name属性
          2.表单提交分为默认提交(什么都不用写)和异步提交（需要写代码处理）
     -->
    <form action="/comment" method="get"> <!-- action就是表单提交的地址，说白了就是请求的url地址；method是请求方法，分为get和post方法-->
      <div class="form-group">
        <label for="input_name">你的大名</label>
        <input type="text" class="form-control" id="input_name" required minlength="2" maxlength="10" name="name" placeholder="请输入你的姓名">
      </div>
      <div class="form-group">
        <label for="textarea_message">留言内容</label>
        <textarea class="form-control" name="msg" id="textarea_message" cols="30" rows="10" required minlength="5" maxlength="20"></textarea>
      </div>
      <button type="submit" class="btn btn-success">发表</button>
    </form>
  </div>
</body>
</html>
```
![2019-04-09 17-58-48屏幕截图.jpg](https://note.youdao.com/yws/res/9734/WEBRESOURCEec40d1374227408277c8265c456554a1)
![2019-04-09 17-59-05屏幕截图.jpg](https://note.youdao.com/yws/res/9736/WEBRESOURCE07527b20950c5e3fd734cc43990766ba)



## 4.模块
什么是模块化？就是具有文件作用域和通信规则（即加载和导出）
Node是模块化开发，通常使用require导入。在Node中，模块有三种：
1. 具名的核心模块，如fs、http
2. 用户自己边写的文件模块，比如js文件

```javascript
//a.js
var foo = 'aaa'
console.log('a start')
require('./b.js')
console.log('a end')

//b.js
console.log('bbb')
```
结果为：
```
a start
bbb
a end
```
    - 相对路径中的`./`不能省略
    - 注意，node没有全局作用域，只有模块作用域，内部访问不到外部，外部也访问不到内部
        - 但是可以通过module exports 和 exports使用嵌套模块中的数据

### 4-1.exports
1. 如果不使用exports，使用require导入自定义的模块后，默认返回的是一个空对象。如

```javascript
//a.js
var foo = require('./b.js')
console.log(foo)

//b.js
var age = age
```
执行`node a.js`，结果为`{}`.

2. 如果使用了exports：

```javascript
//a.js
var foo = require('./b.js')
console.log(foo)

//b.js
var age = age
exports.age = age

```

执行`node a.js`，结果为`{ age: 18 }`.

#### 4-2.module.exports

```javascript
// b.js
module.exports = 'hello'

//a.js
var str = require('./b.js')

console.log(str)
//此时的str不再是一个对象，而是一个字符串hello
```
module.exports可以一次性导入多个
```javascript
module.exports = {
    str: 'hello',
    str1:'h1llo1',
    add: function() {return x + y}
}
```
#### 4-3.require优先从缓存加载
加载时，会先到缓存里面看看该模块有没有被加载过，如果加载过了就不重复加载，只为了拿到加载对象中的接口对象
```javascript
//main.js
require('./a.js')
require('./b.js')

//a.js
console.log('我是a')
require('./b.js')

//b.js
console.log('我是b')

//结果:
//我是a
//我是b
```
也就是说main.js中的require('./b.js')没有重复加载，顶多是拿到b.js中的接口对象，目的就是提高模块加载的效率

#### 4-4.package.json包描述文件
package.json包描述文件，就像产品的说明书一样

#### 4-5.npm
升级npm:`npm install --global npm`
常用命令：
- `npm init -y` 跳过向导，快速生成
- `npm install` 或者`npm i` 安装包
- `npm uninstall`只删除，如果有依赖项依然保存
- `npm uninstall --save `删除的同时，把依赖项删除
  安装淘宝镜像：`npm install --global cnpm `

或者 `npm config set registry https://registry.npm.taobao.org`以后默认装包会从淘宝的服务器中来下载。  
验证npm配置信息：`npm config list`



## 5 封装小技巧
```javascript
//封装技巧

var fs = require('fs')
var path = require('path')

/*要想获得文件的内容，用一下方法不行，因为fs.readFile是异步方法，当调用getFile时，将fs.readFile交给子程序处理，而主程序跳过这一段寻找return,但是找不到，所以默认返回undefined*/
// function getFile (fpath) {
//   fs.readFile(fpath, 'utf-8',  (erro, data) => {
//     if (erro) throw erro
//     return data
//   })
// }

// var res = getFile('./1.txt')
// console.log(res)


/*解决方法1：设置一个回调函数参数,当子程序执行最后，调用这个回调函数*/
// function getFile (fpath, callback) {
//   fs.readFile(fpath, 'utf-8', (erro, data) => {
//     if (erro) throw erro
//     callback(data)
//   })
// }

// var res = getFile('./1.txt',(dataStr) => {
//   console.log(dataStr)
// })

// 这种方法封装的不好，因为如果出错的话，系统抛出异常，会阻断程序，所以应该把erro也进行一下封装
/*解决方法2：需要给callpack传入两个参数，第一个参数为失败的结果，第二个参数为成功的结果
           当失败时，第一个参数为erro对象，第二个为undefined
           当成功时，第一个参数为null,第二个为data对象
*/
// function getFile (fpath, callback) {
//   fs.readFile(fpath, 'utf-8', (erro, data) => {

//     if (erro) return callback(erro) //此时第一个参数为erro,而第二个默认为undefined，可以不写
//     callback(null, data)
//   })
// }

// var res = getFile('./1.txt',(erroStr, dataStr) => {
//   if (erroStr) return console.log(erroStr.message)
//   console.log(dataStr)
// })

/*解决方法3：将callback拆分为两个回调函数*/
// function getFile (fpath, sucCb, erroCb) {
//   fs.readFile(fpath, 'utf-8', (erro, data) => {
//     if (erro) return erroCb(erro)
//     sucCb(data)
//   })
// }

// getFile('./1.txt', function (dataStr) {
//   console.log(dataStr)
// }, function (erroStr) {
//   console.log(erroStr.message)
// })


// 但是解决方法3存在一个问题，如果要连续读取好几个文件的内容时，就会出现回调地狱问题
// 回调地狱是指函数作为参数层层嵌套
function getFile (fpath, sucCb, erroCb) {
  fs.readFile(fpath, 'utf-8', (erro, data) => {
    if (erro) return erroCb(erro)
    sucCb(data)
  })
}

getFile('./1.txt', function (dataStr) {
  console.log(dataStr)

  getFile('./2.txt', function (dataStr) {
  console.log(dataStr)

    getFile('./3.txt', function (dataStr) {
    console.log(dataStr)
    })
  })
})

// 使用es6中的promise来解决回调地狱的问题
// promise就是单纯为了解决回调地狱问题，并不能帮我们减少代码量
// 相关内容查看vue2.x笔记
```

## 6.Express
原生的http在某些方面不能满足开发需求，所以使用框架来加快开发效率。在node中有很多框架，我们学习express  
`npm init -y`创建package.json说明文件
```javascript
var express = require('express')
// 相当于http核心模块中的 var server = http.createServer()
var app = express()

//只要这样做，就可以直接通过 /public/xx的方式访问public目录中的所有资源了
app.use('/public', express.static('./public/'))

//相当于server.on('request', function(req, res) {})
app.get('/', function (req, res) {
    res.send('hello express')
})
//相当于server.listen(3000, function() {})
app.listen(3000, function () {
    console.log('running')
})
```

### 6-1.nodemon第三方工具
避免更改代码后，每次都要手动重启服务器。使用这个工具，他可以自动启动服务器。

安装：  `npm install --global nodemon `

### 6-2.express中使用art-template
- **安装**：

```shell
npm install --save art-template
npm install --save express-art-template
```
- **配置**：

```javascript
app.engine('art', require('express-art-template'))
```
- **使用**：

```javascript
app.get('/login', function (req, res) {
  res.render('login.html', {
    title:"登入"
  })
})
```

**代码示例**

```javascript
// app.js
var express = require('express')

var app = express()

app.use('/public/', express.static('./public/'))

//在express 中使用模板引擎关键1
//第一个参数表示，当渲染以.art结尾的文件的时候，使用art-template模板引擎
// app.engine('art', require('express-art-template'))
app.engine('html', require('express-art-template'))

//在express 中使用模板引擎关键2
//express为res对象提供了一个方法：render,这个方法默认不可以使用，但是如果配置了模板引擎就可以使用了
//res.render('html模板名', {模板数据})
//第一个参数不能写路径，默认会去项目中的view目录查找该模板文件
//也就是说express有一个约定：开发人员把所有的视图文件都放到vies目录中
//如果希望修改默认的views视图渲染存储目录，可以使用app.set('views',新路径)
app.get('/', function (req, res) {
  // res.render('404.html') 如果在app.engine中声明使用art结尾的文件才能使用模板引擎的化，则必须将文件404.html重命名为404.art，且使用如下语句渲染
  // res.render('404.art')

  //但是这里存在一个问题，就是必须把404的后缀名由html改为art，那么404.art文件可能就无法高亮
  //解决办法：就是把app.engine写成app.engine('art', require('express-art-template'))
  res.render('404.html')
})

app.get('/login', function (req, res) {
  res.render('login.html', {
    title:"登入"
  })
})

app.listen(3000, function () {
  console.log('running')
})
```

#### 6-2-1.修改留言板项目

express封装了res.query，res.redirect等方法。但是res.query只能拿get请求参数

```javascript
// app1.js
var express = require('express')

var app = express()

app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

var comments = [
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
  //写法1：老的写法
  // res.statusCode = 302 //重置状态码，302表示临时重定向
  // res.setHeader('Location', '/') // 重定向
  // res.send()
    
  //写法2
  res.redirect('/') //redirect也是express封装的方法
})

app.listen(3000, function () {
  console.log('running')
})
```

### 6-3.express中post方式获取数据

**注意：**在浏览器中手动输入地址然后敲回车，采取的永远是get方式获取网页数据。要想使用post方式发送请求，只能通过表单或者ajax。

- 在express中使用get方法获取数据，可以通过内置的req.query属性
- 在express中使用post方法获取数据，因为express没有内置获取表单post请求体的API，这里我们需要使用一个第三方包：body-parser

安装：

```javascript
npm install -S body-parser
```

配置：

```javascript
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// 配置body-parser
//只要加入下面配置代码，则在req请求对象上会多出一个属性：body
// 那样就可以直接使用req.body来获取表单post请求体的数据了

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```

示例：

```javascript
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
```

### 6-4.express中curd

以博客系统为例。这里需要安装bootstrap，使用3.3.7版本

```shell
npm i -S bootstrap@3.3.7
```

**1.使用bootstrap模板：**

- 到bootstrap官网找想要的模板，尔后把源码复制下来
- 修改代码中bootstrap的引用路径为本地node_modules中的路径
- 如果要使用dashboard.css，还得到模板中使用查看源代码，尔后下载dashboard.css，放到public下的css文件夹中，重新命名为main.css
- 删除其他冗余的、不需要的代码

**2.配置express-art-template：**

```javascript
var express = require('express')

var app = express()

// 将node_modules和public两个文件夹内的资源都开放出来
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))
```













































