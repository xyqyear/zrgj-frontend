<!-- 感觉这里就是那个大框框，然后只需要更改权限和用户登录的接口在这改了。-->
<template>
  <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  <el-container style="height: 100%">
    <el-aside width="auto" style="display: flex; flex-direction: column">
      <common-aside></common-aside>
      <!-- 驼峰命名，注意这里，不过可能也用不到了 -->
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <!-- 这就是嵌套路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-container {
  height: 100%;
}
.el-aside {
  background: #4a525a;
  height: 100%;
}
.el-menu {
  background: #4a525a;
  border: 0;
}
.el-submenu__title {
  color: white;
}
.el-menu-item {
  color: white;
}
.el-header {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: #2c3e50;
  padding: 0;
}
</style>

<script>
// import CommonAside from "../components/CommonAside.vue";
export default {
  data() {
    return {}
  }
}
//
</script>
<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'

import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { apiPrefix } from '../../api/data'

export default {
  name: 'Main',
  created() {
    if (this.$router.currentRoute.name === 'Main'){
      this.$router.push({
        name: { 0: 'home', 1: 'serFood', 2: 'chef' }[
          localStorage.getItem("position")
          ]
      })
    }
  },
  async mounted() {
    await this.$store.dispatch('getNotificationListFromServer')
    await this.$store.dispatch('getOrderListFromServer')

    console.log('start to init websocket connection')
    const serverInterface = `${apiPrefix}/api/v1/ws?token=` + localStorage.getItem('token').substring(7)
    console.log(serverInterface)
    const socket = new SockJS(serverInterface)
    const stompClient = Stomp.over(socket)
    stompClient.connect({}, () => {
      stompClient.subscribe('/notification/' + localStorage.getItem('restaurantId') + '/' + localStorage.getItem('position'), (message) => {
        const notification = JSON.parse(message.body)
        this.$store.dispatch('handleNewNotification', notification)
      })
      stompClient.subscribe('/orders/' + localStorage.getItem('restaurantId'), (message) => {
        const orderList = JSON.parse(message.body)
        this.$store.commit('refreshOrderList', orderList)
      })
    })
  },
  components: { CommonAside, CommonHeader }
}
</script>
