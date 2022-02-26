<template>
<el-collapse accordion>
  <el-collapse-item 
  v-for="item in OrderData"
  :key="item.name"
  >
    <template slot="title">
      <div class="header">
        <div style="width:100px;border-right:2px solid #d5d5d5;">订单编号：{{item.id}}</div>
        <div style="width:200px;border-right:2px solid #d5d5d5;">下单时间：{{item.time}}</div>
        <div style="width:100px;border-right:2px solid #d5d5d5;">桌号：{{item.table}}</div>
        <div style="width:400px;">烹饪进度：2/3(这里要写js先空着)</div>
      </div>
    </template>
     <el-table :data="item.orders" height:300 style="width: 100%;margin-left:30px">
          <!-- <el-table-column
            prop="index"
            label="序号"
            width="100"
            sortable="true"
          >
          </el-table-column> -->
          <el-table-column prop="name" label="菜品名称" width="120px">
          </el-table-column>
          <el-table-column prop="amount" label="菜品数量" width="100px">
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="400px">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="100px">(这要写js)
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
                >烹饪</el-button
              >
            </template>
          </el-table-column>
        </el-table>
    <!-- <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
  </el-collapse-item>
</el-collapse>
</template>
<style lang="less" scoped>
el-table{
  width:100%;
  display: flex;
  justify-content: space-between;
}
el-collapse-item {
  margin-top: 30px;
  margin-bottom: 50px;
  border-radius: 5px;
}
.header{
  width:100%;
  height: 100%;
  padding-left: 20px;
  background: #E8E8E8;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  div{
    height: 100%;
    vertical-align: middle;
    line-height: 45px;
  }
}
</style>
<script>
export default {
  name: "table",
  data() {
    return {
      OrderData: [
        {
          id:'1',
          time:'2022/02/26 17:17',
          table:'02',
          name: "11",
          floor: "一楼",
          tableNum: "1号桌",
          state: "540",
          orders:[
            {
                  name:'麻婆豆腐',
                  id:'1',
                  dishId:'1',
                  amount:1,
                  remark:'少放盐',
                  state:0
              },
              {
                  name:'麻辣肉串',
                  id:'2',
                  dishId:'2',
                  amount:2,
                  remark:'少放盐',
                  state:0
              },
              {
                name:'香辣猪蹄',
                  id:'1',
                  dishId:'1',
                  amount:1,
                  remark:'少放盐',
                  state:0
              },
              {
                name:'爆炒河蟹',
                  id:'2',
                  dishId:'2',
                  amount:2,
                  remark:'少放盐',
                  state:0
              },
              
          ]
        },
        {
          id:'2',
          time:'2022/02/26 17:17',
          table:'02',
          name: "12",
          floor: "一楼",
          tableNum: "2号桌",
          state: "",
        },
        {
          id:'3',
          time:'2022/02/26 17:17',
          table:'02',
          name: "13",
          floor: "一楼",
          tableNum: "3号桌",
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