<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="24">
        <div class="tables">
          <el-card
            @click="dialogVisible = true"
            v-for="table in tableData"
            :key="table.tableName"
            :body-style="{ display: 'flex', padding: 15 }"
            style="margin-bottom: 20px; margin-right: 40px; width: 150px;"
          >

            <el-button style="margin:0 auto" class="info" @click="displayOderDetail(tableMap[table.tableName])"
                       :disabled="! table.occupied">
              <div :style="{ background: table.occupied ? '#82AAFF' : '#FFFFFF' }">
                <p class="tableNum">{{ table.tableName }}</p>
                <p class="state">{{ table.occupied ? "占用中" : "空闲" }}</p>
              </div>
            </el-button>
          </el-card>
          <!-- ------------------------------------- -->
          <el-dialog title="订单详情" :visible.sync="orderDetailVisible" width="50%">
            <!-- ---------------------------------------------- -->
            <template>
              <el-table :data="curOrder.orderItems" border height="500">
                <el-table-column prop="name" label="菜名" width="150"></el-table-column>
                <el-table-column prop="amount" label="数量" width="100"></el-table-column>
                <el-table-column prop="price" label="金额" width="150"></el-table-column>
                <el-table-column prop="note" label="备注"></el-table-column>
              </el-table>
            </template>
            <el-descriptions>
              <el-descriptions-item label="桌号">{{ curOrder.tableId }}</el-descriptions-item>
              <el-descriptions-item label="总金额">{{ curOrder.totalPrice }}</el-descriptions-item>
              <el-descriptions-item label="下单账号"> 服务员账号</el-descriptions-item>
            </el-descriptions>
            <!-- ------------------------------------------------ -->
            <span slot="footer" class="dialog-footer">
            <el-button @click="orderDetailVisible = false">取 消</el-button>
            <el-button type="primary" @click="orderDetailVisible = false">结 算</el-button>
          </span>
          </el-dialog>
          <!-- ------------------------------------- -->

        </div>
      </el-col>
    </el-row>


  </div>
</template>
<script>
import {getRestaurant, getCurrOrders, getAllFood, getObjectMap} from "../../../api/data";

export default {
  name: "home",
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

        getCurrOrders()
          .then(res => {
            this.orderList = res.data.data;
            getAllFood()
              .then(res => {
                let dishList = res.data.data;
                this.dishMap = getObjectMap(dishList);
                this.generateTableList()
              })
          });
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
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
        for (let j=0;j<this.orderList[i].orderItems.length;j++){
          let dish = this.dishMap[this.orderList[i].orderItems[j].dishId]
          this.orderList[i].orderItems[j].name = dish.name
          this.orderList[i].orderItems[j].price = dish.price
          this.orderList[i].orderItems[j].imageUrl = dish.imageUrl
          this.orderList[i].orderItems[j].category = dish.category
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
      console.log(order)
      this.orderDetailVisible = true
    }
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

.order-header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid #C1C1C1;

  .left {
    width: 200px;
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: center;

    .order-num {
      margin-left: 20px;
    }
  }
}

.order-content {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  .order-item {
    width: 100%;
    border-bottom: 2px solid #EFEFEF;
    display: flex;
    justify-content: space-between;
  }

  .left {
    margin-left: 30px;
    width: 200px;
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: center;
    line-height: 50px;

    .order-num {
      margin-left: 20px;
    }
  }

  .right {
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: center;
  }

}

.order-bottom {
  width: 100%;
  height: 60px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .up {
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;


  }

  .down {
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .downleft {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
  }
}
</style>
