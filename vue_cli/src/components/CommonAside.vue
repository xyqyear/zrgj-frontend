<template>
  <!-- default-active="1-4-1"  -->
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
        <h3>{{isCollapse ? '点餐':'点餐系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path+''" :key="item.path">

      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group  v-for="(subItem,subIndex) in item.children " :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex+''">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
  .el-menu{
    height: 100%;
    border: none;
    h3{
      color: #fff;
      text-align:center;
      line-height: 48px;
    }
    span{
      text-align:left;
    }
    .el-menu-item{
      text-align: left;
    }
    .el-submenu{
      text-align: left;
    }
}


</style>
<script>
export default {
  data() {
    return {
      menu:[
        {
          path:'/',
          name:'home',
          label:'主页',
          icon:'s-home',
          url:'Home/Home'
        },
        {
          path:'/table',
          name:'table',
          label:'桌台管理',
          icon:'video-play',//自己记得改icon
          url:'TableManage/TabelManage'//?
        },
        {
          path:'/case',
          name:'case',
          label:'订单管理',
          icon:'user',//自己记得改icon
          url:'CaseManage/CaseManage'
        },
        {
          path:'/food',
          name:'food',
          label:'菜品管理',
          icon:'user',//自己记得改icon
          url:'FoodManage/FoodManage'
        },
        
        {
          label:'其他',
          icon:'location',
          children:[
            {
              path:'/vip',
              name:'vip',
              label:'会员管理',
              icon:'setting',//自己记得改icon
              url:'VipManager/VipManager'
            },
            {
              path:'/setting',
              name:'setting',
              label:'系统设置',
              icon:'setting',//自己记得改icon
              url:'SystemSetting/SystemSetting'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    test(item){
      console.log(item.name)
    },
    //应该就是通过这玩意，通过name推过去
    clickMenu(item){
      console.log(item.name)
      this.$router.push({
        name: item.name

      })
    }
    
  },
  computed:{
    noChildren(){
      return this.menu.filter(item =>!item.children)//如果当前item没有子项目就直接return

    },
    hasChildren(){
      return this.menu.filter(item =>item.children)//如果当前item没有子项目就直接return
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  }
};
</script>