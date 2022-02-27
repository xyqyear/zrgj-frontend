<template>
  <el-row class="home" :gutter="20">
    <el-col :span="24">
      <el-card
        v-for="(item, index) in orderData"
        :key="index"
        style="margin-top: 20px; height: 460px"
      >
        <div class="order-header">
          <div class="left">
            <div>{{ index }}</div>
            <div class="order-num">订单号 {{ item.id }}</div>
          </div>
          <div class="right">
            <div class="time">2小时前</div>
          </div>
        </div>
        <div class="order-content">
          <div
            class="order-item"
            v-for="subitem in item.orderItems"
            :index="subitem.id + ''"
            :key="subitem.id"
          >
            <div class="left">
              <img :src="img" style="width: 30px; height: 30px" />
              <div class="orderItem-name" style="margin-left: 20px">
                名字+（dishid:{{ subitem.dishId }}）
              </div>
            </div>
            <div class="right">
              <div class="amount" style="margin-right: 30px">
                X {{ subitem.amount }}
              </div>
              <div class="count">￥23.0</div>
            </div>
          </div>
        </div>
        <div class="order-bottom">
          <div class="up">
            <div class="total">共10种，共10个商品，总计：￥200</div>
          </div>
          <div class="down">
            <div class="left">
              <el-tag>备菜完毕</el-tag>
              <el-tag>未传菜</el-tag>
              <el-tag>支付完成</el-tag>
            </div>
            <div class="right">
              <el-tag :type="item.state == '1' ? 'success' : 'info'">{{
                item.state == "1" ? "已支付" : "未支付"
              }}</el-tag>
              <!-- <el-tag type='info'>{{item.state=='1'?'已支付':'未支付'}}</el-tag> -->
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      input: "",
      find: "22",
      img: require("../../assets/images/logo.png"),
      tableData: [
        {
          index: "1",
          id: "12313",
          name: "哇哩哇",
          type: "基层",
          phone: "1234567881",
        },
        {
          index: "2",
          id: "12313",
          name: "哇哩哇",
          type: "基层",
          phone: "1234567881",
        },
      ],
      orderData: [
        {
          id: "01",
          state: "1",
          orderItems: [
            {
              id: "1",
              dishId: "1",
              amount: 1,
            },
            {
              id: "2",
              dishId: "2",
              amount: 2,
            },
            {
              id: "1",
              dishId: "1",
              amount: 1,
            },
            {
              id: "2",
              dishId: "2",
              amount: 2,
            },
            {
              id: "1",
              dishId: "1",
              amount: 1,
            },
            {
              id: "2",
              dishId: "2",
              amount: 2,
            },
            {
              id: "1",
              dishId: "1",
              amount: 1,
            },
            {
              id: "2",
              dishId: "2",
              amount: 2,
            },
          ],
        },
        {
          id: "02",
          state: "0",
        },
      ],
    };
  },
  methods: {
    //应该就是通过这玩意，通过name推过去
    clickTest(subitem) {
      console.log(subitem.id);
    },
  },
};
</script>
<style lang="less" scoped>
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
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  .order-item {
    width: 100%;
    border-bottom: 2px solid #efefef;
    display: flex;
    justify-content: space-between;
  }
  .left {
    margin-left: 30px;
    width: 200px;
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: center;
    line-height: 50px;
    .order-num {
      margin-left: 20px;
    }
  }
  .right {
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: center;
  }
}
.order-bottom {
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
    align-items: center;
    .left {
      width: 50%;  
      display: flex;
      justify-content: left;
    }
    .right {
      width: 50%;  
      display: flex;
      justify-content: right;
    }
  }
}
</style>
