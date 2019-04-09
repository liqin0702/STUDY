import Vue from 'vue'
import app from './app.vue'
//按需导入mint-ui组件库
import { Header, Swipe, SwipeItem } from 'mint-ui'
//注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

//导入mui组件
import './lib/css/mui.min.css'
import './lib/css/icons-extra.css'
import './lib/fonts/mui-icons-extra.ttf'
//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routerobj from './router.js'

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

// 导入样式
import './index.css'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router: routerobj
})

// var koa = require('koa');
// //npm install --save koa2-cors
// var cors = require('koa2-cors');
// var app = koa();
// //开启
// app.use(cors());
