import { getCurrOrders } from '../../api/data'

export default {
  // 存储状态
  state: {
    orderList: []
  },
  // 显示的更改state
  mutations: {
    refreshOrderList(state, orderList) {
      state.orderList = orderList
    }
  },
  // 过滤state中的数据
  getters: {
    orderList: state => state.orderList
  },
  // 异步操作
  actions: {
    // 获取通知列表
    async getOrderListFromServer({ dispatch, commit }) {
      const orderList = (await getCurrOrders()).data.data
      commit('refreshOrderList', orderList)
    }
  }
}
