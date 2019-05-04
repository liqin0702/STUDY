// 加载外部数据

const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (req, res) => {
  const { url } = req // es6语法，对象解构

  if (url === '/') {
    fs.readFile('./resource/index.html', (err, data) => {
      if (err) {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        console.log('资源不存在')
      } else {
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/sexy') {
    fs.readFile('./resource/timg.jpeg', (err, data) => {
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

server.listen(3000, () => {
  console.log('服务启动...')
})
