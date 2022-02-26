<template>
  <div style="position: relative">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部菜品" name="first">
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="tables">
              <el-card
                v-for="item in foodData"
                :key="item.id"
                :style="{ diplay: 'flex', padding: 0, width: '200px' }"
              >
                <div>
                  <img :src="item.img" height="90px" width="90px" />
                </div>
                <div>
                  <el-input-number
                    v-model="item.num"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </div>
                <div>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>{{ item.price }}</span>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="荤菜" name="second">
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="tables">
              <el-card
                v-for="item in meetData"
                :key="item.id"
                :style="{ diplay: 'flex', padding: 0, width: '200px' }"
              >
                <div>
                  <img :src="item.img" height="90px" width="90px" />
                </div>
                <div>
                  <el-input-number
                    v-model="item.num"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </div>
                <div>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>{{ item.price }}</span>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="素菜" name="third">
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="tables">
              <el-card
                v-for="item in foodData"
                :key="item.id"
                :style="{ diplay: 'flex', padding: 0, width: '200px' }"
              >
                <div>
                  <img :src="item.img" height="90px" width="90px" />
                </div>
                <div>
                  <el-input-number
                    v-model="item.num"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </div>
                <div>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>{{ item.price }}</span>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="汤类" name="fourth">
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="tables">
              <el-card
                v-for="item in foodData"
                :key="item.id"
                :style="{ diplay: 'flex', padding: 0, width: '200px' }"
              >
                <div>
                  <img :src="item.img" height="90px" width="90px" />
                </div>
                <div>
                  <el-input-number
                    v-model="item.num"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </div>
                <div>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>{{ item.price }}</span>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="小吃" name="fifth">
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="tables">
              <el-card
                v-for="item in foodData"
                :key="item.id"
                :style="{ diplay: 'flex', padding: 0, width: '200px' }"
              >
                <div>
                  <img :src="item.img" height="90px" width="90px" />
                </div>
                <div>
                  <el-input-number
                    v-model="item.num"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </div>
                <div>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>{{ item.price }}</span>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="饮品" name="sixth">
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="tables">
              <el-card
                v-for="item in foodData"
                :key="item.id"
                :style="{ diplay: 'flex', padding: 0, width: '200px' }"
              >
                <div>
                  <img :src="item.img" height="90px" width="90px" />
                </div>
                <div>
                  <el-input-number
                    v-model="item.num"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </div>
                <div>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>{{ item.price }}</span>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-button
      @click="drawer = true"
      type="primary"
      size="mini"
      style="position: absolute; right: 10px; top: 5px"
      >结算</el-button
    >
    <el-drawer title="购物车" :visible.sync="drawer" :direction="direction" size="40%">
      <el-table :data="foodData">
        <el-table-column
          property="name"
          label="菜名"
          width="150"
        ></el-table-column>
        <el-table-column label="数量" width="200">
          <template slot-scope="">
            <el-input-number
              v-model="num"
              @change="handleChange"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column property="price" label="金额"></el-table-column>
      </el-table>
      <div class="demo-drawer__footer">
        <el-button @click="drawer = false">取 消</el-button>
        <el-button type="primary" @click="drawer = false">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "perCen",
  data() {
    return {
      activeName: "first",
      num: 1,
      foodData: [
        {
          id: "01",
          img: require("../../assets/images/restaurant.jpg"),
          name: "葱爆鸭肠",
          price: "¥25",
          num: 1,
          type: 1,
        },
        {
          id: "02",
          img: require("../../assets/images/restaurant.jpg"),
          name: "清炒莲白",
          price: "¥25",
          num: 1,
          type: 2,
        },
        {
          id: "03",
          img: require("../../assets/images/restaurant.jpg"),
          name: "番茄蛋汤",
          price: "¥25",
          num: 1,
          type: 3,
        },
        {
          id: "04",
          img: require("../../assets/images/restaurant.jpg"),
          name: "拍黄瓜",
          price: "¥25",
          num: 1,
          type: 2,
        },
        {
          id: "05",
          img: require("../../assets/images/restaurant.jpg"),
          name: "一口肠",
          price: "¥25",
          num: 1,
          type: 4,
        },
        {
          id: "06",
          img: require("../../assets/images/restaurant.jpg"),
          name: "杨枝甘露",
          price: "¥25",
          num: 1,
          type: 5,
        },
        {
          id: "07",
          img: require("../../assets/images/restaurant.jpg"),
          name: "葱爆鸭肠",
          price: "¥25",
          num: 1,
          type: 1,
        },
        {
          id: "08",
          img: require("../../assets/images/restaurant.jpg"),
          name: "葱爆鸭肠",
          price: "¥25",
          num: 1,
          type: 1,
        },
        {
          id: "09",
          img: require("../../assets/images/restaurant.jpg"),
          name: "葱爆鸭肠",
          price: "¥25",
          num: 1,
          type: 1,
        },
        {
          id: "10",
          img: require("../../assets/images/restaurant.jpg"),
          name: "葱爆鸭肠",
          price: "¥25",
          num: 1,
          type: 1,
        },
      ],
      meetData: [],
      drawer: false,
      direction: "rtl",
    };
  },
  mounted() {
    getMeet(foodData);
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(value) {
      console.log(value);
    },
    getMeet(foodData) {
      if (item.type == 1) {
        this.meetData.push(item);
      }
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
