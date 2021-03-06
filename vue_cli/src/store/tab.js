export default {
  state: {
    isCollapse: false,
    // //////////////Aside/////////////////////////////////
    menu: [],
    positionMenus: [
      [// 管理员
        {
          path: '/',
          name: 'home',
          label: '主页',
          icon: 's-home',
          url: 'home/index.vue'// ?
        },
        {
          path: '/table',
          name: 'table',
          label: '账单结账',
          icon: 'dish', // 自己记得改icon
          url: 'table/index.vue'// ?
        },
        {
          path: '/inline',
          name: 'inline',
          label: '排队系统',
          icon: 'menu', // 自己记得改icon
          url: 'inline/index.vue'// ?
        },
        {
          path: '/page1',
          name: 'page1',
          label: '订单统计',
          icon: 's-data', // 自己记得改icon
          url: 'case/index.vue'
        },
        {
          path: '/VIP',
          name: 'VIP',
          label: '会员管理',
          icon: 's-order', // 自己记得改icon
          url: 'VIP/index.vue'
        },
        {
          path: '/manageNotification',
          name: 'manageNotification',
          label: '公告管理',
          icon: 'chat-line-square', // 自己记得改icon
          url: 'manageNotification/index.vue'
        },
        {
          path: '/food',
          name: 'food',
          label: '菜品管理',
          icon: 'fork-spoon', // 自己记得改icon
          url: 'food/index.vue'
        },
        {
          path: '/worker',
          name: 'worker',
          label: '员工管理',
          icon: 'user-solid', // 自己记得改icon
          url: 'worker/index.vue'
        },
        {
          path: '/manageTable',
          name: 'manageTable',
          label: '桌台管理',
          icon: 's-grid', // 自己记得改icon
          url: 'manageTable/index.vue'
        }
      ], [// 服务员
        {
          path: '/serFood',
          name: 'serFood',
          label: '全部菜品',
          icon: 's-order', // 自己记得改icon
          url: 'serFood/index.vue'
        },
        {
          path: '/serOrder',
          name: 'serOrder',
          label: '当前订单',
          icon: 's-grid', // 自己记得改icon
          url: 'serOrder/index.vue'
        }
      ], [// 厨师
        {
          path: '/chef',
          name: 'chef',
          label: '厨师',
          icon: 'setting', // 自己记得改icon
          url: 'ChefCenter/ChefCenter'
        }
      ]]
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
    }
  }

}
