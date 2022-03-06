import Cookie from 'js-cookie'
//import router from '../router'
export default {
  state: {
    isCollapse: false,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    // //////////////Aside/////////////////////////////////
    menu: [],
    position0Menu: [//管理员
      {
        path: '/',
        name: 'home',
        label: '主页',
        icon: 's-home',
        url: 'home/index.vue'//?
      },
      {
        path: '/table',
        name: 'table',
        label: '账单结账',
        icon: 's-grid',//自己记得改icon
        url: 'table/index.vue'//?
      },
      {
        path: '/page1',
        name: 'page1',
        label: '订单管理',
        icon: 's-order',//自己记得改icon
        url: 'case/index.vue'
      },
      {
        path: '/manageNotification',
        name: 'manageNotification',
        label: '推送管理',
        icon: 'fork-spoon',//自己记得改icon
        url: 'manageNotification/index.vue'
      },
      {
        path: '/food',
        name: 'food',
        label: '菜品管理',
        icon: 'fork-spoon',//自己记得改icon
        url: 'food/index.vue'
      },


      {
        label: '其他',
        icon: 'setting',
        children: [
          {
            path: '/worker',
            name: 'worker',
            label: '员工管理',
            icon: 'setting',//自己记得改icon
            url: 'worker/index.vue'
          },
          {
            path: '/perCen',
            name: 'perCen',
            label: '餐厅名片',
            icon: 'setting',//自己记得改icon
            url: 'perCen/index.vue'
          }
        ]
      }
    ],
    position1Menu: [//服务员
      /*            {
                      path:'/serMain',
                      name:'serMain',
                      label:'首页',
                      icon:'setting',//自己记得改icon
                      url:'serMain/index.vue'
                  },*/
      {
        path: '/serFood',
        name: 'serFood',
        label: '全部菜品',
        icon: 's-order',//自己记得改icon
        url: 'serFood/index.vue'
      },
      /*            {
                      path:'/serShopping',
                      name:'serShopping',
                      label:'购物车',
                      icon:'setting',//自己记得改icon
                      url:'serShopping/index.vue'
                  },*/
      {
        path: '/serOrder',
        name: 'serOrder',
        label: '当前订单',
        icon: 's-grid',//自己记得改icon
        url: 'serOrder/index.vue'
      }
    ],
    position2Menu: [//厨师
      {
        path: '/chef',
        name: 'chef',
        label: '厨师',
        icon: 'setting',//自己记得改icon
        url: 'ChefCenter/ChefCenter'
      }
    ],
    // //////////////Router/////////////////////////////////
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    ///////////////////////////////////
    setMenu(state, val) {
      if (val == 0) {//如果是manager
        state.menu = state.position0Menu
        //localStorage.setItem('menu',state.menu)
        localStorage.setItem('menu', JSON.stringify(state.position0Menu))
      } else if (val == 2) {//厨师端
        state.menu = state.position2Menu
        //localStorage.setItem('menu',state.menu)
        localStorage.setItem('menu', JSON.stringify(state.position2Menu))
      } else if (val == 1) {//服务员端
        state.menu = state.position1Menu
        //localStorage.setItem('menu',state.menu)
        localStorage.setItem('menu', JSON.stringify(state.position1Menu))
      } else {
        console.error('position=' + val)
      }
      console.log('menu' + localStorage.getItem('menu'))
      //state.menu = val
    },
    clearMenu(state) {
      state.menu = []
      localStorage.removeItem('menu')

    },
    //这个方法多此一举
    addMenu(state, router) {
      if (!localStorage.getItem('menu')) {
        return
      }
      const menu = JSON.parse(localStorage.getItem('menu'))
      state.menu = menu
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      //路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main', item)
      })
    }
  }

}
