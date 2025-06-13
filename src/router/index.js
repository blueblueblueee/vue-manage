import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    meta:{title: '首页'},
    component: () => import('../views/layout/MainLayout.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta:{title: '登录'},
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta:{title: '关于'},
    component: () => import('../views/about/AboutView.vue')
  },

]

const router = new VueRouter({
  routes
})
//未连接数据库，暂时注释
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('VMG-authorization-token');
//   if (to.path === '/login' && token) {
//     next('/')
//     return
//   }
//   if (to.path !== '/login' && !token) {
//     next('/login')
//     return
//   }
//   next()
// })

export default router
