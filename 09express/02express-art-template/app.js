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