import {getNotificationList} from "../../api/data";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  //存储状态
  state: {
    // 公共数据模块
    notificationList: []

  },
  //显示的更改state
  mutations: {
    addNotification(state, notification) {
      this.state.notificationList.push(notification);
    },
    refreshNotificationList(state, notificationList) {
      this.state.notificationList = notificationList;
    },
  },
  //过滤state中的数据
  getters: {},
  //异步操作
  actions: {
    getNecessaryDataAfterLogin({dispatch, commit}) {
      console.log("start to get necessary data [notificationList, initConnection]")
      dispatch("getNotificationListFromServer");
      dispatch("initConnection");
    },
    // 获取通知列表
    getNotificationListFromServer({dispatch, commit}) {
      getNotificationList()
        .then(res => {
          console.log('res.data.data', res.data.data)
          commit("refreshNotificationList", res.data.data)
          // this.refreshNotificationList(res.data.data);
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 建立接受实时通知的连接
    initConnection({dispatch, commit}) {
      console.log("start to init websocket connection");
      let serverInterface = "http://localhost:5678/api/v1/ws?token=" + localStorage.getItem("token").substring(7)
      console.log(serverInterface);
      let socket = new SockJS(serverInterface);
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        let subscribeChannel = "/notification/" + localStorage.getItem("restaurantId") + '/' + localStorage.getItem('position');
        stompClient.subscribe(subscribeChannel, function (message) {
          let notification = message.body;
          dispatch("handleNewNotification", notification)
        });
      });
    },
    // 处理新收到的通知
    handleNewNotification({dispatch, commit}, notification) {
      // 更新通知列表
      commit("addNotification", notification);

      // 可自动关闭的通知弹窗
      const h = this.$createElement;
      this.$notify({
        title: notification.title,
        message: h('i', {style: 'color: teal'}, notification.content)
      });
    },
  }
}
