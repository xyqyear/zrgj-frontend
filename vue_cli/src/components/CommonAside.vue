<template>
  <!-- default-active="1-4-1"  -->
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
      :collapse="isCollapse"
    >
      <h3>{{ isCollapse ? '点餐' : '点餐系统' }}</h3>
      <el-menu-item @click="clickMenu(item.name)" v-for="item in noChildren" :index="item.path+''" :key="item.path">

        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path">
        <template slot="title">
          <i :class="'el-icon-'+item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="(subItem,subIndex) in item.children " :key="subItem.path">
          <el-menu-item @click="clickMenu(subItem.name)" :index="subIndex+''">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <div v-if="!isCollapse" >
        <el-button @click="clickMenu('notification')">
          <el-image fit="fill" style="width: 100px; height: 100px" :src="notificationImg" />
        </el-button>
      </div>
    </el-menu>
  </div>
</template>
<style lang="less" scoped>
.item {
  margin-top: 0;
  margin-right: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 800px;
}

.el-menu {
  height: 100%;
  border: none;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }

  span {
    text-align: left;
  }

  .el-menu-item {
    text-align: left;
  }

  .el-submenu {
    text-align: left;
  }
}


</style>
<script>
import SockJS from  'sockjs-client';
import  Stomp from 'stompjs';
import {apiPrefix, getNotificationList} from '../../api/data'
export default {
  data() {
    return {
      notificationImg: require("../assets/images/notification.png"),
      menu: [],
      notificationList:[]
    };
  },
  mounted() {
    // 获取推送信息
    this.getNotificationListFromServer();
    // 建立sockjs连接
    this.initConnection();
  },
  methods: {
    getNotificationListFromServer(){
      getNotificationList()
        .then(res=>{
          this.notificationList = res.data.data;
        })
        .catch(err=>{
          console.log(err)
        })
    },
    initConnection(){
      let serverInterface = `${apiPrefix}/api/v1/ws?token=${localStorage.getItem("token").substring(7)}`
      console.log(serverInterface);
      let socket = new SockJS(serverInterface);
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        let subscribeChannel = "/notification/" + localStorage.getItem("restaurantId") + '/' + localStorage.getItem('position');
        stompClient.subscribe(subscribeChannel, function (message) {
          let notification = message.body;
          this.handleNewNotification(notification)
        });
      });
    },
    handleNewNotification(notification){

    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    test(item) {
      // console.log(item.name)
    },
    //应该就是通过这玩意，通过name推过去
    clickMenu(name) {
      // console.log(item.name)
      if (this.$route.path === '/' + name) {
        // console.log('invalid page change')
      } else {
        this.$router.push({name: name})
      }

    }

  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter(item => !item.children)//如果当前item没有子项目就直接return

    },
    hasChildren() {
      return this.asyncMenu.filter(item => item.children)//如果当前item没有子项目就直接return
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu() {
      this.$store.commit('setMenu', localStorage.getItem('position'))
      //console(this.$store.state.tab.menu)
      return this.$store.state.tab.menu
      // return localStorage.getItem('menu')
    }
  }
};
</script>
