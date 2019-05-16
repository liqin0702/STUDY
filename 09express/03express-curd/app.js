/**
  * app.js入口模块
  * 职责：
  *   创建服务
  *   做一些服务相关配置
  *     模板引擎
  *     body-parser解析表单post请求体
  *     提供静态资源服务
  *   挂载路由
  *   监听端口启动服务
  */
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router.js')


const app = express()

// 将node_modules和public两个文件夹内的资源都开放出来
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

// 配置post方法的第三方包：body-parser
// 该配置一定要在app.use(router)之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 方法1：不使用express的路由方法时
// router(app)

// 方法2：使用express的路由方法时
app.use(router)

app.listen(3000, () => {
  console.log('running')
})
