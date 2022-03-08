import {apiPrefix, getNotificationList, getRestaurant} from "../../api/data";
import {Notification} from 'element-ui';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const getReadableTime = (ts) => {
  let date = new Date(ts * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  return `${year}/${month}/${day}  ${hour}:${minute}`;
}

const state = {
  // 公共数据模块
  notificationNum: 0,
  notificationList: []
}

export default {
  //存储状态
  state: state,
  //显示的更改state
  mutations: {
    addNotification(state, notification) {
      this.state.notificationList.push(notification);
      this.state.notificationNum = this.state.notificationList.length;
    },
    refreshNotificationList(state, notificationList) {
      this.state.notificationList = notificationList.sort((a, b) => {
        if ((a.sticked && b.sticked) || (!a.sticked && !b.sticked)) {
          return b.createTime - a.createTime;
        } else {
          return a.sticked ? -1 : 1;
        }
      });
      this.state.notificationNum = this.state.notificationList.length;
    },
  },
  //过滤state中的数据
  getters: {},
  //异步操作
  actions: {
    getNecessaryDataAfterLogin({dispatch, commit}) {
      console.log("start to get necessary data [notificationList, initConnection]")
      // 获取推送信息
      dispatch("getNotificationListFromServer");
      // 建立sockjs连接
      dispatch("initConnection");
    },
    // 获取通知列表
    getNotificationListFromServer({dispatch, commit}) {
      getNotificationList()
        .then(res => {
          let notificationList = res.data.data;
          let accountId = localStorage.getItem("accountId");
          for (let i = 0; i < notificationList.length; i++) {
            notificationList[i].confirmed = notificationList[i]["confirmation"][accountId];
          }
          commit("refreshNotificationList", notificationList)
          // this.refreshNotificationList(res.data.data);
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 建立接受实时通知的连接
    initConnection({dispatch, commit}) {
      console.log("start to init websocket connection");
      let serverInterface = `${apiPrefix}/api/v1/ws?token=` + localStorage.getItem("token").substring(7)
      console.log(serverInterface);
      let socket = new SockJS(serverInterface);
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        let subscribeChannel = "/notification/" + localStorage.getItem("restaurantId") + '/' + localStorage.getItem('position');
        stompClient.subscribe(subscribeChannel, function (message) {
          let notification = JSON.parse(message.body);
          dispatch("handleNewNotification", notification)
        });
      });
    },
    // 处理新收到的通知
    handleNewNotification({dispatch, commit}, notification) {
      // 更新通知列表
      commit("addNotification", notification);
      // 可自动关闭的通知弹窗
      Notification({
        title: notification.title,
        message: notification.content
      });
    },
  },
}
