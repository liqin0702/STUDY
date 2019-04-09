//import Vue from 'vue'  //这里导入的Vue功能不全，只提供了runtime-only的方式，并没有提供像网页中使用的方式
 // 因为在vue包里"main": "dist/vue.runtime.common.js",
 // 回顾 包的查找规则：
// 1. 找 项目根目录中有没有 node_modules 的文件夹
// 2. 在 node_modules 中 根据包名，找对应的 vue 文件夹
// 3. 在 vue 文件夹中，找 一个叫做 package.json 的包配置文件
// 4. 在 package.json 文件中，查找 一个 main 属性【main属性指定了这个包在被加载时候，的入口文件】

// 解决方式1：将main中的路径改为vue.js，但是不推荐
//解决方式2,如下
// import Vue from '../node_modules/vue/dist/vue.js'
// 解决方式3：先设置import Vue from 'vue'，尔后在webpack.config.js中设置如下
/*  resolve: {
    alias: {
      "vue$": "vue/dist/vue.js"
    }
  }*/
// import Vue from 'vue'

// var login = {
//   template: '<h1>组件</h1>'
// }

// var vm = new Vue({
//   el: '#app',
//   data: {
//     msg: 123
//   },
//   components:{
//     login
//   }
// })

import Vue from 'vue'
import login from './login.vue'

var vm = new Vue({
  el: '#app',
  data: {
    msg: 123
  },
  render: function(createElements) {
    return createElements(login)
  }
  // 简写形式1:
  /*render: (createElements) => return createElements(login)*/
  // 简写形式2:
  /*render: createElements => return createElements(login)*/
  // 简写形式3:
  /*render: c => return c(login)*/
  // 简写形式5:
  /*render: c => c(login)*/
})
