<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <div style="margin-right: 20px; display: flex; visibility: hidden">
        <el-input
          placeholder="客户名、客户手机、订单号"
          v-model="input"
          clearable
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="block">
        <el-date-picker
          v-model="date"
          @change="onDatePickerChange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          style="width: 90%"
        >
        </el-date-picker>
      </div>
      <el-button plain style="margin-left: 20px; visibility: hidden"
        >添加订单</el-button
      >
    </div>

    <el-col :span="24">
      <el-card style="margin-top: 20px">
        <el-table :data="tableData" height:300 style="width: 100%">
          <el-table-column prop="id" label="订单号"> </el-table-column>
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="money" label="金额"> </el-table-column>
          <el-table-column prop="name" label="负责人"> </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              {{ ["已完成", "进行中"][scope.row.state] }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import {
  getGivenTimeOrders,
  getUserlist,
  getObjectMap,
  getAllFood,
} from "../../../../api/data";
export default {
  name: "home",
  data() {
    return {
      input: "",
      find: "22",
      date: {},
      usernameMap: {},
      tableData: [],
      dishMap: {},
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
    };
  },
  async mounted() {
    this.dishMap = getObjectMap((await getAllFood()).data.data);
    await this.populateUserMap();
    await this.populateData(0, Math.round(new Date().getTime() / 1000));
  },
  methods: {
    async populateData(start, end) {
      let rangeOrderResponse = await getGivenTimeOrders({
        from: start,
        to: end,
      });
      console.log(rangeOrderResponse.data.data);
      this.tableData = rangeOrderResponse.data.data.map((order) => {
        return {
          id: order.id,
          date: new Date(order.createTime * 1000).toLocaleDateString(),
          money: order.orderItems
            .filter((orderItem) => orderItem.state !== -1)
            .reduce(
              (acc, cur) => acc + this.dishMap[cur.dishId].price * cur.amount,
              0
            ),
          name: this.usernameMap[order.waiterId],
          state: order.state,
        };
      });
      console.log(this.tableData);
    },
    async populateUserMap() {
      let accountListResponse = await getUserlist();
      this.usernameMap = accountListResponse.data.data.reduce((acc, curr) => {
        acc[curr.id] = curr.username;
        return acc;
      }, {});
    },
    onDatePickerChange() {
      this.populateData(
        Math.round(this.date[0].getTime() / 1000),
        // because the date picker gets the start of a day
        Math.round(this.date[1].getTime() / 1000 + 60 * 60 * 24)
      );
    },
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
