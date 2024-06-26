import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import User from '../components/user/user.vue'
import Rights from '../components/power/rights.vue'
import Roles from '../components/power/roles.vue'
import Cate from '../components/goods/cate.vue'
import Params from '../components/goods/params.vue'
import Reports from '../components/reports/reports.vue'
import dataV from '@jiaminghi/data-view'
import list from '../components/goods/List.vue'
import order from '../components/order/Order.vue'
Vue.use(dataV)
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home', component: Home, redirect: '/welcome', children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: list },
        { path: '/reports', component: Reports },
        { path: '/orders', component: order },
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next() 放行 next('/login') 强制跳转
  if (to.path == "/login") {
    return next()
  }
  else {
    window.sessionStorage.getItem('token') ? next() : next('/login')
  }
})
export default router