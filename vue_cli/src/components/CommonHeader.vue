<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        :icon="tabPacked?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"
        size="mini"
      ></el-button>
    </div>
    <!-- 个人信息 -->
    <div class="r-content">
      <el-dropdown trigger="click" szie="medium " style="font-size:24px" @command="handleCommand">
        <span class="el-dropdown-link">
          <!-- <img class="user" :src="userImg" > -->
          <i class="el-icon-user-solid"></i>
          <!-- 这里也可以换成图片，我嫌麻烦就没搞了 -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="perCen">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-operation" command="quit">退出</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require('../assets/images/logo.png'),
      tabPacked: false
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    handleCommand(command) {
      switch (command) {
        case 'perCen':

          break;
        case 'quit':
          this.$router.push({name: 'login'});
          localStorage.removeItem('token');

          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between; //这玩意绝了，记住了！
  align-items: center;
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-left: 20px;
  }
}

.r-content {
  align-items: center;

  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  text-align: right;

  .el-dropdown-link {
    margin-right: 20px;
    border-radius: 50%; //就是圆形
  }
}
</style>
