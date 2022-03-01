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
      ///////////////管理员端页面////////////////////////
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home')
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('../views/table')
      },
      {
        path: '/case',
        name: 'case',
        component: () => import('../views/case'),
        children: [
          {
            path: '/case/page1',
            name: 'page1',
            component: () => import('../views/case/page1')
          },
          {
            path: '/case/page2',
            name: 'page2',
            component: () => import('../views/case/page2')
          },
          {
            path: '/case/page3',
            name: 'page3',
            component: () => import('../views/case/page3')
          }
        ]

      },
      {
        path: '/food',
        name: 'food',
        component: () => import('../views/food')
      },
      {
        path: '/worker',
        name: 'worker',
        component: () => import('../views/worker')
      },
      {
        path: '/perCen',
        name: 'perCen',
        component: () => import('../views/perCen')
      },
      {
        path: '/user',//这个可能是访问路径，和本地文件夹下的相对路径无关，规定这样打可以访问到下面import里指定路径的页面
        name: 'user',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/user')
      },
      ///////////////服务员端页面////////////////////////
      {
        path:'/serFood',
        name:'serFood',
        component:()=>import('../views/serFood')
      },
      {
        path:'/serMain',
        name:'serMain',
        component:()=>import('../views/serMain')
      },
      {
        path:'/serOrder',
        name:'serOrder',
        component:()=>import('../views/serOrder')
      },
      {
        path:'/serShopping',
        name:'serShopping',
        component:()=>import('../views/serShopping')
      },
      ///////////////厨师端页面////////////////////////
      {
        path:'/chef',
        name:'chef',
        component:()=>import('../views/chef')
      }
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

router.beforeEach((to, _, next) => {
  if (to.name !== 'login' && !localStorage.getItem('token')) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
