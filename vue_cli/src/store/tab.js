export default {
  state: {
    isCollapse: false,
    // //////////////Aside/////////////////////////////////
    menu: [],
    positionMenus:[[//管理员
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
    ],[//服务员
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
    ],[//厨师
      {
        path: '/chef',
        name: 'chef',
        label: '厨师',
        icon: 'setting',//自己记得改icon
        url: 'ChefCenter/ChefCenter'
      }
    ]],
    // //////////////Router/////////////////////////////////
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    setMenu(state, val) {
      state.menu = state.positionMenus[val]
    },
    clearMenu(state) {
      state.menu = []
    },
  }

}
