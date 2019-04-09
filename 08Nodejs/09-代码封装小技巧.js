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