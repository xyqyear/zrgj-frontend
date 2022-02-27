<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <!-- <div>
        <p style="margin-left:20px;color:#545C64">查找到{{find}}条</p>
      </div> -->
      <div style="margin-right: 20px; display: flex">
        <el-input placeholder="请输入内容" v-model="input" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-button plain style="margin-left: 20px">添加人员</el-button>
    </div>
    <el-col :span="24">
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" height:300 style="width: 100%">
          <el-table-column prop="index" label="序号" sortable="true">
          </el-table-column>
          <el-table-column prop="id" label="员工号"> </el-table-column>
          <!-- <el-table-column
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
          </el-table-column> -->
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="type" label="员工类型"> </el-table-column>
          <el-table-column prop="telephone" label="手机号码"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getUserlist } from "../../../api/data.js";
export default {
  name: "home",
  data() {
    return {
      input: "",
      find: "22",
      tableData: [
        //   {
        //     index:'1',
        //     id:'12313',
        //     name:'哇哩哇',
        //     type:'基层',
        //     phone:'1234567881'
        //   },
        //  {
        //     index:'2',
        //     id:'12313',
        //     name:'哇哩哇',
        //     type:'基层',
        //     phone:'1234567881'
        //   },
      ],
    };
  },
  mounted() {
      console.log("???");
      // axios.defaults.headers.common["Authorization"] =
      //         localStorage.getItem("token");
      getUserlist()
        .then((res) => {
          console.log(res);
           for(let i = 0;i<=res.data.data.length;i++){
            var item = {
              index : i+1,
              id : res.data.data[i].id,
              username : res.data.data[i].username,
              position : res.data.data[i].position,
              type : "",
              telephone : res.data.data[i].telephone,
            }
            if(item.position ==1){
              item.type = "服务员"
            }
            else {
              item.type = "厨师"
            }
            this.tableData.push(item);
          }
          console.log(this.tableData);
        })
        .catch((error) => {
          console.log(error.response.data.reason);
        });
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
</style>
