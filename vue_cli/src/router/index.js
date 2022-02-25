import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
///到时候可能会有三个起始路径
const routes = [
  {
    path: '/',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue'),
    redirect:'/home',
    children: [
      
    ],
    
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login/login.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
