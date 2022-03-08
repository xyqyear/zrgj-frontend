<template>
  <!-- default-active="1-4-1"  -->
  <div style="flex: 1">
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
      <div class="filler"></div>
      <div v-if="!isCollapse">
        <el-menu-item @click="showNotificationPage" index="/notification" style="display: flex; flex-direction: row; align-content: center">
          <div class=el-icon-message-solid style="display: flex; flex-direction: column; justify-content: center"></div>
          <span>通知</span>
          <div>
            <el-badge :value="notificationNum" style="bottom: 10px; left: 3px">
            </el-badge>
          </div>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<style lang="less" scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.el-menu {
  border: none;
  display: flex;
  flex-direction: column;

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

  .filler {
    flex: 1;
  }
}

</style>
<script>
export default {
  data() {
    return {
      notificationImg: require("../assets/images/notification.png"),
      menu: [],
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showNotificationPage() {
      this.clickMenu('notification');
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
    clickMenu(name) {
      if (this.$route.path === '/' + name) {
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
      return this.$store.state.tab.menu
    },
    notificationList() {
      return this.$store.state.notificationList
    },
    notificationNum() {
      return this.$store.state.notificationNum
    }
  }
};
</script>
