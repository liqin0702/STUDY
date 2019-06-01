module.exports = {
  env: {
    browser: true,
    es6: true,
    node:true,
    commonjs:true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "semi": 0,
    "no-console": 0,
    "object-curly-newline": 0, // 取消强制大括号内必须有换行
    "quote-props": [2, "as-needed", { "numbers": true, "keywords": true }], //as-needed表示需要加引号时必须加引号，数字和关键字作为属性时必须加引号
    "func-names": 1, // 使用匿名函数时的警告
    "func-style": 2, // 如果不是使用函数表达式，而是使用的函数生命式，则会报错
    "no-unused-vars": 1, //当出现没有使用过的变量时，警告
    "no-constant-condition": [1, { "checkLoops": false }], // 是否可以使用常量表达值作为测试条件，默认是警告，另一个参数的意思是当用于循环中时，不报警告
    "no-param-reassign": 1, // 如果对function的参数进行了重新赋值，则警告
  },
}

