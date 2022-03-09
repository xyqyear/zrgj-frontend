import { getNotificationList } from '../../api/data'
import { Notification } from 'element-ui'

export const getReadableTime = (ts) => {
  const date = new Date(ts * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${year}/${month}/${day}  ${hour}:${minute}`
}

const state = {
  // 公共数据模块
  notificationNum: 0,
  notificationList: []
}

function cmp(a, b) {
  if ((a.sticked && b.sticked) || (!a.sticked && !b.sticked)) {
    return b.createTime - a.createTime
  } else {
    return a.sticked ? -1 : 1
  }
}

export default {
  // 存储状态
  state: state,
  // 显示的更改state
  mutations: {
    deleteNotification(state, index) {
      this.state.notificationList.splice(index, 1)
      this.state.notificationNum = this.state.notificationList.length
    },
    updateNotification(state, notification, index) {
      this.state.notificationList.splice(index, 1, notification)
    },
    addNotification(state, notification) {
      let i = 0
      while (i < this.state.notificationList.length && cmp(notification, this.state.notificationList[i]) > 0) {
        i++
      }
      console.log(i)
      this.state.notificationList.splice(i, 0, notification)
      // this.state.notificationList.push(notification);
      this.state.notificationNum = this.state.notificationList.length
    },
    refreshNotificationList(state, notificationList) {
      this.state.notificationList = notificationList.sort(cmp)
      this.state.notificationNum = this.state.notificationList.length
    }
  },
  // 过滤state中的数据
  getters: {},
  // 异步操作
  actions: {
    // 获取通知列表
    getNotificationListFromServer({ dispatch, commit }) {
      getNotificationList()
        .then(res => {
          const notificationList = res.data.data
          const accountId = localStorage.getItem('accountId')
          for (let i = 0; i < notificationList.length; i++) {
            notificationList[i].confirmed = notificationList[i].confirmation[accountId]
          }
          commit('refreshNotificationList', notificationList)
          // this.refreshNotificationList(res.data.data);
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 处理新收到的通知
    handleNewNotification({ dispatch, commit }, notification) {
      // 更新通知列表
      commit('addNotification', notification)
      // 可自动关闭的通知弹窗
      Notification({
        title: notification.title,
        message: notification.content
      })
    }
  }
}
