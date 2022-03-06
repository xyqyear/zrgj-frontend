<template>
  <div class="perInfo">
    <el-row class="home" :gutter="20">
      <el-col class="header" :span="10" style="display: flex">
        <div class="block">
          <el-date-picker
            v-model="value1"
            value-format="timestamp"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="onChange"
            :picker-options="pickerOptions"
            style="width: 90%"
          >
          </el-date-picker>
        </div>
        <!-- <div class="demo-input-suffix">
          起始时间：
          <el-input
            placeholder="请选择日期"
            suffix-icon="el-icon-date"
            v-model="input1"
          >
          </el-input>
          截止时间：
          <el-input
            placeholder="请选择日期"
            suffix-icon="el-icon-date"
            v-model="input1"
          >
          </el-input>
        </div> -->
      </el-col>
    </el-row>
    <el-col :span="24" style="margin-top: 20px">
      <el-card shadow="hover" style="height: 350px">
        <div class="timebar">

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
    <el-card style="height: 450px">
      <div style="height: 400px" ref="moneyEcharts"></div>
    </el-card>
  </div>
</template>
<script>
import { getObjectMap, getAllFood, getGivenTimeOrders } from "../../../../api/data.js";
import * as echarts from "echarts";
export default {
  name: "perCen",
  data() {
    return {
      radio1: "最近一周",
      interval: 1,
      body: {
        from: 0,
        to: 0,
      },
      endTime:0,
      dishMap: {},
      ///////////表格1/////////////
      xData1: [],
      xNum: 7, //横坐标数量
      ///////////表格2/////////////
      allFoodData: [],
      foodName: [],
      xData2: [],
      ///////////时间选择器/////////////
      pickerOptions: {
        disabledDate (date) {
          // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() >= Date.now()
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick: this.onClickImpl1,
          },
          {
            text: "最近一个月",
            onClick: this.onClickImpl2,
          },
          {
            text: "最近三个月",
            onClick: this.onClickImpl3,
          },
          {
            text: "最近半年",
            onClick: this.onClickImpl4,
          },
        ],
      },
      value1: [0,0],
      value2: "",
    };
  },
  mounted() {
    getAllFood().then((res) => {
      const foodData = res.data.data;
      this.dishMap = getObjectMap(foodData);
      this.foodName.length = 0;
      this.allFoodData.length = 0;
      foodData.forEach((item) => {
        this.foodName.push(item.name);
        var element = {
          id: item.id,
          amount: 0,
        };
        this.allFoodData.push(element); //成功！
      });

      this.chooseDays(this.radio1); //首先setbody数据
    });
    //this.setFoodData();
  },
  methods: {
    //根据日期选择确定时
    onChange(){
      if(this.value1[0]!=null && this.value1[1]!=null)
      this.getxNum(this.value1[0],this.value1[1])
    },
    onClickImpl1(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit("pick", [start, end]);
      this.chooseDays('最近一周');
    },
    onClickImpl2(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit("pick", [start, end]);
      this.chooseDays('最近一个月');
    },
    onClickImpl3(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit("pick", [start, end]);
      this.chooseDays('最近三个月');
    },
    onClickImpl4(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
      picker.$emit("pick", [start, end]);
      this.chooseDays('最近半年');
    },
    //获取时间戳,现在的时间
    getNowTimeNum() {
      return Math.ceil(new Date(Date.now()).getTime() / 1000);
    },
    //获取某一天的开始时间
    getTimeNum(day) {
      const todayStartTime =
        new Date(
          new Date().setHours(0, 0, 0, 0) - day * 24 * 3600 * 1000
        ).getTime() / 1000;
      return Math.ceil(
        new Date(
          new Date().setHours(0, 0, 0, 0) - day * 24 * 3600 * 1000
        ).getTime() / 1000
      );
    },
    getxNum(startTime,endTime){
      var timestamp = this.getNowTimeNum()*1000//计算当前时间戳 (毫秒级)
      if(timestamp<endTime){
        var date3 = parseFloat(timestamp) - parseFloat(startTime)
      }else{
        var date3 = parseFloat(endTime) - parseFloat(startTime)
      }
      this.endTime = endTime/1000
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    days = days+1
    this.interval = days
    //分开！
    if(days<=20&&days>=0){
        this.xNum = days
      }else if(days>20)
        this.xNum = 20
    //日期选择设置body
        let fromTime = startTime/1000
        let toTime = endTime/1000
        this.body.from = fromTime
        this.body.to = toTime
      this.setLineChart();
      this.setColumnChart();
    },
    //设置折线图(value有两个值，一个是字符串一个是数组)
    setLineChart() {
      //现在和选择的最终时间之间相距几天
      var days = 0
      if(this.value1[1]!=0){
        var timestamp = this.getNowTimeNum()*1000
        var date3 = parseFloat(timestamp) - parseFloat(this.value1[1])
        days = Math.floor(date3 / (24 * 3600 * 1000));
      }
      //设置横坐标xData
      this.xData1.length = 0;
      //时间戳相减
      console.log('this.value1[0]',this.value1[0])
      console.log('this.value1[1]',this.value1[1])
      let subTimestemp = 0
      if(this.value1[1]===0){
        subTimestemp = 0
      }else{
        subTimestemp = parseFloat(this.getNowTimeNum())*1000-parseFloat(this.value1[1])
      }
      console.log('subTimestemp',subTimestemp)
      for (let i = 0; i < this.xNum; i++) {
        var oldTime = new Date(
          // Date.now() - i * this.interval * 24 * 3600 * 1000
          //无间隔，每一天
          Date.now() - (i+days) * 24 * 3600 * 1000 * (this.interval / this.xNum)
        );

        var newTime = new Date(oldTime);
        var date = {
          year: newTime.getFullYear(),
          month: newTime.getMonth() + 1,
          day: newTime.getDate(),
        };
        var systemDate =
          date.year +
          "-" +
          (date.month >= 10 ? date.month : "0" + date.month) +
          "-" +
          (date.day >= 10 ? date.day : "0" + date.day);
        console.log('好奇怪')
        console.log(systemDate)
        this.xData1.push(systemDate);
      }
      this.xData1.reverse();
      //设置纵坐标
      const series = [];
      getGivenTimeOrders(this.body).then((res) => {
        var dataArray = res.data.data;

        var totalPrice = 0;
        var seriesArray = [];
        var keyArray = [];
        //设置纵坐标，通过横坐标的个数和interval
        var tempTime = 0;
        var fromTime = this.getNowTimeNum();
        var toTime = 0;
        keyArray.push("营业额");
        for (let i = 0; i < this.xNum; i++) {
          tempTime = fromTime;
          toTime = tempTime;
          // fromTime = this.getTimeNum(i * this.interval);
          fromTime = this.getTimeNum(i);//倘若没有时间间隔，就一天一天来
          for (let j = 0; j < dataArray.length; j++) {
            if (
              dataArray[j].createTime >= fromTime &&
              dataArray[j].createTime <= toTime
            ) {
              totalPrice += dataArray[j].orderItems
                .filter((orderItem) => orderItem.state !== -1)
                .reduce(
                  (acc, cur) => acc + this.dishMap[cur.dishId].price * cur.amount,
                  0
                );
            }
          }
          seriesArray.push(totalPrice);
          totalPrice = 0;
        }
        seriesArray.reverse();
        series.push({
          name: "营业额",
          data: seriesArray, //这就是一个7长度的数组，里面存数字
          type: "line",
        });
        const option = {
          xAxis: {
            //横坐标？
            data: this.xData1,
            axisLabel: {
                interval: 0,
                rotate: -30,
                color: "#333",
              },
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
    //设置直方图
    setColumnChart() {
      ///确定纵坐标！！！
      // var fromTime = this.getTimeNum(this.interval * 7);
      // var toTime = this.getTimeNum(0);
      // this.body.from = fromTime;
      // this.body.to = toTime;
      getGivenTimeOrders(this.body).then((res) => {
        //遍历

        res.data.data.forEach((item) => {
          item.orderItems.forEach((element) => {
            this.allFoodData.forEach((i) => {
              if (i.id === element.dishId) {
                i.amount++;
              }
            });
            //if(element.dishId)
          });
        });

        this.allFoodData.forEach((item) => {
          this.xData2.push(item.amount);
        });

        ///创建柱状图！！！
        const foodNum = {
          legend: {
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          tootip: {
            trigger: "axis",
          },
          xAxis: {
            // type: "category",
            data: this.foodName, ///!!!
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              rotate: -30,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "b6a2de"],
          series: [
            {
              name: "销售量",
              data: this.xData2,
              type: "bar",
            },
          ],
        };
        const U = echarts.init(this.$refs.moneyEcharts);
        U.setOption(foodNum);
      });
    },
    ///选项点击事件,调用设置表格方法
    chooseDays(value) {
      console.log('value',value)
      //如果是快捷选项
      switch (value) {
        case "最近一周":
          this.interval = 7
          this.xNum = 7
          break;
        case "最近一个月":
          this.interval = 30
          this.xNum = 15
          break;
        case "最近三个月":
          this.interval = 60
          this.xNum = 20
          break;
        case "最近半年":
          this.interval = 180
          this.xNum = 20
          break;
      }
        //快捷选项，设置body
        let fromTime = this.getTimeNum(this.interval)
        let toTime = this.getNowTimeNum()
        this.body.from = fromTime
        this.body.to = toTime
     
      this.setLineChart();
      this.setColumnChart();
    },
  },
};
</script>
<style lang="scss" scopedSlots>
.header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 80px;
  .demo-input-suffix {
    width: 100%;
  }
  .el-input {
    width: 20%;
    margin-right: 10px;
  }
}
.card-title {
  display: flex;
  align-items: center;
}
.image {
  width: 200px;
  min-height: 100%;
  margin-right: 16px;
  border-radius: 5px;
}
.right-format {
  display: flex;
  text-align: left;
  flex-direction: column;
  line-height: 30px;
}
</style>