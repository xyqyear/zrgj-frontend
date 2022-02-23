<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="medium " style="font-size:24px">
        <span class="el-dropdown-link">
          <i class="el-icon-user-solid"></i>
          <!-- 这里也可以换成图片，我嫌麻烦就没搞了 -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<style lang="less" scoped>
header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;//这玩意绝了，记住了！
  align-items: center;
}
.l-content {
    display: flex;
    align-items: center;
    .el-button{
        margin-left: 20px;
    }
}
.r-content {
  text-align: right;
  .el-dropdown-link{
      margin-right: 20px;
      border-radius: 50%;//就是圆形
  }
}
</style>
<script>
export default {
  name: "CommonHeader",
  data(){
      return{

      }
  },
  methods:{
      handleMenu(){
          this.$store.commit('collapseMenu')
      }
  }
};
</script>

