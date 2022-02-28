<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <!-- <div>
        <p style="margin-left:20px;color:#545C64">查找到{{find}}条</p>
      </div> -->
      <div style="margin-right: 20px; display: flex">
        <el-input
          placeholder="客户名、客户手机、订单号"
          v-model="input"
          clearable
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="block" >
      <el-date-picker
        v-model="date.value1"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        style="width:90%"
      >
      </el-date-picker>
    </div>
      <el-button plain style="margin-left: 20px">添加订单</el-button>
    </div>
    
    <el-col :span="24">
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" height:300 style="width: 100%">
          <el-table-column prop="id" label="订单号"> </el-table-column>
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="money" label="金额"> </el-table-column>
          <el-table-column prop="name" label="负责人"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      input: "",
      find: "22",
      date:{},      
      tableData: [
        {
          id: "4869786163249879",
          date: "20220225",
          money: "655",
          name: "张三",
        },
        {
          id: "548978961349867896",
          date: "20220225",
          money: "98",
          name: "李四",
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
    };
  },
};
</script>
<style lang="less" scoped>
.operation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
