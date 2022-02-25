<template>
  <div class="perInfo">
    <el-row class="home" :gutter="20">
      <el-col class="header" :span="10" style="display:flex;">
        <div class="demo-input-suffix">
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
        </div>
      </el-col>
    </el-row>
    <el-card style="height: 450px">
      <div style="height: 400px" ref="moneyEcharts"></div>
    </el-card>
  </div>
</template>
<script>
import { getData } from "../../../../api/data.js";
import * as echarts from "echarts";
export default {
  name: "perCen",
  data() {
    return {};
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        const moneyNum = {
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
            type: "category",
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLable: {
              interval: 0,
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
              name: "用户数量",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        const U = echarts.init(this.$refs.moneyEcharts);
        U.setOption(moneyNum);
      }
    });
  },
};
</script>
<style lang="scss" scopedSlots>
.header{
    width:100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 80px;
    .demo-input-suffix{
        width:100%;
    }
.el-input{
    width:20%;
    margin-right:10px;
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