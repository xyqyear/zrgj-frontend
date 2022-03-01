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
                v-if="item.category === category || index === 0"
                :body-style="{ padding: '0px' }"
                style="width: 200px; padding: 0px; margin: 20px"
              >
                <div
                  style="position: relative; text-align: center;"
                >
                  <img
                    :src="item.imageUrl"
                    class="image"
                    height="190"
                    width="200"
                  />
                  <div style="position: absolute; height: 2px; width: 100%; bottom: 3px; background-color: grey; opacity:0.3"></div>
                  <div style="position: absolute; height: 32px; width: 100%; bottom: 5px; background-color: black; opacity:0.5;">
                  </div>
                  <div style="position: absolute; height: 2px; width: 100%; bottom: 37px; background-color: grey; opacity:0.3"></div>
                  <div style="position: absolute; height: 2px; width: 100%; bottom: 26px; color: white">{{item.name}}</div>
                </div>

                <el-row style="margin-top: 10px; margin-bottom: 10px; display: flex; align-items: center;">
                  <el-col :span="10" style="font-weight: bold; color: #f95a68; ">
                    {{item.price}}元/份
                  </el-col>
                  <el-col :span="14">
                    <el-input-number
                      v-model="dishList[dishIndex].amount"
                      @change="handleChange($event, dishIndex)"
                      size="mini"
                      min="0"
                      max="20"
                      style="width: 100px"
                    ></el-input-number>
                  </el-col>
                </el-row>

              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
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
        <el-table :data="orderItems" border height="600">
          <el-table-column
            prop="name"
            label="菜名"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="数量"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="note"
            label="备注"
            width="100"
          ></el-table-column>
          <el-table-column prop="price" label="金额"></el-table-column>
        </el-table>
      </template>
      <el-descriptions>
        <el-descriptions-item label="桌号">{{ tableId }}</el-descriptions-item>
        <el-descriptions-item label="总金额">{{
          totalPrice
        }}</el-descriptions-item>
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
import { addOrder, getAllFood } from "../../../api/data";

export default {
  name: "perCen",
  data() {
    return {
      activeName: "全部菜品",
      num: 1,
      dishList: [],
      dishCategories: ["全部菜品", "荤菜", "素菜", "汤类", "小吃", "饮品"],
      classifiedDishList: [],
      drawer: false,
      direction: "rtl",
      orderItems: [],
      totalPrice: 0,
      tableId: 5,
    };
  },

  mounted() {
    this.refreshDishList();

    /*    菜品分类
        this.classifiedDishList.push(this.dishList)
        for (let i = 1; i < this.dishCategories.length; i++) {
          this.classifiedDishList.push(this.getDishOfCategory(this.dishCategories[i]))
        }*/
  },
  methods: {
    createNewOrder() {
      this.drawer = true;
      this.orderItems = [];
      this.totalPrice = 0.0;
      for (const dish of this.$data.dishList) {
        if (dish.amount != 0) {
          this.orderItems.push(dish);
          this.totalPrice += dish.amount * dish.price;
        }
      }
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
          this.drawer = false;
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("网络异常，生成订单失败");
        });
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
      // this.dishList[dishIndex].amount += 1;
      this.$forceUpdate();
      console.log(dishIndex);
    },
    /*    getDishOfCategory(targetCategory) {
      let targetDishList = [];
      for (const dish of this.$data.dishList) {
        if (dish.category === targetCategory) {
          targetDishList.push(dish);
        }
      }
      return targetDishList;
    },*/
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
