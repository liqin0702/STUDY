import account from './account.vue'
import goodslist from './GoodsList.vue'
import VueRouter from 'vue-router'

var routerObj = new VueRouter({
  routes:[
    {
      path: '/account', component: account
    },
    {
      path: '/goodslist', component: goodslist
    }
  ]
})

export default routerObj
