import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { apiPrefix } from '../../api/data'

let stompClient

export default {
  state: {},
  mutations: {
    refreshQueue(state, queue) {
      state.queue = queue
    }
  },
  getters: {
    queue: state => state.queue
  },
  actions: {
    initWebSocketConnections({
      dispatch,
      commit
    }) {
      dispatch('getNotificationListFromServer')
      dispatch('getOrderListFromServer')
      dispatch('getNotificationListFromServer')
      dispatch('getOrderListFromServer')
      dispatch('getRestaurantInfoFromServer')
      dispatch('getQueueFromServer')
      dispatch('getDishFromServer')
      const serverInterface = `${apiPrefix}/api/v1/ws?token=` + localStorage.getItem('token').substring(7)
      const socket = new SockJS(serverInterface)
      stompClient = Stomp.over(socket)
      // stompClient.debug = null
      stompClient.connect({}, () => {
        stompClient.subscribe('/notification/' + localStorage.getItem('restaurantId') + '/' + localStorage.getItem('position'), (message) => {
          const notification = JSON.parse(message.body)
          dispatch('handleNewNotification', notification)
        })
        stompClient.subscribe('/orders/' + localStorage.getItem('restaurantId'), (message) => {
          const orderList = JSON.parse(message.body)
          commit('refreshOrderList', orderList)
        })
        stompClient.subscribe('/queue/' + localStorage.getItem('restaurantId'), (message) => {
          const queue = JSON.parse(message.body)
          commit('refreshQueue', queue)
        })
        stompClient.subscribe('/dish/' + localStorage.getItem('restaurantId'), (message) => {
          const dish = JSON.parse(message.body)
          commit('refreshDish', dish)
        })
      })
    },
    destroyWebSocketConnections({
      dispatch,
      commit
    }) {
      stompClient.disconnect()
    }
  }
}
