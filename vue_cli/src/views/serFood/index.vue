<template>
  <div style="position: relative">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(category, index) in dishCategories" :label="category" :name="category">
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="tables">
              <div
                v-for="(item, dishIndex) in dishList"
                :key="item.id"
                :style="{ display: 'flex', padding: 0, width: '200px' }"
              >
                <el-card v-if="item.category===category || index===0">
                  <div>
                    <img :src="item.imageUrl" height="90px" width="90px"/>
                  </div>
                  <div>
                    <el-input-number
                      v-model="dishList[dishIndex].amount"
                      @change="handleChange($event, dishIndex)"
                      :min="0"
                      :max="20"
                    ></el-input-number>
                  </div>
                  <div>
                    <span>{{ item.name }}</span>
                  </div>
                  <div>
                    <span>￥{{ item.price }}</span>
                  </div>
                </el-card>

              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-button
      @click="createNewOrder"
      type="primary"
      size="mini"
      style="position: absolute; right: 10px; top: 5px"
    >创建订单
    </el-button
    >
    <el-drawer title="订单总览" :visible.sync="drawer" :direction="direction" size="40%">
      <template>
        <el-table :data="orderItems" border height="600">
          <el-table-column prop="name" label="菜名" width="150"></el-table-column>
          <el-table-column prop="amount" label="数量" width="200"></el-table-column>
          <el-table-column prop="note" label="备注" width="100"></el-table-column>
          <el-table-column prop="price" label="金额"></el-table-column>
        </el-table>
      </template>
      <el-descriptions>
        <el-descriptions-item label="桌号">{{ tableId }}</el-descriptions-item>
        <el-descriptions-item label="总金额">{{ totalPrice }}</el-descriptions-item>
        <el-descriptions-item label="下单账号">01</el-descriptions-item>
      </el-descriptions>
      <div class="demo-drawer__footer">
        <el-button @click="drawer = false">取 消</el-button>
        <el-button type="primary" @click="uploadOrder">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import {getAllFood, addOrder} from "../../../api/data";

export default {
  name: "perCen",
  data() {
    return {
      activeName: "全部菜品",
      num: 1,
      dishList: [],
      dishCategories: ['全部菜品', '荤菜', '素菜', '汤类', '小吃', '饮品'],
      classifiedDishList: [],
      drawer: false,
      direction: "rtl",
      orderItems: [],
      totalPrice: 0,
      tableId: 5
    };
  },
  created() {
    //访问接口，加请求头
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
  },
  mounted() {
    this.dishList = []
    // get menu through API

    this.refreshDishList()
    /*this.dishList = [
      {
        dishId: "01",
        imageUrl: require("../../assets/images/restaurant.jpg"),
        name: "葱爆鸭肠",
        price: 25,
        category: "荤菜",
      },
      {
        dishId: "02",
        imageUrl: require("../../assets/images/restaurant.jpg"),
        name: "清炒莲白",
        price: 25,
        category: "素菜",
      },
      {
        dishId: "03",
        imageUrl: require("../../assets/images/restaurant.jpg"),
        name: "番茄蛋汤",
        price: 25,
        category: "汤类",
      },
      {
        dishId: "04",
        imageUrl: require("../../assets/images/restaurant.jpg"),
        name: "拍黄瓜",
        price: 25,
        category: "素菜",
      },
      {
        dishId: "05",
        imageUrl: require("../../assets/images/restaurant.jpg"),
        name: "一口肠",
        price: 25,
        category: "小吃",
      },
      {
        dishId: "06",
        imageUrl: require("../../assets/images/restaurant.jpg"),
        name: "杨枝甘露",
        price: 25,
        category: "饮品",
      }
    ];*/


    // 菜品分类
    // this.classifiedDishList.push(this.dishList)
    // for (let i = 1; i < this.dishCategories.length; i++) {
    //   this.classifiedDishList.push(this.getDishOfCategory(this.dishCategories[i]))
    // }
  },
  methods: {
    createNewOrder() {
      this.drawer = true;
      this.orderItems = [];
      this.totalPrice = 0.0
      for (const dish of this.$data.dishList) {
        if (dish.amount != 0) {
          this.orderItems.push(dish);
          this.totalPrice += dish.amount * dish.price;
        }
      }

    },
    uploadOrder() {
      let newOrder = {
        "tableId": this.tableId,
        "orderItems": this.orderItems
      }
      addOrder(newOrder)
        .then(res => {
          this.$message({
            message: '创建订单成功',
            type: 'success'
          });
          this.refreshDishList()
          this.drawer = false;
        })
        .catch(error => {
          console.log(error);
          this.$message.error('网络异常，生成订单失败');
        })

    },
    refreshDishList() {
      getAllFood()
        .then(res => {
          this.dishList = res.data.data
          console.log(this.dishList)
          // 给每个菜品加上amount属性
          for (let i = 0; i < this.dishList.length; i++) {
            this.dishList[i].amount = 0;
            this.dishList[i].note = "";
            this.dishList[i].dishId = this.dishList[i].id;
          }
        })
    },
    handleChange(dishIndex) {
      // this.dishList[dishIndex].amount += 1;
      this.$forceUpdate();
      console.log(dishIndex);
    },
    getDishOfCategory(targetCategory) {
      let targetDishList = [];
      for (const dish of this.$data.dishList) {
        if (dish.category === targetCategory) {
          targetDishList.push(dish);
        }
      }
      return targetDishList;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {
        });
    },
  },
};
</script>
<style lang="scss" scopedSlots>
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
