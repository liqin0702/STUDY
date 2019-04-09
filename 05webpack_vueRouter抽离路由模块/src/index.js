import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import app from './app.vue'
import routerObj from './router.js'

var vm = new Vue({
  el: '#app',
  render: c =>c(app),
  router: routerObj
})
