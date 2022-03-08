<template>
  <div>
    <div class="line"></div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      @select="handleSelect"
      background-color="#fff"
      text-color="#545C64"
      active-text-color="#3A96FF"
      style="display: flex; justify-content: space-between; margin-bottom: 20px"
    >
      <el-menu-item index="/page1">今日订单</el-menu-item>
      <el-menu-item index="/page2">订单列表</el-menu-item>
      <el-menu-item index="/page3">销售统计</el-menu-item>
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
      activeIndex2: '1',
      menu: [
        {
          path: '/case/page1',
          name: 'page1'
        }
      ]
    }
  },
  mounted() {
    console.log('刷新啦')
  },
  created() {
    this.activeIndex2 = '1'
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
