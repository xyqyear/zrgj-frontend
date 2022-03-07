<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <!-- <div>
        <p style="margin-left:20px;color:#545C64">查找到{{find}}条</p>
      </div> -->
      <div style="margin-right: 20px; display: flex">
        <el-input placeholder="请输入内容" v-model="searchInput" @input="onSearchInput" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-button
        plain
        style="margin-left: 20px"
        @click="dialogFormVisible = true"
        >添加人员</el-button
      >
      <el-dialog title="添加员工" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="员工姓名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-radio v-model="radio1" label="1">服务员</el-radio>
            <el-radio v-model="radio1" label="2">厨师</el-radio>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.telephone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-col :span="24">
      <el-card style="margin-top: 20px">
        <el-table :data="tableData" height:300 style="width: 100%">
          <el-table-column prop="index" label="序号" sortable="true">
          </el-table-column>
          <el-table-column prop="id" label="员工号"> </el-table-column>
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
              <el-dialog
                title="修改员工信息"
                :visible.sync="dialogChangeVisible"
              >
                <el-form :model="formChange">
                  <el-form-item label="员工姓名" :label-width="formLabelWidth">
                    <el-input
                      v-model="formChange.username"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-radio v-model="radio2" label="1">服务员</el-radio>
                    <el-radio v-model="radio2" label="2">厨师</el-radio>
                  </el-form-item>
                  <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input
                      v-model="formChange.telephone"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogChangeVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="handleEditSure()"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
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
import { getUserlist, chaAccount, addAccount, deAccount } from "../../../api/data.js";
import pinyin from "pinyin";

export default {
  name: "home",
  data() {
    return {
      searchInput: "",
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
      fullTableData: [],
      radio1: "1",
      radio2: "",
      dialogFormVisible: false,
      dialogChangeVisible: false,
      form: {
        username: "",
        password: "",
        telephone: "",
      },
      formChange: {
        id: "",
        username: "",
        telephone: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
  },
  mounted() {
    console.log("???");
    // axios.defaults.headers.common["Authorization"] =
    //         localStorage.getItem("token");
    this.getUserData();
  },
  methods: {
    getUserData(){
      getUserlist()
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.data.length; i++) {
          var item = {
            index: i + 1,
            id: res.data.data[i].id,
            username: res.data.data[i].username,
            position: res.data.data[i].position,
            type: "",
            telephone: res.data.data[i].telephone,
          };
          if (item.position === 1) {
            item.type = "服务员";
          } else {
            item.type = "厨师";
          }
          this.tableData.push(item);
        }
        console.log(this.tableData);
        this.fullTableData = this.tableData;
      })
      .catch((error) => {
        console.log(error.response.data.reason);
      });
    },
    handleEditSure() {
      this.dialogChangeVisible = false;
      var body = {
        id: "",
        username: "",
        position: "",
        avatarUrl: "",
        telephone: "",
      };
      body.id = this.formChange.id;
      body.username = this.formChange.username;
      body.position = this.radio2;
      body.telephone = this.formChange.telephone;
      chaAccount(body).then((res) => {
        console.log(res);
      });
      this.getUserData();
    },
    handleAdd() {
      this.dialogFormVisible = false;
      var body = {
        username: "",
        password: "",
        position: "",
        avatarUrl: "",
        telephone: "",
      };
      body.username = this.form.username;
      body.password = this.form.password;
      body.position = this.radio1;
      body.telephone = this.form.telephone;
      addAccount(body).then((res) => {
        console.log(res);
      });
      this.getUserData();
    },
    handleEdit(index, row) {
      this.dialogChangeVisible = true;
      this.radio2 = row.position;
      this.formChange.username = row.username;
      this.formChange.telephone = row.telephone;
      this.formChange.id = row.id;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var body = {
            id: "",
          };
          body.id = row.id;
          console.log(body.id);
          deAccount(body)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getUserData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onSearchInput(value) {
      if (value === "") {
        this.tableData = this.fullTableData;
      } else if (/^[\u4e00-\u9fa5]+$/.test(value)) {
        this.tableData = this.fullTableData.filter((item) => {
          return item.username.includes(value);
        });
      } else if (/^[a-zA-Z]+$/.test(value)) {
        this.tableData =
          this.fullTableData.filter((item) => {
            return pinyin(item.username, {
              style: pinyin.STYLE_FIRST_LETTER,
            }).reduce((acc, cur) => acc + cur[0], '').startsWith(value);
          }).concat(
          this.fullTableData.filter((item) => {
            const py = pinyin(item.username, {
              style: pinyin.STYLE_FIRST_LETTER,
            }).reduce((acc, cur) => acc + cur[0], '');
            return !py.startsWith(value) && py.includes(value);
          }));
      } else if (/^\d+$/.test(value)) {
        this.tableData = this.fullTableData.filter((item) => {
          return item.id === Number(value);
        });
      } else {
        this.tableData = [];
      }
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
</style>
