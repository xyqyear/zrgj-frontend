<template>
  <el-row :gutter="30">
    <!-- <div class="header">
      <p style="color: #3758ff; margin-left: 20px">全部</p>
      <div style="margin-right: 20px">
        <el-button type="text" style="margin-right: 50px">
          <i
            class="el-icon-circle-plus-outline"
            style="width: 50px; font-size: 16px"
          >添加桌台</i
          >
        </el-button>
        <el-button type="text" style="margin-right: 50px">
          <i class="el-icon-edit" style="width: 50px; font-size: 16px"
          >桌台编辑</i
          >
        </el-button>
      </div>
    </div> -->
    <el-col :span="24">
      <div class="tables">
        <div
          @click="dialogVisible = true"
          v-for="table in tableData"
          :key="table.tableName"
          class="tableInfo"
        >
          <div :style="{ background: table.occupied ? '#82AAFF' : '#FFFFFF'}">
            <p style="font-size: large; color: #371722; margin: 10px">{{ table.tableName }} 号桌</p>
            <p style="font-size: small">{{ table.occupied ? "占用中" : "空闲" }}</p>
          </div>
          <el-button @click="displayOderDetail(tableMap[table.tableName])"
                     :disabled="! table.occupied">
            <p>{{ table.occupied ? "查看订单" : "" }}</p>

          </el-button>
        </div>
        <!-- ------------------------------------- -->
        <el-dialog title="订单详情" :visible.sync="orderDetailVisible" width="50%">
          <!-- ---------------------------------------------- -->
          <el-table :data="curOrder.orderItems" height="500">
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column prop="name" label="菜名" width="150"></el-table-column>
            <el-table-column prop="amount" label="数量" width="100"></el-table-column>
            <el-table-column prop="price" label="金额" width="100"></el-table-column>
            <el-table-column prop="note" label="备注"></el-table-column>
            <el-table-column prop="state" label="订单状态" width="150">
              <template slot-scope="scope">
                <el-tag :type="({'-1':'info','0':'success','1':'warning','2':'danger'})[scope.row.state]" effect="dark">
                  {{ ({'-1': '已取消', '0': '已完成', '1': '排队中', '2': '烹饪中'})[scope.row.state] }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <el-descriptions>
            <el-descriptions-item label="桌号">{{ curOrder.tableId }}</el-descriptions-item>
            <el-descriptions-item label="订单总金额">{{ curOrder.totalPrice }}</el-descriptions-item>
            <el-descriptions-item label="实际收款">{{ curOrder.actualSum }}</el-descriptions-item>
            <el-descriptions-item label="下单账号"> 服务员账号</el-descriptions-item>
          </el-descriptions>
          <!-- ------------------------------------------------ -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="orderDetailVisible = false">取 消</el-button>
            <el-button type="primary" @click="checkout">结 算</el-button>
          </span>
        </el-dialog>
        <!-- ------------------------------------- -->
      </div>
    </el-col>


  </el-row>
</template>

<script>
import {getRestaurant, getCurrOrders, getAllFood, getObjectMap, payOrders} from '../../../api/data';

export default {
  name: "table",
  data() {
    return {
      tableData: [],
      tableMap: {},
      orderList: [],
      curOrder: {},
      totalTableNum: 10,
      dishMap: {},
      orderDetailVisible: false,
    };
  },
  mounted() {
    // 获取餐厅最大桌号
    getRestaurant()
      .then(res => {
        this.totalTableNum = res.data.data.tableNum;
        getAllFood()
          .then(res => {
            let dishList = res.data.data;
            this.dishMap = getObjectMap(dishList);
            this.refreshOrderData()
          })
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    refreshOrderData() {
      getCurrOrders()
        .then(res => {
          this.orderList = res.data.data;
          this.generateTableList()
        });
    },
    stateToDescription(state) {
      switch (state) {
        case -1:
          return '已取消';
        case 0:
          return '已完成';
        case 1:
          return '排队中';
        case 2:
          return '烹饪中';
      }
      return '未知状态';
    },
    generateTableList() {
      this.tableData = [];
      for (let i = 1; i <= this.totalTableNum; i++) {
        this.tableData.push({
          'occupied': false,
          'tableName': i
        })
      }
      // orderItems 添加上菜品信息
      for (let i = 0; i < this.orderList.length; i++) {
        for (let j = 0; j < this.orderList[i].orderItems.length; j++) {
          let dish = this.dishMap[this.orderList[i].orderItems[j].dishId]
          this.orderList[i].orderItems[j].name = dish.name
          this.orderList[i].orderItems[j].price = dish.price
          this.orderList[i].orderItems[j].imageUrl = dish.imageUrl
          this.orderList[i].orderItems[j].category = dish.category
          // this.orderList[i].orderItems[j].stateDescription = this.stateToDescription(this.orderList[i].orderItems[j].state)
        }
      }

      // 桌号与订单对应
      for (let i = 0; i < this.orderList.length; i++) {
        let tableName = this.orderList[i].tableId;
        this.tableData[tableName - 1].occupied = true;
        this.tableMap[tableName] = this.orderList[i];
      }
      console.log(this.tableData)
    },
    displayOderDetail(order) {
      this.curOrder = order
      let sum = 0;
      for (let i = 0; i < this.curOrder.orderItems.length; i++) {
        if (this.curOrder.orderItems[i].state === 0){
          sum += this.curOrder.orderItems[i].amount * this.curOrder.orderItems[i].price;
        }
      }
      this.curOrder.actualSum = sum
      this.orderDetailVisible = true
    },
    checkout() {
      this.$confirm('已确认订单项状态并完成收款', '确认结账', {
        confirmButtonText: '结束订单',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 发送结束订单请求
        payOrders({'orderId': this.curOrder.id})
          .then(res => {
            this.refreshOrderData()
            this.$message({
              type: 'success',
              message: '已结束该订单'
            });
            this.orderDetailVisible = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消结账'
        });
      });
    }
  },
};
</script>

<style lang="less" scoped>
.tableInfo {
  height: 150px;
  width: 200px;
  margin: 10px 5px;

  .div {
    height: 40%;
    width: 100%;
  }

  .el-button {
    width: 100%;
    height: 60%;
  }
}

.tables {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
