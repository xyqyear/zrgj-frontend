<template>
  <div>
    <div class="line"></div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#545C64"
      active-text-color="#3A96FF"
      style="display: flex; justify-content: space-between;margin-bottom:20px;"
    >
      <el-menu-item @click="clickMenu('1')" index="1">今日订单</el-menu-item>
      <el-menu-item @click="clickMenu('2')" index="2">订单列表</el-menu-item>
      <el-menu-item @click="clickMenu('3')" index="3">销售统计</el-menu-item>
    </el-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="less" scoped>
el-header {
  background: #fff;
}
</style>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      menu: [
        {
          path: "/case/page1",
          name: "page1",
        },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(index) {
      var path='';
      switch(index){
        case '1':
          path='page1';
          break;
        case '2':
          path='page2';
          break;
        case '3':
          path='page3';
          break;
      }
      this.$router.push({
        name: path,
      });
    },
  },
};
</script>