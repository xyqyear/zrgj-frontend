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
        <div class="timebar">
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
.timebar{
  display: flex;
  justify-content: right;
}
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
  toTime: "",
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
      interval:1,
      body: {
        from: 0,
        to: 0,
      },
      //第四行
      sale_kinds: "46",
      sale_count: "147",
      worker_count: "28",
      provider_count: "3",


    };
  },
  created() {
    this.getTodayAmount();
    this.getStatistic();
  },
  // mounted(){

  //   console.log(this.todayAmount)
  // },
  mounted() {
    this.chooseDays(this.radio1); //首先setbody数据
  },
  methods: {
    //获取时间戳,前几天
    getTimeNum(day) {
      return Math.ceil(
        new Date(Date.now() - day * 24 * 3600 * 1000).getTime() / 1000
      );
    },
    //获取今日的数据
    getTodayAmount() {
      /////////////////////获取所有订单/////////////////////
      let fromTime = this.getTimeNum(1);
      this.toTime = this.getTimeNum(0);
      var body = {};
      body.from = fromTime;
      body.to = this.toTime;
      console.log(body);
      /////////////////返回值/////////////////////////
      var todayMoney = 0;
      var todayOrder = 0;
      //////////////////////////////////////////
      getGivenTimeOrders(body)
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            todayMoney += res.data.data[i].totalPrice; //今日营业额
            if (res.data.data[i].state == 0) todayOrder += 1; //今日有效订单
          }
          this.todayAmount.Money = todayMoney;
          this.todayAmount.Order = todayOrder;
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
      //设置间隔
      this.interval = 0;
      switch (this.radio1) {
        case "近一周":
          this.interval = 1;
          break;
        case "近一月":
          this.interval = 4;
          break;
        case "近三月":
          this.interval = 12;
          break;
        case "近半年":
          this.interval = 24;
          break;
      }
      //设置body
      let fromTime = this.getTimeNum(7);
      this.body.from = fromTime;
      this.body.to = this.toTime;
      //设置横坐标xData
        this.xData.length = 0;
        console.log(this.interval)
        for (let i = 0; i < 7; i++) {
          var oldTime  = new Date(Date.now() - i * this.interval * 24 * 3600 * 1000);
          var newTime = new Date(oldTime); 
          var date = {
            year: newTime.getFullYear(),
            month: newTime.getMonth()+1,
            day: newTime.getDate(),
          };
          var systemDate =
            date.year +
            "-" +
            (date.month >= 10 ? date.month : "0" + date.month) +
            "-" +
            (date.day >= 10 ? date.day : "0" + date.day);
          //console.log(systemDate);
          this.xData.push(systemDate);
        }
        this.xData.reverse();
        //设置表格
    const series = [];
    getGivenTimeOrders(this.body).then((res) => {
      var dataArray = res.data.data;
      // series.push({
      //   name: '营业额',
      //   data: res.data.data.map((item) => item[key]),//这就是一个7长度的数组，里面存数字
      //   type: "line",
      // });
      //哇哩哇加油！
      
      var totalPrice = 0;
      var seriesArray = [];
      var keyArray=[];
      keyArray.push('营业额')
      for (let i = 0; i < 7; i++) {
        var fromTime = this.getTimeNum(((i+1) * this.interval)+1);
        var toTime = this.getTimeNum(i * this.interval);
        for (let j = 0; j < dataArray.length; j++) {
          if (dataArray[j].createTime >= fromTime && 
          dataArray[j].createTime <= toTime) {
            totalPrice += dataArray[j].totalPrice;
            
          }
        }
        seriesArray.push(totalPrice);
        totalPrice = 0;
      }
      seriesArray.reverse()
      series.push({
            name: '营业额',
            data: seriesArray, //这就是一个7长度的数组，里面存数字
            type: "line",
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
    });

  
    
    },
  },
};
</script>