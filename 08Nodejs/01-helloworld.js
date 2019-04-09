var fs = require('fs')

fs.writeFile('01-hello.txt', '你好，Node.js', function(error) {
  console.log('success')
})

fs.readFile('01-hello.txt', function(error, data) {
  console.log(data.toString())
})

