<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <i
            class="el-icon-user-solid"
            style="width: 100px; font-size: 36px"
          ></i>
          <!-- 不用icon就用 -->
          <!-- <img :src="userImage"/> -->
          <div class="userInfo">
            <p class="name">Admain</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022.02.06</span></p>
          <p>上次登录地点：<span>四川广安</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="'el-icon-'+item.icon"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div style="height:280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px"></el-card>
        <el-card style="height: 260px"></el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {getMenu} from '../../../api/data.js'
import {getData} from '../../../api/data.js'
import * as echarts from 'echarts'
export default {
  name: "home",
  data() {
    return {
      // userImage:require('../')
      tableData: [
        {
          name: "oppo",
          todayBuy: 500,
          monthBuy: 3500,
          totalBuy: 22000,
        },
        {
          name: "vivo",
          todayBuy: 300,
          monthBuy: 2200,
          totalBuy: 24000,
        },
        {
          name: "苹果",
          todayBuy: 800,
          monthBuy: 4500,
          totalBuy: 65000,
        },
        {
          name: "小米",
          todayBuy: 1200,
          monthBuy: 6500,
          totalBuy: 45000,
        },
        {
          name: "三星",
          todayBuy: 300,
          monthBuy: 2000,
          totalBuy: 34000,
        },
        {
          name: "魅族",
          todayBuy: 350,
          monthBuy: 3000,
          totalBuy: 22000,
        },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: "210",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: "1234",
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: "210",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: "1234",
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted(){
      getData().then(res =>{
        const {code, data} = res.data
        if(code===20000){
          this.tableData = data.tableData
          const order = data.orderData
          const keyArray = Object.keys(order.data[0])
          const series = []
          keyArray.forEach(key=>{
              series.push({
                name:key,
                data:order.data.map(item=>item[key]),
                type:'line' 
              })
          })
          const option = {
            xA
          }
        }
          console.log(res)
      })
  }
};
</script>
<style lang="less" scoped>
.userInfo {
  text-align: left;
  .name {
    font-size: 36px;
  }
  .access {
    color: #8f8f8f;
  }
}
.login-info {
  text-align: left;
}
</style>