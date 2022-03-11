<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <div style="margin-right: 20px; display: flex; visibility: hidden">
        <el-input
          placeholder="客户名、客户手机、订单号"
          v-model="input"
          clearable
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="block">
        <el-date-picker
          v-model="date"
          @change="onDatePickerChange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          style="width: 90%"
        >
        </el-date-picker>
      </div>
      <el-button plain style="margin-left: 20px; visibility: hidden"
        >添加订单</el-button
      >
    </div>
    <!-- ----------------------详细订单信息---------------------------- -->
    <el-dialog :visible.sync="detailVisible" width="50%">
      <div slot="title" class="dialog-title">
        <!-- <i class="el-icon-edit-outline"></i> -->
        <div class="left">
          <div style="margin-bottom: 10px">
            订单号: {{ curOrder.createTime }}
          </div>
          <div>下单日期: {{ curOrder.createTime | formatDate }}</div>
        </div>
        <div class="right">
          <div style="margin-bottom: 10px">桌号: {{ curOrder.tableId }}</div>
          <div>消费金额: {{ curtotalMoney }}</div>
        </div>
      </div>
      <el-table :data="currOrderItems" style="width: 100%">
        <el-table-column prop="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="img" label="菜品图片" width="110">
          <template slot-scope="scope">
            <div class="imageDetail">
              <img :src="scope.row.img" style="width: 50%; object-fit: cover" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="菜品名称" width="100">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量"
          width="100"
        ></el-table-column>
        <el-table-column prop="price" label="单价" width="50"></el-table-column>
        <el-table-column prop="note" label="备注" width="100"></el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            {{ ["已完成", "进行中"][scope.row.state] }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-col :span="24">
      <el-card style="margin-top: 20px">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <el-table-column prop="id" label="订单号"> </el-table-column>
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="money" label="金额"> </el-table-column>
          <el-table-column prop="name" label="负责人"> </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              {{ ["已完成", "进行中"][scope.row.state] }}
            </template>
          </el-table-column>
          <el-table-column prop="detail" label="详细">
            <template slot-scope="scope">
              <el-button type="text" @click="viewDetail(scope.row)"
                >查看详细</el-button
              >
              <!-- {{ ["已完成", "进行中"][scope.row.state] }} -->
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import {
  getGivenTimeOrders,
  getUserlist,
  getObjectMap,
  getAllFood
} from '../../../../api/data'
export default {
  name: 'home',
  data() {
    return {
      input: '',
      find: '22',
      date: {},
      usernameMap: {},
      tableData: [],
      dishMap: {},
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      /// /////查看详细///////////
      detailVisible: false,
      curOrder: {},
      allOrders: {},
      curtotalMoney: 0,
      curWaiter: '',
      currOrderItems: []
    }
  },
  async mounted() {
    this.dishMap = getObjectMap((await getAllFood()).data.data)
    await this.populateUserMap()
    await this.populateData(0, Math.round(new Date().getTime() / 1000))
  },
  methods: {
    /// ////////////查看详细////////
    indexMethod(index) {
      return index * 2
    },
    viewDetail(order) {
      // 设置currOrder的字段
      if (this.allOrders != null) {
        this.allOrders.forEach((element) => {
          if (element.id === order.id) {
            this.curOrder = element
          }
        })
      }
      this.curWaiter = order.name // 设置当前负责人
      this.curtotalMoney = order.actuallyPaid // 设置全部金额
      // 设置currOrderItems
      this.currOrderItems = []
      let j = 1
      getAllFood().then((res) => {
        res.data.data.forEach((element) => {
          this.curOrder.orderItems.forEach((i) => {
            if (i.dishId === element.id && i.state !== -1) {
              const tempItem = {
                index: j,
                img: element.imageUrl,
                name: element.name,
                amount: i.amount,
                price: element.price,
                note: i.note,
                state: i.state
              }
              this.currOrderItems.push(tempItem)
              j += 1
            }
          })
        })
        this.detailVisible = true
      })
    },
    async populateData(start, end) {
      const rangeOrderResponse = await getGivenTimeOrders({
        from: start,
        to: end
      })
      this.allOrders = rangeOrderResponse.data.data // 所有订单项
      this.tableData = rangeOrderResponse.data.data.map((order) => {
        return {
          id: order.id,
          date: new Date(order.createTime * 1000).toLocaleDateString(),
          money: order.orderItems
            .filter((orderItem) => orderItem.state !== -1)
            .reduce(
              (acc, cur) => acc + this.dishMap[cur.dishId].price * cur.amount,
              0
            ),
          actuallyPaid: order.actuallyPaid,
          name: this.usernameMap[order.waiterId],
          state: order.state
        }
      })
    },
    async populateUserMap() {
      const accountListResponse = await getUserlist()
      this.usernameMap = accountListResponse.data.data.reduce((acc, curr) => {
        acc[curr.id] = curr.username
        return acc
      }, {})
    },
    onDatePickerChange() {
      this.populateData(
        Math.round(this.date[0].getTime() / 1000),
        // because the date picker gets the start of a day
        Math.round(this.date[1].getTime() / 1000 + 60 * 60 * 24)
      )
    }
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
  }
}
</script>
<style lang="less" scoped>
.imageDetail {
  width: 180px;
  height: 85px;
  display: flex;
  justify-content: left;
  align-items: center;
  line-height: 100%;
}
div /deep/ .el-dialog__header {
  border-bottom: 1px solid #ebebeb;
}
.dialog-title {
  width: 85%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 100%;
  margin-left: 20px;
  .left,
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .title-text {
    font-size: 20px;
    font-weight: 600;
  }
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
</style>
