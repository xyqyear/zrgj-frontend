<template>
  <el-row :gutter="30">
    <div class="header">
      <p style="color: #3758ff; margin-left: 20px">全部</p>
      <div style="margin-right: 20px">
        <el-button type="text" style="margin-right: 50px">
          <i
            class="el-icon-circle-plus-outline"
            style="width: 50px; font-size: 16px"
          >添加桌台</i>
          
        </el-button>
         <el-button type="text" style="margin-right: 50px">
          <i
            class="el-icon-edit"
            style="width: 50px; font-size: 16px"
          >桌台编辑</i>
          
        </el-button>
      </div>
      
    </div>
    <el-col :span="24">
      <div class="tables">
        <el-card
          v-for="item in spotData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
          style="margin-bottom: 20px"
        >
          <div class="info">
            <div style="border-bottom: 1px solid #545c64">
              <p class="floor">{{ item.floor }}</p>
              <p class="tableNum">{{ item.tableNum }}</p>
            </div>
            <div>
              <p class="state">{{ item.state ? item.state : "空闲" }}</p>
            </div>
          </div>
        </el-card>
      </div>
      <!-- <div class="grid-content bg-purple">
                <el-card v-for="item in rows" :key="item.name" :body-style="{ display: 'flex', padding: '50px'}">
                    <div class="info">
                        <p class="floor">{{item.floor}}</p>
                        <p class="tableNum">{{item.tableNum}}</p>
                        <p class="tableMoney">{{item.tableMoney}}</p>
                    </div>
                </el-card>
            </div> -->
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
.tables {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
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
</style>
<script>
export default {
  name: "table",
  data() {
    return {
      spotData: [
        {
          name: "11",
          floor: "一楼",
          tableNum: "1号桌",
          state: "540",
        },
        {
          name: "12",
          floor: "一楼",
          tableNum: "2号桌",
          state: "",
        },
        {
          name: "13",
          floor: "一楼",
          tableNum: "3号桌",
          state: "",
        },
        {
          name: "14",
          floor: "一楼",
          tableNum: "4号桌",
          state: "",
        },
        {
          name: "15",
          floor: "一楼",
          tableNum: "5号桌",
          state: "",
        },
        {
          name: "16",
          floor: "一楼",
          tableNum: "6号桌",
          state: "",
        },
        {
          name: "21",
          floor: "二楼",
          tableNum: "1号桌",
          state: "566",
        },
        {
          name: "22",
          floor: "二楼",
          tableNum: "2号桌",
          state: "1352",
        },
        {
          name: "23",
          floor: "二楼",
          tableNum: "3号桌",
          state: "47",
        },
        {
          name: "24",
          floor: "二楼",
          tableNum: "4号桌",
          state: "89",
        },
        {
          name: "25",
          floor: "二楼",
          tableNum: "5号桌",
          state: "650",
        },
        {
          name: "26",
          floor: "二楼",
          tableNum: "6号桌",
          state: "",
        },
        {
          name: "27",
          floor: "二楼",
          tableNum: "7号桌",
          state: "",
        },
        {
          name: "28",
          floor: "二楼",
          tableNum: "8号桌",
          state: "",
        },
        {
          name: "29",
          floor: "二楼",
          tableNum: "9号桌",
          state: "",
        },
      ],
      branchData: [],
    };
  },
  mounted() {
    this.getRow();
  },
  methods: {
    getRow() {
      let arr = [];
      let row = Math.ceil(this.spotData.length / 6);
      for (let i = 0; i < row; i++) {
        arr[i] = [];
        let tableLast =
          this.spotData.length % 6 === 0 ? 6 : this.spotData.length % 6;
        let lastRow = i === row - 1 ? tableLast : 6;
        for (let j = 0; j < lastRow; j++) {
          arr[i][j] = this.spotData[6 * i + j];
        }
      }

      this.branchData = arr;
    },
  },
};
</script>