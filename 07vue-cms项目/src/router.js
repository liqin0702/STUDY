//导入路由
import VueRouter from 'vue-router'
//导入底部导航栏的四个路由模块
import home from './component/home.vue'
import customer from './component/customer.vue'
import shoppingcart from './component/shoppingcart.vue'
import search from './component/search.vue'

var routerObj = new VueRouter({
  routes:[
    {path: '/', redirect: '/home'},
    {path: '/home', component: home},
    {path: '/customer', component: customer},
    {path: '/shoppingcart', component: shoppingcart},
    {path: '/search', component: search},
  ],
  linkActiveClass: 'mui-active'
})

export default routerObj
