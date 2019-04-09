import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入所有mint-ui组件
import app from './app.vue'
import routerObj from './router.js'
import MintUI from 'mint-ui'
import '../node_modules/mint-ui/lib/style.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './index.css'

Vue.use(MintUI)

var vm = new Vue({
  el: '#app',
  render: c =>c(app),
  router: routerObj
})
