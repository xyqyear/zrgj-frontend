<template>
  <el-row :gutter="30">
    <el-col class="inline_header" span="24">
      <el-card class="inline_header_card" shadow="never" width="200">
        <div class="inline_title">天天点餐电子排队系统</div>
      </el-card>
      <div class="level2">
        <el-button type="primary" plain>排 号</el-button>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="inline_tableType" width="45">
        <span class="firstfront">小桌</span>
        <span class="secondfront">(1-4人)</span>
        <span class="thirdfront">剩</span>
        <span class="forthfront">{{ smallAvailable }}</span>
      </div>
      <div class="inline_info">
        <div v-for="item in smallTable" :key="item.number" class="infoDetail">
          <div class="firstrow">
            <span class="firstfront">排队号：</span>
            <span class="secondfront">{{ item.number }}</span>
          </div>
          <div class="secondrow">
            <span>时间：{{ item.time }}</span>
          </div>
          <div class="thirdrow">
            <span>人数：{{ item.count }}</span>
          </div>
        </div>
      </div>
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
            @click="displayOderDetail(tableMap[table.tableName])"
            :disabled="!table.occupied"
            class="cardBottom"
          >
            {{ getTableStatus(table.tableName) }}
          </el-button>
        </div>
        <!-- ------------------------------------- -->
        <!-- ------------------------------------- -->
      </div>
    </el-col>
    <el-col :span="6"></el-col>
    <el-col :span="6"></el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
import {
  getRestaurant,
  getCurrOrders,
  getAllFood,
  getObjectMap,
  payOrders
} from '../../../api/data'

export default {
  name: 'table',
  data() {
    return {
      tableData: [],
      smallTable: [
        {
          number: 'A01',
          time: '2022/3/9 14：40',
          count: '4',
          waittime: '10分钟'
        }
        // {
        //   number: 'A02',
        //   time: '2022/3/9 14：40',
        //   count: '4',
        //   waittime: '10分钟'
        // }
      ],
      smallAvailable: '10',
      tableMap: {},
      orderList: [],
      curOrder: {},
      totalTableNum: 10,
      dishMap: {},
      orderDetailVisible: false
    }
  },
  mounted() {
    // 获取餐厅最大桌号
    getRestaurant()
      .then((res) => {
        this.totalTableNum = res.data.data.tableNum
        getAllFood().then((res) => {
          const dishList = res.data.data
          this.dishMap = getObjectMap(dishList)
          this.refreshOrderData()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    refreshOrderData() {
      getCurrOrders().then((res) => {
        this.orderList = res.data.data
        this.generateTableList()
      })
    },
    generateTableList() {
      this.tableData = []
      for (let i = 1; i <= this.totalTableNum; i++) {
        this.tableData.push({
          occupied: false,
          tableName: i
        })
      }
      // orderItems 添加上菜品信息
      for (let i = 0; i < this.orderList.length; i++) {
        for (let j = 0; j < this.orderList[i].orderItems.length; j++) {
          const dish = this.dishMap[this.orderList[i].orderItems[j].dishId]
          this.orderList[i].orderItems[j].name = dish.name
          this.orderList[i].orderItems[j].price = dish.price
          this.orderList[i].orderItems[j].imageUrl = dish.imageUrl
          this.orderList[i].orderItems[j].category = dish.category
          // this.orderList[i].orderItems[j].stateDescription = this.stateToDescription(this.orderList[i].orderItems[j].state)
        }
      }

      // 桌号与订单对应
      for (let i = 0; i < this.orderList.length; i++) {
        const tableName = this.orderList[i].tableId
        this.tableData[tableName - 1].occupied = true
        this.tableMap[tableName] = this.orderList[i]
      }
      console.log(this.tableData)
    },
    displayOderDetail(order) {
      this.curOrder = order
      let sum = 0
      for (let i = 0; i < this.curOrder.orderItems.length; i++) {
        if (this.curOrder.orderItems[i].state === 0) {
          sum +=
            this.curOrder.orderItems[i].amount *
            this.curOrder.orderItems[i].price
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
      })
        .then(() => {
          // 发送结束订单请求
          payOrders({ orderId: this.curOrder.id }).then((res) => {
            this.refreshOrderData()
            this.$message({
              type: 'success',
              message: '已结束该订单'
            })
            this.orderDetailVisible = false
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
      console.log(tableName)
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
//////////////排队//////////////////
.inline_header {
  background: #fff;
}
.inline_header_card {
  background: #59dbff;
  .inline_title {
    color: #fff;
    font-size: 30px;
    word-spacing: 10px;
    letter-spacing: 5px;
    font-weight: normal;
  }
}
.inline_tableType {
  background: #59dbff;
  height: 60px;
  position: relative;
  margin-top: 20px;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  .firstfront {
    font-size: 28px;
    color: white;
    position: absolute;
    bottom: 10px;
    left: 15px;
  }
  .secondfront {
    color: white;
    position: absolute;
    bottom: 10px;
    left: 75px;
  }
  .thirdfront {
    color: white;
    position: absolute;
    bottom: 10px;
    right: 50px;
  }
  .forthfront {
    font-size: 36px;
    color: white;
    position: absolute;
    bottom: 5px;
    left: 200px;
  }
}
.level2 {
  width: 100%;
  display: flex;
  justify-content: right;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-right: 20px;
}
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
.inline_info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  .infoDetail {
    color: #59dbff;
    margin-left: 5px;
    font-weight: normal;
    line-height: 22px;
    float: left;
    border-bottom: 1px dashed rgb(#BBBBBB);
    .firstrow {
      float: left;
      margin-top: 15px;
      .secondfront {
        font-size: 30px;
      }
    }
    .secondrow {
      float: left;
    }
    .thirdrow {
      clear: both;
      float: left;
    }
  }
}
</style>
