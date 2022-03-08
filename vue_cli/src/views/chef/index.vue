<template>
  <el-collapse accordion>
    <el-collapse-item v-for="item in orderData" :key="item.id">
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
              Object.values(item.orderItems).filter(
                (orderItem) => orderItem.state === 0
              ).length
            }}
            / {{ Object.keys(item.orderItems).length }}
          </div>
        </div>
      </template>
      <el-table
        :data="Object.values(item.orderItems)"
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
            {{ getOrderItemDescription(scope.row.state) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state === 1 || scope.row.state === 2"
              size="mini"
              @click="handle(scope.row.state, item.id, scope.row.id)"
              >{{ [null, "烹饪", "完成"][scope.row.state] }}
            </el-button>
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
import { getAllFood, getCurrOrders, updateOrderItem } from '../../../api/data'

export default {
  name: 'table',
  data() {
    return {
      orderData: {},
      rawOrderData: {}
    }
  },
  mounted() {
    this.populateData()
  },
  methods: {
    populateData() {
      Promise.all([getAllFood(), getCurrOrders()]).then((res) => {
        const dishMap = res[0].data.data.reduce((acc, curr) => {
          acc[curr.id] = curr.name
          return acc
        }, {})
        const orders = res[1].data.data
        for (const order of orders) {
          // if all items are finished, skip
          if (
            order.orderItems.every(
              (item) => item.state === 0 || item.state === -1
            )
          ) {
            continue
          }

          const displayOrder = {
            id: order.id,
            time: new Date(order.createTime).toLocaleTimeString(),
            tableId: order.tableId,
            orderItems: {}
          }

          for (const orderItem of order.orderItems) {
            displayOrder.orderItems[orderItem.id] = {
              id: orderItem.id,
              name: dishMap[orderItem.dishId],
              amount: orderItem.amount,
              note: orderItem.note,
              state: orderItem.state
            }
          }

          order.orderItems = order.orderItems.reduce((acc, curr) => {
            acc[curr.id] = curr
            return acc
          }, {})

          this.$set(this.orderData, order.id, displayOrder)
          this.$set(this.rawOrderData, order.id, order)
        }
      })
    },
    getOrderItemDescription(state) {
      if (state === -1) {
        return '已取消'
      }
      return ['已完成', '排队中', '烹饪中', '上菜中'][state]
    },
    handle(state, orderId, orderItemId) {
      switch (state) {
        case 1:
          this.rawOrderData[orderId].orderItems[orderItemId].state = 2
          updateOrderItem(
            this.rawOrderData[orderId].orderItems[orderItemId]
          ).then(() => {
            this.orderData[orderId].orderItems[orderItemId].state = 2
          })
          break
        case 2:
          this.rawOrderData[orderId].orderItems[orderItemId].state = 0
          updateOrderItem(
            this.rawOrderData[orderId].orderItems[orderItemId]
          ).then(() => {
            this.orderData[orderId].orderItems[orderItemId].state = 0
            // if all items are finished, remove it from the list
            if (
              Object.values(this.rawOrderData[orderId].orderItems).every(
                (item) => item.state === 0
              )
            ) {
              delete this.orderData[orderId]
            }
          })
          break
      }
    }
  }
}
</script>
