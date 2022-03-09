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
          <div
            :style="{ background: table.occupied ? '#82AAFF' : '#FFFFFF' }"
            class="cardTop"
          >
            <div style="font-size: large; color: #371722; margin: 10px">
              {{ table.tableName }} 号桌
            </div>
            <div style="font-size: small; color: #c0c2ce; margin-top: 20px">
              {{ table.occupied ? "占用中" : "空闲" }}
            </div>
          </div>
          <el-button
            @click="
              displayOderDetail(tableMap[table.tableName], table.tableName)
            "
            :disabled="!table.occupied"
            class="cardBottom"
          >
            <p>{{ table.occupied ? "查看订单" : "" }}</p>
          </el-button>
        </div>
        <!-- ------------------------------------- -->
        <el-dialog :visible.sync="orderDetailVisible" width="50%">
          <div slot="title" class="dialog-title">
            <!-- <i class="el-icon-edit-outline"></i> -->
            <div class="left">
              <el-badge
                class="mark"
                :value="curOrder.id"
                style="font-size: 24px"
              />
              <span class="title-text">订单号{{ curOrder.createTime }}</span>
              <div class="button-right">
                <span class="title-close"></span>
              </div>
            </div>
            <div class="right">
              <span class="title-text">桌号: {{ curOrder.tableId }}</span>
            </div>
          </div>
          <!-- ---------------------------------------------- -->
          <el-table :data="curOrder.orderItems" height="400">
            <el-table-column type="index" width="50"></el-table-column>
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
          <el-descriptions>
            <el-descriptions-item label="桌号">{{
              curOrder.tableId
            }}</el-descriptions-item>
            <el-descriptions-item label="订单总金额">{{
              curOrder.totalPrice
            }}</el-descriptions-item>
            <el-descriptions-item label="下单账号">
              {{ curOrder.waiterId }}</el-descriptions-item
            >
          </el-descriptions>
          <div class="operations">
            <div class="left">
              <el-button
                type="danger"
                @click="addNewMeal"
                round
                style="margin-right: 50px"
                >加菜
                <i
                  class="el-icon-circle-plus-outline"
                  style="font-size: 16px"
                ></i>
              </el-button>
              <el-button
                type="danger"
                @click="deleteItem"
                round
                style="margin-right: 50px"
                >退菜
                <i
                  class="el-icon-circle-plus-outline"
                  style="font-size: 16px"
                ></i>
              </el-button>
            </div>
            <div class="right">
              <el-button
                round
                @click="orderDetailVisible = false"
                style="margin-right: 50px; border: 1px solid #fd3a4b"
                >退出
              </el-button>
            </div>
          </div>
          <!-- ------------------------退菜弹窗------------------------ -->
        </el-dialog>
        <el-dialog
          class="deleteItem"
          :visible.sync="deleteItemVisible"
          width="50%"
        >
          <div slot="title" class="deleteItem-title">
            <el-button type="danger" round style="margin-right: 10px"
              >退菜中...
            </el-button>
            <div>注：只有排队中的菜品可以取消</div>
          </div>
          <el-table :data="waitingItems" height="400">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column
              prop="name"
              label="菜名"
              width="100"
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
            <el-table-column prop="state" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  round
                  @click="updateCurrItem(scope.row)"
                  style="border: 1px solid #f56c6c; margin-right: 10px"
                  >退菜
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            round
            @click="deleteItemVisible = false"
            style="border: 1px solid #f56c6c; margin-right: 10px"
            >返回
          </el-button>
        </el-dialog>
        <!-- ------------------------------------- -->
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {
  getRestaurant,
  getCurrOrders,
  getAllFood,
  getObjectMap,
  updateOrderItem
} from '../../../api/data'

export default {
  name: 'serOrder',
  data() {
    return {
      tableData: [],
      tableMap: {},
      orderList: [],
      curOrder: {},
      totalTableNum: 10,
      dishMap: {},
      orderDetailVisible: false,
      /// ////////////////退菜/////////////
      deleteItemVisible: false,
      waitingItems: [],
      tableNum: ''
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
          this.refreshOrderData() // 更新orderList
          this.generateTableList() // 更新tableMap
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    /// ///////////////////////退菜/////////////////////
    updateCurrItem(currItem) {
      console.log('currItem', currItem)
      const body = {
        id: currItem.id,
        dishId: currItem.dishId,
        state: -1,
        amount: currItem.amount,
        note: currItem.note
      }
      console.log(body)
      updateOrderItem(body)
        .then((res) => {
          this.$message({
            message: '取消菜品成功',
            type: 'success'
          })
          // console.log(this.waitingItems)
          this.refreshOrderData().then(() => {
            // 更新orderList
            // 更新currOrder
            console.log('this.tableNum', this.tableNum)
            this.curOrder = this.tableMap[this.tableNum]
            console.log('this.curOrder', this.curOrder)
            // 更新this.waitingItems
            this.waitingItems = []
            this.curOrder.orderItems.forEach((element) => {
              if (element.state === 1) {
                this.waitingItems.push(element)
              }
            })
            console.log('this.waitingItems', this.waitingItems)
          })

          /// ///////////////////
        })
        .catch((_) => {
          this.$message({
            message: '取消菜品失败',
            type: 'error'
          })
          this.refreshOrderData() // 更新orderList
          this.generateTableList() // 更新tableMap
        })
    },
    deleteItem() {
      this.waitingItems.length = 0
      this.curOrder.orderItems.forEach((element) => {
        if (element.state === 1) {
          this.waitingItems.push(element)
        }
      })
      this.deleteItemVisible = true
    },
    /// //////////////////////添加新菜//////////////////
    addNewMeal() {
      sessionStorage.setItem('curOrder', JSON.stringify(this.curOrder))
      console.log('this.curOrder', this.curOrder)
      this.$router.push({ name: 'serFood' })
    },
    refreshOrderData() {
      return getCurrOrders().then((res) => {
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
        }
      }

      // 桌号与订单对应
      for (let i = 0; i < this.orderList.length; i++) {
        const tableName = this.orderList[i].tableId
        this.tableData[tableName - 1].occupied = true
        this.tableMap[tableName] = this.orderList[i]
      }
      console.log('this.tableData', this.tableData)
      // console.log('this.tableData[tableName - 1].occupied',this.tableData[tableName - 1].occupied)
      // console.log(this.tableData)
    },
    displayOderDetail(order, tableNum) {
      this.tableNum = tableNum
      this.curOrder = order
      console.log('this.tableNum', tableNum)
      this.orderDetailVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
////////////////////////删除订单项///////////////
.deleteItem-title {
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
  line-height: 100%;
  margin-left: 20px;
}

.operations {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  .left {
    display: flex;
  }
}
.dialog-title {
  width: 85%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 100%;
  margin-left: 20px;
  el-badge {
    padding: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .title-text {
    margin-left: 50px;
    font-size: 20px;
    font-weight: 600px;
  }
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
</style>
