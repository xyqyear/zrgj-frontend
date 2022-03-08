<template>
  <div style="position: relative">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(category, index) in dishCategories"
        :label="category"
        :name="category"
        :key="index"
      >
        <div>
          <el-row :gutter="10">
            <el-col
              :span="4"
              v-for="item in dishList"
              :key="item.id"
              style="
                 {
                  margin: 0;
                }
              "
            >
              <el-card
                v-if="
                  (item.category === category || index === 0) &&
                  item.deleted === false
                "
                :body-style="{ padding: '0px' }"
                style="width: 200px; padding: 0px; margin: 20px"
              >
                <div style="position: relative; text-align: center">
                  <img
                    :src="item.imageUrl"
                    class="image"
                    height="190"
                    width="200"
                  />
                  <div
                    style="
                      position: absolute;
                      height: 2px;
                      width: 100%;
                      bottom: 3px;
                      background-color: grey;
                      opacity: 0.3;
                    "
                  ></div>
                  <div
                    style="
                      position: absolute;
                      height: 32px;
                      width: 100%;
                      bottom: 5px;
                      background-color: black;
                      opacity: 0.5;
                    "
                  ></div>
                  <div
                    style="
                      position: absolute;
                      height: 2px;
                      width: 100%;
                      bottom: 37px;
                      background-color: grey;
                      opacity: 0.3;
                    "
                  ></div>
                  <div
                    style="
                      position: absolute;
                      height: 2px;
                      width: 100%;
                      bottom: 26px;
                      color: white;
                    "
                  >
                    {{ item.name }}
                  </div>
                </div>

                <el-row
                  style="
                    margin-top: 10px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                  "
                >
                  <el-col :span="10" style="font-weight: bold; color: #f95a68">
                    {{ item.price }}元/份
                  </el-col>
                  <el-col :span="14">
                    <el-button type="warning" plain @click="chooseMenu(item)"
                      >选规格</el-button
                    >
                    <!-- <el-input-number
                      v-model="dishList[dishIndex].amount"
                      @change="handleChange($event, dishIndex)"
                      size="mini"
                      :min="0"
                      :max="20"
                      style="width: 100px"
                    ></el-input-number> -->
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- --------------------------查询------------------------------ -->
    <el-col
      :span="10"
      style="position: absolute; top: 0px; bottom: 2px; left: 45%; height: 40px"
    >
      <el-input
        placeholder="请输入内容"
        v-model="searchInput"
        @input="onSearchInput"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchFood"
        ></el-button>
      </el-input>
    </el-col>
    <!-- --------------------------查询------------------------------ -->
    <!-- ----------------------------Dialog表单--------------------------------------- -->
    <el-dialog
      :title="foodName"
      :visible.sync="dialogFormVisible"
      center
      width="40%"
    >
      <el-form class="specificationMenu">
        <div class="choices" v-for="(value, inedx) in dishFlavour" :key="inedx">
          <div style="font-size: 20px; color: #8ca2aa; font-weight: 400">
            {{ value.key }}
          </div>
          <div class="radioGroup">
            <el-radio-group
              v-for="(item, i) in value.value"
              :key="i"
              v-model="radio1"
              fill="#FD3E3E"
              @change="addNote(value.key, item)"
            >
              <el-radio-button :label="item"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div style="font-size: 20px; color: #8ca2aa; font-weight: 400">
          备注
        </div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
          style="margin-top: 10px"
          fill="#FD3E3E"
        >
        </el-input>
        <div class="alreadyChoose">已选规格：{{ note }} {{ textarea }}</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="left">
          <div class="foodMoney">{{ foodMoney }}元/份</div>
          <div>
            <el-popover
              placement="top"
              v-model="selectingTableId"
              width="290"
              class="selectingTableBox"
              trigger="click"
            >
              <div
                v-for="(table, index) in occupied"
                :key="index"
                class="tableItem"
              >
                <el-button
                  :type="table ? 'primary' : ''"
                  :disabled="table"
                  style="width: 60px"
                  @click="selectTable(index)"
                >
                  {{ index + 1 }}
                </el-button>
              </div>
              <el-button slot="reference" size="mini">
                {{ tableId === 0 ? "选择餐桌" : tableId + "号桌" }}
              </el-button>
            </el-popover>
          </div>
        </div>
        <div class="right">
          <!-- 这里的条件有所改变 -->
          <div v-if="!addable">
            <el-button type="primary" @click="confirmMenu"
              >加入购物车</el-button
            >
          </div>

          <div v-else>
            <el-input-number
              v-model="amount"
              @change="handleChange($event, 0)"
              size="mini"
              :min="1"
              :max="20"
              style="width: 100px"
            ></el-input-number>
            <el-button
              type="primary"
              @click="commitOrderItem"
              style="margin-left: 10px"
              >确认</el-button
            >
          </div>

          <el-button
            @click="dialogFormVisible = false"
            style="margin-left: 10px"
            >取 消</el-button
          >
        </div>
        <!-- <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        > -->
      </div>
    </el-dialog>

    <!-- ----------------------------Dialog表单--------------------------------------- -->
    <el-badge
      :value="foodNum"
      class="item"
      style="position: absolute; right: 10px; top: 5px"
    >
      <el-button
        @click="createNewOrder"
        type="primary"
        size="mini"
        style="position: absolute; right: 10px; top: 5px"
        icon="el-icon-shopping-cart-2"
        >购物车
      </el-button>
    </el-badge>
    <el-drawer
      title="订单总览"
      :visible.sync="drawer"
      :direction="direction"
      size="40%"
    >
      <template>
        <el-table :data="orderItems" height="600">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column
            prop="name"
            label="菜名"
            width="150"
          ></el-table-column>
          <el-table-column prop="amount" label="数量" width="100">
            <template slot-scope="scope">
              <!-- //这里放啥啊 -->
              <el-input-number
                v-model="scope.row.amount"
                @change="handleChange2(scope.row.dishId)"
                size="mini"
                :min="0"
                :max="20"
                style="width: 100px"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="note"
            label="备注"
            width="200"
          ></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
        </el-table>
      </template>
      <el-descriptions>
        <el-descriptions-item label="桌号">{{ tableId }}</el-descriptions-item>
        <el-descriptions-item label="总金额"
          >{{ totalPrice }}
        </el-descriptions-item>
        <el-descriptions-item label="下单账号">{{
          accountId
        }}</el-descriptions-item>
      </el-descriptions>
      <div class="demo-drawer__footer">
        <el-button @click="drawer = false">取 消</el-button>
        <el-button type="primary" @click="uploadOrder">确认</el-button>
      </div>
    </el-drawer>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>当前订单为空或还未选择桌号</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addOrder,
  getAllFood,
  getCurrOrders,
  getRestaurant,
  addNewOrderItem
} from '../../../api/data'

import pinyin from 'pinyin'

export default {
  name: 'perCen',
  data() {
    return {
      foodNum: 0,
      activeName: '全部菜品',
      accountId: localStorage.getItem('accountId'),
      num: 1,
      dishList: [],
      fullDishList: [],
      dishCategories: [
        '全部菜品',
        '荤菜',
        '素菜',
        '汤类',
        '主食',
        '小吃',
        '饮品'
      ],
      drawer: false,
      selectingTableId: false,
      centerDialogVisible: false,
      note: '',
      /// //////////////////////点餐dialog/////////////////////
      foodName: '',
      foodMoney: '',
      dishFlavour: [],
      radio1: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      textarea: '',
      choiceClass: [],
      addable: false,
      amount: 0,
      /// //////////////////////点餐dialog/////////////////////
      direction: 'rtl',
      totalPrice: 0,
      orderItems: [], // 存放！就用你啦！
      tableId: 0,
      tableNum: 10,
      occupied: [],
      /// /////////////////////////查询//////////////////////////
      searchInput: '',
      /// /////////////////////////加菜/////////////////////
      curOrderId: ''
    }
  },

  mounted() {
    this.getAddMeal()
    this.refreshDishList()
    // 获取餐厅最大桌号
    this.occupied = new Array(this.tableNum)
    getRestaurant().then((res) => {
      localStorage.setItem('tableNum', res.data.data.tableNum)
      this.tableNum = res.data.data.tableNum
      this.refreshTableSituation()
    })
  },
  methods: {
    /// ///////////////////////获取加菜信息///////////////
    getAddMeal() {
      if (sessionStorage.getItem('curOrder')) {
        const curOrder = JSON.parse(sessionStorage.getItem('curOrder'))
        this.tableId = curOrder.tableId
        this.curOrderId = curOrder.id
        sessionStorage.removeItem('curOrder')
      }
    },
    /// /////////////////////////查询/////////////////////////////
    searchFood() {
      // input
    },
    /// ///////////////////////选规格////////////////////////////
    commitOrderItem() {
      // 计算所有菜数量

      let flag = false
      if (this.currItem != null && this.amount !== 0) {
        this.orderItems.forEach((element) => {
          if (
            this.currItem.dishId === element.dishId &&
            this.currItem.note === this.note + ';' + this.textarea
          ) {
            // console.log('>>>'+this.currItem.note+' '+this.textarea+'>>>>'+(this.note+';'+this.textarea))
            flag = true
            element.amount += this.amount // 合并为一个item
          }
        })
        // 如果没有相同的项就，覆盖amount,这咋全覆盖了啊
        if (!flag) {
          this.currItem.amount = this.amount
          // 存放note
          this.currItem.note = this.note + ';' + this.textarea
          const tempItem = JSON.parse(JSON.stringify(this.currItem))
          this.orderItems.push(tempItem)
        }
      }
      // 设置购物车上的数字
      this.foodNum = 0
      this.orderItems.forEach((element) => {
        this.foodNum += element.amount
      })
      // console.log('this.orderItems',this.orderItems)
      this.dialogFormVisible = false
    },
    confirmMenu() {
      this.addable = true
    },
    // 点开dialog的函数
    chooseMenu(item) {
      this.currItem = item
      // 如果名字一样，就不用改那些样式
      if (this.foodName !== item.name) {
        this.radio1 = ''
        this.note = ''
        this.textarea = ''
        this.addable = false
      }
      this.foodName = item.name
      this.foodMoney = item.price
      this.dishFlavour = item.flavour
      this.dialogFormVisible = true
    },
    // 这里的note有问题嗷
    addNote(keyname, value) {
      this.addable = false
      this.choiceClass[keyname] = value
      this.note = ''
      for (const key in this.choiceClass) {
        // 输出字典元素，如果字典的key是数字，输出时会自动按序输出
        this.note += this.choiceClass[key]
      }
    },
    // textFinish(){
    //   console.log(this.note)
    // },
    /// ///////////////////////选规格////////////////////////////
    selectTable(index) {
      this.tableId = index + 1
      this.selectingTableId = false
    },
    createNewOrder() {
      this.totalPrice = 0.0
      for (const dish of this.$data.orderItems) {
        if (dish.amount !== 0) {
          // this.orderItems.push(dish);
          this.totalPrice += dish.amount * dish.price
        }
      }
      if (this.orderItems.length === 0 || this.tableId === 0) {
        this.centerDialogVisible = true
        return
      }
      this.drawer = true
    },
    uploadOrder() {
      console.log('this.orderItems', this.orderItems)
      // 如果当前的订单号不为空
      if (this.curOrderId !== '') {
        this.orderItems.forEach((element) => {
          const addOrder = {
            orderId: this.curOrderId,
            dishId: element.id,
            amount: element.amount,
            note: element.note
          }
          addNewOrderItem(addOrder)
            .then((res) => {
              this.$message({
                message: '添加菜品成功',
                type: 'success'
              })
            })
            .catch((error) => {
              console.log(error)
            })
        })
        console.log('this.curOrderId', this.curOrderId)
      } else {
        const newOrder = {
          tableId: this.tableId,
          orderItems: this.orderItems
        }
        addOrder(newOrder)
          .then((res) => {
            this.$message({
              message: '创建订单成功',
              type: 'success'
            })
            this.refreshDishList()
            this.refreshTableSituation()
            this.occupied[this.tableId - 1] = true
            this.tableId = 0
            this.drawer = false
          })
          .catch((error) => {
            console.log(error)
            this.$message.error('网络异常，生成订单失败')
          })
      }
      this.orderItems = []
      this.totalPrice = 0
    },
    refreshDishList() {
      getAllFood().then((res) => {
        this.dishList = res.data.data
        this.fullDishList = this.dishList
      })
    },
    handleChange(dishIndex) {
      this.$forceUpdate()
      this.dialogFormVisible = true
    },
    handleChange2(dishId) {
      this.orderItems.forEach((element) => {
        if (element.dishId === dishId && element.amount === 0) {
          console.log('????')
          for (let i = 0; i < this.orderItems.length; i++) {
            if (element === this.orderItems[i]) {
              this.orderItems.splice(i, i + 1)
            }
          }
        }
      })
      // 设置购物车上的数字
      this.foodNum = 0
      this.orderItems.forEach((element) => {
        this.foodNum += element.amount
      })
      this.createNewOrder()
    },
    refreshTableSituation() {
      for (let i = 0; i < this.tableNum; i++) {
        this.occupied[i] = false
      }
      getCurrOrders().then((res) => {
        this.orderList = res.data.data
        for (let i = 0; i < this.orderList.length; i++) {
          this.occupied[this.orderList[i].tableId - 1] = true
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    onSearchInput(value) {
      if (value === '') {
        this.dishList = this.fullDishList
      } else if (/^[\u4e00-\u9fa5]+$/.test(value)) {
        this.dishList = this.fullDishList.filter((item) => {
          return item.name.includes(value)
        })
      } else if (/^[a-zA-Z]+$/.test(value)) {
        this.dishList = this.fullDishList
          .filter((item) => {
            return pinyin(item.name, {
              style: pinyin.STYLE_FIRST_LETTER
            })
              .reduce((acc, cur) => acc + cur[0], '')
              .startsWith(value)
          })
          .concat(
            this.fullDishList.filter((item) => {
              const py = pinyin(item.name, {
                style: pinyin.STYLE_FIRST_LETTER
              }).reduce((acc, cur) => acc + cur[0], '')
              return !py.startsWith(value) && py.includes(value)
            })
          )
      } else {
        this.dishList = []
      }
    }
  }
}
</script>
<style lang="scss" scopedSlots>
.specificationMenu {
  .choices {
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: center;
    line-height: 100%;
    margin-bottom: 10px;
  }
  .radioGroup {
    margin-left: 30px;
  }
  .alreadyChoose {
    margin-top: 10px;
    font-size: 14px;
    color: #8ca2aa;
  }
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  line-height: 100%;
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.foodMoney {
  display: inline-block;
  line-height: 1;
  text-align: center;
  margin-right: 10px;
  font-size: 24px;
  font-weight: 400;
  color: #ff2525;
}
.tableItem {
  display: inline-block;
  margin: 3px;
  width: 60px;
}
.card-title {
  display: flex;
  align-items: center;
}

.image {
  width: 200px;
  min-height: 100%;
  margin-right: 16px;
  border-radius: 5px;
}

.right-format {
  display: flex;
  text-align: left;
  flex-direction: column;
  line-height: 30px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  height: 200px;
  overflow: scroll;
}

.tables {
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
}
</style>
