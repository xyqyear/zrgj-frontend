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
    children:[
      {
        path:'/home',
        name:'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home')
      },
      {
        path:'/table',
        name:'table',
        component:()=>import('../views/table')
      },
      {
        path:'/case',
        name:'case',
        component:()=>import('../views/case')
      },
      {
        path:'/food',
        name:'food',
        component:()=>import('../views/food')
      },
      {
        path:'/vip',
        name:'vip',
        component:()=>import('../views/vip')
      },
      {
        path:'/setting',
        name:'setting',
        component:()=>import('../views/setting')
      },
      {
        path: '/user',//这个可能是访问路径，和本地文件夹下的相对路径无关，规定这样打可以访问到下面import里指定路径的页面
        name: 'user',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/user')
      }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
