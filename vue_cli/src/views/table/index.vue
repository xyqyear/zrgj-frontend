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
          v-for="table in tableData"
          :key="table.tableName"
          class="tableInfo"
        >
          <div
            :style="{ background: table.occupied ? '#82AAFF' : '#FFFFFF' }"
            class="cardTop"
            style="
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            "
          >
            <div style="font-size: large; color: #371722">
              {{ table.tableName }} 号桌
            </div>
          </div>
          <el-button
            @click="displayOderDetail(table.tableName)"
            :disabled="!table.occupied"
            class="cardBottom"
          >
            {{ getTableStatus(table.tableName) }}
          </el-button>
        </div>
        <!-- ------------------------------------- -->
        <el-dialog
          title="订单详情"
          :visible.sync="orderDetailVisible"
          width="50%"
        >
          <!-- ---------------------------------------------- -->
          <el-table :data="curOrder.orderItems" height="500">
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column
              prop="name"
              label="菜名"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="amount"
              label="数量"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="price"
              label="金额"
              width="100"
            ></el-table-column>
            <el-table-column prop="note" label="备注"></el-table-column>
            <el-table-column prop="state" label="订单状态" width="150">
              <template slot-scope="scope">
                <el-tag
                  :type="
                    {
                      '-1': 'info',
                      '0': 'success',
                      '1': 'warning',
                      '2': 'danger',
                    }[scope.row.state]
                  "
                  effect="dark"
                >
                  {{
                    {
                      "-1": "已取消",
                      "0": "已完成",
                      "1": "排队中",
                      "2": "烹饪中",
                    }[scope.row.state]
                  }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <el-descriptions :column="4">
            <el-descriptions-item label="桌号">{{
              curOrder.tableId
            }}</el-descriptions-item>
            <el-descriptions-item label="总金额">{{
              curOrder.actualSum
            }}</el-descriptions-item>
            <el-descriptions-item label="下单账号">
              {{ curOrder.waiterId }}</el-descriptions-item
            >
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
import {
  payOrders
} from '../../../api/data'

export default {
  name: 'table',
  data() {
    return {
      tableNum: null,
      orderDetailVisible: false
    }
  },
  computed: {
    totalTableNum() {
      return this.$store.getters.restaurantInfo.tableNum
    },
    dishMap() {
      return this.$store.getters.dishMap
    },
    rawOrderList() {
      return this.$store.getters.orderList
    },
    orderList() {
      if (Object.keys(this.dishMap).length === 0) {
        return []
      }
      const orderList = JSON.parse(JSON.stringify(this.rawOrderList))
      for (let i = 0; i < this.rawOrderList.length; i++) {
        for (let j = 0; j < this.rawOrderList[i].orderItems.length; j++) {
          const dish = this.dishMap[this.rawOrderList[i].orderItems[j].dishId]
          orderList[i].orderItems[j].name = dish.name
          orderList[i].orderItems[j].price = dish.price
          orderList[i].orderItems[j].imageUrl = dish.imageUrl
          orderList[i].orderItems[j].category = dish.category
        }
      }
      return orderList
    },
    tableData() {
      const tableData = []
      for (let i = 1; i <= this.totalTableNum; i++) {
        tableData.push({
          occupied: false,
          tableName: i
        })
      }
      // 桌号与订单对应
      for (let i = 0; i < this.orderList.length; i++) {
        const tableName = this.orderList[i].tableId
        tableData[tableName - 1].occupied = true
      }
      return tableData
    },
    tableMap() {
      const tableMap = {}
      for (let i = 0; i < this.orderList.length; i++) {
        const tableName = this.orderList[i].tableId
        tableMap[tableName] = this.orderList[i]
      }
      return tableMap
    },
    curOrder() {
      if (this.tableNum) {
        const curOrder = this.tableMap[this.tableNum]
        let sum = 0
        for (let i = 0; i < curOrder.orderItems.length; i++) {
          if (curOrder.orderItems[i].state === 0) {
            sum += curOrder.orderItems[i].amount * curOrder.orderItems[i].price
          }
        }
        curOrder.actualSum = sum
        return curOrder
      } else {
        return {}
      }
    }
  },
  mounted() {
  },
  methods: {
    displayOderDetail(tableNum) {
      this.tableNum = tableNum
      this.orderDetailVisible = true
    },
    checkout() {
      this.$confirm('已确认订单项状态并完成收款', '确认结账', {
        confirmButtonText: '结束订单',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          // 发送结束订单请求
          payOrders({ orderId: this.curOrder.id }).then((res) => {
            this.$message({
              type: 'success',
              message: '已结束该订单'
            })
            this.orderDetailVisible = false
            this.tableNum = null
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消结账'
          })
        })
    },
    getTableStatus(tableName) {
      if (!(tableName in this.tableMap)) {
        return '空闲'
      } else {
        const orderItems = this.tableMap[tableName].orderItems
        const finishedCount = orderItems.filter(
          (item) => item.state === 0
        ).length
        if (finishedCount === 0) {
          return '排队中...'
        } else if (finishedCount < orderItems.length) {
          return (
            '烹饪中...\n(进度' + finishedCount + '/' + orderItems.length + ')'
          )
        } else {
          return '就餐中...'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tableInfo {
  height: 200px;
  width: 250px;
  margin: 10px 5px;
  border-radius: 10px;
}

.cardTop {
  border-radius: 5px;
  overflow: hidden;
  height: 40%;
  width: 100%;
}
.cardBottom {
  width: 100%;
  height: 60%;
}

.tables {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
