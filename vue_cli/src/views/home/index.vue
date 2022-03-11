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
            <!-- <p>哇哩哇</p> -->
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
            <!-- <p>哇哩哇</p> -->
          </div>
          <div class="countNum">{{ todayAmount.Order }}</div>
        </div>
      </el-card>
    </el-col>
    <!-- ------------表格哇------------------- -->
    <el-col :span="24" style="margin-top: 20px">
      <el-card shadow="hover" style="height: 380px">
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
        <div>
          <el-link type="primary" href="page3">查看更多</el-link>
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
.timebar {
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
import {
  getGivenTimeOrders,
  getObjectMap,
  getUserlist,
  getAllFood
} from '../../../api/data.js'

import * as echarts from 'echarts'
export default {
  name: 'home',
  toTime: '',
  data() {
    return {
      // 第一行
      name: '餐饮管理有限公司XX分店',
      phone: '15608209829',
      location: '重庆市渝北区华山南路16号',
      roomImage: require('../../assets/images/logo.png'),
      // 第二行,今日营业额，今日有效订单数
      todayAmount: {
        Money: 0,
        Order: 0
      },
      // 商品数量，员工数量
      statistic: {
        goods: 0,
        workers: 0
      },
      // 第三行——表格
      radio1: '近一周',
      xData: [],
      interval: 1,
      body: {
        from: 0,
        to: 0
      },
      dishMap: {},
      // 第四行
      // TODO: load dynamic dish num
      sale_kinds: '46',
      sale_count: '147',
      worker_count: '28',
      provider_count: '3'
    }
  },
  created() {},
  // mounted(){

  // },
  async mounted() {
    await this.getStatistic()
    this.getTodayAmount()
    this.chooseDays(this.radio1) // 首先setbody数据
  },
  methods: {
    // 获取时间戳,现在的时间
    getNowTimeNum() {
      return Math.ceil(new Date(Date.now()).getTime() / 1000)
    },
    // 获取某一天的开始时间
    getTimeNum(day) {
      return Math.ceil(
        new Date(
          new Date().setHours(0, 0, 0, 0) - day * 24 * 3600 * 1000
        ).getTime() / 1000
      )
    },
    // 获取今日的数据
    getTodayAmount() {
      /// //////////////////获取所有订单/////////////////////
      const fromTime = this.getTimeNum(0) // 修改成当天开始的时间戳
      this.toTime = this.getNowTimeNum()
      const body = {}
      body.from = fromTime
      body.to = this.toTime
      /// //////////////返回值/////////////////////////
      let todayMoney = 0
      let todayOrder = 0
      /// ///////////////////////////////////////
      getGivenTimeOrders(body)
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            todayMoney += res.data.data[i].orderItems
              .filter((orderItem) => orderItem.state !== -1)
              .reduce(
                (acc, cur) => acc + this.dishMap[cur.dishId].price * cur.amount,
                0
              ) // 今日营业额
            if (res.data.data[i].state === 0) todayOrder += 1 // 今日有效订单
          }
          this.todayAmount.Money = todayMoney
          this.todayAmount.Order = todayOrder
        })
        .catch((_) => {
        })
    },
    getStatistic() {
      let worker = 0
      let good = 0

      /// ///////////////////获取员工数量///////////////////////////////
      getUserlist()
        .then((res) => {
          worker = res.data.data.length
          this.statistic.workers = worker
        })
        .catch((_) => {
        })
      /// ///////////////////获取商品数量///////////////////////////////
      return getAllFood()
        .then((res) => {
          good = res.data.data.length
          const foodData = res.data.data
          // 获取dishMap
          this.dishMap = getObjectMap(foodData)
          this.statistic.goods = good
        })
        .catch((_) => {
        })
    },
    chooseDays(value) {
      // 设置间隔
      let days = 0
      this.interval = 0
      switch (this.radio1) {
        case '近一周':
          days = 7
          this.interval = 0
          break
        case '近一月':
          days = 30
          this.interval = 1
          break
        case '近三月':
          days = 90
          this.interval = 4
          break
        case '近半年':
          days = 180
          this.interval = 12
          break
      }
      // 设置body
      const fromTime = this.getTimeNum(days)
      this.body.from = fromTime
      this.body.to = this.getNowTimeNum()
      // 设置横坐标xData
      this.xData = []
      for (let i = 0; i < days; i++) {
        // 啊啊啊想一想啊
        const oldTime = new Date(Date.now() - i * 24 * 3600 * 1000)
        const newTime = new Date(oldTime)
        const date = {
          year: newTime.getFullYear(),
          month: newTime.getMonth() + 1,
          day: newTime.getDate()
        }
        const systemDate =
          date.year +
          '-' +
          (date.month >= 10 ? date.month : '0' + date.month) +
          '-' +
          (date.day >= 10 ? date.day : '0' + date.day)
        this.xData.push(systemDate)
      }
      this.xData.reverse()
      // 设置表格
      const series = []
      getGivenTimeOrders(this.body).then((res) => {
        const dataArray = res.data.data
        // series.push({
        //   name: '营业额',
        //   data: res.data.data.map((item) => item[key]),//这就是一个7长度的数组，里面存数字
        //   type: "line",
        // });
        // 哇哩哇加油！

        let totalPrice = 0
        const seriesArray = []
        const keyArray = []
        /// body的三个时间
        let tempTime = 0
        let fromTime = this.getNowTimeNum()
        let toTime = 0
        keyArray.push('营业额')
        for (let i = 0; i < days; i++) {
          tempTime = fromTime
          toTime = tempTime
          fromTime = this.getTimeNum(i)
          for (let j = 0; j < dataArray.length; j++) {
            if (
              dataArray[j].createTime >= fromTime &&
              dataArray[j].createTime <= toTime
            ) {
              totalPrice += dataArray[j].orderItems
                .filter((orderItem) => orderItem.state !== -1)
                .reduce(
                  (acc, cur) =>
                    acc + this.dishMap[cur.dishId].price * cur.amount,
                  0
                )
            }
          }

          seriesArray.push(totalPrice)
          totalPrice = 0
        }
        seriesArray.reverse()
        series.push({
          name: '营业额',
          data: seriesArray, // 这就是一个7长度的数组，里面存数字
          type: 'line'
        })
        const option = {
          xAxis: {
            // 横坐标？
            data: this.xData,
            axisLabel: {
              interval: this.interval,
              rotate: -30,
              color: '#333'
            }
          },
          yAxis: {}, // 这些变量好像都要定义
          legend: {
            // 这个不是图例吗，
            data: keyArray
          },
          series
        }

        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)
      })
    }
  }
}
</script>
