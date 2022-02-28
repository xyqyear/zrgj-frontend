<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(item, index) in OrderData" :key="item.id">
      <template slot="title">
        <div class="header">
          <div style="width: 100px; border-right: 2px solid #d5d5d5">
            订单编号：{{ item.id }}
          </div>
          <div style="width: 200px; border-right: 2px solid #d5d5d5">
            下单时间：{{ item.time }}
          </div>
          <div style="width: 100px; border-right: 2px solid #d5d5d5">
            桌号：{{ item.tableId }}
          </div>
          <div style="width: 200px">
            烹饪进度：{{
              item.orderItems.filter((item) => item.state === 0).length
            }}
            / {{ item.orderItems.length }}
          </div>
        </div>
      </template>
      <el-table
        :data="item.orderItems"
        height:300
        style="width: 100%; margin-left: 30px"
      >
        <el-table-column prop="name" label="菜品名称" width="120px">
        </el-table-column>
        <el-table-column prop="amount" label="菜品数量" width="100px">
        </el-table-column>
        <el-table-column prop="note" label="备注" width="400px">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100px">
          <template slot-scope="scope">
            {{ ["已完成", "排队中", "烹饪中"][scope.row.state] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state !== 0"
              size="mini"
              @click="handle(scope.row.state, index, scope.$index)"
              >{{ [null, "烹饪", "完成"][scope.row.state] }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>
<style lang="less" scoped>
el-table {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
el-collapse-item {
  margin-top: 30px;
  margin-bottom: 50px;
  border-radius: 5px;
}
.header {
  width: 100%;
  height: 100%;
  padding-left: 20px;
  background: #e8e8e8;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  div {
    height: 100%;
    vertical-align: middle;
    line-height: 45px;
  }
}
</style>
<script>
import { getAllFood, getCurrOrders, updateOrderItem } from "../../../api/data";
export default {
  name: "table",
  data() {
    return {
      OrderData: [],
      RawOrderData: [],
    };
  },
  mounted() {
    this.populateData();
  },
  methods: {
    populateData() {
      getAllFood().then((res) => {
        let dishMap = res.data.data.reduce((acc, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {});
        getCurrOrders().then((res) => {
          let orders = res.data.data;
          this.RawOrderData = orders;
          for (let order of orders) {
            let displayOrder = {
              id: order.id,
              time: new Date(order.createTime).toLocaleTimeString(),
              tableId: order.tableId,
              orderItems: [],
            };
            for (let orderItem of order.orderItems) {
              displayOrder.orderItems.push({
                id: orderItem.id,
                name: dishMap[orderItem.dishId],
                amount: orderItem.amount,
                note: orderItem.note,
                state: orderItem.state,
              });
            }
            this.OrderData.push(displayOrder);
          }
        });
      });
    },
    handle(state, orderIndex, orderItemIndex) {
      switch (state) {
        case 1:
          this.RawOrderData[orderIndex].orderItems[orderItemIndex].state = 2;
          updateOrderItem(
            this.RawOrderData[orderIndex].orderItems[orderItemIndex]
          ).then(() => {
            this.OrderData[orderIndex].orderItems[orderItemIndex].state = 2;
          });
          break;
        case 2:
          this.RawOrderData[orderIndex].orderItems[orderItemIndex].state = 0;
          updateOrderItem(
            this.RawOrderData[orderIndex].orderItems[orderItemIndex]
          ).then(() => {
            this.OrderData[orderIndex].orderItems[orderItemIndex].state = 0;
          });
          break;
      }
    },
  },
};
</script>