<template>
  <el-row :gutter="30">
    <!-- ------------------------------- -->
    <el-col :span="24">
      <el-card shadow="hover">
        <div class="user">
          <!-- ------------------------------------------------ -->
          <div class="img" style="height: 100%; width: 20%">
            <img :src="roomImage" style="width: 80px; height: 80px" />
          </div>
          <div class="userInfo">
            <p class="name">{{ name }}</p>
            <p class="phone" style="margin-top: 10px">联系电话: {{ phone }}</p>
            <p class="location">公司地址: {{ location }}</p>
          </div>
        </div>
        <!-- <div class="login-info">
          <p>上次登录时间：<span>2022.02.06</span></p>
          <p>上次登录地点：<span>四川广安</span></p>
        </div> -->
      </el-card>
    </el-col>
    <!-- ------------------------------- -->
    <!-- <el-col :span="12">
      <div class="statistic" style="display:flex"> 
      <el-card shadow="hover" style="width:200px;height: 180px"> 
      </el-card> 
      <el-card shadow="hover" style="height: 180px"> 
      </el-card> 
      </div>
    </el-col> -->
    <!-- -------------第二行------------------ -->
    <el-col :span="12" style="margin-top: 20px">
      <el-card style="margin-left: 20px">
        <div class="saleCount">
          <div class="sale">
            <p style="font-size: 16px; font-weight: 800; margin-bottom: 20px">
              今日营业额（元）
            </p>
            <p>哇哩哇</p>
          </div>
          <div class="countNum">{{ todayAmount.Money }}</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12" style="margin-top: 20px">
      <el-card style="margin-left: 20px">
        <div class="saleCount">
          <div class="sale">
            <p style="font-size: 16px; font-weight: 800; margin-bottom: 20px">
              今日有效订单（个）
            </p>
            <p>哇哩哇</p>
          </div>
          <div class="countNum">{{ todayAmount.Order }}</div>
        </div>
      </el-card>
    </el-col>
    <!-- ------------表格哇------------------- -->
    <el-col :span="24" style="margin-top: 20px">
      <el-card shadow="hover" style="height: 350px">
        <div>
          <el-radio-group v-model="radio1" @change="chooseDays(radio1)">
            <el-radio-button label="近一周"></el-radio-button>
            <el-radio-button label="近一月"></el-radio-button>
            <el-radio-button label="近三月"></el-radio-button>
            <el-radio-button label="近半年"></el-radio-button>
          </el-radio-group>
        </div>
        <div style="height: 280px" ref="echarts">
          <!-- ------------------------------------------------ -->
        </div>
        <!-- <div class="login-info">
          <p>上次登录时间：<span>2022.02.06</span></p>
          <p>上次登录地点：<span>四川广安</span></p>
        </div> -->
      </el-card>
    </el-col>
    <!-- -------------- 商品种类 ---------------->
    <div style="display: flex; width: 100%; justify-content: space-around">
      <el-col :span="6" style="margin-top: 20px">
        <el-card>
          <div class="numCount">
            <div class="item">
              <p style="font-size: 40px; font-weight: 400; margin-bottom: 20px">
                {{ sale_kinds }}
              </p>
              <p>商品种类</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6" style="margin-top: 20px">
      <el-card style="margin-left: 20px">
        <div class="numCount">
          <div class="item">
            <p style="font-size: 40px; font-weight: 400; margin-bottom: 20px">
              {{ statistic.goods }}
            </p>
            <p>商品数量</p>
          </div>
        </div>
      </el-card>
    </el-col> -->
      <!-- --------------员工数量  ---------------->
      <el-col :span="6" style="margin-top: 20px">
        <el-card style="margin-left: 20px">
          <div class="numCount">
            <div class="item">
              <p style="font-size: 40px; font-weight: 400; margin-bottom: 20px">
                {{ statistic.workers }}
              </p>
              <p>员工数量</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </div>
    <!-- <el-col :span="6" style="margin-top: 20px">
      <el-card style="margin-left: 20px">
        <div class="numCount">
          <div class="item">
            <p style="font-size: 40px; font-weight: 400; margin-bottom: 20px">
              {{ provider_count }}
            </p>
            <p>供应商数量</p>
          </div>
        </div>
      </el-card>
      <el-button type="primary" @click="testButton">测试</el-button>
    </el-col> -->
    <!-- <el-col :span="50" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="todayMoney">
            <p>今日营业额（元）</p>
          </div>
        </el-card> -->
  </el-row>
</template>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
//第一行
.user {
  display: flex;
  align-items: center;
  .name {
    font-size: 20px;
    font-weight: 800;
  }
  .userInfo {
    width: 60%;
    height: 100%;
    display: flex;
    flex-flow: column;
    //flex-wrap: wrap;
    justify-content: space-between;
    justify-items: space-between;
    text-align: left;
    .phone {
      line-height: 30px;
    }
  }
}
//第二行
.saleCount {
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  text-align: left;
  .sale {
    width: 200px;
    height: 50%;
  }
  .countNum {
    width: 100px;
  }
}
//第四行
.numCount {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.statNum {
  width: 100%;
  height: 100%;
  display: flex;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<script>
import axios from "axios";
import { getMenu } from "../../../api/data.js";
import { getData } from "../../../api/data.js";
import { getGivenTimeOrders } from "../../../api/data.js";
import { getUserlist } from "../../../api/data";
import { getAllFood } from "../../../api/data";
import * as echarts from "echarts";
export default {
  name: "home",
  toTime:'',
  data() {
    return {
      //第一行
      name: "餐饮管理有限公司XX分店",
      phone: "15608209829",
      location: "哇哩哇市哇哩哇区哇哩哇县",
      roomImage: require("../../assets/images/logo.png"),
      //第二行,今日营业额，今日有效订单数
      todayAmount: {
        Money: 0,
        Order: 0,
      },
      //商品数量，员工数量
      statistic: {
        goods: 0,
        workers: 0,
      },
      //第三行——表格
      radio1: "近一周",
      xData: [],
      //第四行
      sale_kinds: "46",
      sale_count: "147",
      worker_count: "28",
      provider_count: "3",

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
  created() {
    //访问接口，加请求头
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    this.getTodayAmount();
    this.getStatistic();
  },
  // mounted(){

  //   console.log(this.todayAmount)
  // },
  mounted() {
    body:
      getData().then((res) => {
      // getGivenTimeOrders()也许把所有请求到的数据放到
        localStorage.setItem('allOrders',JSON.stringify(res.data))
        console.log()
        this.chooseDays('近一周')
        // console.log("表格");
        // console.log(res);
        const { code, data } = res.data;
        if (code === 20000) {
          // this.tableData = data.tableData; //
          const order = data.orderData; //
          const xData = order.date; //这个是横坐标，需要根据空间按钮控制时间
          // const keyArray = Object.keys(order.data[0]);
          const keyArray = ['营业额']
          // console.log('keyArray')
          // console.log(keyArray)
          const series = [];
          keyArray.forEach((key) => {
            // console.log(key)就是那些字段的名称
            series.push({
              name: key,
              data: order.data.map((item) => item[key]),//这就是一个7长度的数组，里面存数字
              type: "line",
            });
          });
  
          const option = {
            xAxis: {
              //横坐标？
              data: this.xData,
            },
            yAxis: {}, //这些变量好像都要定义
            legend: {
              //这个不是图例吗，
              data: keyArray,
            },
            series,
          };
  
          const E = echarts.init(this.$refs.echarts);
          E.setOption(option);
        }
      });
    

    
  },
  methods: {
    //获取今日的数据
    getTodayAmount() {
      /////////////////////获取所有订单/////////////////////
      let fromTime =
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() - 24 * 3600 * 1000
        ).getTime() / 1000;
       this.toTime =
        new Date(
          new Date(new Date().toLocaleDateString()).getTime()
        ).getTime() / 1000;
      var body = {};
      body.from = 0;
      body.to = 1645977600;
      // console.log(toTime)
      /////////////////返回值/////////////////////////
      var todayMoney = 0;
      var todayOrder = 0;
      //////////////////////////////////////////
      getGivenTimeOrders(body)
        .then((res) => {
          console.log(res)
          for (let i = 0; i < res.data.data.length; i++) {
            todayMoney += res.data.data[i].totalPrice; //今日营业额
            if (res.data.data[i].state == 0) todayOrder += 1; //今日有效订单
          }
          this.todayAmount.Money = todayMoney;
          this.todayAmount.Order = todayOrder;
          // res.data.forEach(item => {
          //   console.log('item.totalPrice:'+item.totalPrice)
          // });
        })
        .catch((error) => {
          console.log("getGivenTimeOrders error" + error.response);
        });
    },
    getStatistic() {
      var worker = 0;
      var good = 0;
      //////////////////////获取员工数量///////////////////////////////
      getUserlist()
        .then((res) => {
          worker = res.data.data.length;
          this.statistic.workers = worker;
        })
        .catch((error) => {
          console.log(error.response.data.reason);
        });
      //////////////////////获取商品数量///////////////////////////////
      getAllFood()
        .then((res) => {
          good = res.data.data.length;

          this.statistic.goods = good;
        })
        .catch((error) => {
          console.log(error.response.data.reason);
        });
    },
    chooseDays(value) {
      var nowDate = new Date();
      if (value == "近一周") {
        this.xData.length = 0
        for(let i = 0;i<7;i++){
          var date = {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth() + 1,
            day: nowDate.getDate()-i,
          };
          var systemDate = date.year + '-' + (date.month >= 10 ? date.month : '0' + date.month) + '-' + (date.day >= 10 ? date.day : '0' + date.day)
          //console.log(systemDate);
          this.xData.push(systemDate)
        }
          this.xData.reverse()
      } else if (value == "近一月") {
      } else if (value == "近三月") {
      } else if (value == "近半年") {
      }

      // axios.defaults.headers.common["Authorization"] =
      //         localStorage.getItem("token");
      // getUserlist()
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((error) => {
      //     console.log(error.response.data.reason);
      //   });
    },
  },
};
</script>