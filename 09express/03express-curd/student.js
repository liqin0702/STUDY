// student.js
// 数据操作处理模块
// 只处理数据，不关心业务
// 封装异步api是node.js的精华

const fs = require('fs')

const dbPath = './db.json'

// 获取所有学生列表
exports.find = (callback) => {
  // 使用utf8后，不需要再将data转换为字符串了
  fs.readFile(dbPath, 'utf-8', (erro, data) => {
    if (erro) return callback(erro)
    callback(null, JSON.parse(data).student)
    return true // 箭头函数的最后要有个return
  })
}

// 获取对应id的学生信息
exports.findById = (id, callback) => {
  fs.readFile(dbPath, 'utf-8', (erro, data) => {
    if (erro) return callback(erro)
    const students = JSON.parse(data).student
    // es6中的一个数组方法：find
    // 当某个遍历项符合item.id === student.id的时候，find会终止遍历，同时返回遍历项
    // 这个返回的遍历项stu就是students中的一部分,改变stu，student会跟着改变
    const stu = students.find(item => item.id === id)
    callback(null, stu)
    return true // 箭头函数的最后要有个return
  })
}

// 保存学生数据
exports.save = (message, callback) => {
  fs.readFile(dbPath, 'utf8', (erro, data) => {
    if (erro) return callback(erro)
    // 转换成对象，并提取对象中的student数组
    const students = JSON.parse(data).student
    // 给对象中的数组中的对象增加一个id属性
    message.id = students[students.length - 1].id + 1
    // 将这个新的对象添加到数组中去
    students.push(message)
    // 将对象字符串化
    const fileData = JSON.stringify({
      student: students,
    })
    // 将字符串化写入文件
    fs.writeFile(dbPath, fileData, (erro1) => {
      if (erro1) return callback(erro1)
      callback(null)
      return true
    })
    return true
  })
}

// 更新学生数据
exports.updateById = (message, callback) => {
  fs.readFile(dbPath, 'utf8', (erro, data) => {
    if (erro) return callback(erro)
    // 转换成对象，并提取对象中的student数组
    const students = JSON.parse(data).student
    // es6中的一个数组方法：find
    // 当某个遍历项符合item.id === student.id的时候，find会终止遍历，同时返回遍历项
    // 这个返回的遍历项stu就是students中的一部分,改变stu，student会跟着改变
    const stu = students.find(item => item.id === message.id)
    // 遍历拷贝对象 方式1：
    // for (const key in message) {
    //   stu[key] = message[key]
    // }
    // 遍历拷贝对象方式2：
    // 这个可以避免使用for函数
    // forEach适用于数组，而不是对象
    Object.keys(message).forEach((key) => {
      stu[key] = message[key]
    })
    // 将对象字符串化
    const fileData = JSON.stringify({
      student: students,
    })
    // 将字符串化写入文件
    fs.writeFile(dbPath, fileData, (erro1) => {
      if (erro1) return callback(erro1)
      callback(null)
      return true
    })
    return true
  })
}


// 删除学生
exports.delete = () => {

}
