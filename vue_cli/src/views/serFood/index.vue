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
              v-for="(item, dishIndex) in dishList"
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
    <!-- ----------------------------Dialog表单--------------------------------------- -->
    <el-dialog
      :title="foodName"
      :visible.sync="dialogFormVisible"
      center
      width="30%"
    >
      <el-form class="specificationMenu">
        <div class="choices" v-for="(value, inedx) in dishFlavour" :key="inedx">
          <div style="font-size: 20px; color: #8CA2AA;font-weight:400">{{ value.key }}</div>
          <div class="radioGroup">
            <el-radio-group
              v-for="(item, i) in value.value"
              :key="i"
              v-model="radio1"
              fill="#FD3E3E"
              @change="addNote(value.key,item)"
            >
              <el-radio-button :label="item"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div style="font-size: 20px; color: #8CA2AA;font-weight:400">备注</div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
          style="margin-top:10px"
          fill="#FD3E3E"
          @change="textFinish"
        >
        </el-input>
        <div class="alreadyChoose">已选规格：{{note}} {{textarea}}</div>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="foodMoney">{{foodMoney}}元/份</div>
        <div class="right">
          <!-- 这里的条件有所改变 -->
        <div v-if="!addable">
        <el-button type="primary" @click="confirmMenu" >加入购物车</el-button>
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
        <el-button type="primary" @click="commitOrderItem" style="margin-left:10px">确认</el-button>
        </div>

        <el-button @click="dialogFormVisible = false" style="margin-left:10px">取 消</el-button>
        </div>
        <!-- <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        > -->
        
      </div>
    </el-dialog>

    <!-- ----------------------------Dialog表单--------------------------------------- -->
    <el-popover
      placement="top"
      v-model="selectingTableId"
      width="290"
      class="selectingTableBox"
      trigger="click"
    >
      <div v-for="(table, index) in occupied" :key="index" class="tableItem">
        <el-button
          :type="table ? 'primary' : ''"
          :disabled="table"
          style="width: 60px"
          @click="selectTable(index)"
        >
          {{ index + 1 }}
        </el-button>
      </div>
      <el-button
        slot="reference"
        style="position: absolute; right: 100px; top: 5px"
        size="mini"
      >
        {{ tableId === 0 ? "选择餐桌" : tableId + "号桌" }}
      </el-button>
    </el-popover>

    <el-button
      @click="createNewOrder"
      type="primary"
      size="mini"
      style="position: absolute; right: 10px; top: 5px"
      >创建订单
    </el-button>
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
          <el-table-column
            prop="amount"
            label="数量"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="note"
            label="备注"
            width="200"
          ></el-table-column>
          <el-table-column prop="price" label="金额"></el-table-column>
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
} from "../../../api/data";

export default {
  name: "perCen",
  data() {
    return {
      activeName: "全部菜品",
      accountId: localStorage.getItem("accountId"),
      num: 1,
      dishList: [],
      dishCategories: [
        "全部菜品",
        "荤菜",
        "素菜",
        "汤类",
        "主食",
        "小吃",
        "饮品",
      ],
      drawer: false,
      selectingTableId: false,
      centerDialogVisible: false,
      note:'',
      /////////////////////////点餐dialog/////////////////////
      foodName: "",
      foodMoney:'',
      dishFlavour: [],
      radio1: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      textarea: "",
      choiceClass:[],
      addable:false,
      amount:0,
      /////////////////////////点餐dialog/////////////////////
      direction: "rtl",
      totalPrice: 0,
      orderItems: [],//存放！就用你啦！
      tableId: 0,
      tableNum: 10,
      occupied: [],
    };
  },

  mounted() {
    this.refreshDishList();
    // 获取餐厅最大桌号
    this.occupied = new Array(this.tableNum);
    getRestaurant().then((res) => {
      localStorage.setItem("tableNum", res.data.data.tableNum);
      this.tableNum = res.data.data.tableNum;
      this.refreshTableSituation();
    });
  },
  methods: {
    //////////////////////////选规格////////////////////////////
    commitOrderItem(){
      var flag = false
      if(this.currItem!=null && this.amount!=0){
        this.orderItems.forEach(element => {
          if(this.currItem===element && this.currItem.note===(this.note+';'+this.textarea)){
            console.log('>>>'+this.currItem.note+' '+this.textarea+'>>>>'+(this.note+';'+this.textarea))
            flag = true
            element.amount += this.amount//合并为一个item
          }

        });
        //如果没有相同的项就，覆盖amount,这咋全覆盖了啊
        if(!flag){
          this.currItem.amount = this.amount
          //存放note
          this.currItem.note = this.note+';'+this.textarea
          this.orderItems.push(this.currItem)

        }
      }
      console.log('this.orderItems',this.orderItems)
      this.dialogFormVisible = false;
    },
    confirmMenu(){
      this.addable = true
    },
    //点开dialog的函数
    chooseMenu(item) {
      this.currItem = item
      console.log('aaaaa')
      console.log(this.currItem)
      //如果名字一样，就不用改那些样式
      if(this.foodName!=item.name){
        this.radio1 = ''
        this.note=''
        this.textarea = ''
        this.addable = false
      }
        this.foodName = item.name;
          this.foodMoney = item.price;
          this.dishFlavour = item.flavour;
      this.dialogFormVisible = true;
    },
    //这里的note有问题嗷
    addNote(keyname,value){
      this.addable = false
        this.choiceClass[keyname] = value
        this.note=''
      for(var key in this.choiceClass){ // 输出字典元素，如果字典的key是数字，输出时会自动按序输出
        this.note += this.choiceClass[key]
      }
    },
    textFinish(){
      console.log(this.note)
    },
    //////////////////////////选规格////////////////////////////
    selectTable(index) {
      this.tableId = index + 1;
      this.selectingTableId = false;
    },
    createNewOrder() {
      this.totalPrice = 0.0;
      for (const dish of this.$data.dishList) {
        if (dish.amount != 0) {
          // this.orderItems.push(dish);
          this.totalPrice += dish.amount * dish.price;
        }
      }
      console.log('this.orderItems',this.orderItems)
      if (this.orderItems.length === 0 || this.tableId === 0) {
        this.centerDialogVisible = true;
        return;
      }
      this.drawer = true;
    },
    uploadOrder() {
      let newOrder = {
        tableId: this.tableId,
        orderItems: this.orderItems,
      };
      addOrder(newOrder)
        .then((res) => {
          this.$message({
            message: "创建订单成功",
            type: "success",
          });
          this.refreshDishList();
          this.refreshTableSituation();
          this.occupied[this.tableId - 1] = true;
          this.tableId = 0;
          this.drawer = false;
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("网络异常，生成订单失败");
        });
        //对当前订单清空
        this.orderItems = []
        this.totalPrice = 0
    },
    refreshDishList() {
      getAllFood().then((res) => {
        this.dishList = res.data.data;
        // 给每个菜品加上orderItem所需属性
        for (let i = 0; i < this.dishList.length; i++) {
          this.dishList[i].amount = 0;
          this.dishList[i].note = "";
          this.dishList[i].dishId = this.dishList[i].id;
        }
      });
    },
    handleChange(dishIndex) {
      this.$forceUpdate();
      console.log("orderItems", this.orderItems);
      this.dialogFormVisible = true;
    },
    refreshTableSituation() {
      for (let i = 0; i < this.tableNum; i++) {
        this.occupied[i] = false;
      }
      getCurrOrders().then((res) => {
        this.orderList = res.data.data;
        for (let i = 0; i < this.orderList.length; i++) {
          this.occupied[this.orderList[i].tableId - 1] = true;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
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
  .alreadyChoose{
    margin-top:10px;
    font-size:14px;
    color:#8CA2AA;
  }
}
.dialog-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  line-height: 100%;
  .right{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
  .foodMoney{
    display: inline-block;
    line-height: 1;
    text-align: center;
    margin-right: 10px;
    font-size: 24px;
    font-weight: 400;
    color:#FF2525;
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
