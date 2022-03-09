<template>
  <el-row :gutter="30">
    <el-col class="inline_header" span="24">
      <el-card class="inline_header_card" shadow="never" width="200">
        <div class="inline_title">天天点餐电子排队系统</div>
      </el-card>
      <div class="level2">
        <el-button @click="addintoLine" type="primary" plain>排 号</el-button>
      </div>
    </el-col>

    <el-col
      v-for="item in queueTable"
      :key="item.runningCount"
      class="inline_body"
      :span="6"
    >
      <div class="inline_tableType" width="45">
        <span class="firstfront">
          {{ { A: "小桌", B: "中桌", C: "大桌", D: "包厢" }[item.size] }}
        </span>
        <span class="secondfront">{{
          { A: "(1-4人)", B: "(5-8人)", C: "(9-12人)", D: "(9-12人)" }[
            item.size
          ]
        }}</span>
        <span class="thirdfront">剩</span>
        <span class="forthfront">{{ item.currentLine.length }}</span>
      </div>
      <div class="inline_info">
        <!-- miniTable的地方 -->
        <div
          v-for="element in item.currentLine"
          :key="element.id"
          class="infoDetail_top"
        >
          <div class="infoDetail">
            <div class="firstrow">
              <span class="firstfront">排队号：</span>
              <span class="secondfront">{{ item.size }}{{ element.id }}</span>
            </div>
            <div class="secondrow">
              <span>时间：{{ element.createTime | formatDate }}</span>
            </div>
            <div class="thirdrow">
              <span>人数：{{ element.people }}</span>
            </div>
          </div>
          <div class="infoDetail_footer">
            <div
              style="
                color: gray;
                font-size: 14px;
                margin-left: 10px;
                margin-top: 10px;
              "
            >
              已等待：’实时刷新‘分钟
            </div>
            <div class="operations" style="margin-top: 10px">
              <el-button size="medium">取消</el-button>
              <el-button type="primary">叫号</el-button>
              <el-button type="primary">完成</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-col>

    <el-dialog class="addtoline" :visible.sync="addLineVisible" width="30%">
      <div slot="title" class="dialog-title">
        <div>取号</div>
      </div>
      <el-form :model="form">
        <el-form-item label="就餐人数：">
          <el-input v-model="form.people" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="选择餐桌：">
          <el-select v-model="form.table" placeholder="餐桌规模" style="width:70%" >
            <el-option label="小桌（1-4人）" value="A"></el-option>
            <el-option label="中桌（5-8人）" value="B"></el-option>
            <el-option label="大桌（9-12人）" value="C"></el-option>
            <el-option label="包间（9-12人）" value="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
    <el-button type="primary" @click="onSubmit">确认</el-button>
    <el-button>取消</el-button>
  </el-form-item>
      </el-form>
    </el-dialog>
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
      queueTable: [
        {
          size: 'A',
          runningCount: 49,
          currentLine: [
            {
              id: 48,
              createTime: 1696482734,
              people: 3
            },
            {
              id: 49,
              createTime: 169648273,
              people: 2
            }
          ]
        },
        {
          size: 'B',
          runningCount: 49,
          currentLine: [
            {
              id: 48,
              createTime: 1696482734,
              people: 5
            },
            {
              id: 49,
              createTime: 169648273,
              people: 6
            }
          ]
        },
        {
          size: 'C',
          runningCount: 49,
          currentLine: []
        },
        {
          size: 'D',
          runningCount: 49,
          currentLine: [
            {
              id: 48,
              createTime: 1696482734,
              people: 10
            },
            {
              id: 49,
              createTime: 169648273,
              people: 12
            }
          ]
        }
      ],
      smallAvailable: '10',
      tableMap: {},
      orderList: [],
      curOrder: {},
      totalTableNum: 10,
      dishMap: {},
      orderDetailVisible: false,
      /// ////排号
      addLineVisible: false,
      form: {
        name: '',
        table: ''
      }
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
  filters: {
    formatDate: function(value) {
      const date = new Date(value * 1000) // 这个是纳秒的，想要毫秒的可以不用除以1000000
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  },
  methods: {
    /// ////////////////////排号表单/////////
    addintoLine() {
      this.addLineVisible = true
    },
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
div /deep/ .el-dialog__header {
  background-color: #2682B7;
}

.addtoline {
  .dialog-title {
    height: 50px;
    div {
      padding-top: 5px;
      height: 100%;
      line-height: 100%;
      font-size: 36px;
      font-weight: normal;
      color: #606266;
    }
  }
}
.infoDetail_top {
  background: #fff;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border: 2px solid #2682B7;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.infoDetail_footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  .operations {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  div /deep/ .el-button--primary {
  background-color: #2682B7;
  border: 0;
}
}
.inline_header {
  background: #fff;
}
.inline_header_card {
  background: #2682B7;
  .inline_title {
    color: #fff;
    font-size: 30px;
    word-spacing: 10px;
    letter-spacing: 5px;
    font-weight: normal;
  }
}
.inline_tableType {
  background: #2682B7;
  height: 60px;
  position: relative;
  margin-top: 20px;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /////小桌
  .firstfront {
    font-size: 28px;
    color: white;
    position: absolute;
    bottom: 10px;
    left: 15px;
  }
  /////(1-4人)
  .secondfront {
    color: white;
    position: absolute;
    bottom: 10px;
    left: 75px;
  }
  /////剩
  .thirdfront {
    color: white;
    position: absolute;
    bottom: 10px;
    right: 55px;
  }
  /////10
  .forthfront {
    font-size: 36px;
    color: white;
    position: absolute;
    bottom: 5px;
    right: 10px;
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
  .infoDetail {
    width: 100%;
    color: #303133;
    padding-left: 10px;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 22px;
    float: left;
    border-bottom: 1px dashed rgb(#bbbbbb);
    .firstrow {
      margin-top: 15px;
      .secondfront {
        font-size: 30px;
      }
    }
  }
}
</style>
