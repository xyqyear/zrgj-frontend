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
        <el-card
          @click="dialogVisible = true"
          v-for="item in spotData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
          style="margin-bottom: 20px; margin-right: 40px"
        >
          <el-button
            class="info"
            @click="ClickCard(item)"
            :disabled="item.state ? false : true"
          >
            <div :style="{ background: item.state ? '#82AAFF' : '#FFFFFF' }">
              <p class="tableNum">{{ item.tableNum }}</p>
            </div>
            <div>
              <p class="state">{{ item.state ? item.state : "空闲" }}</p>
            </div>
          </el-button>
        </el-card>
        <!-- ------------------------------------- -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <!-- ---------------------------------------------- -->
          <el-card style="margin-top: 20px; height: 460px">
            <div class="order-header">
              <div class="left">
                <div class="order-num">订单号 {{ currItem.name }}</div>
              </div>
              <div class="right">
                <div class="time">2小时前</div>
              </div>
            </div>
            <div class="order-content">
              <div
                class="order-item"
                v-for="item in currItem.orders"
                :index="item.id + ''"
                :key="item.id"
              >
                <div class="left">
                  <img :src="img" style="width: 30px; height: 30px" />
                  <div class="orderItem-name" style="margin-left: 20px">
                    名字+（dishid:{{ item.dishId }}）
                  </div>
                </div>
                <div class="right">
                  <div class="amount" style="margin-right: 30px">
                    X {{ item.amount }}
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
                <!-- <el-tag type='info'>{{item.state=='1'?'已支付':'未支付'}}</el-tag> -->
              </div>
            </div>
          </el-card>
          <!-- ------------------------------------------------ -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
            >结 算</el-button
            >
          </span>
        </el-dialog>
        <!-- ------------------------------------- -->
      </div>
    </el-col>
  </el-row>
</template>  
<style lang="less" scoped>
.header {
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.el-button {
  padding: 0;
  border: 0;
}
.tables {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.info {
  width: 200px;
  height: 200px;
  div {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .floor {
      font-weight: 800;
      margin-bottom: 15px;
    }
  }
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
    justify-content: right;
    align-items: center;
  }
}
</style>
<script>
import { getAllFood, getCurrOrders } from '../../../api/data';
export default {
  name: "table",
  data() {
    return {
      dialogVisible: false,
      buttonVisible: true,
      currItem: {},
      orderData: {},
      rawOrderData: {},
      spotData: [
        {
          name: "11",
          tableNum: "1号桌",
          state: "540",
          orders: [
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
            {
              id: "1",
              dishId: "1",
              amount: 1,
            },
          ],
        },
        {
          name: "12",
          tableNum: "2号桌",
          state: "",
        },
        {
          name: "13",
          tableNum: "3号桌",
          state: "",
        },
        {
          name: "14",
          tableNum: "4号桌",
          state: "",
        },
        {
          name: "15",
          tableNum: "5号桌",
          state: "",
        },
        {
          name: "16",
          tableNum: "6号桌",
          state: "",
        },
        {
          name: "21",
          tableNum: "1号桌",
          state: "566",
        },
        {
          name: "22",
          tableNum: "2号桌",
          state: "1352",
        },
        {
          name: "23",
          tableNum: "3号桌",
          state: "47",
        },
        {
          name: "24",
          tableNum: "4号桌",
          state: "89",
        },
        {
          name: "25",
          tableNum: "5号桌",
          state: "650",
        },
        {
          name: "26",
          tableNum: "6号桌",
          state: "",
        },
        {
          name: "27",
          tableNum: "7号桌",
          state: "",
        },
        {
          name: "28",
          tableNum: "8号桌",
          state: "",
        },
        {
          name: "29",
          tableNum: "9号桌",
          state: "",
        },
      ],
      branchData: [],
    };
  },
  mounted() {
    this.populateData();
  },
  methods: {
    populateData() {
      Promise.all([getAllFood(), getCurrOrders()]).then((res) => {
        let dishMap = res[0].data.data.reduce((acc, curr) => {
                  acc[curr.id] = curr.name;
                  return acc;
                }, {});
        let orders = res[1].data.data;
          for (let order of orders) {
            // if all items are finished, skip
            if (order.orderItems.every((item) => item.state === 0)) {
              continue;
            }

            let displayOrder = {
              id: order.id,
              time: new Date(order.createTime).toLocaleTimeString(),
              tableId: order.tableId,
              orderItems: {},
            };

            for (let orderItem of order.orderItems) {
              displayOrder.orderItems[orderItem.id] = {
                id: orderItem.id,
                name: dishMap[orderItem.dishId],
                amount: orderItem.amount,
                note: orderItem.note,
                state: orderItem.state,
              };
            }

            order.orderItems = order.orderItems.reduce((acc, curr) => {
              acc[curr.id] = curr;
              return acc;
            }, {});

            this.$set(this.orderData, order.id, displayOrder);
            this.$set(this.rawOrderData, order.id, order);
          }
      })
    },
    ClickCard(item) {
      console.log(item);
      if (item.state) {
        this.dialogVisible = true;
        this.currItem = {
          name: item.name,
          floor: item.floor,
          tableNum: item.tableNum,
          state: item.state,
          orders: item.orders,
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.el-button {
  padding: 0;
  border: 0;
}

.tables {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.info {
  width: 200px;
  height: 200px;

  div {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .floor {
      font-weight: 800;
      margin-bottom: 15px;
    }
  }
}

.order-header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid #C1C1C1;

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
    border-bottom: 2px solid #EFEFEF;
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
  background: #FFFFFF;
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
    justify-content: right;
    align-items: center;


  }
}
</style>
