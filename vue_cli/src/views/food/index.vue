<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <div>
        <p style="margin-left:20px;color:#545C64">查找到{{find}}条</p>
      </div>
      <div style="margin-right:20px;display:flex;">
        <el-input placeholder="请输入内容" v-model="input" clearable>
           <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
         <el-button plain style="margin-left :20px;">上架菜品</el-button>
      </div>
    </div>
    <el-col :span="24">
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" height:300 style="width: 100%">
          <el-table-column
      prop="index"
      label="序号"
      width="100"
      sortable="true">
          </el-table-column>
          <el-table-column
      prop="name"
      label="菜品名称"
      width="120">
          </el-table-column>
          <el-table-column
      label="菜品图片"
      width="100">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <img :src="scope.row.img" style="width:100px;height:100px;" />
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" style="color:#3A96FF">查看图片</el-tag>
          </div>
        </el-popover>
      </template>
          </el-table-column>
          <el-table-column
      prop="type"
      label="菜品类别"
      width="100">
          </el-table-column>
          <el-table-column
      prop="price"
      label="菜品价格"
      width="100">
          </el-table-column>
          <el-table-column
      prop="describe"
      label="菜品描述"
      width="430">
          </el-table-column>
          <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
       input: '',
       find:'22',
      tableData: [
        {
          index:'1',
          name: "麻婆豆腐",
          img:require("../../assets/images/logo.png"),
          type: '素菜',
          price: '12',
          describe: '好吃！',
          operation:'哇哩哇',
        },
        {
         index:'0',
          name: "麻婆豆腐",
          img:require("../../assets/images/logo.png"),
          type: '素菜',
          price: '12',
          describe: '好吃！',
          operation:'哇哩哇',
        },
        
      ],
    };
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
}
</style>