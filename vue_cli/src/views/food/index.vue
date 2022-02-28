<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <div>
        <p style="margin-left: 20px; color: #545c64">查找到{{ find }}条</p>
      </div>
      <div style="margin-right: 20px; display: flex">
        <el-input placeholder="请输入内容" v-model="input" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button
          plain
          style="margin-left: 20px"
          @click="dialogFormVisible = true"
          >上架菜品</el-button
        >
        <el-dialog title="上架菜品" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="菜品名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别" :label-width="formLabelWidth">
              <el-select @change='handleChange' v-model="selectVal" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="图片" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件
                </div>
              </el-upload>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAdd()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <el-col :span="24">
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" height="430" style="width: 100%">
          <el-table-column prop="id" label="序号" width="100" sortable="true">
          </el-table-column>
          <el-table-column prop="name" label="菜品名称" width="150">
          </el-table-column>
          <el-table-column label="菜品图片" width="200">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <img :src="scope.row.img" style="width: 150px; height: 150px" />
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" style="color: #3a96ff">查看图片</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="菜品类别" width="150">
          </el-table-column>
          <el-table-column prop="price" label="菜品价格" width="150">
          </el-table-column>
          <!-- <el-table-column
      prop="describe"
      label="菜品描述"
      width="430">
          </el-table-column> -->
          <el-table-column label="操作" width="100">
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
import { getAllFood } from "../../../api/data.js";
import { addFood } from "../../../api/data.js";
export default {
  name: "home",
  data() {
    return {
      selectVal: this.value || '',
      input: "",
      find: "",
      dialogFormVisible: false,
      form: {
        name: "",
        price: "",
      },
      tableData: [
        // {
        //   index: "1",
        //   name: "麻婆豆腐",
        //   img: require("../../assets/images/logo.png"),
        //   type: "素菜",
        //   price: "12",
        //   describe: "好吃！",
        //   operation: "哇哩哇",
        // },
        // {
        //   index: "0",
        //   name: "麻婆豆腐",
        //   img: require("../../assets/images/logo.png"),
        //   type: "素菜",
        //   price: "12",
        //   describe: "好吃！",
        //   operation: "哇哩哇",
        // },
      ],
      options: [
        {
          value: "选项1",
          label: "荤菜",
        },
        {
          value: "选项2",
          label: "素菜",
        },
        {
          value: "选项3",
          label: "汤类",
        },
        {
          value: "选项4",
          label: "小吃",
        },
        {
          value: "选项5",
          label: "饮品",
        },
      ],
      value: "",
    };
  },
  created() {
    //访问接口，加请求头
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
  },
  mounted() {
    this.getFoodData();
  },
  methods: {
    handleChange(data) {
        //如果上面:value赋的是对象，则可以将返回的对象赋予其他变量，这里的data是选中的对象，那么data.label则是reasonTypes中的label值，如果下拉中选中美国，那么this.selectVal 值为“美国”
          this.selectVal = data.label
        },
    handleAdd() {
      var body = {
        name: "",
        price: "",
        imageUrl: "",
        category: "",
      };
      body.name = this.form.name;
      body.price = this.form.price;
      body.category = this.selectVal;
      addFood(body).then((res) => {
        console.log(res);f
      })
    },
    getFoodData() {
      getAllFood()
        .then((res) => {
          console.log(res);
          this.find = res.data.data.length;
          for (let i = 0; i <= res.data.data.length; i++) {
            console.log(res.data.data[i].name);
            var item = {
              id: res.data.data[i].id,
              name: res.data.data[i].name,
              type: res.data.data[i].category,
              price: res.data.data[i].price,
              img: res.data.data[i].imageUrl,
            };
            this.tableData.push(item);
          }
          console.log(this.tableData);
        })
        .catch((error) => {
          console.log(error.response.data.reason);
        });
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
}
</style>
