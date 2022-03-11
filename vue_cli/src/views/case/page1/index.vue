<template>
  <el-row class="home" :gutter="20">
    <!--    <div class="operation">
          &lt;!&ndash; <div>
            <p style="margin-left:20px;color:#545C64">查找到{{find}}条</p>
          </div> &ndash;&gt;
          <div style="margin-right: 20px; display: flex">
            <el-input
              placeholder="客户名、客户手机、订单号"
              v-model="input"
              clearable
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-button plain style="margin-left: 20px">添加订单</el-button>
        </div>-->
    <el-col :span="24">
      <el-card v-if="orderList.length === 0"> 今日暂无订单 </el-card>
      <el-card
        v-for="(curOrder, index) in orderList"
        :key="index"
        style="margin-top: 20px"
      >
        <div class="order-header">
          <div class="left">
            <div class="order-num">订单号 {{ curOrder.id }}</div>
          </div>

          <div class="right">
            <div class="time">{{ getTimeDistance(curOrder.createTime) }}</div>
          </div>
          <div class="down">
            <el-tag :type="curOrder.state === 0 ? 'success' : 'info'">{{
              curOrder.state === 0 ? "已支付" : "未支付"
            }}</el-tag>
            <!-- <el-tag type='info'>{{item.state=='1'?'已支付':'未支付'}}</el-tag> -->
          </div>
        </div>
        <div class="order-content">
          <el-table :data="curOrder.orderItems" height="150">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column
              prop="name"
              label="菜名"
              width="200"
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
            <el-table-column prop="state" label="订单状态" width="100">
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
        </div>
        <div class="order-bottom">
          <el-descriptions :column="4">
            <el-descriptions-item label="桌号">{{
              curOrder.tableId
            }}</el-descriptions-item>
            <el-descriptions-item label="订单总金额">{{
              curOrder.sum
            }}</el-descriptions-item>
            <el-descriptions-item label="实际收款">{{
              curOrder.actuallyPaid
            }}</el-descriptions-item>
            <el-descriptions-item label="下单账号">
              {{ curOrder.waiterId }}</el-descriptions-item
            >
          </el-descriptions>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getGivenTimeOrders } from '../../../../api/data'

export default {
  name: 'home',
  data() {
    return {
      rawOrderList: [],
      curTime: 0
    }
  },
  computed: {
    dishMap() {
      return this.$store.getters.dishMap
    },
    orderList() {
      const orderList = this.rawOrderList
      for (let i = 0; i < orderList.length; i++) {
        let sum = 0
        let actualSum = 0
        for (let j = 0; j < orderList[i].orderItems.length; j++) {
          const dish = this.dishMap[orderList[i].orderItems[j].dishId]
          orderList[i].orderItems[j].name = dish.name
          orderList[i].orderItems[j].price = dish.price
          orderList[i].orderItems[j].imageUrl = dish.imageUrl
          orderList[i].orderItems[j].category = dish.category
          const price =
            orderList[i].orderItems[j].amount * orderList[i].orderItems[j].price
          if (orderList[i].orderItems[j].state === 0) {
            actualSum += price
          }
          if (orderList[i].orderItems[j].state !== -1) {
            sum += price
          }
        }
        orderList[i].actualSum = actualSum
        orderList[i].sum = sum
      }
      return orderList
    }
  },
  mounted() {
    this.refreshOrderData()
  },
  methods: {
    refreshOrderData() {
      this.curTime = Math.round(new Date().getTime() / 1000)
      const fromTime = Math.round(
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000
      )
      getGivenTimeOrders({
        from: fromTime,
        to: this.curTime
      }).then((res) => {
        this.rawOrderList = res.data.data
      })
    },
    getTimeDistance(createTime) {
      const distance = this.curTime - createTime
      if (distance > 60 * 60) {
        return Math.round(distance / 3600) + '小时前'
      } else {
        return Math.round(distance / 60) + '分钟前'
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
  border-bottom: 2px solid #c1c1c1;

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
  display: flex;
  flex-direction: column;
}

.order-bottom {
  margin-top: 10px;
  width: 100%;
  height: 60px;
  background: #ffffff;
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
}
</style>
