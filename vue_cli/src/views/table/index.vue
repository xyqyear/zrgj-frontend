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
            @click="
              displayOderDetail(table.tableName);
              clearInfo();
            "
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
          <el-table :data="curOrder.orderItems" height="300">
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
          <!-- ------------------------------------------------ -->
          <div
            style="margin-right: 20px; display: flex"
            v-if="!hasDiscounts"
            class="header"
          >
            <el-input v-model="inputTelephone" placeholder="Please input">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getVipData()"
              ></el-button>
            </el-input>
            <div v-if="boxVisible1">
              <el-button type="primary" @click="register()"
                >无会员信息！注册</el-button
              >
            </div>

            <div v-if="boxVisible2">
              <el-button
                type="text"
                @click="
                  dialogVisible = true;
                  judgeDiscounts(curOrder.actualSum, form.score);
                "
                ><el-button type="primary">优惠</el-button></el-button
              >
            </div>
          </div>

          <el-descriptions v-if="hasDiscounts">
            <el-descriptions-item label="会员名称">{{
              form.name
            }}</el-descriptions-item>
            <el-descriptions-item label="电话号码">{{
              form.telephone
            }}</el-descriptions-item>
            <el-descriptions-item label="剩余积分">
              {{ form.tempScore }}</el-descriptions-item
            >
          </el-descriptions>

          <div style="margin-right: 20px; display: flex" v-if="hasDiscounts">
            <el-button
              type="warning"
              plain
              class="coupon"
              v-if="coupon[0].finalDiscounts"
              ><span>￥20</span
              ><span style="margin-left: 260px">-200积分</span></el-button
            >
            <el-button
              type="warning"
              plain
              class="coupon"
              v-if="coupon[1].finalDiscounts"
              ><span>￥40</span
              ><span style="margin-left: 260px">-400积分</span></el-button
            >
            <el-button
              type="warning"
              plain
              class="coupon"
              v-if="coupon[2].finalDiscounts"
              ><span>￥70</span
              ><span style="margin-left: 260px">-700积分</span></el-button
            >
            <el-button
              type="text"
              @click="
                dialogVisible = true;
                judgeDiscounts(curOrder.actualSum, form.score);
              "
              ><el-button type="primary">更改</el-button></el-button
            >
            <el-button type="text" @click="hasDiscounts = false"
              ><el-button type="primary">取消</el-button></el-button
            >
          </div>

          <!-- --------------------------------------- -->
          <span slot="footer" class="dialog-footer">
            <el-descriptions>
              <el-descriptions-item label="桌号">{{
                curOrder.tableId
              }}</el-descriptions-item>
              <el-descriptions-item label="总金额">{{
                curOrder.actualSum
              }}</el-descriptions-item>
              <el-descriptions-item label="下单账号">
                {{ curOrder.waiterId }}</el-descriptions-item
              ><el-descriptions-item label="惠后">
                {{ form.tempDiscounts }}</el-descriptions-item
              >
            </el-descriptions>
            <el-button @click="orderDetailVisible = false">取 消</el-button>
            <el-button type="primary" @click="checkout">结 算</el-button>
          </span>
        </el-dialog>
        <!-- ------------------------------------- -->
        <el-dialog
          title="使用优惠"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          :data="curOrder.orderItems"
        >
          <el-form>
            <el-form-item label="会员姓名">
              <el-text autocomplete="off">{{ form.name }}</el-text>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-text autocomplete="off">{{ form.telephone }}</el-text>
            </el-form-item>
            <el-form-item label="积分">
              <el-text autocomplete="off">{{ form.score }}</el-text>
            </el-form-item>
            <el-form-item label="可选优惠">
              <el-row>
                <el-button
                  type="warning"
                  plain
                  class="coupon"
                  :data-attr="coupon[0].discounts"
                  :disabled="coupon[0].disabled"
                  @click="
                    handleDiscounts(20);
                    dialogVisible = false;
                  "
                  ><span>￥20</span
                  ><span style="font-size: 12px"
                    >（需要200积分）</span
                  ></el-button
                >
                <el-button
                  type="warning"
                  plain
                  class="coupon"
                  :data-attr="coupon[1].discounts"
                  :disabled="coupon[1].disabled"
                  @click="
                    handleDiscounts(40);
                    dialogVisible = false;
                  "
                  ><span>￥40</span
                  ><span style="font-size: 12px"
                    >（需要400积分）</span
                  ></el-button
                >
                <el-button
                  type="warning"
                  plain
                  class="coupon"
                  :data-attr="coupon[2].discounts"
                  :disabled="coupon[2].disabled"
                  @click="
                    handleDiscounts(70);
                    dialogVisible = false;
                  "
                  ><span>￥70</span
                  ><span style="font-size: 12px"
                    >（需要700积分）</span
                  ></el-button
                >
              </el-row>
            </el-form-item>
            <el-descriptions>
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
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { payOrders, updateVip, getVipData } from '../../../api/data'

export default {
  name: 'table',
  data() {
    return {
      form: {
        id: '',
        name: '',
        telephone: '',
        score: null,
        tempDiscounts: null,
        tempScore: null
      },
      coupon: [
        { discounts: '', disabled: false, finalDiscounts: false },
        { discounts: '', disable: false, finalDiscounts: false },
        { discounts: '', disable: false, finalDiscounts: false }
      ],
      hasDiscounts: false,
      boxVisible1: false,
      boxVisible2: false,
      dialogVisible: false,
      inputTelephone: '',
      tableNum: null,
      orderDetailVisible: false
    }
  },
  mounted() {
  },
  methods: {
    surePay() {
      // this.curOrder.actualSum=this.form.tempDiscounts
      if (this.hasDiscounts) {
        this.form.score = this.form.tempScore
        const body = {
          telephone: this.form.telephone,
          name: this.form.name,
          score: this.form.score
        }
        updateVip(body).then((res) => {
          console.log(res)
        })
      } else {
        this.form.score += this.curOrder.actualSum
        const body = {
          telephone: this.form.telephone,
          name: this.form.name,
          score: this.form.score
        }
        updateVip(body).then((res) => {
          console.log(res)
        })
      }
    },
    handleDiscounts(discountsMoney) {
      this.form.tempDiscounts = this.curOrder.actualSum - discountsMoney
      this.form.tempScore = this.form.score - discountsMoney * 10
      this.hasDiscounts = true
      if (discountsMoney === 20) {
        this.coupon[0].finalDiscounts = true
      }
      if (discountsMoney === 40) {
        this.coupon[1].finalDiscounts = true
      }
      if (discountsMoney === 70) {
        this.coupon[2].finalDiscounts = true
      }
    },
    judgeDiscounts(judgePrice, judgeScore) {
      this.form.tempDiscounts = this.curOrder.actualSum
      this.form.tempScore = this.form.score
      for (let i = 0; i < 3; i++) {
        this.coupon[i].finalDiscounts = false
      }
      if (judgeScore < 200) {
        for (let i = 0; i < 3; i++) {
          this.coupon[i].discounts = '积分不足'
          this.coupon[i].disabled = true
        }
      } else if (judgeScore >= 200 && judgeScore < 400) {
        this.coupon[1].discounts = '积分不足'
        this.coupon[1].disabled = true
        this.coupon[2].discounts = '积分不足'
        this.coupon[2].disabled = true
        if (judgePrice < 20) {
          this.coupon[0].discounts = '金额不足'
          this.coupon[0].disabled = true
        }
        if (judgePrice >= 20) {
          this.coupon[0].discounts = '立即使用'
          this.coupon[0].disabled = false
        }
      } else if (judgeScore >= 400 && judgeScore < 700) {
        this.coupon[2].discounts = '积分不足'
        this.coupon[2].disabled = true
        if (judgePrice < 20) {
          this.coupon[0].discounts = '金额不足'
          this.coupon[0].disabled = true
          this.coupon[1].discounts = '金额不足'
          this.coupon[1].disabled = true
        }
        if (judgePrice >= 20 && judgePrice < 40) {
          this.coupon[0].discounts = '立即使用'
          this.coupon[0].disabled = false
          this.coupon[1].discounts = '金额不足'
          this.coupon[1].disabled = true
        }
        if (judgePrice > 40) {
          this.coupon[0].discounts = '立即使用'
          this.coupon[0].disabled = false
          this.coupon[1].discounts = '立即使用'
          this.coupon[1].disabled = false
        }
      } else if (judgeScore >= 700) {
        if (judgePrice < 20) {
          for (let i = 0; i < 3; i++) {
            this.coupon[i].discounts = '金额不足'
            this.coupon[i].disabled = true
          }
        }
        if (judgePrice >= 20 && judgePrice < 40) {
          this.coupon[0].discounts = '立即使用'
          this.coupon[0].disabled = false
          for (let i = 1; i < 3; i++) {
            this.coupon[i].discounts = '金额不足'
            this.coupon[i].disabled = true
          }
        }
        if (judgePrice >= 40 && judgePrice < 70) {
          for (let i = 0; i < 2; i++) {
            this.coupon[i].discounts = '立即使用'
            this.coupon[i].disabled = false
          }
          this.coupon[2].discounts = '金额不足'
          this.coupon[2].disabled = true
        }
        if (judgePrice >= 70) {
          for (let i = 0; i < 3; i++) {
            this.coupon[i].discounts = '立即使用'
            this.coupon[i].disabled = false
          }
        }
      }
    },
    register() {
      this.$router.push({
        name: 'VIP',
        query: { dialogFormVisible: true, telephone: this.inputTelephone }
      })
    },
    clearInfo() {
      this.form = []
      this.inputTelephone = ''
      this.boxVisible1 = false
      this.boxVisible2 = false
      this.hasDiscounts = false
    },
    getVipData() {
      const body = {
        telephone: this.inputTelephone
      }
      getVipData(body)
        .then((res) => {
          console.log(res)
          this.inputTelephone = '查询成功'
          this.form.id = res.data.data.id
          this.form.name = res.data.data.name
          this.form.telephone = res.data.data.telephone
          this.form.score = res.data.data.score
          this.boxVisible2 = true
          this.boxVisible1 = false
        })
        .catch((err) => {
          this.boxVisible1 = true
          this.boxVisible2 = false
          console.log(err)
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
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
            this.surePay()
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
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.coupon {
  position: relative;
  width: 500px;
  height: 80px;
  margin: 5px auto;
  background-image: radial-gradient(
      circle at 1px 8px,
      transparent 6px,
      #ff9e6d 6px,
      #ff9e6d 0px
    ),
    radial-gradient(
      circle at 99% 8px,
      transparent 6px,
      #ff9e6d 6px,
      #ff9e6d 0px
    );
  background-size: 300px 18px;
  background-position: 0 0, 200px 0;
  background-repeat-x: no-repeat;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  line-height: 55px;
  padding-right: 270px;
  box-sizing: border-box;
  cursor: pointer;
}
.coupon::before {
  position: absolute;
  content: "";
  left: 300px;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 1px dashed #fff;
}
.coupon::after {
  position: absolute;
  content: attr(data-attr);
  font-size: 26px;
  width: 70px;
  top: 50%;
  right: 2%;
  padding-right: 32px;
  transform: translate(-50%, -50%);
  line-height: 40px;
  letter-spacing: 5px;
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
