<template>
  <el-row :gutter="30">
    <div class="header">
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
    </div>
    <el-col :span="24">
      <div class="tables">
        <el-card
          @click="dialogVisible = true"
          v-for="item in spotData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
          style="margin-bottom: 20px; margin-right: 40px"
        >
       
          <el-button class="info" @click="ClickCard(item)" :disabled="item.state?false:true">
            <div :style="{ background: item.state ? '#82AAFF' : '#FFFFFF' }">
              <p class="floor">{{ item.floor }}</p>
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
          :before-close="handleClose"
        >
          <!-- ---------------------------------------------- -->
           <el-card 
        style="margin-top: 20px; height: 460px"
      >
        <div class="order-header">
          <div class="left">
            <div class="order-num">订单号 {{ currItem.name }}</div>
          </div>
          <div class="right">
            <div class="time">2小时前</div>
          </div>
        </div>
        <div class="order-content">
            <div class="order-item"
            v-for="item in currItem.orders" :index="item.id+''" :key="item.id"
            >
            <div class="left">
                <img :src="img" style="width:30px;height:30px;"/>
                <div class="orderItem-name" style="margin-left:20px">名字+（dishid:{{item.dishId}}）</div>
                </div>
                <div class="right">
                    <div class="amount" style="margin-right:30px">X {{item.amount}}</div>
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
.el-button{
  padding:0;
  border:0;
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
    width:100%;
    height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid #C1C1C1;
  .left{
      width:200px;
      display: flex;
      justify-content: left;
      align-items: center;
      text-align: center;
      .order-num{
          margin-left: 20px;
      }
  }
}
.order-content {
    width:100%;
    height: 300px;
  display: flex;
  flex-direction: column;
  overflow: scroll; 
  .order-item{
      width:100%;
      border-bottom: 2px solid #EFEFEF;
      display: flex;
      justify-content: space-between;
  }
  .left{
      margin-left: 30px;
      width:200px;
      display: flex;
      justify-content: left;
      align-items: center;
      text-align: center;
      line-height: 50px;
      .order-num{
          margin-left: 20px;
      }
  }
  .right{
      display: flex;
      justify-content: left;
      align-items: center;
      text-align: center;
  }

}
.order-bottom{
    width:100%;
    height: 60px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .up{
        width:100%;
        display: flex;
        justify-content: right;
        align-items: center;
        

    }
    .down{
        width:100%;
        display: flex;
        justify-content: right;
        align-items: center;


    }
}
</style>
<script>
export default {
  name: "table",
  data() {
    return {
      dialogVisible: false,
      buttonVisible:true,
      currItem:{},
      spotData: [
        {
          name: "11",
          floor: "一楼",
          tableNum: "1号桌",
          state: "540",
          orders:[
            {
                  id:'1',
                  dishId:'1',
                  amount:1,
              },
              {
                  id:'2',
                  dishId:'2',
                  amount:2,
              },
              {
                  id:'1',
                  dishId:'1',
                  amount:1,
              },
              {
                  id:'2',
                  dishId:'2',
                  amount:2,
              },
              {
                  id:'1',
                  dishId:'1',
                  amount:1,
              },
              {
                  id:'2',
                  dishId:'2',
                  amount:2,
              },
              {
                  id:'1',
                  dishId:'1',
                  amount:1,
              },
              {
                  id:'2',
                  dishId:'2',
                  amount:2,
              },
              {
                  id:'1',
                  dishId:'1',
                  amount:1,
              },
          ]
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
    ClickCard(item){
      console.log(item);
      if(item.state){
        this.dialogVisible = true;
        this.currItem={
          name: item.name,
          floor: item.floor,
          tableNum:item.tableNum,
          state:item.state,
          orders:item.orders
        }
        console.log(this.currItem.name)
      }
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  },
};
</script>